import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, X, Check, Lock } from 'lucide-react';
import { UserProfile, supabase } from '@/utils/supabase';
import { AVATAR_ITEMS, ItemCategory, AvatarItem } from '@/data/items';
import { AvatarSVG } from '@/components/avatar/AvatarSVG';
import { playCorrectSound, playWrongSound } from '@/utils/sound';

interface AvatarShopProps {
  profile: UserProfile;
  onClose: (updatedProfile?: UserProfile) => void;
}

export const AvatarShop: React.FC<AvatarShopProps> = ({ profile, onClose }) => {
  const [activeTab, setActiveTab] = useState<ItemCategory>('hair');
  const [editingProfile, setEditingProfile] = useState<UserProfile>({ ...profile });
  const [isSaving, setIsSaving] = useState(false);

  // Filter items by category and gender (allow 'both' and matching gender)
  const availableItems = AVATAR_ITEMS.filter(
    item => item.category === activeTab && (item.gender === 'both' || item.gender === editingProfile.gender)
  );

  const handleEquip = (item: AvatarItem) => {
    setEditingProfile(prev => ({
      ...prev,
      equipped_items: {
        ...prev.equipped_items,
        [item.category]: item.id
      }
    }));
  };

  const handleBuyAndEquip = (item: AvatarItem) => {
    if (editingProfile.coins < item.price) {
      playWrongSound();
      return;
    }
    playCorrectSound();
    
    setEditingProfile(prev => ({
      ...prev,
      coins: prev.coins - item.price,
      unlocked_items: [...prev.unlocked_items, item.id],
      equipped_items: {
        ...prev.equipped_items,
        [item.category]: item.id
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          coins: editingProfile.coins,
          equipped_items: editingProfile.equipped_items,
          unlocked_items: editingProfile.unlocked_items
        })
        .eq('name', editingProfile.name);

      if (!error) {
        onClose(editingProfile);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const TABS: { id: ItemCategory; label: string; icon: string }[] = [
    { id: 'hair', label: 'Tóc', icon: '💇' },
    { id: 'shirt', label: 'Áo', icon: '👕' },
    { id: 'glasses', label: 'Kính', icon: '👓' },
    { id: 'hat', label: 'Mũ', icon: '🧢' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[600px] border-4 border-slate-200"
      >
        {/* Left Side: Avatar Preview */}
        <div className="w-full md:w-1/3 bg-sky-100 p-6 flex flex-col items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-slate-200">
          <div className="absolute top-4 left-4 bg-amber-400 px-4 py-2 rounded-full font-black text-amber-900 border-2 border-white shadow-md flex items-center gap-2">
            <Coins className="w-5 h-5 fill-amber-200" />
            {editingProfile.coins}
          </div>
          
          <div className="bg-white rounded-3xl p-4 shadow-xl border-4 border-white mt-12 w-full aspect-square flex items-center justify-center">
            <AvatarSVG gender={editingProfile.gender} equipped={editingProfile.equipped_items} className="w-full h-full drop-shadow-xl" />
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="mt-8 w-full bg-gradient-to-b from-green-400 to-green-500 text-white font-black text-xl py-4 rounded-2xl shadow-[0_6px_0_#15803d] border-2 border-white hover:translate-y-1 hover:shadow-none transition active:scale-95 disabled:opacity-50"
          >
            {isSaving ? 'ĐANG LƯU...' : 'LƯU & ĐÓNG'}
          </button>
          <button 
            onClick={() => onClose()}
            className="mt-4 text-slate-500 font-bold hover:text-slate-800 transition"
          >
            Hủy bỏ
          </button>
        </div>

        {/* Right Side: Shop Tabs & Items */}
        <div className="w-full md:w-2/3 bg-slate-50 flex flex-col h-full">
          {/* Tabs */}
          <div className="flex bg-white border-b-2 border-slate-200 p-4 gap-2 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[80px] py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${activeTab === tab.id ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 content-start">
            {availableItems.map(item => {
              const isUnlocked = editingProfile.unlocked_items.includes(item.id);
              const isEquipped = editingProfile.equipped_items[activeTab] === item.id;

              return (
                <div key={item.id} className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition ${isEquipped ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-sky-300'}`}>
                  <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                    {/* Tiny preview of the item by rendering the SVG with ONLY this item */}
                    <AvatarSVG 
                      gender={editingProfile.gender} 
                      equipped={{ 
                        hair: activeTab==='hair'?item.id:'none', 
                        shirt: activeTab==='shirt'?item.id:'none', 
                        glasses: activeTab==='glasses'?item.id:'none', 
                        hat: activeTab==='hat'?item.id:'none' 
                      }} 
                      className="w-[120%] h-[120%] opacity-80" 
                    />
                  </div>
                  <h3 className="font-bold text-slate-700 text-sm mb-2 truncate text-center" title={item.name}>{item.name}</h3>
                  
                  {isUnlocked ? (
                    <button
                      onClick={() => handleEquip(item)}
                      disabled={isEquipped}
                      className={`w-full py-2 rounded-xl font-bold text-sm transition ${isEquipped ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700 hover:bg-sky-200'}`}
                    >
                      {isEquipped ? 'Đang mặc' : 'Mặc vào'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuyAndEquip(item)}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 py-2 rounded-xl font-bold text-sm transition flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Coins className="w-4 h-4" /> {item.price}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
