# Decision Register Index — BVC Build & Learn

This file is an index, not a duplicate decision database. Project decisions remain in the canonical project Decision Registers and approved governance records.

## Canonical decision sources

| Scope | Canonical source | Rule |
|---|---|---|
| BVC Task Management product, UX and architecture decisions | `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` and the current architecture governance records | Read the live file and verify decision IDs and statuses |
| BVC Task Management risk classification | `projects/task-management/governance/BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md` | Project-specific policy; do not generalize it to other projects |
| Repository-wide Core Specification semantics | `specifications/v0.1/README.md` and each current specification | Draft / Experimental specifications; preserve their stated limitations |
| Project-specific decisions in future Build & Learn projects | The relevant project's approved governance/decision register | Do not copy decisions across projects without an explicit authority reference |

## Continuity operating rules

The operational rules for event triggers, machine/semantic separation, PR review and handoff are defined in `CONTINUITY_PROTOCOL.md` and `BOOTSTRAP.md`. The updater is deliberately unable to accept or reject decisions.

## Recording a decision

When a decision is accepted, rejected or superseded:

1. Update the canonical project Decision Register or approved governance record under its applicable authority.
2. Preserve decision ID, exact status, owner/role, date, rationale and source references as required by that register.
3. Update project state/handoff only where the project rules require it.
4. Update this index only if a canonical decision source path or authority mapping changes.

Never infer a decision from a chat suggestion, branch commit, open PR, workflow success or a task status.
