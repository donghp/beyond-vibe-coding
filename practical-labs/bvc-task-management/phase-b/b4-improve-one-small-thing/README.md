# Phase B · Lesson B4 — Improve One Small Thing

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B3](../b3-close-and-reopen/README.md) · [Next Phase →](../../phase-c/README.md)  
> **Progress:** Phase B · Lesson B4 — Improve One Small Thing

**Learning level:** Beginner  
**Learning outcome:** Make one small, clearly bounded improvement with AI and verify that the first task flow still works.  
**Lesson status:** `OWNER_ACCEPTED_WITH_KNOWN_EVIDENCE_LIMITATIONS` — accepted by the Human Owner as part of the Phase B closeout decision on 2026-11-24. A separate B4 implementation diff and full regression evidence set are not independently archived in the current repository record.

## Owner acceptance record — 2026-11-24

The Human Owner explicitly accepted all four Phase B lessons and declared the phase closed. This B4 acceptance is recorded as an Owner decision; it does not imply that a separate B4 code change or every proposed regression check has independent evidence in the repository. Preserve those evidence limits.

See [Phase B Acceptance & Closeout Record](../PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md).

## 1. What you will practice

A useful app is improved in small steps. In this lesson, you will learn how to:

1. Describe one problem or one small improvement.
2. Ask AI to inspect the existing implementation.
3. Agree on the exact change before it edits files.
4. Review the actual file changes.
5. Re-test the behavior that already worked.

Do not ask AI to redesign or rebuild the entire application.

## 2. Choose one bounded improvement

Choose one small improvement that does not change the approved product scope, data model, storage behavior, or navigation.

Examples of appropriately small improvements may include:
- making the empty-state explanation easier to understand;
- making the task-title validation message clearer;
- improving keyboard focus or submission feedback without changing the task flow.

These are examples for discussion, not automatic approvals. Confirm the exact change with the Human Owner and the active B4 Task Contract before implementation.

Do not use B4 to add task editing, deletion, priorities, due dates, projects, templates, accounts, cloud sync, or new storage behavior.

## 3. Use AI as a careful teammate

Before allowing a change, ask AI to provide:

- the current behavior and the problem it intends to improve;
- the proposed user-visible result;
- the exact files it expects to change;
- any effect on B1, B2, or B3;
- the checks it will perform.

Review the plan. If the proposed change affects more files or behavior than the approved Contract allows, stop and narrow the scope.

## 4. Regression checks

After the bounded improvement, repeat the relevant checks:

- **B1:** a non-empty title creates one visible task; an empty title is rejected.
- **B2:** saving still works and gives truthful feedback.
- **B3:** the same saved task remains available after reload/reopen in the same browser profile.
- **B4:** the new improvement works without breaking the earlier behavior.

Re-run only the checks that apply to the approved change, but never claim a regression check passed unless you actually performed it.

## 5. B4 completion checklist

- [ ] B1–B3 were working before the improvement.
- [ ] One small improvement was selected and authorized.
- [ ] The planned changed-file list was reviewed before execution.
- [ ] The actual diff stays within the B4 Contract.
- [ ] The improvement is visible in Preview.
- [ ] Relevant B1–B3 regression checks pass.
- [ ] Screenshots or other requested evidence are recorded.
- [ ] No unrelated feature or dependency was added.

## 6. Phase B completion

Phase B was explicitly accepted and closed by the Human Owner on 2026-11-24. The closeout record preserves the evidence limits and distinguishes Owner acceptance from individual test PASS results.

Continue to [Phase C — Make It Useful Every Day](../../phase-c/README.md).

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B3](../b3-close-and-reopen/README.md) · [Next Phase →](../../phase-c/README.md)
