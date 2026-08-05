import React from 'react';
import { EquippedItems } from '@/utils/supabase';
import { AVATAR_ITEMS } from '@/data/items';

interface AvatarSVGProps {
  gender: 'boy' | 'girl';
  equipped: EquippedItems;
  className?: string;
}

export const AvatarSVG: React.FC<AvatarSVGProps> = ({ gender, equipped, className = "w-24 h-24" }) => {
  // Helpers to get item colors/details
  const getItem = (id: string) => AVATAR_ITEMS.find(item => item.id === id);
  
  const hairItem = getItem(equipped.hair);
  const shirtItem = getItem(equipped.shirt);
  const glassesItem = getItem(equipped.glasses);
  const hatItem = getItem(equipped.hat);

  const skinColor = gender === 'boy' ? '#fde047' : '#fcd34d'; // Slightly different base skin
  const shirtColor = shirtItem?.color || '#3b82f6';
  const hairColor = hairItem?.color || '#451a03';
  const glassesColor = glassesItem?.color || 'transparent';
  const hatColor = hatItem?.color || 'transparent';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background (Optional padding ring) */}
      <circle cx="50" cy="50" r="50" fill="#f0f9ff" />
      
      {/* BODY (Torso) */}
      <path d="M 25 100 Q 25 65 50 65 Q 75 65 75 100 Z" fill={shirtColor} />
      
      {/* SHIRT DECORATIONS */}
      {equipped.shirt === 'shirt_ninja' && (
        <path d="M 40 75 L 60 75 L 50 90 Z" fill="#334155" />
      )}
      {equipped.shirt === 'shirt_superhero' && (
        <circle cx="50" cy="80" r="8" fill="#facc15" />
      )}

      {/* HEAD */}
      <circle cx="50" cy="40" r="22" fill={skinColor} />

      {/* FACE */}
      {/* Eyes */}
      <circle cx="42" cy="38" r="3" fill="#1e293b" />
      <circle cx="58" cy="38" r="3" fill="#1e293b" />
      
      {/* Blush (Girl only) */}
      {gender === 'girl' && (
        <>
          <ellipse cx="35" cy="42" rx="4" ry="2" fill="#fca5a5" opacity="0.6" />
          <ellipse cx="65" cy="42" rx="4" ry="2" fill="#fca5a5" opacity="0.6" />
        </>
      )}

      {/* Mouth */}
      {gender === 'boy' ? (
        <path d="M 45 46 Q 50 52 55 46" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 45 48 Q 50 54 55 48" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* HAIR */}
      {equipped.hair === 'hair_boy_default' && (
        <path d="M 25 40 Q 50 10 75 40 Q 75 22 50 15 Q 25 22 25 40 Z" fill={hairColor} />
      )}
      {equipped.hair === 'hair_girl_default' && (
        <path d="M 25 40 Q 50 10 75 40 L 78 55 Q 50 48 22 55 Z" fill={hairColor} />
      )}
      {equipped.hair === 'hair_boy_blonde' && (
        <path d="M 22 40 L 30 15 L 40 25 L 50 10 L 60 25 L 70 15 L 78 40 Q 50 20 22 40 Z" fill={hairColor} />
      )}
      {equipped.hair === 'hair_girl_long' && (
        <path d="M 25 40 Q 50 5 75 40 Q 85 70 80 90 Q 70 70 75 45 Q 50 30 25 45 Q 30 70 20 90 Q 15 70 25 40 Z" fill={hairColor} />
      )}

      {/* GLASSES */}
      {equipped.glasses === 'glasses_nerd' && (
        <g stroke={glassesColor} strokeWidth="3" fill="none">
          <circle cx="40" cy="38" r="8" />
          <circle cx="60" cy="38" r="8" />
          <line x1="48" y1="38" x2="52" y2="38" />
          <line x1="28" y1="38" x2="32" y2="38" />
          <line x1="68" y1="38" x2="72" y2="38" />
        </g>
      )}
      {equipped.glasses === 'glasses_sun' && (
        <g stroke={glassesColor} strokeWidth="3" fill={glassesColor}>
          <path d="M 32 35 L 48 35 L 46 45 L 34 45 Z" strokeLinejoin="round" />
          <path d="M 52 35 L 68 35 L 66 45 L 54 45 Z" strokeLinejoin="round" />
          <line x1="48" y1="36" x2="52" y2="36" />
        </g>
      )}

      {/* HATS */}
      {equipped.hat === 'hat_cap' && (
        <path d="M 25 25 Q 50 5 75 25 L 88 25 L 88 20 L 75 20 Q 50 -5 25 20 Z" fill={hatColor} />
      )}
      {equipped.hat === 'hat_crown' && (
        <path d="M 32 20 L 25 0 L 40 12 L 50 -5 L 60 12 L 75 0 L 68 20 Z" fill={hatColor} stroke="#b45309" strokeWidth="1" strokeLinejoin="round" />
      )}
      
    </svg>
  );
};
