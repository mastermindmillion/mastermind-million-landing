"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import WaveBand from "./WaveBand";
import { IconCheck, IconCross } from "./icons";

const si = [
  "Has facturado +$1M USD",
  "Sientes que el siguiente nivel requiere un entorno diferente",
  "Tomas decisiones importantes en solitario y quieres cambiar eso",
  "Buscas claridad estratégica, no más contenido",
];

const no = [
  "Estás comenzando tu negocio digital",
  "Buscas un curso o programa de formación",
  "Esperas recibir información sin dar nada a cambio",
  "No estás listo para exponerte y recibir feedback directo",
];

function ListCard({
  heading,
  items,
  variant,
}: {
  heading: string;
  items: string[];
  variant: "yes" | "no";
}) {
  const Icon = variant === "yes" ? IconCheck : IconCross;
  const iconColor = variant === "yes" ? "text-gold" : "text-ink-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`rounded-2xl border p-8 md:p-10 ${
        variant === "yes"
          ? "border-gold/30 bg-black-soft"
          : "border-black/10 bg-white"
      }`}
    >
      <h3
        className={`font-heading text-xl font-semibold md:text-2xl ${
          variant === "yes" ? "text-gold-light" : "text-ink"
        }`}
      >
        {heading}
      </h3>
      <ul className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor}`} />
            <span
              className={`font-body text-sm md:text-base ${
                variant === "yes" ? "text-text-muted" : "text-ink-muted"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ParaQuienSection() {
  return (
    <WaveBand className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle className="text-3xl md:text-4xl">
          Este espacio no es para todos. Y eso es exactamente el punto.
        </SectionTitle>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <ListCard heading="Es para ti si:" items={si} variant="yes" />
          <ListCard heading="No es para ti si:" items={no} variant="no" />
        </div>
      </div>
    </WaveBand>
  );
}
