# EC-GITHUB-PAGES-DEMO-HARDENING-001

## Repository Preflight Findings
- The application is a standalone Single Page Application (SPA) located in the `/carbon` directory.
- It uses modular JavaScript (ESM).
- Data loading uses `fetch` with relative paths.
- No existing GitHub Pages workflow was present.
- Standalone static hosting is feasible.

## Deployment Model
- GitHub Actions Pages deployment using a minimal workflow.
- Branch: `main`
- Artifact path: `dist`
- Target: `/carbon/` folder deployed to GitHub Pages.

## Deployment Hardening
- Routing: Implemented hash-based routing in `/carbon/app/router.js` to support deep-linking and static hosting fallback.
- Data Loading: Data paths were already relative (`fetch('./...')`), which works under hash-based routing.
- App Shell: `app.js` updated to initialize state from URL hash.
- Workflow: Created `.github/workflows/deploy.yml` for automated deployment.
- Testing: Implemented `TC-PAGES-001` through `TC-PAGES-024` in `test-github-pages-demo.js`.

## Status
GITHUB_PAGES_DEMO_HARDENING_ALIGNED
