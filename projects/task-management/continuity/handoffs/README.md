# BVCTM Worker Handoffs

**Directory:** `projects/task-management/continuity/handoffs/`  
**Project:** `BVC-TASK-MANAGEMENT`  
**Procedure status:** PILOT — use only for a real, authorized worker transition.

## Purpose

Store one YAML record for each actual worker-to-worker handoff. This directory is not a task register, event log, session transcript archive, or distributed lock.

The Global Continuity schema and template are the only generic handoff authority:

- Schema: `docs/continuity/WORKER_HANDOFF.schema.json`
- Template: `docs/continuity/WORKER_HANDOFF.template.yaml`
- Global procedure: `docs/continuity/CROSS_EXECUTOR_CONTINUITY.md`

Do not copy or fork those generic files into BVCTM.

## When to create a handoff record

Create an individual YAML record only when:
1. A real sender is stopping work and explicitly releases the active writer role.
2. The exact task, approved Contract revision, branch, commit SHA, source-main SHA and changed-file inventory are known.
3. Verification results, workspace synchronization, unresolved findings and one permitted next action are recorded.
4. A receiver independently verifies the remote checkpoint and explicitly accepts responsibility before writing.

A ChatGPT window change, quota warning, or request to prepare a continuity ZIP does not by itself prove a sender release or receiver acceptance. Do not fabricate a handoff record.

## Required record content

Each record must conform to the Global schema and identify, at minimum:

- Unique handoff ID and project/task/Contract identity.
- Sender and receiver executor identity, model/tool label and actual capabilities.
- Source `main` SHA, task branch and exact checkpoint SHA.
- Changed-file inventory, including CREATE/MODIFY/DELETE classification.
- Verification commands/results and evidence references.
- Local and external workspace synchronization; explicitly list LOCAL_ONLY or NOT_VERIFIED data.
- Blockers, risks, completed versus incomplete work.
- Explicit sender release and receiver acceptance, with timestamps.
- Exactly one next permitted action under the active Contract.

Never include API-key values, tokens, passwords, private account details, customer data or other secrets.

## Naming and storage

Use one file per real handoff, for example:

`H-0001_<task-id>_<sender>-to-<receiver>.yaml`

Allocate a unique ID according to the current project handoff history. Do not reuse IDs, overwrite an earlier handoff record, or put multiple unrelated transitions into one YAML file.

## Relationship to HANDOFF_LOG.md

- `HANDOFF_LOG.md` is the append-only event/checkpoint history.
- Each actual worker handoff YAML is the structured sender/receiver payload.
- The log may link to a handoff file; it does not replace the file.
- A material project checkpoint that is not a worker handoff may be logged without creating a handoff YAML.

## Concurrency and stop conditions

The handoff YAML is evidence, not a technical lock. It does not prevent a second executor from writing.

Stop before writing if:
- Another writer has not explicitly released the task.
- The receiver cannot independently verify the checkpoint.
- The branch or main SHA differs from the handoff.
- The working tree contains unrecorded changes.
- Required task authority or scope is missing.
- The proposed next action exceeds the approved Contract.

The Human Owner retains task authorization, acceptance and merge authority.
