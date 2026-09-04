export type QuestionType = "text" | "email" | "phone" | "textarea" | "choice";

export type ChoiceOption = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  helper?: string;
  placeholder?: string;
  options?: ChoiceOption[];
  allowOther?: boolean;
};

export type UtmParams = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
};

export type ApplyPayload = {
  answers: Record<string, string>;
  utm: UtmParams;
};
