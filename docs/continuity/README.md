# BVC Continuity Engine v3.0

**Repository:** donghp/beyond-vibe-coding  
**Project:** BEYOND VIBE CODING — Build & Learn  
**Operating model:** Event-Driven Continuity

The repository owns durable project knowledge. AI executors are temporary and replaceable; every authorized executor must reconstruct current truth from canonical repository records. No model, provider, application, or session is authoritative.

## Start here

Use [BVC_NEXT_CHAT_PROMPT.md](./BVC_NEXT_CHAT_PROMPT.md) as the single entry prompt. It directs the receiving session to read [BOOTSTRAP.md](./BOOTSTRAP.md), reconcile live GitHub, then inspect the seven continuity records.

## The seven canonical continuity records

| File | Responsibility | Update rule |
|---|---|---|
| [BOOTSTRAP.md](./BOOTSTRAP.md) | Startup sequence, authority, access and execution gates | Change only when startup/governance rules change |
| [CURRENT_STATE.yaml](./CURRENT_STATE.yaml) | Portfolio pointers, historical anchor and machine-observed repository snapshot | The updater changes only machine_snapshot; semantic project state requires review |
| [CONTINUITY_PROTOCOL.md](./CONTINUITY_PROTOCOL.md) | Event triggers, update ownership and anti-loop rules | Change when the operating protocol changes |
| [DECISIONS.md](./DECISIONS.md) | Index to canonical decision records; no duplicate decision registry | Update when canonical decision locations or continuity rules change |
| [SOURCE_MANIFEST.csv](./SOURCE_MANIFEST.csv) | Canonical sources, authority and bootstrap requirements | Update when source paths or authority change |
| [HANDOFF_LOG.md](./HANDOFF_LOG.md) | Append-only record of material handoffs and milestones | Append only for meaningful checkpoints, not every prompt or commit |
| [HANDOFF_TEMPLATE.md](./HANDOFF_TEMPLATE.md) | Reusable handoff structure | Change only when the handoff format changes |

`BVC_NEXT_CHAT_PROMPT.md` is the convenience entry point. The seven files above are the continuity record set; the prompt is not an eighth state store.

## Automation components

- `scripts/update_continuity_state.py` reads a GitHub Actions event and the Git history available in the runner. It derives changed paths and commit metadata. It never interprets product meaning.
- `.github/workflows/continuity-refresh.yml` runs on material pushes to `main`, offers a manual `workflow_dispatch`, tests the updater, and creates or refreshes one automation PR.
- `tests/test_continuity_updater.py` verifies material-path filtering and protects semantic fields from machine overwrite.

The updater changes only `machine_snapshot` in `CURRENT_STATE.yaml`. It does not edit decisions, task status, acceptance, project baselines, handoff conclusions, or source authority. An update PR is a proposal; the Human Owner reviews and merges it.

## What triggers an update

A commit or prompt on a feature branch is proposed work. It does not change canonical continuity state. After a material change reaches `main`, the workflow compares the latest main commit with the last machine-observed main SHA and opens or updates one PR containing the machine snapshot. A continuity-only merge does not recursively create another refresh PR.

A conversation that produces no repository event cannot be detected by GitHub Actions. The assistant must still prepare a semantic handoff when a meaningful decision, blocker, acceptance, milestone, or task transition occurs.

## Important boundaries

- `main` and canonical project records remain authoritative.
- Open PRs and feature branches are proposals, not accepted project truth.
- Machine-observed Git facts and semantic project state are separate.
- No workflow writes directly to `main`.
- The automation branch is reserved for generated continuity snapshots.
- The updater uses the repository-provided `GITHUB_TOKEN`, with only contents and pull-request permissions in its job. It does not require a personal access token.
- No workflow run or absent check is represented as PASS without actual evidence.
- Project State, Context Manifest, Change Record and Verification Evidence retain their own BVC Core Specification meanings. This portfolio continuity index does not replace them.

See [CONTINUITY_PROTOCOL.md](./CONTINUITY_PROTOCOL.md) for detailed event rules and [SOURCE_MANIFEST.csv](./SOURCE_MANIFEST.csv) for the startup reading map.
