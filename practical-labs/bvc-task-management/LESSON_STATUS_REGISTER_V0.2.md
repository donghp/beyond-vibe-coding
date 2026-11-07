# BVC Task Management — Lesson Development and Evidence Register

**Register version:** 0.2.0  
**Status:** Working register — updated for Phase A A1–A4  
**Purpose:** Track lesson drafts, authentic screenshots, GAIS observations, and product/runtime dependencies.

---

## 1. Phase A — Meet AI & Build Your First App

| Lesson | Current status | Observed evidence | Remaining evidence before publication |
|---|---|---|---|
| A1 — Meet Google AI Studio | Partially evidenced | A1-02 actual scaffold Preview screenshot is committed in this PR; it shows the expected scaffold text. A1-01 Apps landing image remains OWNER-REPORTED / not committed. | Commit the original A1-01 Apps landing screenshot when available; confirm the current GAIS navigation and app-creation checkpoints. |
| A2 — Inspect Your First Web App Scaffold | Partially evidenced | Actual GAIS Code / File Explorer screenshot is committed in this PR. Visible entries include app/page.tsx, app/layout.tsx, app/globals.css, package.json, next.config.ts, and tsconfig.json. | Inspect the actual package.json and applicable lockfile; verify exact installed versions, package manager, scripts, build command, and export outcome only if available. Do not infer them from filenames or Prompt #0002. |
| A3 — Set Up Project Instructions | Evidence review in progress | OWNER-CONFIRMED: Human Owner confirms Save changes. OBSERVED: Custom Instructions summary-card image is committed in this PR. RESPONSE RECEIVED: Human Owner supplied the ten-part Prompt #0002 response. Its exact technology-version claims remain NOT VERIFIED because the same response says no project files were read. | Reopen the full Instructions editor to confirm saved text; independently compare the file tree/change history before and after Prompt #0002; verify technical versions against actual manifests/runtime. A3-03 response screenshot is not supplied; A3-04 file-integrity comparison remains NOT VERIFIED. |
| A4 — Talk to AI Like a Teammate | Draft / Prompt prepared | BVCTM-PROMPT-0003 is prepared as a read-only task-understanding and planning exercise. It separates permission to analyze the example from authorization to implement it. | Run the complete prompt in the existing BVC Task Management GAIS Chat; review the actual response; capture A4-01 response and A4-02 file-view evidence; verify no project files were changed. |

### A3 evidence interpretation

The Human Owner confirms that Save changes was completed, and a supplied follow-up screenshot shows the GAIS Chat settings **Custom instructions** card with the BVC Task Management instructions preview. Record the save as **OWNER-CONFIRMED** and the visible card as **OBSERVED** evidence.

The Human Owner also supplied the response to BVCTM-PROMPT-0002. The response explains the project rules, but it presents detailed technology-version claims while also stating that no project files were read during that turn. Those technical claims remain **NOT VERIFIED** until checked against the actual manifests or runtime.

GAIS reported that no files were changed. An independent before/after file-tree comparison or equivalent change evidence remains pending. An AI statement alone is not an independent file-integrity check.

Those remain NOT VERIFIED until the corresponding evidence is supplied.

## 2. Phase B — Build Your First Task

| Lesson | Status | Required dependency / evidence |
|---|---|---|
| B1 — Create Your First Task | Planned | Approved First Vertical Slice implementation exists; title-only task creation works in Preview. |
| B2 — Save Your Task | Planned | Save behavior is implemented and a truthful save result is verified. |
| B3 — Close and Reopen | Planned | Same-browser-profile reload/reopen confirms the task remains available. |
| B4 — Improve One Small Thing | Planned | A bounded change is made and a regression check proves the original flow still works. |

**Gate:** Phase B remains a separate product implementation milestone requiring its applicable approved Task Contract, product/UX checks, and runtime evidence.

## 3. Phase C — Make It Useful Every Day

| Lesson group | Status | Required dependency / evidence |
|---|---|---|
| C1 — My Day | Planned | Approved date/Focus behavior and actual implementation evidence. |
| C2 — My Tasks | Planned | Approved task behavior, search/filter, status, and priority checks. |
| C3 — Projects | Planned | Approved project behavior and removal semantics. |
| C4 — Templates | Planned | Approved Starter Kit package and repeat-application behavior. |
| C5 — Settings & Backup | Planned | Approved preferences, export, restore, and conflict behavior; synthetic-data tests. |
| C6 — Responsive & Everyday Use | Planned | UX decision reconciliation, supported viewport matrix, real-device/browser evidence, and accessibility review. |

## 4. Phase D — Beyond Beginner

| Lesson | Learning level | Status | Required dependency / evidence |
|---|---|---|---|
| D1 — Understand Relational Data | Intermediate | Planned | Reviewed learning material and synthetic examples. |
| D2 — Connect a Database | Intermediate | Planned | Approved Supabase implementation scope and verified environment. |
| D3 — Authentication and Data Security | Intermediate | Planned | Approved Auth decision, recovery flow, RLS implementation, and positive/negative access tests. |
| D4 — GitHub and Source Control | Advanced | Planned | Tested repository, branch, commit, and Pull Request learning workflow. |
| D5 — Local Development and Testing | Advanced | Planned | Verified scaffold, supported local setup, tests, and CI evidence. |
| D6 — Deployment and Maintenance | Advanced | Planned | Approved hosting example, environment controls, release authority, and live smoke-test evidence. |

## 5. Status definitions

- **OWNER-CONFIRMED:** the Human Owner reports that an action was completed; record it separately from independent verification.
- **OBSERVED:** visible in an authentic screenshot or actual file.
- **VERIFIED:** a behavior or check was actually performed and its result recorded with evidence.
- **UNKNOWN / NOT VERIFIED:** not established by the available evidence.
- **Planned:** accepted as a learning destination; lesson instructions or implementation are not complete.
- **Draft:** lesson content exists but requires practical review.
- **Evidence Required:** actual UI, save, runtime, or behavior evidence is missing.
- **Ready for Review:** instructions, screenshots, links, and checks have been reviewed and verified.
- **Published:** merged into the canonical repository branch by the Human Owner.

## 6. Release rule

Do not mark a lesson Published merely because a Markdown file exists.

A lesson with unverified controls, missing authentic screenshots, incomplete prompt evidence, unresolved decisions, or untested application behavior remains Draft or Evidence Required.

A successful build is not proof of product behavior. A design package is not proof of runtime implementation. AI's final response is not Human Owner acceptance.
