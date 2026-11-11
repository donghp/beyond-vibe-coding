# Phase B · Lesson B1 — Create Your First Task

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [Next → B2](../b2-save-your-task/README.md)  
> **Progress:** Phase B · Lesson B1 — Create Your First Task

**Learning level:** Beginner  
**Learning outcome:** Enter a task title, add the task, and see it appear in a simple list.  
**Implementation scope:** Human Owner-approved B1 first vertical slice. Use the active B1 Task Contract and its exact file allowlist before making changes.  
**Lesson status:** Guide prepared; actual application behavior still requires implementation and Preview verification.

## 1. What you will make

You will add one simple task-entry area to the existing BVC Task Management app:

1. A clearly labelled field for the task title.
2. An **Add task** action.
3. A list that displays the task after it is added.
4. A helpful message when the title is empty or contains only spaces.

The title is the only information required. Do not add a due date, priority, project, notes, checklist, status selector, account, or other field in B1.

## 2. Understand how B1 works

For this first lesson, tasks exist only in the page's current memory.

- Add a task and it appears in the list.
- You may add another task while the page remains open.
- If you refresh or close the page, the temporary list resets.
- This is expected in B1. You will learn to save tasks in B2.

**Do not add browser storage in B1.** Keeping creation and persistence separate makes the first programming idea easier to understand.

## 3. Before asking AI to make the change

1. Open your existing BVC Task Management project in GAIS.
2. Open **Code** and **Preview**.
3. Confirm the current project still shows the blank scaffold screen.
4. Make sure the approved B1 Task Contract is available to the AI session. Check its exact allowed file list.
5. Tell AI to inspect the current `app/page.tsx` before editing.

If the active Contract is missing, its scope differs from this lesson, or AI says another file must change, stop and ask the Human Owner. Do not expand the scope yourself.

## 4. Copy-and-paste request for AI

Use this request only under the active, approved B1 Task Contract:

> You are helping me build the existing BVC Task Management beginner project.
>
> First read the current BVC Task Management Project Instructions and the approved B1 First Vertical Slice Task Contract. Confirm the Contract ID, its allowed file list, and the exact change you are about to make. If the Contract is unavailable or does not authorize this request, do not edit anything.
>
> **B1 goal:** let me create a task by entering only its title and then see that task in a simple list.
>
> Please inspect the existing project and implement only this small B1 behavior:
>
> 1. Show a clearly labelled task-title input.
> 2. Provide an **Add task** button.
> 3. When the title contains text after trimming leading/trailing spaces, add that title to the visible task list.
> 4. After a successful add, clear the input so I can enter another task.
> 5. If the title is empty or contains only spaces, do not add a task. Show a clear, friendly validation message and keep the user on the form.
> 6. Make the form usable with a keyboard as well as a mouse or touch.
> 7. Show a simple empty state before the first task is added.
>
> **Important B1 boundary:**
>
> - Keep tasks in the page's in-memory state only.
> - Do not use `localStorage`, `sessionStorage`, IndexedDB, cookies, a database, or any remote service.
> - Do not add login, authentication, API calls, GitHub connection, cloud sync, export, or deployment.
> - Do not add task editing, deleting, completion, priority, due dates, projects, notes, or checklists.
> - Do not install packages or change dependencies.
> - Do not change configuration, routing, layout, styling foundations, or any unrelated file.
> - Modify only the file or files explicitly allowed by the active B1 Contract. If the Contract authorizes only `app/page.tsx`, change only that file.
>
> Before editing, summarize the current file and your plan. After editing, report the exact changed-file list and explain how I can check the result in Preview. Do not claim that you ran a build, test, or browser check unless you actually did so.

## 5. Check the result in Preview

After AI reports that it has finished, inspect the actual Preview. Try these steps yourself:

1. **Empty state:** open the page before adding a task. A simple instruction or empty-state message should be visible.
2. **Create a task:** enter `Call the supplier` and select **Add task**. The new task should appear in the list.
3. **Create another task:** enter `Prepare the meeting notes` and add it. Both tasks should be visible.
4. **Reject an empty title:** leave the field empty and select **Add task**. No new task should appear; a helpful validation message should be shown.
5. **Reject spaces only:** enter three spaces and select **Add task**. No blank task should be created.
6. **Keyboard check:** enter a valid title and use the keyboard to submit the form. The task should be added once, not twice.
7. **Temporary-memory check:** refresh the Preview. The temporary tasks may disappear. That is the expected B1 result; B2 will teach saving.

If the actual labels or layout differ, record what you observe. Do not change the lesson to describe a control you cannot see.

## 6. B1 completion checklist

- [ ] The task title is the only required task field.
- [ ] A non-empty title appears in the list after Add task.
- [ ] Leading/trailing spaces are trimmed.
- [ ] An empty or spaces-only title is rejected with a clear message.
- [ ] The input is cleared after a successful add.
- [ ] The form can be used with a keyboard.
- [ ] Tasks are held in page memory only; no persistence was added.
- [ ] The actual changed-file list is within the active Contract.
- [ ] The learner has captured authentic Preview evidence for success and validation.

**Do not mark B1 complete because AI says “Done”.** Check the Preview yourself and retain the evidence requested by the active Contract.

## 7. What B1 does not do

B1 does not save tasks after reload. It does not create a full task-management system. It does not add cloud features or a database. You are learning one small behavior first.

## 8. Next lesson

When B1 behavior has been checked and accepted, continue to [B2 — Save Your Task](../b2-save-your-task/README.md).

---

## Continue learning

[Phase B Index](../README.md) · [← Previous phase: A4](../../phase-a/04-talk-to-ai-like-a-teammate/README.md) · [Next → B2](../b2-save-your-task/README.md)
