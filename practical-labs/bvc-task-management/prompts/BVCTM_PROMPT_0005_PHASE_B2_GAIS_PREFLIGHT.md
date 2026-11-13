# BVCTM-PROMPT-0005 — Phase B2 GAIS Preflight (Read-Only)

**Project:** BVC Task Management  
**Task:** BVC-TM-P3.3-005 — Phase B2: Save Your Task  
**Contract:** BVC-TM-TC-005 Revision 1  
**Mode:** READ-ONLY PREPARATION ONLY  
**Executor:** Gemini in the existing GAIS newbie project  
**Status:** Canonical prompt candidate; becomes canonical when this synchronization PR merges

---

## Complete copy-ready prompt

You are working in the existing **BVC Task Management** Beginner project in Google AI Studio.

This prompt is a **read-only preflight** for Phase B2. It does not authorize you to change code in this step.

### 1. Read the current project instructions and approved task authority

Read the BVC Task Management Project Instructions and the complete Contract:

`projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-005_TASK_CONTRACT_V0.1.json`

The Contract is BVC-TM-TC-005 Revision 1 for Task BVC-TM-P3.3-005. DR-005 is approved. The allowed implementation change, if separately authorized later, is exactly MODIFY `app/page.tsx` only.

Do not copy or create the GitHub repository's `design/`, `governance/`, `task-contracts/` or `continuity/` folders in this GAIS app.

### 2. Confirm the environment

Report:
- The current GAIS app/project identity and visible title.
- Whether this is the app with ID `ca589018-617d-4919-bbe2-6b9c588ccd85`.
- The model label currently shown in GAIS.
- Whether Preview and Code/File Explorer are both available.

Do not guess any value that is not visible. Use UNKNOWN when needed.

### 3. Inspect the current application source — do not edit

Open the current `app/page.tsx` and inspect the complete file.

Compare it with the B1 source supplied by the Human Owner:
- One `Page` component.
- `Task` contains `id` and `title`.
- React state for title, tasks and validation message.
- Semantic form submission.
- Empty-title validation message is exactly `Please enter a task title.`.
- Valid submission trims the title, appends one task, clears input and error.
- Tasks are held in page memory only; B1 has no persistence.

Report whether the current source matches, differs, or cannot be fully inspected. Do not paste secrets or private account information.

### 4. Inspect the file inventory and possible competing changes

Use Code/File Explorer to report:
- Current visible project file list.
- Whether `app/page.tsx` is the only file that would need to change for the approved B2 scope.
- Any other changed/uncommitted state visible in GAIS, if GAIS exposes it.
- Any sign another executor is currently editing this project.

Do not assume that a file list proves a Git diff. State exactly what is visible and what is not available.

### 5. Explain the proposed B2 work in plain language

Without editing code, explain:
- The approved DR-005 storage notice.
- Why the notice appears before the first persisted task.
- The localStorage key and versioned workspace envelope in the Contract.
- How loading must happen before writing.
- What the app must do if saved data is malformed or browser storage fails.
- Which B1 behaviors must remain unchanged.
- Which features are explicitly out of scope.

### 6. Stop conditions

Stop and report NOT READY if:
- The app ID is different or cannot be established.
- The current `app/page.tsx` differs materially from the B1 source.
- A second file, dependency, configuration, route, global CSS or external service appears necessary.
- A safe storage behavior or data-preservation rule is unclear.
- Another writer may be changing the project.
- The Contract or required source is unavailable or contradictory.

### 7. Required output

Return a report with these headings:

1. **Environment Identity**
2. **Current app/page.tsx Inspection**
3. **Current File Inventory**
4. **B1 Behavior Preservation**
5. **B2 Contract Understanding**
6. **Scope and Risk**
7. **Preflight Decision** — READY FOR OWNER REVIEW or NOT READY
8. **Unknowns and Limitations**
9. **Recommended Next Action**

Do not modify, create, rename, move or delete any file. Do not install packages. Do not claim build, lint, browser tests or persistence tests were run.

End with exactly:

`READ-ONLY PREFLIGHT COMPLETE — NO FILES CHANGED`

### Important authorization boundary

A successful preflight is not permission to implement B2. Wait for the Human Owner's separate instruction before any write-capable prompt is used.

---

## End of prompt
