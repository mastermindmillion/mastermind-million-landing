"use client";

import { useMemo, useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/lib/test/questions";
import { calculateIndexPct, calculateRawScore, tierFromIndexPct } from "@/lib/test/scoring";
import { trackEvent } from "@/lib/test/analytics";
import type { Answer, OptionKey, Step, UtmParams } from "@/lib/test/types";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import LeadForm, { type LeadFormValues } from "./LeadForm";
import ResultScreen from "./ResultScreen";

type State = {
  step: Step;
  answers: Record<number, Answer>;
};

type Action =
  | { type: "START" }
  | { type: "SELECT"; index: number; answer: Answer }
  | { type: "ADVANCE" }
  | { type: "BACK" }
  | { type: "GO_TO_LEAD" }
  | { type: "GO_TO_RESULT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, step: { kind: "question", index: 0 } };
    case "SELECT":
      return {
        ...state,
        answers: { ...state.answers, [action.answer.questionId]: action.answer },
      };
    case "ADVANCE": {
      if (state.step.kind !== "question") return state;
      const next = state.step.index + 1;
      if (next >= questions.length) {
        return { ...state, step: { kind: "lead" } };
      }
      return { ...state, step: { kind: "question", index: next } };
    }
    case "BACK": {
      if (state.step.kind === "question" && state.step.index > 0) {
        return { ...state, step: { kind: "question", index: state.step.index - 1 } };
      }
      if (state.step.kind === "lead") {
        return { ...state, step: { kind: "question", index: questions.length - 1 } };
      }
      return state;
    }
    case "GO_TO_LEAD":
      return { ...state, step: { kind: "lead" } };
    case "GO_TO_RESULT":
      return { ...state, step: { kind: "result" } };
    default:
      return state;
  }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

function getUtm(searchParams: URLSearchParams): UtmParams {
  return {
    source: searchParams.get("utm_source"),
    medium: searchParams.get("utm_medium"),
    campaign: searchParams.get("utm_campaign"),
    content: searchParams.get("utm_content"),
    term: searchParams.get("utm_term"),
  };
}

export default function TestFlow() {
  const searchParams = useSearchParams();
  const utm = useMemo(() => getUtm(searchParams), [searchParams]);

  const [state, dispatch] = useReducer(reducer, {
    step: { kind: "welcome" },
    answers: {},
  });
  const [submitting, setSubmitting] = useState(false);

  const answersList = useMemo(
    () => Object.values(state.answers).sort((a, b) => a.questionId - b.questionId),
    [state.answers]
  );
  const rawScore = calculateRawScore(answersList);
  const indexPct = calculateIndexPct(rawScore);
  const tier = tierFromIndexPct(indexPct);

  function handleStart() {
    trackEvent("test_start");
    dispatch({ type: "START" });
  }

  function handleSelect(questionIndex: number, key: OptionKey) {
    const question = questions[questionIndex];
    const option = question.options.find((o) => o.key === key);
    if (!option) return;

    dispatch({
      type: "SELECT",
      index: questionIndex,
      answer: { questionId: question.id, option: key, points: option.points },
    });
    trackEvent("question_answered", { question: question.id, option: key });

    window.setTimeout(() => dispatch({ type: "ADVANCE" }), 300);
  }

  async function handleLeadSubmit(values: LeadFormValues) {
    setSubmitting(true);
    const finalAnswers = Object.values(state.answers).sort((a, b) => a.questionId - b.questionId);
    const finalRawScore = calculateRawScore(finalAnswers);
    const finalIndexPct = calculateIndexPct(finalRawScore);
    const finalTier = tierFromIndexPct(finalIndexPct);

    const payload = {
      name: values.name,
      email: values.email,
      whatsapp: values.whatsapp || null,
      consent: values.consent,
      answers: finalAnswers,
      rawScore: finalRawScore,
      indexPct: finalIndexPct,
      tier: finalTier,
      utm,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("No se pudo guardar el lead", err);
    } finally {
      setSubmitting(false);
      trackEvent("lead_captured", { tier: finalTier });
      dispatch({ type: "GO_TO_RESULT" });
      trackEvent("result_viewed", { tier: finalTier });
    }
  }

  function handleCtaClick() {
    trackEvent("cta_click_agendar", { tier });
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <AnimatePresence mode="popLayout" initial={false}>
        {state.step.kind === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {state.step.kind === "question" && (
          <QuestionScreen
            key={`question-${state.step.index}`}
            question={questions[state.step.index]}
            index={state.step.index}
            total={questions.length}
            selected={state.answers[questions[state.step.index].id]?.option ?? null}
            onSelect={(key) => handleSelect(state.step.kind === "question" ? state.step.index : 0, key)}
            onBack={state.step.index > 0 ? () => dispatch({ type: "BACK" }) : null}
          />
        )}

        {state.step.kind === "lead" && (
          <LeadForm key="lead" onSubmit={handleLeadSubmit} submitting={submitting} />
        )}

        {state.step.kind === "result" && (
          <ResultScreen
            key="result"
            indexPct={indexPct}
            tier={tier}
            calendlyUrl={CALENDLY_URL}
            onCtaClick={handleCtaClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
