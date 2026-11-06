# Cross-Executor Continuity — Recovery Test Plan

**Contract:** BVC-GLOBAL-TC-002 Revision 1  
**Scope:** Foundation verification and Human Owner-operated pilot scenarios  
**Important:** Documentation or local unit-test success is not evidence that the actual HTW, MSW, or TVW environments completed a handoff.

## 1. Test execution record

Record each scenario as NOT_RUN until performed with evidence. Do not mark a scenario PASS from an expected result or a written procedure alone.

| Field | Value |
|---|---|
| Test run ID | |
| Date/time and timezone | |
| Human Owner / observer | |
| Sender executor and exact model/tool label | |
| Receiver executor and exact model/tool label | |
| Repository and task branch | |
| Task Contract ID / revision / status | |
| Remote checkpoint branch / SHA | |
| Handoff record path / SHA | |
| Result: PASS / FAIL / BLOCKED / NOT_RUN | |
| Evidence links / screenshots / command output | |

## 2. Common preconditions

Before any pilot:

1. The repository identity and live main SHA are verified.
2. The task has a current APPROVED Contract on main, or another explicit authorization that permits the pilot.
3. The exact task branch and checkpoint are known.
4. The sender and receiver identities are declared.
5. No other executor is writing to the same task branch.
6. The sender can publish and verify a remote checkpoint.
7. The handoff record validates against WORKER_HANDOFF.schema.json.
8. No credentials, private customer data, or unrelated private source material are placed in the handoff.

If a precondition fails, mark BLOCKED and do not write.

## 3. Scenario REC-001 — Cold-start recovery in ChatGPT

**Purpose:** Confirm that a fresh ChatGPT session can reconstruct the authorized task without relying on the previous session's memory.

**Preconditions**
- A complete handoff record is committed or otherwise available from its canonical approved location.
- The Task Contract and required context are accessible.
- The ChatGPT surface and GitHub connection capabilities are known or explicitly marked UNKNOWN.

**Actions**
1. Start a new ChatGPT session with BVC_NEXT_CHAT_PROMPT.md.
2. Have it verify repository identity, live main, open PRs, branch, and checkpoint.
3. Have it read BOOTSTRAP.md, the seven canonical continuity records, the active Contract, required context, and the handoff.
4. Ask it to identify completed work, incomplete work, blockers, and exactly one next permitted action.
5. Confirm it does not infer write capability from a successful read.

**Expected result**
- Recovery report references live SHAs and canonical files.
- Contract scope and writer state are reproduced accurately.
- Unknown local/account capabilities remain UNKNOWN.
- No write occurs before the authority and handoff gates pass.

**Evidence required**
- Prompt used, report, repository references, handoff validator output, and screenshots/tool outputs showing the actual connected GitHub capability.

**Stop conditions**
- Identity mismatch, stale or conflicting Contract, missing handoff, missing checkpoint, or a claim of unsupported write capability.

## 4. Scenario REC-002 — HTW to MSW (Google AI Studio)

**Purpose:** Verify one sequential handoff between the two GAIS workers.

**Preconditions**
- Human Owner verifies the repository link, account, and task branch in HTW and MSW.
- HTW is the only active writer.
- HTW has a current task checkpoint and a valid handoff record.

**Actions**
1. HTW stops edits, commits and pushes the checkpoint, then verifies the remote branch SHA.
2. HTW records the changed-file inventory, checks, blockers, next action, and sender release.
3. Human Owner confirms HTW has stopped writing.
4. MSW opens the intended project and independently checks repository link, branch, and remote checkpoint.
5. MSW validates the handoff, records receiver acceptance, and only then performs the authorized next task action.

**Expected result**
- The checkpoint SHA seen by MSW matches the released SHA from HTW.
- No simultaneous write is observed.
- MSW reports the exact next permitted action without treating the PR or commit as acceptance.

**Evidence required**
- HTW and MSW workspace screenshots, repository/branch/sync state, remote commit SHA, handoff YAML, validator output, and receiver report.

**Stop conditions**
- Different repository/branch, stale sync, missing sender release, uncommitted work, or another active writer.

## 5. Scenario REC-003 — MSW to TVW (Google AI Studio to VS Code)

**Purpose:** Verify a sequential handoff from GAIS into a local IDE environment.

**Preconditions**
- REC-002 or an equivalent released MSW checkpoint exists.
- Human Owner confirms the target local repository path and intended task branch.
- TVW has not yet started writing.

**Actions**
1. MSW stops writing, publishes a checkpoint, verifies its remote SHA, and releases the writer role.
2. TVW inspects remote URL, branch, HEAD, status, and remote-tracking SHA in VS Code/terminal.
3. TVW fetches the remote and verifies the checkpoint and working-tree cleanliness.
4. TVW validates and accepts the handoff.
5. TVW continues only the authorized next action.

**Expected result**
- Local repository identity and branch match the handoff.
- TVW's accepted checkpoint equals the verified remote SHA.
- No destructive local integration command is used to hide an unresolved change.

**Evidence required**
- Terminal output for remote, branch, status, HEAD, fetch, remote-tracking SHA; VS Code screenshot; handoff YAML; validator output; receiver report.

**Stop conditions**
- Dirty or divergent local tree, unsaved edits, wrong remote, wrong branch, unavailable fetch, or missing sender release.

## 6. Scenario REC-004 — TVW to GAIS (VS Code to Google AI Studio)

**Purpose:** Verify that a GAIS worker can resume a checkpoint created from the local IDE.

**Preconditions**
- TVW is the sole writer and the current approved Contract permits the changes.
- Local changes have been reviewed, committed, pushed, and remotely verified.
- No uncommitted local work is represented as part of the handoff.

**Actions**
1. TVW publishes the checkpoint and records its exact SHA and changed paths.
2. TVW releases the writer role and stops editing the task branch.
3. Human Owner verifies the intended repository and branch in GAIS.
4. GAIS worker pulls/synchronizes the published checkpoint using the currently available UI.
5. The GAIS worker verifies files and remote commit identity, validates the handoff, and accepts it before writing.

**Expected result**
- The GAIS workspace reflects the same branch and checkpoint SHA.
- No local-only changes are silently assumed to exist in GAIS.
- Receiver acceptance is recorded before a new write.

**Evidence required**
- TVW push output and remote SHA; GAIS repository/branch/sync screenshots; changed-file comparison; handoff and validator output.

**Stop conditions**
- GAIS cannot pull, branch differs, files do not match the remote checkpoint, or sender has not released.

## 7. Scenario REC-005 — Abrupt quota or session interruption

**Purpose:** Demonstrate recovery from the last remote checkpoint without pretending that uncommitted memory is recoverable.

**Preconditions**
- A task branch has one committed, remotely verified checkpoint.
- The sender can be interrupted before another commit.

**Actions**
1. Record the last verified SHA.
2. Simulate or observe quota/session interruption before a subsequent change is committed.
3. Start the receiving executor from the handoff and fetch the exact remote branch.
4. Compare the remote head with the checkpoint SHA.
5. Record any missing uncommitted work as NOT RECOVERABLE / UNKNOWN until independently supplied.

**Expected result**
- Receiver resumes only from the last verified remote commit.
- No missing in-memory changes are described as recovered.
- No reset/clean/overwrite operation is performed without explicit review and permission.

**Evidence required**
- Before/after SHAs, interruption observation, remote branch view, handoff, receiver recovery report, and a list of work not present in the remote checkpoint.

**Stop conditions**
- Remote branch head moved unexpectedly, local state conflicts, or the actual recovery point cannot be verified.

## 8. Scenario REC-006 — Merge conflict or possible concurrent writer

**Purpose:** Confirm that conflicting branches and simultaneous workers lead to a safe stop.

**Preconditions**
- Two proposed changes affect the same task branch or file, or an unresolved sync conflict is deliberately prepared in a non-production test context.
- The Human Owner supervises the test.

**Actions**
1. Capture both branch heads, working-tree states, and conflicting paths.
2. Ensure the current sender does not continue writing.
3. Attempt receiver acceptance while sender release is absent; verify the protocol/validator rejects the handoff.
4. Resolve writer ownership through the Human Owner.
5. Reconcile the changes on an authorized branch and re-run applicable checks.

**Expected result**
- No second writer begins while the first writer is active.
- The conflict is reported with exact paths and SHAs.
- The chosen resolution is reviewed; the conflict UI is not treated as an automatic correctness check.

**Evidence required**
- Both SHAs, status outputs, conflict details, validator failure for invalid release state, Owner decision, and post-resolution verification.

**Stop conditions**
- Unknown writer, unreviewed overwrite, force push, loss of local work, or unresolved ownership.

## 9. Foundation checks versus real pilot acceptance

| Evidence | What it can establish | What it cannot establish |
|---|---|---|
| JSON Schema parse | Schema syntax is valid | Real executor handoff works |
| YAML template validation | Template matches the schema | Actual workspace is synchronized |
| Python unit tests | Validator rules behave as tested | Account permissions or remote sync |
| GitHub Actions success | CI executed configured checks | Human acceptance or pilot success |
| GAIS/VS Code screenshots and SHAs | Observed state of the shown session | Other sessions or future sessions |
| Receiver's independent confirmation | That receiver accepted the stated checkpoint | Product completion or owner acceptance |

The foundation may be reported as locally/CI validated when evidence exists. REC-002 and REC-003 remain NOT_RUN until the Human Owner supplies actual account/workspace evidence and the receiving worker independently confirms the checkpoint.
