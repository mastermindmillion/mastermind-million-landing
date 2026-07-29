"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import WaveBand from "./WaveBand";
import { IconSpark } from "./icons";
import { pathVariants } from "@/lib/motion";

const items = [
  "2 días presenciales de Mastermind en CDMX (29–30 agosto 2026)",
  "Acceso a sala de trabajo con 50 líderes del mismo nivel",
  "Hot seats individuales: estrategia en vivo validada por el grupo",
  "Sesiones de networking estructurado con metodología",
  "Acceso al grupo privado post-evento",
  "Registro fotográfico profesional del evento",
];

const days = [
  {
    label: "Día 1",
    title: "Claridad y conexión",
    text: "Presentaciones, diagnóstico colectivo, hot seats, networking estructurado.",
  },
  {
    label: "Día 2",
    title: "Estrategia y siguiente movimiento",
    text: "Análisis profundo, decisiones, plan de acción concreto, cierre.",
  },
];

export default function IncludeSection() {
  return (
    <WaveBand className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Lo que vivirás en estos 2 días</SectionTitle>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto mt-14 flex max-w-xl flex-col gap-5"
        >
          {items.map((item) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="flex items-start gap-4"
            >
              <IconSpark className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <span className="font-body text-sm text-ink md:text-base">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative mx-auto mt-24 max-w-xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 md:left-[9px]">
            <svg
              className="h-full w-full"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="#D4A362"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              />
            </svg>
          </div>

          <div className="flex flex-col gap-14 pl-8 md:pl-10">
            {days.map((day, i) => (
              <ScrollReveal key={day.title} delay={i * 0.15} className="relative">
                <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-white md:-left-10" />
                <p className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  {day.label}
                </p>
                <h3 className="mt-1 font-heading text-xl font-semibold text-ink md:text-2xl">
                  {day.title}
                </h3>
                <p className="mt-2 font-body text-sm text-ink-muted md:text-base">
                  {day.text}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </WaveBand>
  );
}
