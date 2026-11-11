# Phase B · Lesson B2 — Save Your Task

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next: B3 →](../b3-close-and-reopen/README.md)  
> **Progress:** Phase B · Lesson B2 — Save Your Task

**Learning level:** Beginner  
**Learning outcome:** Save the task workspace in the current browser profile and understand where that data lives.  
**Lesson status:** Planned — do not implement until the storage-disclosure decision and a separate B2 Task Contract are approved.

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

**Before implementing B2:** Product/UX decision DR-005 (the timing and exact wording of the first-use storage disclosure) must be resolved by the Product Owner. A separate B2 implementation Contract must also be approved. Do not copy a proposed disclosure sentence into the app and treat it as approved.

## 3. Before you begin

- B1 has been implemented and its create/validation behavior has been accepted.
- The active B2 Task Contract is available and identifies the allowed files and verification requirements.
- DR-005 has an approved decision and the required user-facing disclosure is ready.
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

A success message alone is not proof that data was saved. The reload check belongs to B3 and must be performed there before claiming persistence is verified.

## 6. B2 completion checklist

- [ ] DR-005 is resolved and its approved disclosure is visible at the required point.
- [ ] A separate B2 Task Contract is approved.
- [ ] Beginner storage uses only the approved browser-local approach.
- [ ] No external database, account, or cloud sync has been added.
- [ ] The saved workspace can be loaded after a reload.
- [ ] Storage errors are reported truthfully.
- [ ] The learner understands that clearing browser site data may remove the workspace.

## 7. Next lesson

Continue to [B3 — Close and Reopen](../b3-close-and-reopen/README.md) to verify persistence in the same browser profile.

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B1](../b1-create-your-first-task/README.md) · [Next → B3](../b3-close-and-reopen/README.md)
