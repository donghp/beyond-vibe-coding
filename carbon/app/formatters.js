/**
 * ENERIX Carbon - Formatters
 * Formatting utilities for numbers, CO2e tons, dates, and badges
 */
export function formatCO2e(tons) {
  if (tons === null || tons === undefined || isNaN(tons)) return '0.00 t CO₂e';
  return `${Number(tons).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t CO₂e`;
}

export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return Number(num).toLocaleString('vi-VN');
}

export function formatBadge(status) {
  const s = String(status || '').toUpperCase();
  let cssClass = 'status-badge';
  if (s.includes('MANDATORY') || s.includes('BLOCKED') || s.includes('BLOCKING') || s.includes('CONFLICT') || s.includes('FAIL') || s.includes('ERROR')) {
    cssClass += ' mandatory';
  } else if (s.includes('ACTIVE') || s.includes('REGISTERED') || s.includes('COMPLIANT') || s.includes('READY') || s.includes('EXACT') || s.includes('APPROVED')) {
    cssClass += ' active';
  } else if (s.includes('PENDING') || s.includes('TRANSITIONAL') || s.includes('REVIEW') || s.includes('SEGMENTATION') || s.includes('STRADDLE') || s.includes('AMBIGUOUS') || s.includes('PARTIAL') || s.includes('WARNING')) {
    cssClass += ' pending';
  } else {
    cssClass += ' neutral';
  }

  return `<span class="${cssClass}">${status}</span>`;
}
