"use client";

import { motion } from "framer-motion";
import type { OptionKey, Question } from "@/lib/test/types";
import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";

export default function QuestionScreen({
  question,
  index,
  total,
  selected,
  onSelect,
  onBack,
}: {
  question: Question;
  index: number;
  total: number;
  selected: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onBack: (() => void) | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <GlassCard className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver a la pregunta anterior"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:bg-black/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="h-8 w-8 shrink-0" />
          )}
          <ProgressBar current={index + 1} total={total} />
        </div>

        <h2 className="text-xl font-semibold leading-snug tracking-tight text-black sm:text-2xl">
          {question.prompt}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selected === option.key;
            return (
              <motion.button
                key={option.key}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(option.key)}
                aria-pressed={isSelected}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white/60 text-neutral-800 hover:border-black/30 hover:bg-black/5"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    isSelected ? "border-white text-white" : "border-neutral-300 text-neutral-500"
                  }`}
                >
                  {option.key}
                </span>
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
