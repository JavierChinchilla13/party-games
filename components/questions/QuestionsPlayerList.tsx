"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, UserPlus, X } from "lucide-react";

interface QuestionsPlayerListProps {
  players: string[];
  setPlayers: (players: string[]) => void;
}

export default function QuestionsPlayerList({ players, setPlayers }: QuestionsPlayerListProps) {
  const addPlayer = () => {
    if (players.length < 12) {
      setPlayers([...players, `Jugador ${players.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 3) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-questions" />
          JUGADORES
          <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded-md text-white/40 ml-2">
            {players.length}
          </span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addPlayer}
          disabled={players.length >= 12}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-4 h-4" />
          AÑADIR
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence mode="popLayout">
          {players.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              className="group flex items-center gap-4 p-3 glass border border-white/10 rounded-2xl focus-within:border-questions/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white/50 group-focus-within:text-questions transition-colors">
                <span className="text-xs font-black">{index + 1}</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-bold text-white placeholder-white/20"
                placeholder={`Nombre del jugador ${index + 1}`}
              />
              {players.length > 3 && (
                <button
                  onClick={() => removePlayer(index)}
                  className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {players.length >= 12 && (
        <p className="text-xs text-center text-white/30 font-medium">
          Máximo de 12 jugadores alcanzado
        </p>
      )}
    </div>
  );
}
