"use client";
import React from 'react';
import { IsometricBlock } from './IsometricBlock';
import { motion } from 'framer-motion';

export const BankBuilding = ({ level = 1, x = 0, y = 0 }) => {
  const floors = [];
  const floorHeight = 16;
  
  // Rút gọn bớt số tầng hiển thị nếu level quá lớn (để tránh giật lag),
  // Cứ 1 level = 1 tầng, tối đa vẽ 99 tầng.
  const displayLevels = Math.min(level, 99);

  for (let i = 0; i < displayLevels; i++) {
    floors.push(
      <motion.div
        key={`bank-floor-${i}`}
        initial={{ z: 500, opacity: 0 }}
        animate={{ z: 20 + i * floorHeight, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.02 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d' }}
      >
        <IsometricBlock 
          width={60} depth={60} height={floorHeight - 2} 
          z={0}
          color="#2563eb" topColor="#60a5fa" rightColor="#1d4ed8" 
        />
        {/* Kính của sổ (Trang trí) */}
        <div 
          className="absolute" 
          style={{ 
            width: 40, height: floorHeight - 4, 
            background: '#93c5fd', 
            transform: 'rotateX(-90deg) translate3d(10px, 2px, 1px)',
            opacity: 0.8
          }} 
        />
      </motion.div>
    );
  }
  
  return (
    <div className="absolute" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
      {/* Foundation / Tầng trệt */}
      <IsometricBlock 
        width={80} depth={80} height={20} 
        z={0} x={-10} y={-10} 
        color="#94a3b8" topColor="#cbd5e1" rightColor="#64748b" 
      />
      
      {floors}

      {/* Roof / Mái nhà */}
      <motion.div 
        animate={{ z: 20 + displayLevels * floorHeight }} 
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d' }}
      >
        <IsometricBlock 
          width={60} depth={60} height={10} 
          z={0} 
          color="#1e293b" topColor="#334155" rightColor="#0f172a" 
        />
        {/* Ăng ten / Trụ cờ */}
        <div 
           className="absolute bg-slate-400" 
           style={{ width: 4, height: 30, transform: 'rotateX(-90deg) translate3d(28px, 10px, 30px)' }} 
        />
      </motion.div>
      
      {/* Nhãn Tên Môn Học (Nổi bên trên) */}
      <motion.div 
         animate={{ z: 20 + displayLevels * floorHeight + 60 }}
         className="absolute text-center w-40 -translate-x-1/2 -translate-y-1/2 left-[30px]"
         style={{ transform: 'rotateX(-60deg) rotateZ(-45deg)' }} // Ngược lại với mảng để chữ đứng thẳng
      >
         <div className="bg-blue-900/80 backdrop-blur-md px-3 py-1 rounded-lg border-2 border-blue-400 shadow-xl inline-block">
            <span className="font-extrabold text-white text-sm drop-shadow-md whitespace-nowrap">Ngân Hàng Toán</span>
         </div>
      </motion.div>
    </div>
  );
};
