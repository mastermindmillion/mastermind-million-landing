"use client";

import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import StatCounter from "./StatCounter";
import GoldButton from "./GoldButton";
import WaveBand from "./WaveBand";
import { APPLY_URL } from "@/lib/constants";

export default function PruebaSocialSection() {
  return (
    <WaveBand className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle>¿Quiénes estarán en la sala?</SectionTitle>

        <ScrollReveal delay={0.1} className="mx-auto mt-6 max-w-2xl">
          <p className="font-body text-base leading-relaxed text-ink-muted md:text-lg">
            El nivel de los asistentes es el activo principal del evento.
            Esta no es una sala de aspirantes, es una sala de líderes que ya
            llegaron al millón y ahora van por el siguiente.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-16 flex flex-col items-center">
          <StatCounter
            to={50}
            prefix="+$"
            suffix="M USD"
            className="gold-gradient-text font-heading text-5xl font-semibold md:text-6xl"
          />
          <p className="mt-3 font-body text-sm text-ink-muted">
            facturados en conjunto por los asistentes confirmados
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-10">
          <GoldButton href={APPLY_URL} size="lg">
            Quiero Aplicar
          </GoldButton>
        </ScrollReveal>
      </div>
    </WaveBand>
  );
}
