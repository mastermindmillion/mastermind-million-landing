"use client";

import { motion } from "framer-motion";

type Particle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

const PARTICLES: Particle[] = [
  { left: "6%", top: "18%", size: 3, duration: 9, delay: 0 },
  { left: "14%", top: "72%", size: 2, duration: 11, delay: 1.2 },
  { left: "22%", top: "40%", size: 4, duration: 8, delay: 0.4 },
  { left: "31%", top: "85%", size: 2, duration: 10, delay: 2 },
  { left: "38%", top: "12%", size: 3, duration: 12, delay: 0.8 },
  { left: "47%", top: "55%", size: 2, duration: 9, delay: 1.6 },
  { left: "55%", top: "28%", size: 4, duration: 10, delay: 0.2 },
  { left: "63%", top: "78%", size: 2, duration: 11, delay: 2.4 },
  { left: "71%", top: "16%", size: 3, duration: 8, delay: 1 },
  { left: "79%", top: "62%", size: 2, duration: 13, delay: 0.6 },
  { left: "86%", top: "34%", size: 4, duration: 9, delay: 1.8 },
  { left: "92%", top: "88%", size: 2, duration: 10, delay: 0.3 },
  { left: "10%", top: "50%", size: 2, duration: 12, delay: 2.2 },
  { left: "58%", top: "8%", size: 3, duration: 11, delay: 1.4 },
  { left: "95%", top: "50%", size: 2, duration: 9, delay: 0.9 },
];

export default function ParticlesBg({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.25,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
