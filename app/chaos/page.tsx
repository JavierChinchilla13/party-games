"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setChaosCookie } from "@/src/lib/chaos-cookies";
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

export default function ChaosActivationPage() {
  const router = useRouter();

  useEffect(() => {
    // Activar el modo caos permanentemente via cookie
    setChaosCookie(true);
    
    // Pequeño delay para que el usuario vea que algo pasó, luego redirigir
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 animate-pulse" />
        <Flame className="w-32 h-32 text-orange-500 relative z-10 mb-8" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-black tracking-tighter flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-orange-400" />
          MODO CAOS ACTIVADO
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          Has desbloqueado el contenido secreto. Prepárate para una noche inolvidable.
        </p>
        <div className="pt-8">
          <div className="inline-block px-6 py-2 bg-orange-600/20 border border-orange-500/50 rounded-full text-orange-400 font-bold animate-pulse">
            Redirigiendo...
          </div>
        </div>
      </motion.div>
    </div>
  );
}
