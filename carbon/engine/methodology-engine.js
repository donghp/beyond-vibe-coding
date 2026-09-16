/**
 * ENERIX Carbon - Methodology Selection Engine
 * Operationalizes EC-MTH-001, resolving applicable methodologies and calculation model bindings
 * without executing mathematical/emissions calculations.
 */

import { isValidDateString } from './temporal-engine.js';
import { TAXONOMY_REGISTRY } from './regulatory-engine.js';

// Controlled Issue Register (Section 21 of User Request #0018)
export const CONTROLLED_ISSUES = {
  "ISSUE-MTH-001": {
    id: "ISSUE-MTH-001",
    domain: "Cogeneration Formula Overlap",
    description: "Calculation overlap for industrial steam allocation between MOIT and MOC circular formulas remains unaligned.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-MTH-002": {
    id: "ISSUE-MTH-002",
    domain: "Tier 3 Laboratory Certification",
    description: "Accreditation standards for local facility-level coal LHV testing laboratories are inconsistent.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-MTH-003": {
    id: "ISSUE-MTH-003",
    domain: "Carbon Capture (CCUS) accounting",
    description: "Standardized methodologies for carbon sequestration under national reporting frameworks are currently missing.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-TEMP-001": { id: "ISSUE-TEMP-001", domain: "Temporal Boundaries", description: "Standard transition boundaries verification.", status: "OPEN_CONTROLLED" },
  "ISSUE-TEMP-002": { id: "ISSUE-TEMP-002", domain: "Mid-Month Transition Auditing", description: "Splitting activity data for mid-month billing where raw meter readings are unavailable.", status: "OPEN_CONTROLLED" },
  "ISSUE-TEMP-003": { id: "ISSUE-TEMP-003", domain: "Retrospective Circular Mandates", description: "Retroactive legal application dates in late-issued circulars.", status: "OPEN_CONTROLLED" },
  "ISSUE-SPM-001": { id: "ISSUE-SPM-001", domain: "Sector Profiles", description: "Mapping alignment verification.", status: "OPEN_CONTROLLED" },
  "ISSUE-SPM-002": { id: "ISSUE-SPM-002", domain: "Sector Profiles Versioning", description: "Sector profile version transition verification.", status: "OPEN_CONTROLLED" },
  "ISSUE-SPM-003": { id: "ISSUE-SPM-003", domain: "Multi-sector Facility Context", description: "Resolution of dual-use facilities.", status: "OPEN_CONTROLLED" },
  "ISSUE-RRM-001": { id: "ISSUE-RRM-001", domain: "Multi-Ministry Precedence Conflict", description: "Precedence between MOC Circular 13 and MONRE Circular 17 for dual-use heat plants is ambiguous.", status: "OPEN_CONTROLLED" },
  "ISSUE-RRM-002": { id: "ISSUE-RRM-002", domain: "Retrospective Audit Rules", description: "Retroactive compliance evaluation procedures for historical runs.", status: "OPEN_CONTROLLED" },
  "ISSUE-RRM-003": { id: "ISSUE-RRM-003", domain: "provincial-level Rule overrides", description: "provincial-level threshold additions.", status: "OPEN_CONTROLLED" },
  "ISSUE-EFR-001": { id: "ISSUE-EFR-001", domain: "Emission Factors", description: "Missing MONRE regional factor updates.", status: "OPEN_CONTROLLED" },
  "ISSUE-GWP-001": { id: "ISSUE-GWP-001", domain: "GWP Datasets", description: "Preservation of IPCC standards transitions.", status: "OPEN_CONTROLLED" }
};

// Governed Methodology Registry (Section 5, 6, 7, 8, 9, 13, 14, 18)
export const GOVERNED_METHODOLOGIES = [
  {
    methodology_id: "METH-BCT-38-2023",
    methodology_version: "1.0.0",
    name: "Phương pháp MRV ngành Công Thương (Thông tư 38/2023/TT-BCT)",
    description: "Phương pháp luận chi tiết phục vụ kiểm kê khí nhà kính và MRV ngành năng lượng, công nghiệp thương mại.",
    status: "ACTIVE",
    authority_class: "TIER_A",
    jurisdiction: "VN",
    source_refs: ["Circular-38-2023-TT-BCT"],
    effective_from: "2023-12-01",
    effective_to: null,
    supersedes: null,
    superseded_by: null,
    sector_binding: "SEC-01-ENERGY",
    steps: [
      { step_number: 1, step_name: "Xác định ranh giới phát thải", step_class: "DEFINE_BOUNDARIES" },
      { step_number: 2, step_name: "Xác định nguồn phát thải", step_class: "IDENTIFY_SOURCES" },
      { step_number: 3, step_name: "Thu thập số liệu hoạt động", step_class: "COLLECT_DATA" },
      { step_number: 4, step_name: "Chuẩn hóa đơn vị đo lường", step_class: "NORMALIZE_DATA" },
      { step_number: 5, step_name: "Lựa chọn phương pháp luận (Tiers)", step_class: "SELECT_TIER" },
      { step_number: 6, step_name: "Liên kết Mô hình Tính toán (MODEL-02)", step_class: "BIND_MODEL" },
      { step_number: 7, step_name: "Áp dụng hệ số phát thải", step_class: "APPLY_EF" },
      { step_number: 8, step_name: "Chuyển đổi hệ số GWP (IPCC-AR5)", step_class: "APPLY_GWP" },
      { step_number: 9, step_name: "Kiểm tra chất lượng QA/QC", step_class: "QA_QC" },
      { step_number: 10, step_name: "Biên soạn báo cáo tuân thủ", step_class: "REPORTING" }
    ],
    source_requirements: [
      { source_class: "stationary_combustion", required_status: "MANDATORY" }
    ],
    activity_requirements: [
      {
        activity_identifier: "ACT-COAL",
        data_type: "Numeric",
        unit: "t",
        required_status: "MANDATORY",
        evidence_requirements: [
          { evidence_class: "fuel_invoice", required_status: "MANDATORY" }
        ]
      }
    ],
    gas_coverage: [
      { gas_species: "CO2", required_status: "MANDATORY" },
      { gas_species: "CH4", required_status: "MANDATORY" }
    ],
    parameter_requirements: [
      { parameter_id: "PAR-NCV", unit: "TJ/kt", type: "NCV", required_status: "MANDATORY" }
    ],
    ef_binding_contract: {
      ef_type: "stationary_coal_ef",
      enforcement_level: "MANDATORY"
    },
    gwp_binding_contract: {
      gwp_dataset_standard: "IPCC-AR5",
      gwp_application_basis: "100_YEAR_TIME_HORIZON",
      gwp_enforcement_status: "MANDATORY"
    },
    model_bindings: [
      { model_id: "MODEL-02", selection_strength: "REQUIRED" }
    ],
    provenance: {
      created_by: "System Admin",
      reviewed_by: "Gov board",
      cryptographic_hash: "hash_38_2023"
    }
  },
  {
    methodology_id: "METH-BXD-13-2024",
    methodology_version: "1.0.0",
    name: "Phương pháp MRV ngành Xây dựng (Thông tư 13/2024/TT-BXD)",
    description: "Phương pháp luận chi tiết phục vụ kiểm kê khí nhà kính ngành sản xuất xi măng và vật liệu xây dựng.",
    status: "ACTIVE",
    authority_class: "TIER_A",
    jurisdiction: "VN",
    source_refs: ["Circular-13-2024-TT-BXD"],
    effective_from: "2024-01-01",
    effective_to: "2026-09-25",
    supersedes: null,
    superseded_by: "METH-MOC-CEMENT-2026",
    sector_binding: "SEC-03-CONSTRUCTION",
    steps: [
      { step_number: 1, step_name: "Xác định ranh giới ranh giới cơ sở", step_class: "DEFINE_BOUNDARIES" },
      { step_number: 2, step_name: "Xác định nguồn clinker & đá vôi", step_class: "IDENTIFY_SOURCES" },
      { step_number: 3, step_name: "Thu thập lượng Clinker", step_class: "COLLECT_DATA" },
      { step_number: 4, step_name: "Liên kết Mô hình Tính toán", step_class: "BIND_MODEL" },
      { step_number: 5, step_name: "Chuyển đổi GWP", step_class: "APPLY_GWP" }
    ],
    source_requirements: [
      { source_class: "industrial_process", required_status: "MANDATORY" }
    ],
    activity_requirements: [
      {
        activity_identifier: "ACT-CLINKER",
        data_type: "Numeric",
        unit: "t",
        required_status: "MANDATORY",
        evidence_requirements: [
          { evidence_class: "production_record", required_status: "MANDATORY" }
        ]
      }
    ],
    gas_coverage: [
      { gas_species: "CO2", required_status: "MANDATORY" }
    ],
    parameter_requirements: [
      { parameter_id: "PAR-PURITY", unit: "%", type: "PURITY", required_status: "MANDATORY" }
    ],
    ef_binding_contract: {
      ef_type: "clinker_decarbonation_ef",
      enforcement_level: "RECOMMENDED"
    },
    gwp_binding_contract: {
      gwp_dataset_standard: "IPCC-AR5",
      gwp_application_basis: "100_YEAR_TIME_HORIZON",
      gwp_enforcement_status: "MANDATORY"
    },
    model_bindings: [
      { model_id: "MODEL-03", selection_strength: "ALLOWED" },
      { model_id: "MODEL-04", selection_strength: "CONDITIONAL" }
    ],
    provenance: {
      created_by: "System Admin",
      reviewed_by: "Gov board",
      cryptographic_hash: "hash_13_2024"
    }
  },
  {
    methodology_id: "METH-MOC-CEMENT-2026",
    methodology_version: "2.0.0",
    name: "Phương pháp MRV ngành Xây dựng Cập nhật 2026",
    description: "Phương pháp luận cập nhật tuân thủ Quyết định 42/2026/QĐ-TTg cho các cơ sở sản xuất xi măng.",
    status: "ACTIVE",
    authority_class: "TIER_A",
    jurisdiction: "VN",
    source_refs: ["Decree-MOC-2026"],
    effective_from: "2026-09-25",
    effective_to: null,
    supersedes: "METH-BXD-13-2024",
    superseded_by: null,
    sector_binding: "SEC-03-CONSTRUCTION",
    steps: [
      { step_number: 1, step_name: "Xác định ranh giới ranh giới cơ sở", step_class: "DEFINE_BOUNDARIES" },
      { step_number: 2, step_name: "Xác định nguồn phát thải", step_class: "IDENTIFY_SOURCES" },
      { step_number: 3, step_name: "Áp dụng Mô hình Clinker", step_class: "BIND_MODEL" }
    ],
    source_requirements: [
      { source_class: "industrial_process", required_status: "MANDATORY" }
    ],
    activity_requirements: [
      {
        activity_identifier: "ACT-CLINKER",
        data_type: "Numeric",
        unit: "t",
        required_status: "MANDATORY",
        evidence_requirements: [
          { evidence_class: "production_record", required_status: "MANDATORY" }
        ]
      }
    ],
    gas_coverage: [
      { gas_species: "CO2", required_status: "MANDATORY" }
    ],
    parameter_requirements: [
      { parameter_id: "PAR-PURITY", unit: "%", type: "PURITY", required_status: "MANDATORY" }
    ],
    ef_binding_contract: {
      ef_type: "clinker_decarbonation_ef",
      enforcement_level: "MANDATORY"
    },
    gwp_binding_contract: {
      gwp_dataset_standard: "IPCC-AR6",
      gwp_application_basis: "100_YEAR_TIME_HORIZON",
      gwp_enforcement_status: "MANDATORY"
    },
    model_bindings: [
      { model_id: "MODEL-03", selection_strength: "REQUIRED" }
    ],
    provenance: {
      created_by: "System Admin",
      reviewed_by: "Gov board",
      cryptographic_hash: "hash_moc_2026"
    }
  },
  {
    methodology_id: "METH-MOIT-ALTERNATIVE-2023",
    methodology_version: "1.0.0",
    name: "Phương pháp MRV Dự phòng ngành Công Thương",
    description: "Phương pháp luận dự phòng tính toán năng lượng cho ngành Công Thương.",
    status: "ACTIVE",
    authority_class: "TIER_B",
    jurisdiction: "VN",
    source_refs: ["Circular-38-Alternative"],
    effective_from: "2023-12-01",
    effective_to: null,
    supersedes: null,
    superseded_by: null,
    sector_binding: "SEC-01-ENERGY",
    steps: [
      { step_number: 1, step_name: "Xác định ranh giới", step_class: "DEFINE_BOUNDARIES" }
    ],
    source_requirements: [
      { source_class: "stationary_combustion", required_status: "MANDATORY" }
    ],
    activity_requirements: [
      {
        activity_identifier: "ACT-COAL",
        data_type: "Numeric",
        unit: "t",
        required_status: "MANDATORY",
        evidence_requirements: [
          { evidence_class: "fuel_invoice", required_status: "MANDATORY" }
        ]
      }
    ],
    gas_coverage: [
      { gas_species: "CO2", required_status: "MANDATORY" }
    ],
    parameter_requirements: [
      { parameter_id: "PAR-NCV", unit: "TJ/kt", type: "NCV", required_status: "MANDATORY" }
    ],
    ef_binding_contract: {
      ef_type: "stationary_coal_ef",
      enforcement_level: "MANDATORY"
    },
    gwp_binding_contract: {
      gwp_dataset_standard: "IPCC-AR5",
      gwp_application_basis: "100_YEAR_TIME_HORIZON",
      gwp_enforcement_status: "MANDATORY"
    },
    model_bindings: [
      { model_id: "MODEL-02", selection_strength: "REQUIRED" }
    ],
    provenance: {
      created_by: "System Admin",
      reviewed_by: "Gov board",
      cryptographic_hash: "hash_moit_alt"
    }
  },
  {
    methodology_id: "METH-DRAFT-99-2026",
    methodology_version: "1.0.0-draft",
    name: "Draft Methodology for Experimental Carbon Accounting",
    description: "DRAFT methodology that should never be selected automatically by standard runs.",
    status: "DRAFT",
    authority_class: "TIER_B",
    jurisdiction: "VN",
    source_refs: ["Internal-Draft-99"],
    effective_from: "2026-10-01",
    effective_to: null,
    supersedes: null,
    superseded_by: null,
    sector_binding: "SEC-01-ENERGY",
    steps: [
      { step_number: 1, step_name: "Xác định ranh giới", step_class: "DEFINE_BOUNDARIES" }
    ],
    source_requirements: [],
    activity_requirements: [],
    gas_coverage: [],
    parameter_requirements: [],
    ef_binding_contract: {
      ef_type: "draft_ef",
      enforcement_level: "DEFAULT_TIER"
    },
    gwp_binding_contract: {
      gwp_dataset_standard: "IPCC-AR5",
      gwp_application_basis: "100_YEAR_TIME_HORIZON",
      gwp_enforcement_status: "RECOMMENDED"
    },
    model_bindings: [],
    provenance: {
      created_by: "Internal Dev Team",
      reviewed_by: "InternalReview",
      cryptographic_hash: "draft_hash"
    }
  }
];

export class MethodologySelectionEngine {
  constructor(methodologies = GOVERNED_METHODOLOGIES) {
    this.methodologies = methodologies;
    this.evaluator_version = "1.0.0";
  }

  evaluate(context) {
    const timestamp = new Date().toISOString();

    // 1. Pre-execution validations (Fail-Closed)
    if (!context) {
      throw new Error("FAIL_CLOSED: Selection context is missing");
    }
    if (!context.facility_id) {
      throw new Error("FAIL_CLOSED: Missing mandatory facility context identifier");
    }

    // Provenance Verification
    if (!context.provenance || !context.provenance.created_by) {
      return {
        selected_methodology_id: null,
        selected_methodology_version: null,
        selection_status: "BLOCKED",
        selection_reason: "FAIL_CLOSED: Missing mandatory selection provenance context",
        candidate_evaluations: [],
        evaluator_version: this.evaluator_version,
        provenance: null,
        reproducibility_identity: "unresolved-provenance"
      };
    }

    // Temporal Validity Check
    if (!context.reporting_period || !context.reporting_period.period_start || !context.reporting_period.period_end) {
      return this.buildTerminalResult(context, "BLOCKED", "FAIL_CLOSED: Missing or incomplete reporting period boundaries", timestamp);
    }

    const start = context.reporting_period.period_start;
    const end = context.reporting_period.period_end;

    if (!isValidDateString(start) || !isValidDateString(end)) {
      return this.buildTerminalResult(context, "BLOCKED", "FAIL_CLOSED: Invalid date string format for reporting boundaries", timestamp);
    }

    // Regulatory Check
    const regApp = context.regulatory_applicability;
    if (!regApp || regApp.applicability_status === "UNKNOWN" || regApp.applicability_status === "REQUIRES_REVIEW") {
      return this.buildTerminalResult(context, "REQUIRES_REVIEW", "FAIL_CLOSED: Regulatory applicability status is unresolved or requires review", timestamp);
    }
    if (regApp.applicability_status === "NOT_APPLICABLE") {
      return this.buildTerminalResult(context, "NOT_APPLICABLE", "FAIL_CLOSED: Regulatory applicability status is NOT_APPLICABLE", timestamp);
    }

    // Sector Check (SPM-001)
    if (!context.facility || !context.facility.sector_id) {
      return this.buildTerminalResult(context, "BLOCKED", "FAIL_CLOSED: Missing facility classification sector ID", timestamp);
    }

    const sectorId = context.facility.sector_id;
    const mapping = TAXONOMY_REGISTRY[sectorId];

    if (!mapping) {
      return this.buildTerminalResult(context, "REQUIRES_REVIEW", "Sector mapping is UNKNOWN / NOT_MAPPED", timestamp, "UNKNOWN");
    }
    if (mapping.mapping_state === "AMBIGUOUS" || mapping.mapping_state === "PARTIAL") {
      return this.buildTerminalResult(context, "REQUIRES_REVIEW", `Sector mapping is ${mapping.mapping_state} across engineering profiles`, timestamp, mapping.mapping_state);
    }

    // 2. Candidate Evaluation Loop
    const candidateEvaluations = [];

    for (const meth of this.methodologies) {
      let outcome = "APPLICABLE";
      let reason = "Candidate matches all applicability constraints.";
      let temporalMatch = "NOT_EVALUATED";
      let sectorMatch = "NOT_EVALUATED";
      let activityMatch = "NOT_EVALUATED";
      let regulatoryMatch = "NOT_EVALUATED";
      let evidenceReady = "NOT_EVALUATED";
      let parameterReady = "NOT_EVALUATED";

      // A. Status validation
      if (meth.status === "DRAFT") {
        outcome = "BLOCKED";
        reason = `Lifecycle Violation: Methodology status is DRAFT (blocked under standard rules).`;
        candidateEvaluations.push(this.buildCandidateEval(meth, outcome, reason, "INVALID", "INVALID", "INVALID", "INVALID", "INVALID", "INVALID"));
        continue;
      }

      // B. Provenance verification on candidate
      if (!meth.provenance || !meth.provenance.cryptographic_hash) {
        outcome = "BLOCKED";
        reason = `FAIL_CLOSED: Candidate methodology ${meth.methodology_id} is missing governing provenance metrics.`;
        candidateEvaluations.push(this.buildCandidateEval(meth, outcome, reason, "INVALID", "INVALID", "INVALID", "INVALID", "INVALID", "INVALID"));
        continue;
      }

      // C. Temporal Range Match
      const mFrom = meth.effective_from;
      const mTo = meth.effective_to;

      const endsBefore = end <= mFrom;
      const startsAfter = mTo !== null && start >= mTo;

      if (endsBefore || startsAfter) {
        temporalMatch = "OUT_OF_RANGE";
        outcome = "NOT_APPLICABLE";
        reason = `Methodology is inactive during the requested reporting period [${start}, ${end}).`;
      } else {
        // Straddle validation
        const straddlesStart = mFrom > start && mFrom < end;
        const straddlesEnd = mTo !== null && mTo > start && mTo < end;

        if (straddlesStart || straddlesEnd) {
          temporalMatch = "STRADDLES_BOUNDARY";
          outcome = "REQUIRES_REVIEW";
          reason = `Reporting period straddles methodology effective boundaries. Segmentation required.`;
        } else {
          temporalMatch = "IN_RANGE";
        }
      }

      // D. Sector Match
      if (outcome !== "NOT_APPLICABLE" && outcome !== "REQUIRES_REVIEW") {
        if (meth.sector_binding === sectorId) {
          sectorMatch = "EXACT_MATCH";
        } else {
          sectorMatch = "MISMATCH";
          outcome = "NOT_APPLICABLE";
          reason = `Sector mismatch: Methodology is bound to ${meth.sector_binding}, context is ${sectorId}.`;
        }
      }

      // E. Activity Match
      if (outcome !== "NOT_APPLICABLE" && outcome !== "REQUIRES_REVIEW") {
        const actCtx = context.activity_context;
        if (!actCtx || !actCtx.activity_type) {
          activityMatch = "MISSING_CONTEXT";
          outcome = "REQUIRES_REVIEW";
          reason = `Missing required activity context classification to evaluate candidate ${meth.methodology_id}.`;
        } else {
          const actsMatched = meth.activity_requirements.some(r => r.activity_identifier === actCtx.activity_type);
          const sourceMatched = meth.source_requirements.some(r => r.source_class === actCtx.source_class);

          if (actsMatched || sourceMatched) {
            activityMatch = "MATCHED";
          } else {
            activityMatch = "MISMATCH";
            outcome = "NOT_APPLICABLE";
            reason = `Activity/Process mismatch for activity type: ${actCtx.activity_type}, source class: ${actCtx.source_class}.`;
          }
        }
      }

      // F. Regulatory Match
      if (outcome !== "NOT_APPLICABLE" && outcome !== "REQUIRES_REVIEW") {
        regulatoryMatch = "ALIGNED";
      }

      // G. Evidence Requirements Gating Check
      if (outcome !== "NOT_APPLICABLE" && outcome !== "REQUIRES_REVIEW") {
        const actCtx = context.activity_context;
        const reqs = meth.activity_requirements.find(r => r.activity_identifier === actCtx.activity_type);

        if (reqs && reqs.evidence_requirements) {
          const supplied = (context.evidence_context && context.evidence_context.supplied_evidence) || [];
          const missing = reqs.evidence_requirements
            .filter(r => r.required_status === "MANDATORY")
            .filter(r => !supplied.includes(r.evidence_class));

          if (missing.length > 0) {
            evidenceReady = "MISSING_MANDATORY_EVIDENCE";
            outcome = "BLOCKED";
            reason = `Missing required evidence: ${missing.map(m => m.evidence_class).join(", ")}. Gating condition unresolved.`;
          } else {
            evidenceReady = "VERIFIED";
          }
        } else {
          evidenceReady = "NO_REQUIREMENTS";
        }
      }

      // H. Parameter requirements check (Section 17: No numerical defaults)
      if (outcome !== "NOT_APPLICABLE" && outcome !== "REQUIRES_REVIEW" && outcome !== "BLOCKED") {
        const actCtx = context.activity_context;
        const presentParams = actCtx.parameters || [];
        const missingParams = meth.parameter_requirements
          .filter(p => p.required_status === "MANDATORY")
          .filter(p => !presentParams.includes(p.parameter_id));

        if (missingParams.length > 0) {
          parameterReady = "MISSING_MANDATORY_PARAMETERS";
          outcome = "BLOCKED";
          reason = `Missing required parameter requirement ${missingParams[0].parameter_id} without numerical fallback.`;
        } else {
          parameterReady = "COMPLIANT";
        }
      }

      candidateEvaluations.push(
        this.buildCandidateEval(meth, outcome, reason, temporalMatch, sectorMatch, activityMatch, regulatoryMatch, evidenceReady, parameterReady)
      );
    }

    // 3. Selection Decision Logic
    const applicableCandidates = candidateEvaluations.filter(e => e.applicability_status === "APPLICABLE");

    if (applicableCandidates.length === 1) {
      const selected = applicableCandidates[0];
      const selectedMeth = this.methodologies.find(m => m.methodology_id === selected.methodology_id);

      return {
        selected_methodology_id: selected.methodology_id,
        selected_methodology_version: selected.methodology_version,
        selection_status: "APPLICABLE",
        selection_reason: "Single clearly applicable methodology successfully resolved.",
        regulatory_basis: {
          regulatory_rule_id: regApp.matched_rules ? regApp.matched_rules[0] : "RULE-ALIGNED",
          applicability_status: regApp.applicability_status
        },
        temporal_basis: {
          effective_from: selectedMeth.effective_from,
          effective_to: selectedMeth.effective_to,
          reporting_period: context.reporting_period
        },
        sector_basis: {
          sector_id: sectorId,
          mapping_state: mapping.mapping_state,
          internal_sector_code: mapping.internal_code
        },
        activity_basis: {
          activity_type: context.activity_context.activity_type,
          source_class: context.activity_context.source_class,
          applicable_models: selectedMeth.model_bindings // preserved models (Section 14)
        },
        evidence_basis: {
          required_evidence: selectedMeth.activity_requirements
            .find(r => r.activity_identifier === context.activity_context.activity_type)
            ?.evidence_requirements?.map(e => e.evidence_class) || [],
          supplied_evidence: (context.evidence_context && context.evidence_context.supplied_evidence) || [],
          evidence_compliance_status: true
        },
        candidate_evaluations: candidateEvaluations,
        provenance: {
          created_by: context.provenance.created_by,
          reviewed_by: context.provenance.reviewed_by,
          cryptographic_hash: selectedMeth.provenance.cryptographic_hash
        },
        evaluator_version: this.evaluator_version,
        reproducibility_identity: this.computeReproducibilityHash(context, selectedMeth)
      };
    }

    // Over-allocation Conflict / Ambiguity check (Section 12, 13)
    if (applicableCandidates.length > 1) {
      return {
        selected_methodology_id: null,
        selected_methodology_version: null,
        selection_status: "REQUIRES_REVIEW",
        selection_reason: `Multiple valid methodology candidates conflict without governed precedence rule: ${applicableCandidates.map(c => c.methodology_id).join(", ")}`,
        candidate_evaluations: candidateEvaluations,
        evaluator_version: this.evaluator_version,
        provenance: context.provenance,
        reproducibility_identity: "unresolved-conflict-requires-review"
      };
    }

    // Map failed outcomes to selection summary
    // Filter evaluations that belong to the current facility's sector_id (sector-relevant candidates)
    const sectorRelevant = candidateEvaluations.filter(e => {
      const meth = this.methodologies.find(m => m.methodology_id === e.methodology_id);
      return meth && meth.sector_binding === sectorId && meth.status === "ACTIVE";
    });

    const activeRelevant = sectorRelevant.length > 0 ? sectorRelevant : candidateEvaluations;

    const blockedCandidate = activeRelevant.find(e => e.applicability_status === "BLOCKED");
    const reviewCandidate = activeRelevant.find(e => e.applicability_status === "REQUIRES_REVIEW");
    const activeOutcome = blockedCandidate || reviewCandidate;

    if (activeOutcome) {
      return {
        selected_methodology_id: null,
        selected_methodology_version: null,
        selection_status: activeOutcome.applicability_status,
        selection_reason: activeOutcome.reason,
        candidate_evaluations: candidateEvaluations,
        evaluator_version: this.evaluator_version,
        provenance: context.provenance,
        reproducibility_identity: `unresolved-fail-${activeOutcome.applicability_status.toLowerCase()}`
      };
    }

    return {
      selected_methodology_id: null,
      selected_methodology_version: null,
      selection_status: "NOT_APPLICABLE",
      selection_reason: "No candidate methodologies are applicable to this context.",
      candidate_evaluations: candidateEvaluations,
      evaluator_version: this.evaluator_version,
      provenance: context.provenance,
      reproducibility_identity: "unresolved-not-applicable"
    };
  }

  buildCandidateEval(meth, outcome, reason, temporal, sector, activity, regulatory, evidence, parameter) {
    return {
      methodology_id: meth.methodology_id,
      methodology_version: meth.methodology_version,
      applicability_status: outcome,
      reason: reason,
      context_match: {
        temporal_match: temporal,
        sector_match: sector,
        activity_match: activity,
        regulatory_match: regulatory,
        evidence_readiness: evidence,
        parameter_readiness: parameter
      },
      provenance: meth.provenance
    };
  }

  buildTerminalResult(context, status, reason, timestamp, mappingState = "UNKNOWN") {
    return {
      selected_methodology_id: null,
      selected_methodology_version: null,
      selection_status: status,
      selection_reason: reason,
      candidate_evaluations: [],
      evaluator_version: this.evaluator_version,
      provenance: context.provenance,
      reproducibility_identity: "unresolved-terminal"
    };
  }

  computeReproducibilityHash(context, selectedMeth) {
    // Generate a simple deterministic unique identifier string representing the input signature
    return `REPRO-SEL-${context.facility_id}-${context.reporting_period.period_start}-${selectedMeth.methodology_id}-${selectedMeth.methodology_version}`;
  }
}

export const methodologySelectionEngine = new MethodologySelectionEngine();
