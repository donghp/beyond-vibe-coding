/**
 * ENERIX Carbon - Header Component
 */
export function renderHeader() {
  return `
    <header class="carbon-header">
      <div class="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span>ENERIX Carbon</span>
        <span class="brand-badge">Regulatory GHG v7.0</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;">
        <span style="font-size:12px;color:#94a3b8;">Decision 42/2026/QĐ-TTg Compliant</span>
        <a href="../" style="color:#e0f2fe;font-size:12px;text-decoration:none;border:1px solid rgba(255,255,255,0.2);padding:4px 10px;border-radius:4px;">← Back to Living Book</a>
      </div>
    </header>
  `;
}
