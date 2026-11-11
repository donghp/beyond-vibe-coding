# BVCTM-PROMPT-0004 — Phase B1: Create Your First Task

**Project:** BVC Task Management — A Simple Daily Work Manager  
**Task ID:** BVC-TM-P3.3-004  
**Contract:** BVC-TM-TC-004 Revision 1 — APPROVED  
**Lesson:** [Phase B · B1 — Create Your First Task](../phase-b/b1-create-your-first-task/README.md)  
**Status:** Canonical prompt candidate; execute only after Contract #004 is published on main.

---

## Before you run this prompt

Open the existing BVC Task Management app in Google AI Studio (GAIS). Confirm that the project is the app identified in the Contract. The Human Owner must ensure the current `app/page.tsx` still matches the exported scaffold snapshot.

This prompt authorizes one modification only: `app/page.tsx` relative to the GAIS app root. It does not authorize a GitHub connection or repository write.

Copy the complete prompt below into the GAIS chat.

---

## Copy-and-paste prompt

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
