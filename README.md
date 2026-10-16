# MacUtility

Make a little more room on your Mac. MacUtility helps you review storage and
choose what, if anything, to move to Trash.

## Download

- [Apple silicon](https://github.com/GobiShanthan/macutility/releases/latest/download/MacUtility-0.1.1-arm64.dmg)
- [Intel](https://github.com/GobiShanthan/macutility/releases/latest/download/MacUtility-0.1.1.dmg)

Open the downloaded DMG and drag MacUtility to Applications. This build is not
signed or notarized, so macOS may warn when you first open it. Only open the
app if you trust this publisher.

## What it does

- Scans folders you explicitly choose and keeps scan data on your Mac.
- Lets you review files before taking action.
- Moves selected eligible downloads to Trash only after confirmation.
- Never permanently deletes files.

Scanning does not change files. Storage figures are estimates and do not
promise how much space emptying Trash will recover.

## License

MacUtility is proprietary. Official precompiled releases are licensed for
personal, non-commercial use only. The source code is not included or licensed
for public use. See [LICENSE](LICENSE) for the full terms.

## Intel 0.1.2 validation candidate

The [0.1.2 Intel candidate](https://github.com/GobiShanthan/macutility/releases/tag/v0.1.2-rc.1) passed all 11 packaged-app smoke checks on GitHub's standard Intel macOS 15.7.9 runner. It is a prerelease and does not replace the stable download above. See the [report and screenshots](reports/intel-0.1.2-2026-10-16/README.md).

The candidate adds optional permanent deletion and developer maintenance; those operations can permanently remove data. Keep a current, tested backup. Read the candidate's [license/safety information](TERMS.md), [privacy notice](PRIVACY.md), and [installation guidance](INSTALL.md). The candidate uses ad-hoc signing and manual updates, without Developer ID or notarization.
