export interface CanonicalBookItem {
  id: string;
  order: number;
  section: 'front-matter' | 'chapter' | 'conclusion' | 'back-matter';
  title: string;
  shortTitle: string;
  slug: string;
  publicationStatus: 'unpublished' | 'published' | 'archived';
  contentStatus: 'draft' | 'partial' | 'complete' | 'final';
  hasManuscript: boolean;
}

export const CANONICAL_BOOK_MAP: Omit<CanonicalBookItem, 'hasManuscript'>[] = [
  // Front Matter
  {
    id: '00-loi-mo-dau',
    order: 0,
    section: 'front-matter',
    title: 'LỜI MỞ ĐẦU',
    shortTitle: 'Lời Mở Đầu',
    slug: '00-loi-mo-dau',
    publicationStatus: 'published',
    contentStatus: 'complete',
  },
  // Chapters 1 - 21
  {
    id: '01-vibe-coding',
    order: 1,
    section: 'chapter',
    title: 'CHƯƠNG 1 — TÔI MUỐN XÂY MỘT PHẦN MỀM',
    shortTitle: 'Tôi muốn xây một phần mềm',
    slug: '01-vibe-coding',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '02-working-with-ai',
    order: 2,
    section: 'chapter',
    title: 'CHƯƠNG 2 — AI MẠNH HƠN KHÔNG CÓ NGHĨA LÀ BẠN SẼ ĐI NHANH HƠN',
    shortTitle: 'AI mạnh hơn không có nghĩa là đi nhanh hơn',
    slug: '02-working-with-ai',
    publicationStatus: 'published',
    contentStatus: 'complete',
  },
  {
    id: '03-ai-does-not-remember',
    order: 3,
    section: 'chapter',
    title: 'CHƯƠNG 3 — AI KHÔNG NHỚ PROJECT CỦA BẠN',
    shortTitle: 'AI không nhớ project của bạn',
    slug: '03-ai-does-not-remember',
    publicationStatus: 'published',
    contentStatus: 'complete',
  },
  {
    id: '04-context',
    order: 4,
    section: 'chapter',
    title: 'CHƯƠNG 4 — AI KHÔNG CHỈ CẦN CONTEXT. AI CẦN ĐÚNG CONTEXT.',
    shortTitle: 'AI không chỉ cần context. AI cần đúng context.',
    slug: '04-context',
    publicationStatus: 'published',
    contentStatus: 'complete',
  },
  {
    id: '05-controlled-autonomy',
    order: 5,
    section: 'chapter',
    title: 'CHƯƠNG 5 — AI CÓ THỂ LÀM. NHƯNG AI CÓ ĐƯỢC PHÉP LÀM KHÔNG?',
    shortTitle: 'AI có thể làm. Nhưng AI có được phép làm không?',
    slug: '05-controlled-autonomy',
    publicationStatus: 'published',
    contentStatus: 'complete',
  },
  {
    id: '06-prototype-to-production',
    order: 6,
    section: 'chapter',
    title: 'CHƯƠNG 6 — KHI AI HẾT QUOTA, PROJECT KHÔNG ĐƯỢC DỪNG',
    shortTitle: 'Khi AI hết quota, project không được dừng',
    slug: '06-prototype-to-production',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '07-verification',
    order: 7,
    section: 'chapter',
    title: 'CHƯƠNG 7 — NHIỀU AI, MỘT CÁCH LÀM VIỆC',
    shortTitle: 'Nhiều AI, một cách làm việc',
    slug: '07-verification',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '08-ai-and-developers',
    order: 8,
    section: 'chapter',
    title: 'CHƯƠNG 8 — AI KHÔNG NÊN TỰ ĐIỀU KHIỂN PROJECT',
    shortTitle: 'AI không nên tự điều khiển project',
    slug: '08-ai-and-developers',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '09-toi-khong-muon-viet-prompt',
    order: 9,
    section: 'chapter',
    title: 'CHƯƠNG 9 — TÔI KHÔNG MUỐN VIẾT PROMPT DÀI HƠN. TÔI MUỐN AI NHẬN ĐÚNG THỨ NÓ CẦN',
    shortTitle: 'Tôi không muốn viết prompt dài hơn',
    slug: '09-toi-khong-muon-viet-prompt',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '10-toi-khong-muon-ai-lam-nhieu',
    order: 10,
    section: 'chapter',
    title: 'CHƯƠNG 10 — TÔI KHÔNG MUỐN AI LÀM NHIỀU HƠN. TÔI MUỐN AI LÀM ĐÚNG PHẦN VIỆC CỦA NÓ',
    shortTitle: 'Tôi không muốn AI làm nhiều hơn',
    slug: '10-toi-khong-muon-ai-lam-nhieu',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '11-ai-da-noi-done',
    order: 11,
    section: 'chapter',
    title: 'CHƯƠNG 11 — AI ĐÃ NÓI “DONE”. NHƯNG TÔI KHÔNG TIN',
    shortTitle: 'AI đã nói "Done". Nhưng tôi không tin',
    slug: '11-ai-da-noi-done',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '12-toi-khong-xay-memory',
    order: 12,
    section: 'chapter',
    title: 'CHƯƠNG 12 — TÔI KHÔNG XÂY MEMORY CHO AI. TÔI XÂY CONTINUITY CHO PROJECT',
    shortTitle: 'Tôi không xây memory cho AI',
    slug: '12-toi-khong-xay-memory',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '13-toi-khong-muon-mot-ai-gioi',
    order: 13,
    section: 'chapter',
    title: 'CHƯƠNG 13 — TÔI KHÔNG MUỐN MỘT AI GIỎI HƠN. TÔI MUỐN PROJECT CÓ THỂ TIẾP TỤC',
    shortTitle: 'Tôi không muốn một AI giỏi hơn',
    slug: '13-toi-khong-muon-mot-ai-gioi',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '14-ai-co-the-viet-code',
    order: 14,
    section: 'chapter',
    title: 'CHƯƠNG 14 — AI CÓ THỂ VIẾT CODE. NHƯNG AI CÓ ĐANG XÂY SẢN PHẨM KHÔNG?',
    shortTitle: 'AI có thể viết code. Nhưng có đang xây sản phẩm?',
    slug: '14-ai-co-the-viet-code',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '15-nhung-loi-ai-khong-noi',
    order: 15,
    section: 'chapter',
    title: 'CHƯƠNG 15 — NHỮNG LỖI AI KHÔNG NÓI VỚI TÔI',
    shortTitle: 'Những lỗi AI không nói với tôi',
    slug: '15-nhung-loi-ai-khong-noi',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '16-architecture-van-la-trach-nhiem',
    order: 16,
    section: 'chapter',
    title: 'CHƯƠNG 16 — ARCHITECTURE VẪN LÀ TRÁCH NHIỆM CỦA TÔI',
    shortTitle: 'Architecture vẫn là trách nhiệm của tôi',
    slug: '16-architecture-van-la-trach-nhiem',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '17-ai-co-the-xay-duoc',
    order: 17,
    section: 'chapter',
    title: 'CHƯƠNG 17 — AI CÓ THỂ XÂY ĐƯỢC. NHƯNG AI CÓ QUYỀN CHO PHÉP RELEASE?',
    shortTitle: 'AI có thể xây được. Nhưng ai có quyền release?',
    slug: '17-ai-co-the-xay-duoc',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '18-toi-khong-thuc-su-dung',
    order: 18,
    section: 'chapter',
    title: 'CHƯƠNG 18 — TÔI KHÔNG THỰC SỰ DỪNG VIBE CODING',
    shortTitle: 'Tôi không thực sự dừng vibe coding',
    slug: '18-toi-khong-thuc-su-dung',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '19-tu-local-project-den-real',
    order: 19,
    section: 'chapter',
    title: 'CHƯƠNG 19 — TỪ LOCAL PROJECT ĐẾN REAL PRODUCT',
    shortTitle: 'Từ local project đến real product',
    slug: '19-tu-local-project-den-real',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '20-toi-dua-enerixfin-ra-khoi',
    order: 20,
    section: 'chapter',
    title: 'CHƯƠNG 20 — TÔI ĐƯA ENERIXFIN RA KHỎI LAPTOP',
    shortTitle: 'Tôi đưa EnerixFin ra khỏi laptop',
    slug: '20-toi-dua-enerixfin-ra-khoi',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: '21-khach-hang-dau-tien-khong-mua',
    order: 21,
    section: 'chapter',
    title: 'CHƯƠNG 21 — KHÁCH HÀNG ĐẦU TIÊN KHÔNG MUA CODE',
    shortTitle: 'Khách hàng đầu tiên không mua code',
    slug: '21-khach-hang-dau-tien-khong-mua',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  // Closing / Back Matter
  {
    id: 'tong-ket',
    order: 22,
    section: 'conclusion',
    title: 'TỔNG KẾT — NẾU HÔM NAY TÔI BẮT ĐẦU LẠI',
    shortTitle: 'Tổng kết: Nếu hôm nay tôi bắt đầu lại',
    slug: 'tong-ket',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: 'loi-cam-on',
    order: 23,
    section: 'back-matter',
    title: 'LỜI CẢM ƠN',
    shortTitle: 'Lời Cảm Ơn',
    slug: 'loi-cam-on',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: 've-tac-gia',
    order: 24,
    section: 'back-matter',
    title: 'VỀ TÁC GIẢ',
    shortTitle: 'Về Tác Giả',
    slug: 've-tac-gia',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: 'du-an-thuc-te-enerixfin',
    order: 25,
    section: 'back-matter',
    title: 'DỰ ÁN THỰC TẾ ENERIXFIN',
    shortTitle: 'Dự án thực tế EnerixFin',
    slug: 'du-an-thuc-te-enerixfin',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: 'tai-nguyen',
    order: 26,
    section: 'back-matter',
    title: 'TÀI NGUYÊN',
    shortTitle: 'Tài Nguyên',
    slug: 'tai-nguyen',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
  {
    id: 'chi-muc',
    order: 27,
    section: 'back-matter',
    title: 'CHỈ MỤC',
    shortTitle: 'Chỉ Mục',
    slug: 'chi-muc',
    publicationStatus: 'unpublished',
    contentStatus: 'draft',
  },
];

import { getCollection } from 'astro:content';

export async function getCanonicalBookMap() {
  const chapters = await getCollection('chapters');
  const chapterMap = new Map();
  chapters.forEach(ch => {
    chapterMap.set(ch.id, ch);
    if (ch.data.id) {
      chapterMap.set(ch.data.id, ch);
    }
  });

  return CANONICAL_BOOK_MAP.map(item => {
    const liveChapter = chapterMap.get(item.id);
    const hasManuscript = !!liveChapter || (item.order >= 1 && item.order <= 8); // Chapters 0-8 have actual markdown files in src/content/chapters
    
    if (liveChapter) {
      return {
        ...item,
        title: liveChapter.data.title || item.title,
        shortTitle: liveChapter.data.shortTitle || item.shortTitle,
        publicationStatus: liveChapter.data.publicationStatus || item.publicationStatus,
        contentStatus: liveChapter.data.contentStatus || item.contentStatus,
        hasManuscript: true,
        liveEntry: liveChapter
      };
    }
    return {
      ...item,
      hasManuscript,
      liveEntry: null
    };
  });
}

export function getDerivedDisplayLabel(item: { publicationStatus: string; hasManuscript: boolean }) {
  if (item.publicationStatus === 'published') {
    return '';
  }
  if (item.publicationStatus === 'archived') {
    return 'LƯU TRỮ';
  }
  if (item.hasManuscript) {
    return 'ĐANG BIÊN TẬP';
  }
  return 'SẮP XUẤT BẢN';
}
