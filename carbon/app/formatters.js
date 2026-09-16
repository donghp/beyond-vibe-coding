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
  if (s.includes('MANDATORY')) cssClass += ' mandatory';
  else if (s.includes('ACTIVE') || s.includes('REGISTERED')) cssClass += ' active';
  else if (s.includes('PENDING') || s.includes('TRANSITIONAL')) cssClass += ' pending';

  return `<span class="${cssClass}">${status}</span>`;
}
