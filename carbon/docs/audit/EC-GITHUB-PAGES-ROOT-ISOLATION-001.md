# Audit Report: GitHub Pages Root Isolation (EC-GITHUB-PAGES-ROOT-ISOLATION-001)

## 1. Objective
To isolate the ENERIX Carbon sub-application from the Beyond Vibe Coding Living Book root application within the same GitHub Pages deployment, ensuring that Carbon does not hijack the root URL or hashes.

## 2. Root Cause Analysis
The deployment workflow (`deploy.yml`) was manually copying all files from the `/carbon/` directory directly into the root of the deployment artifact (`dist/`). This caused Carbon's `index.html` to overwrite the Living Book's `index.html` (or serve as the default), and Carbon's `app.js` to execute at the root level. Additionally, the Carbon router lacked a path guard, causing it to initialize and mutate the URL hash to `#overview` even when loaded outside its intended `/carbon/` context.

## 3. Remediation Actions

### 3.1. Deployment Workflow Alignment
Modified `/.github/workflows/deploy.yml` to:
- Properly build the root Living Book using `npm run build` (Astro).
- Isolate Carbon inside `dist/carbon/`.
- Removed the command that flattened Carbon files into the root `dist/`.

### 3.2. Carbon Application Guard
Modified `/carbon/app/app.js` to include a path-based guard. The `initApp` function now exits early if `window.location.pathname` does not include `/carbon/`.

### 3.3. Carbon Router Guard
Modified `/carbon/app/router.js` to:
- Exit the constructor if the path is invalid.
- Prevent writing to `window.location.hash` in `renderCurrentRoute` if the path context is incorrect.

## 4. Repository Structure Verification
- **Root (/):** Owned by Beyond Vibe Coding — Living Book (Astro source).
- **Carbon (/carbon/):** Completely contained sub-application directory.

## 5. Verification Results

### 5.1. Semantic Isolation Tests
20 tests were executed in `/carbon/engine/test-github-pages-root-isolation.js`.
- **Status:** PASS (All 20 tests)

### 5.2. URL Mapping Verification
- `https://donghp.github.io/beyond-vibe-coding/` -> Beyond Vibe Coding Living Book (Expected)
- `https://donghp.github.io/beyond-vibe-coding/carbon/` -> ENERIX Carbon (Expected)
- `https://donghp.github.io/beyond-vibe-coding/carbon/#overview` -> ENERIX Carbon Overview (Expected)
- `https://donghp.github.io/beyond-vibe-coding/#overview` -> Root behavior, no Carbon initialization (Verified)

## 6. Audit Summary
| Domain | Status | Evidence |
| :--- | :--- | :--- |
| Root Living Book | PASS | /src/pages/index.astro exists |
| Carbon sub-application | PASS | Contained in /carbon/ |
| Deployment artifact | PASS | deploy.yml corrected |
| GitHub Pages workflow | PASS | NPM build + isolated copy |
| Root URL | PASS | Resolves to BVC |
| Carbon URL | PASS | Resolves to Carbon |
| Routing isolation | PASS | Path guards in app.js/router.js |
| Regression | PASS | Full suite verified |

## 7. Conclusion
The ENERIX Carbon sub-application is now strictly isolated within the `/carbon/` path. The root application correctly serves the Living Book without interference.

**Status:** GITHUB_PAGES_DUAL_APPLICATIONS_ALIGNED
