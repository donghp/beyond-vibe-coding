---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 15
order: 15
title: "NHỮNG LỖI AI KHÔNG NÓI VỚI TÔI"
subtitle: "Từ “Works on My Machine” đến Software That Survives the Real World"
shortTitle: "Những lỗi AI không nói với tôi"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
publicationStatus: "published"
contentStatus: "complete"
canonical_page_start: 365
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
navigation_root: "CHƯƠNG 15 - NHỮNG LỖI AI KHÔNG NÓI VỚI TÔI"
publication_standard: "BVCE V3.2"
hero: "images/chapter-15-hero.webp"
readingTime: "12 min"
topics: ["production", "verification", "security", "observability", "evidence"]
---

<!-- Prompt-ID: #000030 | Prompt-Title: BVC — CHAPTER 15 CANONICAL PUBLISHING -->
<!-- Canonical structured manuscript. PDF is a derived publishing artifact. -->

# CHƯƠNG 15

# NHỮNG LỖI AI KHÔNG NÓI VỚI TÔI

*Từ “Works on My Machine” (chỉ trạng thái phần mềm chạy được trên máy của người phát triển) đến Software That Survives the Real World (phần mềm có thể tiếp tục hoạt động trong môi trường thực tế)*

Có một khoảnh khắc rất đặc biệt trong quá trình xây một phần mềm.
Đó là khi bạn ngừng hỏi:

> “Code có chạy không?”

và bắt đầu hỏi:

> **“Nó sẽ làm gì khi có người thật sử dụng?”**

Hai câu hỏi này tưởng như giống nhau.
Nhưng chúng cách nhau rất xa.
Trong môi trường **development** (môi trường phát triển phần mềm), tôi có thể tạo một **user** (người dùng).
Tạo vài **records** (các bản ghi dữ liệu).
Bấm vài nút.
Chạy **test** (kiểm thử).
**API** (giao diện cho phép các thành phần phần mềm giao tiếp với nhau) trả về `200 OK`.
Màn hình hiển thị đúng.
Tôi có thể nói:

> “Chức năng này hoạt động.”

Nhưng **production** (môi trường thực tế nơi phần mềm được người dùng sử dụng) không chỉ có những dữ liệu đẹp mà tôi vừa tạo.
Production có:

- dữ liệu cũ;
- dữ liệu thiếu;
- dữ liệu bất thường;
- người dùng nhập sai;
- mạng chập chờn;
- trình duyệt khác nhau;
- quyền truy cập khác nhau;
- nhiều người dùng cùng lúc;
- **request** (yêu cầu gửi tới hệ thống) gửi lặp;
- **timeout** (thời gian chờ vượt quá giới hạn);
- **service** (dịch vụ phần mềm thực hiện một phần chức năng) khác bị lỗi;
- **database** (hệ quản trị và kho dữ liệu của hệ thống) tăng lên;
- **configuration** (cấu hình xác định cách hệ thống hoạt động) khác development;
- những hành vi mà tôi chưa từng nghĩ tới.

Và đó là lúc tôi hiểu:

> **Production là nơi những giả định của chúng ta bị kiểm tra.**

---

## THẾ GIỚI THẬT, HAPPY PATH VÀ NHỮNG GIẢ ĐỊNH

### AI rất giỏi kiểm tra thế giới mà nó được cho xem

Đây là một điều tôi phải công nhận.
AI có thể đọc:

```text
source code
tests
configuration
documentation
database schema
API specification
```

Nó có thể phân tích hàng nghìn dòng code.
Nó có thể tìm những **pattern** (mẫu cấu trúc hoặc hành vi lặp lại trong hệ thống) rất khó nhìn thấy bằng mắt người.
Nhưng AI vẫn bị giới hạn bởi:

> **evidence available to it** (những bằng chứng mà AI thực sự được cung cấp).**

Nếu tôi cho AI một database sạch, nó có thể kết luận workflow hoạt động.
Nếu production có 5 năm dữ liệu lịch sử, đó là một thế giới khác.
Nếu tôi test với:

```text
customer = "John"
email = "john@example.com"
amount = 100
```

AI rất dễ thấy mọi thứ bình thường.
Nhưng production có thể có:

```text
customer = NULL
email = ""
amount = -100
```

hoặc:

```text
amount = 1000000000000
```

hoặc:

```text
same request submitted 7 times
two users update the same record simultaneously
```

Đó là những thứ mà một happy-path demo không thể chứng minh.

---

### Happy Path là một cái bẫy rất đẹp

AI thường rất giỏi xây **happy path** (luồng sử dụng lý tưởng, trong đó mọi bước đều diễn ra đúng như dự kiến).
Ví dụ:

```text
Login
  ↓
Dashboard
  ↓
Create Customer
  ↓
Save
  ↓
Success
```

Mọi thứ rất đẹp.
Nhưng software thật không chỉ chạy theo đường thẳng.
Nó giống:

```text
                 ┌── invalid input
                 │
                 ├── unauthorized
                 │
                 ├── timeout
                 │
                 ├── duplicate request
                 │
                 ├── stale data
                 │
                 ├── dependency failure
                 │
                 └── database failure
                        ↑
User → Request → System ──┘
```

Một feature chỉ được test trên happy path giống như một chiếc ô tô chỉ được chạy thử trên đường cao tốc lúc trời đẹp.
Nó chưa được kiểm tra khi:

- trời mưa;
- đường trơn;
- có ổ gà;
- xe chở nặng;
- phanh phải hoạt động khẩn cấp.

Software cũng vậy.

---

### Tôi bắt đầu hỏi AI một câu khác

Thay vì:

> “Việc này có hoạt động không?”

tôi hỏi:

> **“Việc triển khai này đang dựa trên những giả định nào?”**

Đây là một câu hỏi mạnh hơn rất nhiều.
AI có thể trả lời:

- giả định input không phải `null`;
- giả định record trong database tồn tại;
- giả định user có quyền;
- giả định request chỉ được gửi một lần;
- giả định external service phản hồi;
- giả định configuration tồn tại;
- giả định timezone là **UTC** (múi giờ chuẩn quốc tế);
- giả định currency là USD;
- giả định file có kích thước nhỏ.

Sau đó tôi có thể biến mỗi **assumption** (giả định mà implementation đang ngầm dựa vào) thành một verification question.
Ví dụ:

> “Assumes request is sent once.”

thì câu hỏi tiếp theo là:

> “Điều gì xảy ra nếu cùng một request được gửi hai lần?”

Đó chính là cách tôi bắt đầu tìm **bug** (lỗi khiến phần mềm hoạt động sai hoặc không đúng với yêu cầu).
Không phải bằng cách hỏi:

> “Hãy tìm lỗi.”

Mà bằng cách hỏi:

> **“Hãy tìm những giả định mà cách triển khai này đang dựa vào.”**

---

### **Assumption Debt** (khoản nợ phát sinh từ những giả định chưa được xác nhận)

Tôi bắt đầu gọi một loại **technical debt** (khoản nợ kỹ thuật phát sinh từ những lựa chọn hoặc phần việc chưa được xử lý đầy đủ) khác là:

> **Assumption Debt.**

Code càng nhanh, assumption càng dễ tăng.
AI thường phải lấp những khoảng trống trong specification.
Nếu tôi không nói:

> “Timezone nào?”

AI sẽ chọn một cách.
Nếu tôi không nói:

> “What happens on duplicate submission?”

AI có thể chọn một **behavior** (cách hệ thống phản ứng trước một đầu vào hoặc tình huống).
Nếu tôi không nói:

> “Can an administrator delete an issued invoice?”

AI sẽ phải suy đoán hoặc implement theo pattern thông thường.
Mỗi assumption không được xác nhận là một khoản nợ.
Có thể nó không gây lỗi hôm nay.
Nhưng đến một lúc nào đó, production sẽ bắt nó trả nợ.

---

### Không phải mọi assumption đều xấu

Tôi cũng không muốn đi quá xa.
Software engineering không thể loại bỏ mọi assumption.
Một số assumption là hợp lý.
Ví dụ:

> Phiên bản **PostgreSQL**   được cố định.

> API sử dụng **JSON**.

> Timezone  của hệ thống được chuẩn hóa.

> File upload  giới hạn 20 MB.

Vấn đề không phải:

> **“Không được có assumption.”**

Mà là:

> **“Assumption quan trọng phải được biết, được quyết định hoặc được kiểm chứng.”**

Tôi muốn chuyển:

```text
Unknown assumption
        ↓
Explicit assumption
        ↓
Decision / Constraint
        ↓
Verification
```

Đó là cách giảm rủi ro.

---

## REQUIREMENT, SECURITY, DỮ LIỆU VÀ RANH GIỚI HỆ THỐNG

### AI có thể tạo ra code hợp lệ nhưng behavior sai

Đây là một trong những loại lỗi nguy hiểm nhất.
Code compile.
Test pass.
Không có syntax error.
Nhưng behavior sai.
Ví dụ:
**Requirement** (yêu cầu mà sản phẩm hoặc hệ thống phải đáp ứng):

> “Only the account owner can modify the record.”

AI viết:

```text
if user.isAuthenticated():
    allowEdit()
```

Code hợp lệ.
Test login có thể pass.
Nhưng **authorization** (xác định người dùng được phép làm gì) sai.
Đây không phải **code failure**.
Đây là **requirement interpretation failure**.
Và nếu test suite không kiểm tra đúng requirement, **CI** (hệ thống tự động xây dựng và kiểm thử thay đổi code) vẫn có thể xanh.
Đó là lý do:

> **Passing tests do not automatically prove product correctness** (việc tất cả bài kiểm thử đều đạt không tự động chứng minh sản phẩm đúng).

---

### Security bugs thường rất im lặng

Có những bug làm ứng dụng crash.
Ta nhìn thấy ngay.
Nhưng **security bug** (lỗi làm suy yếu an toàn hoặc kiểm soát truy cập của hệ thống) có thể không làm gì cả.
Application vẫn:

- chạy;
- login;
- tạo record;
- hiển thị dashboard.

Chỉ có điều:

> **người không được phép cũng có thể làm việc đó.**

Đây là lý do **security** (an toàn và kiểm soát truy cập) không thể là một bước cuối cùng kiểu:

```text
Build
  ↓
Test
  ↓
Security
  ↓
Done
```

**Security** phải xuất hiện ngay từ:

```text
Requirement
  ↓
Architecture
  ↓
Task
  ↓
Implementation
  ↓
Verification
  ↓
Deployment
```

Một AI có thể viết **authentication** (xác thực danh tính người dùng).
Nhưng authentication không đồng nghĩa với authorization.
Authentication trả lời:

> **Bạn là ai?**

Authorization trả lời:

> **Bạn được phép làm gì?**

Hai câu hỏi khác nhau.

---

### Data Integrity còn khó chịu hơn

Một **application**  có thể vẫn chạy trong khi dữ liệu đã sai.
Đây là loại lỗi tôi đặc biệt sợ.
Ví dụ:
User thực hiện:

> Create invoice.

API trả:
200 OK
UI hiển thị:

> Hóa đơn đã được tạo.

Nhưng database có thể đã:

- ghi thiếu một record;
- ghi duplicate;
- cập nhật sai total;
- bỏ qua một **transaction** (đơn vị xử lý đảm bảo một nhóm thao tác dữ liệu được thực hiện theo một quy tắc nhất quán);
- lưu sai timezone;
- lưu sai currency;
- cập nhật một bảng nhưng không cập nhật bảng liên quan.

Người dùng không nhìn thấy ngay.
Một tháng sau, báo cáo tài chính sai.
Đó không còn là một bug nhỏ.
Đó là **data integrity failure**.

---

### AI cần được yêu cầu kiểm tra **invariants** (những điều kiện hoặc quy tắc phải luôn đúng)

Một cách tôi thấy rất hữu ích là thay vì chỉ test output, hãy xác định **invariants**.
Invariant là điều phải luôn đúng.
Ví dụ:

> Tổng hóa đơn phải bằng tổng các dòng hóa đơn.

Hoặc:

> Một user không được truy cập dữ liệu của tenant khác.

Hoặc:

> Hóa đơn đã phát hành không được xóa.

Hoặc:

> Số dư tài khoản không được trở thành số âm.

Những câu này mạnh hơn:

> “Trang hóa đơn hoạt động.”

Bởi vì chúng mô tả **truth that must remain true**.
AI có thể giúp tìm và kiểm tra invariants.
Nhưng invariants quan trọng của business phải được xác định từ **business requirements** (các yêu cầu xuất phát từ nhu cầu và quy tắc nghiệp vụ) và authority.

---

### Multi-tenant là một ví dụ rất tốt

Giả sử application có:

```text
Tenant A
Tenant B
User của Tenant A đăng nhập.
```

API:

```text
GET /customers
```

trả về customers.
Test của tôi có thể pass.
Nhưng câu hỏi quan trọng hơn là:

> **“Tenant A có chỉ nhìn thấy khách hàng của Tenant A không?”**

Nếu query vô tình là:

```text
SELECT * FROM customers;
```

thì application vẫn hoạt động.
API vẫn trả `200`.
UI vẫn hiển thị.
Nhưng **security boundary** (ranh giới xác định dữ liệu và hành động nào được phép truy cập) đã bị phá vỡ.
Đây là lý do verification phải hiểu:

> **Boundary** (ranh giới kiểm soát nơi quyền, dữ liệu hoặc trách nhiệm được phép đi qua).

Không chỉ output.

---

## TỪ LOCAL CORRECTNESS ĐẾN SYSTEM CORRECTNESS

### AI thường rất giỏi local correctness

Đây là một pattern tôi quan sát thấy.
AI nhìn một function:

```text
function calculateTotal()
```

Nó có thể đánh giá rất tốt:

- syntax;
- logic;
- complexity;
- edge cases;
- test coverage.

Nhưng **product correctness** (độ đúng của toàn bộ hành vi sản phẩm so với yêu cầu và kết quả mong muốn) thường nằm ở:

```text
Function
   ↓
Service
   ↓
Database
   ↓
API
   ↓
UI
   ↓
User Workflow
   ↓
Business Outcome
```

Một function đúng không đảm bảo workflow đúng.
Một workflow đúng không đảm bảo **business outcome** (kết quả thực tế đối với hoạt động hoặc mục tiêu kinh doanh) đúng.
Vì vậy verification phải có nhiều tầng.

---

### Tôi bắt đầu dùng “Change Impact” như một câu hỏi bắt buộc

Một thay đổi nhỏ có thể ảnh hưởng rất xa.
Ví dụ:

> Change customer status **enum** (kiểu dữ liệu giới hạn giá trị trong một tập lựa chọn đã định nghĩa).

Nghe đơn giản.
Nhưng có thể ảnh hưởng:

```text
Database
  ↓
API
  ↓
Backend logic
  ↓
Frontend
  ↓
Reports
  ↓
Exports
  ↓
Integrations
  ↓
Existing data
```

AI có thể sửa file được yêu cầu.
Nhưng câu hỏi engineering là:

> **“Thay đổi này còn có thể ảnh hưởng đến những gì?”**

Đây là **Change Impact Analysis**.
Nó giúp tôi chuyển từ:

> “AI sửa đúng file.”

sang:

> **“AI hiểu phạm vi tác động của thay đổi.”**

---

### Regression là món nợ của tốc độ

AI càng viết nhanh, chúng ta càng có nhiều thay đổi.
Nhiều thay đổi tạo ra nhiều khả năng **regression** (việc một chức năng trước đây đang hoạt động bị hỏng sau khi có thay đổi mới).
Một feature mới có thể phá:

- feature cũ;
- API compatibility;
- database query;
- permission;
- UI;
- performance.

Vì vậy test không chỉ để chứng minh:

> “Feature mới hoạt động.”

Mà còn để chứng minh:

> **“Feature cũ vẫn hoạt động.”**

Đó là **Regression Verification** (kiểm chứng để bảo đảm thay đổi mới không phá vỡ hành vi đã hoạt động trước đó).

---

### Nhưng regression test cũng không phải tất cả

Tôi có thể có:

```text
1000 tests
```

và vẫn có bug.
Bởi vì test suite chỉ kiểm tra những gì chúng ta đã nghĩ đến.
Nếu requirement sai hoặc test case sai, 1000 tests vẫn có thể cho chúng ta một cảm giác an toàn giả.
Đó là:

> **False Confidence.**

AI đặc biệt có khả năng tạo ra false confidence vì nó có thể tạo:

- rất nhiều tests;
- rất nhiều **assertions** (các điều kiện mà test dùng để xác nhận một kết quả mong đợi);
- rất nhiều documentation.

Nhưng số lượng không đồng nghĩa với chất lượng.

---

### Tôi bắt đầu phân biệt **Test Coverage** (mức độ code hoặc logic được các bài kiểm thử bao phủ) và **Requirement Coverage** (mức độ các yêu cầu đã được kiểm tra đầy đủ)

Test coverage trả lời:

> Code nào đã được test?

Requirement coverage trả lời:

> Requirement nào đã được verify?

Hai thứ khác nhau.
Ví dụ:

```text
Code Coverage: 92%
```

nghe rất tốt.
Nhưng nếu requirement quan trọng nhất:

> “Tenant isolation phải được bảo đảm.”

không có verification tương ứng,
thì 92% code coverage không giúp nhiều.
Tôi muốn một mapping:

```text
Requirement
    ↓
Acceptance Criterion
    ↓
Verification
    ↓
Evidence
```

Khi đó tôi mới biết:

> **Requirement này thực sự đã được chứng minh chưa?**

---

## VERIFICATION, EVIDENCE VÀ RISK

### Production còn có một loại bug khác: Operational Failure

Một feature có thể đúng trong code nhưng fail trong vận hành.
Ví dụ:

- disk đầy;
- database connection pool cạn;
- memory tăng;
- API latency tăng;
- certificate hết hạn;
- background job bị treo;
- queue tăng;
- external service unavailable.

Đây là lý do software engineering không kết thúc ở source code.
Một hệ thống production cần **observability**.
Tôi cần biết:

> Nó đang làm gì?

Không chỉ:

> Nó được viết như thế nào?

---

### Logs không phải chỉ để debug

Trước đây tôi nhìn log chủ yếu như:

> “Có lỗi thì mở log ra xem.”

Sau này tôi thấy log là một phần của **operational evidence** (bằng chứng cho thấy hệ thống đang thực sự vận hành như thế nào).
Tôi cần biết:

- request nào;
- user nào;
- action nào;
- thời điểm nào;
- kết quả nào;
- error nào;
- **correlation** (thông tin dùng để nối các hoạt động hoặc log thuộc cùng một yêu cầu hoặc một chuỗi xử lý) nào.

Nhưng log cũng phải tôn trọng security và **data classification** (cách phân loại dữ liệu theo mức độ nhạy cảm và yêu cầu bảo vệ).
Không phải cái gì cũng được log.
Đặc biệt:

- passwords;
- tokens;
- secrets;
- sensitive personal data;

không nên bị đưa vào log chỉ vì “debug cho dễ”.
AI có thể đề xuất logging rất nhiệt tình.
Con người phải quyết định:

> **Thông tin nào an toàn để ghi lại?**

---

### Observability giúp Product State tiến gần thực tế hơn

Trước đây:

```text
PROJECT STATE
= What engineering believes is true
```

Production bổ sung:

```text
OBSERVATION
= What the running system shows
```

Ví dụ:
Engineering nghĩ:

> API latency < 200ms.

Production **telemetry** (dữ liệu đo được từ hệ thống đang chạy) cho thấy:

> p95 = 1.8s.

Bây giờ chúng ta có **discrepancy** (sự khác biệt giữa trạng thái kỳ vọng và trạng thái thực tế).
Đó là lúc system cần:

```text
Observe → Measure → Investigate → Correct → Verify
```

Đây là một vòng lặp khác với coding.

---

### Đây cũng là lúc tôi thấy “**Verified State** (trạng thái đã kiểm chứng luôn phụ thuộc vào bối cảnh và khoảng thời gian mà bằng chứng đó còn phù hợp)” không phải trạng thái vĩnh viễn

Một feature có thể được verify hôm nay.
Nhưng ngày mai:

- dependency thay đổi;
- database tăng;
- configuration thay đổi;
- code thay đổi;
- traffic tăng;
- requirement thay đổi.

Khi đó verification cũ có thể không còn đủ.
Vì vậy:

> **Verified State is contextual and time-bound** (trạng thái đã kiểm chứng luôn phụ thuộc vào bối cảnh và khoảng thời gian mà bằng chứng đó còn phù hợp).

Điều đó không làm verification vô nghĩa.
Ngược lại.
Nó làm cho evidence trở nên có giá trị hơn khi evidence có:

- timestamp;
- version;
- environment;
- scope;
- method;
- result.

Một evidence không có **context** (bối cảnh cần thiết để hiểu một bằng chứng hoặc quyết định) rất khó tin cậy.

---

### AI cần biết khi nào không thể verify

Đây là một behavior tôi muốn AI có.
Nếu AI chỉ có:

```text
source code
```

nhưng không có:

```text
production database
```

thì nó không nên nói:

> “Tính toàn vẹn của dữ liệu production đã được kiểm chứng.”

Nó có thể nói:

> “Kiểm tra ở cấp code đã được thực hiện. Tính toàn vẹn của dữ liệu production chưa thể được xác minh bằng những bằng chứng hiện có.”

Đây là một câu trả lời tốt.
Bởi vì:

> **Honest uncertainty is better than fabricated certainty** (thừa nhận điều chưa biết đáng tin cậy hơn việc tạo ra một sự chắc chắn không có căn cứ).

---

### Tôi bắt đầu chia Verification thành **Evidence Levels** (các cấp độ thể hiện độ mạnh của bằng chứng kiểm chứng)

Không phải evidence nào cũng mạnh như nhau.
Ví dụ:

### Level 0 - **Claim** (một tuyên bố chưa có bằng chứng đầy đủ đi kèm)

> “Tôi tin nó hoạt động.”

### Level 1 - **Static Evidence** (bằng chứng thu được bằng cách kiểm tra mà chưa cần chạy toàn bộ hệ thống)

- code inspection;
- **lint** (kiểm tra tự động các vấn đề về cấu trúc, quy tắc hoặc chất lượng code);
- **type check** (kiểm tra tính phù hợp của kiểu dữ liệu trong code).

### Level 2 - **Automated Execution Evidence** (bằng chứng thu được khi hệ thống hoặc test được thực thi tự động)

- **unit test** (kiểm thử một đơn vị logic nhỏ);
- **integration test** (kiểm thử sự phối hợp giữa nhiều thành phần);
- **build** (quá trình tạo ra phiên bản phần mềm có thể được chạy hoặc triển khai).

### Level 3 - **System Evidence** (bằng chứng cho thấy nhiều thành phần của hệ thống hoạt động đúng khi kết hợp)

- API behavior;
- database integrity;
- **deployment verification** (kiểm tra rằng phiên bản đã triển khai thực sự hoạt động đúng);
- **security check** (kiểm tra các điều kiện bảo mật).

### Level 4 - **Real-World Evidence** (bằng chứng thu được từ hệ thống và người dùng trong thực tế)

- production observation;
- real user workflow;
- **operational metrics** (các chỉ số phản ánh tình trạng vận hành);
- business outcome.

Không phải task nào cũng cần Level 4.
Một refactor nội bộ có thể không cần.
Nhưng một **critical financial workflow** (quy trình tài chính quan trọng, trong đó sai sót có thể gây hậu quả đáng kể) chắc chắn cần mức verification sâu hơn.

---

### Risk phải quyết định độ sâu của Verification

Đây là nguyên tắc tôi đã nói trước đó.
Bây giờ production làm nó rõ hơn.
Một task:

> Đổi tên một biến cục bộ.

Risk rất thấp.
Một task:

> Thay đổi cách tính hóa đơn.

Risk cao hơn.
Một task:

> Thay đổi quyền truy cập của tenant.

Risk rất cao.
Một task:

> Thay đổi **migration** (thay đổi có kiểm soát đối với cấu trúc hoặc dữ liệu của database) trong production có ảnh hưởng đến dữ liệu tài chính.

Risk có thể là critical.
Không thể dùng cùng một **verification strategy** (chiến lược xác định cách và mức độ kiểm chứng) cho tất cả.
Tôi bắt đầu dùng:

```text
Risk ↑
   ↓
Verification Depth ↑
Evidence Strength ↑
Human Review ↑
```

Đây là **Risk-Based Verification** (cách xác định mức độ và chiều sâu kiểm chứng dựa trên mức độ rủi ro của thay đổi).

---

### **Human Review** (việc con người kiểm tra hoặc phê duyệt kết quả ở những điểm quan trọng) không phải dấu hiệu AI yếu

Có một suy nghĩ rất dễ xuất hiện:

> “Nếu AI đủ thông minh thì không cần người review.”

Tôi không đồng ý.
Human review không tồn tại chỉ vì AI yếu.
Nó tồn tại vì:

> **Một số decisions có **consequence** (hậu quả nếu quyết định sai) vượt quá quyền tự chủ của **Executor** (thành phần hoặc AI được giao thực hiện công việc).**

AI có thể viết một migration.
Nhưng nếu migration có thể ảnh hưởng production financial data, human approval là hợp lý.
AI có thể đề xuất **security policy** (quy tắc xác định cách hệ thống phải bảo vệ tài nguyên và dữ liệu).
Nhưng policy có thể cần organizational authority.
AI có thể refactor **architecture** (cấu trúc tổng thể của hệ thống và cách các thành phần được tổ chức, liên kết).
Nhưng thay đổi architecture có thể cần Architecture Review (quy trình đánh giá thay đổi kiến trúc).
Đó là **Governance** (cơ chế quản trị và kiểm soát quyết định, quyền hạn và thay đổi).
Không phải distrust.

---

## TỪ VIBE CODING ĐẾN PHẦN MỀM SỐNG ĐƯỢC TRONG THỰC TẾ

### Tôi không muốn “AI-proof software”

Tôi muốn **evidence-driven software (phần mềm được thiết kế và vận hành dựa trên bằng chứng thay vì chỉ dựa trên niềm tin hoặc tuyên bố)**.
Tôi không thể làm cho AI không bao giờ sai.
Tôi cũng không cần.
Điều tôi cần là:

```text
AI có thể sai
      ↓
Hệ thống có thể phát hiện
      ↓
Bằng chứng làm lộ phần chưa chắc chắn
      ↓
Kiểm chứng bắt được lỗi
      ↓
Trạng thái ngăn việc tuyên bố hoàn thành giả
      ↓
Cơ chế phục hồi giới hạn thiệt hại
```

Đây là cách chúng ta thiết kế hệ thống khi biết rằng Executor có thể sai.
Không phải bằng cách hy vọng nó không sai.

---

### Và tôi nhận ra một điều rất quan trọng về Vibe Coding

Vibe Coding không phải kẻ thù.
Nó thực sự có một giá trị rất lớn:

> **Nó làm giảm chi phí để biến ý tưởng thành software.**

Điều nguy hiểm là khi chúng ta nhầm:

> **Low Cost of Creation** (chi phí tạo ra phần mềm thấp)

với:

> **Low Cost of Completion** (chi phí đưa phần mềm đến trạng thái hoàn thành thực sự thấp).

AI làm creation rất rẻ.
Nhưng completion vẫn cần:

- specification;
- architecture;
- **testing** (hoạt động kiểm thử phần mềm);
- verification;
- security;
- **operations** (hoạt động vận hành hệ thống);
- product validation;
- **maintenance** (hoạt động duy trì, sửa chữa và thay đổi phần mềm trong suốt vòng đời).

Và đây chính là lý do tôi gọi giai đoạn tiếp theo:

> **Beyond Vibe Coding** (bước vượt ra khỏi việc chỉ dùng Vibe Coding để xây phần mềm nhanh).

Không phải vì tôi muốn bỏ Vibe Coding.
Mà vì tôi muốn **đưa nó vào một engineering system đủ mạnh để đi đến production**.

---

### WARNING

Nếu AI nói:

> **“**Everything is working.**”**

Đừng hỏi ngay:

> “Great. What's next?”

Hãy hỏi:

> **“**What evidence supports that claim?** (bằng chứng nào đang hỗ trợ cho tuyên bố đó?)”**

Nếu AI không thể đưa evidence, câu trả lời đúng có thể đơn giản là:

> **“**Not verified yet.** (chưa được kiểm chứng).”**

Đó không phải thất bại.
Đó là một trạng thái engineering trung thực.

---

### TRY THIS

Lần tới khi AI hoàn thành một feature, đừng hỏi:

> “Done?”

Hãy yêu cầu nó trả lời năm câu:

**1. **What changed?** (đã thay đổi những gì?)**  
**2. **What requirement does the change satisfy?** (thay đổi này đáp ứng yêu cầu nào?)**  
**3. **What evidence proves it?** (bằng chứng nào chứng minh điều đó?)**  
**4. **What assumptions remain unverified?** (những giả định nào vẫn chưa được kiểm chứng?)**  
**5. **What could this change break?** (thay đổi này có thể làm hỏng những gì khác?)**

Nếu AI trả lời được cả năm câu, chất lượng execution sẽ khác rất nhiều.
Nếu không trả lời được, bạn vừa tìm thấy một phần **Verification Gap**.

---

### WHAT I LEARNED

AI đã giúp tôi nhận ra một nghịch lý:

> **The faster we can create software, the more important it becomes to know whether the software is actually correct.**
> (càng có thể tạo phần mềm nhanh, chúng ta càng phải biết chắc phần mềm đó có thực sự đúng hay không.)

Khi code chậm, chúng ta thường có thời gian suy nghĩ.
Khi AI code rất nhanh, tốc độ có thể vượt qua khả năng kiểm soát.
Vì vậy, trong thời đại AI, verification không phải là một bước phụ sau coding.
Nó trở thành:

> **một phần của tốc độ.**

Bởi vì nếu một thay đổi sai khiến tôi mất hai ngày sửa lại, tốc độ tạo code ban đầu chẳng còn nhiều ý nghĩa.

---

### TAKEAWAY

Tôi từng nghĩ phần khó nhất của software là viết code.
Sau đó AI xuất hiện và làm phần đó nhanh hơn rất nhiều.
Tôi tưởng mọi thứ sẽ dễ dàng.
Nhưng rồi tôi phát hiện:

> **Writing code was never the whole job.** (viết code chưa bao giờ là toàn bộ công việc).

Phần khó còn lại là biết:

- mình đang xây gì;
- tại sao xây;
- được phép thay đổi gì;
- thay đổi ảnh hưởng đến đâu;
- làm sao biết nó đúng;
- evidence nằm ở đâu;
- production đang thực sự xảy ra điều gì;
- và nếu nó sai, làm sao quay lại.

AI có thể viết code.
AI có thể chạy test.
AI có thể phân tích.
AI có thể đề xuất.
Nhưng cuối cùng:

> **Reality is the final test.** (thực tế mới là phép thử cuối cùng).

Và production là nơi reality bắt đầu nói chuyện.

---

### CHUYỂN SANG CHƯƠNG 16

Sau tất cả những thứ đó, tôi gặp một câu hỏi mà trước đây tôi đã đánh giá thấp:

> **Nếu AI có thể viết gần như mọi thứ, tại sao tôi vẫn phải quan tâm đến architecture (cấu trúc tổng thể của hệ thống và cách các thành phần được tổ chức, liên kết)?**

Một AI có thể tạo database.
Có thể tạo API.
Có thể tạo **frontend** (phần giao diện và logic chạy ở phía người dùng).
Có thể tạo **authentication** (xác thực danh tính người dùng).
Có thể tạo **background jobs** (các công việc được hệ thống thực hiện ở phía sau, không cần người dùng chờ trực tiếp).
Có thể kết nối tất cả chúng lại.
Nhìn bề ngoài, architecture (cấu trúc tổng thể của hệ thống và cách các thành phần được tổ chức, liên kết) dường như đang trở thành thứ AI có thể làm thay chúng ta.
Nhưng tôi bắt đầu phát hiện một vấn đề:

> **AI rất giỏi tạo ra một architecture có vẻ hợp lý.**

Còn câu hỏi khó hơn là:

> **“Architecture này có phù hợp với hệ thống mà tôi sẽ phải sống cùng trong ba năm tới không?”**

Đó là lúc tôi hiểu rằng AI có thể viết architecture (cấu trúc tổng thể của hệ thống và cách các thành phần được tổ chức, liên kết).
Nhưng **architecture vẫn là trách nhiệm của con người**.

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 15 - NHỮNG LỖI AI KHÔNG NÓI VỚI TÔI
├── THẾ GIỚI THẬT, HAPPY PATH VÀ NHỮNG GIẢ ĐỊNH
├── REQUIREMENT, SECURITY, DỮ LIỆU VÀ RANH GIỚI HỆ THỐNG
├── TỪ LOCAL CORRECTNESS ĐẾN SYSTEM CORRECTNESS
├── VERIFICATION, EVIDENCE VÀ RISK
└── TỪ VIBE CODING ĐẾN PHẦN MỀM SỐNG ĐƯỢC TRONG THỰC TẾ

Navigation metadata only. It does not control PDF coordinates or typography.
-->
