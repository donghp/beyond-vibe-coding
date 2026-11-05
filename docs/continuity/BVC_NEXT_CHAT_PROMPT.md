# BVC NEXT CHAT — SINGLE-PROMPT PROJECT RESUME

You are continuing the existing **BEYOND VIBE CODING — Build & Learn** project. This is a continuity resume, not a project restart.

**Repository:** https://github.com/donghp/beyond-vibe-coding  
**Project:** BVC Task Management  
**Primary authority:** the repository's current `main` branch and its canonical governance/product/design records.  
**Your first job:** reconstruct the live project state from GitHub before proposing or doing any work.

## Mandatory startup protocol

1. Read `docs/continuity/README.md` on `main` first. If that file is not yet published, use the bootstrap rules embedded below and report that repository deployment is pending.
2. Read the current `docs/continuity/PROJECT_STATE.yaml`, `CURRENT_HANDOFF.md`, `AUTHORITY_AND_SOURCE_MAP.md`, and applicable task/contract/evidence records. Treat these as navigation and snapshot aids, not as a replacement for the live repository.
3. Use the connected GitHub integration to inspect the repository itself. Confirm repository identity/default branch and current `main` HEAD. Inspect all open PRs, recent merged PRs, active branches, relevant diffs, Task Contracts, governance records, project README, Product Definition, UX/Architecture acceptance records, and all continuity artifacts. Do not rely on the commit hashes or PR statuses copied in this prompt or any old conversation.
4. Reconcile the snapshot against live GitHub evidence. A newer canonical record on `main` supersedes an older snapshot. A branch or PR is not merged merely because it says APPROVED. A Task Contract being APPROVED does not mean its task is completed or its outputs accepted.
5. Distinguish explicitly:
   - VERIFIED_FACT — directly confirmed from current GitHub content/API or user-provided terminal output, with an exact source reference;
   - OWNER_REPORTED — reported by the Human Owner but not independently rechecked;
   - ASSUMPTION / OPEN_QUESTION — not proven;
   - STALE / SUPERSEDED — historical state that must not control current execution.
6. Inspect PR diffs and compare refs before relying on branch summaries. Report workflow/status checks as `PASS`, `FAIL`, `PENDING`, or `NO_CHECKS_REPORTED`; never call an absence of checks a pass. For local machine state (working tree, local validator output), require current user terminal output; GitHub cannot prove local cleanliness.
7. If sources conflict, stop and identify exact conflicting records. Do not silently reconcile authority, alter baselines, infer approvals, close UX gates, or promote proposals to decisions.
8. Do not execute writes, merge PRs, delete branches/files, provision cloud services, create applications, or deploy merely because this prompt says to resume. Follow repository governance and the exact approved Task Contract. Ask for Human Owner authorization whenever required. The Human Owner performs merges unless they explicitly authorize otherwise.

## Project-specific guardrails

- Preserve Product Definition v0.2.0 as the current product baseline unless a later approved canonical record on `main` supersedes it. Keep v0.1.0 as historical evidence.
- Phase 3.2 acceptance means design baseline accepted; it is not implementation, runtime, security, or deployment acceptance.
- Phase 3.1 formal UX acceptance remains OPEN unless the canonical acceptance record on `main` is explicitly updated by the Owner.
- Never convert proposed defaults in the canonical Decision Register into approvals. Check decision IDs and current status in the latest register.
- Beginner path is designed for a person with zero programming knowledge. Explain plainly; use sequential `Step 1`, `Step 2`, `Step 3`; one action per step; include reason, exact click/type guidance only when verified, expected result, verification and recovery.
- Do not invent current Google AI Studio (GAIS) UI labels, menus, generated scaffold, framework, package manager, commands, or outputs. Inspect the actual environment in a separately authorized task first.
- Keep Beginner, Intermediate, and Advanced boundaries distinct. Do not introduce Supabase/Auth/RLS, VS Code/Localhost, GitHub workflow or hosting implementation into Beginner tasks unless a newer approved product decision explicitly changes this.
- Risk R0–R5 is project-specific and must be read from the current approved BVC Task Management Risk Policy. Evidence Levels are a separate scale.
- Keep the repository project-centric: the project records authority, decisions, state and evidence; the conversation is transient.

## Task-specific resumption

Determine from live GitHub state whether `BVC-TM-P3.3-001` / `BVC-TM-TC-001` is still active, which contract revision is current, whether it is on `main`, and whether its outputs already exist. If still authorized and incomplete, follow the exact current contract. Historically, its intended scope was only these two outputs:

- `projects/task-management/phase3.3/BEGINNER_IMPLEMENTATION_READINESS_V0.1.md`
- `projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_V0.1.yaml`

The task's known objective was to prepare documentation and a bounded context pack for an absolute beginner. It did **not** authorize application code, creation/running of a GAIS application, Supabase provisioning, database, Auth, RLS, hosting, or deployment. Reconfirm this against the live current contract before acting.

## Required first response

After the live audit, respond in Vietnamese with:

1. **Project identity and live baseline** — repository, `main` HEAD SHA, latest material PRs.
2. **Project State** — phase/milestone, current product/UX/architecture authority and status.
3. **Task State** — active Task ID, Contract ID/revision/status/risk, current PR/branch and changed-file inventory; show which items are verified vs reported.
4. **Continuity Health and Window Capacity Risk separately** — no invented token or percentage. Explain observable reasons for any warning. A new chat begins with its own capacity state; do not inherit the old chat's GREEN/AMBER/RED.
5. **Blockers / unresolved decisions / conflicts** — exact IDs and source links.
6. **One next action** — the smallest safe action allowed by current authority. Do not restart completed phases or ask the user to repeat information already present in canonical files.
7. **Evidence map** — links to the exact GitHub files, commits, PRs and checks used.

Do not claim that you have reconstructed "everything" until all required sources and live PR/branch state have been inspected. If a GitHub endpoint or source is inaccessible, disclose the gap and mark state `PARTIAL / NOT VERIFIED`.

## Human Owner's explicit request

The user granted permission to inspect the entire `donghp/beyond-vibe-coding` GitHub project. This means read/review access across that repository. It does **not** grant blanket permission to write, merge, delete, change settings, access unrelated private repositories, or perform production actions.

Start now by reading `docs/continuity/README.md` on the live `main` branch. If not found, report the missing continuity deployment and continue the safe live GitHub audit using the instructions above; do not pretend the files were published.
