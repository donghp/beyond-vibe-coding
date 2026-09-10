import fs from 'fs';
import path from 'path';

export interface VisualCandidate {
  id: string;
  sourceSection: string;
  anchor: string;
  whyVisual: string;
  grammar: string;
  medium: 'SVG' | 'HTML' | 'Hybrid';
  composition: string;
  expectedBenefit: string;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH';
  priority: number; // 1-5 scale (1 is highest)
}

export interface ChapterReviewReport {
  chapterId: string;
  chapterTitle: string;
  detectedPatterns: string[];
  recommendations: VisualCandidate[];
}

/**
 * Perform a semantic pattern-matching analysis on a chapter's markdown source code.
 */
export function analyzeChapterForVisuals(chapterId: string): ChapterReviewReport | null {
  const chapterPath = path.join(process.cwd(), 'src/content/chapters', `${chapterId}.md`);
  if (!fs.existsSync(chapterPath)) {
    return null;
  }

  const content = fs.readFileSync(chapterPath, 'utf-8');
  
  // Extract title
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const chapterTitle = titleMatch ? titleMatch[1] : chapterId;

  const detectedPatterns: string[] = [];
  const recommendations: VisualCandidate[] = [];

  // Lightweight semantic heuristic pattern detection
  const hasSequentialSteps = /bước|quy trình|vòng lặp|giai đoạn|flow|sau đó/i.test(content);
  const hasPermissions = /cho phép|quyền|giới hạn|ngăn chặn|cấm|action scope|authority/i.test(content);
  const hasComparisons = /khác biệt|so với|thay vì|ngược lại|đối lập|vs/i.test(content);
  const hasDecisionPoints = /quyết định|lựa chọn|nếu|trường hợp|decision/i.test(content);

  if (hasSequentialSteps) detectedPatterns.push('Sequential Process (Spine / Flow)');
  if (hasPermissions) detectedPatterns.push('Permission Boundaries (Action Scope)');
  if (hasComparisons) detectedPatterns.push('Horizontal Comparison Rail');
  if (hasDecisionPoints) detectedPatterns.push('Condition/Decision Point');

  // Let's seed professional, non-automated editorial recommendations for the specific chapter
  if (chapterId === '01-vibe-coding') {
    recommendations.push({
      id: 'V01-01',
      sourceSection: 'VIBE CODING LÀ GÌ?',
      anchor: 'Vibe coding là trạng thái viết code bằng cảm xúc...',
      whyVisual: 'Trực quan hóa sự tương phản giữa code truyền thống (logical/structural control) và vibe coding (conversational generation).',
      grammar: 'VG-W12 — Comparison Rail',
      medium: 'SVG',
      composition: 'Hai cột đối xứng thể hiện tốc độ, mức độ kiểm soát và hành vi sửa lỗi giữa hai thái cực.',
      expectedBenefit: 'Giúp người đọc định vị ngay lập tức định nghĩa cốt lõi của vibe coding.',
      complexity: 'LOW',
      priority: 1
    });
  } else if (chapterId === '02-working-with-ai') {
    recommendations.push({
      id: 'V02-01',
      sourceSection: 'LÀM VIỆC VỚI AI NHƯ MỘT NGƯỜI CÓ CHỦ ĐÍCH',
      anchor: 'Làm việc có chủ đích bắt đầu từ khâu thiết lập mục tiêu...',
      whyVisual: 'Mô hình hóa vòng lặp con người ra chỉ thị (Intent) -> AI thực thi (Execution) -> Con người phê duyệt (Approval).',
      grammar: 'VG-W15 — Human / AI Boundary',
      medium: 'SVG',
      composition: 'Một trục đứng chia hai nửa Human và AI, nối nhau bằng các đường ranh giới trách nhiệm rõ ràng.',
      expectedBenefit: 'Nhấn mạnh vai trò kiểm soát tối thượng của con người (Human-in-the-loop).',
      complexity: 'MEDIUM',
      priority: 1
    });
  } else if (chapterId === '03-ai-does-not-remember') {
    recommendations.push({
      id: 'V03-01',
      sourceSection: 'AI KHÔNG NHỚ PROJECT CỦA BẠN',
      anchor: 'Context cửa sổ của AI trôi dần đi sau mỗi lượt chat...',
      whyVisual: 'Trực quan hóa sự suy giảm context (context drift) khi cửa sổ chat kéo dài và dữ liệu cũ bị đẩy khỏi bộ nhớ đệm.',
      grammar: 'VG-W14 — Highlighted Transition',
      medium: 'SVG',
      composition: 'Một phễu dốc xuống thể hiện lượng context hữu dụng giảm dần theo số lượng token nạp vào.',
      expectedBenefit: 'Chứng minh bằng hình ảnh lý do tại sao các phiên làm việc dài lại kém hiệu quả.',
      complexity: 'LOW',
      priority: 2
    });
  } else if (chapterId === '04-context') {
    recommendations.push({
      id: 'V04-01',
      sourceSection: 'AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT.',
      anchor: 'Thiết lập cấu trúc thư mục rõ ràng là cách cung cấp context tự nhiên tốt nhất...',
      whyVisual: 'Minh họa cách gom nhóm các file quan trọng thành một Context Map sạch thay vì truyền tải bừa bãi toàn bộ source code.',
      grammar: 'VG-W13 — Nested System Frame',
      medium: 'SVG',
      composition: 'Sơ đồ tổ chức phân mảnh các module và cách khoanh vùng context cần thiết cho một task cụ thể.',
      expectedBenefit: 'Giải thích trực quan khái niệm Least Privilege Context.',
      complexity: 'MEDIUM',
      priority: 1
    });
  }

  return {
    chapterId,
    chapterTitle,
    detectedPatterns,
    recommendations: recommendations.slice(0, 3) // Return max 3 recommendations as requested
  };
}
