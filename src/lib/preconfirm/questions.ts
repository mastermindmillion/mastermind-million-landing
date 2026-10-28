export type Answers = Record<string, string>;

export type Option = { value: string; label: string };

type Detail = {
  id: string;
  showWhen: string[];
  placeholder: string;
  required: boolean;
  error: string;
};

export type Question = {
  id: string;
  kind: "text" | "choice";
  title: string;
  sub?: string;
  placeholder?: string;
  minLength?: number;
  options?: Option[];
  detail?: Detail;
  error: string;
};

export const INITIAL_ANSWERS: Answers = {};

export const questions: Question[] = [
  {
    id: "nombre",
    kind: "text",
    title: "¿Cuál es tu nombre completo?",
    sub: "Como aparecerá en tu gafete de acceso.",
    placeholder: "Escribe tu respuesta aquí",
    minLength: 2,
    error: "Por favor escribe tu nombre completo.",
  },
  {
    id: "acompanante",
    kind: "choice",
    title: "¿Vienes con acompañante?",
    options: [
      { value: "No", label: "No" },
      { value: "Sí", label: "Sí" },
    ],
    detail: {
      id: "acompananteNombre",
      showWhen: ["Sí"],
      placeholder: "Nombre completo de tu acompañante",
      required: true,
      error: "Escribe el nombre de tu acompañante.",
    },
    error: "Selecciona una opción.",
  },
];

const val = (a: Answers, id: string) => (a[id] ?? "").trim();

export function detailVisible(q: Question, a: Answers): boolean {
  return !!q.detail && q.detail.showWhen.includes(val(a, q.id));
}

/** Returns the error message to show for this step, or null if it is valid. */
export function validate(q: Question, a: Answers): string | null {
  if (q.kind === "text") {
    return val(a, q.id).length >= (q.minLength ?? 1) ? null : q.error;
  }
  if (!val(a, q.id)) return q.error;
  if (q.detail?.required && detailVisible(q, a) && !val(a, q.detail.id)) {
    return q.detail.error;
  }
  return null;
}

/** Flat object sent to /api/preconfirmacion (keys become sheet columns). */
export function buildPayload(a: Answers) {
  return {
    nombre: val(a, "nombre"),
    acompanante: val(a, "acompanante"),
    nombre_acompanante:
      val(a, "acompanante") === "Sí" ? val(a, "acompananteNombre") : "",
  };
}
