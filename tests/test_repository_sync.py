import unittest
from pathlib import Path

import yaml

from scripts.validate_repository_sync import validate_paths


class RepositorySyncValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        root = Path(__file__).resolve().parents[1]
        cls.matrix = yaml.safe_load(
            (root / "docs/continuity/SYNC_IMPACT_MATRIX.yaml").read_text(encoding="utf-8")
        )

    def test_contract_change_requires_project_state_and_task_register(self):
        errors = validate_paths(
            ["projects/task-management/phase3.3/task-contracts/BVC-TM-TC-005.json"],
            self.matrix,
        )
        self.assertEqual(len(errors), 1)
        self.assertIn("PROJECT_CONTRACT", errors[0])
        self.assertIn("PROJECT_STATE.json", errors[0])
        self.assertIn("TASK_EXECUTION_REGISTER.yaml", errors[0])

    def test_complete_contract_sync_package_passes(self):
        changed = [
            "projects/task-management/phase3.3/task-contracts/BVC-TM-TC-005.json",
            "projects/task-management/continuity/PROJECT_STATE.json",
            "projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml",
            "projects/task-management/continuity/SOURCE_MANIFEST.csv",
        ]
        self.assertEqual(validate_paths(changed, self.matrix), [])

    def test_prompt_change_requires_prompt_register_library_and_lesson_status(self):
        changed = [
            "practical-labs/bvc-task-management/prompts/BVCTM_PROMPT_0005.md",
            "projects/task-management/continuity/registers/BVC_TM_PROMPT_REGISTER.yaml",
            "practical-labs/bvc-task-management/prompts/README.md",
            "practical-labs/bvc-task-management/LESSON_STATUS_REGISTER_V0.2.md",
            "projects/task-management/continuity/PROJECT_STATE.json",
            "projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml",
        ]
        self.assertEqual(validate_paths(changed, self.matrix), [])

    def test_lesson_change_requires_lesson_status_register(self):
        errors = validate_paths(
            ["practical-labs/bvc-task-management/phase-b/b2-save-your-task/README.md"],
            self.matrix,
        )
        self.assertEqual(len(errors), 1)
        self.assertIn("LEARNER_LESSON", errors[0])

    def test_complete_lesson_sync_package_passes(self):
        changed = [
            "practical-labs/bvc-task-management/phase-b/b2-save-your-task/README.md",
            "practical-labs/bvc-task-management/LESSON_STATUS_REGISTER_V0.2.md",
            "projects/task-management/continuity/PROJECT_STATE.json",
            "projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml",
        ]
        self.assertEqual(validate_paths(changed, self.matrix), [])

    def test_sync_standard_change_requires_global_navigation_and_protocol(self):
        errors = validate_paths(
            ["docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md"],
            self.matrix,
        )
        self.assertEqual(len(errors), 1)
        self.assertIn("GLOBAL_SYNC_STANDARD", errors[0])

    def test_global_sync_standard_complete_package_passes(self):
        changed = [
            "docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md",
            "docs/continuity/SYNC_IMPACT_MATRIX.yaml",
            "scripts/validate_repository_sync.py",
            "tests/test_repository_sync.py",
            ".github/workflows/validate-repository-sync.yml",
            "docs/continuity/README.md",
            "docs/continuity/CONTINUITY_PROTOCOL.md",
            "docs/continuity/TASK_LIFECYCLE.md",
            "docs/continuity/SOURCE_MANIFEST.csv",
        ]
        self.assertEqual(validate_paths(changed, self.matrix), [])

    def test_non_material_unmapped_file_does_not_require_extra_records(self):
        self.assertEqual(validate_paths(["README.md"], self.matrix), [])


if __name__ == "__main__":
    unittest.main()
