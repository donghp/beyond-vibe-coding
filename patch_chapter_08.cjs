const fs = require('fs');

let content = fs.readFileSync('src/content/chapters/08-ai-and-developers.md', 'utf8');

const newFrontmatter = `---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
id: "08-ai-and-developers"
chapter: 8
title: "AI KHÔNG NÊN TỰ ĐIỀU KHIỂN PROJECT"
subtitle: "Từ tự động hóa đến Controlled Autonomy: AI có thể làm rất nhiều, nhưng quyền quyết định vẫn phải thuộc về đúng nơi"
shortTitle: "AI không nên tự điều khiển project"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 127
source_artifact: "08.BEYOND_VIBE_CODING_CORE_BOOK_Chapter_08_draf.pdf"
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
order: 8
description: "Tại sao từ tự động hóa đến Controlled Autonomy là một bước nhảy rủi ro, và cách cấp quyền quyết định cho AI."
readingTime: "12 min"
topics: ["automation", "controlled autonomy", "execution contract", "governance", "project authority"]
hero: "images/chapter-08-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
updated: "2026-09-10"
version: "1.0.0"
---`;

content = content.replace(/---[\s\S]*?---/, newFrontmatter);
fs.writeFileSync('src/content/chapters/08-ai-and-developers.md', content, 'utf8');
