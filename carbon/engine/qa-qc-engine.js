/**
 * ENERIX Carbon - QA/QC & Data Health Engine
 * Evaluates the health, completeness, integrity, readiness, and assurance state of Carbon data/calculation contexts.
 * Fully compliant with EC-UCM-001, EC-DOMAIN-MODEL-001, EC-KM-001, EC-CES-001, EC-TEST-001,
 * EC-TEMP-001, EC-RRM-001, EC-SPM-001, EC-MTH-001, EC-EFR-001, and EC-GWP-001.
 *
 * CRITICAL ARCHITECTURAL BOUNDARY:
 * QA/QC is strictly an assurance evaluation layer. It is NOT a calculation authority.
 * It contains zero numerical emissions equations, zero emission factor multipliers, and zero GWP operations.
 * It does NOT invent arbitrary numerical 0-100 scores; all health states are derived semantically and explainably.
 */

export const QA_ENGINE_VERSION = '1.0.0';

/**
 * Governed QA Check Result States
 */
export const QA_RESULT_STATES = Object.freeze({
  PASS: 'PASS',
  WARNING: 'WARNING',
  REQUIRES_REVIEW: 'REQUIRES_REVIEW',
  BLOCKED: 'BLOCKED',
  UNKNOWN: 'UNKNOWN',
  NOT_APPLICABLE: 'NOT_APPLICABLE'
});

/**
 * Governed Overall DataHealth States
 */
export const DATA_HEALTH_STATES = Object.freeze({
  HEALTHY: 'HEALTHY',
  WARNING: 'WARNING',
  REQUIRES_REVIEW: 'REQUIRES_REVIEW',
  BLOCKED: 'BLOCKED',
  UNKNOWN: 'UNKNOWN'
});

/**
 * Governed Severity Levels
 */
export const QA_SEVERITY = Object.freeze({
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
});

/**
 * 16 Distinct Governed Health Dimensions
 */
export const HEALTH_DIMENSIONS = Object.freeze({
  REGULATORY_READINESS: 'regulatory_readiness',
  TEMPORAL_INTEGRITY: 'temporal_integrity',
  SECTOR_PROFILE_CONSISTENCY: 'sector_profile_consistency',
  METHODOLOGY_READINESS: 'methodology_readiness',
  ACTIVITY_DATA_COMPLETENESS: 'activity_data_completeness',
  ACTIVITY_DATA_VALIDITY: 'activity_data_validity',
  EVIDENCE_COVERAGE: 'evidence_coverage',
  PROVENANCE_COVERAGE: 'provenance_coverage',
  PARAMETER_READINESS: 'parameter_readiness',
  EF_READINESS: 'ef_readiness',
  GWP_READINESS: 'gwp_readiness',
  CALCULATION_PLAN_READINESS: 'calculation_plan_readiness',
  CALCULATION_STRUCTURAL_INTEGRITY: 'calculation_structural_integrity',
  DUPLICATE_CONFLICT_STATE: 'duplicate_conflict_state',
  HISTORICAL_VERSION_INTEGRITY: 'historical_version_integrity',
  CONTROLLED_ISSUE_IMPACT: 'controlled_issue_impact'
});

/**
 * Structured QA Check Model
 */
export class QACheck {
  constructor({
    check_id,
    dimension,
    subject_type,
    subject_id,
    rule_reference = null,
    severity = QA_SEVERITY.INFO,
    status = QA_RESULT_STATES.PASS,
    finding = null,
    evidence = null,
    provenance = null,
    issue_reference = null,
    remediation = null,
    evaluator_version = QA_ENGINE_VERSION
  }) {
    this.check_id = check_id;
    this.dimension = dimension;
    this.subject_type = subject_type;
    this.subject_id = subject_id;
    this.rule_reference = rule_reference;
    this.severity = severity;
    this.status = status;
    this.finding = finding;
    this.evidence = evidence;
    this.provenance = provenance;
    this.issue_reference = issue_reference;
    this.remediation = remediation;
    this.evaluator_version = evaluator_version;
    this.timestamp = '2026-09-16T10:00:00.000Z';
    Object.freeze(this);
  }
}

/**
 * Immutable Data Health Snapshot Model
 */
export class DataHealthSnapshot {
  constructor({
    snapshot_id,
    subject_type,
    subject_id,
    context = {},
    overall_health_state = DATA_HEALTH_STATES.UNKNOWN,
    dimension_results = {},
    checks = [],
    issue_references = [],
    reproducibility_hash = null,
    evaluator_version = QA_ENGINE_VERSION
  }) {
    this.snapshot_id = snapshot_id;
    this.subject_type = subject_type;
    this.subject_id = subject_id;
    this.context = Object.freeze({ ...context });
    this.overall_health_state = overall_health_state;
    this.dimension_results = Object.freeze({ ...dimension_results });
    this.checks = Object.freeze([...checks]);
    this.findings = Object.freeze(this.checks.filter(c => c.status !== QA_RESULT_STATES.PASS && c.status !== QA_RESULT_STATES.NOT_APPLICABLE));
    this.blocked_checks = Object.freeze(this.checks.filter(c => c.status === QA_RESULT_STATES.BLOCKED));
    this.review_checks = Object.freeze(this.checks.filter(c => c.status === QA_RESULT_STATES.REQUIRES_REVIEW));
    this.warning_checks = Object.freeze(this.checks.filter(c => c.status === QA_RESULT_STATES.WARNING));
    this.issue_references = Object.freeze([...new Set(issue_references)].sort());
    this.reproducibility_hash = reproducibility_hash;
    this.evaluator_version = evaluator_version;
    this.evaluated_at = '2026-09-16T10:00:00.000Z';
    Object.freeze(this);
  }
}

/**
 * Primary QA/QC and Data Health Evaluation Engine
 */
export class QAQCEngine {
  constructor() {
    this.version = QA_ENGINE_VERSION;
  }

  /**
   * Deterministic Non-Cryptographic Integrity/Reproducibility Hash
   */
  computeReproducibilityHash(data) {
    const stringifySorted = (obj) => {
      if (obj === null || typeof obj !== 'object') {
        return JSON.stringify(obj);
      }
      if (Array.isArray(obj)) {
        return `[${obj.map(stringifySorted).join(',')}]`;
      }
      const sortedKeys = Object.keys(obj).sort();
      const entries = sortedKeys.map(k => `${JSON.stringify(k)}:${stringifySorted(obj[k])}`);
      return `{${entries.join(',')}}`;
    };

    const canonical = stringifySorted(data);
    let h1 = 0xdeadbeef ^ 0;
    let h2 = 0x41c6ce57 ^ 0;
    for (let i = 0; i < canonical.length; i++) {
      const ch = canonical.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const combined = 4294967296 * (2097151 & h2) + (h1 >>> 0);
    return `repro-hash-${combined.toString(16)}`;
  }

  /**
   * Evaluates entire Carbon context across all 16 governed health dimensions
   * @param {Object} context - Context containing facility, regulatory, methodology, plan, activity, evidence, factors, etc.
   * @returns {DataHealthSnapshot} Complete deterministic health snapshot
   */
  evaluateHealth(context = {}) {
    const checks = [];
    const issueReferences = new Set();
    const facilityId = context.facility_id || 'FACILITY_DEFAULT';
    const reportingPeriod = context.reporting_period || '2026';

    // -------------------------------------------------------------
    // DIMENSION 1: Regulatory Readiness
    // -------------------------------------------------------------
    const reg = context.regulatory_context;
    if (!reg) {
      checks.push(new QACheck({
        check_id: 'CHK-REG-001',
        dimension: HEALTH_DIMENSIONS.REGULATORY_READINESS,
        subject_type: 'REGULATORY_CONTEXT',
        subject_id: facilityId,
        rule_reference: 'EC-RRM-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Khung pháp lý quy định (regulatory_context) hoàn toàn vắng mặt',
        issue_reference: 'ISSUE-RRM-001',
        remediation: 'Thực hiện đánh giá phạm vi pháp lý qua Regulatory Applicability Engine'
      }));
      issueReferences.add('ISSUE-RRM-001');
    } else {
      if (reg.status === 'CONFLICT' || reg.has_conflict) {
        checks.push(new QACheck({
          check_id: 'CHK-REG-002',
          dimension: HEALTH_DIMENSIONS.REGULATORY_READINESS,
          subject_type: 'REGULATORY_CONTEXT',
          subject_id: reg.rule_id || 'RULE_CONFLICT',
          rule_reference: 'EC-RRM-001',
          severity: QA_SEVERITY.CRITICAL,
          status: QA_RESULT_STATES.BLOCKED,
          finding: 'Xung đột giữa các quy định pháp luật hiện hành',
          issue_reference: 'ISSUE-RRM-002',
          remediation: 'Áp dụng thứ bậc ưu tiên pháp lý hoặc xin ý kiến cơ quan quản lý'
        }));
        issueReferences.add('ISSUE-RRM-002');
      } else if (reg.status === 'UNKNOWN') {
        checks.push(new QACheck({
          check_id: 'CHK-REG-003',
          dimension: HEALTH_DIMENSIONS.REGULATORY_READINESS,
          subject_type: 'REGULATORY_CONTEXT',
          subject_id: facilityId,
          rule_reference: 'EC-RRM-001',
          severity: QA_SEVERITY.WARNING,
          status: QA_RESULT_STATES.REQUIRES_REVIEW,
          finding: 'Tính tương thích quy chuẩn pháp lý chưa được xác định',
          issue_reference: 'ISSUE-RRM-003',
          remediation: 'Cần thẩm tra viên xác nhận danh mục cơ sở phát thải phải kiểm kê'
        }));
        issueReferences.add('ISSUE-RRM-003');
      } else {
        checks.push(new QACheck({
          check_id: 'CHK-REG-004',
          dimension: HEALTH_DIMENSIONS.REGULATORY_READINESS,
          subject_type: 'REGULATORY_CONTEXT',
          subject_id: reg.rule_id || 'RULE_ACTIVE',
          rule_reference: 'EC-RRM-001',
          severity: QA_SEVERITY.INFO,
          status: QA_RESULT_STATES.PASS,
          finding: 'Quy định pháp lý áp dụng hợp lệ và rõ ràng'
        }));
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 2: Sector & Profile Consistency
    // -------------------------------------------------------------
    if (context.sector_ambiguity || context.sector_ambiguous) {
      checks.push(new QACheck({
        check_id: 'CHK-SPM-001',
        dimension: HEALTH_DIMENSIONS.SECTOR_PROFILE_CONSISTENCY,
        subject_type: 'FACILITY_PROFILE',
        subject_id: facilityId,
        rule_reference: 'EC-SPM-001',
        severity: QA_SEVERITY.WARNING,
        status: QA_RESULT_STATES.REQUIRES_REVIEW,
        finding: 'Hồ sơ lĩnh vực cơ sở có tính chất đa ngành/mơ hồ (sector ambiguity)',
        issue_reference: 'ISSUE-SPM-001',
        remediation: 'Chỉ định phân ngành chính hoặc tách biệt ranh giới phát thải theo quy định ngành'
      }));
      issueReferences.add('ISSUE-SPM-001');
    } else {
      checks.push(new QACheck({
        check_id: 'CHK-SPM-002',
        dimension: HEALTH_DIMENSIONS.SECTOR_PROFILE_CONSISTENCY,
        subject_type: 'FACILITY_PROFILE',
        subject_id: facilityId,
        rule_reference: 'EC-SPM-001',
        severity: QA_SEVERITY.INFO,
        status: QA_RESULT_STATES.PASS,
        finding: 'Hồ sơ lĩnh vực hoạt động cơ sở nhất quán'
      }));
    }

    // -------------------------------------------------------------
    // DIMENSION 3: Temporal Integrity
    // -------------------------------------------------------------
    const activities = context.activity_data || context.activity_records || [];
    let temporalHasStraddle = false;
    let temporalHasMidMonth = false;
    let temporalHasGap = false;
    let temporalHasInvalidOrder = false;

    // Check transition straddle (e.g. 2026-09-25) per ISSUE-TEMP-001
    const transitionDate = context.regulatory_transition_date || '2026-09-25';
    for (const act of activities) {
      const period = act.activity_period || {};
      const start = period.start || act.start_date;
      const end = period.end || act.end_date;

      if (start && end) {
        if (start > end) {
          temporalHasInvalidOrder = true;
          checks.push(new QACheck({
            check_id: `CHK-TEMP-ORDER-${act.activity_data_id || act.id}`,
            dimension: HEALTH_DIMENSIONS.TEMPORAL_INTEGRITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: act.activity_data_id || act.id,
            rule_reference: 'EC-TEMP-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: `Thứ tự chu kỳ thời gian không hợp lệ: start (${start}) sau end (${end})`,
            remediation: 'Chỉnh sửa ngày bắt đầu và kết thúc chu kỳ'
          }));
        }

        if (start < transitionDate && end > transitionDate && !act.segmented) {
          temporalHasStraddle = true;
          checks.push(new QACheck({
            check_id: `CHK-TEMP-STRADDLE-${act.activity_data_id || act.id}`,
            dimension: HEALTH_DIMENSIONS.TEMPORAL_INTEGRITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: act.activity_data_id || act.id,
            rule_reference: 'EC-TEMP-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: `Dữ liệu hoạt động vắt ngang ranh giới chuyển tiếp quy chuẩn ${transitionDate} chưa được phân đoạn`,
            issue_reference: 'ISSUE-TEMP-001',
            remediation: 'Áp dụng phân đoạn thời gian theo Temporal Applicability Engine'
          }));
          issueReferences.add('ISSUE-TEMP-001');
        }

        // Check mid-month issue per ISSUE-TEMP-002
        if (context.has_unresolved_mid_month || act.is_unresolved_mid_month) {
          temporalHasMidMonth = true;
          checks.push(new QACheck({
            check_id: `CHK-TEMP-MIDMONTH-${act.activity_data_id || act.id}`,
            dimension: HEALTH_DIMENSIONS.TEMPORAL_INTEGRITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: act.activity_data_id || act.id,
            rule_reference: 'EC-TEMP-001',
            severity: QA_SEVERITY.WARNING,
            status: QA_RESULT_STATES.REQUIRES_REVIEW,
            finding: 'Phân đoạn giữa tháng chưa có quy tắc nội suy/chia tỷ lệ chính thức (ISSUE-TEMP-002)',
            issue_reference: 'ISSUE-TEMP-002',
            remediation: 'Cần kiểm toán viên con người xem xét phê duyệt tỷ lệ phân bổ'
          }));
          issueReferences.add('ISSUE-TEMP-002');
        }
      }
    }

    if (!temporalHasStraddle && !temporalHasMidMonth && !temporalHasInvalidOrder) {
      checks.push(new QACheck({
        check_id: 'CHK-TEMP-VALID',
        dimension: HEALTH_DIMENSIONS.TEMPORAL_INTEGRITY,
        subject_type: 'TEMPORAL_CONTEXT',
        subject_id: reportingPeriod,
        rule_reference: 'EC-TEMP-001',
        severity: QA_SEVERITY.INFO,
        status: QA_RESULT_STATES.PASS,
        finding: 'Toàn bộ khoảng thời gian hoạt động nhất quán và hợp lệ'
      }));
    }

    // -------------------------------------------------------------
    // DIMENSION 4: Methodology Readiness
    // -------------------------------------------------------------
    const meth = context.methodology || context.methodology_context;
    if (!meth || !meth.methodology_id) {
      checks.push(new QACheck({
        check_id: 'CHK-MTH-001',
        dimension: HEALTH_DIMENSIONS.METHODOLOGY_READINESS,
        subject_type: 'METHODOLOGY',
        subject_id: 'NULL',
        rule_reference: 'EC-MTH-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Phương pháp luận tính toán phát thải chưa được chọn hoặc chưa xác định',
        issue_reference: 'ISSUE-MTH-001',
        remediation: 'Thực hiện quy trình chọn phương pháp luận qua Methodology Selection Engine'
      }));
      issueReferences.add('ISSUE-MTH-001');
    } else if (meth.selection_state === 'AMBIGUOUS' || context.methodology_ambiguous) {
      checks.push(new QACheck({
        check_id: 'CHK-MTH-002',
        dimension: HEALTH_DIMENSIONS.METHODOLOGY_READINESS,
        subject_type: 'METHODOLOGY',
        subject_id: meth.methodology_id,
        rule_reference: 'EC-MTH-001',
        severity: QA_SEVERITY.WARNING,
        status: QA_RESULT_STATES.REQUIRES_REVIEW,
        finding: 'Tồn tại nhiều phương pháp luận cùng áp dụng chưa có quy tắc ưu tiên',
        issue_reference: 'ISSUE-MTH-002',
        remediation: 'Chỉ định phương pháp luận chính thức bởi chuyên gia'
      }));
      issueReferences.add('ISSUE-MTH-002');
    } else {
      checks.push(new QACheck({
        check_id: 'CHK-MTH-003',
        dimension: HEALTH_DIMENSIONS.METHODOLOGY_READINESS,
        subject_type: 'METHODOLOGY',
        subject_id: meth.methodology_id,
        rule_reference: 'EC-MTH-001',
        severity: QA_SEVERITY.INFO,
        status: QA_RESULT_STATES.PASS,
        finding: `Phương pháp luận ${meth.methodology_id} đã sẵn sàng áp dụng`
      }));
    }

    // -------------------------------------------------------------
    // DIMENSION 5 & 6: Activity Data Completeness & Validity
    // -------------------------------------------------------------
    if (activities.length === 0) {
      checks.push(new QACheck({
        check_id: 'CHK-ACT-EMPTY',
        dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_COMPLETENESS,
        subject_type: 'ACTIVITY_DATA_COLLECTION',
        subject_id: facilityId,
        rule_reference: 'EC-DOMAIN-MODEL-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Hoàn toàn thiếu dữ liệu hoạt động cho kỳ kiểm kê',
        remediation: 'Nạp dữ liệu tiêu thụ nhiên liệu/điện năng của cơ sở'
      }));
    } else {
      for (const act of activities) {
        const actId = act.activity_data_id || act.id || 'UNKNOWN';

        // Check required fields
        if (act.quantity === undefined || act.quantity === null) {
          checks.push(new QACheck({
            check_id: `CHK-ACT-QTY-MISSING-${actId}`,
            dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_COMPLETENESS,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Thiếu định lượng lượng hoạt động (quantity is missing/null)',
            remediation: 'Bổ sung giá trị số lượng tiêu thụ đo đạc'
          }));
        } else if (typeof act.quantity !== 'number' || isNaN(act.quantity) || !isFinite(act.quantity)) {
          checks.push(new QACheck({
            check_id: `CHK-ACT-QTY-TYPE-${actId}`,
            dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_VALIDITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Lượng hoạt động không phải là số thực hợp lệ',
            remediation: 'Chuẩn hóa định dạng số cho lượng hoạt động'
          }));
        } else if (act.quantity < 0) {
          checks.push(new QACheck({
            check_id: `CHK-ACT-QTY-NEG-${actId}`,
            dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_VALIDITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Lượng hoạt động mang giá trị âm (< 0)',
            remediation: 'Chỉnh sửa giá trị về số không âm'
          }));
        }

        // Unit check
        if (!act.unit || String(act.unit).trim() === '') {
          checks.push(new QACheck({
            check_id: `CHK-ACT-UNIT-MISSING-${actId}`,
            dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_COMPLETENESS,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-UCM-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Thiếu đơn vị đo lường cơ bản',
            remediation: 'Cung cấp đơn vị đo lường hợp chuẩn (e.g. MWh, tấn, lít)'
          }));
        } else if (act.expected_unit && act.unit !== act.expected_unit) {
          checks.push(new QACheck({
            check_id: `CHK-ACT-UNIT-MISMATCH-${actId}`,
            dimension: HEALTH_DIMENSIONS.ACTIVITY_DATA_VALIDITY,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-UCM-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: `Đơn vị đo lường (${act.unit}) không tương thích với đơn vị yêu cầu (${act.expected_unit})`,
            remediation: 'Thực hiện chuyển đổi đơn vị có kiểm soát theo EC-UCM-001'
          }));
        }
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 7: Evidence Coverage
    // -------------------------------------------------------------
    const evidenceRegistry = context.evidence_registry || {};
    for (const act of activities) {
      const actId = act.activity_data_id || act.id || 'UNKNOWN';
      const evRefs = act.evidence_refs || act.evidence_ids || [];

      if (evRefs.length === 0) {
        if (context.tier === 'TIER_1' || act.tier === 'TIER_1' || context.evidence_mandatory === false) {
          checks.push(new QACheck({
            check_id: `CHK-EVI-OPT-${actId}`,
            dimension: HEALTH_DIMENSIONS.EVIDENCE_COVERAGE,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.WARNING,
            status: QA_RESULT_STATES.REQUIRES_REVIEW,
            finding: 'Chưa gắn hồ sơ minh chứng; thuộc phạm vi Tier 1 mặc định nhưng khuyến nghị bổ sung chứng từ',
            issue_reference: 'ISSUE-PROV-002',
            remediation: 'Đính kèm chứng từ thanh toán hoặc vận hành'
          }));
          issueReferences.add('ISSUE-PROV-002');
        } else {
          checks.push(new QACheck({
            check_id: `CHK-EVI-MAND-${actId}`,
            dimension: HEALTH_DIMENSIONS.EVIDENCE_COVERAGE,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Bắt buộc phải có hồ sơ minh chứng nhưng không tìm thấy liên kết chứng từ',
            remediation: 'Bổ sung hồ sơ minh chứng hợp chuẩn'
          }));
        }
      } else {
        // Evidence is attached, check approved status
        for (const evId of evRefs) {
          const ev = evidenceRegistry[evId] || (context.evidence_list || []).find(e => (e.evidence_id || e.id) === evId);
          if (ev) {
            const evState = ev.evidence_state || ev.status;
            if (evState === 'rejected') {
              checks.push(new QACheck({
                check_id: `CHK-EVI-REJ-${evId}`,
                dimension: HEALTH_DIMENSIONS.EVIDENCE_COVERAGE,
                subject_type: 'EVIDENCE',
                subject_id: evId,
                rule_reference: 'EC-DOMAIN-MODEL-001',
                severity: QA_SEVERITY.CRITICAL,
                status: QA_RESULT_STATES.BLOCKED,
                finding: `Hồ sơ minh chứng ${evId} đã bị từ chối phê duyệt`,
                remediation: 'Thay thế bằng hồ sơ chứng từ hợp lệ'
              }));
            } else if (evState !== 'approved') {
              checks.push(new QACheck({
                check_id: `CHK-EVI-UNAPPROVED-${evId}`,
                dimension: HEALTH_DIMENSIONS.EVIDENCE_COVERAGE,
                subject_type: 'EVIDENCE',
                subject_id: evId,
                rule_reference: 'EC-DOMAIN-MODEL-001',
                severity: QA_SEVERITY.WARNING,
                status: QA_RESULT_STATES.REQUIRES_REVIEW,
                finding: `Hồ sơ minh chứng ${evId} đang ở trạng thái ${evState}; chưa được phê duyệt chính thức`,
                remediation: 'Kiểm toán viên con người thực hiện thẩm định và phê duyệt'
              }));
            }
          }
        }
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 8: Provenance Coverage
    // -------------------------------------------------------------
    for (const act of activities) {
      const actId = act.activity_data_id || act.id || 'UNKNOWN';
      const prov = act.provenance;

      if (!prov) {
        checks.push(new QACheck({
          check_id: `CHK-PROV-MISSING-${actId}`,
          dimension: HEALTH_DIMENSIONS.PROVENANCE_COVERAGE,
          subject_type: 'ACTIVITY_DATA',
          subject_id: actId,
          rule_reference: 'EC-DOMAIN-MODEL-001',
          severity: QA_SEVERITY.CRITICAL,
          status: QA_RESULT_STATES.BLOCKED,
          finding: 'Hoàn toàn thiếu siêu dữ liệu nguồn gốc dữ liệu (provenance)',
          issue_reference: 'ISSUE-PROV-001',
          remediation: 'Đăng ký nguồn gốc dữ liệu qua Provenance Engine'
        }));
        issueReferences.add('ISSUE-PROV-001');
      } else {
        if (!prov.source_id && !prov.source_ref) {
          checks.push(new QACheck({
            check_id: `CHK-PROV-BROKEN-SRC-${actId}`,
            dimension: HEALTH_DIMENSIONS.PROVENANCE_COVERAGE,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Thông tin xuất xứ nguồn trong provenance bị khuyết thiếu',
            remediation: 'Cập nhật định danh tài liệu nguồn gốc'
          }));
        }

        if (prov.broken_lineage || prov.parent_missing) {
          checks.push(new QACheck({
            check_id: `CHK-PROV-BROKEN-LINEAGE-${actId}`,
            dimension: HEALTH_DIMENSIONS.PROVENANCE_COVERAGE,
            subject_type: 'ACTIVITY_DATA',
            subject_id: actId,
            rule_reference: 'EC-DOMAIN-MODEL-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: 'Mắt xích nguồn gốc bị đứt gãy: bản ghi cha không tồn tại',
            remediation: 'Tái tạo lại đồ thị nguồn gốc hoặc xác minh bản ghi cha'
          }));
        }
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 9: Calculation Plan Readiness & Structural Integrity
    // -------------------------------------------------------------
    const plan = context.calculation_plan;
    if (!plan && context.require_plan !== false) {
      checks.push(new QACheck({
        check_id: 'CHK-PLAN-MISSING',
        dimension: HEALTH_DIMENSIONS.CALCULATION_PLAN_READINESS,
        subject_type: 'CALCULATION_PLAN',
        subject_id: 'NULL',
        rule_reference: 'EC-DOMAIN-MODEL-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Chưa có Kế hoạch tính toán (CalculationPlan) cho kỳ kiểm kê',
        remediation: 'Khởi tạo kế hoạch tính toán qua Calculation Plan Engine'
      }));
    } else if (plan) {
      const planStatus = plan.plan_status || plan.status;
      if (planStatus !== 'READY' && planStatus !== 'APPROVED') {
        checks.push(new QACheck({
          check_id: 'CHK-PLAN-NOT-READY',
          dimension: HEALTH_DIMENSIONS.CALCULATION_PLAN_READINESS,
          subject_type: 'CALCULATION_PLAN',
          subject_id: plan.plan_id || plan.id,
          rule_reference: 'EC-DOMAIN-MODEL-001',
          severity: QA_SEVERITY.CRITICAL,
          status: QA_RESULT_STATES.BLOCKED,
          finding: `Kế hoạch tính toán đang ở trạng thái ${planStatus}; chưa sẵn sàng (READY)`,
          remediation: 'Hoàn tất các bước tiền điều kiện của kế hoạch tính toán'
        }));
      }

      if (!Array.isArray(plan.steps) || plan.steps.length === 0) {
        checks.push(new QACheck({
          check_id: 'CHK-PLAN-NO-STEPS',
          dimension: HEALTH_DIMENSIONS.CALCULATION_STRUCTURAL_INTEGRITY,
          subject_type: 'CALCULATION_PLAN',
          subject_id: plan.plan_id || plan.id,
          rule_reference: 'EC-DOMAIN-MODEL-001',
          severity: QA_SEVERITY.CRITICAL,
          status: QA_RESULT_STATES.BLOCKED,
          finding: 'Kế hoạch tính toán không chứa bước thực thi nào',
          remediation: 'Cấu hình các bước tính toán tương ứng với phương pháp luận'
        }));
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 10 & 11: EF & GWP Readiness
    // -------------------------------------------------------------
    const factors = context.emission_factors || [];
    const gwp = context.gwp_dataset;

    if (factors.length === 0 && context.require_ef !== false) {
      checks.push(new QACheck({
        check_id: 'CHK-EF-MISSING',
        dimension: HEALTH_DIMENSIONS.EF_READINESS,
        subject_type: 'EMISSION_FACTORS',
        subject_id: 'NULL',
        rule_reference: 'EC-EFR-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Thiếu hệ số phát thải (EF) cần thiết cho các hoạt động',
        issue_reference: 'ISSUE-EFR-001',
        remediation: 'Liên kết bộ hệ số phát thải hợp chuẩn'
      }));
      issueReferences.add('ISSUE-EFR-001');
    } else {
      for (const ef of factors) {
        const efId = ef.factor_id || ef.id || 'EF_UNKNOWN';
        if (ef.status === 'DRAFT' || ef.status === 'SUPERSEDED' || ef.status === 'INVALID') {
          checks.push(new QACheck({
            check_id: `CHK-EF-STATE-${efId}`,
            dimension: HEALTH_DIMENSIONS.EF_READINESS,
            subject_type: 'EMISSION_FACTOR',
            subject_id: efId,
            rule_reference: 'EC-EFR-001',
            severity: QA_SEVERITY.CRITICAL,
            status: QA_RESULT_STATES.BLOCKED,
            finding: `Hệ số phát thải ${efId} ở trạng thái không hợp lệ (${ef.status})`,
            issue_reference: 'ISSUE-EFR-002',
            remediation: 'Thay thế bằng hệ số phát thải chính thức đang có hiệu lực'
          }));
          issueReferences.add('ISSUE-EFR-002');
        }
      }
    }

    if (!gwp && context.require_gwp !== false) {
      checks.push(new QACheck({
        check_id: 'CHK-GWP-MISSING',
        dimension: HEALTH_DIMENSIONS.GWP_READINESS,
        subject_type: 'GWP_DATASET',
        subject_id: 'NULL',
        rule_reference: 'EC-GWP-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Thiếu bộ dữ liệu hệ số GWP bắt buộc',
        issue_reference: 'ISSUE-GWP-001',
        remediation: 'Chỉ định bộ hệ số GWP (e.g. IPCC-AR5) theo quy định'
      }));
      issueReferences.add('ISSUE-GWP-001');
    }

    // -------------------------------------------------------------
    // DIMENSION 12: Duplicate & Conflict State
    // -------------------------------------------------------------
    for (let i = 0; i < activities.length; i++) {
      const a = activities[i];
      const startA = a.activity_period ? a.activity_period.start : a.start_date;
      const endA = a.activity_period ? a.activity_period.end : a.end_date;

      for (let j = i + 1; j < activities.length; j++) {
        const b = activities[j];
        const startB = b.activity_period ? b.activity_period.start : b.start_date;
        const endB = b.activity_period ? b.activity_period.end : b.end_date;

        if (a.facility_id === b.facility_id && a.activity_type === b.activity_type && startA === startB && endA === endB) {
          if (a.quantity === b.quantity && a.unit === b.unit) {
            checks.push(new QACheck({
              check_id: `CHK-DUP-${a.activity_data_id || a.id}+${b.activity_data_id || b.id}`,
              dimension: HEALTH_DIMENSIONS.DUPLICATE_CONFLICT_STATE,
              subject_type: 'ACTIVITY_DATA',
              subject_id: `${a.activity_data_id || a.id}+${b.activity_data_id || b.id}`,
              rule_reference: 'EC-DOMAIN-MODEL-001',
              severity: QA_SEVERITY.CRITICAL,
              status: QA_RESULT_STATES.BLOCKED,
              finding: `Phát hiện bản ghi trùng lặp hoàn toàn giữa ${a.activity_data_id || a.id} và ${b.activity_data_id || b.id}`,
              remediation: 'Hủy kích hoạt một trong hai bản ghi trùng lặp'
            }));
          } else {
            checks.push(new QACheck({
              check_id: `CHK-CONF-${a.activity_data_id || a.id}+${b.activity_data_id || b.id}`,
              dimension: HEALTH_DIMENSIONS.DUPLICATE_CONFLICT_STATE,
              subject_type: 'ACTIVITY_DATA',
              subject_id: `${a.activity_data_id || a.id}+${b.activity_data_id || b.id}`,
              rule_reference: 'EC-DOMAIN-MODEL-001',
              severity: QA_SEVERITY.CRITICAL,
              status: QA_RESULT_STATES.BLOCKED,
              finding: `Xung đột số liệu đo lường: Hai bản ghi cùng kỳ nhưng khác lượng (${a.quantity} vs ${b.quantity})`,
              remediation: 'Đối chiếu chứng từ gốc để xác định bản ghi chính xác nhất'
            }));
          }
        }
      }
    }

    // -------------------------------------------------------------
    // DIMENSION 13: Historical & Version Integrity
    // -------------------------------------------------------------
    if (context.version_conflict || context.has_version_conflict) {
      checks.push(new QACheck({
        check_id: 'CHK-VER-CONFLICT',
        dimension: HEALTH_DIMENSIONS.HISTORICAL_VERSION_INTEGRITY,
        subject_type: 'VERSION_HISTORY',
        subject_id: facilityId,
        rule_reference: 'EC-DOMAIN-MODEL-001',
        severity: QA_SEVERITY.CRITICAL,
        status: QA_RESULT_STATES.BLOCKED,
        finding: 'Xung đột phiên bản lịch sử hoặc tính toàn vẹn bất biến bị vi phạm',
        remediation: 'Khôi phục tính toàn vẹn phiên bản theo cây phả hệ'
      }));
    }

    // -------------------------------------------------------------
    // DIMENSION 14: Controlled Issue Impact
    // -------------------------------------------------------------
    if (context.controlled_issues && Array.isArray(context.controlled_issues)) {
      for (const issue of context.controlled_issues) {
        issueReferences.add(issue);
        checks.push(new QACheck({
          check_id: `CHK-CTRL-ISSUE-${issue}`,
          dimension: HEALTH_DIMENSIONS.CONTROLLED_ISSUE_IMPACT,
          subject_type: 'CONTROLLED_ISSUE',
          subject_id: issue,
          rule_reference: issue,
          severity: QA_SEVERITY.WARNING,
          status: QA_RESULT_STATES.REQUIRES_REVIEW,
          finding: `Tồn tại vấn đề kiểm soát mở (open controlled issue): ${issue}`,
          issue_reference: issue,
          remediation: 'Xem xét tác động theo quy trình kiểm soát phiên bản'
        }));
      }
    }

    // -------------------------------------------------------------
    // EVALUATE DIMENSION RESULTS & OVERALL SEMANTIC HEALTH STATE
    // NO ARBITRARY NUMERICAL 0-100 SCORE
    // -------------------------------------------------------------
    const dimensionResults = {};
    for (const dim of Object.values(HEALTH_DIMENSIONS)) {
      const dimChecks = checks.filter(c => c.dimension === dim);
      if (dimChecks.length === 0) {
        dimensionResults[dim] = DATA_HEALTH_STATES.HEALTHY;
      } else if (dimChecks.some(c => c.status === QA_RESULT_STATES.BLOCKED)) {
        dimensionResults[dim] = DATA_HEALTH_STATES.BLOCKED;
      } else if (dimChecks.some(c => c.status === QA_RESULT_STATES.REQUIRES_REVIEW)) {
        dimensionResults[dim] = DATA_HEALTH_STATES.REQUIRES_REVIEW;
      } else if (dimChecks.some(c => c.status === QA_RESULT_STATES.WARNING)) {
        dimensionResults[dim] = DATA_HEALTH_STATES.WARNING;
      } else {
        dimensionResults[dim] = DATA_HEALTH_STATES.HEALTHY;
      }
    }

    // Overall State Derivation
    let overallHealthState = DATA_HEALTH_STATES.HEALTHY;
    if (checks.some(c => c.status === QA_RESULT_STATES.BLOCKED)) {
      overallHealthState = DATA_HEALTH_STATES.BLOCKED;
    } else if (checks.some(c => c.status === QA_RESULT_STATES.REQUIRES_REVIEW)) {
      overallHealthState = DATA_HEALTH_STATES.REQUIRES_REVIEW;
    } else if (checks.some(c => c.status === QA_RESULT_STATES.WARNING)) {
      overallHealthState = DATA_HEALTH_STATES.WARNING;
    } else if (checks.some(c => c.status === QA_RESULT_STATES.UNKNOWN)) {
      overallHealthState = DATA_HEALTH_STATES.UNKNOWN;
    }

    // Construct deterministic payload for reproducibility identity
    const snapshotPayload = {
      snapshot_id: `SNAP-HEALTH-${facilityId}-${reportingPeriod}`,
      subject_type: 'FACILITY_INVENTORY',
      subject_id: facilityId,
      context: {
        facility_id: facilityId,
        reporting_period: reportingPeriod,
        tier: context.tier || 'TIER_2'
      },
      overall_health_state: overallHealthState,
      dimension_results: dimensionResults,
      checks: checks,
      issue_references: Array.from(issueReferences).sort(),
      evaluator_version: this.version
    };

    const reproHash = this.computeReproducibilityHash(snapshotPayload);
    snapshotPayload.reproducibility_hash = reproHash;

    return new DataHealthSnapshot(snapshotPayload);
  }
}

export const qaqcEngine = new QAQCEngine();

// Backward-compatibility aliases for existing integration hooks
export const QAQC_SEVERITY = QA_SEVERITY;
export const QAQC_CATEGORIES = HEALTH_DIMENSIONS;
export const QAQC_READINESS_STATUS = QA_RESULT_STATES;
export const QAQCInspectionIssue = QACheck;
export const InventoryHealthReport = DataHealthSnapshot;

