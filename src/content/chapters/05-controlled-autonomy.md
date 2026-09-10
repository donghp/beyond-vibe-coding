---
id: "05-controlled-autonomy"
title: "AI CÓ THỂ LÀM. NHƯNG AI CÓ ĐƯỢC PHÉP LÀM KHÔNG?"
subtitle: "Từ Task Decomposition đến Execution Contract và Controlled Autonomy"
shortTitle: "AI có thể làm. Nhưng AI có được phép ..."
order: 5
description: "Từ Task Decomposition đến Execution Contract và Controlled Autonomy: thiết lập ranh giới kiểm soát cho AI."
readingTime: "~ 10 phút đọc"
topics: ["Task Decomposition", "Execution Contract", "Controlled Autonomy", "Authority Boundaries", "Verification"]
hero: "images/chapter-05-hero.webp"
published: "2026-09-09"
publicationStatus: "published"
contentStatus: "partial"
updated: "09/2025"
version: "1.0.0"
---

<div class="goal-card select-none">
  <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#15803d] mb-1.5">
    <svg class="w-4 h-4 text-[#16a34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
    <span>Mục tiêu của chương này</span>
  </div>
  <p class="text-sm text-[#166534] leading-relaxed font-normal mb-0">
    Hiểu cách biến một ý tưởng lớn thành các task nhỏ, có ranh giới rõ ràng, có quyền hạn rõ ràng, và có cơ chế kiểm soát phù hợp – để AI có thể làm nhiều hơn, nhưng vẫn an toàn và đúng hướng.
  </p>
</div>

## Chuyện tiếp: Bối cảnh và câu hỏi lớn

Ở cuối chương trước, tôi đã nói về một vấn đề mà lúc đó tôi chưa nhìn thấy hết: biết đúng context chưa đủ.

Tôi đã có một cách để project giữ lại knowledge và state.
Tôi cũng bắt đầu có một cách để chọn đúng context cho từng task.
Nhưng ngay cả khi AI có đúng context, vẫn còn một câu hỏi lớn:

> **“AI đang được phép làm đến đâu?”**

Một task có thể rất rõ.
Context có thể rất đúng.
AI có thể rất mạnh.
Nhưng nếu scope của task quá rộng, AI vẫn có thể thay đổi nhiều hơn tôi muốn.

Đó là lúc tôi bắt đầu nhìn nghiêm túc hơn vào Task Decomposition, Execution Contract và Controlled Autonomy.
Bởi vì biết đúng thứ cần làm chưa đủ.
AI còn phải biết được phép làm gì.
Và đó là câu chuyện của Chương 5.

## Một task càng lớn, AI càng phải đoán nhiều

Khi bạn giao cho AI một task quá rộng, chẳng hạn như *"hãy refactor lại toàn bộ authentication và tích hợp permission"*, AI sẽ phải đưa ra hàng chục quyết định ngầm mà bạn không hề biết trước.

Mỗi quyết định ngầm là một nguy cơ trôi dạt kiến trúc (architectural drift). Càng nhiều dòng code được sinh ra cùng một lúc, xác suất xuất hiện lỗi tiềm ẩn và code thừa càng cao.

## Task decomposition

Chia nhỏ task không chỉ đơn thuần là cắt nhỏ công việc theo thời gian. Trong làm việc với AI, Task Decomposition là kỹ thuật cô lập ranh giới ảnh hưởng:

1. **Atomic Responsibility:** Mỗi prompt chỉ giải quyết đúng một thành phần hoặc một function cụ thể.
2. **Predictable Scope:** Giới hạn rõ file nào được phép đọc, file nào được phép sửa, và file nào tuyệt đối không được chạm vào.
3. **Continuous Feedback:** Sau mỗi task nhỏ, luôn có bước biên dịch hoặc kiểm thử để xác nhận trạng thái trước khi tiếp tục.

## Capability does not create authority

Một sai lầm phổ biến khi dùng AI là nhầm lẫn giữa **khả năng** (capability) và **quyền hạn** (authority). 

AI có khả năng viết lại toàn bộ cấu trúc database, nhưng AI không có quyền hạn tự ý làm việc đó mà không có hợp đồng cam kết từ con người.

## Controlled autonomy

Controlled Autonomy (Tự chủ có kiểm soát) là trạng thái lý tưởng trong AI Engineering:

- Cho phép AI tự động thực thi các tác vụ lặp lại và suy luận cục bộ.
- Thiết lập hàng rào bảo vệ (guardrails) nghiêm ngặt để ngăn chặn hành vi vượt thẩm quyền.
- Duy trì vai trò của con người là người phê duyệt và định hướng kiến trúc.

## Task decomposition không chỉ giảm rủi ro. Nó tăng tốc

Nhiều người nghĩ rằng chia nhỏ task làm chậm tiến độ. Thực tế hoàn toàn ngược lại: khi một task nhỏ bị lỗi, bạn chỉ mất 30 giây để hoàn tác hoặc sửa lỗi. Nhưng khi một task khổng lồ sinh ra 20 file lỗi đan xen, bạn có thể mất cả buổi chiều để gỡ rối.

