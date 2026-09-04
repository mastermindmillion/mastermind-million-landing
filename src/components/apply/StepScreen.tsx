"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/apply/types";
import { PHONE_COUNTRIES } from "@/lib/apply/countries";
import ProgressBar from "./ProgressBar";

const OTHER_PREFIX = "Otro: ";
const OTHER_COUNTRY = "Otro";

function splitPhoneValue(
  value: string
): { countryName: string; customDial: string; number: string } {
  const match = PHONE_COUNTRIES.find((c) => value.startsWith(`${c.dial} `));
  if (match) {
    return {
      countryName: match.name,
      customDial: "",
      number: value.slice(match.dial.length + 1),
    };
  }
  if (value.trim()) {
    const [dial, ...rest] = value.trim().split(" ");
    return { countryName: OTHER_COUNTRY, customDial: dial, number: rest.join(" ") };
  }
  return { countryName: PHONE_COUNTRIES[0].name, customDial: "", number: "" };
}

export default function StepScreen({
  question,
  value,
  onAnswer,
  onBack,
  index,
  total,
}: {
  question: Question;
  value: string;
  onAnswer: (value: string) => void;
  onBack: (() => void) | null;
  index: number;
  total: number;
}) {
  const [text, setText] = useState(value);
  const [otherText, setOtherText] = useState(
    value.startsWith(OTHER_PREFIX) ? value.slice(OTHER_PREFIX.length) : ""
  );
  const [showOtherInput, setShowOtherInput] = useState(
    value.startsWith(OTHER_PREFIX)
  );
  const initialPhone = splitPhoneValue(value);
  const [countryName, setCountryName] = useState(initialPhone.countryName);
  const [customDial, setCustomDial] = useState(initialPhone.customDial);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone.number);
  const selectedCountry = PHONE_COUNTRIES.find((c) => c.name === countryName);

  const isTextLike = question.type === "text" || question.type === "email";

  function submitText() {
    if (!text.trim()) return;
    onAnswer(text.trim());
  }

  function submitOther() {
    if (!otherText.trim()) return;
    onAnswer(`${OTHER_PREFIX}${otherText.trim()}`);
  }

  function submitPhone() {
    const dial = selectedCountry?.dial ?? customDial.trim();
    if (!dial || !phoneNumber.trim()) return;
    onAnswer(`${dial} ${phoneNumber.trim()}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-lg"
    >
      <div className="mb-8 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Volver"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
          >
            ←
          </button>
        )}
        <ProgressBar current={index} total={total} />
      </div>

      <h2 className="font-heading text-2xl font-medium leading-snug text-white sm:text-3xl">
        {question.prompt}
      </h2>
      {question.helper && (
        <p className="mt-3 font-body text-sm italic text-text-muted">
          {question.helper}
        </p>
      )}

      <div className="mt-8">
        {isTextLike && (
          <>
            <input
              type={question.type === "email" ? "email" : "text"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitText();
              }}
              placeholder={question.placeholder}
              autoFocus
              className="w-full border-b border-gold/30 bg-transparent pb-3 font-body text-lg text-white placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
            />
            <button
              onClick={submitText}
              disabled={!text.trim()}
              className="shimmer-btn mt-8 rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continuar
            </button>
          </>
        )}

        {question.type === "phone" && (
          <>
            <div className="flex gap-2">
              <select
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                aria-label="Código de país"
                className="w-[92px] shrink-0 rounded-lg border border-white/15 bg-black-soft py-3 pl-2 pr-1 font-body text-lg text-white focus:border-gold focus:outline-none"
              >
                {PHONE_COUNTRIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.flag} {c.dial}
                  </option>
                ))}
                <option value={OTHER_COUNTRY}>🌐 Otro</option>
              </select>

              {countryName === OTHER_COUNTRY && (
                <input
                  type="text"
                  value={customDial}
                  onChange={(e) => setCustomDial(e.target.value)}
                  placeholder="+00"
                  aria-label="Código de país personalizado"
                  autoFocus
                  className="w-16 shrink-0 border-b border-gold/30 bg-transparent pb-3 font-body text-lg text-white placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
                />
              )}

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitPhone();
                }}
                placeholder={question.placeholder}
                autoFocus={countryName !== OTHER_COUNTRY}
                className="min-w-0 flex-1 border-b border-gold/30 bg-transparent pb-3 font-body text-lg text-white placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
              />
            </div>
            <button
              onClick={submitPhone}
              disabled={
                !phoneNumber.trim() ||
                (countryName === OTHER_COUNTRY && !customDial.trim())
              }
              className="shimmer-btn mt-8 rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continuar
            </button>
          </>
        )}

        {question.type === "textarea" && (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              autoFocus
              className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.03] p-4 font-body text-base text-white placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
            />
            <button
              onClick={submitText}
              disabled={!text.trim()}
              className="shimmer-btn mt-8 rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continuar
            </button>
          </>
        )}

        {question.type === "choice" && (
          <div className="flex flex-col gap-3">
            {question.options?.map((option) => {
              const selected =
                value === option.value ||
                (option.value === "Otro" && showOtherInput);
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (option.value === "Otro" && question.allowOther) {
                      setShowOtherInput(true);
                      return;
                    }
                    setShowOtherInput(false);
                    onAnswer(option.value);
                  }}
                  className={`rounded-2xl border px-5 py-4 text-left font-body text-base transition-colors ${
                    selected
                      ? "border-gold bg-gold/10 text-white"
                      : "border-white/15 text-text-muted hover:border-gold/40 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}

            {showOtherInput && (
              <div className="mt-1 flex flex-col gap-3">
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitOther();
                  }}
                  placeholder="Cuéntanos cuál"
                  autoFocus
                  className="w-full border-b border-gold/30 bg-transparent pb-3 font-body text-lg text-white placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
                />
                <button
                  onClick={submitOther}
                  disabled={!otherText.trim()}
                  className="shimmer-btn self-start rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
