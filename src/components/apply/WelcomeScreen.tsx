"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-lg flex-col items-center text-center"
    >
      <Logo className="h-14 w-auto" priority />
      <span className="mt-3 font-heading text-xs font-medium tracking-[0.3em] text-gold-light">
        MASTERMIND MILLION
      </span>

      <h1 className="mt-8 font-heading text-3xl font-medium leading-tight text-white sm:text-4xl">
        <span className="block">Aplicación al</span>
        <span className="block gold-gradient-text">Mastermind Million</span>
      </h1>

      <p className="mt-6 font-body text-base leading-relaxed text-text-muted md:text-lg">
        12 preguntas para conocerte mejor y evaluar tu perfil para los
        próximos encuentros del mastermind.
      </p>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="shimmer-btn mt-10 rounded-full px-10 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-transform hover:-translate-y-0.5 md:text-base"
      >
        Comenzar aplicación
      </motion.button>
    </motion.div>
  );
}
