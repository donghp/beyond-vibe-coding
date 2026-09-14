---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 18
order: 18
title: "TÔI KHÔNG THỰC SỰ DỪNG VIBE CODING"
subtitle: "Từ Vibe Coding đến Controlled Vibe Engineering"
shortTitle: "Tôi không thực sự dừng vibe coding"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
publicationStatus: "published"
contentStatus: "final"
canonical_page_start: 419
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
navigation_root: "CHƯƠNG 18 - TÔI KHÔNG THỰC SỰ DỪNG VIBE CODING"
publication_standard: "BVCE V3.2"
hero: "images/chapter-18-hero.webp"
readingTime: "12 min"
topics: ["controlled vibe engineering", "vibe budget", "edge vs core", "risk governance", "continuity"]
---
<!-- Prompt-ID: #000034 | Prompt-Title: BVC — CHAPTER 18 CANONICAL SOURCE PUBLICATION & BVCE V3.2 RELEASE -->
<!-- Canonical structured manuscript. Whole-book page numbering starts at 419. All chapter-internal numeric section numbering has been removed. -->

# CHƯƠNG 18

# TÔI KHÔNG THỰC SỰ DỪNG VIBE CODING

### *Từ Vibe Coding đến Controlled Vibe Engineering*

Có một điều tôi phải thú nhận.

Sau tất cả những gì tôi đã viết về:

- **Task Engineering** (phương pháp xác định và chia nhỏ công việc để AI thực hiện đúng phạm vi)

- **Context Engineering** (cách cung cấp đúng thông tin cần thiết cho AI trong từng tác vụ)

- **Verification** (việc kiểm tra và chứng minh kết quả đáp ứng yêu cầu)

- **Project State** (trạng thái được xác định của project tại một thời điểm)

- **Engineering Run** (một lần thực thi có kiểm soát của quy trình engineering)

- **Continuity** (khả năng project tiếp tục mà không mất context, state và công việc)

- **Architecture** (kiến trúc của hệ thống)

- **Governance** (cơ chế quy định quyền hạn, kiểm soát và trách nhiệm)

- **Release** (việc cho phép một functionality trở thành một phần của product dành cho người dùng)

tôi vẫn thích Vibe Coding.

Tôi vẫn thích cảm giác chỉ cần nói một ý tưởng rất ngắn với AI…

và vài phút sau đã có thứ gì đó chạy được.

Tôi vẫn thích việc có thể thử một ý tưởng mà trước đây có thể mất vài giờ hoặc vài ngày.

Tôi vẫn thích việc AI biến khoảng cách giữa:

> “Tôi có một ý tưởng”

và:

> “Tôi có một prototype”

thành một khoảng cách rất nhỏ.

Vậy tôi có thực sự muốn bỏ Vibe Coding không?

Không.

Tôi chỉ không muốn để Vibe Coding điều khiển toàn bộ project.

---

## VIBE CODING VẪN CÓ GIÁ TRỊ, NHƯNG KHÔNG ĐỦ

### Tôi đã hiểu sai Vibe Coding

Ban đầu tôi nghĩ Vibe Coding nghĩa là:

> “Nói với AI bằng ngôn ngữ tự nhiên và để AI viết code.”

Nếu vậy thì Vibe Coding không có gì đáng sợ.

Thậm chí nó rất hữu ích.

Vấn đề xuất hiện khi:

Vibe trở thành engineering method duy nhất.

Khi đó workflow có thể trở thành:

Idea

↓

Prompt

↓

AI

↓

Code

↓

Looks Good

↓

Next Feature

↓

More Code

Không có:

- **requirement**

- **authority**

- **state**

- **verification**

- **architecture boundary**

- **release gate.**

Đó mới là thứ tôi muốn thoát khỏi.

Không phải Vibe Coding.

---

### Vibe Coding có một sức mạnh rất lớn

Tôi muốn công bằng với nó.

Trước AI, một ý tưởng phần mềm thường phải đi qua một khoảng cách khá lớn:

Idea

↓

Learn Technology

↓

Set Up Environment

↓

Write Code

↓

Debug

↓

Build

↓

Test

Với AI:

Idea

↓

Describe

↓

Prototype

Khoảng cách giảm xuống rất mạnh.

Điều này có ý nghĩa đặc biệt với:

- **founder**

- **business owner**

- **domain expert**

- **designer**

- **developer**

- **researcher**

- **freelancer**

- **người đang thử một ý tưởng mới.**

AI làm cho:

Software creation trở nên accessible hơn rất nhiều.

Đây là một thay đổi lớn.

Tôi không muốn biến nó thành một thứ xấu chỉ vì chúng ta sử dụng nó sai.

---

### Vấn đề không phải là “Vibe” hay “Engineering”

Đây là một binary choice rất dễ mắc phải.

Một bên:

Vibe Coding.

Bên kia:

Traditional Engineering.

Tôi không nghĩ phải chọn một.

Tôi bắt đầu nhìn nó như một continuum:

PURE VIBE

↓

VIBE-ASSISTED

↓

AI-ASSISTED ENGINEERING

↓

CONTROLLED AI ENGINEERING

Và mỗi loại task có thể nằm ở một vị trí khác nhau.

Một prototype UI có thể cho phép rất nhiều vibe.

Một database migration production có thể gần như không cho phép vibe.

Đó là điều tôi gọi là:

**Vibe Budget** (mức độ tự do được phép dành cho AI theo mức rủi ro của task).

---

### Vibe Budget

Tôi muốn mỗi task có một mức độ tự do phù hợp với risk.

Ví dụ:

R0 — Routine

Có thể rất tự do.

AI có thể:

- **thử nhiều cách**

- **refactor**

- **generate code**

- **experiment.**

R1 — Low Risk

Vẫn có nhiều autonomy nhưng cần basic verification.

R2 — Moderate

Context và acceptance criteria phải rõ hơn.

R3 — High

Scope chặt.

Evidence mạnh.

Review rõ.

R4 — Critical

Không còn:

> “Let's see what happens.”

Mà phải:

**Controlled Execution** (thực thi trong một phạm vi đã được kiểm soát và cho phép).

Vì vậy:

Risk ↑

↓

Vibe Freedom ↓

↓

Explicit Control ↑

↓

**Verification** (việc kiểm tra và chứng minh kết quả đáp ứng yêu cầu) ↑

Đây là cách tôi giữ được tốc độ mà không đánh đổi sự an toàn.

---

## VIBE Ở EDGE. ENGINEERING Ở CORE.

### Vibe ở Edge. Engineering ở Core.

Đây là nguyên tắc tôi muốn giữ lại:

VIBE FAST AT THE EDGE. ENGINEER CAREFULLY AT THE CORE.

“Edge” là những vùng:

- **prototype**

- **exploration**

- **UI experimentation**

- **copy**

- **mock data**

- **low-risk refactoring**

- **idea validation.**

“Core” là những vùng:

- **authentication**

- **authorization**

- **financial logic**

- **customer data**

- **database schema**

- **security**

- **architecture boundaries**

- **production deployment**

- **critical business rules.**

Ở edge, tốc độ có thể thắng.

Ở core, correctness phải thắng.

---

### Tôi không muốn mọi task đều có cùng một quy trình

Nếu mỗi lần đổi một dòng text tôi phải:

**Architecture** (kiến trúc của hệ thống) Review

Security Review

Human Approval

**Release** (việc cho phép một functionality trở thành một phần của product dành cho người dùng) Board

thì hệ thống trở nên vô dụng.

Ngược lại, nếu database migration production chỉ cần:

> “AI, do it.”

thì cũng nguy hiểm.

Vì vậy governance phải:

**Risk-Proportional** (có mức kiểm soát tương xứng với mức rủi ro).

Đây là một trong những nguyên tắc tôi thấy quan trọng nhất khi xây workflow AI.

---

### Tôi bắt đầu phân biệt Exploration và Commitment

Đây là một distinction rất hữu ích.

**Exploration** (giai đoạn khám phá các khả năng trước khi cam kết cách làm)

Chúng ta đang tìm hiểu:

> “Có thể làm được không?”

**Commitment** (quyết định chính thức chọn một cách làm để triển khai)

Chúng ta quyết định:

> “Đây là cách chúng ta sẽ làm.”

AI rất mạnh trong Exploration.

Nó có thể tạo:

- **5 prototypes**

- **3 architectures**

- **10 approaches**

- **mock data**

- **experimental code.**

Không sao.

Nhưng khi đã Commitment:

Engineering discipline phải tăng lên.

Một prototype có thể bị vứt đi.

Một architecture production có thể tồn tại nhiều năm.

---

### Prototype phải có permission để chết

Tôi từng có một vấn đề:

Một prototype chạy được.

Sau đó tôi bắt đầu sửa nó.

Rồi thêm authentication.

Rồi database thật.

Rồi API.

Rồi deployment.

Rồi monitoring.

Đến lúc nhận ra:

> “Prototype này không còn là prototype nữa.”

Nhưng tôi đã đầu tư quá nhiều nên không muốn bỏ.

Đó là **Prototype Attachment** (xu hướng tiếp tục giữ một prototype chỉ vì đã đầu tư công sức vào nó).

Vì vậy tôi muốn prototype có một trạng thái rõ:

EXPERIMENT

↓

VALIDATED

↓

PROMOTE

hoặc:

EXPERIMENT

↓

FAILED

↓

ARCHIVE

Không phải experiment nào cũng phải trở thành production code.

---

### AI làm cho việc vứt bỏ code rẻ hơn

Đây là một lợi ích tôi rất thích.

Nếu tôi phải mất ba ngày viết prototype, tôi có xu hướng giữ nó.

Nếu AI giúp tôi tạo prototype trong một giờ, tôi có thể nói:

> “Không đúng. Bỏ.”

và làm lại.

Điều đó làm tăng tốc độ learning, không chỉ coding.

Đây là một trong những giá trị lớn nhất của AI.

AI reduces the cost of experimentation.

Nhưng nó chỉ thực sự hữu ích nếu tôi cho phép experiment thất bại.

---

### Tôi không muốn prototype len vào core

Đây là một architecture rule tôi bắt đầu rất coi trọng.

Code được tạo trong experimentation zone phải được xem là:

untrusted until promoted.

Ví dụ:

EXPERIMENTAL

↓

REVIEW

↓

VERIFY

↓

PROMOTE

↓

CANONICAL

Không:

AI generated

↓

Production

Chỉ vì nó chạy được.

---

## CHẤT LƯỢNG, TRACEABILITY VÀ ENGINEERING ABSTRACTION

### “AI Generated” không phải một quality level

Một đoạn code có thể:

- **AI-generated**

- **human-written**

- **AI-assisted**

- **heavily refactored.**

Nhưng những nhãn đó không nói code có tốt hay không.

Quality phải được xác định bởi:

- **requirements**

- **standards**

- **verification**

- **evidence**

- **maintainability**

- **security**

- **architecture compliance.**

Tôi không muốn một ngày nào đó project có:

> “AI code” và “human code”

như hai loại software khác nhau.

Tôi muốn:

Engineering-compliant code.

Ai viết không quan trọng bằng:

Nó có đúng không?

---

### Nhưng tôi vẫn cần biết AI đã viết gì

Không phải vì phân biệt chất lượng.

Mà vì **traceability** (khả năng truy vết nguồn gốc và lịch sử của một thay đổi).

Nếu một change được tạo bởi AI, project nên biết:

- **executor**

- **Engineering Run** (một lần thực thi có kiểm soát của quy trình engineering)

- **task**

- **method version**

- **affected files**

- **evidence.**

Đó là **provenance** (nguồn gốc và lịch sử hình thành của một thay đổi).

Không phải:

> “AI code is bad.”

Mà:

> “We know how this change entered the system.”

---

### Tôi bắt đầu thấy Vibe Coding giống một giao diện

Điều thú vị là:

Vibe Coding có thể là interaction layer.

Tôi có thể nói:

> “Tạo cho tôi một dashboard.”

Đó là một cách giao tiếp rất tự nhiên.

Nhưng phía sau nó có thể là:

VIBE INPUT

↓

INTENT

↓

TASK DECOMPOSITION

↓

AUTHORITY

↓

CONTEXT

↓

EXECUTION

↓

VERIFICATION

Người dùng vẫn có trải nghiệm “vibe”.

Nhưng system phía sau vẫn engineering.

Đây là một tương lai mà tôi thấy rất thú vị.

---

### Người dùng không cần nhìn thấy toàn bộ machinery

Một chiếc xe hiện đại có:

- **engine**

- **transmission**

- **brakes**

- **sensors**

- **control systems.**

Người lái không cần vận hành từng piston.

Software AI cũng có thể như vậy.

Người dùng có thể nói:

> “Tôi cần workflow này.”

Hệ thống phía sau phải biết:

- **task là gì**

- **authority là gì**

- **context nào cần**

- **verification nào cần**

- **risk là bao nhiêu**

- **executor nào phù hợp.**

Đây chính là:

**Engineering abstraction** (lớp trừu tượng hóa giúp che giấu machinery nhưng vẫn giữ các quy tắc engineering cần thiết).

---

### Nhưng abstraction không được che giấu accountability

Có một ranh giới.

Nếu system tự động làm:

build → test → deploy → release

thì người sử dụng phải biết:

- **điều gì đã xảy ra**

- **điều gì được phép**

- **evidence ở đâu**

- **state nào được tạo**

- **ai/role nào đã authorize.**

Không thể nói:

> “System handles everything.”

rồi không có trace.

Automation không được biến accountability thành invisible.

---

## TỪ PROMPT ĐẾN PROJECT ENGINEERING SYSTEM

### Tôi bắt đầu nghĩ về AI Engineering giống một compiler pipeline

Một compiler nhận:

source intent

rồi biến thành:

executable artifact.

Tôi bắt đầu tưởng tượng một AI Engineering workflow:

Human Intent

↓

**Semantic Resolution** (quá trình xác định ý nghĩa và phạm vi thực sự của intent)

↓

**Task Compilation** (quá trình chuyển intent thành task có thể thực thi)

↓

**Context Compilation** (quá trình tập hợp và chuẩn hóa context cần thiết cho execution)

↓

Execution

↓

Verification

↓

State Transition

Prompt chỉ là một phần của interface.

**Engineering Method** (phương pháp engineering được lưu và thực thi như một phần của project) là semantic layer.

**Project State** (trạng thái được xác định của project tại một thời điểm) là persistent layer.

AI Executor là execution engine.

Evidence là proof layer.

Đây là lý do tôi không còn muốn thiết kế workflow quanh prompt.

---

### Prompt không phải Engineering Method

Một prompt có thể nói:

> “Please follow our coding standards.”

Nhưng nếu coding standard chỉ nằm trong prompt, nó có thể biến mất khi:

- **AI thay đổi**

- **Engineering Run thay đổi**

- **provider thay đổi**

- **người viết prompt thay đổi.**

Tôi muốn:

ENGINEERING METHOD

↓

PROJECT ARTIFACT

↓

CONTEXT

↓

EXECUTOR

Prompt chỉ truyền instruction.

Method nằm trong project.

---

### Đây cũng là lý do tôi không muốn Prompt Engineering trở thành trung tâm của cuốn sách

**Prompt Engineering** (kỹ thuật thiết kế prompt để định hướng cách AI xử lý một tác vụ) vẫn có giá trị.

Một prompt tốt giúp:

- **giảm ambiguity**

- **hướng AI**

- **định dạng output**

- **truyền task.**

Nhưng nếu prompt phải dài hàng nghìn dòng để AI hiểu project:

Có thể vấn đề không nằm ở prompt.

Nó có thể nằm ở:

- **architecture**

- **knowledge**

- **state**

- **task**

- **retrieval**

- **governance.**

Đó là lý do tôi chuyển từ:

Prompt Engineering

sang:

**Context Engineering** (cách cung cấp đúng thông tin cần thiết cho AI trong từng tác vụ).

Và từ:

Prompt Management

sang:

**Project Engineering System** (hệ thống project lưu trữ task, standards, context, policies và cách thực thi).

---

### Tôi không muốn xây một “Prompt Library” khổng lồ

Tôi từng nghĩ:

> “Có lẽ tôi cần lưu tất cả prompt tốt.”

Nhưng prompt tốt hôm nay có thể không phù hợp ngày mai.

Tôi thích lưu:

- **reusable task patterns**

- **engineering contracts**

- **standards**

- **verification templates**

- **context schemas**

- **policies.**

Đó là những thứ có giá trị lâu hơn.

Prompt có thể được compile từ chúng.

---

### Vibe Coding vẫn cực kỳ hữu ích ở đầu vòng đời

Tôi muốn vẽ một vòng đời đơn giản:

IDEA

↓

EXPLORE

↓

PROTOTYPE

↓

VALIDATE

↓

ENGINEER

↓

VERIFY

↓

RELEASE

↓

OPERATE

↓

LEARN

↓

EVOLVE

Vibe Coding mạnh nhất ở:

IDEA → EXPLORE → PROTOTYPE

AI Engineering mạnh nhất ở:

VALIDATE → ENGINEER → VERIFY → RELEASE → OPERATE

Nhưng hai vùng không tách biệt hoàn toàn.

Vibe vẫn có thể xuất hiện trong engineering.

Engineering discipline vẫn phải xuất hiện trong prototype khi risk cao.

---

### Đây là lý do “Beyond Vibe Coding” không có nghĩa “Against Vibe Coding”

Tên cuốn sách này có thể dễ bị hiểu nhầm.

Beyond không có nghĩa:

> “Vibe Coding đã chết.”

Mà nghĩa là:

> “Vibe Coding không phải điểm cuối.”

Nó là một bước tiến rất lớn trong cách con người tương tác với software creation.

Nhưng khi software trở thành:

- **real data**

- **real users**

- **real money**

- **real security**

- **real operations**

thì chúng ta cần nhiều hơn vibe.

---

## CONTROLLED VIBE ENGINEERING VÀ KỶ LUẬT CỦA RỦI RO

### Tôi muốn giữ sự vui vẻ của Vibe Coding

Đây là một điều cá nhân nhưng rất quan trọng.

Software development trước đây đôi khi quá nặng nề.

AI làm cho việc thử nghiệm trở nên vui trở lại.

Bạn có thể nói:

> “What if we try this?”

và vài phút sau có prototype.

Tôi không muốn biến engineering thành một chuỗi:

approval → meeting → document → approval → meeting.

Tôi muốn:

Fast exploration. Disciplined commitment.

Đó là sự cân bằng tôi đang tìm kiếm.

---

### Fast Exploration

Trong exploration:

- **AI có thể thử nhiều phương án**

- **code có thể tạm thời**

- **documentation có thể tối thiểu**

- **architecture có thể provisional**

- **data có thể synthetic**

- **rollback có thể đơn giản.**

Mục tiêu:

Learn.

Không phải:

Ship.

---

### Disciplined Commitment

Khi một experiment được chọn để trở thành product:

EXPERIMENT

↓

DECISION

↓

AUTHORIZED REQUIREMENT

↓

ENGINEERING TASK

↓

CANONICAL IMPLEMENTATION

↓

VERIFICATION

↓

RELEASE

Từ đây, không còn:

> “AI cứ làm thử.”

Mà là:

AI execute within the engineering contract.

---

### Tôi bắt đầu gọi đây là Controlled Vibe Engineering

Nếu phải đặt một cái tên cho cách tôi đang làm, tôi sẽ gọi nó là:

**Controlled Vibe Engineering** (cách giữ tốc độ và sự tự nhiên của Vibe Coding bên trong các boundary của software engineering).

Không phải một methodology chính thức.

Không phải một standard.

Chỉ là cách tôi mô tả triết lý:

Giữ tốc độ và sự tự nhiên của Vibe Coding, nhưng đặt nó bên trong các boundaries của software engineering.

VIBE

+

TASK

+

CONTEXT

+

AUTHORITY

+

VERIFICATION

+

STATE

+

CONTINUITY

+

GOVERNANCE

=

CONTROLLED AI ENGINEERING

Đây là điểm mà tôi thấy mình đã đi rất xa so với lúc bắt đầu.

---

### Nhưng đừng biến “Control” thành “Bureaucracy”

Tôi cũng phải cảnh báo chính mình.

Có thể đi quá xa.

Nếu mỗi task đều cần:

- **20 YAML files**

- **5 approvals**

- **10 gates**

- **3 meetings**

thì AI không còn giúp tôi nhanh hơn.

Tôi đã tạo ra một bureaucracy machine.

Vì vậy:

Control must cost less than the risk it prevents.

Đây là một nguyên tắc rất thực tế.

Nếu control mechanism tốn $100 và 2 giờ để bảo vệ một thay đổi trị giá $1, nó không hợp lý.

Nếu control mechanism tốn 10 phút để bảo vệ một production database migration trị giá hàng triệu đô, nó quá rẻ.

---

### Governance cũng phải có Cost per Control

Tôi bắt đầu nhìn governance bằng cùng một tư duy economic:

CONTROL VALUE

vs

CONTROL COST

Một control tốt phải:

- **giảm risk**

- **tăng confidence**

- **giảm rework**

- **tăng traceability**

với chi phí hợp lý.

Đây là lý do:

Security-first, cost-second

không có nghĩa:

> “Spend infinitely on security.”

Mà là:

Không đánh đổi mandatory security để lấy một khoản tiết kiệm nhỏ.

---

### Tôi không cần Perfect Control

Tôi cần:

**Sufficient Control for the Risk** (mức kiểm soát đủ để rủi ro được hiểu, giới hạn và chấp nhận).

Đây là một distinction rất quan trọng.

Không có system nào zero-risk.

Mục tiêu là:

Risk understood, bounded, monitored, and acceptable.

AI cũng vậy.

Tôi không cần AI không bao giờ sai.

Tôi cần system:

- **hạn chế quyền**

- **phát hiện sai**

- **verify output**

- **giữ evidence**

- **recover được**

- **không để một lỗi nhỏ trở thành thảm họa.**

---

### Và tôi cuối cùng cũng hiểu “AI Engineering” nghĩa là gì đối với tôi

Không phải:

viết code bằng AI.

Không phải:

dùng nhiều AI.

Không phải:

prompt thật giỏi.

Không phải:

xây agent tự động nhất.

Đối với tôi:

AI Engineering là việc thiết kế một hệ thống trong đó AI có thể thực thi software engineering work nhanh, đúng phạm vi, có context phù hợp, có bằng chứng, có trạng thái, có khả năng tiếp tục và có governance phù hợp với risk.

AI là một phần của hệ thống.

Không phải toàn bộ hệ thống.

---

### Và đó là lúc tôi thực sự “Beyond Vibe Coding”

Tôi không bỏ Vibe Coding.

Tôi chỉ ngừng coi nó là toàn bộ phương pháp.

Tôi vẫn có thể:

Vibe.

Nhưng tôi biết:

Khi nào được Vibe.

Tôi vẫn có thể:

Let AI explore.

Nhưng tôi biết:

Khi nào exploration phải trở thành engineering commitment.

Tôi vẫn có thể:

Move fast.

Nhưng tôi biết:

Khi nào phải slow down.

Tôi vẫn có thể:

Use free AI.

Nhưng tôi biết:

Khi nào paid AI tạo ra value lớn hơn cost.

Tôi vẫn có thể:

Switch AI.

Nhưng project không phải bắt đầu lại.

Tôi vẫn có thể:

Let AI write code.

Nhưng AI không được tự quyết định architecture, authority hay release.

Đó là sự khác biệt.

---

### REALITY CHECK

Nếu bạn đang dùng AI để code và cảm thấy:

> “Tôi đang tạo software nhanh hơn bao giờ hết.”

Tôi không muốn bạn dừng lại.

Hãy tiếp tục.

Nhưng hãy hỏi thêm:

> “Tôi đang tạo ra code nhanh hơn, hay tôi đang tạo ra verified product value nhanh hơn?”

Nếu câu trả lời là thứ hai:

Bạn đang đi đúng hướng.

Nếu câu trả lời là thứ nhất:

Có lẽ đã đến lúc bước Beyond Vibe Coding.

---

### TRY THIS

Chọn một task bất kỳ và phân loại nó:

RISK:

R0 / R1 / R2 / R3 / R4

MODE:

Explore / Prototype / Engineer / Release

VIBE LEVEL:

High / Medium / Low / None

AUTHORITY:

Who decides?

VERIFICATION:

What proves success?

ROLLBACK:

What happens if it fails?

Bạn sẽ nhanh chóng nhận ra:

Không phải mọi task đều cần cùng một mức độ engineering.

Đó chính là mục tiêu.

---

### WHAT I LEARNED

Tôi từng nghĩ mình phải lựa chọn:

Vibe Coding hoặc Software Engineering.

Bây giờ tôi không nghĩ vậy nữa.

Tôi muốn:

The speed of Vibe Coding.

kết hợp với:

The discipline of Engineering.

Tôi muốn AI được tự do khám phá nơi rủi ro thấp.

Tôi muốn AI bị giới hạn rõ ràng nơi consequence cao.

Tôi muốn prototype nhanh.

Tôi muốn production nghiêm túc.

Tôi muốn thử nghiệm rẻ.

Tôi muốn release có evidence.

Tôi muốn AI có autonomy trong execution.

Tôi không muốn AI tự có authority.

Và trên hết:

Tôi muốn giữ niềm vui của việc xây phần mềm mà không phải trả giá bằng sự hỗn loạn của việc xây phần mềm.

---

### TAKEAWAY

Vibe Coding đã thay đổi cách tôi bắt đầu một phần mềm.

AI Engineering thay đổi cách tôi hoàn thành nó.

Vibe cho tôi tốc độ.

Engineering cho tôi kiểm soát.

AI cho tôi execution.

Human cho tôi intent và accountability.

Knowledge cho tôi context.

State cho tôi continuity.

Evidence cho tôi confidence.

**Governance** (cơ chế quy định quyền hạn, kiểm soát và trách nhiệm) cho tôi boundaries.

Và product cho tôi một lý do để tất cả những thứ đó tồn tại.

Đó là lúc tôi hiểu:

Beyond Vibe Coding không phải là đi xa khỏi AI.

Đó là đi sâu hơn vào cách sử dụng AI đúng cách.

---

### CHUYỂN SANG CHƯƠNG 19

Đến đây, tôi đã có một workflow mà tôi tin có thể giúp AI xây phần mềm tốt hơn.

Nhưng vẫn còn một câu hỏi rất thực tế.

Tôi có thể làm mọi thứ trên laptop.

Có thể chạy local.

Có thể dùng Gemini.

Có thể dùng DeepSeek.

Có thể có Git.

Có thể có backup.

Có thể có verification.

Có thể có state.

Có thể có continuity.

Nhưng…

Khi nào tôi thực sự đưa nó ra khỏi máy của mình?

Bởi vì software chỉ tồn tại trong development environment thì vẫn chưa thực sự bước vào thế giới.

Tôi cần:

- **một environment thật**

- **deployment thật**

- **domain thật**

- **database thật**

- **security thật**

- **monitoring thật**

- **backup thật**

- **user thật.**

Và lúc đó, một điều rất thú vị xảy ra.

Tôi không còn xây phần mềm cho chính mình nữa.

Tôi bắt đầu xây một sản phẩm mà người khác có thể tin tưởng để sử dụng.

Đó là bước chuyển từ:

Local Project

sang:

Real Product.
