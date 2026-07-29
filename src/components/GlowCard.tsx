"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function GlowCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border border-gold/20 bg-black-soft p-8 transition-shadow duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,163,98,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
