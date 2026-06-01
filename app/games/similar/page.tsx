"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SimilarGameState, SimilarSettings } from "@/types/similar";
import { generateSimilarGame, fetchRandomWordPair } from "@/lib/similar-logic";
import PlayerList from "@/components/impostor/PlayerList";
import SimilarCategorySelector from "@/components/similar/SimilarCategorySelector";
import SimilarSettingsComponent from "@/components/similar/SimilarSettings";
import SimilarRevealScreen from "@/components/similar/SimilarRevealScreen";
import SimilarDiscussionScreen from "@/components/similar/SimilarDiscussionScreen";
import SimilarSolutionScreen from "@/components/similar/SimilarSolutionScreen";
import ConfirmationModal from "@/components/impostor/ConfirmationModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { X, Play } from "lucide-react";

export default function SimilarGamePage() {
  // Setup State with LocalStorage persistence
  const [playerNames, setPlayerNames] = useLocalStorage<string[]>("oni-games-similar-players", [
    "Jugador 1",
    "Jugador 2",
    "Jugador 3",
  ]);
  
  const [settings, setSettings] = useLocalStorage<SimilarSettings>("oni-games-similar-settings", {
    differentCount: 1,
    categories: ["comidas-bebidas"],
  });

  // Game State
  const [gameState, setGameState] = useState<SimilarGameState>({
    phase: "setup",
    players: [],
    wordPair: null,
    currentPlayerIndex: 0,
    startingPlayerId: null,
  });

  // Auto-scroll to top on phase change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gameState.phase]);

  // UI State
  const [isConfirmingReveal, setIsConfirmingReveal] = useState(false);
  const [isConfirmingExit, setIsConfirmingExit] = useState(false);

  const startGame = async () => {
    if (settings.categories.length === 0) {
      alert("Por favor selecciona al menos una categoría.");
      return;
    }
    const wordPair = await fetchRandomWordPair(settings.categories);
    const initialGameState = generateSimilarGame(playerNames, settings, wordPair);
    setGameState(initialGameState);
  };

  const handleNextPlayer = () => {
    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      setGameState({
        ...gameState,
        currentPlayerIndex: gameState.currentPlayerIndex + 1,
      });
    } else {
      setGameState({
        ...gameState,
        phase: "discussion",
      });
    }
  };

  const restartGame = () => {
    setGameState({
      phase: "setup",
      players: [],
      wordPair: null,
      currentPlayerIndex: 0,
      startingPlayerId: null,
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
                <div className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-black uppercase tracking-widest mb-2">
                  Agudeza Mental
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  PALABRA SIMILAR
                </h1>
                <p className="text-white/50 font-medium text-lg">
                  Todos reciben una palabra, pero algunos una parecida. ¿Quién miente?
                </p>
              </header>

              <PlayerList players={playerNames} setPlayers={setPlayerNames} />

              <SimilarCategorySelector
                selectedCategories={settings.categories}
                setSelectedCategories={(categories) => setSettings({ ...settings, categories })}
              />

              <SimilarSettingsComponent
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
                  className="w-full max-w-md py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3 text-2xl tracking-tight border border-white/10"
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
              <SimilarRevealScreen
                player={gameState.players[gameState.currentPlayerIndex]}
                onNext={handleNextPlayer}
                isLastPlayer={gameState.currentPlayerIndex === gameState.players.length - 1}
              />
            </motion.div>
          )}

          {gameState.phase === "discussion" && (
            <motion.div
              key="discussion"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SimilarDiscussionScreen
                startingPlayer={gameState.players.find((p) => p.id === gameState.startingPlayerId)!}
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
              <SimilarSolutionScreen
                wordPair={gameState.wordPair!}
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
        message="Se mostrarán las dos palabras y quiénes tenían la diferente."
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
    </div>
  );
}
