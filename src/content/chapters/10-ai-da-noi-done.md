---
id: "10-ai-da-noi-done"
title: "AI ĐÃ NÓI \"DONE\". NHƯNG TÔI KHÔNG TIN"
subtitle: "Từ Test Passing đến Engineering Evidence, Regression và Verified State"
shortTitle: "AI đã nói \"Done\". Nhưng tôi không tin"
order: 10
description: "Why automatic linting, compiling, and runtime testing are mandatory counterparts to AI-generated code."
readingTime: "8 min"
topics: ["testing", "compilation", "evidence", "verification"]
hero: "images/chapter-10-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
updated: "2026-09-10"
version: "1.0.0"
---

# CHƯƠNG 10

# AI ĐÃ NÓI "DONE". NHƯNG TÔI KHÔNG TIN

*Từ Test Passing đến Engineering Evidence, Regression và Verified State*

Ở cuối chương trước, tôi đã đi đến một kết luận khá rõ:

> AI không cần biết tất cả. AI cần biết đúng thứ nó cần để làm đúng task.

Tôi bắt đầu có:

Task.

Context.

Authority.

Project State.

Execution Contract.

Controlled Autonomy.

Context Compiler.

Mọi thứ có vẻ đang dần vào đúng vị trí.

Nhưng rồi tôi gặp một vấn đề còn khó chịu hơn.

AI làm xong một task.

Nó báo:

> Done.

Tôi chạy application.

Không có error rõ ràng.

Test pass.

AI nói:

> "Everything is working."

Và tôi nhìn vào màn hình.

Tôi không tin.

Không phải vì tôi nghĩ AI đang nói dối.

Mà vì:

> "Done" chưa phải là evidence.

## TÔI ĐÃ TỪNG COI "TEST PASS" LÀ ĐỦ

Đây là một suy nghĩ rất dễ mắc phải.

Task được giao.

AI viết code.

AI chạy test.

Test pass.

Vậy:

Done.

Nhưng khi làm project thực tế, tôi bắt đầu thấy một khoảng cách rất lớn giữa:

code chạy được

và:

requirement được đáp ứng đúng.

Một test có thể pass.

Nhưng test đó có thể đang kiểm tra sai thứ.

Một API có thể trả HTTP 200.

Nhưng business result có thể sai.

Một UI có thể hiển thị đúng.

Nhưng dữ liệu phía sau có thể sai.

Một permission test có thể pass cho admin.

Nhưng user thường vẫn có thể truy cập dữ liệu không được phép.

Một migration có thể chạy thành công.

Nhưng dữ liệu cũ có thể đã bị biến dạng.

Vì vậy:

> Test passing is evidence. It is not automatically proof of completion.

### AI CLAIM ≠ ENGINEERING EVIDENCE

Tôi bắt đầu tách một thứ rất quan trọng:

AI Claim

và:

Engineering Evidence.

AI Claim là:

> "Tôi đã hoàn thành."

Engineering Evidence là:

> "Đây là bằng chứng cho thấy requirement đã được thực hiện và kiểm chứng trong phạm vi xác định."

Hai thứ này khác nhau hoàn toàn.

AI có thể claim đúng.

AI cũng có thể claim sai.

Nhưng dù claim đúng, tôi vẫn cần evidence.

### BỐN TRẠNG THÁI MÀ TÔI BẮT ĐẦU DÙNG

Tôi nhận ra rằng giữa "chưa làm" và "đã verify" có nhiều trạng thái trung gian.

Tôi bắt đầu nhìn một change theo bốn mức:

> CODE EXISTS

Code đã được tạo hoặc thay đổi.

> CODE RUNS

Code có thể chạy trong một environment phù hợp.

> REQUIREMENT SATISFIED

Behavior thực tế đáp ứng requirement đã được authorized.

> VERIFIED

Requirement đã được kiểm chứng bằng evidence phù hợp với risk.

Bốn trạng thái này rất quan trọng.

Bởi vì:

> CODE EXISTS ≠ CODE RUNS

và:

> CODE RUNS ≠ REQUIREMENT SATISFIED

và:

> REQUIREMENT SATISFIED ≠ VERIFIED

### "DONE" LÀ MỘT CLAIM

Tôi bắt đầu nhìn từ "Done" rất khác.

Khi AI nói:

> Done.

Tôi không còn tự động hiểu rằng:

status = VERIFIED

Tôi hiểu rằng:

> AI đang đưa ra một claim về trạng thái của task.

Claim này cần được kiểm tra.

Nếu evidence đủ mạnh:

task có thể chuyển state.

Nếu evidence chưa đủ:

task vẫn chưa VERIFIED.

Đây là một thay đổi rất nhỏ về semantics nhưng rất lớn về engineering.

### TÔI KHÔNG MUỐN AI BỊ BUỘC PHẢI NÓI "DONE"

Đây là một điểm tôi rất quan tâm.

Một AI tốt không phải AI luôn trả lời:

> "Đã xong."

Tôi muốn AI có thể nói:

> "Tôi đã implement nhưng chưa verify được requirement này."

Hoặc:

> "Unit tests pass, nhưng integration test chưa được chạy."

Hoặc:

> "Code tồn tại và build thành công, nhưng tôi không có đủ evidence để kết luận production behavior."

Hoặc đơn giản:

> "Blocked."

Tôi coi những câu đó là behavior tốt.

Bởi vì chúng phản ánh đúng uncertainty.

### NO EVIDENCE, NO VERIFIED STATE

Từ đây xuất hiện một nguyên tắc mà tôi bắt đầu giữ rất chặt:

> NO EVIDENCE, NO VERIFIED STATE.

Không có nghĩa mọi task đều cần một bộ hồ sơ khổng lồ.

Một task đơn giản có thể chỉ cần một test.

Một task UI có thể cần screenshot hoặc behavioral verification phù hợp.

Một API change có thể cần unit test, integration test và contract check.

Một database migration có thể cần schema validation, migration test và data integrity check.

Một security change cần evidence tương ứng với risk.

Điều quan trọng là:

> Verified State phải có cơ sở.

## EVIDENCE LÀ GÌ?

Evidence là thông tin hoặc artifact giúp chứng minh một claim.

Nó có thể là:

test result,

build result,

screenshot,

log,

API response,

database verification,

migration result,

security check,

performance measurement,

manual review,

production observation,

hoặc một artifact kỹ thuật khác.

Không phải evidence nào cũng có cùng sức mạnh.

Một screenshot có thể cho thấy UI.

Nó không chứng minh database integrity.

Một unit test có thể chứng minh một behavior cụ thể.

Nó không tự động chứng minh toàn bộ workflow production.

Một build thành công chứng minh code có thể build.

Nó không chứng minh requirement đã đạt.

### VERIFICATION KHÔNG PHẢI "CHẠY HẾT TEST"

Một cách rất dễ giải quyết là:

> "Cứ chạy toàn bộ test suite."

Có thể hữu ích.

Nhưng chưa đủ.

Regression suite có thể không chứa requirement mới.

Một test có thể pass vì test quá yếu.

Một workflow có thể sai nhưng test không bao phủ.

Một security issue có thể nằm ngoài automated testing.

Vì vậy verification phải bắt đầu từ:

> "Requirement này có thể sai theo những cách nào?"

Sau đó mới xác định evidence cần thiết.

### RISK-BASED VERIFICATION

Tôi bắt đầu nhìn verification theo risk.

Task R0 không cần cùng mức evidence với R4.

Ví dụ:

Đổi một label trên UI.

Có thể chỉ cần visual/functional check.

Đổi authentication architecture.

Cần nhiều lớp verification hơn.

Thay đổi database schema production.

Cần migration verification và data integrity consideration.

Thay đổi security boundary.

Cần verification phù hợp với security consequence.

Vì vậy:

> Verification depth should follow consequence, not convenience.

### AI CÓ THỂ VERIFY MỘT PHẦN

Tôi không muốn biến verification thành:

> "AI làm xong rồi con người kiểm tra tất cả."

Điều đó không scale.

AI có thể chạy:

unit tests,

integration tests,

static analysis,

lint,

type checks,

migration checks,

specific workflows,

API contract tests.

AI có thể thu thập evidence.

AI có thể report.

Nhưng với những verification yêu cầu authority, judgment hoặc access mà AI không có, human review vẫn cần thiết.

### VERIFICATION CAPABILITY CŨNG LÀ MỘT TIÊU CHÍ CHỌN EXECUTOR

Đây là một kết nối rất thú vị với Chương 2.

Khi chọn AI Executor, tôi không chỉ hỏi:

> "AI này code tốt không?"

Tôi cũng hỏi:

> "AI này có thể verify task này đến mức nào?"

Một executor có thể code rất giỏi.

Nhưng nếu task cần một loại verification mà nó không thể thực hiện, nó không phải executor phù hợp để tự hoàn thành task đó.

Vì vậy:

Capability to build

và:

Capability to verify

là hai thứ khác nhau.

## CHANGE ≠ VERIFICATION

Một AI sửa code.

Đó là Change.

Một test chạy.

Đó là Evidence.

Một engineer kết luận rằng requirement đã đạt.

Đó là Verification.

Và project chuyển trạng thái.

Đó là State Transition.

Tôi bắt đầu tách những khái niệm này rất rõ.

### DIFF ≠ VERIFICATION

Đây là một distinction khác.

Git diff cho thấy:

> cái gì đã thay đổi.

Nhưng nó không cho tôi biết:

> cái thay đổi đó có đúng không.

Một diff 20 dòng có thể phá một hệ thống quan trọng.

Một diff 500 dòng có thể chỉ là refactor được kiểm soát.

Vì vậy:

> Small diff ≠ low risk

và:

> Large diff ≠ high risk

Risk phải được đánh giá dựa trên impact.

### CHANGE IMPACT

Tôi bắt đầu muốn mỗi change quan trọng có một cách nhìn về impact.

Ví dụ:

Business Behavior

UI

API

Database

Security

Dependencies

Configuration

Operational Behavior

Nếu change ảnh hưởng nhiều domain, verification phải phản ánh điều đó.

Điều này cũng giúp AI không chỉ báo:

> "Tôi đã sửa 8 file."

mà báo:

> "Change này ảnh hưởng authentication, API và database."

Đó là information có giá trị hơn nhiều.

### REGRESSION LÀ MỘT VẤN ĐỀ RIÊNG

Một task có thể đúng.

Nhưng change của task đó có thể phá thứ khác.

Đây là regression.

Ví dụ:

Tôi sửa validation để giải quyết requirement A.

Requirement A giờ đúng.

Nhưng một workflow cũ B không còn chạy.

AI có thể báo:

> "Test A pass."

Nhưng project vẫn có vấn đề.

Vì vậy tôi bắt đầu hỏi thêm:

> "Change này có làm hỏng behavior đã đúng trước đây không?"

### REGRESSION KHÔNG CHỈ LÀ TEST SUITE

Một test suite có thể không bao phủ:

business workflow,

edge case,

data migration,

security behavior,

operational condition.

Vì vậy regression verification cần dựa trên:

change impact

+

known dependencies

+

existing evidence

+

risk.

### TEST COVERAGE ≠ REQUIREMENT COVERAGE

Đây là một câu tôi muốn giữ lại.

Một project có thể có:

90% test coverage.

Nhưng vẫn chưa chắc requirement coverage cao.

Coverage đo một số khía cạnh của code.

Requirement coverage hỏi:

> Các điều kiện mà product cần thực hiện đã được kiểm tra đủ chưa?

Hai thứ có liên hệ.

Nhưng không thay thế nhau.

### AI CÓ THỂ TẠO RẤT NHIỀU TEST

Đây là một khả năng tuyệt vời.

Nhưng số lượng test không phải quality.

AI có thể tạo 100 test.

Nhưng nếu tất cả đều kiểm tra happy path, tôi vẫn có một vấn đề.

AI có thể tạo test rất dài.

Nhưng nếu expectation sai, tôi chỉ có rất nhiều evidence giả.

Vì vậy tôi muốn hỏi:

> "Test đang bảo vệ requirement nào?"

Đó là câu hỏi quan trọng hơn:

> "Có bao nhiêu test?"

### EVIDENCE LINEAGE

Tôi bắt đầu muốn biết evidence đến từ đâu.

Ví dụ:

```text
Requirement R-001
↓
Implementation C-004
↓
Test T-018
↓
Result E-024
↓
Verification V-006
↓
State VERIFIED
```

Đây là evidence lineage.

Nó tạo ra một chuỗi:

> Requirement → Change → Evidence → Verification → State

Khi có chuỗi này, project dễ audit hơn.

Và AI tiếp theo cũng dễ hiểu hơn.

## CLAIMED STATE VÀ VERIFIED STATE

Tôi bắt đầu tách hai khái niệm:

Claimed State

AI hoặc developer nói project đang ở trạng thái nào.

và:

Verified State

Project được chứng minh đang ở trạng thái nào.

Ví dụ:

AI nói:

authentication = completed

Nhưng evidence mới chỉ có unit test.

Nếu integration verification chưa chạy:

Claimed State:

COMPLETED

Verified State:

PARTIALLY_VERIFIED

hoặc state phù hợp với model của project.

Tôi không muốn system giả vờ certainty.

### COMPREHENSION DEBT

Tôi bắt đầu nhận ra một loại debt rất đặc biệt khi làm việc với AI:

> Comprehension Debt.

Đó là phần code đã được tạo ra nhưng con người chưa hiểu đủ để đánh giá một cách đáng tin cậy.

AI có thể viết 1.000 dòng.

Code có thể chạy.

Test có thể pass.

Nhưng nếu tôi không hiểu:

logic,

assumption,

trade-off,

dependency,

failure mode,

thì tôi đang tích lũy comprehension debt.

Debt này có thể chưa gây vấn đề ngay.

Nhưng khi cần debug hoặc thay đổi, nó có thể trở nên rất đắt.

### COMPREHENSION DEBT KHÔNG CÓ NGHĨA CON NGƯỜI PHẢI ĐỌC MỌI DÒNG

Đây là một nuance quan trọng.

Tôi không muốn quay về thời kỳ:

> "Muốn dùng AI thì phải đọc từng dòng code AI viết."

Không.

Tôi muốn con người hiểu đủ những phần có consequence.

Architecture.

Business logic quan trọng.

Security boundary.

Data integrity.

Critical failure modes.

Key dependencies.

Đó là nơi human comprehension cần tập trung.

### VERIFICATION VÀ HUMAN REVIEW

Human review cũng không nên là:

> "Người phải đọc hết."

Tôi muốn review dựa trên:

risk,

authority,

uncertainty,

blast radius,

evidence strength.

Một task R0 có thể dùng automated verification.

Một task R3 có thể cần human review.

Một task R4 gần như chắc chắn cần explicit authority ở decision point.

Đó là cách tôi muốn scale.

### AI PHẢI ĐƯỢC PHÉP NÓI "KHÔNG THỂ VERIFY"

Đây là một capability quan trọng.

Nếu AI không có:

production access,

real customer data,

hardware,

external dependency,

hoặc authority cần thiết,

nó không nên giả vờ verification.

Nó phải nói:

> "Tôi không thể verify phần này trong environment hiện tại."

Câu đó có thể khiến project chậm hơn.

Nhưng nó làm project trung thực hơn.

Và:

> Honest uncertainty is better than false confidence.

### VERIFICATION EVIDENCE CŨNG CÓ THỂ HẾT HIỆU LỰC

Một test pass hôm qua không có nghĩa hôm nay vẫn còn đúng.

Requirement có thể thay đổi.

Code có thể thay đổi.

Dependency có thể thay đổi.

Environment có thể thay đổi.

Vì vậy evidence phải có:

source,

timestamp,

scope,

state reference,

và khi cần:

version.

Nếu change làm invalid evidence cũ, system phải biết.

### VERIFICATION INVALIDATION

Ví dụ:

Authentication implementation đã VERIFIED.

Sau đó tôi thay security configuration.

Verification cũ có còn giá trị?

Có thể không.

Tôi cần invalidation.

Đây là một lý do Project State phải biết relationship giữa:

Change

và:

Evidence.

Một material change có thể làm evidence trước đó stale.

### EVIDENCE KHÔNG PHẢI MỘT CHECKBOX

Tôi từng nghĩ:

> "Có test result là đủ."

Nhưng sau này tôi nhìn evidence như một artifact có meaning.

Evidence phải có:

What

Cái gì được kiểm tra?

How

Kiểm tra bằng cách nào?

Against

Đối chiếu với requirement nào?

When

Khi nào?

Where

Ở environment nào?

Result

Kết quả gì?

Limitations

Có giới hạn gì?

Điều đó làm evidence có giá trị hơn nhiều.

### TÔI BẮT ĐẦU NGHĨ VỀ "VERIFICATION BUDGET"

Một task có risk thấp không cần dành một lượng verification vô hạn.

Một task critical có thể cần verification rất lớn.

Tôi bắt đầu nghĩ theo khái niệm:

Verification Budget

Tức là effort mà project chấp nhận bỏ ra để tăng confidence cho một change.

Budget này nên phụ thuộc:

risk;

blast radius;

business importance;

security impact;

uncertainty;

reversibility.

### REVERSIBLE VÀ IRREVERSIBLE CHANGE

Một change có thể dễ rollback.

Một change có thể khó rollback.

Một database destructive migration có consequence khác một UI label change.

Một production data mutation khác một local refactor.

Vì vậy verification phải đặc biệt chú ý:

> How reversible is this change?

Change càng khó rollback, tôi càng muốn evidence mạnh hơn trước execution hoặc release.

### TÔI BẮT ĐẦU DÙNG "EVIDENCE PACKAGE"

Đối với những task quan trọng, tôi muốn cuối task không chỉ có:

> "Done."

mà có:

Task

Change

Verification

Evidence

Known Limitations

Current State

Đó là một Evidence Package nhỏ.

Nó giúp:

handoff,

review,

audit,

recovery,

release.

## VERIFICATION LÀ MỘT STATE TRANSITION

Tôi bắt đầu nhìn lifecycle như:

```text
CODE EXISTS
↓
CODE RUNS
↓
TESTED
↓
REQUIREMENT CHECKED
↓
VERIFIED
↓
RELEASE READY
```

Không phải mọi task đều cần đúng số tầng này.

Nhưng tư duy rất quan trọng:

> Verification là một transition được chứng minh, không phải một câu nói.

### TÔI KHÔNG MUỐN AI TỰ NÂNG STATE

Một AI không nên làm:

> "Test pass, therefore VERIFIED."

Nếu governance của project yêu cầu thêm integration test, AI không được tự bỏ qua.

Nếu release authority chưa approve, AI không được chuyển sang RELEASED.

Nếu evidence scope chưa đủ, AI không được tự nâng state.

State transition phải tuân theo rules.

### VERIFICATION GATE

Tôi bắt đầu nghĩ mỗi task có thể đi qua một gate:

```text
REQUIREMENT
↓
IMPLEMENTATION
↓
EVIDENCE
↓
VERIFICATION
↓
STATE TRANSITION
```

Nếu evidence fail:

BLOCK.

Nếu requirement unclear:

BLOCK.

Nếu evidence insufficient:

BLOCK / PARTIALLY VERIFIED.

Nếu đạt:

STATE MAY ADVANCE.

Đây là cách tôi muốn ngăn "Done" trở thành một shortcut.

### AI CÓ THỂ NÓI "DONE" NHƯNG PROJECT VẪN CÓ THỂ NÓI "NOT VERIFIED"

Tôi đặc biệt thích distinction này.

AI:

> Done.

Project:

> Claim received.

Evidence:

> Partial.

Verification:

> Not yet sufficient.

Project State:

> IN_PROGRESS / IMPLEMENTED / PARTIALLY_VERIFIED

Điều này nghe có vẻ nghiêm khắc.

Nhưng nó phản ánh đúng thực tế.

### KEY IDEA

> AI Claim không phải Engineering Evidence.

> Code Exists không phải Verified State.

> Test Passing không tự động có nghĩa Requirement đã được đáp ứng.

Tôi muốn project có thể phân biệt rõ:

CLAIMED

IMPLEMENTED

TESTED

VERIFIED

và khi cần:

RELEASE READY

RELEASED

Bởi vì:

> Done is a claim. Verified is a state.

### WHAT I LEARNED

Tôi bắt đầu chương này với một AI nói:

> "Done."

Tôi kết thúc với một câu hỏi:

> "Bằng chứng đâu?"

Tôi không muốn AI trở nên ít tự tin.

Tôi muốn AI trở nên chính xác hơn về mức độ chắc chắn của chính nó.

Nếu AI đã implement nhưng chưa verify, hãy nói vậy.

If test pass nhưng requirement chưa được chứng minh, hãy nói vậy.

If không có access để kiểm tra production, hãy nói vậy.

If evidence đủ và state có thể chuyển, hãy nói vậy.

Đó là cách AI trở thành một phần của engineering system thay vì một nguồn confidence không kiểm chứng.

### TRY THIS

Lần tới khi AI nói:

> "Done."

Đừng hỏi ngay:

> "Tốt rồi chứ?"

Hãy hỏi:

> "Done theo nghĩa nào?"

Sau đó kiểm tra bốn câu:

Code đã tồn tại chưa?

Code có chạy chưa?

Requirement đã thực sự được đáp ứng chưa?

Evidence đã đủ để gọi là Verified chưa?

Chỉ bốn câu hỏi đó có thể thay đổi hoàn toàn cách bạn làm việc với AI.

### CHUYỂN TIẾP

Tôi đã học được cách không tin một chữ:

> Done.

Tôi bắt đầu yêu cầu evidence.

Tôi bắt đầu phân biệt claimed state và verified state.

Tôi bắt đầu nhìn regression, impact và verification như những phần của engineering chứ không phải thủ tục sau cùng.

Nhưng rồi một vấn đề khác xuất hiện.

Tôi có thể verify một task.

Tôi có thể biết state hiện tại.

Tôi có thể ghi evidence.

Nhưng project vẫn có thể kéo dài nhiều ngày, nhiều tuần hoặc nhiều tháng.

Một Engineering Run kết thúc.

Một AI Executor khác tiếp nhận.

Một task khác bắt đầu.

Và tôi phải chắc chắn rằng tất cả những gì vừa được verify không biến mất khỏi project context.

Nói cách khác:

> Verification cho tôi biết điều gì đúng. Continuity phải đảm bảo điều đúng đó tiếp tục tồn tại qua các Run tiếp theo.

Đó là lúc những khái niệm như:

Run Record.

Run Delta.

Checkpoint.

Handoff.

Current Project State.

và:

Recovery

trở nên quan trọng hơn.

Và đó là câu chuyện của Chương 11.
