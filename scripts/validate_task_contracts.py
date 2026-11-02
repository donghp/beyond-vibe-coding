#!/usr/bin/env python3
"""Validate BVC Task Contract examples (schema + cross-field semantics).

This validator checks contract documents. It does not sandbox an executor or
prevent file writes; actual changed paths must be compared with the contract
by the runtime or CI wrapper that observes the working tree.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

import yaml
from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "specifications" / "v0.1" / "task-contract.schema.json"
EXAMPLES_DIR = ROOT / "specifications" / "v0.1" / "examples"
WRITE_ACTIONS = {
    "create", "modify", "delete", "change_dependencies", "change_lockfiles",
    "change_database_schema", "change_financial_formula", "change_authentication",
    "change_architecture", "deploy", "release",
}
HIGH_IMPACT_FACTORS = {
    "security", "identity_or_access", "personal_data", "financial_calculation",
    "database_migration", "production_system", "irreversible_change", "architecture_baseline",
}
CATEGORY_FLAGS = {
    "dependency": ("allow_dependency_changes", "change_dependencies"),
    "lockfile": ("allow_lockfile_changes", "change_lockfiles"),
    "database_schema": ("allow_database_schema_changes", "change_database_schema"),
    "financial_formula": ("allow_financial_formula_changes", "change_financial_formula"),
    "authentication": ("allow_authentication_changes", "change_authentication"),
    "architecture": ("allow_architecture_changes", "change_architecture"),
}
REQUIRED_REPORT_ITEMS = {
    "task_and_run_identifiers", "actual_file_inventory", "created_modified_deleted_breakdown",
    "scope_integrity_result", "change_budget_result", "verification_results",
    "evidence_references", "unresolved_findings", "limitations", "next_action",
}


def load_yaml(path: Path) -> dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"{path}: YAML document must contain a mapping at the root")
    return data


def _valid_repo_path(path: str, *, allow_prefix: bool = False) -> bool:
    if not isinstance(path, str) or not path or path.startswith("/") or "\\" in path:
        return False
    if re.match(r"^[A-Za-z]:", path):
        return False
    parts = path.rstrip("/").split("/")
    if any(part in {"", ".", ".."} for part in parts):
        return False
    if any(char in path for char in "*?[]{}"):
        return False
    if not allow_prefix and path.endswith("/"):
        return False
    if allow_prefix and not path.endswith("/"):
        return False
    return True


def _iter_allowed(scope: dict[str, Any]) -> dict[str, set[str]]:
    allowed = scope.get("allowed_changes", {})
    return {
        "CREATE": set(allowed.get("create", [])),
        "MODIFY": set(allowed.get("modify", [])),
        "DELETE": set(allowed.get("delete", [])),
    }


def validate_semantics(contract: dict[str, Any]) -> tuple[list[str], list[str]]:
    """Return (errors, warnings) beyond JSON Schema structural validation."""
    errors: list[str] = []
    warnings: list[str] = []
    scope = contract.get("scope", {})
    budget = contract.get("change_budget", {})
    authority = contract.get("authority", {})
    approval = authority.get("human_approval", {})
    baseline = contract.get("project", {}).get("baseline", {})
    allowed = _iter_allowed(scope)
    all_allowed = set().union(*allowed.values())
    forbidden = set(scope.get("forbidden_paths", []))
    prefixes = scope.get("forbidden_path_prefixes", [])

    # Exact paths are deliberately used for write permissions in v0.1.
    for operation, paths in allowed.items():
        for path in paths:
            if not _valid_repo_path(path):
                errors.append(f"allowed {operation} path is not a safe exact repository-relative path: {path!r}")
    for path in forbidden:
        if not _valid_repo_path(path):
            errors.append(f"forbidden path is not a safe exact repository-relative path: {path!r}")
    for prefix in prefixes:
        if not _valid_repo_path(prefix, allow_prefix=True):
            errors.append(f"forbidden path prefix must be a safe repository-relative directory ending in '/': {prefix!r}")

    # The same path must not be granted more than one operation in one contract.
    seen: dict[str, str] = {}
    for operation, paths in allowed.items():
        for path in paths:
            if path in seen:
                errors.append(f"path {path!r} is authorized for both {seen[path]} and {operation}; use one operation per path")
            seen[path] = operation

    # Do not allow an explicitly granted path to collide with a prohibition.
    for path in all_allowed:
        if path in forbidden:
            errors.append(f"path {path!r} is both allowed and forbidden")
        for prefix in prefixes:
            if path.startswith(prefix):
                errors.append(f"allowed path {path!r} falls under forbidden prefix {prefix!r}")

    # READ_ONLY and WRITE semantics.
    mode = scope.get("mode")
    if mode == "READ_ONLY":
        if all_allowed:
            errors.append("READ_ONLY contract must have empty create/modify/delete lists")
        for key in ("max_changed_files", "max_created_files", "max_modified_files", "max_deleted_files", "max_total_diff_lines", "max_binary_files"):
            if budget.get(key) != 0:
                errors.append(f"READ_ONLY contract requires change_budget.{key}=0")
        if WRITE_ACTIONS.intersection(authority.get("permitted_actions", [])):
            errors.append("READ_ONLY contract must not grant write, deployment, release, or protected-change actions")
    elif mode == "WRITE":
        if not all_allowed:
            errors.append("WRITE contract must authorize at least one exact path under create, modify, or delete")
        if budget.get("max_changed_files", 0) < 1:
            errors.append("WRITE contract requires change_budget.max_changed_files >= 1")
        recovery = baseline.get("recovery_point", {})
        if recovery.get("verified") is not True:
            errors.append("WRITE contract requires a verified recovery_point before execution")
        if contract.get("continuity", {}).get("checkpoint_required") is not True:
            errors.append("WRITE contract requires continuity.checkpoint_required=true")

    if baseline.get("working_tree_status") == "DIRTY" and not baseline.get("pre_existing_changes_ref"):
        errors.append("DIRTY baseline requires project.baseline.pre_existing_changes_ref")

    # The budget must not authorize more paths than the contract actually scopes.
    category_caps = {
        "CREATE": ("max_created_files", "create"),
        "MODIFY": ("max_modified_files", "modify"),
        "DELETE": ("max_deleted_files", "delete"),
    }
    for operation, (budget_key, scope_key) in category_caps.items():
        count = len(allowed[operation])
        cap = budget.get(budget_key, 0)
        if cap > count:
            errors.append(f"change_budget.{budget_key} ({cap}) exceeds the number of explicitly allowed {scope_key} paths ({count})")
    if budget.get("max_changed_files", 0) > len(all_allowed):
        errors.append("change_budget.max_changed_files exceeds the total number of explicitly allowed paths")

    # Operation permissions must agree with the scope contract.
    actions = set(authority.get("permitted_actions", []))
    for operation, action in (("CREATE", "create"), ("MODIFY", "modify"), ("DELETE", "delete")):
        if allowed[operation] and action not in actions:
            errors.append(f"scope allows {operation} paths but authority.permitted_actions does not include {action!r}")
    if not allowed["CREATE"] and "create" in actions:
        warnings.append("authority grants create capability but no CREATE path is scoped; the permission has no effect in this contract")
    if not allowed["MODIFY"] and "modify" in actions:
        warnings.append("authority grants modify capability but no MODIFY path is scoped; the permission has no effect in this contract")
    if not allowed["DELETE"] and "delete" in actions:
        warnings.append("authority grants delete capability but no DELETE path is scoped; the permission has no effect in this contract")

    sensitive_flags = {
        "allow_dependency_changes": "change_dependencies",
        "allow_lockfile_changes": "change_lockfiles",
        "allow_database_schema_changes": "change_database_schema",
        "allow_financial_formula_changes": "change_financial_formula",
        "allow_authentication_changes": "change_authentication",
        "allow_architecture_changes": "change_architecture",
    }
    for flag, required_action in sensitive_flags.items():
        if budget.get(flag) is True and required_action not in actions:
            errors.append(f"change_budget.{flag}=true requires authority.permitted_actions to include {required_action!r}")

    # High-impact changes require explicit human approval in this draft.
    impact_factors = set(contract.get("risk", {}).get("impact_factors", []))
    high_impact = bool(impact_factors.intersection(HIGH_IMPACT_FACTORS))
    if high_impact and approval.get("required") is not True:
        errors.append("high-impact risk factors require authority.human_approval.required=true")
    if budget.get("allow_database_schema_changes") or budget.get("allow_financial_formula_changes") or budget.get("allow_authentication_changes") or budget.get("allow_architecture_changes"):
        if approval.get("required") is not True:
            errors.append("database, financial, authentication, or architecture changes require explicit human approval")
    if approval.get("required") is True:
        if not approval.get("approver_role"):
            errors.append("required human approval must identify approver_role")
        if approval.get("status") != "APPROVED":
            warnings.append("contract is not execution-ready: required human approval is not APPROVED")
    elif approval.get("status") not in (None, "NOT_REQUIRED"):
        errors.append("when human_approval.required=false, human_approval.status must be NOT_REQUIRED")

    if contract.get("status") != "APPROVED":
        warnings.append(f"contract status is {contract.get('status')!r}; it is not execution-ready")

    # Ensure acceptance criteria references in verification are real.
    criterion_ids = {item.get("id") for item in contract.get("acceptance_criteria", [])}
    for check in contract.get("verification", {}).get("checks", []):
        for reference in check.get("acceptance_criteria_refs", []):
            if reference not in criterion_ids:
                errors.append(f"verification check {check.get('id')!r} references unknown acceptance criterion {reference!r}")
    for criterion in contract.get("acceptance_criteria", []):
        required_level = criterion.get("required_evidence_level", 1)
        matching = [
            check for check in contract.get("verification", {}).get("checks", [])
            if criterion.get("id") in check.get("acceptance_criteria_refs", []) and check.get("required") is True
        ]
        if not matching:
            errors.append(f"acceptance criterion {criterion.get('id')!r} has no required verification check")
        elif max(check.get("evidence_level", 0) for check in matching) < required_level:
            errors.append(f"acceptance criterion {criterion.get('id')!r} requires evidence level {required_level}, but linked checks do not provide it")

    # Expected output paths must be in the authorized file scope.
    for output in contract.get("expected_outputs", []):
        output_path = output.get("path")
        if output_path and output_path not in all_allowed:
            errors.append(f"expected output path {output_path!r} is not present in the authorized create/modify/delete scope")

    required_items = set(contract.get("reporting", {}).get("required_items", []))
    missing_report_items = REQUIRED_REPORT_ITEMS - required_items
    if missing_report_items:
        errors.append("reporting.required_items is missing mandatory items: " + ", ".join(sorted(missing_report_items)))

    return errors, warnings


def validate_changed_files(contract: dict[str, Any], changed_files: list[dict[str, Any]]) -> list[str]:
    """Compare a VCS-derived diff inventory with the contract's exact scope and budget.

    Each item must contain:
      path: repository-relative path
      operation: CREATE | MODIFY | DELETE
      diff_lines: additions + deletions (excluding diff headers); zero for binary files
      is_binary: bool
      categories: optional repository-classifier labels from CATEGORY_FLAGS

    This is a post-execution guard. A runtime should also enforce least privilege
    during execution; post-hoc diff validation cannot undo an unauthorized write.
    """
    errors: list[str] = []
    allowed = _iter_allowed(contract.get("scope", {}))
    scope = contract.get("scope", {})
    budget = contract.get("change_budget", {})
    actions = set(contract.get("authority", {}).get("permitted_actions", []))
    counts = {"CREATE": 0, "MODIFY": 0, "DELETE": 0}
    seen_paths: set[str] = set()
    total_diff_lines = 0
    binary_files = 0

    for item in changed_files:
        if not isinstance(item, dict):
            errors.append(f"changed-file inventory item must be an object: {item!r}")
            continue
        path = item.get("path")
        operation = str(item.get("operation", "")).upper()
        if operation not in allowed:
            errors.append(f"unknown changed-file operation {operation!r} for {path!r}")
            continue
        if not _valid_repo_path(path):
            errors.append(f"observed changed path is unsafe or not repository-relative: {path!r}")
            continue
        if path in seen_paths:
            errors.append(f"duplicate observed changed path: {path!r}; report one final operation per path")
            continue
        seen_paths.add(path)

        if path not in allowed[operation]:
            errors.append(f"BLOCKED_SCOPE_EXPANSION: observed {operation} of {path!r} is not authorized")
        if path in set(scope.get("forbidden_paths", [])) or any(path.startswith(prefix) for prefix in scope.get("forbidden_path_prefixes", [])):
            errors.append(f"PROTECTED_PATH_VIOLATION: observed change to forbidden resource {path!r}")

        diff_lines = item.get("diff_lines")
        is_binary = item.get("is_binary")
        if not isinstance(diff_lines, int) or isinstance(diff_lines, bool) or diff_lines < 0:
            errors.append(f"observed change {path!r} must provide a non-negative integer diff_lines")
            diff_lines = 0
        if not isinstance(is_binary, bool):
            errors.append(f"observed change {path!r} must provide boolean is_binary")
            is_binary = False
        if is_binary:
            binary_files += 1
            if diff_lines != 0:
                errors.append(f"binary change {path!r} must report diff_lines=0")
        total_diff_lines += diff_lines

        categories = item.get("categories", [])
        if not isinstance(categories, list):
            errors.append(f"observed change {path!r} categories must be a list")
            categories = []
        for category in categories:
            if category not in CATEGORY_FLAGS:
                errors.append(f"observed change {path!r} has unknown sensitive category {category!r}")
                continue
            flag, required_action = CATEGORY_FLAGS[category]
            if budget.get(flag) is not True:
                errors.append(f"PROTECTED_CATEGORY_VIOLATION: {category} change at {path!r} is not authorized by change_budget.{flag}")
            if required_action not in actions:
                errors.append(f"PROTECTED_CATEGORY_VIOLATION: {category} change at {path!r} requires authority.permitted_actions to include {required_action!r}")

        counts[operation] += 1

    total = sum(counts.values())
    if total > budget.get("max_changed_files", 0):
        errors.append(f"CHANGE_BUDGET_EXCEEDED: {total} files changed; budget allows {budget.get('max_changed_files', 0)}")
    for operation, key in (("CREATE", "max_created_files"), ("MODIFY", "max_modified_files"), ("DELETE", "max_deleted_files")):
        if counts[operation] > budget.get(key, 0):
            errors.append(f"CHANGE_BUDGET_EXCEEDED: {counts[operation]} {operation} files; budget {key}={budget.get(key, 0)}")
    if total_diff_lines > budget.get("max_total_diff_lines", 0):
        errors.append(f"CHANGE_BUDGET_EXCEEDED: {total_diff_lines} diff lines; budget max_total_diff_lines={budget.get('max_total_diff_lines', 0)}")
    if binary_files > budget.get("max_binary_files", 0):
        errors.append(f"CHANGE_BUDGET_EXCEEDED: {binary_files} binary files; budget max_binary_files={budget.get('max_binary_files', 0)}")
    return errors


def validate_one(path: Path, schema: dict[str, Any]) -> tuple[list[str], list[str], dict[str, Any] | None]:
    try:
        contract = load_yaml(path)
    except Exception as exc:  # noqa: BLE001 - CLI should report malformed source documents.
        return [str(exc)], [], None
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    schema_errors = sorted(validator.iter_errors(contract), key=lambda err: list(err.absolute_path))
    errors = [f"schema: {'/'.join(map(str, err.absolute_path)) or '<root>'}: {err.message}" for err in schema_errors]
    if errors:
        return errors, [], contract
    semantic_errors, warnings = validate_semantics(contract)
    return semantic_errors, warnings, contract


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate BVC Task Contract YAML examples.")
    parser.add_argument("paths", nargs="*", help="YAML files or directories; defaults to specifications/v0.1/examples")
    parser.add_argument("--changed-files-json", help="Optional VCS diff inventory JSON; requires exactly one contract YAML path")
    args = parser.parse_args()
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    Draft202012Validator.check_schema(schema)
    targets: list[Path] = []
    for raw in args.paths or [str(EXAMPLES_DIR)]:
        path = Path(raw)
        if path.is_dir():
            targets.extend(sorted(path.rglob("*.yaml")))
            targets.extend(sorted(path.rglob("*.yml")))
        elif path.is_file():
            targets.append(path)
        else:
            print(f"ERROR: path not found: {path}", file=sys.stderr)
            return 2
    if not targets:
        print("No YAML contracts found.", file=sys.stderr)
        return 2
    if args.changed_files_json and len(targets) != 1:
        print("--changed-files-json requires exactly one contract YAML file.", file=sys.stderr)
        return 2
    changed_inventory: list[dict[str, Any]] | None = None
    if args.changed_files_json:
        try:
            raw_inventory = json.loads(Path(args.changed_files_json).read_text(encoding="utf-8"))
            if not isinstance(raw_inventory, list):
                raise ValueError("diff inventory root must be a JSON array")
            changed_inventory = raw_inventory
        except Exception as exc:  # noqa: BLE001 - report invalid user-supplied inventory.
            print(f"ERROR: invalid changed-file inventory: {exc}", file=sys.stderr)
            return 2
    failed = 0
    for path in targets:
        errors, warnings, contract = validate_one(path, schema)
        if errors:
            failed += 1
            print(f"FAIL {path}")
            for error in errors:
                print(f"  - {error}")
        else:
            print(f"PASS {path} ({contract.get('contract_id')}; status={contract.get('status')})")
            if changed_inventory is not None and contract is not None:
                diff_errors = validate_changed_files(contract, changed_inventory)
                if diff_errors:
                    failed += 1
                    print("  DIFF VALIDATION: FAIL")
                    for error in diff_errors:
                        print(f"  - {error}")
                else:
                    print("  DIFF VALIDATION: PASS")
        for warning in warnings:
            print(f"  WARNING: {warning}")
    print(f"\nValidated {len(targets)} contract example(s); failures: {failed}.")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
