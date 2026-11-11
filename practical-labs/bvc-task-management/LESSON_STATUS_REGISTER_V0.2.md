# BVC Task Management — Lesson Development and Evidence Register

**Register version:** 0.2.0  
**Status:** Working register — updated for Phase A A1–A4  
**Purpose:** Track lesson drafts, authentic screenshots, GAIS observations, and product/runtime dependencies.

---

## 1. Phase A — Meet AI & Build Your First App

| Lesson | Current status | Observed evidence | Remaining verification / follow-up (not all block lesson completion) |
|---|---|---|---|
| A1 — Meet Google AI Studio | Learning outcome evidenced | A1-01 authentic GAIS Apps landing PNG and A1-02 actual scaffold Preview JPG are committed on main (PR #37). The screenshots show the app entry point and expected blank scaffold heading. | No missing screenshot asset is currently known. Confirm interface labels against the reader's current GAIS account because the UI may change. |
| A2 — Inspect Your First Web App Scaffold | Source inventory completed; Owner accepted with known limitations | A2-01/A4-02 authentic GAIS screenshots and the Owner-supplied source ZIP (18 files; SHA-256 recorded in the canonical report) are published/evidenced through merged PR #51. The report/inventory record Next.js ^15.4.9, React ^19.2.1, TypeScript 5.9.3, scripts/configuration, empty bun.lock and the ESLint major-version mismatch. | GAIS app-type label and live external connection/secrets panel remain NOT_VERIFIED. VC-006/VC-007 were NOT_RUN and were not marked PASS. Human Owner explicitly closed Task #003 with these limitations on 2026-11-11. |
| A3 — Set Up Project Instructions | LEARNING EXERCISE COMPLETED | OWNER-CONFIRMED: Human Owner confirms the Project Instructions were saved successfully. OBSERVED: original A3-02 screenshot shows the populated editor and disabled Save changes control; follow-up screenshot supplied 2026-11-10 shows the Instructions panel still populated and Save changes disabled. RESPONSE RECEIVED + REVIEWED: ten-part Prompt #0002 response and GAIS screenshot showing the response beside Code view. | The follow-up screenshot is supplied in conversation but its binary is not yet committed as a repository asset. The exact close/reopen sequence is not independently established by the screenshot. Independent before/after file integrity remains NOT VERIFIED. Gemini's exact framework/dependency claims remain NOT VERIFIED because the response says no project files were read. These are supplementary verification limits, not blockers to A3 learning completion. |
| A4 — Talk to AI Like a Teammate | Learning exercise completed; evidence published on main (PR #41 merged) | OWNER-SUPPLIED: full BVCTM-PROMPT-0003 response. REVIEWED: all eight required sections; read-only analysis READY and implementation NOT READY / NOT AUTHORIZED. OBSERVED: A4-01 Preview/response screenshot and A4-02 Code/File Explorer screenshot with app/layout.tsx selected. Both original PNGs are published on main by PR #41. | Independent before/after file-content integrity remains NOT VERIFIED; A4-02 is a visual post-exercise observation only. |

### A3 evidence interpretation

The Human Owner confirms that the BVC Task Management Project Instructions were saved successfully. The follow-up screenshot supplied on 2026-11-10 shows the GAIS **Instructions** panel populated with the project rules and the **Save changes** control disabled. Record the save as **OWNER-CONFIRMED** and the visible panel as **OBSERVED** evidence. This is sufficient to close the A3 learning exercise together with the completed BVCTM-PROMPT-0002 understanding check.

The screenshot does not, by itself, establish the exact close/reopen sequence or prove that every line was independently re-read after a fresh reopen. Keep that stronger persistence claim **NOT VERIFIED** unless separately evidenced.

The Human Owner also supplied the response to BVCTM-PROMPT-0002. The response explains the project rules, but it presents detailed technology-version claims while also stating that no project files were read during that turn. Those technical claims remain **NOT VERIFIED** until checked against the actual manifests or runtime.

GAIS reported that no files were changed. An independent before/after file-tree comparison or equivalent change evidence remains **NOT VERIFIED**. An AI statement alone is not an independent file-integrity check. These evidence limits remain visible but do not block A3 learning completion.

## 2. Phase B — Build Your First Task

| Lesson | Status | Required dependency / evidence |
|---|---|---|
| B1 — Create Your First Task | Contract BVC-TM-TC-004 Revision 1 approved; implementation NOT_STARTED | Contract authorizes MODIFY app/page.tsx only in the existing GAIS app. Contract #004 and Prompt #0004 are now canonical on main through PR #53. First verify the existing GAIS app identity and current app/page.tsx; if it matches the expected scaffold, run BVCTM-PROMPT-0004. Stop if materially different. Verify title-only creation, list display, empty-title validation, Enter submission and in-memory-only behavior in GAIS Preview. |
| B2 — Save Your Task | Planned — gated | Resolve DR-005 first-use storage disclosure and approve a separate B2 implementation scope; then verify actual browser persistence. |
| B3 — Close and Reopen | Planned — depends on B2 | Same app origin and browser profile must show the exact saved task after reload/reopen. |
| B4 — Improve One Small Thing | Planned — depends on B1–B3 | One bounded, approved improvement is made; relevant B1–B3 regression checks pass. |

**Gate:** Task #003 is COMPLETED_ACCEPTED by explicit Owner decision with known limitations recorded in the report, inventory and Task Execution Register. B1 Contract BVC-TM-TC-004 Revision 1 is approved by the Human Owner; publication and GAIS execution are still pending. B2 remains blocked until DR-005 is resolved and a separate B2 Task Contract is approved. Publishing a Contract or lesson does not prove application behavior.


### Phase A closure and Phase B entry gate

**Phase A learning path is COMPLETED (A1–A4).**

- A1: A1-01 and A1-02 authentic screenshots are published on main.
- A2: The blank Preview and scaffold file tree are evidenced. Exact framework/runtime/dependency/package-manager/build facts remain NOT VERIFIED; do not invent them.
- A3: Learning exercise completed. Save is OWNER-CONFIRMED; the new Instructions screenshot is OBSERVED; Prompt #0002 response received and reviewed. Exact close/reopen sequence and independent before/after file integrity remain NOT VERIFIED as supplementary checks.
- A4: The read-only learning exercise is complete; all eight response sections were reviewed. Original A4-01/A4-02 PNGs are published on main by merged PR #41. Independent file integrity remains NOT VERIFIED.

**Phase A learning path is COMPLETED (A1–A4).** The Human Owner explicitly closed Task #003 on 2026-11-11 after reviewing the source ZIP, report and inventory. The acceptance record preserves the app-type/external-connection limitations and the fact that VC-006/VC-007 were not run.

**Phase B entry:** B1 Contract BVC-TM-TC-004 Revision 1 is approved by the Human Owner. It authorizes only a modification to `app/page.tsx` in the existing GAIS app. The Contract and Prompt #0004 must be canonical on main before learner execution. Immediately before editing, the current GAIS app identity and `app/page.tsx` must be inspected; stop if the live source differs materially from the supplied snapshot.

Formal Phase 3.1 UX Acceptance remains OPEN. DR-005 remains OPEN and blocks B2 storage disclosure/persistence, not B1's in-memory-only task capture. DR-014 is ACCEPTED FOR DESIGN only; browser persistence still requires B2 implementation and runtime verification. Do not implement B2, add `localStorage`, or claim persistence under B1.

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
