---
id: "12-toi-khong-xay-memory-part2"
title: "TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT (PHẦN 2)"
subtitle: "Từ một AI nhớ được project đến một Project có thể tự mang theo Knowledge, State, Evidence và công việc đang dang dở"
shortTitle: "Tôi không xây memory cho AI (Phần 2)"
order: 12
description: "Part 2 of building project continuity, detailing the PAECS architectural model."
readingTime: "9 min"
topics: ["continuity", "state", "paecs", "architecture"]
hero: "images/chapter-12-hero.webp"
published: "2026-09-10"
publicationStatus: "unpublished"
contentStatus: "draft"
updated: "2026-09-10"
version: "1.0.0"
---

# CHƯƠNG 12

# TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT

*Từ một AI nhớ được project đến một Project có thể tự mang theo Knowledge, State, Evidence và công việc đang dang dở*

Có một thời điểm rất thú vị trong quá trình tôi xây phần mềm với AI.

Tôi đã giải quyết được một vấn đề mà lúc đầu tôi nghĩ là khó nhất:

AI đã có thể kiểm tra xem code có thực sự đúng hay chưa.

Nhưng ngay sau đó, một vấn đề khác xuất hiện.

Một vấn đề lớn hơn.

Nếu hôm nay AI đã hiểu project, đã làm một phần việc, đã kiểm tra kết quả và đã biết project đang ở trạng thái nào...

thì ngày mai nó có thể tiếp tục từ đâu?

Đó là câu hỏi khiến tôi thay đổi hoàn toàn cách nhìn về “memory”.

Ban đầu tôi nghĩ:

> “Tôi cần một AI nhớ project.”

Sau đó tôi nhận ra:

Không. Tôi cần project tự mang theo những thứ cần thiết để bất kỳ AI phù hợp nào cũng có thể tiếp tục.

Đó là một khác biệt rất lớn.

Một bên là:

AI remembers the project.

Một bên là:

The project remembers itself.

Và tôi chọn cách thứ hai.

## TÔI ĐG HIỂU SAI CHỮ “MEMORY”

Khi mới làm việc với AI, “memory” nghe có vẻ như một lời giải rất hấp dẫn.

Tôi tưởng tượng một AI có thể nhớ:

- tôi đang xây gì;
- tại sao tôi xây nó;
- architecture thế nào;
- hôm qua tôi sửa gì;
- bug nào đang xử lý;
- task nào chưa xong;
- quyết định nào đã được đưa ra;
- project đang ở đâu.

Nếu AI nhớ được tất cả những thứ đó, có vẻ như tôi đã giải quyết được continuity.

Nhưng càng làm thật, tôi càng thấy:

AI memory không phải Project Memory.

Một AI có thể nhớ một phần conversation.

Một nền tảng có thể lưu chat history.

Một model có thể có context window lớn hơn.

Một hệ thống có thể cung cấp thêm long-term memory.

Nhưng tất cả những thứ đó vẫn có một vấn đề:

Project không được phép phụ thuộc vào việc một AI cụ thể có nhớ hay không.

Ngày mai tôi đổi provider.

Tôi đổi model.

Tôi đổi tool.

Tôi mở một Engineering Run mới.

Tôi làm việc trên một máy khác.

Tôi khôi phục project từ backup.

Tôi chuyển công việc từ Gemini sang DeepSeek.

Hay đơn giản hơn:

AI của hôm qua không còn available hôm nay.

Project vẫn phải tiếp tục.

Đó là lúc tôi bỏ chữ AI Memory ra khỏi trung tâm của kiến trúc.

Tôi bắt đầu nghĩ về Project Continuity.

### History không phải State

Có một nhầm lẫn rất phổ biến:

Conversation history = project state.

Không.

Lịch sử hội thoại cho tôi biết:

> “Hai người đã nói gì.”

Project State phải cho tôi biết:

> “Project đang thực sự ở trạng thái nào.”

Ví dụ, conversation có thể nói:

> “Tôi vừa sửa xong authentication.”

Nhưng đó không phải evidence.

Có thể code chưa được lưu.

Có thể test chưa chạy.

Có thể migration chưa thực hiện.

Có thể một file khác đã ghi đè thay đổi.

Có thể branch đang ở trạng thái khác.

Conversation chỉ là một record của communication.

Project State là một representation có kiểm soát của engineering reality.

Đây là sự khác biệt:

```text
Conversation History
↓
What was said
```

Trong khi:

```text
Project State
↓
What is currently true
```

Hai thứ có thể liên quan.

Nhưng chúng không thể thay thế nhau.

### Tôi bắt đầu xây Project Memory thay vì AI Memory

Tôi cần một nơi mà project tự mang theo:

- Knowledge;
- Governance;
- Architecture;
- Semantics;
- Terminology;
- Documentation rules;
- Project Context;
- State;
- Evidence;
- Decisions;
- Active Work;
- Checkpoints;
- Handoffs.

Không phải mọi thứ đều phải nằm trong một file.

Không phải mọi thứ đều phải được load mỗi lần.

Nhưng tất cả những thứ cần để reconstruct project phải tồn tại ngoài trí nhớ tạm thời của AI.

Đây là nguyên tắc tôi bắt đầu dùng:

> **No AI Memory is Canonical.**

AI có thể cache context.

AI có thể remember something.

AI có thể summarize conversation.

Nhưng canonical truth phải nằm trong Project Artifacts.

Nói đơn giản:

AI có thể nhớ tạm. Project phải nhớ thật.

### Tôi cần phân biệt Knowledge và State

Đây là một trong những phân biệt quan trọng nhất của hệ thống.

Project Knowledge trả lời:

> “Project này nên được xây và vận hành theo những nguyên tắc nào?”

Project State trả lời:

> “Project này đang ở đâu ngay lúc này?”

Ví dụ:

Knowledge có thể nói:

Authentication phải tuân theo Security Standard X. Database phải tuân theo Database Standard Y. API phải dùng convention Z.

State có thể nói:

Authentication migration đang VERIFIED. Task TASK-021 đang IN_PROGRESS. Latest release là v0.8.4. Current branch đang ở checkpoint ABC.

Knowledge giống như:

Luật chơi.

State giống như:

Ván cờ hiện tại.

Một project cần cả hai.

Nếu chỉ có Knowledge, AI biết phải làm thế nào nhưng không biết project đang ở đâu.

Nếu chỉ có State, AI biết project đang ở đâu nhưng không biết phải tiếp tục theo luật nào.

### Evidence là thứ nối Knowledge, Execution và State

Tôi từng nghĩ verification là điểm cuối.

Sau này tôi nhận ra verification lại là cầu nối.

Một thay đổi xảy ra:

```text
Task
↓
Change
↓
Test
```

Nhưng tôi cần biết:

Test này chứng minh điều gì?

Kết quả có đủ để chuyển State không?

Vì vậy tôi cần:

```text
Evidence
↓
Verification
↓
State Transition
```

Ví dụ:

Một AI nói:

> “Database migration đã thành công.”

Tôi không muốn dùng câu nói đó để cập nhật state.

Tôi muốn:

```text
Migration Executed
↓
Migration Result
↓
Verification Evidence
↓
Verified
↓
State Update
```

Từ đó tôi rút ra một nguyên tắc:

> **Evidence không chỉ để audit. Evidence là điều kiện để State trở thành đáng tin.**

### Tôi nhận ra Checkpoint không phải Current State

Đây là một phân biệt nữa rất quan trọng.

Một Checkpoint trả lời:

> “Run này đã dừng ở đâu?”

Còn Current Project State trả lời:

> “Project hiện tại đang ở đâu?”

Hai thứ có thể giống nhau.

Nhưng không nhất thiết.

Ví dụ:

```text
RUN-010
↓
Checkpoint
STATE-420
```

Sau đó Run-011 tiếp tục:

```text
RUN-011
↓
Change
↓
STATE-421
```

Khi đó:

Checkpoint của RUN-010 = STATE-420

nhưng:

Current Project State = STATE-421

Vì vậy:

> **RUN CHECKPOINT ≠ CURRENT STATE**

Checkpoint là một historical boundary.

Current State là hiện trạng.

Nếu tôi nhầm hai thứ này, AI mới có thể quay lại một trạng thái cũ nhưng tưởng đó là trạng thái hiện tại.

### Tôi bắt đầu lưu Snapshot và Event Log

Tôi có thể lưu toàn bộ lịch sử.

Nhưng nếu mỗi lần AI khởi động phải đọc toàn bộ lịch sử từ đầu thì hệ thống sẽ rất chậm và tốn context.

Tôi cũng không muốn chỉ giữ một snapshot cuối cùng.

Bởi vì snapshot cho tôi biết:

> “Bây giờ là gì?”

nhưng không cho tôi biết:

> “Nó đã trở thành như thế nào?”

Vì vậy tôi cần hai lớp:

Snapshot + Event Log

Snapshot giúp load nhanh Current State.

Event Log giúp audit, trace và reconstruct các thay đổi quan trọng.

Ví dụ:

```text
STATE-410
↓
TASK-001 completed
↓
STATE-411
↓
DATABASE change
↓
STATE-412
↓
VERIFICATION
↓
STATE-413
```

Tôi không cần load toàn bộ event log để bắt đầu một task.

Nhưng tôi cần nó tồn tại khi cần kiểm tra:

> “Tại sao project lại thành trạng thái này?”

### Persist Everything không có nghĩa là lưu mọi thứ

Tôi rất thích một nguyên tắc nghe có vẻ mâu thuẫn:

> **PERSIST EVERYTHING, LOAD SELECTIVELY.**

Nhưng “Everything” ở đây phải được hiểu đúng.

Không có nghĩa:

Lưu từng token AI đã sinh ra.

Không có nghĩa:

Lưu mọi câu nói trong conversation.

Không có nghĩa:

Lưu mọi retrieval candidate.

Không có nghĩa:

Lưu mọi log lặp lại.

Tôi cần lưu:

mọi material engineering event.

Tức là những sự kiện có thể làm thay đổi cách project được hiểu, vận hành hoặc tiếp tục.

Ví dụ:

```text
TASK
DECISION
FILE CHANGE
KNOWLEDGE CHANGE
STATE CHANGE
ARCHITECTURE CHANGE
GOVERNANCE CHANGE
TEST RESULT
EVIDENCE
ERROR
BLOCKER
UNRESOLVED ITEM
HANDOFF
CHECKPOINT
```

Còn những thứ transient có thể rebuild hoặc không có giá trị engineering lâu dài thì không nhất thiết trở thành canonical record.

Đây là cách tôi sửa lại nguyên tắc:

> **Persist Every Material Engineering Event, Not Every Transient AI Token.**

## RUN LÀ TẠM THỜI. PROJECT STATE LÀ LÂU DÀI.

Tôi cần một boundary rõ ràng giữa execution và continuity.

Một Engineering Run là:

một khoảng thời gian thực thi engineering có kiểm soát, trong đó một AI Executor hoặc một developer thực hiện các task đã được cho phép trên một project.

Nói đơn giản hơn:

Đó là một khoảng thời gian mà AI hoặc người lập trình thực sự làm việc trên project.

Nhưng Engineering Run chỉ là khoảng thời gian thực thi.

Project State phải tồn tại lâu hơn Run.

Ví dụ:

```text
RUN-010
Gemini
↓
Checkpoint
↓
Handoff
↓
RUN-011
DeepSeek
```

Run-010 kết thúc.

Nhưng project không kết thúc.

Đó là ý nghĩa của:

> **Engineering Run is a boundary of execution, not a boundary of project memory.**

### Một Task không nhất thiết nằm trong một Run

Đây cũng là điều tôi từng nghĩ sai.

Tôi từng có cảm giác:

Một task bắt đầu → AI làm → task xong.

Trong thực tế:

```text
TASK-021
↓
RUN-010
↓
PARTIAL
↓
RUN-011
↓
CONTINUE
↓
RUN-012
↓
VERIFIED
↓
COMPLETED
```

Một task có thể tồn tại qua nhiều Engineering Run.

Điều quan trọng là task không bị phụ thuộc vào một chat window.

Nếu Run kết thúc giữa chừng, task vẫn tồn tại.

Nếu AI thay đổi, task vẫn tồn tại.

Nếu provider thay đổi, task vẫn tồn tại.

Nếu laptop crash, task vẫn tồn tại ở trạng thái có thể recovery.

Đó mới là continuity.

### Handoff không phải “copy vài dòng cuối”

Đây là một bài học rất thực tế.

Khi đổi AI, cách đơn giản nhất là copy:

> “AI trước đang làm đến đây, tiếp tục nhé.”

Cách này rất dễ.

Và rất nguy hiểm.

Bởi vì AI mới có thể không biết:

- project state;
- governance;
- architecture;
- decisions;
- constraints;
- recent material changes;
- verification status;
- unresolved issues;
- evidence;
- active task scope.

Vì vậy Handoff phải là một Handoff Contract.

Tôi muốn handoff có ít nhất:

Current State Active Task Completed Work Unverified Work Material Changes Relevant Decisions Known Issues Evidence Open Questions Next Authorized Action Recovery Information

Handoff không phải là:

> “Đọc giúp tôi đoạn chat này.”

Handoff là:

> “Đây là trạng thái engineering mà executor tiếp theo phải tiếp nhận.”

### No Handoff Without State Synchronization

Đây là một nguyên tắc tôi muốn giữ rất chặt:

NO HANDOFF WITHOUT STATE SYNCHRONIZATION.

Tại sao?

Bởi vì nếu Run-A nói:

> “Tôi đã sửa database.”

nhưng Current State vẫn nói:

> “Database chưa verified.”

thì Run-B sẽ không biết tin cái nào.

Nếu Handoff nói:

> “Task hoàn thành.”

nhưng State nói:

`IN_PROGRESS`

thì project đã có conflict.

Vì vậy trước khi handoff:

```text
RUN
↓
CHANGE
↓
VERIFY
↓
STATE SYNC
↓
CHECKPOINT
↓
HANDOFF
```

Không phải:

```text
RUN
↓
CHAT
↓
NEXT AI
```

Đây là difference giữa conversation handoff và engineering handoff.

### Tôi muốn AI tiếp theo reconstruct được project

Đây là tiêu chí mạnh hơn “memory”.

Tôi không cần AI mới nói:

> “Tôi nhớ.”

Tôi cần AI mới có thể:

RECONSTRUCT.

Tức là từ các artifact canonical, nó có thể dựng lại:

What is the project? What rules govern it? What architecture exists? What is the current state? What task is active? What changed recently? What has been verified? What remains unresolved? What can I do next? What am I not authorized to do?

Nếu AI làm được điều đó, tôi không còn phụ thuộc vào “ký ức” của AI.

Tôi phụ thuộc vào project artifacts.

Đó là một architecture bền vững hơn rất nhiều.

### Provider có thể thay đổi. Method không được thay đổi giữa chừng

Tôi có thể dùng Gemini.

Ngày khác tôi dùng DeepSeek.

Ngày khác nữa có thể là một provider hoàn toàn khác.

Tôi không muốn mỗi provider lại biến project thành một cách làm việc mới.

Vì vậy tôi cần:

```text
ONE METHOD
↓
Multiple Executors
↓
ONE PROJECT
```

Engineering Method phải có version.

Coding Standard phải có version.

Architecture Rules phải có version.

Nếu Run-010 dùng Method v1.2 và Run-011 dùng Method v1.7 một cách không kiểm soát, tôi có thể tạo ra drift.

Vì vậy method cần một fingerprint hoặc version có thể kiểm tra.

Ví dụ:

```text
engineering_method:
id: ENERIX-EM
version: "1.2"
commit: af82d1
sha256: "..."
```

Nếu method fingerprint không compatible:

Execution BLOCK.

Điều này nghe rất nghiêm.

Nhưng chính vì thế AI mới có thể thay đổi mà engineering method vẫn giữ được tính liên tục.

### Git không phải là Continuity

Git rất quan trọng.

Nhưng Git không giải quyết toàn bộ bài toán.

Git cho tôi biết:

- file nào thay đổi;
- commit nào tồn tại;
- branch nào;
- diff nào;
- history nào.

Nhưng Git không mặc nhiên biết:

- task đang active hay blocked;
- tại sao thay đổi được thực hiện;
- requirement nào đã được verified;
- evidence nào chứng minh;
- state hiện tại;
- knowledge version;
- authority;
- handoff contract;
- recovery readiness.

Vì vậy:

Git records code history. Continuity records engineering continuity.

Git có thể là một adapter.

Nó không phải authority duy nhất.

Đó là lý do hệ thống continuity mà tôi xây không thể chỉ là:

> “Dùng GitHub.”

## WORKSPACE LOCK

Một vấn đề khác xuất hiện khi nhiều AI cùng tham gia.

Ví dụ:

```text
Gemini
↓
đang sửa file A
```

```text
DeepSeek
↓
cùng sửa file A
```

Ngay lập tức rủi ro xuất hiện.

Ai đang sở hữu workspace?

Change nào là mới nhất?

Ai có quyền commit?

Ai có quyền update State?

Vì vậy tôi cần một Workspace Lock.

Nguyên tắc rất đơn giản:

Một thời điểm chỉ một executor được quyền chỉnh sửa canonical working state của workspace đó.

Điều này không cấm nhiều AI phân tích.

Nhiều AI có thể:

```text
AI A → Proposal
AI B → Proposal
AI C → Review
```

Nhưng canonical change phải đi qua authority path.

Đó là cách tránh biến nhiều AI thành nhiều nguồn sự thật.

### Continuity Gates

Khi tôi đã có Knowledge, State, Evidence và Handoff, tôi có thể tạo ra một thứ quan trọng hơn:

Continuity Gate.

Trước khi một Engineering Run tiếp tục, hệ thống có thể kiểm tra:

```text
BOOTSTRAP PASS
↓
GOVERNANCE PASS
↓
KNOWLEDGE PASS
↓
SEMANTICS PASS
↓
TERMINOLOGY PASS
↓
PROJECT CONTEXT PASS
↓
STATE PASS
↓
RUN DELTA PASS
↓
EVIDENCE PASS
↓
HANDOFF PASS
↓
CONFLICT NONE
↓
TASK AUTHORITY PASS
↓
EXECUTION AUTHORIZED
```

Nếu một gate quan trọng fail, AI không nên tự đoán.

Ví dụ:

```text
STATE PASS
↓
FAIL
```

thì:

BLOCK.

Không:

> “Tạm đoán state hiện tại.”

Đây chính là fail closed.

### Continuity cũng cần Recovery

Tôi từng nghĩ recovery chỉ dành cho production.

Không.

Development cũng cần recovery.

Một Engineering Run có thể chết vì:

- AI provider hết quota;
- IDE crash;
- laptop restart;
- network loss;
- tool failure;
- AI tạo thay đổi sai;
- human mistake;
- merge conflict;
- corrupted working state.

Nếu project không có recovery artifacts, tôi có thể mất hàng giờ để reconstruct.

Một continuity system tốt phải trả lời:

> “Nếu Run chết ở đây, tôi tiếp tục từ đâu?”

Tôi muốn:

Last Known Good State + Latest Checkpoint + Recent Material Deltas + Evidence + Active Task + Recovery Instructions

để có thể phục hồi.

Đây cũng là lý do checkpoint không phải thứ chỉ để đẹp trên giấy.

Checkpoint là recovery primitive.

### Tôi bắt đầu coi Continuity như một Build Artifact

Thông thường người ta coi build artifact là:

- binary;
- container image;
- package;
- compiled assets.

Tôi bắt đầu nghĩ:

Continuity cũng phải là artifact có thể kiểm tra.

Tức là project phải có khả năng tạo ra một snapshot kiểu:

Continuity ID Current State Latest Run Latest Checkpoint Latest Handoff Knowledge Version Governance Version Method Version Evidence Summary Active Work Recovery Status

Và artifact đó phải có thể:

- validate;
- compare;
- backup;
- restore;
- audit.

Từ đây xuất hiện một ý rất quan trọng:

Continuity is a Build Artifact.

Không phải tài liệu trang trí.

Không phải notes.

Mà là một phần của engineering system.

### Continuity có thể được kiểm thử

Một điều thú vị xảy ra sau đó.

Nếu continuity là artifact, tôi có thể test nó.

Tôi có thể giả lập:

AI hiện tại biến mất.

Có thể project tiếp tục không?

Tôi có thể giả lập:

Provider thay đổi.

AI mới có thể reconstruct không?

Tôi có thể giả lập:

Run bị crash giữa chừng.

Recovery có hoạt động không?

Tôi có thể giả lập:

State và handoff conflict.

Hệ thống có block không?

Đó chính là Continuity Testing.

Một continuity system tốt không phải là hệ thống tôi “tin rằng” sẽ hoạt động.

Nó phải là hệ thống tôi đã kiểm tra.

## TÔI BẮT ĐẦU CẦN PAECS

Khi tất cả những ý tưởng này ngày càng lớn, tôi nhận ra chúng không còn là một vài file YAML.

Tôi đang xây một hệ thống.

Tôi gọi nó là:

PAECS

*PROJECT AI ENGINEERING CONTINUITY SYSTEM*

Mục tiêu của PAECS không phải là tạo ra một AI thông minh hơn.

Mục tiêu là:

Cho phép project tiếp tục một cách có kiểm soát khi executor thay đổi, Run kết thúc, hoặc môi trường thay đổi.

Các thành phần chính gồm:

Authority Engine Method Engine Task Engine Change Engine State Engine Evidence Engine Verification Engine Handoff Engine Recovery Engine Security Engine Workspace Lock

GitHub chỉ là một repository adapter.

Local Git cũng chỉ là adapter.

Sau này có thể có:

GitHubAdapter LocalGitAdapter GitLabAdapter GiteaAdapter PrivateServerAdapter

Nhưng authority vẫn nằm trong hệ thống engineering.

### PAECS không thay thế AI

Tôi muốn làm rõ điều này.

PAECS không phải một AI khác.

Nó không cạnh tranh với Gemini.

Không cạnh tranh với DeepSeek.

Không phải một coding model.

Nó là control and continuity layer.

AI làm:

execution.

PAECS kiểm soát:

state, authority, evidence, continuity, recovery.

Nói theo cách đơn giản hơn:

```text
AI
↓
Does the work
```

```text
PAECS
↓
Makes the work governable and continuable
```

Đây chính là sự khác biệt giữa:

AI as a programmer

vài:

AI as an executor inside an engineering system.

### Từ đây, tôi không còn sợ “AI hết quota”

Một trong những vấn đề thực tế nhất là quota.

Gemini đang làm.

Đột nhiên hết quota.

Ngày trước tôi sẽ nghĩ:

> “Chết rồi, phải chờ.”

Sau khi có continuity, tôi có một cách nghĩ khác:

```text
RUN-010
Gemini
↓
Quota exhausted
↓
Checkpoint
↓
Handoff
↓
RUN-011
DeepSeek
↓
Continue
```

Project không dừng.

Executor thay đổi.

Điều quan trọng là state không mất.

Đó là một chuyển đổi rất lớn.

Tôi không còn xây workflow dựa trên:

> “AI nào đang available?”

Tôi xây workflow dựa trên:

> “Project đang ở trạng thái nào và executor nào đủ điều kiện tiếp tục?”

### Tôi nhận ra continuity quan trọng hơn model loyalty

Khi một AI làm việc rất tốt, con người dễ trở nên phụ thuộc.

> “Tôi quen model này.”

> “Model này hiểu project.”

> “Model này biết code.”

Nhưng đó chính là lúc dependency hình thành.

Nếu project chỉ có thể tiếp tục khi một model duy nhất còn nhớ context, project chưa thực sự portable.

Một project mạnh hơn phải có:

Canonical Project Artifacts + Method + State + Evidence + Continuity

để executor chỉ là:

replaceable execution capability.

Tôi không cần tất cả AI giống nhau.

Tôi chỉ cần chúng tuân theo cùng semantic contract và engineering method trong phạm vi phù hợp.

### “One Project, Multiple Executors”

Đây là cách tôi bắt đầu nhìn toàn bộ hệ thống:

```text
PROJECT
│
┌─────────────┼─────────────┐
↓             ↓             ↓
Gemini        DeepSeek      Executor C
│             │             │
└─────────────┼─────────────┘
↓
Verification
↓
State Update
```

Không phải:

Gemini Project

DeepSeek Project

Tôi chỉ muốn:

> **One Project. Multiple Executors.**

Executor thay đổi.

Project không chia đôi.

### Continuity làm thay đổi cả cách tôi viết prompt

Khi đã có Context Engineering và Context Compiler, prompt cũng thay đổi vai trò.

Tôi không còn muốn prompt phải chứa toàn bộ project.

Prompt chỉ cần nói:

Task-specific intent.

Context system chịu trách nhiệm load:

- authority;
- state;
- knowledge;
- terminology;
- documentation rules;
- relevant architecture;
- active evidence;
- current working set.

Vì vậy:

Prompt không còn là nơi lưu project memory.

Prompt là:

interface tới project context.

Đây là một bước tiến rất quan trọng.

## TÔI BẮT ĐẦU LƯU “CURRENT WORKING SET”

Không phải toàn bộ project đều liên quan đến task hiện tại.

Tôi cần một Current Working Set.

Ví dụ:

working_set_id: WS-20260906-014

```text
active_task:
id: TASK-KNOWLEDGE-021
status: IN_PROGRESS
```

```text
primary_domains:
- knowledge
- state
- rag
- continuity

```

```text
primary_files:
- .project/state/current-state.yaml
- .project/knowledge/knowledge-manifest.yaml
- .project/rag/retrieval/

```

```text
related_architecture:
- ARCH-KNOWLEDGE-001
- ARCH-AGENT-RAG-002

```

next_action: - implement retrieval resolver

Đây là cách:

LOAD SELECTIVELY

trở thành một cơ chế thực tế.

AI không cần đọc toàn bộ project.

AI cần đọc đúng project slice.

### Continuity không đồng nghĩa với việc mang toàn bộ quá khứ đi mãi mãi

Đây cũng là một cạm bẫy.

Nếu project phát triển trong nhiều năm, event log sẽ rất lớn.

Tôi không muốn mỗi Engineering Run mang theo toàn bộ lịch sử.

Tôi cần checkpoint compaction.

Tức là:

```text
Full History
↓
Current State Snapshot
+
Relevant Recent Deltas
+
Required Evidence
```

Context mặc định chỉ cần phần cần thiết.

Full history vẫn tồn tại để audit hoặc reconstruct khi cần.

Đó là sự cân bằng giữa:

continuity

vài:

context cost.

### Continuity cũng là một bài toán chi phí

Lúc đầu tôi nghĩ continuity chỉ là vấn đề kiến trúc.

Sau đó tôi nhận ra nó cũng là một vấn đề kinh tế.

Nếu AI mất context thường xuyên:

Context Recovery + Re-explanation + Repeated Work + Verification Again

thì chi phí tăng lên.

Vì vậy continuity giúp giảm:

- context reconstruction cost;
- repeated explanation;
- duplicate work;
- re-verification;
- switching cost.

Đó là lý do:

Context Engineering is also Cost Engineering.

Và:

Continuity Engineering is also Cost Engineering.

Một hệ thống AI rẻ hơn trên bảng giá nhưng buộc tôi phải reconstruct project mỗi lần có thể thực tế lại đắt hơn rất nhiều.

### Tôi muốn continuity độc lập với một chat window

Đây là một tiêu chí rất đơn giản để tôi tự kiểm tra.

Tôi đóng chat.

Mở AI mới.

Đưa project cho AI mới.

AI phải có khả năng:

```text
LOAD
VERIFY
RECONSTRUCT
EXECUTE
REPORT
CHECKPOINT
HANDOFF
```

Nếu không thể, tôi vẫn đang phụ thuộc vào conversation history.

Và nếu project chỉ hoạt động khi conversation history còn nguyên, thì tôi chưa có continuity thực sự.

### Continuity không đồng nghĩa với quyền lực

Có một nhầm lẫn khác cũng nguy hiểm.

Khi AI có nhiều context hơn, nhiều state hơn và hiểu project tốt hơn, người ta rất dễ cho AI nhiều quyền hơn.

Tôi không muốn như vậy.

Một AI biết nhiều hơn không có nghĩa AI được phép làm nhiều hơn.

Vẫn phải giữ:

Capability Does Not Create Authority.

AI có thể biết production state.

Không có nghĩa AI được release.

AI có thể biết database schema.

Không có nghĩa AI được phép drop table.

AI có thể biết deployment pipeline.

Không có nghĩa AI được phép deploy production.

Continuity làm AI hiểu project tốt hơn.

Governance mới quyết định AI được làm gì.

### Tôi bắt đầu nhìn Project như một thực thể có trí nhớ riêng

Đây là nơi ý tưởng “Project remembers itself” trở nên rất rõ.

Tôi có:

Project Knowledge Project State Project Evidence Project Decisions Project History Project Continuity

AI chỉ đọc và làm việc với chúng.

Như vậy, project không còn là:

code + chat history.

Nó trở thành một engineering system có khả năng tự mô tả trạng thái của mình.

Không phải “self-aware” theo nghĩa của AI.

Mà là:

self-describing engineering state.

Project có thể nói:

Tôi là gì.

Tôi đang ở đâu.

Tôi đang làm gì.

Tôi đã làm gì.

Tôi đã verify gì.

Tôi chưa chắc điều gì.

Tôi cho phép task nào tiếp theo.

Đó là một thay đổi rất lớn.

### Tôi không muốn project nhớ mọi thứ. Tôi muốn project nhớ đúng thứ

Cuối cùng, bài toán không phải:

> “Làm sao để lưu càng nhiều càng tốt?”

Mà là:

> “Làm sao để project không quên những thứ thực sự cần cho việc tiếp tục?”

Đó là một tiêu chuẩn khác.

Một engineering event đáng lưu là event mà nếu mất nó, project có thể:

- hiểu sai state;
- lặp lại công việc;
- mất quyết định;
- mất evidence;
- mất khả năng recovery;
- làm sai change;
- mất continuity.

Còn một đoạn chat dài 500 dòng chỉ giải thích lại cùng một điều không nhất thiết phải là canonical memory.

Vì vậy tôi quay về một nguyên tắc rất đơn giản:

Persist Every Material Engineering Event.

Không phải:

Persist Every Conversation.

### Tôi bắt đầu có một định nghĩa mới về “Project Memory”

> “Project Memory”

Project Memory không phải một database chứa tất cả mọi thứ.

Nó là tập hợp những artifact cần thiết để:

reconstruct engineering truth over time.

Nói cách khác:

Memory = Knowledge + State + Evidence + Decisions + Material Events + Continuity Artifacts

và AI có thể dùng chúng để xây context cho task hiện tại.

Từ đó:

Project Memory → Context → Execution

chứ không phải:

Chat History → Hope.

### Tôi đã đi đến một kiến trúc hoàn toàn khác

Lúc đầu:

```text
Human
↓
Prompt
↓
AI
↓
Code
```

Sau nhiều vòng:

```text
Human Intent
↓
Task
↓
Authority
↓
Project Context
↓
AI Executor
↓
Change
↓
Evidence
↓
Verification
↓
State Update
↓
Checkpoint
↓
Continuity
↓
Next Run
```

Đây mới là workflow tôi thực sự muốn.

AI vẫn nằm ở giữa.

Nhưng AI không còn là trung tâm duy nhất.

Project là trung tâm.

### Điều này thay đổi hoàn toàn câu hỏi “AI nào tốt nhất?”

Nếu AI nào cũng có thể reconstruct project bằng cùng một canonical state, câu hỏi:

> “AI nào thông minh nhất?”

trở nên ít quan trọng hơn.

Tôi bắt đầu hỏi:

AI nào phù hợp nhất với task này?

AI nào đủ capability?

AI nào được phép xử lý data này?

AI nào tương thích với state?

AI nào có verification capability phù hợp?

AI nào có cost hiệu quả nhất?

Điều đó dẫn tới một tư duy mới:

> **Provider may change. Engineering Method must not.**

Và:

> **AI Executor is replaceable. Project Continuity is not.**

### Tôi không muốn project thực sự cho một AI

Đây có lẽ là insight quan trọng nhất của chương này.

Tôi không muốn:

Gemini Project.

Cũng không muốn:

DeepSeek Project.

Tôi muốn:

EnerixFin Project.

AI nào đủ điều kiện thì làm.

Run nào hợp lệ thì tiếp tục.

Provider nào thay đổi thì project vẫn sống.

Tool nào thay đổi thì state vẫn tồn tại.

Một laptop hỏng thì recovery vẫn có.

Một chat biến mất thì continuity vẫn có.

Đó là lúc tôi thực sự cảm thấy:

Project đã vượt ra khỏi trí nhớ của AI.

### Một ngày nào đó AI có thể quên tôi hoàn toàn

Và tôi muốn điều đó cũng không thành vấn đề.

Đó là một bài test rất mạnh.

Giả sử ngày mai:

- provider cũ biến mất;
- model cũ không còn;
- conversation history không còn;
- laptop hiện tại hỏng;
- tôi mở project ở một machine khác.

Một AI mới nhận project.

Nếu nó có thể reconstruct:

Governance Knowledge Architecture State Task Evidence Continuity

và tiếp tục đúng cách,

thì project vẫn sống.

Đó mới là thứ tôi muốn xây.

### Reality Check

Tôi muốn tránh một hiểu lầm rất dễ xảy ra.

“Executor-Agnostic” không có nghĩa:

đổi AI là mọi thứ tự động hoạt động.

Không.

Đổi AI vẫn có chi phí.

Vẫn cần:

- eligibility;
- context compilation;
- state verification;
- method compatibility;
- handoff;
- workspace control;
- evidence;
- verification.

Mục tiêu không phải là:

zero cost switching.

Mục tiêu là:

controlled switching with predictable continuity.

Đó là khác biệt giữa một hệ thống có architecture và một lời hứa marketing.

### Điều tôi học được

Tôi bắt đầu bằng suy nghĩ:

“Tôi cần AI mạnh hơn.”

Sau đó tôi nghĩ:

“Tôi cần AI nhớ project.”

Rồi tôi nhận ra:

Tôi không cần AI nhớ. Tôi cần project nhớ.

Tiếp theo:

Tôi không cần AI duy nhất.

Tôi cần:

nhiều executor có thể thay thế nhau.

Nhưng muốn thay thế:

không thể chỉ đổi model.

Tôi cần:

một Engineering Method chung.

Muốn giữ method:

cần Semantic Contract.

Muốn giữ truth:

cần State + Evidence + Authority.

Muốn tiếp tục:

cần Checkpoint + Handoff + Recovery.

Muốn nhiều AI cùng làm:

cần Controlled Autonomy.

Và cuối cùng:

AI có thể thay đổi. Project không được mất khả năng tiếp tục.

Đó là lúc tôi thực sự hiểu câu:

I don't want a better AI. I want a project that can continue.

### CHUYỂN TIẾP

Tôi đã giải quyết được một phần rất quan trọng của bài toán.

Project có thể tiếp tục.

Nhưng continuity lại dẫn tôi đến một câu hỏi mới.

Nếu một project có thể tiếp tục...

Nếu Gemini có thể làm hôm nay...

DeepSeek có thể tiếp tục ngày mai...

Một executor khác có thể tiếp tục sau nữa...

thì làm thế nào để tất cả những executor đó không biến project thành nhiều cách làm việc khác nhau?

Làm thế nào để:

Gemini làm theo một cách,

DeepSeek làm theo một cách,

một AI khác lại làm theo cách khác,

mà cuối cùng project vẫn là một project duy nhất?

Tôi bắt đầu nhận ra rằng vấn đề tiếp theo không còn là memory.

Mà là:

Multiple AI, One Method.

Và đó là lúc tôi bắt đầu xây một nguyên tắc mới:

One Method. Multiple Executors. One Project.

Đó là bước tiếp theo trên con đường từ AI có thể tiếp tục đến AI có thể tiếp tục mà không làm thay đổi cách project được xây.
