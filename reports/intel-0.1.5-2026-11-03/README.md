# Intel validation — MacUtility 0.1.5

**PASS: all 11 packaged-app checks.** Run on GitHub’s standard `macos-15-intel` runner, host x86_64, macOS 15.7.9. The job took 65 seconds; the app checks started at 00:23:43 UTC on November 3, 2026.

- [GitHub run and job summary](https://github.com/GobiShanthan/macutility/actions/runs/41552456075)
- [Tested release](https://github.com/GobiShanthan/macutility/releases/tag/v0.1.5) (tested while marked as a pre-release, then promoted to the latest stable release)
- [Detailed report](REPORT.md)
- [Machine-readable results](report.json)
- [Home screenshot](home.png)
- [Settings screenshot](settings.png)

Tested DMG SHA-256: `53ee3fb77d442637c85794310196e485ab73694db36cf0e2c584f155edc91dfa`. The workflow downloaded the release asset, verified that checksum, mounted the DMG, copied the app, and ran against the packaged executable and native addon. The application source was not uploaded.

The test launches the app with `MACUTILITY_SKIP_INSTALL_PROMPTS=1`, because the runner's copy lives in a temporary folder and 0.1.5 otherwise offers to move itself into Applications. The install prompts themselves were tested separately on Apple Silicon.

The run used the public download repository and standard runner, which GitHub documents as free. Reports were downloaded before the three-day Actions artifact expiry and are preserved here.

This verifies execution on a GitHub-hosted Intel environment, beyond local Rosetta testing. It does not establish compatibility with every physical Intel Mac, every macOS version, or normal end-user Gatekeeper/quarantine installation. No whole-volume scan, destructive cleanup of real user data, or performance guarantee was tested.
