"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Tier } from "@/lib/test/types";
import { tierCopy } from "@/lib/test/scoring";
import GlassCard from "./GlassCard";
import Gauge from "./Gauge";
import Disclaimer from "./Disclaimer";
import CalendlyEmbed from "./CalendlyEmbed";

export default function ResultScreen({
  indexPct,
  tier,
  calendlyUrl,
  onCtaClick,
}: {
  indexPct: number;
  tier: Tier;
  calendlyUrl?: string;
  onCtaClick: () => void;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const copy = tierCopy[tier];

  function handleCta() {
    onCtaClick();
    setShowCalendar(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <GlassCard className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex justify-center">
          <Gauge value={indexPct} />
        </div>

        <p className="mt-2 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {copy.label}
        </p>
        <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight text-black">
          {copy.headline}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{copy.body}</p>

        <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4">
          <p className="text-sm leading-relaxed text-neutral-700">{copy.educational}</p>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-neutral-600">{copy.ctaHint}</p>

        {!showCalendar && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCta}
            className="mt-6 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
          >
            Agendar llamada gratuita (15 min)
          </motion.button>
        )}

        {showCalendar && <CalendlyEmbed url={calendlyUrl} />}

        <Disclaimer className="mt-6 text-center" />
      </GlassCard>
    </motion.div>
  );
}
