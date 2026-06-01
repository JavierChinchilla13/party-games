"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  href: string;
  gradient?: string;
}

export default function GameCard({ title, description, emoji, href, gradient = "from-zinc-500 to-zinc-600" }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link 
        href={href}
        className="group relative flex flex-col h-full p-8 rounded-4xl border border-white/10 glass hover:border-white/20 transition-all overflow-hidden"
      >
        {/* Decorative Gradient Blob */}
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
        
        <div className="relative z-10">
          <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
            {emoji}
          </div>
          
          <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
            {title}
          </h3>
          
          <p className="text-white/60 text-sm font-medium leading-relaxed mb-6">
            {description}
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:text-white transition-colors">
            Jugar ahora
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
