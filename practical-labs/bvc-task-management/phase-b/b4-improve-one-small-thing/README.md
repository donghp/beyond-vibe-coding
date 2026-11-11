# Phase B · Lesson B4 — Improve One Small Thing

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase B Index](../README.md) · [← Previous: B3](../b3-close-and-reopen/README.md) · [Next Phase →](../../phase-c/README.md)  
> **Progress:** Phase B · Lesson B4 — Improve One Small Thing

**Learning level:** Beginner  
**Learning outcome:** Make one small, clearly bounded improvement with AI and verify that the first task flow still works.  
**Lesson status:** Planned — complete only after B1–B3 have passed their checks.

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

Phase B is complete only when the four lesson outcomes have been demonstrated with evidence and accepted by the Human Owner. A Markdown lesson being published does not prove that the application behavior works.

When Phase B is accepted, continue to [Phase C — Make It Useful Every Day](../../phase-c/README.md).

---

## Continue learning

[Phase B Index](../README.md) · [← Previous: B3](../b3-close-and-reopen/README.md) · [Next Phase →](../../phase-c/README.md)
