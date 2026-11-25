# BVC-TM-TC-007 Revision 1 — Human Owner Gate Split and Execution Authorization Record

**Record ID:** BVC-TM-TC-007-OWNER-AUTH-002  
**Recorded date:** 2026-11-25  
**Contract:** BVC-TM-TC-007, Revision 1 — APPROVED  
**R4 Domain Decision:** `APPROVED_WITH_CONDITIONS`, canonical through merged PR #92  
**Decision authority:** Human Owner / Product Owner  
**Implementation executor:** Gemini in Google AI Studio  
**Coordinator / Prompt Architect / R4 Domain Authority:** ChatGPT  
**Technical reviewer:** DeepSeek  
**Record status:** PROPOSED FOR CANONICAL PUBLICATION IN GOVERNANCE PR  
**GAIS execution:** NOT STARTED

---

## 1. Human Owner decisions recorded

The following explicit Human Owner decisions were given in the ChatGPT conversation on 2026-11-25:

1. **Execution Authorization:** “Tôi phê duyệt cấp phép cho Gemini thực thi Contract #007.”
2. **Execution roadmap:** approve the proposed C1 workflow W0–W7.
3. **CND-003 / CND-004 handling:** split these controls into implementation requirements and acceptance/verification gates; they are not separate pre-execution blockers once the pre-execution gates below are closed.
4. **Public static assets:** HOLD — do not change, remove, move or newly distribute the two project Context Pack / Prompt files under `public/assets/aistudio/` as part of Contract #007. Their exposure classification remains `NOT_VERIFIED`.

This record publishes those decisions and defines their operational interpretation. It does not modify Contract #007 Revision 1.

## 2. Execution Authorization — exact scope and effect

The Human Owner has issued a separate action-level authorization for Gemini to execute **Contract #007 Revision 1 only**, within its exact approved scope.

The authorization is recorded as:

`HUMAN_OWNER_AUTHORIZATION_GRANTED_CONDITIONALLY`

It becomes executable only after all pre-execution conditions in Section 4 are closed and verified. It does not permit Gemini to begin editing immediately upon reading this record.

### Exact authorized boundary

- Target: existing Beginner GAIS application identified in Contract #007.
- Application ID: `ca589018-617d-4919-bbe2-6b9c588ccd85`.
- Allowed modified file: `app/page.tsx` only.
- Maximum changed files: 1.
- Maximum modified files: 1.
- Maximum diff: 500 total diff lines.
- Creates: 0.
- Deletes: 0.
- Binary changes: 0.
- No new dependencies, lockfiles, package changes, configuration, routes, CSS/shared component files, database, Supabase, Auth, RLS, APIs, external services, cloud synchronization, GitHub integration, deployment or unrelated features.
- Product/UI baseline: canonical BVC Task Management Product Definition, accepted architecture/design and UX/Interaction sources, and Owner-approved DR-001, DR-002, DR-017 and DR-020 on GitHub `main`.
- Learning requirement: explain the work to the newbie in Vietnamese before the copy-ready execution prompt, and explain the result and verification after execution.

No authority is granted to expand the Contract or alter another file. Any out-of-scope change requires STOP and a separate approved Contract.

## 3. Gate split approved by the Human Owner

The R4 Domain Review Decision remains `APPROVED_WITH_CONDITIONS`. The Human Owner approves the following operational split:

| Condition | New gate class | Must be satisfied | Execution effect |
|---|---|---|---|
| CND-001 — v2-preserving recovery procedure and isolated-copy test | **PRE-EXECUTION GATE** | Define and execute the copy-based recovery test; ChatGPT Domain Authority reviews evidence | Blocks Gemini from editing until PASS |
| CND-002 — exact B2 v1 validation baseline | **PRE-EXECUTION GATE** | Reconcile the accepted B2 `parseWorkspace` behavior and Context Pack into explicit migration validation cases | Blocks Gemini from editing until baseline is approved |
| CND-003 — truthful storage error UI | **IMPLEMENTATION + ACCEPTANCE GATE** | Include explicit error-vs-empty behavior and beginner-safe Vietnamese guidance in Prompt #0006; verify in Preview | Does not separately block prompt preparation after CND-001/002; must pass before C1 acceptance |
| CND-004 — safe migration failure semantics | **IMPLEMENTATION INVARIANT + ACCEPTANCE/VERIFICATION GATE** | Prompt and code must prohibit fallback from present invalid v2, automatic v2 deletion, v1 overwrite and success claims after failure; migration failure tests must verify behavior | Does not separately block the start of implementation after CND-001/002; any design/prompt that omits these invariants is rejected; must pass before C1 acceptance |
| CND-005 — public static Context Pack/Prompt assets | **HOLD / PRE-DISTRIBUTION CONTROL** | Leave files unchanged; do not newly distribute/publish them until intended visibility is decided | Not a C1 code-scope task; no deletion/movement under Contract #007 |
| CND-006 — verification evidence | **POST-IMPLEMENTATION VERIFICATION + PRE-ACCEPTANCE GATE** | Collect actual VC evidence and mark any unexecuted test NOT_RUN / NOT_VERIFIED | Blocks C1 acceptance, not recovery planning |

### Meaning of “split”

CND-003 and CND-004 are not waived, deleted or downgraded. They become explicit instructions in the authorized implementation prompt, mandatory engineering invariants, and acceptance tests after implementation. They remain failure/acceptance blockers if the implementation does not satisfy them.

CND-004 is a design-time constraint as well as a test requirement: Gemini must know the safe behavior before writing code. The split only removes the requirement to prove the final implementation behavior before any implementation can begin.

## 4. Mandatory pre-execution gates

Gemini may not make a source change until all of the following are recorded as PASS:

### GATE-PRE-001 — CND-001 recovery test
- A complete synthetic/copy v2 workspace is created in an isolated test environment.
- A v1-compatible projection is produced without modifying the complete v2 copy.
- Every task ID/title and record count is compared.
- Every v2-only field remains in the preserved full v2 payload.
- The B2 v1 reader successfully reads the projection in an isolated test.
- Failure cases and evidence are recorded.
- No real user browser storage is overwritten or reset.
- ChatGPT reviews and accepts the evidence; any real-key replacement remains prohibited absent a later explicit Owner action.

### GATE-PRE-002 — CND-002 v1 baseline
- Read the exact accepted B2 `app/page.tsx`, `parseWorkspace`, B2 Context Pack and Prompt #0005.
- Record the accepted envelope and validation rules.
- Preserve compatibility for historical task IDs: non-empty unique strings as accepted by B2; do not impose a new UUID-only rule on historical task IDs.
- Record invalid/malformed/unsupported cases and expected stop behavior.
- ChatGPT approves the baseline for use in Prompt #0006.

### GATE-PRE-003 — authorization and live preflight
- This Owner authorization record is canonical on `main`.
- After GATE-PRE-001 and GATE-PRE-002 pass, perform a fresh, read-only Contract VC-001 preflight on the exact live GAIS app: verify app ID, read current `app/page.tsx`, record content fingerprint, inspect browser v1 storage read-only, ensure no dirty editor state and confirm single-writer.
- Compare the live source against the 2026-11-25 export; material unexplained differences require STOP and re-baselining.
- Gemini provides a read-only acknowledgment of the exact app, allowed file, file-count/diff budget and stop conditions. This acknowledgment must not edit source and is not Prompt #0006.
- Only after CND-001, CND-002, VC-001 and Gemini's read-only scope acknowledgment pass may ChatGPT allocate and issue Prompt #0006.

All three pre-execution gates are cumulative. The Human Owner's authorization is already given, but its effective use is conditional on these gates.

## 5. Implementation and acceptance requirements after authorization becomes effective

When Prompt #0006 is eventually issued, it must include:

- CND-003: distinct loading, storage-error, empty and data-present states. A storage error must never render the normal “No tasks yet” empty-state message. Explain in Vietnamese that the learner must not clear site data, reset storage or attempt manual repair; they should stop and ask for help.
- CND-004: exact safe migration sequence from Contract #007. Validate before write; write v2 once; read back and validate before activating; keep v1 unchanged; if a v2 key exists but is malformed/unsupported, STOP without v1 fallback; on parse/validation/write/read-back errors, stop mutations, preserve both keys as observed and do not claim success. Never automatically call `removeItem(v2)`, delete v2, overwrite v1 or silently clear data.
- Retain the no-insecure-fallback behavior when `crypto.randomUUID()` is unavailable; UI must clearly show the stopped state.
- Preserve the approved DR-005 disclosure and acknowledgement.
- Preserve the exact C1 section order and DR-020 placement.
- Keep all changes within `app/page.tsx` and the 500-line maximum.

CND-003/CND-004 close only after implementation evidence and relevant verification checks pass.

## 6. Public static assets — HOLD

The following files were found in the 2026-11-25 GAIS export:

- `public/assets/aistudio/BVC_TM_P3.3_005_CONTEXT_PACK_V0.1_c77e9347.yaml`
- `public/assets/aistudio/BVCTM_PROMPT_0005_PHASE_B2_SAVE_YOUR_TASK_f004d32b.md`

Human Owner selected `HOLD`.

Therefore:
- Do not edit, delete, rename or move these files in Contract #007.
- Do not include their contents in a new public distribution package.
- Do not claim their live URL exposure is verified; the current GAIS runtime visibility remains `NOT_VERIFIED`.
- Record intended visibility in a separate task before any public/production-like distribution decision.

This HOLD does not expand or change the one-file Contract #007 implementation boundary.

## 7. Conditions for final acceptance

C1 cannot be accepted until:
- CND-003 and CND-004 implementation requirements are satisfied.
- Required VC-002 through VC-008 and VC-011 evidence is available; VC-001 preflight is recorded before edit; VC-009 R4 review and VC-010 recovery evidence are recorded.
- No task ID/title or record-count mismatch exists.
- Both original B2 tasks remain visible exactly once in Unscheduled.
- Diff scope is exactly one modified `app/page.tsx`, within 500 lines, with no forbidden changes.
- Build, lint and type checks are reported separately with actual outputs; do not infer lint pass from build.
- Preview behavior is observed, and Human Owner performs final acceptance (Evidence Level 4 for observed user behavior).

## 8. Authority separation

- Human Owner: issued the authorization and retains final governance and acceptance authority.
- ChatGPT: Prompt Architect, R4 Domain Authority, coordinator and evidence assessor.
- DeepSeek: read-only technical reviewer / challenger; no execution authority.
- Gemini: executor only after pre-execution gates pass and Prompt #0006 is issued.
- The prompt cannot expand the Contract or create new authority.

**This record does not itself start GAIS editing, allocate Prompt #0006, perform migration, or claim any test as PASS.**
