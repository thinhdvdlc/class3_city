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
      
      {/* BODY (Torso) - Chibi Style */}
      <path d="M 35 100 L 35 75 Q 35 65 50 65 Q 65 65 65 75 L 65 100 Z" fill={shirtColor} />
      
      {/* SHIRT DECORATIONS */}
      {equipped.shirt === 'shirt_ninja' && (
        <path d="M 45 65 L 55 65 L 50 80 Z" fill="#334155" />
      )}
      {equipped.shirt === 'shirt_superhero' && (
        <polygon points="50,70 56,76 50,86 44,76" fill="#facc15" />
      )}

      {/* HEAD - Chibi proportion (Wider and squatter) */}
      {/* Ears */}
      <circle cx="26" cy="45" r="5" fill={skinColor} />
      <circle cx="74" cy="45" r="5" fill={skinColor} />
      
      {/* Face Base */}
      <rect x="28" y="25" width="44" height="40" rx="18" fill={skinColor} />

      {/* FACE DETAILS */}
      
      {/* Big Anime Eyes */}
      {/* Left Eye */}
      <ellipse cx="38" cy="43" rx="5" ry="7" fill="#ffffff" />
      <ellipse cx="39" cy="43" rx="3.5" ry="5.5" fill="#1e293b" />
      <circle cx="40" cy="40.5" r="1.5" fill="#ffffff" />
      
      {/* Right Eye */}
      <ellipse cx="62" cy="43" rx="5" ry="7" fill="#ffffff" />
      <ellipse cx="61" cy="43" rx="3.5" ry="5.5" fill="#1e293b" />
      <circle cx="60" cy="40.5" r="1.5" fill="#ffffff" />

      {/* Eyebrows */}
      <path d="M 34 33 Q 38 31 42 33" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 58 33 Q 62 31 66 33" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="32" cy="48" rx="4" ry="2" fill="#fca5a5" opacity="0.7" />
      <ellipse cx="68" cy="48" rx="4" ry="2" fill="#fca5a5" opacity="0.7" />

      {/* Nose */}
      <path d="M 49 48 Q 50 49 51 48" stroke="#b45309" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Cute Mouth */}
      {gender === 'boy' ? (
        <path d="M 46 54 Q 50 58 54 54" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 47 54 Q 50 58 53 54" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}

      {/* HAIR */}
      {/* Messy Boy Hair (Ngộ nghĩnh) */}
      {equipped.hair === 'hair_boy_default' && (
        <>
          {/* Back hair */}
          <path d="M 22 45 Q 20 20 50 12 Q 80 20 78 45 Q 85 30 75 15 Q 50 0 25 15 Q 15 30 22 45 Z" fill={hairColor} />
          {/* Front spikes */}
          <path d="M 26 28 L 35 40 L 42 26 L 50 38 L 58 26 L 65 40 L 74 28 Q 50 15 26 28 Z" fill={hairColor} />
        </>
      )}
      
      {/* Cute Girl Hair */}
      {equipped.hair === 'hair_girl_default' && (
        <>
          <path d="M 24 55 Q 15 30 50 12 Q 85 30 76 55 Q 80 40 76 25 Q 50 5 24 25 Q 20 40 24 55 Z" fill={hairColor} />
          <path d="M 28 25 Q 50 35 72 25 Q 50 15 28 25 Z" fill={hairColor} />
        </>
      )}
      
      {/* Blonde Spiky Boy */}
      {equipped.hair === 'hair_boy_blonde' && (
        <>
          <path d="M 22 40 L 28 15 L 38 25 L 50 5 L 62 25 L 72 15 L 78 40 Q 50 15 22 40 Z" fill={hairColor} />
          <path d="M 30 25 L 35 42 L 45 28 L 50 45 L 55 28 L 65 42 L 70 25 Z" fill={hairColor} />
        </>
      )}
      
      {/* Long Girl Hair */}
      {equipped.hair === 'hair_girl_long' && (
        <>
          {/* Back long hair */}
          <path d="M 25 25 Q 10 50 20 90 Q 50 80 80 90 Q 90 50 75 25 Z" fill={hairColor} />
          {/* Top hair */}
          <path d="M 25 35 Q 50 5 75 35 Q 50 20 25 35 Z" fill={hairColor} />
        </>
      )}

      {/* GLASSES */}
      {equipped.glasses === 'glasses_nerd' && (
        <g stroke={glassesColor} strokeWidth="2.5" fill="none">
          <circle cx="38" cy="43" r="9" />
          <circle cx="62" cy="43" r="9" />
          <line x1="47" y1="41" x2="53" y2="41" />
          <line x1="22" y1="41" x2="29" y2="41" />
          <line x1="71" y1="41" x2="78" y2="41" />
        </g>
      )}
      {equipped.glasses === 'glasses_sun' && (
        <g stroke={glassesColor} strokeWidth="2.5" fill={glassesColor}>
          <path d="M 29 40 L 47 40 L 44 49 L 32 49 Z" strokeLinejoin="round" />
          <path d="M 53 40 L 71 40 L 68 49 L 56 49 Z" strokeLinejoin="round" />
          <line x1="47" y1="42" x2="53" y2="42" />
        </g>
      )}

      {/* HATS */}
      {equipped.hat === 'hat_cap' && (
        <path d="M 25 25 Q 50 5 75 25 L 90 25 L 90 20 L 75 18 Q 50 -5 25 18 Z" fill={hatColor} />
      )}
      {equipped.hat === 'hat_crown' && (
        <path d="M 32 18 L 22 -2 L 40 10 L 50 -10 L 60 10 L 78 -2 L 68 18 Z" fill={hatColor} stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
      )}
      
    </svg>
  );
};
