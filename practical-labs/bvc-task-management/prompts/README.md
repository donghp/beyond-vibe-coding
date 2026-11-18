# BVC Task Management — Prompt Library

> **Quick navigation:** [Practical Labs Home](../../README.md) · [Project Index](../README.md) · [Phase A Index](../phase-a/README.md)

Use the prompts below only in the BVC Task Management GAIS project. Each prompt belongs to a specific lesson and must stay within that lesson's approved scope.

## Phase A prompts

| Prompt | Purpose | Lesson |
|---|---|---|
| [BVCTM-PROMPT-0001 — Initial Web App Scaffold](BVCTM_PROMPT_0001_INITIAL_WEB_APP_SCAFFOLD.md) | Create the initial blank web-app scaffold only. | [A1 — Meet Google AI Studio](../phase-a/01-meet-google-ai-studio/README.md) |
| [BVCTM-PROMPT-0002 — Project Instructions Understanding Check](BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md) | Read-only check that the AI can explain the project instructions. It must not modify files. | [A3 — Set Up Project Instructions](../phase-a/03-set-up-project-instructions/README.md) |
| [BVCTM-PROMPT-0003 — Task Understanding & Read-Only Planning Exercise](BVCTM_PROMPT_0003_TASK_UNDERSTANDING_AND_READ_ONLY_PLAN.md) | Read-only exercise that turns an everyday task request into a structured understanding and plan; it does not authorize implementation. | [A4 — Talk to AI Like a Teammate](../phase-a/04-talk-to-ai-like-a-teammate/README.md) |

## Phase B prompts

| Prompt | Purpose | Lesson |
|---|---|---|
| [BVCTM-PROMPT-0004 — Phase B1: Create Your First Task](BVCTM_PROMPT_0004_PHASE_B1_CREATE_FIRST_TASK.md) | Implement title-only task creation, visible in-memory list, empty-title validation and keyboard submission. | [B1 — Create Your First Task](../phase-b/b1-create-your-first-task/README.md) |
| [BVCTM-PROMPT-0005 — Phase B2: Save Your Task](BVCTM_PROMPT_0005_PHASE_B2_SAVE_YOUR_TASK.md) | Conditional one-file implementation of the approved browser-local task workspace and DR-005 disclosure. First response is read-only RC-005 acknowledgment; no edit until Owner confirms the gate. | [B2 — Save Your Task](../phase-b/b2-save-your-task/README.md) |

**Contract requirement:** Prompt #0004 is authorized only by BVC-TM-TC-004 Revision 1. It may modify only `app/page.tsx` in the existing GAIS app. It must not add persistence, dependencies, configuration, database, Auth, APIs or external integrations.

## Prompt use rules

Before using a GAIS prompt, read the mandatory [BVC GAIS Prompt Delivery Standard v1.0](../GAIS_PROMPT_DELIVERY_STANDARD_V1.0.md). Every learner-facing prompt must include a detailed Vietnamese explanation before the copy-ready execution instruction, followed by post-run review guidance.

- Read the linked lesson before running a prompt.
- Copy the complete canonical prompt; do not shorten or silently rewrite it.
- Use the intended BVC Task Management GAIS project.
- Review the actual result and check it against the lesson's completion criteria.
- A successful AI response does not by itself prove application behavior, file integrity, build success, tests, or deployment.
- Do not allocate a new prompt ID without checking the project Prompt Index and applicable Task Prompt Standard.

## Continue

- [Return to BVC Task Management Project Index](../README.md)
- [Return to Phase A](../phase-a/README.md)
- [Return to Practical Labs Home](../../README.md)


**B2 Contract requirement:** Prompt #0005 is governed by BVC-TM-TC-005 Revision 1. It may modify only app/page.tsx, with a maximum 350-line diff. The Owner issued conditional authorization on 2026-11-17. RC-003, RC-004 and RC-005 are PASS; the Human Owner explicitly confirmed RC-005 PASS — PROCEED WITH B2 on 2026-11-18. No GitHub connection is required in the Beginner GAIS workspace. Prompt and Context Pack are canonical on main through merged PR #67 (merge commit d4589251f24de90b52460385830bd72738573cba).
