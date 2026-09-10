---
id: "05-controlled-autonomy"
title: "AI CÓ THỂ LÀM. NHƯNG AI CÓ ĐƯỢC PHÉP LÀM KHÔNG?"
subtitle: "Từ Task Decomposition đến Execution Contract và Controlled Autonomy"
shortTitle: "AI có được phép làm không?"
order: 5
description: "Từ Task Decomposition đến Execution Contract và Controlled Autonomy: thiết lập ranh giới kiểm soát cho AI."
readingTime: "9 min"
topics: ["Task Decomposition", "Execution Contract", "Controlled Autonomy", "Authority Boundaries", "Verification"]
hero: "images/chapter-05-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
updated: "2026-09-10"
version: "1.0.0"
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 5
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 87
source_artifact: "05.BEYOND_VIBE_CODING_CORE_BOOK_Chapter_05_draf.pdf"
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
---

<!--
CANONICAL STRUCTURED MANUSCRIPT
BVCE V3.2 governed source layer.
No PDF coordinates, page numbers, running header/footer, or pagination hacks are encoded here.
-->

CHƯƠNG 5

# AI CÓ THỂ LÀM. NHƯNG AI CÓ ĐƯỢC PHÉP LÀM KHÔNG?

*Từ Task Decomposition đến Execution Contract và Controlled Autonomy*

Ở cuối chương trước, tôi đã nói về một vấn đề mà lúc đó tôi chưa nhìn thấy hết: biết đúng context vẫn chưa đủ.

AI có thể biết project là gì. Có thể biết requirement. Có thể biết architecture. Có thể biết state.

Nhưng một câu hỏi khác vẫn còn đó:

AI được phép làm đến đâu?

Tôi bắt đầu nhận ra rằng một task tốt không chỉ cần đúng nội dung. Nó cần đúng ranh giới.

Và đó là lúc Task Decomposition, Execution Contract và Controlled Autonomy bắt đầu trở thành những khái niệm rất thực tế đối với tôi.

## MỘT TASK CÀNG LỚN, AI CÀNG PHẢI ĐOÁN NHIỀU

Tôi từng nghĩ giao một mục tiêu lớn cho AI sẽ giúp tiết kiệm thời gian.

Ví dụ: “Hãy xây toàn bộ module này.”

Nghe có vẻ hiệu quả. Một yêu cầu. Một lần thực hiện. Một kết quả.

Nhưng để làm được câu đó, AI phải tự quyết định rất nhiều thứ.

Architecture nào?

Database schema nào?

API nào?

Folder structure nào?

Naming convention nào?

Validation ra sao?

Error handling thế nào?

Testing thế nào?

Có thay đổi dependency không?

Có cần migration không?

Mỗi quyết định thêm vào là một điểm mà AI có thể hiểu khác với tôi.

Và khi tất cả quyết định đó được gom vào một task, tôi mất khả năng xác định chính xác task nào đã đúng và task nào đã sai.

Vấn đề không nhất thiết là AI không đủ thông minh.

Vấn đề là scope quá rộng.

### TASK BOUNDARY

Tôi bắt đầu coi ranh giới của task là một phần của engineering.

Task boundary quyết định AI được phép thay đổi phạm vi nào.

Nếu boundary quá rộng, verification trở nên khó.

Nếu boundary quá hẹp, overhead tăng.

Vì vậy tôi không muốn task nhỏ một cách máy móc.

Tôi muốn task đủ nhỏ để có thể hiểu, thực hiện và kiểm chứng.

Đó là một khác biệt quan trọng.

Task decomposition không phải việc chia nhỏ công việc chỉ để dễ giao cho AI.

Nó là cách biến một mục tiêu lớn thành những đơn vị engineering có thể kiểm soát.

## TASK DECOMPOSITION

Tôi bắt đầu thay đổi cách viết task.

Không phải: “Xây application.”

Mà là: “Thiết kế schema cho module X.”

Sau đó: “Implement migration cho schema đã duyệt.”

Sau đó: “Implement repository layer.”

Sau đó: “Implement service layer.”

Sau đó: “Implement API endpoint.”

Sau đó: “Viết test cho endpoint.”

Sau đó: “Verify acceptance criteria.”

Các task này có thể vẫn liên quan chặt chẽ với nhau.

Nhưng mỗi task có một stopping point rõ hơn.

AI không cần đoán toàn bộ project trong một lần.

Con người cũng không cần kiểm tra một khối thay đổi quá lớn trong một lần.

### ATOMIC ENGINEERING TASK

Tôi bắt đầu gọi những đơn vị như vậy là Atomic Engineering Task.

Atomic ở đây không có nghĩa là nhỏ nhất có thể.

Nó có nghĩa là một đơn vị công việc đủ rõ để có thể giao, thực hiện, verify và ghi nhận kết quả.

Một Atomic Engineering Task nên có một mục tiêu rõ.

Có phạm vi rõ.

Có điều kiện bắt đầu.

Có stopping condition.

Có acceptance criteria.

Có verification expectation.

Và quan trọng: có những thứ không được phép thay đổi.

### STOPPING CONDITION

Tôi rất thích khái niệm này vì nó giải quyết một vấn đề mà prompt thông thường thường bỏ qua.

AI phải biết khi nào dừng.

Nếu task là “cải thiện module này”, AI có thể tiếp tục refactor rất lâu.

Nếu task là “thêm field X vào schema và migration, không thay đổi behavior khác”, boundary đã rõ hơn.

Stopping condition giúp AI không biến một task thành một dự án mới.

Và nó cũng giúp tôi verify dễ hơn: nếu điều kiện dừng đã đạt, task có thể kết thúc.

### ACCEPTANCE CRITERIA

Tôi cũng bắt đầu coi acceptance criteria là một phần của task chứ không phải giấy tờ bổ sung sau đó.

Một acceptance criterion tốt giúp trả lời:

- Task này phải tạo ra kết quả gì?
- Điều gì chứng minh kết quả đó là đúng?
- Điều gì tuyệt đối không được thay đổi?
- Có trường hợp nào khiến task chưa được coi là hoàn thành?

Acceptance criteria không cần phải dài. Nó cần phải kiểm tra được.

### TÔI KHÔNG MUỐN AI TỰ ĐẶT LẠI MỤC TIÊU

Một AI có capability cao có thể nhìn thấy nhiều cơ hội cải thiện.

Một developer cũng vậy.

Nhưng khi task đã được authorized, AI không nên tự biến task thành một dự án khác.

Ví dụ, tôi yêu cầu sửa validation.

AI phát hiện một API cũ có thể refactor tốt hơn.

AI có thể đề xuất.

Nhưng đề xuất không có nghĩa là được phép thực hiện.

Đây là nơi tôi bắt đầu phân biệt discovery và execution.

Discovery là tìm hiểu, phân tích, phát hiện.

Execution là thực sự thay đổi project.

AI có thể được phép discovery rộng hơn execution.

Đó là một boundary rất hữu ích.

## CAPABILITY DOES NOT CREATE AUTHORITY

Đây là nguyên tắc ngày càng rõ với tôi:

Capability does not create Authority.

AI có thể làm một việc không có nghĩa AI được phép làm việc đó.

AI có thể đọc database nhưng không có nghĩa được phép sửa database.

AI có thể truy cập một file nhưng không có nghĩa được phép thay đổi file đó.

AI có thể biết cách deploy nhưng không có nghĩa có quyền release.

AI có thể đề xuất architecture nhưng không có nghĩa architecture đó đã được chấp nhận.

Authority phải đến từ task authorization và governance, không đến từ capability của model.

### ACTION SCOPE

Tôi bắt đầu nghĩ mỗi task nên có một Action Scope.

Nó mô tả AI được phép làm gì trong task đó.

Ví dụ:

:::bvc-visual{type="action-scope" id="V05-01"}
READ: allowed files
WRITE: src/module-x/**
CREATE: tests/module-x/**
EXECUTE: unit tests only
FORBIDDEN: production access
FORBIDDEN: unrelated modules
FORBIDDEN: dependency changes without authorization
:::

Đây không phải là prompt decoration. Nó là một phần của execution boundary.

### LEAST PRIVILEGE TRONG AI CODING

Tôi từng biết Least Privilege trong security.

Nhưng khi AI bắt đầu có quyền sửa project, nguyên tắc này trở nên rất thực tế.

Không phải executor nào cũng cần đọc mọi file.

Không phải executor nào cũng cần write mọi thư mục.

Không phải task nào cũng cần command execution.

Và gần như không có lý do để một task routine có quyền truy cập production.

Tôi bắt đầu nghĩ quyền của AI nên phù hợp với task.

Ít quyền hơn không làm AI kém thông minh.

Nó làm blast radius nhỏ hơn nếu AI làm sai.

### EXECUTION CONTRACT

Từ những nguyên tắc đó, tôi bắt đầu hình thành một khái niệm rõ hơn: Execution Contract.

Execution Contract là thỏa thuận kỹ thuật giữa task và executor về việc executor được phép làm gì, phải tạo ra gì, và phải dừng ở đâu.

Một contract tốt nên trả lời tối thiểu:

- Task Objective - mục tiêu cụ thể của task.
- Authorized Scope - phạm vi được phép thay đổi.
- Allowed Actions - loại hành động được phép.
- Forbidden Actions - những việc không được làm.
- Required Context - context bắt buộc.
- Acceptance Criteria - điều kiện đạt.
- Verification - cách kiểm tra.
- Stopping Condition - điều kiện kết thúc.
- Reporting - những gì executor phải báo cáo.

Tôi bắt đầu thấy Execution Contract giống như một “hợp đồng làm việc” cho AI.

### DISCOVERY ≠ EXECUTION

Tôi muốn AI có thể khám phá vấn đề mà không phải ngay lập tức thay đổi project.

Ví dụ:

> “Đọc module authentication và xác định ba rủi ro.”

Đó là discovery.

Tiếp theo:

> “Dựa trên kết quả discovery đã được review, sửa lỗi X.”

Đó là execution.

Phân biệt hai giai đoạn này giúp giảm một rủi ro lớn: AI vừa tìm hiểu vừa tự sửa mọi thứ nó nhìn thấy.

Tôi muốn AI có thể nói:

> “Tôi phát hiện vấn đề này. Tôi chưa sửa vì nó nằm ngoài scope.”

Tôi coi đó là behavior tốt, không phải failure.

## CONTROLLED AUTONOMY

Tôi không muốn AI hoàn toàn bị trói tay.

Như vậy cũng không tận dụng được sức mạnh của AI.

Tôi muốn một thứ ở giữa:

Controlled Autonomy = AI được tự quyết trong phạm vi đã được authorized, với stopping condition và verification rõ ràng.

AI được tự do bên trong boundary.

Không phải tự do bên ngoài boundary.

Đây là một distinction rất quan trọng.

### AUTONOMY LEVEL KHÔNG PHẢI MỘT CÔNG TẮC BẬT/TẮT

Tôi bắt đầu nhìn autonomy như một spectrum.

Một task R0 có thể cho AI khá nhiều tự do.

Một task R1 có thể cho AI tự thực hiện implementation nhưng phải verify.

Một task R2 cần thêm review hoặc giới hạn scope.

Một task R3 có thể yêu cầu human approval trước những thay đổi quan trọng.

Một task R4 gần như không nên tự động hoàn toàn.

Điều đó dẫn đến một nguyên tắc:

Autonomy should be earned by evidence, not granted by model capability alone.

### RISK SHOULD SHAPE AUTONOMY

Risk càng cao, autonomy phù hợp càng thấp nếu evidence và control không đủ mạnh.

Ngược lại, task routine và low-risk không nhất thiết cần con người kiểm tra từng dòng.

Tôi không muốn human-in-the-loop trở thành một excuse để con người phải đọc mọi thứ.

Tôi muốn human authority tập trung vào những quyết định có consequence.

### TASK RISK VÀ TASK DESIGN

Task risk không chỉ dùng để chọn AI.

Nó còn ảnh hưởng đến cách thiết kế task.

Task R0 có thể đơn giản.

Task R3 cần boundary rõ hơn, evidence rõ hơn và approval rõ hơn.

Task R4 có thể cần tách thành discovery trước, decision sau, implementation cuối cùng.

Từ đó tôi bắt đầu thấy một vòng lặp:

:::bvc-visual{type="flow" id="V05-02"}
TASK
CLASSIFY RISK
DEFINE SCOPE
DEFINE EXECUTION CONTRACT
SELECT AUTONOMY LEVEL
EXECUTE
VERIFY
:::

### AI CẦN BIẾT KHI NÀO KHÔNG NÊN TIẾP TỤC

Đây có lẽ là một trong những behavior quan trọng nhất tôi muốn AI có.

Một AI tốt không phải là AI luôn làm tiếp.

Một AI tốt là AI biết khi nào phải dừng.

Ví dụ:

Context không đủ.

Requirement mâu thuẫn.

Authority không rõ.

Scope không rõ.

Task vượt quyền.

Verification không khả thi.

Có nguy cơ làm hỏng dữ liệu.

Trong các trường hợp đó, tôi không muốn AI đoán.

Tôi muốn AI báo BLOCKED hoặc yêu cầu clarification.

### FAIL CLOSED

Đây là lúc nguyên tắc fail closed trở nên thực tế.

Nếu critical uncertainty tồn tại và không có cách giải quyết đáng tin cậy, execution dừng.

Chậm một task tốt hơn xây tiếp trên một assumption sai.

Điều này đặc biệt quan trọng với security, database, architecture và production.

### AI KHÔNG NÊN TỰ MỞ RỘNG SCOPE

Một failure mode rất dễ xảy ra là scope drift.

Task bắt đầu nhỏ.

AI phát hiện thêm một vấn đề.

Sửa vấn đề đó.

Phát hiện vấn đề khác.

Sửa tiếp.

Cuối cùng task ban đầu trở thành một refactor lớn.

Từ đó, tôi bắt đầu coi scope drift là một signal cần được kiểm soát.

Nếu phát hiện việc ngoài scope, AI có thể ghi nhận thành finding hoặc follow-up task.

Nhưng không tự tiện thực hiện.

### REPORTING CŨNG LÀ MỘT PHẦN CỦA EXECUTION

Tôi bắt đầu yêu cầu executor không chỉ sửa code mà còn phải báo cáo thay đổi.

Không cần một bài luận dài.

Chỉ cần biết:

- What changed?
- Why did it change?
- What was not changed?
- What was verified?
- What remains unresolved?
- What should happen next?

Điều này tạo một cầu nối rất quan trọng giữa execution và continuity.

### TASK RECORD VÀ ENGINEERING RUN

Mỗi task không tồn tại độc lập với Engineering Run.

Một Run có thể thực hiện nhiều task.

Một task có thể kéo dài qua nhiều Run.

Vì vậy tôi không muốn task state sống chỉ trong chat.

Nó phải được ghi nhận trong project state và continuity artifacts.

Khi Run kết thúc, task phải biết:

- Task status
- Changes made
- Verification status
- Evidence
- Open blockers
- Next action
- Checkpoint / handoff reference

## TASK DECOMPOSITION KHÔNG CHỈ GIẢM RỦI RO. NÓ TĂNG TỐC

Toàn bộ điều này ban đầu nghe có vẻ làm chậm tôi.

Thêm task definition.

Thêm acceptance criteria.

Thêm scope.

Thêm verification.

Thêm checkpoint.

Nhưng thực tế lại ngược lại.

Khi task rõ hơn, AI ít phải đoán.

Khi scope nhỏ hơn, AI ít sửa lan.

Khi acceptance criteria rõ hơn, tôi ít phải tranh luận lại.

Khi verification sớm hơn, tôi ít rework hơn.

Khi state được ghi lại, Run sau ít phải recovery hơn.

Và khi những thứ đó giảm, tổng thời gian completion giảm.

### TÔI BẮT ĐẦU ĐO REWORK

Tôi nhận ra một metric rất thực dụng: Rework Ratio.

Không cần một công thức phức tạp.

Chỉ cần quan sát bao nhiêu effort được dùng để sửa những thay đổi trước đó thay vì tạo ra progress mới.

AI có thể tạo rất nhiều code.

Nhưng nếu phần lớn thời gian sau đó là sửa code do task quá rộng hoặc context quá mơ hồ, tốc độ ban đầu không còn nhiều ý nghĩa.

Task Decomposition là một cách trực tiếp để giảm loại chi phí này.

### EXECUTION CONTRACT CÀNG CHI TIẾT CÀNG TỐT

Execution Contract cũng có tác động kinh tế.

Contract rõ giúp giảm scope drift.

Giảm scope drift giúp giảm rework.

Giảm rework giúp giảm human time và AI usage.

Giảm context recovery giúp giảm switching cost.

Vì vậy một contract tốt không chỉ là governance.

Nó cũng là cost control.

### TÔI MUỐN AI LÀM NHIỀU VIỆC - NHƯNG KHÔNG ĐƯỢC TỰ Ý LÀM MỌI VIỆC

Đây là nuance mà tôi muốn giữ.

Tôi không muốn giảm AI thành một tool chỉ trả lời câu hỏi.

Tôi muốn AI thực sự xây software.

Nhưng tôi cũng không muốn AI trở thành người tự quyết định toàn bộ project.

Tôi muốn:

### CONTROLLED AUTONOMY THAY VÌ BLIND AUTONOMY

Blind autonomy là:

> “AI có quyền làm, vì AI có thể làm.”

Controlled autonomy là:

> “AI có quyền làm trong một boundary đã được xác định, với context, authority, stopping condition và verification phù hợp.”

Khoảng cách giữa hai cách này chính là engineering control.

### KEY IDEA

AI không cần được tự do làm mọi thứ. AI cần đủ tự do để làm đúng phần việc đã được authorized.

Một task tốt có boundary. Một executor tốt có contract. Một hệ thống tốt có control. Và một AI tốt phải biết khi nào nên dừng.

### WHAT I LEARNED

Tôi bắt đầu với một suy nghĩ rất đơn giản: nếu AI mạnh thì hãy giao cho AI càng nhiều việc có thể.

Sau đó tôi nhận ra điều quan trọng hơn: không phải AI có thể làm bao nhiêu, mà là AI được phép làm phần nào và làm đến đâu.

Task Decomposition giúp tôi thu nhỏ problem.

Execution Contract giúp tôi định nghĩa boundary.

Controlled Autonomy giúp AI có đủ tự do để thực hiện mà không trở thành người tự quyết định project.

Và tất cả những thứ đó đưa tôi đến một câu hỏi tiếp theo.

AI đã nói “Done”. Nhưng tôi có tin không?

### TRY THIS

Trước khi giao một task quan trọng cho AI, tôi thường tự hỏi tám câu hỏi rất đơn giản:

- Mục tiêu cụ thể là gì?
- AI được phép thay đổi phần nào?
- AI không được phép thay đổi phần nào?
- Context bắt buộc là gì?
- Khi nào task được coi là hoàn thành?
- Tôi sẽ verify kết quả bằng cách nào?
- Nếu AI phát hiện vấn đề ngoài scope thì nó phải làm gì?
- Nếu AI dừng giữa chừng, executor tiếp theo cần biết điều gì?

Tám câu hỏi này không phải một thủ tục nặng nề. Chúng chỉ là cách tôi buộc một task trở nên rõ ràng trước khi execution bắt đầu.

Càng làm nhiều với AI, tôi càng thấy một nghịch lý: một vài phút chuẩn bị có thể tiết kiệm hàng giờ rework. Task rõ hơn, AI ít đoán hơn. Scope rõ hơn, AI ít sửa lan hơn. Verification rõ hơn, tôi ít tranh luận với chính mình về việc “đã xong chưa”.

### CHUYỂN TIẾP

Tôi đã học cách chia task.

Tôi đã học cách định nghĩa scope.

Tôi đã học cách giới hạn quyền của AI.

Tôi đã học cách để AI biết khi nào phải dừng.

Nhưng đến đây tôi gặp một vấn đề khó hơn:

AI nói rằng task đã xong. Nhưng bằng chứng đâu?

Đó là lúc tôi bắt đầu nhìn verification không còn là bước cuối cùng của coding, mà là một phần của engineering state.

Và đó là câu chuyện của Chương 6.

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 5 - AI CÓ THỂ LÀM. NHƯNG AI CÓ ĐƯỢC PHÉP LÀM KHÔNG?
├── MỘT TASK CÀNG LỚN, AI CÀNG PHẢI ĐOÁN NHIỀU
├── TASK DECOMPOSITION
├── CAPABILITY DOES NOT CREATE AUTHORITY
├── CONTROLLED AUTONOMY
└── TASK DECOMPOSITION KHÔNG CHỈ GIẢM RỦI RO. NÓ TĂNG TỐC

Navigation metadata only. It does not control PDF coordinates or typography.
-->
