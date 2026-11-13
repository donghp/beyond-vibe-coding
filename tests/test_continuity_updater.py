import copy
import unittest

from scripts.update_continuity_state import is_material_path, refresh_state_document


class ContinuityUpdaterTests(unittest.TestCase):
    def setUp(self):
        self.state = {
            "schema_version": "3.0.0",
            "portfolio": {
                "review_status": "REQUIRES_LIVE_RECONCILIATION",
                "projects": [
                    {
                        "project_id": "BVC-TASK-MANAGEMENT",
                        "status_at_historical_snapshot": "ACTIVE",
                        "historical_active_task": "BVC-TM-P3.3-001",
                    }
                ],
            },
            "machine_snapshot": {
                "updater_version": "3.0.0",
                "last_observed_main_sha": "a" * 40,
            },
        }

    def test_continuity_only_paths_do_not_trigger_semantic_refresh(self):
        self.assertFalse(is_material_path("docs/continuity/CURRENT_STATE.yaml"))
        self.assertFalse(is_material_path("docs/continuity/HANDOFF_LOG.md"))
        self.assertFalse(is_material_path("projects/task-management/continuity/PROJECT_STATE.json"))
        self.assertFalse(is_material_path("projects/another-project/continuity/registers/TASK_REGISTER.yaml"))
        self.assertFalse(is_material_path("scripts/update_continuity_state.py"))
        self.assertFalse(is_material_path("tests/test_continuity_updater.py"))
        self.assertFalse(is_material_path(".github/workflows/continuity-refresh.yml"))

    def test_project_and_other_repository_changes_are_material(self):
        for path in (
            "projects/task-management/README.md",
            "practical-labs/bvc-task-management/phase-b/b2-save-your-task/README.md",
            "specifications/v0.1/task-contract.schema.json",
            "docs/framework-overview.md",
            "README.md",
            ".github/workflows/validate-task-contracts.yml",
            "assets/example.png",
        ):
            with self.subTest(path=path):
                self.assertTrue(is_material_path(path))

    def test_refresh_changes_machine_snapshot_only(self):
        original_semantics = {
            key: copy.deepcopy(value)
            for key, value in self.state.items()
            if key != "machine_snapshot"
        }
        refreshed = refresh_state_document(
            self.state,
            repository="donghp/beyond-vibe-coding",
            event_name="push",
            previous_sha="a" * 40,
            current_sha="b" * 40,
            changed_paths=["projects/task-management/README.md", "specifications/v0.1/task-contract.md"],
            commit_count=2,
            observed_at_utc="2026-11-05T00:00:00+00:00",
        )
        self.assertEqual(
            {key: value for key, value in refreshed.items() if key != "machine_snapshot"},
            original_semantics,
        )
        self.assertEqual(refreshed["machine_snapshot"]["last_observed_main_sha"], "b" * 40)
        self.assertEqual(refreshed["machine_snapshot"]["semantic_review_status"], "PENDING_AI_AND_OWNER_REVIEW")
        self.assertEqual(refreshed["machine_snapshot"]["changed_path_count"], 2)

    def test_refresh_does_not_mutate_input(self):
        original = copy.deepcopy(self.state)
        refresh_state_document(
            self.state,
            repository="donghp/beyond-vibe-coding",
            event_name="workflow_dispatch",
            previous_sha="a" * 40,
            current_sha="b" * 40,
            changed_paths=["README.md"],
            commit_count=1,
            observed_at_utc="2026-11-05T00:00:00+00:00",
        )
        self.assertEqual(self.state, original)

    def test_changed_path_list_is_bounded(self):
        many_paths = [f"projects/project-{index}/README.md" for index in range(250)]
        refreshed = refresh_state_document(
            self.state,
            repository="donghp/beyond-vibe-coding",
            event_name="push",
            previous_sha="a" * 40,
            current_sha="b" * 40,
            changed_paths=many_paths,
            commit_count=1,
            observed_at_utc="2026-11-05T00:00:00+00:00",
        )
        snapshot = refreshed["machine_snapshot"]
        self.assertEqual(len(snapshot["changed_paths"]), 200)
        self.assertEqual(snapshot["changed_path_count"], 250)
        self.assertTrue(snapshot["changed_paths_truncated"])


if __name__ == "__main__":
    unittest.main()
