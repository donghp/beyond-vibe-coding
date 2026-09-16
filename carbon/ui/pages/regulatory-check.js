/**
 * ENERIX Carbon - Regulatory Applicability Check View
 */
import { regulatoryEngine } from '../../engine/regulatory-engine.js';
import { dataProvider } from '../../app/data-provider.js';
import { formatBadge } from '../../app/formatters.js';

export function renderRegulatoryCheckPage() {
  const facilities = dataProvider.getFacilities();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Regulatory Applicability Engine</h1>
      <p class="page-subtitle">Temporal Regulatory Evaluation under QĐ 42/2026/QĐ-TTg & NĐ 83/2026/NĐ-CP</p>
    </div>

    <div class="enerix-card" style="margin-bottom:24px;">
      <div class="enerix-card-title">Facility Regulatory Evaluation Matrix</div>
      <p style="font-size:13px;color:#475569;margin-bottom:16px;">
        Evaluates facility classification, threshold criteria, effective legal dates, and mandatory MRV reporting obligations across Vietnamese sector authorities.
      </p>

      ${facilities.map(facility => {
        const evalResult = regulatoryEngine.evaluateFacilityStatus(facility, '2026-09-16');
        return `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;font-size:15px;color:var(--color-navy-900);">${facility.facility_name}</span>
              ${formatBadge(evalResult.status)}
            </div>
            <div style="font-size:12px;color:#64748b;margin-top:6px;">
              <strong>Legal Basis:</strong> ${evalResult.legalBasis} | <strong>Effective:</strong> ${evalResult.effectiveFrom || '2026-09-25'}
            </div>
            <div style="font-size:13px;color:#334155;margin-top:8px;">
              ${evalResult.reason}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
