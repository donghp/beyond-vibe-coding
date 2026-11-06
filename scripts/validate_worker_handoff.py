#!/usr/bin/env python3
"""Read-only validator for BVC cross-executor worker handoff YAML records."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

import yaml
from jsonschema import Draft202012Validator, FormatChecker
from jsonschema.exceptions import SchemaError


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SCHEMA = REPOSITORY_ROOT / "docs" / "continuity" / "WORKER_HANDOFF.schema.json"


def load_yaml(path: Path) -> Any:
    """Load YAML without modifying the source file or repository."""
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def load_json(path: Path) -> dict[str, Any]:
    """Load a JSON Schema document."""
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError("JSON Schema root must be an object.")
    return value


def _path_text(path: Any) -> str:
    parts = [str(part) for part in path]
    return ".".join(parts) if parts else "<root>"


def validate_handoff(document: Any, schema: dict[str, Any]) -> list[str]:
    """Return schema and cross-field errors; never mutate document or Git state."""
    try:
        Draft202012Validator.check_schema(schema)
    except SchemaError as exc:
        return [f"SCHEMA ERROR: {_path_text(exc.absolute_path)}: {exc.message}"]

    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    errors = [
        f"{_path_text(error.absolute_path)}: {error.message}"
        for error in validator.iter_errors(document)
    ]
    if errors or not isinstance(document, dict):
        return sorted(errors)

    checkpoint = document.get("checkpoint", {})
    remote = checkpoint.get("remote_verification", {})
    writer = document.get("writer_control", {})
    status = document.get("status")

    if remote.get("branch") != checkpoint.get("branch"):
        errors.append("checkpoint.remote_verification.branch must match checkpoint.branch.")
    if remote.get("commit_sha") != checkpoint.get("commit_sha"):
        errors.append("checkpoint.remote_verification.commit_sha must match checkpoint.commit_sha.")

    if checkpoint.get("remote_verified") is True and remote.get("status") != "VERIFIED":
        errors.append("checkpoint.remote_verified requires remote_verification.status VERIFIED.")
    if remote.get("status") == "VERIFIED" and checkpoint.get("remote_verified") is not True:
        errors.append("remote_verification.status VERIFIED requires checkpoint.remote_verified true.")

    if status in {"READY_FOR_HANDOFF", "RECEIVER_ACCEPTED"}:
        if writer.get("sender_release_status") != "RELEASED":
            errors.append(f"{status} requires writer_control.sender_release_status RELEASED.")
        if checkpoint.get("remote_verified") is not True or remote.get("status") != "VERIFIED":
            errors.append(f"{status} requires a verified remote checkpoint.")
        if checkpoint.get("working_tree_status") != "CLEAN":
            errors.append(f"{status} requires checkpoint.working_tree_status CLEAN.")
        if checkpoint.get("uncommitted_work_status") != "NONE":
            errors.append(f"{status} requires checkpoint.uncommitted_work_status NONE.")

    if status == "READY_FOR_HANDOFF":
        if writer.get("active_writer") != "NONE":
            errors.append("READY_FOR_HANDOFF requires writer_control.active_writer NONE.")
        if writer.get("receiver_acceptance_status") != "NOT_ACCEPTED":
            errors.append("READY_FOR_HANDOFF must not already be receiver-accepted.")

    if status == "RECEIVER_ACCEPTED":
        if writer.get("active_writer") != "RECEIVER":
            errors.append("RECEIVER_ACCEPTED requires writer_control.active_writer RECEIVER.")
        if writer.get("receiver_acceptance_status") != "ACCEPTED":
            errors.append("RECEIVER_ACCEPTED requires receiver_acceptance_status ACCEPTED.")

    if writer.get("sender_release_status") == "RELEASED":
        if not writer.get("sender_released_at_utc") or not writer.get("sender_release_evidence"):
            errors.append("A RELEASED sender requires release timestamp and evidence.")
    if writer.get("receiver_acceptance_status") == "ACCEPTED":
        if not writer.get("receiver_accepted_at_utc") or not writer.get("receiver_acceptance_evidence"):
            errors.append("An ACCEPTED receiver requires acceptance timestamp and evidence.")

    next_action = document.get("next_action", {})
    task = document.get("task", {})
    if next_action.get("permitted") is True and task.get("contract_status") != "APPROVED":
        errors.append("A permitted next action requires an APPROVED Task Contract.")

    return sorted(errors)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--handoff", required=True, type=Path, help="Path to handoff YAML.")
    parser.add_argument(
        "--schema", type=Path, default=DEFAULT_SCHEMA,
        help="Path to handoff JSON Schema (defaults to the repository schema).",
    )
    args = parser.parse_args(argv)

    try:
        document = load_yaml(args.handoff)
        schema = load_json(args.schema)
        errors = validate_handoff(document, schema)
    except (OSError, UnicodeError, json.JSONDecodeError, yaml.YAMLError, ValueError) as exc:
        print(f"ERROR: could not load handoff/schema safely: {exc}", file=sys.stderr)
        return 2

    if errors:
        print(f"FAIL: {len(errors)} handoff validation error(s).")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"PASS: {args.handoff} conforms to {args.schema}.")
    print("NOTE: validation does not verify GitHub, workspace sync, permissions, or writer exclusivity.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
