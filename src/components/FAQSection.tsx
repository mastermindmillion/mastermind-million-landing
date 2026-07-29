"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "¿Quién puede asistir?",
    a: "Solo personas con +$1M USD facturados. Aplica y el equipo revisará tu perfil.",
  },
  {
    q: "¿Dónde es el evento?",
    a: "Hotel NH Collection Mexico City Reforma, CDMX. 29 y 30 de agosto de 2026.",
  },
  {
    q: "¿Qué pasa después de que aplico?",
    a: "Un miembro del equipo se pondrá en contacto contigo para confirmar si hay un cupo disponible para tu perfil.",
  },
  {
    q: "¿Hay cupos limitados?",
    a: "Sí. Solo 50 personas. Sin excepciones ni lista de espera para esta primera edición.",
  },
  {
    q: "¿Es un evento de networking genérico?",
    a: "No. Todas las dinámicas tienen estructura y metodología. Nada está librado al azar.",
  },
  {
    q: "¿Quién lidera el evento?",
    a: "Mastermind Million es liderado por Mateus Zaiatz, con speakers invitados de alto nivel.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gold/15">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-heading text-base font-medium text-white md:text-lg">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-2xl font-light text-gold"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-sm leading-relaxed text-text-muted md:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Preguntas frecuentes</SectionTitle>

        <ScrollReveal delay={0.1} className="mt-14">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
