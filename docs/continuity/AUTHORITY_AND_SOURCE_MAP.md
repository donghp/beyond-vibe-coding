# Authority and Source Map — BVC Build & Learn

This index is navigational; it does not override live `main`.

## Repository-wide authority
| Concern | Canonical source | Rule |
|---|---|---|
| Framework and project approach | `README.md`, `docs/` | Orientation; not permission to execute. |
| Task control | `specifications/v0.1/task-contract.md` + schema | Draft / Experimental v0.1.0; use exact schema/validator. |
| Context provenance | `specifications/v0.1/context-manifest.md` + schema | Records selected sources; does not prove retrieval/access enforcement. |
| Durable state | `specifications/v0.1/project-state.md` + schema | Snapshot, not transcript or automatic live state. |
| Verification | `specifications/v0.1/verification-evidence.md` + schema | Actual checks; acceptance separate. |
| Templates | `templates/` | Starter templates; sample data is not project fact. |

## Task Management canonical source map
| Order | Source | Authority / purpose |
|---:|---|---|
| 1 | `projects/task-management/README.md` | Project index and status narrative. |
| 2 | `projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md` | Current approved product baseline at snapshot; recheck later versions. |
| 3 | `projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md` | Approved product transition. |
| 4 | `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` | Canonical DR-001–DR-019 and ODEC crosswalk/status. |
| 5 | `projects/task-management/governance/BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md` | Project-specific R0–R5 controls. |
| 6 | `projects/task-management/design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md` | Formal Phase 3.1 UX acceptance gate. |
| 7 | `projects/task-management/design/ux/v0.1/` | UX journey, interaction, responsive, accessibility and wireframes. |
| 8 | `projects/task-management/design/architecture/v0.1/PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md` | Accepted design boundary, not runtime acceptance. |
| 9 | `projects/task-management/design/architecture/v0.1/` | Application, data, security/environment and development/testing/deployment architecture. |
| 10 | `projects/task-management/phase3.3/task-contracts/` | Active Phase 3.3 contracts; inspect latest revision/status. |

## Historical snapshot anchors (2026-11-05; recheck live)
- Repository `donghp/beyond-vibe-coding`, default branch `main`.
- Initial `main` SHA: `5641482236b2b7dc2f515a5125aa6e4c554139ef`.
- Product Definition v0.2.0 was the approved product baseline.
- Phase 3.2 Architecture Design Baseline accepted; not implementation/runtime acceptance.
- Phase 3.1 UX formal acceptance OPEN.
- Risk Policy BVC-TM-RISK-001 v0.1.0 published through PR #7 at initial main SHA.
- Task Contract #001 Revision 3: branch `docs/phase3.3-beginner-readiness-contract`, commit `e66f87cf76a8e64cc50a6f4bf12a9ac1bf559844`, status APPROVED. Human Owner supplied local validator PASS with zero failures.
- PR #8 for contract publication was observed OPEN and mergeable at last audit. Recheck current PR state.
- Task #001's intended outputs: `projects/task-management/phase3.3/BEGINNER_IMPLEMENTATION_READINESS_V0.1.md` and `projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_V0.1.yaml`.
- Task #001 does not authorize GAIS app creation, app code, Supabase, database/Auth/RLS, hosting or deployment.

## Known issue to inspect
Risk Policy metadata was observed to say `publication to main pending` after PR #7 merged. A later correction may exist. Check live `main` and open governance PRs; do not correct it under Task #001.

## Interpretation warnings
- Core Specifications v0.1.0 are Draft / Experimental, not an industry standard.
- Core example YAMLs are synthetic; not project evidence.
- `APPROVED` contract means eligible subject to all other gates, not executed/completed.
- Open PRs are not canonical until merged.
- GitHub branch metadata does not establish laptop working-tree state.
