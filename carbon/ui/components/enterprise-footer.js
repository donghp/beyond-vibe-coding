/**
 * ENERIX Carbon - Canonical Enterprise Footer Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, copyright.
 */
import { CarbonPath } from '../../app/path.js';

export function renderEnterpriseFooter() {
  const logoUrl = CarbonPath.resolve('assets/branding/ENERIXON_CARBON_LOGO_CANONICAL.png');
  return `
    <footer style="background:#ffffff;border-top:1px solid #E2E8F0;padding:24px 0;color:#334155;font-family:var(--carbon-font-sans, sans-serif);box-sizing:border-box;">
      <style>
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          box-sizing: border-box;
        }
        .footer-logo-img {
          width: 110px;
          height: auto;
          display: block;
          object-fit: contain;
        }
        .footer-copyright {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }
        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }
      </style>
      <div class="footer-container">
        <div style="display:flex;align-items:center;">
          <img src="${logoUrl}" alt="ENERIXON CARBON" class="footer-logo-img" />
        </div>
        <div class="footer-copyright">
          Copyright © 2026 Hồng Đông
        </div>
      </div>
    </footer>
  `;
}
