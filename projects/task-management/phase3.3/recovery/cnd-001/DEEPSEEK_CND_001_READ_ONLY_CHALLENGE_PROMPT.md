# DeepSeek Read-Only Technical Challenge — CND-001 Recovery Engineering

**Review target:** BVC-TM-TC-007 Revision 1 / CND-001  
**Mode:** READ-ONLY CHALLENGE ONLY  
**Reviewer role:** R4 technical reviewer (DeepSeek)  
**Authority limitation:** Do not approve CND-001 on behalf of the Human Owner or ChatGPT Domain Authority. Do not edit repository files, GAIS, Preview or browser storage.

## 1. Review package

Review these artifacts together:

1. `BVC-TM-TC-007_CND-001_RECOVERY_PROCEDURE_V1.0.md`
2. `BVC-TM-TC-007_CND-001_RECOVERY_TEST_REPORT_2026-11-26.md`
3. `cnd001-recovery-test.ts`
4. `synthetic-v2-workspace.json`
5. `preserved-full-v2-workspace.json`
6. `v1-compatible-projection.json`
7. `cnd-001-test-results.json`
8. `cnd-001-manifest.json`

Source provenance to consider:
- Owner-supplied `BVC_GAIS_Source_Export_2026-11-25.zip`, SHA-256 `0c12a7a4a835947b3cf67eb300a49bc8ab58e3861f9863d130cf09a8751378f7`.
- `app/page.tsx`, SHA-256 `4f926f8c9836c94505f71651871283f4299182fe181ecb432110d06c462ace5e`.
- The harness includes the B2 `parseWorkspace` logic extracted from `app/page.tsx` lines 5-95. Assess whether the copy is faithful to the source logic and whether its test use is accurately described.

## 2. Required challenge questions

1. Does the procedure preserve the complete v2 payload before creating a v1 projection?
2. Does the v1 projection preserve `workspaceId`, every task ID/title, task count and order?
3. Is the projection envelope acceptable to the actual B2 parser requirements, including exact top-level/data/task keys, UUID workspace ID, empty non-task collections and historical task-ID rule?
4. Does the test incorrectly impose a UUID-only requirement on historical task IDs?
5. Are `status`, `priority`, `due_date`, `focus_date` and `settings.timezone` preserved in the full v2 copy while omitted only from the projection?
6. Are malformed v2, missing fields, duplicate IDs, invalid title, invalid timezone, projection failure and interruption handled fail-closed?
7. Is the byte-for-byte/fingerprint evidence sufficient for the synthetic fixture and preserved copy?
8. Does the procedure avoid `removeItem(v2)`, automatic rollback, stale-v1 fallback and unauthorized v1 overwrite?
9. Is the post-downgrade split-brain risk correctly handled? In particular, if B2 accepts new writes under v1 while the preserved v2 remains at v2, could a later C1 launch ignore newer v1-only changes? Is the inspection-only restriction adequate, or is another control needed?
10. What remains unproven because the tests use a synthetic fixture and isolated harness rather than live GAIS Preview and Local Storage?
11. Are there any schema assumptions not supported by Contract #007, the accepted B2 source, or the accepted Phase 3.2 data model?

## 3. Expected response format

Return a structured report with:

- `REVIEW_DISPOSITION`: `NO_BLOCKING_FINDINGS`, `BLOCKING_FINDINGS`, or `INSUFFICIENT_EVIDENCE`.
- `SOURCE_FIDELITY`: PASS / CONCERN / NOT_VERIFIED.
- `DATA_PRESERVATION`: PASS / CONCERN / NOT_VERIFIED.
- `B2_PARSER_COMPATIBILITY`: PASS / CONCERN / NOT_VERIFIED.
- `FAILURE_HANDLING`: PASS / CONCERN / NOT_VERIFIED.
- `SPLIT_BRAIN_CONTROL`: PASS / CONCERN / NOT_VERIFIED.
- `LIVE_RUNTIME_LIMITATIONS`: exact boundaries not proven.
- Findings table with ID, severity, evidence, impact, required correction.
- Whether the synthetic-copy test supports CND-001 technical test completion, and any explicit conditions before Human Owner approval.

Do not claim that live GAIS recovery was tested. Do not call a hypothetical risk an observed defect. Distinguish source-backed facts, test evidence and recommendations. Do not write or modify any artifact.
