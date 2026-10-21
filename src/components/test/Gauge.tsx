"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SIZE = 240;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = Math.PI * RADIUS;

export default function Gauge({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const [display, setDisplay] = useState(0);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE - (v / 100) * CIRCUMFERENCE);

  useEffect(() => {
    const controls = animate(progress, clamped, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    // Safety net: if the animation frame loop stalls (e.g. a throttled tab),
    // make sure the final value still lands instead of freezing mid-count.
    const fallback = window.setTimeout(() => {
      progress.set(clamped);
      setDisplay(clamped);
    }, 1600);
    return () => {
      controls.stop();
      window.clearTimeout(fallback);
    };
  }, [clamped, progress]);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={SIZE} height={SIZE / 2 + STROKE} viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE}`}>
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="black"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <div className="absolute top-[54%] flex flex-col items-center">
        <span className="text-5xl font-semibold tracking-tight text-black">{display}%</span>
        <span className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral-500">
          Índice de energía
        </span>
      </div>
    </div>
  );
}
