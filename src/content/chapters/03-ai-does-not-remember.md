---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
id: "03-ai-does-not-remember"
chapter: 3
order: 3
title: "AI KHÔNG NHỚ PROJECT CỦA BẠN"
shortTitle: "AI không nhớ project của bạn"
subtitle: "Từ AI Memory đến Project Knowledge, Project State, Checkpoint và Continuity"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 57
source_page_count: 32
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
description: "Why thinking of AI as a persistent assistant is an architectural mistake, and how to design around statelessness."
readingTime: "6 min"
topics: ["context windows", "statelessness", "memory", "documentation"]
published: "2026-09-10"
version: "1.0.0"
---

<!--
BVCE CANONICAL MARKDOWN
This is the semantic manuscript layer reconstructed from the supplied Chapter 03 PDF.
PDF headers, footers, page numbers, pagination-only hard wraps and geometry are not canonical content.
Reader-visible wording is preserved; no substantive rewriting is performed.
-->

# CHƯƠNG 3

# AI KHÔNG NHỚ PROJECT CỦA BẠN

*Từ AI Memory đến Project Knowledge, Project State, Checkpoint và Continuity*

Ở cuối chương trước, tôi đã nghĩ mình đã giải quyết được một phần quan trọng của bài toán.

Tôi không cần AI mạnh nhất.

Tôi cần AI phù hợp với task.

Nếu một AI đủ tốt thì dùng.

Nếu chưa đủ thì chuyển sang AI khác.

Nếu task có risk cao thì ưu tiên capability, security và verification.

Nếu AI hết quota thì tìm một executor khác.

Nghe có vẻ hợp lý.

Nhưng rồi tôi gặp một vấn đề mà lúc đầu tôi không nghĩ sẽ quan trọng đến thế.

Một AI khác có thể làm task.

Nó không biết project của tôi là gì.

### AI CÓ THỂ THÔNG MINH NHƯNG VẪN KHÔNG BIẾT PROJECT

Hãy tưởng tượng tôi làm việc với AI A vào buổi sáng.

Tôi nói về project.

Tôi giải thích requirement.

Tôi trao đổi về architecture.

Tôi sửa một số file.

Tôi chạy test.

Tôi đưa ra vài quyết định.

Tôi thay đổi database.

Tôi phát hiện một bug.

Tôi sửa bug đó.

AI A hiểu dần project hơn qua quá trình làm việc.

Đến buổi chiều, quota hết.

Tôi mở AI B.

Tôi nói:

> “Hãy tiếp tục project.”

AI B có thể rất mạnh.

Có thể mạnh hơn AI A.

Có thể reasoning tốt hơn.

Có thể code tốt hơn.

Nhưng nó hỏi:

> “Project là gì?”

Và lúc đó tôi nhận ra:

Tôi đang nhầm giữa AI biết nhiều thứ và AI biết project của tôi.

Hai việc đó hoàn toàn khác nhau.

Một AI có thể biết rất nhiều về programming.

Nhưng nó không tự động biết:

• project đang ở đâu,
• đã quyết định gì,
• file nào vừa thay đổi,
• bug nào đang unresolved,
• requirement nào đã hoàn thành,
• requirement nào chưa,
• vì sao architecture được chọn,
• cái gì không được phép thay đổi,
• và bước tiếp theo phải là gì.

<!-- BVCE_NAV: MAJOR_TOPIC_1 -->

## TÔI TỪNG CỐ GIẢI QUYẾT BẰNG CHAT HISTORY

Phản ứng đầu tiên của tôi rất tự nhiên.

Tôi cố giữ lại conversation.

Tôi nghĩ:

> “Nếu AI không nhớ, tôi sẽ đưa lại lịch sử.”

Vì vậy tôi giữ chat.

Tôi copy những đoạn quan trọng.

Tôi lưu summary.

Tôi viết lại những gì đã làm.

Tôi cố tạo một bản “nhớ hộ” cho AI.

Nhưng cách này nhanh chóng trở nên rất bất tiện.

Project lớn lên.

Conversation dài lên.

Summary dài lên.

Nhiều quyết định mới xuất hiện.

Một số quyết định cũ thay đổi.

Một số thông tin trở nên lỗi thời.

Một số đoạn chat chỉ là trao đổi tạm thời.

Một số ý tưởng được nói ra nhưng không bao giờ được thực hiện.

Một số giả định ban đầu bị loại bỏ.

Tôi bắt đầu nhận ra:

Chat history không phải Project Knowledge.

### CHAT HISTORY CHỈ KỂ LẠI ĐÃ NÓI GÌ

Đây là một distinction rất quan trọng.

Conversation / Chat History trả lời câu hỏi:

> “Chúng ta đã nói gì?”

Nhưng project cần trả lời những câu khác:

> “Project hiện đang ở đâu?”

> “Điều gì đang đúng?”

> “Điều gì đã được quyết định?”

> “Điều gì đã được kiểm chứng?”

> “Điều gì đang thay đổi?”

> “Điều gì chưa hoàn thành?”

> “Điều gì không được phép thay đổi?”

Đó không còn là lịch sử hội thoại.

Đó là:

Project Knowledge và:

Project State.

### PROJECT KNOWLEDGE LÀ GÌ?

Nói đơn giản, Project Knowledge là những tri thức bền vững mà project cần để được hiểu đúng và được tiếp tục đúng.

Ví dụ:

• project dùng architecture nào;
• database được tổ chức ra sao;
• business rule quan trọng là gì;
• coding standard nào đang áp dụng;
• naming convention nào được dùng;
• quyết định architecture nào đã được chấp nhận;
• security boundary nằm ở đâu;
• những dependency nào là bắt buộc;
• những giới hạn nào không được phá vỡ;
• và những khái niệm nào có ý nghĩa đặc biệt trong project.

Project Knowledge trả lời: “Project này được hiểu như thế nào?”

### CÒN PROJECT STATE?

Project State lại trả lời một câu hỏi khác:

> “Project này đang ở đâu ngay lúc này?”

Ví dụ:

• Task nào đang active?
• Task nào đã completed?
• Task nào đang blocked?
• Version hiện tại là gì?
• Database đang ở migration nào?
• Feature nào đã verified?
• Bug nào đang unresolved?
• Release nào đang được chuẩn bị?
• Engineering Run gần nhất dừng ở đâu?
• Có thay đổi nào chưa được đồng bộ?
• Có evidence nào đã được ghi nhận?

Project State trả lời: “Project đang ở đâu?”

### HAI KHÁI NIỆM NÀY KHÔNG ĐƯỢC TRỘN LẪN

Tôi bắt đầu nhìn project theo cách này:

Project Knowledge = project phải hiểu điều gì.

Project State = project đang ở đâu.

Hai thứ liên quan mật thiết.

Nhưng không giống nhau.

Một architecture decision có thể là Project Knowledge.

Một task đang IN_PROGRESS là Project State.

Một coding standard là Project Knowledge.

Một migration đang chờ verification là Project State.

Một business rule là Project Knowledge.

Một bug đang OPEN là Project State.

Khi phân biệt được hai thứ này, mọi thứ bắt đầu rõ ràng hơn rất nhiều.

### TÔI BẮT ĐẦU NHẬN RA MEMORY CỦA AI CÓ MỘT VẤN ĐỀ CƠ BẢN

AI Memory nằm ở đâu?

Trong AI.

Và nếu nó nằm trong AI, thì nó có những đặc tính của AI.

Nó có thể thay đổi.

Nó có thể mất.

Nó có thể bị giới hạn.

Nó có thể phụ thuộc provider.

Nó có thể phụ thuộc model.

Nó có thể phụ thuộc product.

Nó có thể phụ thuộc conversation.

Và quan trọng nhất:

Project không kiểm soát nó hoàn toàn.

Tôi không muốn nền tảng của một project thực tế phụ thuộc vào một thứ mà project không thực sự sở hữu.

Vì vậy tôi bắt đầu hình thành một nguyên tắc rất rõ:

### NO AI MEMORY IS CANONICAL.

Không AI Memory nào là nguồn sự thật canonical của project.

### “CANONICAL” NGHĨA LÀ GÌ?

Từ này nghe khá kỹ thuật.

Nhưng ý nghĩa rất đơn giản.

Canonical nghĩa là:

Nguồn được project công nhận là sự thật chính thức để tham chiếu.

Nếu hai nơi mâu thuẫn nhau, canonical source là nơi được ưu tiên.

Ví dụ:

Conversation nói:

> “Feature này đã hoàn thành.”

Nhưng Project State nói:

> IN_PROGRESS

và Evidence chưa có.

Thì tôi không thể coi feature đó là completed chỉ vì AI đã nói như vậy.

Tương tự:

AI nhớ một architecture decision.

Nhưng architecture record hiện tại nói decision đã bị supersede.

AI Memory không thắng.

Canonical Project Knowledge thắng.

AI có thể nhớ. Nhưng AI Memory không có Authority.

### TÔI KHÔNG MUỐN PROJECT PHỤ THUỘC VÀO TRÍ NHỚ CỦA MỘT PROVIDER

Nếu project chỉ tiếp tục được vì:

> “AI A nhớ những gì đã làm hôm qua”

thì project đang bị khóa vào AI A.

Ngày nào AI A không còn ở đó:

project mất context.

Nếu project có thể tiếp tục từ:

• Project Knowledge,
• Project State,
• Evidence,
• Checkpoint,
• Handoff,

thì AI A có thể biến mất.

Một AI khác có thể đến.

Provider có thể thay đổi.

Model có thể thay đổi.

Máy tính có thể thay đổi.

Project vẫn tiếp tục.

Đây là sự khác biệt giữa:

AI continuity và:

Project continuity.

<!-- BVCE_NAV: MAJOR_TOPIC_2 -->

## PROJECT CONTINUITY

Tôi bắt đầu dùng từ Continuity để mô tả khả năng này.

Continuity nghĩa là:

Công việc hiện tại có thể tiếp tục chính xác từ trạng thái đã được lưu trước đó.

Không phải:

> “AI nhớ.”

Mà là:

> “Project đủ thông tin để AI tiếp tục.”

Đây là một thay đổi rất lớn.

Bởi vì nó chuyển responsibility từ:

AI sang:

Engineering System.

### MỘT ENGINEERING RUN CÓ THỂ KẾT THÚC

Từ đây tôi cũng cần một thuật ngữ chính xác hơn cho khoảng thời gian AI thực sự làm việc.

Tôi gọi nó là:

Engineering Run.

Engineering Run là:

Một khoảng thời gian thực thi engineering có kiểm soát, trong đó một AI

Executor hoặc một developer thực hiện các task đã được cho phép trên một project.

Nói đơn giản hơn:

đó là một khoảng thời gian mà AI hoặc người lập trình thực sự làm việc trên project.

Một Engineering Run có thể kéo dài vài giờ.

Có thể ngắn hơn.

Có thể dài hơn.

Nhưng Engineering Run là temporary.

Project thì persistent.

### ENGINEERING RUN IS A BOUNDARY OF EXECUTION, NOT A BOUNDARY OF PROJECT MEMORY.

### VÌ VẬY, RUN CÓ THỂ KẾT THÚC NHƯNG PROJECT KHÔNG ĐƯỢC “MẤT TRÍ NHỚ”

Một Engineering Run có thể kết thúc vì:

• quota hết;
• AI provider unavailable;
• máy tính bị tắt;
• developer dừng làm;
• task chuyển sang người khác;
• AI gặp lỗi;
• hoặc đơn giản là ngày làm việc kết thúc.

Nhưng khi Run kết thúc, project không được quay về trạng thái:

> “Tôi không biết chuyện gì vừa xảy ra.”

Nó phải biết:

• đã làm gì;
• đã thay đổi gì;
• đã verify gì;
• còn việc gì;
• đang ở state nào;
• và người thực thi tiếp theo cần biết gì.

Đó là Continuity.

### TÔI CẦN MỘT THỨ KHÁC NGOÀI CHAT

Từ đây, tôi bắt đầu nghĩ về project như một hệ thống có những lớp thông tin riêng.

Không chỉ:

Source Code mà còn:

Knowledge

State

Governance

Evidence

Continuity

Recovery

Source code là thứ application cần.

Nhưng những lớp còn lại là thứ engineering process cần.

Đặc biệt khi AI tham gia sâu vào quá trình đó.

### GIT KHÔNG GIẢI QUYẾT HẾT BÀI TOÁN

Đây cũng là nơi tôi bắt đầu nhìn Git khác đi.

Git rất quan trọng.

Git có commit.

Có branch.

Có diff.

Có history.

Có tag.

Có rollback.

Nhưng Git chủ yếu trả lời:

> “Source code đã thay đổi như thế nào?”

Nó không tự động trả lời đầy đủ:

> “Tại sao thay đổi?”

> “Task nào authorized thay đổi này?”

Trang 72 “Requirement nào được đáp ứng?”

> “Đã verify đến đâu?”

> “Project State hiện tại là gì?”

> “Quyết định architecture nào đang có hiệu lực?”

> “Một AI khác phải tiếp tục từ đâu?”

Git là một phần của continuity. Git không phải toàn bộ continuity.

### DIFF KHÔNG PHẢI STATE

Đây là một distinction khác tôi thấy rất quan trọng.

Một diff có thể nói:

file A thay đổi.

Nhưng project state cần nói:

task X đang IN_PROGRESS;

API Y đã implemented;

migration Z đã chạy;

verification còn thiếu;

feature này chưa được release.

Diff cho tôi biết change.

State cho tôi biết where we are.

Chúng có quan hệ.

Nhưng không thể thay thế cho nhau.

### TÔI BẮT ĐẦU TÁCH “CHANGE” VÀ “STATE”

Một trong những cách suy nghĩ quan trọng nhất tôi hình thành là:

Change là: Cái gì vừa thay đổi?

State là: Project đang ở trạng thái nào sau thay đổi đó?

Ví dụ:

AI sửa authentication module.

Đó là Change.

Sau khi sửa:

• authentication implementation đã thay đổi;
• unit test đã pass;
• integration test chưa chạy;
• security review chưa hoàn tất;
• release chưa được approve.

Đó là State.

Nếu tôi chỉ lưu diff, AI tiếp theo phải tự suy luận mọi thứ.

Tôi không muốn điều đó.

Tôi muốn project nói cho AI biết state.

<!-- BVCE_NAV: MAJOR_TOPIC_3 -->

## CHECKPOINT XUẤT HIỆN

Khi tôi nghĩ về việc một Engineering Run có thể dừng giữa chừng, một khái niệm khác trở nên cần thiết:

Checkpoint.

Checkpoint đơn giản là:

Một điểm được ghi nhận rõ ràng để project có thể tiếp tục từ đó.

Không phải backup của toàn bộ source code.

Không phải copy toàn bộ conversation.

Mà là một điểm trạng thái có ý nghĩa.

Ví dụ:

• Task đang làm gì?
• Đã thay đổi gì?
• Đã verify gì?
• Còn gì?
• State hiện tại là gì?
• Điều gì cần chú ý khi tiếp tục?

### CHECKPOINT KHÔNG PHẢI CURRENT STATE

Tôi cũng phải phân biệt hai thứ này.

Checkpoint là: một snapshot có mục đích cho việc resume/recovery.

Current Project State là: trạng thái hiện tại được project công nhận.

Ví dụ:

Run buổi sáng kết thúc với:

> CHECKPOINT-001

Nhưng sau đó một developer thực hiện thêm một thay đổi.

Current State đã thay đổi.

Checkpoint không nhất thiết là Current State.

Checkpoint là một điểm tham chiếu.

Current State là hiện tại.

### HANDOFF LÀ GÌ?

Khi một Engineering Run kết thúc và Run khác tiếp tục, tôi cần một thứ nữa:

Handoff.

Handoff nghĩa là:

Bàn giao công việc từ executor hiện tại sang executor tiếp theo mà không làm mất trạng thái cần thiết của project.

Handoff không phải:

> “AI cũ nói vài câu với AI mới.”

Nó phải dựa trên project artifacts.

Ví dụ:

• Task hiện tại.
• Current State.
• Latest Changes.
• Open Issues.
• Decisions.
• Evidence.
• Checkpoint.
• Next Action.
• Known Constraints.

Nếu không có những thứ đó, AI mới phải đoán.

Không có handoff tốt nếu không có state synchronization.

### NO HANDOFF WITHOUT STATE SYNCHRONIZATION

Đây là một nguyên tắc tôi muốn giữ lại.

Trước khi nói:

Trang 75 “AI B, hãy tiếp tục.”

tôi phải chắc chắn rằng AI B sẽ đọc được state mà AI A vừa để lại.

Không nhất thiết phải truyền toàn bộ lịch sử.

Nhưng phải đồng bộ những gì có ý nghĩa.

• Task.
• Change.
• State.
• Evidence.
• Checkpoint.
• Next action.

Đó là một handoff có thể engineering được.

### TÔI KHÔNG MUỐN LƯU MỌI THỨ

Một lúc nào đó tôi lại gặp một vấn đề khác.

Nếu tôi nói:

> “Project phải nhớ mọi thứ.”

Tôi có nên lưu mọi token không?

Mọi câu AI trả lời?

Mọi prompt?

Mọi candidate?

Mọi lần thử?

Mọi câu giải thích?

Không.

Nếu làm như vậy, hệ thống sẽ trở thành một kho rác khổng lồ.

Search khó hơn.

Context dài hơn.

Chi phí cao hơn.

Nhiễu nhiều hơn.

AI khó phân biệt đâu là sự thật hiện tại.

Vì vậy tôi bắt đầu hình thành một nguyên tắc:

<!-- BVCE_NAV: MAJOR_TOPIC_4 -->

## PERSIST EVERYTHING, LOAD SELECTIVELY.

Lưu trữ đủ để project có thể được tái dựng.

Nhưng không đưa tất cả vào context mỗi lần.

### NHƯNG “EVERYTHING” KHÔNG CÓ NGHĨA LÀ MỌI TOKEN

Tôi phải chính xác hơn.

Thứ cần persist là:

> EVERY MATERIAL ENGINEERING EVENT.

Không phải:

mọi transient AI token.

Một material event có thể là:

• TASK.
• DECISION.
• FILE CHANGE.
• KNOWLEDGE CHANGE.
• STATE CHANGE.
• ARCHITECTURE CHANGE.
• GOVERNANCE CHANGE.
• TEST RESULT.
• EVIDENCE.
• ERROR.
• BLOCKER.
• UNRESOLVED ITEM.
• HANDOFF.
• CHECKPOINT.

### CÒN NHỮNG GÌ KHÔNG NHẤT THIẾT PHẢI LƯU?

Tôi không cần lưu mọi thứ mà AI nói ra.

• Một câu trả lời lặp lại.
• Một đoạn giải thích đã bị thay thế.
• Một retrieval candidate không được sử dụng.
• Một prompt retry không tạo ra thay đổi.
• Một đoạn conversation chỉ có giá trị tạm thời.
• Một chuỗi token trung gian.

Những thứ đó có thể tồn tại ở tầng log hoặc cache nếu cần.

Nhưng chúng không nên được coi là:

Project Truth.

### PERSISTENCE VÀ RETRIEVAL LÀ HAI BÀI TOÁN KHÁC NHAU

Tôi bắt đầu hiểu rằng:

Lưu được thông tin chưa đủ.

Phải tìm đúng thông tin nữa.

Đây là lúc vấn đề continuity bắt đầu gặp vấn đề context.

Project có thể có hàng nghìn artifact.

AI không thể đọc tất cả mỗi lần.

Vì vậy:

Persistence trả lời: “Project đã lưu gì?”

Retrieval trả lời: “Task hiện tại cần đọc cái gì?”

Và đây chính là một trong những cây cầu dẫn sang chương tiếp theo của hành trình.

### PROJECT PHẢI CÓ MỘT “TRÍ NHỚ” THUỘC VỀ CHÍNH NÓ

Tôi bắt đầu gọi tổng thể thứ này là:

Persistent Project Knowledge Layer.

Không phải một AI memory.

Không phải một chat database đơn thuần.

Mà là một lớp bền vững thuộc về project.

Nó chứa những thứ project cần để:

• được hiểu,
• được tiếp tục,
• được kiểm chứng,
• được phục hồi.

Đó là lúc tôi bắt đầu nghĩ tới các thư mục và artifact thực tế.

### MỘT PROJECT CẦN MANG THEO NHỮNG GÌ?

Không phải mọi project đều giống nhau.

Nhưng về mặt tư duy, tôi cần ít nhất những nhóm như:

Bootstrap

Project bắt đầu như thế nào?

Governance

Những quy tắc nào có quyền kiểm soát?

Knowledge

Project phải biết gì?

Semantics

Các khái niệm được hiểu và liên kết ra sao?

Terminology

Tên gọi canonical là gì?

Documentation

Tài liệu phải được trình bày như thế nào?

Context

Thông tin nền của project là gì?

State

Hiện tại project đang ở đâu?

Continuity

Run nào vừa xảy ra? Checkpoint ở đâu? Handoff như thế nào?

Evidence

Điều gì đã được chứng minh?

Đây không còn là một folder source code đơn thuần. Nó là Engineering

Memory của project.

### NHƯNG TÔI VẪN KHÔNG GỌI NÓ LÀ “AI MEMORY”

Tôi cố ý tránh cách gọi đó.

Bởi vì mục tiêu không phải làm cho AI “nhớ lâu hơn”.

Mục tiêu là làm cho:

project tự mang theo những gì cần thiết để AI có thể hiểu project.

AI đến.

AI đọc.

AI thực hiện.

AI rời đi.

Project vẫn còn.

AI is replaceable. Project continuity is persistent.

### MỘT AI KHÁC CÓ THỂ TIẾP TỤC KHÔNG?

Đây là test rất thực tế mà tôi bắt đầu dùng.

Giả sử AI A vừa kết thúc.

Tôi không hỏi:

> “AI A có nhớ không?”

Tôi hỏi:

> “Một AI Executor khác có thể reconstruct project context và tiếp tục không?”

Nếu câu trả lời là có, continuity đang hoạt động.

Nếu câu trả lời là không, project vẫn đang phụ thuộc vào AI memory.

Đây là một test rất đơn giản.

Nhưng nó thay đổi hoàn toàn cách tôi đánh giá workflow.

### TỪ ĐÓ XUẤT HIỆN MỘT NGUYÊN TẮC

### ANY ELIGIBLE AI MUST BE ABLE TO RECONSTRUCT PROJECT CONTEXT.

Không phải mọi AI trên thế giới.

Mà là bất kỳ AI Executor đủ điều kiện nào được phép tiếp nhận task.

Nó phải có khả năng:

• LOAD.
• VERIFY.
• RECONSTRUCT.
• EXECUTE.
• REPORT.
• CHECKPOINT.
• HANDOFF.

Đó mới thực sự là provider-neutral continuity.

### CONTINUITY KHÔNG CÓ NGHĨA “AI NÀO CŨNG ĐƯỢC PHÉP LÀM”

Đây là một điểm tôi phải rất cẩn thận.

Có Project State không có nghĩa mọi AI đều được quyền truy cập mọi thứ.

Một AI có thể reconstruct context ở mức cần thiết.

Nhưng không được nhìn secrets.

Không được đọc production credentials.

Không được truy cập dữ liệu mà security policy cấm.

Không được thay đổi architecture nếu chưa được authorize.

Không được tự ý release.

Continuity không xóa governance.

Continuity phải hoạt động bên trong governance.

### MULTI-AI KHÔNG CÓ NGHĨA MULTI-WRITER

Khi có nhiều AI, một ý tưởng rất dễ xuất hiện:

> “Cho chúng cùng sửa project sẽ nhanh hơn.”

Tôi cũng từng nghĩ như vậy.

Nhưng đây là một rủi ro rất lớn.

Nếu AI A đang sửa file X.

AI B cũng sửa file X.

AI C thay đổi database.

AI D đang dựa trên state cũ.

Tôi có thể tạo ra conflict rất nhanh.

Multiple AI does not mean multiple writers.

Tôi muốn:

Multiple Executors nhưng:

Controlled Workspace Ownership.

Tại một thời điểm, quyền chỉnh sửa phải rõ ràng.

Ai đang làm?

Task nào?

Branch nào?

Workspace nào?

State nào?

Điều này sau này dẫn tới concept Workspace Lock.

### TÔI BẮT ĐẦU NHÌN RECOVERY KHÁC VỚI ROLLBACK

Một lỗi khác rất dễ xảy ra là nghĩ:

> “Có Git thì có recovery.”

Không hoàn toàn.

Rollback có thể đưa source code về một version trước.

Recovery là khôi phục khả năng tiếp tục engineering.

Ví dụ:

• Source code có thể rollback.
• Nhưng project state thì sao?
• Knowledge change thì sao?
• Evidence thì sao?
• Current task thì sao?
• Database state thì sao?
• Production configuration thì sao?
• Handoff context thì sao?

Nếu chỉ quay code về commit cũ, tôi chưa chắc đã khôi phục được project.

Recovery is bigger than rollback.

### CHECKPOINT PHẢI PHỤC VỤ RECOVERY

Từ đây tôi bắt đầu thích một mô hình:

Current State + Recent Material Deltas + Checkpoint + Evidence +

Handoff = Recoverable Engineering Context

Không nhất thiết phải hoàn hảo.

Nhưng phải đủ để một executor hợp lệ có thể tiếp tục mà không phải đoán quá nhiều.

### TÔI CẦN MỘT STATE MACHINE CHO CÔNG VIỆC

Khi continuity trở nên quan trọng, tôi nhận ra task cũng cần state.

Một task không chỉ:

> TODO / DONE

Mà có thể:

> PROPOSED → AUTHORIZED → IN_PROGRESS → IMPLEMENTED → VERIFIED

> → COMPLETED

hoặc:

> BLOCKED / REJECTED / SUPERSEDED / RECOVERY

Những trạng thái này cho phép project nói rõ:

> “Task này đang thực sự ở đâu?”

Thay vì bắt AI đoán qua conversation.

### TÔI BẮT ĐẦU HIỂU RẰNG CONTINUITY LÀ MỘT BUILD ARTIFACT

Đây là một bước chuyển rất quan trọng.

Trước đây tôi nghĩ continuity là:

> “AI có nhớ hay không.”

Sau đó tôi nghĩ continuity là:

> “Tôi có lưu conversation không.”

Bây giờ tôi nhìn nó khác:

Continuity là một artifact mà project xây dựng và duy trì.

Nó phải được cập nhật khi:

• task thay đổi,
• state thay đổi,
• knowledge thay đổi,
• evidence xuất hiện,
• run kết thúc,
• handoff xảy ra,
• recovery xảy ra.

> CONTINUITY IS A BUILD ARTIFACT.

### VÀ TÔI BẮT ĐẦU NGHĨ VỀ “CURRENT WORKING SET”

Một project có thể có rất nhiều thông tin.

Nhưng AI hiện tại chỉ cần một phần.

Tôi cần biết:

• Task hiện tại là gì?
• Domain nào liên quan?
• File nào liên quan?
• State nào liên quan?
• Knowledge nào liên quan?
• Architecture nào liên quan?
• Next action là gì?

Từ đó hình thành ý tưởng Current Working Set.

Nó không phải toàn bộ project.

Nó là:

Trang 83 phần nhỏ của project mà executor hiện tại cần để thực hiện task hiện tại một cách đúng đắn.

Đây là một bước quan trọng.

Bởi vì tôi không muốn giải quyết memory bằng cách đưa toàn bộ project vào prompt.

Persist broadly. Load selectively.

### PROJECT KHÔNG CẦN “NHỚ MỌI THỨ” TRONG MỖI LẦN LÀM VIỆC

Đây là một misconception rất dễ mắc.

Nếu project có 10.000 artifact, AI không cần đọc 10.000 artifact.

Nó cần:

• đúng governance,
• đúng baseline,
• đúng state,
• đúng task context,
• đúng knowledge,
• đúng evidence.

Đó là lý do về sau tôi sẽ cần đến Context Engineering.

Nhưng ở thời điểm này, tôi chỉ cần hiểu một nguyên tắc:

Memory phải bền vững. Context phải có chọn lọc.

### TÔI CŨNG NHẬN RA MỘT ĐIỀU VỀ “SUMMARY”

Summary rất hữu ích.

Nhưng summary không phải lúc nào cũng là source of truth.

Một summary có thể bỏ sót:

• một constraint,
• một decision,
• một exception,
• một unresolved issue.

Một AI có thể viết summary rất đẹp.

Readable ≠ Canonical.

Summary có thể là cách trình bày.

Canonical artifact mới là nơi tôi dựa vào.

Đây là một trong những lý do tôi không muốn “AI tự tóm tắt project rồi coi đó là memory”.

### EVIDENCE CŨNG LÀ MỘT PHẦN CỦA MEMORY

Một task đã hoàn thành không chỉ cần ghi:

> “Done.”

Nó cần biết:

• đã test gì,
• kết quả ra sao,
• evidence ở đâu,
• verification level nào,
• có limitation gì.

Bởi vì nếu AI tiếp theo đọc:

> “Authentication đã xong.”

nó cần biết:

xong theo nghĩa nào?

Code exists?

Code runs?

Requirement satisfied?

Verified?

Đây là lý do Project Knowledge, Project State và Evidence phải liên kết với nhau.

### MỘT PROJECT CÓ THỂ KHÔNG NHỚ TẤT CẢ QUÁ KHỨ

Và đó không phải vấn đề.

Project không cần đưa toàn bộ lịch sử 3 năm vào mỗi task.

Nhưng nó cần có khả năng:

reconstruct what matters.

Đây là distinction giữa:

history preservation và:

context reconstruction.

Lịch sử có thể rất lớn.

Context hiện tại phải nhỏ hơn.

Nhưng hai thứ phải có một mối liên hệ đáng tin cậy.

### TÔI BẮT ĐẦU NGHĨ VỀ HỆ THỐNG THEO HAI TẦNG

Snapshot và

Event Log.

Snapshot giúp tôi biết nhanh:

> “Hiện tại là gì?”

Event Log giúp tôi biết:

> “Nó đã trở thành như thế nào?”

Snapshot phù hợp cho loading.

Event Log phù hợp cho audit và reconstruction.

Không phải task nào cũng cần đọc toàn bộ event log.

Nhưng event log cho tôi khả năng hiểu sự phát triển của state.

Fast loading needs snapshots. Trustworthy reconstruction needs events.

### PERSIST EVERYTHING, LOAD SELECTIVELY

Đây là nguyên tắc ngày càng trở nên rõ hơn đối với tôi.

Tôi không muốn xóa lịch sử chỉ vì context hiện tại không cần nó.

Tôi cũng không muốn ném toàn bộ lịch sử vào AI.

Tôi muốn:

Persist.

↓

Index.

↓

Retrieve.

↓

Filter.

↓

Compile Context.

↓

Execute.

Đây là logic mà về sau sẽ dẫn trực tiếp đến Context Engineering và Context Compiler.

### KHI AI A ĐI, AI B ĐẾN

Hãy quay lại tình huống ban đầu.

AI A dừng.

Không có vấn đề gì.

AI B đến.

AI B load:

• Project Bootstrap.
• Governance.
• Knowledge Manifest.
• Semantics.
• Terminology.
• Documentation Standard.
• Project Context.
• Current State.
• Current Working Set.
• Recent Changes.
• Evidence.
• Latest Checkpoint.
• Handoff.

AI B không cần “nhớ AI A”.

Nó cần:

hiểu project hiện tại.

Đó là một hệ thống có thể thay executor.

### ĐÂY LÀ LÚC TÔI NHẬN RA AI KHÔNG CÒN LÀ “CHỦ SỞ HỮU” CONTEXT

AI chỉ là consumer của context.

Project mới là owner của context.

Đây là một thay đổi conceptual rất quan trọng.

Nếu AI là owner:

project phụ thuộc vào AI.

Nếu project là owner:

AI có thể thay đổi.

Tôi bắt đầu nhìn architecture như:

Project Knowledge → Project State → Context Resolution → AI Executor chứ không phải:

AI Memory → Project

Đó là một khác biệt rất lớn.

<!-- BVCE_NAV: MAJOR_TOPIC_5 -->

## TỪ ĐÂY, TÔI BẮT ĐẦU XÂY PAECS

Đến một lúc, những nhu cầu này bắt đầu quá nhiều để chỉ xử lý bằng vài file Markdown.

Tôi cần:

• Authority.
• Method.
• Task.
• Change.
• State.
• Evidence.
• Verification.
• Handoff.
• Recovery.
• Security.
• Workspace control.

Tất cả phải liên kết.

Từ đó tôi bắt đầu hình thành hệ thống mà tôi gọi là:

PAECS — Project AI Engineering Continuity System.

PAECS không phải AI.

Nó cũng không phải GitHub.

Nó là lớp điều khiển continuity và engineering execution của project.

### GIT VẪN CÓ VAI TRÒ

Điều này cần nói rõ.

PAECS không thay thế Git.

Git vẫn rất quan trọng cho source control.

Nhưng Git trở thành một Repository Adapter trong kiến trúc lớn hơn.

Có thể là:

• GitHub.

• Local Git.
• Sau này có thể là GitLab.
• Hoặc một private server.

Repository có thể thay đổi.

PAECS giữ:

• Task.
• Change.
• State.
• Evidence.
• Checkpoint.
• Handoff.
• Recovery.

Đó là cách tôi bắt đầu tách:

Repository khỏi

Engineering Authority.

### CONTINUITY KHÔNG ĐƯỢC PHỤ THUỘC VÀO MỘT REMOTE

Một bài học khác xuất hiện rất tự nhiên.

Nếu GitHub down thì sao?

Nếu repository remote có vấn đề thì sao?

Nếu internet mất thì sao?

Tôi có còn biết project đang ở state nào không?

Tôi muốn câu trả lời là:

Có.

Đó là lý do mô hình của tôi dần trở thành:

Local Trusted Engineering Workspace

+

Independent Backup / Disaster Recovery

+

Controlled Remote Replica

Trong đó remote repository rất quan trọng.

Nhưng không phải nguồn authority duy nhất của continuity.

### VÀ TÔI BẮT ĐẦU NHÌN “STATE” NHƯ MỘT TÀI SẢN

Trước đây, tôi chỉ nghĩ đến source code là tài sản.

Bây giờ tôi bắt đầu nghĩ:

Project State cũng là tài sản.

Bởi vì nếu tôi mất state:

• tôi có source code,
• nhưng không biết project đang ở đâu.

Tôi có code,

• nhưng không biết task nào đang active.

Tôi có commit,

• nhưng không biết commit đó đã được verify đến đâu.

Tôi có architecture,

• nhưng không biết decision nào còn hiệu lực.

Source code mà không có state đôi khi giống một thành phố có bản đồ nhưng không có biển báo đang thi công ở đâu.

### “STATE LOSS” CÓ THỂ ĐẮT HƠN CODE LOSS

Đây là một observation rất thực tế.

Mất một file code đôi khi có thể restore từ Git.

Nhưng mất:

• decision history,
• current state,
• open blockers,
• evidence,
• handoff context

có thể khiến tôi mất rất nhiều giờ để reconstruction.

Đó là:

context recovery cost.

Và chính context recovery cũng là một phần của Cost per Successful Task mà tôi đã nói ở chương trước.

### CONTINUITY CŨNG LÀ COST CONTROL

Đây là một kết nối thú vị.

Ban đầu tôi nghĩ continuity là vấn đề kiến trúc.

Sau đó tôi nhận ra nó cũng là vấn đề kinh tế.

Nếu AI A dừng:

không có continuity → con người phải giải thích lại → context recovery tăng → rework tăng → switching cost tăng → completion cost tăng.

Nếu có continuity tốt:

AI B đọc state → hiểu nhanh → tiếp tục → giảm recovery → giảm rework → giảm switching cost.

Continuity không chỉ bảo vệ project. Nó còn bảo vệ ngân sách.

### TÔI CŨNG NHẬN RA CONTINUITY KHÔNG CÓ NGHĨA “KHÔNG BAO GIỜ MẤT DỮ LIỆU”

Một hệ thống thực tế sẽ luôn có failure.

File có thể lỗi.

Database có thể lỗi.

Backup có thể lỗi.

AI có thể ghi sai.

Một người có thể thao tác nhầm.

Vì vậy continuity phải bao gồm:

• Detection.
• Checkpoint.
• Recovery.
• Verification.

Không chỉ:

Persistence.

Đó là lý do recovery là một thành phần riêng, không phải một side effect.

### RECOVERY PHẢI CÓ THỂ HOẠT ĐỘNG NGAY CẢ KHI AI KHÔNG CÒN Ở ĐÓ

Đây là một test rất mạnh.

Giả sử:

• AI provider biến mất.
• AI account không còn.
• Conversation mất.

Bạn vẫn phải có khả năng:

• mở project,

• đọc state,
• đọc checkpoint,
• đọc evidence,
• đọc governance,
• và đưa một executor mới vào.

Nếu làm được điều đó, continuity thực sự thuộc về project.

Nếu không làm được, continuity vẫn thuộc về AI.

### TỪ “AI MEMORY” SANG “PROJECT MEMORY” VẪN CHƯA ĐỦ

Sau một thời gian, tôi còn thấy một subtle difference.

Tôi không thực sự muốn một “memory” khổng lồ.

Tôi muốn:

Knowledge có cấu trúc.

State có cấu trúc.

Evidence có cấu trúc.

Events có cấu trúc.

Checkpoints có cấu trúc.

Và một cơ chế để lấy đúng thứ cần thiết.

Vì vậy cụm từ tốt hơn không còn là:

> “Project Memory.”

Mà là:

Persistent Project Knowledge + State + Continuity.

### VÀ ĐÓ LÀ LÚC TÔI BẮT ĐẦU THẤY VẤN ĐỀ THỰC SỰ CỦA CHƯƠNG SAU

Tôi đã giải quyết được một nửa vấn đề:

• AI không cần nhớ project.
• Project có thể mang theo knowledge và state.
• Một Engineering Run có thể kết thúc.
• Một executor khác có thể tiếp tục.
• Checkpoint có thể hỗ trợ recovery.

• Handoff có thể truyền continuation.
• PAECS có thể điều phối continuity.

Nhưng vẫn còn một câu hỏi:

> “Nếu project có quá nhiều knowledge, state, evidence và artifact, AI phải đọc cái gì?”

Đọc quá ít?

AI thiếu context.

Đọc quá nhiều?

AI bị nhiễu.

Đọc sai?

AI làm sai.

Đọc thông tin cũ?

AI dựa vào một sự thật đã hết hiệu lực.

Đọc thông tin đúng nhưng không đủ authority?

AI vẫn có thể chọn nhầm.

Lúc đó tôi nhận ra:

Memory không phải bài toán cuối cùng.

Retrieval mới là bài toán tiếp theo.

## CHUYỂN TIẾP

Tôi đã dành khá nhiều thời gian để xây:

• Knowledge.
• State.
• Checkpoint.
• Handoff.
• Evidence.
• Continuity.

Nhưng rồi tôi gặp một vấn đề mới.

Project của tôi bắt đầu có quá nhiều thứ để AI đọc.

Tôi có thể lưu mọi thứ.

Nhưng tôi không thể đưa mọi thứ vào một prompt.

Tôi cần AI hiểu:

• điều gì quan trọng,
• điều gì hiện hành,
• điều gì có authority,
• điều gì liên quan đến task hiện tại,
• và điều gì không cần đọc.

Tôi đã giải được bài toán:

> “Project phải nhớ.”

Nhưng tôi vẫn chưa giải được:

> “AI phải được cho nhớ cái gì ngay lúc này?”

Và đó là lúc tôi bước sang một bài toán mới:

Context Engineering.

## CHƯƠNG TIẾP THEO

### AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT.

Vấn đề không còn là lưu được bao nhiêu thông tin. Mà là làm thế nào để đưa đúng thông tin, đúng authority, đúng state và đúng mức độ cần thiết đến đúng AI Executor, đúng task, đúng thời điểm.

---

# NAVIGATION TREE

CHƯƠNG 3 - AI KHÔNG NHỚ PROJECT CỦA BẠN
├── TÔI TỪNG CỐ GIẢI QUYẾT BẰNG CHAT HISTORY
├── PROJECT CONTINUITY
├── CHECKPOINT XUẤT HIỆN
├── PERSIST EVERYTHING, LOAD SELECTIVELY.
└── TỪ ĐÂY, TÔI BẮT ĐẦU XÂY PAECS

<!--
BVCE_NAV markers are semantic metadata only.
They do not control PDF coordinates, typography, page breaks or page chrome.
-->
