"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParticlesBg from "./ParticlesBg";
import GoldButton from "./GoldButton";
import Logo from "./Logo";
import { useApplyModal } from "@/lib/apply-modal-context";

const headlineLines = [
  "Ya llegaste al millón.",
  "Ahora necesitas la sala correcta",
  "para ir al siguiente nivel.",
];

export default function Hero() {
  const { openApplyModal } = useApplyModal();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 120 * 0.15]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="noise-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center"
    >
      <ParticlesBg />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <motion.div
          style={{ y: logoY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <Logo className="h-16 w-auto md:h-20" priority />
          <span className="font-heading text-sm font-medium tracking-[0.3em] text-gold-light md:text-base">
            MASTERMIND MILLION
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 rounded-full border border-gold/30 px-4 py-2 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gold-light md:text-xs"
        >
          CDMX · 29 &amp; 30 DE AGOSTO 2026
        </motion.div>

        <h1 className="font-heading text-3xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
          {headlineLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.2, ease: "easeOut" }}
              className={`block ${i >= 1 ? "gold-gradient-text" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mx-auto mt-6 max-w-xl font-body text-base text-text-muted md:text-lg"
        >
          Única condición de entrada:
          <span className="mt-1 block gold-gradient-text font-heading text-2xl font-semibold md:text-3xl">
            +$1M USD facturados
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3, type: "spring", bounce: 0.45 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <GoldButton onClick={openApplyModal} size="lg">
            Quiero Aplicar
          </GoldButton>
          <span className="font-body text-xs text-text-muted md:text-sm">
            Solo 50 cupos. Cuando se llena, se cierra.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
