"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { APPLY_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(212,163,98,0.15)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-8 w-auto md:h-9" priority />
          <span className="font-heading text-sm font-medium tracking-[0.15em] text-white md:text-base">
            MASTERMIND MILLION
          </span>
        </a>

        <a
          href={APPLY_URL}
          className="shimmer-btn rounded-full px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black md:px-6 md:py-3 md:text-sm"
        >
          Aplica Ahora
        </a>
      </nav>
    </motion.header>
  );
}
