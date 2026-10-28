"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import {
  INITIAL_ANSWERS,
  buildPayload,
  questions,
  validate,
  type Answers,
} from "@/lib/preconfirm/questions";
import QuestionStep from "./QuestionStep";
import { FailureScreen, SuccessScreen, WelcomeScreen } from "./Screens";

type Stage = "welcome" | "question" | "submitting" | "done" | "error";

type Confetti = {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  color: string;
  ribbon: boolean;
};

const CONFETTI_COLORS = ["#D4A362", "#B17F40", "#E8D9AE", "#F5E6C8"];

function makeConfetti(): Confetti[] {
  const total = window.matchMedia("(max-width: 520px)").matches ? 40 : 70;
  return Array.from({ length: total }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.6 + Math.random() * 1.8,
    drift: Math.random() * 160 - 80,
    spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360),
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    ribbon: Math.random() > 0.5,
  }));
}

export default function PreconfirmFlow() {
  const searchParams = useSearchParams();
  const utm = useMemo(
    () => ({
      source: searchParams.get("utm_source"),
      medium: searchParams.get("utm_medium"),
      campaign: searchParams.get("utm_campaign"),
    }),
    [searchParams]
  );

  const [stage, setStage] = useState<Stage>("welcome");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [refCode, setRefCode] = useState("");
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  function setAnswer(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setFieldError(null);
  }

  async function submit() {
    setStage("submitting");
    try {
      const res = await fetch("/api/preconfirmacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: buildPayload(answers), utm }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.persisted || !data?.ref) {
        setStage("error");
        return;
      }
      setRefCode(data.ref);
      setStage("done");
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setConfetti(makeConfetti());
        window.setTimeout(() => setConfetti([]), 5200);
      }
    } catch {
      setStage("error");
    }
  }

  function goNext() {
    if (stage === "welcome") {
      setStage("question");
      return;
    }
    if (stage !== "question") return;

    const err = validate(questions[index], answers);
    setFieldError(err);
    if (err) return;

    if (index === questions.length - 1) {
      void submit();
      return;
    }
    setIndex((i) => i + 1);
  }

  // After a failed submit: back to the welcome screen, answers are kept.
  function restart() {
    setFieldError(null);
    setIndex(0);
    setStage("welcome");
  }

  function goBack() {
    setFieldError(null);
    if (index === 0) {
      setStage("welcome");
      return;
    }
    setIndex((i) => i - 1);
  }

  // Enter advances (like the reference), but never hijacks buttons or selects,
  // and in textareas only with Cmd/Ctrl so newlines still work.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      if (stage !== "welcome" && stage !== "question") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "SELECT" || tag === "A") return;
      if (tag === "TEXTAREA" && !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const progress =
    stage === "welcome" ? 0 : ((index + 1) / questions.length) * 100;

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-black">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-gold/10">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-deep to-gold-light"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

      {stage !== "welcome" && (
        <div className="fixed left-5 top-[calc(18px+env(safe-area-inset-top))] z-50">
          <Logo className="h-9 w-auto opacity-90" />
        </div>
      )}

      {stage === "question" && (
        <div className="fixed right-5 top-[calc(18px+env(safe-area-inset-top))] z-50 text-[11px] tracking-[0.15em] text-text-muted">
          <span className="text-gold">{index + 1}</span> / {questions.length}
        </div>
      )}

      <div className="flex min-h-dvh items-center justify-center px-5 pb-12 pt-24 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage === "question" ? `q-${index}` : stage}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            {stage === "welcome" && <WelcomeScreen onStart={goNext} />}

            {stage === "question" && (
              <QuestionStep
                question={questions[index]}
                index={index}
                total={questions.length}
                answers={answers}
                error={fieldError}
                onChange={setAnswer}
                onBack={goBack}
                onNext={goNext}
              />
            )}

            {stage === "submitting" && (
              <p className="text-center text-sm uppercase tracking-[0.2em] text-text-muted">
                Enviando...
              </p>
            )}

            {stage === "done" && <SuccessScreen refCode={refCode} />}

            {stage === "error" && <FailureScreen onRetry={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {confetti.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
        >
          {confetti.map((c, i) => (
            <div
              key={i}
              className={`absolute -top-[10%] opacity-90 ${
                c.ribbon ? "h-[22px] w-1.5 rounded-[3px]" : "h-4 w-2"
              }`}
              style={
                {
                  left: `${c.left}%`,
                  background: c.color,
                  animation: `confetti-fall ${c.duration}s cubic-bezier(.25,.46,.45,.94) ${c.delay}s forwards`,
                  "--drift": `${c.drift}px`,
                  "--spin": `${c.spin}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
