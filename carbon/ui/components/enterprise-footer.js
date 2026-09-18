/**
 * ENERIX Carbon - Canonical Enterprise Footer Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, navigation grid, additional links, copyright.
 */
import { CarbonPath } from '../../app/path.js';
import { I18nManager } from '../../app/i18n.js';

export function renderEnterpriseFooter() {
  const logoUrl = CarbonPath.resolve('assets/logo_enerixon_carbon.png');
  const isVi = I18nManager.currentLocale === 'vi';

  return `
    <footer style="background:#ffffff;border-top:1px solid #DCE5ED;padding:40px 0 24px 0;color:#334155;font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);box-sizing:border-box;width:100%;">
      <style>
        .footer-main-row {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .footer-logo-link {
          display: block;
          flex-shrink: 0;
        }
        .footer-logo-img {
          height: 44px;
          width: auto;
          display: block;
        }
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          flex: 1;
          justify-content: center;
        }
        .footer-nav-link {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-nav-link:hover {
          color: #078FF0;
        }
        .footer-utility {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }
        .footer-utility-link {
          font-size: 14px;
          font-weight: 500;
          color: #61738A;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-utility-link:hover {
          color: #078FF0;
        }
        .footer-lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
        }
        .footer-bottom-divider {
          max-width: 1280px;
          margin: 32px auto 20px auto;
          border-top: 1px solid #DCE5ED;
          width: calc(100% - 48px);
        }
        .footer-bottom-row {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-legal {
          font-size: 13px;
          color: #61738A;
          font-weight: 400;
        }
        .footer-tagline {
          font-size: 13px;
          color: #61738A;
          font-weight: 400;
        }
        @media (max-width: 1100px) {
          .footer-nav {
            gap: 20px;
          }
          .footer-utility {
            gap: 16px;
          }
        }
        @media (max-width: 991px) {
          .footer-main-row {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
          .footer-nav {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .footer-logo-img {
            height: 36px;
          }
          .footer-bottom-row {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      </style>
      
      <div class="footer-main-row">
        <!-- Logo -->
        <a href="#hero" class="footer-logo-link">
          <img src="${logoUrl}" alt="ENERIXON CARBON" class="footer-logo-img" />
        </a>
        
        <!-- Navigation -->
        <nav class="footer-nav">
          <a href="#overview" class="footer-nav-link">Platform</a>
          <a href="#solutions" class="footer-nav-link">Solutions</a>
          <a href="#science" class="footer-nav-link">Science</a>
          <a href="#resources" class="footer-nav-link">Resources</a>
          <a href="#company" class="footer-nav-link">Company</a>
        </nav>
        
        <!-- Utility -->
        <div class="footer-utility">
          <a href="#contact" class="footer-utility-link">Contact</a>
          <a href="#careers" class="footer-utility-link">Careers</a>
          <div class="footer-lang-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>English</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom-divider"></div>
      
      <div class="footer-bottom-row">
        <div class="footer-legal">
          © 2026 ENERIXON CARBON. All rights reserved.
        </div>
        <div class="footer-tagline">
          Carbon intelligence for a cleaner world.
        </div>
      </div>
    </footer>
  `;
}

