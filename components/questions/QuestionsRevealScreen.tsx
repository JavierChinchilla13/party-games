"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionsPlayer } from "@/types/questions";
import { ArrowRight, Fingerprint, HelpCircle, Send } from "lucide-react";

interface QuestionsRevealScreenProps {
  player: QuestionsPlayer;
  onAnswer: (answer: string, callback?: () => void) => void;
  onNext: () => void;
  isLastPlayer: boolean;
}

export default function QuestionsRevealScreen({
  player,
  onAnswer,
  onNext,
  isLastPlayer,
}: QuestionsRevealScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      // Pasar la lógica de avanzar como callback para asegurar el orden
      onAnswer(answer.trim(), () => {
        // Limpiar estados locales
        setAnswer("");
        setIsRevealed(false);

        // Automatizar el paso al siguiente jugador o resultados
        setTimeout(() => {
          onNext();
        }, 100); 
      });
    }
  };

  return (
    <motion.div 
      key={player.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 py-8"
    >
      {/* Player Header */}
      <div className="text-center space-y-1">
        <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">Turno de</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase truncate max-w-[300px]">{player.name}</h2>
      </div>

      {/* Secret Card - Toggle Version */}
      <div className="relative w-full max-w-[280px] md:max-w-sm aspect-[3/2] perspective-[1000px]">
        <motion.div
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-full h-full transform-style-3d cursor-pointer select-none"
          onClick={toggleReveal}
        >
          {/* Front of Card (Hidden) */}
          <div 
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 rounded-[2.5rem] glass border-2 border-white/10 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Fingerprint className="w-8 h-8 text-white/20" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-white/80 tracking-tight uppercase">Tarjeta</h3>
              <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
                Toca para ver pregunta
              </p>
            </div>
          </div>

          {/* Back of Card (Revealed) */}
          <div 
            className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-2 bg-questions/20 border-questions shadow-2xl shadow-questions/20"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <HelpCircle className="w-12 h-12 text-questions" />
              <p className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
                {player.question}
              </p>
            </div>
            
            <p className="absolute bottom-4 text-[8px] font-bold text-white/30 uppercase tracking-widest">
              Toca para ocultar
            </p>
          </div>
        </motion.div>
      </div>

      {/* Answer Input and Footer - Always visible until auto-next */}
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute -top-6 left-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Tu respuesta</span>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Escribe aquí..."
              className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-questions/50 focus:border-questions transition-all shadow-inner"
              onKeyDown={(e) => e.key === "Enter" && handleSubmitAnswer()}
              autoFocus
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitAnswer}
            disabled={!answer.trim()}
            className="w-full py-4 bg-questions text-white font-black rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all shadow-xl shadow-questions/20 uppercase tracking-tight"
          >
            <Send className="w-5 h-5" />
            {isLastPlayer ? "FINALIZAR Y VER RESULTADOS" : "ENVIAR Y SIGUIENTE"}
          </motion.button>
        </div>
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
