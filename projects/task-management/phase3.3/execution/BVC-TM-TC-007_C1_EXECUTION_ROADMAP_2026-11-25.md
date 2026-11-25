# BVC Task Management — Phase C1 Execution Roadmap (W0–W7)

**Roadmap ID:** BVC-TM-C1-ROADMAP-001  
**Prepared:** 2026-11-25  
**Project:** BVC Task Management — BEYOND VIBE CODING / Build & Learn  
**Contract:** BVC-TM-TC-007 Revision 1 — APPROVED  
**Milestone:** C1 — My Day  
**Owner:** Human Owner / Product Owner  
**Project Manager / Chief Architect:** ChatGPT  
**Executor:** Gemini in Google AI Studio  
**R4 Technical Reviewer:** DeepSeek  
**R4 Domain Authority:** ChatGPT  
**Roadmap status:** HUMAN_OWNER_APPROVED_IN_CHATGPT_2026-11-25; GOVERNANCE_PR_PENDING  
**Implementation status:** NOT_STARTED

---

## 1. Executive delivery objective

Deliver C1 — My Day in the existing Beginner GAIS application while preserving B2 workspace data and the approved product behavior.

This roadmap is governed by the exact approved Contract #007 Revision 1. It does not create a new implementation scope.

### Non-negotiable implementation boundary

- Modify only `app/page.tsx`.
- Maximum one modified file.
- Maximum 500 total diff lines.
- No creates, deletes, binary changes or other modified files.
- No new dependencies or lockfiles.
- No configuration, CSS, route, shared-component, backend, database, Supabase, Auth, RLS, API, external service, cloud sync, GitHub integration or deployment changes.
- Any required change outside that boundary triggers STOP and a separate Contract.

### Product/UI baseline

The newbie practice UI is governed by canonical GitHub sources, not by an older Preview or source-export screenshot:

- Product Definition v0.2.0.
- Accepted Phase 3.2 architecture/design baseline.
- BVC Task Management UX / Interaction Specification (formal Phase 3.1 acceptance remains OPEN).
- Owner-approved DR-001, DR-002, DR-017 and DR-020 in the Product/UX Decision Register.
- Contract #007 Revision 1 for exact implementation scope and behavior.

The existing GAIS export is the implementation baseline to inspect and compare, not the design authority.

## 2. C1 target behavior

The Beginner app must render these sections in this exact order:

1. Overdue
2. Due Today
3. Today's Focus
4. Upcoming
5. Unscheduled (supplemental DR-020 section)
6. Add task

A task appears at most once. Completed tasks are excluded from active sections. The two existing B2 tasks without due date or Focus appear exactly once in Unscheduled, with their original IDs and titles. Do not invent a due date or Focus marker for legacy tasks.

Approved decisions:
- DR-001: Upcoming uses the next 7 calendar days.
- DR-002: Today's Focus is scoped to the current selected-local calendar date and expires at the next local calendar day.
- DR-017: detect browser IANA timezone on first use and allow user correction.
- DR-020: Unscheduled is after Upcoming and before Add task; active undated tasks without Focus active today appear once.

## 3. Gate model

### Pre-execution gates — required before Gemini may edit

| Gate | Requirement | Owner | Exit evidence |
|---|---|---|---|
| G0 — Governance publication | Publish Owner authorization and approved gate split; preserve Contract #007 | ChatGPT; Human Owner review/merge | Merged governance PR and canonical Project State |
| G1 — CND-001 Recovery | Document and execute post-migration downgrade/recovery test against an isolated copy of full v2 payload | ChatGPT prepares; DeepSeek challenges; ChatGPT assesses | Test fixture, procedure, before/after manifest, task ID/title comparison, complete-v2 preservation check, report |
| G2 — CND-002 V1 baseline | Reconcile accepted B2 v1 schema and validation behavior exactly | ChatGPT prepares; DeepSeek may challenge | V1 validation baseline and case matrix approved by ChatGPT |
| G3 — Prompt and live preflight | Allocate Prompt #0006 after G1/G2; complete VC-001 on exact live GAIS app; Gemini acknowledges scope | ChatGPT / Human Owner / Gemini | Prompt #0006, app ID and source hash, read-only v1 inspection record, no-dirty-state and single-writer evidence, Gemini scope acknowledgement |

Human Owner has already given separate action-level execution authorization. Its use remains conditional on G1, G2 and G3. This roadmap does not treat that authorization as permission to bypass those gates.

### Implementation requirements — mandatory in Prompt #0006

CND-003 and CND-004 are split into implementation and acceptance gates by the Human Owner. They are not waived.

| Condition | Required implementation behavior | Required acceptance evidence |
|---|---|---|
| CND-003 — truthful storage error UI | Distinguish loading, storage error, empty workspace and tasks-present states. Never display the ordinary “No tasks yet” message while storage is unreadable. Give beginner-safe Vietnamese instructions: stop; do not clear site data or reset storage; ask for help. | Preview/error-state evidence and source inspection showing mutually exclusive branches |
| CND-004 — safe migration failure semantics | Implement exact Contract sequence; present invalid v2 is a hard stop; no fallback to stale v1; preserve v1; no automatic v2 deletion, `removeItem(v2)`, v1 overwrite, silent data clearing or false save-success claims; stop mutations on failure. | VC-002/003 and failure matrix evidence demonstrating preservation and stop behavior |

CND-004 is a design invariant from the beginning of implementation; the final behavior is proven at acceptance. Any prompt or Gemini plan that omits this invariant is rejected before execution.

### Distribution HOLD

CND-005 remains HOLD. Do not edit, move, delete or newly distribute the two Context Pack / Prompt files under `public/assets/aistudio/`. Runtime exposure is `NOT_VERIFIED`. Any public/production-like distribution requires a separate classification decision. This is not an excuse to exceed Contract #007's scope.

### Post-implementation verification

CND-006 and all Contract verification checks remain required. Tests not executed must be marked `NOT_RUN` / `NOT_VERIFIED`; no planned test may be reported as PASS.

## 4. Detailed work packages

### W0 — Governance Synchronization

**Objective:** Make the approved execution plan and authority state canonical before preparing the execution prompt.

Tasks:
- W0.1 Publish the Human Owner's conditional Gemini Execution Authorization record.
- W0.2 Publish the Owner-approved CND-003/CND-004 gate split without editing Contract #007.
- W0.3 Record CND-005 as HOLD / no new distribution; keep exposure NOT_VERIFIED.
- W0.4 Update Project State, Task Execution Register, Prompt Register, Source Manifest and Handoff Log.
- W0.5 Run repository synchronization and continuity validation workflows.
- W0.6 Verify the merge commit and canonical Project State.

Deliverables:
- Owner Execution Authorization and Gate Split record.
- C1 W0–W7 Roadmap.
- Project State revision and companion-register updates.
- Governance PR and CI evidence.

Exit criteria:
- Governance PR merged.
- Contract #007 hash/content unchanged.
- Prompt #0006 remains NOT_ALLOCATED.
- No GAIS source/runtime change.

### W1 — Recovery Engineering (CND-001)

**Objective:** Prove a v2-preserving code-downgrade/recovery procedure using an isolated copy before implementation.

Tasks:
- W1.1 Build a synthetic, non-sensitive v2 workspace fixture from the approved v2 contract.
- W1.2 Include representative tasks covering legacy-like records, due dates, focus dates, all valid statuses/priorities, timezone settings and v2-only fields.
- W1.3 Preserve a byte-for-byte/reference copy of the complete v2 fixture and calculate a deterministic manifest/fingerprint.
- W1.4 Define a v1-compatible projection that retains `workspaceId` and every task ID/title while omitting v2-only fields only from the projection.
- W1.5 Verify the original full v2 fixture remains unchanged and all v2-specific data is still recoverable from that preserved copy.
- W1.6 Exercise the projection with the accepted B2 v1 parser in an isolated test harness/copy; do not use live GAIS Local Storage.
- W1.7 Test malformed v2, missing fields, duplicate IDs, invalid title, failed projection and interrupted procedure.
- W1.8 Record exact before/after manifests and a task ID/title equality report.
- W1.9 DeepSeek challenges the test evidence; ChatGPT adjudicates and records PASS/FAIL/NOT_VERIFIED.
- W1.10 Any real v1-key replacement remains forbidden unless a later explicit Human Owner action authorizes that exact operation.

Required deliverables:
- Recovery procedure.
- Synthetic v2 fixture and preserved full payload.
- v1-compatible projection fixture.
- Failure-case matrix.
- ID/title and workspaceId comparison.
- Full-v2 integrity report.
- ChatGPT recovery review decision.

Exit criteria:
- Every ID/title and workspaceId preserved exactly.
- Full v2 copy unchanged and v2-only fields preserved.
- Isolated B2 reader accepts the projection.
- No destructive operation occurred.
- ChatGPT records CND-001 PASS.

### W2 — Exact V1 Validation Baseline (CND-002)

**Objective:** Prevent C1 migration from rejecting or mutating accepted B2 data through an accidental schema change.

Tasks:
- W2.1 Read the exact 2026-11-25 GAIS export `app/page.tsx` and the accepted B2 Context Pack / Prompt #0005.
- W2.2 Extract the exact envelope: key, `format`, `formatVersion`, `sourceMode`, `workspaceId` and `data` collections.
- W2.3 Extract the accepted task validation: historical task ID is a non-empty unique string; title is non-empty and trimmed.
- W2.4 Record other exact key/array/object validation behavior from B2 `parseWorkspace`; do not infer from field names.
- W2.5 Define valid, invalid, malformed, unsupported, absent and duplicate test cases.
- W2.6 Explicitly state that historical task IDs must not be newly restricted to UUID-only unless separately approved.
- W2.7 Define migration defaults only: `status: todo`, `priority: normal`; omit `due_date` and `focus_date`.
- W2.8 DeepSeek reviews differences; ChatGPT approves the exact baseline.

Deliverable:
- V1 Validation Baseline and migration test matrix.

Exit criteria:
- Baseline traceable to accepted B2 source and Context Pack.
- No contradictory or invented validation rule.
- ChatGPT records CND-002 PASS.

### W3 — R4 Condition Reassessment and Prompt Readiness

**Objective:** Convert the conditional R4 decision into an unambiguous executable work order while preserving all safety conditions.

Tasks:
- W3.1 Verify G1 and G2 evidence.
- W3.2 Record CND-001 and CND-002 as closed only with actual evidence and Domain Authority review.
- W3.3 Carry CND-003 as required UI implementation/acceptance condition.
- W3.4 Carry CND-004 as required safe-migration invariant and acceptance test.
- W3.5 Keep CND-005 on HOLD; do not include file moves or removals in the implementation prompt.
- W3.6 Define CND-006 verification outputs.
- W3.7 Issue a gate-status addendum; do not claim all R4 conditions closed before implementation evidence exists.

Exit criteria:
- Domain Authority confirms pre-execution gates closed.
- Exact prompt requirements are frozen for Prompt #0006.
- No unauthorized scope change.

### W4 — Prompt #0006 and Live GAIS Preflight

**Objective:** Prepare a Vietnamese-first prompt and verify the real target environment immediately before editing.

Prompt package must follow the project GAIS Prompt Delivery Standard template:
- Part A: Vietnamese newbie briefing.
- Part B: one bounded copy-ready Gemini execution prompt.
- Part C: Vietnamese post-run review guide.

Tasks:
- W4.1 Allocate BVCTM-PROMPT-0006 only after G1/G2 PASS.
- W4.2 Identify Contract #007 Revision 1, accepted DR decisions, source files and exact app ID.
- W4.3 Include scope budget, prohibited operations, CND-003/004 implementation requirements and stop conditions.
- W4.4 Read current GAIS app ID and current `app/page.tsx` immediately before edit.
- W4.5 Record current source fingerprint and compare against the 2026-11-25 export.
- W4.6 Inspect v1 Local Storage read-only and preserve the observed payload using an Owner-approved safe method.
- W4.7 Confirm no dirty editor state and single-writer.
- W4.8 Gemini repeats and acknowledges exact file/diff/safety boundary.
- W4.9 Human Owner confirms VC-001 preflight PASS before Stage 2 source editing.

Stop if app identity mismatches, source drift is unexplained, workspace data is malformed, the v1 key cannot be safely preserved, another writer is active, or the diff budget cannot be respected.

### W5 — Gemini Implementation

**Objective:** Implement C1 in the existing GAIS Beginner app exactly within Contract #007 Revision 1.

Execution sequence:
- W5.1 Inspect and explain the current B2 flow without editing.
- W5.2 Implement the v2 data shape inside `app/page.tsx`.
- W5.3 Implement strict v1 validation using W2 baseline.
- W5.4 Implement v1-to-v2 migration in memory → validate → one v2 write → read-back → validate → activate.
- W5.5 Preserve original v1 key unchanged.
- W5.6 If v2 is present but malformed/unsupported, stop; never fall back to stale v1.
- W5.7 Implement safe stop/error behavior for parse, validation, write and read-back failures.
- W5.8 Implement selected IANA timezone, date-only calculations and timezone correction.
- W5.9 Implement exact My Day section order and task uniqueness.
- W5.10 Implement Unscheduled according to DR-020.
- W5.11 Implement CND-003 truthful storage error UI.
- W5.12 Keep CND-004 invariants: no auto-delete v2, no v1 overwrite, no fallback, no false save-success.
- W5.13 Preserve DR-005 disclosure and acknowledgement.
- W5.14 Verify only `app/page.tsx` changed and total diff is <=500 lines.

Gemini must STOP if any required change needs another file, dependency/config change, or scope expansion.

### W6 — Verification and Evidence

**Objective:** Prove C1 behavior and data integrity; distinguish static checks from actual Preview behavior.

Contract verification mapping:
- VC-001: live preflight (must be PASS before W5).
- VC-002: v1-to-v2 preservation using copy of actual B2 v1 workspace.
- VC-003: migration failure recovery and safe stop.
- VC-004: persistence after Preview reload.
- VC-005: date/timezone boundaries.
- VC-006: Focus behavior and user interaction.
- VC-007: task placement uniqueness and section order.
- VC-008: build/static checks; run type/lint separately where applicable and preserve exact outputs.
- VC-009: R4 domain review.
- VC-010: copy-based post-migration code-downgrade/recovery.
- VC-011: both legacy B2 task IDs/titles appear exactly once in Unscheduled.

Required evidence:
- Before/after source fingerprints.
- Exact one-file diff and line count.
- Synthetic fixture and test outputs.
- Read-only v1 input and migrated v2 output with sensitive text removed or replaced in evidence copies.
- Failure matrix with actual results.
- Preview screenshots for visible behavior (Evidence Level 4).
- Build, lint and type-check outputs separated.
- Human Owner observation/acceptance evidence.

Never convert a planned or unrun test to PASS.

### W7 — Human Acceptance and C1 Closeout

**Objective:** Close C1 only after evidence and Human Owner acceptance.

Tasks:
- W7.1 ChatGPT performs final diff/scope review.
- W7.2 DeepSeek performs a read-only post-implementation technical challenge.
- W7.3 ChatGPT reassesses R4 domain conditions CND-003/004 and evidence.
- W7.4 Confirm CND-005 remains held and no distribution occurred.
- W7.5 Prepare acceptance report mapping every AC/VC to evidence.
- W7.6 Human Owner tests the GAIS Preview and accepts/rejects.
- W7.7 Only after acceptance, update Project State, Task Execution Register, Lesson Status, Evidence Index, Source Manifest and Handoff Log.
- W7.8 Publish the C1 lesson in beginner-friendly Vietnamese with the actual learning outcomes and known limitations.
- W7.9 Plan the next Phase C task only after C1 closeout.

Exit criteria:
- All required ACs and VCs have evidence.
- No unresolved blocking finding.
- Human Owner explicitly accepts C1.
- Governance and learner-facing lesson are synchronized.

## 5. Roles and decision rights

| Work | Human Owner | ChatGPT | DeepSeek | Gemini |
|---|---|---|---|---|
| Governance / authorization | Accountable | Responsible for record | Consulted | Informed |
| Recovery procedure/test | Approves final outcome | Designs, coordinates, assesses | Challenges read-only | No live app edit |
| V1 validation baseline | Approves if policy decision required | Authors/assesses | Reviews | Consumes baseline |
| Prompt #0006 | Authorizes scope | Authors | Reviews if asked | Acknowledges and executes |
| Live preflight | Confirms | Coordinates/evaluates | Consulted | Reports exact source/app state |
| C1 implementation | Accountable | Coordinates/reviews | Read-only challenge | Responsible |
| Verification | Final acceptance | Assesses evidence | Challenges | Supplies actual evidence |
| C1 closeout | Accepts | Publishes governance/lesson updates | Consulted | Handoff |

## 6. Global stop conditions

Stop and return to Human Owner if:
- live app ID differs from the approved ID;
- source drift cannot be reconciled to a known source;
- v1 data cannot be read and preserved safely;
- any v1 task ID/title/workspaceId mismatch is found;
- present v2 is malformed or unsupported;
- migration/read-back fails;
- a proposal requires deletion, automatic rollback, v2 removal, v1 overwrite or browser-data reset;
- any second file, new dependency, config, route, API, database or other forbidden change is needed;
- diff exceeds 500 lines;
- Preview evidence contradicts source assumptions;
- any actor claims PASS without evidence;
- any change threatens the newbie's ability to understand and verify the work.

## 7. Current known status at roadmap publication

- Contract #007 Revision 1: APPROVED and unchanged.
- R4 Domain Review: APPROVED_WITH_CONDITIONS via PR #92.
- Human Owner execution authorization: granted conditionally, to be recorded in the separate authorization/gate-split record.
- CND-001: OPEN; pre-execution blocker.
- CND-002: OPEN; pre-execution blocker.
- CND-003: implementation and acceptance gate.
- CND-004: mandatory implementation invariant and acceptance/verification gate.
- CND-005: HOLD; exposure NOT_VERIFIED; do not change/distribute.
- CND-006: verification evidence pending.
- Prompt #0006: NOT_ALLOCATED.
- GAIS source: no new changes.
- C1 implementation: NOT_STARTED.

**This roadmap defines the controlled sequence. It is not the execution prompt and does not authorize any change outside Contract #007 Revision 1.**
