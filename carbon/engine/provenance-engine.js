/**
 * ENERIX Carbon - Evidence and Provenance Engine
 * Governed Lineage, Evidence Traceability, and Calculation Assurance Core
 * Fully compliant with EC-UCM-001, EC-DOMAIN-MODEL-001, and G4 Task #0022.
 */

import { calculationEngine, CalculationEngineError } from './calculation-engine.js';

/**
 * Governed Subject Types
 */
export const PROVENANCE_SUBJECT_TYPES = {
  DOCUMENT: 'DOCUMENT',
  EXTRACTION_CANDIDATE: 'EXTRACTION_CANDIDATE',
  ACTIVITY_DATA: 'ACTIVITY_DATA',
  EVIDENCE: 'EVIDENCE',
  CALCULATION_PLAN: 'CALCULATION_PLAN',
  CALCULATION_RUN: 'CALCULATION_RUN',
  SNAPSHOT: 'SNAPSHOT',
  RESULT: 'RESULT'
};

/**
 * Governed Transformation / Derivation Types
 */
export const TRANSFORMATION_TYPES = {
  INGESTION: 'INGESTION',
  EXTRACTION: 'EXTRACTION',
  HUMAN_CORRECTION: 'HUMAN_CORRECTION',
  PLANNING: 'PLANNING',
  CALCULATION: 'CALCULATION',
  SNAPSHOT_FREEZE: 'SNAPSHOT_FREEZE',
  EVIDENCE_ATTACHMENT: 'EVIDENCE_ATTACHMENT',
  VALIDATION: 'VALIDATION',
  APPROVAL: 'APPROVAL'
};

/**
 * Governed Relationship Types
 */
export const RELATIONSHIP_TYPES = {
  DERIVED_FROM: 'DERIVED_FROM',
  SUPPORTED_BY: 'SUPPORTED_BY',
  CONSUMED_BY: 'CONSUMED_BY',
  SNAPSHOT_OF: 'SNAPSHOT_OF',
  SUPERSEDES: 'SUPERSEDES',
  APPROVED_BY: 'APPROVED_BY',
  REVIEWED_BY: 'REVIEWED_BY'
};

/**
 * Governed Actor Types
 */
export const ACTOR_TYPES = {
  HUMAN: 'HUMAN',
  AI: 'AI',
  OCR: 'OCR',
  SYSTEM: 'SYSTEM',
  EXTERNAL_SERVICE: 'EXTERNAL_SERVICE'
};

/**
 * Provenance Record Model
 * Lineage/derivation metadata for any material carbon data entity.
 */
export class ProvenanceRecord {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Provenance data cannot be null');
    }
    if (!data.provenance_id) {
      throw new CalculationEngineError('INVALID_INPUT', 'provenance_id is required');
    }
    if (!data.subject_id) {
      throw new CalculationEngineError('INVALID_INPUT', 'subject_id is required');
    }

    this.provenance_id = data.provenance_id;
    this.subject_type = data.subject_type || PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA;
    this.subject_id = data.subject_id;
    this.source_type = data.source_type || null;
    this.source_id = data.source_id || null;
    this.source_version = data.source_version || '1.0.0';
    this.parent_provenance_id = data.parent_provenance_id || null;
    this.transformation_type = data.transformation_type || null;
    this.relationship_type = data.relationship_type || RELATIONSHIP_TYPES.DERIVED_FROM;
    this.actor_type = data.actor_type || ACTOR_TYPES.SYSTEM;
    this.actor_id = data.actor_id || null;
    this.timestamp = data.timestamp || new Date().toISOString();
    
    // Governed contextual bindings
    this.methodology_id = data.methodology_id || null;
    this.methodology_version = data.methodology_version || null;
    this.regulatory_rule_id = data.regulatory_rule_id || null;
    this.regulatory_rule_version = data.regulatory_rule_version || null;
    this.sector_profile_id = data.sector_profile_id || null;
    this.calculation_model_ref = data.calculation_model_ref || null;
    this.emission_factor_ids = Array.isArray(data.emission_factor_ids) ? [...data.emission_factor_ids] : [];
    this.gwp_dataset_id = data.gwp_dataset_id || null;
    this.evidence_refs = Array.isArray(data.evidence_refs) ? [...data.evidence_refs] : [];
    
    this.engine_version = data.engine_version || '1.0.0';
    this.status = data.status || 'ACTIVE';
    this.integrity_hash = data.integrity_hash || null;
    this.hash_type = data.hash_type || 'REPRODUCIBILITY_HASH';
    this.metadata = data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : {};
  }
}

/**
 * Lineage Edge Model
 * Directed lineage edge connecting entities in the provenance graph.
 */
export class LineageEdge {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Lineage edge data cannot be null');
    }
    this.edge_id = data.edge_id || `EDGE-${data.from_subject_id}->${data.to_subject_id}`;
    this.from_subject_id = data.from_subject_id;
    this.from_subject_type = data.from_subject_type || null;
    this.to_subject_id = data.to_subject_id;
    this.to_subject_type = data.to_subject_type || null;
    this.relationship_type = data.relationship_type || RELATIONSHIP_TYPES.DERIVED_FROM;
    this.created_at = data.created_at || new Date().toISOString();
    this.metadata = data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : {};
  }
}

/**
 * Evidence and Provenance Engine
 */
export class ProvenanceEngine {
  constructor() {
    this.records = new Map(); // provenance_id -> ProvenanceRecord
    this.subjectIndex = new Map(); // subject_id -> [provenance_id]
    this.edges = []; // array of LineageEdge
    this.snapshots = new Map(); // snapshot_id -> Snapshot
    this.evidenceStore = new Map(); // evidence_id -> Evidence details
  }

  /**
   * Resets the in-memory registry (used for test isolation).
   */
  clear() {
    this.records.clear();
    this.subjectIndex.clear();
    this.edges = [];
    this.snapshots.clear();
    this.evidenceStore.clear();
  }

  /**
   * Canonical serialization of a value for deterministic hashing.
   */
  serializeCanonical(val) {
    if (val === null || val === undefined) return 'null';
    if (typeof val !== 'object') {
      return typeof val === 'string' ? `"${val}"` : String(val);
    }
    if (Array.isArray(val)) {
      return `[${val.map(item => this.serializeCanonical(item)).join(',')}]`;
    }
    const keys = Object.keys(val).sort();
    return `{${keys.map(k => `"${k}":${this.serializeCanonical(val[k])}`).join(',')}}`;
  }

  /**
   * Computes deterministic reproducibility hash for a provenance payload.
   * Note: This is an algebraic reproducibility hash (cyrb53 / FNV-1a derived).
   * It is accurately documented as REPRODUCIBILITY_HASH, not a cryptographic signature.
   */
  computeReproducibilityHash(data, omitKeys = ['integrity_hash', 'timestamp']) {
    const sanitized = {};
    for (const k of Object.keys(data)) {
      if (!omitKeys.includes(k)) {
        sanitized[k] = data[k];
      }
    }
    const canonicalStr = this.serializeCanonical(sanitized);

    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0, ch; i < canonicalStr.length; i++) {
      ch = canonicalStr.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    const hashCombined = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
    return `repro-hash-${hashCombined.padStart(16, '0')}`;
  }

  /**
   * Registers a new provenance record in the immutable ledger.
   */
  registerProvenance(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Provenance record data cannot be null');
    }

    const provId = data.provenance_id;
    const computedHash = this.computeReproducibilityHash(data);

    // Duplicate ID check with content comparison
    if (this.records.has(provId)) {
      const existing = this.records.get(provId);
      const existingHash = existing.integrity_hash || this.computeReproducibilityHash(existing);

      if (existingHash === computedHash) {
        // Idempotent re-registration of identical record
        return existing;
      }

      // Conflict: same ID, different semantic payload
      throw new CalculationEngineError(
        'DUPLICATE_PROVENANCE_IDENTITY',
        `Provenance ID ${provId} already exists with different content. Mutation is prohibited.`
      );
    }

    // Version collision check: same subject_id and version with different data
    const existingForSubject = this.getRecordsForSubject(data.subject_id);
    for (const rec of existingForSubject) {
      if (rec.source_version === data.source_version && rec.provenance_id !== provId) {
        const recHash = rec.integrity_hash || this.computeReproducibilityHash(rec);
        if (recHash !== computedHash) {
          throw new CalculationEngineError(
            'VERSION_COLLISION',
            `Subject ${data.subject_id} version ${data.source_version} already exists under ${rec.provenance_id}. New versions must increment version identifier.`
          );
        }
      }
    }

    // Actor authority check
    const authCheck = this.evaluateActorAuthority(data);
    if (!authCheck.authorized) {
      throw new CalculationEngineError(authCheck.issue, authCheck.message);
    }

    const record = new ProvenanceRecord({
      ...data,
      integrity_hash: computedHash,
      hash_type: 'REPRODUCIBILITY_HASH'
    });

    // Store immutably (freeze record object to prevent direct mutations)
    Object.freeze(record);
    this.records.set(provId, record);

    if (!this.subjectIndex.has(record.subject_id)) {
      this.subjectIndex.set(record.subject_id, []);
    }
    this.subjectIndex.get(record.subject_id).push(provId);

    return record;
  }

  /**
   * Registers an explicit lineage edge between two subjects.
   */
  registerEdge(data) {
    if (!data || !data.from_subject_id || !data.to_subject_id) {
      throw new CalculationEngineError('INVALID_INPUT', 'from_subject_id and to_subject_id are required');
    }

    // Detect contradictory or inverted lineage (e.g., Document derived from Result)
    if (
      data.from_subject_type === PROVENANCE_SUBJECT_TYPES.RESULT &&
      data.to_subject_type === PROVENANCE_SUBJECT_TYPES.DOCUMENT
    ) {
      throw new CalculationEngineError(
        'IMPOSSIBLE_LINEAGE_TRANSITION',
        'Cannot register inverted lineage from RESULT to DOCUMENT'
      );
    }

    // Check for conflicting derivation edge if one already exists for to_subject_id
    if (data.relationship_type === RELATIONSHIP_TYPES.DERIVED_FROM) {
      const existingDerivations = this.edges.filter(
        e => e.to_subject_id === data.to_subject_id && e.relationship_type === RELATIONSHIP_TYPES.DERIVED_FROM
      );
      for (const e of existingDerivations) {
        if (e.from_subject_id !== data.from_subject_id) {
          throw new CalculationEngineError(
            'CONFLICTING_LINEAGE_EDGES',
            `Subject ${data.to_subject_id} already has a conflicting derivation source: ${e.from_subject_id}`
          );
        }
      }
    }

    const edge = new LineageEdge(data);
    Object.freeze(edge);
    this.edges.push(edge);
    return edge;
  }

  /**
   * Evaluates actor authority rules.
   * AI/OCR actors are strictly prohibited from granting approval authority.
   */
  evaluateActorAuthority(recordData) {
    const isApproval =
      recordData.relationship_type === RELATIONSHIP_TYPES.APPROVED_BY ||
      recordData.transformation_type === TRANSFORMATION_TYPES.APPROVAL;

    if (isApproval) {
      if (recordData.actor_type === ACTOR_TYPES.AI || recordData.actor_type === ACTOR_TYPES.OCR) {
        return {
          authorized: false,
          issue: 'AI_AUTHORITY_VIOLATION',
          message: 'AI/OCR actors cannot grant approval authority. Human sign-off is strictly required.'
        };
      }
    }
    return { authorized: true };
  }

  /**
   * Validates completeness of a provenance record against governed constraints.
   */
  verifyProvenanceCompleteness(record, options = {}) {
    const issues = [];

    if (!record.source_id) {
      issues.push({ code: 'SOURCE_MISSING', severity: 'BLOCKING', message: 'Source identifier is missing' });
    }
    if (!record.source_version) {
      issues.push({ code: 'VERSION_MISSING', severity: 'REVIEW', message: 'Source version is missing' });
    }
    if (!record.transformation_type) {
      issues.push({ code: 'TRANSFORMATION_MISSING', severity: 'BLOCKING', message: 'Transformation type is missing' });
    }
    if (!record.actor_type || !record.actor_id) {
      issues.push({ code: 'ACTOR_ATTRIBUTION_MISSING', severity: 'BLOCKING', message: 'Actor attribution is missing' });
    }
    if (!record.engine_version) {
      issues.push({ code: 'ENGINE_VERSION_MISSING', severity: 'REVIEW', message: 'Engine version is missing' });
    }

    // Parent lineage presence check
    if (options.requireParent) {
      if (!record.parent_provenance_id) {
        issues.push({ code: 'PARENT_LINEAGE_MISSING', severity: 'BLOCKING', message: 'Required parent provenance ID is missing' });
      } else {
        const parents = Array.isArray(record.parent_provenance_id) ? record.parent_provenance_id : [record.parent_provenance_id];
        for (const pId of parents) {
          if (!this.records.has(pId)) {
            issues.push({ code: 'BROKEN_PARENT_REFERENCE', severity: 'BLOCKING', message: `Parent provenance record ${pId} does not exist in ledger` });
          }
        }
      }
    }

    // Evidence requirement for ActivityData
    if (record.subject_type === PROVENANCE_SUBJECT_TYPES.ACTIVITY_DATA && options.requireEvidence) {
      if (!record.evidence_refs || record.evidence_refs.length === 0) {
        issues.push({ code: 'EVIDENCE_MISSING', severity: 'REVIEW', message: 'Activity data has no supporting evidence attached' });
      }
    }

    let status = 'COMPLETE';
    if (issues.some(i => i.severity === 'BLOCKING')) {
      status = 'BLOCKED';
    } else if (issues.length > 0) {
      status = 'REQUIRES_REVIEW';
    }

    return {
      is_complete: issues.length === 0,
      status,
      issues
    };
  }

  /**
   * Registers an evidence artifact with state tracking.
   */
  registerEvidence(evidenceData) {
    if (!evidenceData || !evidenceData.evidence_id) {
      throw new CalculationEngineError('INVALID_INPUT', 'evidence_id is required');
    }
    const evidenceRecord = {
      evidence_id: evidenceData.evidence_id,
      title: evidenceData.title || 'Untitled Evidence',
      evidence_type: evidenceData.evidence_type || 'DOCUMENT',
      facility_id: evidenceData.facility_id,
      file_path: evidenceData.file_path || null,
      sha256_hash: evidenceData.sha256_hash || null,
      evidence_state: evidenceData.evidence_state || 'available', // available | validated | approved
      version: evidenceData.version || '1.0.0',
      created_at: evidenceData.created_at || new Date().toISOString()
    };
    this.evidenceStore.set(evidenceData.evidence_id, Object.freeze(evidenceRecord));
    return evidenceRecord;
  }

  /**
   * Fetches records associated with a subject_id.
   */
  getRecordsForSubject(subjectId) {
    const ids = this.subjectIndex.get(subjectId) || [];
    return ids.map(id => this.records.get(id)).filter(Boolean);
  }

  /**
   * Fetches a single record by provenance_id.
   */
  getRecord(provenanceId) {
    return this.records.get(provenanceId) || null;
  }

  // ============================================================
  // ASSURANCE QUERIES (Section 17)
  // ============================================================

  /**
   * Query 1: Where did this value/subject originate?
   * Traces back to root documents or external origins.
   */
  getSourceOrigin(subjectId) {
    const trace = this.traceBackward(subjectId);
    return trace.root_sources;
  }

  /**
   * Query 2: Which evidence supports it?
   * Distinguishes available, validated, and approved evidence.
   */
  getSupportingEvidence(subjectId) {
    const supportingEdges = this.edges.filter(
      e => (e.to_subject_id === subjectId || e.from_subject_id === subjectId) &&
           e.relationship_type === RELATIONSHIP_TYPES.SUPPORTED_BY
    );
    const evidenceIds = new Set();

    // From edges
    for (const e of supportingEdges) {
      if (e.to_subject_id === subjectId) evidenceIds.add(e.from_subject_id);
      else evidenceIds.add(e.to_subject_id);
    }

    // From provenance records
    const records = this.getRecordsForSubject(subjectId);
    for (const r of records) {
      for (const eId of r.evidence_refs || []) {
        evidenceIds.add(eId);
      }
    }

    const results = [];
    for (const eId of evidenceIds) {
      const stored = this.evidenceStore.get(eId);
      if (stored) {
        results.push(stored);
      } else {
        results.push({
          evidence_id: eId,
          evidence_state: 'available',
          verified: false
        });
      }
    }
    return results;
  }

  /**
   * Query 3: Which document produced the candidate?
   */
  getCandidateSourceDocument(candidateId) {
    const edge = this.edges.find(
      e => e.to_subject_id === candidateId && e.relationship_type === RELATIONSHIP_TYPES.DERIVED_FROM
    );
    if (edge) {
      return { document_id: edge.from_subject_id };
    }
    const records = this.getRecordsForSubject(candidateId);
    if (records.length > 0 && records[0].source_id) {
      return { document_id: records[0].source_id };
    }
    return null;
  }

  /**
   * Query 4: Which methodology governed the calculation?
   */
  getGoverningMethodology(subjectIdOrRunId) {
    const records = this.getRecordsForSubject(subjectIdOrRunId);
    for (const r of records) {
      if (r.methodology_id) {
        return {
          methodology_id: r.methodology_id,
          version: r.methodology_version || '1.0.0'
        };
      }
    }
    // Backward trace
    const trace = this.traceBackward(subjectIdOrRunId);
    for (const node of trace.chain) {
      const recs = this.getRecordsForSubject(node.subject_id);
      for (const r of recs) {
        if (r.methodology_id) {
          return {
            methodology_id: r.methodology_id,
            version: r.methodology_version || '1.0.0'
          };
        }
      }
    }
    return null;
  }

  /**
   * Query 5: Which regulatory rule applied?
   */
  getAppliedRegulatoryRule(subjectIdOrRunId) {
    const records = this.getRecordsForSubject(subjectIdOrRunId);
    for (const r of records) {
      if (r.regulatory_rule_id) {
        return {
          rule_id: r.regulatory_rule_id,
          version: r.regulatory_rule_version || '1.0.0'
        };
      }
    }
    const trace = this.traceBackward(subjectIdOrRunId);
    for (const node of trace.chain) {
      const recs = this.getRecordsForSubject(node.subject_id);
      for (const r of recs) {
        if (r.regulatory_rule_id) {
          return {
            rule_id: r.regulatory_rule_id,
            version: r.regulatory_rule_version || '1.0.0'
          };
        }
      }
    }
    return null;
  }

  /**
   * Query 6: Which calculation plan consumed this activity data?
   */
  getConsumingCalculationPlan(activityDataId) {
    const edge = this.edges.find(
      e => e.from_subject_id === activityDataId && e.relationship_type === RELATIONSHIP_TYPES.CONSUMED_BY
    );
    if (edge) {
      return { plan_id: edge.to_subject_id };
    }
    return null;
  }

  /**
   * Query 7: Which calculation run consumed this plan or activity data?
   */
  getConsumingCalculationRun(planOrDataId) {
    const edge = this.edges.find(
      e => e.from_subject_id === planOrDataId && e.relationship_type === RELATIONSHIP_TYPES.CONSUMED_BY
    );
    if (edge) {
      return { run_id: edge.to_subject_id };
    }
    return null;
  }

  /**
   * Query 8: Which snapshot froze the calculation run or result?
   */
  getFreezingSnapshot(runIdOrResultId) {
    const edge = this.edges.find(
      e => e.from_subject_id === runIdOrResultId && e.relationship_type === RELATIONSHIP_TYPES.SNAPSHOT_OF
    );
    if (edge) {
      return this.snapshots.get(edge.to_subject_id) || { snapshot_id: edge.to_subject_id };
    }
    return null;
  }

  /**
   * Query 9: Which versions were used across the entire lineage chain?
   */
  getLineageVersions(subjectId) {
    const trace = this.traceBackward(subjectId);
    const versions = {};
    for (const node of trace.chain) {
      const recs = this.getRecordsForSubject(node.subject_id);
      if (recs.length > 0) {
        versions[node.subject_id] = {
          subject_type: recs[0].subject_type,
          version: recs[0].source_version
        };
      }
    }
    return versions;
  }

  /**
   * Query 10: Has any lineage component been superseded?
   */
  isSuperseded(subjectId) {
    const trace = this.traceBackward(subjectId);
    for (const node of trace.chain) {
      // Check if there is a SUPERSEDES edge originating from another entity
      const supersededByEdge = this.edges.find(
        e => e.from_subject_id === node.subject_id && e.relationship_type === RELATIONSHIP_TYPES.SUPERSEDES
      );
      if (supersededByEdge) {
        return { superseded: true, superseded_subject_id: node.subject_id, superseded_by: supersededByEdge.to_subject_id };
      }
      const recs = this.getRecordsForSubject(node.subject_id);
      if (recs.some(r => r.status === 'SUPERSEDED')) {
        return { superseded: true, superseded_subject_id: node.subject_id };
      }
    }
    return { superseded: false };
  }

  // ============================================================
  // FORWARD & BACKWARD TRACE (Section 18)
  // ============================================================

  /**
   * Backward trace: Traverses from target (Result/Snapshot) back to root source documents.
   * Cycle-safe using a visited set.
   */
  traceBackward(startSubjectId) {
    const visited = new Set();
    const chain = [];
    const queue = [startSubjectId];
    const rootSources = [];
    const evidenceRecords = [];

    while (queue.length > 0) {
      const currentId = queue.shift();
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const records = this.getRecordsForSubject(currentId);
      const subjectType = records.length > 0 ? records[0].subject_type : 'UNKNOWN';

      chain.push({
        subject_id: currentId,
        subject_type: subjectType,
        provenance_records: records
      });

      // Check if this is a root source
      if (subjectType === PROVENANCE_SUBJECT_TYPES.DOCUMENT) {
        rootSources.push({ document_id: currentId, records });
      }

      // Find incoming edges (edges where current is the target to_subject_id)
      const incoming = this.edges.filter(e => e.to_subject_id === currentId);
      for (const edge of incoming) {
        if (!visited.has(edge.from_subject_id)) {
          queue.push(edge.from_subject_id);
        }
        if (edge.relationship_type === RELATIONSHIP_TYPES.SUPPORTED_BY) {
          evidenceRecords.push(edge.from_subject_id);
        }
      }

      // Also check parent provenance linkages directly in records
      for (const r of records) {
        if (r.parent_provenance_id) {
          const parents = Array.isArray(r.parent_provenance_id) ? r.parent_provenance_id : [r.parent_provenance_id];
          for (const pId of parents) {
            const pRec = this.records.get(pId);
            if (pRec && !visited.has(pRec.subject_id)) {
              queue.push(pRec.subject_id);
            }
          }
        }
        if (r.source_id && !visited.has(r.source_id)) {
          queue.push(r.source_id);
        }
      }
    }

    return {
      start_subject_id: startSubjectId,
      chain,
      depth: chain.length,
      root_sources: rootSources,
      evidence_records: [...new Set(evidenceRecords)]
    };
  }

  /**
   * Forward trace: Traverses from origin (Document/Candidate) forward to Results.
   * Cycle-safe using a visited set.
   */
  traceForward(startSubjectId) {
    const visited = new Set();
    const chain = [];
    const queue = [startSubjectId];
    const terminals = [];

    while (queue.length > 0) {
      const currentId = queue.shift();
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const records = this.getRecordsForSubject(currentId);
      const subjectType = records.length > 0 ? records[0].subject_type : 'UNKNOWN';

      chain.push({
        subject_id: currentId,
        subject_type: subjectType,
        provenance_records: records
      });

      // Find outgoing edges (edges where current is from_subject_id)
      const outgoing = this.edges.filter(e => e.from_subject_id === currentId);
      if (outgoing.length === 0) {
        terminals.push({ subject_id: currentId, subject_type: subjectType });
      } else {
        for (const edge of outgoing) {
          if (!visited.has(edge.to_subject_id)) {
            queue.push(edge.to_subject_id);
          }
        }
      }
    }

    return {
      start_subject_id: startSubjectId,
      chain,
      depth: chain.length,
      terminals
    };
  }

  // ============================================================
  // BACKWARDS COMPATIBILITY FOR TEST-RUNNER & SNAPSHOT INTEGRITY
  // ============================================================

  /**
   * Creates a formal calculation run snapshot.
   * Preserves backward compatibility with existing tests in test-runner.js.
   */
  createRunSnapshot(runData) {
    const runId = runData.calculation_run_id || `RUN-${Date.now()}`;
    const rawSnapshot = {
      run_id: runId,
      timestamp: runData.timestamp || '2026-09-16T12:00:00.000Z',
      engine_version: runData.engine_version || '1.0.0',
      data_provenance: {
        facility_id: runData.facilityId || runData.facility_id || 'FAC-UNKNOWN',
        reporting_period: runData.period || runData.reporting_period || '2026',
        regulatory_rule: runData.ruleId || runData.regulatory_rule || 'RULE-QD-42-2026-PRIMARY',
        regulatory_rule_version: runData.regulatory_rule_version || '1.0.0',
        methodology_id: runData.methodologyId || runData.methodology_id || 'METH-BCT-38-2023',
        methodology_version: runData.methodology_version || '1.0.0',
        emission_factors_used: runData.factorsUsed || runData.emission_factors_used || [],
        gwp_dataset_used: runData.gwpDatasetId || runData.gwp_dataset_used || 'GWP-IPCC-AR5',
        activity_data_refs: runData.activityDataRefs || []
      },
      inputs: runData.rawInputs || runData.inputs || {},
      outputs: {
        result_co2e_tons: runData.resultCO2e !== undefined ? runData.resultCO2e : (runData.outputs ? runData.outputs.result_co2e_tons : 0),
        gas_breakdown: runData.gasResults || (runData.outputs ? runData.outputs.gas_breakdown : [])
      }
    };

    // Calculate deterministic reproducibility hash
    const hash = calculationEngine.generateDeterministicHash(rawSnapshot);
    const snapshotWithHash = {
      ...rawSnapshot,
      audit_hash: hash,
      hash_type: 'REPRODUCIBILITY_HASH'
    };

    // Store in snapshots registry
    this.snapshots.set(runId, snapshotWithHash);

    return snapshotWithHash;
  }

  /**
   * Verifies run snapshot integrity against tampering.
   * Preserves backward compatibility with existing tests in test-runner.js.
   */
  verifySnapshotIntegrity(snapshot) {
    const { audit_hash, hash_type, ...dataWithoutHash } = snapshot;
    const computedHash = calculationEngine.generateDeterministicHash(dataWithoutHash);
    return {
      tamperDetected: audit_hash !== computedHash,
      expectedHash: computedHash,
      actualHash: audit_hash
    };
  }
}

export const provenanceEngine = new ProvenanceEngine();
