# Intel validation — MacUtility 0.1.2

**PASS: all 11 packaged-app checks.** Run on GitHub’s standard `macos-15-intel` runner, host x86_64, macOS 15.7.9. The job took 38 seconds; the app checks ran from 14:52:44–14:52:49 UTC on October 16, 2026.

- [GitHub run and job summary](https://github.com/GobiShanthan/macutility/actions/runs/38919260870)
- [Tested Intel prerelease](https://github.com/GobiShanthan/macutility/releases/tag/v0.1.2-rc.1)
- [Detailed report](REPORT.md)
- [Machine-readable results](report.json)
- [Home screenshot](home.png)
- [Settings screenshot](settings.png)

Tested DMG SHA-256: `e9971e211fe37ad32d29a68dd39dbfaf411bb0ed5e886ab677dac348b943228a`. The workflow downloaded the approved candidate, verified that checksum, mounted the DMG, copied the app, and ran against the packaged executable and native addon. The application source was not uploaded.

The run used the existing public download repository and standard runner, which GitHub documents as free. No private-repository job, larger paid runner, or billing-setting change was used. Reports were downloaded before the three-day Actions artifact expiry and are preserved here.

This verifies execution on a GitHub-hosted Intel environment, beyond local Rosetta testing. It does not establish compatibility with every physical Intel Mac, every macOS version, or normal end-user Gatekeeper/quarantine installation. No whole-volume scan, destructive cleanup of real user data, or performance guarantee was tested.
