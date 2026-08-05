export type ItemCategory = 'hair' | 'shirt' | 'glasses' | 'hat';

export interface AvatarItem {
  id: string;
  name: string;
  category: ItemCategory;
  gender: 'boy' | 'girl' | 'both';
  price: number;
  color: string; // Used for SVG fill
}

export const AVATAR_ITEMS: AvatarItem[] = [
  // Hairs
  { id: 'hair_boy_default', name: 'Tóc ngắn cơ bản', category: 'hair', gender: 'boy', price: 0, color: '#451a03' },
  { id: 'hair_girl_default', name: 'Tóc ngắn nữ', category: 'hair', gender: 'girl', price: 0, color: '#451a03' },
  { id: 'hair_boy_blonde', name: 'Tóc vuốt vàng', category: 'hair', gender: 'boy', price: 100, color: '#facc15' },
  { id: 'hair_girl_long', name: 'Tóc dài bồng bềnh', category: 'hair', gender: 'girl', price: 150, color: '#7e22ce' },
  
  // Shirts
  { id: 'shirt_basic_blue', name: 'Áo thun xanh', category: 'shirt', gender: 'both', price: 0, color: '#3b82f6' },
  { id: 'shirt_basic_pink', name: 'Áo thun hồng', category: 'shirt', gender: 'both', price: 0, color: '#ec4899' },
  { id: 'shirt_ninja', name: 'Áo Ninja đen', category: 'shirt', gender: 'both', price: 300, color: '#1e293b' },
  { id: 'shirt_superhero', name: 'Áo Siêu nhân', category: 'shirt', gender: 'both', price: 500, color: '#ef4444' },

  // Glasses
  { id: 'none', name: 'Không đeo', category: 'glasses', gender: 'both', price: 0, color: 'transparent' },
  { id: 'glasses_nerd', name: 'Kính thư sinh', category: 'glasses', gender: 'both', price: 50, color: '#000000' },
  { id: 'glasses_sun', name: 'Kính râm ngầu', category: 'glasses', gender: 'both', price: 120, color: '#1f2937' },

  // Hats
  { id: 'none', name: 'Không đội', category: 'hat', gender: 'both', price: 0, color: 'transparent' },
  { id: 'hat_cap', name: 'Mũ lưỡi trai', category: 'hat', gender: 'both', price: 80, color: '#f59e0b' },
  { id: 'hat_crown', name: 'Vương miện Vua', category: 'hat', gender: 'both', price: 1000, color: '#eab308' },
];
