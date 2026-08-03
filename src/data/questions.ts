export type Subject = 'math' | 'vietnamese' | 'english';

export interface Question {
  id: string;
  subject: Subject;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
}

export const questions: Question[] = [
  // ==========================================
  // TOÁN HỌC - LỚP 3
  // ==========================================
  { 
    id: 'm1', 
    subject: 'math', 
    text: 'Kết quả của phép tính 25 + 47 là bao nhiêu?', 
    options: ['62', '72', '82', '52'], 
    correctAnswer: 1 
  },
  { 
    id: 'm2', 
    subject: 'math', 
    text: 'Một hình vuông có cạnh dài 5cm. Chu vi của hình vuông đó là:', 
    options: ['25cm', '15cm', '20cm', '10cm'], 
    correctAnswer: 2 
  },
  { 
    id: 'm3', 
    subject: 'math', 
    text: 'Có 36 học sinh chia đều vào 4 tổ. Hỏi mỗi tổ có mấy học sinh?', 
    options: ['8', '7', '10', '9'], 
    correctAnswer: 3 
  },
  { 
    id: 'm4', 
    subject: 'math', 
    text: 'Số liền trước của 1000 là số nào?', 
    options: ['990', '999', '1001', '900'], 
    correctAnswer: 1 
  },
  { 
    id: 'm5', 
    subject: 'math', 
    text: '7 mét bằng bao nhiêu centimet?', 
    options: ['70cm', '700cm', '7000cm', '17cm'], 
    correctAnswer: 1 
  },

  // ==========================================
  // TIẾNG VIỆT - LỚP 3 (Trạng Nguyên Tiếng Việt)
  // ==========================================
  { 
    id: 'v1', 
    subject: 'vietnamese', 
    text: 'Trong câu "Bé đang đọc sách", từ nào là động từ?', 
    options: ['Bé', 'đang', 'đọc', 'sách'], 
    correctAnswer: 2 
  },
  { 
    id: 'v2', 
    subject: 'vietnamese', 
    text: 'Từ nào đồng nghĩa với từ "thông minh"?', 
    options: ['Sáng dạ', 'Ngu ngốc', 'Lười biếng', 'Khỏe mạnh'], 
    correctAnswer: 0 
  },
  { 
    id: 'v3', 
    subject: 'vietnamese', 
    text: 'Bộ phận trả lời cho câu hỏi "Làm gì?" trong câu: "Đàn cò đang bay lượn trên cánh đồng" là:', 
    options: ['Đàn cò', 'đang bay lượn', 'trên cánh đồng', 'đang bay lượn trên cánh đồng'], 
    correctAnswer: 3 
  },
  { 
    id: 'v4', 
    subject: 'vietnamese', 
    text: 'Từ nào dưới đây viết ĐÚNG chính tả?', 
    options: ['Xắp sếp', 'Sắp xếp', 'Sắp sếp', 'Xắp xếp'], 
    correctAnswer: 1 
  },
  { 
    id: 'v5', 
    subject: 'vietnamese', 
    text: 'Câu nào dưới đây có sử dụng hình ảnh so sánh?', 
    options: ['Mặt trời mọc ở đằng Đông.', 'Mắt ong đen nhánh như hạt cườm.', 'Hoa hồng nở rực rỡ.', 'Tiếng suối chảy róc rách.'], 
    correctAnswer: 1 
  },

  // ==========================================
  // TIẾNG ANH - LỚP 3
  // ==========================================
  { 
    id: 'e1', 
    subject: 'english', 
    text: 'What color is the sky?', 
    options: ['Red', 'Green', 'Blue', 'Yellow'], 
    correctAnswer: 2 
  },
  { 
    id: 'e2', 
    subject: 'english', 
    text: 'How do you say "Xin chào" in English?', 
    options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], 
    correctAnswer: 1 
  },
  { 
    id: 'e3', 
    subject: 'english', 
    text: 'Choose the correct sentence:', 
    options: ['He are a student.', 'She am a teacher.', 'I is a doctor.', 'They are my friends.'], 
    correctAnswer: 3 
  },
  { 
    id: 'e4', 
    subject: 'english', 
    text: 'What is this animal? (It has 4 legs and goes "Meow")', 
    options: ['Dog', 'Cat', 'Bird', 'Fish'], 
    correctAnswer: 1 
  },
  { 
    id: 'e5', 
    subject: 'english', 
    text: 'Translate to English: "Tôi thích ăn táo"', 
    options: ['I like to eat apples.', 'I like eating banana.', 'He likes apples.', 'You eat an apple.'], 
    correctAnswer: 0 
  }
];
