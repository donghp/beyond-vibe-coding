/**
 * ENERIX Carbon - Shared Page Banner Component
 * Follows Banner__Full_Page_Preview.png and Master Layout 02.
 */
import { CarbonPath } from '../../app/path.js';
import { PUBLIC_ROUTES } from '../../app/routes.js';

export function renderPageBanner(config = {}) {
  const {
    eyebrow = '',
    title = 'Page Title',
    description = 'Supporting description for the page.',
    primaryCta = null,
    secondaryCta = null,
    visualAsset = null, // e.g., 'assets/banners/solutions-hero.png'
    variant = 'default'
  } = config;

  const resolvedVisual = visualAsset ? CarbonPath.resolve(visualAsset) : null;
  const defaultPrimaryUrl = PUBLIC_ROUTES.platform;
  const defaultSecondaryUrl = PUBLIC_ROUTES.home;

  return `
    <section class="page-banner" style="width:100%; height:540px; background:#08192D; color:#ffffff; overflow:hidden; position:relative; border-bottom:1px solid #1E293B; font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);">
      <style>
        .page-banner-visual-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .page-banner-visual-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .page-banner-overlay-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(8, 25, 45, 0.85) 0%, rgba(8, 25, 45, 0.4) 60%, rgba(8, 25, 45, 0.1) 100%);
          z-index: 2;
        }
        .page-banner-content-layer {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          height: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
        }
        .banner-content {
          max-width: 640px;
        }
        .banner-eyebrow {
          font-size: 11px;
          font-weight: 700;
          color: #078FF0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 20px;
          display: block;
        }
        .banner-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 24px;
          letter-spacing: -0.035em;
          color: #FFFFFF;
        }
        .banner-description {
          font-size: 19px;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 40px;
          font-weight: 400;
        }
        .banner-btn-primary {
          background: #078FF0;
          color: #ffffff;
          padding: 0 32px;
          height: 52px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          border: none;
          box-shadow: 0 10px 20px rgba(7,143,240,0.25);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .banner-btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0 32px;
          height: 52px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        @media (max-width: 1024px) {
          .page-banner { height: auto !important; min-height: 500px; }
          .page-banner-content-layer {
            padding: 80px 24px;
            justify-content: center;
            text-align: center;
          }
          .page-banner-overlay-layer {
            background: rgba(8, 25, 45, 0.7);
          }
          .banner-content {
            max-width: 100%;
          }
        }
      </style>

      <!-- LAYER 1: Visual -->
      <div class="page-banner-visual-layer">
        ${resolvedVisual ? `
          <img src="${resolvedVisual}" alt="" />
        ` : `
          <div style="width:100%;height:100%;background:linear-gradient(135deg, #08192D 0%, #0F2A4A 100%);"></div>
        `}
      </div>

      <!-- LAYER 2: Readability Overlay -->
      <div class="page-banner-overlay-layer"></div>

      <!-- LAYER 3: Content Overlay -->
      <div class="page-banner-content-layer">
        <div class="banner-content">
          ${eyebrow ? `<span class="banner-eyebrow">${eyebrow}</span>` : ''}
          <h1 class="banner-title">${title}</h1>
          <p class="banner-description">${description}</p>
          
          <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;${config.centerOnMobile ? 'justify-content:center;' : ''}">
            ${primaryCta ? `
              <a href="${primaryCta.url && primaryCta.url !== '#' ? primaryCta.url : defaultPrimaryUrl}" class="banner-btn-primary">
                ${primaryCta.label}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            ` : ''}
            ${secondaryCta ? `
              <a href="${secondaryCta.url && secondaryCta.url !== '#' ? secondaryCta.url : defaultSecondaryUrl}" class="banner-btn-secondary">
                ${secondaryCta.label}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}

