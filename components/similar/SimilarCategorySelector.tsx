"use client";

import { motion } from "framer-motion";
import { Tag, Check } from "lucide-react";

interface CategorySelectorProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CATEGORIES = [
  { id: "animales", name: "Animales", icon: "🦁" },
  { id: "comidas-bebidas", name: "Comidas", icon: "🍕" },
  { id: "videojuegos", name: "Gaming", icon: "👾" },
  { id: "tecnologia", name: "Tecnología", icon: "📱" },
  { id: "personas-famosas", name: "Famosos", icon: "🌟" },
  { id: "paises-ciudades", name: "Mundo", icon: "🌍" },
  { id: "peliculas-series", name: "Cine", icon: "🍿" },
  { id: "marcas-logos", name: "Marcas", icon: "🏷️" },
  { id: "costa-rica", name: "Costa Rica 🇨🇷", icon: "🌋" },
  { id: "memes", name: "Memes", icon: "😂" },
  { id: "clash-royale", name: "Clash Royale", icon: "⚔️" },
];

export default function SimilarCategorySelector({
  selectedCategories,
  setSelectedCategories,
}: CategorySelectorProps) {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
          <Tag className="w-5 h-5 text-accent" />
          CATEGORÍAS
          <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded-md text-white/40 ml-2">
            {selectedCategories.length} / {CATEGORIES.length}
          </span>
        </h2>
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
        Se elegirá una pareja de palabras al azar de cualquiera de las categorías seleccionadas.
      </p>
    </div>
  );
}
