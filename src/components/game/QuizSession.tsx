"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, XCircle, LogOut, Flame } from 'lucide-react';
import { Subject, Question } from '@/data/questions';
import { TopicId, generateQuestion, TOPICS } from '@/data/generator';
import { playCorrectSound, playWrongSound, startBackgroundMusic, stopBackgroundMusic } from '@/utils/sound';

interface QuizSessionProps {
  isOpen: boolean;
  subject: Subject;
  topicId: TopicId;
  isMuted: boolean;
  onSessionEnd: (coinsEarned: number, correctAnswers: number) => void;
}

export const QuizSession: React.FC<QuizSessionProps> = ({ isOpen, subject, topicId, isMuted, onSessionEnd }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  
  // Tiến trình Session
  const [questionIndex, setQuestionIndex] = useState(1);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);

  const MAX_QUESTIONS = 100;

  // Load câu hỏi đầu tiên khi mở Session
  useEffect(() => {
    if (isOpen && topicId) {
      setCurrentQuestion(generateQuestion(topicId));
      setQuestionIndex(1);
      setSessionCoins(0);
      setCorrectAnswers(0);
      setStreak(0);
      setSelectedAnswer(null);
      setIsAnswering(false);
      
      // Bật nhạc nền nếu không tắt âm
      if (!isMuted) startBackgroundMusic();
    }

    return () => {
      stopBackgroundMusic();
    };
  }, [isOpen, topicId]);

  if (!isOpen || !currentQuestion) return null;

  const handleSelect = (index: number) => {
    if (isAnswering) return;
    setSelectedAnswer(index);
    setIsAnswering(true);

    const isCorrect = index === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Phát âm thanh chiến thắng
      if (!isMuted) playCorrectSound();

      // Bắn pháo hoa nhỏ ăn mừng liên tiếp
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#fbbf24', '#3b82f6']
      });

      // Tăng điểm
      const comboBonus = Math.floor(streak / 5) * 2; // Cứ 5 streak thưởng thêm 2 xu
      setSessionCoins(prev => prev + 10 + comboBonus);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);

      // Nếu đạt 100 câu thì dừng luôn
      if (questionIndex >= MAX_QUESTIONS) {
        setTimeout(() => {
          onSessionEnd(sessionCoins + 10 + comboBonus, correctAnswers + 1);
        }, 1500);
        return;
      }

      // Chuyển sang câu tiếp theo sau 1.2s
      setTimeout(() => {
        setCurrentQuestion(generateQuestion(topicId));
        setQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswering(false);
      }, 1200);

    } else {
      // Phát âm thanh thất bại
      if (!isMuted) playWrongSound();

      // Nếu sai, đứt chuỗi combo, chờ 1s cho làm lại
      setStreak(0);
      setTimeout(() => {
        setIsAnswering(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const topicInfo = TOPICS.find(t => t.id === topicId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop không click được để bắt buộc hoàn thành hoặc bấm nút Dừng */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-white flex flex-col max-h-[95vh]"
        >
          {/* Header & HUD */}
          <div className="bg-slate-800 p-4 sm:p-6 text-white relative flex flex-col gap-4">
            
            {/* Top Row: Info & Exit Button */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-400 drop-shadow-md tracking-wide">
                  {topicInfo?.title || 'Chế độ Ôn Tập'}
                </h2>
                <div className="text-slate-400 font-medium text-sm mt-1 flex items-center gap-2">
                  <span>Câu hỏi {questionIndex} / {MAX_QUESTIONS}</span>
                </div>
              </div>
              
              <button 
                onClick={() => onSessionEnd(sessionCoins, correctAnswers)}
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-bold transition shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Dừng & Nhận Thưởng</span>
              </button>
            </div>

            {/* Bottom Row: Stats (Coins & Streak) */}
            <div className="flex gap-3">
              <div className="bg-slate-700/50 rounded-xl px-4 py-2 flex items-center gap-3 border border-slate-600">
                <Trophy className="w-6 h-6 text-amber-400" />
                <span className="font-black text-xl text-white">+{sessionCoins} Xu</span>
              </div>
              
              {streak > 1 && (
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-orange-500/20 rounded-xl px-4 py-2 flex items-center gap-2 border border-orange-500/50"
                >
                  <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                  <span className="font-black text-xl text-orange-400">Combo x{streak}!</span>
                </motion.div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-700">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(questionIndex / MAX_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-4 sm:p-8 overflow-y-auto">
            <div className="bg-sky-50 rounded-3xl p-6 mb-8 border-4 border-sky-100 shadow-inner min-h-[140px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 pattern-dots pattern-blue-500 pattern-bg-transparent pattern-size-4 pattern-opacity-10 mix-blend-multiply"></div>
              <p className="text-2xl sm:text-4xl font-black text-slate-700 text-center leading-relaxed relative z-10">
                {currentQuestion.text}
              </p>
            </div>

            {/* Answers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                
                let buttonStyle = "bg-white border-4 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 shadow-sm";
                
                if (isAnswering && isSelected) {
                  if (isCorrect) {
                    buttonStyle = "bg-green-500 border-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] scale-105 z-10";
                  } else {
                    buttonStyle = "bg-red-500 border-red-600 text-white animate-shake";
                  }
                } else if (isAnswering && !isSelected) {
                   buttonStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-60"; // Mờ các lựa chọn khác
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswering}
                    onClick={() => handleSelect(index)}
                    className={`relative p-5 sm:p-6 rounded-3xl font-black text-xl sm:text-2xl transition-all duration-300 active:scale-95 flex items-center justify-center min-h-[100px] ${buttonStyle}`}
                  >
                    <span className="relative z-10">{option}</span>
                    
                    {isAnswering && isSelected && isCorrect && (
                      <CheckCircle className="absolute right-6 w-8 h-8 text-white opacity-90 drop-shadow-md" />
                    )}
                    {isAnswering && isSelected && !isCorrect && (
                      <XCircle className="absolute right-6 w-8 h-8 text-white opacity-90 drop-shadow-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
