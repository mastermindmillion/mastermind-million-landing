"use client";

import Image from "next/image";
import SectionTitle from "./SectionTitle";
import GlowCard from "./GlowCard";

const speakers = [
  {
    name: "Mateus Zaiatz",
    initials: "MZ",
    photo: "/speakers/mateus-zaiatz.jpg",
    topic: "Escala 10X",
    detail:
      "Las palancas que multiplicaron por 10 el crecimiento anual de 3 expertos en 3 nichos: adelgazamiento, idiomas y desarrollo personal.",
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
    name: "Pancho Faraggi",
    initials: "PF",
    photo: "/speakers/pancho-faraggi.jpg",
    focus: "50% 15%",
    scale: 1.6,
    topic: "Viralidad orgánica",
    detail:
      "Cómo conseguí 4 millones de seguidores en Instagram y 5 millones en TikTok “como hobby”, y cómo hacer crecer tu cuenta.",
  },
  {
    name: "João Martins",
    initials: "JM",
    photo: "/speakers/joao-hashtag.png",
    topic: "Cómo no desaparecer",
    detail:
      "Así es cómo me he mantenido durante 5 años consecutivos en Hotmart Galaxy (Top 25 de los infoproductores con mayor facturación del mundo).",
  },
  {
    name: "Antonio Olombrada",
    initials: "AO",
    photo: "/speakers/antonio-olombrada.jpg",
    topic: "Procesos y equipo con IA",
    detail:
      "Cómo usar la IA para mejorar los procesos de tu empresa y tener un equipo pequeño pero de alto rendimiento.",
  },
  {
    name: "Isa Muñuruzi",
    initials: "IM",
    photo: "/speakers/isa-munuruzi.jpg",
    topic: "Webinars semanales",
    detail:
      "Cómo ayudé a un proyecto a llegar a Nova30 sin depender de lanzamientos.",
  },
  {
    name: "Melissa Escobar",
    initials: "ME",
    photo: "/speakers/melissa-escobar.jpg",
    topic: "Cómo crear contenido con IA",
    detail:
      "Estrategias prácticas para producir contenido de alto impacto con inteligencia artificial sin perder tu voz de marca.",
  },
  {
    name: "Julio Iero",
    initials: "JI",
    photo: "/speakers/julio-iero.jpg",
    focus: "50% 12%",
    scale: 1.35,
    topic: "Cómo crear anuncios virales y con storytelling",
    detail:
      "Cómo estructurar anuncios que enganchan desde el primer segundo combinando storytelling y data para maximizar conversión.",
  },
  {
    name: "Andrea Rodríguez",
    initials: "AR",
    photo: "/speakers/andrea-rodriguez.jpg",
    topic: "Inversiones en propiedades en EE.UU, Dubai y Latam",
    detail:
      "Cómo diversificar tu patrimonio invirtiendo en bienes raíces en mercados internacionales de alto crecimiento.",
  },
  {
    name: "Leonardo Fonseca",
    initials: "LF",
    photo: "/speakers/leonardo-fonseca.jpg",
    topic: "El lanzamiento pago mensual",
    detail: "Cómo funciona y cómo implementarlo paso a paso.",
  },
  {
    name: "Speaker Hotmart",
    initials: "H",
    photo: "/speakers/hotmart.png",
    topic: "Por confirmar",
    detail: "Un speaker adicional de Hotmart se sumará próximamente a la agenda.",
  },
];

export default function SpeakersSection() {
  return (
    <section className="relative bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Nuestros speakers confirmados</SectionTitle>

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
      </div>
    </section>
  );
}
