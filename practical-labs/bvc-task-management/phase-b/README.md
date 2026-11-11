# Phase B — Build Your First Task

**Learning level:** Beginner  
**Theme:** First Vertical Slice  
**Environment:** The existing BVC Task Management project in Google AI Studio (GAIS)  
**Learning status:** B1 scope approved by the Human Owner; implementation and runtime evidence are tracked separately.

Phase B turns the blank scaffold from Phase A into a small, useful task manager. Build and understand one outcome at a time. Do not ask AI to create the whole product in one request.

## What you will build

| Lesson | What you will learn | What must be true before moving on |
|---|---|---|
| [B1 — Create Your First Task](b1-create-your-first-task/README.md) | Enter a title, add a task, and see it in a list. The first version uses temporary page memory. | A non-empty title creates a visible task; an empty title is rejected. |
| [B2 — Save Your Task](b2-save-your-task/README.md) | Save the task in the current browser profile using the approved Beginner storage approach. | The save behavior is tested and the app gives truthful feedback. |
| [B3 — Close and Reopen](b3-close-and-reopen/README.md) | Reload or reopen the app in the same browser profile. | The previously saved task is still available. |
| [B4 — Improve One Small Thing](b4-improve-one-small-thing/README.md) | Ask AI for one bounded improvement and protect the existing behavior. | The improvement works and B1–B3 regression checks still pass. |

## The most important distinction: create first, save next

B1 and B2 are deliberately separate:

- **B1 — Create:** the app holds the task in its current page memory. You can see it in the list while the page is running.
- **B2 — Save:** the app writes the workspace to browser storage so it can be loaded again later.
- **B3 — Reopen:** you test whether the saved task is still there after reloading or reopening.

When you refresh the page during B1, the temporary task may disappear. That is expected. Do not add `localStorage` to B1 just to prevent it; persistence belongs to B2.

## Before you begin

1. Complete Phase A lessons A1–A4.
2. Open the same GAIS project that contains your exported BVC Task Management scaffold.
3. Confirm that the BVC Task Management Project Instructions are available in that project.
4. Open both **Code** and **Preview** so you can compare the source and the visible result.
5. Read the specific lesson before asking AI to make a change.
6. Use the active approved Task Contract for the lesson. If the Contract or its allowed file list is not available, stop and ask the Human Owner rather than guessing.

## Beginner rules for Phase B

- Work on one lesson at a time.
- Ask AI to inspect the existing project before changing it.
- Keep the change small and review the file list before accepting it.
- Do not install packages or change the framework for these lessons.
- Do not introduce a database, account, authentication, API, GitHub integration, VS Code, Localhost, or deployment.
- Do not claim a task is saved merely because it appears in the list.
- Capture real Preview evidence. An AI explanation is not proof that the feature works.

## Lesson navigation

- [B1 — Create Your First Task](b1-create-your-first-task/README.md)
- [B2 — Save Your Task](b2-save-your-task/README.md)
- [B3 — Close and Reopen](b3-close-and-reopen/README.md)
- [B4 — Improve One Small Thing](b4-improve-one-small-thing/README.md)

## Continue learning

[Project Index](../README.md) · [Phase C — Make It Useful Every Day](../phase-c/README.md)
