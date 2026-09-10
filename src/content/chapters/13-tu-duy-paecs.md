---
id: "13-tu-duy-paecs"
title: "TỪ VIBE CODING ĐẾN KIẾN TRÚC SYSTEMATIC"
subtitle: "Từ một coder thử-sai đến một kịch bản phối hợp hệ thống giữa người lập trình, AI Agent và một hệ quản trị trạng thái (PAECS)"
shortTitle: "Từ Vibe Coding đến kiến trúc Systematic"
order: 13
description: "Transitioning from vibe coding to a systematic engineering architecture using the PAECS framework."
readingTime: "10 min"
topics: ["paecs", "systematic", "architecture", "vibe-coding"]
hero: "images/chapter-13-hero.webp"
published: "2026-09-10"
publicationStatus: "unpublished"
contentStatus: "draft"
updated: "2026-09-10"
version: "1.0.0"
---

# CHƯƠNG 13

# TỪ VIBE CODING ĐẾN KIẾN TRÚC SYSTEMATIC

*Từ một coder thử-sai đến một kịch bản phối hợp hệ thống giữa người lập trình, AI Agent và một hệ quản trị trạng thái (PAECS)*

Chúng ta đã cùng đi qua một hành trình dài.

Bắt đầu bằng một câu hỏi rất ngây thơ:

> “Tại sao tôi đưa file cho AI mà nó vẫn không sửa được?”

Đến khi nhận ra:

> AI không chỉ cần context. AI cần đúng context.

Đến khi hiểu:

> AI có thể viết code. Nhưng AI có được phép thay đổi hệ thống không?

Đến khi bắt đầu yêu cầu:

> “Bằng chứng đâu cho thấy code này chạy đúng?”

Và cuối cùng:

> “Làm sao để project có thể tiếp tục khi AI đổi hoặc biến mất?”

Mỗi bước đi đều bóc tách một lớp ảo tưởng mà tôi (và có thể nhiều người khác) từng có khi bước vào kỷ nguyên "Vibe Coding".

Hôm nay, khi nhìn lại, tôi thấy mình không còn đứng ở vị trí của một "Vibe Coder" chỉ biết hy vọng và thử-sai nữa.

Tôi đang nhìn vào một kiến trúc.

Một kịch bản phối hợp hệ thống.

Một phương pháp mà ở đó, con người không còn bị ngập trong code của AI, và AI không còn là một "ông thần" tự do làm loạn trên workspace.

Tôi gọi đó là:

> **Systematic AI Engineering.**

Và hệ quản trị đứng sau nó là:

> **PAECS (Project AI Engineering Continuity System).**

## SỰ SỤP ĐỔ CỦA VIBE CODING

Vibe Coding rất thú vị ở vạch xuất phát.

Nó mang lại một cảm giác quyền lực giả tạo:

Tôi nói một câu.

AI viết 1.000 dòng.

Màn hình hiện lên.

Mọi thứ lấp lánh.

Nhưng khi project vượt qua quy mô "hello world" hoặc prototype 1 ngày, vibe coding bắt đầu rạn nứt.

Rạn nứt ở đâu?

Rạn nứt ở:

Sự mơ hồ của Requirement.

Sự trôi dạt của Architecture.

Sự tích lũy khổng lồ của Comprehension Debt.

Sự biến mất của State.

Sự thiếu vắng của Evidence.

Và sự sụp đổ hoàn toàn của Continuity khi AI mất context hoặc hết quota.

Lúc đó, tôi nhận ra:

> **Vibe coding is not software engineering. It is prototyping with high uncertainty.**

Muốn đi xa hơn, tôi phải chuyển đổi.

### Ba Lớp Của Sự Thay Đổi

Khi nhìn lại sự chuyển đổi từ Vibe Coding sang Systematic Engineering, tôi thấy nó diễn ra ở ba lớp:

```text
TƯ DUY
↓
Vibe → Systematic
```

```text
CẤU TRÚC
↓
Files → State Machine
```

```text
QUY TRÌNH
↓
Chat-and-Hope → Protocol-driven
```

Không có ba sự thay đổi này, việc đổi model hay nâng cấp RAM của máy tính chỉ là giải quyết phần ngọn.

## TƯ DUY MỚI: THE PROJECT IS THE FIRST-CLASS CITIZEN

Trong Vibe Coding, AI là trung tâm.

Tôi hỏi AI.

AI trả lời.

AI sửa file.

AI giải thích.

Trong Systematic Engineering, project mới là trung tâm.

AI chỉ là một executor tạm thời.

Project tự quản lý:

- nó là cái gì (Knowledge);
- nó đang ở đâu (State);
- ai được quyền quyết định cái gì (Authority);
- đã kiểm tra bằng gì (Evidence);
- làm thế nào để tiếp tục (Continuity).

Sự thay đổi này làm thay đổi mọi thứ.

Nếu AI là trung tâm, tôi phải làm sao để AI thông minh nhất có thể.

Nếu project là trung tâm, tôi phải làm sao để project có cấu trúc tốt nhất để một AI bình thường cũng làm việc đúng chuẩn được.

Đây là sự khác biệt:

```text
Vibe Coding
↓
Smart AI + Fragile Project
```

Trong khi:

```text
Systematic Engineering
↓
Governed Project + Replaceable AI
```

Tôi muốn vế thứ hai.

### Từ File đến Semantic State

Một project thông thường chỉ là một tập hợp các source code file.

Khi AI nhìn vào, nó thấy:

1.000 file text.

Nó phải tự suy đoán:

- Cái nào là chính?
- Cái nào quan trọng?
- Cái nào đã test?
- Cái nào đang hỏng?

Trong PAECS, project là một **State Machine**.

Mỗi thay đổi là một **State Transition**.

Mỗi state transition phải được **Authorized** và **Verified**.

Hệ thống biết rõ:

- `STATE-001`: Authentication is Verified.
- `STATE-002`: Database Schema migration is Checked.
- `STATE-003`: API contract is Active.

Code file chỉ là artifact biểu diễn của state hiện tại.

Chứ code file không tự quyết định trạng thái của hệ thống.

## KỊCH BẢN PHỐI HỢP TRONG PAECS

Hãy tưởng tượng một ngày làm việc bình thường với PAECS.

Quy trình không bắt đầu bằng một câu chat mơ hồ:

> “Sửa giúp tôi cái login.”

Quy trình diễn ra như sau:

### Bước 1: Task Authorization (Con Người)

Con người tạo ra một Task.

Task này chỉ định rõ:

- Requirement ID.
- Risk level.
- Consequence (R0 đến R4).
- Target State.
- Authority needed.

Ví dụ:

```yaml
task:
  id: TASK-LOGIN-042
  consequence: R2
  authority_required: LEAD_ENGINEER
  target_state: LOGIN_VALIDATION_VERIFIED
```

### Bước 2: Context Compilation (System)

Hệ thống tự động biên dịch context cho task này.

Nó không đưa toàn bộ project cho AI.

Nó tạo ra:

**Minimum Sufficient Context.**

Nó chỉ chọn đúng:

- Relevant source files.
- Relevant knowledge rules.
- Authority limits.
- Target requirements.
- API standards.

### Bước 3: Execution under Autonomy Contract (AI)

AI nhận context.

Nó biết rõ:

- Nó được sửa file nào.
- Nó tuyệt đối không được chạm vào file nào (Write boundary).
- Nó có quyền tự quyết định cái gì.
- Cái gì nó bắt buộc phải hỏi ý kiến con người trước khi sửa.

AI thực hiện thay đổi.

### Bước 4: Evidence Generation (AI & System)

AI không báo "Done" suông.

Nó chạy unit tests, integration tests, static checks.

Nó tạo ra một **Evidence Package**:

```yaml
evidence:
  task: TASK-LOGIN-042
  status: PASS
  artifacts:
    - junit-report.xml
    - lint-output.txt
  limitations: "Only local integration tested. No production environment."
```

### Bước 5: State Verification & Transition (Con Người hoặc Gate)

Hệ thống kiểm tra Evidence Package.

Nếu task là R0, hệ thống tự động duyệt.

Nếu task là R2, hệ thống yêu cầu con người verify.

Con người xem xét:

- Diff có đúng không?
- Evidence có thực không?
- Có làm hỏng cái cũ không (Regression check)?

Khi con người đồng ý, State chuyển từ `IN_PROGRESS` sang `VERIFIED`.

### Bước 6: Checkpoint & Handoff (System)

Hệ thống tự động tạo một Checkpoint của trạng thái mới.

Nó chuẩn bị một Handoff file cho task tiếp theo hoặc Run tiếp theo.

Quá trình hoàn tất.

Mọi thứ rõ ràng.

Không có sự đoán mò.

Không có sự may mắn.

Đây là một quy trình kỹ nghệ thực sự.

## BẢN ĐỒ KIẾN TRÚC PAECS

Để hệ thống phối hợp này hoạt động, PAECS được cấu trúc thành các Engine độc lập:

```text
               ┌─────────────────────────────────────┐
               │         AUTHORITY ENGINE            │
               │  (Who can do what? R0-R4 boundaries)│
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │          METHOD ENGINE              │
               │  (How things should be done/rules) │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │           TASK ENGINE               │
               │  (Slicing, scoping and backlog)     │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │          CONTEXT COMPILER           │
               │  (Building Minimum Sufficient)      │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │          CHANGE ENGINE              │
               │  (Diff, write boundaries, control)  │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │         VERIFICATION ENGINE         │
               │  (Test running, evidence packages)  │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │           STATE ENGINE              │
               │  (Current status, transition gates) │
               └──────────────────┬──────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │         CONTINUITY ENGINE           │
               │  (Checkpoint, Handoff, Recovery)    │
               └─────────────────────────────────────┘
```

Mỗi Engine có một vai trò riêng.

Và khi kết hợp lại, chúng tạo nên một hệ quản trị trạng thái hoàn chỉnh cho project.

## SỰ CHUYỂN DỊCH KHÔNG PHẢI LÀ DỄ

Nhiều người sẽ hỏi:

> “Nhưng như vậy có làm chậm tốc độ không? Vibe coding nhanh hơn nhiều!”

Đúng.

Vibe coding nhanh hơn ở **ngày đầu tiên**.

Nhưng vibe coding bắt đầu chậm đi từ **ngày thứ ba**.

Và đến **ngày thứ mười**, nó có thể hoàn toàn bế tắc vì project đã trở thành một đống "bùi nhùi" không ai hiểu nổi, kể cả chính AI đã viết ra nó.

Systematic Engineering yêu cầu đầu tư ban đầu nhiều hơn.

Bạn phải viết standard.

Bạn phải định nghĩa state.

Bạn phải thiết lập boundaries.

Nhưng đổi lại:

Tốc độ của bạn ở ngày thứ mười sẽ bằng tốc độ của ngày đầu tiên.

Tốc độ ở tháng thứ ba vẫn ổn định.

Và quan trọng nhất:

**Bạn có thể scale.**

Bạn có thể cho 3 AI cùng làm việc trên một project mà không sợ chúng dẫm chân lên nhau hoặc phá nát code của nhau.

Đó là sự khác biệt giữa:

Một dự án cá nhân vui vẻ

và:

Một sản phẩm phần mềm thực sự.

## KEY IDEA

Chương cuối cùng này không đưa ra thêm một kỹ thuật code cụ thể nào.

Nó đưa ra một **Tầm Nhìn**.

Tầm nhìn về việc chúng ta xây dựng phần mềm với AI như thế nào trong 5, 10 năm tới.

Nếu bạn giữ tư duy cũ:

Tôi viết prompt tốt hơn → AI sẽ code tốt hơn cho tôi.

Bạn sẽ sớm chạm trần.

Vì model thông minh hơn vẫn có những giới hạn về context, sự trôi dạt và tính không chắc chắn.

Nhưng nếu bạn chuyển sang tư duy mới:

Tôi xây một **Engineering System** tốt hơn → AI sẽ hoạt động hiệu quả và an toàn hơn bên trong nó.

Bạn sẽ mở ra một không gian phát triển không giới hạn.

Ở đó:

- AI là động cơ.
- PAECS là vô lăng và hộp số.
- Còn bạn là người lái xe có chủ đích.

Đó mới là đích đến của hành trình này.

### WHAT I LEARNED

Tôi bắt đầu viết cuốn sách này từ những thất bại rất thực tế trên các project của mình khi cố gắng "vibe" cùng AI.

Tôi kết thúc nó với một sự tôn trọng sâu sắc dành cho các nguyên lý kỹ nghệ phần mềm truyền thống.

Tôi nhận ra:

AI không làm cho kỹ nghệ phần mềm biến mất.

Ngược lại.

AI làm cho các nguyên lý kỹ nghệ phần mềm trở nên quan trọng hơn bao giờ hết.

Khi tốc độ viết code tăng lên 10 lần, nếu bạn không có một hệ thống quản trị tốt, tốc độ tạo ra "rác kỹ thuật" (technical debt) cũng sẽ tăng lên 10 lần.

Vì vậy:

> **The faster the engine, the stronger the brakes need to be.**

PAECS chính là bộ phanh, là hệ thống lái, là khung gầm vững chắc cho động cơ AI của bạn.

### TRY THIS

Đừng cố gắng áp dụng toàn bộ PAECS vào project của bạn ngay ngày mai.

Hãy bắt đầu bằng những bước rất nhỏ:

1. **Tuần 1:** Định nghĩa một **Coding Standard** rất ngắn (1 trang) và bắt AI đọc trước khi sửa code.
2. **Tuần 2:** Yêu cầu AI tự tạo **Evidence Package** (test result, screenshot) sau mỗi task.
3. **Tuần 3:** Viết một file **CURRENT_STATE.yaml** thủ công để theo dõi trạng thái các module quan trọng.
4. **Tuần 4:** Hãy thử đổi AI giữa chừng bằng một **Handoff Contract** tự viết.

Từng bước một, bạn sẽ thấy project của mình chuyển mình từ một "Vibe project" mơ hồ thành một "Systematic project" vững chắc.

Và đó là lúc bạn thực sự làm chủ công nghệ, thay vì bị nó dẫn dắt.

Chúc bạn có một hành trình đầy chủ đích!

**Hồng Đông**

*Tháng 9 năm 2026*
