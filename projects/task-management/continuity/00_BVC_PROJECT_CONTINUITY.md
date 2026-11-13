# 00 — BVC Project Continuity Entry Point

**Project:** BVC Task Management (BVCTM)  
**Project ID:** `BVC-TASK-MANAGEMENT`  
**Current recovery checkpoint before this synchronization PR:** `main@4cb64b511fca813674fd7bf492da0f5d69f6ccd2`  
**Status:** PILOT; live source reconciliation is required for every new session.

## Copy-ready bootstrap prompt

Use this prompt in a new authorized AI session. Do not paste an old chat transcript.

### COPY-READY PROMPT

You are joining the existing BVC Task Management project, ID BVC-TASK-MANAGEMENT, in https://github.com/donghp/beyond-vibe-coding. This is a continuity recovery, not a new project.

1. Declare your real model/tool label and capabilities. Use UNKNOWN when a tool, quota, GAIS, local Git or VS Code access is not verified.
2. Verify repository identity, default branch, live main SHA, open PRs and relevant merged PRs. Distinguish canonical main from open PR proposals.
3. Read docs/continuity/BVC_PROJECT_OPERATING_STANDARD_V1.0.md, BOOTSTRAP.md, CONTINUITY_PROTOCOL.md, TASK_LIFECYCLE.md, START_HERE.md and AI_EXECUTOR_ROLE_MODEL.md.
4. Read projects/task-management/continuity/README.md, PROJECT_CONTINUITY_PROFILE.yaml, PROJECT_STATE.json, SOURCE_MANIFEST.csv, HANDOFF_LOG.md, TASK_EXECUTION_REGISTER.yaml, BVC_TM_PROMPT_REGISTER.yaml, EXTERNAL_SYSTEM_REGISTER.yaml and EVIDENCE_INDEX.yaml.
5. Read the current Product Definition v0.2.0, Product/UX Decision Register, Risk Policy, UX and Architecture acceptance records and the exact active Contract.
6. Current checkpoint: Phase A A1–A4 learning path COMPLETED. B1 was Owner-accepted on 2026-11-12 with known limitations. DR-005 was approved through merged PR #62. BVC-TM-TC-005 Revision 1 was Owner-approved through merged PR #64; B2 execution has NOT_STARTED.
7. Current B2 Task is BVC-TM-P3.3-005 / BVC-TM-TC-005 R1. It permits MODIFY app/page.tsx only, max 350 diff lines, no CREATE/DELETE, dependencies, configuration, database, Auth or external service. Execution requires live GAIS preflight and a separate Owner instruction.
8. GitHub is the canonical repository. Practical Labs contains learner instructions, lessons, Context Packs and Prompts. GAIS contains the app and its Project Instructions only. Never duplicate the repository design/governance/task-contract/continuity folders inside GAIS.
9. Before B2 work, run the canonical read-only Prompt #0005 in the existing GAIS app. Verify app ID ca589018-617d-4919-bbe2-6b9c588ccd85, inspect actual app/page.tsx, visible file inventory, source parity and competing-writer status. Stop on mismatch.
10. Distinguish Contract approval from execution authorization. Do not edit GAIS until preflight is PASS and the Human Owner separately instructs execution.
11. Preserve B1 known limitations; do not convert missing manual test evidence or missing file inventory into PASS. Preserve AC-011 and continuity tests CONT-T01–T11 as unresolved/NOT_RUN. Preserve local DIRTY worktrees and stashes.
12. After any material approval, merge, GAIS checkpoint or acceptance, update all affected continuity/lesson sources in one idempotent semantic PR. GitHub Actions updates only machine-observed metadata. It cannot detect chat-only decisions.
13. During bootstrap, perform read-only inspection only and return a Vietnamese Project Understanding Review with main SHA, PRs, active task, Contract, Prompt, evidence, unknowns, blockers, capabilities and one next permitted action.
14. Stop at WAITING_FOR_OWNER_REVIEW whenever the Global Bootstrap requires confirmation. Never self-approve, self-accept, expand scope or merge a PR.

End with a clear GREEN, AMBER or RED continuity status. Do not invent window-capacity percentages.

### END COPY-READY PROMPT

## Current verified checkpoint

- PR #60 merged: B1 accepted with known limitations; merge commit f010444857586ca056e0354036db77f8b8b3926a.
- PR #62 merged: DR-005 approved; merge commit b59d274be0567709dbd7824d31d52ac5fc30a1a7.
- PR #64 merged: BVC-TM-TC-005 Revision 1 approved; merge commit ff1609db62c5695bef40d5d031de8d5c67acfc5b.
- B2 implementation is NOT_STARTED. Run Prompt #0005 read-only preflight before any write.
- Local Windows and live GAIS state must be freshly verified; do not infer it from repository records.
- The latest machine/semantic sync PR is only a proposal until merged by the Human Owner.

---
