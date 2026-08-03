"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { TOPICS, TopicId } from '@/data/generator';
import { Subject } from '@/data/questions';

interface TopicSelectionProps {
  isOpen: boolean;
  subject: Subject;
  onClose: () => void;
  onSelectTopic: (topicId: TopicId) => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({ isOpen, subject, onClose, onSelectTopic }) => {
  if (!isOpen) return null;

  const subjectTopics = TOPICS.filter(t => t.subject === subject);

  const getSubjectTitle = () => {
    switch (subject) {
      case 'math': return 'Giáo Án Toán Học';
      case 'vietnamese': return 'Giáo Án Tiếng Việt';
      case 'english': return 'Giáo Án Tiếng Anh';
      default: return 'Chọn Chủ Đề';
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div 
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${getSubjectColor()} p-6 text-center relative`}>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex justify-center items-center gap-3 mb-2">
               <BookOpen className="w-8 h-8 text-white opacity-80" />
               <h2 className="text-3xl font-black text-white drop-shadow-md tracking-wide">
                 {getSubjectTitle()}
               </h2>
            </div>
            <p className="text-white/90 font-medium">Chọn một chủ đề để bắt đầu làm bài 100 câu liên tục!</p>
          </div>

          {/* Topics List */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            {subjectTopics.map(topic => (
              <motion.button
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTopic(topic.id)}
                className="group relative flex flex-col items-start p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-lg transition-all text-left"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 group-hover:text-amber-600/80">
                  {topic.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
