import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader2 } from 'lucide-react';
import { supabase, UserProfile } from '@/utils/supabase';

interface LoginScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Bé hãy nhập tên vào nhé!');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // 1. Kiểm tra xem tên này đã có trong Database chưa
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', cleanName)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        // Hồ sơ đã tồn tại, lấy dữ liệu cũ
        onLoginSuccess(data as UserProfile);
      } else {
        // Hồ sơ mới, tạo mới trên Database
        const newProfile: UserProfile = {
          name: cleanName,
          coins: 0,
          math_level: 1,
          vietnamese_level: 1,
          english_level: 1
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert([newProfile]);

        if (insertError) {
          throw insertError;
        }

        onLoginSuccess(newProfile);
      }
    } catch (err: any) {
      console.error(err);
      setError('Đã có lỗi xảy ra. Bé hãy kiểm tra lại kết nối mạng nhé!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-sky-200/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full mx-4 border-4 border-sky-300 text-center"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 mx-auto bg-amber-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-6"
        >
          <span className="text-5xl">👑</span>
        </motion.div>
        
        <h1 className="text-3xl font-black text-slate-800 mb-2">Chào mừng Thị trưởng!</h1>
        <p className="text-slate-500 mb-8 font-medium">Hãy nhập tên của bé để bắt đầu quản lý Thành phố nhé.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bé..."
            className="w-full px-6 py-4 rounded-full bg-slate-100 border-2 border-slate-200 text-xl font-bold text-center text-slate-700 outline-none focus:border-sky-400 focus:bg-white transition placeholder-slate-400"
            disabled={isLoading}
            maxLength={20}
          />

          {error && (
            <span className="text-rose-500 font-bold text-sm">{error}</span>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-black text-xl py-4 rounded-full shadow-[0_6px_0_#0284c7] hover:shadow-[0_4px_0_#0284c7] hover:translate-y-[2px] transition flex justify-center items-center gap-2 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <LogIn className="w-6 h-6" />
                VÀO THÀNH PHỐ
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
