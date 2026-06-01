"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Ghost, HelpCircle, Layers, Menu, X } from "lucide-react";

export default function AppHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Impostor", href: "/games/impostor", icon: Ghost },
    { name: "Similar", href: "/games/similar", icon: Layers },
    { name: "Preguntas", href: "/games/questions", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 glass backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Left Aligned */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-all shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent inline-block">
            ONI GAMES
          </span>
        </Link>

        {/* Navigation Tabs - Desktop (Centered) */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex bg-white/5 p-1 rounded-xl gap-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabHeader"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/10 shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent" : ""}`} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Placeholder for desktop balance */}
        <div className="hidden md:block w-32 shrink-0 invisible"></div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/5 border-t border-white/5 backdrop-blur-xl"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-accent" : ""}`} />
                    <span className="text-sm font-bold">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
