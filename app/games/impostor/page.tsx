"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState, GameSettings } from "@/types/impostor";
import { generateGame, fetchRandomWord } from "@/lib/impostor-logic";
import PlayerList from "@/components/impostor/PlayerList";
import CategorySelector from "@/components/impostor/CategorySelector";
import ImpostorSettings from "@/components/impostor/ImpostorSettings";
import RevealScreen from "@/components/impostor/RevealScreen";
import DiscussionScreen from "@/components/impostor/DiscussionScreen";
import SolutionScreen from "@/components/impostor/SolutionScreen";
import ConfirmationModal from "@/components/impostor/ConfirmationModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { X, Play } from "lucide-react";

export default function ImpostorPage() {
  // Setup State with LocalStorage persistence
  const [playerNames, setPlayerNames] = useLocalStorage<string[]>("oni-games-impostor-players", [
    "Jugador 1",
    "Jugador 2",
    "Jugador 3",
  ]);
  
  const [settings, setSettings] = useLocalStorage<GameSettings>("oni-games-impostor-settings", {
    impostorsCount: 1,
    showHints: true,
    categories: ["comidas-bebidas"],
  });

  // Game State
  const [gameState, setGameState] = useState<GameState>({
    phase: "setup",
    players: [],
    secretWord: null,
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
  const [isMissingCategories, setIsMissingCategories] = useState(false);

  const startGame = async () => {
    if (settings.categories.length === 0) {
      setIsMissingCategories(true);
      return;
    }
    const word = await fetchRandomWord(settings.categories);
    const initialGameState = generateGame(playerNames, settings, word);
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
      secretWord: null,
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
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest mb-2">
                  Deducción Social
                </div>
                <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  IMPOSTOR
                </h1>
                <p className="text-white/50 font-medium text-lg">
                  Descubre quién miente antes de que sea tarde.
                </p>
              </header>

              <PlayerList players={playerNames} setPlayers={setPlayerNames} />

              <CategorySelector
                selectedCategories={settings.categories}
                setSelectedCategories={(categories) => setSettings({ ...settings, categories })}
              />

              <ImpostorSettings
                impostorsCount={settings.impostorsCount}
                setImpostorsCount={(count) => setSettings({ ...settings, impostorsCount: count })}
                showHints={settings.showHints}
                setShowHints={(show) => setSettings({ ...settings, showHints: show })}
                playersCount={playerNames.length}
              />

              {/* Floating Start Button */}
              <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background/95 to-transparent z-40 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="w-full max-w-md py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(124,58,237,0.3)] flex items-center justify-center gap-3 text-2xl tracking-tight border border-white/10"
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
              <RevealScreen
                player={gameState.players[gameState.currentPlayerIndex]}
                secretWord={gameState.secretWord!}
                showHints={settings.showHints}
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
              <DiscussionScreen
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
              <SolutionScreen
                secretWord={gameState.secretWord!}
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
        title="¿Estás seguro?"
        message="Revelar la solución terminará la partida y todos sabrán quién era el impostor."
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
     onClose={() => setIsMissingCategories(false)}
        onConfirm={() => setIsMissingCategories(false)}
        title="¡Faltan categorías!"
        message="Debes seleccionar al menos una categoría para poder iniciar el juego."
      />
    </div>
  );
}
