"use client";

// Tạo một AudioContext chung (khởi tạo lazy để tránh lỗi SSR)
let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

/**
 * Phát âm thanh Ting Ting (Chuỗi hợp âm) khi trả lời đúng
 */
export const playCorrectSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  
  // Phải resume context nếu nó đang bị suspend (Chính sách autoplay của trình duyệt)
  if (ctx.state === 'suspended') ctx.resume();

  const playNote = (frequency: number, startTime: number, duration: number, type: OscillatorType = 'sine') => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);
    
    // Envelope: Khởi đầu nhanh, tắt dần (Pluck sound)
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const now = ctx.currentTime;
  // Hợp âm trưởng (Major chord arpeggio) mang lại cảm giác tích cực, chiến thắng
  playNote(523.25, now, 0.4);        // C5
  playNote(659.25, now + 0.1, 0.4);  // E5
  playNote(783.99, now + 0.2, 0.4);  // G5
  playNote(1046.50, now + 0.3, 0.6); // C6
};

/**
 * Phát âm thanh Bzz Bzz trầm khi trả lời sai
 */
export const playWrongSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  
  if (ctx.state === 'suspended') ctx.resume();

  const playNote = (frequency: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Sawtooth tạo âm thanh răng cưa, rè ráp
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, startTime);
    
    // Envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    // Filter cho bớt chói (Lowpass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500; // Cắt tần số cao

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const now = ctx.currentTime;
  // Hai nốt trầm đi xuống tạo cảm giác thất bại
  playNote(150, now, 0.3);
  playNote(100, now + 0.15, 0.4);
};

/**
 * Âm thanh click nhẹ khi chọn đáp án (Tuỳ chọn)
 */
export const playClickSound = () => {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
};

// ==========================================
// NHẠC NỀN (BACKGROUND MUSIC)
// ==========================================
let bgmInterval: ReturnType<typeof setInterval> | null = null;
let isBgmPlaying = false;
let nextNoteTime = 0;
let currentNoteIndex = 0;

// Giai điệu lặp (Pentatonic scale: vui tươi, dễ nghe)
const melody = [
  261.63, // C4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  392.00, // G4
  329.63, // E4
  293.66, // D4
];

export const startBackgroundMusic = () => {
  const ctx = getContext();
  if (!ctx) return;
  if (isBgmPlaying) return;
  
  if (ctx.state === 'suspended') ctx.resume();
  isBgmPlaying = true;
  nextNoteTime = ctx.currentTime + 0.1;

  const scheduleNotes = () => {
    // Lên lịch trước 0.1s
    while (nextNoteTime < ctx.currentTime + 0.1) {
      const freq = melody[currentNoteIndex];
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Âm thanh dạng chuông/mộc cầm (sine, đánh nhẹ)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, nextNoteTime);
      
      // Âm lượng nhạc nền rất nhỏ (0.05) để không lấn át hiệu ứng
      gainNode.gain.setValueAtTime(0, nextNoteTime);
      gainNode.gain.linearRampToValueAtTime(0.05, nextNoteTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, nextNoteTime + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(nextNoteTime);
      osc.stop(nextNoteTime + 0.3);
      
      // Advance time and note (tốc độ 150 BPM = 0.4s mỗi nốt)
      nextNoteTime += 0.4;
      currentNoteIndex = (currentNoteIndex + 1) % melody.length;
    }
  };

  bgmInterval = setInterval(scheduleNotes, 25);
};

export const stopBackgroundMusic = () => {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  isBgmPlaying = false;
};

// ==========================================
// NHẠC NỀN THÀNH PHỐ (CITY BGM - VUI TƯƠI, NHÍ NHẢNH)
// ==========================================
let cityBgmInterval: ReturnType<typeof setInterval> | null = null;
let isCityBgmPlaying = false;
let nextCityNoteTime = 0;
let currentCityNoteIndex = 0;

// Giai điệu nhảy múa vui vẻ (Bouncy, Major scale)
const cityMelody = [
  523.25, // C5
  392.00, // G4
  392.00, // G4
  440.00, // A4
  392.00, // G4
  0,      // Nghỉ (Rest)
  493.88, // B4
  523.25, // C5
];

export const startCityBGM = () => {
  const ctx = getContext();
  if (!ctx) return;
  if (isCityBgmPlaying) return;
  
  if (ctx.state === 'suspended') ctx.resume();
  isCityBgmPlaying = true;
  nextCityNoteTime = ctx.currentTime + 0.1;

  const scheduleCityNotes = () => {
    while (nextCityNoteTime < ctx.currentTime + 0.1) {
      const freq = cityMelody[currentCityNoteIndex];
      
      if (freq > 0) {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Dùng sóng vuông pha tạp (square) kết hợp lowpass để tạo tiếng giống game 8-bit Mario
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, nextCityNoteTime);
        
        // Filter làm mềm tiếng square
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        
        // Envelope: Tiếng "Típ" rất nảy gọn, giống tiếng game thùng (bouncy)
        gainNode.gain.setValueAtTime(0, nextCityNoteTime);
        gainNode.gain.linearRampToValueAtTime(0.03, nextCityNoteTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, nextCityNoteTime + 0.15);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(nextCityNoteTime);
        osc.stop(nextCityNoteTime + 0.15);
      }
      
      // Nhịp độ nhanh, nhảy nhót (0.25 giây 1 nốt)
      nextCityNoteTime += 0.25;
      currentCityNoteIndex = (currentCityNoteIndex + 1) % cityMelody.length;
    }
  };

  cityBgmInterval = setInterval(scheduleCityNotes, 50);
};

export const stopCityBGM = () => {
  if (cityBgmInterval) {
    clearInterval(cityBgmInterval);
    cityBgmInterval = null;
  }
  isCityBgmPlaying = false;
};
