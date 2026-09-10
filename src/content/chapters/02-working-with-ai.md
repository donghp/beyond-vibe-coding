---
id: "02-working-with-ai"
title: "AI MẠNH HƠN KHÔNG CÓ NGHĨA LÀ BẠN SẼ ĐI NHANH HƠN"
subtitle: "Từ cuộc đua tìm model tốt nhất đến một câu hỏi thực tế hơn: AI nào phù hợp nhất cho công việc tôi đang làm?"
shortTitle: "AI mạnh hơn không có nghĩa là đi nhanh hơn"
order: 2
description: "Từ cuộc đua tìm model tốt nhất đến một câu hỏi thực tế hơn: AI nào phù hợp nhất cho công việc tôi đang làm?"
readingTime: "18 min"
topics: ["models", "routing", "cost", "fitness for task", "security", "orchestration"]
hero: "images/chapter-02-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
navigationPolicy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
updated: "2026-09-10"
version: "2.0.0"
---

# CHƯƠNG 2

# AI MẠNH HƠN KHÔNG CÓ NGHĨA LÀ BẠN SẼ ĐI NHANH HƠN

*Từ cuộc đua tìm model tốt nhất đến một câu hỏi thực tế hơn: AI nào phù hợp nhất cho công việc tôi đang làm?*

Có một điều rất dễ xảy ra khi bạn bắt đầu làm việc với AI.

Bạn thử một model.

Nó làm khá tốt.

Sau đó bạn nghe nói có một model mạnh hơn.

Bạn thử model đó.

Nó làm tốt hơn một chút.

Rồi lại xuất hiện một model mới.

Context lớn hơn.

Reasoning tốt hơn.

Code tốt hơn.

Thông minh hơn.

Nhanh hơn.

Bạn bắt đầu nghĩ:

> “Có lẽ chỉ cần tìm được AI tốt nhất, tôi sẽ xây phần mềm nhanh hơn rất nhiều.”

Tôi cũng từng nghĩ như vậy.

Thực ra suy nghĩ đó khá hợp lý.

Nếu một programmer giỏi hơn có thể làm việc nhanh hơn một programmer yếu hơn, thì một AI mạnh hơn lẽ ra cũng phải giúp chúng ta xây phần mềm nhanh hơn.

Nhưng khi tôi thực sự bắt đầu làm project với AI, có một điều rất thú vị xuất hiện:

> “Điều đó không phải lúc nào cũng đúng.”

Một AI mạnh hơn có thể viết code tốt hơn.

Nhưng điều đó không đồng nghĩa với việc project của tôi tiến nhanh hơn.

Và đây là lúc tôi bắt đầu đặt một câu hỏi khác.

Không phải:

> “AI nào mạnh nhất?”

Mà là:

> “AI nào phù hợp nhất với task tôi đang làm?”

<!-- BVCE_NAV: MAJOR_TOPIC_1 -->

## TÔI TỪNG NGHĨ MODEL MẠNH HƠN SẼ GIẢI QUYẾT MỌI THỨ

Cách suy nghĩ này rất tự nhiên.

Khi gặp một task khó, bạn chọn model mạnh.

Khi gặp task rất khó, bạn chọn model mạnh hơn nữa.

Khi task cực kỳ quan trọng, bạn chọn model tốt nhất mà mình có thể trả tiền.

Nghe hoàn toàn hợp lý.

Nhưng có một vấn đề.

Không phải mọi task đều khó theo cùng một cách.

Một task có thể khó vì reasoning.

Một task có thể khó vì context.

Một task có thể khó vì cần đọc nhiều file.

Một task có thể khó vì architecture.

Một task có thể khó vì requirement chưa rõ.

Một task có thể khó vì dữ liệu nhạy cảm.

Một task có thể khó vì phải thay đổi nhiều thành phần cùng lúc.

Và có những task thực ra không khó.

Chúng chỉ dài.

Hoặc lặp lại.

Hoặc nhàm chán.

Hoặc rất dễ nhưng có nhiều bước.

Trong những trường hợp đó, sử dụng model mạnh nhất chưa chắc là lựa chọn tốt nhất.

### MỘT TASK ĐƠN GIẢN KHÔNG CẦN “AI GIỎI NHẤT”

Hãy tưởng tượng bạn cần đổi tên một biến trong một module.

Bạn cần thêm một field vào một schema.

Bạn cần cập nhật một câu SQL.

Bạn cần sửa một typo trong UI.

Bạn cần viết một test đơn giản.

Bạn cần đọc một file và giải thích nó.

Bạn cần tạo một migration rất nhỏ.

Những task này có thể cần AI.

Nhưng chúng không nhất thiết cần AI mạnh nhất.

Nếu một model đủ tốt có thể hoàn thành chúng chính xác trong một lần, tại sao tôi phải dùng model đắt hơn?

Đó là lúc tôi bắt đầu nhận ra:

> “Capability required by the task matters more than the maximum capability of the model.”

Nói đơn giản hơn:

> “Task cần gì quan trọng hơn AI có thể làm được tối đa bao nhiêu.”

Đây là một khác biệt rất lớn.

Bởi vì nếu tôi luôn chọn AI mạnh nhất, tôi đang tối ưu theo capability.

Nhưng tôi thực sự cần tối ưu theo fitness for task.

### “MẠNH HƠN” KHÔNG PHẢI LÚC NÀO CŨNG LÀ “PHÙ HỢP HƠN”

Một chiếc xe tải mạnh hơn xe máy.

Nhưng bạn không dùng xe tải để đi mua một ổ bánh mì.

Một server lớn hơn có nhiều tài nguyên hơn.

Nhưng bạn không nhất thiết cần server lớn nhất cho một website nhỏ.

AI cũng vậy.

Một model mạnh hơn có thể có:

reasoning tốt hơn,

context lớn hơn,

khả năng xử lý task phức tạp tốt hơn,

khả năng viết code tốt hơn.

Nhưng nếu task tôi đang làm rất đơn giản, những capability đó có thể không tạo ra thêm nhiều giá trị.

Thậm chí đôi khi chúng tạo ra một vấn đề khác:

chi phí cao hơn.

Và đó là nơi tôi bắt đầu nhìn bài toán AI theo hướng kinh tế.

<!-- BVCE_NAV: MAJOR_TOPIC_2 -->

## CHI PHÍ THẬT KHÔNG NẰM Ở GIÁ MỘT REQUEST

Ban đầu tôi cũng nhìn AI cost khá đơn giản.

Model A rẻ.

Model B đắt.

Vậy dùng A khi có thể.

Đó là một cách nhìn đúng nhưng chưa đủ.

Hãy tưởng tượng:

Model A tốn 0,10 USD cho một task.

Nhưng nó hiểu sai requirement.

Bạn phải sửa prompt.

Chạy lại.

Sửa tiếp.

Rồi tự debug.

Cuối cùng mất hai giờ.

Model B tốn 1 USD.

Nhưng hoàn thành task chính xác ngay lần đầu.

Task của Model B thực sự đắt hơn bao nhiêu?

Nếu chỉ nhìn vào giá request:

> A rẻ hơn B mười lần.

Nếu nhìn vào chi phí thực tế:

> Có thể hoàn toàn ngược lại.

Từ đây tôi bắt đầu quan tâm tới một khái niệm khác:

> Cost per Successful Task.

Không phải:

> Cost per Prompt.

Không phải:

> Cost per Token.

Mà là:

> Tôi phải bỏ ra bao nhiêu tổng chi phí để đưa task từ trạng thái chưa hoàn thành đến trạng thái đã hoàn thành và được kiểm chứng?

### MỘT TASK THÀNH CÔNG KHÔNG CHỈ CÓ AI COST

Khi nhìn theo cách đó, chi phí bắt đầu rộng hơn rất nhiều.

Có AI cost.

Nhưng còn có:

Human time.

Thời gian của tôi để đọc output.

Thời gian để sửa.

Thời gian để giải thích lại.

Thời gian để khôi phục context.

Thời gian để verify.

Thời gian để rollback.

Thời gian để xử lý consequence của một lỗi.

Và còn có một loại chi phí rất dễ bị bỏ qua:

Switching cost.

Mỗi lần chuyển từ AI này sang AI khác, tôi có thể phải:

giải thích lại context,

đưa lại file,

đưa lại state,

giải thích decision,

khôi phục workflow.

Nếu hệ thống continuity tốt, switching cost có thể giảm rất nhiều.

Nếu continuity kém, việc đổi AI có thể biến thành một project recovery exercise.

Lúc đó tôi bắt đầu hiểu:

> AI cost không chỉ là tiền trả cho model.

Đó chỉ là một thành phần.

<!-- BVCE_NAV: MAJOR_TOPIC_3 -->

## TÔI KHÔNG MUỐN CHỌN AI CHỈ BẰNG GIÁ

Đây cũng là một sai lầm ngược lại.

Sau khi nhận ra model đắt không phải lúc nào cũng tốt hơn, tôi hoàn toàn có thể rơi vào một cực đoan khác:

> “Vậy cứ dùng AI miễn phí.”

Nhưng đó cũng không phải điều tôi muốn.

Bởi vì có những task mà một AI miễn phí không phù hợp.

Có những task cần capability cao hơn.

Có những task cần context lớn hơn.

Có những task có risk cao hơn.

Có những task mà một lỗi nhỏ sẽ tốn nhiều thời gian hơn số tiền phải trả cho AI mạnh hơn.

Vì vậy nguyên tắc của tôi không phải:

> Free-first là một economic preference. Không phải một technical restriction.

### FREE-FIRST

Free-first có nghĩa là:

Nếu có một AI đủ tốt, đủ an toàn, phù hợp với task và không phát sinh chi phí trực tiếp, tôi ưu tiên dùng nó trước.

Nhưng nếu nó không đủ tốt?

Tôi chuyển sang lựa chọn khác.

Nếu model trả phí giúp giảm rework đáng kể?

Tôi cân nhắc trả tiền.

Nếu task có risk cao?

Tôi ưu tiên capability, verification và security trước giá.

Nếu một AI đang miễn phí nhưng quota đã hết?

Tôi không xây workflow dựa trên giả định rằng nó luôn miễn phí.

Tôi tìm một phương án thay thế.

Đây là điểm quan trọng:

> Free-first là một economic preference. Không phải một technical restriction.

### QUOTA LÀ MỘT PHẦN CỦA THỰC TẾ

Một trong những điều đầu tiên tôi học được khi làm việc với AI thực tế là:

> AI không phải tài nguyên vô hạn.

Một model có thể rất tốt.

Nhưng bạn có thể hết quota.

Một provider có thể rất phù hợp.

Nhưng có thể có giới hạn sử dụng.

Một dịch vụ có thể miễn phí trong một điều kiện nhất định.

Nhưng điều kiện đó có thể thay đổi.

Vì vậy, tôi không muốn project phụ thuộc vào giả định:

> “AI này lúc nào cũng available.”

Tôi bắt đầu nghĩ về availability như một thuộc tính kỹ thuật.

AI có thể ở trạng thái:

> AVAILABLE

hoặc:

> QUOTA_LIMITED

hoặc:

> QUOTA_EXHAUSTED

hoặc:

> UNAVAILABLE

hoặc:

> DEGRADED

hoặc:

> BLOCKED

và trong một số trường hợp:

> PAID_AVAILABLE

Điều này nghe có vẻ rất kỹ thuật.

Nhưng ý tưởng rất đơn giản:

> Một project thực tế không thể giả định rằng một AI luôn sẵn sàng.

<!-- BVCE_NAV: MAJOR_TOPIC_4 -->

## TÔI BẮT ĐẦU NGHĨ VỀ AI NHƯ MỘT TÀI NGUYÊN CÓ THỂ ROUTE

Đây là một bước chuyển tư duy quan trọng.

Thay vì:

> Project → AI

Tôi bắt đầu nghĩ:

> Task → Requirements → Eligible AI → Execute

Tức là task đến trước.

Sau đó mới quyết định AI nào phù hợp.

Điều này dẫn tới một khái niệm:

> AI Routing.

Routing ở đây không đơn giản là:

> “AI nào đang rẻ nhất?”

Nó là:

> “AI nào đủ điều kiện để thực hiện task này một cách an toàn, chính xác và hiệu quả?”

Và giá chỉ là một trong những yếu tố cuối cùng.

### KHÔNG PHẢI TASK NÀO CŨNG ĐƯỢC PHÉP GỬI CHO MỌI AI

Đây là lúc security bắt đầu trở thành một phần của bài toán routing.

Hãy tưởng tượng task liên quan đến:

production credentials,

customer data,

production database,

private source code,

security policy,

hoặc một thuật toán proprietary.

Tôi không thể chỉ hỏi:

> “AI nào rẻ nhất?”

Tôi phải hỏi:

> “AI nào được phép nhìn thấy dữ liệu này?”

Đó là một câu hỏi hoàn toàn khác.

Vì vậy, thứ tự suy nghĩ của tôi bắt đầu thay đổi.

Đầu tiên:

> Data Sensitivity

Sau đó:

> Security Boundary

Sau đó:

> Governance

Sau đó:

> Capability

Sau đó:

> State Compatibility

Sau đó:

> Verification Capability

Sau đó mới đến:

> Quality / Risk

> Availability / Quota

> Total Effective Cost

Và cuối cùng:

> Economic Time Preference

Tôi không nhất thiết phải nhớ tất cả những thuật ngữ này khi mở AI lên để làm một task nhỏ.

Nhưng khi xây một workflow có nhiều AI, thứ tự đó trở nên rất quan trọng.

### SECURITY FIRST, COST SECOND

Đây là một nguyên tắc mà tôi dần trở nên rất rõ ràng:

> Security first, cost second.

Không phải:

> “Miễn phí trước, security sau.”

Không.

Nếu một AI rẻ nhưng không được phép nhận dữ liệu của task, nó bị loại ngay.

Nếu một AI rất mạnh nhưng không nằm trong security boundary phù hợp, nó cũng bị loại.

Nếu AI không thể load đúng Project State, nó có thể bị loại ngay cả khi capability rất cao.

Tức là:

> Capability does not create Authority.

AI có khả năng làm một việc không có nghĩa là AI được phép làm việc đó.

Đây là một trong những nguyên tắc quan trọng nhất mà tôi muốn giữ lại xuyên suốt cuốn sách.

### NHƯNG CÒN STATE COMPATIBILITY

Có một yếu tố ít người nghĩ đến khi chọn AI:

> AI đó có thể tiếp tục đúng trạng thái project hay không?

Giả sử AI A đã làm việc ba giờ.

Project đã thay đổi.

Một số task đã hoàn thành.

Một số task đang pending.

Có một architecture decision mới.

Có một migration vừa được thực hiện.

Có một bug đang unresolved.

Sau đó AI A dừng lại.

Tôi chuyển sang AI B.

AI B có capability cao hơn.

Nhưng nếu AI B không có cách đọc:

> Project State,

> Current Context,

> Decision History,

> Changes,

> Evidence,

thì capability cao hơn không giúp được nhiều.

AI B vẫn có thể rất thông minh.

Nhưng nó không biết project đang ở đâu.

Đó là lý do tôi bắt đầu xem:

> State Compatibility

là một điều kiện riêng.

### MỘT AI KHÔNG BIẾT PROJECT ĐANG Ở ĐÂU KHÔNG PHẢI LÀ AI PHÙ HỢP

Điều này đặc biệt rõ khi project kéo dài.

Hãy tưởng tượng:

AI A làm việc buổi sáng.

Đến chiều, quota hết.

Tôi chuyển sang AI B.

Buổi tối AI B làm tiếp.

Sáng hôm sau AI A quay lại.

Nếu mỗi AI đều có một cách hiểu khác nhau về project, tôi đang tạo ra:

> ba phiên bản sự thật.

Đó là điều tôi không muốn.

Tôi muốn:

một project,

một state,

một cách hiểu canonical,

nhưng có thể có nhiều AI Executor.

Đây là lý do câu:

> One Method. Multiple Executors. One Project.

bắt đầu trở nên có ý nghĩa.

### TÔI CŨNG HỌC ĐƯỢC RẰNG “AI MẠNH” CÓ THỂ LÀM TASK QUÁ LỚN

Đây là một điều khá thú vị.

Khi AI thông minh hơn, chúng ta dễ có xu hướng giao cho nó nhiều hơn.

Một model yếu:

> “Hãy sửa field này.”

Một model mạnh:

> “Hãy refactor module này.”

Một model rất mạnh:

> “Hãy xem toàn bộ architecture và tối ưu project.”

Nghe rất hấp dẫn.

Nhưng task càng lớn:

> scope càng rộng.

Scope càng rộng:

> blast radius càng lớn.

Blast radius càng lớn:

> verification càng khó.

Verification càng khó:

> risk càng cao.

Vì vậy, AI mạnh hơn đôi khi không phải lý do để tôi mở rộng task.

Nó có thể là lý do để tôi thu nhỏ task nhưng hoàn thành nó tốt hơn.

Đây là một nghịch lý mà tôi rất thích:

> AI mạnh hơn không làm Task Decomposition trở nên ít quan trọng hơn. Nó làm Task Decomposition trở nên quan trọng hơn.

<!-- BVCE_NAV: MAJOR_TOPIC_5 -->

## TÔI BẮT ĐẦU THAY ĐỔI CÁCH ĐO “ĐI NHANH”

Tốc độ của AI có thể vượt qua tốc độ kiểm tra của con người.

Đây mới là vấn đề thật sự.

AI có thể viết rất nhanh.

Nhưng tôi không thể verify nhanh như AI viết.

AI có thể thay đổi mười file trong vài giây.

Tôi có thể cần hàng chục phút để hiểu ảnh hưởng.

AI có thể tạo một architecture proposal trong vài phút.

Tôi có thể mất nhiều giờ để đánh giá trade-off.

AI có thể tạo hàng trăm dòng test.

Nhưng tôi vẫn phải hỏi:

Các test đó có kiểm tra đúng requirement không?

Tốc độ generation vì vậy không phải bottleneck duy nhất.

Đôi khi bottleneck là:

comprehension.

Đôi khi là:

verification.

Đôi khi là:

decision-making.

Đôi khi là:

context recovery.

Đó là lý do tôi không còn muốn đo hiệu quả bằng:

> “AI viết được bao nhiêu dòng code mỗi phút?”

Một metric như vậy có thể rất ấn tượng.

Nhưng không nói cho tôi biết project có tiến gần đến completion hay không.

### TÔI BẮT ĐẦU THAY ĐỔI CÁCH ĐO “ĐI NHANH”

Ngày trước:

> Nhanh = viết code nhanh.

Bây giờ:

> Nhanh = hoàn thành đúng một task với ít rework nhất.

Đây là hai định nghĩa khác nhau.

Một task mất 10 phút để code nhưng 2 giờ để sửa không nhanh.

Một task mất 30 phút để code, 5 phút để verify và hoàn thành ngay lần đầu có thể nhanh hơn rất nhiều.

Vì vậy tôi bắt đầu nhìn một công thức đơn giản hơn:

> Effective Speed = Successful Completion / Total Effort

Không phải tốc độ gõ code.

Không phải số token.

Không phải số request.

Mà là:

> Bao nhiêu công việc thực sự được hoàn thành trên tổng effort bỏ ra.

### MODEL SWITCHING KHÔNG PHẢI LÚC NÀO CŨNG CÓ LỢI

Khi bắt đầu nghĩ về nhiều AI, tôi từng có một ý tưởng rất hấp dẫn:

> “Nếu AI này không tốt, cứ đổi AI khác.”

Nhưng rồi tôi nhận ra:

> đổi AI cũng có cost.

Tôi phải chuyển context.

Tôi phải kiểm tra state.

Tôi phải xác nhận AI mới hiểu project.

Tôi phải verify lại những thứ nó đọc được.

Nếu switching quá thường xuyên, một phần thời gian của tôi sẽ biến thành:

> AI administration.

Không còn là engineering.

Vì vậy, tôi bắt đầu có một nguyên tắc:

> Switch only when the expected benefit is greater than the switching cost.

Nói đơn giản:

> Chỉ đổi AI khi lợi ích kỳ vọng lớn hơn chi phí chuyển đổi.

### TÔI KHÔNG MUỐN “ROUTE THE MODEL”. TÔI MUỐN ROUTE THE WORK

Đây là một distinction rất quan trọng.

Nếu chỉ route model, bạn sẽ hỏi:

> “Model nào đang tốt nhất?”

Nếu route work, bạn hỏi:

> “Task này cần gì?”

Ví dụ:

Task A:

> Rename một field.

Có thể dùng AI nhẹ.

Task B:

> Implement một API mới.

Có thể cần AI coding có capability tốt hơn.

Task C:

> Thay đổi authentication architecture.

Capability, governance và verification phải cao hơn rất nhiều.

Task D:

> Xử lý production security incident.

Đây có thể là một task mà không được phép tự động giao hoàn toàn cho AI.

AI có thể hỗ trợ.

Nhưng authority, verification và human review phải mạnh hơn.

Vì vậy, routing phải bắt đầu từ task risk, không bắt đầu từ model ranking.

### TỪ R0 ĐẾN R4

Tôi bắt đầu dùng một cách phân loại rất đơn giản để suy nghĩ về risk.

> R0 — Routine

Task lặp lại, tác động thấp.

> R1 — Low

Task có ảnh hưởng nhỏ, verification tương đối đơn giản.

> R2 — Moderate

Task có nhiều thành phần hoặc ảnh hưởng đáng kể đến behavior.

> R3 — High

Task ảnh hưởng đến security, architecture quan trọng, dữ liệu hoặc production behavior.

> R4 — Critical

Task có consequence rất lớn nếu làm sai.

Điều quan trọng không phải là nhớ bốn chữ cái.

Điều quan trọng là:

> Task risk phải ảnh hưởng đến cách tôi chọn AI và cách tôi verify kết quả.

AI có thể tự do hơn ở R0.

Nhưng R4 cần một mức kiểm soát hoàn toàn khác.

### TÔI BẮT ĐẦU NHÌN AI THEO “ELIGIBILITY”

Một AI chỉ được chọn khi nó eligible cho task.

Eligible nghĩa là:

AI đó đủ điều kiện để thực hiện task trong hoàn cảnh cụ thể.

Không chỉ:

> “AI này có thể code.”

Mà phải là:

> AI này có được phép nhận task này không?

> AI này có đủ capability không?

> AI này có đọc được context cần thiết không?

> AI này có tương thích với Project State không?

> Tôi có thể verify kết quả không?

> Risk của task có phù hợp với mức autonomy của AI không?

Chỉ khi các điều kiện đó đạt, cost mới trở thành yếu tố để cân nhắc.

Đây là điểm rất quan trọng:

> Cheapest eligible executor.

Không phải:

> Cheapest executor.

Hai câu này hoàn toàn khác nhau.

### VÀ ĐÓ LÀ LÚC TÔI HÌNH THÀNH MỘT NGUYÊN TẮC

Sau một thời gian thử nghiệm, tôi bắt đầu mô tả routing theo cách này:

> SELECT THE LOWEST-COST ELIGIBLE EXECUTOR THAT CAN SAFELY AND CORRECTLY COMPLETE THE AUTHORIZED TASK WITH REQUIRED GOVERNANCE, SECURITY, STATE COMPATIBILITY, VERIFICATION AND ACCEPTABLE QUALITY.

Tạm dịch theo cách dễ hiểu:

> Hãy chọn AI Executor có tổng chi phí thấp nhất trong số những Executor đủ điều kiện để hoàn thành task đã được cho phép một cách an toàn, chính xác, phù hợp với governance, security, Project State, khả năng verification và chất lượng yêu cầu.

Đây không phải là một câu để bạn copy vào mọi prompt.

Nó là một engineering principle.

Nó giúp tôi tránh hai cực đoan:

> AI càng mạnh càng tốt.

và:

> AI càng rẻ càng tốt.

Cả hai đều quá đơn giản.

### MỘT AI MIỄN PHÍ CÓ THỂ LÀ LỰA CHỌN TỐT NHẤT

Có.

Nếu task đơn giản.

Nếu security phù hợp.

Nếu capability đủ.

Se state tương thích.

Nếu verification rõ ràng.

Nếu chất lượng chấp nhận được.

Nếu quota còn.

Thì tại sao không dùng?

Đó là lý do tôi thích Free-first.

Nó giữ cho hệ thống có thể vận hành với chi phí rất thấp khi điều kiện cho phép.

Nhưng:

> Free-first không có nghĩa free-only.

Đây là một distinction tôi muốn nhấn mạnh.

### MỘT AI TRẢ PHÍ CŨNG CÓ THỂ LÀ LỰA CHỌN ĐÚNG

Có.

Nếu task khó.

Nếu rework với AI khác quá cao.

Nếu task có giá trị kinh tế lớn.

Nếu thời gian con người đắt hơn AI cost.

Nếu task cần capability mà AI miễn phí không có.

Nếu một model trả phí giúp tôi giảm đáng kể thời gian completion.

Khi đó trả tiền có thể là quyết định rất hợp lý.

Đó là lý do tôi không muốn biến “AI cost thấp” thành mục tiêu tuyệt đối.

Tôi không muốn thắng một cuộc thi:

> “Ai xây phần mềm bằng AI với hóa đơn thấp nhất?”

Tôi muốn thắng một bài toán khác:

> “Làm thế nào để hoàn thành công việc với tổng chi phí hợp lý nhất?”

### VÀ TÔI BẮT ĐẦU NHÌN “$5” THEO MỘT CÁCH KHÁC

Trong experiment của tôi, chi phí AI trực tiếp ban đầu có lúc chỉ ở mức khoảng vài USD.

Nhìn từ bên ngoài, đó là một con số rất đẹp.

Nhưng tôi không muốn biến nó thành một slogan kiểu:

> “Xây phần mềm chỉ với $5.”

Không.

Điều đó vừa không chính xác, vừa không có nhiều ý nghĩa.

Điều thú vị nằm ở phía sau con số đó.

Tại sao chi phí thấp?

Không chỉ vì có AI miễn phí.

Mà vì:

task được chia nhỏ,

workflow được kiểm soát,

rework được giảm,

AI đắt tiền không được dùng cho mọi việc,

và project có thể tiếp tục khi một executor gặp giới hạn.

Đó mới là experiment tôi thực sự muốn kể.

### AI KHÔNG PHẢI MỘT SUBSCRIPTION

Đây có lẽ là một thay đổi tư duy rất lớn.

Tôi bắt đầu không nhìn AI theo:

> “Mình đang mua gói nào?”

mà theo:

> “Mình đang có những execution capabilities nào?”

Một provider có thể cung cấp một capability.

Provider khác có capability khác.

Một AI có thể mạnh về coding.

Một AI có thể phù hợp với reasoning.

Một AI có thể tốt cho routine tasks.

Một AI có thể phù hợp hơn trong local environment.

Một AI có thể phù hợp với security boundary này nhưng không phù hợp với boundary khác.

Khi nhìn như vậy, provider trở thành một implementation detail của execution layer.

> Task vẫn là trung tâm.

### PROVIDER CÓ THỂ THAY ĐỔI

Đây là lúc một nguyên tắc khác xuất hiện:

> Provider may change; Engineering Method must not.

AI provider có thể thay đổi.

Model có thể thay đổi.

Pricing có thể thay đổi.

Quota có thể thay đổi.

Tool có thể thay đổi.

Nhưng tôi không muốn mỗi lần provider thay đổi lại phải thay đổi toàn bộ engineering method của project.

Tôi muốn:

một cách làm việc ổn định,

và nhiều executor có thể thực hiện cách làm việc đó.

Đó là lý do về sau tôi sẽ nói nhiều hơn về:

semantic contract,

Execution Contract,

Project State,

Context Engineering,

và

PAECS.

Nhưng ở thời điểm này, tôi chỉ mới có một trực giác:

> AI nên là thành phần có thể thay thế. Project không nên bị khóa vào một AI.

### NHƯNG CÓ MỘT CÁI BẪY KHÁC

Nếu nhiều AI cùng có thể tham gia project, rất dễ xuất hiện một suy nghĩ:

> “Vậy cứ cho tất cả AI cùng làm.”

Điều đó nghe rất hiệu quả.

Một AI viết code.

Một AI review.

Một AI sửa.

Một AI tối ưu.

Một AI test.

Một AI refactor.

Nhưng nếu không kiểm soát, bạn có thể biến một project thành một nơi có:

nhiều AI,

nhiều cách hiểu,

nhiều thay đổi,

nhiều state khác nhau.

Đó là lúc tôi nhận ra:

> More AI does not automatically mean more speed.

Đôi khi:

> More AI means more coordination cost.

### TÔI BẮT ĐẦU HIỂU “ORCHESTRATION” KHÁC VỚI “MỞ THÊM AI”

Orchestration nghĩa đơn giản là điều phối nhiều thành phần để chúng thực hiện công việc theo một cách có tổ chức.

Trong AI Engineering, điều đó có nghĩa:

AI nào làm task nào?

Khi nào?

Dựa trên context nào?

Có được phép thay đổi gì?

AI nào verify?

State được cập nhật khi nào?

Ai tiếp tục nếu executor hiện tại dừng?

Nếu hai AI có ý kiến khác nhau thì sao?

Đó không còn là vấn đề của model.

Đó là vấn đề của engineering system.

Và tôi bắt đầu hiểu:

> Nhiều AI chỉ có giá trị khi chúng cùng phục vụ một project state và một engineering method.

### TÔI KHÔNG MUỐN TỐI ƯU “AI USAGE”

Tôi muốn tối ưu PROJECT PROGRESS.

Đây là một distinction nữa mà tôi phải mất thời gian mới hiểu.

Tôi có thể làm cho AI hoạt động liên tục cả ngày.

Prompt liên tục.

Code liên tục.

Refactor liên tục.

Review liên tục.

Nhưng project có thực sự tiến không?

Một project có thể có:

500 commit,

10.000 dòng code mới,

100 prompt,

20 lần refactor,

và vẫn chưa giải quyết đúng vấn đề của user.

Vì vậy:

> AI Activity ≠ Engineering Progress.

Và:

> Engineering Progress ≠ Product Progress.

Đây là những khoảng cách mà tôi sẽ còn quay lại nhiều lần trong các chương sau.

### CÁI TÔI CẦN ĐO LÀ COMPLETION

Tôi bắt đầu quan tâm đến những câu hỏi đơn giản hơn:

Task có hoàn thành không?

Requirement có được đáp ứng không?

Kết quả có được verify không?

Project State có được cập nhật không?

Có thể tiếp tục task tiếp theo không?

Có rework không?

Có lỗi quay trở lại không?

Tổng effort là bao nhiêu?

Tổng cost là bao nhiêu?

Đó là lúc tôi bắt đầu thấy:

> Completion is the real unit of progress.

Không phải token.

Not prompt.

Không phải số dòng code.

Không phải số model đã thử.

> Completion.

### MỘT AI TỐT HƠN VẪN CÓ THỂ CHO RA MỘT KẾT QUẢ TỆ

Điều này cần nói rõ.

Không phải vì AI mạnh hơn không có giá trị.

Mà vì AI không hoạt động trong chân không.

Một AI tốt nhưng:

không hiểu requirement,

thiếu context,

không biết constraint,

không biết authority,

không biết Project State,

không có acceptance criteria,

không có verification,

vẫn có thể tạo ra một kết quả tệ.

Ngược lại, một AI vừa đủ tốt nhưng được cung cấp:

task rõ,

context đúng,

scope hẹp,

authority rõ,

verification rõ,

có thể cho một kết quả rất tốt.

Đó là lý do tôi bắt đầu thay đổi ưu tiên:

> Better Method trước khi Better Model.

### TÔI KHÔNG PHẢN ĐỐI AI MẠNH

Tôi muốn nói điều này rõ ràng.

Tôi không cho rằng model mạnh là không cần thiết.

Ngược lại.

AI càng mạnh càng mở ra những khả năng mới.

Những task phức tạp hơn trở nên khả thi.

Những architecture problems khó hơn có thể được hỗ trợ.

Những codebase lớn hơn có thể được phân tích.

Reasoning sâu hơn có thể tạo ra giá trị.

Nhưng:

> AI capability nên được sử dụng như một resource có mục đích.

Không phải một thứ phải bật tối đa ở mọi task.

### TÔI BẮT ĐẦU CÓ MỘT CÁCH NGHĨ NGƯỢC

Thay vì hỏi:

> “Task này có khó không?”

Tôi hỏi:

> “Task này cần capability gì?”

Thay vì:

> “Model nào mạnh nhất?”

Tôi hỏi:

> “Model nào đủ tốt?”

Thay vì:

> “Tại sao AI này không làm được?”

Tôi hỏi:

> “Task này đã được định nghĩa đủ tốt chưa?”

Thay vì:

> “Có nên mua AI khác không?”

Tôi hỏi:

> “Switching có thực sự tạo ra giá trị lớn hơn switching cost không?”

Thay vì:

> “Làm sao để AI làm nhiều hơn?”

Tôi hỏi:

> “Làm sao để project hoàn thành nhiều hơn?”

Đó chính là Reverse Thinking.

---

## KEY IDEA

AI mạnh hơn là một capability tốt. Nhưng capability không tự động tạo ra speed.

Speed đến từ:

đúng task

→ đúng context

→ đúng AI Executor

→ đúng scope

→ đúng verification

→ ít rework

→ completion

Đó là lý do:

> The Best AI Is Not Always the Best AI for the Job.

---

## WHAT I LEARNED

Tôi bắt đầu hành trình này với câu hỏi:

> “AI nào tốt nhất?”

Sau đó tôi chuyển sang:

> “AI nào đủ tốt cho task này?”

Và cuối cùng:

> “AI nào đủ điều kiện để hoàn thành task này với tổng chi phí thực tế thấp nhất?”

Ba câu hỏi nghe khá giống nhau.

Nhưng chúng dẫn đến ba cách xây phần mềm hoàn toàn khác nhau.

Cách thứ nhất tạo ra một cuộc đua model.

Cách thứ hai tạo ra một cuộc đua capability.

Cách thứ ba bắt đầu tạo ra một Engineering System.

---

## VÀ TÔI CÒN MỘT VẤN ĐỀ CHƯA GIẢI QUYẾT

Tôi đã biết rằng không cần AI mạnh nhất cho mọi task.

Tôi đã biết free-first không có nghĩa free-only.

Tôi đã biết quota có thể hết.

Tôi đã biết nhiều AI có thể thay phiên nhau.

Tôi đã biết project không nên bị khóa vào một provider.

Nhưng vẫn còn một câu hỏi rất khó:

> “Nếu tôi chuyển từ AI này sang AI khác, làm sao AI thứ hai biết chính xác project đang ở đâu?”

Tôi không muốn copy hàng trăm message.

Tôi không muốn paste lại toàn bộ lịch sử.

Tôi không muốn phụ thuộc vào một conversation.

Tôi không muốn bắt AI mới đoán.

Tôi muốn project tự mang theo context cần thiết.

Và lúc đó tôi nhận ra:

> Bài toán lớn hơn không còn là AI selection.

Nó là:

> Context selection.

AI nào cũng có thể thông minh.

Nhưng nếu AI nhận sai thứ nó cần, nó vẫn có thể làm sai.

Và đó chính là nơi tôi bắt đầu bước vào chương tiếp theo.

---

## CHUYỂN TIẾP

Tôi đã dành khá nhiều thời gian để tìm hiểu:

AI nào mạnh hơn.

Sau đó tôi nhận ra câu hỏi quan trọng hơn là:

AI đang biết gì về project của bạn?

Bởi vì một AI mạnh nhưng thiếu context có thể làm việc tệ hơn một AI vừa đủ tốt nhưng nhận đúng context.

Và từ đây, tôi bắt đầu đi vào một vấn đề mà lúc đầu tôi không nghĩ sẽ quan trọng đến thế:

AI không nhớ project của bạn.

Và vấn đề còn sâu hơn nữa:

Project của bạn không thể phụ thuộc vào trí nhớ của AI.

Đó là câu chuyện của Chương 3.

---

# NAVIGATION TREE

CHƯƠNG 2 - AI MẠNH HƠN KHÔNG CÓ NGHĨA LÀ BẠN SẼ ĐI NHANH HƠN
├── TÔI TỪNG NGHĨ MODEL MẠNH HƠN SẼ GIẢI QUYẾT MỌI THỨ
├── CHI PHÍ THẬT KHÔNG NẰM Ở GIÁ MỘT REQUEST
├── TÔI KHÔNG MUỐN CHỌN AI CHỈ BẰNG GIÁ
├── TÔI BẮT ĐẦU NGHĨ VỀ AI NHƯ MỘT TÀI NGUYÊN CÓ THỂ ROUTE
└── TÔI BẮT ĐẦU THAY ĐỔI CÁCH ĐO “ĐI NHANH”
