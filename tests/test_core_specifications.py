
from __future__ import annotations

import copy
import json
import unittest

from jsonschema import (
    Draft202012Validator,
    FormatChecker,
)

from scripts.validate_core_specifications import (
    SPECS,
    TASK_SCHEMA,
    TASK_EXAMPLE,
    load_document,
    validate_context_semantics,
    validate_project_state_semantics,
    validate_change_semantics,
    validate_evidence_semantics,
    validate_bundle,
)


# ============================================================
# 1. JSON Schema validation tests
# ============================================================

class CoreSpecificationSchemaTests(unittest.TestCase):

    def test_all_four_new_schema_definitions_are_valid(self):

        for name, (schema_path, _) in SPECS.items():

            with self.subTest(name=name):

                schema = json.loads(
                    schema_path.read_text(encoding="utf-8")
                )

                Draft202012Validator.check_schema(schema)

    def test_task_contract_schema_definition_is_valid(self):

        schema = json.loads(
            TASK_SCHEMA.read_text(encoding="utf-8")
        )

        Draft202012Validator.check_schema(schema)

    def test_all_four_new_examples_match_their_schemas(self):

        for name, (schema_path, example_path) in SPECS.items():

            with self.subTest(name=name):

                schema = json.loads(
                    schema_path.read_text(encoding="utf-8")
                )

                data = load_document(example_path)

                errors = list(
                    Draft202012Validator(
                        schema,
                        format_checker=FormatChecker(),
                    ).iter_errors(data)
                )

                self.assertEqual([], errors)


# ============================================================
# 2. Cross-specification semantic tests
# ============================================================

class CoreSpecificationSemanticTests(unittest.TestCase):

    def setUp(self):

        self.contract = load_document(TASK_EXAMPLE)

        self.context = load_document(
            SPECS["context-manifest"][1]
        )

        self.state = load_document(
            SPECS["project-state"][1]
        )

        self.change = load_document(
            SPECS["change-record"][1]
        )

        self.evidence = load_document(
            SPECS["verification-evidence"][1]
        )

    # --------------------------------------------------------
    # 2.1. Complete bundle
    # --------------------------------------------------------

    def test_complete_five_record_bundle_is_consistent(self):

        self.assertEqual(
            [],
            validate_bundle(),
        )

    # --------------------------------------------------------
    # 2.2. Context Manifest
    # --------------------------------------------------------

    def test_context_contract_revision_mismatch_is_rejected(self):

        x = copy.deepcopy(self.context)

        x["task_ref"]["revision"] = 99

        errors = validate_context_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("revision" in error for error in errors)
        )

    def test_required_context_source_cannot_be_excluded(self):

        x = copy.deepcopy(self.context)

        x["sources"][0]["selection_status"] = "EXCLUDED"

        errors = validate_context_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any(
                "not included" in error
                or "excluded" in error
                for error in errors
            )
        )

    def test_ready_context_cannot_hide_material_unresolved_conflict(self):

        x = copy.deepcopy(self.context)

        x["conflicts"] = [
            {
                "conflict_id": "CONFLICT-1",
                "source_ids": ["CTX-001", "CTX-002"],
                "severity": "MATERIAL",
                "resolution_status": "UNRESOLVED",
            }
        ]

        errors = validate_context_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("unresolved" in error for error in errors)
        )

    def test_untrusted_source_cannot_be_labeled_trusted(self):

        x = copy.deepcopy(self.context)

        x["sources"][0]["authority"] = "UNTRUSTED"
        x["sources"][0]["trust_level"] = "TRUSTED"

        errors = validate_context_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("UNTRUSTED" in error for error in errors)
        )

    def test_context_source_limit_is_enforced(self):

        x = copy.deepcopy(self.context)

        x["selection_policy"]["max_source_count"] = 2

        errors = validate_context_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("max_source_count" in error for error in errors)
        )

    # --------------------------------------------------------
    # 2.3. Project State
    # --------------------------------------------------------

    def test_project_state_verified_fact_requires_source(self):

        x = copy.deepcopy(self.state)

        x["facts"][0]["source_refs"] = []

        errors = validate_project_state_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("must cite" in error for error in errors)
        )

    def test_dirty_project_baseline_requires_preexisting_change_reference(self):

        x = copy.deepcopy(self.state)

        x["baseline"]["working_tree_status"] = "DIRTY"

        errors = validate_project_state_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("pre_existing_changes_ref" in error for error in errors)
        )

    def test_duplicate_project_state_fact_id_is_rejected(self):

        x = copy.deepcopy(self.state)

        x["facts"].append(
            copy.deepcopy(x["facts"][0])
        )

        errors = validate_project_state_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("duplicate fact_id" in error for error in errors)
        )

    # --------------------------------------------------------
    # 2.4. Change Record
    # --------------------------------------------------------

    def test_change_record_out_of_scope_path_is_rejected(self):

        x = copy.deepcopy(self.change)

        x["changes"][0]["path"] = "src/middleware/auth.ts"
        x["totals"]["diff_lines"] = 67

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("BLOCKED_SCOPE_EXPANSION" in error for error in errors)
        )

    def test_change_record_totals_must_match_inventory(self):

        x = copy.deepcopy(self.change)

        x["totals"]["changed_files"] = 3

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("totals.changed_files" in error for error in errors)
        )

    def test_change_record_budget_is_enforced(self):

        x = copy.deepcopy(self.change)

        x["changes"][0]["additions"] = 230

        x["totals"]["additions"] = 265
        x["totals"]["diff_lines"] = 273

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("CHANGE_BUDGET_EXCEEDED" in error for error in errors)
        )

    def test_unverified_diff_collector_cannot_support_scope_pass(self):

        x = copy.deepcopy(self.change)

        x["collector"]["trust_level"] = "UNVERIFIED"

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("unverified collector" in error for error in errors)
        )

    def test_binary_change_must_have_zero_text_diff_lines(self):

        x = copy.deepcopy(self.change)

        x["changes"][0]["is_binary"] = True

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("binary change" in error for error in errors)
        )

    def test_final_change_record_requires_approved_contract(self):

        contract = copy.deepcopy(self.contract)

        contract["status"] = "PROPOSED"

        errors = validate_change_semantics(
            self.change,
            contract,
        )

        self.assertTrue(
            any("requires an APPROVED" in error for error in errors)
        )

    # --------------------------------------------------------
    # 2.5. Verification Evidence
    # --------------------------------------------------------

    def test_verification_unknown_acceptance_criterion_is_rejected(self):

        x = copy.deepcopy(self.evidence)

        x["checks"][0]["acceptance_criteria_refs"].append(
            "AC-UNKNOWN"
        )

        errors = validate_evidence_semantics(
            x,
            self.contract,
            self.change,
        )

        self.assertTrue(
            any(
                "unknown acceptance criterion" in error
                for error in errors
            )
        )

    def test_verification_must_include_every_required_check(self):

        x = copy.deepcopy(self.evidence)

        x["checks"] = x["checks"][:2]

        errors = validate_evidence_semantics(
            x,
            self.contract,
            self.change,
        )

        self.assertTrue(
            any("missing required checks" in error for error in errors)
        )

    def test_failed_check_cannot_produce_overall_pass(self):

        x = copy.deepcopy(self.evidence)

        x["checks"][0]["status"] = "FAIL"

        errors = validate_evidence_semantics(
            x,
            self.contract,
            self.change,
        )

        self.assertTrue(
            any("overall_result PASS" in error for error in errors)
        )

    def test_acceptance_requires_passing_change_record(self):

        x = copy.deepcopy(self.evidence)
        changed = copy.deepcopy(self.change)

        changed["scope_integrity"] = "FAIL"

        x["acceptance_decision"] = {
            "decision": "ACCEPTED",
            "decided_by": "human-owner",
            "decided_at": "2026-11-03T10:00:00+07:00",
            "approval_reference": "approval://sample/acceptance",
            "rationale": "Reviewed evidence.",
        }

        x["change_record_ref"]["scope_integrity"] = "FAIL"

        errors = validate_evidence_semantics(
            x,
            self.contract,
            changed,
        )

        self.assertTrue(
            any("scope and budget" in error for error in errors)
        )

    def test_evidence_must_reference_same_change_record(self):

        x = copy.deepcopy(self.evidence)

        x["change_record_ref"]["record_id"] = "BVC-CHANGE-OTHER"

        errors = validate_evidence_semantics(
            x,
            self.contract,
            self.change,
        )

        self.assertTrue(
            any("different Change Record" in error for error in errors)
        )

    def test_accepted_decision_requires_approval_metadata(self):

        x = copy.deepcopy(self.evidence)

        x["acceptance_decision"] = {
            "decision": "ACCEPTED"
        }

        schema = json.loads(
            SPECS["verification-evidence"][0].read_text(
                encoding="utf-8"
            )
        )

        errors = list(
            Draft202012Validator(schema).iter_errors(x)
        )

        self.assertTrue(errors)

    def test_conditional_acceptance_requires_explicit_conditions(self):

        x = copy.deepcopy(self.evidence)

        x["acceptance_decision"] = {
            "decision": "CONDITIONALLY_ACCEPTED",
            "decided_by": "human-owner",
            "decided_at": "2026-11-03T10:00:00+07:00",
            "approval_reference": "approval://sample/conditional",
        }

        errors = validate_evidence_semantics(
            x,
            self.contract,
            self.change,
        )

        self.assertTrue(
            any("explicit condition" in error for error in errors)
        )

    # --------------------------------------------------------
    # 2.6. Regression tests: independent control outcomes
    # --------------------------------------------------------

    def test_budget_violation_does_not_invalidate_scope_integrity_pass(self):

        x = copy.deepcopy(self.change)

        # Keep the changed file inside its authorized scope.
        # Increase the diff beyond the approved Change Budget.
        x["changes"][0]["additions"] = 230

        x["totals"]["additions"] = 265
        x["totals"]["diff_lines"] = 273

        # Scope is valid; only the budget is exceeded.
        x["scope_integrity"] = "PASS"
        x["change_budget_result"] = "FAIL"

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("CHANGE_BUDGET_EXCEEDED" in error for error in errors)
        )

        self.assertFalse(
            any("scope_integrity cannot be PASS" in error for error in errors)
        )

        self.assertFalse(
            any("change_budget_result cannot be PASS" in error for error in errors)
        )

    def test_scope_violation_does_not_invalidate_change_budget_pass(self):

        x = copy.deepcopy(self.change)

        # The changed path is outside the authorized scope.
        # The number of files and diff lines remain within budget.
        x["changes"][0]["path"] = "src/middleware/auth.ts"

        x["scope_integrity"] = "FAIL"
        x["change_budget_result"] = "PASS"

        errors = validate_change_semantics(
            x,
            self.contract,
        )

        self.assertTrue(
            any("BLOCKED_SCOPE_EXPANSION" in error for error in errors)
        )

        self.assertFalse(
            any("change_budget_result cannot be PASS" in error for error in errors)
        )


if __name__ == "__main__":
    unittest.main()
