from __future__ import annotations
import copy, json, unittest
from pathlib import Path
import yaml
from jsonschema import Draft202012Validator, FormatChecker
from scripts.validate_core_specifications import (
 ROOT, SPECS, TASK_SCHEMA, TASK_EXAMPLE, load_document,
 validate_context_semantics, validate_project_state_semantics,
 validate_change_semantics, validate_evidence_semantics, validate_bundle
)

class CoreSpecificationSchemaTests(unittest.TestCase):
 def test_all_four_new_schema_definitions_are_valid(self):
  for name,(schema_path,_) in SPECS.items():
   with self.subTest(name=name): Draft202012Validator.check_schema(json.loads(schema_path.read_text(encoding='utf-8')))
 def test_task_contract_schema_definition_is_valid(self):
  Draft202012Validator.check_schema(json.loads(TASK_SCHEMA.read_text(encoding='utf-8')))
 def test_all_four_new_examples_match_their_schemas(self):
  for name,(schema_path,example_path) in SPECS.items():
   with self.subTest(name=name):
    schema=json.loads(schema_path.read_text(encoding='utf-8'))
    data=load_document(example_path)
    self.assertEqual([],list(Draft202012Validator(schema,format_checker=FormatChecker()).iter_errors(data)))

class CoreSpecificationSemanticTests(unittest.TestCase):
 def setUp(self):
  self.contract=load_document(TASK_EXAMPLE)
  self.context=load_document(SPECS['context-manifest'][1])
  self.state=load_document(SPECS['project-state'][1])
  self.change=load_document(SPECS['change-record'][1])
  self.evidence=load_document(SPECS['verification-evidence'][1])
 def test_complete_five_record_bundle_is_consistent(self): self.assertEqual([],validate_bundle())
 def test_context_contract_revision_mismatch_is_rejected(self):
  x=copy.deepcopy(self.context); x['task_ref']['revision']=99
  self.assertTrue(any('revision' in e for e in validate_context_semantics(x,self.contract)))
 def test_required_context_source_cannot_be_excluded(self):
  x=copy.deepcopy(self.context); x['sources'][0]['selection_status']='EXCLUDED'
  self.assertTrue(any('not included' in e or 'excluded' in e for e in validate_context_semantics(x,self.contract)))
 def test_ready_context_cannot_hide_material_unresolved_conflict(self):
  x=copy.deepcopy(self.context); x['conflicts']=[{'conflict_id':'CONFLICT-1','source_ids':['CTX-001','CTX-002'],'severity':'MATERIAL','resolution_status':'UNRESOLVED'}]
  self.assertTrue(any('unresolved' in e for e in validate_context_semantics(x,self.contract)))
 def test_untrusted_source_cannot_be_labeled_trusted(self):
  x=copy.deepcopy(self.context); x['sources'][0]['authority']='UNTRUSTED'; x['sources'][0]['trust_level']='TRUSTED'
  self.assertTrue(any('UNTRUSTED' in e for e in validate_context_semantics(x,self.contract)))
 def test_context_source_limit_is_enforced(self):
  x=copy.deepcopy(self.context); x['selection_policy']['max_source_count']=2
  self.assertTrue(any('max_source_count' in e for e in validate_context_semantics(x,self.contract)))
 def test_project_state_verified_fact_requires_source(self):
  x=copy.deepcopy(self.state); x['facts'][0]['source_refs']=[]
  self.assertTrue(any('must cite' in e for e in validate_project_state_semantics(x,self.contract)))
 def test_dirty_project_baseline_requires_preexisting_change_reference(self):
  x=copy.deepcopy(self.state); x['baseline']['working_tree_status']='DIRTY'
  self.assertTrue(any('pre_existing_changes_ref' in e for e in validate_project_state_semantics(x,self.contract)))
 def test_duplicate_project_state_fact_id_is_rejected(self):
  x=copy.deepcopy(self.state); x['facts'].append(copy.deepcopy(x['facts'][0]))
  self.assertTrue(any('duplicate fact_id' in e for e in validate_project_state_semantics(x,self.contract)))
 def test_change_record_out_of_scope_path_is_rejected(self):
  x=copy.deepcopy(self.change); x['changes'][0]['path']='src/middleware/auth.ts'; x['totals']['diff_lines']=67
  self.assertTrue(any('BLOCKED_SCOPE_EXPANSION' in e for e in validate_change_semantics(x,self.contract)))
 def test_change_record_totals_must_match_inventory(self):
  x=copy.deepcopy(self.change); x['totals']['changed_files']=3
  self.assertTrue(any('totals.changed_files' in e for e in validate_change_semantics(x,self.contract)))
 def test_change_record_budget_is_enforced(self):
  x=copy.deepcopy(self.change); x['changes'][0]['additions']=230; x['totals']['additions']=265; x['totals']['diff_lines']=273
  self.assertTrue(any('CHANGE_BUDGET_EXCEEDED' in e for e in validate_change_semantics(x,self.contract)))
 def test_unverified_diff_collector_cannot_support_scope_pass(self):
  x=copy.deepcopy(self.change); x['collector']['trust_level']='UNVERIFIED'
  self.assertTrue(any('unverified collector' in e for e in validate_change_semantics(x,self.contract)))
 def test_binary_change_must_have_zero_text_diff_lines(self):
  x=copy.deepcopy(self.change); x['changes'][0]['is_binary']=True
  self.assertTrue(any('binary change' in e for e in validate_change_semantics(x,self.contract)))
 def test_final_change_record_requires_approved_contract(self):
  c=copy.deepcopy(self.contract); c['status']='PROPOSED'
  self.assertTrue(any('requires an APPROVED' in e for e in validate_change_semantics(self.change,c)))
 def test_verification_unknown_acceptance_criterion_is_rejected(self):
  x=copy.deepcopy(self.evidence); x['checks'][0]['acceptance_criteria_refs'].append('AC-UNKNOWN')
  self.assertTrue(any('unknown acceptance criterion' in e for e in validate_evidence_semantics(x,self.contract,self.change)))
 def test_verification_must_include_every_required_check(self):
  x=copy.deepcopy(self.evidence); x['checks']=x['checks'][:2]
  self.assertTrue(any('missing required checks' in e for e in validate_evidence_semantics(x,self.contract,self.change)))
 def test_failed_check_cannot_produce_overall_pass(self):
  x=copy.deepcopy(self.evidence); x['checks'][0]['status']='FAIL'
  self.assertTrue(any('overall_result PASS' in e for e in validate_evidence_semantics(x,self.contract,self.change)))
 def test_acceptance_requires_passing_change_record(self):
  x=copy.deepcopy(self.evidence); changed=copy.deepcopy(self.change); changed['scope_integrity']='FAIL'; x['acceptance_decision']={'decision':'ACCEPTED','decided_by':'human-owner','decided_at':'2026-11-03T10:00:00+07:00','approval_reference':'approval://sample/acceptance','rationale':'Reviewed evidence.'}; x['change_record_ref']['scope_integrity']='FAIL'
  self.assertTrue(any('scope and budget' in e for e in validate_evidence_semantics(x,self.contract,changed)))
 def test_evidence_must_reference_same_change_record(self):
  x=copy.deepcopy(self.evidence); x['change_record_ref']['record_id']='BVC-CHANGE-OTHER'
  self.assertTrue(any('different Change Record' in e for e in validate_evidence_semantics(x,self.contract,self.change)))
 def test_accepted_decision_requires_approval_metadata(self):
  x=copy.deepcopy(self.evidence); x['acceptance_decision']={'decision':'ACCEPTED'}
  schema=json.loads(SPECS['verification-evidence'][0].read_text(encoding='utf-8'))
  self.assertTrue(list(Draft202012Validator(schema).iter_errors(x)))
 def test_conditional_acceptance_requires_explicit_conditions(self):
  x=copy.deepcopy(self.evidence); x['acceptance_decision']={'decision':'CONDITIONALLY_ACCEPTED','decided_by':'human-owner','decided_at':'2026-11-03T10:00:00+07:00','approval_reference':'approval://sample/conditional'}
  self.assertTrue(any('explicit condition' in e for e in validate_evidence_semantics(x,self.contract,self.change)))

if __name__=='__main__': unittest.main()
