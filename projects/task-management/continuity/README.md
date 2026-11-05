# BVCTM Project Continuity

**Project:** BVC Task Management (BVCTM)\
**Project ID:** `BVC-TASK-MANAGEMENT`\
**Continuity profile:** `BVC-TM-CONTINUITY-PROFILE` v0.1.0\
**Maturity:** PILOT — not yet validated for cold-start recovery\
**Prepared against GitHub main:** `53ed2649bd5ee687ae76be686db5838f4b9b0173`\
**Prepared at:** `2026-11-05T21:54:16+07:00`

## Purpose

This folder is the durable, project-owned continuity record for BVC Task Management. It exists so a new ChatGPT window, a different AI model, or a human maintainer can reconstruct the project context from repository sources rather than relying on the previous conversation's memory.

**The project owns its knowledge, state, authority, and evidence. AI reconstructs context from the project.**

## Contents

| File | Responsibility | Update trigger |
|---|---|---|
| `00_BVC_CHATGPT_CONTINUITY.md` | New-session entry point and bootstrap instructions | Bootstrap path or recovery rules change |
| `PROJECT_CONTINUITY_PROFILE.yaml` | BVCTM-specific continuity configuration and domain rules | Project architecture or continuity design changes |
| `PROJECT_STATE.json` | Current project snapshot conforming to BVC Project State Draft/Experimental v0.1.0 | Material state, milestone, task, risk, or recovery change |
| `SOURCE_MANIFEST.csv` | Navigation map to current canonical and supporting sources | Source path, authority, or bootstrap requirement changes |
| `HANDOFF_LOG.md` | Short record of material checkpoints and session handoffs | Meaningful checkpoint, decision, blocker, task transition, or handoff |
| `registers/` | Prompt, task execution, and external-system registers specific to BVCTM | Corresponding register event occurs |
| `evidence/` | Evidence index and source pointers; not a substitute for original evidence | New screenshot, test, report, or external-system observation |
| `validation/` | Continuity test plan and results | Test plan changes or a test is actually run |

## Authority and source precedence

1. Current explicit Human Owner decisions in approved canonical governance records on `main`.
2. Current approved project governance, Product Definition, and accepted design baselines on `main`.
3. The exact currently approved Task Contract and its required context.
4. Accepted execution records and verification evidence on `main`.
5. `PROJECT_STATE.json` and `HANDOFF_LOG.md` as snapshots and navigation aids; reconcile them against current sources.
6. Open PRs and feature branches as proposals only. They are not canonical until merged and accepted under project governance.
7. Chat history, AI memory, exported prompts, and unverified statements as historical leads only, never proof of current state.

This hierarchy is aligned with the BVC Global Continuity Bootstrap. The global protocol controls continuity behavior; this profile defines BVCTM-specific details.

## Important current boundaries

- Product Definition v0.2.0 is the current Product Owner-approved product baseline.
- Phase 3.2 is an accepted design baseline, not runtime or deployment acceptance.
- Formal Phase 3.1 UX Acceptance remains OPEN.
- `BVC-TM-TC-003` Revision 1 is APPROVED for one isolated, non-production blank WEB app scaffold inspection and two documentation outputs only.
- Task #003 does not authorize Task Management functionality, persistence, Auth, database, API, GitHub app connection, hosting, or deployment.
- PR #15 was merged into `main` on 2026-11-05 at 2026-11-05T21:50:29+07:00; its Lesson A1 and Prompt #0001 changes are now canonical. Merge does not mean Prompt #0001 has been run in GAIS.
- The A1-01 screenshot has been supplied in the conversation; its PNG binary has not yet been verified as committed to the repository.
- Local working-tree status cannot be established from GitHub. It is recorded as UNKNOWN until checked on the user's computer.

## Update protocol

Update continuity on meaningful events, not after every chat message. Distinguish:

- machine-observed Git facts;
- AI-prepared semantic interpretation;
- Human Owner decisions and acceptance;
- owner-reported local or external facts;
- unknown or unverified states.

Do not let a machine updater change product decisions, task completion, acceptance, risk status, or source authority.

## Security

Never store API keys, passwords, access tokens, credentials, private account details, billing data, or confidential customer information in this folder. Store references and non-secret names only. Keep the GAIS app itself and exported scaffold ZIP outside the BVC repository unless a separate approved task authorizes otherwise.

## Validation status

The initial files are prepared and structurally validated as described in `validation/CONTINUITY_TEST_RESULTS.md`. The cross-session recovery test and cross-model test have **NOT_RUN**. Do not claim this continuity system is proven until those tests have been executed and recorded.

## Revision 2 checkpoint

This package revision reconciles the snapshot after PR #15 merged. It does not change the approved BVC-TM-TC-003 Revision 1 scope, mark Prompt #0001 as executed, or claim A1-01 PNG synchronization.
