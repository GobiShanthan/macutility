# MacUtility

A little more room. A local-first macOS storage utility built by Gobishanthan.

## Download and installation

Download official builds from [GitHub Releases](https://github.com/GobiShanthan/macutility/releases/latest). Choose Apple Silicon (arm64) or Intel (x64) to match your Mac. Open the DMG and drag MacUtility to Applications. Only install releases from sources you trust. The $0 release is not Apple Developer ID signed or notarized; macOS may warn or block it. See [installation guidance](INSTALL.md).

## What it does

- Scans reachable startup-disk metadata and shows storage categories, file search, and an app inventory.
- Keeps scan history and action logs locally.
- Lets you review supported cleanup items with Trash as the default, with an optional permanent-deletion mode.
- Offers cache/log maintenance and separately confirmed developer-tool cleanup commands.
- Automatically discovers newer stable releases, with release notes and a download link. Download and replacement of the app remain manual.

## Before cleanup

**Cleanup can cause data loss or interrupt apps. Keep a current, tested backup and close affected apps first.** Review the selected paths and consequences. Safe labels describe normal cache/log eligibility, not a guarantee against harm. Scans can be incomplete and size estimates do not guarantee reclaimed space.

Trash recovery is not guaranteed. Permanent deletion bypasses Trash. Developer maintenance commands can permanently remove resources, including Docker data, regardless of the Trash setting. Administrator app removal may not support Finder’s Put Back feature.

The current app does not upload your files or scan results. Release checks at startup and every six hours contact GitHub with the app version and ordinary connection information; opening the download page also contacts GitHub. Scan history and activity logs can contain private paths and may remain after uninstalling. Do not publish unredacted diagnostics in public issues.

## License, privacy, and contact

MacUtility is proprietary. Official precompiled releases are licensed for personal, non-commercial use only. Source code is not included or licensed for public use. Third-party components retain their own licenses. See [LICENSE](LICENSE).

Read the [license and safety information](TERMS.md) and [privacy notice](PRIVACY.md) before installing or using cleanup. Publisher: Gobishanthan, Markham, Ontario, Canada. Support, privacy, and legal contact: [gobishanthan04@gmail.com](mailto:gobishanthan04@gmail.com). Future paid or AI services require separate disclosures and authorization; this edition does not authorize charges or AI uploads.
