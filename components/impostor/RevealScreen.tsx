"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player, Word } from "@/types/impostor";
import { ArrowRight, AlertTriangle, Ghost, Fingerprint } from "lucide-react";

interface RevealScreenProps {
  player: Player;
  secretWord: Word;
  showHints: boolean;
  onNext: () => void;
  isLastPlayer: boolean;
}

export default function RevealScreen({
  player,
  secretWord,
  showHints,
  onNext,
  isLastPlayer,
}: RevealScreenProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [hasSeenWord, setHasSeenWord] = useState(false);

  const handlePointerDown = () => {
    setIsHolding(true);
    setHasSeenWord(true);
  };

  const handlePointerUp = () => {
    setIsHolding(false);
  };

  return (
    <motion.div 
      key={player.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[80vh] md:min-h-[70vh] flex flex-col items-center justify-center space-y-6 md:space-y-8 py-4 md:py-8"
    >
      {/* Player Header - Smaller and more compact */}
      <div className="text-center space-y-1">
        <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">Turno de</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase truncate max-w-[300px]">{player.name}</h2>
      </div>

      {/* Secret Card - Optimized height */}
      <div className="relative w-full max-w-[280px] md:max-w-sm aspect-[3/4.2] perspective-[1000px]">
        <motion.div
          animate={{ rotateY: isHolding ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-full h-full transform-style-3d cursor-pointer select-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Front of Card (Hidden) */}
          <div 
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass border-2 border-white/10 shadow-2xl"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Fingerprint className="w-10 h-10 text-white/20" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-white/80 tracking-tight uppercase">Tarjeta</h3>
              <p className="text-xs font-medium text-white/40 max-w-[180px] mx-auto">
                Mantén para revelar
              </p>
            </div>

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2"
            >
              <div className="w-1 h-6 md:h-8 rounded-full bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
          </div>

          {/* Back of Card (Revealed) */}
          <div 
            className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 shadow-2xl ${
              player.role === "impostor"
                ? "bg-danger/20 border-danger shadow-danger/20"
                : "bg-primary/20 border-primary shadow-primary/20"
            }`}
          >
            {player.role === "impostor" ? (
              <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-danger" />
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-danger uppercase">Eres el</h4>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">IMPOSTOR</h3>
                </div>
                
                <div className="w-full p-4 md:p-6 bg-black/40 rounded-2xl md:rounded-3xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Pista</span>
                  <p className="text-2xl md:text-3xl font-black text-danger uppercase tracking-tight leading-none">
                    {showHints ? secretWord.hint : "???"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
                <Ghost className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Tu palabra:</h4>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">{secretWord.word}</h3>
                </div>
                
                <div className="w-full p-4 md:p-6 bg-black/40 rounded-2xl md:rounded-3xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Categoría</span>
                  <p className="text-base md:text-xl font-black text-accent uppercase tracking-wide">
                    {secretWord.category}
                  </p>
                </div>
              </div>
            )}
            
            <p className="absolute bottom-6 md:bottom-8 text-[10px] font-bold text-white/30 uppercase tracking-widest">
              Suelta para ocultar
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer / Next Button - Lower height */}
      <div className="h-16 md:h-20 w-full flex justify-center items-center">
        <AnimatePresence>
          {hasSeenWord && !isHolding && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                setHasSeenWord(false);
                onNext();
              }}
              className="group flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg md:text-xl tracking-tight"
            >
              {isLastPlayer ? "IR AL DEBATE" : "SIGUIENTE JUGADOR"}
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
}
