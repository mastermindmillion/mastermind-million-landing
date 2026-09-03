"use client";

import { motion } from "framer-motion";

export default function ApplyButton({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      className={`shimmer-btn inline-block rounded-full px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-transform hover:-translate-y-0.5 md:text-base ${className}`}
    >
      Quiero aplicar
    </motion.a>
  );
}
