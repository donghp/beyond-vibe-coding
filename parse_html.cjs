const fs = require('fs');
const html = fs.readFileSync('dist/chapters/03-ai-does-not-remember/index.html', 'utf8');

// Find the <div class="prose-editorial-body w-full flex flex-col">
const proseIdx = html.indexOf('prose-editorial-body');
if (proseIdx !== -1) {
  const content = html.substring(proseIdx, proseIdx + 2000);
  console.log("--- PROSE EDITORIAL BODY START ---");
  console.log(content);
}
