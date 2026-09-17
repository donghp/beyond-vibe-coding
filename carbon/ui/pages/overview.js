/**
 * ENERIX Carbon - Customer-Facing Product Overview (Homepage)
 * Task #Enerix_Carbon_00023 & Master Implementation V1.0
 * Authority: MDS_ENERIX_CARBON_V1.0_EXPANDED + EDLS-001_V7.1
 *
 * Story: MEASURE → ASSURE → REPORT → REDUCE
 * Governed Baseline: Strict customer-facing product presentation with canonical hero banner, pathway, KPI strip, intelligence loop, and trust architecture.
 */

import { dataProvider } from '../../app/data-provider.js';
import { stateStore } from '../../app/state-store.js';
import { formatBadge, formatCO2e } from '../../app/formatters.js';
import { ICONS } from '../components/icons.js';
import { renderCarbonBrandBanner } from '../components/banner.js';

export function renderOverviewPage(options = {}) {
  const providerStatus = options.status || (dataProvider.getStatus ? dataProvider.getStatus() : 'AVAILABLE');

  if (providerStatus === 'LOADING') {
    return `
      <div class="enerix-card" style="text-align:center;padding:64px;" role="status" aria-live="polite">
        <div style="display:flex;justify-content:center;margin-bottom:14px;">${ICONS.spinner(36)}</div>
        <div style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);">Loading ENERIX Carbon Product Experience...</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">Retrieving governed facility inventory and statutory calculation snapshots.</p>
      </div>
    `;
  }

  if (providerStatus === 'EMPTY') {
    return `
      <div class="enerix-card" style="text-align:center;padding:64px;" role="status">
        <div style="display:flex;justify-content:center;margin-bottom:14px;">${ICONS.folderEmpty(36)}</div>
        <div style="font-size:16px;font-weight:700;color:var(--carbon-navy-900);">No Regulated Facilities Registered</div>
        <p style="font-size:13px;color:var(--carbon-navy-500);margin-top:6px;">No statutory facility records found in data registry.</p>
      </div>
    `;
  }

  if (providerStatus === 'ERROR' || options.error) {
    const errorMsg = options.error?.message || 'Failed to load governed overview state';
    return `
      <div class="enerix-card" style="padding:24px;" role="alert">
        <div class="enerix-alert enerix-alert-danger" style="margin-bottom:0;">
          <div style="flex-shrink:0;">${ICONS.blocker(22)}</div>
          <div>
            <div style="font-weight:700;">Product Overview Engine Error (Fail-Closed)</div>
            <div style="font-size:13px;margin-top:4px;">${errorMsg}</div>
          </div>
        </div>
      </div>
    `;
  }

  const vm = stateStore.getOverviewViewModel();
  const facility = vm.facility || {};
  const reg = vm.regulatory || {};
  const dataHealth = vm.data_health || {};
  const calc = vm.calculation || {};
  const facilities = vm.facilities_list || [];

  const isBlocked = Boolean(calc.is_blocked);
  const totalEmissions = calc.total_co2e_tons || 1082.32;
  const s1Tons = calc.scope_1?.tons || 67.42;
  const s2Tons = calc.scope_2?.tons || 1014.90;
  const s3Tons = calc.scope_3?.tons || 0.0;

  const s1Pct = totalEmissions > 0 ? ((s1Tons / totalEmissions) * 100).toFixed(1) : '6.2';
  const s2Pct = totalEmissions > 0 ? ((s2Tons / totalEmissions) * 100).toFixed(1) : '93.8';

  const hotspots = [
    {
      id: 'HOT-001',
      source: 'National Grid Purchased Electricity',
      scope: 'Scope 2',
      category: 'Purchased Electricity (EVN Grid)',
      tons: s2Tons,
      share: `${s2Pct}%`,
      status: 'PRIMARY_LOAD',
      activity_ref: 'ACT-REC-001',
      evidence_status: 'VERIFIED'
    },
    {
      id: 'HOT-002',
      source: 'Stationary Diesel Combustion',
      scope: 'Scope 1',
      category: 'Stationary Combustion (Boilers & Generators)',
      tons: s1Tons,
      share: `${s1Pct}%`,
      status: 'HIGH_IMPACT',
      activity_ref: 'ACT-REC-002',
      evidence_status: 'VERIFIED'
    }
  ];

  return `
    <!-- ==========================================================================
         01. FULL-BLEED CANONICAL HERO BANNER
         ========================================================================== -->
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Regulatory Carbon & GHG Engineering Platform' })}
      </div>
    </section>

    <!-- ==========================================================================
         02. MEASURE / REPORT / REDUCE PATHWAY (WAYFINDING)
         ========================================================================== -->
    <div style="background:#fff;border-bottom:1px solid var(--carbon-border, #DCE5ED);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div class="pathway" style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));">
          <div class="pathway__item" data-active="true" style="padding:16px 20px;border-right:1px solid var(--carbon-border);display:flex;align-items:center;gap:14px;box-shadow:inset 0 -3px 0 var(--carbon-green-500, #20B45B);">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">01</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Measure</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Know your footprint</div>
            </div>
          </div>
          <div class="pathway__item" style="padding:16px 20px;border-right:1px solid var(--carbon-border);display:flex;align-items:center;gap:14px;">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">02</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Report</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Turn data into disclosure</div>
            </div>
          </div>
          <div class="pathway__item" style="padding:16px 20px;display:flex;align-items:center;gap:14px;">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">03</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Reduce</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Turn insights into action</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         03. PRODUCT INTRODUCTION & VALUE PROPOSITION
         ========================================================================== -->
    <section class="section" style="padding:80px 0;background:var(--carbon-bg, #F7FAFC);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));gap:48px;align-items:center;">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:var(--carbon-blue-50);color:var(--carbon-blue-700);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.04em;margin-bottom:16px;border:1px solid rgba(0,160,224,0.15);">
              <span>DECISION 42/2026/QĐ-TTg GOVERNED CARBON PLATFORM</span>
            </div>
            <h1 class="h1" style="font-size:42px;font-weight:800;color:var(--carbon-navy-950);margin:0 0 16px 0;letter-spacing:-0.03em;line-height:1.15;">
              Carbon intelligence for real-world decisions.
            </h1>
            <p style="font-size:16px;color:var(--carbon-navy-700);margin:0 0 28px 0;line-height:1.6;">
              ENERIX Carbon helps businesses measure, verify, report, and reduce greenhouse gas emissions — on a unified platform from source data to trusted results, evidence, and reporting.
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
              <button id="btn-request-demo-top" class="enerix-button enerix-button-primary" style="font-size:14px;padding:12px 24px;background:var(--carbon-action,#1688E8);">
                Request a Demo →
              </button>
              <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="calculations" style="font-size:14px;padding:12px 24px;">
                Explore Calculation Studio
              </button>
            </div>
          </div>

          <!-- Right Capability Matrix -->
          <div style="background:#fff;border:1px solid var(--carbon-border);border-radius:16px;padding:32px;box-shadow:0 8px 28px rgba(8,33,61,0.06);">
            <div style="font-size:11px;font-weight:700;color:var(--carbon-blue-600);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;">PLATFORM CAPABILITIES</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div style="padding:16px;background:var(--carbon-navy-50);border-radius:12px;border:1px solid var(--carbon-border);">
                <div style="font-weight:700;color:var(--carbon-navy-900);font-size:15px;margin-bottom:4px;">Measure</div>
                <div style="font-size:12px;color:var(--carbon-navy-600);">Know your footprint with IPCC GWP factors</div>
              </div>
              <div style="padding:16px;background:var(--carbon-navy-50);border-radius:12px;border:1px solid var(--carbon-border);">
                <div style="font-weight:700;color:var(--carbon-navy-900);font-size:15px;margin-bottom:4px;">Assure</div>
                <div style="font-size:12px;color:var(--carbon-navy-600);">Trust through evidence & human sign-off</div>
              </div>
              <div style="padding:16px;background:var(--carbon-navy-50);border-radius:12px;border:1px solid var(--carbon-border);">
                <div style="font-weight:700;color:var(--carbon-navy-900);font-size:15px;margin-bottom:4px;">Report</div>
                <div style="font-size:12px;color:var(--carbon-navy-600);">Comply with statutory GHG disclosures</div>
              </div>
              <div style="padding:16px;background:var(--carbon-navy-50);border-radius:12px;border:1px solid var(--carbon-border);">
                <div style="font-weight:700;color:var(--carbon-navy-900);font-size:15px;margin-bottom:4px;">Reduce</div>
                <div style="font-size:12px;color:var(--carbon-navy-600);">Turn insights into action & abatement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         04. CARBON FOOTPRINT / KPI STRIP
         ========================================================================== -->
    <section class="section" style="padding:48px 0;background:#fff;border-bottom:1px solid var(--carbon-border);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;">
          <div>
            <span class="overline" style="color:var(--carbon-blue-600);">CARBON FOOTPRINT</span>
            <h2 class="h2" style="font-size:24px;font-weight:800;color:var(--carbon-navy-950);margin:4px 0 0 0;">Your current emissions profile at a glance.</h2>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:13px;color:var(--carbon-navy-600);">Active Facility:</span>
            <select id="overview-facility-select" class="enerix-select" style="padding:6px 12px;font-size:13px;font-weight:700;border:1px solid var(--carbon-border);border-radius:8px;background:#fff;cursor:pointer;">
              ${facilities.map(f => `
                <option value="${f.facility_id}" ${f.is_active ? 'selected' : ''}>
                  ${f.facility_name} (${f.facility_id})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="kpi-strip" style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:20px;">
          <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:4px;">Total Emissions</div>
              <div style="font-size:32px;font-weight:800;color:var(--carbon-navy-950);font-family:var(--carbon-font-mono);">
                ${calc.total_formatted || '1,082.32'} <span style="font-size:16px;font-weight:600;color:var(--carbon-navy-600);">tCO₂e</span>
              </div>
              <div style="font-size:12px;color:var(--carbon-green-700);margin-top:4px;font-weight:600;">✓ Reporting Year 2026</div>
            </div>
            <div style="width:48px;height:48px;border-radius:12px;background:var(--carbon-blue-50);display:flex;align-items:center;justify-content:center;color:var(--carbon-blue-600);">
              ${ICONS.chartBar(24)}
            </div>
          </div>

          <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:4px;">Data Coverage</div>
              <div style="font-size:32px;font-weight:800;color:var(--carbon-navy-950);font-family:var(--carbon-font-mono);">
                2 / 2
              </div>
              <div style="font-size:12px;color:var(--carbon-navy-600);margin-top:4px;font-weight:600;">Verified data sources</div>
            </div>
            <div style="width:48px;height:48px;border-radius:12px;background:var(--carbon-blue-50);display:flex;align-items:center;justify-content:center;color:var(--carbon-blue-600);">
              ${ICONS.shield(24)}
            </div>
          </div>

          <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--carbon-navy-500);text-transform:uppercase;margin-bottom:4px;">Compliance Status</div>
              <div style="font-size:28px;font-weight:800;color:${isBlocked ? 'var(--carbon-red-700)' : 'var(--carbon-green-700)'};">
                ${isBlocked ? 'Action Required' : 'Ready'}
              </div>
              <div style="font-size:12px;color:var(--carbon-navy-600);margin-top:4px;font-weight:600;">For statutory reporting</div>
            </div>
            <div style="width:48px;height:48px;border-radius:12px;background:${isBlocked ? 'var(--carbon-red-50)' : 'var(--carbon-green-50)'};display:flex;align-items:center;justify-content:center;color:${isBlocked ? 'var(--carbon-red-600)' : 'var(--carbon-green-600)'};">
              ${isBlocked ? ICONS.blocker(24) : ICONS.checkCircle(24)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         05. CARBON INTELLIGENCE LOOP
         ========================================================================== -->
    <section class="section" style="padding:96px 0;background:var(--carbon-bg);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="text-align:center;max-width:700px;margin:0 auto 56px auto;">
          <span class="overline" style="color:var(--carbon-blue-600);">FROM DATA TO IMPACT</span>
          <h2 class="h2" style="font-size:36px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 12px 0;">The Carbon Intelligence Loop</h2>
          <p style="font-size:16px;color:var(--carbon-navy-600);margin:0;">
            A complete, integrated journey from data to decarbonization. Turn complex emissions data into clear insights and real-world impact.
          </p>
        </div>

        <div class="loop" style="display:grid;grid-template-columns:repeat(5, minmax(0, 1fr));gap:24px;">
          <div class="card loop__step" style="text-align:center;padding:24px 16px;">
            <div style="width:56px;height:56px;border-radius:50%;background:var(--carbon-blue-50);color:var(--carbon-blue-600);display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;font-weight:800;">01</div>
            <h3 style="font-size:16px;font-weight:800;color:var(--carbon-navy-950);margin-bottom:8px;">COLLECT</h3>
            <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin:0;">Connect all your data across operations, supply chain and assets.</p>
          </div>

          <div class="card loop__step" style="text-align:center;padding:24px 16px;">
            <div style="width:56px;height:56px;border-radius:50%;background:var(--carbon-blue-50);color:var(--carbon-blue-600);display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;font-weight:800;">02</div>
            <h3 style="font-size:16px;font-weight:800;color:var(--carbon-navy-950);margin-bottom:8px;">CALCULATE</h3>
            <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin:0;">Apply trusted methodologies and emission factors for accurate results.</p>
          </div>

          <div class="card loop__step" style="text-align:center;padding:24px 16px;">
            <div style="width:56px;height:56px;border-radius:50%;background:var(--carbon-blue-50);color:var(--carbon-blue-600);display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;font-weight:800;">03</div>
            <h3 style="font-size:16px;font-weight:800;color:var(--carbon-navy-950);margin-bottom:8px;">UNDERSTAND</h3>
            <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin:0;">Visualize insights, identify hotspots and opportunities with AI analysis.</p>
          </div>

          <div class="card loop__step" style="text-align:center;padding:24px 16px;">
            <div style="width:56px;height:56px;border-radius:50%;background:var(--carbon-blue-50);color:var(--carbon-blue-600);display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;font-weight:800;">04</div>
            <h3 style="font-size:16px;font-weight:800;color:var(--carbon-navy-950);margin-bottom:8px;">REPORT</h3>
            <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin:0;">Create compliant reports with audit-ready evidence in minutes.</p>
          </div>

          <div class="card loop__step" style="text-align:center;padding:24px 16px;">
            <div style="width:56px;height:56px;border-radius:50%;background:var(--carbon-green-50);color:var(--carbon-green-600);display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;font-weight:800;">05</div>
            <h3 style="font-size:16px;font-weight:800;color:var(--carbon-navy-950);margin-bottom:8px;">REDUCE</h3>
            <p style="font-size:13px;color:var(--carbon-navy-600);line-height:1.5;margin:0;">Turn insights into actions and track real progress towards net zero.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         06. PLATFORM PREVIEW
         ========================================================================== -->
    <section class="section" style="padding:96px 0;background:#fff;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(380px, 1fr));gap:56px;align-items:center;">
          <div>
            <span class="overline" style="color:var(--carbon-blue-600);">PLATFORM PREVIEW</span>
            <h2 class="h2" style="font-size:36px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 16px 0;">From insight to impact in one platform.</h2>
            <p style="font-size:16px;color:var(--carbon-navy-600);margin:0 0 24px 0;line-height:1.6;">
              A unified view of your carbon performance, from global overview to site-level detail with deterministic calculation trust.
            </p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">
              <div style="display:flex;align-items:center;gap:10px;font-size:15px;color:var(--carbon-navy-800);font-weight:600;">
                <span style="color:var(--carbon-green-600);">✓</span> Real-time emissions tracking
              </div>
              <div style="display:flex;align-items:center;gap:10px;font-size:15px;color:var(--carbon-navy-800);font-weight:600;">
                <span style="color:var(--carbon-green-600);">✓</span> Multi-entity, multi-site management
              </div>
              <div style="display:flex;align-items:center;gap:10px;font-size:15px;color:var(--carbon-navy-800);font-weight:600;">
                <span style="color:var(--carbon-green-600);">✓</span> Built-in compliance & reporting (Decision 42)
              </div>
              <div style="display:flex;align-items:center;gap:10px;font-size:15px;color:var(--carbon-navy-800);font-weight:600;">
                <span style="color:var(--carbon-green-600);">✓</span> Secure, enterprise-grade audit trail
              </div>
            </div>
            <button class="btn-drilldown enerix-button enerix-button-primary" data-nav="calculations" style="padding:12px 24px;font-size:14px;">
              Explore the Platform →
            </button>
          </div>

          <div style="background:var(--carbon-navy-950);border-radius:16px;padding:24px;box-shadow:0 16px 40px rgba(8,33,61,0.2);border:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.1);">
              <div style="color:#fff;font-weight:700;font-size:14px;">ENERIX Carbon Performance Overview</div>
              <span class="status-badge active" style="font-size:11px;">Verified Live</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:16px;">
              <div style="background:rgba(255,255,255,0.05);padding:12px;border-radius:8px;">
                <div style="font-size:10px;color:rgba(255,255,255,0.6);">TOTAL EMISSIONS</div>
                <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--carbon-font-mono);">1,082.32 <span style="font-size:11px;">tCO₂e</span></div>
              </div>
              <div style="background:rgba(255,255,255,0.05);padding:12px;border-radius:8px;">
                <div style="font-size:10px;color:rgba(255,255,255,0.6);">SCOPE 1</div>
                <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--carbon-font-mono);">67.42 <span style="font-size:11px;">t</span></div>
              </div>
              <div style="background:rgba(255,255,255,0.05);padding:12px;border-radius:8px;">
                <div style="font-size:10px;color:rgba(255,255,255,0.6);">SCOPE 2</div>
                <div style="font-size:18px;font-weight:800;color:#fff;font-family:var(--carbon-font-mono);">1,014.90 <span style="font-size:11px;">t</span></div>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:14px;border-radius:8px;font-size:12px;color:rgba(255,255,255,0.8);display:flex;justify-content:space-between;align-items:center;">
              <span>Primary Source: EVN Grid Electricity (93.8%)</span>
              <button class="btn-drilldown" data-nav="calculations" style="color:var(--carbon-blue-400);background:transparent;border:none;cursor:pointer;font-weight:600;">Open Studio →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         07. THREE PILLARS (MEASURE, REPORT, REDUCE)
         ========================================================================== -->
    <section class="section" style="padding:96px 0;background:var(--carbon-bg);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div class="three-pillars" style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:24px;">
          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span class="overline" style="color:var(--carbon-blue-600);">MEASURE</span>
              <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 12px 0;">All your carbon data. In one place.</h3>
              <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.6;margin-bottom:20px;">
                Connect, standardize and validate data across your organization and value chain with automated outlier detection.
              </p>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-800);margin-bottom:24px;">
                <div>✓ Multiple data sources & formats</div>
                <div>✓ Automated data validation</div>
                <div>✓ Site, asset and supply chain data</div>
              </div>
            </div>
            <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="activity-data" style="width:100%;font-size:13px;">
              Open Activity Data →
            </button>
          </div>

          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span class="overline" style="color:var(--carbon-blue-600);">REPORT</span>
              <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 12px 0;">From data to auditable reports.</h3>
              <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.6;margin-bottom:20px;">
                Create comprehensive, compliant reports aligned with global standards and national regulations (Decision 42).
              </p>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-800);margin-bottom:24px;">
                <div>✓ GHG Protocol, Decision 42, Circular 38</div>
                <div>✓ Automated report generation</div>
                <div>✓ Audit-ready evidence package</div>
              </div>
            </div>
            <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="reports" style="width:100%;font-size:13px;">
              Open Statutory Reports →
            </button>
          </div>

          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span class="overline" style="color:var(--carbon-blue-600);">REDUCE</span>
              <h3 style="font-size:20px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 12px 0;">Turn insights into real-world impact.</h3>
              <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.6;margin-bottom:20px;">
                Identify and track reduction opportunities with measurable business value and transparent abatement curves.
              </p>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-800);margin-bottom:24px;">
                <div>✓ Hotspot ranking & prioritization</div>
                <div>✓ Scenario modelling and target setting</div>
                <div>✓ Track implementation and progress</div>
              </div>
            </div>
            <button class="btn-drilldown enerix-button enerix-button-secondary" data-nav="inventory" style="width:100%;font-size:13px;">
              View Reduction Registry →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         08. SCIENCE & TRUST
         ========================================================================== -->
    <section class="section" style="padding:96px 0;background:#fff;border-top:1px solid var(--carbon-border);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:700px;margin-bottom:48px;">
          <span class="overline" style="color:var(--carbon-blue-600);">SCIENCE & TRUST</span>
          <h2 class="h2" style="font-size:36px;font-weight:800;color:var(--carbon-navy-950);margin:8px 0 12px 0;">Built on science. Designed for trust.</h2>
          <p style="font-size:16px;color:var(--carbon-navy-600);margin:0;">
            Transparent methodologies, authoritative data and end-to-end traceability give you confidence in every reported value.
          </p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;">
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Calculation Methodology</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">GHG Protocol aligned, transparent and deterministic formula execution.</p>
          </div>
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Emission Factors</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">Authoritative sources including EVN grid factors and IPCC AR5.</p>
          </div>
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Data Lineage</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">Full traceability from source invoice or meter to reported value.</p>
          </div>
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Versioning</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">Track changes across all calculations, snapshots and statutory reports.</p>
          </div>
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Evidence Management</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">Store and link supporting documents directly to activity records.</p>
          </div>
          <div class="card" style="padding:24px;">
            <div style="font-weight:700;font-size:16px;color:var(--carbon-navy-900);margin-bottom:6px;">Audit Trail</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);margin:0;">Complete history for internal compliance officers and external auditors.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         09. DARK PREMIUM CTA
         ========================================================================== -->
    <section class="section" style="padding:96px 0;background:var(--carbon-black);color:#fff;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;text-align:center;">
        <span class="overline" style="color:var(--carbon-blue-400);">A MORE SUSTAINABLE TOMORROW</span>
        <h2 style="font-size:clamp(36px, 4vw, 48px);font-weight:800;color:#fff;margin:12px 0 16px 0;letter-spacing:-0.03em;">
          Measure today.<br/>Reduce tomorrow.
        </h2>
        <p style="font-size:16px;color:rgba(255,255,255,0.7);max-width:640px;margin:0 auto 36px auto;line-height:1.6;">
          Turn carbon intelligence into a cleaner, more resilient future for your enterprise under Decision 42/2026/QĐ-TTg.
        </p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
          <button id="btn-request-demo-bottom" class="enerix-button enerix-button-primary" style="background:var(--carbon-action);border-color:var(--carbon-action);padding:14px 28px;font-size:15px;font-weight:700;">
            Book a Demo →
          </button>
          <button class="btn-drilldown enerix-button" data-nav="calculations" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:14px 28px;font-size:15px;font-weight:600;cursor:pointer;">
            Explore the Platform
          </button>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         10. ENTERPRISE FOOTER
         ========================================================================== -->
    <footer style="background:#fff;border-top:1px solid var(--carbon-border);padding:64px 0 32px 0;color:var(--carbon-navy-800);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:40px;margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid var(--carbon-border);">
          <div>
            <div style="font-weight:800;font-size:18px;color:var(--carbon-navy-950);margin-bottom:8px;">ENERIXON CARBON</div>
            <p style="font-size:13px;color:var(--carbon-navy-600);max-width:320px;margin:0;line-height:1.5;">
              Regulatory carbon & greenhouse gas engineering platform for complex industrial enterprises.
            </p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3, minmax(140px, 1fr));gap:32px;">
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Platform</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600);">
                <li><a href="#carbon-footprint-section" class="btn-drilldown" data-nav="overview">Measure</a></li>
                <li><a href="#reports" class="btn-drilldown" data-nav="reports">Report</a></li>
                <li><a href="#inventory" class="btn-drilldown" data-nav="inventory">Reduce</a></li>
                <li><a href="#calculations" class="btn-drilldown" data-nav="calculations">Calculation Studio</a></li>
              </ul>
            </div>
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Science</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600);">
                <li><a href="#methodologies" class="btn-drilldown" data-nav="methodologies">Methodologies</a></li>
                <li><a href="#emission-factors" class="btn-drilldown" data-nav="emission-factors">Emission Factors</a></li>
                <li><a href="#knowledge" class="btn-drilldown" data-nav="knowledge">GHG Guide</a></li>
              </ul>
            </div>
            <div>
              <div style="font-weight:700;font-size:13px;color:var(--carbon-navy-950);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em;">Company</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--carbon-navy-600);">
                <li><a href="#regulatory-check" class="btn-drilldown" data-nav="regulatory-check">Decision 42</a></li>
                <li><a href="#facilities" class="btn-drilldown" data-nav="facilities">Facilities</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:12px;color:var(--carbon-navy-500);">
          <div>Copyright © 2026 ENERIXON CARBON. All rights reserved.</div>
          <div>Carbon intelligence for a cleaner world.</div>
        </div>
      </div>
    </footer>
  `;
}

// Attach Event Listeners for Reactive Interactions
renderOverviewPage.attachEvents = function(container) {
  if (!container) return;

  const facilitySelect = container.querySelector('#overview-facility-select');
  if (facilitySelect) {
    facilitySelect.addEventListener('change', (e) => {
      stateStore.selectFacility(e.target.value);
    });
  }

  const demoBtnTop = container.querySelector('#btn-request-demo-top');
  if (demoBtnTop) {
    demoBtnTop.addEventListener('click', () => {
      alert('Thank you for your interest in ENERIXON Carbon! Our enterprise engineering team will connect with your regulatory compliance officers to schedule a governed MRV demonstration.');
    });
  }

  const demoBtnBottom = container.querySelector('#btn-request-demo-bottom');
  if (demoBtnBottom) {
    demoBtnBottom.addEventListener('click', () => {
      alert('Thank you for your interest in ENERIXON Carbon! Our enterprise engineering team will connect with your regulatory compliance officers to schedule a governed MRV demonstration.');
    });
  }

  const drillDownButtons = container.querySelectorAll('.btn-drilldown');
  drillDownButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetNav = e.currentTarget.getAttribute('data-nav');
      if (targetNav) {
        stateStore.setRoute(targetNav);
      }
    });
  });
};
