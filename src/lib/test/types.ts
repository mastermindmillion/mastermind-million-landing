export type OptionKey = "A" | "B" | "C" | "D";

export type QuestionOption = {
  key: OptionKey;
  label: string;
  points: number;
};

export type Question = {
  id: number;
  prompt: string;
  measures: string;
  options: QuestionOption[];
};

export type Answer = {
  questionId: number;
  option: OptionKey;
  points: number;
};

export type Tier = "bajo" | "moderado" | "alto";

export type UtmParams = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
};

export type LeadPayload = {
  name: string;
  email: string;
  whatsapp: string | null;
  consent: boolean;
  answers: Answer[];
  rawScore: number;
  indexPct: number;
  tier: Tier;
  utm: UtmParams;
};

export type Step =
  | { kind: "welcome" }
  | { kind: "question"; index: number }
  | { kind: "lead" }
  | { kind: "result" };
