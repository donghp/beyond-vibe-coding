/**
 * ENERIX Carbon - Enterprise GHG Inventory Reporting Blueprint
 * Canonical Reporting Domain Foundation
 * Task: #0024.5-C1
 *
 * CRITICAL ARCHITECTURAL BOUNDARY:
 * - Reporting Domain consumes governed outputs from existing engines.
 * - Reporting Domain is NOT a calculation authority.
 * - Reporting Domain is a governed representation, disclosure, assurance, approval, and issuance layer.
 */

export const REPORT_LIFECYCLE = Object.freeze({
  DRAFT: 'DRAFT',
  DATA_REVIEW: 'DATA_REVIEW',
  READY: 'READY',
  CALCULATED: 'CALCULATED',
  QA_REVIEW: 'QA_REVIEW',
  APPROVED: 'APPROVED',
  REPORTED: 'REPORTED',
  BLOCKED: 'BLOCKED',
  NEEDS_RECALCULATION: 'NEEDS_RECALCULATION',
  SUPERSEDED: 'SUPERSEDED'
});

export class InventoryReport {
  constructor(data) {
    this.report_id = data.report_id;
    this.report_number = data.report_number;
    this.organization_id = data.organization_id;
    this.facility_scope = data.facility_scope; // array
    this.reporting_period = data.reporting_period;
    this.report_type = data.report_type;
    this.report_framework = data.report_framework;
    this.report_framework_version = data.report_framework_version;
    this.report_version = data.report_version;
    this.status = data.status || REPORT_LIFECYCLE.DRAFT;
    this.created_at = data.created_at || new Date().toISOString();
    this.created_by = data.created_by;
    this.approved_at = data.approved_at || null;
    this.approved_by = data.approved_by || null;
    this.supersedes_report_id = data.supersedes_report_id || null;
    
    // Governed references
    this.knowledge_snapshot_ref = data.knowledge_snapshot_ref;
    this.regulatory_snapshot_ref = data.regulatory_snapshot_ref;
    this.calculation_snapshot_refs = data.calculation_snapshot_refs || [];
    this.evidence_package_ref = data.evidence_package_ref;
    this.provenance_ref = data.provenance_ref;
    this.boundary_ref = data.boundary_ref;
  }
}

export class ReportIntent {
  constructor(data) {
    this.purpose = data.purpose;
    this.intended_user = data.intended_user;
    this.organization_id = data.organization_id;
    this.facility_scope = data.facility_scope;
    this.reporting_period = data.reporting_period;
    this.framework = data.framework;
    this.created_at = new Date().toISOString();
  }
}

export class SourceInventory {
  constructor(data) {
    this.source_inventory_id = data.source_inventory_id;
    this.report_id = data.report_id;
    this.included_sources = data.included_sources || []; // array of source refs
    this.excluded_sources = data.excluded_sources || []; // array of Exclusion objects
  }
}

export class Exclusion {
  constructor(data) {
    this.source_id = data.source_id;
    this.reason = data.reason;
    this.basis = data.basis;
    this.evidence_ref = data.evidence_ref;
    this.review_status = data.review_status; // e.g. HEALTHY, REQUIRES_REVIEW
  }
}

export class ReportBoundary {
  constructor(data) {
    this.org_boundary = data.org_boundary; 
    this.op_boundary = data.op_boundary; 
    this.fin_boundary = data.fin_boundary;
    this.rep_boundary = data.rep_boundary;
    this.inv_boundary = data.inv_boundary;
  }
}

export class ReportSection {
  constructor(data) {
    this.section_id = data.section_id;
    this.report_id = data.report_id;
    this.section_type = data.section_type;
    this.title = data.title;
    this.order = data.order;
    this.status = data.status;
    this.metric_refs = data.metric_refs || [];
    this.table_refs = data.table_refs || [];
    this.disclosure_refs = data.disclosure_refs || [];
    this.provenance_refs = data.provenance_refs || [];
  }
}

export class ReportTable {
  constructor(data) {
    this.table_id = data.table_id;
    this.report_id = data.report_id;
    this.section_id = data.section_id;
    this.title = data.title;
    this.columns = data.columns;
    this.rows = data.rows;
    this.units = data.units;
    this.calculation_context = data.calculation_context;
    this.provenance_refs = data.provenance_refs || [];
    this.disclosure_refs = data.disclosure_refs || [];
  }
}

export class ReportMetric {
  constructor(data) {
    this.metric_id = data.metric_id;
    this.metric_type = data.metric_type;
    this.value = data.value;
    this.unit = data.unit;
    this.period = data.period;
    this.facility_id = data.facility_id;
    this.scope = data.scope;
    this.gas = data.gas;
    this.source_result_id = data.source_result_id;
    this.snapshot_id = data.snapshot_id;
    this.provenance_ref = data.provenance_ref;
  }
}

export class ReportDisclosure {
  constructor(data) {
    this.disclosure_id = data.disclosure_id;
    this.type = data.type;
    this.statement = data.statement;
    this.basis = data.basis;
    this.evidence_refs = data.evidence_refs || [];
    this.review_status = data.review_status;
    this.approval_status = data.approval_status;
    this.generated_by = data.generated_by; // Actor reference
  }
}

export class UncertaintyAssessment {
  constructor(data) {
    this.assessment_id = data.assessment_id;
    this.method = data.method;
    this.assumptions = data.assumptions;
    this.limitations = data.limitations;
    this.input_uncertainty = data.input_uncertainty;
    this.result_uncertainty = data.result_uncertainty;
    this.provenance_ref = data.provenance_ref;
  }
}

export class BaseYear {
  constructor(data) {
    this.base_year_id = data.base_year_id;
    this.reference_period = data.reference_period;
    this.selection_basis = data.selection_basis;
    this.inventory_scope = data.inventory_scope;
    this.status = data.status;
  }
}

export class RecalculationStatement {
  constructor(data) {
    this.recalculation_id = data.recalculation_id;
    this.trigger = data.trigger;
    this.reason = data.reason;
    this.affected_period = data.affected_period;
    this.impact = data.impact;
    this.approval_state = data.approval_state;
  }
}

export class AssessmentVerification {
  constructor(data) {
    this.assessment_id = data.assessment_id;
    this.type = data.type; // INTERNAL_ASSESSMENT or INDEPENDENT_VERIFICATION
    this.verifier_id = data.verifier_id;
    this.scope = data.scope;
    this.date = data.date;
    this.finding = data.finding;
    this.statement = data.statement;
    this.status = data.status;
  }
}

export class ReportApproval {
  constructor(data) {
    this.approval_id = data.approval_id;
    this.report_id = data.report_id;
    this.approver_id = data.approver_id;
    this.role = data.role;
    this.decision = data.decision; // APPROVED / REJECTED
    this.timestamp = data.timestamp;
    this.rationale = data.rationale;
  }
}
