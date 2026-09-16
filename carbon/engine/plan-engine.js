/**
 * ENERIX Carbon - Calculation Plan Engine
 * Operationalizes the governed Calculation Plan layer as specified in EC-MTH-001, EC-CES-001, and EC-UCM-001.
 * Constructs a deterministic, inspectable execution blueprint outlining WHAT is required for calculation.
 * The Calculation Plan Engine remains 100% metadata-only and never performs numerical computations.
 */

import { calculationEngine } from './calculation-engine.js';
import { CONTROLLED_ISSUES } from './methodology-engine.js';

export class CalculationPlan {
  constructor(data) {
    this.plan_id = data.plan_id;
    this.plan_version = data.plan_version || "1.0.0";
    this.status = data.status || "DRAFT"; // DRAFT, REVIEW_REQUIRED, READY, BLOCKED, SUPERSEDED
    this.facility_context = data.facility_context || null;
    this.regulatory_context = data.regulatory_context || null;
    this.temporal_context = data.temporal_context || null;
    this.sector_context = data.sector_context || null;
    this.methodology_context = data.methodology_context || null;
    this.steps = data.steps || [];
    this.required_activity_data = data.required_activity_data || [];
    this.required_parameters = data.required_parameters || [];
    this.required_emission_factor_requirements = data.required_emission_factor_requirements || [];
    this.required_gwp_requirements = data.required_gwp_requirements || [];
    this.required_evidence = data.required_evidence || [];
    this.dependencies = data.dependencies || [];
    this.validation_gates = data.validation_gates || [];
    this.readiness = data.readiness || "NOT_READY"; // READY, NOT_READY, REVIEW_REQUIRED, BLOCKED
    this.provenance = data.provenance || null;
    this.controlled_issues = data.controlled_issues || [];
    this.reproducibility_identity = data.reproducibility_identity || "";
  }
}

export class CalculationPlanEngine {
  constructor() {
    this.engine_version = "1.0.0";
  }

  generatePlan(context, methodologySelection) {
    const timestamp = new Date().toISOString();
    const planId = `PLAN-${context.facility_id || "UNKNOWN"}-${Date.now()}`;
    const planVersion = context.plan_version || "1.0.0";

    // 1. Initial State Definition
    let status = "DRAFT";
    let readiness = "NOT_READY";
    const validationGates = [];
    const steps = [];
    const requiredActivityData = [];
    const requiredParameters = [];
    const requiredEFRequirements = [];
    const requiredGwpRequirements = [];
    const requiredEvidence = [];
    const propagatedIssues = [];

    // 2. Validation Gates Construction & Check
    // Gate A: Facility Identified
    const facilityIdentified = !!(context.facility_id && context.facility);
    validationGates.push({
      gate_id: "GATE-FACILITY-ID",
      name: "Facility Identified",
      status: facilityIdentified ? "PASS" : "FAIL",
      evaluation_reason: facilityIdentified ? "Facility metadata fully resolved." : "Facility context or ID is missing."
    });

    // Gate B: Regulatory Rule Resolved
    let regResolved = "FAIL";
    let regReason = "Regulatory applicability evaluation missing.";
    if (context.regulatory_applicability) {
      const appStatus = context.regulatory_applicability.applicability_status;
      if (appStatus === "APPLICABLE") {
        regResolved = "PASS";
        regReason = "Regulatory applicability status verified and matched.";
      } else if (appStatus === "REQUIRES_REVIEW" || appStatus === "UNKNOWN") {
        regResolved = "REQUIRES_REVIEW";
        regReason = "Regulatory applicability status requires review.";
      } else {
        regResolved = "FAIL";
        regReason = `Regulatory applicability is ${appStatus}.`;
      }
    }
    validationGates.push({
      gate_id: "GATE-REGULATORY-RESOLVED",
      name: "Regulatory Rule Resolved",
      status: regResolved,
      evaluation_reason: regReason
    });

    // Gate C: Temporal Segment Resolved
    const tempResolved = !!(context.reporting_period && context.reporting_period.period_start && context.reporting_period.period_end);
    validationGates.push({
      gate_id: "GATE-TEMPORAL-RESOLVED",
      name: "Temporal Segment Resolved",
      status: tempResolved ? "PASS" : "FAIL",
      evaluation_reason: tempResolved ? "Temporal reporting period boundaries resolved." : "Reporting period bounds are missing."
    });

    // Gate D: Methodology Selected
    let methSelected = "FAIL";
    let methReason = "Methodology selection input is missing.";
    if (methodologySelection) {
      if (methodologySelection.selection_status === "APPLICABLE") {
        methSelected = "PASS";
        methReason = `Methodology ${methodologySelection.selected_methodology_id} successfully selected.`;
      } else if (methodologySelection.selection_status === "REQUIRES_REVIEW" || methodologySelection.selection_status === "AMBIGUOUS") {
        methSelected = "REQUIRES_REVIEW";
        methReason = `Methodology selection is ambiguous or requires review: ${methodologySelection.selection_reason}`;
      } else {
        methSelected = "FAIL";
        methReason = `Methodology selection failed with status: ${methodologySelection.selection_status}. ${methodologySelection.selection_reason}`;
      }
    }
    validationGates.push({
      gate_id: "GATE-METHODOLOGY-SELECTED",
      name: "Methodology Selected",
      status: methSelected,
      evaluation_reason: methReason
    });

    // 3. Fail-Closed Early Termination Check for Core Prerequisites
    if (!facilityIdentified || !tempResolved || regResolved === "FAIL" || methSelected === "FAIL") {
      status = "BLOCKED";
      readiness = "BLOCKED";

      const plan = new CalculationPlan({
        plan_id: planId,
        plan_version: planVersion,
        status,
        facility_context: context.facility || null,
        regulatory_context: context.regulatory_applicability || null,
        temporal_context: context.reporting_period || null,
        sector_context: context.facility ? { sector_id: context.facility.sector_id } : null,
        methodology_context: methodologySelection || null,
        validation_gates: validationGates,
        readiness,
        provenance: context.provenance || null,
        controlled_issues: Object.values(CONTROLLED_ISSUES)
      });
      const planCopy = { ...plan };
      delete planCopy.plan_id;
      plan.reproducibility_identity = calculationEngine.generateDeterministicHash(planCopy);
      return plan;
    }

    // Resolve methodology details from selection or registry
    const selectedMethId = methodologySelection.selected_methodology_id;
    const selectedMethVersion = methodologySelection.selected_methodology_version;
    const modelBindings = (methodologySelection.activity_basis && methodologySelection.activity_basis.applicable_models) || [];

    // Build requirements schemas from active methodology
    let activityDataAvailable = "PASS";
    let parametersAvailable = "PASS";
    let efResolvable = "PASS";
    let gwpResolvable = "PASS";
    let evidenceReady = "PASS";
    let unitsValid = "PASS";
    let provenanceComplete = "PASS";

    // A. Activity Data Requirements Check
    const observedAD = context.activity_data || [];
    const hasObservedAD = observedAD.length > 0;

    if (methodologySelection.activity_basis) {
      const actId = methodologySelection.activity_basis.activity_type;
      const sourceClass = methodologySelection.activity_basis.source_class;

      requiredActivityData.push({
        activity_data_requirement_id: `REQ-AD-${actId}`,
        source_category: sourceClass || "unspecified",
        activity_type: actId,
        quantity: null, // Keep requirement separate from observed value
        expected_unit: context.target_unit || "t",
        temporal_coverage: context.reporting_period,
        mandatory_status: "MANDATORY",
        data_quality_requirement: "MINISTERIAL_COMPLIANT_METERING",
        validation_constraints: { min_value: 0.0 }
      });

      if (!hasObservedAD) {
        activityDataAvailable = "FAIL";
      } else {
        const adRecord = observedAD[0];
        if (adRecord.unit !== (context.target_unit || adRecord.unit)) {
          unitsValid = "REQUIRES_NORMALIZATION";
        }
      }
    } else {
      activityDataAvailable = "FAIL";
    }

    // B. Parameter Requirements Check
    const reqParametersList = (methodologySelection.activity_basis && methodologySelection.activity_basis.applicable_models && methodologySelection.activity_basis.applicable_models[0]?.model_id === "MODEL-02")
      ? ["PAR-NCV"] : [];

    if (reqParametersList.length > 0) {
      reqParametersList.forEach(pId => {
        requiredParameters.push({
          parameter_id: pId,
          required_status: "MANDATORY",
          expected_unit: pId === "PAR-NCV" ? "TJ/kt" : "dimensionless",
          has_governed_default: false,
          validation_constraints: { min_value: 0.0 }
        });
      });

      const presentParams = (context.activity_context && context.activity_context.parameters) || [];
      const hasReqParams = reqParametersList.every(p => presentParams.includes(p));
      if (!hasReqParams) {
        parametersAvailable = "FAIL";
      }
    }

    // C. Emission Factor Requirements Check
    const hasEfsInContext = !!(context.emission_factors && context.emission_factors.length > 0);
    if (selectedMethId) {
      requiredEFRequirements.push({
        factor_class: "stationary_coal_ef",
        gas: "CO2e",
        required_status: "MANDATORY",
        provenance_requirement: "APPROVED_REGISTRY"
      });

      if (!hasEfsInContext) {
        efResolvable = "FAIL";
      }
    }

    // D. GWP Requirements Check
    const hasGwpInContext = !!(context.gwp_dataset);
    if (selectedMethId) {
      requiredGwpRequirements.push({
        required_gas_set: ["CO2", "CH4"],
        gwp_dataset_standard: "IPCC-AR5",
        gwp_application_basis: "100_YEAR_TIME_HORIZON",
        required_status: "MANDATORY"
      });

      if (!hasGwpInContext) {
        gwpResolvable = "FAIL";
      }
    }

    // E. Evidence Requirements Check
    const reqEvidenceList = (methodologySelection.evidence_basis && methodologySelection.evidence_basis.required_evidence) || [];
    if (reqEvidenceList.length > 0) {
      reqEvidenceList.forEach(eClass => {
        const supplied = (context.evidence_context && context.evidence_context.supplied_evidence) || [];
        const isSupplied = supplied.includes(eClass);

        requiredEvidence.push({
          evidence_class: eClass,
          required_status: "MANDATORY",
          is_supplied: isSupplied
        });

        if (!isSupplied) {
          evidenceReady = "FAIL";
        }
      });
    }

    // F. Provenance Verification
    const hasProvenance = !!(context.provenance && context.provenance.created_by);
    provenanceComplete = hasProvenance ? "PASS" : "FAIL";

    // Add extra validation gates
    validationGates.push(
      { gate_id: "GATE-ACTIVITY-AVAILABLE", name: "Activity Data Available", status: activityDataAvailable, evaluation_reason: activityDataAvailable === "PASS" ? "Observed activity records supplied." : "Required activity data record is missing." },
      { gate_id: "GATE-PARAMETERS-AVAILABLE", name: "Parameter Values Available", status: parametersAvailable, evaluation_reason: parametersAvailable === "PASS" ? "Mandatory parameter mappings present." : "Required parameter value is missing." },
      { gate_id: "GATE-EF-RESOLVABLE", name: "Emission Factor Resolvable", status: efResolvable, evaluation_reason: efResolvable === "PASS" ? "Matched factor coefficients available in context." : "Governed emission factor dataset is unresolved." },
      { gate_id: "GATE-GWP-RESOLVABLE", name: "GWP Dataset Resolvable", status: gwpResolvable, evaluation_reason: gwpResolvable === "PASS" ? "Global warming potentials fully resolved." : "Required GWP dataset parameters missing." },
      { gate_id: "GATE-EVIDENCE-SATISFIED", name: "Evidence Requirements Satisfied", status: evidenceReady, evaluation_reason: evidenceReady === "PASS" ? "Mandatory evidence classes present and verified." : "Missing mandatory audit evidence files." },
      { gate_id: "GATE-UNITS-VALID", name: "Units Valid", status: unitsValid, evaluation_reason: unitsValid === "PASS" ? "All input units are dimensionally compliant." : "Input unit normalization required before execution." },
      { gate_id: "GATE-PROVENANCE-COMPLETE", name: "Provenance Complete", status: provenanceComplete, evaluation_reason: provenanceComplete === "PASS" ? "System-wide tracking parameters fully resolved." : "Missing calculation audit provenance credentials." }
    );

    // 4. Resolve Model and Segment Steps (EC-CES-001)
    const activeModelId = modelBindings[0]?.model_id || "MODEL-01";

    // Handle chronological time step loops for MODEL-06 (Dynamic State)
    if (activeModelId === "MODEL-06") {
      steps.push(
        {
          step_id: "STEP-M06-INIT",
          calculation_model_id: "MODEL-06",
          description: "Initialize state transition sequence",
          temporal_segment: { start: context.reporting_period.period_start, end: context.reporting_period.period_start },
          input_requirements: ["initial_state"],
          dependencies: []
        },
        {
          step_id: "STEP-M06-DECAY-LOOP",
          calculation_model_id: "MODEL-06",
          description: "Iterate chronological decay calculations recursively across intervals",
          temporal_segment: context.reporting_period,
          input_requirements: ["decay_constant", "oxidation_factor"],
          dependencies: ["STEP-M06-INIT"]
        }
      );
    }
    // Handle mass conservation/allocations for MODEL-08 (Mass Balance)
    else if (activeModelId === "MODEL-08") {
      steps.push(
        {
          step_id: "STEP-M08-MASS-INFLOW",
          calculation_model_id: "MODEL-08",
          description: "Aggregate raw material inflows and carbon fractions",
          temporal_segment: context.reporting_period,
          input_requirements: ["mass_in", "carbon_in"],
          dependencies: []
        },
        {
          step_id: "STEP-M08-MASS-OUTFLOW",
          calculation_model_id: "MODEL-08",
          description: "Aggregate processed outflows and residual carbon fractions",
          temporal_segment: context.reporting_period,
          input_requirements: ["mass_out", "carbon_out"],
          dependencies: []
        },
        {
          step_id: "STEP-M08-ALLOCATION",
          calculation_model_id: "MODEL-08",
          description: "Perform allocation verification and mass conservation audits",
          temporal_segment: context.reporting_period,
          input_requirements: ["allocation_ratio"],
          dependencies: ["STEP-M08-MASS-INFLOW", "STEP-M08-MASS-OUTFLOW"]
        }
      );
    }
    // Handle multi-facility consolidations for MODEL-10 (Aggregation)
    else if (activeModelId === "MODEL-10") {
      steps.push(
        {
          step_id: "STEP-M10-VERIFY-BOUNDARIES",
          calculation_model_id: "MODEL-10",
          description: "Verify that organizational boundaries of sub-facilities do not overlap",
          temporal_segment: context.reporting_period,
          input_requirements: ["sub_facility_boundaries"],
          dependencies: []
        },
        {
          step_id: "STEP-M10-CONSOLIDATE",
          calculation_model_id: "MODEL-10",
          description: "Sum emissions absolute totals across shared compliance dimensions",
          temporal_segment: context.reporting_period,
          input_requirements: ["finalized_sub_runs"],
          dependencies: ["STEP-M10-VERIFY-BOUNDARIES"]
        }
      );
    }
    // Default multi-step/single-step mappings (e.g. MODEL-01 to MODEL-05)
    else {
      steps.push({
        step_id: "STEP-01",
        calculation_model_id: activeModelId,
        description: `Execute direct emissions coefficient lookup and formula routing for ${activeModelId}`,
        temporal_segment: context.reporting_period,
        input_requirements: ["activity_data_quantity", "emission_factor"],
        parameter_requirements: reqParametersList,
        factor_requirements: ["stationary_coal_ef"],
        gwp_requirements: ["CO2", "CH4"],
        dependencies: [],
        expected_output_type: "PhysicalGasMassArray",
        provenance: { methodology_id: selectedMethId, version: selectedMethVersion }
      });
    }

    // Build default dependency graph ordering
    const dependenciesGraph = [
      { task: "Activity Data Collection", depends_on: [] },
      { task: "Parameter Resolution", depends_on: ["Activity Data Collection"] },
      { task: "EF Resolution", depends_on: ["Parameter Resolution"] },
      { task: "GWP Dataset Resolution", depends_on: [] },
      { task: "Calculation Execution", depends_on: ["Activity Data Collection", "Parameter Resolution", "EF Resolution"] },
      { task: "GWP Application", depends_on: ["Calculation Execution", "GWP Dataset Resolution"] }
    ];

    // 5. Final Status and Readiness Decision Model
    if (regResolved === "REQUIRES_REVIEW" || methSelected === "REQUIRES_REVIEW") {
      status = "REVIEW_REQUIRED";
      readiness = "REVIEW_REQUIRED";
    } else {
      const anyGatesFailed = validationGates.some(g => g.status === "FAIL");
      if (anyGatesFailed) {
        status = "BLOCKED";
        readiness = "NOT_READY";
      } else {
        status = context.plan_status || "READY";
        readiness = "READY";
      }
    }

    // Propagate controlled issues based on context properties
    Object.values(CONTROLLED_ISSUES).forEach(issue => {
      let propagate = false;
      if (issue.id === "ISSUE-MTH-001" && activeModelId === "MODEL-02") propagate = true;
      if (issue.id === "ISSUE-TEMP-002" && context.is_straddled) propagate = true;
      if (issue.id === "ISSUE-SPM-003" && context.facility?.sector_id === "SEC-AMBIGUOUS") propagate = true;
      if (issue.id === "ISSUE-RRM-001" && context.facility?.sector_id === "SEC-AMBIGUOUS") propagate = true;
      
      if (propagate) {
        propagatedIssues.push(issue);
      }
    });

    const plan = new CalculationPlan({
      plan_id: planId,
      plan_version: planVersion,
      status,
      facility_context: context.facility || null,
      regulatory_context: context.regulatory_applicability || null,
      temporal_context: context.reporting_period || null,
      sector_context: context.facility ? { sector_id: context.facility.sector_id } : null,
      methodology_context: methodologySelection || null,
      steps,
      required_activity_data: requiredActivityData,
      required_parameters: requiredParameters,
      required_emission_factor_requirements: requiredEFRequirements,
      required_gwp_requirements: requiredGwpRequirements,
      required_evidence: requiredEvidence,
      dependencies: dependenciesGraph,
      validation_gates: validationGates,
      readiness,
      provenance: context.provenance || null,
      controlled_issues: propagatedIssues
    });

    // Pure Deterministic Hashing
    const planCopy = { ...plan };
    delete planCopy.plan_id;
    plan.reproducibility_identity = calculationEngine.generateDeterministicHash(planCopy);

    return plan;
  }
}

export const calculationPlanEngine = new CalculationPlanEngine();
