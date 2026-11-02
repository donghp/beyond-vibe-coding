#!/usr/bin/env python3
"""Validate the BVC v0.1 Core Specification examples and their cross-record links.

This validates records supplied to it. It does not execute AI tasks, collect Git diffs,
authenticate approvers, prove external references exist, or enforce filesystem access.
"""
from __future__ import annotations
import argparse, json, re, sys
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
 "context-manifest": (SPEC / "context-manifest.schema.json", SPEC / "core-examples" / "context-manifest.example.yaml"),
 "project-state": (SPEC / "project-state.schema.json", SPEC / "core-examples" / "project-state.example.yaml"),
 "change-record": (SPEC / "change-record.schema.json", SPEC / "core-examples" / "change-record.example.yaml"),
 "verification-evidence": (SPEC / "verification-evidence.schema.json", SPEC / "core-examples" / "verification-evidence.example.yaml"),
}
CATEGORY_RULES = {
 "dependency": ("allow_dependency_changes", "change_dependencies"),
 "lockfile": ("allow_lockfile_changes", "change_lockfiles"),
 "database_schema": ("allow_database_schema_changes", "change_database_schema"),
 "financial_formula": ("allow_financial_formula_changes", "change_financial_formula"),
 "authentication": ("allow_authentication_changes", "change_authentication"),
 "architecture": ("allow_architecture_changes", "change_architecture"),
}

def load_document(path: Path) -> dict[str, Any]:
    raw = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".json": data = json.loads(raw)
    else: data = yaml.safe_load(raw)
    if not isinstance(data, dict): raise ValueError(f"{path}: root must be an object/mapping")
    return data

def validate_schema(path: Path, schema: dict[str, Any]) -> list[str]:
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    errors = sorted(validator.iter_errors(load_document(path)), key=lambda e: (list(e.absolute_path), e.message))
    return [f"{path.name}: {'/'.join(map(str,e.absolute_path)) or '<root>'}: {e.message}" for e in errors]

def safe_repo_path(path: str) -> bool:
    if not isinstance(path,str) or not path or path.startswith("/") or "\\" in path or re.match(r"^[A-Za-z]:",path): return False
    parts=path.split("/")
    return not any(p in ("",".","..") for p in parts) and not any(c in path for c in "*?[]{}")

def validate_context_semantics(manifest: dict[str,Any], contract: dict[str,Any]) -> list[str]:
    errors=[]; sources=manifest.get("sources",[]); by_id={}
    for source in sources:
        sid=source.get("source_id")
        if sid in by_id: errors.append(f"duplicate context source_id: {sid}")
        by_id[sid]=source
    tref=manifest.get("task_ref",{}); task=contract.get("task",{}); project=contract.get("project",{})
    for key, expected in (("contract_id",contract.get("contract_id")),("contract_version",contract.get("contract_version")),("revision",contract.get("revision")),("task_id",task.get("id"))):
        if tref.get(key)!=expected: errors.append(f"context manifest task_ref.{key} does not match Task Contract")
    if manifest.get("project_id")!=project.get("project_id"): errors.append("context manifest project_id does not match Task Contract project.project_id")
    if manifest.get("status")=="READY" and contract.get("status")!="APPROVED": errors.append("READY Context Manifest requires an APPROVED Task Contract")
    if manifest.get("baseline",{}).get("source_commit")!=project.get("baseline",{}).get("source_commit"): errors.append("context manifest baseline does not match Task Contract source_commit")
    for req in contract.get("required_context",[]):
        matches=[s for s in sources if s.get("reference")==req.get("reference")]
        if req.get("required") and not matches: errors.append(f"required Task Contract context source is absent: {req.get('reference')}")
        for source in matches:
            if source.get("selection_status")!="INCLUDED": errors.append(f"required context source is not included: {req.get('reference')}")
            if source.get("authority")!=req.get("authority"): errors.append(f"context authority mismatch for {req.get('reference')}")
    policy=manifest.get("selection_policy",{})
    max_sources=policy.get("max_source_count")
    if max_sources is not None and len(sources)>max_sources: errors.append(f"Context Manifest has {len(sources)} sources; max_source_count is {max_sources}")
    if manifest.get("status")=="READY" and not any(s.get("selection_status")=="INCLUDED" for s in sources): errors.append("READY Context Manifest requires at least one included source")
    for source in sources:
        freshness=source.get("freshness",{}).get("status")
        if source.get("required") and source.get("selection_status")!="INCLUDED": errors.append(f"required source is excluded: {source.get('source_id')}")
        if manifest.get("status")=="READY" and source.get("required") and policy.get("freshness_strategy")=="REQUIRE_CURRENT" and freshness in ("STALE","UNKNOWN"):
            errors.append(f"READY manifest includes required source with {freshness} freshness: {source.get('source_id')}")
        if source.get("authority")=="UNTRUSTED" and source.get("trust_level")=="TRUSTED": errors.append(f"UNTRUSTED authority cannot be marked TRUSTED: {source.get('source_id')}")
    source_ids=set(by_id)
    for conflict in manifest.get("conflicts",[]):
        if not set(conflict.get("source_ids",[])).issubset(source_ids): errors.append(f"conflict {conflict.get('conflict_id')} references unknown source_id")
        if manifest.get("status")=="READY" and policy.get("conflict_strategy")=="STOP_ON_MATERIAL_CONFLICT" and conflict.get("severity") in ("MATERIAL","CRITICAL") and conflict.get("resolution_status")=="UNRESOLVED":
            errors.append(f"READY manifest has unresolved {conflict.get('severity')} conflict: {conflict.get('conflict_id')}")
    return errors

def validate_project_state_semantics(state: dict[str,Any], contract: dict[str,Any]) -> list[str]:
    errors=[]
    if state.get("project_id")!=contract.get("project",{}).get("project_id"): errors.append("Project State project_id does not match Task Contract")
    if state.get("repository",{}).get("url")!=contract.get("project",{}).get("repository",{}).get("url"): errors.append("Project State repository URL does not match Task Contract")
    if state.get("baseline",{}).get("source_commit")!=contract.get("project",{}).get("baseline",{}).get("source_commit"): errors.append("Project State baseline does not match Task Contract source_commit")
    collections=[("facts","fact_id"),("decisions","decision_id"),("active_tasks","task_id"),("blocked_items","issue_id"),("open_risks","risk_id"),("open_issues","issue_id"),("next_actions","action_id")]
    for key,id_key in collections:
        ids=[x.get(id_key) for x in state.get(key,[])]
        if len(ids)!=len(set(ids)): errors.append(f"Project State contains duplicate {id_key} in {key}")
    for fact in state.get("facts",[]):
        if fact.get("classification")=="VERIFIED_FACT" and not fact.get("source_refs"):
            errors.append(f"verified fact {fact.get('fact_id')} must cite at least one source")
        if fact.get("classification")=="VERIFIED_FACT" and not fact.get("verified_at"):
            errors.append(f"verified fact {fact.get('fact_id')} must include verified_at")
    for decision in state.get("decisions",[]):
        if decision.get("status")=="ACCEPTED" and not all(decision.get(k) for k in ("decided_by","decided_at","authority_reference")):
            errors.append(f"accepted decision {decision.get('decision_id')} requires decided_by, decided_at, and authority_reference")
    baseline=state.get("baseline",{})
    if baseline.get("working_tree_status")=="DIRTY" and not baseline.get("pre_existing_changes_ref"):
        errors.append("DIRTY Project State baseline requires pre_existing_changes_ref")
    recovery=state.get("recovery",{})
    if recovery.get("verified") is True and recovery.get("source_commit")!=baseline.get("source_commit"):
        errors.append("verified recovery source_commit must match Project State baseline")
    return errors

def validate_change_semantics(record: dict[str,Any], contract: dict[str,Any]) -> list[str]:
    errors=[]; scope=contract.get("scope",{}); changes=record.get("changes",[]); budget=contract.get("change_budget",{}); actions=set(contract.get("authority",{}).get("permitted_actions",[]))
    allowed={"CREATE":set(scope.get("allowed_changes",{}).get("create",[])),"MODIFY":set(scope.get("allowed_changes",{}).get("modify",[])),"DELETE":set(scope.get("allowed_changes",{}).get("delete",[]))}
    seen=set(); counts={"CREATE":0,"MODIFY":0,"DELETE":0}; adds=deletes=binaries=0; prefixes=scope.get("forbidden_path_prefixes",[]); forbidden=set(scope.get("forbidden_paths",[]))
    for item in changes:
        path=item.get("path"); op=item.get("operation")
        if not safe_repo_path(path): errors.append(f"unsafe repository-relative path: {path!r}")
        if item.get("is_binary") and (item.get("additions")!=0 or item.get("deletions")!=0): errors.append(f"binary change {path!r} must report zero additions and deletions")
        if path in seen: errors.append(f"duplicate changed path: {path}")
        seen.add(path)
        if path not in allowed.get(op,set()): errors.append(f"BLOCKED_SCOPE_EXPANSION: {op} {path} is not authorized")
        if path in forbidden or any(path.startswith(p) for p in prefixes): errors.append(f"PROTECTED_PATH_VIOLATION: {path}")
        if op in counts: counts[op]+=1
        adds+=item.get("additions",0); deletes+=item.get("deletions",0); binaries+=int(item.get("is_binary",False))
        for cat in item.get("categories",[]):
            rule=CATEGORY_RULES.get(cat)
            if not rule: errors.append(f"unknown sensitive category: {cat}"); continue
            flag,action=rule
            if budget.get(flag) is not True or action not in actions: errors.append(f"PROTECTED_CATEGORY_VIOLATION: {cat} at {path}")
    totals=record.get("totals",{}); expected={"changed_files":len(changes),"created_files":counts["CREATE"],"modified_files":counts["MODIFY"],"deleted_files":counts["DELETE"],"additions":adds,"deletions":deletes,"diff_lines":adds+deletes,"binary_files":binaries}
    for key,value in expected.items():
        if totals.get(key)!=value: errors.append(f"totals.{key} is {totals.get(key)!r}; calculated value is {value}")
    caps={"changed_files":budget.get("max_changed_files",0),"created_files":budget.get("max_created_files",0),"modified_files":budget.get("max_modified_files",0),"deleted_files":budget.get("max_deleted_files",0),"diff_lines":budget.get("max_total_diff_lines",0),"binary_files":budget.get("max_binary_files",0)}
    for key,cap in caps.items():
        if expected[key]>cap: errors.append(f"CHANGE_BUDGET_EXCEEDED: {key}={expected[key]} exceeds {cap}")
    if record.get("task_ref",{}).get("task_id")!=contract.get("task",{}).get("id"): errors.append("Change Record task_id does not match Task Contract")
    cref=record.get("contract_ref",{})
    for key,value in (("contract_id",contract.get("contract_id")),("contract_version",contract.get("contract_version")),("revision",contract.get("revision"))):
        if cref.get(key)!=value: errors.append(f"Change Record contract_ref.{key} does not match Task Contract")
    if record.get("project_id")!=contract.get("project",{}).get("project_id"): errors.append("Change Record project_id does not match Task Contract")
    if record.get("baseline",{}).get("source_commit")!=contract.get("project",{}).get("baseline",{}).get("source_commit"): errors.append("Change Record source_commit does not match Task Contract baseline")
    if record.get("baseline",{}).get("working_tree_status")=="DIRTY" and not record.get("baseline",{}).get("pre_existing_changes_ref"): errors.append("DIRTY Change Record baseline requires pre_existing_changes_ref")
    if record.get("record_status")=="FINAL" and contract.get("status")!="APPROVED": errors.append("FINAL Change Record requires an APPROVED Task Contract reference")
    if changes and record.get("record_status")=="FINAL" and not record.get("baseline",{}).get("target_commit"): errors.append("FINAL Change Record with changes requires target_commit")
    if record.get("collector",{}).get("trust_level")!="TRUSTED" and record.get("scope_integrity")=="PASS": errors.append("unverified collector cannot support scope_integrity PASS")
    if errors and record.get("scope_integrity")=="PASS": errors.append("scope_integrity cannot be PASS when scope/consistency errors exist")
    if errors and record.get("change_budget_result")=="PASS": errors.append("change_budget_result cannot be PASS when budget/consistency errors exist")
    return errors

def validate_evidence_semantics(evidence: dict[str,Any], contract: dict[str,Any], change_record: dict[str,Any]) -> list[str]:
    errors=[]
    if evidence.get("project_id")!=contract.get("project",{}).get("project_id"): errors.append("Verification Evidence project_id does not match Task Contract")
    if evidence.get("record_status")=="FINAL" and contract.get("status")!="APPROVED": errors.append("FINAL Verification Evidence requires an APPROVED Task Contract reference")
    if evidence.get("task_ref",{}).get("task_id")!=contract.get("task",{}).get("id"): errors.append("Verification Evidence task_id does not match Task Contract")
    cref=evidence.get("contract_ref",{})
    for k,v in (("contract_id",contract.get("contract_id")),("contract_version",contract.get("contract_version")),("revision",contract.get("revision"))):
        if cref.get(k)!=v: errors.append(f"Verification Evidence contract_ref.{k} does not match Task Contract")
    if evidence.get("change_record_ref",{}).get("record_id")!=change_record.get("record_id"): errors.append("Verification Evidence references a different Change Record")
    if evidence.get("change_record_ref",{}).get("scope_integrity")!=change_record.get("scope_integrity"): errors.append("Verification Evidence scope_integrity reference is inconsistent")
    if evidence.get("change_record_ref",{}).get("change_budget_result")!=change_record.get("change_budget_result"): errors.append("Verification Evidence change_budget_result reference is inconsistent")
    if evidence.get("verification_run",{}).get("source_commit")!=change_record.get("baseline",{}).get("target_commit"): errors.append("Verification Evidence source_commit does not match Change Record target_commit")
    declared={c.get("id"):c for c in contract.get("acceptance_criteria",[])}
    plan={c.get("id"):c for c in contract.get("verification",{}).get("checks",[])}
    seen=set(); statuses=[]; passed_criteria=set()
    for check in evidence.get("checks",[]):
        cid=check.get("check_id")
        if cid in seen: errors.append(f"duplicate verification check_id: {cid}")
        seen.add(cid)
        if cid not in plan: errors.append(f"verification check {cid} is not declared in Task Contract")
        else:
            expected=set(plan[cid].get("acceptance_criteria_refs",[])); actual=set(check.get("acceptance_criteria_refs",[]))
            if not actual.issubset(expected): errors.append(f"verification check {cid} references criteria not declared by its Task Contract check")
            if check.get("evidence_level",0)>plan[cid].get("evidence_level",0): errors.append(f"verification check {cid} claims a higher evidence level than the declared plan")
        for ref in check.get("acceptance_criteria_refs",[]):
            if ref not in declared: errors.append(f"verification check {cid} references unknown acceptance criterion {ref}")
            if check.get("status")=="PASS": passed_criteria.add(ref)
        statuses.append(check.get("status"))
    required_checks={k for k,v in plan.items() if v.get("required") is True}
    if not required_checks.issubset(seen): errors.append("Verification Evidence is missing required checks: "+", ".join(sorted(required_checks-seen)))
    for aid,criterion in declared.items():
        if criterion.get("required",True) and aid not in passed_criteria:
            errors.append(f"required acceptance criterion {aid} lacks a passing verification check")
        if aid in passed_criteria:
            matching=[c for c in evidence.get("checks",[]) if aid in c.get("acceptance_criteria_refs",[]) and c.get("status")=="PASS"]
            if matching and max(c.get("evidence_level",0) for c in matching)<criterion.get("required_evidence_level",1): errors.append(f"acceptance criterion {aid} lacks its required evidence level")
    actual_overall="PASS" if statuses and all(s=="PASS" for s in statuses) else ("FAIL" if "FAIL" in statuses else "INCONCLUSIVE")
    if evidence.get("overall_result")=="PASS" and (actual_overall!="PASS" or errors): errors.append("overall_result PASS is inconsistent with check outcomes or semantic errors")
    decision=evidence.get("acceptance_decision",{})
    if decision.get("decision") in ("ACCEPTED","REJECTED","CONDITIONALLY_ACCEPTED") and not all(decision.get(k) for k in ("decided_by","decided_at","approval_reference")):
        errors.append("a recorded acceptance decision requires decided_by, decided_at, and approval_reference")
    if decision.get("decision")=="CONDITIONALLY_ACCEPTED" and not decision.get("conditions"):
        errors.append("CONDITIONALLY_ACCEPTED requires at least one explicit condition")
    if decision.get("decision")=="ACCEPTED":
        if evidence.get("overall_result")!="PASS": errors.append("ACCEPTED requires overall_result PASS")
        if change_record.get("scope_integrity")!="PASS" or change_record.get("change_budget_result")!="PASS": errors.append("ACCEPTED requires passing Change Record scope and budget results")
    return errors

def validate_bundle() -> list[str]:
    errors=[]
    task_schema=json.loads(TASK_SCHEMA.read_text(encoding="utf-8"))
    task=load_document(TASK_EXAMPLE)
    task_errors=validate_schema(TASK_EXAMPLE,task_schema)
    errors.extend(task_errors)
    if not task_errors:
        try:
            from scripts.validate_task_contracts import validate_semantics as validate_task_semantics
            sem,warn=validate_task_semantics(task)
            errors.extend([f"Task Contract semantic: {e}" for e in sem])
        except Exception as exc: errors.append(f"could not run Task Contract semantic validator: {exc}")
    docs={name:load_document(path) for name,(_,path) in SPECS.items()}
    if not errors:
        errors.extend([f"Context Manifest: {e}" for e in validate_context_semantics(docs['context-manifest'],task)])
        errors.extend([f"Project State: {e}" for e in validate_project_state_semantics(docs['project-state'],task)])
        errors.extend([f"Change Record: {e}" for e in validate_change_semantics(docs['change-record'],task)])
        errors.extend([f"Verification Evidence: {e}" for e in validate_evidence_semantics(docs['verification-evidence'],task,docs['change-record'])])
    return errors

def main() -> int:
    parser=argparse.ArgumentParser(description="Validate the BVC v0.1 Core Specification example bundle.")
    parser.add_argument('--skip-cross-validation',action='store_true',help='Validate individual JSON Schemas and examples only.')
    args=parser.parse_args()
    failures=0
    try:
        task_schema=json.loads(TASK_SCHEMA.read_text(encoding='utf-8'))
        Draft202012Validator.check_schema(task_schema)
        print('PASS Task Contract schema definition')
    except Exception as exc:
        print(f'FAIL Task Contract schema definition: {exc}'); failures+=1
    for name,(schema_path,example_path) in SPECS.items():
        try:
            schema=json.loads(schema_path.read_text(encoding='utf-8'))
            Draft202012Validator.check_schema(schema)
            errs=validate_schema(example_path,schema)
            if errs:
                failures+=1; print(f'FAIL {name} example'); [print('  - '+e) for e in errs]
            else: print(f'PASS {name} schema + example')
        except Exception as exc: failures+=1; print(f'FAIL {name}: {exc}')
    if not args.skip_cross_validation:
        try:
            errs=validate_bundle()
            if errs:
                failures+=1; print('FAIL cross-artifact bundle'); [print('  - '+e) for e in errs]
            else: print('PASS cross-artifact linkage, scope, totals, and evidence checks')
        except Exception as exc: failures+=1; print(f'FAIL cross-artifact validation: {exc}')
    print(f"\nBVC Core Specification validation complete; failures: {failures}.")
    return 1 if failures else 0

if __name__=='__main__': raise SystemExit(main())
