---
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
---

# CHƯƠNG 8

# AI KHÔNG NÊN TỰ ĐIỀU KHIỂN PROJECT

*Từ tự động hóa đến Controlled Autonomy: AI có thể làm rất nhiều, nhưng quyền quyết định vẫn phải thuộc về đúng nơi*

Ở cuối chương trước, tôi đã đi đến một kết luận tưởng như rất đơn giản: One Method. Multiple Executors. One Project.

Tôi có thể có nhiều AI. Tôi có thể thay đổi executor. Project vẫn tiếp tục miễn là method, state, governance và verification còn được giữ ổn định.

Nhưng chính lúc đó một câu hỏi khác xuất hiện.

Nếu AI đã có context, đã có state và đã có capability, vậy tại sao tôi không để AI tự quyết định project phải làm gì tiếp theo?

Câu hỏi này rất hấp dẫn. Và cũng rất nguy hiểm.

Bởi vì từ “có thể làm” đến “được phép quyết định” là một khoảng cách rất lớn.

## TÔI TỪNG NGHĨ TỰ ĐỘNG HÓA CÀNG NHIỀU CÀNG TỐT

Nếu AI có thể đọc project, tại sao không để AI tự tìm task tiếp theo?

Nếu AI có thể sửa code, tại sao không để AI tự sửa những gì nó phát hiện?

Nếu AI có thể chạy test, tại sao không để AI tự sửa cho đến khi test pass?

Nếu AI có thể deploy, tại sao không để AI tự deploy sau khi build thành công?

Về lý thuyết, chuỗi đó có vẻ rất hiệu quả.

AI phát hiện vấn đề.

AI quyết định cần làm gì.

AI thực hiện.

AI kiểm tra.

AI sửa tiếp.

AI release.

Một vòng lặp gần như tự vận hành.

Nhưng tôi bắt đầu tự hỏi: ai đang quyết định rằng bước tiếp theo thực sự nên được làm?

> Automation is not Authority.

Tự động hóa giúp giảm thao tác của con người. Nó không tự động tạo ra quyền quyết định.

### AI CÓ THỂ NHÌN THẤY NHIỀU HƠN KHÔNG CÓ NGHĨA AI CÓ QUYỀN LÀM NHIỀU HƠN

Một AI có thể đọc hàng trăm file.

Một AI có thể phân tích dependency graph.

Một AI có thể phát hiện một architecture smell.

Một AI có thể nhận ra một migration có thể tối ưu.

Một AI có thể nhìn thấy một security weakness.

Nhưng khả năng phát hiện không đồng nghĩa với quyền thay đổi.

Tôi bắt đầu tách hai khái niệm mà trước đây tôi thường trộn lẫn:

### CAPABILITY

Capability trả lời: AI có thể làm gì?

### AUTHORITY

Authority trả lời: AI được phép làm gì?

Hai câu hỏi này phải được giữ riêng.

Nếu không, AI càng mạnh sẽ càng trở nên khó kiểm soát.

## CAPABILITY DOES NOT CREATE AUTHORITY

> Capability does not create Authority.

Đây là một nguyên tắc mà tôi bắt đầu coi là gần như bất biến trong AI Engineering.

AI có capability đọc production data không có nghĩa task được phép đọc production data.

AI biết cách thay đổi database schema không có nghĩa nó được phép chạy migration trên production.

AI biết cách deploy không có nghĩa nó có release authority.

AI có thể đề xuất thay đổi architecture không có nghĩa architecture đó đã được chấp nhận.

AI có thể nhìn thấy một secret không có nghĩa secret đó nằm trong context được phép sử dụng.

Tôi bắt đầu coi authority là một thuộc tính được cấp theo task, governance và security boundary, không phải một đặc quyền phát sinh từ intelligence.

### TÔI BẮT ĐẦU HỎI: AI ĐANG LÀM HAY ĐANG QUYẾT ĐỊNH?

Có một distinction rất hữu ích:

AI thực hiện một quyết định đã được đưa ra.

Khác với:

AI tự quyết định project nên làm gì.

Ví dụ:

Tôi quyết định thêm một field vào schema. AI implement migration.

Tôi quyết định sửa validation. AI thay đổi service.

Tôi quyết định phát hành version 1.4. AI thực hiện deployment theo release contract.

Trong những trường hợp đó, AI đang execute.

Ngược lại, nếu AI tự quyết định:

“Tôi thấy architecture này chưa tối ưu nên tôi sẽ thay đổi.”

hoặc:

“Tôi thấy production đang chạy version cũ nên tôi sẽ deploy version mới.”

thì AI đã bước từ execution sang decision-making.

Đó là một boundary rất khác.

### DISCOVERY, PROPOSAL VÀ EXECUTION

Để kiểm soát boundary này, tôi bắt đầu tách công việc thành ba lớp.

**DISCOVERY**

Tìm hiểu, đọc, phân tích, phát hiện vấn đề. Không tự động tạo quyền thay đổi.

**PROPOSAL**

Đề xuất phương án dựa trên discovery và context. Proposal chưa phải authorization.

**EXECUTION**

Thực hiện một change đã được authorized theo Execution Contract.

Một AI có thể làm discovery rộng.

Có thể tạo proposal chi tiết.

Nhưng execution phải chịu constraint rõ hơn.

Tách ba lớp này giúp tôi tận dụng intelligence của AI mà không biến AI thành project owner.

## CONTROLLED AUTONOMY

Tôi rất muốn AI nói cho tôi biết nó nghĩ gì.

Tôi muốn AI phát hiện rủi ro mà tôi chưa nhìn thấy.

Tôi muốn AI đưa ra nhiều phương án.

Tôi muốn AI phản biện quyết định của tôi.

Nhưng proposal và decision phải được tách rõ.

AI có thể nói:

> “Tôi đề xuất thay đổi cách xử lý authentication vì cách hiện tại tạo ra một risk.”

Sau đó project cần một bước khác:

Review.

Decision.

Authorization.

Chỉ sau đó mới tới execution.

Điều này đặc biệt quan trọng với architecture, security, data migration, production configuration và release.

Controlled Autonomy nghĩa là AI được tự quyết trong phạm vi đã được authorized, với context phù hợp, stopping condition rõ và verification tương ứng.

AI có thể tự chọn cách implement bên trong boundary.

AI có thể chọn thứ tự các bước implementation.

AI có thể tự xử lý những lỗi routine nằm trong scope.

AI có thể tự chạy các test được phép.

Nhưng AI không được tự mở rộng scope.

Không được tự thay authority.

Không được tự thay governance.

Không được tự release nếu không có release authority.

Tôi bắt đầu coi autonomy như một vùng được cấp phép, không phải một đặc tính tự nhiên của model.

### AUTONOMY KHÔNG PHẢI ON / OFF

Tôi từng nghĩ có hai trạng thái:

AI tự động.

Hoặc AI không tự động.

Nhưng thực tế có nhiều mức hơn.

**M0 - ASSISTED**

AI chỉ phân tích và đề xuất. Con người thực hiện.

**M1 - EXECUTE WITH BOUNDS**

AI được thực hiện task trong scope rõ ràng.

**M2 - CONTROLLED AUTONOMY**

AI được tự quyết trong boundary với verification bắt buộc.

**M3 - MULTI-STEP AUTONOMY**

AI có thể thực hiện chuỗi bước đã được authorized, nhưng vẫn chịu checkpoint và gate.

**M4 - CRITICAL CONTROLLED**

Các task critical yêu cầu explicit human authority ở các decision point quan trọng.

Tôi không dùng autonomy level để đánh giá model “thông minh” đến đâu.

Tôi dùng nó để biểu thị project cho phép AI tự quyết đến đâu.

### RISK PHẢI QUYẾT ĐỊNH AUTONOMY

Task R0 có thể cho AI nhiều autonomy hơn.

Task R1 vẫn có thể để AI execute gần như hoàn toàn trong scope.

Task R2 cần verification và có thể cần review.

Task R3 cần authority chặt hơn và blast radius nhỏ hơn.

Task R4 phải có controlled execution với human authority rõ ràng.

> Risk should shape Autonomy.

Không phải task nào cũng cần cùng một mức kiểm soát.

Và không phải AI nào cũng nên được cấp cùng một mức quyền, ngay cả khi cùng một model.

## TÔI BẮT ĐẦU XÂY “PERMISSION TO ACT”

Execution Contract cần trả lời thêm câu hỏi:

AI được phép làm đến đâu?

Nó có thể đọc gì?

Nó có thể ghi gì?

Nó có thể chạy command nào?

Nó được phép thay đổi dependency không?

Nó có được truy cập database không?

Nó có được chạm production không?

Khi phát hiện một vấn đề ngoài scope, nó phải làm gì?

Khi verification fail, nó được phép retry bao nhiêu lần?

Khi gặp ambiguity, nó phải stop hay có thể chọn một assumption?

Những câu hỏi này biến một task từ “instruction” thành “controlled execution contract”.

### STOP CONDITIONS LÀ MỘT TÍNH NĂNG

Tôi bắt đầu nhận ra stopping condition quan trọng không kém task objective.

Một AI không có stop condition có thể tiếp tục cải thiện một thứ không cần cải thiện.

Nó có thể refactor thêm.

Tối ưu thêm.

Đổi cấu trúc thêm.

Tạo thêm test.

Và cuối cùng làm thay đổi nhiều hơn mục tiêu ban đầu.

Một stopping condition tốt cho AI biết:
khi nào đã đạt acceptance criteria;
khi nào không được tiếp tục;
khi nào phải chuyển sang human decision;
và khi nào phải tạo follow-up task thay vì tự mở rộng task hiện tại.

### SCOPE DRIFT LÀ DẤU HIỆU AI ĐANG ĐI QUÁ XA

Tôi bắt đầu quan sát scope drift như một failure mode riêng.

Task ban đầu là sửa validation.

AI phát hiện một service có thể refactor.

Sau đó nó thấy repository pattern chưa đồng nhất.

Rồi nó muốn thay luôn error handling.

Cuối cùng một task nhỏ trở thành một architecture change.

Tôi không nói AI không nên phát hiện những vấn đề đó.

Ngược lại, tôi muốn AI phát hiện càng tốt.

Nhưng findings ngoài scope nên trở thành:

finding,

proposal,

hoặc follow-up task.

Không tự động trở thành change.

### AI CẦN BIẾT KHI NÀO PHẢI NÓI “BLOCKED”

Đây là một behavior mà tôi đánh giá ngày càng cao.

AI không phải lúc nào cũng phải trả lời bằng một implementation.

Nếu context thiếu, AI có thể nói thiếu context.

Nếu authority không rõ, AI có thể nói blocked.

Nếu requirement mâu thuẫn, AI có thể dừng.

Nếu verification không thể thực hiện, AI có thể báo chưa verified.

Nếu task vượt scope, AI có thể tạo follow-up finding.

Một AI biết dừng đúng lúc đôi khi có giá trị hơn một AI luôn cố gắng làm tiếp.

> When critical uncertainty exists, fail closed.

Tôi không muốn “helpfulness” biến thành “unauthorized action”.

### AI KHÔNG NÊN TỰ CHỌN RELEASE

Đây là nơi Controlled Autonomy trở nên đặc biệt quan trọng.

AI có thể build.

AI có thể chạy test.

AI có thể tạo release candidate.

AI có thể chuẩn bị deployment plan.

AI có thể phân tích rollback.

Nhưng release là một decision.

Build success không phải release approval.

Deploy success không phải release approval.

AI có thể chuẩn bị rất nhiều thứ.

Nhưng production authority phải nằm ở nơi có trách nhiệm tương ứng.

### AI KHÔNG NÊN TỰ THAY GOVERNANCE

Một AI có thể thấy governance hiện tại “quá chậm”.

Một AI có thể đề xuất bỏ một gate.

Một AI có thể thấy security policy “quá nghiêm”.

Nó được phép đề xuất.

Nó không được tự sửa governance rồi tiếp tục thực hiện dưới governance mới.

Governance change là một project change có authority riêng.

Nếu governance thay đổi, baseline phải thay đổi.

Các executor tiếp theo phải biết baseline mới.

Đây là lý do tôi luôn giữ:

> Capability does not create Authority.

### AUTONOMY PHẢI GẮN VỚI EVIDENCE

Một điểm nữa tôi bắt đầu rất coi trọng:

AI không nên được cấp thêm autonomy chỉ vì nó đã làm việc lâu.

Autonomy nên tăng khi hệ thống có evidence rằng executor có thể thực hiện task đúng trong boundary.

Ví dụ:

task routine đã có lịch sử thành công;

verification tự động đáng tin cậy;

blast radius thấp;

rollback rõ;

state synchronization tốt.

Khi đó có thể cho phép nhiều autonomy hơn.

Ngược lại, một task mới hoàn toàn hoặc risk cao nên bắt đầu với autonomy thấp hơn.

> Autonomy should be earned by evidence, not granted by capability alone.

## PROJECT AUTHORITY PHẢI NẰM Ở NƠI CÓ TRÁCH NHIỆM

Có một hiểu nhầm khác tôi muốn tránh.

Controlled Autonomy không có nghĩa con người phải phê duyệt từng dòng code.

Nếu làm như vậy, chúng ta chỉ chuyển bottleneck từ coding sang approval.

Mục tiêu là để AI tự chủ ở nơi risk thấp và boundary rõ.

Con người tập trung vào decision points có consequence lớn.

Ví dụ:

AI tự sửa một typo trong module được phép.

AI tự chạy unit test.

AI tự tạo patch cho một bug đã có acceptance criteria.

Nhưng khi cần:

thay đổi authentication architecture,

chạy destructive migration,

thay production configuration,

hoặc release một phiên bản quan trọng,

thì authority phải tăng lên.

### AUTONOMY PHẢI CÓ GUARDRAILS

Guardrail là giới hạn ngăn AI vượt khỏi boundary.

Một số guardrail có thể là:

path restriction;

command allowlist;

environment restriction;

data access policy;

change-size threshold;

dependency-change prohibition;

production lock;

required verification;

human approval gate.

Guardrail không phải để làm AI chậm một cách vô ích.

Guardrail giúp AI nhanh trong vùng an toàn.

> Fast inside the boundary. Stop at the boundary.

### TÔI KHÔNG MUỐN AI TRỞ THÀNH “PROJECT MANAGER” BẤT ĐẮC DĨ

Một AI rất mạnh có thể nhìn project và tự suy ra rất nhiều việc cần làm.

Điều đó hữu ích.

Nhưng nếu AI bắt đầu tự chọn roadmap, tự ưu tiên business requirement, tự thay đổi scope và tự quyết định release, nó đã bước sang một vai trò khác.

Project management là decision domain có authority riêng.

AI có thể hỗ trợ discovery, estimation, decomposition và proposal.

Nhưng nó không nên tự biến recommendation thành authorization.

Tôi muốn AI là một thành viên cực kỳ mạnh của engineering system.

Không phải người sở hữu engineering system.

AI có thể rất giỏi.

Nhưng khi có một quyết định tạo ra consequence lớn, authority phải thuộc về nơi chịu responsibility tương ứng.

Con người có thể ủy quyền một số hành động.

Nhưng delegation không có nghĩa từ bỏ accountability.

AI có thể execute.

AI có thể recommend.

AI có thể verify một phần.

Nhưng canonical decision vẫn phải có authority rõ.

## CONTROLLED AUTONOMY LÀ CÁCH ĐỂ TÔI GIỮ CẢ HAI

Tôi không muốn quay trở lại cách làm mà con người phải tự viết từng dòng code.

Nhưng tôi cũng không muốn giao chìa khóa project cho một AI chỉ vì nó rất thông minh.

Controlled Autonomy cho phép tôi giữ cả hai lợi ích.

AI được tự do ở phần việc có boundary rõ.

Con người giữ authority ở decision points quan trọng.

Governance giữ rules.

Project State giữ current truth.

Evidence giữ proof.

Execution Contract giữ task boundary.

Checkpoint và Handoff giữ continuity.

Đó là lúc AI có thể làm rất nhiều mà project vẫn còn kiểm soát được.

### KEY IDEA

**AI càng có capability cao, tôi càng cần authority boundary rõ.**

Không phải để hạn chế AI.

Mà để biến capability thành useful autonomy thay vì uncontrolled action.

Controlled Autonomy không phải “AI làm ít hơn”.

Nó là:

AI làm nhiều hơn trong phần nó được phép làm.

AI dừng lại ở nơi authority kết thúc.

### WHAT I LEARNED

Tôi bắt đầu với câu hỏi:

> “Nếu AI đã có đủ context và capability, tại sao không để AI tự điều khiển project?”

Tôi kết thúc với một câu hỏi khác:

> “AI được phép tự quyết đến đâu, và ai có authority ở mỗi decision point?”

Từ đó tôi có một nguyên tắc rất rõ:

> Capability does not create Authority.

Và một nguyên tắc khác:

> Controlled Autonomy.

AI không cần bị giữ trong một chiếc hộp.

Nhưng chiếc hộp đó phải có ranh giới.

Và ranh giới đó phải thuộc về project, không thuộc về trí tưởng tượng của AI.

### CHUYỂN TIẾP

Tôi đã có:

Task.

Context.

Authority.

Execution Contract.

Controlled Autonomy.

AI đã có thể làm việc rất mạnh trong một boundary rõ ràng.

Nhưng vẫn còn một câu hỏi mà tôi không thể bỏ qua:

> Làm thế nào để biết AI thực sự đã làm đúng?

AI có thể nói “Done.”

AI có thể nói “Tests passed.”

AI có thể nói “Everything looks good.”

Nhưng những câu đó mới chỉ là claims.

Tôi cần evidence.

Tôi cần verification.

Và tôi cần một trạng thái mà project có thể tin được.

Đó là lúc tôi bước sang một bài toán còn khó hơn:

> CODE EXISTS ≠ VERIFIED.

Đó là câu chuyện của **Chương 9**.

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 8 - AI KHÔNG NÊN TỰ ĐIỀU KHIỂN PROJECT
├── TÔI TỪNG NGHĨ TỰ ĐỘNG HÓA CÀNG NHIỀU CÀNG TỐT
├── CAPABILITY DOES NOT CREATE AUTHORITY
├── CONTROLLED AUTONOMY
├── TÔI BẮT ĐẦU XÂY “PERMISSION TO ACT”
└── PROJECT AUTHORITY PHẢI NẰM Ở NƠI CÓ TRÁCH NHIỆM

Navigation metadata only. It does not control PDF coordinates or typography.
-->
