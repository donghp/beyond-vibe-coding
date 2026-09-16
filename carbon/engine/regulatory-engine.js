/**
 * ENERIX Carbon - Regulatory Engine
 * Evaluates facility compliance, temporal legal applicability, and regulatory rules
 */
export class RegulatoryEngine {
  evaluateFacilityStatus(facility, asOfDate = '2026-09-16') {
    if (!facility) {
      return {
        status: 'UNKNOWN_REQUIRES_REVIEW',
        legalBasis: 'No facility matching record',
        reason: 'Facility record not found in registry'
      };
    }

    // Decision 42/2026/QĐ-TTg effective 25 September 2026
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
}

export const regulatoryEngine = new RegulatoryEngine();
