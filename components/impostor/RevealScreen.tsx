"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImpostorPlayer, SecretWord } from "@/types/impostor";
import { ArrowRight, AlertTriangle, Ghost, Fingerprint } from "lucide-react";

interface RevealScreenProps {
  player: ImpostorPlayer;
  secretWord: SecretWord;
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
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-12 py-8">
      {/* Player Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black tracking-[0.4em] text-white/30 uppercase">Siguiente Jugador</span>
        <h2 className="text-6xl font-black tracking-tighter text-white uppercase">{player.name}</h2>
      </div>

      {/* Secret Card */}
      <div className="relative w-full max-w-sm aspect-[3/4] perspective-[1000px]">
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
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 rounded-[2.5rem] glass border-2 border-white/10 shadow-2xl"
          >
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <Fingerprint className="w-12 h-12 text-white/20" />
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-black text-white/80 tracking-tight">TARJETA SECRETA</h3>
              <p className="text-sm font-medium text-white/40 max-w-[200px] mx-auto">
                Mantén presionado para revelar tu palabra
              </p>
            </div>

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-transparent" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary">MANTENER</span>
            </motion.div>
          </div>

          {/* Back of Card (Revealed) */}
          <div 
            className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 shadow-2xl ${
              player.role === "impostor"
                ? "bg-danger/20 border-danger shadow-danger/20"
                : "bg-primary/20 border-primary shadow-primary/20"
            }`}
          >
            {player.role === "impostor" ? (
              <div className="flex flex-col items-center text-center space-y-8">
                <AlertTriangle className="w-20 h-20 text-danger" />
                <div className="space-y-2">
                  <h4 className="text-sm font-black tracking-[0.4em] text-danger uppercase">Eres el</h4>
                  <h3 className="text-5xl font-black tracking-tighter text-white">IMPOSTOR</h3>
                </div>
                
                <div className="w-full p-6 bg-black/40 rounded-3xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Pista</span>
                  <p className="text-3xl font-black text-danger uppercase tracking-tight leading-none">
                    {showHints ? secretWord.hint : "???"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-8">
                <Ghost className="w-20 h-20 text-primary" />
                <div className="space-y-2">
                  <h4 className="text-sm font-black tracking-[0.4em] text-primary uppercase">Tu palabra es:</h4>
                  <h3 className="text-6xl font-black tracking-tighter text-white uppercase">{secretWord.word}</h3>
                </div>
                
                <div className="w-full p-6 bg-black/40 rounded-3xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Categoría</span>
                  <p className="text-xl font-black text-accent uppercase tracking-wide">
                    {secretWord.category}
                  </p>
                </div>
              </div>
            )}
            
            <p className="absolute bottom-8 text-[10px] font-bold text-white/30 uppercase tracking-widest">
              Suelta para ocultar
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer / Next Button */}
      <div className="h-20 w-full flex justify-center items-center">
        <AnimatePresence>
          {hasSeenWord && !isHolding && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={onNext}
              className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-xl tracking-tight"
            >
              {isLastPlayer ? "IR AL DEBATE" : "SIGUIENTE JUGADOR"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
    </div>
  );
}
