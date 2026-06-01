"use client";

import { motion } from "framer-motion";
import GameCard from "@/components/GameCard";
import { Sparkles } from "lucide-react";

export default function Home() {
  const games = [
    {
      emoji: "🎭",
      title: "Impostor",
      description: "Encuentra al impostor antes de que te descubran.",
      href: "/games/impostor",
      color: "from-purple-500 to-indigo-600",
    },
    {
      emoji: "🔍",
      title: "Palabra Similar",
      description: "Todos tienen una palabra parecida excepto alguien.",
      href: "/games/similar",
      color: "from-blue-500 to-cyan-600",
    },
    {
      emoji: "❓",
      title: "Pregunta Diferente",
      description: "Descubre quién recibió la pregunta distinta.",
      href: "/games/questions",
      color: "from-pink-500 to-rose-600",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-full flex flex-col items-center">
      <main className="max-w-4xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>LA MEJOR FORMA DE JUGAR EN GRUPO</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight">
            ONI{" "}
            <span className="inline-block bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              GAMES
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Juegos para fiestas y reuniones usando un solo dispositivo.
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {games.map((game) => (
            <motion.div key={game.title} variants={item}>
              <GameCard
                title={game.title}
                description={game.description}
                emoji={game.emoji}
                href={game.href}
                gradient={game.color}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer/Extra info */}
        <footer className="mt-24 text-center pb-12">
          <p className="text-sm font-medium text-white/30 uppercase tracking-widest flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-white/10"></span>
            Pasa el dispositivo al siguiente jugador
            <span className="w-8 h-[1px] bg-white/10"></span>
          </p>
        </footer>
      </main>
    </div>
  );
}
