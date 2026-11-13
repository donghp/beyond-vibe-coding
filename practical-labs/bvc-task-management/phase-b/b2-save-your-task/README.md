# Phase B · Lesson B2 — Save Your Task

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next: B3 →](../b3-close-and-reopen/README.md)  
> **Progress:** Phase B · Lesson B2 — Save Your Task

**Learning level:** Beginner  
**Learning outcome:** Save the task workspace in the current browser profile and understand where that data lives.  
**Lesson status:** Contract approved — `BVC-TM-TC-005` Revision 1 was published through merged PR #64 on 2026-11-13. GAIS implementation has not started; preflight and a separate Owner execution instruction are still required.

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

**Implementation authority:** BVC-TM-TC-005 Revision 1 is the approved Contract. Follow its exact one-file boundary, storage schema, acknowledgement behavior, failure handling and acceptance criteria. Contract approval is not an execution instruction. Do not edit GAIS until live preflight is complete and the Human Owner separately instructs execution.

## 3. Before you begin

- B1 has been implemented and its create/validation behavior has been accepted.
- The active B2 Task Contract is available and identifies the allowed files and verification requirements.
- DR-005 is approved; its exact Beginner disclosure and placement are documented above.
- The current source and data shape are inspected before asking AI to modify persistence.

If any condition is missing, use this lesson for understanding only. Do not ask AI to write storage code.

## 4. Learning sequence

When B2 is authorized:

1. Ask AI to explain the current in-memory task state and where it is created.
2. Review the approved storage-disclosure copy and where the learner will see it.
3. Ask AI to implement only the approved, versioned browser workspace behavior.
4. Confirm that adding a task updates the stored workspace.
5. Reload the Preview and check whether the task is loaded again.
6. Check the visible result and any storage error behavior.
7. Review the changed-file list and the Contract's verification evidence.

Do not let AI add Supabase, Firebase, an account, API calls, or cloud synchronization. Those are outside the Beginner B2 scope.

## 5. What counts as evidence

- The actual save interaction and visible result.
- A task created after B1 that is still available after a reload.
- The same app origin and browser profile used for the test.
- The approved first-use storage disclosure as displayed in the actual UI.
- A record of any error and how the app responds.
- The actual changed-file list and the verification result required by the B2 Contract.

A success message alone is not proof that data was saved. B2 verifies the initial save/load behavior required by Contract. B3 remains a learner-focused close/reopen and recovery exercise; it does not repeat B2 implementation.

## 6. B2 completion checklist

- [x] DR-005 is approved and published through PR #62; actual GAIS disclosure remains to be verified.
- [x] BVC-TM-TC-005 Revision 1 is Owner-approved and canonical on main via PR #64.
- [ ] Beginner storage uses only the approved browser-local approach.
- [ ] No external database, account, or cloud sync has been added.
- [ ] The saved workspace can be loaded after a reload.
- [ ] Storage errors are reported truthfully.
- [ ] The learner understands that clearing browser site data may remove the workspace.

## 7. Implementation preflight

Before execution, verify the existing GAIS project ID, inspect the live `app/page.tsx`, confirm that it matches the Owner-provided B1 source, review the current file-change inventory, and confirm there is no competing writer. Stop if more than `app/page.tsx` must change. GitHub contains the canonical Product, UX, Architecture, Governance and Contract documents; GAIS is only the application workspace. Do not create repository-level folders such as `design/`, `governance/` or `task-contracts/` inside GAIS.

## 8. Next lesson

After B2 is implemented and accepted, continue to [B3 — Close and Reopen](../b3-close-and-reopen/README.md) for the learner's independent close/reopen and recovery exercise.

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next → B3](../b3-close-and-reopen/README.md)
