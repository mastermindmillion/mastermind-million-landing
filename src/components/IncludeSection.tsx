"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import WaveBand from "./WaveBand";
import DateVenueBadge from "./DateVenueBadge";
import ApplyButton from "./ApplyButton";
import { IconSpark } from "./icons";

const items = [
  "2 días presenciales de Mastermind en Cartagena (22 y 23 de febrero 2027)",
  "Acceso a sala de trabajo con 50 líderes del mismo nivel",
  "Hot seats individuales: estrategia en vivo validada por el grupo",
  "Sesiones de networking estructurado con metodología",
  "Registro fotográfico profesional del evento",
];

export default function IncludeSection() {
  return (
    <WaveBand className="px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ScrollReveal className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl lg:max-w-none">
          <Image
            src="/gallery/evento-collage.png"
            alt="Momentos de una edición anterior de Mastermind Million"
            width={1254}
            height={1254}
            className="h-auto w-full object-cover"
          />
        </ScrollReveal>

        <div>
        <SectionTitle align="left" className="text-3xl md:text-4xl">
          Lo que vivirás en estos 2 días
        </SectionTitle>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-10 flex flex-col gap-5"
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

        <div className="mt-16 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Guarda la fecha
          </p>
          <DateVenueBadge delay={0.1} className="mt-6" />

          <ApplyButton delay={0.2} className="mt-10" />
        </div>
        </div>
      </div>
    </WaveBand>
  );
}
