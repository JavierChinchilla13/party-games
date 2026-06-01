"use client";

import { motion } from "framer-motion";
import { Settings, Info, Plus, Minus, Eye, EyeOff } from "lucide-react";

interface ImpostorSettingsProps {
  impostorsCount: number;
  setImpostorsCount: (count: number) => void;
  showHints: boolean;
  setShowHints: (show: boolean) => void;
  playersCount: number;
}

export default function ImpostorSettings({
  impostorsCount,
  setImpostorsCount,
  showHints,
  setShowHints,
  playersCount,
}: ImpostorSettingsProps) {
  const maxImpostors = Math.floor(playersCount / 2);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-highlight" />
        <h2 className="text-xl font-black tracking-tight uppercase">Configuración</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Impostors Count */}
        <div className="p-6 glass border border-white/10 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white/70">Impostores</span>
            <div className="bg-highlight/20 text-highlight px-3 py-1 rounded-full text-xs font-black">
              {impostorsCount === 1 ? "1 IMPOSTOR" : `${impostorsCount} IMPOSTORES`}
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 bg-black/20 p-2 rounded-2xl border border-white/5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setImpostorsCount(Math.max(1, impostorsCount - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
              disabled={impostorsCount <= 1}
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            
            <span className="text-3xl font-black text-white">{impostorsCount}</span>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setImpostorsCount(Math.min(maxImpostors, impostorsCount + 1))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
              disabled={impostorsCount >= maxImpostors}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider text-center">
            MÁXIMO RECOMENDADO: {maxImpostors}
          </p>
        </div>

        {/* Hints Switch */}
        <div className="p-6 glass border border-white/10 rounded-3xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white/70">Pistas</span>
            {showHints ? (
              <Eye className="w-5 h-5 text-accent" />
            ) : (
              <EyeOff className="w-5 h-5 text-white/30" />
            )}
          </div>
          
          <button
            onClick={() => setShowHints(!showHints)}
            className={`relative flex items-center justify-between w-full p-4 rounded-2xl border transition-all font-black text-sm ${
              showHints
                ? "bg-accent/20 border-accent/50 text-accent"
                : "bg-white/5 border-white/10 text-white/30"
            }`}
          >
            <span>{showHints ? "ACTIVADAS" : "DESACTIVADAS"}</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${showHints ? "bg-accent" : "bg-white/10"}`}>
              <motion.div
                animate={{ x: showHints ? 20 : 0 }}
                className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full"
              />
            </div>
          </button>
          
          <div className="flex items-start gap-2 text-white/30">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p className="text-[10px] font-medium leading-tight">
              Si se desactivan, los impostores no verán ninguna pista, solo "ERES EL IMPOSTOR".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
