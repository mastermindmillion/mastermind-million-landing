"use client";

import { motion } from "framer-motion";

export default function GoldDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
      className={`h-px w-24 gold-gradient-bg ${className}`}
    />
  );
}
