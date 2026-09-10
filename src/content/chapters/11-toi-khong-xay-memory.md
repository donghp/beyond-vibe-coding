---
id: "11-toi-khong-xay-memory"
title: "TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT"
subtitle: "Từ một AI nhớ được project đến một Project có thể tự mang theo Knowledge, State, Evidence và công việc đang dang dở"
shortTitle: "Tôi không xây memory cho AI"
order: 11
description: "Building project continuity instead of relying on fragile AI chat memory."
readingTime: "9 min"
topics: ["continuity", "state", "checkpoint", "handoff"]
hero: "images/chapter-11-hero.webp"
published: "2026-09-10"
publicationStatus: "unpublished"
contentStatus: "draft"
updated: "2026-09-10"
version: "1.0.0"
---

# CHƯƠNG 11
# TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT

*Từ một AI nhớ được project đến một Project có thể tự mang theo Knowledge, State, Evidence và công việc đang dang dở*

Ở chương trước, tôi đã nói về một điều mà tôi từng đánh giá thấp:

> AI nói “Done” không có nghĩa project đã được verify.

Tôi bắt đầu phân biệt:

Claim

với:

Evidence.

Implementation

với:

Verified State.

Tôi cũng bắt đầu hiểu rằng một change chỉ thực sự có giá trị khi project biết:

nó đã thay đổi gì,

tại sao thay đổi,

đã được kiểm tra đến đâu,

evidence nằm ở đâu,

và trạng thái hiện tại là gì.

Nhưng sau đó tôi nhận ra một vấn đề khác.

Ngay cả khi tôi có thể xác định một task đã được verify, project vẫn còn một câu hỏi rất lớn:

> Ngày mai AI có còn biết những gì project đã biết hôm nay không?

## TÔI TỪNG NGHĨ CHỈ CẦN AI NHỚ LÀ ĐỦ

Khi bắt đầu làm việc với AI, tôi thường kỳ vọng một điều rất tự nhiên:

Hôm nay tôi giải thích project.

AI hiểu.

Ngày mai tôi quay lại.

AI vẫn nhớ.

Tôi tiếp tục.

Nhưng thực tế không hoạt động đơn giản như vậy.

AI có thể thay đổi.

Model có thể thay đổi.

Provider có thể thay đổi.

Conversation có thể kết thúc.

Quota có thể hết.

Context có thể bị mất.

Một Engineering Run có thể dừng.

Máy tính có thể thay đổi.

Và ngay cả khi AI vẫn còn đó, project cũng có thể đã thay đổi.

Lúc đó tôi bắt đầu đặt một câu hỏi rất khác:

> Tại sao project lại phải phụ thuộc vào việc AI có nhớ hay không?

### MỘT PROJECT THỰC TẾ KHÔNG SỐNG TRONG MỘT CUỘC TRÒ CHUYỆN

Hãy tưởng tượng tôi có một conversation kéo dài cả ngày.

Trong đó có:

hàng trăm message,

nhiều quyết định,

nhiều thay đổi,

nhiều lần sửa lỗi,

nhiều thử nghiệm,

nhiều assumption,

nhiều thứ đã bị loại bỏ.

Đến cuối ngày, tôi có cảm giác:

> “AI hiểu project rất rõ.”

Nhưng điều AI hiểu trong conversation không nhất thiết trở thành knowledge persistent của project.

Ngày hôm sau:

một AI khác vào.

Một model khác.

Một provider khác.

Hoặc đơn giản là một Engineering Run mới.

Tôi nói:

> “Tiếp tục project.”

Vấn đề lại xuất hiện.

AI không biết:

project đang ở đâu;

đã làm gì;

chưa làm gì;

đã quyết định gì;

cái gì đã được verify;

và cái gì tuyệt đối không nên thay đổi.

### LỊCH SỬ KHÔNG PHẢI STATE

Đây là một distinction rất quan trọng.

Conversation history cho tôi biết:

> Điều gì đã được nói.

Nhưng Project State cần trả lời:

> Project hiện đang ở đâu.

Hai thứ không giống nhau.

Tôi có thể đọc 500 message và vẫn không biết:

module nào đã hoàn thành;

schema hiện tại là version nào;

task nào đang active;

bug nào còn mở;

architecture decision nào đang có hiệu lực;

evidence nào đã được xác nhận.

Đó là lý do tôi không muốn dùng conversation như source of truth.

## PROJECT PHẢI TỰ MANG THEO TRÍ NHỚ CỦA CHÍNH NÓ

Tôi bắt đầu chuyển tư duy từ:

> AI remembers the project

sang:

> Project remembers itself.

Nhưng “nhớ” ở đây không có nghĩa lưu mọi thứ.

Tôi không muốn lưu mọi token.

Không muốn lưu từng câu AI viết.

Không muốn biến project thành một kho transcript khổng lồ.

Tôi cần project lưu những gì có giá trị engineering:

Knowledge.

State.

Decisions.

Changes.

Evidence.

Checkpoints.

Handoffs.

Recovery information.

### PERSIST EVERYTHING, LOAD SELECTIVELY

Đây là một nguyên tắc quan trọng tôi bắt đầu hình thành:

> PERSIST EVERYTHING, LOAD SELECTIVELY.

Nhưng “everything” ở đây cần hiểu đúng.

Không phải mọi token.

Không phải mọi câu chat.

Mà là:

> Mọi material engineering event cần thiết để project có thể được audit,

> reconstruct và continue.

Ví dụ:

Task được tạo.

Decision được đưa ra.

Architecture thay đổi.

Database schema thay đổi.

Security rule thay đổi.

Test result xuất hiện.

Evidence được tạo.

Blocker phát sinh.

Checkpoint được tạo.

Handoff được thực hiện.

Những thứ đó nên được persist.

### PERSIST MATERIAL EVENTS, NOT TRANSIENT AI TOKENS

Tôi muốn nói rõ hơn:

> PERSIST EVERY MATERIAL ENGINEERING EVENT, NOT EVERY TRANSIENT AI

> TOKEN.

Một AI có thể tạo ra hàng nghìn dòng conversation trong quá trình làm task.

Nhưng project chỉ thực sự cần biết những thay đổi mang ý nghĩa.

Ví dụ:

```text
TASK_STARTED DECISION_MADE FILE_CHANGED KNOWLEDGE_CHANGED STATE_CHANGED TEST_RESULT EVIDENCE_CREATED BLOCKER_RAISED CHECKPOINT_CREATED HANDOFF_CREATED TASK_COMPLETED
```

Đó mới là engineering memory.

```text
PROJECT KNOWLEDGE VÀ PROJECT STATE KHÔNG PHẢI MỘT THỨ
```

Tôi bắt đầu tách hai lớp:

### PROJECT KNOWLEDGE

Project biết gì?

Architecture.

Business rules.

Engineering standards.

Security rules.

Terminology.

Dependencies.

Documentation.

Design decisions.

```text
PROJECT STATE
```

Project đang ở đâu?

Current version.

Active task.

Completed tasks.

Open blockers.

Current architecture state.

Current database state.

Verification state.

Latest checkpoint.

Latest handoff.

Knowledge là:

> what the project knows.

State là:

> where the project is.

```text
EVIDENCE LÀ CẦU NỐI GIỮA CLAIM VÀ STATE
```

Một state đáng tin phải có cơ sở.

Nếu project nói:

> authentication = VERIFIED

tôi phải biết:

verify bằng gì.

Khi nào.

Trong environment nào.

Against requirement nào.

Evidence nào.

Vì vậy:

```text
CLAIM ↓ EVIDENCE ↓ VERIFICATION ↓ STATE
```

State không nên chỉ là một field do AI viết.

## CHECKPOINT KHÁC CURRENT STATE

Đây là một distinction tôi muốn giữ rất rõ.

Checkpoint là một điểm chụp của trạng thái để có thể quay lại hoặc tiếp tục.

Current State là trạng thái hiện hành của project.

Một checkpoint cũ có thể vẫn hữu ích.

Nhưng nó không nhất thiết là current state.

Ví dụ:

Checkpoint:

```text
`STATE-420`
```

Sau đó project tiến thêm 5 task.

Current State:

```text
`STATE-425`
```

Nếu AI đọc checkpoint 420 như thể đó là hiện trạng 425, nó sẽ làm việc trên một project cũ.

### TÔI BẮT ĐẦU NHÌN CHECKPOINT NHƯ “SAVE POINT”

Một cách rất dễ hiểu là:

> Checkpoint giống như save point của một game.

Bạn có thể dừng.

Máy có thể tắt.

Bạn có thể quay lại.

Nhưng bạn không muốn chơi lại từ đầu.

Project cũng vậy.

Một task có thể đang ở giữa chừng.

Một Run có thể phải kết thúc.

Một AI có thể biến mất.

Checkpoint cho phép project giữ được:

> “Tôi đã đi đến đây.”

### NHƯNG CHỈ CHECKPOINT THÔI CHƯA ĐỦ

Nếu tôi chỉ có snapshot:

> Project đang ở trạng thái X.

Tôi biết hiện trạng.

Nhưng đôi khi tôi không biết tại sao project lại đến trạng thái đó.

Đó là lý do tôi cần thêm:

Event Log.

Snapshot giúp load nhanh.

Event Log giúp reconstruct lịch sử thay đổi.

### SNAPSHOT + EVENT LOG

Tôi bắt đầu thích một mô hình rất đơn giản:

```text
PROJECT HISTORY │ ┌─────────┴─────────┐ ↓ ↓ SNAPSHOT EVENT LOG Current State What Happened │ │ └─────────┬─────────┘ ↓ RECONSTRUCT STATE
```

Snapshot dành cho tốc độ.

Event Log dành cho audit và reconstruction.

Hai thứ bổ sung cho nhau.

### RUN RECORD KHÔNG PHẢI CHAT LOG

Một Engineering Run có thể có rất nhiều conversation.

Nhưng Run Record cần ngắn gọn hơn.

Nó phải cho tôi biết:

Run ID

Executor

Task

Start / End

Method

State Before

Material Changes

Verification

State After

Checkpoint

Handoff

Open Issues

Đó là engineering record.

Không phải transcript.

### RUN DELTA

Tôi đặc biệt thích khái niệm:

> Run Delta

Nó trả lời:

> Điều gì đã thay đổi trong Run này?

Ví dụ:

```text
run_delta: files_changed: 8 decisions_added: 1 tests_added: 4 tests_passed: 4 blockers_added: 1 state_transition: from: IMPLEMENTED to: PARTIALLY_VERIFIED
```

Run Delta giúp executor tiếp theo hiểu nhanh.

### HANDOFF KHÔNG PHẢI LÀ “HÃY TIẾP TỤC”

Khi tôi chuyển công việc sang một executor khác, câu:

> “Continue from here.”

không đủ.

Tôi cần một Handoff Contract.

Handoff phải trả lời:

Task hiện tại là gì?

Đã hoàn thành đến đâu?

State hiện tại là gì?

Những gì đã thay đổi?

Evidence nào có?

Cái gì còn pending?

Có blocker nào?

Next action là gì?

Có constraint gì?

Đó là cách AI mới tiếp tục mà không cần tôi kể lại toàn bộ lịch sử.

### NO HANDOFF WITHOUT STATE SYNCHRONIZATION

Tôi đã nhắc đến nguyên tắc này trước đây.

Bây giờ tôi hiểu nó sâu hơn:

> NO HANDOFF WITHOUT STATE SYNCHRONIZATION.

Không được bàn giao chỉ vì AI cũ sắp dừng.

Phải đồng bộ:

Changes

State

Evidence

Checkpoint

Next Action

sau đó mới:

Handoff

Nếu không, AI mới có thể bắt đầu từ một trạng thái không chính xác.

### ENGINEERING RUN KHÔNG PHẢI PROJECT LIFECYCLE

Tôi muốn nhắc lại điều này vì nó rất quan trọng.

Một Engineering Run có thể chỉ kéo dài vài giờ.

Project có thể kéo dài:

vài tuần;

vài tháng;

vài năm.

Run bắt đầu.

Run kết thúc.

Project vẫn tiếp tục.

Vì vậy:

> RUN LIFECYCLE ≠ PROJECT LIFECYCLE

Project continuity nằm phía trên Run.

### MỘT TASK CÓ THỂ QUA NHIỀU RUN

Ví dụ:

```text
TASK: Authentication Recovery
```

Run 001:

Discovery.

Run 002:

Schema.

Run 003:

API.

Run 004:

Integration.

Run 005:

Security verification.

Task chỉ hoàn thành sau Run 005.

Điều này không phải failure.

Đó là cách một engineering task thực tế có thể diễn ra.

```text
CONTINUITY KHÔNG CHỈ LÀ “TIẾP TỤC ĐƯỢC”
```

Tôi bắt đầu định nghĩa continuity theo cách mạnh hơn:

> Continuity là khả năng một project bảo toàn đủ information, state và

> evidence để một executor đủ điều kiện có thể reconstruct và tiếp tục công

> việc mà không phải bắt đầu lại từ đầu.

Điểm quan trọng là:

reconstruct.

Không phải:

remember.

### RECONSTRUCT > REMEMBER

AI Memory hoạt động theo kiểu:

> “Tôi nhớ những gì chúng ta đã nói.”

Project Continuity hoạt động theo kiểu:

> “Tôi có thể chứng minh project đang ở trạng thái này.”

Hai thứ này rất khác nhau.

Memory có thể mơ hồ.

State có structure.

Memory có thể biến mất.

Artifacts persistent.

Memory phụ thuộc executor.

Project State thuộc về project.

## CONTINUITY CẦN PROVIDER-NEUTRAL

Nếu continuity chỉ hoạt động với một provider, đó chưa phải continuity tốt.

Tôi muốn:

Gemini có thể tiếp tục.

DeepSeek có thể tiếp tục.

Một executor khác trong tương lai cũng có thể tiếp tục.

Điều kiện là executor phải hiểu:

Method

Knowledge

State

Evidence

Task

Handoff

Governance

Không cần biết AI cũ đã “nghĩ” như thế nào.

```text
LOCAL-FIRST CONTINUITY
```

Tôi cũng không muốn continuity sống hoàn toàn trong cloud.

Project cần có một nơi mà nó tự giữ artifacts của mình.

Một Trusted Engineering Workspace có thể chứa:

source;

.project/;

.ai/;

state;

knowledge;

continuity;

evidence;

schemas;

RAG metadata.

Google Drive có thể là:

Independent Backup / Disaster Recovery.

GitHub có thể là:

Controlled Remote Replica.

Mỗi lớp có vai trò riêng.

```text
GIT KHÔNG THAY THẾ CONTINUITY
```

Git rất quan trọng.

Git cho tôi:

commit;

diff;

branch;

history;

restore.

Nhưng Git không tự nói:

Task nào đang active?

Requirement nào đã verify?

Handoff đang ở đâu?

Executor nào đang làm?

Decision nào có authority?

Checkpoint nào là current?

Đó là lý do:

> Git history ≠ Project Continuity.

Git là một adapter quan trọng trong engineering system.

Nhưng project state và continuity cần tồn tại ở tầng của riêng chúng.

### WORKSPACE LOCK

Khi continuity trở nên quan trọng, tôi cũng cần biết:

> Ai đang sở hữu quyền viết vào workspace?

Nếu AI A đang sửa project và AI B cũng sửa cùng lúc, continuity có thể bị phá.

Vì vậy:

> One active writer.

Trừ khi hệ thống đã được thiết kế cho concurrency.

Đây là lý do Workspace Lock trở thành một phần của continuity system.

### MULTI-AI DOES NOT MEAN MULTI-WRITER

Nhiều AI có thể cùng tham gia.

Nhưng không có nghĩa tất cả đều được ghi vào canonical workspace cùng lúc.

Tôi có thể cho:

AI A discovery.

AI B review.

AI C proposal.

Nhưng canonical change phải có một execution authority rõ ràng.

```text
CONTINUITY GATES
```

Đến đây tôi bắt đầu nghĩ continuity cũng cần gate.

Trước khi cho một AI mới tiếp tục:

BOOTSTRAP

đã load chưa?

GOVERNANCE

đã resolve chưa?

KNOWLEDGE

đúng version chưa?

### PROJECT CONTEXT

đã có chưa?

STATE

có integrity không?

### RUN DELTA

đã có chưa?

EVIDENCE

đã đồng bộ chưa?

HANDOFF

đã valid chưa?

CONFLICT

có không?

Nếu không đạt:

> BLOCK.

### RECOVERY KHÔNG ĐƯỢC PHỤ THUỘC AI CŨ

Đây là một nguyên tắc rất quan trọng.

Giả sử AI A:

crash;

mất quota;

mất access;

provider unavailable;

hoặc hoàn toàn không còn được sử dụng.

Tôi vẫn phải recovery được project.

Nếu recovery cần AI A kể lại:

> “Tôi đã làm gì hôm qua?”

thì continuity chưa đủ.

Project phải tự mang theo information cần thiết.

### RECOVERY FLOW

Tôi bắt đầu nhìn recovery như:

Load State

↓

Check Checkpoint

↓

Load Recent Material Deltas

↓

Load Evidence

↓

Reconstruct Working Set

↓

Verify Integrity

↓

Resume

hoặc:

Block

Điều cuối cùng rất quan trọng.

Recovery không có nghĩa:

> “Luôn luôn tiếp tục.”

Recovery có nghĩa:

> “Chỉ tiếp tục khi trạng thái được xác định đủ đáng tin.”

```text
CONTINUITY KHÔNG PHẢI BẤT TỬ
```

Một misconception khác:

> “Có continuity thì project lúc nào cũng resume được.”

Không.

Có những trường hợp continuation phải bị block.

Ví dụ:

State conflict.

Corrupted checkpoint.

Missing evidence.

Unauthorized change.

Unknown architecture baseline.

Missing required artifact.

Security violation.

Continuity system tốt phải biết:

> khi nào không nên tiếp tục.

```text
FAIL CLOSED TRONG CONTINUITY
```

Nếu system không chắc:

STOP.

Nếu authority conflict:

STOP.

Nếu state integrity không xác định:

STOP.

Nếu handoff incomplete:

STOP.

Điều này có thể làm một Run chậm.

Nhưng nó bảo vệ project khỏi việc tiếp tục trên một state sai.

## TÔI BẮT ĐẦU NHẬN RA CONTINUITY LÀ MỘT BUILD ARTIFACT

Đây là một insight quan trọng.

Continuity không nên là:

> một cảm giác rằng “AI hiểu project”.

Nó phải là:

> một artifact mà project có thể xuất, kiểm tra và sử dụng để tiếp tục.

Có:

Current State

Checkpoint

Run Record

Run Delta

Evidence

Handoff

Next Action

Khi những thứ đó tồn tại, continuity có thể được kiểm tra.

```text
CONTINUITY CÓ THỂ ĐƯỢC TEST
```

Tôi có thể tạo một test rất đơn giản:

1. Cho AI A thực hiện task.

2. Dừng Run giữa chừng.

3. Không cho AI B đọc conversation.

4. Cho AI B đọc Project State + Handoff + required context.

5. Yêu cầu AI B tiếp tục.

6. Kiểm tra xem AI B có reconstruct đúng task và state không.

Nếu không:

Continuity FAIL.

Nếu có:

Continuity PASS.

Đây là một test thực tế.

```text
CONTINUITY QUALITY KHÔNG ĐƯỢC ĐO BẰNG SỐ FILE
```

Có 100 file continuity không có nghĩa continuity tốt.

Một file CURRENT_STATE.yaml rất rõ đôi khi có giá trị hơn 100 file note.

Điều tôi muốn đo là:

> Can a new eligible executor reconstruct the project accurately?

Đó mới là outcome.

```text
CONTINUITY VÀ COMPREHENSION
```

Một executor mới không cần hiểu toàn bộ lịch sử.

Nó cần hiểu:

enough

để làm task tiếp theo một cách đúng.

Đây lại quay về:

> Minimum Sufficient Context.

Continuity cung cấp persistent source.

Context Engineering chọn phần cần dùng.

Đó là cách hai hệ thống kết nối.

```text
CONTINUITY → CONTEXT → EXECUTION
```

Tôi bắt đầu nhìn một vòng đơn giản:

```text
PROJECT STATE ↓ CONTINUITY ↓ CONTEXT COMPILATION ↓ EXECUTION ↓ VERIFICATION ↓ STATE UPDATE ↓ CONTINUITY
```

Đây không phải chu trình của một AI.

Đây là chu trình của project.

### MỘT PROJECT CÓ THỂ THAY AI MÀ KHÔNG THAY PHƯƠNG PHÁP

Đây có lẽ là điều tôi muốn đạt tới nhất.

Hôm nay:

Gemini.

Ngày mai:

DeepSeek.

Ngày kia:

một executor khác.

Tôi không muốn mỗi lần thay AI lại thay:

task semantics;

state semantics;

governance;

verification;

method.

AI chỉ là executor.

Project là hệ thống persistent.

### VÀ ĐÓ LÀ LÚC PAECS TRỞ THÀNH MỘT HỆ THỐNG THỰC SỰ

PAECS bắt đầu từ một nhu cầu rất thực tế:

> Project phải có khả năng tiếp tục khi executor thay đổi hoặc biến mất.

Sau đó nó mở rộng thành:

Authority Engine

Method Engine

Task Engine

Change Engine

State Engine

Evidence Engine

Verification Engine

Handoff Engine

Recovery Engine

Security Engine

và:

Workspace Lock

Không phải tất cả để làm hệ thống phức tạp hơn.

Mà để project không phụ thuộc vào một conversation hoặc một AI.

### PAECS KHÔNG PHẢI AI THỨ HAI

Tôi muốn nói rõ điều này.

PAECS không phải:

> một chatbot điều khiển chatbot khác.

PAECS là:

> một control system cho AI-assisted engineering continuity.

AI vẫn làm engineering work.

PAECS bảo vệ:

state,

authority,

method,

evidence,

handoff,

recovery.

### TÔI NHÌN LẠI CÂU HỎI BAN ĐẦU

Ban đầu tôi hỏi:

> “Làm sao để AI nhớ project?”

Bây giờ câu hỏi đã hoàn toàn khác:

> “Làm sao để project có đủ persistent knowledge, state và evidence để bất kỳ

> AI Executor đủ điều kiện nào cũng có thể reconstruct và tiếp tục?”

Đây là một câu hỏi khó hơn.

Nhưng nó cũng là một câu hỏi tốt hơn.

### KEY IDEA

> AI Memory có thể mất. Project Continuity không được mất.

Project phải mang theo:

Knowledge

→ State

→ Evidence

→ Checkpoint

→ Handoff

→ Recovery

để:

> Executor có thể thay đổi mà project vẫn tiếp tục.

Và nguyên tắc tôi giữ lại là:

> NO AI MEMORY IS CANONICAL.

### WHAT I LEARNED

Tôi bắt đầu bằng mong muốn:

> “AI hãy nhớ project của tôi.”

Sau đó tôi nhận ra mình đang đặt sai vấn đề.

Tôi không cần một AI nhớ tốt hơn.

Tôi cần một project được tổ chức đủ tốt để không phải phụ thuộc vào trí nhớ của AI.

Từ đó:

Knowledge thuộc về project.

State thuộc về project.

Evidence thuộc về project.

Checkpoint thuộc về project.

Handoff thuộc về project.

Continuity thuộc về project.

AI chỉ nhận phần context cần thiết để thực hiện task.

### TRY THIS

Hãy thử một bài test rất đơn giản với project của bạn.

Đóng conversation hiện tại.

Không cho AI mới đọc lịch sử chat.

Sau đó chỉ cung cấp:

Project Knowledge

Current State

Active Task

Recent Changes

Evidence

Checkpoint

Handoff

và hỏi:

> “Hãy reconstruct project context và cho biết bạn có thể tiếp tục task này hay

> không.”

Nếu AI có thể trả lời chính xác:

project là gì;

đang ở đâu;

đã làm gì;

chưa làm gì;

cần làm gì tiếp;

và có gì cần verify;

thì bạn đang tiến gần đến continuity thực sự.

Nếu AI hỏi lại:

> “Project là gì?”

thì bạn biết chính xác phần nào của hệ thống còn thiếu.

### CHUYỂN TIẾP

Tôi đã giải quyết được một phần rất lớn của bài toán:

Project không cần phụ thuộc vào memory của AI.

Project có thể giữ:

Knowledge.

State.

Evidence.

Checkpoint.

Handoff.

Recovery.

Nhưng rồi một câu hỏi khác xuất hiện.

Nếu project có đủ state và knowledge, một AI mới có thể tiếp tục.

Nhưng:

> Làm thế nào để tôi chắc chắn rằng AI mới không chỉ hiểu project, mà còn tiếp

> tục đúng cách mà project đang được xây dựng?

Bởi vì cùng một state nhưng hai executor có thể tạo ra hai implementation khác nhau.

Một AI có thể dùng một naming convention.

AI khác dùng convention khác.

Một AI có thể thay đổi architecture theo một pattern riêng.

AI khác lại tạo ra một pattern khác.

Project không chỉ cần continuity.

Project còn cần consistency.

Tôi bắt đầu nhận ra:

> Continuity giúp công việc không bị đứt. Engineering Method giúp công việc

> không bị phân rã.

Và đó là lúc tôi bước sang một câu hỏi mới:

> Nếu nhiều AI cùng làm một project, làm thế nào để tất cả chúng cùng làm việc

> theo một cách?

Đó là câu chuyện của Chương 12.

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 11 - TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT
├── TÔI TỪNG NGHĨ CHỈ CẦN AI NHỚ LÀ ĐỦ
├── PROJECT PHẢI TỰ MANG THEO TRÍ NHỚ CỦA CHÍNH NÓ
├── CHECKPOINT KHÁC CURRENT STATE
├── CONTINUITY CẦN PROVIDER-NEUTRAL
└── TÔI BẮT ĐẦU NHẬN RA CONTINUITY LÀ MỘT BUILD ARTIFACT

Navigation metadata only. It does not control PDF coordinates or typography.
-->
