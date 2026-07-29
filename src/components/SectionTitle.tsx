"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionTitle({
  children,
  as: Tag = "h2",
  className = "text-4xl md:text-5xl",
  align = "center",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <Tag
        className={`gold-gradient-text font-heading font-medium leading-tight ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
