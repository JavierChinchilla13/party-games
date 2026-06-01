"use client";

import { motion } from "framer-motion";
import { QuestionsPlayer } from "@/types/questions";
import { MessageSquare, Eye } from "lucide-react";

interface QuestionsResultsScreenProps {
  players: QuestionsPlayer[];
  mainQuestion: string;
  onRevealSolution: () => void;
}

export default function QuestionsResultsScreen({
  players,
  mainQuestion,
  onRevealSolution,
}: QuestionsResultsScreenProps) {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-questions/20 border border-questions/30 text-questions text-xs font-black uppercase tracking-widest mb-2">
          Debate y Deducción
        </div>
        <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent uppercase">
          RESULTADOS
        </h1>
        
        {/* Main Question Display */}
        <div className="max-w-md mx-auto p-6 glass border border-white/10 rounded-[2rem] bg-white/5 space-y-2 mt-4">
          <span className="text-[10px] font-black text-questions uppercase tracking-[0.2em]">La pregunta era:</span>
          <p className="text-xl md:text-2xl font-black text-white leading-tight">
            {mainQuestion}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 glass border border-white/10 rounded-3xl space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white/30 uppercase tracking-widest">
                {player.name}
              </span>
              <MessageSquare className="w-4 h-4 text-questions/50" />
            </div>
            <p className="text-xl font-bold text-white tracking-tight leading-tight">
              "{player.answer}"
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRevealSolution}
          className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-questions to-rose-600 text-white font-black rounded-2xl shadow-2xl transition-all text-xl tracking-tight border border-white/10"
        >
          <Eye className="w-6 h-6" />
          REVELAR SOLUCIÓN
        </motion.button>
      </div>
    </div>
  );
}
