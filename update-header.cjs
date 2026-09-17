const fs = require('fs');
let content = fs.readFileSync('carbon/ui/components/public-header.js', 'utf8');

const searchIcon = `
        <button style="background:transparent;border:none;cursor:pointer;color:var(--carbon-navy-600);display:flex;align-items:center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>`;

content = content.replace('<div class="locale-selector-container">', searchIcon + '\n        <div class="locale-selector-container">');
content = content.replace('Book a Demo', 'Book a Demo &rarr;');
fs.writeFileSync('carbon/ui/components/public-header.js', content);
