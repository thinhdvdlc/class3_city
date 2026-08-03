"use client";
import React from 'react';
import { IsometricBlock } from './IsometricBlock';
import { motion } from 'framer-motion';

export const LibraryBuilding = ({ level = 1, x = 0, y = 0 }) => {
  const floors = [];
  const floorHeight = 12; // Thư viện tầng thấp nhưng bè ngang
  const displayLevels = Math.min(level, 99);

  for (let i = 0; i < displayLevels; i++) {
    // Tầng của thư viện xen kẽ giống những cuốn sách xếp chồng
    const isOdd = i % 2 !== 0;
    const width = isOdd ? 85 : 90;
    const depth = isOdd ? 65 : 70;
    const offsetX = isOdd ? 2.5 : 0;
    const offsetY = isOdd ? 2.5 : 0;
    
    floors.push(
      <motion.div
        key={`lib-floor-${i}`}
        initial={{ z: 500, opacity: 0 }}
        animate={{ z: 20 + i * floorHeight, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.02 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d', left: offsetX, top: offsetY }}
      >
        <IsometricBlock 
          width={width} depth={depth} height={floorHeight - 1} 
          z={0}
          color={isOdd ? "#e11d48" : "#be123c"} 
          topColor={isOdd ? "#fb7185" : "#f43f5e"} 
          rightColor={isOdd ? "#9f1239" : "#881337"} 
        />
      </motion.div>
    );
  }
  
  return (
    <div className="absolute" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
      {/* Foundation */}
      <IsometricBlock 
        width={110} depth={90} height={20} 
        z={0} x={-10} y={-10} 
        color="#fbbf24" topColor="#fde68a" rightColor="#d97706" // Nền màu vàng sách cũ
      />
      
      {floors}

      {/* Roof */}
      <motion.div 
        animate={{ z: 20 + displayLevels * floorHeight }} 
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d', left: 10, top: 10 }}
      >
        <IsometricBlock 
          width={70} depth={50} height={15} 
          z={0} 
          color="#475569" topColor="#94a3b8" rightColor="#334155" 
        />
      </motion.div>
      
      {/* Nhãn Tên */}
      <motion.div 
         animate={{ z: 20 + displayLevels * floorHeight + 60 }}
         className="absolute text-center w-48 -translate-x-1/2 -translate-y-1/2 left-[45px]"
         style={{ transform: 'rotateX(-60deg) rotateZ(-45deg)' }}
      >
         <div className="bg-rose-900/80 backdrop-blur-md px-3 py-1 rounded-lg border-2 border-rose-400 shadow-xl inline-block">
            <span className="font-extrabold text-white text-sm drop-shadow-md whitespace-nowrap">Thư Viện Tiếng Việt</span>
         </div>
      </motion.div>
    </div>
  );
};
