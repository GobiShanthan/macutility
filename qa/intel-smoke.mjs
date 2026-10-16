import { _electron as electron } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

const bundle = resolve(
  process.env.MACUTILITY_TEST_APP ?? "release/mac/MacUtility.app",
);
const output = resolve(process.env.MACUTILITY_REPORT_DIR ?? "intel-report");
await mkdir(output, { recursive: true });
const report = {
  startedAt: new Date().toISOString(),
  version: "0.1.2",
  runner: process.env.RUNNER_NAME ?? "local",
  hostArchitecture: execFileSync("uname", ["-m"], { encoding: "utf8" }).trim(),
  macOS: execFileSync("sw_vers", ["-productVersion"], {
    encoding: "utf8",
  }).trim(),
  checks: [],
  limitations: [
    "No physical end-user Mac or downloaded-app Gatekeeper experience is certified.",
    "Cleanup safeguards are tested by refusal/cancellation; no real user data is removed.",
    "No whole-volume scan or performance guarantee is tested.",
  ],
};
let app;
async function check(name, action) {
  const started = Date.now();
  try {
    await action();
    report.checks.push({ name, passed: true, elapsedMs: Date.now() - started });
  } catch (error) {
    report.checks.push({ name, passed: false, error: String(error) });
    throw error;
  }
}
try {
  if (process.env.GITHUB_ACTIONS === "true")
    assert.equal(
      report.hostArchitecture,
      "x86_64",
      "Expected a native Intel GitHub runner",
    );
  await check("Bundle integrity", async () =>
    execFileSync("codesign", ["--verify", "--deep", "--strict", bundle]),
  );
  await check("Packaged license and notices", async () => {
    const resources = join(bundle, "Contents/Resources");
    assert.match(
      await readFile(join(resources, "MACUTILITY-LICENSE.txt"), "utf8"),
      /proprietary/i,
    );
    for (const file of [
      "legal/TERMS.md",
      "legal/PRIVACY.md",
      "legal-notices/THIRD-PARTY-NOTICES.txt",
      "legal-notices/LICENSES.chromium.html",
    ])
      assert.ok((await readFile(join(resources, file))).length > 0);
    const inventory = JSON.parse(
      await readFile(
        join(resources, "legal-notices/dependency-inventory.json"),
        "utf8",
      ),
    );
    assert.deepEqual(inventory.reviewRequired, []);
  });
  await check("Packaged Intel app launches", async () => {
    app = await electron.launch({
      executablePath: join(bundle, "Contents/MacOS/MacUtility"),
      env: Object.fromEntries(
        Object.entries(process.env).filter(
          ([key, value]) =>
            key !== "ELECTRON_RUN_AS_NODE" && value !== undefined,
        ),
      ),
      timeout: 90000,
    });
  });
  const page = await app.firstWindow();
  await check("Intel architecture and version", async () => {
    report.runtime = await app.evaluate(({ app }) => ({
      architecture: process.arch,
      version: app.getVersion(),
    }));
    assert.equal(report.runtime.architecture, "x64");
    assert.equal(report.runtime.version, "0.1.2");
  });
  await check("Home screen renders", async () => {
    await page
      .getByRole("heading", { name: "Free up space on your Mac" })
      .waitFor();
    await page.screenshot({ path: join(output, "home.png") });
  });
  await check("Renderer Node isolation", async () =>
    assert.equal(await page.evaluate(() => typeof window.require), "undefined"),
  );
  await check("Real disk information", async () => {
    const disk = await page.evaluate(() => window.macutility.disk());
    assert.ok(disk.total > 0 && disk.free >= 0 && disk.free <= disk.total);
  });
  await check("Manual updates in free release", async () => {
    const status = await page.evaluate(() => window.macutility.updateStatus());
    assert.equal(status.phase, "disabled");
    assert.equal(status.currentVersion, "0.1.2");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    assert.equal(
      await page
        .getByRole("link", { name: "Open download page" })
        .getAttribute("href"),
      "https://github.com/GobiShanthan/macutility/releases/latest",
    );
    await page.screenshot({ path: join(output, "settings.png") });
  });
  await check(
    "Native scanner enumerates temporary fixture on x64",
    async () => {
      report.nativeFixture = await app.evaluate(async () => {
        const { createRequire } = process.getBuiltinModule("node:module");
        const fs = process.getBuiltinModule("node:fs").promises;
        const os = process.getBuiltinModule("node:os");
        const path = process.getBuiltinModule("node:path");
        const addon = createRequire(process.execPath)(
          path.join(process.resourcesPath, "native/getattrlistbulk.node"),
        );
        for (const name of ["openDirectory", "readBatch", "closeDirectory"])
          if (typeof addon[name] !== "function")
            throw Error("Missing native API: " + name);
        const fixture = await fs.mkdtemp(
          path.join(os.tmpdir(), "macutility-intel-fixture-"),
        );
        try {
          await fs.writeFile(path.join(fixture, "keep.txt"), "fixture only");
          await fs.mkdir(path.join(fixture, "nested"));
          const directory = addon.openDirectory(fixture);
          const entries = [];
          try {
            for (let count = 0; count < 20; count++) {
              const batch = await addon.readBatch(directory);
              if (!batch.length) break;
              entries.push(...batch);
            }
          } finally {
            addon.closeDirectory(directory);
          }
          return {
            names: entries.map((entry) => entry.name).sort(),
            fileSize: entries.find((entry) => entry.name === "keep.txt")?.size,
          };
        } finally {
          await fs.rm(fixture, { recursive: true, force: true });
        }
      });
      assert.ok(report.nativeFixture.names.includes("keep.txt"));
      assert.ok(report.nativeFixture.names.includes("nested"));
      assert.equal(report.nativeFixture.fileSize, 12);
    },
  );
  await check(
    "Unapproved cleanup and arbitrary commands are refused",
    async () => {
      const refused = await page.evaluate(async () => {
        const attempt = async (action) => {
          try {
            await action();
            return false;
          } catch {
            return true;
          }
        };
        return [
          await attempt(() => window.macutility.execute("unapproved", false)),
          await attempt(() =>
            window.macutility.runMaintenance("homebrew-cleanup", false),
          ),
          await attempt(() =>
            window.macutility.runMaintenance("arbitrary-command", true),
          ),
        ];
      });
      assert.deepEqual(refused, [true, true, true]);
    },
  );
  await check(
    "Cancelled and unacknowledged maintenance do not run",
    async () => {
      const before = await page.evaluate(() => window.macutility.actionLog());
      for (const response of [0, 1]) {
        await app.evaluate(({ dialog }, response) => {
          dialog.showMessageBox = async () => ({
            response,
            checkboxChecked: false,
          });
        }, response);
        const result = await page.evaluate(() =>
          window.macutility.runMaintenance("mac-cleanup", true),
        );
        assert.match(result.output, /cancelled/);
        assert.deepEqual(
          await page.evaluate(() => window.macutility.actionLog()),
          before,
        );
      }
    },
  );
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.error = String(error);
  process.exitCode = 1;
} finally {
  if (app) await app.close().catch(() => {});
  report.finishedAt = new Date().toISOString();
  await writeFile(
    join(output, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  const lines = [
    "# MacUtility 0.1.2 Intel packaged-app report",
    `Result: ${report.passed ? "PASS" : "FAIL"}`,
    `Host: ${report.hostArchitecture}; macOS ${report.macOS}`,
    `Started: ${report.startedAt}`,
    "",
    ...report.checks.map(
      (item) =>
        `- ${item.passed ? "PASS" : "FAIL"}: ${item.name}${item.error ? " — " + item.error : ""}`,
    ),
    "",
    "Limitations:",
    ...report.limitations.map((item) => "- " + item),
    ...(report.error ? ["", report.error] : []),
  ];
  await writeFile(join(output, "REPORT.md"), lines.join("\n") + "\n");
  console.log(lines.join("\n"));
}
