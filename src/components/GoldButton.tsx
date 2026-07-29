"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GoldButtonProps = {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
);

export default function GoldButton({
  href,
  onClick,
  children,
  size = "md",
  className = "",
}: GoldButtonProps) {
  const sizeClasses =
    size === "lg"
      ? "px-10 py-5 text-base md:text-lg"
      : "px-8 py-4 text-sm md:text-base";

  const sharedClassName = `shimmer-btn inline-flex items-center justify-center rounded-full font-body font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-shadow hover:shadow-[0_0_45px_rgba(212,163,98,0.4)] ${sizeClasses} ${className}`;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={sharedClassName}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={sharedClassName}
    >
      {children}
    </motion.a>
  );
}
