# BVC Task Management — Lesson Development and Evidence Register

**Register version:** 0.2.0  
**Status:** Working register — updated for Phase A A1–A4  
**Purpose:** Track lesson drafts, authentic screenshots, GAIS observations, and product/runtime dependencies.

---

## 1. Phase A — Meet AI & Build Your First App

| Lesson | Current status | Observed evidence | Remaining evidence before publication |
|---|---|---|---|
| A1 — Meet Google AI Studio | Learning outcome evidenced | A1-01 authentic GAIS Apps landing PNG and A1-02 actual scaffold Preview JPG are committed on main (PR #37). The screenshots show the app entry point and expected blank scaffold heading. | No missing screenshot asset is currently known. Confirm interface labels against the reader's current GAIS account because the UI may change. |
| A2 — Inspect Your First Web App Scaffold | Core visual inspection evidenced; technical profile NOT VERIFIED | A2-01 authentic GAIS Code / File Explorer JPG is committed on main; it shows the scaffold tree and app/page.tsx with the scaffold heading. A4-02 later shows the core tree again with app/layout.tsx selected. | The actual package.json, bun.lock, runtime, scripts, build/export behavior have not been independently inspected and recorded. Do not infer exact versions or package-manager actions from screenshots or Prompt #0002. The separate BVC-TM-TC-003 scaffold inspection/inventory remains NOT_STARTED_OR_NOT_EVIDENCED in the Task Execution Register. |
| A3 — Set Up Project Instructions | Evidence review in progress | OWNER-CONFIRMED: Human Owner confirms Save changes. OBSERVED: supplied A3-02 screenshot shows the populated Instructions editor and disabled Save changes control. RESPONSE RECEIVED: ten-part Prompt #0002 response and GAIS screenshot showing the response beside Code view were supplied. Gemini's exact framework/dependency claims remain NOT VERIFIED because the response says no project files were read. | Reopen the full Custom Instructions editor after closing it to verify the saved text remains present. Independently compare the A2 and A3 Code/File Explorer evidence or a before/after file-change record; screenshots are visual evidence, not a binary diff. Keep technical versions UNKNOWN until actual manifests/runtime are inspected. |
| A4 — Talk to AI Like a Teammate | Learning exercise completed; evidence published on main (PR #41 merged) | OWNER-SUPPLIED: full BVCTM-PROMPT-0003 response. REVIEWED: all eight required sections; read-only analysis READY and implementation NOT READY / NOT AUTHORIZED. OBSERVED: A4-01 Preview/response screenshot and A4-02 Code/File Explorer screenshot with app/layout.tsx selected. Both original PNGs are published on main by PR #41. | Independent before/after file-content integrity remains NOT VERIFIED; A4-02 is a visual post-exercise observation only. |

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


### Phase A closure and Phase B entry gate

Phase A has produced the four practical learning outcomes, but its evidence/release status is not yet fully closed:

- A1: A1-01 and A1-02 authentic screenshots are published on main.
- A2: The blank Preview and scaffold file tree are evidenced. Exact framework/runtime/dependency/package-manager/build facts remain NOT VERIFIED; do not invent them.
- A3: Save action is OWNER-CONFIRMED and the populated Instructions editor is OBSERVED. The full close/reopen check and independent before/after file-integrity evidence remain open.
- A4: The read-only learning exercise is complete; all eight response sections were reviewed. The original A4-01/A4-02 PNGs are in PR #41 and await merge to main. Independent file integrity remains NOT VERIFIED.

**Phase B implementation is not automatically authorized by completing Phase A.** Before implementing the First Vertical Slice:

1. Complete or formally reconcile the approved GAIS scaffold-inspection contract BVC-TM-P3.3-003. The current Task Execution Register records its execution as NOT_STARTED_OR_NOT_EVIDENCED; the practical GAIS app and screenshots do not, by themselves, satisfy its required report/inventory outputs.
2. Inspect the actual scaffold and record the manifest, applicable lockfile, framework/runtime, scripts, build/export behavior, and any UNKNOWN fields in the authorized scaffold inventory.
3. Review the applicable Phase 3.1 UX and Product/UX decisions. Formal Phase 3.1 UX Acceptance remains OPEN. DR-005 (first-use storage disclosure) remains OPEN and is a prerequisite for dependent onboarding copy. DR-014 is ACCEPTED FOR DESIGN only; browser persistence still requires runtime verification.
4. Create and obtain Human Owner approval for a separate bounded First Vertical Slice implementation Task Contract. Existing Task Contracts #001 and #002 cover readiness documentation/metadata; #003 covers blank scaffold inspection. None authorizes task feature implementation.
5. Define CREATE / MODIFY / DELETE scope, acceptance criteria, verification steps, recovery, and the permitted learner-facing steps before write-capable implementation.

Phase B may begin with read-only preparation while these gates are resolved. Do not write application code, claim persistence, or mark B1 implementation ready until the applicable gates and the new Task Contract are approved.

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
