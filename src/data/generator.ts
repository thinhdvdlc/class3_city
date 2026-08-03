import { Question, Subject, questions as staticQuestions } from './questions';

export type TopicId = 
  | 'math_mul_table'
  | 'math_mul' 
  | 'math_div' 
  | 'math_add_sub'
  | 'vn_vocab'
  | 'vn_grammar'
  | 'en_vocab'
  | 'en_grammar';

export interface Topic {
  id: TopicId;
  subject: Subject;
  title: string;
  description: string;
}

export const TOPICS: Topic[] = [
  { id: 'math_add_sub', subject: 'math', title: 'Phép Cộng & Trừ', description: 'Ôn tập cộng trừ trong phạm vi 1000' },
  { id: 'math_mul_table', subject: 'math', title: 'Bảng Cửu Chương', description: 'Ôn nhẩm bảng nhân từ 2 đến 9' },
  { id: 'math_mul', subject: 'math', title: 'Phép Nhân Nâng Cao', description: 'Nhân số có 2 chữ số với số có 1 chữ số' },
  { id: 'math_div', subject: 'math', title: 'Phép Chia', description: 'Chia hết trong phạm vi 1000' },
  
  { id: 'vn_vocab', subject: 'vietnamese', title: 'Luyện Từ Vựng', description: 'Từ đồng nghĩa, trái nghĩa, chính tả' },
  { id: 'vn_grammar', subject: 'vietnamese', title: 'Luyện Câu', description: 'Cấu trúc câu, thành phần câu' },
  
  { id: 'en_vocab', subject: 'english', title: 'Vocabulary', description: 'Từ vựng chủ đề Động vật, Đồ vật, Màu sắc' },
  { id: 'en_grammar', subject: 'english', title: 'Grammar', description: 'Cấu trúc ngữ pháp cơ bản' },
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// ==========================================
// BỘ SINH CÂU HỎI TOÁN (DYNAMIC GENERATORS)
// ==========================================

const generateMathAddSub = (): Question => {
  const isAdd = Math.random() > 0.5;
  const a = getRandomInt(100, 999);
  const b = getRandomInt(10, a - 1); // Đảm bảo b < a để trừ không âm
  
  const ans = isAdd ? a + b : a - b;
  const operator = isAdd ? '+' : '-';

  const options = new Set<number>();
  options.add(ans);
  while (options.size < 4) {
    const fake = ans + getRandomInt(-30, 30);
    if (fake !== ans && fake > 0) options.add(fake);
  }
  
  const optionsArr = Array.from(options).sort(() => Math.random() - 0.5);
  
  return {
    id: `math_add_sub_${Date.now()}_${Math.random()}`,
    subject: 'math',
    text: `Kết quả của phép tính: ${a} ${operator} ${b} = ?`,
    options: optionsArr.map(String),
    correctAnswer: optionsArr.indexOf(ans)
  };
};

const generateMathMulTable = (): Question => {
  const a = getRandomInt(2, 9);
  const b = getRandomInt(2, 9);
  const ans = a * b;
  
  const options = new Set<number>();
  options.add(ans);
  while (options.size < 4) {
    // Tạo đáp án nhiễu dễ nhầm lẫn trong bảng cửu chương
    let fakeAns = (a + getRandomInt(-1, 1)) * (b + getRandomInt(-1, 1));
    if (fakeAns <= 0) fakeAns = ans + getRandomInt(-5, 5);
    if (fakeAns !== ans && fakeAns > 0) options.add(fakeAns);
  }
  
  const optionsArr = Array.from(options).sort(() => Math.random() - 0.5);
  
  return {
    id: `math_mul_table_${Date.now()}_${Math.random()}`,
    subject: 'math',
    text: `Tính nhẩm: ${a} x ${b} = ?`,
    options: optionsArr.map(String),
    correctAnswer: optionsArr.indexOf(ans)
  };
};

const generateMathMul = (): Question => {
  const a = getRandomInt(11, 99);
  const b = getRandomInt(2, 9);
  const ans = a * b;
  
  const options = new Set<number>();
  options.add(ans);
  while (options.size < 4) {
    const fake = ans + getRandomInt(-20, 20);
    if (fake !== ans && fake > 0) options.add(fake);
  }
  
  const optionsArr = Array.from(options).sort(() => Math.random() - 0.5);
  
  return {
    id: `math_mul_${Date.now()}_${Math.random()}`,
    subject: 'math',
    text: `Kết quả của phép tính: ${a} x ${b} = ?`,
    options: optionsArr.map(String),
    correctAnswer: optionsArr.indexOf(ans)
  };
};

const generateMathDiv = (): Question => {
  const b = getRandomInt(2, 9);
  const ans = getRandomInt(11, 111); // Thương số
  const a = b * ans; // Số bị chia
  
  const options = new Set<number>();
  options.add(ans);
  while (options.size < 4) {
    const fake = ans + getRandomInt(-15, 15);
    if (fake !== ans && fake > 0) options.add(fake);
  }
  
  const optionsArr = Array.from(options).sort(() => Math.random() - 0.5);
  
  return {
    id: `math_div_${Date.now()}_${Math.random()}`,
    subject: 'math',
    text: `Kết quả của phép tính: ${a} : ${b} = ?`,
    options: optionsArr.map(String),
    correctAnswer: optionsArr.indexOf(ans)
  };
};

// ==========================================
// EXPORT HÀM SINH CÂU HỎI CHÍNH
// ==========================================
export const generateQuestion = (topicId: TopicId): Question => {
  switch (topicId) {
    case 'math_add_sub': return generateMathAddSub();
    case 'math_mul_table': return generateMathMulTable();
    case 'math_mul': return generateMathMul();
    case 'math_div': return generateMathDiv();
    
    // Đối với Tiếng Việt và Tiếng Anh, bốc ngẫu nhiên từ data cứng (giả lập)
    case 'vn_vocab': 
    case 'vn_grammar': {
      const vnQuestions = staticQuestions.filter(q => q.subject === 'vietnamese');
      return vnQuestions[getRandomInt(0, vnQuestions.length - 1)];
    }
    case 'en_vocab':
    case 'en_grammar': {
      const enQuestions = staticQuestions.filter(q => q.subject === 'english');
      return enQuestions[getRandomInt(0, enQuestions.length - 1)];
    }
    default:
      return generateMathAddSub();
  }
};
