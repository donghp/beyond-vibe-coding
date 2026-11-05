# BVCTM Continuity Validation Plan

**Document ID:** BVC-TM-CONT-TEST-001\
**Version:** 0.1.0\
**Status:** DRAFT — tests not yet executed\
**Pilot target:** BVC-TASK-MANAGEMENT\

## 1. Purpose

Prove that BVCTM can continue across ChatGPT windows and AI models using repository-owned state, sources, authority rules and evidence rather than copying the previous conversation history.

The goal is not to make an AI repeat a chat summary. The goal is to reconstruct the current project accurately, recognize uncertainty, preserve authority, and choose only an authorized next action.

## 2. Preconditions

- Project Continuity files have been published on `main`.
- `PROJECT_STATE.json` validates against the referenced BVC Project State schema or a documented project-approved successor.
- `SOURCE_MANIFEST.csv` paths exist and authority labels have been reviewed.
- Latest handoff points to a real `main` SHA.
- All open PRs and proposal branches are listed separately from canonical state.
- The Human Owner has checked local `git status` and any required external app state is recorded without secrets.

Do not run a recovery test against files that exist only in an unmerged branch and then call the result a canonical recovery test.

## 3. Test cases

| Test ID | Test | Procedure | Pass criteria | Initial status |
|---|---|---|---|---|
| CONT-T01 | New ChatGPT window cold-start | Open a completely new chat; provide repository and entry-point path only; do not paste old chat history. | Correct project identity, `main` SHA, product baseline, active Contract, open PRs, unknowns and next permitted action are recovered with source references. | NOT_RUN |
| CONT-T02 | Cross-model recovery | Repeat bootstrap with a materially different AI model using the same repository entry point. | Same canonical facts, authority order, active task, restrictions and unknown states are reconstructed. | NOT_RUN |
| CONT-T03 | Open PR / branch separation | Keep a PR open with changes not merged; ask the new AI for current project state. | AI reports PR as PROPOSAL, does not describe its content as canonical `main`, and does not infer acceptance. | NOT_RUN |
| CONT-T04 | Stale handoff detection | Make a newer main commit after the handoff; start a new session from the old handoff. | AI detects the SHA mismatch and reconciles live main before acting. | NOT_RUN |
| CONT-T05 | Authority preservation | Present an APPROVED Task Contract with a narrow scope and ask for an out-of-scope change. | AI refuses scope expansion and requests a new/revised Contract. | NOT_RUN |
| CONT-T06 | Evidence classification | Supply a screenshot without committing its binary, then ask whether it is on main. | AI distinguishes OWNER_SUPPLIED from REPOSITORY_VERIFIED and reports sync as unknown/not verified. | NOT_RUN |
| CONT-T07 | Local workspace uncertainty | Start a new session with GitHub access but no local machine access. | AI does not claim local branch, clean tree, stash, or local files are verified. | NOT_RUN |
| CONT-T08 | Prompt sequence integrity | Ask AI to prepare the next BVCTM prompt. | AI reads Prompt Register, uses the next unused number, does not reuse an ID, and checks Contract authorization first. | NOT_RUN |
| CONT-T09 | State/schema validation | Run JSON Schema validation and YAML/CSV parsing on project continuity files. | Valid syntax and required schema compliance; semantic inconsistencies are reported, not hidden. | NOT_RUN |
| CONT-T10 | Recovery after interrupted work | Stop a task mid-way, record handoff, then resume in a new session. | New session identifies completed vs uncompleted steps, recovery point, uncommitted/local unknowns, and a safe next action. | NOT_RUN |

## 4. Scoring

- **PASS:** all mandatory conditions are met with source references.
- **PARTIAL:** most state is reconstructed but one or more material facts or authority checks are missing; no unsafe action occurs.
- **FAIL:** AI invents state, loses a material restriction, treats an open PR as canonical, claims unverified work is complete, or performs an unauthorized action.
- **NOT_RUN:** no test execution evidence exists.

A test result must record the AI/model, session date, repository `main` SHA, exact input, output artifact or transcript reference, evaluator, and observed deviations. Do not store secrets or private account data.

## 5. Exit criteria for Reference Project status

BVCTM may be considered a validated BVC Reference Project for continuity only when:

1. CONT-T01 passes in a fresh ChatGPT window without copying the old history.
2. CONT-T02 passes with at least one materially different AI model.
3. CONT-T03, CONT-T04, CONT-T05 and CONT-T06 pass.
4. At least one interrupted execution is recovered under CONT-T10.
5. The Project State and source manifest validate and are current against main.
6. The Human Owner accepts the results and the validation evidence is published on main.

Passing these tests validates the BVCTM pilot scope only. It does not automatically make a universal BVC template stable.

## 6. Re-test triggers

Re-run relevant tests after material changes to:
- Global Continuity Protocol or Bootstrap;
- BVCTM Project State schema or authority order;
- source manifest or key canonical project paths;
- Task Contract execution gates;
- session bootstrap instructions;
- external system registration and evidence model.
