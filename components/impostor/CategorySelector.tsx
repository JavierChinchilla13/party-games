"use client";

import { motion } from "framer-motion";
import { Tag, Check, CheckSquare, Square } from "lucide-react";

interface CategorySelectorProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CATEGORIES = [
  { id: "animales", name: "Animales", icon: "🦁" },
  { id: "clima-naturaleza", name: "Naturaleza", icon: "🌿" },
  { id: "cocina-cocinar", name: "Cocina", icon: "👨‍🍳" },
  { id: "colores-formas", name: "Colores", icon: "🎨" },
  { id: "comidas-bebidas", name: "Comidas", icon: "🍕" },
  { id: "costa-rica", name: "Costa Rica 🇨🇷", icon: "🌋" },
  { id: "cultura-internet", name: "Internet", icon: "🌐" },
  { id: "deportes", name: "Deportes", icon: "⚽" },
  { id: "emociones-sentimientos", name: "Emociones", icon: "🧠" },
  { id: "futbol", name: "Fútbol", icon: "🏟️" },
  { id: "marcas-logos", name: "Marcas", icon: "🏷️" },
  { id: "memes", name: "Memes", icon: "😂" },
  { id: "musica-bandas", name: "Música", icon: "🎸" },
  { id: "musica-latina", name: "Latina", icon: "💃" },
  { id: "objetos-cotidianos", name: "Objetos", icon: "📦" },
  { id: "ocupaciones", name: "Empleos", icon: "💼" },
  { id: "paises-ciudades", name: "Mundo", icon: "🌍" },
  { id: "pasatiempos-actividades", name: "Hobbies", icon: "🎮" },
  { id: "peliculas-series", name: "Cine", icon: "🍿" },
  { id: "personas-famosas", name: "Famosos", icon: "🌟" },
  { id: "superheroes", name: "Héroes", icon: "🦸" },
  { id: "transporte", name: "Viajes", icon: "🚀" },
  { id: "videojuegos", name: "Gaming", icon: "👾" },
  { id: "clash-royale", name: "Clash Royale", icon: "⚔️" },
];

export default function CategorySelector({
  selectedCategories,
  setSelectedCategories,
}: CategorySelectorProps) {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    setSelectedCategories(CATEGORIES.map((c) => c.id));
  };

  const deselectAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
          <Tag className="w-5 h-5 text-accent" />
          CATEGORÍAS
          <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded-md text-white/40 ml-2">
            {selectedCategories.length} / {CATEGORIES.length}
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
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCategory(category.id)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-sm ${
                isSelected
                  ? "bg-accent/20 border-accent text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-accent text-black rounded-full p-0.5"
                >
                  <Check className="w-3 h-3 stroke-[4]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-center text-white/20 font-medium">
        Se elegirá una palabra al azar de cualquiera de las categorías seleccionadas.
      </p>
    </div>
  );
}
