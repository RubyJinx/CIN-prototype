# CIN Prototype — Submit Organization Update

This version extends the stakeholder-reviewed CIN prototype with a simulated organization-submission workflow.

## Added
- "Submit Your Organization" button on the Organizations page
- "Submit Your Organization" option in the hamburger menu
- Organization submission form
- Organization category, description, meeting information, contact email, website/social link, accessibility information, and optional image field
- Simulated review acknowledgement
- Confirmation screen with next-step messaging
- Submitted organizations temporarily appear in the Organizations directory
- Submitted organizations can be opened like other organization profiles
- Selected logo/image filename is displayed for prototype testing only

## Prototype behavior
Submitted organizations exist only in the current browser session. No form content, email, image, or organization record is actually sent to CWU.

## Push to GitHub

Replace the existing project files, then run:

```powershell
git add .
git commit -m "Add organization submission prototype"
git push
```

GitHub Pages should redeploy automatically.
