# CND-001 Recovery Test Package

This package contains the isolated synthetic-copy test for BVC-TM-TC-007 Revision 1 / CND-001.

## Contents

- `BVC-TM-TC-007_CND-001_RECOVERY_PROCEDURE_V1.0.md` — recovery procedure and operational limits.
- `BVC-TM-TC-007_CND-001_RECOVERY_TEST_REPORT_2026-11-26.md` — actual 20-case test outcome, fingerprints and limitations.
- `cnd001-recovery-test.ts` — isolated harness. Its B2 `parseWorkspace` implementation is copied from the Owner-supplied 2026-11-25 export, `app/page.tsx` lines 5–95.
- `synthetic-v2-workspace.json` — non-sensitive synthetic v2 source fixture.
- `preserved-full-v2-workspace.json` — byte-identical preserved full-v2 copy.
- `v1-compatible-projection.json` — separately generated projection accepted by the B2 parser.
- `cnd-001-test-results.json` — machine-readable 20/20 test results.
- `cnd-001-manifest.json` — artifact hashes and ID/title comparison.
- `DEEPSEEK_CND_001_READ_ONLY_CHALLENGE_PROMPT.md` — read-only challenge instructions.

## Re-run

Use Node.js v22 or compatible with built-in TypeScript type stripping:

```bash
node --experimental-strip-types cnd001-recovery-test.ts synthetic-v2-workspace.json output/
```

The harness writes the preserved copy, projection, test result JSON and manifest into the output directory. It only operates on the supplied synthetic fixture. It does not access GAIS, Preview, browser Local Storage, or real user data.

## Status

Technical test: PASS, 15/15. CND-001 governance closure remains pending DeepSeek's read-only challenge and Human Owner approval.