"use client";

import { motion } from "framer-motion";
import { SimilarPlayer, WordPair } from "@/types/similar";
import { RotateCcw, CheckCircle2, Trophy, HelpCircle, AlertCircle } from "lucide-react";

interface SimilarSolutionScreenProps {
  wordPair: WordPair;
  players: SimilarPlayer[];
  onRestart: () => void;
}

export default function SimilarSolutionScreen({
  wordPair,
  players,
  onRestart,
}: SimilarSolutionScreenProps) {
  const differentPlayers = players.filter((p) => p.isDifferent);

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
    <div className="space-y-12 py-8 flex flex-col items-center">
      {/* Words Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 glass border border-white/10 rounded-[2.5rem] space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest mx-auto">
            <CheckCircle2 className="w-3 h-3 text-success" />
            Palabra Principal
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase break-words">
            {wordPair.main}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-8 bg-accent/10 border border-accent/20 rounded-[2.5rem] space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
            <HelpCircle className="w-3 h-3" />
            Palabra Diferente
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-accent uppercase break-words">
            {wordPair.different}
          </h2>
        </motion.div>
      </div>

      {/* Results Grid */}
      <div className="space-y-6 w-full max-w-md">
        <h3 className="text-sm font-black tracking-[0.3em] text-white/30 uppercase text-center">Jugadores Diferentes</h3>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-3 w-full"
        >
          {differentPlayers.map((player) => (
            <motion.div
              key={player.id}
              variants={item}
              className="flex items-center justify-between p-4 rounded-2xl border bg-accent/10 border-accent/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] w-full overflow-hidden"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black bg-accent text-black shrink-0">
                  ?
                </div>
                <span className="text-lg font-black text-white truncate">
                  {player.name}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-black text-[10px] font-black uppercase tracking-widest shrink-0 ml-4">
                <AlertCircle className="w-3 h-3" />
                Diferente
              </div>
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
            <span className="text-xs font-black uppercase tracking-[0.2em]">¿Lograron descubrirlo?</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="w-full max-w-sm py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(124,58,237,0.3)] flex items-center justify-center gap-3 text-2xl tracking-tight border border-white/10"
          >
            <RotateCcw className="w-6 h-6" />
            Nueva Partida
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
