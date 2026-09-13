---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 14
order: 14
title: "AI CÓ THỂ VIẾT CODE. NHƯNG AI CÓ ĐANG XÂY SẢN PHẨM KHÔNG?"
subtitle: "Từ Code Generation đến Product Engineering"
shortTitle: "AI có thể viết code. Nhưng có đang xây sản phẩm?"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 299
source_artifact: "14.BEYOND_VIBE_CODING_CORE_BOOK_Chapter-14_Draf.pdf"
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
navigation_root: "CHƯƠNG 14 - AI CÓ THỂ VIẾT CODE. NHƯNG AI CÓ ĐANG XÂY SẢN PHẨM KHÔNG?"
publicationStatus: "published"
contentStatus: "complete"
hero: "images/chapter-14-hero.webp"
readingTime: "12 min"
topics: ["product engineering", "outcome", "vertical slice", "validation", "governance"]
---

<!-- Canonical structured manuscript. No PDF page coordinates or running chrome are encoded here. -->

# CHƯƠNG 14

# AI CÓ THỂ VIẾT CODE. NHƯNG AI CÓ ĐANG XÂY SẢN PHẨM KHÔNG?

*Từ Code Generation đến Product Engineering*



Có một thời điểm trong hành trình xây EnerixFin mà tôi bắt đầu thấy một điều khá lạ.

Code được tạo ra rất nhanh.

Task được hoàn thành rất nhanh.

Git có thêm commit.

Một số lỗi được sửa chỉ trong vài phút.

Nhiều màn hình xuất hiện.

Nhiều API được tạo.

Database ngày càng đầy đủ.

Nhìn vào repository, tôi có cảm giác project đang tiến rất nhanh.

Nhưng rồi tôi tự hỏi:

Product có đang tiến nhanh như vậy không?

Câu hỏi đó làm tôi dừng lại.

Bởi vì nếu chỉ nhìn vào code, câu trả lời có vẻ là “Có”.

Nhưng nếu nhìn vào người sử dụng, câu trả lời không còn đơn giản.

Một chức năng có thể đã được implement.

Nhưng user có giải quyết được vấn đề không?

Một workflow có thể chạy.

Nhưng có tạo ra kết quả mà người dùng thực sự cần không?

Một báo cáo có thể được generate.

Nhưng người nhận có dùng nó để đưa ra quyết định không?

Một financial model có thể tính được NPV và IRR.

Nhưng assumptions có minh bạch đủ để người sử dụng tin vào kết quả không?

Một sơ đồ điện có thể được sinh ra.

Nhưng người dùng có hiểu đúng phạm vi của nó không?

Tôi nhận ra mình đang nhìn thấy một khoảng cách rất lớn:

Code Progress ≠ Product Progress.

Đó là lúc tôi bắt đầu bước sang một cách nghĩ khác.

Không còn chỉ là:

Code Generation.

Mà là:

Product Engineering.

## CODE PROGRESS KHÔNG PHẢI PRODUCT PROGRESS

### Tôi đã quá dễ bị thuyết phục bởi số lượng code

AI tạo code rất nhanh.

Đó chính là một trong những lý do tôi thích Vibe Coding.

Tôi có thể mô tả một ý tưởng.

AI biến nó thành component.

Một prompt khác.

AI tạo API.

Một prompt nữa.

AI tạo schema.

Rồi thêm một prompt:

“Connect everything.”

Sau một thời gian ngắn, repository có thể thay đổi rất nhiều.

Điều đó tạo ra một cảm giác rất mạnh:

Tôi đang tiến rất nhanh.

Nhưng tốc độ tạo code không phải lúc nào cũng là tốc độ tiến tới sản phẩm.

Tôi có thể tăng:

```text
LOC ↑
Files ↑
Commits ↑
Features ↑
```

mà:

```text
User Value ↔
```

hoặc thậm chí:

```text
Complexity ↑
Risk ↑
Confusion ↑
```

Đây là một cái bẫy rất khó nhận ra khi làm việc với AI.

Bởi vì AI làm cho output nhìn thấy được tăng lên rất nhanh.

Nhưng product value lại thường nằm ở những thứ khó nhìn thấy hơn.

### Code là Output. Product là Outcome.

Tôi bắt đầu phân biệt hai từ rất rõ.

Output là thứ hệ thống tạo ra.

Outcome là kết quả thực tế mà người dùng nhận được.

Ví dụ:

API trả về đúng JSON.

Đó là output.

Nhưng:

Người dùng hoàn thành được workflow nhanh hơn.

Đó mới là outcome.

Một báo cáo được tạo ra.

Output.

Nhưng khách hàng dùng báo cáo đó để quyết định đầu tư.

Outcome.

Một financial model chạy được.

Output.

Nhưng mô hình đó giúp người dùng đánh giá dự án tốt hơn.

Outcome.

Một màn hình đẹp được tạo ra.

Output.

Nhưng user có thực sự hiểu mình cần làm gì tiếp theo không?

Đó mới là outcome.

Từ đó tôi bắt đầu tự nhắc mình:

Do not confuse generated output with delivered value.

### Product bắt đầu từ một vấn đề, không phải từ một component

Một AI rất dễ bắt đầu bằng câu:

“Let's build a dashboard.”

Và lập tức sinh ra:

- sidebar;
- cards;
- charts;
- tables;
- filters;
- buttons.
Nhìn rất thuyết phục.

Nhưng tôi muốn hỏi trước:

Dashboard này giải quyết vấn đề gì?

Ai sẽ sử dụng?

Trong tình huống nào?

Họ đang gặp khó khăn gì?

Kết quả nào sẽ tốt hơn sau khi dùng?

Nếu chưa trả lời được, tôi chưa thực sự có product requirement.

Tôi chỉ có:

UI idea.

Đây là lý do tôi bắt đầu đưa Product Intent lên trước Implementation.

### Product Intent

Tôi dùng một cách rất đơn giản để ép mình quay về câu hỏi gốc.

Trước một capability, tôi muốn biết:

WHO

Ai sử dụng?

PROBLEM

Họ đang gặp vấn đề gì?

OUTCOME

Họ muốn đạt kết quả gì?

WORKFLOW

Họ sẽ sử dụng sản phẩm như thế nào?

CONSTRAINT

Những giới hạn nào phải tôn trọng?

BUSINESS RULE

Quy tắc nghiệp vụ nào phải được giữ?

FAILURE

Điều gì xảy ra nếu hệ thống làm sai?

VALUE

Tại sao người dùng phải quan tâm?

Tám câu hỏi này nghe rất bình thường.

Nhưng chúng giúp tôi ngăn một điều rất nguy hiểm:

AI tự quyết định product thay tôi.

### AI rất giỏi trả lời câu hỏi “Build how?”

Nhưng product thường bắt đầu bằng:

Build what?

Và trước đó nữa:

Why?

AI có thể rất giỏi:

- chọn framework;
- viết component;
- thiết kế API;
- tạo database;
- refactor;
- test.
Nhưng nó không mặc nhiên biết:

feature này có thực sự cần không?

Nó cũng không mặc nhiên biết:

khách hàng sẵn sàng trả tiền cho nó không?

Nó càng không mặc nhiên biết:

feature này có làm thay đổi business model không?

Đây là lý do tôi không muốn AI trở thành Product Manager mặc định.

AI có thể support product thinking.

Nhưng human intent phải có trước.

### Tôi bắt đầu phân biệt Product Scope và Engineering Scope

Đây là một phân biệt rất hữu ích.

Product Scope trả lời:

Sản phẩm phải làm được gì cho người dùng?

Engineering Scope trả lời:

Để làm được điều đó, hệ thống cần thay đổi những gì?

Ví dụ:

Product requirement

Người dùng có thể nhập hóa đơn điện và nhận được phân tích chi phí theo

thời gian.

Engineering scope có thể bao gồm:

- input schema;
- file import;
- parsing;
- validation;
- database storage;
- calculation;
- API;
- UI;
- error handling;
- testing.
AI nhìn engineering scope khá tốt.

Nhưng nếu product requirement chưa rõ, AI có thể xây một thứ technically impressive nhưng

không giải quyết đúng bài toán.

### Tôi không muốn AI tự mở rộng Product Scope

Đây là một vấn đề tôi gặp càng nhiều càng thấy rõ.

Tôi yêu cầu:

“Thêm chức năng import hóa đơn.”

AI có thể nghĩ:

“Tôi sẽ thêm import history.”

Rồi:

“Tôi sẽ thêm analytics.”

Rồi:

“Tôi sẽ thêm notification.”

Rồi:

“Tôi sẽ thêm dashboard.”

Mỗi ý tưởng riêng lẻ đều có vẻ hợp lý.

Nhưng tổng thể:

One Requirement

```text
↓
```

Many Unrequested Features

```text
↓
```

Scope Drift

Đó là Scope Drift.

AI không làm sai vì nó không đủ thông minh.

Nó có thể làm quá tốt.

Vấn đề là:

Nó tối ưu theo khả năng xây, không nhất thiết theo giá trị product.

### Capability Does Not Create Product Authority

Đây là một nguyên tắc tôi đã nói ở các chương trước.

Bây giờ nó xuất hiện ở cấp product.

AI có capability để xây:

feature A, B, C, D.

Không có nghĩa AI có authority để quyết định:

product cần A, B, C, D.

AI có thể đề xuất.

Human product intent quyết định.

Đây là cách tôi muốn:

Product Intent

```text
↓
```

Requirement

```text
↓
```

Engineering Task

```text
↓
```

Authorization

```text
↓
```

Execution

Không phải:

AI

```text
↓
```

Build whatever seems useful

### Tôi muốn AI biết “Why this task exists”

Đây là nơi Context Engineering hỗ trợ Product Engineering.

Một task tốt không chỉ có:

“Change file X.”

Nó nên có:

“Task này tồn tại để giải quyết requirement Y cho workflow Z.”

Ví dụ:

Product Goal:

Reduce manual electricity bill analysis.

Requirement:

User can import monthly electricity bills.

Task:

Implement CSV import validation.

Why:

Prevent invalid data from entering the calculation pipeline.

Acceptance:

Valid files import successfully.

Invalid files return actionable errors.

Calculation engine remains unchanged.

Khi AI hiểu “why”, nó ít có xu hướng tự ý thay đổi phần không thuộc scope.

### Tôi bắt đầu dùng Vertical Slice

Một trong những cách tôi thích nhất để tránh việc xây quá nhiều thứ cùng lúc là Vertical Slice.

Thay vì:

Build all UI

```text
↓
```

Build all API

```text
↓
```

Build all DB

```text
↓
```

Build all calculations

```text
↓
```

Connect later

Tôi muốn:

One real user problem

```text
↓
```

Input

```text
↓
```

Logic

```text
↓
```

Data

```text
↓
```

UI

```text
↓
```

Verification

```text
↓
```

Real Outcome

Tức là một lát cắt đi từ đầu đến cuối.

Một vertical slice giúp tôi kiểm tra:

“Người dùng có thực sự nhận được value không?”

đồng thời cho AI một scope rõ hơn.

### Một feature đẹp chưa chắc là một vertical slice tốt

Tôi có thể xây một dashboard rất đẹp.

Nhưng nếu dashboard không đi qua workflow thực tế, nó chỉ là presentation layer.

Tôi có thể xây một form rất đẹp.

Nhưng nếu dữ liệu từ form không đi vào đúng calculation pipeline, nó chưa phải product

capability hoàn chỉnh.

Tôi có thể xây một report generator.

Nhưng nếu report không có evidence hoặc assumptions rõ ràng, nó có thể tạo ra một false sense

of certainty.

Product Engineering yêu cầu:

The entire user journey works.

Không chỉ một màn hình.

### Prototype Trap

AI làm prototype rất nhanh.

Đó là điều tuyệt vời.

Nhưng nó tạo ra một cái bẫy:

Prototype nhìn đủ đẹp để tôi tưởng nó gần production hơn thực tế.

Một prototype có thể có:

UI ✓

Flow ✓

Demo ✓

nhưng:

Security ✗

Data Integrity ✗

Recovery ✗

Observability ✗

Edge Cases ✗

Prototype trả lời:

“Ý tưởng này có thể hoạt động như thế nào?”

Production product phải trả lời:

“Người dùng có thể dựa vào nó đến mức nào?”

Hai câu hỏi khác nhau.

## PRODUCT INTENT, SCOPE VÀ WORKFLOW

### Tôi bắt đầu dùng Product State

Project State là:

hệ thống engineering đang ở đâu.

Nhưng tôi cũng cần biết:

product capability đang ở đâu.

Ví dụ:

Idea

```text
↓
```

Defined

```text
↓
```

Prototyped

```text
↓
```

Implemented

```text
↓
```

Verified

```text
↓
```

Released

```text
↓
```

Observed

```text
↓
```

Validated

Một feature có thể:

implemented

nhưng chưa:

validated.

Điều đó rất quan trọng.

Bởi vì verification kỹ thuật không chứng minh product-market value.

### “Validated” là một trạng thái khác

Một chức năng có thể vượt qua:

- unit tests;
- integration tests;
- UI tests.
Nhưng user vẫn không sử dụng nó.

Khi đó:

Technically Verified

không có nghĩa:

Product Validated.

Product validation liên quan tới:

- actual usage;
- user behavior;
- workflow completion;
- feedback;
- business outcome.
Tôi không muốn trộn hai loại verification này.

### Engineering Verification và Product Validation

Tôi bắt đầu nhìn chúng như hai lớp:

ENGINEERING

Requirement

```text
↓
```

Implementation

```text
↓
```

Evidence

```text
↓
```

Verification

PRODUCT

User Need

```text
↓
```

Workflow

```text
↓
```

Usage

```text
↓
```

Outcome

```text
↓
```

Validation

Engineering hỏi:

“Hệ thống có làm đúng thứ chúng ta đã định nghĩa không?”

Product hỏi:

“Thứ chúng ta định nghĩa có thực sự đáng làm không?”

Một product tốt cần cả hai.

### AI rất giỏi optimization trong scope. Human phải chọn scope

đúng

Đây là một distinction tôi rất muốn giữ.

AI có thể giúp tôi tối ưu:

How to build.

Nhưng tôi phải chịu trách nhiệm cho:

What to build.

AI có thể giúp:

một calculation nhanh hơn.

Nhưng tôi phải quyết định:

calculation đó có giải quyết vấn đề của user không.

AI có thể giúp:

giảm số dòng code.

Nhưng tôi phải quyết định:

complexity đó có đáng tồn tại không.

AI có thể giúp:

một flow đẹp hơn.

Nhưng tôi phải quyết định:

flow đó có đúng business logic không.

### EnerixFin làm tôi nhìn Product Engineering rất rõ

EnerixFin không bắt đầu từ:

“Tôi muốn xây một dashboard AI.”

Nó bắt đầu từ một workflow thực tế.

Người dùng có những dữ liệu như:

- thông tin cơ sở;
- mái nhà;
- tải điện;
- hóa đơn;
- bản vẽ;
- yêu cầu đầu tư.
Từ đó cần đi qua:

Input

```text
↓
```

Analysis

```text
↓
```

Design

```text
↓
```

Economics

```text
↓
```

Proposal

Chính workflow đó mới là product.

Code chỉ là cách tôi hiện thực hóa workflow.

### Một phần mềm Solar/BESS không chỉ là một calculator

Đây là điều AI rất dễ hiểu sai nếu task không đủ context.

Tôi không chỉ muốn:

tính công suất solar.

Tôi muốn hỗ trợ một chuỗi công việc:

Customer Data

```text
↓
```

Site Analysis

```text
↓
```

PVOUT

```text
↓
```

Roof Area

```text
↓
```

Solar Capacity

```text
↓
```

Generation

```text
↓
```

Load Analysis

```text
↓
```

BESS Concept

```text
↓
```

CAPEX

```text
↓
```

Cash Flow

```text
↓
```

Investment Analysis

```text
↓
```

Proposal

Nếu tôi chỉ hoàn thành các calculator riêng lẻ, tôi có nhiều technical features.

Nhưng chưa chắc tôi có một product workflow hoàn chỉnh.

### Workflow Completion mới là thứ tôi quan tâm

Tôi bắt đầu tự hỏi:

Người dùng có thể đi từ đầu đến cuối không?

Ví dụ:

1. nhập dữ liệu;

2. phân tích;

3. thiết kế sơ bộ;

4. xem economics;

5. tạo proposal;

6. sử dụng kết quả.

Nếu một bước bị đứt, product chưa hoàn chỉnh dù mỗi module riêng lẻ đều chạy được.

Đây là lý do:

Feature completeness ≠ Workflow completeness.

### Tôi không muốn AI xây “feature cemetery”

Một project dùng AI rất dễ tích tụ những chức năng như:

- có thể dùng;
- có vẻ hữu ích;
- đã làm rồi;
- để sau tính tiếp.
Cuối cùng có thể có hàng chục feature mà user rất ít dùng.

Tôi gọi đó là:

Feature Cemetery.

Feature tồn tại.

Code tồn tại.

UI tồn tại.

Nhưng value không tồn tại.

Đây là một dạng technical debt rất đặc biệt:

Product Debt.

### Product Debt

Technical Debt thường là:

“Chúng ta biết code này chưa tốt.”

Product Debt có thể là:

“Chúng ta đã xây thứ này nhưng chưa biết nó có thực sự cần không.”

Product Debt nguy hiểm vì AI làm chi phí xây feature thấp.

Khi chi phí build giảm mạnh, con người dễ xây quá nhiều.

Và paradox xuất hiện:

AI làm code rẻ hơn có thể làm product phức tạp hơn.

Vì vậy tôi cần discipline để nói:

Không phải feature nào AI có thể xây cũng đáng xây.

### “Build Fast” không có nghĩa “Build Everything”

Tôi vẫn muốn tốc độ.

Nhưng tôi muốn:

Fast learning.

chứ không phải:

Fast accumulation.

Prototype nhanh.

Test hypothesis nhanh.

Thu feedback nhanh.

Loại bỏ nhanh.

Giữ lại thứ có value.

Đó là một kiểu tốc độ khác.

### Product Engineering cần Feedback Loop

Một product thật phải có:

Build

```text
↓
```

Use

```text
↓
```

Observe

```text
↓
```

Learn

```text
↓
```

Change

```text
↓
```

Verify

```text
↓
```

Release

```text
↓
```

Use again

AI làm cho đoạn:

Build → Change

rất nhanh.

Nhưng nếu không có:

Use → Observe → Learn,

tôi chỉ đang tăng tốc coding.

Không phải product development.

### User là một phần của Verification

Đây là một bước suy nghĩ khá mạnh đối với tôi.

Code verification có thể nói:

“Function works.”

Nhưng user feedback có thể nói:

“Function này khiến workflow chậm hơn.”

Hai điều đều có thể đúng.

Vì vậy product verification không thể hoàn toàn tách khỏi user reality.

Tôi không muốn:

“User dùng sai.”

là phản ứng đầu tiên.

Nếu nhiều user cùng dùng “sai”, có thể product đang truyền đạt sai.

### AI không tự động hiểu User Intent

AI có thể suy đoán user intent.

Nhưng product không nên xây trên suy đoán khi consequence cao.

Ví dụ:

Người dùng tải lên một bản hóa đơn.

AI có thể đoán:

“Đây là hóa đơn điện tháng 8.”

Nhưng nếu parsing sai và dữ liệu đi vào financial model thì consequence lớn.

Vì vậy cần:

AI Interpretation

```text
↓
```

Validation

```text
↓
```

Evidence

```text
↓
```

User Confirmation where required

Đây là Controlled Intelligence.

### Recommendation không phải Decision

EnerixFin có thể đề xuất:

- sizing;
- configuration;
- economic scenarios;
- options.
Nhưng recommendation không đồng nghĩa decision.

Ví dụ:

“Phương án A có NPV cao hơn.”

là một phân tích.

Còn:

“Hãy đầu tư phương án A.”

là một quyết định kinh doanh.

AI có thể hỗ trợ phân tích.

Authority cho quyết định vẫn thuộc về con người hoặc tổ chức có thẩm quyền.

### Preliminary Engineering không phải Issued Engineering

Đây cũng là một ranh giới tôi muốn giữ.

AI có thể hỗ trợ:

preliminary electrical concept.

Có thể hỗ trợ:

- SLD concept;
- integration concept;
- preliminary sizing;
- calculation.
Nhưng điều đó không tự động biến output thành:

hồ sơ thiết kế được phê duyệt;

hay:

Issued-for-Construction engineering.

Scope của product phải được nói rõ.

AI càng giỏi, boundary này càng quan trọng.

Bởi vì output càng đẹp thì người dùng càng dễ tin rằng nó có authority cao hơn thực tế.

### Tôi nhận ra Product Engineering cần “Truth Labels”

Tôi muốn người sử dụng biết output đang ở cấp độ nào.

Ví dụ:

Actual

Kết quả thực tế đã được thực hiện.

Illustrative

Ví dụ minh họa.

Target Capability

Khả năng dự kiến.

Reference Example

Ví dụ tham chiếu.

Author Interpretation

Diễn giải của tác giả.

Điều này không chỉ dành cho cuốn sách.

Nó cũng là tư duy tốt khi xây product có AI.

The clearer the provenance, the safer the trust.

### Product Trust không đến từ giao diện đẹp

Một UI rất đẹp có thể tạo confidence.

Nhưng confidence không phải trust.

Trust cần:

- provenance;
- assumptions;
- evidence;
- consistency;
- verification;
- predictable behavior.
Đặc biệt trong các workflow liên quan đến financial analysis hoặc engineering, “trông chuyên

nghiệp” không được trở thành bằng chứng duy nhất.

Một con số có font đẹp vẫn có thể sai.

## PRODUCT STATE, VALIDATION VÀ EVIDENCE

### Product Requirement phải có Acceptance Criteria

Tôi bắt đầu thấy Acceptance Criteria quan trọng hơn việc viết prompt dài.

Ví dụ:

Requirement

Người dùng có thể import hóa đơn điện.

Acceptance:

Valid file

```text
↓
```

Accepted

Invalid file

```text
↓
```

Rejected with actionable error

Duplicate

```text
↓
```

Handled according to rule

Accepted data

```text
↓
```

Persisted

Calculation

```text
↓
```

Unaffected outside approved scope

AI lúc này có một mục tiêu rõ.

Không phải:

“Làm cho import tốt hơn.”

Mà:

Đạt các điều kiện cụ thể này.

### Verification phải quay về Requirement

Đây là một nguyên tắc rất đơn giản.

AI có thể nói:

“Tests pass.”

Tôi hỏi:

“Tests đó đang chứng minh requirement nào?”

Nếu không trả lời được, tôi vẫn chưa có product verification đầy đủ.

Từ đó tôi thích chain:

REQUIREMENT

```text
↓
```

IMPLEMENTATION

```text
↓
```

EVIDENCE

```text
↓
```

VERIFICATION

```text
↓
```

STATE TRANSITION

Đây chính là một trong những arrow flows quan trọng của hệ thống tôi.

### Test Coverage không phải Requirement Coverage

Một hệ thống có 90% test coverage vẫn có thể thiếu một requirement quan trọng.

Ví dụ:

tính toán đúng.

Nhưng:

không hiển thị assumptions.

Test coverage có thể cao.

Requirement coverage vẫn thiếu.

Vì vậy product verification phải đi từ:

Requirement.

Không phải chỉ từ:

Code.

### Tôi bắt đầu nhìn “Done” theo nhiều tầng

Một task có thể:

Implemented

Code đã tồn tại.

Verified

Có evidence cho thấy behavior đáp ứng acceptance criteria.

Released

Thay đổi đã được đưa tới user theo release authority.

Adopted

User thực sự sử dụng.

Validated

Có evidence cho thấy nó tạo ra intended outcome.

Đó là năm tầng rất khác nhau.

Tôi không muốn dùng một từ:

Done

để che tất cả.

### AI có thể giúp tôi đi rất nhanh qua tầng đầu

AI cực mạnh ở:

Implemented.

Nó cũng có thể hỗ trợ:

Verified.

AI có thể hỗ trợ:

Release preparation.

Nhưng:

Adopted.

và:

Validated.

cần user reality.

Đó là phần mà không một prompt nào có thể thay thế.

### Product không kết thúc khi code được merge

Đây là một trong những câu tôi muốn giữ lại.

Merge is not product completion.

Merge chỉ là một engineering event.

Sau đó:

Deploy

```text
↓
```

Release

```text
↓
```

Observe

```text
↓
```

User

```text
↓
```

Outcome

Nếu user không nhận được value:

product work chưa kết thúc.

### Tôi muốn AI tham gia toàn bộ Product Loop

Tôi không muốn giới hạn AI chỉ ở coding.

AI có thể:

- phân tích feedback;
- tìm patterns trong usage;
- đề xuất requirements;
- implement;
- test;
- diagnose;
- document;
- prepare releases.
Nhưng tôi muốn mọi bước đều có boundary.

AI không tự biến:

feedback

thành:

product decision.

Nó tạo:

proposal.

Con người hoặc policy chuyển:

proposal → decision.

### Đây là nơi Product Engineering và Governance gặp nhau

Một feature đi qua:

Idea

```text
↓
```

Proposal

```text
↓
```

Decision

```text
↓
```

Requirement

```text
↓
```

Task

```text
↓
```

Implementation

```text
↓
```

Verification

```text
↓
```

Release

Mỗi transition có một loại authority khác nhau.

AI có thể hỗ trợ hầu hết các bước.

Nhưng authority không mặc định đi theo capability.

### Tôi muốn Product Governance nhẹ nhưng rõ

Không phải mọi feature cần một cuộc họp.

Một thay đổi nhỏ có thể đi nhanh.

Một thay đổi liên quan tới:

- pricing;
- customer data;
- financial results;
- security;
- critical workflow
cần nhiều control hơn.

Đó là:

Governance scales with consequence.

Không chỉ engineering risk.

Product consequence cũng cần được tính.

### EnerixFin làm tôi hiểu điều đó rất rõ

Ví dụ:

Thay đổi màu button.

Risk thấp.

Nhưng:

thay đổi formula của IRR.

Risk cao.

Hoặc:

thay đổi logic BESS degradation.

Risk cao hơn nữa nếu result đi vào investment proposal.

Hoặc:

thay đổi cách phân loại customer data.

Security consequence.

Mỗi task phải có risk tương xứng.

### Tôi không muốn AI “sửa cho đẹp” business rule

Một AI có thể thấy một formula “không elegant”.

Nó refactor.

Nhưng business rule có thể tồn tại vì một lý do mà code không thể tự giải thích.

Ví dụ:

assumption được quy định bởi một policy.

AI không được tự thay chỉ vì formula mới “cleaner”.

Đây là:

Business Rule Authority.

### Product Knowledge phải có Authority

Không phải mọi document về product đều có trọng lượng như nhau.

Có thể có:

Draft

Proposal

Approved Requirement

Current Rule

Superseded Requirement

AI phải biết cái nào là authoritative.

Đây là Semantic Authority áp dụng vào product.

### “Latest Requirement” không nhất thiết là “Approved Requirement”

Một draft có thể mới hơn.

Một approved requirement có thể cũ hơn.

Nhưng current product vẫn phải tuân theo approved requirement cho đến khi có thay đổi hợp lệ.

Đó là lý do:

Latest ≠ Authoritative.

### Product Versioning cũng là một phần của Truth

Một requirement có thể thuộc:

v1.

Product hiện tại:

v2.

AI đọc tài liệu cũ và vô tình xây behavior cũ.

Đó là product drift.

Vì vậy knowledge manifest phải giúp resolve:

current product authority.

### Tôi bắt đầu coi “Product Context” là một artifact riêng

Product Context có thể chứa:

Current Product Goal

Target Users

Key Workflows

Current Capabilities

Known Limitations

Out-of-Scope Areas

Business Rules

Current Release

Open Product Questions

AI mới không phải đoán.

Nó được load context.

### Product Context không phải Marketing Copy

Một trang:

“EnerixFin giúp doanh nghiệp tối ưu năng lượng bằng AI.”

không đủ để AI build.

Product Context phải cụ thể:

User A cần workflow X.

Input là Y.

Rule Z.

Output Q.

Constraint C.

Không được làm R.

Đó là engineering-grade product context.

### Tôi không muốn biến Book thành brochure về EnerixFin

EnerixFin trong cuốn sách là:

real-world case study.

Nó tồn tại để minh họa cách tôi học.

Không phải để quảng cáo rằng:

mọi capability đã hoàn thiện.

Tôi phải luôn phân biệt:

Actual Output

và:

Target Capability.

Điều này cũng chính là Product Truth.

### Product Engineering đòi hỏi biết nói “chưa có”

Một sản phẩm đáng tin không cần giả vờ hoàn chỉnh.

Nếu một capability chưa build:

nói chưa build.

Nếu build nhưng chưa verified:

nói chưa verified.

Nếu verified nhưng chưa validated:

nói chưa validated.

Nếu target capability:

gọi đúng tên.

Đây là một phần của trust.

### AI rất dễ làm mọi thứ trông completed

Đó là một trong những đặc điểm tôi phải cảnh giác.

AI có thể tạo:

polished UI.

polished copy.

polished demo.

polished explanation.

Nhưng:

polish ≠ maturity.

Một product tốt cần evidence.

### “Demo Success” là một trạng thái rất nguy hiểm

Demo chạy:

success.

Nhưng production workflow:

unknown.

Đó là lý do tôi muốn test theo:

real workflow.

Không phải chỉ:

screenshot.

### Workflow Evidence

Ví dụ:

customer nhập dữ liệu thật.

system tính.

proposal được tạo.

người dùng kiểm tra.

output được sử dụng.

Đó là evidence mạnh hơn:

“AI said everything works.”

### Product Engineering làm tôi quay lại Principle của Chương 11

Tôi từng nói:

Done is a claim. Verified is a state.

Chương này bổ sung một tầng nữa:

Verified does not automatically mean Valuable.

Vì:

Done

```text
↓
```

Verified

```text
↓
```

Released

```text
↓
```

Used

```text
↓
```

Validated

Mỗi trạng thái có ý nghĩa riêng.

### Tôi muốn AI biết mình đang ở tầng nào

Nếu task chỉ là:

prototype UI,

AI không nên nghĩ:

production ready.

Nếu task là:

implement feature,

AI không nên nghĩ:

product validated.

Nếu test pass:

không đồng nghĩa user outcome đã verified.

Context và State phải làm rõ tầng này.

### Đây là lúc “Product State” trở thành một phần của Project

State

Project state có thể có:

engineering_state

product_state

release_state

Ví dụ:

feature:

implementation: VERIFIED

release: RELEASED

adoption: UNKNOWN

product_validation: NOT_YET_VALIDATED

Cấu trúc như vậy giúp tôi tránh một trong những lỗi nguy hiểm nhất:

nhìn code và tưởng sản phẩm đã hoàn thành.

### Tôi không muốn Product Engineering giết Vibe Coding

Ngược lại.

Vibe Coding rất hữu ích ở giai đoạn:

exploration.

Tôi có thể thử:

- UI;
- workflow;
- interaction;
- concept.
Nhanh.

Nhưng trước khi commit vào product core:

engineering discipline bắt đầu.

Đó là:

Fast Exploration. Disciplined Commitment.

### Prototype có thể chết

Đây là một nguyên tắc rất lành mạnh.

Không phải mọi prototype đều phải được sản xuất hóa.

AI khiến việc tạo prototype rẻ đến mức tôi có thể tạo 5 cách.

Tôi không cần giữ cả 5.

Tôi có thể:

Prototype A → Reject

Prototype B → Reject

Prototype C → Learn

Prototype D → Keep

Prototype E → Merge idea

Đó là product discovery.

### Tôi không muốn mọi thứ được xây đều phải trở thành legacy

code

Đây là một trong những quyền lợi lớn nhất của AI.

Vì prototype cost thấp, tôi có thể cho phép một số exploration artifacts chết.

Điều quan trọng là:

Đừng promoted prototype thành core architecture mà không có lý do.

Prototype chỉ trở thành trusted product code sau khi pass promotion criteria.

### Promotion

Một prototype có thể được promote khi:

- product intent rõ;
- behavior được xác định;
- architecture phù hợp;
- security phù hợp;
- test đủ;
- evidence có;
- scope được chấp nhận;
- owner rõ.
Đó là một transition.

Không phải:

“Nó chạy rồi, merge luôn.”

### Tôi bắt đầu dùng từ “Promote”

Tôi thích từ này vì nó mô tả đúng quá trình:

Experimental

```text
↓
```

Evaluated

```text
↓
```

Verified

```text
↓
```

Promoted

```text
↓
```

Trusted Product Capability

AI có thể làm nhanh phần experimental.

Governance quyết định promotion.

### Product Architecture không nên là một đống prototype

Nếu tôi cứ lấy prototype ghép lại, architecture sẽ drift.

Một feature prototype tốt vẫn có thể có:

wrong boundary.

Do đó:

Prototype may prove behavior without proving architecture.

Đây là lý do Chapter 16 sẽ nói sâu hơn về architecture responsibility.

### Nhưng Product Engineering phải phát hiện vấn đề trước

Architecture Review

Nếu workflow đã sai, architecture review không cứu được.

Ví dụ:

user không cần chức năng này.

Không có architecture nào làm nó trở thành product tốt.

Đây là reason Product Intent phải đi trước Architecture Commitment.

## PRODUCT GOVERNANCE, AUTHORITY VÀ CONTROLLED AUTONOMY

### Tôi muốn Product Engineering dẫn đường cho AI Engineering

Không phải ngược lại.

Sai:

AI Capability

```text
↓
```

Feature

```text
↓
```

Product

Đúng hơn:

User Problem

```text
↓
```

Product Outcome

```text
↓
```

Requirement

```text
↓
```

Engineering Task

```text
↓
```

AI Execution

AI nằm sau product intent.

### Một câu hỏi tôi bắt đầu hỏi trước mỗi task

“Nếu task này hoàn thành, user sẽ làm được điều gì mà hôm qua họ chưa làm

được?”

Nếu không có câu trả lời rõ:

task có thể chưa đủ product-oriented.

Ví dụ:

“Refactor service.”

User có gì mới?

Không nhất thiết.

Đó có thể là engineering maintenance task.

Không sao.

Nhưng tôi phải biết nó phục vụ:

reliability;

performance;

maintainability;

security.

Không phải mọi task đều tạo user-visible feature.

Nhưng mọi task quan trọng đều nên có reason.

### Có những task chỉ tạo “Product Health”

Một refactor không tạo feature.

Nhưng có thể:

giảm failure risk.

Một migration không tạo UI.

Nhưng:

bảo vệ data integrity.

Một observability task không thay đổi user flow.

Nhưng:

giúp phát hiện incident.

Vì vậy Product Progress không chỉ là feature count.

Nó gồm:

capability + reliability + trust + operational readiness.

### Tôi muốn AI hiểu cả non-feature work

Nếu task là:

“Add audit logging.”

AI không nên hỏi:

“User-facing feature nào?”

Nó phải hiểu:

đây là trust/control capability.

Đó là lý do Product Context cần bao gồm:

risk và responsibility.

### Product Value có thể là giảm risk

Một feature không cần tạo thêm revenue trực tiếp.

Nó có thể:

- giảm support cost;
- giảm manual work;
- giảm data error;
- giảm security risk;
- tăng confidence;
- tăng recovery ability.
Product Engineering cần nhìn cả những giá trị này.

### Tôi bắt đầu nhìn AI như một Product Development Multiplier

Không phải:

Product Creator.

AI có thể làm tốc độ:

Idea → Prototype

rất nhanh.

Nó có thể làm:

Requirement → Implementation

rất nhanh.

Nhưng:

Need → Value

vẫn cần product engineering.

### Tôi muốn AI giúp tôi học nhanh hơn, không chỉ build nhanh hơn

Đây là một thay đổi rất quan trọng.

Nếu AI tạo prototype trong một giờ:

tôi có thể đưa nó cho user sớm.

Nếu user phản hồi:

tôi học được.

AI sau đó có thể giúp tôi sửa.

Đó là:

AI-accelerated learning loop.

Và đây có thể là giá trị lớn hơn cả coding speed.

### Product Engineering là quá trình giảm uncertainty

Khi bắt đầu:

Tôi chưa biết user cần gì.

Sau prototype:

Tôi hiểu thêm.

Sau usage:

Tôi hiểu thêm.

Sau feedback:

Tôi hiểu thêm.

Sau production:

Tôi hiểu thêm.

Vì vậy product development là:

Uncertainty

```text
↓
```

Experiment

```text
↓
```

Evidence

```text
↓
```

Learning

```text
↓
```

Decision

```text
↓
```

Build

AI làm experiment và build nhanh hơn.

Nhưng evidence và decision vẫn phải được coi trọng.

### Tôi không muốn AI thay uncertainty bằng confidence giả

Đây là một trong những rủi ro lớn nhất.

AI thường trả lời rất tự tin.

Product team có thể đọc:

“This is the best approach.”

Nhưng “best” trong product context phụ thuộc vào:

- user;
- market;
- workflow;
- constraint;
- business model.
AI có thể đưa:

recommendation.

Không nên tự động biến recommendation thành truth.

### Product Engineering cũng là Evidence Engineering

Mỗi product assumption nên có nơi để kiểm chứng.

Ví dụ:

User will prefer workflow A.

Evidence:

observation.

Users will pay for feature B.

Evidence:

interviews / actual purchase behavior.

Calculation method C is acceptable.

Evidence:

domain validation / approved methodology.

Tôi càng phân biệt assumption với evidence, product càng đáng tin.

### Tôi bắt đầu nhận ra một sản phẩm tốt có nhiều loại Evidence

Có:

technical evidence.

Có:

product evidence.

Có:

business evidence.

Có:

user evidence.

Ví dụ:

Technical

→ tests pass

Product

→ workflow complete

User

→ user successfully uses it

Business

→ outcome / willingness to pay

Không một loại evidence nào có thể thay thế hoàn toàn các loại khác.

### Đây cũng là lý do “First Customer” rất quan trọng

Một user thật có thể cung cấp evidence mà không một AI nào có thể tự tạo ra trong chân không:

họ có cần không?

họ dùng thế nào?

họ bỏ ở đâu?

họ sẵn sàng trả bao nhiêu?

Điều đó sẽ trở thành trung tâm của Chapter 21.

Nhưng Chapter 14 là nơi tôi bắt đầu chuẩn bị tư duy cho nó:

Product is validated by reality.

### Tôi không muốn Product Engineering trở thành waterfall

Tôi cũng không muốn đi sang cực đối diện.

Không:

spec 200 trang trước khi prototype.

Không:

architecture locked forever.

Không:

no code until everything is known.

Tôi muốn:

Understand enough

```text
↓
```

Build small

```text
↓
```

Verify

```text
↓
```

Observe

```text
↓
```

Learn

```text
↓
```

Commit carefully

Đó là một vòng lặp.

### AI làm vòng lặp này cực nhanh

Và đây là tin tốt.

Vibe Coding không cần bị loại bỏ.

Nó có thể trở thành engine của experimentation.

Ví dụ:

Idea

```text
↓
```

AI Prototype

```text
↓
```

User Try

```text
↓
```

Feedback

```text
↓
```

Revision

Nhưng khi một direction được chọn:

Selected

```text
↓
```

Engineering Task

```text
↓
```

Governance

```text
↓
```

Verification

```text
↓
```

Promotion

Đó là Controlled Vibe Engineering.

### Tôi bắt đầu phân biệt “Experiment” và “Commitment”

Một experiment trả lời:

“Có khả năng nào ở đây đáng theo đuổi không?”

Commitment trả lời:

“Chúng ta chính thức đưa capability này vào product.”

AI có thể giúp tôi experiment rất rẻ.

Commitment cần nhiều discipline hơn.

### Đây là lý do tôi thích câu:

Fast Exploration. Disciplined Commitment.

Nó cho phép tôi giữ:

speed của AI.

mà không đánh mất:

engineering discipline.

### Một Product Task tốt phải có “Done Criteria” và “Value Criteria”

Done Criteria

engineering đã hoàn thành gì?

Value Criteria

user đã nhận được gì?

Ví dụ:

Done:

import engine validates CSV.

Value:

analyst can load a month of bills without manually cleaning the file first.

Hai thứ liên quan.

Nhưng không giống nhau.

### Tôi muốn AI báo cáo cả hai

Không chỉ:

“I changed 6 files and tests pass.”

Mà:

“The requested workflow now supports X under conditions Y.”

Điều này thay đổi cách tôi review.

Tôi không chỉ review diff.

Tôi review outcome.

### Nhưng outcome claim cũng phải có evidence

AI không được tự nói:

“This saves users two hours.”

trừ khi có evidence.

Nó có thể nói:

“The workflow is designed to reduce manual steps.”

Đó là target/intent.

Nếu actual usage chứng minh:

“Users reduced time by approximately X.”

thì đó mới là observed outcome.

Một lần nữa:

Truth labels.

### Tôi bắt đầu nhìn Product Claim như một form of State

Một claim:

“Feature validated.”

không nên là một câu text.

Nó nên có:

- evidence reference;
- validation scope;
- date;
- current version.
Nếu không, claim nhanh chóng trở thành folklore.

### Đây cũng là cách chống AI Hallucination ở cấp Product

AI có thể hallucinate:

“Customers love this.”

Nếu system yêu cầu:

evidence.

thì claim sẽ bị chặn.

AI có thể nói:

“This workflow is production ready.”

System hỏi:

evidence?

Nếu không có:

BLOCK.

Đó là cách engineering controls chống confidence sai.

### Tôi muốn AI có quyền đề xuất, không có quyền tự tạo Product

Truth

Đây là câu rất gần với toàn bộ architecture.

AI:

Generate.

AI:

Analyze.

AI:

Recommend.

AI:

Implement.

AI:

Verify where authorized.

Nhưng:

Product Truth must be established by evidence and authority.

### Tôi bắt đầu hiểu sâu hơn về “Controlled Autonomy”

Controlled Autonomy không chỉ là:

“AI không được drop database.”

Nó còn là:

“AI không được tự biến một assumption thành product requirement.”

Đây là một tầng governance cao hơn.

AI có thể khám phá.

Nhưng không tự biến discovery thành policy.

### Product Scope cũng cần Least Privilege

Một task:

“Implement import validation.”

không được tự động mở rộng thành:

“Redesign import workflow.”

Đó là Scope Least Privilege.

AI chỉ được quyền thay đổi những gì cần để hoàn thành authorized outcome.

### Tôi muốn “Task Boundary” và “Product Boundary” khớp nhau

Một engineering task tốt không nên tạo ra thay đổi vượt product scope.

Ví dụ:

Product scope:

support CSV import.

Task scope:

parser + validation.

Không nên đột nhiên:

redesign customer model.

Trừ khi change đã được authorize.

### Điều này làm AI dễ kiểm soát hơn rất nhiều

Càng cụ thể:

WHO

WHY

OUTCOME

SCOPE

CONSTRAINT

ACCEPTANCE

thì AI càng ít phải đoán.

Và AI càng ít phải đoán:

verification càng dễ.

Đây là một chain rất mạnh:

Clear Product Intent

```text
↓
```

Clear Requirement

```text
↓
```

Clear Task

```text
↓
```

Clear Context

```text
↓
```

Better Execution

```text
↓
```

Better Verification

### Product Engineering không chống AI. Nó làm AI hữu dụng hơn.

Đây là điều tôi muốn khẳng định.

Nếu requirement mơ hồ:

AI output nhiều, usefulness thấp.

Nếu requirement rõ:

AI output ít hơn nhưng chính xác hơn.

Tôi không cần AI “nói nhiều”.

Tôi cần AI:

làm đúng phần product cần.

### Tôi không muốn prompt trở thành nơi Product Strategy bị chôn

Product decision nên tồn tại trong product artifacts.

Không:

“AI remembers that I wanted the customer flow to work this way.”

Mà:

requirement artifact.

product decision artifact.

current product context.

state.

Đây chính là continuity ở cấp product.

### Product Memory

Nếu gọi theo ngôn ngữ đơn giản:

project phải nhớ product decisions.

Ví dụ:

- target users;
- core workflows;
- accepted behavior;
- rejected ideas;
- current scope;
- known limitations.
AI mới phải biết chúng.

Không cần hỏi tôi lại mọi lần.

## TỪ VIBE CODING ĐẾN PRODUCT ENGINEERING

### Một AI không có Product Context có thể viết code rất đẹp và vẫn phá product

Đây là điều mà tôi muốn người đọc nhớ.

AI có thể:

clean code.

good architecture.

nice UI.

excellent tests.

Nhưng nếu requirement sai:

tất cả đều có thể là một cách rất hiệu quả để xây nhầm thứ.

Đó là lý do:

Product Intent precedes AI Execution.

### Tôi muốn giữ một chuỗi duy nhất

Cuối cùng, Product Engineering trong cách tôi nhìn có thể được rút lại thành:

USER PROBLEM

```text
↓
```

PRODUCT OUTCOME

```text
↓
```

REQUIREMENT

```text
↓
```

TASK

```text
↓
```

AUTHORIZATION

```text
↓
```

CONTEXT

```text
↓
```

AI EXECUTOR

```text
↓
```

CHANGE

```text
↓
```

EVIDENCE

```text
↓
```

VERIFICATION

```text
↓
```

RELEASE

```text
↓
```

USER

```text
↓
```

OBSERVATION

```text
↓
```

PRODUCT VALIDATION

Nếu một mắt xích biến mất, tôi cần biết mình đang thiếu gì.

### Đây là một vòng lặp, không phải một pipeline một chiều

Sau Product Validation:

Observation

```text
↓
```

Learning

```text
↓
```

New Product Requirement

Rồi quay lại:

Requirement

```text
↓
```

Task

```text
↓
```

Execution

Đó là vòng đời thật.

Product không:

build once.

Product:

learns continuously.

### Và AI làm vòng đời đó rẻ hơn rất nhiều

Prototype nhanh hơn.

Analysis nhanh hơn.

Implementation nhanh hơn.

Testing nhanh hơn.

Documentation nhanh hơn.

Iteration nhanh hơn.

Điều đó rất lớn.

Nhưng chính vì iteration rẻ, tôi cần Product Governance để quyết định:

iteration nào đáng tiếp tục.

### Tôi không muốn tối ưu tốc độ đến mức mất phương hướng

Đây là một câu tôi tự nhắc mình:

Speed without direction is acceleration, not progress.

AI có thể tăng tốc.

Product Intent quyết định hướng.

Engineering Method quyết định cách đi.

Verification quyết định tôi có đi đúng không.

User outcome quyết định điểm đến có đáng không.

### EnerixFin là nơi tôi kiểm tra tất cả những điều này

EnerixFin cho tôi một environment rất thực tế để quan sát:

AI coding.

Engineering workflow.

Product workflow.

Technical analysis.

Economics.

Investment support.

User reality.

Tôi không xem nó như bằng chứng rằng mọi thứ đã được giải quyết.

Tôi xem nó như:

engineering laboratory in the real world.

Tôi xây.

Tôi observe.

Tôi đo.

Tôi học.

Tôi thay đổi.

### Tôi không muốn copy nguyên xi những gì học được sang một

hệ thống tương lai

Đây cũng là một bài học quan trọng.

Nếu một workflow hoạt động tốt trên EnerixFin, điều đó không có nghĩa architecture tương lai

phải copy 100%.

Tôi muốn:

Observe

```text
↓
```

Measure

```text
↓
```

Learn

```text
↓
```

Validate

```text
↓
```

Extract

```text
↓
```

Redesign

Chỉ những lessons đã được validate mới trở thành reusable principle.

Đó là cách tránh biến prototype thành dogma.

### Product Engineering làm tôi hiểu vì sao “AI as Programmer” là chưa đủ

AI programmer:

viết code.

AI Engineering Executor:

thực hiện task trong context và governance.

Product Engineering system:

xác định vì sao task tồn tại và outcome nào cần đạt.

Ba tầng này khác nhau.

Product Intent

```text
↓
```

Engineering System

```text
↓
```

AI Executor

AI nằm bên trong.

Không nằm ở trên cùng.

### Tôi không muốn AI trở thành Product Owner của chính sản phẩm

AI có thể:

recommend roadmap.

AI có thể:

analyze usage.

AI có thể:

suggest features.

Nhưng final product direction phải có owner.

Bởi vì product direction liên quan tới:

- strategy;
- customer;
- money;
- risk;
- responsibility.
Đó là authority.

### Đây là lúc tôi bắt đầu hiểu “Human-in-the-loop” một cách tốt

hơn

Tôi không cần human ngồi nhìn mọi dòng code.

Human cần tham gia ở:

những nơi judgment có consequence.

Ví dụ:

- product scope;
- major business rule;
- architecture;
- release;
- critical financial logic;
- security;
- unresolved ambiguity.
AI có thể tự động hóa phần còn lại trong boundary.

Đó là một cách hiệu quả hơn nhiều so với:

human approves everything.

### AI không cần permission cho mọi dòng code. AI cần permission cho những thay đổi có ý nghĩa

Đây là một distinction rất quan trọng.

Không micro-manage AI.

Nhưng cũng không:

“AI đã access project rồi thì làm gì cũng được.”

Authority phải nằm ở:

task;

scope;

state transition;

risk.

### Tôi bắt đầu nhìn task như một Product Contract

Một task tốt phải trả lời:

Why

What

For whom

Scope

Not Scope

Rules

Acceptance

Evidence

Authority

Stop Condition

Khi đủ rõ, AI có rất ít khoảng trống để “sáng tạo sai chỗ”.

### Product Engineering làm rõ vai trò của Creativity

AI creativity rất hữu ích ở:

alternatives.

prototypes.

wording.

designs.

solution exploration.

Nhưng creativity phải được chuyển thành commitment qua:

evaluation.

evidence.

authority.

Đây là cách tôi giữ creativity mà không để nó phá product consistency.

### Tôi không muốn giết sự ngẫu hứng

Một trong những lý do tôi thích Vibe Coding là:

nó cho phép tôi thử.

Tôi không muốn biến AI Engineering thành một quá trình khô cứng.

Tôi chỉ muốn:

ngẫu hứng ở edge, kỷ luật ở core.

Đó là một trong những nguyên tắc xuyên suốt cuốn sách này.

### Product Core cần chậm hơn Product Edge

Ở edge:

experiment.

Ở core:

invariants.

Ở edge:

prototype.

Ở core:

verified capability.

Ở edge:

nhiều alternatives.

Ở core:

one authorized truth.

Đó là cách tôi nghĩ về:

Vibe Fast at the Edge. Engineer Carefully at the Core.

### Tôi muốn người đọc đừng sợ việc xóa code

AI làm build rẻ.

Điều đó nghĩa:

delete cũng phải rẻ.

Một prototype không còn phù hợp:

bỏ.

Một feature không tạo value:

deprecate.

Một workflow gây confusion:

redesign.

Không phải mọi code đã viết đều đáng bảo vệ.

Code ownership không được cao hơn product value.

### Product Engineering có quyền nói “No”

Đây có thể là một trong những kỹ năng khó nhất.

Không xây feature này.

Không merge prototype này.

Không release change này.

Không tiếp tục architecture này.

Không tự động hóa bước này.

Không dùng AI ở đây.

“No” không phải chống tốc độ.

Nó bảo vệ direction.

### Tôi bắt đầu thấy Product Discipline là một dạng Cost Control

Mỗi feature không xây được là:

cost saved.

Mỗi abstraction không cần thiết là:

complexity avoided.

Mỗi workflow không cần thiết là:

support avoided.

Mỗi bad requirement bị loại sớm là:

rework avoided.

AI làm coding cheaper.

Product discipline làm waste cheaper bằng cách loại bỏ waste trước khi nó trở thành code.

### Và đó là cách tôi muốn dùng AI

Không:

“AI build everything.”

Mà:

AI makes validated product decisions cheaper to implement and revise.

Đó là một cách đặt AI đúng vị trí.

### Tôi quay lại câu hỏi đầu chương

AI có đang xây sản phẩm không?

Câu trả lời của tôi là:

Một mình AI thì không.

AI có thể viết rất nhiều code.

AI có thể xây rất nhiều capability.

AI có thể giúp một người xây nhanh hơn rất nhiều.

Nhưng một product cần:

- problem;
- user;
- outcome;
- requirements;
- constraints;
- business rules;
- evidence;
- verification;
- release;
- observation;
- validation.
AI có thể tham gia vào gần như tất cả những bước đó.

Nhưng nó không tự động sở hữu:

product intent và product authority.

### Cách tôi muốn AI tham gia vào Product Engineering

Tôi hình dung:

HUMAN / PRODUCT INTENT

```text
↓
```

PRODUCT CONTEXT

```text
↓
```

REQUIREMENT

```text
↓
```

ENGINEERING TASK

```text
↓
```

AUTHORITY

```text
↓
```

CONTEXT COMPILER

```text
↓
```

AI EXECUTOR

```text
↓
```

CHANGE

```text
↓
```

EVIDENCE

```text
↓
```

VERIFICATION

```text
↓
```

RELEASE

```text
↓
```

USER OUTCOME

```text
↓
```

LEARNING

AI ở giữa.

Nhưng product ở đầu.

User ở cuối.

Và learning quay trở lại đầu.

### Đó mới là “AI building a product”

Không phải:

AI generated 100,000 lines of code.

Mà:

AI helped move a real user problem toward a verified outcome.

Đó là một tiêu chuẩn hoàn toàn khác.

### Reality Check

Có một điều tôi muốn nói thẳng.

Không phải mọi product problem đều cần AI.

Không phải mọi feature đều cần agent.

Không phải mọi workflow đều cần automation.

Không phải mọi codebase đều cần orchestration.

Đôi khi:

một form tốt hơn một agent.

Một SQL query tốt hơn một model call.

Một deterministic calculation tốt hơn một LLM.

Một checklist tốt hơn một autonomous workflow.

AI Engineering không phải:

maximize AI usage.

Nó là:

maximize useful outcomes with appropriate engineering means.

### Tôi đã học được gì từ việc nhìn Product thay vì Code?

Tôi học được rằng code rất dễ tạo cảm giác tiến bộ.

Product progress khó hơn để đo.

AI làm khoảng cách này lớn hơn.

Vì AI có thể tạo output nhanh đến mức:

tôi quên hỏi output đó đang dẫn tới đâu.

Vì vậy tôi muốn luôn quay về:

User → Problem → Outcome.

### Nếu hôm nay tôi bắt đầu một feature mới

Tôi sẽ không bắt đầu bằng:

“Gemini, build me a feature.”

Tôi sẽ bắt đầu bằng:

Product Intent

Ai?

Vấn đề gì?

Outcome gì?

Requirement

Cụ thể cần behavior nào?

Scope

Bao gồm gì?

Không bao gồm gì?

Acceptance

Thế nào là đạt?

Evidence

Tôi cần chứng minh gì?

Task

AI phải làm phần nào?

Authority

Nó được phép làm đến đâu?

Verification

Tôi sẽ xác nhận thế nào?

Đó là cách tôi muốn dùng AI.

### Và tôi nhận ra đây chính là “Beyond Vibe Coding”

Không phải bỏ Vibe Coding.

Không phải sợ AI.

Không phải quay lại cách lập trình cũ.

Mà là:

đưa Vibe Coding vào trong một hệ thống product engineering có kiểm soát.

Tôi vẫn có thể:

nói tự nhiên.

thử nhanh.

prototype.

iterate.

để AI viết code.

Nhưng tôi biết:

mình đang xây cái gì;

vì sao xây;

khi nào dừng;

chứng minh thế nào;

khi nào release;

và user cần nhận được gì.

---

WHAT I LEARNED

AI có thể giúp tôi tạo code nhanh hơn rất nhiều.

Nhưng code không phải product.

Một feature không phải một outcome.

Một test pass không phải một user validation.

Một build thành công không phải một release thành công.

Một release thành công cũng chưa chắc là một product thành công.

Tôi bắt đầu nhìn product theo chuỗi:

User Problem → Product Outcome → Requirement → Task → Execution →

Verification → Release → User Outcome → Learning.

AI có thể tham gia vào gần như toàn bộ chuỗi đó.

Nhưng tôi không muốn AI tự quyết định chuỗi đó.

Tôi muốn AI làm việc bên trong một system có:

context;

authority;

evidence;

state;

governance.

Và tôi muốn giữ một nguyên tắc rất đơn giản:

AI can optimize how we build. Humans still need to care about what is worth

building.

Đó là lý do tôi không còn chỉ nhìn vào:

“AI viết được bao nhiêu code?”

Tôi nhìn vào:

“AI đã giúp tôi đưa người dùng đến một kết quả tốt hơn chưa?”

CHUYỂN TIẾP

Tôi đã học cách để AI không chỉ viết code.

Tôi đã học cách để AI làm việc theo task.

Tôi đã xây context.

Tôi xây state.

Tôi xây continuity.

Tôi học cách dùng nhiều executor.

Tôi bắt đầu nhìn product thay vì chỉ nhìn code.

Nhưng khi sản phẩm thực sự được đưa tới người dùng, tôi gặp một vấn đề mà không có

architecture diagram nào che được.

AI có thể nói:

“Đã hoàn thành.”

Git có thể nói:

“Commit thành công.”

Test có thể nói:

“Pass.”

Production có thể nói:

“Running.”

Nhưng rồi một người dùng thực tế mở sản phẩm...

và làm một thứ hoàn toàn khác với điều tôi dự đoán.

Một dữ liệu đặc biệt.

Một workflow bất thường.

Một permission sai.

Một assumption sai.

Một lỗi mà test chưa từng chạm tới.

Một tình huống mà AI không biết là nó tồn tại.

Tôi bắt đầu hiểu:

Những lỗi nguy hiểm nhất không phải lúc nào cũng là lỗi AI nhìn thấy.

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 14 - AI CÓ THỂ VIẾT CODE. NHƯNG AI CÓ ĐANG XÂY SẢN PHẨM KHÔNG?
├── CODE PROGRESS KHÔNG PHẢI PRODUCT PROGRESS
├── PRODUCT INTENT, SCOPE VÀ WORKFLOW
├── PRODUCT STATE, VALIDATION VÀ EVIDENCE
├── PRODUCT GOVERNANCE, AUTHORITY VÀ CONTROLLED AUTONOMY
└── TỪ VIBE CODING ĐẾN PRODUCT ENGINEERING

Navigation metadata only. It does not control PDF coordinates or typography.
-->
