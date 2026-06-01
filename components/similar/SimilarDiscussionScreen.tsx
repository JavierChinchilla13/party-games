"use client";

import { motion } from "framer-motion";
import { SimilarPlayer } from "@/types/similar";
import { MessageSquare, Users, Eye } from "lucide-react";

interface SimilarDiscussionScreenProps {
  startingPlayer: SimilarPlayer;
  onRevealSolution: () => void;
}

export default function SimilarDiscussionScreen({
  startingPlayer,
  onRevealSolution,
}: SimilarDiscussionScreenProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12 py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl border border-white/20">
          <MessageSquare className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      <div className="text-center space-y-6 max-w-sm">
        <h2 className="text-4xl font-black tracking-tighter text-white">¡A DEBATIR!</h2>
        <p className="text-white/60 font-medium leading-relaxed">
          La partida ha comenzado. Hablen entre ustedes e intenten descubrir quién tiene la palabra diferente.
        </p>
      </div>

      <div className="w-full p-8 glass border border-white/10 rounded-[2.5rem] space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Empieza el debate:</span>
          <h3 className="text-4xl font-black tracking-tight text-white">{startingPlayer.name}</h3>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
          <div className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-white/20" />
            <span className="text-[10px] font-bold text-white/30 uppercase">Todos hablan</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <Eye className="w-5 h-5 text-white/20" />
            <span className="text-[10px] font-bold text-white/30 uppercase">Observen bien</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRevealSolution}
          className="w-full max-w-xs py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 tracking-tight"
        >
          REVELAR SOLUCIÓN
        </motion.button>
        <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
          Solo cuando tengan un sospechoso
        </p>
      </div>
    </div>
  );
}
