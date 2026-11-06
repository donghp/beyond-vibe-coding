# BVC Task Management — Lesson Development and Evidence Register

**Register version:** 0.2.0  
**Status:** Working register — updated for Phase A A1–A4  
**Purpose:** Track lesson drafts, authentic screenshots, GAIS observations, and product/runtime dependencies.

---

## 1. Phase A — Meet AI & Build Your First App

| Lesson | Current status | Observed evidence | Remaining evidence before publication |
|---|---|---|---|
| A1 — Meet Google AI Studio | Partially evidenced | A1-02 actual scaffold Preview screenshot committed; Preview shows the required scaffold text. A1-01 filename is visible in a local VS Code Explorer screenshot, but the original image bytes are not yet committed. | Commit the actual A1-01 Apps landing screenshot; review A1 steps against the current GAIS interface. |
| A2 — Inspect Your First Web App Scaffold | Partially evidenced | Actual GAIS Code / File Explorer screenshot committed; visible entries include app/layout.tsx, app/page.tsx, app/globals.css, package.json, next.config.ts and tsconfig.json. | Inspect package.json and applicable lockfile/runtime evidence; verify exact installed versions and package-manager state. Do not infer these details from filenames or the Prompt #0002 summary. |
| A3 — Set Up Project Instructions | Partially complete — Prompt #0002 response received | GAIS Custom Instructions summary card screenshot committed; Human Owner supplied the full text response to all ten Prompt #0002 questions. AI reported no file changes, but its final statement says it inspected no files during that turn. | Reopen the full Instructions editor and confirm saved text; independently compare the before/after file tree; verify exact technology versions from actual project files separately. |
| A4 — Talk to AI Like a Teammate | Draft | Existing lesson content retained and expanded into the A4 position. | Capture an authentic GAIS conversation with the practice request and response; review the seven-step and Prompt Readiness Gate explanations with a beginner. |

### A3 evidence interpretation

The latest owner-supplied GAIS screenshot shows the Custom Instructions summary card after the editor was closed. It is OBSERVED evidence that the settings card is present; it does not show the complete text reopened for comparison.

The Human Owner also supplied the response to BVCTM-PROMPT-0002. The AI answered all ten questions and accurately restated the project purpose, Human Owner authority, Beginner boundary, Project Isolation Rule, verification distinctions, and stop conditions.

However, the AI described exact package/runtime versions as “Inspected & Verified” and then stated that it had inspected no project files during that turn. Those exact technology details are therefore NOT VERIFIED by the understanding-check response.

The AI self-reported that no files changed. The independent before/after File Explorer or diff comparison remains NOT VERIFIED.

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

- **Planned:** accepted as a learning destination; lesson instructions or implementation are not complete.
- **Draft:** lesson content exists but requires practical review.
- **Evidence Required:** actual UI, save, runtime, or behavior evidence is missing.
- **Ready for Review:** instructions, screenshots, links, and checks have been reviewed and verified.
- **Published:** merged into the canonical repository branch by the Human Owner.

## 6. Release rule

Do not mark a lesson Published merely because a Markdown file exists.

A lesson with unverified controls, missing authentic screenshots, incomplete prompt evidence, unresolved decisions, or untested application behavior remains Draft or Evidence Required.

A successful build is not proof of product behavior. A design package is not proof of runtime implementation. AI's final response is not Human Owner acceptance.
