---
id: "09-toi-khong-muon-viet-prompt"
title: "TÔI KHÔNG MUỐN VIẾT PROMPT DÀI HƠN. TÔI MUỐN AI NHẬN ĐÚNG THỨ NÓ CẦN"
subtitle: "Từ Prompt Engineering đến Context Engineering và Context Compiler"
shortTitle: "Tôi không muốn viết prompt dài hơn"
order: 9
description: "From Prompt Engineering to Context Engineering and Context Compiler - how to build minimum sufficient context."
readingTime: "10 min"
topics: ["context", "prompting", "retrieval", "compiler"]
hero: "images/chapter-09-hero.webp"
published: "2026-09-10"
publicationStatus: "unpublished"
contentStatus: "draft"
updated: "2026-09-10"
version: "1.0.0"
---

CHƯƠNG 9

# TÔI KHÔNG MUỐN VIẾT PROMPT DÀI HƠN. TÔI MUỐN AI NHẬN ĐÚNG THỨ NÓ CẦN

*Từ Prompt Engineering đến Context Engineering và Context Compiler*

Ở cuối chương trước, tôi đã nói về một vấn đề rất thực tế:

AI có thể biết project.

AI có thể có authority.

AI có thể có một Execution Contract.

AI có thể được cấp Controlled Autonomy.

Nhưng vẫn còn một câu hỏi:

> AI thực sự đang được cung cấp những gì để làm task?

Bởi vì biết project không có nghĩa là biết đúng thứ cần cho task hiện tại.

Một AI có thể có access vào toàn bộ repository.

Nhưng điều đó không có nghĩa nó nên đọc toàn bộ repository.

Một AI có thể nhìn thấy hàng trăm tài liệu.

Nhưng điều đó không có nghĩa tất cả tài liệu đó đều có giá trị như nhau.

Một AI có thể nhận một prompt rất dài.

Nhưng prompt dài không đảm bảo context đúng.

Tôi bắt đầu nhận ra một điều:

> Tôi không cần viết prompt dài hơn. Tôi cần xây context tốt hơn.

## TÔI TỪNG NGHĨ PROMPT CÀNG DÀI CÀNG TỐT

Đây là một sai lầm rất tự nhiên.

Khi AI làm sai, phản ứng đầu tiên thường là:

> “Mình chưa nói đủ rõ.”

Vậy thì tôi nói thêm.

Thêm background.

Thêm requirement.

Thêm ví dụ.

Thêm code.

Thêm warning.

Thêm những gì AI không được làm.

Thêm những gì AI phải làm.

Prompt ngày càng dài.

Có lúc tôi có cảm giác:

> “Chỉ cần giải thích đủ nhiều thì AI sẽ hiểu.”

Nhưng rồi project lớn dần.

Prompt dài dần.

Context dài dần.

Và một vấn đề mới xuất hiện:

> AI có quá nhiều thứ để đọc, nhưng không biết thứ nào là quan trọng nhất.

### PROMPT DÀI KHÔNG PHẢI CONTEXT TỐT

Đây là một trong những distinction quan trọng nhất của chương này.

Prompt is instruction.

Context là thông tin cần thiết để instruction được thực hiện đúng.

Hai thứ không giống nhau.

Prompt có thể nói:

> “Hãy sửa authentication flow.”

Nhưng để làm đúng, AI cần biết:

authentication hiện tại được thiết kế như thế nào;

database schema hiện tại;

security rules;

session model;

business constraints;

file nào liên quan;

task scope;

Project State;

acceptance criteria;

và những thay đổi gần đây.

Tất cả những thứ đó là context.

> Prompt tells AI what to do. Context tells AI what it needs to know while doing it.

## TÔI BẮT ĐẦU NHÌN CONTEXT NHƯ MỘT TÀI NGUYÊN

Trong software development truyền thống, tôi thường nghĩ đến:

CPU.

Memory.

Storage.

Network.

Developer hours.

Budget.

Nhưng khi AI tham gia sâu vào engineering, tôi bắt đầu thêm một loại tài nguyên:

> Context.

Context cũng có giới hạn.

Bạn có thể có quá ít.

Bạn có thể có quá nhiều.

Bạn có thể có context sai.

Bạn có thể có context cũ.

Bạn có thể có context đúng nhưng không có authority.

Bạn có thể có context đúng nhưng không đủ để verify.

> Tôi có đúng context cho task này hay không?

### MỘT TASK CÓ THỂ CẦN RẤT ÍT CONTEXT

Hãy lấy một ví dụ đơn giản.

Tôi muốn đổi một label trên UI.

AI có thể chỉ cần:

file component;

design rule liên quan;

expected text.

Nó không cần:

database architecture;

authentication design;

deployment process;

toàn bộ history của project.

Nếu tôi đưa toàn bộ project vào context, tôi không làm task tốt hơn.

Tôi chỉ làm context lớn hơn.

### MỘT TASK KHÁC CÓ THỂ CẦN RẤT NHIỀU CONTEXT

Ngược lại, nếu tôi thay đổi authentication architecture, AI có thể cần:

current authentication model;

user model;

session model;

authorization;

database schema;

security policy;

API behavior;

existing tests;

relevant architecture decisions;

current Project State;

known incidents;

acceptance criteria.

Đó là một context lớn hơn nhiều.

> Context size should follow task complexity and risk, not a fixed rule.

### CONTEXT KHÔNG CHỈ LÀ FILE

Đây là nơi tôi bắt đầu nhìn context rộng hơn.

Context có thể là:

một file;

một schema;

một đoạn code;

một architecture decision;

một business rule;

một test result;

một Project State;

một checkpoint;

một evidence record;

một dependency relationship;

một security constraint.

Nói cách cách khác:

> Context là information có ý nghĩa đối với execution.

Nó không phụ thuộc vào format.

Markdown có thể là context.

YAML có thể là context.

Code có thể là context.

Database metadata có thể là context.

Evidence có thể là context.

### NHƯNG CONTEXT ĐÚNG CHƯA CHẮC LÀ CONTEXT HIỆN HÀNH

Đây là lúc vấn đề trở nên khó hơn.

Tôi có một architecture document.

Nó rất chi tiết.

Nó rất liên quan.

Nhưng nó được viết sáu tháng trước.

Sau đó architecture đã thay đổi.

Document cũ vẫn nằm trong repository.

AI tìm thấy nó.

Similarity rất cao.

Nội dung rất đẹp.

Nhưng nó không còn là truth hiện tại.

Đây là lúc tôi bắt đầu giữ một nguyên tắc:

> Freshness matters.

Context phải xét đến thời điểm và trạng thái hiệu lực.

### CONTEXT CŨ CÓ THỂ NGUY HIỂM HƠN CONTEXT THIẾU

Context thiếu khiến AI biết rằng nó thiếu thông tin.

Context cũ có thể khiến AI tin rằng nó đang biết đúng.

Đó là một failure mode nguy hiểm hơn.

AI có thể nói:

> “Theo architecture hiện tại…”

nhưng thực tế đang đọc architecture cũ.

Tôi bắt đầu muốn context compiler biết:

artifact nào current;

artifact nào superseded;

artifact nào deprecated;

artifact nào experimental;

artifact nào authoritative.

### SIMILARITY ≠ TRUTH

> Similarity ≠ Truth.

Khi bắt đầu dùng retrieval, tôi gặp một vấn đề khác.

Hệ thống tìm kiếm được một artifact rất giống với câu hỏi.

Điều đó rất dễ tạo cảm giác:

> “Đây chắc chắn là thứ đúng.”

Nhưng similarity chỉ nói:

nó giống.

Không nói:

nó có authority.

Một document cũ có thể giống hơn document mới.

Một prototype có thể giống requirement thật.

Một proposal có thể giống decision đã được approve.

Một conversation có thể chứa đúng từ khóa nhưng không có giá trị canonical.

> Similarity ≠ Truth.

Đây không chỉ là một nguyên tắc retrieval.

Nó là một nguyên tắc engineering.

### TÔI BẮT ĐẦU TÁCH RETRIEVAL VÀ AUTHORITY

Retrieval có nhiệm vụ:

> Tìm những thứ có thể liên quan.

Authority có nhiệm vụ:

> Xác định thứ nào được phép được xem là nguồn sự thật.

Hai thứ này phải tách.

Nếu không, semantic search sẽ vô tình trở thành authority engine.

Tôi không muốn điều đó.

## CONTEXT PHẢI ĐƯỢC RESOLVE

Khi một task bắt đầu, tôi không muốn AI tự đi gom mọi thứ.

Tôi muốn một quá trình:

`Intent ↓ Task Classification ↓ Authority Resolution ↓ State Resolution ↓ Knowledge Retrieval ↓ Dependency Expansion ↓ Reranking ↓ Conflict Detection ↓ Context Compilation ↓ Execution`

Đây là lúc tôi bắt đầu nghĩ đến một thành phần rất quan trọng:

> Context Compiler.

### CONTEXT COMPILER LÀ GÌ?

Nói đơn giản:

Context Compiler là cơ chế biến một task và project truth thành một working context đủ để executor thực hiện task đúng.

Nó không phải một chatbot.

Nó không phải một model.

Nó không tự viết code.

Nó làm một việc khác:

> Chọn và biên dịch đúng information cần thiết cho execution.

### CONTEXT COMPILER KHÔNG ĐƯỢC TỰ PHÁT MINH TRUTH

Một compiler tốt không tạo ra sự thật mới.

Nó lấy:

project truth;

task requirement;

governance;

state;

knowledge;

evidence;

authority;

và tạo ra một context package.

Nếu authority không rõ:

> BLOCK.

Nếu state conflict:

> BLOCK.

Nếu required context thiếu:

> BLOCK hoặc yêu cầu bổ sung.

Context Compiler không được:

> “đoán cho xong.”

### TÔI BẮT ĐẦU NHÌN CONTEXT THEO CÁC LAYER

Tôi không muốn mọi thứ nằm cùng một bucket.

Tôi bắt đầu phân thành các layer.

L0 - IMMUTABLE GOVERNANCE

Những quy tắc gần như bất biến trong execution.

L1 - CANONICAL BASELINE

Các baseline architecture, engineering và policy hiện hành.

L2 - CURRENT PROJECT CONTEXT

Thông tin nền của project.

L3 - CURRENT PROJECT STATE

Project đang ở đâu.

L4 - CURRENT WORKING SET

Phần project trực tiếp liên quan đến task đang làm.

L5 - TASK KNOWLEDGE

Knowledge cụ thể cần cho task.

L6 - EXECUTION EVIDENCE

Evidence mới phát sinh hoặc evidence cần thiết để xác nhận kết quả.

Đây không phải là một checklist mà AI phải đọc toàn bộ mỗi lần.

Đây là một cách để tôi biết:

> context nào thuộc tầng nào và mức độ ưu tiên ra sao.

### TẠI SAO CẦN LAYER?

Vì không phải mọi thông tin đều có cùng trọng lượng.

Một security constraint không thể được xem giống một comment trong code.

Một architecture baseline không thể được xem giống một exploratory note.

Một current state không thể được xem giống một conversation cũ.

Layer giúp context có cấu trúc.

Và cấu trúc giúp AI bớt phải suy đoán.

### RETRIEVAL CŨNG CẦN NHIỀU TẦNG

Tôi không muốn mọi query đều bắt đầu bằng vector search.

Đói khi tôi đã biết chính xác artifact cần lấy.

> ARCH-AGENT-RAG-002

Không có lý do gì để semantic search đoán.

Tôi muốn:

TIER 0 - EXACT

Tìm chính xác bằng ID hoặc canonical key.

TIER 1 - METADATA

Tìm theo loại, domain, version, status, authority, freshness.

TIER 2 - LEXICAL

Tìm theo text, keyword, phrase, BM25.

TIER 3 - SEMANTIC

Dùng embedding/vector similarity khi cần.

TIER 4 - RELATIONSHIP / DEPENDENCY

Mở rộng theo quan hệ: implemented_by, depends_on, governed_by, references, derived_from, supersedes, contradicts, verified_by.

Từ đó tôi có một nguyên tắc:

> Use the most precise retrieval mechanism available before using a more approximate one.

### EXACTNESS SHOULD BEAT ELEGANCE

Nếu tôi biết chính xác cái mình cần, tôi muốn lấy đúng nó.

Không cần một AI thông minh tự đoán.

Đây là một điều nghe khá đơn giản nhưng rất quan trọng khi xây system.

AI không nên phải “suy nghĩ sáng tạo” trong những nơi mà exact lookup đã giải quyết được.

### RETRIEVAL KHÔNG CHỈ TÌM CONTENT

Nó còn phải tìm relationships.

Ví dụ task cần một architecture document.

Tôi lấy architecture document đó.

Nhưng architecture document có thể phụ thuộc vào:

ADR.

Security rule.

Database standard.

Một module khác.

Một decision mới hơn.

Vì vậy retrieval cần dependency expansion.

AI không chỉ cần:

> artifact

mà có thể cần:

> artifact + relationship.

### RERANKING

Khi có nhiều candidate, tôi không muốn chọn chỉ bằng semantic similarity.

Tôi bắt đầu nghĩ đến một score tổng hợp:

FinalScore = SemanticScore + LexicalScore + AuthorityScore + FreshnessScore + ScopeScore + DependencyScore - ConflictPenalty

- StalePenalty

Không phải vì tôi muốn tạo một công thức thật đẹp.

Mà vì nó giúp tôi nhớ:

relevance không phải yếu tố duy nhất.

Authority cũng quan trọng.

Freshness cũng quan trọng.

Scope cũng quan trọng.

Conflict cũng quan trọng.

### AUTHORITY PHẢI CÓ THỨ TỰ

Hãy tưởng tượng tôi có:

một conversation;

một proposal;

một architecture document;

một approved decision;

một current state.

Chúng có thể nói về cùng một thứ.

Nhưng không có nghĩa chúng ngang quyền.

Project cần biết:

> “Trong trường hợp conflict, cái gì thắng?”

Đây là Semantic Authority.

Một artifact có thể có quan hệ:

supersedes

hoặc:

contradicts

hoặc:

derived_from

hoặc:

verified_by

Những relationship đó giúp system biết không chỉ “artifact nói gì” mà còn:

> artifact có vị trí gì trong knowledge graph của project.

### KNOWLEDGE MANIFEST TRỞ THÀNH QUAN TRỌNG

Khi project có nhiều artifact, tôi cần một cách biết:

project hiện có những knowledge package nào;

version nào;

status nào;

authority nào;

dependency nào.

Tôi bắt đầu dùng một Knowledge Manifest.

Nó không phải toàn bộ knowledge.

Nó là bản đồ cho knowledge.

Nó giúp context compiler trả lời:

“Tôi cần tìm ở đâu?”

“Artifact nào hiện hành?”

“Artifact nào deprecated?”

“Package nào liên quan task này?”

### CONTEXT COMPILER CẦN BIẾT PROJECT STATE TRƯỚC

Đây là một nguyên tắc tôi thấy rất quan trọng.

Cùng một task nhưng Project State khác nhau sẽ tạo ra context khác nhau.

Ví dụ:

> Task: “Implement API X.”

Nếu database migration chưa hoàn thành, context cần nói điều đó.

Nếu migration đã verified, context có thể khác.

Nếu API X đã tồn tại một phần, working set phải khác.

Nếu một blocker đang active, context phải phản ánh.

> Task không thể được compile context độc lập với Project State.

### CONTEXT CŨNG PHỤ THUỘC AUTHORITY

Giả sử task có một requirement.

Có một document cũ nói A.

Có một decision mới nói B.

Có một conversation nói C.

Context compiler không nên đưa cả ba vào AI rồi hy vọng AI chọn đúng.

Nó phải resolve trước.

Nếu đã xác định B là canonical, context nên ưu tiên B.

Có thể vẫn giữ reference tới A hoặc C nếu cần để hiểu lịch sử.

Nhưng không để chúng cạnh tranh ngang quyền.

### TÔI BẮT ĐẦU PHÂN BIỆT CONTEXT “STABLE” VÀ “VARIABLE”

Có những thông tin hiếm khi thay đổi.

Ví dụ:

Engineering Method.

Coding Standard.

Terminology.

Một số Architecture Rules.

Đó là:

> Stable Context.

Có những thứ thay đổi thường xuyên:

Current Task.

Current State.

Recent Changes.

Open Blockers.

Current Evidence.

Đó là:

> Variable Context.

Nếu tôi trộn tất cả, mỗi task đều phải compile lại mọi thứ.

Nếu tôi tách hai loại, phần stable có thể tái sử dụng.

### CONTEXT REUSE LÀ MỘT CÁCH GIẢM COST

Context compile cũng tốn effort.

Vì vậy:

stable context có thể được cache hoặc precompile khi phù hợp.

variable context được cập nhật theo state.

Nhưng cache chỉ là optimization.

Canonical source vẫn là project artifacts.

Cache mất không được phép làm mất project truth.

### CACHED CONTEXT KHÔNG PHẢI CANONICAL CONTEXT

Một AI có thể đang dùng một context package đã compile hôm qua.

Hôm nay architecture đã thay đổi.

If cache vẫn được dùng mà không kiểm tra freshness, AI sẽ làm việc trên context cũ.

Vì vậy mỗi context package phải biết:

version;

source;

hash/fingerprint khi cần;

created time;

applicable state;

authority.

Context cũng cần provenance.

### PROVENANCE

Provenance nghĩa đơn giản là:

> Biết thông tin này đến từ đâu.

Nếu AI đang dùng một requirement, tôi muốn biết requirement đến từ artifact nào.

Nếu AI đang dùng architecture rule, tôi muốn biết version nào.

Nếu AI đang dùng evidence, tôi muốn biết evidence record nào.

Điều đó tạo một chain:

`AI Action ↓ Context ↓ Source Artifact ↓ Authority ↓ Decision / State`

Đây là một phần quan trọng của trust.

### CONTEXT KHÔNG PHẢI “COPY EVERYTHING”

Tôi muốn nhấn mạnh điều này.

Một context compiler tốt không phải một cỗ máy copy toàn bộ repository vào prompt.

Nó phải làm điều ngược lại:

> Reduce.

Giảm information không cần thiết.

Giữ lại information có giá trị.

Resolve conflict trước.

Lọc stale content.

Tập trung vào scope.

Build minimum sufficient context.

### MINIMUM SUFFICIENT CONTEXT

Đây trở thành một trong những khái niệm tôi thích nhất.

Không phải:

> Maximum Context.

Mà:

> Minimum Sufficient Context.

Tức là:

> ít nhất nhưng đủ.

Đủ để AI:

hiểu task,

hiểu constraint,

hiểu state,

hiểu authority,

thực hiện change,

và verify đúng.

### TÔI BẮT ĐẦU NHÌN CONTEXT NHƯ MỘT “BUILD”

Có source code build.

Có application build.

Bây giờ tôi bắt đầu nghĩ:

> Context cũng có thể được build.

Inputs:

Task.

State.

Knowledge.

Governance.

Authority.

Evidence.

Dependencies.

Outputs:

> Execution Context.

Nếu inputs thay đổi, context phải được recompiled.

Điều này rất quan trọng.

### CONTEXT INVALIDATION

Giả sử một architecture document được supersede.

Tất cả context package phụ thuộc vào document đó có thể trở nên stale.

Giả sử Project State thay đổi.

Working set cũ có thể không còn phù hợp.

Giả sử security classification thay đổi.

Một context trước đây hợp lệ có thể trở thành không được phép.

Vì vậy context cần một cơ chế:

`invalidate → rebuild.`

### TÔI KHÔNG MUỐN CONTEXT COMPILER TẠO RA “TRÍ NHỚ ẢO”

Đây là một failure mode rất dễ xảy ra.

Compiler gom một số thông tin.

AI đọc.

Sau đó mọi người coi compiled context đó như truth.

Không.

Context compiled chỉ là:

> một view có mục đích của project truth.

Canonical truth vẫn ở:

Knowledge.

State.

Governance.

Evidence.

Context package có thể bị xóa.

Có thể build lại.

Canonical source không được mất.

### CONTEXT VÀ PROJECT STATE CÓ MỐI QUAN HỆ HAI CHIỀU

`PROJECT STATE ↓ CONTEXT COMPILER ↓ EXECUTION ↓ CHANGE ↓ VERIFICATION ↓ PROJECT STATE' ↓ NEW CONTEXT`

Đây là một loop.

Và đó là lý do Context Engineering không phải một việc làm một lần.

### CONTEXT QUALITY ẢNH HƯỞNG TRỰC TIẾP ĐẾN REWORK

Một context tốt có thể giúp AI làm đúng ngay từ đầu.

Context thiếu có thể tạo assumption.

Context sai có thể tạo wrong implementation.

Context cũ có thể tạo compatibility issue.

Context quá lớn có thể tạo distraction.

Tất cả đều có thể dẫn đến:

> rework.

> Context quality is part of engineering efficiency.

### CONTEXT ENGINEERING CŨNG LÀ COST ENGINEERING

Tôi bắt đầu kết nối mọi thứ lại.

Context quality tốt:

`→ ít clarification.`

`→ ít retry.`

`→ ít rework.`

`→ ít switching.`

`→ ít verification waste.`

`→ completion nhanh hơn.`

Do đó context không chỉ là một vấn đề “AI hiểu tốt hơn”.

> Nó cũng là cost control.

### TÔI KHÔNG MUỐN ĐO CONTEXT BẰNG SỐ TOKEN

Token count có thể hữu ích.

Nhưng nó không phải quality metric.

Một context 20.000 token có thể rất tốt.

Một context 2.000 token có thể rất tệ.

Ngược lại.

Điều tôi thực sự quan tâm là:

Task Success.

Rework.

Verification Success.

Context Recovery.

Effective Cost.

### CONTEXT FAILURE CÓ THỂ ĐƯỢC PHÂN LOẠI

MISSING CONTEXT

Thiếu thông tin.

WRONG CONTEXT

Thông tin không đúng task.

STALE CONTEXT

Thông tin đã cũ.

CONFLICTING CONTEXT

Các nguồn mâu thuẫn.

UNAUTHORIZED CONTEXT

Executor được đưa information mà nó không được phép sử dụng.

EXCESS CONTEXT

Quá nhiều thông tin gây nhiễu.

UNVERIFIABLE CONTEXT

Context chứa claim nhưng không có evidence đáng tin.

Những failure mode này cần được phát hiện trước execution khi có thể.

### “CONTEXT DRIFT” CŨNG LÀ MỘT LOẠI DRIFT

Tôi đã nói về style drift.

Tôi đã nói về method drift.

Bây giờ có thêm:

> Context Drift.

Project thay đổi nhưng context package cũ vẫn được dùng.

AI bắt đầu làm việc trên một snapshot đã không còn phản ánh project.

Context drift có thể âm thầm hơn code drift.

Nhưng hậu quả có thể rất lớn.

### CONTEXT LOCK

Với những task quan trọng, tôi bắt đầu thích ý tưởng context package có thể được “lock” cho một execution.

Nó ghi:

task nào;

state nào;

knowledge version nào;

governance version nào;

method version nào;

evidence nào.

Khi execution đang chạy, nếu một dependency critical thay đổi, system có thể yêu cầu recompile hoặc stop.

Điều đó tránh việc AI đang làm trên một context rồi project thay đổi bên dưới mà không ai biết.

### TÔI BẮT ĐẦU NGHĨ CONTEXT CŨNG CÓ “FINGERPRINT”

Giống Engineering Method có fingerprint, một context package cũng có thể có:

source references;

versions;

hash;

timestamp;

state reference.

Không phải để biến mọi thứ thành crypto.

Mà để có thể trả lời:

> “AI đã thực sự được cho context nào?”

Đây là một câu hỏi quan trọng khi audit.

## CONTEXT PACKAGE LÀ MỘT ENGINEERING ARTIFACT

Từ đây tôi bắt đầu xem:

> Execution Context

không phải là thứ vô hình chỉ tồn tại trong prompt.

Nó có thể là một artifact.

Nó có provenance.

Có version.

Có source.

Có scope.

Có authority.

Có applicability.

Có trạng thái.

Điều đó giúp verification và recovery dễ hơn.

### TÔI MUỐN AI CÓ THỂ GIẢI THÍCH “TẠI SAO NÓ BIẾT ĐIỀU NÀY”

Đây là một standard rất hữu ích.

Nếu AI nói:

> “Tôi chọn cách này vì architecture hiện tại yêu cầu…”

tôi muốn biết architecture hiện tại là gì.

Nếu AI nói:

> “Field này không được đổi…”

tôi muốn biết rule nào nói vậy.

Nếu AI nói:

> “Task này blocked…”

tôi muốn biết authority hoặc dependency nào gây block.

Context provenance giúp những câu trả lời đó có thể kiểm tra được.

### CONTEXT COMPILER KHÔNG PHẢI “AI THÔNG MINH HƠN”

Một suy nghĩ dễ xuất hiện là:

> “Vậy hãy dùng một model mạnh hơn để chọn context.”

Có thể.

Nhưng đó không giải quyết gốc vấn đề nếu data model không rõ.

Nếu authority không có.

Nếu state không có.

Nếu relationship không có.

Một AI mạnh hơn chỉ có thể suy đoán tốt hơn.

Tôi không muốn dựa vào suy đoán khi có thể xây structure.

### STRUCTURE BEATS GUESSING

Đây là một nguyên tắc tôi rất thích.

Nếu project có:

canonical ID,

version,

status,

authority,

supersedes,

depends_on,

verified_by,

thì system có thể resolve nhiều thứ một cách deterministic.

AI chỉ cần xử lý những phần thực sự cần reasoning.

## TÔI BẮT ĐẦU NHÌN CONTEXT ENGINEERING NHƯ MỘT DISCIPLINE RIÊNG

Context Engineering không còn là:

> “viết prompt kỹ hơn.”

Nó bao gồm:

Context modeling.

Knowledge management.

Retrieval.

Authority resolution.

State resolution.

Dependency resolution.

Context compilation.

Context validation.

Context provenance.

Context invalidation.

Context cost management.

Đó là cả một engineering discipline.

### TỪ PROMPT ENGINEERING SANG CONTEXT ENGINEERING

Prompt Engineering vẫn có giá trị.

Tôi vẫn phải viết instruction tốt.

Nhưng tôi không còn muốn prompt chịu trách nhiệm cho mọi thứ.

Tôi muốn:

> Prompt nói rõ việc phải làm.

và:

> Context cung cấp đúng thứ AI cần biết.

Đây là sự phân công rõ ràng hơn.

### PROMPT NÊN ỔN ĐỊNH HƠN, CONTEXT NÊN THAY ĐỔI THEO TASK

Một cách làm tốt là:

Prompt structure khá ổn định.

Task parameters thay đổi.

Context được compiler xây theo state.

Điều đó làm provider adapter dễ hơn.

Gemini có thể có prompt formatting riêng.

DeepSeek có thể có cách khác.

Nhưng semantic task + context contract vẫn giữ nguyên.

### CONTEXT ENGINEERING GIÚP PROVIDER THAY ĐỔI DỄ HƠN

Nếu context chỉ nằm trong prompt của Gemini, khi chuyển sang DeepSeek tôi phải viết lại rất nhiều.

Nếu context là project artifact có cấu trúc, executor mới chỉ cần một adapter.

> Provider-neutral context is an architectural asset.

### TÔI KHÔNG MUỐN AI NÀO “SỞ HỮU” CONTEXT

AI chỉ nhận context.

AI không sở hữu context.

Project sở hữu source of truth.

Context compiler tạo execution view.

Executor sử dụng view đó.

Sau execution, project cập nhật state và evidence.

Đây là một vòng kín.

### CONTEXT CẦN CÓ SECURITY CLASSIFICATION

Không phải context nào cũng được đưa cho mọi executor.

Một artifact có thể là:

LOCAL_ONLY

RESTRICTED

CONFIDENTIAL

INTERNAL

SYNCABLE

Context compiler phải filter theo:

task;

executor;

environment;

security policy.

Một AI có thể cần biết:

> “Application sử dụng database PostgreSQL.”

nhưng không cần biết:

> “Production password là gì.”

Đó là context minimization.

### CONTEXT MINIMIZATION KHÔNG GIỐNG CONTEXT REDUCTION

Giảm context chỉ để context ngắn hơn có thể gây thiếu information.

Minimization nghĩa là:

> Loại bỏ những gì không cần thiết hoặc không được phép, nhưng giữ đủ thứ cần thiết cho task.

Nó là một security principle và efficiency principle cùng lúc.

### TÔI BẮT ĐẦU NHÌN “RIGHT CONTEXT” THEO NĂM CÂU HỎI

Trước execution:

Is it relevant?

Có liên quan không?

Is it current?

Còn hiệu lực không?

Is it authoritative?

Có authority không?

Is it allowed?

Executor có được phép sử dụng không?

Is it sufficient?

Đã đủ để làm task chưa?

Nếu một câu trả lời là “không”, context cần được xử lý trước.

### CONTEXT COMPILER VÀ VERIFICATION

Context không chỉ giúp execution.

Nó còn giúp verification.

Bởi vì verification cần biết:

task yêu cầu gì;

constraint là gì;

acceptance criteria là gì;

baseline trước đó là gì.

If context package được ghi lại, sau này tôi có thể biết:

> AI đã làm việc dựa trên thông tin nào?

Đó là một phần của evidence lineage.

### CONTEXT COMPILER VÀ HANDOFF

Khi Run kết thúc, context package cũng giúp handoff.

Executor mới không cần đọc toàn bộ history.

Nó có thể lấy:

latest state;

latest checkpoint;

current task;

current working set;

relevant knowledge;

evidence.

Điều đó làm continuity rẻ hơn.

### CONTEXT ENGINEERING VÀ “NO HANDOFF WITHOUT STATE SYNCHRONIZATION”

Handoff không thể đúng nếu context được build từ state cũ.

Vì vậy sequence phải là:

`State Sync ↓ Context Recompile`

`↓ Handoff ↓ New Run`

Không phải:

`Old Chat ↓ New AI`

### CONTEXT ENGINEERING CÓ THỂ GIẢM SWITCHING COST

Tôi đã nói về switching cost ở Chương 2.

Bây giờ tôi thấy nguồn gốc của nó rõ hơn.

Nếu context nằm trong conversation:

switching rất đắt.

Nếu context nằm trong project:

switching rẻ hơn.

Nếu context có compiler:

switching có thể có hệ thống.

Nếu context có provenance và authority:

switching còn an toàn hơn.

### TÔI KHÔNG MUỐN CONTEXT “THÔNG MINH”. TÔI MUỐN CONTEXT “ĐÚNG”

Có một cách rất hấp dẫn để mô tả AI:

> “AI này rất thông minh.”

Nhưng trong engineering, tôi bắt đầu đánh giá một câu khác:

> “AI này có nhận đúng thứ nó cần không?”

Một AI vừa đủ tốt với context đúng có thể outperform một AI mạnh với context sai.

Đó là bài học lớn.

### KEY IDEA

> Context tốt không phải context nhiều nhất.

> Context tốt là context đúng, đủ, hiện hành, có authority và phù hợp với task.

Prompt is instruction.

Context là knowledge cần cho execution.

Project State is current truth.

Authority quyết định thứ gì được tin.

Context Compiler biến tất cả thành working context.

Và:

> Minimum Sufficient Context > Maximum Context.

### WHAT I LEARNED

Tôi bắt đầu với suy nghĩ:

> “AI càng nhận nhiều thông tin thì càng thông minh.”

Tôi kết thúc với một suy nghĩ khác:

> “AI không cần biết tất cả. AI cần biết đúng thứ nó cần để làm đúng task.”

Tôi không còn muốn dành thời gian vô tận để viết prompt dài hơn.

Tôi muốn project có:

Knowledge.

State.

Authority.

Retrieval.

Context Compiler.

Evidence.

Để mỗi AI Executor có thể nhận một context đủ, đúng và có thể kiểm chứng.

### VÀ ĐÓ LÀ LÚC TÔI NHẬN RA MỘT VẤN ĐỀ CÒN KHÓ HƠN

Tôi đã biết:

AI cần đúng task.

AI cần đúng context.

AI cần đúng authority.

AI cần đúng scope.

Nhưng vẫn còn một câu hỏi:

> Làm thế nào để biết AI đã thực sự làm đúng?

AI có thể nói:

> “Done.”

AI có thể nói:

> “Tests passed.”

AI có thể nói:

> “Everything is working.”

Nhưng đó vẫn chỉ là claim.

Tôi cần một thứ khác.

Tôi cần:

Evidence.

Tôi cần:

Verification.

Và tôi cần phân biệt rõ:

CODE EXISTS

với:

CODE RUNS

với:

REQUIREMENT SATISFIED

và cuối cùng:

> VERIFIED.

Đó là lúc tôi bắt đầu đi vào một vấn đề mà trước đây tôi đã đánh giá thấp hơn rất nhiều:

> AI đã nói “DONE”. NHƯNG TÔI KHÔNG TIN.

### CHUYỂN TIẾP

Tôi đã có một cách để project giữ lại knowledge và state.

Tôi cũng bắt đầu có một cách để chọn đúng context cho từng task.

Nhưng ngay cả khi AI có đúng context, vẫn còn một câu hỏi lớn:

> AI đang được phép làm đến đâu?

Một task có thể rất rõ.

Context có thể rất đúng.

AI có thể rất mạnh.

Nhưng nếu scope của task quá rộng, AI vẫn có thể thay đổi nhiều hơn tôi muốn.

Đó là lúc tôi bắt đầu nhìn nghiêm túc hơn vào Task Decomposition, Execution Contract và Controlled Autonomy.

Bởi vì biết đúng thứ cần làm chưa đủ.

> AI còn phải biết được phép làm gì.

Và đó là câu chuyện của Chương 5.
