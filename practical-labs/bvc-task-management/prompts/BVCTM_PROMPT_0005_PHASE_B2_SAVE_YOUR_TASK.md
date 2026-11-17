# BVCTM-PROMPT-0005 — Phase B2: Save Your Task

**Project:** BVC Task Management — A Simple Daily Work Manager  
**Task ID:** BVC-TM-P3.3-005  
**Contract:** BVC-TM-TC-005 Revision 1 — APPROVED  
**Context Pack:** BVC-TM-P3.3-005 Context Pack v0.1  
**Target GAIS Application ID:** ca589018-617d-4919-bbe2-6b9c588ccd85  
**Authorized executor:** Gemini in Google AI Studio  
**Risk:** R2  
**Mode:** CONDITIONAL WRITE — TWO-STAGE OWNER GATE

---

## 1. Authority and governing sources

You are the implementation executor for the existing BVC Task Management Beginner application.

Follow the Project Instructions already saved in this GAIS project's Custom Instructions. The Human Owner will provide the complete lesson-specific B2 Context Pack and this Prompt. **A GitHub connection is not required and must not be created for this Beginner GAIS task.** GitHub is the canonical home for BVC governance and learning documents; GAIS is the application build/Preview workspace.

The governing task is BVC-TM-P3.3-005 under BVC-TM-TC-005 Revision 1. The approved Contract controls implementation scope, storage behavior, acceptance criteria and stop conditions.

### Owner decisions already recorded

1. On 2026-11-17, the Human Owner selected Option A and confirmed that approval of Contract #005 Revision 1 through merged PR #64 also approved the exact runtime workspace envelope in the Contract's storage.format. No separate schema approval is required.
2. On 2026-11-17, the Human Owner explicitly issued B2 Execution Authorization: AUTHORIZED WITHIN APPROVED CONTRACT SCOPE, conditional on RC-003, RC-004 and RC-005 all being PASS.
3. RC-003 and RC-004 have been reviewed and recorded PASS. RC-005 remains pending until you complete the acknowledgment stage below and the Human Owner confirms it.
4. The Contract's original execution_authorization and storage.scope_note describe the state when Contract #005 was approved. The later Owner decisions above resolve those approval-status questions. Do not alter the approved schema or edit the Contract.

The Context Pack contains the exact Owner decisions, preflight evidence, storage envelope and disclosure text. If it is not supplied, stop and request it.

## 2. Two-stage gate — mandatory

### Stage 1: RC-005 acknowledgment only

On receiving this Prompt and the Context Pack:

- Read both completely.
- Read the saved GAIS Project Instructions.
- Inspect the current project identity, current app/page.tsx and File Explorer inventory using read-only actions only.
- Confirm Application ID ca589018-617d-4919-bbe2-6b9c588ccd85.
- Compare current app/page.tsx against the preflight baseline: 3,703 bytes; SHA-256 1d0be58bdf1c8da452c3d2fcb071034fbb90d5506968b688c8449fc8f14fe373. If it differs, report the exact difference and STOP.
- Confirm the exact one-file allowlist and all stop conditions.
- Confirm that you understand the approved runtime envelope and exact DR-005 copy.
- Confirm you will not connect GitHub or modify any other file.

Return a structured response titled **RC-005 EXECUTOR ACKNOWLEDGMENT** containing:
1. Target Application ID.
2. Contract ID/revision, Task ID and risk.
3. Exact permitted operation and file.
4. File-count and diff-line budgets.
5. Prohibited files, services and features.
6. Storage key and exact runtime envelope.
7. DR-005 disclosure and acknowledgement behavior.
8. Required load, validation, save and error behavior.
9. Stop conditions.
10. This exact statement: "I understand and accept the one-file B2 scope. I have not modified any file."

**Do not edit, generate replacement code, run write-capable commands or implement B2 during Stage 1.** Wait for the Human Owner to review the acknowledgment and send:

**RC-005 PASS — PROCEED WITH B2**

This confirms the RC-005 executor acknowledgment. It does not expand the already-issued authorization.

If any source, identity, Project Instructions, Context Pack, schema or disclosure requirement is missing or inconsistent, report BLOCKED and wait.

### Stage 2: implementation — only after the exact Owner gate confirmation

After receiving the exact Stage 2 gate confirmation, implement the approved B2 behavior under the conditional Owner authorization. Do not ask for another Contract approval or a second execution authorization.

## 3. Reconfirm the target and inspect before editing

Target existing GAIS project only:
- Application ID: ca589018-617d-4919-bbe2-6b9c588ccd85
- Authorized file relative to project root: app/page.tsx

Before editing, report the confirmed identity, current source line/byte count and SHA-256 if available, current File Explorer inventory, exact source baseline and differences, planned behavior, and confirmation that no other file is needed.

If the app ID differs, source materially differs from preflight, a pending editor change appears, another writer is active, or an extra file is required, STOP before editing.

## 4. B2 learning outcome

Extend accepted B1 task capture so a task is saved in the current browser profile and loaded again after a normal Preview reload in the same browser profile and app origin. Explain that browser-local storage is not cross-device sync and is not a separate backup. Keep the implementation small and beginner-friendly.

## 5. Exact authorized storage design

Use exactly one browser localStorage key:

~~~text
bvc-task-management:workspace:v1
~~~

Use this exact runtime workspace envelope. Angle-bracket values are generated placeholders, not literal values:

~~~json
{
  "format": "bvc-task-management-workspace",
  "formatVersion": 1,
  "sourceMode": "browser",
  "workspaceId": "<stable UUID>",
  "data": {
    "projects": [],
    "tasks": [
      {
        "id": "<UUID>",
        "title": "<trimmed task title>"
      }
    ],
    "checklistItems": [],
    "settings": {},
    "appliedStarterKits": []
  }
}
~~~

Rules:
- Generate workspaceId once, when the first task is successfully persisted; reuse it on later saves.
- Generate each new task id with crypto.randomUUID().
- Use crypto.randomUUID() for workspaceId too.
- If crypto.randomUUID() is unavailable in actual Preview, stop. Do not use Math.random, Date.now-based IDs, a package or an insecure fallback.
- B2 creates/reads only task fields id and title. Keep projects, checklistItems and appliedStarterKits empty, and settings an empty object.
- Do not add exportedAt, timezone, backup metadata or later export/import fields.

## 6. Required runtime behavior

### 6.1 Initial load

- Access browser storage only on the client; do not read window.localStorage during server rendering.
- On first client mount, read the agreed key and validate it before enabling task writes.
- Do not write an empty workspace on mount.
- If the key is absent, initialize an empty in-memory task list and an unpersisted workspace. Do not call setItem.
- If a valid workspace exists, load tasks in insertion order and preserve workspaceId.
- Prevent duplicate initialization or premature writes while load is in progress.

### 6.2 Validation and preservation

Validate:
- JSON parses successfully.
- format is exactly bvc-task-management-workspace.
- formatVersion is exactly 1.
- sourceMode is exactly browser.
- workspaceId is a non-empty UUID string.
- data is an object.
- projects, tasks, checklistItems and appliedStarterKits are arrays.
- settings is an object.
- Each task has a unique non-empty id and a non-empty trimmed title.
- Do not create additional task fields in B2. If an existing record contains unrecognized fields that B2 cannot preserve safely, preserve the original stored value and stop rather than stripping or overwriting it.

For malformed JSON, unsupported versions, missing structures or invalid task records:
- Preserve the original stored value exactly.
- Do not clear, repair, replace or overwrite it.
- Disable task writes for the session.
- Show a clear, accessible error/recovery message.
- Do not silently treat invalid data as an empty workspace.

If reading localStorage throws an access/security error, do not treat it as a missing key or claim an empty saved workspace. Report the failure and block writes.

### 6.3 DR-005 first-use disclosure

For a fresh session with no saved workspace:
- Display the exact approved disclosure below at the top of the workspace, before the first task can be persisted.
- Require explicit acknowledgement through the exact action label.
- No task may be written before acknowledgement.
- Acknowledgement state is component memory only for the current page session. Do not create another localStorage key, cookie or sessionStorage item.

For a valid existing workspace after reload:
- Show the disclosure as a readable, non-blocking notice/control.
- Do not repeatedly block task entry when a valid saved workspace exists.
- Do not implement a Settings page, More menu or later-phase navigation in B2. Keep the full approved disclosure available in the current workspace notice; the one-file Contract does not authorize building Settings.

Exact approved English copy:

~~~text
Where your tasks are stored

In Beginner mode, your tasks are stored in this browser on this device. They do not automatically sync to other browsers or devices.

Clearing this site's browser data may delete your tasks.

Browser storage is not a separate backup. You will learn to export a JSON backup in a later lesson.

Do not enter passwords, API keys, or sensitive information in this learning app.

Action: Got it — continue
~~~

Do not paraphrase or shorten the disclosure. Do not claim acknowledgement creates a backup.

### 6.4 Task submission and save order

Preserve every B1 behavior:
- One Task title input and one Add task button.
- Trim leading/trailing whitespace.
- Reject empty/whitespace-only titles with exactly: "Please enter a task title."
- Enter submits the form.
- Keep insertion order.
- On successful add, clear the title input and previous validation message.
- No task edit, delete, complete, due date, priority, project, notes, checklist, tag or assignment.

For a valid submission after acknowledgement:
1. Build the new task with a UUID and trimmed title.
2. Build the complete next workspace envelope in memory.
3. Serialize the complete envelope.
4. Call localStorage.setItem exactly once for the single agreed key.
5. Only after setItem succeeds, update React task state and clear the input/validation state.

If setItem throws:
- Preserve the previous task list and entered title.
- Show a plain-language, accessible error.
- Do not show the new task as saved.
- Do not claim success.
- Allow a safe retry.

Never silently fall back to sessionStorage or memory-only operation while claiming the task is saved.

### 6.5 Storage and UI lifecycle

- Keep the implementation inside the existing Page component in app/page.tsx.
- Use standard React hooks already available in the existing dependency set.
- Ensure initialization does not cause duplicate writes or overwrite data.
- Keep Preview responsive and accessible.
- Use accessible labels, validation announcements and storage-error feedback.
- Avoid unnecessary abstractions and dependencies.

## 7. Strict implementation boundary

Authorized: MODIFY exactly one existing file, app/page.tsx.

Budget:
- Maximum changed files: 1.
- Maximum modified files: 1.
- Maximum created files: 0.
- Maximum deleted files: 0.
- Maximum binary files: 0.
- Maximum total diff: 350 lines.

Forbidden:
- Any CREATE, DELETE, rename, move or modification of another file.
- package.json, bun.lock, any lockfile, configuration, metadata, layout, global CSS, routes or README.
- New dependencies or package installation.
- API routes, backend code, server-side filesystem writes, database, Supabase, Firebase, PostgreSQL, Auth, RLS, external services or cloud sync.
- GitHub connection, GitHub repository changes, commits, branches or deployment from GAIS.
- JSON export/import, file download/upload, backup, restore or merge flows.
- Projects, Checklists, Settings, Starter Kits or other later-phase functionality.
- Any change to the approved storage key, envelope, DR-005 text or Contract scope.

Existing bun.lock, metadata.json, layout.tsx and other scaffold files are not authorized for modification. The historical scaffold title in metadata/layout must remain untouched.

If a forbidden change appears necessary, STOP and report. Do not expand scope.

## 8. Verification requirements

After implementation, verify and report each Contract acceptance criterion:

- B2-AC-001: Fresh session shows DR-005 before first persistence; confirm no write before acknowledgement.
- B2-AC-002: Rendered disclosure exactly matches approved copy.
- B2-AC-003: Valid task is saved under the exact key and envelope.
- B2-AC-004: Two tasks survive normal Preview refresh in the same browser profile and app origin, each shown once in insertion order.
- B2-AC-005: B1 regression: trimming, empty/space-only rejection, exact message, input/error clearing, Enter, insertion order and empty state.
- B2-AC-006: Malformed JSON and unsupported version preserved and writes blocked. Use a disposable test profile only; never corrupt/delete the Owner's actual workspace data. If no safe disposable profile is available, mark runtime simulation NOT_RUN and perform static review only.
- B2-AC-007: Storage read/write errors preserve previous data and title input. If safe runtime failure simulation is unavailable, mark it NOT_RUN and explain.
- B2-AC-008: Only app/page.tsx changes.
- B2-AC-009: Check compact phone and desktop Preview widths.
- B2-AC-010: Human Owner reviews source/diff, Preview and evidence, then explicitly accepts.
- B2-AC-011: No later-phase features, external services, API, database, Auth or export/import were added.

Do not claim any check passed unless actually performed. Distinguish static review, actual Preview interaction, storage inspection, and tests not run.

## 9. Required post-implementation report

Return:
1. Contract ID/revision, Task ID, Prompt ID and target Application ID.
2. Exact changed-file inventory.
3. Complete app/page.tsx source or reviewable exact diff.
4. Before/after line count, byte count and SHA-256 if available.
5. Confirmation that all other files remain unchanged, with actual inventory evidence.
6. Actual Preview behavior and authentic evidence.
7. Storage key and envelope example using synthetic placeholders.
8. Each B2-AC-001 through B2-AC-011: PASS, FAIL, NOT_RUN or NOT_VERIFIED, with evidence.
9. B1 regression results.
10. Malformed-data/storage-error results.
11. All limitations and stop conditions.

Do not claim B2 accepted, complete, published, merged or deployed. Only the Human Owner can accept the result.

## 10. Final authority and stop rule

The Human Owner retains exclusive authority over final review, acceptance, task closure, publication, merge and release.

This Prompt and the approved Context Pack apply only to BVC-TM-P3.3-005 under BVC-TM-TC-005 Revision 1.

**The first response is RC-005 acknowledgment only. Do not edit until the Human Owner sends: RC-005 PASS — PROCEED WITH B2.**