# BVC Task Management — Practical Learning Path

**Curriculum:** Dong Hong Style\
**Product baseline:** BVC Task Management Product Definition v0.2.0\
**Audience:** Beginner to Advanced\
**Status:** Curriculum draft for practical lesson development

## Purpose

Use one familiar, everyday application to teach people how to work with AI coding tools. Readers begin by creating and using a small task-management application. They then learn progressively how data, identity, security, source control, testing, and deployment fit into a real software project.

The curriculum has four phases. Each phase has a clear learning outcome and a boundary. Do not move advanced setup into Beginner lessons simply because it is technically interesting.

## Phase A — Meet AI, Build Your First App

**Learning level:** Beginner\
**Theme:** Start with Google AI Studio (GAIS).

| Lesson | Title | What the reader will do | Completion checkpoint |
|---|---|---|---|
| A1 | Meet Google AI Studio | Understand what GAIS is, what Build mode is for, and what Preview means. | A1-01 actual Apps landing screen observed; continue with A1-02 and scaffold Preview checkpoints. |
| A2 | Create Your First Blank Web App | Create one isolated blank web app, observe the interface, and inspect the generated scaffold. | The blank app and its observed scaffold are recorded. No Task Management feature is implemented in this lesson. |
| A3 | Talk to AI Like a Teammate | Learn to describe a simple request clearly, give useful context, and ask for one bounded change. | The reader can write and refine a small, understandable request. |

**Beginner boundary:** no database, Supabase, Auth, RLS, GitHub, VS Code, or localhost is required to begin Phase A.

## Phase B — Build Your First Task

**Learning level:** Beginner\
**Theme:** First Vertical Slice.

| Lesson | Title | What the reader will do | Completion checkpoint |
|---|---|---|---|
| B1 | Create Your First Task | Create one task by entering only its title. | The task appears in the application. |
| B2 | Save Your Task | Save the task using the behavior implemented in the application. | The reader can confirm the save result. |
| B3 | Close and Reopen | Reopen the application in the same supported browser profile. | The previously saved task is still available. |
| B4 | Improve One Small Thing | Ask AI to make one small, clearly bounded improvement. | The change is visible and the reader checks that the original task flow still works. |

The first vertical slice is deliberately small: open the app, create a title-only task, save it, reload or reopen the app in the same browser profile, and confirm that the task remains available.

Do not claim persistence is verified until the learner has actually reopened the app and observed the saved task.

## Phase C — Make It Useful Every Day

**Learning level:** Beginner expansion\
**Theme:** Add everyday value gradually.

| Lesson | Title | What the reader will do | Completion checkpoint |
|---|---|---|---|
| C1 | Organize Tasks | Group or organize tasks using the approved product behavior. | The reader can locate tasks by the chosen organization. |
| C2 | Mark Tasks as Complete | Mark a task complete and verify the visible state. | Completion state is visible and remains correct after the relevant check. |
| C3 | Set a Due Date | Add a due date and verify how it appears. | The selected date is shown correctly. |
| C4 | Find Tasks with Search and Filters | Find a task using an available search or filter control. | The result matches the selected search/filter. |
| C5 | Understand Browser Storage | Learn what browser storage does and does not do. | The reader can explain same-profile storage, data-clearing risk, and lack of automatic cross-device sync. |
| C6 | Backup and Restore Your Work | Export a backup and restore it using the approved behavior. | A test backup can be restored and checked. |

The Beginner product model uses a small browser JSON workspace and may use `localStorage` for practice persistence. Explain that browser storage is not cloud storage and does not automatically synchronize across devices. Explain data-loss risks before asking learners to rely on it.

## Phase D — Beyond Beginner

**Learning level:** Intermediate / Advanced\
**Theme:** Understand how a real application becomes connected, controlled, and maintainable.

| Lesson | Topic | Learning direction | Boundary |
|---|---|---|---|
| D1 | Connect a Database | Learn relational data and connect the application to an approved database environment. | Intermediate; requires its own approved implementation scope. |
| D2 | Understand User Accounts | Learn identity, sign-in, and account lifecycle. | Intermediate; requires approved Auth design and implementation. |
| D3 | Learn Data Ownership and Security | Understand user-scoped data access and security controls. | Intermediate; RLS and security tests require explicit verification. |
| D4 | Work with GitHub and Source Code | Learn repositories, branches, commits, Pull Requests, and source history. | Advanced; not a Beginner prerequisite. |
| D5 | Test, Deploy and Maintain the App | Learn testing, environments, release, deployment, monitoring, and maintenance. | Advanced; requires separate operational and security gates. |

## Teaching progression

1. Solve a familiar problem first.
2. Show the learner the smallest useful result.
3. Introduce only the technical term needed for the current action.
4. Make one change at a time.
5. Check the actual result.
6. Explain what has not yet been tested.
7. Move to the next layer only after the current checkpoint is understood.

## Curriculum governance

This curriculum is a reader-facing learning map. It does not change Product Definition v0.2.0, UX decisions, architecture baselines, Task Contracts, or security requirements.

- Formal Phase 3.1 UX Acceptance remains OPEN.
- DR-005 remains OPEN.
- Beginner browser persistence requires actual runtime verification.
- Intermediate database, Auth, and RLS work must have its own approved implementation scope.
- Advanced GitHub, local development, testing, and deployment work must have its own task boundaries and verification.

## Research references

These sources informed the structure and teaching patterns. They are references, not text to copy.

- [AI Engineering from Scratch — Rohit](https://github.com/rohitg00/ai-engineering-from-scratch)
- [Dev Environment lesson — AI Engineering from Scratch](https://aiengineeringfromscratch.com/lesson?path=phases/00-setup-and-tooling/01-dev-environment)
- [AI Engineering Course — Amit Shekhar](https://github.com/amitshekhariitbhu/ai-engineering-course)
- [AI Engineering Guide — Dipak Kumar](https://github.com/dipakkr/ai-engineering-guide)
- [Prompting Patterns — Dipak Kumar](https://github.com/dipakkr/ai-engineering-guide/blob/main/02-prompt-engineering/01-prompting-patterns.md)
- [Awesome AI Engineering](https://github.com/dipakkr/awesome-ai-engineering)
- [AI Learning Roadmaps](https://github.com/bishwaghimire/ai-learning-roadmaps)
- [AI Roadmap — Sumit Singh](https://github.com/sumitsingh4411/ai-roadmap)
- [AI Engineering from Scratch — Rubonal](https://github.com/Rubonal4649/ai-engineering-from-scratch)
- [Google AI Studio Build mode — official documentation](https://aistudio.google.com/docs/aistudio-build-mode)
- [Google Cloud: How to build an app with AI](https://cloud.google.com/use-cases/how-to-build-an-app-with-ai)
- [DEV Education Track: Build Apps with Google AI Studio](https://dev.to/deved/build-apps-with-google-ai-studio)
- [Google AI Studio Tutorial for Beginners — Proflead](https://github.com/proflead/google-ai-studio-tutorial)
