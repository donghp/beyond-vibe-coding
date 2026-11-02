
#!/usr/bin/env python3
"""Validate the BVC v0.1 Core Specification examples and their cross-record links.

This validates records supplied to it. It does not execute AI tasks, collect Git diffs,
authenticate approvers, prove external references exist, or enforce filesystem access.
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

if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

SPEC = ROOT / "specifications" / "v0.1"
EXAMPLES = SPEC / "examples"

TASK_SCHEMA = SPEC / "task-contract.schema.json"
TASK_EXAMPLE = EXAMPLES / "scoped-component-change.yaml"

SPECS = {
    "context-manifest": (
        SPEC / "context-manifest.schema.json",
        SPEC / "core-examples" / "context-manifest.example.yaml",
    ),
    "project-state": (
        SPEC / "project-state.schema.json",
        SPEC / "core-examples" / "project-state.example.yaml",
    ),
    "change-record": (
        SPEC / "change-record.schema.json",
        SPEC / "core-examples" / "change-record.example.yaml",
    ),
    "verification-evidence": (
        SPEC / "verification-evidence.schema.json",
        SPEC / "core-examples" / "verification-evidence.example.yaml",
    ),
}

CATEGORY_RULES = {
    "dependency": ("allow_dependency_changes", "change_dependencies"),
    "lockfile": ("allow_lockfile_changes", "change_lockfiles"),
    "database_schema": (
        "allow_database_schema_changes",
        "change_database_schema",
    ),
    "financial_formula": (
        "allow_financial_formula_changes",
        "change_financial_formula",
    ),
    "authentication": (
        "allow_authentication_changes",
        "change_authentication",
    ),
    "architecture": (
        "allow_architecture_changes",
        "change_architecture",
    ),
}


# ============================================================
# 1. Document loading and JSON Schema validation
# ============================================================

def load_document(path: Path) -> dict[str, Any]:
    """Load a JSON or YAML document and require an object at its root."""

    raw = path.read_text(encoding="utf-8")

    if path.suffix.lower() == ".json":
        data = json.loads(raw)
    else:
        data = yaml.safe_load(raw)

    if not isinstance(data, dict):
        raise ValueError(
            f"{path}: root must be an object/mapping"
        )

    return data


def validate_schema(
    path: Path,
    schema: dict[str, Any],
) -> list[str]:
    """Validate one JSON/YAML document against a JSON Schema."""

    validator = Draft202012Validator(
        schema,
        format_checker=FormatChecker(),
    )

    errors = sorted(
        validator.iter_errors(load_document(path)),
        key=lambda error: (
            list(error.absolute_path),
            error.message,
        ),
    )

    return [
        f"{path.name}: "
        f"{'/'.join(map(str, error.absolute_path)) or '<root>'}: "
        f"{error.message}"
        for error in errors
    ]


def safe_repo_path(path: str) -> bool:
    """Reject absolute paths, traversal paths, and wildcard paths."""

    if (
        not isinstance(path, str)
        or not path
        or path.startswith("/")
        or "\\" in path
        or re.match(r"^[A-Za-z]:", path)
    ):
        return False

    parts = path.split("/")

    if any(part in ("", ".", "..") for part in parts):
        return False

    if any(char in path for char in "*?[]{}"):
        return False

    return True


# ============================================================
# 2. Context Manifest semantic validation
# ============================================================

def validate_context_semantics(
    manifest: dict[str, Any],
    contract: dict[str, Any],
) -> list[str]:

    errors = []
    sources = manifest.get("sources", [])
    by_id = {}

    for source in sources:
        source_id = source.get("source_id")

        if source_id in by_id:
            errors.append(
                f"duplicate context source_id: {source_id}"
            )

        by_id[source_id] = source

    task_ref = manifest.get("task_ref", {})
    task = contract.get("task", {})
    project = contract.get("project", {})

    for key, expected in (
        ("contract_id", contract.get("contract_id")),
        ("contract_version", contract.get("contract_version")),
        ("revision", contract.get("revision")),
        ("task_id", task.get("id")),
    ):
        if task_ref.get(key) != expected:
            errors.append(
                f"context manifest task_ref.{key} "
                "does not match Task Contract"
            )

    if manifest.get("project_id") != project.get("project_id"):
        errors.append(
            "context manifest project_id does not match "
            "Task Contract project.project_id"
        )

    if (
        manifest.get("status") == "READY"
        and contract.get("status") != "APPROVED"
    ):
        errors.append(
            "READY Context Manifest requires an APPROVED Task Contract"
        )

    if (
        manifest.get("baseline", {}).get("source_commit")
        != project.get("baseline", {}).get("source_commit")
    ):
        errors.append(
            "context manifest baseline does not match "
            "Task Contract source_commit"
        )

    for required_context in contract.get("required_context", []):

        matches = [
            source
            for source in sources
            if source.get("reference")
            == required_context.get("reference")
        ]

        if required_context.get("required") and not matches:
            errors.append(
                "required Task Contract context source is absent: "
                f"{required_context.get('reference')}"
            )

        for source in matches:

            if source.get("selection_status") != "INCLUDED":
                errors.append(
                    "required context source is not included: "
                    f"{required_context.get('reference')}"
                )

            if source.get("authority") != required_context.get("authority"):
                errors.append(
                    "context authority mismatch for "
                    f"{required_context.get('reference')}"
                )

    policy = manifest.get("selection_policy", {})
    max_sources = policy.get("max_source_count")

    if (
        max_sources is not None
        and len(sources) > max_sources
    ):
        errors.append(
            f"Context Manifest has {len(sources)} sources; "
            f"max_source_count is {max_sources}"
        )

    if (
        manifest.get("status") == "READY"
        and not any(
            source.get("selection_status") == "INCLUDED"
            for source in sources
        )
    ):
        errors.append(
            "READY Context Manifest requires at least one included source"
        )

    for source in sources:

        freshness = source.get("freshness", {}).get("status")

        if (
            source.get("required")
            and source.get("selection_status") != "INCLUDED"
        ):
            errors.append(
                f"required source is excluded: {source.get('source_id')}"
            )

        if (
            manifest.get("status") == "READY"
            and source.get("required")
            and policy.get("freshness_strategy") == "REQUIRE_CURRENT"
            and freshness in ("STALE", "UNKNOWN")
        ):
            errors.append(
                "READY manifest includes required source with "
                f"{freshness} freshness: {source.get('source_id')}"
            )

        if (
            source.get("authority") == "UNTRUSTED"
            and source.get("trust_level") == "TRUSTED"
        ):
            errors.append(
                "UNTRUSTED authority cannot be marked TRUSTED: "
                f"{source.get('source_id')}"
            )

    source_ids = set(by_id)

    for conflict in manifest.get("conflicts", []):

        if not set(conflict.get("source_ids", [])).issubset(source_ids):
            errors.append(
                f"conflict {conflict.get('conflict_id')} "
                "references unknown source_id"
            )

        if (
            manifest.get("status") == "READY"
            and policy.get("conflict_strategy")
            == "STOP_ON_MATERIAL_CONFLICT"
            and conflict.get("severity") in ("MATERIAL", "CRITICAL")
            and conflict.get("resolution_status") == "UNRESOLVED"
        ):
            errors.append(
                f"READY manifest has unresolved "
                f"{conflict.get('severity')} conflict: "
                f"{conflict.get('conflict_id')}"
            )

    return errors


# ============================================================
# 3. Project State semantic validation
# ============================================================

def validate_project_state_semantics(
    state: dict[str, Any],
    contract: dict[str, Any],
) -> list[str]:

    errors = []

    project = contract.get("project", {})

    if state.get("project_id") != project.get("project_id"):
        errors.append(
            "Project State project_id does not match Task Contract"
        )

    if (
        state.get("repository", {}).get("url")
        != project.get("repository", {}).get("url")
    ):
        errors.append(
            "Project State repository URL does not match Task Contract"
        )

    if (
        state.get("baseline", {}).get("source_commit")
        != project.get("baseline", {}).get("source_commit")
    ):
        errors.append(
            "Project State baseline does not match "
            "Task Contract source_commit"
        )

    collections = [
        ("facts", "fact_id"),
        ("decisions", "decision_id"),
        ("active_tasks", "task_id"),
        ("blocked_items", "issue_id"),
        ("open_risks", "risk_id"),
        ("open_issues", "issue_id"),
        ("next_actions", "action_id"),
    ]

    for key, id_key in collections:

        ids = [
            item.get(id_key)
            for item in state.get(key, [])
        ]

        if len(ids) != len(set(ids)):
            errors.append(
                f"Project State contains duplicate {id_key} in {key}"
            )

    for fact in state.get("facts", []):

        if (
            fact.get("classification") == "VERIFIED_FACT"
            and not fact.get("source_refs")
        ):
            errors.append(
                f"verified fact {fact.get('fact_id')} "
                "must cite at least one source"
            )

        if (
            fact.get("classification") == "VERIFIED_FACT"
            and not fact.get("verified_at")
        ):
            errors.append(
                f"verified fact {fact.get('fact_id')} "
                "must include verified_at"
            )

    for decision in state.get("decisions", []):

        if (
            decision.get("status") == "ACCEPTED"
            and not all(
                decision.get(key)
                for key in (
                    "decided_by",
                    "decided_at",
                    "authority_reference",
                )
            )
        ):
            errors.append(
                f"accepted decision {decision.get('decision_id')} "
                "requires decided_by, decided_at, "
                "and authority_reference"
            )

    baseline = state.get("baseline", {})

    if (
        baseline.get("working_tree_status") == "DIRTY"
        and not baseline.get("pre_existing_changes_ref")
    ):
        errors.append(
            "DIRTY Project State baseline requires "
            "pre_existing_changes_ref"
        )

    recovery = state.get("recovery", {})

    if (
        recovery.get("verified") is True
        and recovery.get("source_commit")
        != baseline.get("source_commit")
    ):
        errors.append(
            "verified recovery source_commit must match "
            "Project State baseline"
        )

    return errors


# ============================================================
# 4. Change Record semantic validation
# ============================================================

def validate_change_semantics(
    record: dict[str, Any],
    contract: dict[str, Any],
) -> list[str]:
    """Validate a Change Record while keeping scope and budget outcomes independent.

    Scope errors concern authorization and permitted paths.
    Budget errors concern measured change counts and configured limits.
    Integrity errors concern whether the record can be reliably linked to its
    Task Contract and baseline.

    A scope-only failure must not invalidate a budget PASS.
    A budget-only failure must not invalidate a scope PASS.
    Shared record-integrity failures prevent both outcomes from being PASS.
    """

    scope_errors: list[str] = []
    budget_errors: list[str] = []
    integrity_errors: list[str] = []

    scope = contract.get("scope", {})
    changes = record.get("changes", [])
    budget = contract.get("change_budget", {})

    actions = set(
        contract.get("authority", {}).get("permitted_actions", [])
    )

    allowed = {
        "CREATE": set(
            scope.get("allowed_changes", {}).get("create", [])
        ),
        "MODIFY": set(
            scope.get("allowed_changes", {}).get("modify", [])
        ),
        "DELETE": set(
            scope.get("allowed_changes", {}).get("delete", [])
        ),
    }

    seen: set[str] = set()

    counts = {
        "CREATE": 0,
        "MODIFY": 0,
        "DELETE": 0,
    }

    additions = 0
    deletions = 0
    binary_files = 0

    prefixes = scope.get("forbidden_path_prefixes", [])
    forbidden = set(scope.get("forbidden_paths", []))

    # --------------------------------------------------------
    # 4.1. Inspect every changed file
    # --------------------------------------------------------

    for item in changes:

        path = item.get("path")
        operation = item.get("operation")

        is_binary = item.get("is_binary", False)
        item_additions = item.get("additions", 0)
        item_deletions = item.get("deletions", 0)

        # Scope Integrity: path safety.
        if not safe_repo_path(path):
            scope_errors.append(
                f"unsafe repository-relative path: {path!r}"
            )

        # Record integrity: the same path must not be counted twice.
        if path in seen:
            integrity_errors.append(
                f"duplicate changed path: {path}"
            )

        seen.add(path)

        # Scope Integrity: only explicitly authorized operations are allowed.
        if (
            operation not in allowed
            or path not in allowed.get(operation, set())
        ):
            scope_errors.append(
                f"BLOCKED_SCOPE_EXPANSION: "
                f"{operation} {path} is not authorized"
            )

        # Scope Integrity: protected paths cannot be modified.
        if (
            path in forbidden
            or any(path.startswith(prefix) for prefix in prefixes)
        ):
            scope_errors.append(
                f"PROTECTED_PATH_VIOLATION: {path}"
            )

        # Scope / Governance: sensitive categories require explicit authority.
        for category in item.get("categories", []):

            rule = CATEGORY_RULES.get(category)

            if not rule:
                scope_errors.append(
                    f"unknown sensitive category: {category}"
                )
                continue

            flag, required_action = rule

            if (
                budget.get(flag) is not True
                or required_action not in actions
            ):
                scope_errors.append(
                    f"PROTECTED_CATEGORY_VIOLATION: "
                    f"{category} at {path}"
                )

        if operation in counts:
            counts[operation] += 1

        additions += item_additions
        deletions += item_deletions
        binary_files += int(is_binary)

        # Change Budget: binary files cannot contain text diff lines.
        if (
            is_binary
            and (
                item_additions != 0
                or item_deletions != 0
            )
        ):
            budget_errors.append(
                f"binary change {path!r} "
                "must report zero additions and deletions"
            )

    # --------------------------------------------------------
    # 4.2. Calculate the actual inventory totals
    # --------------------------------------------------------

    expected_totals = {
        "changed_files": len(changes),
        "created_files": counts["CREATE"],
        "modified_files": counts["MODIFY"],
        "deleted_files": counts["DELETE"],
        "additions": additions,
        "deletions": deletions,
        "diff_lines": additions + deletions,
        "binary_files": binary_files,
    }

    totals = record.get("totals", {})

    for key, expected_value in expected_totals.items():

        actual_value = totals.get(key)

        if actual_value != expected_value:
            budget_errors.append(
                f"totals.{key} is {actual_value!r}; "
                f"calculated value is {expected_value}"
            )

    # --------------------------------------------------------
    # 4.3. Check Change Budget limits
    # --------------------------------------------------------

    budget_caps = {
        "changed_files": budget.get("max_changed_files", 0),
        "created_files": budget.get("max_created_files", 0),
        "modified_files": budget.get("max_modified_files", 0),
        "deleted_files": budget.get("max_deleted_files", 0),
        "diff_lines": budget.get("max_total_diff_lines", 0),
        "binary_files": budget.get("max_binary_files", 0),
    }

    for key, cap in budget_caps.items():

        if expected_totals[key] > cap:
            budget_errors.append(
                f"CHANGE_BUDGET_EXCEEDED: "
                f"{key}={expected_totals[key]} exceeds {cap}"
            )

    # --------------------------------------------------------
    # 4.4. Validate record identity and baseline linkage
    # --------------------------------------------------------

    # These are shared prerequisites for authoritative results.
    # A broken reference cannot support either PASS result.

    if (
        record.get("task_ref", {}).get("task_id")
        != contract.get("task", {}).get("id")
    ):
        integrity_errors.append(
            "Change Record task_id does not match Task Contract"
        )

    contract_ref = record.get("contract_ref", {})

    for key, expected_value in (
        ("contract_id", contract.get("contract_id")),
        ("contract_version", contract.get("contract_version")),
        ("revision", contract.get("revision")),
    ):
        if contract_ref.get(key) != expected_value:
            integrity_errors.append(
                f"Change Record contract_ref.{key} "
                "does not match Task Contract"
            )

    if (
        record.get("project_id")
        != contract.get("project", {}).get("project_id")
    ):
        integrity_errors.append(
            "Change Record project_id does not match Task Contract"
        )

    if (
        record.get("baseline", {}).get("source_commit")
        != contract.get("project", {}).get(
            "baseline", {}
        ).get("source_commit")
    ):
        integrity_errors.append(
            "Change Record source_commit does not match "
            "Task Contract baseline"
        )

    record_baseline = record.get("baseline", {})

    if (
        record_baseline.get("working_tree_status") == "DIRTY"
        and not record_baseline.get("pre_existing_changes_ref")
    ):
        integrity_errors.append(
            "DIRTY Change Record baseline requires "
            "pre_existing_changes_ref"
        )

    if (
        record.get("record_status") == "FINAL"
        and contract.get("status") != "APPROVED"
    ):
        integrity_errors.append(
            "FINAL Change Record requires an "
            "APPROVED Task Contract reference"
        )

    if (
        changes
        and record.get("record_status") == "FINAL"
        and not record_baseline.get("target_commit")
    ):
        integrity_errors.append(
            "FINAL Change Record with changes requires target_commit"
        )

    # An untrusted collector cannot establish Scope Integrity PASS.
    if (
        record.get("collector", {}).get("trust_level") != "TRUSTED"
        and record.get("scope_integrity") == "PASS"
    ):
        scope_errors.append(
            "unverified collector cannot support scope_integrity PASS"
        )

    # --------------------------------------------------------
    # 4.5. Evaluate the three independent failure domains
    # --------------------------------------------------------

    errors = (
        scope_errors
        + budget_errors
        + integrity_errors
    )

    # Scope Integrity is evaluated only against scope failures.
    if (
        scope_errors
        and record.get("scope_integrity") == "PASS"
    ):
        errors.append(
            "scope_integrity cannot be PASS when "
            "scope-integrity errors exist"
        )

    # Change Budget is evaluated only against budget failures.
    if (
        budget_errors
        and record.get("change_budget_result") == "PASS"
    ):
        errors.append(
            "change_budget_result cannot be PASS when "
            "change-budget errors exist"
        )

    # Shared record-integrity errors invalidate both PASS results.
    if integrity_errors:

        if record.get("scope_integrity") == "PASS":
            errors.append(
                "scope_integrity cannot be PASS when "
                "Change Record integrity errors exist"
            )

        if record.get("change_budget_result") == "PASS":
            errors.append(
                "change_budget_result cannot be PASS when "
                "Change Record integrity errors exist"
            )

    return errors


# ============================================================
# 5. Verification Evidence semantic validation
# ============================================================

def validate_evidence_semantics(
    evidence: dict[str, Any],
    contract: dict[str, Any],
    change_record: dict[str, Any],
) -> list[str]:

    errors = []

    if (
        evidence.get("project_id")
        != contract.get("project", {}).get("project_id")
    ):
        errors.append(
            "Verification Evidence project_id does not match Task Contract"
        )

    if (
        evidence.get("record_status") == "FINAL"
        and contract.get("status") != "APPROVED"
    ):
        errors.append(
            "FINAL Verification Evidence requires an "
            "APPROVED Task Contract reference"
        )

    if (
        evidence.get("task_ref", {}).get("task_id")
        != contract.get("task", {}).get("id")
    ):
        errors.append(
            "Verification Evidence task_id does not match Task Contract"
        )

    contract_ref = evidence.get("contract_ref", {})

    for key, expected_value in (
        ("contract_id", contract.get("contract_id")),
        ("contract_version", contract.get("contract_version")),
        ("revision", contract.get("revision")),
    ):
        if contract_ref.get(key) != expected_value:
            errors.append(
                f"Verification Evidence contract_ref.{key} "
                "does not match Task Contract"
            )

    evidence_change_ref = evidence.get("change_record_ref", {})

    if evidence_change_ref.get("record_id") != change_record.get("record_id"):
        errors.append(
            "Verification Evidence references a different Change Record"
        )

    if (
        evidence_change_ref.get("scope_integrity")
        != change_record.get("scope_integrity")
    ):
        errors.append(
            "Verification Evidence scope_integrity reference is inconsistent"
        )

    if (
        evidence_change_ref.get("change_budget_result")
        != change_record.get("change_budget_result")
    ):
        errors.append(
            "Verification Evidence change_budget_result reference is inconsistent"
        )

    if (
        evidence.get("verification_run", {}).get("source_commit")
        != change_record.get("baseline", {}).get("target_commit")
    ):
        errors.append(
            "Verification Evidence source_commit "
            "does not match Change Record target_commit"
        )

    declared = {
        criterion.get("id"): criterion
        for criterion in contract.get("acceptance_criteria", [])
    }

    plan = {
        check.get("id"): check
        for check in contract.get("verification", {}).get("checks", [])
    }

    seen = set()
    statuses = []
    passed_criteria = set()

    for check in evidence.get("checks", []):

        check_id = check.get("check_id")

        if check_id in seen:
            errors.append(
                f"duplicate verification check_id: {check_id}"
            )

        seen.add(check_id)

        if check_id not in plan:
            errors.append(
                f"verification check {check_id} "
                "is not declared in Task Contract"
            )

        else:
            expected_refs = set(
                plan[check_id].get("acceptance_criteria_refs", [])
            )

            actual_refs = set(
                check.get("acceptance_criteria_refs", [])
            )

            if not actual_refs.issubset(expected_refs):
                errors.append(
                    f"verification check {check_id} references "
                    "criteria not declared by its Task Contract check"
                )

            if (
                check.get("evidence_level", 0)
                > plan[check_id].get("evidence_level", 0)
            ):
                errors.append(
                    f"verification check {check_id} claims "
                    "a higher evidence level than the declared plan"
                )

        for reference in check.get("acceptance_criteria_refs", []):

            if reference not in declared:
                errors.append(
                    f"verification check {check_id} "
                    f"references unknown acceptance criterion {reference}"
                )

            if check.get("status") == "PASS":
                passed_criteria.add(reference)

        statuses.append(check.get("status"))

    required_checks = {
        key
        for key, value in plan.items()
        if value.get("required") is True
    }

    if not required_checks.issubset(seen):
        missing = sorted(required_checks - seen)

        errors.append(
            "Verification Evidence is missing required checks: "
            + ", ".join(missing)
        )

    for criterion_id, criterion in declared.items():

        if (
            criterion.get("required", True)
            and criterion_id not in passed_criteria
        ):
            errors.append(
                f"required acceptance criterion {criterion_id} "
                "lacks a passing verification check"
            )

        if criterion_id in passed_criteria:

            matching = [
                check
                for check in evidence.get("checks", [])
                if (
                    criterion_id
                    in check.get("acceptance_criteria_refs", [])
                    and check.get("status") == "PASS"
                )
            ]

            if (
                matching
                and max(
                    check.get("evidence_level", 0)
                    for check in matching
                )
                < criterion.get("required_evidence_level", 1)
            ):
                errors.append(
                    f"acceptance criterion {criterion_id} "
                    "lacks its required evidence level"
                )

    actual_overall = (
        "PASS"
        if statuses and all(status == "PASS" for status in statuses)
        else (
            "FAIL"
            if "FAIL" in statuses
            else "INCONCLUSIVE"
        )
    )

    if (
        evidence.get("overall_result") == "PASS"
        and (actual_overall != "PASS" or errors)
    ):
        errors.append(
            "overall_result PASS is inconsistent "
            "with check outcomes or semantic errors"
        )

    decision = evidence.get("acceptance_decision", {})

    if (
        decision.get("decision")
        in (
            "ACCEPTED",
            "REJECTED",
            "CONDITIONALLY_ACCEPTED",
        )
        and not all(
            decision.get(key)
            for key in (
                "decided_by",
                "decided_at",
                "approval_reference",
            )
        )
    ):
        errors.append(
            "a recorded acceptance decision requires "
            "decided_by, decided_at, and approval_reference"
        )

    if (
        decision.get("decision") == "CONDITIONALLY_ACCEPTED"
        and not decision.get("conditions")
    ):
        errors.append(
            "CONDITIONALLY_ACCEPTED requires "
            "at least one explicit condition"
        )

    if decision.get("decision") == "ACCEPTED":

        if evidence.get("overall_result") != "PASS":
            errors.append(
                "ACCEPTED requires overall_result PASS"
            )

        if (
            change_record.get("scope_integrity") != "PASS"
            or change_record.get("change_budget_result") != "PASS"
        ):
            errors.append(
                "ACCEPTED requires passing Change Record "
                "scope and budget results"
            )

    return errors


# ============================================================
# 6. Cross-specification bundle validation
# ============================================================

def validate_bundle() -> list[str]:

    errors = []

    task_schema = json.loads(
        TASK_SCHEMA.read_text(encoding="utf-8")
    )

    task = load_document(TASK_EXAMPLE)

    task_errors = validate_schema(
        TASK_EXAMPLE,
        task_schema,
    )

    errors.extend(task_errors)

    if not task_errors:

        try:
            from scripts.validate_task_contracts import (
                validate_semantics as validate_task_semantics,
            )

            semantic_errors, warnings = validate_task_semantics(task)

            errors.extend(
                [
                    f"Task Contract semantic: {error}"
                    for error in semantic_errors
                ]
            )

        except Exception as exc:
            errors.append(
                f"could not run Task Contract semantic validator: {exc}"
            )

    docs = {
        name: load_document(example_path)
        for name, (_, example_path) in SPECS.items()
    }

    if not errors:

        errors.extend(
            [
                f"Context Manifest: {error}"
                for error in validate_context_semantics(
                    docs["context-manifest"],
                    task,
                )
            ]
        )

        errors.extend(
            [
                f"Project State: {error}"
                for error in validate_project_state_semantics(
                    docs["project-state"],
                    task,
                )
            ]
        )

        errors.extend(
            [
                f"Change Record: {error}"
                for error in validate_change_semantics(
                    docs["change-record"],
                    task,
                )
            ]
        )

        errors.extend(
            [
                f"Verification Evidence: {error}"
                for error in validate_evidence_semantics(
                    docs["verification-evidence"],
                    task,
                    docs["change-record"],
                )
            ]
        )

    return errors


# ============================================================
# 7. Command-line entry point
# ============================================================

def main() -> int:

    parser = argparse.ArgumentParser(
        description=(
            "Validate the BVC v0.1 Core Specification example bundle."
        )
    )

    parser.add_argument(
        "--skip-cross-validation",
        action="store_true",
        help=(
            "Validate individual JSON Schemas and examples only."
        ),
    )

    args = parser.parse_args()

    failures = 0

    # Validate Task Contract schema definition.
    try:
        task_schema = json.loads(
            TASK_SCHEMA.read_text(encoding="utf-8")
        )

        Draft202012Validator.check_schema(task_schema)

        print("PASS Task Contract schema definition")

    except Exception as exc:

        print(
            f"FAIL Task Contract schema definition: {exc}"
        )

        failures += 1

    # Validate the four additional Core Specifications.
    for name, (schema_path, example_path) in SPECS.items():

        try:
            schema = json.loads(
                schema_path.read_text(encoding="utf-8")
            )

            Draft202012Validator.check_schema(schema)

            errors = validate_schema(
                example_path,
                schema,
            )

            if errors:

                failures += 1

                print(f"FAIL {name} example")

                for error in errors:
                    print("  - " + error)

            else:

                print(f"PASS {name} schema + example")

        except Exception as exc:

            failures += 1

            print(f"FAIL {name}: {exc}")

    # Validate cross-artifact relationships.
    if not args.skip_cross_validation:

        try:
            errors = validate_bundle()

            if errors:

                failures += 1

                print("FAIL cross-artifact bundle")

                for error in errors:
                    print("  - " + error)

            else:

                print(
                    "PASS cross-artifact linkage, "
                    "scope, totals, and evidence checks"
                )

        except Exception as exc:

            failures += 1

            print(
                f"FAIL cross-artifact validation: {exc}"
            )

    print(
        "\nBVC Core Specification validation complete; "
        f"failures: {failures}."
    )

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
