# BVC-TM-TC-007 — CND-001 Recovery Test Report

**Report ID:** BVC-TM-TC-007-CND-001-TEST-001  
**Executed:** 2026-11-26  
**Contract:** BVC-TM-TC-007 Revision 1 — APPROVED  
**Gate:** CND-001 — PRE-EXECUTION BLOCKER  
**Technical test result:** `PASS`  
**Review status:** `DEEPSEEK_CHALLENGE_PENDING; HUMAN_OWNER_APPROVAL_PENDING`  
**Live GAIS / Local Storage:** NOT ACCESSED OR MODIFIED

## 1. Executive result

The isolated synthetic-copy recovery test completed with **20/20 PASS and 0 FAIL**.

The test demonstrates that a v1-compatible projection can be constructed from a separately preserved complete v2 copy, accepted by the B2 `parseWorkspace` logic extracted from the Owner-supplied source export, and compared to the source without changing the full v2 payload. All five task IDs/titles and their order were preserved. The original fixture and preserved copy had identical SHA-256 before and after the test.

This is a technical test PASS for the synthetic fixture. It is **not yet a fully closed CND-001 governance gate**: DeepSeek's read-only challenge and Human Owner approval remain pending as required by the Contract and W1 roles.

## 2. Source provenance and parser baseline

| Item | Value |
|---|---|
| Source archive | `BVC_GAIS_Source_Export_2026-11-25.zip` |
| Archive SHA-256 | `0c12a7a4a835947b3cf67eb300a49bc8ab58e3861f9863d130cf09a8751378f7` |
| `app/page.tsx` SHA-256 | `4f926f8c9836c94505f71651871283f4299182fe181ecb432110d06c462ace5e` |
| B2 parser source range | `app/page.tsx` lines 5–95 |
| Parser harness | `cnd001-recovery-test.ts` |
| Runtime | Node.js `v22.16.0` |
| Command | `node --experimental-strip-types cnd001-recovery-test.ts synthetic-v2-workspace.json output/` |

The harness contains the constants, helper functions and `parseWorkspace` validation logic from the supplied B2 source. TypeScript type declarations are retained in the isolated harness; the parser checks/branch logic are copied without a validation change. The test does not execute the GAIS React component or a live browser runtime.

The B2 parser requirements exercised by this test include:

- exact top-level keys: `format`, `formatVersion`, `sourceMode`, `workspaceId`, `data`;
- format identifier `bvc-task-management-workspace`, version `1`, source mode `browser`;
- UUID-format `workspaceId`;
- exact `data` keys: `projects`, `tasks`, `checklistItems`, `settings`, `appliedStarterKits`;
- all non-task arrays empty and `settings` an empty object;
- each task has exactly `id` and `title`;
- task ID is a unique, non-empty string, not UUID-only;
- title is a non-empty string already trimmed.

## 3. Synthetic fixture coverage

The fixture uses a non-sensitive synthetic workspace with:

- valid UUID workspace ID;
- five tasks, including one historical-style non-UUID task ID;
- every Data Model status: `todo`, `in_progress`, `done`;
- every Data Model priority: `low`, `normal`, `high`;
- representative `due_date` and `focus_date` date-only values;
- timezone `Asia/Ho_Chi_Minh`;
- empty `projects`, `checklistItems` and `appliedStarterKits` collections.

The fixture is a controlled example based on the approved Contract #007 v2 fields and accepted Phase 3.2 Data Model enums. It is not an actual Owner workspace or a claim that a live v2 workspace already exists.

## 4. Integrity and projection results

| Artifact / check | SHA-256 / result |
|---|---|
| Synthetic v2 before | `bf07bb2f0279c95033bd69333eda6cd8e0bb3a9394ed0f273631812ce8daa612` |
| Synthetic v2 after | `bf07bb2f0279c95033bd69333eda6cd8e0bb3a9394ed0f273631812ce8daa612` |
| Preserved full v2 before | `bf07bb2f0279c95033bd69333eda6cd8e0bb3a9394ed0f273631812ce8daa612` |
| Preserved full v2 after | `bf07bb2f0279c95033bd69333eda6cd8e0bb3a9394ed0f273631812ce8daa612` |
| v1-compatible projection | `db8635bab166d46b04ce6869fb1006698dcd70274bc70a785a3a7557e7738359` |
| Workspace ID preserved | `TRUE` |
| Source / projection task count | `5 / 5` |
| Ordered ID/title equality | `TRUE` |
| B2 parser acceptance | PASS |

The original v2 fixture and separate full-v2 copy were byte-identical before projection and retained the same fingerprint after all tests. The projection removed v2-only fields only from the separate v1 view; the preserved v2 copy still contains task status, priority, optional dates and timezone.

## 5. Test matrix

| Test ID | Result | Description |
|---|---|---|
| REC-001 | PASS | Valid synthetic v2 workspace is accepted and produces a complete v1-compatible projection |
| REC-002 | PASS | Every source task ID and title is preserved exactly and in order |
| REC-003 | PASS | Full v2-only fields remain intact in the preserved copy |
| REC-004 | PASS | Projection omits v2-only task/settings fields only in the projection |
| REC-005 | PASS | Malformed v2 JSON is rejected; no projection is produced |
| REC-006 | PASS | Missing required v2 task field is rejected |
| REC-007 | PASS | Duplicate task IDs are rejected |
| REC-008 | PASS | Blank or untrimmed task title is rejected |
| REC-009 | PASS | Invalid or unavailable IANA timezone is rejected |
| REC-010 | PASS | Failed projection is fail-closed and leaves the complete v2 copy unchanged |
| REC-011 | PASS | Interrupted procedure after snapshot leaves source and preserved v2 payload unchanged |
| REC-012 | PASS | B2 parser rejects duplicate projection IDs |
| REC-013 | PASS | B2 parser rejects invalid projection titles |
| REC-014 | PASS | B2 parser rejects a non-UUID workspaceId |
| REC-015 | PASS | Original fixture and preserved full-v2 copy have identical SHA-256 after all tests |
| REC-016 | PASS | Unsupported v2 formatVersion is rejected before projection |
| REC-017 | PASS | Unsupported task status enum is rejected before projection |
| REC-018 | PASS | Unsupported task priority enum is rejected before projection |
| REC-019 | PASS | Impossible due_date is rejected before projection |
| REC-020 | PASS | Impossible focus_date is rejected before projection |

## 6. Recovery procedure validated

1. Read a synthetic v2 fixture.
2. Copy the complete raw fixture to a separate preserved-full-v2 artifact.
3. Verify byte equality and SHA-256 before deriving any projection.
4. Parse and validate the preserved copy.
5. Construct the v1 projection from the preserved copy in memory.
6. Write the projection to a separate output file only after construction completes.
7. Pass the projection through the B2 parser logic.
8. Compare workspace ID, task count, every task ID/title and order.
9. Recalculate the full-v2 fingerprint and verify the original preserved payload remains unchanged.
10. Run negative/failure-injection tests; no source/v2 copy mutation is allowed.

## 7. Important downgrade limitation discovered and documented

A B2 projection preserves task IDs and titles, but not C1 state semantics. B2 cannot represent `status`, `priority`, dates or timezone. In addition, B2 writes the v1 key while the full v2 remains preserved at the v2 key. If new work is written in B2, v1 and v2 diverge; a later C1 launch prefers a present v2 key and will not fall back to v1. The recovery procedure therefore restricts the downgraded B2 app to inspection/read-only use. Continued B2 task writes require a separate Owner-approved reconciliation Contract.

## 8. Limitations / not tested

- No actual GAIS Preview, live application, browser Local Storage or real Owner task data was accessed or changed.
- No real write to `bvc-task-management:workspace:v1` or `bvc-task-management:workspace:v2` was attempted.
- No live code downgrade was performed.
- The parser logic was copied from the exact source export into an isolated test harness rather than imported from a running GAIS app. The source hash and parser range are recorded for review.
- The synthetic test does not prove compatibility with future v2 fields or a different C1 implementation. Re-run against the exact v2 schema/source hash before any later real recovery.
- Node 22 emitted its standard experimental type-stripping warning; the test execution completed and all assertions passed.

## 9. Disposition and next required actions

**Technical test:** `PASS — 20/20`.  
**CND-001 governance closure:** `PENDING`.

Next:

1. DeepSeek reviews the full evidence package read-only using `DEEPSEEK_CND_001_READ_ONLY_CHALLENGE_PROMPT.md`.
2. ChatGPT evaluates any challenge findings as R4 Domain Authority and records the final internal domain disposition.
3. Human Owner reviews the procedure and test evidence and explicitly approves or rejects CND-001 closure.
4. Only after approval may the project proceed to CND-002/W3/W4. No C1 implementation or Prompt #0006 allocation is enabled by this technical test alone.

No real data was mutated, no automatic rollback/delete was attempted, and no live recovery authority is granted by this report.