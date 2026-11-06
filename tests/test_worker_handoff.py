from __future__ import annotations

import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

from scripts.validate_worker_handoff import load_yaml, validate_handoff


ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "docs" / "continuity" / "WORKER_HANDOFF.schema.json"
TEMPLATE_PATH = ROOT / "docs" / "continuity" / "WORKER_HANDOFF.template.yaml"


class WorkerHandoffValidatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with SCHEMA_PATH.open("r", encoding="utf-8") as handle:
            cls.schema = json.load(handle)
        cls.template = load_yaml(TEMPLATE_PATH)

    def setUp(self):
        self.document = copy.deepcopy(self.template)

    def test_schema_is_valid_and_template_passes(self):
        Draft202012Validator.check_schema(self.schema)
        self.assertEqual(validate_handoff(self.document, self.schema), [])

    def test_missing_required_field_fails(self):
        self.document.pop("task")
        errors = validate_handoff(self.document, self.schema)
        self.assertTrue(any("task" in error for error in errors), errors)

    def test_invalid_enum_value_fails(self):
        self.document["task"]["risk"] = "R7"
        errors = validate_handoff(self.document, self.schema)
        self.assertTrue(any("R7" in error or "risk" in error for error in errors), errors)

    def test_ready_handoff_without_sender_release_fails(self):
        self.document["status"] = "READY_FOR_HANDOFF"
        self.document["checkpoint"].update({
            "remote_verified": True,
            "remote_verified_at_utc": "2026-11-07T00:00:00Z",
            "working_tree_status": "CLEAN",
            "uncommitted_work_status": "NONE",
            "sync_status": "VERIFIED",
        })
        self.document["checkpoint"]["remote_verification"].update({
            "status": "VERIFIED",
            "checked_at_utc": "2026-11-07T00:00:00Z",
        })
        self.document["writer_control"].update({
            "active_writer": "NONE",
            "sender_release_status": "NOT_RELEASED",
        })
        errors = validate_handoff(self.document, self.schema)
        self.assertTrue(any("sender_release_status" in error for error in errors), errors)

    def test_schema_template_required_fields_do_not_drift(self):
        required = set(self.schema["required"])
        supplied = set(self.template)
        self.assertTrue(required.issubset(supplied), sorted(required - supplied))
        self.assertEqual(self.schema["properties"]["schema_version"]["const"], self.template["schema_version"])

    def test_validation_does_not_mutate_document(self):
        original = copy.deepcopy(self.document)
        validate_handoff(self.document, self.schema)
        self.assertEqual(self.document, original)


if __name__ == "__main__":
    unittest.main()
