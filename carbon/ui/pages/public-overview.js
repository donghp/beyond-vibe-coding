/**
 * ENERIX Carbon - Public Product Homepage (Mode A)
 * Task #Enerix_Carbon_00040 / Rebuild Task #Enerix_Carbon_00042
 *
 * Canonical Customer-Facing Enterprise Carbon Intelligence Homepage
 * Primary Visual Reference: Layout_EnerixCarbon02(2).png
 *
 * Visual Discipline:
 * - Premium Enterprise Software Aesthetic
 * - Tightened Spacing & Compact Padding
 * - Refined Editorial Typography & High-Contrast Metrics
 * - High Data Density & Structural Card Framing
 */

import { renderCarbonBrandBanner } from '../components/banner.js';
import { renderEnterpriseFooter } from '../components/enterprise-footer.js';
import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';
import { ICONS } from '../components/icons.js';

export function renderPublicOverviewPage(options = {}) {
  const earthBgUrl = CarbonPath.resolve('assets/branding/footer_earth_background.png');
  const logoUrl = CarbonPath.resolve('assets/branding/ENERIXON_CARBON_LOGO_CANONICAL.png');
  const heroBgUrl = CarbonPath.resolve('assets/branding/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png');
  const canonicalBannerUrl = CarbonPath.resolve('assets/branding/banner_enerix_carbon.png');

  // Step 4 Product Storytelling Assets:
  const platformDashboardPreviewUrl = CarbonPath.resolve('assets/01_platform_dashboard_preview.png');
  const measureVisualUrl = CarbonPath.resolve('assets/02_measure_visual.png');
  const reportVisualUrl = CarbonPath.resolve('assets/03_report_visual.png');
  const reduceVisualUrl = CarbonPath.resolve('assets/04_reduce_visual.png');
  const bottomCtaBannerUrl = CarbonPath.resolve('assets/05_bottom_cta_banner.png');

  return `
    <div class="public-overview-page" style="background:#ffffff;color:#0B1727;font-family:var(--carbon-font-sans, system-ui, -apple-system, sans-serif);line-height:1.5;width:100%;overflow-x:hidden;">
      <style>
        .hero-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          height: 100%;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
          z-index: 2;
          position: relative;
        }
        @media (max-width: 991px) {
          .hero-split-grid {
            grid-template-columns: 1fr;
            padding: 0 20px;
          }
          .hero-empty-col {
            display: none !important;
          }
          .hero-card-container {
            max-width: 100% !important;
          }
        }
      </style>

      <!-- ==========================================================================
           1. REBUILT HERO SECTION (Split 2-Column with Canonical Background Image)
           ========================================================================== -->
      <section class="carbon-public-overview-hero" 
               data-banner-asset="${canonicalBannerUrl}"
               style="width:100%;height:530px;position:relative;overflow:hidden;background-color:#08192D;background-image:url('${heroBgUrl}');background-size:cover;background-repeat:no-repeat;background-position:center center;border-bottom:1px solid #E2E8F0;display:flex;align-items:center;">
        
        <div class="hero-split-grid">
          <div style="display:flex;align-items:center;height:100%;">
            <div class="hero-card-container" style="background:rgba(255, 255, 255, 0.96);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:36px;border-radius:12px;box-shadow:0 12px 30px rgba(11,23,39,0.12);border:1px solid rgba(226, 232, 240, 0.9);max-width:520px;width:100%;color:#0B1727;text-align:left;box-sizing:border-box;">
              
              <!-- Eyebrow -->
              <div style="font-size:12px;font-weight:700;color:#0066FF;text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);margin-bottom:12px;display:inline-flex;align-items:center;gap:8px;">
                <span>THE ENERIXON CARBON PLATFORM</span>
              </div>

              <!-- Headline -->
              <h1 style="font-size:clamp(28px, 3.2vw, 40px);font-weight:800;color:#0B1727;line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px 0;font-family:var(--carbon-font-sans, sans-serif);">
                From data<br>to real-world impact.
              </h1>

              <!-- Supporting copy -->
              <p style="font-size:15px;color:#475569;line-height:1.55;margin:0 0 24px 0;max-width:480px;font-weight:400;">
                A unified platform to measure, report and reduce emissions across your organization and value chain.
              </p>

              <!-- CTAs -->
              <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                <button class="btn-explore-platform enerix-button enerix-button-primary" style="background:#0066FF;color:#ffffff;padding:0 22px;height:42px;border-radius:8px;font-weight:700;font-size:13.5px;cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,102,255,0.15);display:inline-flex;align-items:center;gap:8px;transition:all 0.15s ease;">
                  Explore the Platform →
                </button>
                <button class="btn-book-demo-cta enerix-button" style="background:#ffffff;color:#334155;border:1px solid #CBD5E1;padding:0 22px;height:42px;border-radius:8px;font-weight:700;font-size:13.5px;cursor:pointer;transition:all 0.15s ease;">
                  Request a Demo
                </button>
              </div>

            </div>
          </div>
          
          <!-- Empty Column to leave background unobstructed -->
          <div class="hero-empty-col" style="display:block;"></div>
        </div>

      </section>

      <!-- ==========================================================================
           2. PROOF / TRUST STRIP (Immediately Below Hero)
           ========================================================================== -->
      <section style="background:#ffffff;border-top:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;padding:12px 24px;font-size:12px;font-weight:600;color:#475569;font-family:var(--carbon-font-sans, sans-serif);">
        <div style="max-width:1280px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0066FF;font-weight:800;font-size:13px;">✓</span> <span><strong style="color:#0B1727;">GHG Protocol</strong> Corporate Standard</span></div>
          <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0066FF;font-weight:800;font-size:13px;">✓</span> <span><strong style="color:#0B1727;">Scope 1 / 2 / 3</strong> End-to-end Lineage</span></div>
          <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0066FF;font-weight:800;font-size:13px;">✓</span> <span><strong style="color:#0B1727;">Audit-ready data</strong> Cryptographic Provenance</span></div>
          <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0066FF;font-weight:800;font-size:13px;">✓</span> <span><strong style="color:#0B1727;">Deterministic calculations</strong> Zero Hallucination</span></div>
          <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0066FF;font-weight:800;font-size:13px;">✓</span> <span><strong style="color:#0B1727;">Statutory Governance</strong> Decision 42 / Decree 06</span></div>
        </div>
      </section>

      <!-- ==========================================================================
           3. PRODUCT PATHWAY NAVIGATION BAR (Below Trust Strip)
           ========================================================================== -->
      <nav class="carbon-public-pathway" aria-label="Product Pathway" style="background:#ffffff;border-bottom:1px solid #E2E8F0;padding:0 24px;display:flex;justify-content:center;align-items:center;box-shadow:0 1px 2px rgba(11,23,39,0.02);">
        <div style="max-width:1280px;width:100%;display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;">
          <a href="#measure" class="pathway-step active" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;padding:12px 20px;border-bottom:2px solid #0066FF;color:#0B1727;background:rgba(0,102,255,0.02);transition:all 0.15s ease;">
            <span style="font-weight:800;font-size:13px;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">01</span>
            <span style="font-weight:700;font-size:13px;letter-spacing:-0.01em;">Measure</span>
            <span style="font-size:12px;color:#64748B;margin-left:2px;">— Know your footprint</span>
          </a>
          <a href="#report" class="pathway-step" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;padding:12px 20px;border-bottom:2px solid transparent;color:#475569;transition:all 0.15s ease;">
            <span style="font-weight:800;font-size:13px;color:#94A3B8;font-family:var(--carbon-font-mono, monospace);">02</span>
            <span style="font-weight:700;font-size:13px;letter-spacing:-0.01em;">Report</span>
            <span style="font-size:12px;color:#64748B;margin-left:2px;">— Turn data into disclosure</span>
          </a>
          <a href="#reduce" class="pathway-step" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;padding:12px 20px;border-bottom:2px solid transparent;color:#475569;transition:all 0.15s ease;">
            <span style="font-weight:800;font-size:13px;color:#94A3B8;font-family:var(--carbon-font-mono, monospace);">03</span>
            <span style="font-weight:700;font-size:13px;letter-spacing:-0.01em;">Reduce</span>
            <span style="font-size:12px;color:#64748B;margin-left:2px;">— Turn insights into action</span>
          </a>
        </div>
      </nav>

      <!-- ==========================================================================
           4. CARBON INTELLIGENCE LOOP SECTION
           ========================================================================== -->
      <section class="carbon-intelligence-loop-section" style="padding:56px 24px;background:#ffffff;border-bottom:1px solid var(--carbon-border, #E2E8F0);">
        <div style="max-width:1280px;margin:0 auto;">
          
          <!-- Section Header -->
          <div style="text-align:center;margin-bottom:32px;">
            <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-500, #0066FF);text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);display:block;margin-bottom:8px;">
              FROM DATA TO IMPACT
            </span>
            <h2 style="font-size:clamp(26px, 3.2vw, 36px);font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 8px 0;letter-spacing:-0.025em;line-height:1.2;">
              The Carbon Intelligence Loop
            </h2>
            <p style="font-size:15px;color:var(--carbon-navy-600, #475569);max-width:680px;margin:0 auto;line-height:1.5;">
              A complete, integrated journey from data to decarbonization.<br style="display:none;" class="mobile-hide">Turn complex emissions data into clear insights and real-world impact.
            </p>
          </div>

          <!-- 5 Stages Grid with Horizontal Connector -->
          <div class="intelligence-loop-grid" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:16px;position:relative;">
            
            <!-- Horizontal Connector Line (Desktop) -->
            <div class="intelligence-loop-connector" style="position:absolute;top:36px;left:40px;right:40px;height:2px;background:linear-gradient(90deg, var(--carbon-navy-200, #E2E8F0) 0%, var(--carbon-blue-500, #0066FF) 50%, var(--carbon-green-600, #10B981) 100%);z-index:0;opacity:0.6;"></div>

            <!-- Stage 1: COLLECT -->
            <div class="loop-card" style="background:var(--carbon-navy-50, #F8FAFC);border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:22px 18px;position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-sm);transition:all 0.15s ease;">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #DBEAFE);color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H3v5"/><path d="M3 7b18 0 0 0 18 0"/><path d="M21 17v-5H3v5"/><path d="M3 12b18 0 0 0 18 0"/><path d="M3 17b18 0 0 0 18 0"/></svg>
                  </div>
                  <span style="font-size:11px;font-weight:800;color:var(--carbon-blue-500, #0066FF);font-family:var(--carbon-font-mono, monospace);background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #DBEAFE);padding:2px 8px;border-radius:12px;">01</span>
                </div>
                <h3 style="font-size:15px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 6px 0;letter-spacing:-0.01em;">01 COLLECT</h3>
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0;line-height:1.5;">
                  Connect all your data across operations, supply chain and assets.
                </p>
              </div>
            </div>

            <!-- Stage 2: CALCULATE -->
            <div class="loop-card" style="background:var(--carbon-navy-50, #F8FAFC);border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:22px 18px;position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-sm);transition:all 0.15s ease;">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:var(--carbon-blue-50, #E0F2FE);border:1px solid var(--carbon-blue-100, #BAE6FD);color:#0284C7;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/></svg>
                  </div>
                  <span style="font-size:11px;font-weight:800;color:#0284C7;font-family:var(--carbon-font-mono, monospace);background:var(--carbon-blue-50, #E0F2FE);border:1px solid var(--carbon-blue-100, #BAE6FD);padding:2px 8px;border-radius:12px;">02</span>
                </div>
                <h3 style="font-size:15px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 6px 0;letter-spacing:-0.01em;">02 CALCULATE</h3>
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0;line-height:1.5;">
                  Apply trusted methodologies and emission factors for accurate results.
                </p>
              </div>
            </div>

            <!-- Stage 3: UNDERSTAND -->
            <div class="loop-card" style="background:var(--carbon-navy-50, #F8FAFC);border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:22px 18px;position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-sm);transition:all 0.15s ease;">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:#EEF2FF;border:1px solid #C7D2FE;color:#6366F1;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  </div>
                  <span style="font-size:11px;font-weight:800;color:#6366F1;font-family:var(--carbon-font-mono, monospace);background:#EEF2FF;border:1px solid #C7D2FE;padding:2px 8px;border-radius:12px;">03</span>
                </div>
                <h3 style="font-size:15px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 6px 0;letter-spacing:-0.01em;">03 UNDERSTAND</h3>
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0;line-height:1.5;">
                  Visualize insights, identify hotspots and opportunities with AI-powered analysis.
                </p>
              </div>
            </div>

            <!-- Stage 4: REPORT -->
            <div class="loop-card" style="background:#F8FAFC;border:1px solid #CBD5E1;border-radius:18px;padding:22px 18px;position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(11,23,39,0.03);transition:all 0.15s ease;">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <div style="width:36px;height:36px;border-radius:10px;background:#F3E8FF;border:1px solid #E9D5FF;color:#8B5CF6;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <span style="font-size:11px;font-weight:800;color:#8B5CF6;font-family:var(--carbon-font-mono, monospace);background:#F3E8FF;border:1px solid #E9D5FF;padding:2px 8px;border-radius:12px;">04</span>
                </div>
                <h3 style="font-size:15px;font-weight:800;color:#0B1727;margin:0 0 6px 0;letter-spacing:-0.01em;">04 REPORT</h3>
                <p style="font-size:13px;color:#475569;margin:0;line-height:1.5;">
                  Create compliant reports with audit-ready evidence.
                </p>
              </div>
            </div>

            <!-- Stage 5: REDUCE -->
            <div class="loop-card" style="background:#F8FAFC;border:1px solid #CBD5E1;border-radius:18px;padding:22px 18px;position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(11,23,39,0.03);transition:all 0.15s ease;">
              <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <div style="width:36px;height:36px;border-radius:10px;background:#ECFDF5;border:1px solid #A7F3D0;color:#10B981;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                  </div>
                  <span style="font-size:11px;font-weight:800;color:#10B981;font-family:var(--carbon-font-mono, monospace);background:#ECFDF5;border:1px solid #A7F3D0;padding:2px 8px;border-radius:12px;">05</span>
                </div>
                <h3 style="font-size:15px;font-weight:800;color:#0B1727;margin:0 0 6px 0;letter-spacing:-0.01em;">05 REDUCE</h3>
                <p style="font-size:13px;color:#475569;margin:0;line-height:1.5;">
                  Turn insights into actions and track real progress towards net zero.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ==========================================================================
           4. PLATFORM PREVIEW SECTION
           ========================================================================== -->
      <section class="carbon-platform-preview-section" style="padding:56px 24px;background:var(--carbon-navy-50, #F8FAFC);border-top:1px solid var(--carbon-border, #E2E8F0);border-bottom:1px solid var(--carbon-border, #E2E8F0);">
        <div style="max-width:1280px;margin:0 auto;">
          
          <div class="platform-preview-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;">
            
            <!-- LEFT COLUMN -->
            <div style="display:flex;flex-direction:column;justify-content:center;">
              <!-- Eyebrow -->
              <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-500, #0066FF);text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);margin-bottom:8px;">
                PLATFORM PREVIEW
              </div>

              <!-- Headline -->
              <h2 style="font-size:clamp(26px, 3.2vw, 36px);font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 12px 0;letter-spacing:-0.025em;line-height:1.2;">
                From insight to impact in one platform.
              </h2>

              <!-- Description -->
              <p style="font-size:15px;color:var(--carbon-navy-600, #475569);margin:0 0 20px 0;line-height:1.55;">
                A unified view of your carbon performance, from global overview to site-level detail.
              </p>

              <!-- Supporting Headline -->
              <h3 style="font-size:13.5px;font-weight:700;color:var(--carbon-navy-800, #1E293B);margin:0 0 16px 0;line-height:1.4;">
                Empower your sustainability, compliance, and engineering teams with a single source of truth.
              </h3>

              <!-- Benefits List -->
              <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
                <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
                  <span style="width:20px;height:20px;border-radius:50%;background:#ECFDF5;color:#10B981;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">✓</span>
                  <span>Real-time emissions tracking</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
                  <span style="width:20px;height:20px;border-radius:50%;background:#ECFDF5;color:#10B981;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">✓</span>
                  <span>Multi-entity, multi-site architecture</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
                  <span style="width:20px;height:20px;border-radius:50%;background:#ECFDF5;color:#10B981;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">✓</span>
                  <span>Built-in compliance &amp; reporting</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
                  <span style="width:20px;height:20px;border-radius:50%;background:#ECFDF5;color:#10B981;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">✓</span>
                  <span>AI-powered analytics &amp; hotspot detection</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--carbon-navy-800, #1E293B);">
                  <span style="width:20px;height:20px;border-radius:50%;background:#ECFDF5;color:#10B981;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">✓</span>
                  <span>Secure, enterprise-grade platform</span>
                </div>
              </div>

              <!-- CTAs -->
              <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                <button class="btn-explore-platform enerix-button enerix-button-primary" style="background:var(--carbon-blue-500, #0066FF);color:#ffffff;padding:0 20px;height:var(--button-height, 40px);border-radius:var(--carbon-radius-lg, 8px);font-weight:700;font-size:13.5px;cursor:pointer;border:none;box-shadow:var(--carbon-shadow-md);display:inline-flex;align-items:center;gap:8px;transition:all 0.15s ease;">
                  Explore the Platform →
                </button>
                <button class="btn-book-demo-cta enerix-button" style="background:#ffffff;color:var(--carbon-navy-950, #0B1727);border:1px solid var(--carbon-border, #CBD5E1);padding:0 20px;height:var(--button-height, 40px);border-radius:var(--carbon-radius-lg, 8px);font-weight:700;font-size:13.5px;cursor:pointer;transition:all 0.15s ease;">
                  Request a Demo
                </button>
              </div>
            </div>

            <!-- RIGHT COLUMN: Dashboard Asset -->
            <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
              <img src="${platformDashboardPreviewUrl}" 
                   alt="Enerixon Carbon Platform Dashboard Preview" 
                   class="platform-dashboard-preview-img"
                   style="width:100%;max-width:600px;height:auto;border-radius:var(--carbon-radius-lg, 8px);box-shadow:var(--carbon-shadow-lg);border:1px solid var(--carbon-border, #CBD5E1);display:block;" 
                   loading="lazy" />
              <!-- Sub-image Mockup Stats Caption -->
              <div style="width:100%;max-width:600px;margin-top:12px;padding:10px 16px;background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #DBEAFE);border-radius:var(--carbon-radius-md, 6px);font-size:12px;font-weight:600;color:var(--carbon-navy-700, #334155);display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;">
                <span>Mockup Data Snapshot:</span>
                <span>Annual Gross Emissions: <strong style="color:var(--carbon-blue-600, #0066FF);">125,430 t</strong>CO₂e</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================================================
           5. THREE CORE CAPABILITIES SECTION
           ========================================================================== -->
      <section class="carbon-core-capabilities-section" style="padding:56px 24px;background:#ffffff;border-bottom:1px solid var(--carbon-border, #E2E8F0);">
        <div style="max-width:1280px;margin:0 auto;">
          
          <!-- Header -->
          <div style="text-align:center;margin-bottom:44px;">
            <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-500, #0066FF);text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);display:block;margin-bottom:8px;">
              OUR CORE CAPABILITIES
            </span>
            <h2 style="font-size:clamp(26px, 3.2vw, 36px);font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 10px 0;letter-spacing:-0.025em;line-height:1.2;">
              End-to-End Carbon Management Architecture
            </h2>
            <p style="font-size:15px;color:var(--carbon-navy-600, #475569);max-width:680px;margin:0 auto;line-height:1.55;">
              Everything required to calculate, disclose, and decarbonize across multi-facility enterprise structures.
            </p>
          </div>

          <!-- 3 Visually Identical Cards -->
          <div class="capabilities-cards-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:24px;">
            
            <!-- CARD 1: MEASURE -->
            <div class="capability-card" style="background:#ffffff;border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-md);transition:all 0.15s ease;">
              <div style="display:flex;flex-direction:column;">
                <!-- Top Row: Badge & Icon -->
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <span style="font-size:11px;font-weight:800;color:var(--carbon-blue-500, #0066FF);font-family:var(--carbon-font-mono, monospace);background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #DBEAFE);padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.04em;">MEASURE</span>
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #DBEAFE);color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H3v5"/><path d="M3 7b18 0 0 0 18 0"/><path d="M21 17v-5H3v5"/><path d="M3 12b18 0 0 0 18 0"/><path d="M3 17b18 0 0 0 18 0"/></svg>
                  </div>
                </div>

                <!-- Title -->
                <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 8px 0;letter-spacing:-0.015em;line-height:1.25;">
                  All your carbon data.<br>In one place.
                </h3>

                <!-- Short description -->
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0 0 14px 0;line-height:1.5;min-height:58px;">
                  Automate data ingestion across energy, facilities, and supply chain. Standardize metrics using verified emission factor libraries.
                </p>

                <!-- Image visual anchor -->
                <img src="${measureVisualUrl}" alt="Measure Visual" style="width:100%;height:170px;object-fit:cover;border-radius:var(--carbon-radius-md, 6px);border:1px solid var(--carbon-border, #E2E8F0);margin-bottom:16px;" loading="lazy" />

                <!-- Benefit Bullets -->
                <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:600;color:var(--carbon-navy-800, #1E293B);margin-bottom:20px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> Automated ERP &amp; IoT data connectors
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> Multi-factor emission databases
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> Data quality &amp; anomaly checks
                  </div>
                </div>
              </div>

              <!-- Bottom Link -->
              <a href="#measure" style="color:var(--carbon-blue-500, #0066FF);font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-top:auto;">
                Explore Measurement →
              </a>
            </div>

            <!-- CARD 2: REPORT -->
            <div class="capability-card" style="background:#ffffff;border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-md);transition:all 0.15s ease;">
              <div style="display:flex;flex-direction:column;">
                <!-- Top Row: Badge & Icon -->
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <span style="font-size:11px;font-weight:800;color:#8B5CF6;font-family:var(--carbon-font-mono, monospace);background:#F3E8FF;border:1px solid #E9D5FF;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.04em;">REPORT</span>
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:#F3E8FF;border:1px solid #E9D5FF;color:#8B5CF6;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                </div>

                <!-- Title -->
                <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 8px 0;letter-spacing:-0.015em;line-height:1.25;">
                  From data to<br>auditable reports.
                </h3>

                <!-- Short description -->
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0 0 14px 0;line-height:1.5;min-height:58px;">
                  Generate compliant disclosures for GHG Protocol, CSRD, and local regulations. Maintain audit trails with cryptographic evidence.
                </p>

                <!-- Image visual anchor -->
                <img src="${reportVisualUrl}" alt="Report Visual" style="width:100%;height:170px;object-fit:cover;border-radius:var(--carbon-radius-md, 6px);border:1px solid var(--carbon-border, #E2E8F0);margin-bottom:16px;" loading="lazy" />

                <!-- Benefit Bullets -->
                <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:600;color:var(--carbon-navy-800, #1E293B);margin-bottom:20px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#8B5CF6;font-weight:800;">✓</span> ISO 14064 &amp; GHG Protocol alignment
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#8B5CF6;font-weight:800;">✓</span> 1-click regulatory export
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#8B5CF6;font-weight:800;">✓</span> Verifiable audit trail
                  </div>
                </div>
              </div>

              <!-- Bottom Link -->
              <a href="#report" style="color:var(--carbon-blue-500, #0066FF);font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-top:auto;">
                Explore Reporting →
              </a>
            </div>

            <!-- CARD 3: REDUCE -->
            <div class="capability-card" style="background:#ffffff;border:1px solid var(--carbon-border, #CBD5E1);border-radius:var(--carbon-radius-lg, 8px);padding:24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--carbon-shadow-md);transition:all 0.15s ease;">
              <div style="display:flex;flex-direction:column;">
                <!-- Top Row: Badge & Icon -->
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                  <span style="font-size:11px;font-weight:800;color:#10B981;font-family:var(--carbon-font-mono, monospace);background:#ECFDF5;border:1px solid #A7F3D0;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.04em;">REDUCE</span>
                  <div style="width:36px;height:36px;border-radius:var(--carbon-radius-md, 6px);background:#ECFDF5;border:1px solid #A7F3D0;color:#10B981;display:flex;align-items:center;justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                  </div>
                </div>

                <!-- Title -->
                <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 8px 0;letter-spacing:-0.015em;line-height:1.25;">
                  Turn insights into<br>real-world impact.
                </h3>

                <!-- Short description -->
                <p style="font-size:13px;color:var(--carbon-navy-600, #475569);margin:0 0 14px 0;line-height:1.5;min-height:58px;">
                  Identify reduction opportunities, model MACC curves, and track decarbonization projects across facilities.
                </p>

                <!-- Image visual anchor -->
                <img src="${reduceVisualUrl}" alt="Reduce Visual" style="width:100%;height:170px;object-fit:cover;border-radius:var(--carbon-radius-md, 6px);border:1px solid var(--carbon-border, #E2E8F0);margin-bottom:16px;" loading="lazy" />

                <!-- Benefit Bullets -->
                <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:600;color:var(--carbon-navy-800, #1E293B);margin-bottom:20px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> MACC curve optimization
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> Facility-level target setting
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="color:#10B981;font-weight:800;">✓</span> ROI &amp; carbon abatement tracking
                  </div>
                </div>
              </div>

              <!-- Bottom Link -->
              <a href="#reduce" style="color:var(--carbon-blue-500, #0066FF);font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-top:auto;">
                Explore Reduction →
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================================================
           6. SCIENCE & TRUST SECTION
           ========================================================================== -->
      <section style="padding:56px 24px;background:#ffffff;" class="carbon-science-section">
        <div style="max-width:1280px;margin:0 auto;background:var(--carbon-blue-50, #EFF6FF);border:1px solid var(--carbon-blue-100, #BFDBFE);border-radius:var(--carbon-radius-lg, 8px);padding:32px;" class="science-panel-responsive">
          
          <div style="display:grid;grid-template-columns:1fr 1.65fr;gap:36px;align-items:center;">
            
            <!-- Left Header -->
            <div>
              <span style="font-size:11px;font-weight:700;color:var(--carbon-blue-500, #0066FF);text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);display:block;margin-bottom:6px;">
                SCIENCE & TRUST
              </span>
              <h2 style="font-size:clamp(24px, 3vw, 32px);font-weight:800;color:var(--carbon-navy-950, #0B1727);margin:0 0 10px 0;line-height:1.2;letter-spacing:-0.02em;">
                Built on science. Designed for trust.
              </h2>
              <p style="font-size:13.5px;color:var(--carbon-navy-600, #334155);margin-bottom:20px;line-height:1.55;">
                Transparent methodologies, authoritative data and end-to-end traceability give you confidence in every number.
              </p>
              <a href="#science" class="enerix-button enerix-button-primary" style="display:inline-flex;align-items:center;justify-content:center;height:var(--button-height, 40px);padding:0 20px;border-radius:var(--carbon-radius-lg, 8px);font-weight:700;font-size:13.5px;color:#ffffff;background:var(--carbon-blue-500, #0066FF);text-decoration:none;box-shadow:var(--carbon-shadow-md);transition:all 0.15s ease;">
                Explore Our Methodology →
              </a>
            </div>

            <!-- Right 2x3 Grid of White Governance Cards -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="science-grid-responsive">
              
              <!-- Tile 1 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Calculation Methodology</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">GHG Protocol aligned, fully transparent and 100% deterministic.</div>
                </div>
              </div>

              <!-- Tile 2 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Emission Factors</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">Authoritative databases (IPCC, MONRE, IEA) with version control.</div>
                </div>
              </div>

              <!-- Tile 3 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Data Lineage</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">Unbroken cryptographic lineage from source document to disclosure.</div>
                </div>
              </div>

              <!-- Tile 4 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"></path><path d="M3.05 11a9 9 0 1 1 .1 1.04"></path><polyline points="1 10 1 5 6 5"></polyline></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Versioning</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">Track, diff, and audit every change across calculations and reports.</div>
                </div>
              </div>

              <!-- Tile 5 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Evidence Management</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">Attach and link primary fuel bills, lab tests, and calibration logs.</div>
                </div>
              </div>

              <!-- Tile 6 -->
              <div style="background:#ffffff;border:1px solid var(--carbon-border, #E2E8F0);border-radius:var(--carbon-radius-md, 6px);padding:16px;box-shadow:var(--carbon-shadow-sm);display:flex;gap:12px;align-items:flex-start;">
                <div style="color:var(--carbon-blue-500, #0066FF);display:flex;align-items:center;justify-content:center;background:var(--carbon-blue-50, #EFF6FF);border-radius:var(--carbon-radius-sm, 4px);padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14px;color:var(--carbon-navy-950, #0B1727);margin-bottom:4px;letter-spacing:-0.01em;">Audit Trail</div>
                  <div style="font-size:12px;color:var(--carbon-navy-600, #475569);line-height:1.45;">Complete audit trail ready for internal QA/QC and third-party auditors.</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================================================
           7. DARK PREMIUM CTA SECTION WITH EARTH BACKGROUND
           ========================================================================== -->
      <section class="carbon-bottom-cta-section" data-earth-asset="${earthBgUrl}" style="width:100%;background-color:#071120;background-image:linear-gradient(rgba(7,17,32,0.85), rgba(7,17,32,0.9)), url('${earthBgUrl}');background-size:cover;background-repeat:no-repeat;background-position:center center;padding:80px 24px;color:#ffffff;font-family:var(--carbon-font-sans, sans-serif);box-sizing:border-box;border-top:1px solid #1E293B;">
        <div style="max-width:1280px;width:100%;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:32px;box-sizing:border-box;">
          
          <div style="flex:1;min-width:280px;max-width:760px;text-align:left;">
            <h2 style="font-size:clamp(22px, 2.5vw, 30px);font-weight:800;color:#ffffff;margin:0;line-height:1.25;letter-spacing:-0.025em;text-shadow:0 1px 3px rgba(0,0,0,0.5);">
              Ready to transition from compliance to competitive advantage?
            </h2>
          </div>

          <div style="display:flex;align-items:center;">
            <button class="btn-book-demo-cta enerix-button enerix-button-primary" style="background:#0066FF;color:#ffffff;padding:0 28px;height:46px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;border:none;box-shadow:0 4px 12px rgba(0,102,255,0.3);transition:all 0.15s ease;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;box-sizing:border-box;">
              Request a Demo
            </button>
          </div>

        </div>
      </section>

      <!-- ==========================================================================
           8. WHITE ENTERPRISE FOOTER
           ========================================================================== -->
      ${renderEnterpriseFooter()}

    </div>
  `.trim();
}

renderPublicOverviewPage.attachEvents = function(container) {
  if (!container) return;

  const demoButtons = document.querySelectorAll('.btn-book-demo-cta, #public-book-demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Thank you for your interest in ENERIX Carbon! Our enterprise team will connect with your compliance officers to schedule a platform demonstration.');
    });
  });

  const exploreButtons = document.querySelectorAll('.btn-explore-platform');
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stateStore.setRoute('workspace');
    });
  });
};
