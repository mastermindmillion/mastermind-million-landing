"use client";

import SectionTitle from "./SectionTitle";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";
import GoldDivider from "./GoldDivider";
import { IconHotSeat, IconNetwork, IconPeers } from "./icons";

const diferenciadores = [
  {
    icon: IconHotSeat,
    title: "Hot Seats individuales",
    text: "Tu mayor reto estratégico expuesto al grupo. Perspectivas reales de líderes que ya han estado ahí.",
  },
  {
    icon: IconNetwork,
    title: "Networking estructurado",
    text: "Las mesas no se asignan al azar. Cada conexión tiene intención.",
  },
  {
    icon: IconPeers,
    title: "Sala de pares reales",
    text: "Nadie aquí va a explicarte qué es un funnel. Todos operan a tu escala.",
  },
];

export default function QueEsSection() {
  return (
    <section className="relative bg-black-soft px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionTitle>Eso es Mastermind Million.</SectionTitle>

        <ScrollReveal delay={0.1} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="font-body text-base leading-relaxed text-text-muted md:text-lg">
            Dos días en CDMX. 50 personas. Una sola condición de entrada:
          </p>
          <p className="mt-2 gold-gradient-text font-heading text-2xl font-semibold md:text-3xl">
            +$1M USD facturados
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-text-muted md:text-lg">
            No es un evento de networking genérico. Es una sala donde cada
            conversación puede cambiar el rumbo de tu negocio.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {diferenciadores.map((d, i) => (
            <GlowCard key={d.title} delay={i * 0.12} className="bg-black">
              <d.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                {d.title}
              </h3>
              <p className="mt-2 font-body text-sm text-text-muted">
                {d.text}
              </p>
            </GlowCard>
          ))}
        </div>

        <ScrollReveal delay={0.1} className="mt-16 flex flex-col items-center text-center">
          <GoldDivider className="mb-8" />
          <p className="gold-gradient-text font-heading text-2xl italic font-light md:text-3xl">
            &ldquo;La sala define el nivel. Y este nivel solo existe
            aquí.&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
