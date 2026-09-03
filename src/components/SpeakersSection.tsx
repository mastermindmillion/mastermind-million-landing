"use client";

import Image from "next/image";
import SectionTitle from "./SectionTitle";
import GlowCard from "./GlowCard";
import ApplyButton from "./ApplyButton";

type Speaker = {
  name: string;
  initials: string;
  photo?: string;
  focus?: string;
  scale?: number;
  topic: string;
  detail?: string;
};

const speakers: Speaker[] = [
  {
    name: "Mateus Zaiatz",
    initials: "MZ",
    photo: "/speakers/mateus-zaiatz.jpg",
    topic: "Debriefing de lanzamiento",
    detail:
      "Debriefing completo de un lanzamiento de más de 2 millones de dólares.",
  },
  {
    name: "Ismael Cala",
    initials: "IC",
    photo: "/speakers/ismael-cala.jpg",
    focus: "50% 22%",
    topic: "Marca personal",
    detail:
      "Cómo construir una marca personal sólida y una comunicación estratégica que te posicione como referente en tu industria.",
  },
  {
    name: "Coral Mujaes",
    initials: "CM",
    photo: "/speakers/coral-mujaes.jpeg",
    topic: "Por confirmar",
  },
  {
    name: "Pancho Faraggi",
    initials: "PF",
    photo: "/speakers/pancho-faraggi.jpg",
    focus: "50% 20%",
    topic: "Viralidad orgánica",
    detail:
      "Cómo conseguí 4 millones de seguidores en Instagram y 5 millones en TikTok “como hobby”, y cómo hacer crecer tu cuenta.",
  },
  {
    name: "Gustavo Duarte",
    initials: "GD",
    photo: "/speakers/gustavo-duarte.jpeg",
    topic: "Embudo de VSL",
    detail:
      "Cómo implementar un embudo de VSL que vende 10.000 USD al día. (Galaxy)",
  },
  {
    name: "Viny Loureiro",
    initials: "VL",
    photo: "/speakers/viny-loureiro.webp",
    focus: "50% 20%",
    topic: "Por confirmar (Galaxy)",
  },
  {
    name: "Gislene Isquierdo",
    initials: "GI",
    photo: "/speakers/gislene-isquierdo.jpg",
    topic: "Pitch de ventas",
    detail: "Cómo hacer un pitch de ventas perfecto.",
  },
  {
    name: "Miguel Alvira",
    initials: "MA",
    photo: "/speakers/miguel-alvira.jpeg",
    topic: "Crecimiento en redes",
    detail: "Cómo conseguí 50 millones de seguidores en mis redes.",
  },
];

export default function SpeakersSection() {
  return (
    <section className="relative bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Algunos de los speakers confirmados</SectionTitle>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s, i) => (
            <GlowCard
              key={s.name}
              delay={(i % 6) * 0.08}
              className="flex flex-col items-center text-center"
            >
              {s.photo ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-gold/30">
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={{
                      objectPosition: s.focus ?? "50% 50%",
                      transform: s.scale ? `scale(${s.scale})` : undefined,
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full gold-gradient-bg font-heading text-xl font-semibold text-black">
                  {s.initials}
                </div>
              )}

              <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                {s.name}
              </h3>

              <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                {s.topic}
              </p>
              {s.detail && (
                <p className="mt-2 font-body text-sm text-text-muted">
                  {s.detail}
                </p>
              )}
            </GlowCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ApplyButton />
        </div>
      </div>
    </section>
  );
}
