export function renderPlatformShowcase({ eyebrow, heading, body, benefits, ctaPrimary, ctaSecondary, imageUrl, imageAlt }) {
  return `
    <section class="carbon-platform-overview-section" style="padding:96px 24px;background:#ffffff;border-bottom:1px solid #E2E8F0;font-family:var(--carbon-font-sans, sans-serif);">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:center;" class="platform-overview-grid">
        
        <!-- Left Side: Copy & Benefits -->
        <div>
          <span style="font-size:11px;font-weight:700;color:#0066FF;text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);display:block;margin-bottom:16px;">
            ${eyebrow}
          </span>
          <h2 style="font-size:36px;font-weight:800;color:#0B1727;line-height:1.15;letter-spacing:-0.025em;margin:0 0 20px 0;">
            ${heading}
          </h2>
          <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 32px 0;">
            ${body}
          </p>
          
          <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:32px;">
            ${benefits.map(benefit => `
              <div style="display:flex;align-items:center;gap:12px;"><span style="color:#10B981;">✓</span> <span style="font-size:14px;color:#334155;font-weight:500;">${benefit}</span></div>
            `).join('')}
          </div>
          
          <div style="display:flex;align-items:center;gap:16px;">
            ${ctaPrimary}
            ${ctaSecondary}
          </div>
        </div>

        <!-- Right Side: Dashboard -->
        <div>
          <img src="${imageUrl}" alt="${imageAlt}" style="width:100%;height:auto;border-radius:24px;box-shadow:0 20px 40px rgba(11,23,39,0.08);border:1px solid #E2E8F0;" />
        </div>

      </div>
    </section>
  `;
}
