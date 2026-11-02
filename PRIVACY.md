# MacUtility privacy notice

Published October 16, 2026. This notice describes the current MacUtility desktop app and simulated browser interface. It does not describe a future AI or paid service, or the separate portfolio website's hosting and analytics.

Publisher and privacy contact: Gobishanthan, Markham, Ontario, Canada.
Email: gobishanthan04@gmail.com.

## Files and metadata on your Mac

The desktop scanner reads metadata including names, paths, sizes, timestamps, device/file identifiers, and application-bundle information. Paths and names can reveal sensitive information. Scanning does not read file contents and does not upload the inventory.

The app stores its latest bounded scan inventory and up to 30 summaries in scan-history.json; removal preferences in settings.json; and targets, timestamps, results, and some command/error details in action-log.jsonl. These are stored in Electron's per-user application-data directory, normally ~/Library/Application Support/MacUtility/ in packaged macOS builds. Theme preferences are stored in local browser storage. The app does not encrypt these records itself; local account/device protections and backups still matter.

Completed scans replace the prior inventory and retain up to 30 history summaries. The activity log has no automatic expiry. Settings and local records can remain after uninstalling. To reset them, quit the app and inspect its own application-data directory in Finder before removing that directory. This deletes its settings, inventory, and activity records; it does not restore cleaned files. Verify the directory belongs to MacUtility. Update caches and macOS diagnostic records may be stored separately, and backups may retain older copies.

## Updates and third-party connections

The free build checks GitHub's public latest-stable-release API about ten seconds after launch, every six hours while running, and when you choose Check for Updates. These requests include the app version in a User-Agent header and ordinary connection information. No GitHub login or token is sent. Draft and prerelease builds are not offered as stable updates. Checks have a ten-second timeout; connection errors and rate limits are shown in Settings.

A newer compatible release is announced in the app with plain-text release notes and a Download latest version link to the official GitHub release page. Downloads and installation remain manual: quit MacUtility after active operations finish, then replace the app in Applications. No binary is automatically downloaded or installed by this discovery feature. There is currently no separate switch to disable automatic checks; quitting the app stops them. The browser demo and unpackaged development builds do not make automatic release checks.

GitHub and its delivery infrastructure receive ordinary connection/request information such as IP address and request headers. Update requests do not include your scan inventory, scanned paths, or file contents. Third-party tools invoked through Maintenance may make their own connections under their own policies.

MacUtility has no built-in account, advertising, analytics, AI, payment processing, or automatic diagnostic-upload service. This does not mean GitHub, email providers, hosting services, or macOS collect no information. GitHub's privacy statement is available at https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement.

## Browser demo

The browser demo simulates storage, scanning, and cleanup; it does not scan the visitor's filesystem. It stores theme preferences locally. Its hosting provider receives normal web requests. A portfolio website embedding the demo may have additional cookies, analytics, or hosting logs, which are outside this app notice and need their own disclosure.

## Support and privacy requests

If you email gobishanthan04@gmail.com, the correspondence you choose to send is handled through Gmail and may contain your address, device details, and diagnostics. It is used to respond to your request, investigate issues, and maintain related support/security records. Email providers may process information outside Canada. Do not send passwords, full inventories, or unrelated sensitive files; redact paths and screenshots first. Public GitHub issues are public and are handled by GitHub under its policies.

Contact the same email to request information, access, correction, or deletion of personal information held through support, subject to applicable law and necessary legal/security retention. Correspondence is retained as needed to handle the request and related security or legal obligations; request deletion if you no longer want it retained. The publisher cannot remotely retrieve or erase scan records that remain solely on your Mac. You may also raise a concern with the applicable privacy regulator, including the Office of the Privacy Commissioner of Canada at https://www.priv.gc.ca/en/report-a-concern/.

## Changes

This notice will be revised if actual data handling changes. New AI, telemetry, account, or cloud processing requires its own disclosure and any consent required by law before that processing begins. This notice does not authorize those future uses.
