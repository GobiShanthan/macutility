# Intel validation — MacUtility 0.1.4

**PASS: all 11 packaged-app checks.** Run on GitHub’s standard `macos-15-intel` runner, host x86_64, macOS 15.7.9. The job took 45 seconds; the app checks started at 22:45:11 UTC on November 2, 2026.

- [GitHub run and job summary](https://github.com/GobiShanthan/macutility/actions/runs/41539820131)
- [Tested release](https://github.com/GobiShanthan/macutility/releases/tag/v0.1.4) (tested while marked as a pre-release, then promoted to the latest stable release)
- [Detailed report](REPORT.md)
- [Machine-readable results](report.json)
- [Home screenshot](home.png)
- [Settings screenshot](settings.png)

Tested DMG SHA-256: `5dea906de13b1e544396786840b6c1f62de57577af35ebb4e9a08936e50ef773`. The workflow downloaded the release asset, verified that checksum, mounted the DMG, copied the app, and ran against the packaged executable and native addon. The application source was not uploaded.

The "Manual updates in free release" check was updated for 0.1.3+ behaviour: free builds now run automatic release discovery (`installation: "manual"`, starting in `idle`) instead of reporting `disabled`, and must never enter a download or install state.

The run used the public download repository and standard runner, which GitHub documents as free. Reports were downloaded before the three-day Actions artifact expiry and are preserved here.

This verifies execution on a GitHub-hosted Intel environment, beyond local Rosetta testing. It does not establish compatibility with every physical Intel Mac, every macOS version, or normal end-user Gatekeeper/quarantine installation. No whole-volume scan, destructive cleanup of real user data, or performance guarantee was tested.
