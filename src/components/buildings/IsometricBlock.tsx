import React from 'react';

interface IsometricBlockProps {
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  depth?: number;
  height?: number;
  color?: string;
  topColor?: string;
  rightColor?: string;
}

export const IsometricBlock: React.FC<IsometricBlockProps> = ({
  x = 0,
  y = 0,
  z = 0,
  width = 50,
  depth = 50,
  height = 50,
  color = '#3b82f6',       // left/front face
  topColor = '#60a5fa',    // top face
  rightColor = '#2563eb',  // right/back face
}) => {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: `translateZ(${z}px)`,
        transformStyle: 'preserve-3d',
        width: width,
        height: depth,
      }}
    >
      {/* Bottom shadow (optional) */}
      {z === 0 && (
         <div className="absolute inset-0 bg-black/40 blur-sm transform translate-x-4 translate-y-4" />
      )}
      
      {/* Top Face */}
      <div
        className="absolute inset-0 border border-white/20"
        style={{
          background: topColor,
          transform: `translateZ(${height}px)`,
        }}
      />
      {/* Front-Left Face (facing bottom-left in iso view) */}
      <div
        className="absolute top-full left-0 origin-top border border-black/10"
        style={{
          width: width,
          height: height,
          background: color,
          transform: 'rotateX(-90deg)',
        }}
      />
      {/* Front-Right Face (facing bottom-right in iso view) */}
      <div
        className="absolute top-0 left-full origin-left border border-black/10"
        style={{
          width: depth,
          height: height,
          background: rightColor,
          transform: 'rotateY(90deg)',
        }}
      />
    </div>
  );
};
