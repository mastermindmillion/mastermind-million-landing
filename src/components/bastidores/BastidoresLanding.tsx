"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticlesBg from "../ParticlesBg";
import SectionTitle from "../SectionTitle";
import ScrollReveal from "../ScrollReveal";
import WaveBand from "../WaveBand";
import GlowCard from "../GlowCard";
import { IconCalendar, IconCheck, IconClock, IconPin } from "../icons";

const CTA_URL = "https://whop.com/checkout/plan_uwV40eVyVOSH1";
const SPOTS = 60;
const SUPPORT_URL =
  "https://wa.me/573185389816?text=Hola%2C%20tengo%20dudas%20sobre%20el%20evento%20de%20los%20Bastidores%20de%20Daniel%20Habif";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M4 20l1.3-3.9A7.9 7.9 0 1112 20a7.9 7.9 0 01-4-1.1z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
    </svg>
  );
}

function CtaButton({
  className = "",
  delay = 0,
  label = "Quiero mi cupo",
}: {
  className?: string;
  delay?: number;
  label?: string;
}) {
  return (
    <motion.a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      className={`shimmer-btn inline-block rounded-full px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-transform hover:-translate-y-0.5 md:text-base ${className}`}
    >
      {label}
    </motion.a>
  );
}

function Hero() {
  return (
    <section className="noise-bg relative flex min-h-screen items-end overflow-hidden bg-black px-6 pt-[44vh] pb-20 md:pb-32 lg:items-center lg:pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-[48vh] lg:inset-y-0 lg:-left-[20%] lg:right-[8%] lg:h-full"
      >
        <Image
          src="/bastidores/hero-teatro.jpg"
          alt="Daniel Habif en el escenario frente al público"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[100%_70%] lg:object-[50%_80%]"
        />
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-[48vh] bg-gradient-to-t from-black via-black/10 to-black/20 lg:hidden" />
      <div className="absolute inset-y-0 right-0 hidden w-[22%] bg-gradient-to-l from-black from-35% to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 from-20% via-black/35 via-50% to-transparent to-70% lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <ParticlesBg />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-xs font-medium uppercase tracking-[0.3em] text-gold-light md:text-sm"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span>CDMX · 18, 19 y 20 de enero</span>
            <span className="text-gold-light/70"><span className="hidden sm:inline">· </span>4:30 – 8:30 PM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="mt-6 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            3 días acompañando el detrás de escenas del{" "}
            <span className="gold-gradient-text">
              mayor lanzamiento online de Latinoamérica
            </span>
            , con más de 100 mil personas en directo.
          </motion.h1>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <CtaButton delay={0.8} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="flex items-center gap-2 font-body text-sm text-text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Solo {SPOTS} cupos disponibles
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

const contrast = [
  {
    title: "Lo que ve el público",
    points: [
      "Las clases en vivo",
      "El mensaje en el escenario",
      "La oferta al final",
    ],
    muted: true,
  },
  {
    title: "Lo que vas a ver tú",
    points: [
      "La estrategia detrás de cada clase",
      "Las decisiones que se toman en tiempo real",
      "Cómo opera el equipo cuando 100 mil personas están conectadas",
      "Qué funcionó, qué no y por qué",
      "Sé testigo de la preproducción, producción y postproducción del evento digital más grande de LATAM",
    ],
    muted: false,
  },
];

function WhySection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 md:py-32">
      <Image
        src="/bastidores/backstage-control-mobile.jpg"
        alt="Daniel Habif en la consola de control durante un evento"
        fill
        sizes="100vw"
        className="object-cover object-[35%_50%] opacity-80 lg:hidden"
      />
      <Image
        src="/bastidores/backstage-control.jpg"
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-[30%_50%] opacity-80 lg:block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black" />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Desde adentro
          </p>
        </ScrollReveal>
        <SectionTitle className="mt-4 text-3xl md:text-5xl">
          No es ver un lanzamiento.
          <br />
          Es vivirlo desde los bastidores.
        </SectionTitle>
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-center font-body text-base text-text-muted md:text-lg">
            Más de 100 mil personas van a ver el lanzamiento desde afuera. Un
            grupo de {SPOTS} infoproductores lo va a vivir desde adentro: en la
            sala donde se toman las decisiones.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {contrast.map((col, i) => (
            <GlowCard
              key={col.title}
              delay={i * 0.15}
              className={`bg-black-soft/55! ${col.muted ? "opacity-80" : "border-gold/40"}`}
            >
              <h3
                className={`font-heading text-xl font-semibold md:text-2xl ${
                  col.muted ? "text-white/70" : "gold-gradient-text"
                }`}
              >
                {col.title}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {col.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    {col.muted ? (
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-white/30" />
                    ) : (
                      <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    )}
                    <span
                      className={`font-body text-sm md:text-base ${
                        col.muted ? "text-text-muted" : "text-white"
                      }`}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative bg-black px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <ScrollReveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Quién es
          </p>
        </ScrollReveal>
        <SectionTitle align="left" className="mt-4 text-4xl md:text-5xl">
          Daniel Habif
        </SectionTitle>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-base leading-relaxed text-white/85 md:text-lg">
            Conferencista, escritor y uno de los comunicadores más influyentes
            de habla hispana. Sus mensajes llegan a millones de personas en
            redes sociales y sus eventos llenan teatros en Latinoamérica y
            Estados Unidos.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-text-muted md:text-lg">
            Autor de bestsellers como <em>Inquebrantables</em>, convirtió su
            voz en un movimiento que inspira a millones a transformar su vida.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal
        delay={0.15}
        className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-gold/20 lg:max-w-none"
      >
        <Image
          src="/bastidores/retrato-1.jpg"
          alt="Daniel Habif"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </ScrollReveal>
      </div>
    </section>
  );
}

const dayFlow = [
  { label: "Briefing", text: "Qué se va a hacer en la clase y con qué objetivo." },
  { label: "Clase en vivo", text: "Observas la ejecución mientras ocurre, desde adentro." },
  { label: "Briefing post-clase", text: "Lectura de lo que pasó y ajustes para el día siguiente." },
];

const includes = [
  {
    n: "01",
    title: "Acceso privado a los 3 días del lanzamiento",
    text: "Estarás presente durante el 18, 19 y 20 de enero en CDMX, con acceso a los espacios donde se ejecuta el lanzamiento.",
  },
  {
    n: "02",
    title: "Briefing en vivo antes y después de cada clase",
    text: "Antes de cada clase entiendes qué se va a hacer y por qué. Después, analizas lo que pasó con los números y las reacciones frescas.",
  },
  {
    n: "03",
    title: "Debriefing de todo el lanzamiento",
    text: "Un cierre completo para desarmar la estrategia de punta a punta y llevarte los aprendizajes aplicables a tu negocio.",
  },
];

function IncludeSection() {
  return (
    <WaveBand className="z-10 px-6 py-28 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden md:h-[760px]">
        <Image
          src="/bastidores/publico.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_56%] opacity-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--white)] from-0% via-transparent via-25% to-[var(--white)] to-95%" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle className="text-3xl md:text-5xl">¿Qué incluye?</SectionTitle>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {includes.map((item) => (
            <motion.div
              key={item.n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="rounded-2xl border border-gold/25 bg-white p-8 shadow-[0_10px_40px_rgba(21,18,13,0.06)]"
            >
              <span className="gold-gradient-text font-heading text-4xl font-semibold">
                {item.n}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted md:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-24 max-w-5xl">
          <ScrollReveal className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Así vivirás cada día
            </p>
          </ScrollReveal>

          <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="pointer-events-none absolute top-6 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 md:block" />
            {dayFlow.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 0.15} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-white font-heading text-sm font-semibold text-gold-deep">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                  {step.label}
                </h3>
                <p className="mx-auto mt-2 max-w-xs font-body text-sm text-ink-muted">
                  {step.text}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 h-px max-w-md bg-gold/25" />

        <ScrollReveal
          delay={0.1}
          className="mt-16 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <IconCalendar className="h-6 w-6 text-gold" />
            <p className="font-heading text-3xl font-semibold leading-none text-ink md:text-4xl">
              18, 19 y 20
            </p>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              de enero
            </p>
          </div>
          <div className="h-px w-16 bg-gold/30 sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-3 text-center">
            <IconClock className="h-6 w-6 text-gold" />
            <p className="font-heading text-3xl font-semibold leading-none text-ink md:text-4xl">
              4:30 – 8:30 PM
            </p>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              hora CDMX
            </p>
          </div>
          <div className="h-px w-16 bg-gold/30 sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-3 text-center">
            <IconPin className="h-6 w-6 text-gold" />
            <p className="font-heading text-3xl font-semibold leading-none text-ink md:text-4xl">
              CDMX
            </p>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              México
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 text-center">
          <CtaButton delay={0.2} />
        </div>
      </div>
    </WaveBand>
  );
}

function ScarcitySection() {
  return (
    <section className="noise-bg relative overflow-hidden border-b border-gold/10 bg-black-soft px-6 pt-32 pb-24 md:pt-40 md:pb-28">
      <Image
        src="/bastidores/retrato-bn.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_30%] opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/35 to-black" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Acceso limitado
          </p>
          <p className="gold-gradient-text mt-4 font-heading text-8xl font-semibold leading-none md:text-9xl">
            {SPOTS}
          </p>
          <p className="mt-3 font-heading text-xl font-medium uppercase tracking-[0.4em] text-white md:text-2xl">
            Cupos
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-text-muted md:text-lg">
            Para que la experiencia sea realmente privada, el grupo es pequeño.
            Esta invitación es exclusiva para infoproductores y los cupos se
            asignan por orden de confirmación.
          </p>
        </ScrollReveal>
        <CtaButton delay={0.2} className="mt-10" label="Reservar mi cupo" />
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "¿Quién puede participar?",
    a: "Esta es una invitación especial y exclusiva para infoproductores.",
  },
  {
    q: "¿Dónde y cuándo es?",
    a: "En Ciudad de México (CDMX), los días 18, 19 y 20 de enero. Cada día la llegada es a partir de las 4:30 pm y terminamos a las 8:30 pm (hora de CDMX).",
  },
  {
    q: "¿Qué voy a vivir exactamente?",
    a: "Acceso privado a los 3 días del lanzamiento con Daniel Habif, briefing en vivo antes y después de cada clase, y un debriefing de todo el lanzamiento.",
  },
  {
    q: "¿Cuántos cupos hay?",
    a: `Solo ${SPOTS} cupos. Se asignan por orden de confirmación.`,
  },
  {
    q: "¿Cómo reservo mi lugar?",
    a: "Haz clic en “Quiero mi cupo” y completa tu inscripción en el checkout. Tu cupo queda confirmado al finalizar el pago.",
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

function FAQSection() {
  return (
    <section className="relative bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Preguntas frecuentes</SectionTitle>

        <ScrollReveal delay={0.1} className="mt-14">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ScrollReveal>

        <div className="mt-16 text-center">
          <CtaButton />
        </div>

        <ScrollReveal delay={0.1} className="mt-14 text-center">
          <p className="font-body text-sm text-text-muted md:text-base">
            ¿Tienes otra pregunta?
          </p>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 font-body text-sm font-medium text-gold-light transition-colors hover:border-gold/60 hover:text-gold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escríbele a soporte por WhatsApp
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-black px-6 py-10 text-center">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body text-xs text-text-muted transition-colors hover:text-gold-light"
      >
        <WhatsAppIcon className="h-3.5 w-3.5" />
        Soporte por WhatsApp
      </a>
      <p className="mt-4 font-body text-xs text-text-muted/70">
        © 2026 Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default function BastidoresLanding() {
  return (
    <>
      <main>
        <Hero />
        <WhySection />
        <IncludeSection />
        <ScarcitySection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
