#!/usr/bin/env python3
"""Refresh only the machine-observed section of BVC Continuity State.

This updater records Git facts from a GitHub Actions event. It must not infer or
change project semantics, decisions, task status, acceptance, risk or baselines.
"""
from __future__ import annotations

import argparse
import copy
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml

UPDATER_VERSION = "3.0.0"
MAX_CHANGED_PATHS = 200
SELF_MANAGED_PATHS = {
    "scripts/update_continuity_state.py",
    "tests/test_continuity_updater.py",
    ".github/workflows/continuity-refresh.yml",
}


def run_git(args: list[str], cwd: Path) -> str:
    completed = subprocess.run(
        ["git", *args], cwd=cwd, check=True, capture_output=True, text=True
    )
    return completed.stdout.strip()


def is_material_path(path: str) -> bool:
    """Return True for repository paths whose main-branch change merits review."""
    normalized = path.replace("\\", "/")
    if normalized.startswith("./"):
        normalized = normalized[2:]
    if normalized.startswith("docs/continuity/"):
        return False
    # Project-owned continuity records are semantic state, not product/source changes.
    # Their semantic sync PR must not trigger a redundant machine-snapshot refresh.
    path_parts = normalized.split("/")
    if len(path_parts) >= 3 and path_parts[0] == "projects" and path_parts[2] == "continuity":
        return False
    if normalized in SELF_MANAGED_PATHS:
        return False
    return bool(normalized)


def get_changed_paths(repo_root: Path, previous_sha: str, current_sha: str) -> list[str]:
    if not previous_sha or not current_sha:
        raise ValueError("Both previous and current main SHAs are required.")
    output = run_git(
        ["diff", "--name-only", "--no-renames", previous_sha, current_sha, "--"],
        repo_root,
    )
    return sorted({line for line in output.splitlines() if line})


def get_commit_count(repo_root: Path, previous_sha: str, current_sha: str) -> int:
    output = run_git(["rev-list", "--count", f"{previous_sha}..{current_sha}"], repo_root)
    return int(output or "0")


def refresh_state_document(
    state: dict[str, Any],
    *,
    repository: str,
    event_name: str,
    previous_sha: str,
    current_sha: str,
    changed_paths: list[str],
    commit_count: int,
    observed_at_utc: str,
) -> dict[str, Any]:
    """Return a copy with machine_snapshot refreshed and all semantic fields intact."""
    if not isinstance(state, dict):
        raise ValueError("Continuity state root must be a YAML mapping.")
    if not isinstance(state.get("machine_snapshot"), dict):
        raise ValueError("CURRENT_STATE.yaml must contain a machine_snapshot mapping.")

    refreshed = copy.deepcopy(state)
    refreshed["machine_snapshot"] = {
        "updater_version": UPDATER_VERSION,
        "repository": repository,
        "last_observed_main_sha": current_sha,
        "last_observed_main_url": f"https://github.com/{repository}/commit/{current_sha}",
        "last_observed_at_utc": observed_at_utc,
        "event_name": event_name,
        "previous_main_sha": previous_sha,
        "commit_count_since_previous_snapshot": commit_count,
        "changed_path_count": len(changed_paths),
        "changed_paths": changed_paths[:MAX_CHANGED_PATHS],
        "changed_paths_truncated": len(changed_paths) > MAX_CHANGED_PATHS,
        "semantic_review_required": True,
        "semantic_review_status": "PENDING_AI_AND_OWNER_REVIEW",
        "review_note": (
            "Machine-observed Git metadata only. AI must inspect the changed sources; "
            "the Human Owner retains decision and acceptance authority. This updater "
            "does not change project facts, task status, decisions, baselines or acceptance."
        ),
    }
    return refreshed


def write_output_flag(changed: bool) -> None:
    output_path = os.environ.get("GITHUB_OUTPUT")
    if output_path:
        with open(output_path, "a", encoding="utf-8") as handle:
            handle.write(f"changed={'true' if changed else 'false'}\n")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--event-path", required=True)
    parser.add_argument("--event-name", required=True)
    parser.add_argument("--sha", required=True)
    parser.add_argument("--repository", required=True)
    parser.add_argument("--state-file", default="docs/continuity/CURRENT_STATE.yaml")
    args = parser.parse_args()

    repo_root = Path.cwd()
    state_path = repo_root / args.state_file
    if not state_path.is_file():
        raise SystemExit(f"ERROR: continuity state file not found: {args.state_file}")

    try:
        event = json.loads(Path(args.event_path).read_text(encoding="utf-8"))
        state = yaml.safe_load(state_path.read_text(encoding="utf-8"))
        if not isinstance(state, dict) or not isinstance(state.get("machine_snapshot"), dict):
            raise ValueError("CURRENT_STATE.yaml must contain a machine_snapshot mapping.")

        current_sha = args.sha
        previous_sha = state["machine_snapshot"].get("last_observed_main_sha")
        if not previous_sha:
            previous_sha = event.get("before") if isinstance(event, dict) else None
        if not previous_sha:
            raise ValueError("Cannot determine the previous observed main SHA safely.")

        all_changed_paths = get_changed_paths(repo_root, previous_sha, current_sha)
        material_paths = [path for path in all_changed_paths if is_material_path(path)]

        # A continuity-only commit must not refresh itself or create an update loop.
        if not material_paths:
            print("NO_CHANGE: no material repository paths changed since the last snapshot.")
            write_output_flag(False)
            return 0

        commit_count = get_commit_count(repo_root, previous_sha, current_sha)
        observed_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
        refreshed = refresh_state_document(
            state,
            repository=args.repository,
            event_name=args.event_name,
            previous_sha=previous_sha,
            current_sha=current_sha,
            changed_paths=material_paths,
            commit_count=commit_count,
            observed_at_utc=observed_at,
        )
        rendered = yaml.safe_dump(
            refreshed, sort_keys=False, allow_unicode=True, default_flow_style=False
        )
        state_path.write_text(rendered, encoding="utf-8", newline="\n")
        print(f"REFRESH_REQUIRED: {len(material_paths)} material path(s) across {commit_count} commit(s).")
        print(f"Observed main: {current_sha}")
        write_output_flag(True)
        return 0
    except (OSError, ValueError, subprocess.CalledProcessError, yaml.YAMLError) as exc:
        print(f"ERROR: continuity refresh failed safely: {exc}", file=sys.stderr)
        write_output_flag(False)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
