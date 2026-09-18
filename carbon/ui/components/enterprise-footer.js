/**
 * ENERIX Carbon - Canonical Enterprise Footer Component
 * Part of Global Page Layout System V1.0
 * White background, canonical logo, navigation grid, additional links, copyright.
 */
import { CarbonPath } from '../../app/path.js';
import { I18nManager } from '../../app/i18n.js';

export function renderEnterpriseFooter() {
  const logoUrl = '/carbon/assets/logo_enerixon_carbon.png';
  const isVi = I18nManager.currentLocale === 'vi';

  return `
    <footer style="background:#ffffff;border-top:1px solid #DCE5ED;padding:64px 0 32px 0;color:#334155;font-family:var(--carbon-font-sans, sans-serif);box-sizing:border-box;width:100%;">
      <style>
        .footer-grid-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          box-sizing: border-box;
        }
        .footer-brand-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          width: 200px;
        }
        .footer-logo-img {
          height: 32px;
          width: auto;
          display: block;
          object-fit: contain;
        }
        .footer-links-container {
          flex: 1;
          display: flex;
          justify-content: center;
          gap: 64px;
        }
        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-link-group-title {
          font-size: 13px;
          font-weight: 700;
          color: #0B213D;
          letter-spacing: 0.02em;
        }
        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link-item a {
          font-size: 13.5px;
          color: #61738A;
          text-decoration: none;
          transition: color 0.15s ease;
          font-weight: 400;
        }
        .footer-link-item a:hover {
          color: #078FF0;
        }
        .footer-right-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
          width: 200px;
        }
        .footer-lang-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
        }
        .footer-bottom-divider {
          max-width: 1280px;
          margin: 48px auto 24px auto;
          border-top: 1px solid #DCE5ED;
          width: calc(100% - 48px);
        }
        .footer-bottom-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        .footer-copyright {
          font-size: 13px;
          color: #61738A;
          font-weight: 400;
        }
        .footer-tagline {
          font-size: 13px;
          color: #61738A;
          font-weight: 400;
        }
        @media (max-width: 991px) {
          .footer-grid-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 48px;
          }
          .footer-brand-column, .footer-right-column {
            width: 100%;
            align-items: center;
          }
          .footer-links-container {
            width: 100%;
            justify-content: space-between;
            gap: 24px;
            flex-wrap: wrap;
          }
        }
        @media (max-width: 640px) {
          .footer-links-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            text-align: left;
          }
          .footer-bottom-container {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      </style>
      
      <div class="footer-grid-container">
        <!-- Logo -->
        <div class="footer-brand-column">
          <img src="${logoUrl}" alt="ENERIXON CARBON" class="footer-logo-img" />
        </div>
        
        <!-- Navigation -->
        <div class="footer-links-container">
          <div class="footer-link-group">
            <div class="footer-link-group-title">Platform</div>
            <ul class="footer-link-list">
              <li class="footer-link-item"><a href="#overview">Overview</a></li>
              <li class="footer-link-item"><a href="#measure">Measure</a></li>
              <li class="footer-link-item"><a href="#report">Report</a></li>
              <li class="footer-link-item"><a href="#reduce">Reduce</a></li>
            </ul>
          </div>
          <div class="footer-link-group">
            <div class="footer-link-group-title">Solutions</div>
            <ul class="footer-link-list">
              <li class="footer-link-item"><a href="#solutions">Energy</a></li>
              <li class="footer-link-item"><a href="#solutions">Manufacturing</a></li>
              <li class="footer-link-item"><a href="#solutions">Supply Chain</a></li>
            </ul>
          </div>
          <div class="footer-link-group">
            <div class="footer-link-group-title">Science</div>
            <ul class="footer-link-list">
              <li class="footer-link-item"><a href="#science">Methodology</a></li>
              <li class="footer-link-item"><a href="#science">Data Sources</a></li>
            </ul>
          </div>
          <div class="footer-link-group">
            <div class="footer-link-group-title">Resources</div>
            <ul class="footer-link-list">
              <li class="footer-link-item"><a href="#resources">Guides</a></li>
              <li class="footer-link-item"><a href="#resources">API Docs</a></li>
            </ul>
          </div>
          <div class="footer-link-group">
            <div class="footer-link-group-title">Company</div>
            <ul class="footer-link-list">
              <li class="footer-link-item"><a href="#company">About Us</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="footer-right-column">
          <div class="footer-link-group" style="align-items: flex-end;">
            <ul class="footer-link-list" style="align-items: flex-end;">
              <li class="footer-link-item"><a href="#contact">Contact</a></li>
              <li class="footer-link-item"><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div class="footer-lang-selector">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>English</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom-divider"></div>
      
      <div class="footer-bottom-container">
        <div class="footer-copyright">
          © 2026 ENERIXON CARBON. All rights reserved.
        </div>
        <div class="footer-tagline">
          Carbon intelligence for a cleaner world.
        </div>
      </div>
    </footer>
  `;
}

