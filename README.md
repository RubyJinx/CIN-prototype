# CIN Prototype — Stakeholder Feedback Update

This version applies selected findings from the internal/user review while preserving the existing Figma-based visual language and prototype scope.

## Changes applied from Dulce's review
- Event host names now link to the matching organization page when that organization exists in the demo data.
- The event-submission confirmation now explains what a user could expect after review in a live system.
- Event submission now includes an optional simulated flyer attachment field. The demo records only the selected filename; no file is uploaded.
- Help / FAQ now includes a fictional Contact Us route for demonstrating support access.
- Bottom navigation has been visually strengthened without moving it away from the mobile-oriented bottom navigation pattern.
- Existing fictional-content and prototype disclaimers remain in place.

## Prototype behavior
This is still a static HTML/CSS/JavaScript prototype. Submitted events and flyer filenames exist only in the current browser session. No event, email, or file is sent to CWU.

## Push to GitHub

Replace the existing project files, then run:

```powershell
git add .
git commit -m "Apply stakeholder review feedback"
git push
```

GitHub Pages should redeploy automatically.
