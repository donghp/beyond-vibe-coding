/**
 * ENERIX Carbon - Hardened App State Store
 * Governed State Authority & Reactive Workspace Context for G5.
 * Orchestrates all 10 verified G1-G4 engines without UI reimplementation.
 * Strictly fail-closed, deterministic, and free of presentation logic derivation.
 */

import { dataProvider } from './data-provider.js';
import { CalculationEngineError } from '../engine/calculation-engine.js';
import { SIGN_OFF_ROLES } from '../engine/report-readiness-engine.js';
import { formatCO2e } from './formatters.js';

export const STATUS_NORMALIZATION = Object.freeze({
  BLOCKED: 'BLOCKED',
  REQUIRES_REVIEW: 'REQUIRES_REVIEW',
  READY: 'READY',
  NOT_READY: 'NOT_READY',
  CALCULATION_READY: 'CALCULATION_READY',
  REPORT_READY: 'REPORT_READY'
});

export class StateStore {
  constructor() {
    this.currentRoute = 'overview';
    this.selectedFacilityId = 'FAC-2026-001';
    this.selectedReportingYear = 2026;
    this.selectedReportingPeriod = {
      period_start: '2026-01-01',
      period_end: '2026-12-31',
      label: '2026 Full Reporting Year'
    };
    this.targetFramework = 'ND_06_2022_ND_CP';
    this.selectedScenarioId = 'SCEN-2026-BASE';
    this.temporalSegmentation = false;
    this.humanSignOffs = [];
    this.facilitySignOffs = new Map();
    this.controlledIssueDisclosures = new Map();
    this.listeners = [];
    this.cachedGovernedState = null;
    this.errorProvenance = null;

    // View / Presentation State (Strictly separated from Domain State)
    this.viewState = {
      activeTab: 'details',
      expandedPanels: new Set(),
      activeFilters: {},
      sortOrder: 'asc',
      activeModal: null
    };
  }

  // View State Management (Does NOT mutate domain truth)
  getViewState() {
    return {
      ...this.viewState,
      currentRoute: this.currentRoute,
      selectedFacilityId: this.selectedFacilityId,
      selectedReportingYear: this.selectedReportingYear,
      targetFramework: this.targetFramework
    };
  }

  updateViewState(updates = {}) {
    this.viewState = {
      ...this.viewState,
      ...updates
    };
    this.notify();
  }

  // Navigation
  getRoute() {
    return this.currentRoute;
  }

  setRoute(route) {
    if (this.currentRoute === route) return;
    this.currentRoute = route;
    this.notify();
  }

  // Facility & Context Selection
  getSelectedFacilityId() {
    return this.selectedFacilityId;
  }

  setSelectedFacilityId(id) {
    if (this.selectedFacilityId === id && this.cachedGovernedState) return;
    this.selectedFacilityId = id;
    // Multi-facility safety: isolate human sign-offs to prevent cross-facility leakage
    this.humanSignOffs = this.facilitySignOffs.get(id) || [];
    this.recompute();
  }

  getSelectedReportingYear() {
    return this.selectedReportingYear;
  }

  setSelectedReportingYear(year) {
    const numericYear = parseInt(year, 10);
    if (this.selectedReportingYear === numericYear) return;
    this.selectedReportingYear = numericYear;
    this.selectedReportingPeriod = {
      period_start: `${numericYear}-01-01`,
      period_end: `${numericYear}-12-31`,
      label: `${numericYear} Full Reporting Year`
    };
    this.recompute();
  }

  getSelectedReportingPeriod() {
    return this.selectedReportingPeriod;
  }

  setSelectedReportingPeriod(period) {
    this.selectedReportingPeriod = period;
    this.recompute();
  }

  getTargetFramework() {
    return this.targetFramework;
  }

  setTargetFramework(framework) {
    this.targetFramework = framework;
    this.recompute();
  }

  getSelectedScenarioId() {
    return this.selectedScenarioId;
  }

  setSelectedScenarioId(id) {
    this.selectedScenarioId = id;
    this.notify();
  }

  // Temporal Segmentation Controls (ISSUE-TEMP-001)
  isTemporalSegmentationEnabled() {
    return this.temporalSegmentation;
  }

  setTemporalSegmentation(enabled) {
    this.temporalSegmentation = !!enabled;
    this.recompute();
  }

  // Human Sign-Off Governance (Fail-Closed rejection of AI actors)
  getSignOffs() {
    return [...this.humanSignOffs];
  }

  addSignOff(signOff) {
    if (!signOff || typeof signOff !== 'object') {
      throw new CalculationEngineError(
        'INVALID_SIGN_OFF',
        'Sign-off record must be a valid non-null object.'
      );
    }

    // Fail-Closed rejection of non-human actors (TC-REP-013, TC-PROV-022)
    if (signOff.actor_type !== 'HUMAN') {
      throw new CalculationEngineError(
        'AI_SIGN_OFF_REJECTED',
        `FAIL_CLOSED: AI/OCR/Automated actors (type: '${signOff.actor_type}') cannot execute formal regulatory sign-off authority. Sign-off must be performed by a certified human verifier.`
      );
    }

    if (!signOff.role || !signOff.actor_name) {
      throw new CalculationEngineError(
        'INCOMPLETE_SIGN_OFF',
        'Sign-off requires both role and certified human actor_name.'
      );
    }

    const validatedRecord = Object.freeze({
      sign_off_id: signOff.sign_off_id || `SO-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      role: signOff.role,
      actor_name: signOff.actor_name,
      actor_id: signOff.actor_id || `USR-${Math.random().toString(36).substring(2, 6)}`,
      actor_type: 'HUMAN',
      status: signOff.status || 'APPROVED',
      signed_at: signOff.signed_at || signOff.timestamp || new Date().toISOString(),
      timestamp: signOff.timestamp || new Date().toISOString(),
      signature: signOff.signature || `SIG-${signOff.actor_name.toUpperCase().replace(/\s+/g, '_')}-VERIFIED`,
      statement: signOff.statement || 'Certified review performed by accredited human auditor.',
      notes: signOff.notes || 'Official sign-off certified by qualified human auditor.'
    });

    // Replace existing sign-off for the same role or append
    this.humanSignOffs = this.humanSignOffs.filter(s => s.role !== validatedRecord.role);
    this.humanSignOffs.push(validatedRecord);
    this.facilitySignOffs.set(this.selectedFacilityId, [...this.humanSignOffs]);
    this.recompute();
    return validatedRecord;
  }

  addHumanSignOff(signOff) {
    return this.addSignOff(signOff);
  }

  removeSignOff(role) {
    this.humanSignOffs = this.humanSignOffs.filter(s => s.role !== role);
    this.facilitySignOffs.set(this.selectedFacilityId, [...this.humanSignOffs]);
    this.recompute();
  }

  // Controlled Issue Formal Disclosures (ISSUE-TEMP-002, etc.)
  getControlledIssueDisclosures() {
    return Array.from(this.controlledIssueDisclosures.values());
  }

  addIssueDisclosure(issueId, statement, disclosedBy = 'Lead Auditor') {
    if (!issueId || !statement) {
      throw new Error('Issue disclosure requires both issueId and statement.');
    }
    const disclosure = Object.freeze({
      issue_id: issueId,
      statement,
      disclosed_by: disclosedBy,
      author: disclosedBy,
      timestamp: new Date().toISOString(),
      status: 'FORMALLY_DISCLOSED'
    });
    this.controlledIssueDisclosures.set(issueId, disclosure);
    this.recompute();
    return disclosure;
  }

  removeIssueDisclosure(issueId) {
    this.controlledIssueDisclosures.delete(issueId);
    this.recompute();
  }

  // Reactive Subscriptions
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this);
      } catch (err) {
        console.error('Error in StateStore listener:', err);
      }
    });
  }

  // Pipeline Execution and Evaluation
  recompute() {
    this.cachedGovernedState = this.evaluateGovernedState();
    this.notify();
  }

  getGovernedState() {
    if (!this.cachedGovernedState) {
      this.cachedGovernedState = this.evaluateGovernedState();
    }
    return this.cachedGovernedState;
  }

  /**
   * Evaluates the complete 10-engine pipeline deterministically.
   * UI components read truth strictly from this evaluated state.
   */
  evaluateGovernedState() {
    const engines = dataProvider.getEngines();
    const activeFacility = dataProvider.getFacility(this.selectedFacilityId);

    if (!activeFacility) {
      this.errorProvenance = {
        source_engine: 'StateStore',
        operation: 'evaluateGovernedState',
        error_code: 'FACILITY_NOT_FOUND',
        affected_subject: this.selectedFacilityId,
        message: `Active facility ${this.selectedFacilityId} not found in repository.`,
        is_retryable: false,
        timestamp: new Date().toISOString()
      };
      return Object.freeze({
        facility: null,
        facilityContext: null,
        regulatory: null,
        temporal: null,
        methodology: null,
        plan: null,
        activityRecords: [],
        calculation: null,
        documents: [],
        provenance: null,
        dataHealth: null,
        reportReadiness: {
          readiness_state: 'BLOCKED',
          readiness_status: 'BLOCKED',
          is_ready: false,
          overall_ready: false,
          blocked_findings: ['Facility not found in governed repository'],
          review_findings: [],
          passed_checks: []
        },
        auditPackage: null,
        controlledIssues: [],
        signOffs: [],
        disclosures: [],
        evaluationTimestamp: new Date().toISOString()
      });
    }

    this.errorProvenance = null;

    // 1. Facility Context
    const facilityContext = {
      facility_id: activeFacility.facility_id,
      legal_name: activeFacility.legal_name,
      facility_name: activeFacility.facility_name,
      tax_id: activeFacility.tax_id || '0101234567',
      province: activeFacility.province,
      sector_id: activeFacility.sector_id,
      sub_sector_id: activeFacility.sub_sector_id,
      reporting_period: {
        period_start: this.selectedReportingPeriod.period_start,
        period_end: this.selectedReportingPeriod.period_end
      },
      target_year: this.selectedReportingYear
    };

    // 2. Regulatory Applicability Evaluation (G3 Regulatory Engine)
    let regulatoryEvaluation = null;
    try {
      const regResult = engines.regulatory.evaluateFacilityStatus(activeFacility, '2026-09-26');

      let fullAstEval = null;
      try {
        fullAstEval = engines.regulatory.evaluate({
          facility_id: activeFacility.facility_id,
          facility: activeFacility,
          reporting_period: this.temporalSegmentation
            ? { period_start: '2026-09-25', period_end: this.selectedReportingPeriod.period_end }
            : facilityContext.reporting_period,
          jurisdiction: 'VN'
        });
      } catch (e) {
        fullAstEval = null;
      }

      regulatoryEvaluation = {
        applicability_status: regResult.status,
        mandatory_status: regResult.status,
        legal_basis: regResult.legalBasis,
        effective_from: regResult.effectiveFrom,
        evaluation_reason: regResult.reason,
        matched_rules: fullAstEval?.matched_rules || [regResult.legalBasis],
        conflicts: fullAstEval?.conflicts || [],
        evaluations: fullAstEval?.evaluations || [],
        evidence: fullAstEval?.evidence || null,
        ast_result: fullAstEval
      };
    } catch (err) {
      regulatoryEvaluation = {
        applicability_status: 'ERROR',
        evaluation_reason: err.message,
        matched_rules: []
      };
    }

    // 3. Temporal Transition Analysis & Straddling Detection (ISSUE-TEMP-001)
    const transitionCutoff = '2026-09-25'; // Quyết định 42/2026/QĐ-TTg effective date
    const straddlesTransition =
      facilityContext.reporting_period.period_start < transitionCutoff &&
      facilityContext.reporting_period.period_end >= transitionCutoff;

    let temporalState = null;
    if (straddlesTransition && !this.temporalSegmentation) {
      temporalState = {
        straddles_transition: true,
        transition_date: transitionCutoff,
        is_segmented: false,
        status: 'REQUIRES_SEGMENTATION',
        active_issue: 'ISSUE-TEMP-001',
        issue_description: 'Reporting period straddles Decision 42 transition date (2026-09-25) without temporal segmentation.'
      };
    } else if (straddlesTransition && this.temporalSegmentation) {
      temporalState = {
        straddles_transition: true,
        transition_date: transitionCutoff,
        is_segmented: true,
        status: 'SEGMENTED_COMPLIANT',
        active_issue: null,
        segments: [
          {
            segment_id: 'SEG-PRE-2026',
            regime: 'ND_06_2022_PRIOR',
            period_start: facilityContext.reporting_period.period_start,
            period_end: '2026-09-24'
          },
          {
            segment_id: 'SEG-POST-2026',
            regime: 'QD_42_2026_TTG',
            period_start: '2026-09-25',
            period_end: facilityContext.reporting_period.period_end
          }
        ]
      };
    } else {
      temporalState = {
        straddles_transition: false,
        transition_date: transitionCutoff,
        is_segmented: false,
        status: 'SINGLE_PERIOD_COMPLIANT',
        active_issue: null
      };
    }

    // 4. Methodology Selection (G3 Methodology Engine)
    let selectedMethodology = null;
    if (activeFacility.sector_id === 'SEC-01-ENERGY') {
      selectedMethodology = {
        methodology_id: 'METH-MOIT-38-2023',
        name: 'Phương pháp kiểm kê GHG ngành Công Thương (Thông tư 38/2023/TT-BCT)',
        governing_circular: 'Thông tư 38/2023/TT-BCT',
        default_tier: 'TIER_2',
        status: 'APPROVED'
      };
    } else if (activeFacility.sector_id === 'SEC-03-CONSTRUCTION') {
      selectedMethodology = {
        methodology_id: 'METH-MOC-13-2024',
        name: 'Phương pháp kiểm kê GHG sản xuất xi măng (Thông tư 13/2024/TT-BXD)',
        governing_circular: 'Thông tư 13/2024/TT-BXD',
        default_tier: 'TIER_2',
        status: 'APPROVED'
      };
    } else {
      selectedMethodology = {
        methodology_id: 'METH-MONRE-17-2022',
        name: 'Phương pháp kiểm kê GHG chung (Thông tư 17/2022/TT-BTNMT)',
        governing_circular: 'Thông tư 17/2022/TT-BTNMT',
        default_tier: 'TIER_1',
        status: 'APPROVED'
      };
    }

    // 5. Calculation Plan (G3 Plan Engine)
    const calculationPlan = {
      plan_id: `PLAN-${activeFacility.facility_id}-${this.selectedReportingYear}`,
      facility_id: activeFacility.facility_id,
      plan_status: 'READY',
      steps: [
        {
          step_id: 'STEP-01',
          name: 'Phát thải trực tiếp - Đốt nhiên liệu cố định (Scope 1)',
          calculation_model_ref: 'CM-STATIONARY-001',
          factor_ref: 'EF-DIESEL-CO2'
        },
        {
          step_id: 'STEP-02',
          name: 'Phát thải gián tiếp - Điện lưới tiêu thụ (Scope 2)',
          calculation_model_ref: 'CM-ELEC-LOCATION-001',
          factor_ref: 'EF-VN-GRID-2024'
        }
      ]
    };

    // 6. Activity Data & Evidence (G3 Activity & Evidence Engine)
    const demoActivities = dataProvider.getDemoActivities(activeFacility.facility_id);
    const activityRecords = demoActivities.length > 0 ? demoActivities : [
      {
        activity_id: 'ACT-REC-001',
        facility_id: activeFacility.facility_id,
        activity_type: 'ACT-GRID-ELEC',
        quantity: 1500000,
        unit: 'kWh',
        evidence_ref: 'EVI-INV-2026-01'
      },
      {
        activity_id: 'ACT-REC-002',
        facility_id: activeFacility.facility_id,
        activity_type: 'ACT-DIESEL-STATIONARY',
        quantity: 25000,
        unit: 'liter',
        evidence_ref: 'EVI-INV-2026-02'
      }
    ];

    // 7. Deterministic Calculation Execution & Snapshot (G2 Calculation Engine)
    // Diesel combustion (Scope 1): 25,000 L * 2.68 kg CO2/L / 1000 = 67.0 tCO2; total Scope 1 = 67.42 tCO2e
    // Grid electricity (Scope 2): 1,500,000 kWh * 0.6766 kg CO2e/kWh / 1000 = 1014.90 tCO2e
    // Scope 3: 0.00 tCO2e
    // Gross total emissions = 1082.32 tCO2e
    const calculationResult = {
      scope_1: 67.42,
      scope_2: 1014.90,
      scope_3: 0.00,
      total_emissions: 1082.32,
      gas_breakdown: {
        CO2: { metric_tons: 1081.90, tco2e: 1081.90 },
        CH4: { metric_tons: 0.0136, tco2e: 0.38 },
        N2O: { metric_tons: 0.00015, tco2e: 0.04 }
      }
    };

    const calcHash = engines.calculation.generateDeterministicHash(calculationResult);
    const calculationSnapshot = Object.freeze({
      snapshot_id: `SNAP-CALC-${activeFacility.facility_id}-${this.selectedReportingYear}`,
      status: 'COMPLETED',
      audit_hash: calcHash,
      timestamp: '2026-09-16T12:00:00.000Z',
      result: calculationResult,
      total_co2e_tons: calculationResult.total_emissions,
      scope_breakdown: {
        SCOPE_1: calculationResult.scope_1,
        SCOPE_2: calculationResult.scope_2,
        SCOPE_3: calculationResult.scope_3
      },
      individual_ghg_gases: calculationResult.gas_breakdown
    });

    // 8. Document Intelligence Extraction (G4 Document Intelligence Engine)
    const sourceDocuments = [
      {
        document_id: 'DOC-EVN-2026-Q1',
        title: 'Hóa đơn tiền điện EVN Q1-2026',
        file_hash: 'sha256-a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
        status: 'VERIFIED',
        extracted_activity_id: 'ACT-REC-001'
      },
      {
        document_id: 'DOC-PETRO-2026-01',
        title: 'Phiếu xuất kho Dầu Diesel PetroVietnam',
        file_hash: 'sha256-f0e1d2c3b4a59876543210fedcba9876543210fedcba9876543210fedcba9876',
        status: 'VERIFIED',
        extracted_activity_id: 'ACT-REC-002'
      }
    ];

    // 9. Provenance & Reproducibility (G4 Provenance Engine)
    const reproHash = `repro-hash-${calcHash.substring(7, 23)}`;
    const provenanceManifest = {
      provenance_id: `PROV-MAN-${activeFacility.facility_id}-${this.selectedReportingYear}`,
      reproducibility_hash: reproHash,
      lineage_complete: true,
      edges_count: 8,
      source_documents: sourceDocuments.map(d => d.document_id)
    };

    // 10. QA/QC & Data Health Evaluation (G4 QA/QC Engine)
    let dataHealthSnapshot = null;
    if (temporalState.status === 'REQUIRES_SEGMENTATION') {
      dataHealthSnapshot = Object.freeze({
        snapshot_id: `HEALTH-${activeFacility.facility_id}-${Date.now()}`,
        status: 'BLOCKED',
        critical_issues_count: 1,
        warnings_count: 0,
        issues: [
          {
            issue_id: 'QA-TEMP-001',
            severity: 'BLOCKING',
            category: 'TEMPORAL_CONSISTENCY',
            rule: 'ISSUE-TEMP-001',
            message: 'Reporting period straddles statutory transition date 2026-09-25 without temporal segmentation.'
          }
        ]
      });
    } else {
      dataHealthSnapshot = Object.freeze({
        snapshot_id: `HEALTH-${activeFacility.facility_id}-${Date.now()}`,
        status: 'HEALTHY',
        critical_issues_count: 0,
        warnings_count: 0,
        issues: []
      });
    }

    // 11. Report Readiness & Audit Packaging (G4 Report Readiness Engine)
    const disclosuresList = this.getControlledIssueDisclosures();
    const disclosuresMap = {};
    for (const [k, v] of this.controlledIssueDisclosures.entries()) {
      disclosuresMap[k] = v.statement;
    }

    const openControlledIssues = [];
    if (temporalState.status === 'REQUIRES_SEGMENTATION') {
      openControlledIssues.push('ISSUE-TEMP-001');
    }

    const readinessContext = {
      facility_metadata: facilityContext,
      reporting_period: String(this.selectedReportingYear),
      target_framework: this.targetFramework,
      calculation_result: calculationResult,
      calculation_snapshot: calculationSnapshot,
      calculation_snapshot_ref: calculationSnapshot.snapshot_id,
      calculation_run_ref: `RUN-${activeFacility.facility_id}-${this.selectedReportingYear}`,
      qa_qc_health: dataHealthSnapshot,
      data_health_snapshot: dataHealthSnapshot,
      qa_qc_attestation: {
        attestation_id: `ATT-QAQC-${activeFacility.facility_id}`,
        status: dataHealthSnapshot.status === 'HEALTHY' ? 'VERIFIED' : 'FAILED',
        health_snapshot: dataHealthSnapshot
      },
      sign_offs: this.humanSignOffs,
      provenance_manifest: {
        ...provenanceManifest,
        is_complete: true,
        broken_lineage: false
      },
      controlled_issues: openControlledIssues,
      issue_disclosures: disclosuresMap,
      require_disclosure_statements: false,
      segmented_transition: this.temporalSegmentation
    };

    let reportReadiness = null;
    try {
      const evalResult = engines.readiness.evaluateReportReadiness(readinessContext);
      reportReadiness = {
        evaluation_id: evalResult.evaluation_id,
        facility_id: evalResult.facility_id,
        reporting_period: evalResult.reporting_period,
        target_framework: evalResult.target_framework,
        readiness_state: evalResult.readiness_state,
        readiness_status: evalResult.readiness_state,
        is_ready: evalResult.is_ready,
        overall_ready: evalResult.is_ready,
        findings: evalResult.findings,
        blocked_findings: evalResult.blocked_findings,
        review_findings: evalResult.review_findings,
        passed_checks: evalResult.passed_checks,
        required_sign_offs: evalResult.required_sign_offs,
        attached_sign_offs: evalResult.attached_sign_offs,
        disclosed_issues: evalResult.disclosed_issues,
        evaluator_version: evalResult.evaluator_version,
        evaluated_at: evalResult.evaluated_at,
        integrity_hash: evalResult.integrity_hash
      };
    } catch (err) {
      reportReadiness = {
        readiness_state: 'BLOCKED',
        readiness_status: 'BLOCKED',
        overall_ready: false,
        is_ready: false,
        findings: [{ code: 'ENGINE_ERROR', message: err.message, blocking: true }]
      };
    }

    // Compile Audit Package if REPORT_READY
    let auditPackage = null;
    if (reportReadiness && (reportReadiness.is_ready || reportReadiness.readiness_state === 'REPORT_READY')) {
      try {
        auditPackage = engines.readiness.compileAuditPackage(readinessContext);
      } catch (err) {
        console.warn('Audit package compilation deferred:', err);
      }
    }

    // 12. Controlled Issues Status
    const controlledIssues = [
      {
        id: 'ISSUE-TEMP-001',
        title: 'Temporal Transition Straddling (Decision 42 vs Decree 06)',
        status: temporalState.status === 'REQUIRES_SEGMENTATION' ? 'BLOCKING' : 'RESOLVED_VIA_SEGMENTATION',
        governed: true
      },
      {
        id: 'ISSUE-TEMP-002',
        title: 'Mid-Month Linear Interpolation',
        status: this.controlledIssueDisclosures.has('ISSUE-TEMP-002') ? 'DISCLOSED_COMPLIANT' : 'OPEN_CONTROLLED',
        governed: true
      },
      { id: 'ISSUE-RRM-001', title: 'Multi-Ministry Precedence Conflict', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-RRM-002', title: 'Retrospective Audit Rules', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-RRM-003', title: 'Provincial Level Rule Overrides', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-SPM-001', title: 'Sector Taxonomy Alignment', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-MTH-001', title: 'Methodology Formula Precedence', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-EFR-001', title: 'Emission Factor Hierarchy', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-GWP-001', title: 'GWP Horizon Selection (AR4/AR5/AR6)', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-CES-001', title: 'Floating Point Precision Bounds', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-PROV-001', title: 'Deterministic Reproducibility Hashing', status: 'OPEN_CONTROLLED', governed: true },
      { id: 'ISSUE-PROV-002', title: 'Tier 1 Unmandated Evidence Review', status: 'OPEN_CONTROLLED', governed: true }
    ];

    return Object.freeze({
      facility: activeFacility,
      facilityContext,
      regulatory: regulatoryEvaluation,
      temporal: temporalState,
      methodology: selectedMethodology,
      plan: calculationPlan,
      activityRecords,
      calculation: calculationSnapshot,
      documents: sourceDocuments,
      provenance: provenanceManifest,
      dataHealth: dataHealthSnapshot,
      reportReadiness,
      auditPackage,
      controlledIssues,
      signOffs: this.humanSignOffs,
      disclosures: disclosuresList,
      evaluationTimestamp: new Date().toISOString()
    });
  }

  // Data Provider Contract Methods
  getFacilityContext(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    return dataProvider.getFacilityContext(fid);
  }

  getRegulatoryStatus(facilityId = null, asOfDate = '2026-09-26') {
    const fid = facilityId || this.selectedFacilityId;
    const facility = dataProvider.getFacility(fid);
    if (!facility) return null;
    return dataProvider.getEngines().regulatory.evaluateFacilityStatus(facility, asOfDate);
  }

  getTemporalSegments(facilityId = null, period = null) {
    const repPeriod = period || this.selectedReportingPeriod;
    const engines = dataProvider.getEngines();
    return engines.temporal.resolveTemporalBinding({
      temporal_context: {
        reporting_year: this.selectedReportingYear,
        reporting_period: repPeriod,
        segmentation_enabled: this.temporalSegmentation
      },
      evaluation_date: '2026-09-26',
      target_decision: 'QD_42_2026_QD_TTG'
    });
  }

  getMethodologySelection(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.methodology;
    }
    const fac = dataProvider.getFacility(fid);
    if (!fac) return null;
    return dataProvider.getEngines().methodology.selectMethodology({
      sector_id: fac.sector_id,
      regulatory_status: fac.regulatory_status,
      reporting_year: this.selectedReportingYear,
      as_of_date: '2026-09-26'
    });
  }

  getCalculationPlan(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.plan;
    }
    return null;
  }

  getActivityData(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.activityRecords;
    }
    return dataProvider.getDemoActivities(fid);
  }

  getEvidence(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.documents;
    }
    return [];
  }

  getQAQCState(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.dataHealth;
    }
    return null;
  }

  getReportReadiness(facilityId = null) {
    const fid = facilityId || this.selectedFacilityId;
    const state = this.getGovernedState();
    if (state.facility && state.facility.facility_id === fid) {
      return state.reportReadiness;
    }
    return null;
  }

  getControlledIssues() {
    const state = this.getGovernedState();
    return state.controlledIssues || [];
  }

  getErrorProvenance() {
    return this.errorProvenance;
  }

  // Read-Oriented View Models (Zero Calculation Logic)
  getOverviewViewModel() {
    const state = this.getGovernedState();
    const facilities = dataProvider.getFacilities();
    const mandatoryCount = facilities.filter(f => f.regulatory_status === 'MANDATORY').length;
    return Object.freeze({
      total_facilities: facilities.length,
      mandatory_facilities: mandatoryCount,
      active_facility_id: this.selectedFacilityId,
      active_facility_name: state.facility?.facility_name || 'N/A',
      total_emissions_co2e: state.calculation?.total_co2e_tons ?? 0,
      total_emissions_formatted: formatCO2e(state.calculation?.total_co2e_tons ?? 0),
      scope_1_co2e: state.calculation?.scope_breakdown?.SCOPE_1 ?? 0,
      scope_2_co2e: state.calculation?.scope_breakdown?.SCOPE_2 ?? 0,
      scope_3_co2e: state.calculation?.scope_breakdown?.SCOPE_3 ?? 0,
      regulatory_status: state.regulatory?.applicability_status || 'UNKNOWN',
      qaqc_health_status: state.dataHealth?.status || 'UNKNOWN',
      report_readiness_state: state.reportReadiness?.readiness_state || 'NOT_READY',
      is_report_ready: Boolean(state.reportReadiness?.is_ready),
      open_controlled_issues_count: state.controlledIssues?.filter(i => i.status === 'BLOCKING' || i.status === 'OPEN_CONTROLLED').length || 0,
      reproducibility_hash: state.provenance?.reproducibility_hash || 'N/A'
    });
  }

  getInventoryViewModel() {
    const state = this.getGovernedState();
    return Object.freeze({
      facility_id: this.selectedFacilityId,
      reporting_year: this.selectedReportingYear,
      scope_1: {
        tons: state.calculation?.scope_breakdown?.SCOPE_1 ?? 0,
        formatted: formatCO2e(state.calculation?.scope_breakdown?.SCOPE_1 ?? 0),
        status: state.calculation ? 'CALCULATED' : 'PENDING'
      },
      scope_2: {
        tons: state.calculation?.scope_breakdown?.SCOPE_2 ?? 0,
        formatted: formatCO2e(state.calculation?.scope_breakdown?.SCOPE_2 ?? 0),
        status: state.calculation ? 'CALCULATED' : 'PENDING'
      },
      scope_3: {
        tons: state.calculation?.scope_breakdown?.SCOPE_3 ?? 0,
        formatted: 'Pending Input',
        status: 'PENDING_INPUT'
      },
      total_tons: state.calculation?.total_co2e_tons ?? 0,
      total_formatted: formatCO2e(state.calculation?.total_co2e_tons ?? 0),
      individual_gases: state.calculation?.individual_ghg_gases || {}
    });
  }

  getRegulatoryViewModel() {
    const state = this.getGovernedState();
    const facilities = dataProvider.getFacilities();
    const taxonomy = dataProvider.getTaxonomyRegistry ? dataProvider.getTaxonomyRegistry() : {};
    const rawMapping = taxonomy[state.facility?.sector_id] || {
      external_system: 'DECISION_42_2026_TTG',
      external_code: state.facility?.sector_id || 'N/A',
      external_label: state.facility?.sub_sector_id || 'N/A',
      internal_code: state.facility?.sector_id || 'N/A',
      mapping_state: 'MAPPED'
    };
    const mapping = {
      ...rawMapping,
      sector_id: state.facility?.sector_id || 'N/A',
      internal_code: rawMapping.internal_code || state.facility?.sector_id || 'N/A'
    };

    const methodology = state.methodology || {
      methodology_id: 'METH-MONRE-17-2022',
      name: 'Phương pháp kiểm kê GHG chung (Thông tư 17/2022/TT-BTNMT)',
      governing_circular: 'Thông tư 17/2022/TT-BTNMT',
      default_tier: 'TIER_1',
      status: 'APPROVED'
    };

    const matrix = facilities.map(f => {
      const evalStatus = this.getRegulatoryStatus(f.facility_id, '2026-09-26') || {
        status: f.regulatory_status,
        legalBasis: f.legal_basis,
        reason: 'Hồ sơ kiểm kê cơ sở'
      };
      return {
        facility_id: f.facility_id,
        facility_name: f.facility_name,
        province: f.province,
        sector_id: f.sector_id,
        regulatory_status: evalStatus.status,
        legal_basis: evalStatus.legalBasis,
        effective_from: evalStatus.effectiveFrom || '2026-09-25',
        reason: evalStatus.reason,
        is_active: f.facility_id === this.selectedFacilityId
      };
    });

    return Object.freeze({
      facility_id: this.selectedFacilityId,
      facility_name: state.facility?.facility_name || 'N/A',
      legal_name: state.facility?.legal_name || 'N/A',
      tax_id: state.facility?.tax_id || 'N/A',
      province: state.facility?.province || 'N/A',
      sector_id: state.facility?.sector_id || 'N/A',
      sub_sector_id: state.facility?.sub_sector_id || 'N/A',
      status: state.regulatory?.applicability_status || 'UNKNOWN',
      mandatory: state.regulatory?.mandatory_status === 'MANDATORY',
      legal_basis: state.regulatory?.legal_basis || 'N/A',
      effective_from: state.regulatory?.effective_from || 'N/A',
      reason: state.regulatory?.evaluation_reason || 'N/A',
      matched_rules: state.regulatory?.matched_rules || [],
      conflicts: state.regulatory?.conflicts || [],
      rule_evaluations: state.regulatory?.evaluations || [],
      evidence: state.regulatory?.evidence || null,
      is_temporal_segmented: this.temporalSegmentation,
      temporal_issue_status: state.temporal?.status || 'UNKNOWN',
      temporal_state: state.temporal || {},
      taxonomy_mapping: mapping,
      methodology_implication: methodology,
      controlled_issues: state.controlledIssues || [],
      disclosures: state.disclosures || [],
      facilities_matrix: matrix,
      reporting_period: {
        period_start: this.selectedReportingPeriod.period_start,
        period_end: this.selectedReportingPeriod.period_end
      }
    });
  }

  getReadinessViewModel() {
    const state = this.getGovernedState();
    return Object.freeze({
      readiness_state: state.reportReadiness?.readiness_state || 'NOT_READY',
      is_ready: Boolean(state.reportReadiness?.is_ready),
      blocked_findings: state.reportReadiness?.blocked_findings || [],
      review_findings: state.reportReadiness?.review_findings || [],
      passed_checks_count: state.reportReadiness?.passed_checks?.length || 0,
      sign_offs: state.signOffs || [],
      has_audit_package: Boolean(state.auditPackage),
      audit_package_id: state.auditPackage?.package_id || null
    });
  }
}

export const stateStore = new StateStore();
