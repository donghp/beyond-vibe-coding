---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 4
id: "04-context"
title: "AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT."
shortTitle: "AI không chỉ cần context. AI cần đúng context."
subtitle: "Từ “đưa thật nhiều thông tin cho AI” đến cách chọn đúng context, đúng authority, đúng state và đúng thời điểm"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
order: 4
description: "Mastering the art of context engineering to minimize hallucinations and maximize code precision."
readingTime: "8 min"
topics: ["context engineering", "prompt design", "token limit", "precision"]
hero: "images/chapter-04-hero.webp"
published: "2026-09-10"
updated: "2026-09-10"
version: "1.0.0"
canonical_page_start: 78
canonical_page_end: 87
publicationStatus: "published"
contentStatus: "complete"
---

<!--
BVCE CANONICAL MARKDOWN
This file is the canonical structured manuscript layer.
PDF page numbers, running headers, footers, coordinates and forced
pagination are intentionally excluded from the manuscript layer.

Reader-visible text is preserved from the source.
PDF-originated line wrapping has been normalized into semantic prose.
No new substantive content is introduced.
-->

# CHƯƠNG 4

# AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT.

*Từ “đưa thật nhiều thông tin cho AI” đến cách chọn đúng context, đúng authority, đúng state và đúng thời điểm*

Ở cuối chương trước, tôi đã có một kết luận khiến cách tôi làm việc với AI thay đổi rất nhiều.

Project phải có knowledge và state của chính nó. Không thể để AI Memory trở thành nơi lưu trữ sự thật của project.

Nhưng ngay sau khi giải quyết được vấn đề đó, một vấn đề khác xuất hiện.

Project của tôi bắt đầu có rất nhiều information.

Có documentation.

Có architecture.

Có database schema.

Có decisions.

Có evidence.

Có checkpoints.

Có những thay đổi cũ.

Có những thay đổi mới.

Có những thứ đang active.

Có những thứ đã bị thay thế.

Và tôi phải đưa một phần của tất cả những thứ đó vào AI để nó làm task hiện tại.

Tôi lại gặp một câu hỏi mới:

Nếu AI cần context để làm việc, tôi phải đưa cho AI bao nhiêu context?

<!-- BVCE_NAV: MAJOR_TOPIC_1 -->

## TÔI TỪNG NGHĨ CÀNG NHIỀU CONTEXT CÀNG TỐT

Thời gian đầu, tôi có một trực giác rất đơn giản: AI biết càng nhiều thì càng tốt.

Vì vậy tôi đưa thêm file.

Thêm documentation.

Thêm history.

Thêm decision.

Thêm code.

Thêm summary.

Tôi nghĩ rằng nếu AI có đủ thông tin, nó sẽ ít đoán hơn.

Nhưng sau một thời gian tôi nhận ra một điều ngược lại:

More Context does not automatically mean Better Context.

Context quá ít có thể làm AI thiếu thông tin.

Nhưng context quá nhiều có thể làm AI khó phân biệt thông tin nào thực sự liên quan.

Một decision cũ có thể nằm cạnh một decision mới.

Một prototype có thể nằm cạnh implementation production.

Một assumption có thể nằm cạnh một verified fact.

Một đoạn conversation có thể nằm cạnh một canonical artifact.

AI có thể nhìn thấy tất cả.

Nhưng “nhìn thấy tất cả” không có nghĩa là “hiểu đúng cái quan trọng nhất”.

<!-- BVCE_NAV: MAJOR_TOPIC_2 -->

## CONTEXT KHÔNG PHẢI LÀ MỘT ĐỐNG THÔNG TIN

Đây là lúc tôi bắt đầu thay đổi định nghĩa của mình.

Context không đơn giản là những gì AI được nhìn thấy.

Context phải là những thông tin giúp AI thực hiện đúng task trong đúng hoàn cảnh.

Nói cách khác:

Context là thông tin có liên quan đến execution, không phải toàn bộ information của project.

Điều đó có nghĩa một context tốt phải trả lời ít nhất một số câu hỏi:

- Task này đang giải quyết vấn đề gì?
- Project hiện đang ở trạng thái nào?
- Thông tin nào có authority?
- Thông tin nào liên quan trực tiếp?
- Có constraint nào không được phá vỡ?
- Cần evidence nào để kết luận task hoàn thành?

Từ đây, tôi bắt đầu nhìn context như một compiled working set thay vì một chiếc ba lô chứa tất cả những gì project từng biết.

CÓ CONTEXT ĐÚNG CŨNG CHƯA ĐỦ

Một context có thể rất liên quan nhưng vẫn sai.

Ví dụ, một architecture decision cũ hoàn toàn liên quan đến task hiện tại.

Nhưng nếu decision đó đã bị supersede thì sao?

Một requirement cũ có thể rất cụ thể.

Nhưng nếu business rule đã thay đổi thì sao?

Một documentation rất chi tiết có thể nói đúng về hệ thống ở một thời điểm khác.

Nhưng nếu version hiện tại đã thay đổi thì sao?

Lúc đó vấn đề không còn chỉ là relevance.

Vấn đề là authority.

AI phải biết thông tin nào có quyền quyết định khi có mâu thuẫn.

Đây là nơi tôi bắt đầu kết nối Context Engineering với Semantic Authority.

<!-- BVCE_NAV: MAJOR_TOPIC_3 -->

## SIMILARITY KHÔNG ĐỒNG NGHĨA VỚI TRUTH

Khi tôi bắt đầu nghĩ về retrieval, một cạm bẫy rất dễ xuất hiện.

AI hoặc hệ thống retrieval tìm thấy một đoạn text rất giống với câu hỏi.

Điều đó tạo cảm giác rằng nó chắc chắn là câu trả lời đúng.

Nhưng similarity chỉ nói rằng hai thứ có quan hệ gần về nội dung hoặc ý nghĩa.

Nó không chứng minh rằng artifact đó là nguồn sự thật hiện hành.

Một document cũ có thể rất giống với task.

Một decision đã supersede có thể chứa đúng những từ AI đang tìm.

Một ví dụ minh họa có thể giống hệt một requirement thật.

Vì vậy tôi bắt đầu giữ một nguyên tắc rất đơn giản:

Similarity ≠ Truth.

Context Engineering vì thế không chỉ là search.

Nó là search + authority + freshness + scope + dependency + conflict detection.

### TỪ “TÌM KIẾM” SANG “RETRIEVAL”

Tôi bắt đầu phân biệt hai việc.

Search thường trả lời câu hỏi: “Có gì chứa từ hoặc nội dung này?”

Retrieval trong engineering phải trả lời câu hỏi sâu hơn: “Những artifact nào cần được đưa vào execution context để task này có thể được thực hiện đúng?”

Đó là lý do retrieval phải biết task.

Phải biết domain.

Phải biết current state.

Phải biết authority.

Phải biết dependencies.

Và phải biết loại thông tin nào không nên đưa vào.

### TIER RETRIEVAL KHÔNG PHẢI MỘT CUỘC THI AI

Tôi không muốn retrieval bắt đầu ngay bằng semantic search.

Tôi bắt đầu từ thứ chính xác nhất.

Nếu task đã biết chính xác artifact ID, hãy lấy đúng artifact đó.

Nếu không có ID, tìm theo metadata.

Sau đó mới đến lexical retrieval.

Sau đó semantic retrieval.

Và khi cần, mở rộng theo dependency hoặc relationship.

Từ đó hình thành một thứ tự rất thực tế:

Tier 0 → Exact ID

Tier 1 → Metadata

Tier 2 → Lexical / BM25

Tier 3 → Semantic / Vector

Tier 4 → Relationship / Dependency expansion

Tôi có thể gọi semantic search là “thông minh”. Nhưng nếu một artifact có ID rõ ràng, tôi không cần AI đoán bằng similarity. Exactness should beat elegance.

<!-- BVCE_NAV: MAJOR_TOPIC_4 -->

## CONTEXT COMPILER

Khi retrieval bắt đầu phức tạp, tôi nhận ra không thể để mỗi executor tự quyết định context theo cách riêng.

AI A có thể lấy mười file.

AI B có thể lấy ba file.

AI C có thể lấy một summary.

Cùng một task nhưng mỗi AI nhìn một project khác nhau.

Tôi không muốn điều đó.

Tôi muốn context được xác định từ một contract chung.

Task nói tôi muốn làm gì.

Governance nói tôi được phép làm gì.

Project State nói project đang ở đâu.

Knowledge Manifest nói project biết gì.

Authority nói artifact nào có hiệu lực.

Context Compiler tập hợp tất cả những thứ đó thành working context cho executor.

### CONTEXT COMPILER PIPELINE

Tôi bắt đầu hình dung một pipeline rất rõ:

```text
BOOT
LOAD BOOTSTRAP
RESOLVE GOVERNANCE
RESOLVE CURRENT STATE
LOAD KNOWLEDGE MANIFEST
RESOLVE AUTHORITY
LOAD TERMINOLOGY
LOAD DOCUMENTATION STANDARD
LOAD PROJECT CONTEXT
CLASSIFY TASK
RETRIEVE REQUIRED KNOWLEDGE
BUILD MINIMUM SUFFICIENT CONTEXT
EXECUTE
```

Context Compiler không phải là một AI khác.

Nó là cơ chế biến project truth + task requirement + governance + state thành context có thể dùng cho execution.

### MINIMUM SUFFICIENT CONTEXT

Tôi đặc biệt thích cụm từ này.

Không phải “maximum context”.

Mà là minimum sufficient context.

Tức là lượng context nhỏ nhất nhưng đủ để AI thực hiện task đúng trong phạm vi được cho phép.

Ít hơn mức đó, AI có thể thiếu thông tin.

Nhiều hơn mức cần thiết, AI có thể bị nhiễu.

Đây không phải một con số cố định.

Nó phụ thuộc task.

Một task đổi một label có thể cần rất ít context.

Một architecture change có thể cần nhiều context hơn rất nhiều.

Một security task có thể cần thêm policy, trust boundary và evidence.

Một database migration có thể cần schema hiện tại, migration history, dependency và rollback plan.

### CONTEXT LAYER

Tôi bắt đầu phân tầng context để không phải trộn mọi thứ vào một bucket.

Ở tầng cao nhất là những thứ gần như không thay đổi trong execution.

Sau đó là canonical baseline.

Tiếp theo là project context.

Rồi current state.

Sau đó là working set.

Cuối cùng là task-specific knowledge và evidence cần thiết.

Từ đó hình thành một mô hình mà sau này tôi dùng để nghĩ về Context Engineering:

```text
L0 Immutable Governance
L1 Canonical Baseline
L2 Current Project Context
L3 Current Project State
L4 Current Working Set
L5 Task Knowledge
L6 Execution Evidence
```

Không phải task nào cũng cần toàn bộ L0-L6 ở cùng một mức độ chi tiết. Nhưng executor phải biết layer nào là bắt buộc.

### STABLE CONTEXT VÀ VARIABLE CONTEXT

Một số context gần như ổn định:

engineering method, coding standard, architecture rules, security principles, terminology.

Một số context thay đổi liên tục:

current state, active task, latest changes, open blockers, current evidence.

Nếu tôi trộn hai loại này thành một prompt khổng lồ, mỗi lần project thay đổi tôi phải xây lại toàn bộ context.

Tôi bắt đầu tách:

Stable Context để tái sử dụng.

Variable Context để compile lại theo task và state hiện tại.

Điều này không chỉ tốt cho correctness.

Nó còn tốt cho cost.

### CONTEXT LÀ COST ENGINEERING

Context càng lớn, execution càng đắt hoặc ít nhất càng tốn tài nguyên xử lý.

Nhưng vấn đề không chỉ là số token.

Context quá lớn có thể làm tăng thời gian đọc, tăng khả năng nhiễu và tăng số lần AI phải sửa.

Context sai có thể tạo ra rework.

Rework tạo ra thêm execution.

Execution tạo ra thêm verification.

Vì vậy tôi bắt đầu nhìn:

Context quality → Rework → Cost per Successful Task.

Một context tốt không phải context dài nhất.

Nó là context làm cho task có xác suất thành công cao hơn với effort hợp lý.

<!-- BVCE_NAV: MAJOR_TOPIC_5 -->

## CONTEXT KHÔNG ĐƯỢC VƯỢT AUTHORITY

Một executor có thể retrieve một artifact nhưng không có nghĩa nó được phép sử dụng artifact đó cho mọi mục đích.

Governance vẫn đứng trước retrieval.

Security boundary vẫn đứng trước convenience.

Authority vẫn đứng trước semantic similarity.

Đây là lúc tôi kết nối Context Engineering với một nguyên tắc rộng hơn:

Capability does not create Authority.

AI có thể tìm thấy một secret không có nghĩa AI được phép đọc nó.

AI có thể tìm thấy production data không có nghĩa task được phép sử dụng dữ liệu đó.

Context được retrieval nhưng vẫn phải đi qua authorization và security policy.

### KHI KHÔNG XÁC ĐỊNH ĐƯỢC CONTEXT

Có một tình huống mà tôi muốn hệ thống xử lý thật rõ:

Không xác định được authority.

Có hai artifact mâu thuẫn.

Không biết version nào hiện hành.

Không biết requirement nào có hiệu lực.

Không biết state nào mới nhất.

Tôi không muốn AI tự chọn.

Tôi muốn:

BLOCK.

Khi critical uncertainty tồn tại và canonical authority không thể resolve conflict, execution nên dừng lại thay vì đoán.

Đó là fail closed.

Chậm một task còn tốt hơn xây tiếp trên một sự thật không xác định.

### TÔI BẮT ĐẦU NHÌN PROMPT NHƯ MỘT INTERFACE

Khi context được compile, prompt bắt đầu thay đổi vai trò.

Prompt không còn phải chứa toàn bộ project.

Prompt chủ yếu diễn đạt task và những instruction của execution.

Context layer mang knowledge.

State layer mang current truth.

Governance mang constraints.

Authority mang precedence.

Prompt trở thành một interface vào context đã được chuẩn bị.

### TASK + CONTEXT + AUTHORITY

Tôi bắt đầu nhìn một execution như một bộ ba:

```text
TASK → What must be done?
CONTEXT → What must be known?
AUTHORITY → What is allowed to be true?
STATE → Where is the project now?
VERIFICATION → What must be proven?
```

Thiếu một trong những thành phần này, execution có thể trở nên không đầy đủ hoặc không an toàn.

### CONTEXT RECOVERY CŨNG LÀ MỘT TASK

Tôi từng nghĩ context recovery là thời gian chuẩn bị trước khi “làm thật”.

Sau đó tôi nhận ra đó chính là engineering work.

Khi một AI mới vào project, việc nó phải hiểu state, knowledge, decisions và constraints là một phần của execution.

Nếu hệ thống không làm tốt việc đó, con người phải làm thay.

Và đó chính là context recovery cost.

Bởi vậy continuity và context engineering không thể tách rời.

### CONTEXT ENGINEERING VÀ CONTINUITY

Continuity trả lời:

Project có thể tiếp tục từ đâu?

Context Engineering trả lời:

Executor cần biết gì để tiếp tục đúng?

Checkpoint giúp xác định điểm tiếp tục.

Context Compiler giúp xác định information cần mang theo.

Knowledge Manifest giúp xác định project có gì.

Authority giúp xác định điều gì được tin.

Đây là lúc tôi bắt đầu thấy các khái niệm trước đó không phải những mảnh rời rạc.

Chúng bắt đầu trở thành một hệ thống.

### TÔI KHÔNG MUỐN AI “ĐỌC PROJECT” MỖI LẦN

Một cách rất dễ nghĩ là mỗi task mới cứ đưa toàn bộ repository cho AI.

Nhưng đó không phải cách tôi muốn làm.

Tôi muốn AI đọc theo intent.

Intent xác định task.

Task xác định required knowledge.

Required knowledge xác định retrieval.

Retrieval xác định working set.

Working set tạo context.

Context phục vụ execution.

Điều này làm cho project lớn lên mà context mỗi task không nhất thiết lớn theo cùng tỷ lệ.

### CÓ MỘT ĐIỀU TÔI LUÔN MUỐN GIỮ

Dù hệ thống retrieval có thông minh đến đâu, tôi vẫn không muốn để retrieval tự biến thành authority.

Retrieval chỉ đề xuất candidates.

Authority resolution mới quyết định thứ gì được sử dụng như truth.

Đó là lý do tôi giữ nguyên:

Similarity ≠ Truth.

Và:

No Evidence, No Verified State.

Context có thể giúp AI thực hiện.

Nhưng verification mới giúp project biết kết quả có đáng tin hay không.

### TỪ ĐÂY, CONTEXT TRỞ THÀNH MỘT ENGINEERING DISCIPLINE

Lúc đầu tôi nghĩ context chỉ là thứ AI cần để trả lời.

Sau đó tôi nhận ra context là một phần của architecture.

Nó ảnh hưởng đến correctness.

Nó ảnh hưởng đến security.

Nó ảnh hưởng đến cost.

Nó ảnh hưởng đến switching giữa các executor.

Nó ảnh hưởng đến continuity.

Nó ảnh hưởng đến khả năng verify.

Và vì vậy context không còn là một phần phụ của prompt engineering.

Nó trở thành một engineering discipline.

---

## KEY IDEA

Context tốt không phải context nhiều nhất.

Context tốt là context đúng, đủ, hiện hành, có authority và phù hợp với task.

Và một AI càng mạnh càng không làm nguyên tắc này biến mất.

Ngược lại, AI càng mạnh thì context sai có thể tạo ra hậu quả lớn hơn.

---

## WHAT I LEARNED

Tôi bắt đầu với suy nghĩ:

> “AI cần thật nhiều information để thông minh hơn.”

Tôi kết thúc với một nguyên tắc khác:

> “AI cần đúng information để làm đúng task.”

Đó là một khác biệt rất lớn.

Và từ đây tôi bắt đầu xây một câu hỏi mới trước mỗi execution:

AI cần đúng information để làm đúng task.

---

## CHUYỂN TIẾP

Tôi đã có một cách để project giữ lại knowledge và state.

Tôi cũng bắt đầu có một cách để chọn đúng context cho từng task.

Nhưng ngay cả khi AI có đúng context, vẫn còn một câu hỏi lớn:

AI đang được phép làm đến đâu?

Một task có thể rất rõ.

Context có thể rất đúng.

AI có thể rất mạnh.

Nhưng nếu scope của task quá rộng, AI vẫn có thể thay đổi nhiều hơn tôi muốn.

Đó là lúc tôi bắt đầu nhìn nghiêm túc hơn vào Task Decomposition, Execution Contract và Controlled Autonomy.

Bởi vì biết đúng thứ cần làm chưa đủ. AI còn phải biết được phép làm gì.

Và đó là câu chuyện của Chương 5.

---

# NAVIGATION TREE

CHƯƠNG 4 - AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT.
├── TÔI TỪNG NGHĨ CÀNG NHIỀU CONTEXT CÀNG TỐT
├── CONTEXT KHÔNG PHẢI LÀ MỘT ĐỐNG THÔNG TIN
├── SIMILARITY KHÔNG ĐỒNG NGHĨA VỚI TRUTH
├── CONTEXT COMPILER
└── CONTEXT KHÔNG ĐƯỢC VƯỢT AUTHORITY
