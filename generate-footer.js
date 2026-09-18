import fs from 'fs';

const content = `/**
 * ENERIX Carbon - Canonical Enterprise Footer Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, clean navigation, copyright.
 */
import { CarbonPath } from '../../app/path.js';
import { ICONS } from './icons.js';

export function renderEnterpriseFooter() {
  const logoUrl = '/carbon/assets/logo_enerixon_carbon.png?v=2';
  return \`
    <footer style="background:#fff;border-top:1px solid var(--carbon-border,#e2e8f0);padding:32px 0;color:var(--carbon-navy-800,#1e293b);">
      <div class="public-container" style="max-width:1280px;margin:0 auto;padding:0 32px;width:100%;">
        
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid var(--carbon-border,#e2e8f0);">
          <div style="display:flex;align-items:center;">
            <img src="\${logoUrl}" alt="ENERIXON CARBON" style="height:32px;width:auto;" />
          </div>
          
          <nav style="display:flex;gap:32px;align-items:center;font-size:14px;font-weight:600;color:var(--carbon-navy-600, #475569);">
            <a href="#overview" style="color:inherit;text-decoration:none;">Platform</a>
            <a href="#solutions" style="color:inherit;text-decoration:none;">Solutions</a>
            <a href="#science" style="color:inherit;text-decoration:none;">Science</a>
            <a href="#resources" style="color:inherit;text-decoration:none;">Resources</a>
            <a href="#company" style="color:inherit;text-decoration:none;">Company</a>
          </nav>
          
          <div style="display:flex;gap:32px;align-items:center;font-size:14px;font-weight:600;color:var(--carbon-navy-600, #475569);">
            <a href="#contact" style="color:inherit;text-decoration:none;">Contact</a>
            <a href="#careers" style="color:inherit;text-decoration:none;">Careers</a>
            <div style="display:flex;align-items:center;gap:4px;cursor:pointer;">
              \${ICONS.globe(16)} English <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>
        
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:12px;color:var(--carbon-navy-500,#64748b);">
          <div>© 2026 ENERIXON CARBON. All rights reserved.</div>
          <div>Carbon intelligence for a cleaner world.</div>
        </div>
      </div>
    </footer>
  \`;
}
`;

fs.writeFileSync('carbon/ui/components/enterprise-footer.js', content);
