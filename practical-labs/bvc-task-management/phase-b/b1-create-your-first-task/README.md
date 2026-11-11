# Phase B · Lesson B1 — Create Your First Task

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [Next → B2](../b2-save-your-task/README.md)  
> **Progress:** Phase B · Lesson B1 — Create Your First Task

**Learning level:** Beginner  
**Learning outcome:** Enter a task title, add the task, and see it appear in a simple list.  
**Implementation scope:** [BVC-TM-TC-004 Revision 1 — APPROVED](../../../../projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-004_TASK_CONTRACT_V0.1.yaml). MODIFY `app/page.tsx` only in the existing GAIS app.  
**Canonical prompt:** [BVCTM-PROMPT-0004 — Phase B1: Create Your First Task](../../prompts/BVCTM_PROMPT_0004_PHASE_B1_CREATE_FIRST_TASK.md).  
**Lesson status:** Contract and Prompt published; implementation reported by the Owner; technical evidence partial; Human Owner acceptance pending.

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
4. Confirm BVC-TM-TC-004 Revision 1 and Prompt #0004 are available on `main` (both were published by merged PR #53).
5. Confirm that the Contract authorizes only `app/page.tsx`. Inspect the current GAIS file and compare it with the expected scaffold; stop if it differs materially.
6. Open the canonical [Prompt #0004](../../prompts/BVCTM_PROMPT_0004_PHASE_B1_CREATE_FIRST_TASK.md).

If the active Contract is missing, its scope differs from this lesson, or AI says another file must change, stop and ask the Human Owner. Do not expand the scope yourself.

## 4. Copy-and-paste request for AI

Use **BVCTM-PROMPT-0004** only after Contract BVC-TM-TC-004 Revision 1 is canonical on main. The separate prompt file is the canonical record; the same complete request is embedded below for easy learner use.

```text
You are the AI development partner for the existing **BVC Task Management** beginner project.

### 1. Read the project rules and approved task scope

Read the current BVC Task Management Project Instructions and **BVC-TM-TC-004 Revision 1**.

Confirm these details before editing:

- Task ID: `BVC-TM-P3.3-004`
- Contract ID: `BVC-TM-TC-004`
- Contract status: `APPROVED`
- Allowed operation: **MODIFY exactly one file — `app/page.tsx`**
- Forbidden operations: create, modify, rename, move, or delete any other file; install packages; change dependencies or configuration; connect GitHub or external services.

If you cannot access the approved Contract or the current Project Instructions, do not edit anything. Ask the Human Owner to provide the missing source.

### 2. Inspect before editing

Inspect the current project identity and the existing `app/page.tsx`.

The supplied scaffold snapshot had:
- Next.js App Router with TypeScript/TSX.
- `app/page.tsx` was a minimal placeholder showing “BVC Task Management Scaffold Inspection”.
- The page was the only file authorized for modification.

If the current project identity or `app/page.tsx` differs materially from this snapshot, stop and report the difference. Do not assume the exported ZIP is still the exact live state.

Before editing, summarize the current page, the exact single-file plan, and confirm that no other file needs to change.

### 3. B1 learning outcome

Implement a very small task-capture interaction:

1. Show a clearly labelled input named **Task title**.
2. Show an **Add task** submit button.
3. Show a friendly empty state before the first task is added.
4. When the learner enters a non-empty title and selects Add task, add exactly one task to a visible list.
5. Trim leading and trailing spaces from the title.
6. After a successful add, clear the input and any previous validation message.
7. If the title is empty or contains only spaces, add nothing and show exactly this friendly message: **Please enter a task title.**
8. Allow the learner to submit the form with Enter as well as by clicking/tapping the button.
9. Keep task order the same as the order in which the learner added items.

### 4. Strict B1 boundary — do not exceed

- Keep tasks in React component/page memory only.
- Do not use `localStorage`, `sessionStorage`, IndexedDB, cookies, browser databases, files, server actions, API calls, or remote storage.
- Do not add task editing, deletion, completion, priority, due dates, projects, notes, checklists, tags, or assignments.
- Do not add login, authentication, database, Supabase, Firebase, Gemini API calls, GitHub integration, cloud sync, export, hosting, or deployment.
- Do not add packages or change `package.json`, lockfiles, configuration, global styles, routing, layout, or any file other than `app/page.tsx`.
- Do not redesign the whole product. Keep the page clean, responsive, accessible, and consistent with the existing Tailwind-based scaffold.
- Use semantic form markup and associate the label with the input.
- Show validation feedback in a way that can be understood by assistive technology.
- A page refresh is expected to clear the temporary task list. This is not a bug in B1; saving is a separate B2 lesson.

### 5. Implement, then report

Make the smallest clear change in `app/page.tsx` that satisfies the criteria. Do not introduce unnecessary abstractions.

After the edit, report:

1. Contract ID and Task ID.
2. The exact file changed (it must be only `app/page.tsx`).
3. A short explanation of how the task state is held in memory.
4. Whether the Preview updated successfully or showed an error.
5. Which checks you actually performed:
   - Add one valid task.
   - Add a second task.
   - Submit an empty title.
   - Submit a spaces-only title.
   - Submit using Enter.
   - Refresh and confirm that the list resets.
6. Any checks not performed and all remaining limitations.

Do not claim that build, lint, tests, or browser checks passed unless you actually ran them. Do not claim B1 is accepted; the Human Owner reviews the actual Preview and evidence.

**Stop immediately** if more than `app/page.tsx` must change or if an external service, dependency, storage mechanism, or configuration change appears necessary.
```

The prompt authorizes one file only: `app/page.tsx`. If GAIS reports that another file, package, dependency, configuration, storage mechanism, or external service is needed, stop and ask the Human Owner.
 
## 5. Check the result in Preview

After AI reports that it has finished, inspect the actual Preview. Try these steps yourself:

1. **Empty state:** open the page before adding a task. A simple instruction or empty-state message should be visible.
2. **Create a task:** enter `Call the supplier` and select **Add task**. The new task should appear in the list.
3. **Create another task:** enter `Prepare the meeting notes` and add it. Both tasks should be visible.
4. **Reject an empty title:** leave the field empty and select **Add task**. No new task should appear; a helpful validation message should be shown.
5. **Reject spaces only:** enter three spaces and select **Add task**. No blank task should be created.
6. **Keyboard check:** enter a valid title and use the keyboard to submit the form. The task should be added once, not twice.
7. **Temporary-memory check:** add at least two tasks, then refresh the Preview. Confirm the tasks disappear, the input is blank, any previous validation message is cleared, and the friendly empty state appears. This is the expected B1 result; B2 will teach saving.

### Owner-supplied checkpoint — B1-08 refresh

The Human Owner supplied a GAIS Preview screenshot after refresh on 2026-11-11. It visibly shows the empty task state, a blank input, no stale validation message and the friendly empty-state text. Record this as **OBSERVED_PASS** for B1-08. The screenshot remains **OWNER_SUPPLIED** until its original binary is committed to this repository and its checksum is verified. Do not use a mock image or placeholder asset.

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
