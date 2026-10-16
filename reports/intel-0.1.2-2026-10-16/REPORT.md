# MacUtility 0.1.2 Intel packaged-app report
Result: PASS
Host: x86_64; macOS 15.7.9
Started: 2026-10-16T14:52:44.161Z

- PASS: Bundle integrity
- PASS: Packaged license and notices
- PASS: Packaged Intel app launches
- PASS: Intel architecture and version
- PASS: Home screen renders
- PASS: Renderer Node isolation
- PASS: Real disk information
- PASS: Manual updates in free release
- PASS: Native scanner enumerates temporary fixture on x64
- PASS: Unapproved cleanup and arbitrary commands are refused
- PASS: Cancelled and unacknowledged maintenance do not run

Limitations:
- No physical end-user Mac or downloaded-app Gatekeeper experience is certified.
- Cleanup safeguards are tested by refusal/cancellation; no real user data is removed.
- No whole-volume scan or performance guarantee is tested.
