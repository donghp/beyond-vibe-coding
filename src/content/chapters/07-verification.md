---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 7
title: "NHIỀU AI, MỘT CÁCH LÀM VIỆC"
subtitle: "Từ việc đổi AI theo tình huống đến một Engineering Method mà nhiều Executor có thể cùng thực hiện"
shortTitle: "Nhiều AI, một cách làm việc"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
canonical_page_start: 114
source_artifact: "07.BEYOND_VIBE_CODING_CORE_BOOK_Chapter_07_draf.pdf"
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
id: "07-verification"
order: 7
publicationStatus: "published"
contentStatus: "complete"
description: "Why many AI executors require a unified Engineering Method, shared project state, and semantic contracts to work together effectively."
readingTime: "9 min"
topics: ["ai-engineering", "engineering-method", "executor-substitution", "paecs", "resilience"]
hero: "images/chapter-07-hero.webp"
published: "2026-09-10"
updated: "2026-09-10"
version: "1.0.0"
---

<!-- Canonical structured manuscript. No PDF page coordinates or running chrome are encoded here. -->

# CHƯƠNG 7

# NHIỀU AI, MỘT CÁCH LÀM VIỆC

*Từ việc đổi AI theo tình huống đến một Engineering Method mà nhiều Executor có thể cùng thực hiện*

Ở hai chương trước, tôi đã thay đổi hai cách nhìn quan trọng.

Thứ nhất: tôi không còn tìm “AI mạnh nhất”. Tôi tìm AI đủ điều kiện để làm task.

Thứ hai: tôi không còn cố giữ project trong trí nhớ của một AI. Tôi xây Project Knowledge, Project State và Continuity để project có thể tiếp tục.

Nhưng ngay khi tôi cho phép nhiều AI cùng tham gia một project, một vấn đề mới xuất hiện.

AI có thể thay đổi. Nhưng cách project được xây dựng không thể thay đổi theo từng AI.

Tôi bắt đầu nhận ra rằng thay thế executor chỉ giải quyết được một nửa bài toán.

Nửa còn lại là làm thế nào để các executor khác nhau vẫn cùng làm việc theo một cách nhất quán.

Đó là lúc tôi bắt đầu nghĩ nghiêm túc về một nguyên tắc:

> **One Method. Multiple Executors. One Project.**

## TÔI TỪNG NGHĨ NHIỀU AI LÀM VIỆC NHƯ MỘT ĐỘI

Khi có nhiều AI, suy nghĩ đầu tiên của tôi khá hấp dẫn.

Một AI viết code. Một AI review. Một AI test. Một AI tối ưu. Một AI tìm bug.

Nhìn trên giấy, năng lực dường như được cộng lại.

Nhưng project không vận hành trên giấy.

Nếu AI A tạo ra một cách hiểu về architecture, AI B tạo ra một cách hiểu khác, còn AI C sửa tiếp dựa trên một state cũ, tôi không có một đội ngũ mạnh hơn. Tôi có nhiều nguồn thay đổi đang cạnh tranh với nhau.

Tôi bắt đầu hiểu rằng số lượng AI không phải là thước đo của năng lực engineering.

> **More AI does not automatically mean more speed.**

Đôi khi nhiều AI chỉ tạo ra nhiều coordination cost hơn.

### MỘT PROJECT CÓ THỂ CÓ NHIỀU EXECUTOR, NHƯNG KHÔNG NÊN CÓ NHIỀU SỰ THẬT

Điều tôi cần không phải là mọi AI nghĩ giống nhau.

Tôi cần chúng cùng tham chiếu về một nguồn sự thật chung.

Project phải có một Project State mà mọi executor đều đọc được.

Project phải có một Engineering Method mà mọi executor đều tuân theo.

Project phải có Governance xác định điều gì được phép.

Project phải có Evidence để phân biệt claim với verified state.

Project phải có Continuity để một executor có thể tiếp nhận công việc của executor khác.

> **MỘT AI CÓ THỂ CÓ CÁCH SUY LUẬN KHÁC AI KHÁC. NHƯNG PROJECT KHÔNG ĐƯỢP PHÉP CÓ HAI CANONICAL STATE CHO CÙNG MỘT THỜI ĐIỂM.**

> **Executor diversity is acceptable. Truth divergence is not.**

## TÔI BẮT ĐẦU PHÂN BIỆT EXECUTOR VÀ METHOD

Một AI Executor là thành phần thực hiện task.

Engineering Method là cách project quy định task được phân tích, thực hiện, kiểm chứng và ghi nhận như thế nào.

Hai thứ này không giống nhau.

Executor có thể thay đổi.

Method không nên thay đổi chỉ vì executor thay đổi.

> **Provider may change; Engineering Method must not.**

Điều đó không có nghĩa method phải bất biến mãi mãi. Method cũng có version và có thể được thay đổi bằng governance. Nhưng một executor không được tự ý thay đổi method chỉ vì nó thích cách khác.

### CÙNG METHOD KHÔNG CÓ NGHĨA CÙNG PROMPT

Đây là một distinction rất quan trọng.

Gemini có thể nhận instruction theo cách phù hợp với môi trường Google AI Studio. DeepSeek trong một local workflow có thể nhận task thông qua Codex hoặc môi trường VS Code.

Prompt formatting có thể khác.

Tool interface có thể khác.

Context delivery mechanism có thể khác.

Nhưng semantic contract của task không nên thay đổi.

Cùng một task phải có cùng objective, cùng authorization, cùng acceptance criteria và cùng verification expectation.

### ADAPTERS, NOT NEW METHODS

Provider-specific adapters được phép thay đổi cách truyền instruction. Chúng không được tự tạo một Engineering Method khác.

### METHOD LOCK

Khi nhiều executor cùng làm project, tôi cần biết chúng đang chạy đúng version của method hay không.

Từ đó xuất hiện ý tưởng Method Lock.

Một execution phải biết nó đang dùng Engineering Method version nào.

If method version hoặc fingerprint không khớp với project baseline, execution phải bị block hoặc yêu cầu explicit authorization.

```text
engineering_method:
  id: ENERIX-EM
  version: "1.x"
  commit: <commit>
  sha256: "<fingerprint>"
```

Tôi không muốn một executor âm thầm sử dụng “cách làm mới” rồi để executor tiếp theo tiếp tục trên một method khác.

> **Method drift is a project change, not an implementation detail.**

### KHI AI A GẶP AI B

Hãy quay lại một tình huống thực tế.

AI A đang làm việc.

Nó gặp một task khó.

Tôi quyết định chuyển task sang AI B.

AI B mở project.

Nó không có conversation của AI A.

Nhưng nó có:

- Task definition.
- Execution Contract.
- Project State.
- Current Working Set.
- Recent Changes.
- Evidence.
- Engineering Method.
- Governance.

AI B không cần trở thành AI A.

Nó chỉ cần trở thành một executor hợp lệ của cùng một project.

## WORKSPACE LOCK

### HANDOFF KHÔNG CHỈ LÀ BÀN GIAO CODE

Trong cách làm cũ, bàn giao thường có nghĩa là gửi source code hoặc gửi một đoạn note.

Trong AI Engineering, tôi cần nhiều hơn thế.

Handoff phải mang theo context đủ để executor mới reconstruct task.

Tôi bắt đầu nghĩ Handoff Contract nên có:

- Task ID và objective.
- Current State.
- Last material change.
- Verification status.
- Open blockers.
- Known constraints.
- Latest checkpoint.
- Next action.

Nếu những thứ này không đồng bộ, executor mới có thể làm đúng code nhưng sai project.

> **No handoff without state synchronization.**

Tôi cũng gặp một vấn đề khác khi thử nhiều AI: ai thực sự đang được quyền sửa project?

Nếu AI A đang chỉnh source trong khi AI B cũng chỉnh source, chúng có thể tạo ra conflict mà không AI nào biết đầy đủ.

Vì vậy tôi bắt đầu coi workspace ownership là một phần của governance.

Một workspace active nên có một owner rõ ràng.

Owner đó có thể là một AI Executor hoặc một developer.

Executor khác có thể đọc trong phạm vi được phép, nhưng không tự tiện trở thành writer nếu chưa có quyền.

### MULTI-AI DOES NOT MEAN MULTI-WRITER

Nhiều executor là khả năng. Nhiều writer đồng thời là một concurrency problem phải được thiết kế riêng.

### BRANCH KHÔNG PHẢI LÀ MỘT PROJECT KHÁC

Khi có nhiều executor, branch trở thành một công cụ rất hữu ích.

Nhưng tôi không muốn branch làm thay đổi khái niệm về canonical project.

Một branch có thể là execution lane.

Một branch có thể là recovery lane.

Một branch có thể là experimental lane.

Nhưng branch không tự động trở thành canonical truth chỉ vì nó có code mới hơn.

State và verification mới cho biết một thay đổi đang ở đâu trong lifecycle.

> **Branch tells me where code lives. State tells me what the project believes.**

### EXPERIMENTAL LANE VÀ CANONICAL LANE

Tôi bắt đầu thấy việc tách “thử nghiệm” và “cam kết” rất quan trọng.

AI được phép nhanh hơn trong một experimental lane.

Nhưng khi một change được promote vào canonical project, nó phải đi qua cùng method và verification.

Điều này cho phép tôi giữ lại ưu điểm của Vibe Coding mà không biến production project thành một playground.

```text
EXPERIMENT
   ↓
DISCOVER
   ↓
PROPOSE
   ↓
VERIFY
   ↓
PROMOTE
   ↓
CANONICAL
```

Một prototype tốt có thể chết.

Một canonical change phải có provenance.

### STYLE DRIFT CŨNG LÀ ENGINEERING DRIFT

Tôi từng nghĩ nếu code đúng thì style không quá quan trọng.

Nhưng khi nhiều executor tham gia, style bắt đầu trở thành một signal.

AI A đặt tên một cách.

AI B dùng folder khác.

AI C xử lý error theo một convention khác.

AI D tạo API theo một pattern khác.

Mỗi thay đổi riêng lẻ có thể đều “chạy được”.

Nhưng tổng thể project bắt đầu mất coherence.

Từ đó tôi bắt đầu quan tâm đến Engineering Style Drift.

### DRIFT DETECTION

Theo dõi naming, folder structure, API pattern, error handling, database access, state handling, testing và documentation để phát hiện sự lệch khỏi method hiện hành.

### MỘT AI KHÔNG ĐƯỢC TỰ Ý “CẢI TIẾN” METHOD

Một AI có thể đề xuất cách tốt hơn.

Tôi rất muốn nó làm điều đó.

Nhưng proposal và authority là hai thứ khác nhau.

AI có thể nói:

> “Tôi đề xuất thay đổi cách tổ chức repository layer vì cách hiện tại có thể gây duplicate logic.”

Tôi có thể review đề xuất đó.

Nếu được chấp nhận, method hoặc architecture baseline được thay đổi qua governance.

Sau đó tất cả executor sử dụng baseline mới.

Tôi không muốn AI A tự thay method rồi AI B phát hiện một “thực tế mới” trong project.

> **Capability does not create Authority.**

## ROUTING KHÔNG CHỈ CHỌN AI. NÓ CHỌN CẢ EXECUTION MODE

Chương trước tôi nói về việc chọn AI phù hợp với task.

Khi có nhiều executor, tôi nhận ra routing còn cần chọn mode.

Task routine có thể chạy ở Zero-Budget Mode.

Task tiêu chuẩn có thể dùng Standard Mode.

Task cần tăng tốc có thể dùng Acceleration Mode.

Task có thể hưởng lợi từ nhiều AI có thể dùng Multi-AI Mode.

Task critical cần Controlled Mode với human authority mạnh hơn.

```text
M0  ZERO-BUDGET
M1  STANDARD
M2  ACCELERATION
M3  MULTI-AI
M4  CRITICAL CONTROLLED
```

Điều tôi thích ở cách này là model không còn quyết định mode một mình.

Risk, governance, verification và economics cùng tham gia vào quyết định.

### MULTI-AI MODE KHÔNG PHẢI “CHO NHIỀU AI CODE CÙNG LÚC”

Một task có thể dùng nhiều AI theo một pipeline có kiểm soát.

Ví dụ, một AI có thể discovery.

Một AI khác tạo implementation proposal.

Một executor được authorized mới thực hiện change.

Một executor khác review.

Human hoặc governance gate xác nhận khi cần.

```text
DISCOVERY
   ↓
PROPOSAL
   ↓
AUTHORIZED EXECUTION
   ↓
VERIFICATION
   ↓
STATE UPDATE
```

Điều quan trọng là chỉ một nơi có quyền commit canonical change tại một thời điểm.

### TÔI BẮT ĐẦU NHÌN “NHIỀU AI” NHƯ MỘT HỆ THỐNG PHÂN CÔNG

Có AI phù hợp để discovery.

Có AI phù hợp để coding.

Có AI phù hợp để review.

Có AI phù hợp để phân tích một artifact lớn.

Có AI phù hợp cho local execution.

Có AI phù hợp cho những task có economics khác nhau.

Nhưng assignment phải xuất phát từ task.

Tôi không muốn bắt project thích nghi với AI.

Tôi muốn AI thích nghi với project trong phạm vi method và governance.

## SEMANTIC CONTRACT

Khi nhiều executor khác nhau cùng làm một task, prompt không thể là contract chung.

Prompt quá phụ thuộc provider, tool và cách diễn đạt.

Tôi cần một lớp trừu tượng hơn.

Tôi bắt đầu nghĩ về Semantic Contract.

Semantic Contract mô tả ý nghĩa engineering của task mà không phụ thuộc vào cách một provider nhận instruction.

Nó có thể chứa:

- Objective.
- Scope.
- Authorization.
- Required context.
- Acceptance criteria.
- Verification.
- Stopping condition.
- Reporting requirements.

Adapter của từng executor chuyển Semantic Contract thành instruction phù hợp với môi trường của nó.

### EXECUTOR ADAPTER

Từ đây tôi hình dung rõ hơn kiến trúc:

```text
SEMANTIC CONTRACT
        ↓
EXECUTOR ADAPTER
   ↙          ↘
GEMINI       DEEPSEEK
  ↘            ↙
ENVIRONMENT / TOOLING
        ↓
EXECUTION
```

Adapter không thay đổi task semantics.

Adapter chỉ chuyển semantic contract sang interface cụ thể của executor.

Điều này giúp provider thay đổi mà project method vẫn ổn định.

> **One semantic contract. Multiple execution adapters.**

### KHI HAI AI KHÔNG ĐỒNG Ý

Đây là tình huống chắc chắn sẽ xảy ra.

AI A đề xuất cách A.

AI B đề xuất cách B.

Tôi không muốn hệ thống chọn theo kiểu “AI nào thông minh hơn thì thắng”.

Tôi muốn conflict trở thành một explicit engineering event.

Hai proposal được ghi nhận.

Authority được resolve.

Decision được tạo hoặc cập nhật.

Sau đó mới có execution.

> **Disagreement is not failure. Silent divergence is failure.**

### CONFLICT DETECTION

Conflict có thể xảy ra ở nhiều tầng.

- Business rules.
- Architecture.
- Database schema.
- Security policy.
- Terminology.
- Project State.
- Governance.

Nếu canonical authority không resolve được conflict, tôi muốn fail closed.

Không để executor tự chọn một phiên bản “có vẻ đúng”.

### SIMILARITY IS NOT AUTHORITY

Tìm thấy một artifact phù hợp không có nghĩa artifact đó có quyền quyết định.

### TÔI BẮT ĐẦU MUỐN CÓ MỘT “SAME PROJECT CHECK”

Trước khi một executor nhận task, tôi muốn system kiểm tra:

- Project identity.
- Method version.
- Governance baseline.
- Knowledge baseline.
- Current State.
- Active Task.
- Workspace ownership.
- Handoff status.
- Required evidence.

Nếu những thứ đó khớp, executor được phép tiếp tục trong phạm vi authorized.

Nếu không khớp, system phải báo conflict hoặc block.

## CONTINUITY GATE TRƯỚC KHI EXECUTION

Lúc này tôi bắt đầu nhìn continuity như một gate chứ không chỉ là một file.

```text
BOOTSTRAP      PASS
GOVERNANCE      PASS
KNOWLEDGE       PASS
SEMANTICS       PASS
TERMINOLOGY     PASS
PROJECT CONTEXT PASS
STATE           PASS
RUN DELTA       PASS
EVIDENCE        PASS
HANDOFF         PASS
CONFLICT        NONE
TASK AUTHORITY  PASS
=> EXECUTION AUTHORIZED
```

If một gate quan trọng fail, executor không nên tự quyết định bỏ qua.

Đó là cách continuity trở thành một phần của controlled autonomy.

### CÁI TÔI MUỐN GỮ GIỐNG NHAU Ở MỌI EXECUTOR

Không phải prompt.

Không phải giao diện.

Không phải model.

Không phải provider.

Thứ tôi muốn giữ giống nhau là:

- Task semantics.
- Engineering Method.
- Governance.
- Architecture rules.
- Security rules.
- Project State semantics.
- Verification expectations.

Đó là lý do tôi có thể thay executor mà không thay project.

### CÁI TÔI CHẤP NHẬN KHÁC NHAU

Tôi chấp nhận rằng Gemini có thể viết code khác DeepSeek.

Tôi chấp nhận cách giải thích khác nhau.

Tôi chấp nhận tốc độ khác nhau.

Tôi chấp nhận khả năng reasoning khác nhau.

Tôi chấp nhận cost khác nhau.

Tôi chấp nhận execution environment khác nhau.

Tôi chỉ không chấp nhận một thứ:

Khác nhau đến mức tạo ra một project khác.

## ONE PROJECT

Đây là lúc câu “One Method. Multiple Executors. One Project.” trở thành một nguyên tắc thật sự đối với tôi.

One Method giữ cho cách làm không phân mảnh.

Multiple Executors cho tôi khả năng thay thế, routing và resilience.

One Project giữ cho tất cả thay đổi cùng phục vụ một canonical state.

### THE GOAL IS NOT AI DIVERSITY

Mục tiêu là project resilience. Nhiều executor chỉ là một cơ chế để đạt điều đó.

### TÔI BẮT ĐẦU NHÌN AI NHƯ “WORKFORCE”, KHÔNG PHẢI “OWNER”

Một project có thể có nhiều AI giống như một đội có nhiều người.

Nhưng owner của project không phải một thành viên trong đội.

Owner của canonical truth vẫn là hệ thống engineering và con người có authority.

AI được giao task.

AI thực hiện.

AI báo cáo.

AI checkpoint.

AI handoff.

Nhưng AI không được tự trở thành authority chỉ vì nó làm việc nhiều nhất.

> **AI should execute the project. AI should not become the project.**

### TÔI CŨNG NHÌN LẠI “COST”

Khi có nhiều executor, tôi có thêm một loại chi phí mới: orchestration cost.

Có thời điểm việc chuyển task sang AI khác giúp tôi tiết kiệm rất nhiều.

Nhưng có lúc việc phối hợp hai hoặc ba AI tạo ra nhiều overhead hơn giá trị.

Vì vậy tôi lại quay về nguyên tắc ở Chương 2:

> **Switch when expected benefit is greater than switching cost.**

Và bây giờ switching cost không chỉ là tiền.

Nó còn là context recovery, state synchronization, verification và coordination.

### MỘT AI KHÁC KHÔNG NÊN BẮT ĐẦU TỪ ZERO

Nếu executor mới phải đọc toàn bộ repository, toàn bộ history và hàng trăm conversation để hiểu project, continuity chưa đủ tốt.

Nó nên nhận một minimum sufficient working set.

Working set có thể bao gồm:

- Current task.
- Current state.
- Relevant knowledge.
- Relevant architecture.
- Recent changes.
- Evidence.
- Handoff.
- Next action.

Phần còn lại vẫn tồn tại trong project, nhưng không cần nạp vào context mặc định.

### RECOVERY RUN

Có một tình huống tôi đặc biệt coi trọng: executor cũ biến mất giữa chừng và executor mới phải phục hồi công việc.

Tôi gọi đây là một Recovery Run.

Recovery Run không phải một Run bình thường vì mục tiêu đầu tiên là xác định state và integrity trước khi tiếp tục.

```text
LOAD STATE
   ↓
CHECK CHECKPOINT
   ↓
RECONSTRUCT WORKING SET
   ↓
VERIFY INTEGRITY
   ↓
RESUME OR BLOCK
```

Điều quan trọng là recovery phải có thể hoạt động ngay cả khi AI cũ không còn.

### KHI NHIỀU AI CÙNG ĐỀ XUẤT

Tôi không nhất thiết phải cấm nhiều AI cùng discovery.

Tôi chỉ cần tách proposal khỏi execution.

Nhiều AI có thể tạo nhiều proposal.

Nhưng canonical change phải đi qua authority.

```text
AI A → PROPOSAL A
AI B → PROPOSAL B
AI C → PROPOSAL C
        ↓
AUTHORITY / REVIEW
        ↓
ONE AUTHORIZED CHANGE
```

Như vậy tôi tận dụng được diversity mà không tạo ra multi-writer chaos.

### PROJECT STATE PHẢI THẮNG EXECUTOR OPINION

Đây là một nguyên tắc tôi muốn giữ thật cứng.

AI A nói task completed.

AI B nói task incomplete.

Project State nói VERIFIED.

Evidence chỉ ra test suite và acceptance criteria đã đạt.

Kết luận phải đến từ project state + evidence + authority, không phải từ AI nào nói tự tin hơn.

> **Executor opinion is input. Canonical state is the project truth.**

### VÀ RỒI TỒI NHẬN RA MỘT ĐIỀU VỀ “TEAMWORK”

Nếu nhiều developer cùng làm project, chúng ta đã có những khái niệm như coding standards, architecture rules, pull request, code review, CI, release gates.

Khi thêm AI, chúng ta không nên xóa những nguyên tắc đó.

Chúng ta phải làm cho AI có thể tham gia vào cùng một hệ thống.

AI không cần một “hệ luật riêng”.

AI cần được đặt vào engineering system hiện có hoặc một engineering system được thiết kế rõ ràng cho nó.

Đây là lý do tôi không muốn biến AI coding thành một thế giới tách biệt với software engineering.

## NHIỀU AI, NHƯNG MỘT CÁCH LÀM VIỆC

Cuối cùng, tôi bắt đầu nhìn architecture theo một sơ đồ rất đơn giản:

```text
                    PROJECT
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     METHOD        GOVERNANCE       STATE
        │              │              │
        └──────────────┼──────────────┘
                       │
               SEMANTIC CONTRACT
                       │
             EXECUTOR ADAPTERS
                 ↙          ↘
             AI A           AI B
                 ↘          ↙
                EXECUTION
                    │
              VERIFICATION
                    │
               STATE UPDATE
```

Sự thông minh có thể nằm ở executor.

Nhưng sự nhất quán phải nằm ở project.

### KEY IDEA

Nhiều AI chỉ trở thành lợi thế khi chúng cùng phục vụ một Project State, một Engineering Method và một Governance.

Không phải số lượng executor tạo ra một engineering system tốt.

Chính khả năng thay executor mà không làm mất context, không phá state và không thay đổi cách project được kiểm soát mới tạo ra resilience.

### WHAT I LEARNED

Tôi bắt đầu chương này với một suy nghĩ:

> “Nếu có nhiều AI thì project sẽ nhanh hơn.”

Tôi kết thúc với một suy nghĩ khác:

> “Nhiều AI chỉ có ích khi project có một cách làm việc đủ rõ để chúng có thể cùng tham gia mà không tạo ra nhiều sự thật.”

> **One Method.**

> **Multiple Executors.**

> **One Project.**

### CHUYỂN TIẾP

Tôi đã có nhiều executor.

Tôi đã có một method chung.

Tôi đã có state, handoff và governance.

Nhưng một câu hỏi khó hơn bắt đầu xuất hiện:

Nếu AI có thể làm nhiều việc và project đã có đủ context, vậy AI có nên tự quyết định project phải làm gì tiếp theo không?

Câu trả lời của tôi bắt đầu rất rõ:

Không phải vì AI không đủ thông minh. Mà vì capability không tạo ra authority.

Từ đây tôi bắt đầu nhìn nghiêm túc hơn vào một vấn đề khác: AI cần được điều khiển như thế nào để có thể tự động hóa mà không tự trở thành người quyết định?

Đó là câu chuyện của Chương 8.

---

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 7 - NHIỀU AI, MỘT CÁCH LÀM VIỆC
├── TÔI TỪNG NGHĨ NHIỀU AI LÀM VIỆC NHƯ MỘT ĐỘI
├── TÔI BẮT ĐẦU PHÂN BIỆT EXECUTOR VÀ METHOD
├── WORKSPACE LOCK
├── SEMANTIC CONTRACT
└── NHIỀU AI, NHƯNG MỘT CÁCH LÀM VIỆC

Navigation metadata only. It does not control PDF coordinates or typography.
-->
