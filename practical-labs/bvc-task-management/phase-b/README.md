# Phase B — Build Your First Task

**Learning level:** Beginner  
**Theme:** First Vertical Slice  
**Environment:** The existing BVC Task Management project in Google AI Studio (GAIS)  
**Learning status:** CLOSED — the Human Owner explicitly accepted all four Phase B lessons, the available evidence and continuity on 2026-11-24. Known evidence limitations remain recorded; historical `NOT_RUN` checks are not re-labelled PASS. See the [Phase B Acceptance & Closeout Record](PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md).

Phase B turns the blank scaffold from Phase A into a small, useful task manager. Build and understand one outcome at a time. Do not ask AI to create the whole product in one request.

## What you will build

| Lesson | What you will learn | What must be true before moving on |
|---|---|---|
| [B1 — Create Your First Task](b1-create-your-first-task/README.md) | Enter a title, add a task, and see it in a list. The first version uses temporary page memory. | Owner-accepted with known limitations; reaffirmed in Phase B closeout on 2026-11-24. |
| [B2 — Save Your Task](b2-save-your-task/README.md) | Save the task in the current browser profile using the approved Beginner storage approach. | Owner-accepted with known verification limitations; Local Storage and refresh evidence are published. |
| [B3 — Close and Reopen](b3-close-and-reopen/README.md) | Reload or reopen the app in the same browser profile. | Owner-accepted as part of Phase B closeout; refresh evidence and known limits are retained. |
| [B4 — Improve One Small Thing](b4-improve-one-small-thing/README.md) | Ask AI for one bounded improvement and protect the existing behavior. | Owner-accepted as part of Phase B closeout; no unrecorded regression check is represented as PASS. |

## Phase B closeout and Phase C handoff

**Phase B is CLOSED by explicit Human Owner decision on 2026-11-24.** The Owner accepted B1–B4, the available evidence and continuity. The closeout record distinguishes accepted learning outcomes from individual tests that remain historically `NOT_RUN` or `NOT_VERIFIED`.

See [Phase B Acceptance & Closeout Record](PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md).

## Historical B1/B2 implementation notes

B1 was accepted by the Human Owner on 2026-11-12 as `COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS`. The code review confirmed the supplied `app/page.tsx` contains one page component. The available record does not include a complete archived Preview test set or an independently reviewable GAIS before/after file inventory; those limitations are retained in the B1 lesson record.

**DR-005 — first-use storage disclosure:** APPROVED by the Human Owner on 2026-11-13. The exact Beginner notice and placement are recorded in the B2 lesson and the canonical Product/UX Decision Register.

**Historical B2 implementation evidence:** Gemini reported the one-file `app/page.tsx` implementation, build and ESLint success. Owner screenshots verify the Local Storage key/envelope, two saved task records and restoration after Preview refresh. Some detailed tests remained `NOT_RUN` or `NOT_VERIFIED` at closeout; the Human Owner explicitly accepted the Phase B learning path with those limitations on 2026-11-24. Do not reinterpret those records as individual PASS results.

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

## B2 visual guide

For the real GAIS walkthrough of **Application → Storage → Local Storage**, including the owner-supplied screenshot, runtime-origin selection and workspace-key inspection, see [B2 — Local Storage in Chrome DevTools](b2-save-your-task/README.md).

## Lesson navigation

- [B1 — Create Your First Task](b1-create-your-first-task/README.md)
- [B2 — Save Your Task](b2-save-your-task/README.md)
- [B3 — Close and Reopen](b3-close-and-reopen/README.md)
- [B4 — Improve One Small Thing](b4-improve-one-small-thing/README.md)

## Continue learning

[Project Index](../README.md) · [Phase C — Make It Useful Every Day](../phase-c/README.md)
