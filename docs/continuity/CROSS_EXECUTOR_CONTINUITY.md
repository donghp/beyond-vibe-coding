# Cross-Executor Continuity and Recovery Protocol

**Contract:** BVC-GLOBAL-TC-002 Revision 1  
**Protocol role:** Supporting operational procedure under BOOTSTRAP.md  
**Repository:** donghp/beyond-vibe-coding

## 1. Purpose

This protocol allows authorized AI workers to continue the same project task across different models, providers, applications, and working environments without treating chat history or executor memory as the source of truth.

The repository owns durable project state. An executor is temporary. A receiving executor must reconstruct the current task from the approved Task Contract, canonical project records, a verified GitHub checkpoint, and an explicit handoff.

This is a controlled sequential handoff procedure. It is not a real-time collaboration service, a universal synchronization layer, or a technically enforced distributed lock.

## 2. Roles and vocabulary

- **Human Owner:** retains authority over project baselines, task approval, scope changes, risk escalation, acceptance, and merge decisions.
- **Sender:** the executor currently responsible for the task/working branch.
- **Receiver:** the executor proposed to continue the task after verifying and accepting the handoff.
- **Checkpoint:** a committed Git revision whose branch and SHA have been verified on the remote repository.
- **Writer release:** the sender's explicit declaration that it has stopped writing to the task/working branch.
- **Receiver acceptance:** the receiver's explicit confirmation that it independently verified the checkpoint and is now the sole active writer.
- **Handoff record:** a machine-readable snapshot conforming to WORKER_HANDOFF.schema.json.

The Human Owner supplied these operational aliases:

| Alias | Intended environment | Important qualification |
|---|---|---|
| HTW | Hoàng Trung Worker in Google AI Studio Build Mode | Alias is not proof of account access, repository linkage, branch, or sync state |
| MSW | Mã Siêu Worker in Google AI Studio Build Mode | Verify its actual workspace and GitHub connection each session |
| TVW | Triệu Vân Worker using DeepSeek in VS Code | Verify the actual model, IDE, local Git state, and available tools |
| CHATGPT | ChatGPT or another authorized ChatGPT execution surface | Distinguish the official read-only GitHub app from separately authorized write-capable tools |
| OTHER | Another executor explicitly authorized by the Human Owner | Declare actual identity and capabilities; do not assume compatibility |

Aliases are labels only. They are not credentials, permissions, or evidence.

## 3. Non-negotiable invariants

1. Current approved records on GitHub main control project truth and authority.
2. A task may proceed only under an APPROVED Task Contract on main or explicit, recorded Human Owner authorization.
3. The exact branch, commit SHA, changed-file inventory, verification results, blockers, and next permitted action must be visible in the handoff.
4. Only one executor may write to a given task/working branch at a time.
5. The sender must stop writing and record release before the receiver writes.
6. The receiver must verify the remote checkpoint and accept the handoff before writing.
7. If the sender has not released, the receiver cannot verify the checkpoint, or another writer may still be active, stop all writes.
8. A feature branch or open PR is proposed work. A merged PR is not automatically task acceptance.
9. A commit, successful preview, prompt response, or passing test does not prove product value or human acceptance.
10. Never publish secrets, credentials, private customer data, private EFIN information, or private ENERIXON source material in a handoff.

The schema and validator check that a handoff record is internally consistent. They do not reserve a branch, prevent another worker from pushing, or enforce a lease.

## 4. Standard worker lifecycle

### Step A — Bootstrap

The receiving executor must:

1. Read BOOTSTRAP.md and GITHUB_REPOSITORY_VERIFICATION.md.
2. Verify repository full name, stable repository identity, default branch, live main SHA, and current open PRs.
3. Read the seven canonical continuity records and the current Source Manifest.
4. Inspect the active project's approved baseline, active Task Contract, required context, decisions, and evidence.
5. Read the latest handoff record and follow its referenced branch, PR, and commit.
6. Classify unsupported or missing information as UNKNOWN or PARTIAL / NOT VERIFIED.

Do not use old conversation memory to override repository records.

### Step B — Discover actual capabilities

The executor records what this session can actually do. Assess separately:

- GitHub repository read;
- GitHub branch/commit/PR write;
- local Git/IDE access;
- Google AI Studio Build Mode access;
- DeepSeek/VS Code access.

Use CONFIRMED only when a real available action or visible UI evidence demonstrates the capability. Otherwise use UNKNOWN or UNAVAILABLE. A successful read does not prove write access. A product name does not prove that an account, repository, or workspace is connected.

### Step C — Verify authority and scope

Before writing, confirm:

- Task Contract ID, revision, APPROVED status on main, and risk classification;
- required context and recovery point;
- exact CREATE/MODIFY/DELETE paths and Change Budget;
- executor identity and permission for the next action;
- no unresolved baseline, scope, security, or writer conflict.

If any prerequisite is missing, remain read-only and identify the exact blocker. Do not infer authorization from a handoff, branch, or prompt.

### Step D — Accept a handoff

For a READY_FOR_HANDOFF record, the receiver must independently verify:

1. sender release is RELEASED;
2. the sender has stopped writing;
3. the branch exists remotely;
4. the remote branch head equals the handoff checkpoint SHA;
5. the remote verification evidence refers to the same branch and SHA;
6. the working tree was clean and there was no uncommitted work at release;
7. the active Task Contract still permits the next action.

The receiver then changes the handoff status to RECEIVER_ACCEPTED, records its own identity and acceptance evidence, and becomes the sole active writer. If the record cannot be updated under the task's authority, the Human Owner must coordinate acceptance through the authorized record path. Do not write first and document acceptance later.

### Step E — Execute and checkpoint

Work only on the authorized task branch. Keep changes bounded by the active Contract. At a material checkpoint:

1. inspect the working tree and changed paths;
2. run the applicable verification;
3. commit the intended changes;
4. push through an authorized GitHub/IDE path;
5. independently verify the remote branch SHA;
6. record the checkpoint, file inventory, checks, evidence, blockers, and next action.

Do not claim that an AI workspace is synchronized merely because its GitHub account is connected.

### Step F — Release to another worker

The sender:

1. stops all edits and tool actions that can write to the task branch;
2. commits and publishes the checkpoint;
3. verifies the remote branch and exact SHA;
4. records the actual changed-file inventory and verification evidence;
5. sets sender release to RELEASED and records time/evidence;
6. leaves active_writer as NONE and receiver acceptance as NOT_ACCEPTED;
7. communicates the handoff record location to the Human Owner/receiver.

If a change cannot be committed and remotely verified, it is not part of the checkpoint. Record it as local-only/unknown; never imply it can be recovered from GitHub.

## 5. Recovery rules

### Quota, model, or session interruption

Recover from the latest remotely verified commit only. The next executor must fetch and inspect that exact branch and SHA. In-memory or uncommitted changes are not assumed to be recoverable. Do not reset, clean, overwrite, or discard a local workspace to make it match the remote without first preserving and reviewing its contents.

### Local IDE / TVW

Before any integration operation, inspect the actual local repository:

~~~powershell
git remote -v
git status --short --branch
git branch --show-current
git rev-parse HEAD
git fetch origin
git status --short --branch
git log -1 --oneline origin/main
~~~

When the authorized task branch is not main, inspect that branch's remote-tracking ref instead. A clean working tree and a verified remote checkpoint are prerequisites for a fast-forward pull. Do not use reset, clean, force push, or rebase as a shortcut around an unresolved conflict.

### Conflict or possible concurrent writer

Stop writes. Record both branch heads, local status, conflicting paths, the last verified checkpoint, and which executor may still be active. The Human Owner determines which writer resumes and which changes are preserved. A merge-conflict UI is a resolution aid, not proof that the selected version is correct.

## 6. Provider and environment adapters

### Google AI Studio Build Mode — HTW and MSW

Google's current Build Mode documentation describes importing a repository from GitHub, linking an existing repository, pushing AI Studio changes to GitHub, pulling external GitHub changes into AI Studio, and resolving sync conflicts through a side-by-side dialog.

Official reference: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

For each worker and session, the Human Owner/executor must still verify the actual linked repository, account, branch, last sync result, and visible changed files. Google AI Studio does not provide direct real-time collaborative editing; shared GitHub and controlled sequential handoff remain necessary.

### VS Code and DeepSeek — TVW

Do not assume that a selected DeepSeek model has access to local Git, the GitHub remote, terminal commands, or write permissions. Verify the model label, IDE tool availability, repository path, remote URL, branch, HEAD, working-tree state, and push result in that actual session. If terminal output is unavailable, report the corresponding field as UNKNOWN.

### ChatGPT

The official ChatGPT GitHub app is documented as read-only and retrieves permitted repository content on demand. OpenAI directs users to Codex for generating, editing, and pushing repository changes.

Official reference: https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt

A separately available connector or Codex execution surface may expose different capabilities. Inspect the exact tools and permissions available in the current session. Do not describe a read-only app as write-capable, and do not infer another session's capabilities from this one.

## 7. Handoff record and reporting

Use WORKER_HANDOFF.template.yaml and validate it with scripts/validate_worker_handoff.py. Keep one current handoff record in the relevant project's authorized continuity location; this global schema/template is reusable and does not create a second project-state store.

A handoff must include:

- repository, task, Contract revision/status/risk;
- sender and receiver identities;
- per-session capability assessment;
- branch, checkpoint SHA, remote verification and working-tree status;
- writer release and receiver acceptance;
- execution state and actual file inventory;
- verification checks and evidence;
- blockers and the next permitted action;
- privacy/sensitive-data declarations.

Every material recovery report must distinguish VERIFIED_FACT, OWNER_REPORTED, PROPOSAL, ASSUMPTION, OPEN_QUESTION, STALE, and PARTIAL / NOT VERIFIED. Report Continuity Health separately from Window Capacity Risk. If no capacity meter is available, report UNKNOWN rather than inventing a percentage.

Use exactly one operational status:

- **GREEN:** verified for the stated next action; this does not mean the project or task is complete.
- **AMBER:** bounded read-only recovery may continue, but writes depending on unresolved facts must stop.
- **RED:** identity, authority, scope, security, checkpoint, or writer coordination is materially conflicted; stop consequential work.

## 8. Protocol limitations

This protocol does not provide:

- an automated distributed lock, lease, or branch reservation;
- guaranteed two-way synchronization across all providers and accounts;
- automatic quota detection or recovery of uncommitted in-memory work;
- universal ChatGPT, Google AI Studio, VS Code, or DeepSeek capabilities;
- automatic acceptance of tasks, PRs, test results, or product behavior.

A real HTW-to-MSW or MSW-to-TVW pilot remains NOT VERIFIED until the Human Owner supplies inspectable evidence from the actual environments and the receiver independently confirms the checkpoint.
