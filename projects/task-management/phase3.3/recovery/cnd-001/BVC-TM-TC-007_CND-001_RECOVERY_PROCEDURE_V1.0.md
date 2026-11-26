# BVC-TM-TC-007 — CND-001 Post-Migration Code Downgrade / Data Recovery Procedure

**Document ID:** BVC-TM-TC-007-CND-001-PROC-001  
**Version:** 1.0  
**Prepared:** 2026-11-26  
**Contract:** BVC-TM-TC-007 Revision 1 — APPROVED  
**Gate:** CND-001 — PRE-EXECUTION BLOCKER  
**Status:** TESTED_ON_SYNTHETIC_COPY; DEEPSEEK_CHALLENGE_AND_HUMAN_OWNER_APPROVAL_PENDING  
**Applies to:** C1 v2 browser workspace → B2 v1-compatible workspace projection  
**Live GAIS / Local Storage authorization:** NOT_GRANTED_BY_THIS_PROCEDURE

---

## 1. Purpose

Define a reproducible way to recover task visibility in the prior B2 application code after a future C1 v1-to-v2 migration, without discarding the complete current v2 payload.

The procedure has two separate outputs:

1. A byte-preserved copy of the complete v2 workspace. This remains the authoritative recovery artifact for all v2-only data.
2. A separately constructed v1-compatible projection containing the unchanged `workspaceId` and every task `id` / `title`, in their existing order, so the accepted B2 `parseWorkspace` logic can read the basic task list.

The projection is not a replacement for the full v2 payload. It deliberately omits `status`, `priority`, `due_date`, `focus_date` and `settings.timezone` only from the projection. Those fields must remain in the preserved full v2 copy.

## 2. Authority and strict boundaries

This procedure implements the recovery requirements in Contract #007 Revision 1, including AC-011 and VC-010, and W1 in the approved C1 Execution Roadmap.

It does not:

- amend Contract #007;
- authorize a real GAIS code downgrade;
- authorize reading, writing, replacing or deleting the Owner's actual browser Local Storage;
- authorize writing a projection to `bvc-task-management:workspace:v1`;
- authorize deleting, replacing or cleaning `bvc-task-management:workspace:v2`;
- authorize automatic rollback or fallback;
- provide a backup/restore product feature;
- make B2 understand C1-only fields;
- authorize normal ongoing B2 writes after a downgrade.

Any real v1-key replacement requires a separate, explicit Human Owner approval naming that exact operation. The present CND-001 synthetic test does not provide that approval.

## 3. Important operating constraint: B2 after downgrade is not a full C1 continuation

B2 only understands `id` and `title`. After downgrading code and loading a projection:

- tasks remain visible with their original IDs and titles;
- B2 cannot display or interpret C1 `status`, `priority`, `due_date`, `focus_date` or timezone semantics;
- a completed v2 task is represented only by its ID/title in the B2 projection; B2 has no status field with which to preserve its completed state;
- the preserved full v2 payload remains the only artifact in this procedure that retains those C1-only values.

**Split-brain warning:** the downgraded B2 code writes to the v1 key, while the preserved full v2 payload remains at the v2 key. If new tasks are added or existing tasks are changed in B2, the v1 and v2 representations diverge. A later C1 launch is contractually required to prefer a present v2 key and must not fall back to stale v1. Therefore this recovery path is an inspection/read-only continuity mode only. Do not resume task creation or editing in B2 after projection activation unless a separate Owner-approved reconciliation/re-upgrade procedure has been designed and tested. If normal task work must continue, STOP and request a separate Contract.

## 4. Preconditions before any future real recovery

All conditions below must be met before considering a real recovery operation:

1. Human Owner explicitly declares that a downgrade is required and approves the exact recovery action.
2. The exact live GAIS app ID and current code version are verified.
3. The original accepted B2 `app/page.tsx` recovery source is available and its SHA-256 is checked against the approved B2 baseline. The 2026-11-25 Owner-supplied source export recorded `app/page.tsx` SHA-256 `4f926f8c9836c94505f71651871283f4299182fe181ecb432110d06c462ace5e`.
4. One writer only; no unsaved/dirty editor state; no competing browser tab, person, agent or process.
5. All app writes are frozen before the v2 snapshot is read.
6. An Owner-approved method and location exist to preserve the exact complete v2 raw payload outside the key that might be affected. This must not be improvised during an incident.
7. The full v2 payload parses and passes the exact v2 validation rules implemented by the C1 release being recovered. Unknown/malformed/unsupported v2 is a hard stop.
8. The v1 projection can be generated from the preserved copy and accepted by the exact B2 parser baseline.
9. `workspaceId`, task count, every task ID and every title match exactly and in order.
10. The Human Owner separately approves the exact v1 key replacement only after reviewing the complete-v2 preservation, parser acceptance and comparison evidence.

If any precondition is not met, do not write either key. Stop and preserve the observed state.

## 5. Recovery procedure

### Phase A — Freeze and capture

1. Stop all task mutations in C1. Do not permit task creation, completion, title changes, date changes, Focus changes or settings changes during recovery.
2. Record app identity, current code fingerprint, recovery operator, time, and the reason for downgrade.
3. Read the complete raw value at `bvc-task-management:workspace:v2` without modifying it.
4. Preserve the exact raw bytes/string as a separate immutable recovery copy using the previously Owner-approved method.
5. Calculate SHA-256 for both the captured raw value and preserved copy. They must match byte-for-byte. Record the byte count, hash, workspace ID, task count and ordered ID/title inventory.
6. Keep the original v2 key unchanged. Do not call `removeItem(v2)`, overwrite it, or use it as temporary projection storage.

### Phase B — Validate the preserved full v2 copy

1. Parse the preserved copy, not the only live v2 value, for all subsequent operations.
2. Validate the envelope against the exact C1 release / Contract #007 v2 contract: format, version 2, source mode `browser`, workspace ID, data collections, required task fields, allowed status/priority values, optional date-only values and valid IANA timezone.
3. Validate task identity and content: non-empty unique IDs; non-empty trimmed titles; no unexplained missing or duplicate records.
4. If parsing or validation fails, STOP. Do not repair, normalize, discard unknown data or fall back to v1.
5. Record the complete-v2 validation result and manifest before constructing a projection.

### Phase C — Build the v1-compatible projection from the preserved copy

1. Read the preserved v2 copy into memory.
2. Construct a new v1 envelope; do not mutate the preserved object or raw payload.
3. Set the exact B2 envelope fields:
   - `format`: `bvc-task-management-workspace`
   - `formatVersion`: `1`
   - `sourceMode`: `browser`
   - `workspaceId`: copied exactly from v2
   - `data`: exactly `projects`, `tasks`, `checklistItems`, `settings`, `appliedStarterKits`
4. Set `projects`, `checklistItems` and `appliedStarterKits` to empty arrays; set `settings` to an empty object, as required by the accepted B2 parser baseline.
5. Map every v2 task, in the same order, to exactly `{ id, title }`. Preserve both values byte-for-byte at the JSON string/value level; do not generate IDs, trim/rename titles, reorder tasks, or filter completed tasks.
6. Omit `status`, `priority`, `due_date` and `focus_date` only from the projection. Do not remove these values from the preserved full v2 copy.
7. Serialize the projection separately. Do not write it to the live v1 key at this stage.

### Phase D — Validate with the accepted B2 parser

1. Feed the projection JSON string to the accepted B2 `parseWorkspace` implementation in an isolated test harness.
2. Require a non-null parsed result.
3. Compare the parsed result to the v2 source manifest:
   - same `workspaceId`;
   - same task count;
   - same ordered task IDs;
   - same ordered titles.
4. Confirm the accepted parser's historical task-ID rule remains a non-empty unique string, not a UUID-only rule. The B2 parser requires `workspaceId` to be UUID, but does not require every historical task ID to be UUID.
5. Recalculate SHA-256 of the preserved full v2 copy and compare it with the pre-projection hash. It must be identical.
6. Confirm v2-only fields and timezone remain present in the preserved full v2 copy.
7. If any comparison fails or the parser rejects the projection, STOP. Do not replace v1.

### Phase E — Owner-controlled activation (not part of the current test)

1. Present the Owner with the source/preserved/projection hashes, complete-v2 integrity result, parser result, task ID/title comparison, known limitations and split-brain warning.
2. Only after a separate explicit Human Owner approval for the exact write, may the projection be written to the v1 key.
3. Use one controlled write and read it back; run the accepted B2 parser again on the value read back.
4. If write or read-back fails, preserve both keys as observed, stop mutations and show/report a truthful recovery failure. Do not automatically delete v2, overwrite again, fall back, or claim success.
5. Keep the full v2 copy and original v2 key unchanged.
6. Restore the exact approved B2 code only under the separate Owner-approved code downgrade action.
7. Treat the B2 app as read-only/inspection-only after downgrade. This is an operational restriction; the B2 UI does not enforce a read-only mode. Do not create or modify tasks. Any requirement for continued B2 writes requires a separate approved reconciliation design.

## 6. Failure and interruption behavior

| Failure | Required response |
|---|---|
| v2 raw value cannot be read | Stop; do not modify either key |
| Snapshot cannot be preserved or hash does not match | Stop; no projection or key write |
| Malformed/unsupported v2 | Hard stop; no v1 fallback; preserve observed data |
| Missing required task field, duplicate ID, invalid title/date/status/priority/timezone | Reject; no projection activation |
| Projection construction fails | Discard only incomplete in-memory/temp projection; retain full v2 copy unchanged |
| Procedure is interrupted after snapshot | Resume only from the preserved full copy after revalidation; do not mutate source keys |
| B2 parser rejects projection | Stop; do not replace v1 |
| ID/title/workspace/count comparison differs | Stop; no key write |
| v1 write/read-back failure after separate approval | Preserve v2 and observed v1; stop mutations; no automatic cleanup/rollback |
| Owner approval is absent | Do not write v1 or alter code |

## 7. Re-entry to C1 and data divergence control

The v2 key remains authoritative to C1 whenever it is present and valid. Because this procedure retains v2 and requires B2 inspection-only use, no v1/v2 divergence should be created by normal task activity.

If a user nevertheless changes B2 data after downgrade, the state must be treated as divergent. Do not launch C1 and assume the v1 changes will be merged. C1's current Contract does not define an automatic reconciliation/merge between a present v2 key and later B2 writes. Stop and request a separate approved reconciliation Contract.

## 8. Evidence required for this procedure

For each recovery test or future live recovery, preserve:

- source app ID and source code fingerprint;
- full v2 fixture/payload and immutable copy fingerprint;
- v1-compatible projection and fingerprint;
- before/after byte count and SHA-256 manifest;
- workspace ID comparison;
- ordered task ID/title comparison;
- B2 parser result and exact parser source provenance;
- failure matrix with actual outcomes;
- proof that no v1/v2 key deletion or unauthorized replacement occurred;
- reviewer challenge and Human Owner approval records where required.

## 9. Current CND-001 test boundary and disposition

The 2026-11-26 test uses a synthetic, non-sensitive v2 workspace and a byte-identical preserved copy. The projection is read by the parser logic copied from the exact Owner-supplied 2026-11-25 B2 source export. Twenty isolated tests passed.

This establishes the isolated projection and data-preservation behavior for the tested fixture. It does not establish live GAIS Preview behavior, live Local Storage recovery, real-key replacement, normal B2 write continuity, or compatibility with a future v2 schema that differs from the tested fixture.

**Current status:** `TESTED_ON_SYNTHETIC_COPY; DEEPSEEK_CHALLENGE_AND_HUMAN_OWNER_APPROVAL_PENDING`. No real GAIS or browser storage action was performed. Do not mark CND-001 fully closed until the required challenge and Owner approval are recorded.

---

## 10. Canonical sources

- Contract #007 Revision 1: `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-007_TASK_CONTRACT_V0.1.yaml` — recovery, AC-011, VC-010.
- C1 Execution Roadmap: `projects/task-management/phase3.3/execution/BVC-TM-TC-007_C1_EXECUTION_ROADMAP_2026-11-25.md` — W1.
- R4 Domain Review Decision: `projects/task-management/phase3.3/reviews/BVC-TM-TC-007_R4_DOMAIN_REVIEW_DECISION_2026-11-25.md` — CND-001 and recovery correction.
- B2 source export: Owner-supplied `BVC_GAIS_Source_Export_2026-11-25.zip` (archive SHA-256 recorded in the CND-001 test report).
- B2 parser source: exported `app/page.tsx`, lines 5-95.
- B2 Contract #005 Revision 1 and canonical Context Pack / Prompt #0005.