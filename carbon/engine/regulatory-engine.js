/**
 * ENERIX Carbon - Regulatory Applicability Engine
 * Evaluates facility compliance, temporal legal applicability, taxonomy mappings,
 * and rule predicate AST trees based on EC-RRM-001, EC-TEMP-001, and EC-SPM-001.
 */

// Controlled Issue Register (Section 16 / Section 18)
export const CONTROLLED_ISSUES = {
  "ISSUE-RRM-001": {
    id: "ISSUE-RRM-001",
    domain: "Multi-Ministry Precedence Conflict",
    description: "Precedence between MOC Circular 13 and MONRE Circular 17 for dual-use heat plants is ambiguous.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-RRM-002": {
    id: "ISSUE-RRM-002",
    domain: "Retrospective Audit Rules",
    description: "Retroactive compliance evaluation procedures for historical runs lack formal statutory definitions.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-RRM-003": {
    id: "ISSUE-RRM-003",
    domain: "provincial-level Rule overrides",
    description: "provincial-level threshold additions (e.g., specific Hanoi city regulations) are not fully cataloged.",
    status: "OPEN_CONTROLLED"
  },
  "ISSUE-TEMP-001": { id: "ISSUE-TEMP-001", domain: "Temporal Boundaries", description: "Standard transition boundaries verification.", status: "OPEN_CONTROLLED" },
  "ISSUE-SPM-001": { id: "ISSUE-SPM-001", domain: "Sector Profiles", description: "Mapping alignment verification.", status: "OPEN_CONTROLLED" },
  "ISSUE-KM-001": { id: "ISSUE-KM-001", domain: "Knowledge Matrix", description: "Source legal references mapping verification.", status: "OPEN_CONTROLLED" }
};

// Mappings Registry for SPM-001 Taxonomy Bridge
export const TAXONOMY_REGISTRY = {
  "SEC-01-ENERGY": {
    external_system: "DECISION_42_2026_TTG",
    external_code: "Sector_1_MOIT",
    external_label: "Sản xuất năng lượng",
    internal_code: "SECTOR-ENG-001",
    mapping_state: "EXACT"
  },
  "SEC-03-CONSTRUCTION": {
    external_system: "DECISION_42_2026_TTG",
    external_code: "Sector_3_MOC",
    external_label: "Sản xuất xi măng và vật liệu xây dựng",
    internal_code: "SECTOR-CON-002",
    mapping_state: "MAPPED"
  },
  "SEC-02-WASTE": {
    external_system: "DECISION_42_2026_TTG",
    external_code: "Sector_4_MONRE",
    external_label: "Xử lý chất thải",
    internal_code: "SECTOR-WST-003",
    mapping_state: "PARTIAL"
  },
  "SEC-AMBIGUOUS": {
    external_system: "MULTI_MINISTRY",
    external_code: "SEC-AMBIGUOUS",
    external_label: "Đồng xử lý chất thải trong lò nung xi măng",
    internal_code: ["SECTOR-CON-002", "SECTOR-WST-003"],
    mapping_state: "AMBIGUOUS"
  }
};

// Governed Rule Definitions Catalog representing primary legislation
export const GOVERNED_RULES = [
  {
    rule_id: "RULE-QD-42-2026-PRIMARY",
    rule_version: "1.0.0",
    regulatory_document_id: "QD-42-2026",
    source_refs: ["DOC-DEC-GOV-2026-42:Article5_Clause1"],
    assertion_refs: ["KA-QD42-001"],
    authority_class: "TIER_A",
    jurisdiction: "VN",
    effective_from: "2026-09-25",
    effective_to: null, // open-ended
    status: "ACTIVE",
    derivation_status: "SOURCE_DIRECT",
    review_status: "APPROVED_BY_COMMITTEE",
    rule_type: "MANDATORY_INVENTORY",
    supersedes: "RULE-QD-13-2024-PRIMARY",
    superseded_by: null,
    competent_authority: "MONRE",
    predicate: {
      operator: "AND",
      conditions: [
        {
          field: "facility.attributes.annual_energy_consumption",
          operator: "GREATER_THAN_OR_EQUAL",
          value: 1000
        }
      ]
    }
  },
  {
    rule_id: "RULE-QD-13-2024-PRIMARY",
    rule_version: "1.0.0",
    regulatory_document_id: "QD-13-2024",
    source_refs: ["DOC-DEC-GOV-2024-13:Article4"],
    assertion_refs: ["KA-QD13-001"],
    authority_class: "TIER_A",
    jurisdiction: "VN",
    effective_from: "2024-01-01",
    effective_to: "2026-09-25", // Replaced by QD-42
    status: "SUPERSEDED",
    derivation_status: "SOURCE_DIRECT",
    review_status: "APPROVED_BY_COMMITTEE",
    rule_type: "MANDATORY_INVENTORY",
    supersedes: null,
    superseded_by: "RULE-QD-42-2026-PRIMARY",
    competent_authority: "MONRE",
    predicate: {
      operator: "AND",
      conditions: [
        {
          field: "facility.attributes.annual_energy_consumption",
          operator: "GREATER_THAN_OR_EQUAL",
          value: 1000
        }
      ]
    }
  },
  {
    rule_id: "RULE-MOC-CIRCULAR-13",
    rule_version: "1.0.0",
    regulatory_document_id: "MOC-CIRC-13-2024",
    source_refs: ["DOC-MOC-CIRCULAR-2024-13:Section3"],
    assertion_refs: ["KA-MOC13-001"],
    authority_class: "TIER_B",
    jurisdiction: "VN",
    effective_from: "2024-01-01",
    effective_to: null,
    status: "ACTIVE",
    derivation_status: "SOURCE_DIRECT",
    review_status: "APPROVED_BY_COMMITTEE",
    rule_type: "METHODOLOGY_REQUIREMENT",
    supersedes: null,
    superseded_by: null,
    competent_authority: "Ministry of Construction",
    predicate: {
      operator: "AND",
      conditions: [
        {
          field: "facility.sector_id",
          operator: "EQUALS",
          value: "SEC-03-CONSTRUCTION"
        }
      ]
    }
  },
  {
    rule_id: "RULE-MONRE-CIRCULAR-17",
    rule_version: "1.0.0",
    regulatory_document_id: "MONRE-CIRC-17-2024",
    source_refs: ["DOC-MONRE-CIRCULAR-2024-17:Section5"],
    assertion_refs: ["KA-MONRE17-001"],
    authority_class: "TIER_B",
    jurisdiction: "VN",
    effective_from: "2024-01-01",
    effective_to: null,
    status: "ACTIVE",
    derivation_status: "SOURCE_DIRECT",
    review_status: "APPROVED_BY_COMMITTEE",
    rule_type: "METHODOLOGY_REQUIREMENT",
    supersedes: null,
    superseded_by: null,
    competent_authority: "MONRE",
    predicate: {
      operator: "AND",
      conditions: [
        {
          field: "facility.sector_id",
          operator: "EQUALS",
          value: "SEC-03-CONSTRUCTION"
        }
      ]
    }
  }
];

export class RegulatoryEngine {
  constructor(rules = GOVERNED_RULES) {
    this.rules = rules;
    this.evaluator_version = "1.0.0";
  }

  // Helper to deep resolve field values on contexts (fail-closed if missing)
  resolveValue(path, context) {
    if (!path || !context) return undefined;
    const parts = path.split(".");
    let current = context;
    for (const part of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[part];
    }
    return current;
  }

  // Evaluates a single predicate condition
  evaluateCondition(condition, context, trace) {
    const fieldVal = this.resolveValue(condition.field, context);

    if (condition.operator === "EXISTS") {
      const exists = fieldVal !== undefined && fieldVal !== null;
      if (exists) trace.matched.push(condition);
      else trace.unmet.push(condition);
      return exists ? "true" : "false";
    }

    if (condition.operator === "NOT_EXISTS") {
      const notExists = fieldVal === undefined || fieldVal === null;
      if (notExists) trace.matched.push(condition);
      else trace.unmet.push(condition);
      return notExists ? "true" : "false";
    }

    // Fail-closed: If field value is missing, return UNKNOWN
    if (fieldVal === undefined || fieldVal === null) {
      trace.unresolved.push({ condition, reason: `Value for field '${condition.field}' is missing` });
      return "unknown";
    }

    let match = false;
    switch (condition.operator) {
      case "EQUALS":
        match = fieldVal === condition.value;
        break;
      case "NOT_EQUALS":
        match = fieldVal !== condition.value;
        break;
      case "GREATER_THAN":
        match = fieldVal > condition.value;
        break;
      case "GREATER_THAN_OR_EQUAL":
        match = fieldVal >= condition.value;
        break;
      case "LESS_THAN":
        match = fieldVal < condition.value;
        break;
      case "LESS_THAN_OR_EQUAL":
        match = fieldVal <= condition.value;
        break;
      case "IN":
        match = Array.isArray(condition.value) && condition.value.includes(fieldVal);
        break;
      case "NOT_IN":
        match = Array.isArray(condition.value) && !condition.value.includes(fieldVal);
        break;
      case "BETWEEN":
        match = Array.isArray(condition.value) && fieldVal >= condition.value[0] && fieldVal <= condition.value[1];
        break;
      default:
        trace.unresolved.push({ condition, reason: `Operator '${condition.operator}' is unsupported` });
        return "unknown";
    }

    if (match) {
      trace.matched.push(condition);
      return "true";
    } else {
      trace.unmet.push(condition);
      return "false";
    }
  }

  // Evaluates an AST node recursively with 3-valued logic (AND, OR, NOT, leaf)
  evaluateAST(node, context, trace) {
    if (!node) return "unknown";

    if (node.operator === "AND") {
      if (!node.conditions || node.conditions.length === 0) return "true";
      let hasUnknown = false;
      for (const cond of node.conditions) {
        const res = this.evaluateAST(cond, context, trace);
        if (res === "false") return "false";
        if (res === "unknown" || res === "requires_review") hasUnknown = true;
      }
      return hasUnknown ? "unknown" : "true";
    }

    if (node.operator === "OR") {
      if (!node.conditions || node.conditions.length === 0) return "false";
      let hasUnknown = false;
      for (const cond of node.conditions) {
        const res = this.evaluateAST(cond, context, trace);
        if (res === "true") return "true";
        if (res === "unknown" || res === "requires_review") hasUnknown = true;
      }
      return hasUnknown ? "unknown" : "false";
    }

    if (node.operator === "NOT") {
      const res = this.evaluateAST(node.condition, context, trace);
      if (res === "true") return "false";
      if (res === "false") return "true";
      return res; // preserve unknown / requires_review
    }

    // Leaf node
    return this.evaluateCondition(node, context, trace);
  }

  // Legacy method preserved for backwards compatibility with exact verification signatures
  evaluateFacilityStatus(facility, asOfDate = '2026-09-16') {
    if (!facility) {
      return {
        status: 'UNKNOWN_REQUIRES_REVIEW',
        legalBasis: 'No facility matching record',
        reason: 'Facility record not found in registry'
      };
    }

    const effective42Date = '2026-09-25';
    const isAfterDecision42Effective = asOfDate >= effective42Date;

    if (facility.regulatory_status === 'MANDATORY') {
      return {
        status: isAfterDecision42Effective ? 'MANDATORY' : 'PENDING_EFFECTIVE_DATE',
        legalBasis: facility.legal_basis || 'Quyết định 42/2026/QĐ-TTg',
        effectiveFrom: facility.valid_from || effective42Date,
        reason: isAfterDecision42Effective
          ? 'Cơ sở thuộc danh mục phải kiểm kê KNK theo QĐ 42/2026/QĐ-TTg'
          : 'Cơ sở thuộc danh mục QĐ 42/2026/QĐ-TTg (Có hiệu lực từ 25/09/2026)'
      };
    }

    return {
      status: facility.regulatory_status || 'UNKNOWN_REQUIRES_REVIEW',
      legalBasis: facility.legal_basis || 'Chưa xác định',
      reason: 'Cần rà soát hồ sơ tiêu thụ năng lượng hàng năm'
    };
  }

  // Canonical evaluation flow for a facility applicability context (Section 2)
  evaluate(context) {
    const timestamp = new Date().toISOString();

    // 1. Pre-execution validations (Fail-Closed)
    if (!context || !context.facility_id) {
      throw new Error("FAIL_CLOSED: Missing mandatory facility context identifier");
    }
    if (!context.reporting_period || !context.reporting_period.period_start || !context.reporting_period.period_end) {
      return this.buildTerminalResult(context, "UNKNOWN", "UNKNOWN", "Missing reporting period start or end boundaries", timestamp);
    }
    if (!context.facility || !context.facility.sector_id) {
      return this.buildTerminalResult(context, "UNKNOWN", "UNKNOWN", "Missing facility classification sector ID", timestamp);
    }

    // 2. Sector Taxonomy Mappings (SPM-001)
    const sectorId = context.facility.sector_id;
    const mapping = TAXONOMY_REGISTRY[sectorId];
    if (!mapping) {
      return this.buildTerminalResult(context, "REQUIRES_REVIEW", "REQUIRES_REVIEW", `Taxonomy lookup for sector '${sectorId}' is UNKNOWN / NOT_MAPPED`, timestamp, "UNKNOWN");
    }
    if (mapping.mapping_state === "AMBIGUOUS" || mapping.mapping_state === "PARTIAL") {
      return this.buildTerminalResult(context, "REQUIRES_REVIEW", "REQUIRES_REVIEW", `Sector mapping is ${mapping.mapping_state} across engineering profiles`, timestamp, mapping.mapping_state);
    }

    const start = context.reporting_period.period_start;
    const end = context.reporting_period.period_end;

    // 3. Temporal Validity & Straddle Detection (EC-TEMP-001)
    const evaluations = [];
    let isStraddled = false;
    let straddleDetails = [];

    // Filter candidate rules based on Jurisdiction & Sector
    const candidates = this.rules.filter(r => {
      if (r.jurisdiction !== (context.jurisdiction || "VN")) return false;
      
      // If rule checks sector_id inside its predicate or has default metadata sector
      return true; 
    });

    for (const rule of candidates) {
      const from = rule.effective_from;
      const to = rule.effective_to;

      // Temporal Overlap validation range check
      const overlaps = (from <= end) && (to === null || to > start);
      if (!overlaps) continue;

      // Check for exact straddle (rule transition boundary cuts across reporting period)
      const straddlesStart = from > start && from <= end;
      const straddlesEnd = to !== null && to > start && to < end;

      if (straddlesStart || straddlesEnd) {
        isStraddled = true;
        const boundaryDate = straddlesStart ? from : to;
        straddleDetails.push({ rule_id: rule.rule_id, boundaryDate });
      }

      // 4. Predicate AST evaluation
      const trace = { matched: [], unmet: [], unresolved: [] };
      const astResult = this.evaluateAST(rule.predicate, context, trace);

      // Map AST evaluation outcomes to compliance state
      let appStatus = "NOT_APPLICABLE";
      let mandStatus = "NOT_MANDATORY";

      if (astResult === "true") {
        appStatus = "APPLICABLE";
        mandStatus = rule.rule_type === "MANDATORY_INVENTORY" ? "MANDATORY" : "NOT_MANDATORY";
      } else if (astResult === "unknown") {
        appStatus = "UNKNOWN";
        mandStatus = "UNKNOWN";
      }

      evaluations.push({
        rule_id: rule.rule_id,
        regulatory_document_id: rule.regulatory_document_id,
        rule_version: rule.rule_version,
        authority_class: rule.authority_class,
        competent_authority: rule.competent_authority,
        effective_period: { effective_from: from, effective_to: to },
        applicability_status: appStatus,
        mandatory_status: mandStatus,
        matched_conditions: trace.matched,
        unmet_conditions: trace.unmet,
        unresolved_conditions: trace.unresolved,
        provenance: {
          regulatory_document_id: rule.regulatory_document_id,
          rule_id: rule.rule_id,
          source_refs: rule.source_refs,
          assertion_refs: rule.assertion_refs
        }
      });
    }

    // 5. Rule Precedence / Overlaps / Multi-Ministry Conflicts (ISSUE-RRM-001)
    const activeApplicable = evaluations.filter(e => e.applicability_status === "APPLICABLE");
    const docIds = activeApplicable.map(a => a.regulatory_document_id);

    // Conflict detection: If two competing ministry rules are active without explicit override precedence
    const hasCircular13 = docIds.includes("MOC-CIRC-13-2024");
    const hasCircular17 = docIds.includes("MONRE-CIRC-17-2024");
    
    if (hasCircular13 && hasCircular17 && context.facility.attributes.is_dual_use_heat === true) {
      return {
        evaluation_id: `EVAL-${context.facility_id}-CONFLICT`,
        assessment_date: start,
        applicability_status: "REQUIRES_REVIEW",
        mandatory_status: "REQUIRES_REVIEW",
        evaluation_reason: "CONFLICT DETECTED: Overlapping sector jurisdictions between MOC Circular 13 and MONRE Circular 17 for dual-use thermal processes (ISSUE-RRM-001).",
        conflicts: ["RULE-MOC-CIRCULAR-13", "RULE-MONRE-CIRCULAR-17"],
        evidence: { mapping_state: mapping.mapping_state },
        evaluation_timestamp: timestamp,
        evaluator_version: this.evaluator_version,
        provenance_trace: {
          context_snapshot: context,
          rules_evaluated: candidates.map(r => r.rule_id)
        }
      };
    }

    // If a temporal straddle is detected, we enforce compliance review or segmented intervals
    if (isStraddled) {
      // Split into structured chronological segments
      const sortedBoundaries = [...new Set(straddleDetails.map(d => d.boundaryDate))].sort();
      const segments = [];
      let currentStart = start;

      for (const boundary of sortedBoundaries) {
        segments.push({
          start: currentStart,
          end: boundary,
          status: "REQUIRES_REVIEW",
          reason: `Reporting period straddles regulatory boundary at ${boundary}`
        });
        currentStart = boundary;
      }
      segments.push({
        start: currentStart,
        end: end,
        status: "REQUIRES_REVIEW",
        reason: "Temporal segment following regulatory transition"
      });

      return {
        evaluation_id: `EVAL-${context.facility_id}-STRADDLE`,
        assessment_date: start,
        applicability_status: "REQUIRES_REVIEW",
        mandatory_status: "REQUIRES_REVIEW",
        evaluation_reason: "TEMPORAL STRADDLE DETECTED: Reporting period crosses regulatory transition boundaries. Segmentation required (EC-TEMP-001).",
        segments,
        evaluation_timestamp: timestamp,
        evaluator_version: this.evaluator_version,
        provenance_trace: {
          context_snapshot: context,
          rules_evaluated: candidates.map(r => r.rule_id)
        }
      };
    }

    // Determine aggregate compliance outcome
    let finalApp = "NOT_APPLICABLE";
    let finalMand = "NOT_MANDATORY";
    let explanation = "No applicable inventory mandates detected for the facility sector and attributes.";
    let activeRule = null;

    if (activeApplicable.length > 0) {
      // Prioritize highest mandatory status
      const mandActive = activeApplicable.find(a => a.mandatory_status === "MANDATORY");
      activeRule = mandActive || activeApplicable[0];
      finalApp = "APPLICABLE";
      finalMand = activeRule.mandatory_status;
      explanation = `Facility meets compliance threshold under rule ${activeRule.rule_id} (${activeRule.provenance.source_refs.join(", ")})`;
    } else {
      const unknownActive = evaluations.find(e => e.applicability_status === "UNKNOWN");
      if (unknownActive) {
        finalApp = "UNKNOWN";
        finalMand = "UNKNOWN";
        explanation = `Compliance criteria cannot be fully evaluated due to missing variables: ${unknownActive.unresolved_conditions.map(c => c.reason).join("; ")}`;
      }
    }

    return {
      evaluation_id: `EVAL-${context.facility_id}-${activeRule ? activeRule.rule_id : "NONE"}`,
      assessment_date: start,
      reporting_period: context.reporting_period,
      applicability_status: finalApp,
      mandatory_status: finalMand,
      evaluation_reason: explanation,
      matched_rules: activeApplicable.map(a => a.rule_id),
      evaluations,
      evidence: {
        mapping_state: mapping.mapping_state,
        internal_sector_code: mapping.internal_code,
        external_sector_label: mapping.external_label
      },
      evaluation_timestamp: timestamp,
      evaluator_version: this.evaluator_version,
      provenance_trace: {
        context_snapshot: context,
        rules_evaluated: candidates.map(r => r.rule_id)
      }
    };
  }

  // Builder for immediate terminal/exception results
  buildTerminalResult(context, appStatus, mandStatus, reason, timestamp, mappingState = "UNKNOWN") {
    return {
      evaluation_id: `EVAL-${context.facility_id}-TERMINAL`,
      assessment_date: context.reporting_period ? context.reporting_period.period_start : null,
      applicability_status: appStatus,
      mandatory_status: mandStatus,
      evaluation_reason: reason,
      evidence: { mapping_state: mappingState },
      evaluation_timestamp: timestamp,
      evaluator_version: this.evaluator_version,
      provenance_trace: {
        context_snapshot: context,
        rules_evaluated: []
      }
    };
  }
}

export const regulatoryEngine = new RegulatoryEngine();
