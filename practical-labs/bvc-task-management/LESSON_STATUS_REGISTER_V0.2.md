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
| B1 — Create Your First Task | **COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS** (initial Owner decision 2026-11-12; included in Phase B closeout 2026-11-24) | Human Owner reviewed the supplied `app/page.tsx`, confirmed one Page component in GAIS Code view and observed the task-capture Preview. The 2026-11-24 Preview screenshot additionally shows a third task added after the two existing tasks. | Full archived manual Preview test set and independent before/after GAIS changed-file inventory are not present. The 2026-11-24 screenshot supports one successful addition and visible insertion order; it does not prove every validation scenario. Owner accepted these limitations. |
| B2 — Save Your Task | **OWNER_ACCEPTED_WITH_KNOWN_LIMITATIONS — PHASE B CLOSED 2026-11-24** | Contract #005 Revision 1, Prompt #0005, Context Pack, Stage 2 report, reported build/lint, Local Storage screenshots (PR #71/#73), and Preview-after-refresh evidence (PR #75) were reviewed. B2-AC-003 and B2-AC-004 have Owner screenshot evidence. | Malformed-data and storage-error runtime simulations remain `NOT_RUN`; fresh-profile acknowledgement and responsive checks were not independently archived as PASS. The Owner accepted Phase B with these limitations; individual `NOT_RUN` / `NOT_VERIFIED` values remain unchanged. |
| B3 — Close and Reopen | **OWNER_ACCEPTED_WITH_KNOWN_EVIDENCE_LIMITATIONS — PHASE B CLOSEOUT 2026-11-24** | The Owner accepted B3 as part of the four-lesson Phase B learning path. The B2 same-profile Preview refresh screenshot is relevant persistence evidence. | A separate close-tab/reopen screenshot sequence is not independently archived. Phase-level Owner acceptance is recorded without claiming a separate unrecorded test PASS. |
| B4 — Improve One Small Thing | **OWNER_ACCEPTED_WITH_KNOWN_EVIDENCE_LIMITATIONS — PHASE B CLOSEOUT 2026-11-24** | The Owner explicitly accepted B4 as part of the four-lesson Phase B learning path. | A separate B4 implementation diff and complete regression evidence set are not independently archived in the current repository. The explicit Owner acceptance is recorded; no missing test is re-labelled PASS. |

**Phase B status: CLOSED — HUMAN OWNER ACCEPTED 2026-11-24.** The Owner explicitly accepted all four lessons (B1–B4), the available evidence and continuity, and declared Phase B closed. The closeout is a learning-path acceptance with known limitations. Historical runtime checks recorded as `NOT_RUN` or `NOT_VERIFIED` remain so; no unrecorded test is converted to PASS. See [Phase B Acceptance & Closeout Record](phase-b/PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md).


### Phase A closure and Phase B entry gate

**Phase A learning path is COMPLETED (A1–A4).**

- A1: A1-01 and A1-02 authentic screenshots are published on main.
- A2: The blank Preview and scaffold file tree are evidenced. Exact framework/runtime/dependency/package-manager/build facts remain NOT VERIFIED; do not invent them.
- A3: Learning exercise completed. Save is OWNER-CONFIRMED; the new Instructions screenshot is OBSERVED; Prompt #0002 response received and reviewed. Exact close/reopen sequence and independent before/after file integrity remain NOT VERIFIED as supplementary checks.
- A4: The read-only learning exercise is complete; all eight response sections were reviewed. Original A4-01/A4-02 PNGs are published on main by merged PR #41. Independent file integrity remains NOT VERIFIED.

**Phase A learning path is COMPLETED (A1–A4).** The Human Owner explicitly closed Task #003 on 2026-11-11 after reviewing the source ZIP, report and inventory. The acceptance record preserves the app-type/external-connection limitations and the fact that VC-006/VC-007 were not run.

**Phase B entry:** B1 Contract BVC-TM-TC-004 Revision 1 is approved by the Human Owner. It authorizes only a modification to `app/page.tsx` in the existing GAIS app. The Contract and Prompt #0004 must be canonical on main before learner execution. Immediately before editing, the current GAIS app identity and `app/page.tsx` must be inspected; stop if the live source differs materially from the supplied snapshot.

Formal Phase 3.1 UX Acceptance remains OPEN. DR-005 is APPROVED and governs the first-use disclosure for B2. DR-014 remains ACCEPTED FOR DESIGN; B2 implementation and Owner-supplied Local Storage / Preview-refresh evidence are recorded, while the known runtime test limitations remain in the B2 lesson and Phase B closeout record. Do not add `localStorage` to B1 or retroactively expand B1.

## 3. Phase C — Make It Useful Every Day

| Lesson group | Status | Required dependency / evidence |
|---|---|---|
| C1 — My Day | **ACTIVE PREPARATION — OWNER REVIEW OF C1 READINESS PACKAGE** | DR-001, DR-002 and DR-017 are approved. The C1 brief proposes a non-destructive v1-to-v2 migration, date-only task fields, timezone handling and no-duplicate section rules; separate R1 readiness Contract #006 Rev2 and R4 implementation Contract #007 Rev1 are prepared for review. | Both Contracts remain DRAFT_NOT_APPROVED. Contract #007 also requires the Owner decision on visibility of the two existing undated B2 tasks (C1-OPEN-001), Data Privacy/Security domain review, explicit execution authorization, tested post-migration recovery and fresh live GAIS/single-writer preflight. Prompt #0006 remains NOT_ALLOCATED; no GAIS change is authorized. |
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


**B2 gate history — 2026-11-17 (superseded):** RC-003 PASS; RC-004 PASS (Owner confirmed clean editor and no competing writer). At that time RC-005 was pending until Gemini received the canonical Prompt #0005 and Context Pack. This gate was subsequently satisfied: Gemini supplied the read-only RC-005 acknowledgment and the Human Owner confirmed `RC-005 PASS — PROCEED WITH B2` on 2026-11-18. No GitHub connection is required in the learner's GAIS project. Exact Git-level accepted-B1 source parity remains NOT_VERIFIABLE, separately from the clean current GAIS editor state.

## Phase C1 decision update — 2026-11-24

The Human Owner approved the three Product/UX decisions for C1 — My Day on 2026-11-24:

- DR-001 — Upcoming horizon: next 7 calendar days.
- DR-002 — Today's Focus: scoped to the current local calendar date and automatically expires at the next local calendar day.
- DR-017 — Timezone: detect the browser IANA timezone on first use and allow user correction.

The canonical outcomes are recorded in `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` §3.4 and summarized in the C1 Decision Brief.

This update does not change Phase B acceptance. Contract #006 Revision 2 and Contract #007 Revision 1 are separate proposals and remain `DRAFT_NOT_APPROVED`. The v1-to-v2 compatibility design is proposed for Owner review, Prompt #0006 remains `NOT_ALLOCATED`, and GAIS implementation is not authorized.
