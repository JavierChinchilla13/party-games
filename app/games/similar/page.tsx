"use client";

import Link from "next/link";

export default function SimilarPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-8">
      <h1 className="text-5xl font-black tracking-tight">🔍 Palabra Similar</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-lg">
        Estamos trabajando duro para traerte este juego muy pronto.
      </p>
      <div className="pt-8">
        <Link 
          href="/" 
          className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-bold rounded-2xl hover:scale-105 transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
