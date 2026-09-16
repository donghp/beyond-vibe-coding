/**
 * ENERIX Carbon - Regulatory Reports View
 */
export function renderReportsPage() {
  return `
    <div class="page-title-bar">
      <h1 class="page-title">Regulatory Reporting Generator</h1>
      <p class="page-subtitle">Standardized Vietnamese Ministry MRV Inventory Reports</p>
    </div>

    <div class="card-grid">
      <div class="enerix-card">
        <div class="enerix-card-title">Mẫu Báo cáo Kiểm kê KNK (BCT)</div>
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">Báo cáo kiểm kê khí nhà kính cấp cơ sở ngành Công Thương theo Thông tư 38/2023/TT-BCT.</p>
        <button style="background:var(--color-sky-600);color:#fff;border:none;padding:8px 16px;border-radius:4px;font-weight:600;cursor:pointer;">Xuất Báo cáo (Mẫu 01/BCT)</button>
      </div>

      <div class="enerix-card">
        <div class="enerix-card-title">Mẫu Báo cáo Kiểm kê KNK (BXD)</div>
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">Báo cáo kiểm kê khí nhà kính sản xuất vật liệu xây dựng theo Thông tư 13/2024/TT-BXD.</p>
        <button style="background:var(--color-sky-600);color:#fff;border:none;padding:8px 16px;border-radius:4px;font-weight:600;cursor:pointer;">Xuất Báo cáo (Mẫu 01/BXD)</button>
      </div>
    </div>
  `;
}
