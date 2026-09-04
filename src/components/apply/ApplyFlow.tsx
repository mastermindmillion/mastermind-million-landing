"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/lib/apply/questions";
import type { UtmParams } from "@/lib/apply/types";
import WelcomeScreen from "./WelcomeScreen";
import StepScreen from "./StepScreen";
import ConfirmationScreen from "./ConfirmationScreen";

type Step = "welcome" | "question" | "submitting" | "done";

function getUtm(searchParams: URLSearchParams): UtmParams {
  return {
    source: searchParams.get("utm_source"),
    medium: searchParams.get("utm_medium"),
    campaign: searchParams.get("utm_campaign"),
  };
}

export default function ApplyFlow() {
  const searchParams = useSearchParams();
  const utm = useMemo(() => getUtm(searchParams), [searchParams]);

  const [step, setStep] = useState<Step>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState(false);

  async function submit(finalAnswers: Record<string, string>) {
    setStep("submitting");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, utm }),
      });
      setSubmitError(!res.ok);
    } catch {
      setSubmitError(true);
    } finally {
      setStep("done");
    }
  }

  function handleAnswer(value: string) {
    const question = questions[questionIndex];
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if (questionIndex + 1 >= questions.length) {
      submit(nextAnswers);
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function handleBack() {
    setQuestionIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16">
      <AnimatePresence mode="wait" initial={false}>
        {step === "welcome" && (
          <WelcomeScreen key="welcome" onStart={() => setStep("question")} />
        )}

        {step === "question" && (
          <StepScreen
            key={`q-${questionIndex}`}
            question={questions[questionIndex]}
            value={answers[questions[questionIndex].id] ?? ""}
            onAnswer={handleAnswer}
            onBack={questionIndex > 0 ? handleBack : null}
            index={questionIndex}
            total={questions.length}
          />
        )}

        {step === "submitting" && (
          <p
            key="submitting"
            className="font-body text-sm uppercase tracking-[0.2em] text-text-muted"
          >
            Enviando aplicación...
          </p>
        )}

        {step === "done" && (
          <ConfirmationScreen key="done" error={submitError} />
        )}
      </AnimatePresence>
    </div>
  );
}
