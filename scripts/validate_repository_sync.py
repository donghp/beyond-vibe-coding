#!/usr/bin/env python3
"""Validate that a PR contains all companion records required by the BVC sync matrix."""
from __future__ import annotations

import argparse
import fnmatch
import subprocess
import sys
from pathlib import Path
from typing import Any

import yaml


def git_changed_paths(base_sha: str, head_sha: str, repo_root: Path) -> list[str]:
    if not base_sha or not head_sha or base_sha == head_sha:
        raise ValueError("Distinct base and head SHAs are required.")
    output = subprocess.run(
        ["git", "diff", "--name-only", "--no-renames", f"{base_sha}...{head_sha}", "--"],
        cwd=repo_root,
        check=True,
        capture_output=True,
        text=True,
    ).stdout
    return sorted({line.strip().replace("\\", "/") for line in output.splitlines() if line.strip()})


def validate_paths(changed_paths: list[str], matrix: dict[str, Any]) -> list[str]:
    if not isinstance(matrix, dict) or not isinstance(matrix.get("rules"), list):
        raise ValueError("Sync impact matrix must contain a rules list.")

    changed = set(changed_paths)
    errors: list[str] = []
    for rule in matrix["rules"]:
        if not isinstance(rule, dict):
            raise ValueError("Every sync rule must be a mapping.")
        rule_id = str(rule.get("id", "")).strip()
        patterns = rule.get("when_any", [])
        required = rule.get("require_all", [])
        if not rule_id or not isinstance(patterns, list) or not isinstance(required, list):
            raise ValueError("Every sync rule requires id, when_any list and require_all list.")

        triggered = any(
            fnmatch.fnmatchcase(path, pattern)
            for path in changed
            for pattern in patterns
        )
        if not triggered:
            continue

        missing = sorted(set(required) - changed)
        if missing:
            errors.append(
                f"{rule_id}: triggered by changed source path(s), but required companion "
                f"record(s) are missing from this PR: {', '.join(missing)}"
            )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-sha", required=True)
    parser.add_argument("--head-sha", required=True)
    parser.add_argument("--matrix", default="docs/continuity/SYNC_IMPACT_MATRIX.yaml")
    args = parser.parse_args()

    root = Path.cwd()
    try:
        matrix_path = root / args.matrix
        matrix = yaml.safe_load(matrix_path.read_text(encoding="utf-8"))
        changed = git_changed_paths(args.base_sha, args.head_sha, root)
        if not changed:
            print("PASS: no changed paths in the comparison range.")
            return 0

        errors = validate_paths(changed, matrix)
        print(f"Changed paths inspected: {len(changed)}")
        for path in changed:
            print(f"  - {path}")
        if errors:
            print("FAIL: synchronization package is incomplete.")
            for error in errors:
                print(f"  - {error}")
            return 1

        print(f"PASS: all triggered synchronization rules satisfied ({len(matrix['rules'])} rules available).")
        return 0
    except (OSError, ValueError, subprocess.CalledProcessError, yaml.YAMLError) as exc:
        print(f"ERROR: repository synchronization validation failed safely: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
