"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Disclaimer from "./Disclaimer";

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <GlassCard className="px-6 py-10 sm:px-10 sm:py-12">
        <div className="mb-8 flex h-10 items-center justify-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Power Bracelet
          </span>
        </div>

        <h1 className="text-center text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
          ¿Cuál es tu Índice de Energía?
        </h1>
        <p className="mt-4 text-center text-base text-neutral-600">
          6 preguntas para identificar tu potencial de mejora.
        </p>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Responde honestamente. No hay respuestas correctas o incorrectas. Toma ~2 minutos.
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="mt-10 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
        >
          Comenzar test
        </motion.button>

        <Disclaimer className="mt-6 text-center" />
      </GlassCard>
    </motion.div>
  );
}
