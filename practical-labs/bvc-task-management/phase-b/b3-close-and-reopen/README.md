# Phase B · Lesson B3 — Close and Reopen

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B2](../b2-save-your-task/README.md) · [Next: B4 →](../b4-improve-one-small-thing/README.md)  
> **Progress:** Phase B · Lesson B3 — Close and Reopen

**Learning level:** Beginner  
**Learning outcome:** Confirm that a task saved in B2 is still available after the app is reloaded or reopened.  
**Lesson status:** Planned — requires B2 implementation and acceptance. B2 Contract already verifies the initial save/load behavior; B3 is the learner's separate close/reopen and recovery exercise.

## 1. Why this lesson matters

B2 teaches how the application saves and loads the Beginner workspace. B3 asks the learner to perform the everyday action of closing and reopening the app and confirm that the same work is still available. This reinforces the difference between a task visible only on the current page and a task saved in the same browser profile.

## 2. Before you begin

1. Complete B1 and B2.
2. Confirm the B2 save behavior has been tested.
3. Use the same browser profile and the same application origin/Preview URL throughout the test.
4. Do not clear site data, switch to Incognito, or change browser profiles between the before and after checks.
5. Use a harmless example task such as `Prepare the weekly plan`; do not enter personal or confidential information.

If B2 has not saved a task successfully, stop here. B3 cannot prove persistence when there is no known saved task to reopen.

## 3. Step-by-step check

1. Open the BVC Task Management app in the browser profile used in B2.
2. Locate the saved example task and note its exact title.
3. Capture a screenshot showing the task before closing the app. Avoid exposing private account information.
4. Close the app tab. Do not clear browser site data or switch profiles.
5. Open the same GAIS Preview/app URL again in the same browser profile.
6. Wait for the app to finish loading.
7. Look for the exact same task title in the list.
8. Capture a second screenshot after reopening and compare it with the first.

Do not edit or re-create the task between the two screenshots. Doing so would make the test invalid.

## 4. Pass and fail conditions

**PASS only when:**

- The same task title was visible before reload.
- The page was reloaded/reopened in the same browser profile and app origin.
- The same task was visible after the app loaded again.
- The result and screenshots are recorded.

**FAIL or NOT VERIFIED when:**

- The task disappears.
- The app shows an error or cannot load the workspace.
- A different browser profile or app origin was used.
- The task was re-created after reload.
- There is no before/after evidence.

If the task disappears, do not hide the failure by adding it again. Record what happened and ask AI to inspect the issue under a separate, approved debugging task.

## 5. Understand the limitation

Beginner browser storage is local to the current browser profile and application origin. It is not automatic cross-device synchronization and is not a cloud backup. This lesson verifies only the same-profile reopen behavior.

## 6. B3 completion checklist

- [ ] The saved task was visible before reload.
- [ ] The browser profile and app origin remained the same.
- [ ] The app was reloaded/reopened without re-creating the task.
- [ ] The same task was visible after reload.
- [ ] Before/after evidence was captured.
- [ ] Any failure was recorded honestly.

## 7. Next lesson

After the independent close/reopen exercise is complete and accepted, continue to [B4 — Improve One Small Thing](../b4-improve-one-small-thing/README.md).

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B2](../b2-save-your-task/README.md) · [Next → B4](../b4-improve-one-small-thing/README.md)
