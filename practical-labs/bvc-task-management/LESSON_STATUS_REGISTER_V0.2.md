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
| B1 — Create Your First Task | **COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS** — Owner decision 2026-11-12; published through PR #60 | Owner reviewed the supplied app/page.tsx and confirmed the GAIS Code view contains one Page component. B1 remains a memory-only task capture. Complete archived manual Preview test suite and independently reviewable GAIS before/after file inventory are not in GitHub; browser E2E is not claimed. Preserve these limitations. |
| B2 — Save Your Task | **CONTRACT_APPROVED; PREFLIGHT_PENDING; EXECUTION_NOT_STARTED** | DR-005 approved through PR #62. BVC-TM-TC-005 Revision 1 approved and published through PR #64. Run read-only Prompt #0005, inspect live GAIS app/page.tsx and file inventory, verify one-writer status, then await separate Owner execution instruction. |
| B3 — Close and Reopen | Planned — depends on accepted B2 | Learner independently closes and reopens the same app in the same browser profile and confirms the exact saved task remains available. B2 Contract already includes initial save/load verification. |
| B4 — Improve One Small Thing | Planned — depends on B1–B3 | One bounded, separately approved improvement is made; relevant B1–B3 regression checks pass. |

**Current Phase B gate:** B1 is Owner-accepted with known limitations. DR-005 and BVC-TM-TC-005 Revision 1 are approved and canonical on main. B2 application execution has NOT_STARTED. Contract approval is not execution authorization. The existing GAIS project must pass the read-only preflight and the Human Owner must separately instruct execution before Gemini modifies app/page.tsx.

### Phase A closure and Phase B entry gate

**Phase A learning path is COMPLETED (A1–A4).**

- A1: authentic GAIS Apps landing and blank Preview screenshots are published on main.
- A2: the Code/File Explorer screenshot and Owner-supplied 18-file scaffold ZIP inspection are recorded. App-type label, external connection/secrets panel and exact runtime/build status retain the documented limitations.
- A3: learning exercise completed; Project Instructions save is Owner-confirmed; supplementary close/reopen and independent before/after file integrity remain NOT_VERIFIED.
- A4: read-only learning exercise completed and response reviewed; authentic screenshots are published on main.
- Task #003 was explicitly closed by the Human Owner on 2026-11-11 with known limitations. VC-006/VC-007 were not independently run and are not PASS.

**B1 closeout:** Contract #004 and Prompt #0004 were published through PR #53. Owner acceptance with known limitations was published through PR #60. B1 persistence is out of scope.

**DR-005:** Approved through PR #62. Approval does not by itself prove the disclosure has been implemented or tested in GAIS.

**B2 authorization:** Contract #005 Revision 1 is approved through PR #64. Only MODIFY app/page.tsx is allowed; max 350 diff lines, no CREATE/DELETE, packages, configuration, database, Auth or external services. B2 remains NOT_STARTED until live GAIS preflight and separate execution instruction.

**Formal Phase 3.1 UX Acceptance remains OPEN.** DR-013 contrast audit remains VERIFICATION REQUIRED. DR-014 browser localStorage is ACCEPTED FOR DESIGN; runtime behavior still requires evidence. Do not claim UX phase acceptance from DR-005 approval alone.

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
