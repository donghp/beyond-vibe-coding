/**
 * ENERIX Carbon - Canonical Enterprise Footer Component
 * Part of Global Page Layout System V1.0
 * White background, clean enterprise layout, Platform, Science, Company links, copyright.
 */
import { CarbonPath } from '../../app/path.js';

export function renderEnterpriseFooter() {
  return `
    <footer style="background:#fff;border-top:1px solid var(--carbon-border,#e2e8f0);padding:64px 0 32px 0;color:var(--carbon-navy-800,#1e293b);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:40px;margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid var(--carbon-border,#e2e8f0);">
          <div>
            <div style="font-weight:800;font-size:18px;color:var(--carbon-navy-950,#08213D);margin-bottom:8px;">ENERIXON CARBON</div>
            <p style="font-size:13px;color:var(--carbon-navy-600,#475569);max-width:320px;margin:0;line-height:1.5;">
              Regulatory carbon & greenhouse gas engineering platform for complex industrial enterprises under Decision 42/2026/QĐ-TTg.
            </p>
          </div>
          <div class="enerix-footer-links-grid" style="display:grid;grid-template-columns:repeat(3, minmax(140px, 1fr));gap:32px;">
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950,#08213D);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Platform</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600,#475569);">
                <li><a href="#overview" style="color:var(--carbon-navy-600);text-decoration:none;">Measure</a></li>
                <li><a href="#reports" style="color:var(--carbon-navy-600);text-decoration:none;">Report</a></li>
                <li><a href="#inventory" style="color:var(--carbon-navy-600);text-decoration:none;">Reduce</a></li>
                <li><a href="#calculations" style="color:var(--carbon-navy-600);text-decoration:none;">Calculation Studio</a></li>
              </ul>
            </div>
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950,#08213D);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Science</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600,#475569);">
                <li><a href="#science" style="color:var(--carbon-navy-600);text-decoration:none;">Methodologies</a></li>
                <li><a href="#science" style="color:var(--carbon-navy-600);text-decoration:none;">Emission Factors</a></li>
                <li><a href="#resources" style="color:var(--carbon-navy-600);text-decoration:none;">GHG Guide</a></li>
              </ul>
            </div>
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950,#08213D);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Company</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600,#475569);">
                <li><a href="#company" style="color:var(--carbon-navy-600);text-decoration:none;">Decision 42</a></li>
                <li><a href="#facilities" style="color:var(--carbon-navy-600);text-decoration:none;">Facilities</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:12px;color:var(--carbon-navy-500,#64748b);">
          <div>Copyright © 2026 ENERIXON CARBON. All rights reserved.</div>
          <div>Carbon intelligence for a cleaner world.</div>
        </div>
      </div>
    </footer>
  `;
}
