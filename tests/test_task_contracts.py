from __future__ import annotations

import copy
import json
import unittest
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator, FormatChecker

from scripts.validate_task_contracts import validate_changed_files, validate_semantics

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = json.loads((ROOT / "specifications/v0.1/task-contract.schema.json").read_text(encoding="utf-8"))
EXAMPLES = ROOT / "specifications/v0.1/examples"


def load_example(name: str) -> dict:
    return yaml.safe_load((EXAMPLES / name).read_text(encoding="utf-8"))


class TaskContractSchemaTests(unittest.TestCase):
    def setUp(self) -> None:
        self.validator = Draft202012Validator(SCHEMA, format_checker=FormatChecker())

    def assert_schema_valid(self, contract: dict) -> None:
        errors = list(self.validator.iter_errors(contract))
        self.assertEqual([], [error.message for error in errors])

    def test_read_only_example_is_valid(self) -> None:
        self.assert_schema_valid(load_example("read-only-inspection.yaml"))

    def test_scoped_component_change_example_is_valid(self) -> None:
        self.assert_schema_valid(load_example("scoped-component-change.yaml"))

    def test_high_risk_financial_example_is_valid(self) -> None:
        self.assert_schema_valid(load_example("high-risk-financial-change.yaml"))

    def test_scope_expansion_cannot_be_enabled(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["scope"]["scope_expansion_allowed"] = True
        self.assertTrue(list(self.validator.iter_errors(contract)))

    def test_unknown_top_level_field_is_rejected(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["self_authorized"] = True
        self.assertTrue(list(self.validator.iter_errors(contract)))


class TaskContractSemanticTests(unittest.TestCase):
    def test_valid_examples_have_no_semantic_errors(self) -> None:
        for name in (
            "read-only-inspection.yaml",
            "scoped-component-change.yaml",
            "high-risk-financial-change.yaml",
        ):
            with self.subTest(example=name):
                contract = load_example(name)
                errors, _warnings = validate_semantics(contract)
                self.assertEqual([], errors)

    def test_read_only_task_cannot_have_write_scope(self) -> None:
        contract = load_example("read-only-inspection.yaml")
        contract["scope"]["allowed_changes"]["modify"] = ["src/example.py"]
        errors, _ = validate_semantics(contract)
        self.assertTrue(any("READ_ONLY" in error for error in errors))

    def test_allowed_path_cannot_be_forbidden(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["scope"]["forbidden_paths"].append("src/components/StatusBadge.tsx")
        errors, _ = validate_semantics(contract)
        self.assertTrue(any("both allowed and forbidden" in error for error in errors))

    def test_write_permission_must_match_scope(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["authority"]["permitted_actions"].remove("modify")
        errors, _ = validate_semantics(contract)
        self.assertTrue(any("does not include 'modify'" in error for error in errors))

    def test_high_impact_task_requires_human_approval(self) -> None:
        contract = load_example("high-risk-financial-change.yaml")
        contract["authority"]["human_approval"] = {"required": False, "status": "NOT_REQUIRED"}
        errors, _ = validate_semantics(contract)
        self.assertTrue(any("high-impact risk factors" in error for error in errors))

    def test_scope_expansion_is_detected_in_observed_diff(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        changes = [
            {"path": "src/components/StatusBadge.tsx", "operation": "MODIFY", "diff_lines": 10, "is_binary": False},
            {"path": "src/middleware/auth.ts", "operation": "MODIFY", "diff_lines": 30, "is_binary": False},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("BLOCKED_SCOPE_EXPANSION" in error for error in errors))
        self.assertTrue(any("PROTECTED_PATH_VIOLATION" in error for error in errors))

    def test_change_budget_is_enforced_against_observed_diff(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        changes = [
            {"path": "src/components/StatusBadge.tsx", "operation": "MODIFY", "diff_lines": 20, "is_binary": False},
            {"path": "src/components/StatusBadge.test.tsx", "operation": "CREATE", "diff_lines": 40, "is_binary": False},
            {"path": "src/components/StatusBadge.extra.tsx", "operation": "CREATE", "diff_lines": 10, "is_binary": False},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("CHANGE_BUDGET_EXCEEDED" in error for error in errors))


    def test_diff_line_budget_is_enforced(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        changes = [
            {"path": "src/components/StatusBadge.tsx", "operation": "MODIFY", "diff_lines": 260, "is_binary": False},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("max_total_diff_lines" in error for error in errors))

    def test_binary_file_budget_is_enforced(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["scope"]["allowed_changes"]["create"].append("assets/status-icon.png")
        contract["change_budget"]["max_changed_files"] = 3
        contract["change_budget"]["max_created_files"] = 2
        changes = [
            {"path": "assets/status-icon.png", "operation": "CREATE", "diff_lines": 0, "is_binary": True},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("max_binary_files" in error for error in errors))

    def test_sensitive_category_requires_budget_flag_and_action(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        changes = [
            {"path": "src/components/StatusBadge.tsx", "operation": "MODIFY", "diff_lines": 10, "is_binary": False, "categories": ["authentication"]},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("PROTECTED_CATEGORY_VIOLATION" in error for error in errors))

    def test_duplicate_path_across_operations_is_rejected(self) -> None:
        contract = load_example("scoped-component-change.yaml")
        contract["scope"]["allowed_changes"]["create"].append("src/components/StatusBadge.tsx")
        contract["change_budget"]["max_changed_files"] = 3
        contract["change_budget"]["max_created_files"] = 1
        changes = [
            {"path": "src/components/StatusBadge.tsx", "operation": "MODIFY", "diff_lines": 10, "is_binary": False},
            {"path": "src/components/StatusBadge.tsx", "operation": "CREATE", "diff_lines": 10, "is_binary": False},
        ]
        errors = validate_changed_files(contract, changes)
        self.assertTrue(any("duplicate observed changed path" in error for error in errors))

    def test_pending_approval_is_a_warning_not_a_schema_error(self) -> None:
        contract = load_example("high-risk-financial-change.yaml")
        contract["authority"]["human_approval"]["status"] = "PENDING"
        contract["authority"]["human_approval"].pop("approval_reference", None)
        errors, warnings = validate_semantics(contract)
        self.assertEqual([], errors)
        self.assertTrue(any("not execution-ready" in warning for warning in warnings))


if __name__ == "__main__":
    unittest.main()
