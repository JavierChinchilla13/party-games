"use client";

import { motion } from "framer-motion";
import { Tag, Check, CheckSquare, Square, Flame } from "lucide-react";
import { useChaosMode } from "@/src/hooks/useChaosMode";

interface QuestionsCategorySelectorProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CATEGORIES = [
  { id: "general", name: "General", icon: "🌐" },
  { id: "comida", name: "Comida", icon: "🍕" },
  { id: "entretenimiento", name: "Entretenimiento", icon: "🍿" },
  { id: "videojuegos", name: "Videojuegos", icon: "🎮" },
  { id: "deportes", name: "Deportes", icon: "🏀" },
  { id: "futbol", name: "Fútbol", icon: "⚽" },
  { id: "musica", name: "Música", icon: "🎸" },
  { id: "animacion", name: "Disney y Animación", icon: "🏰" },
  { id: "costa-rica", name: "Costa Rica 🇨🇷", icon: "🌋" },
  { id: "trabajo", name: "Trabajo", icon: "💼" },
  { id: "viajes", name: "Viajes", icon: "✈️" },
  { id: "tecnologia", name: "Tecnología", icon: "💻" },
  { id: "hipoteticas", name: "Hipotéticas", icon: "🤔" },
  { id: "memes", name: "Memes", icon: "😂" },
  { id: "preguntas-personales", name: "Preguntas Personales", icon: "🙋" },
  { id: "quien-del-grupo", name: "¿Quién del Grupo?", icon: "👥" },
  { id: "chaos", name: "Modo Caos", icon: "🔥", secret: true },
];

export default function QuestionsCategorySelector({
  selectedCategories = [],
  setSelectedCategories,
}: QuestionsCategorySelectorProps) {
  const chaosUnlocked = useChaosMode();

  const availableCategories = CATEGORIES.filter(c => !c.secret || chaosUnlocked);
  const safeSelectedCategories = selectedCategories || [];

  const toggleCategory = (categoryId: string) => {
    if (safeSelectedCategories.includes(categoryId)) {
      setSelectedCategories(safeSelectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...safeSelectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    setSelectedCategories(availableCategories.map((c) => c.id));
  };

  const deselectAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
          <Tag className="w-5 h-5 text-questions" />
          CATEGORÍAS
          <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded-md text-white/40 ml-2">
            {safeSelectedCategories.length} / {availableCategories.length}
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectAll}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-black transition-all text-white/60 hover:text-white"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            TODAS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={deselectAll}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-black transition-all text-white/60 hover:text-white"
          >
            <Square className="w-3.5 h-3.5" />
            NINGUNA
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {availableCategories.map((category) => {
          const isSelected = safeSelectedCategories.includes(category.id);
          const isChaos = category.id === "chaos";

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCategory(category.id)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-sm ${
                isSelected
                  ? isChaos
                    ? "bg-orange-600/20 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "bg-questions/20 border-questions text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="flex flex-col items-start leading-tight">
                <span>{category.name}</span>
                {isChaos && (
                  <span className="text-[8px] uppercase tracking-tighter text-orange-400 flex items-center gap-0.5">
                    <Flame className="w-2 h-2" />
                    Modo Especial
                  </span>
                )}
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`${isChaos ? 'bg-orange-500' : 'bg-questions'} text-white rounded-full p-0.5 ml-1`}
                >
                  <Check className="w-3 h-3 stroke-[4]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-center text-white/20 font-medium">
        Se elegirá una pareja de preguntas al azar de cualquiera de las categorías seleccionadas.
      </p>
    </div>
  );
}
