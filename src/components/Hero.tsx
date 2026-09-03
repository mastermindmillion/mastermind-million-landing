"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ParticlesBg from "./ParticlesBg";
import Logo from "./Logo";

const headlineLines = [
  "3 embudos para un",
  "negocio digital millonario: VSL,",
  "Lanzamientos y Eventos",
];

export default function Hero() {
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
      <Image
        src="/hero/cartagena-bg.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black/75" />
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
          CARTAGENA · 22 &amp; 23 DE FEBRERO 2027
        </motion.div>

        <h1 className="font-heading text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
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
          className="mx-auto mt-6 mb-4 max-w-xl font-body text-base text-white md:max-w-3xl md:text-lg"
        >
          ¿Fuiste invitado por un miembro Million a conocer un encuentro del
          mastermind? Aplica para participar del encuentro.
        </motion.p>

        <motion.a
          href="https://mastermind-million.com/aplica"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="shimmer-btn mt-4 mb-10 rounded-full px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-transform hover:-translate-y-0.5 md:mb-16 md:text-base"
        >
          Quiero aplicar
        </motion.a>
      </div>
    </section>
  );
}
