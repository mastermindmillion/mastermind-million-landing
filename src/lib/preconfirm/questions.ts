import { PHONE_COUNTRIES } from "@/lib/apply/countries";

export const OTHER = "Otro";

// Colombia first (host country); the rest keep the shared order.
export const COUNTRIES = [
  ...PHONE_COUNTRIES.filter((c) => c.name === "Colombia"),
  ...PHONE_COUNTRIES.filter((c) => c.name !== "Colombia"),
];

export type Answers = Record<string, string>;

export type Option = { value: string; label: string };

type Detail = {
  id: string;
  showWhen: string[];
  placeholder: string;
  multiline?: boolean;
  required: boolean;
  error: string;
};

export type Question = {
  id: string;
  kind: "text" | "email" | "phone" | "select" | "choice" | "textarea";
  title: string;
  sub?: string;
  placeholder?: string;
  optional?: boolean;
  minLength?: number;
  options?: Option[];
  detail?: Detail;
  error: string;
};

export const INITIAL_ANSWERS: Answers = { telefonoPais: COUNTRIES[0].name };

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
    id: "email",
    kind: "email",
    title: "¿Cuál es tu correo electrónico?",
    sub: "Aquí enviaremos los detalles del encuentro.",
    placeholder: "tu@correo.com",
    error: "Ingresa un correo válido.",
  },
  {
    id: "telefono",
    kind: "phone",
    title: "¿Cuál es tu WhatsApp?",
    sub: "Por aquí te compartiremos recordatorios importantes.",
    placeholder: "300 000 0000",
    error: "Ingresa un teléfono válido.",
  },
  {
    id: "pais",
    kind: "select",
    title: "¿Desde qué país nos visitas?",
    options: [
      ...COUNTRIES.map((c) => ({ value: c.name, label: `${c.flag} ${c.name}` })),
      { value: OTHER, label: `🌐 ${OTHER}` },
    ],
    detail: {
      id: "paisOtro",
      showWhen: [OTHER],
      placeholder: "Escribe el nombre de tu país",
      required: true,
      error: "Escribe el nombre de tu país.",
    },
    error: "Selecciona tu país.",
  },
  {
    id: "ciudad",
    kind: "text",
    title: "¿Y desde qué ciudad?",
    placeholder: "Ej. Medellín",
    error: "Indica tu ciudad.",
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
  {
    id: "dieta",
    kind: "choice",
    title: "¿Alguna restricción alimentaria o alergia?",
    sub: "Queremos cuidar cada detalle de tu experiencia.",
    options: [
      { value: "Ninguna", label: "Ninguna" },
      { value: "Vegetariano", label: "Vegetariano" },
      { value: "Vegano", label: "Vegano" },
      { value: "Tengo alergias", label: "Tengo alergias" },
      { value: "Otra restricción", label: "Otra restricción" },
    ],
    detail: {
      id: "dietaDetalle",
      showWhen: ["Tengo alergias", "Otra restricción"],
      placeholder:
        "Cuéntanos cuál — por tu seguridad queremos prepararnos bien.",
      multiline: true,
      required: false,
      error: "",
    },
    error: "Selecciona una opción.",
  },
  {
    id: "comentarios",
    kind: "textarea",
    title: "¿Algo más que debamos saber?",
    sub: "Movilidad reducida, requerimientos especiales, etc. (opcional)",
    placeholder: "Escribe aquí, o continúa si no aplica",
    optional: true,
    error: "",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const val = (a: Answers, id: string) => (a[id] ?? "").trim();

export function detailVisible(q: Question, a: Answers): boolean {
  return !!q.detail && q.detail.showWhen.includes(val(a, q.id));
}

/** Returns the error message to show for this step, or null if it is valid. */
export function validate(q: Question, a: Answers): string | null {
  switch (q.kind) {
    case "text":
      return val(a, q.id).length >= (q.minLength ?? 1) ? null : q.error;
    case "email":
      return EMAIL_REGEX.test(val(a, q.id)) ? null : q.error;
    case "phone": {
      const digits = val(a, q.id).replace(/\D/g, "");
      if (digits.length < 7) return q.error;
      if (val(a, "telefonoPais") === OTHER && !val(a, "telefonoOtro")) {
        return "Escribe el código de tu país.";
      }
      return null;
    }
    case "select":
    case "choice":
      if (!val(a, q.id)) return q.error;
      if (
        q.detail?.required &&
        detailVisible(q, a) &&
        !val(a, q.detail.id)
      ) {
        return q.detail.error;
      }
      return null;
    case "textarea":
      return q.optional || val(a, q.id) ? null : q.error;
  }
}

/** Flat object sent to /api/preconfirmacion (keys become sheet columns). */
export function buildPayload(a: Answers) {
  const country = COUNTRIES.find((c) => c.name === val(a, "telefonoPais"));
  const dial = country ? country.dial : val(a, "telefonoOtro");
  const dieta = questions.find((q) => q.id === "dieta")!;
  const pais = val(a, "pais");

  return {
    nombre: val(a, "nombre"),
    email: val(a, "email"),
    whatsapp: `${dial} ${val(a, "telefono")}`.trim(),
    pais: pais === OTHER ? val(a, "paisOtro") : pais,
    ciudad: val(a, "ciudad"),
    acompanante: val(a, "acompanante"),
    nombre_acompanante:
      val(a, "acompanante") === "Sí" ? val(a, "acompananteNombre") : "",
    restriccion_alimentaria: val(a, "dieta"),
    detalle_restriccion: detailVisible(dieta, a) ? val(a, "dietaDetalle") : "",
    comentarios: val(a, "comentarios"),
  };
}
