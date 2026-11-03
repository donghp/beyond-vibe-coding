# BVC Task Management — UX Wireframes v0.1.0

**Document ID:** BVC-TM-UX-002  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** BVC-TM-PD-001, Product Definition v0.1.0  
**Related:** [Responsive My Day Wireframe](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg)

---

## 1. Purpose and reading guide

These wireframes describe information hierarchy and responsive layout, not final graphic design or implemented screens. Text labels are examples. Sample tasks are synthetic.

The same product and navigation must remain recognizable across phone, tablet, laptop, and desktop. Do not shrink a desktop screen to create the phone UI.

## 2. Global design rules

- My Day is the first screen after setup.
- Add task is the most prominent action.
- My Day prioritizes actionable work, not charts.
- My Tasks is the place for all tasks and advanced search/filter behavior.
- Projects group tasks; tasks may exist without a project.
- Templates are optional starting points.
- Settings & Backup clearly explains local data behavior.
- On phones, primary navigation is a bottom bar: My Day, My Tasks, Projects, More.
- On wider screens, use a navigation rail or sidebar as space permits.
- No account avatar, team switcher, invite button, or cloud-sync status indicator belongs in the MVP.

The My Day section order must follow Product Definition v0.1.0, Section 8.2:

1. Overdue
2. Due Today
3. Today's Focus
4. Upcoming
5. Add task

A task must appear only once in My Day. A Focus task that is overdue belongs in Overdue with a Focus marker. A Focus task due today belongs in Due Today with a Focus marker. A Focus task that is neither overdue nor due today belongs in Today's Focus, even when it has a future due date. Upcoming excludes tasks already displayed in an earlier section.

## 3. My Day — phone (compact)

**Reference viewport:** 390 × 844 CSS px. Must also remain usable at 320 and 360 CSS px.

```text
┌────────────────────────────────────┐
│ BVC Task Management             ⋯  │
│                                    │
│ My Day                             │
│ Tuesday, 3 November                │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ OVERDUE · 1                    │ │
│ │ Prepare supplier payment       │ │
│ │ Yesterday · High               │ │
│ └────────────────────────────────┘ │
│                                    │
│ DUE TODAY                          │
│ ┌────────────────────────────────┐ │
│ │ ☆ Prepare weekly sales report  │ │
│ │   Sales · High · Focus         │ │
│ ├────────────────────────────────┤ │
│ │ ○ Call supplier about delivery │ │
│ │   Operations · Normal          │ │
│ ├────────────────────────────────┤ │
│ │ ○ Review campaign draft        │ │
│ │   Marketing · Normal           │ │
│ └────────────────────────────────┘ │
│                                    │
│ TODAY'S FOCUS                      │
│ ┌────────────────────────────────┐ │
│ │ ☆ Review important proposal    │ │
│ │   Focus · Friday               │ │
│ └────────────────────────────────┘ │
│                                    │
│ UPCOMING                           │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare Friday meeting       │ │
│ │   Thursday · Normal            │ │
│ └────────────────────────────────┘ │
│                                    │
│       [ + Add task ]               │
│                                    │
│ ────────────────────────────────── │
│  ◉ My Day  □ My Tasks  ▦ Projects  │
│                           More    │
└────────────────────────────────────┘
