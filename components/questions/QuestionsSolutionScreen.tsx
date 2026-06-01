"use client";

import { motion } from "framer-motion";
import { QuestionsPlayer, QuestionPair } from "@/types/questions";
import { RotateCcw, AlertTriangle, CheckCircle2, Trophy, HelpCircle } from "lucide-react";

interface QuestionsSolutionScreenProps {
  questionPair: QuestionPair;
  players: QuestionsPlayer[];
  onRestart: () => void;
}

export default function QuestionsSolutionScreen({
  questionPair,
  players,
  onRestart,
}: QuestionsSolutionScreenProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="space-y-12 py-8">
      {/* Questions Reveal */}
      <div className="space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 glass border-2 border-white/10 rounded-[2.5rem] bg-white/5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-black uppercase tracking-widest mb-4">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Pregunta Principal
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
            {questionPair.main}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-8 glass border-2 border-questions/30 rounded-[2.5rem] bg-questions/5 shadow-[0_0_30px_rgba(244,63,94,0.1)]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-questions/10 border border-questions/20 text-questions text-xs font-black uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" />
            Pregunta Diferente
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
            {questionPair.different}
          </h2>
        </motion.div>
      </div>

      {/* Results Grid */}
      <div className="space-y-6">
        <h3 className="text-sm font-black tracking-[0.3em] text-white/30 uppercase text-center">Respuestas de los jugadores</h3>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4"
        >
          {players.map((player) => (
            <motion.div
              key={player.id}
              variants={item}
              className={`p-6 rounded-[2rem] border transition-all ${
                player.isDifferent
                  ? "bg-questions/10 border-questions shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                  : "glass border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-black ${player.isDifferent ? "text-questions" : "text-white/60"}`}>
                    {player.name}
                  </span>
                  {player.isDifferent && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-questions text-white text-[10px] font-black uppercase tracking-widest">
                      <AlertTriangle className="w-3 h-3" />
                      Diferente
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-xl font-bold tracking-tight ${player.isDifferent ? "text-white" : "text-white/80"}`}>
                "{player.answer}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-6 pt-8 w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-6 w-full flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-2 text-highlight">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">¿Lograron identificarlos?</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="w-full max-md py-5 bg-gradient-to-r from-questions to-rose-600 text-white font-black rounded-3xl shadow-2xl flex items-center justify-center gap-3 text-2xl tracking-tight border border-white/10"
          >
            <RotateCcw className="w-6 h-6" />
            Nueva Partida
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
