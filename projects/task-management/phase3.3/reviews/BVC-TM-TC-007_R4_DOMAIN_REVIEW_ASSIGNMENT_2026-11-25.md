# BVC-TM-TC-007 Revision 1 — R4 Data Privacy/Security Review Assignment

**Assignment ID:** BVC-TM-TC-007-R4-REVIEW-001  
**Recorded:** 2026-11-25  
**Contract:** BVC-TM-TC-007, Revision 1 — APPROVED  
**Risk:** R4  
**Contract authority:** The approved Contract #007 Revision 1 on `main`; this assignment does not amend its scope, acceptance criteria, verification checks or recovery requirements.

## 1. Human Owner designation

The Human Owner confirmed the following operating model in ChatGPT on 2026-11-25:

| Responsibility | Assigned party | Role |
|---|---|---|
| Prompt Architect | ChatGPT | Prepare the eventual Gemini execution prompt from the approved Contract and accepted review/recovery outcomes |
| R4 Data Privacy/Security Domain Authority | ChatGPT | Evaluate the review record and technical evidence; issue the internal AI-assisted domain-review disposition |
| R4 technical reviewer | DeepSeek | Conduct a separate model-based technical review and provide findings, risks, evidence requests and recommendations |
| Implementation executor | Gemini in Google AI Studio | Execute only after all gates and a separate Human Owner execution authorization |
| Final governance / execution authority | Human Owner | Accept or reject conditions and issue the separate action-level execution authorization |

This is an **AI-assisted internal domain-review arrangement** designated by the Human Owner. ChatGPT and DeepSeek do not claim professional certification, legal/DPO status, or third-party audit status. Where a qualified human reviewer is available and required by the applicable policy or the Owner, that review remains a supplemental control; AI review must not be represented as a substitute for such professional assurance.

## 2. Status at assignment

- Contract #007 Revision 1: **APPROVED** by the Human Owner; canonical on `main` through merged PR #88.
- Reviewer assignment: **DESIGNATED** — DeepSeek as technical reviewer; ChatGPT as R4 Domain Authority.
- DeepSeek technical report: **PENDING**.
- ChatGPT domain-review disposition: **PENDING**; no approval is pre-granted by this assignment.
- Post-migration recovery test against a copy of the v2 workspace: **NOT_TESTED**.
- Separate Human Owner execution authorization: **NOT_GRANTED**.
- Fresh live GAIS app/source and single-writer preflight (VC-001): **NOT_RUN**.
- Prompt #0006: **NOT_ALLOCATED**.
- GAIS source and browser workspace: **UNCHANGED** by this assignment.

## 3. Scope of DeepSeek technical review

DeepSeek must perform a read-only review of Contract #007 and its referenced design/governance sources. It must not edit repository files, generate implementation patches, access or modify the live GAIS application, inspect or change real browser storage, run migrations, or authorize execution.

Review at least the following areas:

1. **Data flow and privacy**
   - Identify what learner/task data is persisted, where it is read/written, and where it is rendered.
   - Assess whether task titles may contain personal or confidential information and identify realistic exposure paths.
   - Identify data retention, disclosure, browser-profile and same-origin script assumptions. Do not invent an account, server or cloud data flow; the approved scope is browser Local Storage only.

2. **Browser storage threat model**
   - Assess Local Storage's security properties and limitations, including same-origin JavaScript access and the consequences of an XSS/script-compromise scenario.
   - Distinguish storage persistence from confidentiality, encryption, access control and backup. Do not describe Local Storage as a secure vault or backup.
   - Check that no secrets, credentials or privileged tokens are introduced.

3. **Migration and data integrity**
   - Check v1/v2 envelopes, schema validation, stable workspaceId, task IDs and titles.
   - Assess construct-in-memory → validate → single v2 write → read-back → validate → activate ordering.
   - Check handling of an existing valid v2, malformed v2, malformed v1, unsupported versions and empty workspace.
   - Confirm legacy defaults are only `status: todo` and `priority: normal`; no due_date or focus_date is invented; v1 is not mutated.

4. **Failure modes and safe stop behavior**
   - Examine parse, validation, quota/write, read-back, corruption and partial-state failures.
   - Verify that an invalid present v2 is a hard recovery state and must not fall back to a potentially stale v1 snapshot.
   - Verify that failures do not create false save-success claims, silently clear data or permit further mutations.

5. **Post-migration downgrade/recovery**
   - Assess the proposed procedure against the full current v2 payload, not merely the initial v1 checkpoint.
   - Preserve every v2 task ID/title and all v2-only fields while constructing a v1-compatible projection.
   - Require an isolated copy-based test, explicit stop conditions and Owner approval before any destructive key replacement.
   - Do not claim v1 alone is a rolling backup or that recovery is proven until the procedure has actually been tested.

6. **Acceptance and evidence**
   - Assess AC-003, AC-004, AC-009, AC-011 and VC-002, VC-003, VC-004, VC-009, VC-010 in particular; consider all other criteria where they affect privacy, integrity or security.
   - Identify exactly what evidence is needed for Evidence Level 3 and what requires actual Preview/Owner observation (Evidence Level 4).
   - Distinguish source inspection, test design, test execution and observed runtime evidence.

## 4. Required DeepSeek report format

Return a structured report in Vietnamese (technical identifiers may remain in English) with:

- Executive assessment and the exact Contract revision reviewed.
- Scope and sources actually inspected; list anything unavailable.
- Data-flow summary and lightweight threat/impact model.
- Findings table: ID, severity (`CRITICAL/HIGH/MEDIUM/LOW/INFO`), affected requirement/path, evidence, failure scenario, impact, recommended mitigation, and whether it blocks execution.
- Migration and recovery review, including a concrete failure-case matrix.
- Evidence gaps and reproducible tests required; do not label unrun tests PASS.
- Scope-compliance assessment against the one-file / 500-line Contract boundary.
- Explicit recommendation: `RECOMMEND_APPROVAL`, `RECOMMEND_APPROVAL_WITH_CONDITIONS`, or `RECOMMEND_REJECTION`, with rationale and unresolved conditions.

Use `NOT_VERIFIED` when evidence is absent. Do not infer implementation behavior from a proposal or a generated prompt. Do not invent vulnerabilities or assert their absence without explaining the inspected evidence and assumptions.

## 5. ChatGPT Domain Authority decision protocol

ChatGPT will not simply copy DeepSeek's recommendation. As the designated AI Domain Authority, ChatGPT must independently evaluate the report against the approved Contract, Risk Policy and available source/evidence. The decision record must:

- Confirm the exact Contract revision and reviewed artifacts.
- Accept, reject or reclassify each material finding with rationale.
- Identify evidence gaps and mandatory remediation.
- Issue one of `APPROVED`, `APPROVED_WITH_CONDITIONS` or `REJECTED`.
- State that a domain-review approval does **not** grant execution authorization.

ChatGPT also serves as Prompt Architect. To control role coupling, the execution prompt must be prepared only after the domain review and recovery requirements are resolved; the prompt itself is not evidence of safety and cannot approve the design it describes.

## 6. Execution gates remain separate

No implementation may begin until all applicable conditions are met:

1. DeepSeek technical review is received and assessed.
2. ChatGPT records the R4 domain-review decision and all required conditions are satisfied.
3. The post-migration downgrade/recovery procedure is tested against a copy of the v2 workspace and approved by the Human Owner and ChatGPT Domain Authority.
4. The Human Owner issues a separate, explicit execution authorization for Gemini under Contract #007 Revision 1.
5. Fresh live GAIS app identity/source and single-writer preflight VC-001 pass.
6. Prompt #0006 is allocated and prepared in accordance with the Prompt Delivery Standard; Gemini acknowledges its bounded scope before making changes.

Until then, keep Prompt #0006 `NOT_ALLOCATED`, execution `NOT_AUTHORIZED`, and GAIS unchanged.

## 7. Source of authority

- Contract: `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-007_TASK_CONTRACT_V0.1.yaml`
- Risk Policy: `projects/task-management/governance/BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md`
- Data Model: `projects/task-management/design/architecture/v0.1/BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md`
- Decision Register: `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md`
- Contract approval: merged PR #88
- Human Owner role-designation decision: ChatGPT conversation, 2026-11-25

**This assignment records reviewer roles and the review process only. It is not a domain approval, implementation prompt, execution authorization, GAIS preflight, migration test, or acceptance record.**
