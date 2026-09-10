---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 6
title: "KHI AI HẾT QUOTA, PROJECT KHÔNG ĐƯỢC DỪNG"
subtitle: "Từ một AI Executor hết quota đến một Project có thể tiếp tục công việc mà không phụ thuộc vào một AI duy nhất"
shortTitle: "Khi AI hết quota, project không được dừng"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 97
canonical_page_end: 113
source_artifact: "06.BEYOND_VIBE_CODING_CORE_BOOK_Chapter_06_draf.pdf"
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
navigation_root: "CHƯƠNG 6 - KHI AI HẾT QUOTA, PROJECT KHÔNG ĐƯỢC DỪNG"
id: "06-prototype-to-production"
order: 6
publicationStatus: "published"
contentStatus: "complete"
description: "How to design project continuity so that quota exhaustion or executor failure does not halt the engineering lifecycle."
readingTime: "9 min"
topics: ["continuity", "resilience", "engineering-run", "handoff", "paecs"]
hero: "images/chapter-06-hero.webp"
published: "2026-09-10"
updated: "2026-09-10"
version: "1.0.0"
---

<!-- Canonical Structured Manuscript. Layout-neutral: no PDF coordinates, page numbers, running chrome, or forced pagination. -->

# CHƯƠNG 6

# KHI AI HẾT QUOTA, PROJECT KHÔNG ĐƯỢC DỪNG

*Từ một AI Executor hết quota đến một Project có thể tiếp tục công việc mà không phụ thuộc vào một AI duy nhất*

### MỘT NGÀY RẤT BÌNH THƯỜNG

Hãy tưởng tượng tôi bắt đầu làm việc lúc 8 giờ sáng.

Tôi mở project.

Tôi chuẩn bị task.

AI Executor đã hiểu context.

Tôi giao một task.

AI thực hiện.

Tôi kiểm tra.

Mọi thứ đang diễn ra rất tốt.

9 giờ.

10 giờ.

11 giờ.

Project tiến lên.

Đến một thời điểm nào đó:

Quota exhausted.

AI không thể tiếp tục.

Không có drama.

Không có lỗi kiến trúc.

Không có security incident.

Chỉ đơn giản là:

AI dừng lại.

Nhưng project thì sao?

Đây là câu hỏi tôi bắt đầu quan tâm.

## AI DỪNG VÀ PROJECT DỪNG LÀ HAI CHUYỆN KHÁC NHAU

AI Executor có thể dừng.

Nhưng project không được dừng chỉ vì một AI Executor dừng.

Một Engineering Run có thể kết thúc.

Một provider có thể unavailable.

Một model có thể hết quota.

Một máy tính có thể được thay thế.

Một developer có thể nghỉ.

Nhưng project vẫn phải giữ được:

- state,
- knowledge,
- changes,
- evidence,
- next action.

Nếu những thứ đó còn, project có thể tiếp tục.

Nếu chúng mất, AI có thể vẫn online nhưng project có thể thực sự bị “mất trí nhớ”.

### TÔI TỪNG NGHĨ CHỈ CẦN GIỮ CHAT LÀ ĐỦ

Đây là một sai lầm rất tự nhiên.

Khi AI hết quota, tôi có thể mở AI khác rồi copy conversation.

Nhưng project càng lớn, cách này càng trở nên vô lý.

Một conversation có thể chứa hàng trăm message.

Trong đó có:

- ý tưởng,
- thử nghiệm,
- sửa lỗi,
- retry,
- các câu hỏi phụ,
- những giả định đã bị loại bỏ,
- những phương án chưa được dùng,
- những câu nói chỉ có giá trị trong thời điểm đó.

Nếu tôi đưa toàn bộ cho AI mới, tôi đang bắt nó đọc lịch sử thay vì đọc trạng thái hiện tại.

Đó là hai việc khác nhau.

Handoff không nên được xây từ toàn bộ conversation history. Nó phải được xây từ Project State và những material changes cần thiết.

### AI A DỪNG. AI B TIẾP TỤC.

Đây là mô hình đơn giản nhất:

```text
Engineering Run A
│
▼
AI Executor A
│
▼
Checkpoint
│
▼
Handoff
│
▼
Engineering Run B
│
▼
AI Executor B
```

Điểm quan trọng nhất nằm ở giữa.

Không phải AI A nói chuyện trực tiếp với AI B.

Mà là:

Project đứng giữa hai executor.

AI A tạo ra những thay đổi.

Project ghi nhận state.

Checkpoint được tạo.

Handoff được chuẩn hóa.

AI B đọc project.

AI B tiếp tục.

Điều này làm AI trở thành replaceable executor.

Project trở thành persistent system.

### MỘT EXECUTOR KHÁC KHÔNG CẦN BIẾT “AI CŨ ĐÃ SUY NGHĨ GÌ”

AI B không cần biết:

- AI A đã “cảm thấy” thế nào về project.
- Không cần biết toàn bộ conversation.
- Không cần đọc mọi prompt.
- Không cần biết từng retry.

Điều AI B cần biết là:

- Task hiện tại là gì?
- Project State hiện tại là gì?
- Những gì đã thay đổi là gì?
- Điều gì đã được verify?
- Điều gì chưa được verify?
- Có constraint nào không?
- Next action là gì?
- Có checkpoint nào mới nhất?

Đây là một sự thay đổi rất lớn.

Tôi không còn cố truyền memory của AI A sang memory của AI B.

Tôi truyền:

project truth từ project sang AI B.

## HANDOFF KHÔNG PHẢI LÀ “CONTINUE”

Một câu:

“Continue.”

không phải là một handoff tốt.

Nó có thể hữu ích trong cùng một context.

Nhưng khi executor thay đổi, nó không đủ.

Một handoff tốt phải có cấu trúc.

Tối thiểu phải cho biết:

- Task
- Current State
- Recent Changes
- Evidence
- Open Issues
- Constraints
- Checkpoint
- Next Action
- Known Risks

Đó chính là lý do tôi bắt đầu coi Handoff như một artifact chứ không phải một câu nói.

### NO HANDOFF WITHOUT STATE SYNCHRONIZATION

**NO HANDOFF WITHOUT STATE SYNCHRONIZATION.**

Nói đơn giản:

Không bàn giao nếu trạng thái project chưa được đồng bộ.

Nếu AI A sửa code nhưng chưa cập nhật state, AI B có thể đọc một sự thật khác.

If AI A thay đổi architecture nhưng decision record chưa cập nhật, AI B có thể quay lại thiết kế cũ.

Nếu test đã chạy nhưng evidence chưa được ghi, AI B có thể không biết nó đã được kiểm tra.

Nếu một task thực tế chưa hoàn thành nhưng được ghi là DONE, AI B có thể bắt đầu từ một trạng thái giả.

Handoff vì vậy không phải chỉ là “truyền việc”.

Nó là:

state synchronization + continuation contract.

### TÔI BẮT ĐẦU NHÌN ENGINEERING RUN KHÁC ĐI

Trước đây tôi nghĩ Run là nơi AI làm việc.

Bây giờ tôi xem nó như một execution boundary.

Run bắt đầu.

AI thực hiện.

Các event quan trọng xảy ra.

Change xuất hiện.

Verification xảy ra.

State chuyển.

Run kết thúc.

Nhưng:

Project lifecycle không bắt đầu và kết thúc cùng Run lifecycle.

Đây là distinction rất quan trọng.

Một task có thể kéo dài qua:

Run 001.

Run 002.

Run 003.

Một task không nhất thiết phải hoàn thành trong một Run.

Điều đó hoàn toàn bình thường.

### MỘT TASK CÓ THỂ SỐNG QUA NHIỀU RUN

Task:

Implement authentication recovery flow.

Run 001:

Phân tích requirement.

Thiết kế.

Implement schema.

Run kết thúc.

Run 002:

Implement API.

Test.

Run kết thúc.

Run 003:

Security review.

Fix issue.

Verify.

Run kết thúc.

Task chỉ thực sự hoàn thành sau Run 003.

**Task lifecycle ≠ Run lifecycle.**

Đây là một trong những lý do tôi không muốn dùng “session” làm đơn vị engineering chính.

Session thường gợi đến một cuộc trò chuyện hoặc một phiên kỹ thuật nào đó.

Còn Engineering Run nhấn mạnh rằng đây là một khoảng thời gian thực thi có kiểm soát.

### QUOTA KHÔNG CÒN LÀ INCIDENT

Đây là một thay đổi trong cách tôi nhìn vấn đề.

Nếu continuity tốt, quota hết không còn là một incident lớn.

Nó chỉ là:

Executor availability change.

```text
AI A: QUOTA_EXHAUSTED
Project: CONTINUE_ALLOWED
AI B: ELIGIBLE
Handoff: READY
Run mới: STARTED
```

Project tiếp tục.

Đó là cách một system có resilience.

Không phải vì AI không bao giờ gặp vấn đề.

Mà vì:

AI failure không kéo theo project failure.

## EXECUTOR SUBSTITUTION

### TÔI BẮT ĐẦU NGHĨ VỀ “EXECUTOR SUBSTITUTION”

Một executor có thể được thay bằng executor khác.

Nhưng substitution chỉ an toàn khi:

- AI mới biết method.
- AI mới biết task.
- AI mới biết state.
- AI mới biết constraints.
- AI mới biết evidence.
- AI mới biết authority.
- AI mới biết next action.

Executor substitution requires continuity, not memory transfer.

Đây là điểm tôi muốn nhấn mạnh.

Tôi không muốn biến AI B thành bản sao của AI A.

Tôi chỉ muốn AI B hiểu đúng project.

### SAME METHOD, NOT SAME PROMPT

AI A và AI B không nhất thiết phải dùng cùng một prompt.

Prompt có thể khác.

Provider có thể khác.

Model có thể khác.

Tooling có thể khác.

Environment có thể khác.

Nhưng chúng phải thực hiện cùng một:

Engineering Method.

Và phải tuân thủ cùng:

- Coding Standard.
- Architecture Rules.
- Governance.
- Security Policy.
- State Semantics.

Tôi không muốn:

> same prompt

Tôi muốn:

> same method.

### PAECS BẮT ĐẦU TRỞ NÊN CẦN THIẾT

Đến đây, tôi bắt đầu nhận ra rằng chỉ có vài file Markdown thì chưa đủ để kiểm soát tất cả những thứ này.

Tôi cần một lớp có thể biết:

- Task nào đang chạy?
- Ai đang thực hiện?
- Change nào xảy ra?
- State nào thay đổi?
- Evidence nào được tạo?
- Checkpoint nào mới nhất?
- Handoff nào đang chờ?
- Executor nào được phép?
- Workspace nào đang bị lock?

Từ đây, ý tưởng về:

PAECS — Project AI Engineering Continuity System

bắt đầu trở nên cần thiết.

PAECS không phải một AI.

PAECS không thay thế AI.

PAECS cũng không phải một chatbot khác.

Nó là một lớp engineering control giúp project duy trì:

- authority,
- method,
- task,
- change,
- state,
- evidence,
- verification,
- handoff,
- recovery.

### REPOSITORY KHÔNG PHẢI AUTHORITY

Khi nghĩ về continuity, tôi cũng bắt đầu xem GitHub khác đi.

GitHub rất quan trọng.

Nhưng nếu tôi coi GitHub là toàn bộ project memory, tôi lại tạo ra một dependency khác.

GitHub có thể:

- down,
- mất network,
- bị access issue,
- bị configuration issue,
- hoặc đơn giản là không chứa toàn bộ engineering state.

Vì vậy tôi muốn:

GitHub = Controlled Code Synchronization Hub.

Không phải:

Project Authority.

Project authority nằm ở hệ thống engineering artifacts được kiểm soát.

GitHub là một repository adapter trong mô hình lớn hơn.

### LOCAL-FIRST

Đây cũng là lý do tôi thích local-first cho continuity.

Project có một:

Trusted Engineering Workspace.

Ở đó tôi có:

- source code,
- state,
- knowledge,
- continuity,
- checkpoints,
- evidence,
- schemas.

Google Drive có thể giữ:

Independent Backup / Disaster Recovery.

GitHub có thể giữ:

Controlled Remote Replica.

Ba lớp này có vai trò khác nhau.

Không nên trộn chúng thành một khái niệm duy nhất.

### TÔI KHÔNG MUỐN NHIỀU AI CÙNG SỬA MỘT LÚC

Khi nói “nhiều AI”, người ta rất dễ nghĩ:

“Cho tất cả AI cùng code.”

Tôi không nghĩ đó là cách tốt.

Nếu AI A đang sửa file:

auth/service.go

và AI B cũng sửa:

auth/service.go

trong khi state chưa đồng bộ, tôi có thể tạo ra một vấn đề lớn.

Vì vậy:

Multiple Executors ≠ Multiple Writers.

Tôi muốn:

một workspace ownership rõ ràng.

Chỉ một executor có quyền chỉnh sửa active workspace tại một thời điểm, trừ những trường hợp đặc biệt có cơ chế concurrency được thiết kế rõ ràng.

Đó là lý do Workspace Lock trở thành một phần của continuity architecture.

### CHECKPOINT KHÔNG CHỈ DÙNG KHI QUOTA HẾT

Checkpoint có thể được tạo khi:

- Run kết thúc.
- Task đạt một milestone.
- Có material change.
- Có architecture change.
- Có verification milestone.
- Có risk tăng.
- Có handoff.
- Có recovery.

Và trong những task dài:

micro-checkpoint.

Mục tiêu là:

Nếu mọi thứ dừng ngay bây giờ, tôi có thể tiếp tục từ đâu?

Đây là một câu hỏi rất mạnh.

### TÔI BẮT ĐẦU DÙNG CHECKPOINT NHƯ “SAVE GAME”

Nếu bạn từng chơi một game dài, bạn sẽ hiểu.

Bạn không muốn chơi lại từ đầu chỉ vì máy bị tắt.

Checkpoint cho phép bạn:

save → stop → return → continue.

Engineering cũng vậy.

Một project dài không thể giả định rằng mọi thứ sẽ luôn chạy liên tục.

Checkpoint giúp tôi biến:

interruption

thành:

pause.

Đó là khác biệt rất lớn.

### TÔI BẮT ĐẦU GHI NHẬN “MATERIAL EVENTS”

Tôi đã có nói về điều này ở chương trước, nhưng ở đây nó trở nên rất thực tế.

Một Run có thể tạo ra rất nhiều activity.

Không phải activity nào cũng cần trở thành một engineering event.

Tôi cần ghi lại những thứ thay đổi meaning của project.

```text
TASK_STARTED
FILE_CHANGED
DECISION_MADE
STATE_CHANGED
TEST_RESULT
EVIDENCE_CREATED
BLOCKER_RAISED
HANDOFF_CREATED
CHECKPOINT_CREATED
TASK_COMPLETED
```

Những event đó giúp tôi hiểu project đã đi qua đâu.

### RUN RECORD KHÔNG PHẢI CHAT LOG

Một Run có thể có rất nhiều conversation.

Nhưng Run Record phải cô đọng hơn.

Nó có thể nói:

- Run này bắt đầu khi nào.
- Executor nào.
- Task nào.
- Method version nào.
- Project State đầu vào.
- Material Changes.
- Verification.
- Outcome.
- Current State.
- Checkpoint.
- Handoff.

Đó là engineering record.

Không phải transcript.

### TÔI BẮT ĐẦU PHÂN BIỆT “WHAT AI DID” VÀ “WHAT PROJECT BECAME”

Run Event: AI đã làm gì?

Run Delta: Điều gì thay đổi trong Run?

Current Project State: Project hiện tại trở thành gì?

Ví dụ:

AI chạy migration.

Run Event:

migration executed.

Run Delta:

users table changed.

Current State:

schema version 12 VERIFIED.

Ba thứ này khác nhau.

Nếu chỉ lưu event: AI tiếp theo vẫn phải suy luận state.

Nếu chỉ lưu state: tôi mất một phần audit trail.

Tôi cần cả hai ở mức phù hợp.

### STATE PHẢI CÓ NGUỒN GỐC

Tôi cũng bắt đầu đặt câu hỏi:

“Ai nói project đang VERIFIED?”

Không nên chỉ là AI.

State quan trọng phải gắn với:

Evidence.

Ví dụ:

`status: VERIFIED`

phải biết:

verified by what,

when,

against what requirement,

using which evidence.

Từ đó state trở nên đáng tin hơn.

### NO EVIDENCE, NO VERIFIED STATE

**NO EVIDENCE, NO VERIFIED STATE.**

Nguyên tắc này sẽ còn xuất hiện nhiều trong các chương sau.

Nếu AI nói:

“Feature đã hoàn thành.”

Tôi có thể ghi:

AI CLAIM: COMPLETED

Nhưng nếu chưa có evidence phù hợp:

Verified State ≠ COMPLETED

Đây là một distinction mà continuity cần giữ lại.

Bởi vì AI tiếp theo không thể dựa vào một câu “Done.” để quyết định tiếp tục.

## CONTINUITY VERIFICATION VÀ SAFE CONTINUATION

### CONTINUITY PHẢI ĐƯỢC VERIFY

Một system có các file continuity chưa chắc đã có continuity thực sự.

Tôi phải test.

Ví dụ:

AI A làm task.

AI A dừng.

AI B được đưa vào.

AI B phải reconstruct:

- task,
- state,
- knowledge,
- constraints,
- changes,
- evidence,
- next action.

Nếu AI B làm được mà không cần con người giải thích lại toàn bộ, continuity có giá trị.

Đó chính là:

Continuity Verification.

### TÔI BẮT ĐẦU DÙNG MỘT “CONTINUITY TEST”

Một test rất đơn giản:

“Một AI Executor đủ điều kiện, chưa từng tham gia Run trước, có thể tiếp tục task mà không cần đọc toàn bộ conversation history hay không?”

Nếu:

- Có → tốt.
- Không → continuity chưa đủ.
- Phải hỏi con người những điều lẽ ra project phải biết → state hoặc knowledge layer còn thiếu.
- AI phải đoán → system đang fail.

### FAIL CLOSED

**FAIL CLOSED**

Tuy nhiên, tôi cũng không muốn continuity biến thành một cái cớ để AI tự đoán.

Nếu current state mâu thuẫn.

Nếu checkpoint quá cũ.

Nếu handoff không đầy đủ.

Nếu authority không xác định.

Nếu evidence thiếu.

Nếu state integrity không được chứng minh.

Tôi muốn:

BLOCK.

Không phải:

“Cứ làm tiếp đi.”

Bởi vì một continuity system tốt không chỉ biết cách tiếp tục.

Nó còn biết:

khi nào không được phép tiếp tục.

### ĐÓ LÀ “SAFE CONTINUATION”

Tôi thích khái niệm này hơn “automatic continuation”.

Automatic nghĩa là cứ tiếp tục.

Safe continuation nghĩa là:

chỉ tiếp tục khi điều kiện cho phép.

Vì vậy:

Continuity + Governance = Safe Continuation.

Đây là một distinction rất quan trọng.

### TÔI KHÔNG MUỐN PROJECT BỊ “HOSTAGE” BỞI QUOTA

AI có thể hết quota. AI có thể ngừng. Engineering Run có thể kết thúc. Nhưng project không được mất trạng thái chỉ vì executor biến mất.

Nếu ngày mai AI tôi đang dùng hết quota, tôi không muốn:

- project dừng;
- developer chờ;
- context mất;
- task bị reset.

Tôi muốn:

executor unavailable → project remains available.

Đó là một kiến trúc tốt hơn.

### VÀ ĐÂY CŨNG LÀ LÝ DO TÔI KHÔNG MUỐN MỘT PROVIDER DUY NHẤT

Một provider có thể rất tốt.

Nhưng dependency duy nhất luôn tạo ra một failure mode.

Tôi không muốn project của mình có:

single AI dependency.

Tôi muốn:

provider diversity

nhưng được kiểm soát bởi:

one method.

> One Method. Multiple Executors. One Project.

### NHIỀU AI KHÔNG PHẢI MỤC TIÊU

Tôi muốn nói điều này thật rõ.

Mục tiêu không phải có:

2 AI.

3 AI.

5 AI.

10 AI.

Mục tiêu là:

project vẫn hoàn thành ngay cả khi executor hiện tại thay đổi.

Có lúc chỉ cần một AI.

Có lúc cần hai.

Có lúc cần một AI trả phí để tăng tốc.

Có lúc có thể quay về AI miễn phí.

Không quan trọng.

Executor là resource.

Project completion mới là outcome.

### CONTINUITY CŨNG KHÔNG CÓ NGHĨA MỌI AI GIỐNG NHAU

Một AI có thể mạnh về coding.

Một AI mạnh về reasoning.

Một AI thích hợp local.

Một AI thích hợp cloud.

Một AI có thể được phép đọc một loại data.

AI khác không được.

Do đó:

Executor substitution không có nghĩa: “Bất kỳ AI nào cũng có quyền làm bất kỳ task nào.”

Nó vẫn phải đi qua:

Eligibility.

Đây là nơi Chương 2 và Chương 3 gặp nhau:

Task chọn executor.

Continuity làm cho executor có thể thay thế.

Governance kiểm soát executor được phép làm gì.

### TÔI NHÌN LẠI QUOTA THEO MỘT CÁCH KHÁC

Trước đây:

Quota hết = vấn đề.

Bây giờ:

Quota hết = trạng thái của executor.

Nếu system đủ tốt:

`QUOTA_EXHAUSTED`

chỉ là một signal.

Không phải project state.

Project state không nên nói:

`PROJECT_STOPPED_BECAUSE_AI_QUOTA_EXHAUSTED`

trừ khi thực sự không còn executor eligible.

Thay vào đó:

```text
CURRENT_TASK = IN_PROGRESS
CURRENT_EXECUTOR = UNAVAILABLE
HANDOFF = READY
NEXT_ELIGIBLE_EXECUTOR = ...
```

Project vẫn sống.

### TÔI BẮT ĐẦU HIỂU “PROJECT CONTINUITY” LÀ MỘT NĂNG LỰC CỦA HỆ THỐNG

Không phải feature của chatbot.

Không phải feature của model.

Không phải một tiện ích của provider.

Mà là:

một capability của Engineering System.

Một Engineering System có continuity khi nó có thể:

Preserve

→ Reconstruct

→ Verify

→ Resume

mà không phụ thuộc vào một executor cụ thể.

### KEY IDEA

AI có thể hết quota. AI có thể ngừng. Engineering Run có thể kết thúc. Nhưng project không được mất trạng thái chỉ vì executor biến mất.

Một project có continuity tốt không hỏi:

“AI cũ đâu?”

Nó hỏi:

“Project state hiện tại là gì, và executor nào đủ điều kiện để tiếp tục?”

### WHAT I LEARNED

Tôi bắt đầu với một nỗi lo rất đơn giản:

“Nếu AI hết quota thì sao?”

Tôi kết thúc với một cách nhìn khác:

“Quota là vấn đề của executor. Continuity là vấn đề của project.”

Từ đó, tôi không còn muốn xây:

một AI biết project.

Tôi muốn xây:

một project đủ rõ để AI nào đủ điều kiện cũng có thể hiểu và tiếp tục.

Đó là một thay đổi rất lớn.

### NHƯNG CÒN MỘT VẤN ĐỀ CUỐI CÙNG

Tôi đã giải được:

- AI có thể thay đổi.
- Engineering Run có thể kết thúc.
- Handoff có thể xảy ra.
- Checkpoint có thể phục hồi.

Nhưng một câu hỏi mới xuất hiện:

Nếu có nhiều AI cùng tham gia, làm thế nào để chúng cùng làm việc theo một cách?

Không chỉ cùng state.

Mà cùng:

- method,
- standard,
- governance,
- architecture rules,
- security rules,
- terminology,
- engineering expectations.

Bởi vì nếu mỗi AI tự dùng một cách làm khác nhau, continuity có thể giữ được project state nhưng vẫn tạo ra style drift và engineering drift.

Tôi bắt đầu nhận ra:

Continuity giữ cho project không bị đứt. Nhưng Method mới giữ cho project không bị phân rã.

Và đó là lúc tôi bước sang một câu hỏi mới:

Nếu có nhiều AI cùng tham gia, làm thế nào để chúng cùng làm việc theo một cách?

Đó là câu chuyện của Chương 7.

---

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 6 - KHI AI HẾT QUOTA, PROJECT KHÔNG ĐƯỢC DỪNG
├── AI DỪNG VÀ PROJECT DỪNG LÀ HAI CHUYỆN KHÁC NHAU
├── HANDOFF KHÔNG PHẢI LÀ “CONTINUE”
├── EXECUTOR SUBSTITUTION
├── PAECS VÀ CONTINUITY STATE
└── CONTINUITY VERIFICATION VÀ SAFE CONTINUATION

Navigation metadata only. It does not control PDF coordinates or typography.
-->
