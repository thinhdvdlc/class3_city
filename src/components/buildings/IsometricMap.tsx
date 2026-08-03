"use client";
import React from 'react';

export const IsometricMap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-sky-100"
      style={{ perspective: 1500 }}
    >
      {/* 3D World Container */}
      <div 
        className="relative w-0 h-0 pointer-events-auto transition-transform duration-1000"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) rotateZ(45deg) scale(0.9)',
        }}
      >
         {/* Bãi cỏ / Nền đất */}
         <div 
           className="absolute -left-[600px] -top-[600px] w-[1200px] h-[1200px] bg-[#86efac] border-[16px] border-[#22c55e] shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
           style={{ transform: 'translateZ(-1px)', transformStyle: 'preserve-3d' }}
         >
            {/* Grid Pattern */}
            <div 
               className="w-full h-full opacity-40" 
               style={{ 
                  backgroundImage: 'linear-gradient(rgba(21,128,61,0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(21,128,61,0.3) 2px, transparent 2px)', 
                  backgroundSize: '100px 100px' 
               }} 
            />
            {/* Đường xá (Roads) */}
            <div className="absolute top-[400px] left-0 w-full h-[120px] bg-slate-500 shadow-inner">
               <div className="w-full h-[4px] bg-white opacity-60 absolute top-1/2 -translate-y-1/2" style={{ borderStyle: 'dashed' }}></div>
            </div>
            <div className="absolute left-[400px] top-0 w-[120px] h-full bg-slate-500 shadow-inner">
               <div className="w-[4px] h-full bg-white opacity-60 absolute left-1/2 -translate-x-1/2" style={{ borderStyle: 'dashed' }}></div>
            </div>
         </div>
         
         {/* Các công trình con */}
         {children}
      </div>
    </div>
  );
};
