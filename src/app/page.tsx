"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Coins, Settings, ShoppingBag, Map, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { Subject } from '@/data/questions';
import { TopicId } from '@/data/generator';
import { TopicSelection } from '@/components/game/TopicSelection';
import { QuizSession } from '@/components/game/QuizSession';
import { startCityBGM, stopCityBGM } from '@/utils/sound';

export default function Home() {

  // Trạng thái (Level) của từng tòa nhà riêng biệt
  const [mathLevel, setMathLevel] = useState(1);
  const [vietnameseLevel, setVietnameseLevel] = useState(1);
  const [englishLevel, setEnglishLevel] = useState(1);
  
  // Tài sản của người chơi
  const [coins, setCoins] = useState(1250);

  // Điều khiển âm thanh toàn cục (Mặc định tắt do chính sách autoplay của trình duyệt)
  const [isMuted, setIsMuted] = useState(true);

  // Điều khiển Luồng Trò chơi
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeTopic, setActiveTopic] = useState<TopicId | null>(null);

  // Quản lý nhạc nền Thành phố
  useEffect(() => {
    if (!isMuted && !activeTopic) {
      startCityBGM();
    } else {
      stopCityBGM();
    }
    
    return () => stopCityBGM();
  }, [isMuted, activeTopic]);

  // Tính toán độ lớn của tòa nhà dựa trên Level
  const getScale = (lvl: number) => {
    return 1 + (lvl * 0.02); // Mỗi level tăng 2% kích thước
  };

  // Xử lý khi Kết thúc Session (Bấm Dừng hoặc đủ 100 câu)
  const handleSessionEnd = (coinsEarned: number, correctAnswers: number) => {
    if (activeSubject === 'math') {
      setMathLevel(prev => prev + Math.floor(correctAnswers / 3)); // Cứ 3 câu đúng = 1 Level
    }
    if (activeSubject === 'vietnamese') {
      setVietnameseLevel(prev => prev + Math.floor(correctAnswers / 3));
    }
    if (activeSubject === 'english') {
      setEnglishLevel(prev => prev + Math.floor(correctAnswers / 3));
    }
    
    setCoins(prev => prev + coinsEarned);
    
    // Đóng toàn bộ Modal
    setActiveTopic(null);
    setActiveSubject(null);
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#86efac] font-sans select-none flex items-center justify-center">
      
      {/* Khung Bản đồ (Luôn hiển thị toàn bộ 100% không cần cuộn) */}
      <main 
        className="relative flex-none z-20"
        style={{
          width: '100%',
          maxWidth: 'calc(100dvh * 1.5)',
          aspectRatio: '3/2'
        }}
      >
        
        {/* Background Thành Phố */}
        <Image 
          src="/empty-city-bg.png" 
          alt="Bản đồ thành phố trống" 
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={100}
          priority
        />
        {/* Lớp phủ mờ nhẹ */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
        
        {/* BANK (Ngân hàng Toán học) */}
        <motion.div 
          onClick={() => setActiveSubject('math')}
          className="absolute top-[52%] left-[12%] w-[16%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(mathLevel), y: [0, -10, 0] }}
          whileHover={{ scale: getScale(mathLevel) + 0.05 }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="relative w-full aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/bank-transparent.png" 
              alt="Ngân hàng Toán" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          {/* Nhãn */}
          <div className="mt-[-10%] sm:mt-[-20px] bg-blue-600 px-2 py-1 sm:px-6 sm:py-2 rounded-full border-[1px] sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[8px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Toán Học</span>
          </div>
          <div className="absolute top-0 right-[-10%] bg-amber-400 text-amber-900 font-black text-[10px] sm:text-xl w-6 h-6 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-[1px] sm:border-4 border-white z-20">
            {mathLevel}
          </div>
        </motion.div>

        {/* LIBRARY (Thư viện Tiếng Việt) */}
        <motion.div 
          onClick={() => setActiveSubject('vietnamese')}
          className="absolute top-[18%] right-[22%] w-[19%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(vietnameseLevel), y: [0, -15, 0] }}
          whileHover={{ scale: getScale(vietnameseLevel) + 0.05 }}
          transition={{ 
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="relative w-full aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/library-transparent.png" 
              alt="Thư viện Tiếng Việt" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          <div className="mt-[-10%] sm:mt-[-20px] bg-rose-500 px-2 py-1 sm:px-6 sm:py-2 rounded-full border-[1px] sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[8px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Tiếng Việt</span>
          </div>
          <div className="absolute top-0 right-[-10%] bg-amber-400 text-amber-900 font-black text-[10px] sm:text-xl w-6 h-6 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-[1px] sm:border-4 border-white z-20">
            {vietnameseLevel}
          </div>
        </motion.div>

        {/* AIRPORT (Sân bay Tiếng Anh) */}
        <motion.div 
          onClick={() => setActiveSubject('english')}
          className="absolute top-[62%] right-[12%] w-[22%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(englishLevel), y: [0, -8, 0] }}
          whileHover={{ scale: getScale(englishLevel) + 0.05 }}
          transition={{ 
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="relative w-full aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/airport-transparent.png" 
              alt="Sân bay Tiếng Anh" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          <div className="mt-[-10%] sm:mt-[-20px] bg-indigo-500 px-2 py-1 sm:px-6 sm:py-2 rounded-full border-[1px] sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[8px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Tiếng Anh</span>
          </div>
          <div className="absolute top-2 right-[-5%] bg-amber-400 text-amber-900 font-black text-[10px] sm:text-xl w-6 h-6 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-[1px] sm:border-4 border-white z-20">
            {englishLevel}
          </div>
        </motion.div>

      </main>

      {/* HUD (Heads Up Display) - Top Bar */}
      <header className="absolute top-2 sm:top-6 left-2 sm:left-6 right-2 sm:right-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="pointer-events-auto scale-75 sm:scale-100 origin-top-left">
          <div className="bg-white/90 backdrop-blur-md px-2 py-2 rounded-[2rem] shadow-xl flex items-center gap-3 border-[4px] border-slate-200 transform transition hover:scale-105 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-b from-sky-300 to-sky-500 rounded-full border-2 border-white flex items-center justify-center shadow-inner overflow-hidden">
              <User className="text-white w-8 h-8 drop-shadow-md" />
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest drop-shadow-sm">Thị trưởng</span>
              <span className="font-extrabold text-xl text-slate-800 drop-shadow-sm leading-none tracking-wide">Đinh Bảo Kha</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="bg-gradient-to-b from-amber-400 to-amber-500 px-6 py-3 rounded-full shadow-[0_6px_0_#b45309] flex items-center gap-3 border-4 border-white transform transition hover:translate-y-1 hover:shadow-[0_2px_0_#b45309] cursor-pointer">
            <Coins className="text-amber-100 w-7 h-7 drop-shadow-md fill-amber-300" />
            <span className="font-extrabold text-2xl text-amber-950 tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
              {coins.toLocaleString()}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border-4 border-white text-slate-500 hover:text-sky-500 hover:bg-slate-100 transition active:scale-95"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-rose-400" /> : <Volume2 className="w-6 h-6 text-sky-500" />}
            </button>
            <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border-4 border-white text-slate-500 hover:bg-slate-100 transition active:scale-95">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Nav */}
      <div className="absolute bottom-2 sm:bottom-8 left-2 sm:left-8 z-50 scale-75 sm:scale-100 origin-bottom-left">
        <motion.button 
          className="bg-white text-slate-800 p-2 sm:p-3 pr-4 sm:pr-6 rounded-full shadow-[0_6px_0_#cbd5e1] flex items-center gap-2 sm:gap-4 border-2 sm:border-4 border-slate-200 hover:translate-y-1 hover:shadow-none transition group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-sky-500 p-3 rounded-full shadow-inner border border-sky-300">
            <Map className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-lg tracking-wide uppercase text-slate-600 transition">Phụ Huynh</span>
        </motion.button>
      </div>

      <div className="absolute bottom-2 sm:bottom-8 right-2 sm:right-8 z-50 scale-75 sm:scale-100 origin-bottom-right">
        <motion.button 
          className="bg-gradient-to-b from-rose-500 to-rose-600 text-white p-2 sm:p-3 pl-4 sm:pl-6 rounded-full shadow-[0_8px_0_#881337] flex items-center gap-2 sm:gap-4 border-2 sm:border-4 border-white hover:translate-y-1 hover:shadow-[0_2px_0_#881337] transition group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col items-end">
            <span className="font-black text-xl tracking-wide uppercase drop-shadow-sm">Cửa Hàng</span>
            <span className="text-rose-200 text-[10px] font-bold uppercase tracking-widest">Thời trang Avatar</span>
          </div>
          <div className="bg-rose-400 p-4 rounded-full shadow-inner border border-rose-300">
            <ShoppingBag className="w-8 h-8 text-white drop-shadow-md" />
          </div>
        </motion.button>
      </div>

      {/* Modal Chọn Chủ Đề */}
      {activeSubject && !activeTopic && (
        <TopicSelection
          isOpen={true}
          subject={activeSubject}
          onClose={() => setActiveSubject(null)}
          onSelectTopic={(topicId) => setActiveTopic(topicId)}
        />
      )}

      {/* Modal Làm Bài Liên Tục */}
      {activeSubject && activeTopic && (
        <QuizSession 
          isOpen={true}
          subject={activeSubject}
          topicId={activeTopic}
          isMuted={isMuted}
          onSessionEnd={handleSessionEnd}
        />
      )}

    </div>
  );
}
