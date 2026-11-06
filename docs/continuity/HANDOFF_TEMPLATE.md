# Session Handoff — BVC Build & Learn

- Project/repository:
- Checkpoint date/time and timezone:
- Live `main` SHA:
- Source PRs/branches and changed-file inventory:
- Continuity Health (`HEALTHY` / `DEGRADED` / `BLOCKED`) with reasons:
- Window Capacity Risk (`LOW` / `ELEVATED` / `HIGH`) with observable reasons:

## Verified repository state

- Current project(s), phase/milestone:
- Canonical product/governance/design baselines:
- Active Task ID / Contract ID / revision / status / risk:
- Open PRs, branch refs and workflow checks:
- Completed work and exact evidence:

## Owner-reported local evidence

- Working tree / local branch / local commit:
- Commands run and exact outputs supplied by Human Owner:
- Unverified assumptions or limitations:

## Decisions, blockers and risks

- Accepted/rejected/superseded decision — canonical register and ID:
- Open decision — ID / dependency:
- Conflict, blocker or risk — exact source:

## Current work boundary

- In progress:
- Explicitly not done:
- Scope exclusions and stop conditions:

## Next permitted action

1. One smallest action authorized by current source records:

## Recovery and evidence map

- Main commit:
- Task Contract:
- Context Manifest:
- Change Record:
- Verification Evidence:
- Relevant PRs/checks:

## New-chat instruction

Start with `BVC_NEXT_CHAT_PROMPT.md` and reconcile all items against live GitHub before acting.

## Cross-executor worker handoff fields

For a handoff between executors, also complete the machine-readable structure in [WORKER_HANDOFF.template.yaml](./WORKER_HANDOFF.template.yaml). Do not omit these fields from the human-readable report:

- Sender and receiver aliases, actual model/tool labels, and environments.
- Current capability snapshot: GitHub read/write, local Git, GAIS Build Mode, and DeepSeek/VS Code; use UNKNOWN when not verified.
- Task/Contract ID, revision, status, and risk.
- Task branch, checkpoint SHA, commit URL, remote-verification evidence, and sync direction/result.
- Working-tree status and whether uncommitted work exists.
- Sender release status, timestamp, evidence, and confirmation that the sender stopped writing.
- Receiver acceptance status, timestamp, evidence, and confirmation that it independently verified the checkpoint.
- Actual CREATE/MODIFY/DELETE inventory, verification checks, blockers, and one next permitted action.
- Security review confirming that credentials and private customer data are not included.

A sender may mark the handoff READY_FOR_HANDOFF only after the checkpoint is committed and remotely verified, the working tree is clean, no uncommitted work remains, and the sender has released the writer role. The receiver changes it to RECEIVER_ACCEPTED only after independent verification. Neither state is proof of task completion or Human Owner acceptance.
