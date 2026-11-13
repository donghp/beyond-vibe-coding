# Phase B · Lesson B2 — Save Your Task

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next: B3 →](../b3-close-and-reopen/README.md)  
> **Progress:** Phase B · Lesson B2 — Save Your Task

**Learning level:** Beginner  
**Learning outcome:** Save the task workspace in the current browser profile and understand where that data lives.  
**Lesson status:** Contract approved — BVC-TM-TC-005 Revision 1 was approved and published through merged PR #64 on 2026-11-13. B2 implementation has NOT_STARTED; live GAIS preflight and a separate Human Owner execution instruction are required.

## 1. What you will learn

In B1, a task appears in the list but exists only in the page's current memory. B2 introduces saving so the application can load the task again after a page reload.

The approved design direction for the Beginner level is a small, versioned JSON workspace in browser `localStorage`. This is a design baseline, not proof that persistence has been implemented or tested.

## 2. Understand browser storage

For the Beginner learning level:

- Data is stored in the current browser profile for this application.
- It does not automatically synchronize to another browser, computer, or phone.
- Clearing the browser's site data may remove the saved workspace.
- It is not a cloud database or a backup service.
- Never use real passwords, API keys, private customer information, or sensitive data in the learning app.

**Approved disclosure — DR-005 (2026-11-13):** Before the first task that will be persisted, show this concise inline notice at the top of the workspace. The learner must acknowledge it before continuing. Keep the full explanation available later through More → Settings & Backup.

> **Where your tasks are stored**
>
> In Beginner mode, your tasks are stored in this browser on this device. They do not automatically sync to other browsers or devices.
>
> Clearing this site's browser data may delete your tasks.
>
> Browser storage is not a separate backup. You will learn to export a JSON backup in a later lesson.
>
> Do not enter passwords, API keys, or sensitive information in this learning app.
>
> **Action:** Got it — continue

A Vietnamese reference translation is recorded in the canonical Product/UX Decision Register. The approved English copy above is authoritative for the current Beginner implementation.

**Implementation authority:** BVC-TM-TC-005 Revision 1 is the approved B2 Contract. It defines the one-file boundary, versioned browser workspace, DR-005 acknowledgement behavior, non-destructive storage failure behavior and acceptance criteria. Contract approval does not itself authorize Gemini to edit GAIS. The Human Owner must first run the read-only preflight and separately instruct execution.

## 3. Before you begin

- B1 has been implemented and its create/validation behavior has been accepted.
- BVC-TM-TC-005 Revision 1 is Owner-approved and canonical on main through PR #64.
- DR-005 is approved; its exact Beginner disclosure and placement are documented above.
- The current source and data shape are inspected before asking AI to modify persistence.

If any condition is missing, use this lesson for understanding only. Do not ask AI to write storage code.

## 4. Learning sequence

Follow these steps in order. Do not skip the preflight gate.

1. Read BVC-TM-TC-005 Revision 1 and the [B2 Context Pack](../../../../projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_B2_V0.1.yaml). Understand that GitHub holds the canonical Product/UX/Architecture/Contract records; GAIS holds only the app and its Project Instructions.
2. Open the existing GAIS newbie app. Do not create a second app or copy repository folders such as design, governance, task-contracts or continuity into GAIS.
3. Open the canonical [Prompt #0005 — B2 GAIS Preflight](../../prompts/BVCTM_PROMPT_0005_PHASE_B2_GAIS_PREFLIGHT.md). This prompt is read-only: it inspects app identity, current app/page.tsx, visible file inventory, source parity and competing-writer state. It must change zero files.
4. Review the Gemini preflight report. If the app ID, source, file scope or writer state is unknown or differs materially, stop and ask the Human Owner. Do not use a write-capable prompt.
5. Only after preflight is accepted and the Human Owner separately instructs implementation may the approved B2 implementation prompt be prepared and used. That implementation prompt is not Prompt #0005 and must follow Contract #005 exactly.
6. After authorized implementation, add a harmless sample task and verify the app reports it saved only after the localStorage write succeeds.
7. Refresh the Preview in the same app origin and browser profile; verify that the saved task loads once and in the original order. This save/load check is required by B2 Contract.
8. Re-run B1 regression checks and inspect storage error/invalid-data behavior, responsive layout, the actual changed-file inventory and the Contract evidence list.

Do not let AI add Supabase, Firebase, an account, API calls, or cloud synchronization. Those are outside the Beginner B2 scope.

## 5. What counts as evidence

- The actual save interaction and visible result.
- A task created after B1 that is still available after a reload.
- The same app origin and browser profile used for the test.
- The approved first-use storage disclosure as displayed in the actual UI.
- A record of any error and how the app responds.
- The actual changed-file list and the verification result required by the B2 Contract.

A success message alone is not proof that data was saved. B2 must verify the initial save/load behavior required by Contract #005. B3 remains a separate learner exercise in closing and reopening the app and recording the same-profile result; it does not repeat the B2 implementation.

## 6. B2 completion checklist

- [x] DR-005 is approved and published through PR #62; actual GAIS disclosure remains to be verified.
- [x] BVC-TM-TC-005 Revision 1 is Owner-approved and canonical on main through PR #64.
- [ ] Beginner storage uses only the approved browser-local approach.
- [ ] No external database, account, or cloud sync has been added.
- [ ] The saved workspace is loaded successfully after a refresh in the same browser profile (B2 Contract verification).
- [ ] Storage errors are reported truthfully.
- [ ] The learner understands that clearing browser site data may remove the workspace.

## 7. Implementation preflight and execution boundary

Before any write-capable prompt:
- Confirm GAIS app ID is ca589018-617d-4919-bbe2-6b9c588ccd85.
- Inspect the live app/page.tsx immediately before editing.
- Confirm the file matches the Owner-supplied B1 source and only app/page.tsx needs to change.
- Confirm there is no competing writer or unsynchronized source.
- Confirm BVC-TM-TC-005 Revision 1 is still the active Contract on main.
- Obtain the Human Owner's separate execution instruction.

Stop if any check is missing, the source differs materially, or a second file/dependency/service is needed. The full explanation must remain accessible in the app without blocking routine task entry; the future More → Settings & Backup area is a product destination, not a page to build in B2.

## 8. Next lesson

After B2 implementation is accepted, continue to [B3 — Close and Reopen](../b3-close-and-reopen/README.md) for the independent learner close/reopen exercise.

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next → B3](../b3-close-and-reopen/README.md)
