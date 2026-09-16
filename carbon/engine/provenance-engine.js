/**
 * ENERIX Carbon - Provenance Engine
 * Generates audit traces, immutability records, and lineage tracking for calculation runs.
 */
import { calculationEngine } from './calculation-engine.js';

export class ProvenanceEngine {
  createRunSnapshot(runData) {
    const rawSnapshot = {
      run_id: runData.calculation_run_id || `RUN-${Date.now()}`,
      timestamp: new Date().toISOString(),
      engine_version: '1.0.0',
      data_provenance: {
        facility_id: runData.facilityId || 'FAC-UNKNOWN',
        reporting_period: runData.period || '2026',
        regulatory_rule: runData.ruleId || 'RULE-QD-42-2026-PRIMARY',
        methodology_id: runData.methodologyId || 'METH-BCT-38-2023',
        emission_factors_used: runData.factorsUsed || [],
        gwp_dataset_used: runData.gwpDatasetId || 'GWP-IPCC-AR5'
      },
      inputs: runData.rawInputs || {},
      outputs: {
        result_co2e_tons: runData.resultCO2e || 0,
        gas_breakdown: runData.gasResults || []
      }
    };

    // Calculate cryptographic reproducibility hash using calculationEngine utility
    const hash = calculationEngine.generateDeterministicHash(rawSnapshot);

    return {
      ...rawSnapshot,
      audit_hash: hash
    };
  }

  // Verification method to assert run snapshot integrity
  verifySnapshotIntegrity(snapshot) {
    const { audit_hash, ...dataWithoutHash } = snapshot;
    const computedHash = calculationEngine.generateDeterministicHash(dataWithoutHash);
    return {
      tamperDetected: audit_hash !== computedHash,
      expectedHash: computedHash,
      actualHash: audit_hash
    };
  }
}

export const provenanceEngine = new ProvenanceEngine();
