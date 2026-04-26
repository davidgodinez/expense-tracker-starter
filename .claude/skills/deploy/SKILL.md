---
name: deploy
description: Deploy the finance-tracker app. Runs the full test suite, builds the production bundle, then pushes the build to the staging area. Use when the user says "deploy", "ship to staging", or asks to run a deploy.
---

# Deploy

Use this skill when the user asks to deploy, ship, or release the app to staging.

Execute these steps in order. If any step fails, stop and report the failure to the user — do not continue to later steps.

## 1. Run all tests

```bash
npm test
```

If the project has no test script configured (per `CLAUDE.md`, no test framework is currently set up), report this to the user and ask whether to proceed without tests before continuing.

## 2. Build the production bundle

```bash
npm run build
```

This produces the optimized bundle in `dist/`. Confirm the build completed without errors before moving on.

## 3. Push to staging

Push the freshly built `dist/` to the staging area. The exact command depends on how staging is configured for this project — check for any of:

- a `deploy:staging` / `deploy` npm script in `package.json`
- a `STAGING_*` env var or staging config in the repo
- a documented staging target in `README.md` or `CLAUDE.md`

If none is configured, ask the user where staging lives (S3 bucket, rsync target, hosting provider, branch, etc.) before pushing. Do not invent a destination.

## Reporting back

After all three steps succeed, report:

- test result summary
- build output size or asset count
- staging URL or destination the bundle was pushed to
