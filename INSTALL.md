# Install and update MacUtility

The $0 release is not signed with an Apple Developer ID and is not notarized by Apple. Ad-hoc signing is used for local bundle integrity, not publisher verification. macOS may warn or prevent it from opening. A checksum can detect changes against the published value; it is not proof of publisher identity or harmlessness.

1. Use the official GitHub release: https://github.com/GobiShanthan/macutility/releases/latest.
2. Choose arm64 for Apple Silicon or x64 for Intel. Check the release notes for the tested macOS version and known limitations; architecture support is not proof of testing on every Mac.
3. Open the DMG and drag MacUtility to Applications. Review LICENSE, TERMS.md, and PRIVACY.md before cleanup.
4. If macOS blocks an unidentified/unnotarized app, read Apple's guidance and proceed only if you trust the source: https://support.apple.com/en-us/102445. Managed Macs may not allow an exception. Do not disable Gatekeeper globally. Do not ignore a malware, damaged-app, or tampering alert.

## Manual updates

In Settings choose Open download page. Download the newer build for your architecture, quit MacUtility after any active operation finishes, and replace the app in Applications. The $0 build does not check for or install updates automatically. Keep a current backup before cleanup; updating the app does not recover previously deleted files.

## Support

Contact gobishanthan04@gmail.com. Include version, architecture, macOS version, and the error message. Redact personal paths and credentials. Do not send complete disk inventories or private files.
