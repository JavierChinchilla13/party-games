"use client";

import { motion } from "framer-motion";
import { Player, Word } from "@/types/impostor";
import { RotateCcw, AlertTriangle, CheckCircle2, Trophy } from "lucide-react";

interface SolutionScreenProps {
  secretWord: Word;
  players: Player[];
  onRestart: () => void;
}

export default function SolutionScreen({
  secretWord,
  players,
  onRestart,
}: SolutionScreenProps) {
  const impostors = players.filter((p) => p.role === "impostor");

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
      {/* Secret Word Reveal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-black uppercase tracking-widest mb-4">
          <CheckCircle2 className="w-4 h-4 text-success" />
          La palabra secreta era
        </div>
        <h2 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent uppercase">
          {secretWord.word}
        </h2>
        <p className="text-xl font-bold text-white/40 uppercase tracking-widest">
          Categoría: {secretWord.category}
        </p>
      </motion.div>

      {/* Results Grid */}
      <div className="space-y-6">
        <h3 className="text-sm font-black tracking-[0.3em] text-white/30 uppercase text-center">Resultados</h3>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-3"
        >
          {players.map((player) => (
            <motion.div
              key={player.id}
              variants={item}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                player.role === "impostor"
                  ? "bg-danger/10 border-danger/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                  : "glass border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                  player.role === "impostor" ? "bg-danger text-white" : "bg-white/10 text-white/40"
                }`}>
                  {player.role === "impostor" ? "!" : "#"}
                </div>
                <span className={`text-lg font-black ${player.role === "impostor" ? "text-white" : "text-white/60"}`}>
                  {player.name}
                </span>
              </div>

              {player.role === "impostor" && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-danger text-white text-[10px] font-black uppercase tracking-widest">
                  <AlertTriangle className="w-3 h-3" />
                  Impostor
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-6 pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-6 w-full"
        >
          <div className="flex items-center justify-center gap-2 text-highlight">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">¿Quién ganó la partida?</span>
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
