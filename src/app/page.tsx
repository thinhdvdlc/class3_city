"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Coins, Settings, ShoppingBag, Map } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [level, setLevel] = useState(1);

  // Tính toán độ lớn của tòa nhà dựa trên Level (Tối đa x2.5 lần ở level 99)
  const getScale = (lvl: number) => {
    return 1 + (lvl * 0.015);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#86efac] font-sans select-none flex items-center justify-center p-2 sm:p-4 md:p-8">
      
      {/* Khung Bản đồ Responsive (Luôn giữ đúng tỷ lệ 3:2) */}
      <main className="relative w-full max-w-[1400px] aspect-[3/2] z-20 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-4 md:border-8 border-white/40 bg-sky-200">
        
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
        
        {/* BANK (Ngân hàng Toán học) - Bãi đất góc trái dưới */}
        <motion.div 
          className="absolute top-[52%] left-[12%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(level), y: [0, -10, 0] }}
          whileHover={{ scale: getScale(level) + 0.05 }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
          drag
          dragMomentum={false}
          whileDrag={{ scale: getScale(level) + 0.1, zIndex: 100, opacity: 0.8 }}
        >
          <div className="relative w-[18vw] sm:w-[15vw] md:w-[240px] aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/bank-transparent.png" 
              alt="Ngân hàng Toán" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          {/* Nhãn */}
          <div className="mt-[-10%] sm:mt-[-20px] bg-blue-600 px-3 sm:px-6 py-1 sm:py-2 rounded-full border-2 sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[10px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Toán Học</span>
          </div>
          <div className="absolute top-0 right-[-10%] bg-amber-400 text-amber-900 font-black text-sm sm:text-xl w-8 h-8 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white z-20">
            {level}
          </div>
        </motion.div>

        {/* LIBRARY (Thư viện Tiếng Việt) - Bãi đất góc phải trên (Cạnh hồ) */}
        <motion.div 
          className="absolute top-[18%] right-[22%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(level), y: [0, -15, 0] }}
          whileHover={{ scale: getScale(level) + 0.05 }}
          transition={{ 
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
          drag
          dragMomentum={false}
          whileDrag={{ scale: getScale(level) + 0.1, zIndex: 100, opacity: 0.8 }}
        >
          <div className="relative w-[20vw] sm:w-[18vw] md:w-[280px] aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/library-transparent.png" 
              alt="Thư viện Tiếng Việt" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          <div className="mt-[-10%] sm:mt-[-20px] bg-rose-500 px-3 sm:px-6 py-1 sm:py-2 rounded-full border-2 sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[10px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Tiếng Việt</span>
          </div>
          <div className="absolute top-0 right-[-10%] bg-amber-400 text-amber-900 font-black text-sm sm:text-xl w-8 h-8 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white z-20">
            {level}
          </div>
        </motion.div>

        {/* AIRPORT (Sân bay Tiếng Anh) - Bãi đất góc phải dưới */}
        <motion.div 
          className="absolute top-[62%] right-[12%] flex flex-col items-center cursor-pointer group"
          animate={{ scale: getScale(level), y: [0, -8, 0] }}
          whileHover={{ scale: getScale(level) + 0.05 }}
          transition={{ 
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            scale: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          style={{ transformOrigin: 'bottom center' }}
          drag
          dragMomentum={false}
          whileDrag={{ scale: getScale(level) + 0.1, zIndex: 100, opacity: 0.8 }}
        >
          <div className="relative w-[24vw] sm:w-[22vw] md:w-[320px] aspect-square drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
            <Image 
              src="/airport-transparent.png" 
              alt="Sân bay Tiếng Anh" 
              fill 
              className="object-contain transform scale-[1.3] origin-bottom" 
            />
          </div>
          <div className="mt-[-10%] sm:mt-[-20px] bg-indigo-500 px-3 sm:px-6 py-1 sm:py-2 rounded-full border-2 sm:border-4 border-white shadow-xl z-10">
            <span className="font-black text-white text-[10px] sm:text-lg tracking-wide uppercase drop-shadow-md whitespace-nowrap">Tiếng Anh</span>
          </div>
          <div className="absolute top-2 right-[-5%] bg-amber-400 text-amber-900 font-black text-sm sm:text-xl w-8 h-8 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white z-20">
            {level}
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
            <span className="font-extrabold text-2xl text-amber-950 tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">1,250</span>
          </div>
          
          <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border-4 border-white text-slate-500 hover:bg-slate-100 transition">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Level Controller for testing */}
      <div className="absolute top-1/2 right-2 sm:right-8 -translate-y-1/2 bg-white/90 backdrop-blur-md p-2 sm:p-4 rounded-3xl shadow-2xl border-2 sm:border-4 border-slate-200 flex flex-col items-center gap-2 sm:gap-4 z-50 scale-75 sm:scale-100 origin-right">
        <span className="font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider text-center hidden sm:block">Tăng cấp<br/>Tòa nhà</span>
        
        <button 
          onClick={() => setLevel(prev => Math.min(prev + 5, 99))} // Tăng 5 level một lần cho nhanh
          className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full shadow-[0_4px_0_#166534] text-white font-black text-xl sm:text-2xl flex items-center justify-center hover:translate-y-1 hover:shadow-none transition active:bg-green-600"
        >
          +
        </button>
        
        <div className="text-4xl font-black text-slate-800">{level}</div>
        
        <button 
          onClick={() => setLevel(prev => Math.max(prev - 5, 1))}
          className="w-12 h-12 bg-rose-500 rounded-full shadow-[0_4px_0_#9f1239] text-white font-black text-2xl flex items-center justify-center hover:translate-y-1 hover:shadow-none transition active:bg-rose-600"
        >
          -
        </button>
      </div>

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

    </div>
  );
}
