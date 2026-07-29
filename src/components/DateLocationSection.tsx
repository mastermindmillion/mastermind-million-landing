"use client";

import ScrollReveal from "./ScrollReveal";
import DateVenueBadge from "./DateVenueBadge";

export default function DateLocationSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-center md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #D4A362 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <ScrollReveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Guarda la fecha
          </p>
        </ScrollReveal>

        <DateVenueBadge delay={0.1} className="mt-6" />
      </div>
    </section>
  );
}
