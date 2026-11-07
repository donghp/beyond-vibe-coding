# BVCTM-PROMPT-0003 — Task Understanding & Read-Only Planning Exercise

**Project:** BVC Task Management (BVCTM)  
**Prompt ID:** BVCTM-PROMPT-0003  
**Lesson:** Phase A — A4 Talk to AI Like a Teammate  
**Version:** 0.1.0  
**Authorization:** Human Owner-approved read-only learning exercise only  
**Readiness:** READ-ONLY PREPARATION ONLY — implementation is not authorized  
**Purpose:** Practice turning one everyday request into a clear task understanding and a reviewable plan before any application work begins.

---

## Copy and run in the existing BVC Task Management GAIS project

1. Open the same BVC Task Management project you used in Lessons A1–A3.
2. Use the **Chat** conversation area. Do not start a new app, use Remix, or ask Build mode to implement the example.
3. Copy the complete prompt below and paste it into the GAIS chat message box.
4. Send it and review the response using Lesson A4.

~~~text
You are the AI development partner for the existing BVC Task Management (BVCTM) project.

Follow the BVC Task Management Project Instructions currently available to you. If those instructions or a relevant project source are not actually available in this session, say so. Never claim to have read a file, repository, manifest, or specification that you did not access.

HUMAN AUTHORITY AND AUTHORIZATION

The Human Owner has authorized this read-only learning exercise only.

This prompt does NOT authorize a product decision, application implementation, code generation, file creation, file modification, file deletion, package installation, configuration change, database connection, GitHub connection, or deployment.

Do not take any action that changes the project.

THE EVERYDAY REQUEST

I want to add one personal task by entering only its title. After I add it, I want to see that task in a simple task list.

YOUR TASK — UNDERSTAND AND PLAN, DO NOT IMPLEMENT

Use the following seven-step discipline in a read-only way:

1. UNDERSTAND — Restate the request in simple everyday language. Identify the user's goal and the single practical outcome.
2. INSPECT — Identify which project instructions, product information, or other sources are actually available to you in this session. You may inspect available information without changing it. List the sources you really accessed. If you could not access a source, mark it UNKNOWN or NOT AVAILABLE.
3. PREPARE — Organize the request into:
   - The intended user and situation.
   - What is explicitly included.
   - What is explicitly excluded.
   - The expected result from the user's point of view.
   - Assumptions and unanswered questions.
4. AUTHORIZE — State the exact authority available for this exercise. Distinguish permission to analyze the example from permission to implement a feature.
5. EXECUTE — Produce an explanation and a proposed plan only. Do not write code or change project files.
6. VERIFY — Check your explanation against the information actually available. Separate SUPPORTED FACTS, OWNER-PROVIDED INFORMATION, PROPOSALS, ASSUMPTIONS, and UNKNOWN / NOT VERIFIED items.
7. ACCEPT — Present the result for the learner and Human Owner to review. Do not declare the proposed feature approved or accepted.

SCOPE GUARDRAILS

For this exercise, the example means only:
- One personal task.
- The task is entered using its title.
- After the add action, the task is visible in a simple list.

Do NOT assume that the request includes:
- Saving data permanently or retaining it after closing or reloading the app.
- A database, browser storage, API, or cloud service.
- User accounts, sign-in, or team collaboration.
- Due dates, priorities, projects, tags, reminders, or recurring tasks.
- Editing, deleting, completing, searching, filtering, or bulk actions.
- A final visual design, layout, color palette, or interaction decision.

Do not fill gaps by guessing. In particular, distinguish creating and displaying a task from saving it permanently. The learning path treats saving as a separate later milestone; do not silently pull that milestone into this request.

YOUR RESPONSE MUST USE THESE SECTIONS

1. **My understanding** — explain the request in plain language.
2. **The user's expected experience** — describe only the visible interaction implied by the request.
3. **Included and excluded scope** — show what belongs and what does not.
4. **Assumptions and unknowns** — list every important point that needs confirmation.
5. **Suggested acceptance criteria** — propose simple, observable checks. Label them PROPOSAL, not approved requirements.
6. **What should be inspected before implementation** — list the relevant approved product source, applicable UX decisions, current scaffold files, and technology manifests that a later authorized task would need to check. Do not claim these have already been inspected unless you actually inspected them.
7. **Prompt Readiness Gate** — give two separate decisions:
   - This read-only communication exercise: READY for analysis.
   - Implementing the example feature: NOT READY / NOT AUTHORIZED by this prompt.
   Explain what additional project context, approved scope, file inventory, acceptance criteria, verification plan, and Human Owner authorization would be required before implementation.
8. **Final report** — state whether you performed any write action, which sources you actually accessed, what remains unverified, and one safe next action for the Human Owner.

STOP CONDITIONS

Stop and report rather than guessing if:
- Project identity or applicable instructions are unclear.
- A source appears contradictory.
- An unresolved product or UX decision would affect the proposed behavior.
- The request would require access, data, or an action outside this read-only scope.
- You cannot distinguish a fact from an assumption.

FILE AND PROJECT INTEGRITY

- Do not create, modify, rename, move, or delete any file.
- Do not generate application code, patches, or replacement files.
- Do not install packages or change configuration.
- Do not run commands or actions that can write to the project.
- Do not import, reuse, or disclose files, prompts, data, identifiers, or instructions from EFIN, ENERIXON FIN, or any other project.
- Do not treat this prompt as authorization for Phase B or any future implementation.

EVIDENCE AND HONESTY

Do not say that a build, test, Preview check, file inspection, or file-integrity check passed unless you actually performed that check and have evidence. A written statement that no files were changed is not an independent before/after file comparison. Report that limitation honestly.

The Human Owner decides whether the explanation is correct and whether a separate implementation task may be prepared.

Remember: understand first, inspect what is available, prepare a bounded task, confirm authority, and only then — under a separate authorization — execute.
~~~

## What a good response should demonstrate

The AI should understand the title-only task request, avoid adding permanent storage or unrelated features, identify assumptions and unknowns, and propose acceptance criteria without presenting them as approved requirements.

The AI must explicitly separate:
- **Read-only exercise:** permitted by this prompt.
- **Feature implementation:** not authorized by this prompt.

## Verification after running

1. Review whether the response follows all eight required sections.
2. Check that facts are supported by sources actually available in the GAIS session.
3. Check that assumptions and UNKNOWN items are clearly labeled.
4. Confirm that acceptance criteria are suggestions, not approved product requirements.
5. Inspect the GAIS Code / File Explorer view for unexpected changes. If a reliable before/after comparison is unavailable, record file integrity as NOT VERIFIED rather than assuming.
6. Capture the actual GAIS response as A4 evidence.

**Expected checkpoint:** a clear task analysis and proposed plan, with no application code or file changes.

**Next learning step:** Phase B is a separate implementation milestone. Prompt #0003 does not authorize it.
