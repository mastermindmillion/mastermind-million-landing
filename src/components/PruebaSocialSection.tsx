"use client";

import Image from "next/image";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import StatCounter from "./StatCounter";
import GoldDivider from "./GoldDivider";

export default function PruebaSocialSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 md:py-36">
      <Image
        src="/gallery/foto-grupal.jpg"
        alt="Comunidad Mastermind Million"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <SectionTitle>¿Quiénes estarán en la sala?</SectionTitle>
        <GoldDivider className="mx-auto mt-6" />

        <ScrollReveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
          <p className="font-body text-base leading-relaxed text-white md:text-lg">
            El nivel de los asistentes es el activo principal del evento.
            Esta no es una sala de aspirantes, es una sala de líderes que ya
            llegaron al millón y ahora van por el siguiente.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.2}
          className="mx-auto mt-16 flex flex-col items-center"
        >
          <StatCounter
            to={50}
            prefix="+$"
            suffix="M USD"
            className="gold-gradient-text font-heading text-5xl font-semibold md:text-6xl"
          />
          <p className="mt-3 font-body text-sm text-text-muted">
            facturados en conjunto por los asistentes confirmados
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
