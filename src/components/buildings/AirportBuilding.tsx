"use client";
import React from 'react';
import { IsometricBlock } from './IsometricBlock';
import { motion } from 'framer-motion';

export const AirportBuilding = ({ level = 1, x = 0, y = 0 }) => {
  const floors = [];
  const floorHeight = 15;
  const displayLevels = Math.min(level, 99);

  // Tower floors
  for (let i = 0; i < displayLevels; i++) {
    floors.push(
      <motion.div
        key={`airport-floor-${i}`}
        initial={{ z: 500, opacity: 0 }}
        animate={{ z: 20 + i * floorHeight, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.02 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d', left: 40, top: 40 }}
      >
        {/* Trụ tháp điều khiển */}
        <IsometricBlock 
          width={30} depth={30} height={floorHeight} 
          z={0}
          color="#4f46e5" topColor="#818cf8" rightColor="#3730a3" 
        />
      </motion.div>
    );
  }
  
  return (
    <div className="absolute" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
      {/* Runway / Đường băng (Dài hơn và dẹt) */}
      <IsometricBlock 
        width={160} depth={110} height={10} 
        z={0} x={-40} y={-10} 
        color="#334155" topColor="#475569" rightColor="#1e293b" 
      />
      
      {/* Nhà ga chính */}
      <IsometricBlock 
        width={70} depth={90} height={20} 
        z={10} x={20} y={10} 
        color="#6366f1" topColor="#a5b4fc" rightColor="#4338ca" 
      />
      
      {floors}

      {/* Control Tower Dome / Nóc tháp điều khiển */}
      <motion.div 
        animate={{ z: 20 + displayLevels * floorHeight }} 
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d', left: 35, top: 35 }}
      >
        <IsometricBlock 
          width={40} depth={40} height={20} 
          z={0} 
          color="#38bdf8" topColor="#7dd3fc" rightColor="#0284c7" // Màu kính cường lực
        />
      </motion.div>
      
      {/* Nhãn Tên */}
      <motion.div 
         animate={{ z: 40 + displayLevels * floorHeight + 60 }}
         className="absolute text-center w-48 -translate-x-1/2 -translate-y-1/2 left-[55px]"
         style={{ transform: 'rotateX(-60deg) rotateZ(-45deg)' }}
      >
         <div className="bg-indigo-900/80 backdrop-blur-md px-3 py-1 rounded-lg border-2 border-indigo-400 shadow-xl inline-block">
            <span className="font-extrabold text-white text-sm drop-shadow-md whitespace-nowrap">Sân Bay Tiếng Anh</span>
         </div>
      </motion.div>
    </div>
  );
};
