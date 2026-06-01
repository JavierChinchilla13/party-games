"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionsGameState, QuestionsSettings } from "@/types/questions";
import { generateQuestionsGame, fetchRandomQuestionPair } from "@/lib/questions-logic";
import QuestionsPlayerList from "@/components/questions/QuestionsPlayerList";
import QuestionsCategorySelector from "@/components/questions/QuestionsCategorySelector";
import QuestionsSettingsComp from "@/components/questions/QuestionsSettings";
import QuestionsRevealScreen from "@/components/questions/QuestionsRevealScreen";
import QuestionsResultsScreen from "@/components/questions/QuestionsResultsScreen";
import QuestionsSolutionScreen from "@/components/questions/QuestionsSolutionScreen";
import ConfirmationModal from "@/components/impostor/ConfirmationModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { X, Play } from "lucide-react";

export default function QuestionsPage() {
  // Setup State with LocalStorage persistence
  const [playerNames, setPlayerNames] = useLocalStorage<string[]>("oni-games-questions-players", [
    "Jugador 1",
    "Jugador 2",
    "Jugador 3",
  ]);
  
  const [settings, setSettings] = useLocalStorage<QuestionsSettings>("oni-games-questions-settings", {
    differentCount: 1,
    categories: ["general"],
  });

  // Migración de datos viejos de LocalStorage
  useEffect(() => {
    if (settings && !settings.categories) {
      // Si detectamos el esquema viejo (category en lugar de categories)
      const oldCategory = (settings as any).category || "general";
      setSettings({
        differentCount: settings.differentCount || 1,
        categories: [oldCategory],
      });
    }
  }, [settings, setSettings]);

  // Game State
  const [gameState, setGameState] = useState<QuestionsGameState>({
    phase: "setup",
    players: [],
    questionPair: null,
    currentPlayerIndex: 0,
  });

  // Auto-scroll to top on phase change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gameState.phase]);

  // UI State
  const [isConfirmingReveal, setIsConfirmingReveal] = useState(false);
  const [isConfirmingExit, setIsConfirmingExit] = useState(false);
  const [isMissingCategories, setIsMissingCategories] = useState(false);

  const startGame = async () => {
    if (settings.categories.length === 0) {
      setIsMissingCategories(true);
      return;
    }
    const questionPair = await fetchRandomQuestionPair(settings.categories);
    const initialGameState = generateQuestionsGame(playerNames, settings, questionPair);
    setGameState(initialGameState);
  };

  const handleAnswer = (answer: string, callback?: () => void) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[prev.currentPlayerIndex] = {
        ...newPlayers[prev.currentPlayerIndex],
        answer,
      };
      
      return {
        ...prev,
        players: newPlayers
      };
    });
    
    if (callback) {
      setTimeout(callback, 50);
    }
  };

  const handleNextPlayer = () => {
    setGameState(prev => {
      if (prev.currentPlayerIndex < prev.players.length - 1) {
        return {
          ...prev,
          currentPlayerIndex: prev.currentPlayerIndex + 1,
        };
      } else {
        return {
          ...prev,
          phase: "results",
        };
      }
    });
  };

  const restartGame = () => {
    setGameState({
      phase: "setup",
      players: [],
      questionPair: null,
      currentPlayerIndex: 0,
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen text-white relative">
      <div className="max-w-xl mx-auto px-6 py-8 pb-32">
        {/* Top Exit Button */}
        <AnimatePresence>
          {gameState.phase !== "setup" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 z-50"
            >
              <button
                onClick={() => setIsConfirmingExit(true)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl glass border border-white/20 text-white/70 hover:text-white hover:bg-white/10 shadow-xl transition-all"
                title="Salir al menú"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {gameState.phase === "setup" && (
            <motion.div 
              key="setup"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-questions/20 border border-questions/30 text-questions text-xs font-black uppercase tracking-widest mb-2">
                  Deducción Grupal
                </div>
                <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-none">
                  PREGUNTA DIFERENTE
                </h1>
                <p className="text-white/50 font-medium text-lg">
                  Todos responderán una pregunta. Pero algunos recibirán una pregunta diferente. ¿Podrás descubrir quién la tenía?
                </p>
              </header>

              <QuestionsPlayerList players={playerNames} setPlayers={setPlayerNames} />

              <QuestionsCategorySelector
                selectedCategories={settings.categories}
                setSelectedCategories={(categories) => setSettings({ ...settings, categories })}
              />

              <QuestionsSettingsComp
                differentCount={settings.differentCount}
                setDifferentCount={(count) => setSettings({ ...settings, differentCount: count })}
                playersCount={playerNames.length}
              />

              {/* Floating Start Button */}
              <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background/95 to-transparent z-40 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="w-full max-w-md py-5 bg-gradient-to-r from-questions to-rose-600 text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(244,63,94,0.3)] flex items-center justify-center gap-3 text-2xl tracking-tight border border-white/10"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Iniciar Juego
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameState.phase === "reveal" && (
            <motion.div
              key="reveal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <QuestionsRevealScreen
                player={gameState.players[gameState.currentPlayerIndex]}
                onAnswer={handleAnswer}
                onNext={handleNextPlayer}
                isLastPlayer={gameState.currentPlayerIndex === gameState.players.length - 1}
              />
            </motion.div>
          )}

          {gameState.phase === "results" && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <QuestionsResultsScreen
                players={gameState.players}
                mainQuestion={gameState.questionPair!.main}
                onRevealSolution={() => setIsConfirmingReveal(true)}
              />
            </motion.div>
          )}

          {gameState.phase === "solution" && (
            <motion.div
              key="solution"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <QuestionsSolutionScreen
                questionPair={gameState.questionPair!}
                players={gameState.players}
                onRestart={restartGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmationModal
        isOpen={isConfirmingReveal}
        onClose={() => setIsConfirmingReveal(false)}
        onConfirm={() => {
          setIsConfirmingReveal(false);
          setGameState({ ...gameState, phase: "solution" });
        }}
        title="¿Revelar solución?"
        message="¿Seguro que deseas revelar la solución? Todos sabrán quiénes tenían la pregunta diferente."
      />

      <ConfirmationModal
        isOpen={isConfirmingExit}
        onClose={() => setIsConfirmingExit(false)}
        onConfirm={() => {
          setIsConfirmingExit(false);
          restartGame();
        }}
        title="¿Abandonar partida?"
        message="Se perderá el progreso actual y volverás a la configuración."
      />

      <ConfirmationModal
        isOpen={isMissingCategories}
        onClose={() => setIsMissingCategories(false)}
        onConfirm={() => setIsMissingCategories(false)}
        title="¡Faltan categorías!"
        message="Debes seleccionar al menos una categoría para poder iniciar el juego."
        confirmText="ELEGIR CATEGORÍAS"
        showCancel={false}
      />
    </div>
  );
}
