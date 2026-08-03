"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { questions, Subject, Question } from '@/data/questions';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  onCorrectAnswer: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, subject, onCorrectAnswer }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Chọn ngẫu nhiên 1 câu hỏi khi mở Modal
  useEffect(() => {
    if (isOpen) {
      const subjectQuestions = questions.filter(q => q.subject === subject);
      if (subjectQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
        setCurrentQuestion(subjectQuestions[randomIndex]);
      }
      setSelectedAnswer(null);
      setIsAnswering(false);
    }
  }, [isOpen, subject]);

  if (!isOpen || !currentQuestion) return null;

  const handleSelect = (index: number) => {
    if (isAnswering) return;
    setSelectedAnswer(index);
    setIsAnswering(true);

    const isCorrect = index === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Bắn pháo hoa
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      // Báo về Component cha sau 1.5s
      setTimeout(() => {
        onCorrectAnswer();
        onClose();
      }, 1500);
    } else {
      // Nếu sai, cho làm lại sau 1s
      setTimeout(() => {
        setIsAnswering(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const getSubjectTitle = () => {
    switch (subject) {
      case 'math': return 'Thử Thách Toán Học';
      case 'vietnamese': return 'Thử Thách Tiếng Việt';
      case 'english': return 'Thử Thách Tiếng Anh';
      default: return 'Thử Thách';
    }
  };

  const getSubjectColor = () => {
    switch (subject) {
      case 'math': return 'from-blue-500 to-blue-700';
      case 'vietnamese': return 'from-rose-500 to-rose-700';
      case 'english': return 'from-indigo-500 to-indigo-700';
      default: return 'from-slate-500 to-slate-700';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Box */}
        <motion.div 
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${getSubjectColor()} p-6 text-center relative`}>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-3xl font-black text-white drop-shadow-md tracking-wide">
              {getSubjectTitle()}
            </h2>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border-2 border-slate-100 shadow-inner min-h-[120px] flex items-center justify-center">
              <p className="text-xl sm:text-2xl font-bold text-slate-700 text-center leading-relaxed">
                {currentQuestion.text}
              </p>
            </div>

            {/* Answers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                
                let buttonStyle = "bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 shadow-sm";
                
                if (isAnswering && isSelected) {
                  if (isCorrect) {
                    buttonStyle = "bg-green-500 border-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]";
                  } else {
                    buttonStyle = "bg-red-500 border-red-600 text-white animate-shake";
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswering}
                    onClick={() => handleSelect(index)}
                    className={`relative p-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center min-h-[80px] ${buttonStyle}`}
                  >
                    <span className="relative z-10">{option}</span>
                    
                    {isAnswering && isSelected && isCorrect && (
                      <CheckCircle className="absolute right-4 w-6 h-6 text-white opacity-80" />
                    )}
                    {isAnswering && isSelected && !isCorrect && (
                      <XCircle className="absolute right-4 w-6 h-6 text-white opacity-80" />
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
