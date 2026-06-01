"use client";

import { motion } from "framer-motion";
import { Settings, Users, Plus, Minus } from "lucide-react";

interface SimilarSettingsProps {
  differentCount: number;
  setDifferentCount: (count: number) => void;
  playersCount: number;
}

export default function SimilarSettings({
  differentCount,
  setDifferentCount,
  playersCount,
}: SimilarSettingsProps) {
  const maxDifferent = Math.max(1, playersCount - 1);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-highlight" />
        <h2 className="text-xl font-black tracking-tight uppercase">Configuración</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Different Players Count */}
        <div className="p-6 glass border border-white/10 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white/70">Jugadores Diferentes</span>
            <div className="bg-highlight/20 text-highlight px-3 py-1 rounded-full text-xs font-black">
              {differentCount === 1 ? "1 JUGADOR" : `${differentCount} JUGADORES`}
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 bg-black/20 p-2 rounded-2xl border border-white/5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDifferentCount(Math.max(1, differentCount - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
              disabled={differentCount <= 1}
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            
            <span className="text-3xl font-black text-white">{differentCount}</span>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDifferentCount(Math.min(maxDifferent, differentCount + 1))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
              disabled={differentCount >= maxDifferent}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider text-center">
            MÁXIMO PERMITIDO: {maxDifferent}
          </p>
        </div>
      </div>
    </div>
  );
}
