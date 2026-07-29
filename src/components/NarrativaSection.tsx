"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import WaveBand from "./WaveBand";
import { IconSolo, IconStall, IconCompass } from "./icons";

const dolores = [
  {
    icon: IconSolo,
    title: "Tomas decisiones importantes solo",
    text: "porque pocos en tu entorno entienden tu escala.",
  },
  {
    icon: IconStall,
    title: "El crecimiento se desaceleró",
    text: "aunque tienes más recursos que nunca.",
  },
  {
    icon: IconCompass,
    title: "Tienes claridad sobre el qué, pero no sobre el cómo seguir",
    text: "y eso te cuesta más de lo que crees.",
  },
];

export default function NarrativaSection() {
  return (
    <WaveBand className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="text-center">
          <p className="gold-gradient-text font-heading text-2xl italic font-light leading-snug md:text-3xl">
            &ldquo;Hay un momento en el que ya no buscas información. Buscas
            claridad.&rdquo;
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-body text-base leading-relaxed text-ink-muted md:text-lg">
            Llegar al primer millón es un logro extraordinario. Pero hay algo
            que nadie te dice:{" "}
            <span className="text-ink">
              el camino que te trajo hasta aquí no es el mismo que te llevará
              al siguiente nivel.
            </span>
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-muted md:text-lg">
            Las estrategias cambian. Las decisiones se vuelven más complejas.
            El equipo crece, pero la soledad también.
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {dolores.map((d) => (
            <GlowCard key={d.title}>
              <d.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                {d.title}
              </h3>
              <p className="mt-2 font-body text-sm text-text-muted">
                {d.text}
              </p>
            </GlowCard>
          ))}
        </motion.div>

        <ScrollReveal delay={0.1} className="mx-auto mt-16 max-w-2xl text-center">
          <p className="font-heading text-xl italic font-light text-ink-muted md:text-2xl">
            Lo que más necesitas ahora no es otro curso, otro webinar ni más
            contenido.
          </p>
          <p className="mt-2 gold-gradient-text font-heading text-xl font-medium md:text-2xl">
            Necesitas una sala de personas que jueguen en tu misma liga.
          </p>
        </ScrollReveal>
      </div>
    </WaveBand>
  );
}
