# BVC Task Management — Lesson Development and Evidence Register

**Version:** 0.1.0\
**Status:** Working register\
**Purpose:** Track what is drafted, what needs real GAIS evidence, and what depends on application behavior.

## Phase A — Meet AI, Build Your First App

| Lesson | Draft status | Evidence needed before publication |
|---|---|---|
| A1 — Meet Google AI Studio | Draft ready for interface review | Current GAIS starting screen; actual Build mode entry; actual Preview view. |
| A2 — Create Your First Blank Web App | Scaffold inspection pending | Human Owner's GAIS screenshots, generated code tree, exported ZIP if available, actual Preview outcome. |
| A3 — Talk to AI Like a Teammate | Draft ready for practical review | Real prompt and response examples captured from the current GAIS session; verify exact chat/build UI wording. |

## Phase B — Build Your First Task

| Lesson | Status | Required dependency/evidence |
|---|---|---|
| B1 — Create Your First Task | Planned | First Vertical Slice implementation exists; title-only task creation works in Preview. |
| B2 — Save Your Task | Planned | Save behavior is implemented and verified. |
| B3 — Close and Reopen | Planned | Same-browser-profile reload/reopen test confirms the task remains available. |
| B4 — Improve One Small Thing | Planned | A bounded change is made and regression check proves the first slice still works. |

## Phase C — Make It Useful Every Day

| Lesson | Status | Required dependency/evidence |
|---|---|---|
| C1 — Organize Tasks | Planned | Approved organization behavior implemented and tested. |
| C2 — Mark Tasks as Complete | Planned | Completion state and persistence verified. |
| C3 — Set a Due Date | Planned | Date input, display, validation, and relevant persistence behavior verified. |
| C4 — Find Tasks with Search and Filters | Planned | Search/filter behavior implemented and tested with known sample tasks. |
| C5 — Understand Browser Storage | Planned | Actual storage design and limitations confirmed; include safe data-loss explanation. |
| C6 — Backup and Restore Your Work | Planned | Export/import behavior and validation tested using synthetic data. |

## Phase D — Beyond Beginner

| Lesson | Status | Required dependency/evidence |
|---|---|---|
| D1 — Connect a Database | Planned | Separate approved Intermediate implementation contract. |
| D2 — Understand User Accounts | Planned | Approved Auth method, recovery flow, and runtime evidence. |
| D3 — Learn Data Ownership and Security | Planned | Approved data ownership/RLS implementation and security verification. |
| D4 — Work with GitHub and Source Code | Planned | Separate Advanced learning design and tested branch/PR workflow. |
| D5 — Test, Deploy and Maintain the App | Planned | Approved hosting, environment, testing, release, and operations scope. |

## Status definitions

- **Planned:** curriculum item is accepted as a learning destination; lesson instructions are not yet complete.
- **Draft:** text exists but requires practical review.
- **Evidence required:** exact UI or runtime behavior must be observed before publishing instructions.
- **Ready for review:** instructions, screenshots, links, and checks have been verified.
- **Published:** merged into the repository's canonical branch by the Human Owner.

## Release rule

Do not mark a lesson Published just because its Markdown file exists. A lesson with unverified GAIS controls, placeholders, or untested application behavior remains Draft or Evidence Required.
