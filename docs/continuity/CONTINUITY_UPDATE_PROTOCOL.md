# Continuity Update Protocol

## Update-triggering events
Update Project State and Current Handoff after policy/decision/baseline approval, Task Contract create/revise/approve/block/complete, PR create/review/update/close/merge, material branch/commit change, validator/test/CI execution, deliverable creation/review/acceptance, new blocker/risk/scope change, or before a chat handoff.

## Procedure
1. Fetch current `main` HEAD and relevant PR/branch state.
2. Identify the exact event and source evidence; do not write from memory alone.
3. Classify claims as verified, owner-reported, assumption/open question or stale.
4. Update `PROJECT_STATE.yaml` revision, timestamp, observed SHA and evidence URLs.
5. Rewrite `CURRENT_HANDOFF.md` with completed work, exact current location, next permitted action, exclusions and open gates.
6. Update source map only when authority or canonical paths change.
7. Validate YAML against `specifications/v0.1/project-state.schema.json` (Draft / Experimental).
8. Review complete diff; continuity-only update should change only continuity paths. Use a dedicated branch and PR unless a current approved contract authorizes otherwise.
9. Human Owner reviews and merges unless explicitly authorizing a different procedure; then verify new `main` HEAD and committed state files.

## Freshness rules
- Snapshot is a navigation aid, never live truth.
- Snapshot without live `main` SHA and timestamp is stale/unknown.
- Every new chat must inspect live `main`, all open PRs and relevant branches.
- If state and handoff disagree, inspect authority and record discrepancy; do not choose silently.
- Preserve history in Git; avoid parallel contradictory state copies.

## Handoff checklist
- [ ] Repository/project identity and live main SHA/time
- [ ] Active task/contract/revision/status/risk/authorization
- [ ] PR/branch refs and changed-file inventory
- [ ] Canonical baselines and acceptance gates
- [ ] Decisions and unresolved IDs
- [ ] Completed vs incomplete work
- [ ] Local-only evidence marked Owner-reported
- [ ] One next permitted action
- [ ] No secrets or unnecessary personal/customer data
- [ ] No runtime/CI/acceptance claims without evidence
