---
document_type: "CORE_BOOK_CHAPTER"
book: "BEYOND VIBE CODING"
chapter: 16
order: 16
title: "ARCHITECTURE VẪN LÀ TRÁCH NHIỆM CỦA TÔI"
subtitle: "AI có thể đề xuất architecture (kiến trúc của hệ thống). Nhưng AI không phải người phải sống với architecture đó."
shortTitle: "Architecture vẫn là trách nhiệm của tôi"
language: "vi-VN"
status: "CANONICAL_STRUCTURED_MANUSCRIPT"
publicationStatus: "published"
contentStatus: "final"
canonical_page_start: 371
approved_major_topics: 5
navigation_policy: "ONE_ROOT_PLUS_FIVE_MAJOR_TOPICS"
navigation_root: "CHƯƠNG 16 - ARCHITECTURE VẪN LÀ TRÁCH NHIỆM CỦA TÔI"
publication_standard: "BVCE V3.2"
hero: "images/chapter-16-hero.png"
readingTime: "12 min"
topics: ["architecture", "governance", "trade-offs", "complexity", "compliance"]
---

<!-- Prompt-ID: #000032 | Prompt-Title: BVC — CHAPTER 16 CANONICAL SOURCE PUBLICATION & BVCE V3.2 RELEASE -->
<!-- Canonical structured manuscript. PDF is a derived publishing artifact. Whole-book page numbering starts at 371. -->

# CHƯƠNG 16

# ARCHITECTURE VẪN LÀ TRÁCH NHIỆM CỦA TÔI

*AI có thể đề xuất **architecture** (kiến trúc của hệ thống). Nhưng AI không phải người phải sống với architecture đó.*

Có một thời gian tôi nghĩ:

> “Nếu AI có thể viết code tốt như vậy, có lẽ architecture cũng có thể giao cho AI.”

Suy nghĩ đó hoàn toàn hợp lý.
AI có thể:

- đề xuất **database schema** (cấu trúc định nghĩa cách dữ liệu được tổ chức trong database);
- tạo **API architecture** (cách tổ chức và phân chia kiến trúc của các API);
- chia **module** (phần được tổ chức tương đối độc lập trong một hệ thống phần mềm);
- tạo **service layer** (lớp phần mềm đảm nhiệm các xử lý nghiệp vụ và điều phối giữa các thành phần);
- thiết kế **authentication** (cơ chế xác thực danh tính của người dùng hoặc thành phần);
- đề xuất **caching** (kỹ thuật lưu tạm dữ liệu để giảm thời gian xử lý hoặc truy cập);
- viết **Docker configuration** (cấu hình dùng để đóng gói và chạy ứng dụng trong container);
- tạo **CI/CD** (quy trình tích hợp, kiểm thử và triển khai phần mềm một cách tự động);
- thậm chí giải thích tại sao một **architecture pattern** (mẫu thiết kế kiến trúc có thể áp dụng cho một nhóm bài toán tương tự) phù hợp.

Và nhiều đề xuất trong số đó thực sự rất tốt.
Đó mới là điều khiến vấn đề trở nên khó.
Nếu AI đưa ra một architecture rõ ràng, hiện đại, có vẻ hợp lý, có đầy đủ thuật ngữ như:

> **microservices** (cách chia hệ thống thành nhiều dịch vụ tương đối độc lập), **event-driven architecture** (kiến trúc trong đó các thành phần giao tiếp chủ yếu thông qua sự kiện), **CQRS** (mô hình tách hoạt động đọc dữ liệu khỏi hoạt động ghi dữ liệu), **Redis** (hệ thống lưu trữ dữ liệu trong bộ nhớ thường dùng cho cache và các thao tác nhanh), **message queue** (hàng đợi dùng để chuyển và lưu tạm các thông điệp giữa các thành phần), **vector database** (cơ sở dữ liệu tối ưu cho việc lưu và tìm kiếm biểu diễn vector), **Kubernetes** (nền tảng điều phối và vận hành các container trong môi trường phân tán)...

thì rất dễ bị thuyết phục.
Nhưng tôi bắt đầu hỏi một câu khác:

> **“Tôi có thực sự cần tất cả những thứ này không?”**

---

## ARCHITECTURE PHẢI PHÙ HỢP VỚI PROBLEM

### ARCHITECTURE KHÔNG PHẢI CUỘC THI XEM AI DÙNG NHIỀU CÔNG NGHỆ HƠN

Đây là một cái bẫy đặc biệt nguy hiểm trong thời đại AI.
AI có **knowledge** (tri thức được sử dụng làm cơ sở cho phân tích hoặc quyết định) rất rộng.
Nó biết hàng trăm architecture pattern.
Nó biết hàng nghìn **technology** (công nghệ được lựa chọn để hiện thực hóa một phần của hệ thống).

Khi tôi hỏi:

> “How should I architect this **application** (ứng dụng phần mềm thực hiện một nhóm chức năng cho người dùng)?”

AI có thể đưa cho tôi một architecture rất impressive.

Ví dụ:

```text
Frontend
   ↓
API Gateway
   ↓
Authentication Service
   ↓
User Service
   ↓
Customer Service
   ↓
Message Broker
   ↓
Event Bus
   ↓
Worker Cluster
   ↓
Redis
   ↓
PostgreSQL
   ↓
Object Storage
```

Nhìn rất enterprise.

Nhưng nếu application chỉ có vài trăm users?

Có thể tôi vừa tạo ra một hệ thống có **enterprise complexity nhưng startup problem**.

---

### COMPLEXITY KHÔNG MIỄN PHÍ

Mỗi **component** (một thành phần có trách nhiệm tương đối riêng trong hệ thống) mới tạo ra một loại trách nhiệm mới.

Thêm Redis:

- **deployment** (quá trình đưa một phiên bản phần mềm vào môi trường để chạy);
- **monitoring** (việc theo dõi trạng thái và chỉ số hoạt động của hệ thống);
- **cache invalidation** (cơ chế xác định khi nào dữ liệu lưu tạm không còn hợp lệ);
- **failure mode** (cách một thành phần hoặc hệ thống có thể thất bại).

Thêm **message broker** (thành phần trung gian tiếp nhận, lưu và phân phối thông điệp):

- queue management;
- retry;
- ordering;
- **dead-letter handling** (cách xử lý các thông điệp không thể được xử lý thành công sau những lần thử cần thiết);
- observability.

Thêm microservice:

- service communication;
- **distributed tracing** (cách theo dõi một yêu cầu xuyên qua nhiều thành phần phân tán);
- deployment;
- versioning;
- **network failure** (lỗi xảy ra khi việc giao tiếp qua mạng bị gián đoạn hoặc không đáp ứng).

Thêm Kubernetes:

- **cluster** (nhóm máy hoặc tiến trình cùng phối hợp để cung cấp một dịch vụ);
- networking;
- secrets;
- **scaling** (việc mở rộng năng lực hệ thống khi tải hoặc số lượng người dùng tăng);
- **operational expertise** (năng lực chuyên môn cần thiết để vận hành và xử lý sự cố hệ thống).

Technology có thể miễn phí.
**Complexity thì không.**

Đây là một insight tôi muốn ghi nhớ:

> **A technology can be cheap while the complexity it introduces is expensive.**

---

### AI CÓ XU HƯỚNG GIẢI QUYẾT VẤN ĐỀ BẰNG KHẢ NĂNG

Nếu AI biết một công nghệ, nó rất dễ đề xuất công nghệ đó.

Không phải vì AI cố tình làm hệ thống phức tạp.
Mà vì AI được tối ưu để đưa ra một giải pháp hợp lý trong rất nhiều context.

Vấn đề là:

> “Technically possible” không đồng nghĩa với “economically or **operationally justified** (đáng thực hiện xét theo chi phí và yêu cầu vận hành thực tế).”

Ví dụ:

Tôi có thể xây một hệ thống **realtime** (cập nhật hoặc phản hồi gần như ngay lập tức theo sự kiện phát sinh) bằng **WebSocket** (giao thức cho phép duy trì kết nối hai chiều giữa client và server).
Nhưng nếu user chỉ cần refresh dữ liệu mỗi 5 phút, WebSocket có thể là unnecessary complexity.

Tôi có thể dùng vector database.
Nhưng nếu knowledge base chỉ có vài trăm documents và **full-text search** (tìm kiếm trực tiếp trên nội dung văn bản thay vì chỉ dựa vào cấu trúc dữ liệu) đã đủ, vector database có thể chưa cần thiết.

Tôi có thể tách microservices.
Nhưng **modular monolith** (ứng dụng triển khai như một khối nhưng bên trong được chia thành các module có ranh giới rõ) có thể phù hợp hơn.

**Architecture** (kiến trúc tổ chức các thành phần và quan hệ của hệ thống) tốt không phải architecture có nhiều thành phần nhất.

> Architecture tốt là architecture phù hợp nhất với problem, **constraints** (các ràng buộc xác định giới hạn mà kiến trúc phải tuân theo) và expected evolution.

---

### TÔI BẮT ĐẦU HỎI AI: “WHY NOT SIMPLER?”

Đây là một câu hỏi tôi rất thích.

Không phải:

> “What is the most advanced architecture?”

Mà:

> **“What is the simplest architecture that safely satisfies the requirements?”**

Sau đó:

> “What assumptions make this architecture valid?”

> “What would make us need to evolve it?”

> “What is the operational cost?”

> “What is the failure mode?”

> “What happens if this component is unavailable?”

> “What complexity are we introducing?”

Những câu hỏi này làm AI chuyển từ:

> **Technology Recommendation** (đề xuất công nghệ phù hợp với một bài toán hoặc mục tiêu)

sang:

> **Engineering Trade-off Analysis** (phân tích các phương án và sự đánh đổi giữa lợi ích, chi phí và rủi ro)

---

### ARCHITECTURE LÀ TẬP HỢP TRADE-OFF

Không có architecture hoàn hảo.

Có architecture:

- phù hợp với scale;
- phù hợp với budget;
- phù hợp với team;
- phù hợp với risk;
- phù hợp với **security** (các cơ chế bảo vệ hệ thống, dữ liệu và quyền truy cập);
- phù hợp với expected growth.

Một architecture có thể tối ưu **performance** (mức độ nhanh và hiệu quả của hệ thống khi xử lý công việc) nhưng tăng operational complexity.

Một architecture có thể cực kỳ đơn giản nhưng không scale tốt.

Một architecture có thể rất secure nhưng khó phát triển.

Một architecture có thể rẻ nhưng cần nhiều manual operation.

Vì vậy architecture không phải:

> “Đúng hay sai?”

Nó thường là:

> **“Trade-off nào chúng ta chấp nhận?”**

Và đó là decision.

Decision cần authority.

---

## ARCHITECTURE DECISION THUỘC VỀ CON NGƯỜI

### AI CÓ THỂ ĐỀ XUẤT. TÔI PHẢI QUYẾT ĐỊNH.

Tôi bắt đầu tách architecture work thành hai phần:

```text
AI
 │
 ├── Analyze
 ├── Compare
 ├── Propose
 ├── Simulate
 ├── Identify Risks
 └── Explain Trade-offs
          │
          ↓
       HUMAN
          │
       DECISION
          │
          ↓
     ARCHITECTURE
```

Đây là một boundary rất quan trọng.

AI không bị cấm tham gia architecture.
Ngược lại, tôi muốn AI tham gia rất sâu.

Nhưng:

> **AI-generated architecture is a proposal until it is authorized.**

---

### ARCHITECTURE DECISION KHÔNG PHẢI ARCHITECTURE DIAGRAM

Một diagram đẹp không có nghĩa architecture đã được quyết định.

Ví dụ:

```text
Frontend
   ↓
Backend
   ↓
PostgreSQL
```

Đây chỉ là một **representation** (cách một ý tưởng hoặc cấu trúc được biểu diễn để con người có thể nhìn và hiểu).

Architecture decision phải nói thêm:

- tại sao **PostgreSQL** (hệ quản trị cơ sở dữ liệu quan hệ được sử dụng để lưu trữ và xử lý dữ liệu);
- tại sao không dùng database khác;
- boundary nằm ở đâu;
- **data ownership** (quyền chịu trách nhiệm và kiểm soát đối với một nhóm dữ liệu) thế nào;
- **transaction boundary** (ranh giới xác định một nhóm thao tác dữ liệu phải được xử lý như một giao dịch nhất quán) thế nào;
- authentication ở đâu;
- **authorization** (quyền xác định người dùng hoặc thành phần được phép làm gì) ở đâu;
- **scaling strategy** (cách hệ thống được mở rộng khi tải hoặc số lượng người dùng tăng) là gì;
- **backup/recovery** (cơ chế sao lưu và khôi phục dữ liệu hoặc hệ thống sau sự cố) ra sao;
- những gì cố ý **không** xây.

Đặc biệt:

> **“Why not?”**

thường quan trọng không kém:

> **“Why?”**

---

### TÔI BẮT ĐẦU YÊU CẦU AI ĐƯA RA ALTERNATIVES

Thay vì:

> “Design the architecture.”

tôi thích:

> “Propose three viable architectures. Compare them against the project constraints. Explain the trade-offs and recommend one.”

Ví dụ:

**Option A**
Modular Monolith

**Option B**
**Service-Oriented** (cách tổ chức hệ thống thành các dịch vụ có trách nhiệm tương đối độc lập)

**Option C**
Microservices

Sau đó đánh giá:

| **Tiêu chí** | **A** | **B** | **C** |
|---|---|---|---|
| **Initial complexity** (mức độ phức tạp cần chấp nhận ngay từ thời điểm bắt đầu) | Low | Medium | High |
| **Operational overhead** (chi phí và công sức phát sinh để vận hành hệ thống) | Low | Medium | High |
| **Development speed** (tốc độ mà đội ngũ có thể xây dựng và thay đổi phần mềm) | High | Medium | Low |
| **Scaling flexibility** (mức độ linh hoạt khi mở rộng hệ thống theo nhu cầu) | Medium | High | High |
| **Team requirement** (năng lực và quy mô đội ngũ cần thiết để vận hành kiến trúc) | Low | Medium | High |
| **Failure complexity** (mức độ khó khăn khi hệ thống gặp lỗi và phải phục hồi) | Low | Medium | High |

Điều quan trọng không phải bảng này đúng tuyệt đối.

Điều quan trọng là:

> Tôi buộc **architecture decision** (quyết định chính thức về cách hệ thống được tổ chức và những lựa chọn kiến trúc được chấp nhận) phải trở thành một **trade-off** (sự đánh đổi giữa các lợi ích, chi phí hoặc rủi ro khác nhau) conversation.

---

### ARCHITECTURE PHẢI XUẤT PHÁT TỪ CONSTRAINTS

Một architecture không có constraints thường chỉ là một danh sách technology.

Tôi bắt đầu viết constraints trước.

Ví dụ:

```text
PROJECT CONSTRAINTS

Budget:
Low

Team:
Small

Users:
Initially < 1,000

Availability:
Business-hours critical

Data:
Sensitive customer data

Deployment:
Single primary environment

Expected growth:
Moderate

Operational expertise:
Limited
```

Sau đó mới hỏi:

> “What architecture fits these constraints?”

Câu trả lời thường rất khác.

Và đó là architecture có ý nghĩa hơn.

---

### SECURITY PHẢI ĐI TRƯỚC CONVENIENCE

Có một điều tôi càng làm phần mềm thực tế càng thấy rõ:

> **Security cannot be added as decoration after architecture is finished.**

Nếu architecture ban đầu không xác định:

- **trust boundaries** (các ranh giới xác định nơi mức độ tin cậy giữa người dùng, thành phần hoặc hệ thống thay đổi);
- **identity** (thông tin dùng để xác định danh tính của người hoặc thành phần đang truy cập hệ thống);
- authorization;
- **data classification** (cách phân loại dữ liệu theo mức độ nhạy cảm và yêu cầu bảo vệ);
- secrets;
- **tenant isolation** (cơ chế bảo đảm dữ liệu và quyền của các tenant được tách biệt);
- **audit requirements** (các yêu cầu về việc ghi nhận và truy vết những hành động quan trọng);

thì security về sau thường trở thành một chuỗi patch.

AI có thể rất nhanh tạo authentication.

Nhưng:

> Authentication không phải là một **security architecture** (cách các cơ chế bảo vệ, quyền truy cập và ranh giới tin cậy được tổ chức trong hệ thống).

---

### TRUST BOUNDARY

Tôi đặc biệt thích khái niệm **Trust Boundary** (ranh giới xác định ai hoặc thành phần nào được phép tin cậy nhau trong một phạm vi cụ thể).

Một hệ thống có thể nhìn đơn giản:

```text
User
  ↓
Web App
  ↓
API
  ↓
Database
```

Nhưng security architecture phải hỏi:

- User được trust ở mức nào?
- Browser được trust ở mức nào?
- API boundary ở đâu?
- Internal service có được trust mặc định không?
- Database có được truy cập trực tiếp không?
- **AI Executor** (thành phần AI được giao thực hiện một task trong phạm vi và quyền hạn đã xác định) được phép nhìn dữ liệu nào?
- Developer có quyền production đến đâu?

Một architecture tốt không chỉ cho biết:

> “Component nào nói chuyện với component nào.”

Nó còn phải nói:

> **“Ai được phép tin ai, và trong phạm vi nào?”**

---

### AI CŨNG CẦN MỘT TRUST BOUNDARY

Đây là điều tôi thấy ngày càng quan trọng.

Nếu AI được quyền:

```text
Read source
Write source
Run tests
Run migrations
Access production
Read customer data
Access secrets
Deploy
```

thì AI đang có một quyền lực rất lớn.

Không thể chỉ nói:

> “AI rất thông minh.”

Câu hỏi phải là:

> **“AI được phép làm gì?”**

Đây quay lại Chapter 10:

> Capability Does Not Create **Authority** (quyền được phép đưa ra hoặc thực hiện một quyết định trong phạm vi xác định).

AI có khả năng chạy command không có nghĩa nó được authorization để chạy command đó.

---

### ARCHITECTURE PHẢI XÁC ĐỊNH BLAST RADIUS

Một trong những câu hỏi tôi muốn AI trả lời trước một thay đổi lớn:

> **“If this component fails, what else fails?”**

Đây là **blast radius** (phạm vi tác động có thể lan rộng khi một thành phần hoặc thay đổi gặp sự cố).

Ví dụ:

```text
Payment Service
      ↓
Invoice
      ↓
Reporting
      ↓
Notification
```

Nếu Payment Service down:

- Invoice có tạo được không?
- Existing invoices có đọc được không?
- Reporting có hoạt động không?
- Notification có retry không?

Đây không chỉ là implementation detail.

Đây là architecture.

---

## FAILURE, DEBT VÀ ARCHITECTURE GOVERNANCE

### ARCHITECTURE PHẢI BIẾT CÁCH THẤT BẠI

Một architecture đẹp khi mọi thứ hoạt động.

Architecture tốt khi:

> **một phần của nó không hoạt động.**

Tôi bắt đầu hỏi:

> “What happens when the database is unavailable?”

> “What happens when the external API times out?”

> “What happens when the same event arrives twice?”

> “What happens when deployment is interrupted?”

> “What happens when a **migration** (quá trình chuyển dữ liệu, cấu trúc hoặc hệ thống từ trạng thái này sang trạng thái khác) fails halfway?”

> “What happens when a user loses connection?”

> “What happens when the cache is stale?”

Những câu hỏi này dẫn đến:

- retry;
- timeout;
- **idempotency** (tính chất cho phép xử lý lặp cùng một yêu cầu mà không tạo ra kết quả sai hoặc trùng ngoài ý muốn);
- **transaction** (đơn vị xử lý dữ liệu phải được thực hiện theo một quy tắc nhất quán);
- **fallback** (phương án dự phòng được sử dụng khi cách xử lý chính không hoạt động);
- **circuit breaker** (cơ chế tạm ngừng gọi một thành phần đang lỗi để tránh làm lan rộng sự cố);
- recovery;
- **rollback** (khôi phục hệ thống hoặc dữ liệu về trạng thái trước một thay đổi).

Nhưng một lần nữa:

> **Không phải pattern nào cũng cần được áp dụng.**

Chúng chỉ cần khi problem yêu cầu.

---

### AI RẤT THÍCH “BEST PRACTICES”

Tôi đã nhiều lần thấy AI nói:

> “Best practice is…”

Tôi bắt đầu cảnh giác với câu này.

Best practice trong một context có thể trở thành:

> **Worst fit trong một context khác.**

Ví dụ:

> Microservices are a best practice.

Không.

Microservices là một **architectural approach** (cách tiếp cận tổng thể dùng để tổ chức hệ thống) phù hợp với **một số loại constraint**.

> Event-driven architecture is a best practice.

Cũng không.

> Kubernetes is a best practice.

Không.

Không có “best” nếu chưa xác định:

- best for what?
- under which constraints?
- at what scale?
- for which team?
- at what operational cost?

Vì vậy tôi bắt đầu yêu cầu:

> **“Best practice according to which constraint?”**

---

### ARCHITECTURE DEBT CÓ THỂ NGUY HIỂM HƠN TECHNICAL DEBT

**Technical debt** (khoản nợ kỹ thuật phát sinh từ những lựa chọn hoặc phần việc chưa được xử lý đầy đủ) thường dễ nhìn thấy:

- code duplication;
- ugly code;
- missing tests;
- outdated dependency.

Architecture debt sâu hơn.

Ví dụ:

> Một module có quyền truy cập trực tiếp vào quá nhiều database tables.

Hôm nay vẫn chạy.

Một năm sau:

- boundary không rõ;
- migration khó;
- security khó;
- **testing** (hoạt động kiểm thử phần mềm) khó;
- scaling khó.

Architecture debt không nhất thiết tạo bug ngay.

Nó tạo:

> **Future Cost.**

Và AI có thể vô tình tạo architecture debt rất nhanh bởi vì nó tối ưu cho task hiện tại.

---

### LOCAL OPTIMIZATION CÓ THỂ PHÁ GLOBAL ARCHITECTURE

Đây là một trong những lỗi tôi đặc biệt muốn tránh khi dùng AI.

**Task** (công việc cụ thể được giao cho AI hoặc kỹ sư thực hiện):

> “Make this endpoint faster.”

AI có thể:

- thêm cache;
- denormalize data;
- thêm index;
- duplicate computation.

Endpoint nhanh hơn.

Task thành công.

Nhưng global system có thể trở nên:

- khó invalidate cache;
- data inconsistency;
- storage tăng;
- write performance giảm.

Đây là:

> **Local Optimization ≠ System Optimization.**

AI cần biết context đủ rộng để nhận ra tác động.

Nhưng người chịu trách nhiệm architecture vẫn phải nhìn toàn hệ thống.

---

### VÌ VẬY TÔI CẦN ARCHITECTURE RULES

Tôi không muốn mỗi lần AI gặp một problem lại tự phát minh architecture.

Project cần có rules.

Ví dụ:

```text
ARCHITECTURE RULES

1. Business logic must not depend on UI.
2. Database access must stay within authorized data-access boundaries.
3. External integrations must use defined adapters.
4. Authentication and authorization remain separate concerns.
5. Cross-module dependencies require explicit justification.
6. New infrastructure components require architecture review.
7. Security-sensitive changes require elevated verification.
```

Đây không phải prompt.

Đây là **Project Knowledge** (tri thức chính thức của project được lưu trữ để các executor đủ điều kiện có thể sử dụng).

AI đọc rules.

AI thực thi trong rules.

---

### ARCHITECTURE CŨNG PHẢI VERSIONED

Architecture không bất biến.

Project phát triển.
Requirements thay đổi.
Scale thay đổi.
Team thay đổi.
Technology thay đổi.

Vì vậy:

```text
Architecture V1
      ↓
     ADR
      ↓
Architecture V2
      ↓
     ADR
      ↓
Architecture V3
```

Mỗi major change nên có:

- reason;
- **alternatives** (các phương án khác có thể đáp ứng cùng một mục tiêu);
- decision;
- consequences;
- migration;
- verification.

Đó là lý do **Architecture Decision Record — ADR** (tài liệu ghi lại quyết định kiến trúc, lý do, phương án và hệ quả) rất quan trọng.

Không phải để tạo bureaucracy.

Mà để project nhớ:

> **“Why did we do this?”**

---

### “WHY” THƯỜNG BIẾN MẤT KHỎI CODE

Code cho tôi biết:

> **What the system does.**

Architecture có thể cho tôi biết:

> **How components relate.**

Nhưng ADR giúp lưu:

> **Why this decision was made.**

Đây là knowledge cực kỳ quan trọng cho AI.

Nếu không có nó, một AI mới có thể nhìn architecture hiện tại và nói:

> “This seems unnecessarily complex. I can simplify it.”

Và AI có thể đúng.

Nhưng cũng có thể sai.

Có thể complexity đó tồn tại vì:

- **compliance** (mức độ tuân thủ các quy tắc, yêu cầu hoặc tiêu chuẩn đã được xác định);
- security;
- legacy integration;
- business constraint;
- performance requirement.

Không biết **why** thì AI rất dễ “improve” thứ không nên thay đổi.

---

### TÔI BẮT ĐẦU PHÂN BIỆT REFACTORING VÀ ARCHITECTURE CHANGE

AI rất thích refactor.

Và refactor thường tốt.

Nhưng:

> Refactoring is not automatically **architecture-neutral** (không làm thay đổi có ý nghĩa đối với cấu trúc hoặc ranh giới kiến trúc).

Một thay đổi:

> Move this class.

có thể chỉ là refactor.

Nhưng:

> Move this **business logic** (quy tắc xử lý phản ánh cách hoạt động thực tế của nghiệp vụ) into another service.

có thể là **architecture change** (thay đổi làm biến đổi cấu trúc, ranh giới hoặc quan hệ nền tảng của hệ thống).

Một thay đổi:

> Replace direct database access with an API.

cũng có thể thay đổi boundary.

Vì vậy trước khi AI thực hiện một refactor lớn, tôi muốn nó trả lời:

> **“Does this change alter an architectural boundary?”**

Nếu có:

> **Architecture Review** (quá trình đánh giá một thay đổi kiến trúc trước khi được chấp thuận) may be required.

---

### AI CÀNG MẠNH, ARCHITECTURE GOVERNANCE CÀNG QUAN TRỌNG

Điều này nghe có vẻ ngược đời.

Tôi từng nghĩ:

> AI càng thông minh → càng ít governance.

Sau này tôi nghĩ:

> AI càng có **capability** (khả năng mà một thành phần hoặc AI có thể thực hiện) lớn → càng cần **authority boundary** (ranh giới xác định quyền được phép của AI hoặc thành phần trong một phạm vi) rõ.

Một AI yếu chỉ có thể sửa một file.

Một AI mạnh có thể:

- đọc toàn bộ repository;
- thay đổi architecture;
- sửa database;
- tạo migration;
- cập nhật dependencies;
- thay đổi deployment.

Nếu không có control, tốc độ thay đổi sẽ vượt qua khả năng review.

Đó là lúc:

> **Controlled Autonomy** (tự chủ có kiểm soát, trong đó AI được phép tự thực hiện một số việc nhưng bị giới hạn bởi phạm vi và quyền hạn)

trở thành một architectural principle, không chỉ là một AI principle.

---

### TÔI KHÔNG MUỐN ARCHITECTURE TRỞ THÀNH “AI-GENERATED ARCHITECTURE”

Tôi muốn:

> **Human-governed, AI-assisted Architecture** (kiến trúc do con người quản trị và AI hỗ trợ phân tích hoặc thực thi)

AI có thể:

- discover;
- analyze;
- simulate;
- compare;
- propose;
- document;
- implement;
- verify.

Con người vẫn:

- define intent;
- establish constraints;
- approve decisions;
- own consequences.

Đây là một sự phân công rất tự nhiên.

AI có tốc độ.

Con người có **accountability** (trách nhiệm chịu hậu quả và giải trình đối với quyết định).

---

## ARCHITECTURE PHẢI CÓ THỂ EVOLVE

### MỘT ARCHITECTURE DECISION TỐT CẦN ÍT NHẤT NĂM CÂU TRẢ LỜI

Tôi thường muốn architecture decision có thể trả lời:

#### WHAT?

Chúng ta quyết định gì?

#### WHY?

Tại sao?

#### ALTERNATIVES?

Có lựa chọn nào khác?

#### CONSEQUENCES?

Chúng ta chấp nhận trade-off nào?

#### VERIFICATION?

Làm sao biết architecture thực sự đáp ứng mục tiêu?

Nếu thiếu “Why”, architecture sẽ mất context.

Nếu thiếu “Alternatives”, ta dễ nhầm recommendation với necessity.

Nếu thiếu “Consequences”, decision không minh bạch.

Nếu thiếu “**Verification** (kiểm chứng để xác định một yêu cầu, hành vi hoặc điều kiện có thực sự đúng hay không)”, architecture chỉ là niềm tin.

---

### ARCHITECTURE CŨNG PHẢI PHỤC VỤ KHẢ NĂNG THAY ĐỔI

Đây là điều tôi muốn AI hiểu.

Không phải:

> “Architecture này đúng hôm nay.”

Mà:

> **“Architecture này cho phép project thay đổi ngày mai với chi phí hợp lý.”**

Không ai biết chính xác product sẽ thế nào sau ba năm.

Vì vậy architecture không cần dự đoán mọi thứ.

Nó cần:

- có boundaries;
- có khả năng evolve;
- tránh **coupling** (mức độ phụ thuộc lẫn nhau giữa các thành phần) không cần thiết;
- giữ data integrity;
- giữ **security boundary** (ranh giới xác định nơi quyền truy cập và dữ liệu phải được kiểm soát);
- cho phép migration.

Tôi không cần:

> **Future-proof architecture** (kiến trúc được kỳ vọng có thể đáp ứng nhiều thay đổi trong tương lai mà không cần thay đổi lớn)

Tôi cần:

> **Change-friendly architecture** (kiến trúc được thiết kế để có thể thay đổi với chi phí và rủi ro hợp lý)

Hai thứ khác nhau.

---

### VÀ TÔI BẮT ĐẦU THÍCH “BORING ARCHITECTURE”

Đây là một phát hiện khá thú vị.

Có những architecture nhìn không ấn tượng.

Không có:

- 20 services;
- 5 message brokers;
- Kubernetes;
- distributed event mesh;
- 12 databases.

Nhưng nó:

- dễ hiểu;
- dễ deploy;
- dễ debug;
- dễ backup;
- dễ recover;
- dễ onboard;
- dễ verify;
- đủ scale.

Tôi bắt đầu thích chúng.

> **Boring is often a feature.**

Một architecture không cần làm tôi ấn tượng.

Nó cần làm tôi **yên tâm**.

---

### “SIMPLE” KHÔNG CÓ NGHĨA “NAIVE”

Đây cũng là một distinction quan trọng.

Simple architecture:

> ít complexity không cần thiết.

Naive architecture:

> bỏ qua complexity thực sự tồn tại.

Ví dụ:

> “Không cần authorization vì application nhỏ.”

Đó là naive.

Nhưng:

> “Dùng một modular monolith thay vì microservices vì team nhỏ và scale hiện tại thấp.”

Đó có thể là simple.

Simplicity phải đi cùng:

> Correctness + Security + **Maintainability** (khả năng duy trì, sửa chữa và thay đổi hệ thống trong thời gian dài).

---

### ARCHITECTURE LÀ NƠI NHỮNG NGUYÊN TẮC TRƯỚC ĐÓ GẶP NHAU

Đến đây tôi thấy toàn bộ cuốn sách bắt đầu nối lại.

**Task Engineering** (cách xác định và giao công việc cho AI với phạm vi, mục tiêu và điều kiện rõ ràng) nói:

> AI làm đúng phần việc.

**Context Engineering** (cách cung cấp đúng ngữ cảnh, trạng thái, quy tắc và thông tin để AI thực hiện công việc chính xác) nói:

> AI nhận đúng thông tin.

**Verification** nói:

> AI phải chứng minh kết quả.

**Continuity** (khả năng project tiếp tục công việc mà không phụ thuộc vào một phiên làm việc cụ thể) nói:

> Project không phụ thuộc vào một Engineering Run.

**Multi-AI** (cách tổ chức nhiều AI executor có thể cùng tham gia công việc) nói:

> Executor có thể thay đổi.

**Governance** (cơ chế quản trị xác định quyền hạn, trách nhiệm, quy tắc và kiểm soát) nói:

> AI không tự có authority.

**Architecture** (kiến trúc tổ chức các thành phần và quan hệ của hệ thống) nói:

> Những thay đổi đó phải nằm trong một hệ thống có boundaries.

Tất cả đều dẫn về một ý:

> **AI không được phép biến software development thành một chuỗi hành động không kiểm soát.**

---

### TÔI BẮT ĐẦU NHÌN ARCHITECTURE NHƯ MỘT CONSTRAINT SYSTEM

Một architecture tốt không chỉ nói:

> “AI hãy xây như thế này.”

Nó còn nói:

> “AI không được vượt qua boundary này.”

Ví dụ:

```text
UI
 │
 X ── direct DB access
 │
 ↓
API
 │
 ↓
Domain
 │
 ↓
Data Access
 │
 ↓
Database
```

Dấu `X` đôi khi quan trọng hơn mũi tên.

Bởi vì architecture không chỉ xác định:

> **Allowed paths** (những đường đi hoặc cách tương tác được kiến trúc cho phép)

mà còn:

> **Forbidden paths** (những đường đi hoặc cách tương tác mà kiến trúc cấm).

Đây là một cách rất mạnh để AI làm việc an toàn hơn.

---

## TỪ ARCHITECTURE RULES ĐẾN ARCHITECTURE COMPLIANCE

### TÔI KHÔNG CẦN AI NHỚ ARCHITECTURE BẰNG TRÍ NHỚ

Một lần nữa, chúng ta quay lại nguyên tắc cũ.

Architecture rules phải tồn tại trong project.

Không:

> “Gemini nhớ rằng…”

Không:

> “DeepSeek biết rằng…”

Mà:

```text
.project/
   architecture/
   governance/
   knowledge/
   state/
```

AI nào đủ điều kiện cũng có thể load.

Đó là:

> **Provider-Neutral Architecture Knowledge** (tri thức kiến trúc không phụ thuộc vào một nhà cung cấp AI cụ thể)

---

### ARCHITECTURE CŨNG PHẢI ĐI QUA VERIFICATION

Sau khi architecture decision được approved, implementation phải chứng minh rằng nó tuân thủ.

Ví dụ rule:

> Business layer cannot access **UI layer** (lớp giao diện và trạng thái tương tác trực tiếp với người dùng).

Ta có thể kiểm tra bằng:

- **static analysis** (phân tích code hoặc cấu trúc hệ thống mà không cần chạy toàn bộ ứng dụng);
- **dependency graph** (đồ thị thể hiện quan hệ phụ thuộc giữa các thành phần);
- **architecture tests** (các bài kiểm tra dùng để xác nhận code vẫn tuân thủ các quy tắc kiến trúc);
- code review;
- build checks.

Khi đó architecture không còn là một document nằm trên shelf.

Nó trở thành:

> **Executable Constraint** (ràng buộc kiến trúc được chuyển thành điều kiện có thể kiểm tra tự động).

Đây là một bước rất quan trọng trong AI Engineering.

Nếu architecture chỉ nằm trong PDF mà không được kiểm tra, AI có thể vô tình vi phạm nó.

---

### TÔI BẮT ĐẦU NGHĨ VỀ ARCHITECTURE COMPLIANCE

Tôi muốn có một câu hỏi trước khi merge:

> “Does this change comply with the **architecture rules** (các quy tắc xác định những ràng buộc mà kiến trúc và code phải tuân theo)?”

Không chỉ:

> “Does the test pass?”

Mà:

```text
Task
 ↓
Change
 ├── Functional Verification
 ├── Security Verification
 ├── Regression Verification
 └── Architecture Compliance
```

Một change có thể pass functional tests nhưng fail architecture compliance.

Khi đó:

> **Không merge.**

---

### ĐÂY LÀ ĐIỂM AI TRỞ THÀNH ARCHITECTURE ASSISTANT THỰC SỰ

AI có thể làm một việc cực kỳ hữu ích:

> **Continuously check whether its own changes violate project architecture.**

Nó có thể nói:

> “This implementation works functionally, but it introduces a dependency that violates ARCH-RULE-004.”

Đó là behavior tôi muốn.

Không phải AI tự quyết định architecture.

Mà AI giúp con người **giữ architecture đã quyết định**.

---

### ARCHITECTURE KHÔNG PHẢI ĐỂ NGĂN AI

Đây là điểm cuối tôi muốn làm rõ.

Có thể nhìn **architecture governance** (cơ chế quản trị và kiểm soát các quyết định, thay đổi và tuân thủ kiến trúc) như một cái phanh.

Tôi lại nhìn nó như:

> **Lane markings on a high-speed road.**

AI chạy rất nhanh.

Nếu không có lane:

> tốc độ càng cao, rủi ro càng lớn.

Có lane:

> tốc độ cao trở thành lợi thế.

Đó chính là tinh thần của toàn bộ cuốn sách.

Không phải:

> **Slow AI down.**

Mà:

> **Give AI a safe path to move fast.**

---

### ENGINEERING NOTE

Khi AI đề xuất một architecture rất đẹp, đừng chỉ hỏi:

> “Can this work?”

Hãy hỏi:

> **“What problem does this complexity solve?”**

Nếu câu trả lời không rõ, hãy hỏi tiếp:

> **“What is the simplest architecture that satisfies the same requirements?”**

Và nếu architecture hiện tại đã tồn tại, hãy hỏi:

> **“What architectural boundary would this change cross?”**

Ba câu hỏi này có thể cứu bạn khỏi rất nhiều architecture debt.

---

### TRY THIS

Lần tới AI đề xuất architecture, yêu cầu nó tạo một **Architecture Decision Brief** (bản tóm tắt quyết định kiến trúc gồm vấn đề, ràng buộc, phương án, đánh đổi và cách kiểm chứng) gồm:

```text
Problem
Constraints
Requirements
Options
Trade-offs
Recommended Option
Why Not The Alternatives
Security Impact
Operational Impact
Failure Modes
Migration Cost
Verification Strategy
```

Sau đó **đừng để AI tự approve**.

Bạn quyết định.

Nếu cần, yêu cầu AI phản biện chính recommendation của nó.

Một câu prompt rất đơn giản:

> **“Now argue against your own recommendation.”**

Đôi khi câu trả lời thứ hai có giá trị hơn câu đầu tiên.

---

### WHAT I LEARNED

Tôi từng nghĩ architecture là thứ mà những developer giàu kinh nghiệm phải tự làm vì AI chưa đủ thông minh.

Bây giờ tôi không nghĩ vậy.

AI có thể tham gia architecture rất sâu.

Thậm chí AI có thể giúp tôi:

> **phân tích nhiều phương án tốt hơn và nhanh hơn trước đây.**

Nhưng tôi cũng không muốn giao architecture cho AI.

Không phải vì AI không đủ khả năng.

Mà vì:

> **Architecture decisions create consequences that belong to the project owner and the engineering organization.**

AI không phải người phải sống với architecture đó trong những năm tiếp theo.

Tôi thì có thể.
Team của tôi có thể.
Người dùng của tôi có thể.

Vì vậy:

> **AI may design with me. AI may challenge me. AI may implement the architecture. But architecture authority remains human-governed.**

---

### TAKEAWAY

AI làm thay đổi rất nhiều thứ trong software development.

Nhưng có một thứ tôi càng ngày càng tin chắc:

> **The more capable the Executor becomes, the more important the boundaries become.**

Architecture là một trong những boundaries quan trọng nhất.

Nó quyết định:

- component nào được nói chuyện với component nào;
- data đi đâu;
- security boundary nằm ở đâu;
- dependency nào được phép;
- failure lan đến đâu;
- hệ thống có thể evolve thế nào.

AI có thể viết code bên trong những boundaries đó.

AI có thể đề xuất thay đổi boundaries.

AI có thể chứng minh trade-offs.

Nhưng:

> **AI should not silently redefine the system it is supposed to execute.**

Đó là ranh giới giữa:

**AI-assisted engineering** (kỹ thuật phần mềm do con người dẫn dắt và được AI hỗ trợ)

và

**AI-controlled engineering** (kỹ thuật phần mềm trong đó AI tự quyết định phần lớn hướng và thay đổi của hệ thống).

Tôi muốn cái đầu tiên.

---

### CHUYỂN SANG CHƯƠNG 17

Nhưng architecture vẫn chưa phải điểm cuối.

Tôi có thể có:

- **Product Intent** (ý định sản phẩm, điều sản phẩm thực sự muốn đạt được cho người dùng);
- Task;
- **Context** (ngữ cảnh gồm thông tin, trạng thái và quy tắc cần thiết để thực hiện công việc);
- **Authority** (quyền được phép đưa ra hoặc thực hiện một quyết định trong phạm vi xác định);
- **Architecture** (kiến trúc tổ chức các thành phần và quan hệ của hệ thống);
- Code;
- **Tests** (các bài kiểm thử dùng để kiểm tra hành vi của phần mềm);
- **Evidence** (bằng chứng cho thấy một điều đã xảy ra, đã được kiểm tra hoặc có thể xác minh);
- **State** (trạng thái mô tả hệ thống hoặc công việc đang ở mức nào);
- **Continuity** (khả năng project tiếp tục công việc mà không phụ thuộc vào một phiên làm việc cụ thể).

Mọi thứ có vẻ đã rất chặt chẽ.

Nhưng khi đưa software ra production, tôi phát hiện một sự thật khác:

> **Một hệ thống có thể được xây đúng và vẫn vận hành sai.**

Có những lỗi chỉ xuất hiện sau deployment.

Có những vấn đề không thể phát hiện trong development environment.

Có những thứ chỉ người dùng thật mới phát hiện.

Và có những thay đổi mà AI hoàn toàn có thể thực hiện đúng về mặt kỹ thuật…

nhưng lại không nên được phép triển khai mà không có một con người đứng sau quyết định.

Tôi bắt đầu phải trả lời một câu hỏi khó hơn:

> **“Ai thực sự có quyền nói rằng software này đã sẵn sàng để đi vào thế giới thật?”**

Đó không còn chỉ là câu hỏi về testing.

Đó là câu hỏi về:

**Verification**. **Governance** (cơ chế quản trị xác định quyền hạn, trách nhiệm, quy tắc và kiểm soát). **Release** (việc đưa một thay đổi đã được phê duyệt tới người dùng hoặc môi trường vận hành). **Accountability** (trách nhiệm chịu hậu quả và giải trình đối với quyết định).

Và đó là nơi tôi bắt đầu hiểu sâu hơn một điều:

> **Shipping software is not the same as deploying code.**

<!--
APPROVED PRIMARY NAVIGATION TREE

CHƯƠNG 16 - ARCHITECTURE VẪN LÀ TRÁCH NHIỆM CỦA TÔI
├── ARCHITECTURE PHẢI PHÙ HỢP VỚI PROBLEM
├── ARCHITECTURE DECISION THUỘC VỀ CON NGƯỜI
├── FAILURE, DEBT VÀ ARCHITECTURE GOVERNANCE
├── ARCHITECTURE PHẢI CÓ THỂ EVOLVE
└── TỪ ARCHITECTURE RULES ĐẾN ARCHITECTURE COMPLIANCE

Navigation metadata only. It does not control PDF coordinates or typography.
-->
