const fs = require('fs');

const content = `/**
 * ENERIX Carbon - Customer-Facing Product Overview (Homepage)
 * Reconstructed Master Visual Convergence V1.0
 */
import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { ICONS } from '../components/icons.js';
import { renderEnterpriseFooter } from '../components/enterprise-footer.js';
import { CarbonPath } from '../../app/path.js';

export function renderOverviewPage(options = {}) {
  // We use realistic demo data for the Platform Overview section
  const totalEmissions = 125430;
  const s1Tons = 32540;
  const s2Tons = 41230;
  const s3Tons = 51660;
  
  return \`
    <style>
      .public-overview-page {
        font-family: 'Be Vietnam Pro', Inter, system-ui, -apple-system, sans-serif;
        color: var(--carbon-navy-900, #08213D);
        background: #ffffff;
      }
      .public-overview-page section {
        width: 100%;
        position: relative;
      }
      .public-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 32px;
        width: 100%;
      }
      /* Hero */
      .hero-section {
        background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') center center / cover no-repeat;
        min-height: 560px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
      }
      .hero-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 100%);
      }
      @media (max-width: 768px) {
        .hero-section::before {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
        }
      }
      
      /* Loop */
      .loop-section {
        background: #f8fafc;
        padding: 96px 0;
      }
      .loop-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        flex: 1;
        position: relative;
      }
      .loop-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        color: #fff;
        font-size: 24px;
        z-index: 2;
        background: var(--carbon-blue-600, #0066ff);
      }
      .loop-step:nth-child(1) .loop-icon { background: #22c55e; }
      .loop-step:nth-child(2) .loop-icon { background: #3b82f6; }
      .loop-step:nth-child(3) .loop-icon { background: #0ea5e9; }
      .loop-step:nth-child(4) .loop-icon { background: #6366f1; }
      .loop-step:nth-child(5) .loop-icon { background: #16a34a; }
      
      .loop-arrow {
        position: absolute;
        top: 32px;
        right: -50%;
        width: 100%;
        height: 2px;
        background: #e2e8f0;
        z-index: 1;
        transform: translateY(-50%);
      }
      .loop-step:last-child .loop-arrow { display: none; }
      
      /* Platform */
      .platform-section {
        background: #f1f5f9;
        padding: 96px 0;
      }
      .platform-ui-mock {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        border: 1px solid #e2e8f0;
        overflow: hidden;
      }
      
      /* Solutions */
      .solutions-section {
        background: #fff;
        padding: 96px 0;
      }
      .solution-card {
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
      }
      .solution-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.06);
      }
      .solution-img {
        height: 180px;
        background: #e2e8f0;
        width: 100%;
        object-fit: cover;
      }
      
      /* Science */
      .science-section {
        background: #f8fafc;
        padding: 96px 0;
      }
      .science-card {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 24px;
        display: flex;
        gap: 16px;
      }
      
      /* Testimonial */
      .testimonial-section {
        background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') center center / cover no-repeat;
        padding: 96px 0;
        position: relative;
      }
      .testimonial-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(8, 33, 61, 0.6);
      }
      
      @media (max-width: 1024px) {
        .loop-container { flex-direction: column !important; }
        .loop-steps { display: grid !important; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .loop-arrow { display: none; }
        
        .platform-grid { grid-template-columns: 1fr !important; }
        .testimonial-card { flex-direction: column !important; }
      }
      @media (max-width: 768px) {
        .loop-steps { grid-template-columns: 1fr; }
        .solutions-grid { grid-template-columns: 1fr !important; }
        .science-grid { grid-template-columns: 1fr !important; }
      }
    </style>
    
    <div class="public-overview-page">
    
      <!-- 02. HERO -->
      <section class="hero-section">
        <div class="public-container" style="position:relative; z-index:10; display:flex; justify-content:space-between; align-items:center;">
          <div style="max-width:540px;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--carbon-blue-600, #0066ff);text-transform:uppercase;margin-bottom:16px;">
              MEASURE TODAY. REDUCE FOR TOMORROW.
            </div>
            <h1 style="font-size:clamp(40px, 5vw, 64px);font-weight:800;line-height:1.1;letter-spacing:-0.03em;color:var(--carbon-navy-950, #08213D);margin-bottom:24px;">
              Turn carbon data<br/>into <span style="color:#0ea5e9;">opportunities.</span>
            </h1>
            <p style="font-size:18px;line-height:1.6;color:var(--carbon-navy-700, #334155);margin-bottom:40px;max-width:480px;">
              Trusted carbon intelligence for a cleaner, more resilient future.
            </p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;">
              <button class="enerix-button enerix-button-primary" style="background:#0066ff;color:#fff;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,102,255,0.25);">
                Explore ENERIX Carbon &rarr;
              </button>
              <button class="enerix-button" style="background:transparent;color:var(--carbon-blue-600, #0066ff);padding:14px 24px;font-size:15px;font-weight:700;border:none;cursor:pointer;display:flex;align-items:center;gap:8px;">
                Watch Video
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </button>
            </div>
          </div>
          
          <div style="text-align:right; display:flex; flex-direction:column; gap:16px; margin-top:-60px;" class="hero-right-visual">
            <div style="font-size:18px;font-weight:300;letter-spacing:0.1em;color:var(--carbon-navy-900);text-transform:uppercase;margin-bottom:8px;">
              NET ZERO<br/><span style="font-weight:800;font-size:32px;">2050</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.05em;color:var(--carbon-navy-800);">MEASURE</div>
              <div style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(8,33,61,0.2);display:flex;align-items:center;justify-content:center;">${ICONS.search(16)}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.05em;color:var(--carbon-navy-800);">REPORT</div>
              <div style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(8,33,61,0.2);display:flex;align-items:center;justify-content:center;">${ICONS.document(16)}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.05em;color:var(--carbon-navy-800);">REDUCE</div>
              <div style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(8,33,61,0.2);display:flex;align-items:center;justify-content:center;">${ICONS.trendingDown(16)}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.05em;color:var(--carbon-navy-800);">SUSTAIN</div>
              <div style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(8,33,61,0.2);display:flex;align-items:center;justify-content:center;">${ICONS.checkCircle(16)}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03. TRUST / PERFORMANCE STRIP -->
      <section style="background:#fff;border-bottom:1px solid #e2e8f0;padding:32px 0;">
        <div class="public-container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="color:#0ea5e9;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            </div>
            <div>
              <div style="font-size:20px;font-weight:800;color:var(--carbon-navy-900);">500+</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);font-weight:500;">Organizations</div>
            </div>
          </div>
          <div style="width:1px;height:40px;background:#e2e8f0;"></div>
          
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="color:#22c55e;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <div style="font-size:20px;font-weight:800;color:var(--carbon-navy-900);">50M+</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);font-weight:500;">tCO₂e measured</div>
            </div>
          </div>
          <div style="width:1px;height:40px;background:#e2e8f0;"></div>
          
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="color:#3b82f6;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <div>
              <div style="font-size:20px;font-weight:800;color:var(--carbon-navy-900);">30%</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);font-weight:500;">Average reduction</div>
            </div>
          </div>
          <div style="width:1px;height:40px;background:#e2e8f0;"></div>
          
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="color:#64748b;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            </div>
            <div>
              <div style="font-size:20px;font-weight:800;color:var(--carbon-navy-900);">100%</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);font-weight:500;">Audit-ready</div>
            </div>
          </div>
          <div style="width:1px;height:40px;background:#e2e8f0;"></div>
          
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="color:#0f172a;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div>
              <div style="font-size:20px;font-weight:800;color:var(--carbon-navy-900);">20+</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);font-weight:500;">Countries</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04. CARBON INTELLIGENCE LOOP -->
      <section class="loop-section">
        <div class="public-container loop-container" style="display:flex;gap:48px;align-items:center;">
          <div style="flex:0 0 320px;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--carbon-blue-600);text-transform:uppercase;margin-bottom:12px;">
              FROM DATA TO IMPACT
            </div>
            <h2 style="font-size:32px;font-weight:800;line-height:1.2;color:var(--carbon-navy-900);margin-bottom:20px;letter-spacing:-0.02em;">
              The Carbon<br/>Intelligence Loop
            </h2>
            <p style="font-size:15px;line-height:1.6;color:var(--carbon-navy-700);margin-bottom:32px;">
              A complete, integrated journey from data to decarbonization. Turn complex emissions data into clear insights and real-world impact.
            </p>
            <div style="display:flex;gap:16px;align-items:center;">
              <button class="enerix-button enerix-button-primary" style="background:#0066ff;color:#fff;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:700;border:none;cursor:pointer;">
                See How It Works &rarr;
              </button>
              <a href="#use-cases" style="color:var(--carbon-blue-600);font-size:14px;font-weight:600;text-decoration:none;">Explore Use Cases</a>
            </div>
          </div>
          
          <div class="loop-steps" style="flex:1;display:flex;justify-content:space-between;position:relative;">
            <div class="loop-step">
              <div class="loop-icon">${ICONS.database(24)}</div>
              <div style="color:var(--carbon-blue-600);font-size:13px;font-weight:800;margin-bottom:4px;">01</div>
              <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:8px;">COLLECT</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);line-height:1.4;">Connect all your data across operations.</div>
              <div class="loop-arrow"></div>
            </div>
            <div class="loop-step">
              <div class="loop-icon">${ICONS.settings(24)}</div>
              <div style="color:var(--carbon-blue-600);font-size:13px;font-weight:800;margin-bottom:4px;">02</div>
              <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:8px;">CALCULATE</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);line-height:1.4;">Apply trusted methodologies.</div>
              <div class="loop-arrow"></div>
            </div>
            <div class="loop-step">
              <div class="loop-icon">${ICONS.chartBar(24)}</div>
              <div style="color:var(--carbon-blue-600);font-size:13px;font-weight:800;margin-bottom:4px;">03</div>
              <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:8px;">UNDERSTAND</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);line-height:1.4;">Visualize insights and hotspots.</div>
              <div class="loop-arrow"></div>
            </div>
            <div class="loop-step">
              <div class="loop-icon">${ICONS.document(24)}</div>
              <div style="color:var(--carbon-blue-600);font-size:13px;font-weight:800;margin-bottom:4px;">04</div>
              <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:8px;">REPORT</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);line-height:1.4;">Create compliant reports with evidence.</div>
              <div class="loop-arrow"></div>
            </div>
            <div class="loop-step">
              <div class="loop-icon">${ICONS.leaf(24)}</div>
              <div style="color:var(--carbon-blue-600);font-size:13px;font-weight:800;margin-bottom:4px;">05</div>
              <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:8px;">REDUCE</div>
              <div style="font-size:13px;color:var(--carbon-navy-600);line-height:1.4;">Turn insights into action towards net zero.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05. PLATFORM OVERVIEW -->
      <section class="platform-section">
        <div class="public-container platform-grid" style="display:grid;grid-template-columns:340px 1fr;gap:64px;align-items:center;">
          <div>
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:12px;">
              PLATFORM OVERVIEW
            </div>
            <h2 style="font-size:36px;font-weight:800;line-height:1.1;color:var(--carbon-navy-900);margin-bottom:24px;letter-spacing:-0.03em;">
              From insight to impact in one platform.
            </h2>
            <p style="font-size:16px;line-height:1.6;color:var(--carbon-navy-700);margin-bottom:32px;">
              A unified view of your carbon performance, from global overview to site-level detail.
            </p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:40px;">
              <div style="display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;color:var(--carbon-navy-800);">
                <div style="color:#16a34a;">${ICONS.checkCircle(20)}</div> Real-time emissions tracking
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;color:var(--carbon-navy-800);">
                <div style="color:#16a34a;">${ICONS.checkCircle(20)}</div> Multi-entity, multi-site
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;color:var(--carbon-navy-800);">
                <div style="color:#16a34a;">${ICONS.checkCircle(20)}</div> Built-in compliance & reporting
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;color:var(--carbon-navy-800);">
                <div style="color:#16a34a;">${ICONS.checkCircle(20)}</div> AI-powered insights
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;color:var(--carbon-navy-800);">
                <div style="color:#16a34a;">${ICONS.checkCircle(20)}</div> Secure, enterprise-grade platform
              </div>
            </div>
            <div style="display:flex;gap:16px;flex-direction:column;align-items:flex-start;">
              <button class="enerix-button enerix-button-primary" style="background:#0066ff;color:#fff;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;border:none;cursor:pointer;width:auto;">
                Explore the Platform &rarr;
              </button>
              <button class="enerix-button" style="background:transparent;border:1px solid #cbd5e1;color:var(--carbon-navy-800);padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;width:auto;">
                Request a Demo
              </button>
            </div>
          </div>
          
          <!-- Mocking ENERIX Carbon Product Application Preview UI -->
          <div class="platform-ui-mock" style="display:flex;flex-direction:column;height:560px;background:#f8fafc;">
            <div style="height:56px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 24px;justify-content:space-between;">
              <div style="display:flex;align-items:center;gap:8px;">
                <img src="\${'/carbon/assets/logo_enerixon_carbon.png?v=2'}" alt="Logo" style="height:24px;">
              </div>
              <div style="display:flex;gap:12px;">
                <select style="padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;"><option>Global Company</option></select>
                <select style="padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;"><option>Last 12 months</option></select>
                <div style="width:32px;height:32px;border-radius:50%;background:var(--carbon-navy-900);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">OK</div>
              </div>
            </div>
            <div style="display:flex;flex:1;overflow:hidden;">
              <div style="width:200px;background:#081321;color:#94a3b8;padding:24px 16px;display:flex;flex-direction:column;gap:8px;">
                <div style="padding:10px 12px;background:rgba(255,255,255,0.1);color:#fff;border-radius:6px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.database(16)} Overview</div>
                <div style="padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.cloud(16)} Emissions</div>
                <div style="padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.building(16)} Facilities</div>
                <div style="padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.truck(16)} Supply Chain</div>
                <div style="padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.document(16)} Reports</div>
                <div style="padding:10px 12px;font-size:13px;display:flex;align-items:center;gap:12px;">${ICONS.trendingDown(16)} Reduction Plan</div>
              </div>
              <div style="flex:1;padding:24px;background:#f1f5f9;overflow-y:auto;">
                <h3 style="font-size:18px;font-weight:700;color:var(--carbon-navy-900);margin:0 0 4px 0;">Carbon Performance Overview</h3>
                <p style="font-size:13px;color:var(--carbon-navy-600);margin:0 0 24px 0;">Track progress towards a cleaner, more sustainable future.</p>
                
                <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16px;margin-bottom:24px;">
                  <div style="background:#fff;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:8px;">Total Emissions</div>
                    <div style="font-size:24px;font-weight:800;color:var(--carbon-navy-900);margin-bottom:2px;">125,430</div>
                    <div style="font-size:11px;color:var(--carbon-navy-500);margin-bottom:8px;">tCO₂e</div>
                    <div style="font-size:12px;color:#16a34a;font-weight:600;">↓ 12% <span style="color:#94a3b8;font-weight:400;">vs previous year</span></div>
                  </div>
                  <div style="background:#fff;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:8px;">Scope 1</div>
                    <div style="font-size:24px;font-weight:800;color:var(--carbon-navy-900);margin-bottom:2px;">32,540</div>
                    <div style="font-size:11px;color:var(--carbon-navy-500);margin-bottom:8px;">tCO₂e</div>
                    <div style="font-size:12px;color:#16a34a;font-weight:600;">↓ 24% <span style="color:#94a3b8;font-weight:400;">vs previous year</span></div>
                  </div>
                  <div style="background:#fff;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:8px;">Scope 2</div>
                    <div style="font-size:24px;font-weight:800;color:var(--carbon-navy-900);margin-bottom:2px;">41,230</div>
                    <div style="font-size:11px;color:var(--carbon-navy-500);margin-bottom:8px;">tCO₂e</div>
                    <div style="font-size:12px;color:#16a34a;font-weight:600;">↓ 26% <span style="color:#94a3b8;font-weight:400;">vs previous year</span></div>
                  </div>
                  <div style="background:#fff;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:12px;color:var(--carbon-navy-600);margin-bottom:8px;">Scope 3</div>
                    <div style="font-size:24px;font-weight:800;color:var(--carbon-navy-900);margin-bottom:2px;">51,660</div>
                    <div style="font-size:11px;color:var(--carbon-navy-500);margin-bottom:8px;">tCO₂e</div>
                    <div style="font-size:12px;color:#16a34a;font-weight:600;">↓ 42% <span style="color:#94a3b8;font-weight:400;">vs previous year</span></div>
                  </div>
                </div>
                
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
                  <div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:13px;font-weight:700;margin-bottom:20px;">Emissions by Scope</div>
                    <div style="display:flex;align-items:center;gap:32px;justify-content:center;">
                      <div style="width:120px;height:120px;border-radius:50%;border:16px solid #e2e8f0;border-top-color:#38bdf8;border-right-color:#0ea5e9;border-bottom-color:#22c55e;display:flex;align-items:center;justify-content:center;flex-direction:column;">
                        <div style="font-weight:800;font-size:16px;">125,430</div>
                        <div style="font-size:10px;color:var(--carbon-navy-500);">tCO₂e</div>
                      </div>
                      <div style="display:flex;flex-direction:column;gap:12px;font-size:12px;">
                        <div style="display:flex;align-items:center;gap:8px;"><div style="width:12px;height:12px;border-radius:2px;background:#38bdf8;"></div> Scope 1 <span style="font-weight:700;margin-left:auto;">26%</span></div>
                        <div style="display:flex;align-items:center;gap:8px;"><div style="width:12px;height:12px;border-radius:2px;background:#0ea5e9;"></div> Scope 2 <span style="font-weight:700;margin-left:auto;">33%</span></div>
                        <div style="display:flex;align-items:center;gap:8px;"><div style="width:12px;height:12px;border-radius:2px;background:#22c55e;"></div> Scope 3 <span style="font-weight:700;margin-left:auto;">41%</span></div>
                      </div>
                    </div>
                  </div>
                  <div style="background:#fff;padding:20px;border-radius:8px;border:1px solid #e2e8f0;">
                    <div style="font-size:13px;font-weight:700;margin-bottom:20px;">Emissions by Source</div>
                    <div style="display:flex;flex-direction:column;gap:10px;font-size:11px;">
                      <div style="display:flex;align-items:center;justify-content:space-between;"><span>Purchased goods & services</span><span style="font-weight:700;">26%</span></div>
                      <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;"><div style="height:100%;width:26%;background:#0ea5e9;"></div></div>
                      <div style="display:flex;align-items:center;justify-content:space-between;"><span>Energy use (electricity)</span><span style="font-weight:700;">18%</span></div>
                      <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;"><div style="height:100%;width:18%;background:#38bdf8;"></div></div>
                      <div style="display:flex;align-items:center;justify-content:space-between;"><span>Fuel combustion</span><span style="font-weight:700;">15%</span></div>
                      <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;"><div style="height:100%;width:15%;background:#22c55e;"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 06. SOLUTIONS FOR A LOWER CARBON TOMORROW -->
      <section class="solutions-section">
        <div class="public-container">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:48px;flex-wrap:wrap;gap:24px;">
            <div>
              <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:12px;">
                SOLUTIONS FOR A LOWER CARBON TOMORROW
              </div>
              <h2 style="font-size:36px;font-weight:800;line-height:1.1;color:var(--carbon-navy-900);letter-spacing:-0.03em;">
                All your carbon challenges.<br/>One integrated solution.
              </h2>
            </div>
            <div style="max-width:400px;text-align:right;">
              <p style="font-size:14px;color:var(--carbon-navy-700);margin-bottom:16px;text-align:left;">
                From corporate reporting to product carbon footprint, from supply chain to decarbonization planning &mdash; ENERIX Carbon helps you move from compliance to competitive advantage.
              </p>
              <a href="#solutions" style="color:var(--carbon-blue-600);font-size:14px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                View All Solutions &rarr;
              </a>
            </div>
          </div>
          
          <div class="solutions-grid" style="display:grid;grid-template-columns:repeat(4, 1fr);gap:24px;">
            <div class="solution-card">
              <div class="solution-img" style="background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') center center / cover;"></div>
              <div style="padding:24px;display:flex;flex-direction:column;flex:1;">
                <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-900);margin:0 0 12px 0;">Corporate Carbon Management</h3>
                <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin:0 0 24px 0;flex:1;">Measure, manage and report emissions across your entire organization.</p>
                <a href="#solution1" style="color:var(--carbon-blue-600);font-size:14px;font-weight:700;text-decoration:none;">Learn More &rarr;</a>
              </div>
            </div>
            <div class="solution-card">
              <div class="solution-img" style="background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') right center / cover;"></div>
              <div style="padding:24px;display:flex;flex-direction:column;flex:1;">
                <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-900);margin:0 0 12px 0;">Supply Chain Carbon Intelligence</h3>
                <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin:0 0 24px 0;flex:1;">Gain visibility and reduce emissions across your value chain.</p>
                <a href="#solution2" style="color:var(--carbon-blue-600);font-size:14px;font-weight:700;text-decoration:none;">Learn More &rarr;</a>
              </div>
            </div>
            <div class="solution-card">
              <div class="solution-img" style="background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') left center / cover;"></div>
              <div style="padding:24px;display:flex;flex-direction:column;flex:1;">
                <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-900);margin:0 0 12px 0;">Product Carbon Footprint</h3>
                <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin:0 0 24px 0;flex:1;">Understand and communicate the environmental impact of your products.</p>
                <a href="#solution3" style="color:var(--carbon-blue-600);font-size:14px;font-weight:700;text-decoration:none;">Learn More &rarr;</a>
              </div>
            </div>
            <div class="solution-card">
              <div class="solution-img" style="background: url('\${'/carbon/assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png?v=4'}') center bottom / cover;"></div>
              <div style="padding:24px;display:flex;flex-direction:column;flex:1;">
                <h3 style="font-size:18px;font-weight:800;color:var(--carbon-navy-900);margin:0 0 12px 0;">Decarbonization Strategy</h3>
                <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin:0 0 24px 0;flex:1;">Turn data into actionable reduction plans and track real progress.</p>
                <a href="#solution4" style="color:var(--carbon-blue-600);font-size:14px;font-weight:700;text-decoration:none;">Learn More &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 07. SCIENCE & TRUST -->
      <section class="science-section">
        <div class="public-container" style="display:flex;gap:64px;flex-wrap:wrap;">
          <div style="flex:1;min-width:300px;max-width:400px;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:12px;">
              SCIENCE & TRUST
            </div>
            <h2 style="font-size:36px;font-weight:800;line-height:1.1;color:var(--carbon-navy-900);margin-bottom:20px;letter-spacing:-0.03em;">
              Built on science.<br/>Designed for trust.
            </h2>
            <p style="font-size:15px;line-height:1.6;color:var(--carbon-navy-700);margin-bottom:32px;">
              Transparent methodologies, authoritative data and end-to-end traceability give you confidence in every number.
            </p>
            <button class="enerix-button enerix-button-primary" style="background:#0066ff;color:#fff;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:700;border:none;cursor:pointer;">
              Explore Our Methodology &rarr;
            </button>
          </div>
          
          <div class="science-grid" style="flex:2;display:grid;grid-template-columns:repeat(2, 1fr);gap:16px;min-width:340px;">
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.globe(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">GHG Protocol Aligned</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">Globally recognized standards</div>
              </div>
            </div>
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.database(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">Authoritative Data</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">Trusted emission factors</div>
              </div>
            </div>
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.search(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">Full Traceability</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">From source to report</div>
              </div>
            </div>
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.clock(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">Versioning & Audit Trail</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">Track changes and evidence</div>
              </div>
            </div>
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.document(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">Multi-Format Reporting</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">PDF, XLSX, XBRL, APIs</div>
              </div>
            </div>
            <div class="science-card">
              <div style="color:var(--carbon-blue-600);">${ICONS.lock(24)}</div>
              <div>
                <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);margin-bottom:4px;">Enterprise Security</div>
                <div style="font-size:13px;color:var(--carbon-navy-600);">Secure. Scalable. Compliant.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 08. CUSTOMER PROOF / TESTIMONIAL -->
      <section class="testimonial-section">
        <div class="public-container" style="position:relative;z-index:10;">
          <div class="testimonial-card" style="background:#fff;border-radius:12px;padding:48px;display:flex;gap:48px;box-shadow:0 24px 48px rgba(0,0,0,0.12);">
            <div style="flex:3;">
              <div style="color:var(--carbon-blue-600);margin-bottom:24px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p style="font-size:24px;font-weight:600;line-height:1.4;color:var(--carbon-navy-900);margin-bottom:32px;">
                "ENERIX Carbon gives us the clarity and confidence to take action. It's more than reporting &mdash; it's a strategic tool for a sustainable future."
              </p>
              <div style="display:flex;align-items:center;gap:16px;">
                <div style="width:48px;height:48px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;color:var(--carbon-navy-500);font-weight:700;">NM</div>
                <div>
                  <div style="font-weight:800;font-size:15px;color:var(--carbon-navy-900);">Nguyen Van Minh</div>
                  <div style="font-size:13px;color:var(--carbon-navy-600);">Chief Sustainability Officer, Global Manufacturing Group</div>
                </div>
              </div>
            </div>
            
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:32px;padding-left:48px;border-left:1px solid #e2e8f0;">
              <div>
                <div style="font-size:40px;font-weight:800;color:var(--carbon-green-600, #16a34a);line-height:1;">30%</div>
                <div style="font-size:14px;color:var(--carbon-navy-700);font-weight:600;margin-top:8px;">Emissions reduction<br/>in 3 years</div>
              </div>
              <div>
                <div style="font-size:40px;font-weight:800;color:var(--carbon-green-600, #16a34a);line-height:1;">100%</div>
                <div style="font-size:14px;color:var(--carbon-navy-700);font-weight:600;margin-top:8px;">Audit-ready<br/>reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 09. DARK PREMIUM CTA -->
      <section style="background-color:#081220;background-image:url('\${CarbonPath.resolve('assets/branding/footer_earth_background.png')}');background-position:right center;background-size:cover;background-repeat:no-repeat;padding:120px 0;min-height:480px;display:flex;align-items:center;">
        <div class="public-container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:48px;">
          <div style="max-width:540px;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:#38bdf8;text-transform:uppercase;margin-bottom:16px;">
              A CLEANER PLANET. BRIGHTER TOMORROW.
            </div>
            <h2 style="font-size:clamp(40px, 5vw, 56px);font-weight:800;color:#ffffff;margin:0 0 24px 0;letter-spacing:-0.03em;line-height:1.1;">
              Measure today.<br/>
              <span style="color:#34D399;">Reduce tomorrow.</span>
            </h2>
            <p style="font-size:18px;color:rgba(255,255,255,0.75);margin:0 0 40px 0;line-height:1.6;">
              Turn carbon intelligence into a cleaner, more resilient future.
            </p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
              <button class="enerix-button enerix-button-primary" style="background:#0066ff;border:1px solid #0066ff;color:#fff;padding:14px 28px;font-size:15px;font-weight:700;border-radius:8px;">
                Book a Demo &rarr;
              </button>
              <button class="enerix-button" style="background:transparent;border:1px solid rgba(255,255,255,0.25);color:#fff;padding:14px 28px;font-size:15px;font-weight:600;border-radius:8px;cursor:pointer;">
                Contact Our Team
              </button>
            </div>
          </div>
          
          <div style="display:flex;flex-direction:column;gap:32px;justify-content:center;">
            <div style="display:flex;align-items:center;gap:20px;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(56,189,248,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <div style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:4px;">LOWER EMISSIONS</div>
                <div style="font-size:15px;color:rgba(255,255,255,0.7);">Healthier planet</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:20px;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(52,211,153,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <div style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:4px;">STRONGER BUSINESSES</div>
                <div style="font-size:15px;color:rgba(255,255,255,0.7);">Greater resilience</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:20px;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:4px;">BRIGHTER TOMORROW</div>
                <div style="font-size:15px;color:rgba(255,255,255,0.7);">Net zero 2050</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. ENTERPRISE FOOTER -->
      \${renderEnterpriseFooter()}
    </div>
  \`;
}

// Ensure events can attach without throwing errors if elements don't exist
renderOverviewPage.attachEvents = function(container) {
  if (!container) return;
};
`;

fs.writeFileSync('carbon/ui/pages/overview.js', content);
