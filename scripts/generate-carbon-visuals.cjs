const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDirs = [
  path.join(__dirname, '../carbon/assets'),
  path.join(__dirname, '../public/carbon/assets'),
  path.join(__dirname, '../dist/carbon/assets')
];

outputDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Dashboard Preview
const dashboardSvg = `
<svg width="1000" height="625" viewBox="0 0 1000 625" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sidebarGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B1C33"/>
      <stop offset="100%" stop-color="#081426"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0B1727" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Container -->
  <rect width="1000" height="625" rx="16" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>

  <!-- Sidebar -->
  <rect x="0" y="0" width="200" height="625" rx="16" fill="url(#sidebarGrad)"/>
  <rect x="180" y="0" width="20" height="625" fill="#081426"/>

  <!-- Logo in Sidebar -->
  <g transform="translate(20, 24)">
    <rect width="28" height="28" rx="6" fill="#0066FF"/>
    <path d="M14 6 C8 6 8 22 14 22 C20 22 20 6 14 6 Z" fill="#10B981" opacity="0.8"/>
    <text x="36" y="19" font-family="sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" letter-spacing="0.5">ENERIXON</text>
    <text x="36" y="32" font-family="sans-serif" font-weight="700" font-size="10" fill="#38BDF8" letter-spacing="1">CARBON</text>
  </g>

  <!-- Sidebar Menu -->
  <g transform="translate(14, 80)" font-family="sans-serif" font-size="12" font-weight="600">
    <!-- Overview (Active) -->
    <rect x="0" y="0" width="172" height="38" rx="8" fill="#0066FF"/>
    <text x="36" y="24" fill="#FFFFFF">Overview</text>
    <circle cx="22" cy="19" r="6" stroke="#FFFFFF" stroke-width="2" fill="none"/>

    <text x="36" y="68" fill="#94A3B8">Emissions</text>
    <path d="M16 68 h12" stroke="#94A3B8" stroke-width="2"/>

    <text x="36" y="108" fill="#94A3B8">Facilities</text>
    <text x="36" y="148" fill="#94A3B8">Supply Chain</text>
    <text x="36" y="188" fill="#94A3B8">Reports</text>
    <text x="36" y="228" fill="#94A3B8">Reduction Plan</text>
    <text x="36" y="268" fill="#94A3B8">Data Management</text>
    <text x="36" y="308" fill="#94A3B8">Settings</text>
  </g>

  <!-- Top Header Bar -->
  <g transform="translate(220, 16)">
    <!-- Selectors -->
    <rect x="520" y="8" width="130" height="32" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="532" y="29" font-family="sans-serif" font-size="11" font-weight="600" fill="#334155">Global Company ▾</text>

    <rect x="660" y="8" width="110" height="32" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="670" y="29" font-family="sans-serif" font-size="11" font-weight="600" fill="#334155">Last 12 months ▾</text>

    <!-- Avatar -->
    <circle cx="800" cy="24" r="16" fill="#0B1727"/>
    <text x="793" y="28" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">DH</text>
  </g>

  <!-- Main Content Area -->
  <g transform="translate(220, 65)">
    <!-- Title & Subtitle -->
    <text x="0" y="22" font-family="sans-serif" font-size="20" font-weight="800" fill="#0B1727">Carbon Performance Overview</text>
    <text x="0" y="42" font-family="sans-serif" font-size="12" fill="#64748B">Track progress towards a cleaner, more sustainable future.</text>

    <!-- KPI Cards Row -->
    <!-- Card 1: Total Emissions -->
    <g transform="translate(0, 55)" filter="url(#cardShadow)">
      <rect width="175" height="105" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="24" font-family="sans-serif" font-size="11" font-weight="600" fill="#64748B">Total Emissions</text>
      <text x="14" y="52" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">125,430</text>
      <text x="14" y="66" font-family="sans-serif" font-size="10" font-weight="600" fill="#64748B">tCO₂e</text>
      <text x="14" y="88" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">↓ 12% vs prev year</text>
    </g>

    <!-- Card 2: Scope 1 -->
    <g transform="translate(190, 55)" filter="url(#cardShadow)">
      <rect width="175" height="105" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="24" font-family="sans-serif" font-size="11" font-weight="600" fill="#64748B">Scope 1</text>
      <circle cx="155" cy="20" r="7" fill="#EFF6FF" stroke="#0066FF" stroke-width="2"/>
      <text x="14" y="52" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">32,540</text>
      <text x="14" y="66" font-family="sans-serif" font-size="10" font-weight="600" fill="#64748B">tCO₂e</text>
      <text x="14" y="88" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">↓ 24%</text>
    </g>

    <!-- Card 3: Scope 2 -->
    <g transform="translate(380, 55)" filter="url(#cardShadow)">
      <rect width="175" height="105" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="24" font-family="sans-serif" font-size="11" font-weight="600" fill="#64748B">Scope 2</text>
      <circle cx="155" cy="20" r="7" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
      <text x="14" y="52" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">41,230</text>
      <text x="14" y="66" font-family="sans-serif" font-size="10" font-weight="600" fill="#64748B">tCO₂e</text>
      <text x="14" y="88" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">↓ 30%</text>
    </g>

    <!-- Card 4: Scope 3 -->
    <g transform="translate(570, 55)" filter="url(#cardShadow)">
      <rect width="175" height="105" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="24" font-family="sans-serif" font-size="11" font-weight="600" fill="#64748B">Scope 3</text>
      <circle cx="155" cy="20" r="7" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/>
      <text x="14" y="52" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">51,660</text>
      <text x="14" y="66" font-family="sans-serif" font-size="10" font-weight="600" fill="#64748B">tCO₂e</text>
      <text x="14" y="88" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">↓ 42%</text>
    </g>

    <!-- Charts Row -->
    <!-- Donut Chart Card -->
    <g transform="translate(0, 180)" filter="url(#cardShadow)">
      <rect width="365" height="340" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="20" y="32" font-family="sans-serif" font-size="14" font-weight="700" fill="#0B1727">Emissions by Scope</text>
      
      <!-- Donut Circle -->
      <g transform="translate(130, 175)">
        <circle cx="0" cy="0" r="85" fill="none" stroke="#6366F1" stroke-width="32" stroke-dasharray="140 400" transform="rotate(-90)"/>
        <circle cx="0" cy="0" r="85" fill="none" stroke="#0284C7" stroke-dasharray="160 400" stroke-width="32" transform="rotate(35)"/>
        <circle cx="0" cy="0" r="85" fill="none" stroke="#0066FF" stroke-dasharray="130 400" stroke-width="32" transform="rotate(180)"/>
        
        <text x="0" y="-4" font-family="sans-serif" font-size="18" font-weight="800" text-anchor="middle" fill="#0B1727">125,430</text>
        <text x="0" y="16" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#64748B">tCO₂e</text>
      </g>

      <!-- Legend -->
      <g transform="translate(250, 140)" font-family="sans-serif" font-size="12" font-weight="600">
        <circle cx="0" cy="0" r="5" fill="#0066FF"/>
        <text x="12" y="4" fill="#334155">Scope 1</text>
        <text x="80" y="4" font-weight="700" fill="#0B1727">26%</text>

        <circle cx="0" cy="30" r="5" fill="#0284C7"/>
        <text x="12" y="34" fill="#334155">Scope 2</text>
        <text x="80" y="34" font-weight="700" fill="#0B1727">33%</text>

        <circle cx="0" cy="60" r="5" fill="#6366F1"/>
        <text x="12" y="64" fill="#334155">Scope 3</text>
        <text x="80" y="64" font-weight="700" fill="#0B1727">41%</text>
      </g>
    </g>

    <!-- Horizontal Bar Chart Card -->
    <g transform="translate(380, 180)" filter="url(#cardShadow)">
      <rect width="365" height="340" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="20" y="32" font-family="sans-serif" font-size="14" font-weight="700" fill="#0B1727">Emissions by Source</text>

      <g transform="translate(20, 70)" font-family="sans-serif" font-size="11">
        <!-- Row 1 -->
        <text x="0" y="0" font-weight="600" fill="#334155">Purchased goods &amp; services</text>
        <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
        <rect x="0" y="8" width="180" height="12" rx="4" fill="#10B981"/>
        <text x="245" y="18" font-weight="700" fill="#0B1727">28%</text>

        <!-- Row 2 -->
        <g transform="translate(0, 42)">
          <text x="0" y="0" font-weight="600" fill="#334155">Energy use (electricity)</text>
          <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
          <rect x="0" y="8" width="130" height="12" rx="4" fill="#10B981"/>
          <text x="245" y="18" font-weight="700" fill="#0B1727">18%</text>
        </g>

        <!-- Row 3 -->
        <g transform="translate(0, 84)">
          <text x="0" y="0" font-weight="600" fill="#334155">Fuel combustion</text>
          <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
          <rect x="0" y="8" width="105" height="12" rx="4" fill="#10B981"/>
          <text x="245" y="18" font-weight="700" fill="#0B1727">15%</text>
        </g>

        <!-- Row 4 -->
        <g transform="translate(0, 126)">
          <text x="0" y="0" font-weight="600" fill="#334155">Upstream transportation</text>
          <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
          <rect x="0" y="8" width="85" height="12" rx="4" fill="#10B981"/>
          <text x="245" y="18" font-weight="700" fill="#0B1727">12%</text>
        </g>

        <!-- Row 5 -->
        <g transform="translate(0, 168)">
          <text x="0" y="0" font-weight="600" fill="#334155">Waste</text>
          <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
          <rect x="0" y="8" width="55" height="12" rx="4" fill="#10B981"/>
          <text x="245" y="18" font-weight="700" fill="#0B1727">8%</text>
        </g>

        <!-- Row 6 -->
        <g transform="translate(0, 210)">
          <text x="0" y="0" font-weight="600" fill="#334155">Other</text>
          <rect x="0" y="8" width="230" height="12" rx="4" fill="#F1F5F9"/>
          <rect x="0" y="8" width="135" height="12" rx="4" fill="#10B981"/>
          <text x="245" y="18" font-weight="700" fill="#0B1727">19%</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

// 2. Measure Visual
const measureSvg = `
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  
  <!-- Content -->
  <g transform="translate(40, 40)">
    <!-- Header Badge -->
    <rect width="100" height="26" rx="13" fill="#EFF6FF" stroke="#DBEAFE"/>
    <text x="14" y="17" font-family="sans-serif" font-size="11" font-weight="800" fill="#0066FF">MEASURE</text>
    
    <!-- Title -->
    <text x="0" y="58" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">Unified Carbon Data Core</text>
    
    <!-- Visual Representation of Ingestion -->
    <g transform="translate(0, 80)">
      <!-- Left Sources -->
      <rect x="0" y="0" width="140" height="44" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="26" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">ERP &amp; SAP Systems</text>
      
      <rect x="0" y="56" width="140" height="44" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="82" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">IoT &amp; Smart Meters</text>

      <rect x="0" y="112" width="140" height="44" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="14" y="138" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">Supplier Invoices</text>

      <!-- Connection Lines -->
      <path d="M140 22 L230 100" stroke="#0066FF" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M140 78 L230 100" stroke="#0066FF" stroke-width="2"/>
      <path d="M140 134 L230 100" stroke="#0066FF" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Central Hub -->
      <rect x="230" y="50" width="160" height="100" rx="12" fill="#0066FF"/>
      <text x="310" y="92" font-family="sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" text-anchor="middle">ENERIX DATA CORE</text>
      <text x="310" y="112" font-family="sans-serif" font-size="11" font-weight="600" fill="#93C5FD" text-anchor="middle">Automated Processing</text>

      <!-- Output Badges -->
      <rect x="420" y="20" width="120" height="36" rx="6" fill="#ECFDF5" stroke="#A7F3D0"/>
      <text x="432" y="42" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">✓ GHG Protocol</text>

      <rect x="420" y="70" width="120" height="36" rx="6" fill="#EFF6FF" stroke="#DBEAFE"/>
      <text x="432" y="92" font-family="sans-serif" font-size="11" font-weight="700" fill="#0066FF">✓ IPCC AR6 EF</text>

      <rect x="420" y="120" width="120" height="36" rx="6" fill="#FEF3C7" stroke="#FDE68A"/>
      <text x="432" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#D97706">✓ Real-time QA</text>
    </g>
  </g>
</svg>
`;

// 3. Report Visual
const reportSvg = `
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  
  <g transform="translate(40, 40)">
    <!-- Header Badge -->
    <rect width="90" height="26" rx="13" fill="#F3E8FF" stroke="#E9D5FF"/>
    <text x="14" y="17" font-family="sans-serif" font-size="11" font-weight="800" fill="#8B5CF6">REPORT</text>
    
    <text x="0" y="58" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">Auditable Compliance Dossier</text>

    <!-- Document Card -->
    <g transform="translate(30, 85)">
      <rect width="460" height="190" rx="12" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="0" y="0" width="460" height="40" rx="12" fill="#0B1727"/>
      <text x="20" y="25" font-family="sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">GHG EMISSIONS INVENTORY REPORT 2026</text>
      <rect x="360" y="10" width="80" height="20" rx="4" fill="#10B981"/>
      <text x="400" y="24" font-family="sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">VERIFIED</text>

      <text x="20" y="70" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155">Compliance Standard: ISO 14064-1 &amp; Decision 42/2022/QD-TTg</text>
      <text x="20" y="92" font-family="sans-serif" font-size="11" fill="#64748B">Audit Trail Hash: 8f9a2b1c4d9e3f017a8b5c...</text>

      <rect x="20" y="115" width="200" height="50" rx="8" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="32" y="135" font-family="sans-serif" font-size="11" font-weight="600" fill="#64748B">Total Verified Footprint</text>
      <text x="32" y="153" font-family="sans-serif" font-size="15" font-weight="800" fill="#0B1727">125,430 tCO₂e</text>

      <rect x="240" y="115" width="200" height="50" rx="8" fill="#EFF6FF" stroke="#DBEAFE"/>
      <text x="252" y="135" font-family="sans-serif" font-size="11" font-weight="600" fill="#0066FF">Data Completeness</text>
      <text x="252" y="153" font-family="sans-serif" font-size="15" font-weight="800" fill="#0066FF">99.8% (Tier 1)</text>
    </g>
  </g>
</svg>
`;

// 4. Reduce Visual
const reduceSvg = `
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

  <g transform="translate(40, 40)">
    <!-- Header Badge -->
    <rect width="90" height="26" rx="13" fill="#ECFDF5" stroke="#A7F3D0"/>
    <text x="14" y="17" font-family="sans-serif" font-size="11" font-weight="800" fill="#10B981">REDUCE</text>
    
    <text x="0" y="58" font-family="sans-serif" font-size="22" font-weight="800" fill="#0B1727">Net Zero Transition Roadmap</text>

    <!-- Graph Visual -->
    <g transform="translate(20, 90)">
      <rect width="480" height="180" rx="12" fill="#FFFFFF" stroke="#E2E8F0"/>
      
      <!-- Target Line -->
      <line x1="40" y1="130" x2="440" y2="130" stroke="#CBD5E1" stroke-dasharray="4 4" stroke-width="1.5"/>
      <text x="445" y="134" font-family="sans-serif" font-size="10" font-weight="700" fill="#64748B">2030 Goal</text>

      <!-- Downward Trajectory -->
      <path d="M 40 30 Q 180 60 260 90 T 440 140" fill="none" stroke="#10B981" stroke-width="4"/>
      
      <!-- Points -->
      <circle cx="40" cy="30" r="6" fill="#10B981"/>
      <text x="40" y="20" font-family="sans-serif" font-size="10" font-weight="700" fill="#0B1727" text-anchor="middle">2024</text>

      <circle cx="180" cy="65" r="6" fill="#10B981"/>
      <text x="180" y="55" font-family="sans-serif" font-size="10" font-weight="700" fill="#0B1727" text-anchor="middle">2026 (-25%)</text>

      <circle cx="440" cy="140" r="6" fill="#10B981"/>
      <text x="440" y="160" font-family="sans-serif" font-size="10" font-weight="700" fill="#10B981" text-anchor="middle">Net Zero Target</text>
    </g>
  </g>
</svg>
`;

async function main() {
  const images = [
    { name: '01_platform_dashboard_preview.png', svg: dashboardSvg },
    { name: '02_measure_visual.png', svg: measureSvg },
    { name: '03_report_visual.png', svg: reportSvg },
    { name: '04_reduce_visual.png', svg: reduceSvg }
  ];

  for (const img of images) {
    const buffer = await sharp(Buffer.from(img.svg)).png().toBuffer();
    for (const dir of outputDirs) {
      const filePath = path.join(dir, img.name);
      fs.writeFileSync(filePath, buffer);
      console.log(`Generated: ${filePath}`);
    }
  }
}

main().catch(console.error);
