"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.min(100, Math.round(((current + 1) / total) * 100));

  return (
    <div className="w-full">
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full gold-gradient-bg"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-text-muted">
        Pregunta {current + 1} de {total}
      </p>
    </div>
  );
}
