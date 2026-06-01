"use client";

import { motion } from "framer-motion";
import { Tag, Check } from "lucide-react";

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
  { id: "costa-rica", name: "Costa Rica 🇨🇷", icon: "🌋" },
  { id: "trabajo", name: "Trabajo", icon: "💼" },
  { id: "viajes", name: "Viajes", icon: "✈️" },
  { id: "tecnologia", name: "Tecnología", icon: "💻" },
  { id: "hipoteticas", name: "Hipotéticas", icon: "🤔" },
  { id: "memes", name: "Memes", icon: "😂" },
  { id: "quien-del-grupo", name: "¿Quién del Grupo?", icon: "👥" },
];

export default function QuestionsCategorySelector({
  selectedCategories = [],
  setSelectedCategories,
}: QuestionsCategorySelectorProps) {
  const toggleCategory = (categoryId: string) => {
    const categories = selectedCategories || [];
    if (categories.includes(categoryId)) {
      if (categories.length > 1) {
        setSelectedCategories(categories.filter((id) => id !== categoryId));
      }
    } else {
      setSelectedCategories([...categories, categoryId]);
    }
  };

  const safeSelectedCategories = selectedCategories || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
          <Tag className="w-5 h-5 text-questions" />
          CATEGORÍAS
          <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded-md text-white/40 ml-2">
            {safeSelectedCategories.length} / {CATEGORIES.length}
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => {
          const isSelected = safeSelectedCategories.includes(category.id);
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCategory(category.id)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-sm ${
                isSelected
                  ? "bg-questions/20 border-questions text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-questions text-white rounded-full p-0.5"
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
