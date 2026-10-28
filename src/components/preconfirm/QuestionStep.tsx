"use client";

import { motion } from "framer-motion";
import {
  COUNTRIES,
  OTHER,
  detailVisible,
  type Answers,
  type Question,
} from "@/lib/preconfirm/questions";
import { boxInput, btnGhost, btnPrimary, lineInput } from "./ui";

export default function QuestionStep({
  question: q,
  index,
  total,
  answers,
  error,
  onChange,
  onBack,
  onNext,
}: {
  question: Question;
  index: number;
  total: number;
  answers: Answers;
  error: string | null;
  onChange: (id: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const value = answers[q.id] ?? "";
  const isLast = index === total - 1;
  const showDetail = detailVisible(q, answers);

  return (
    <div className="mx-auto w-full max-w-[560px] text-left">
      <div className="mb-4 text-[11px] uppercase tracking-[0.25em] text-gold">
        Pregunta {index + 1} de {total}
      </div>
      <h2 className="font-heading text-[19px] font-medium leading-[1.4] text-white sm:text-2xl">
        {q.title}
        {!q.optional && <span className="text-gold"> *</span>}
      </h2>
      {q.sub && (
        <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
          {q.sub}
        </p>
      )}

      <div className="mt-7 sm:mt-8">
        {(q.kind === "text" || q.kind === "email") && (
          <input
            type={q.kind === "email" ? "email" : "text"}
            value={value}
            onChange={(e) => onChange(q.id, e.target.value)}
            placeholder={q.placeholder}
            autoComplete="off"
            autoFocus
            className={lineInput}
          />
        )}

        {q.kind === "phone" && (
          <div className="flex gap-2.5">
            <select
              value={answers.telefonoPais ?? COUNTRIES[0].name}
              onChange={(e) => onChange("telefonoPais", e.target.value)}
              aria-label="Código de país"
              className="w-[110px] shrink-0 cursor-pointer appearance-none rounded-none border-0 border-b-[1.5px] border-gold/30 bg-black px-1 py-3.5 text-center font-body text-base text-white focus:border-gold focus:outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.flag} {c.dial}
                </option>
              ))}
              <option value={OTHER}>🌐 {OTHER}</option>
            </select>
            {answers.telefonoPais === OTHER && (
              <input
                type="text"
                inputMode="numeric"
                value={answers.telefonoOtro ?? ""}
                onChange={(e) => onChange("telefonoOtro", e.target.value)}
                placeholder="+__"
                aria-label="Código de país personalizado"
                autoFocus
                className={`${lineInput} w-20 shrink-0 text-center`}
              />
            )}
            <input
              type="tel"
              value={value}
              onChange={(e) => onChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              autoComplete="off"
              autoFocus={answers.telefonoPais !== OTHER}
              className={`${lineInput} min-w-0 flex-1`}
            />
          </div>
        )}

        {q.kind === "select" && (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(q.id, e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-none border-0 border-b-[1.5px] border-gold/30 bg-black py-3.5 pl-1 pr-8 font-body text-[17px] text-white focus:border-gold focus:outline-none"
            >
              <option value="" disabled>
                Selecciona tu país
              </option>
              {q.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gold">
              ▾
            </span>
          </div>
        )}

        {q.kind === "choice" && (
          <div
            role="radiogroup"
            aria-label={q.title}
            className="flex flex-wrap gap-3"
          >
            {q.options?.map((o) => (
              <label key={o.value} className="relative">
                <input
                  type="radio"
                  name={q.id}
                  value={o.value}
                  checked={value === o.value}
                  onChange={() => onChange(q.id, o.value)}
                  className="peer sr-only"
                />
                <span className="inline-block min-h-11 cursor-pointer select-none rounded-full border border-gold/35 px-[18px] py-[11px] text-[13px] text-white transition peer-checked:border-gold peer-checked:bg-[linear-gradient(135deg,#B17F40,#E8D9AE)] peer-checked:font-medium peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold sm:px-[22px] sm:py-[13px] sm:text-sm">
                  {o.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {q.kind === "textarea" && (
          <textarea
            value={value}
            onChange={(e) => onChange(q.id, e.target.value)}
            placeholder={q.placeholder}
            rows={3}
            autoFocus
            className={boxInput}
          />
        )}

        {showDetail && q.detail && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5"
          >
            {q.detail.multiline ? (
              <textarea
                value={answers[q.detail.id] ?? ""}
                onChange={(e) => onChange(q.detail!.id, e.target.value)}
                placeholder={q.detail.placeholder}
                rows={2}
                autoFocus
                className={boxInput}
              />
            ) : (
              <input
                type="text"
                value={answers[q.detail.id] ?? ""}
                onChange={(e) => onChange(q.detail!.id, e.target.value)}
                placeholder={q.detail.placeholder}
                autoComplete="off"
                autoFocus
                className={lineInput}
              />
            )}
          </motion.div>
        )}
      </div>

      <p
        role="alert"
        className={`mt-3 min-h-4 text-xs text-[#E0A56B] transition-opacity ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </p>

      <div className="mt-8 flex gap-3.5 max-sm:flex-col-reverse">
        <button type="button" onClick={onBack} className={`${btnGhost} max-sm:w-full`}>
          Atrás
        </button>
        <button type="button" onClick={onNext} className={`${btnPrimary} max-sm:w-full`}>
          {isLast ? "Pre-confirmar asistencia" : "Continuar"}
        </button>
      </div>

      {q.kind !== "textarea" && (
        <div className="mt-5 text-[11px] tracking-wide text-[#5a5a5a] max-sm:hidden">
          Presiona{" "}
          <kbd className="rounded-[3px] border border-[#444] px-1.5 py-px text-[10px] text-text-muted">
            Enter ↵
          </kbd>
        </div>
      )}
    </div>
  );
}
