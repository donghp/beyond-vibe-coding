# BVC Phase 3.1 — UX Design Review & Acceptance Record

**Program:** BEYOND VIBE CODING — Build & Learn  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.1 — UX & Product Design  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Parent baseline:** BVC-TM-PD-001, Product Definition v0.1.0  
**Prepared:** 2026-11-03

---

## 1. Purpose

Use this record to review and accept the Phase 3.1 design package before beginning Phase 3.2. It is stored with the Task Management project because it governs this project only. It is a review checklist and decision record, not a claim that the design has already been accepted or tested on real devices.

## 2. What Phase 3.1 is supposed to deliver

Phase 3.1 answers: **How should the product look, how should a person use it, and how should the same experience adapt to different screens?**

It must define:

- What a first-time user sees and does.
- How the user moves between My Day, My Tasks, Projects, and More.
- What each important screen contains.
- How the layout changes between phone, tablet, laptop, and desktop.
- How buttons, forms, task rows, sheets, dialogs, filters, and feedback behave.
- How the interface remains understandable with touch, keyboard, text enlargement, and assistive technology.
- How the design will be tested objectively.

Phase 3.1 does **not** build the application or choose its final database/framework. Those belong to Phase 3.2 and Phase 3.3, respectively.

## 3. Required files

The following must exist under `projects/task-management/design/ux/v0.1/`:

- [ ] `README.md`
- [ ] `BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md`
- [ ] `assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.png`
- [ ] `assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg`
- [ ] `PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md` (this review record)

## 4. Review gates

| Gate | Review question | Evidence | Decision |
|---|---|---|---|
| G1 — User journey | Can a non-technical person understand first use, add a task, complete it, find it, and back up data? | Journey review / usability notes | OPEN |
| G2 — Navigation | Does navigation match Product Definition §8 on compact, medium, and expanded layouts? | Navigation map and wireframes | OPEN |
| G3 — Screen layouts | Are My Day, My Tasks, Projects, Task Detail, Templates, and Settings & Backup sufficiently described? | Wireframes | OPEN |
| G4 — Responsive behavior | Does one application adapt without merely shrinking desktop UI? | Responsive specification and viewport matrix | OPEN |
| G5 — Visual system | Are visual tokens consistent, readable, restrained, and accessible? | Design system and contrast review | OPEN |
| G6 — Interactions | Are save, validation, completion, deletion, project removal, kit application, export, and restore predictable? | Interaction specification | OPEN |
| G7 — Accessibility | Are touch, keyboard, focus, labels, screen readers, text zoom, and reduced motion covered? | Accessibility document | OPEN |
| G8 — Testability | Can each UX criterion be verified with concrete evidence? | UX acceptance criteria | OPEN |
| G9 — Baseline integrity | Does the design remain within Product Definition v0.1.0 and leave five Core Specifications unchanged? | PR diff review | OPEN |

## 5. Decisions requiring Product Owner review

| ID | Question | Proposed default | Status |
|---|---|---|---|
| DEC-UX-001 | How far ahead does My Day show Upcoming? | Next 7 calendar days | OPEN |
| DEC-UX-002 | Does Today's Focus reset daily? | Marker scoped to current local date | OPEN |
| DEC-UX-003 | What happens to tasks when a project is removed? | Preserve tasks; detach to No project | OPEN |
| DEC-UX-004 | What happens when a starter kit is applied twice? | Skip recognized items; show summary | OPEN |
| DEC-UX-005 | When does local storage disclosure appear? | Before first meaningful data entry | OPEN |
| DEC-UX-006 | What visual theme ships first? | Calm light theme; dark theme deferred | OPEN |
| DEC-UX-007 | Is the proposed blue primary palette acceptable? | Review candidate tokens and contrast in rendered UI | OPEN |
| DEC-UX-008 | What is the minimum browser support matrix? | Confirm in Phase 3.2 test plan based on real target users | OPEN |

These are not approved product changes until the Product Owner records a decision.

## 6. Phase 3.1 acceptance checklist

- [ ] All required files are present on the Phase 3.1 branch.
- [ ] All relative Markdown links resolve.
- [ ] User journeys cover first use, daily work, task capture, task completion, search/filter, project, starter kit, backup, and restore.
- [ ] Navigation is consistent across phone, tablet, and desktop.
- [ ] Wireframes show the same product and information architecture across devices.
- [ ] Responsive test widths match the Product Definition starting ranges.
- [ ] Visual design tokens have been reviewed; measured contrast applies to actual pairings.
- [ ] Important interactions have success, error, empty, and confirmation behaviors.
- [ ] Accessibility expectations are testable; no unsupported conformance claim is made.
- [ ] Open decisions are resolved or explicitly deferred from implementation.
- [ ] Product Definition v0.1.0 is unchanged unless a separately approved revision is made.
- [ ] Five Phase 2 Core Specifications and their schemas are unchanged.
- [ ] Human review decision is recorded.

## 7. What PASS means at this phase

A Phase 3.1 PASS means the **design package** is complete, coherent, within product scope, and sufficiently testable to guide architecture and implementation.

It does not mean:

- The application has been implemented.
- The design has been tested on real iPhone or Android hardware.
- WCAG conformance has been certified.
- The app has been performance-tested.
- Data storage, backup, or restore works in a running application.

Those require the implementation and evidence produced in later phases.

## 8. Next phase after acceptance — Phase 3.2

Once Phase 3.1 is accepted, Phase 3.2 defines:

1. Application architecture and technology selection.
2. Frontend application structure and routing.
3. Local data storage choice and workspace model.
4. Task, Project, Checklist, Starter Kit, and Settings data models.
5. Date/time and timezone behavior.
6. Backup/restore file format, validation, versioning, and recovery behavior.
7. Local data privacy and browser storage limitations.
8. Responsive component architecture and design-token implementation approach.
9. Test architecture, browser/device matrix, and CI boundaries.
10. Future cloud adapter boundary without implementing Cloud Mode.

Only after Phase 3.2 is reviewed should Phase 3.3 issue the first bounded implementation Task Contract.

---

**Review outcome:** OPEN — awaiting Product Owner decisions and review evidence.

**Repository location:** `projects/task-management/design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md`.
