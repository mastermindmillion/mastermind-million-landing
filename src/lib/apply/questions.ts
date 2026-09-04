import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "nombre",
    type: "text",
    prompt: "¿Cuál es tu nombre completo?",
    placeholder: "Tu nombre",
  },
  {
    id: "whatsapp",
    type: "phone",
    prompt: "¿Cuál es tu WhatsApp?",
    placeholder: "000 000 0000",
  },
  {
    id: "email",
    type: "email",
    prompt: "¿Cuál es tu mejor email?",
    placeholder: "tu@email.com",
  },
  {
    id: "instagram",
    type: "text",
    prompt: "¿Cuál es tu Instagram?",
    placeholder: "@tuusuario",
  },
  {
    id: "pais",
    type: "text",
    prompt: "¿En qué país vives?",
    placeholder: "Tu país",
  },
  {
    id: "rol",
    type: "choice",
    prompt: "¿Cuál es tu rol?",
    allowOther: true,
    options: [
      { value: "Experto / creador", label: "Experto / creador" },
      { value: "Coproductor", label: "Coproductor" },
      {
        value: "Formo parte del equipo de un experto",
        label: "Formo parte del equipo de un experto",
      },
      { value: "Otro", label: "Otro" },
    ],
  },
  {
    id: "nicho",
    type: "text",
    prompt: "¿En qué área o nicho actúas?",
    placeholder: "Ej. Marketing digital, salud, finanzas...",
  },
  {
    id: "facturacion",
    type: "choice",
    prompt:
      "¿Cuál es tu rango de facturación en 2026 con productos digitales? (en dólares)",
    options: [
      { value: "0 a 100k", label: "0 a 100k" },
      { value: "100k a 250k", label: "100k a 250k" },
      { value: "250k a 500k", label: "250k a 500k" },
      { value: "500k a 1M", label: "500k a 1M" },
      { value: "Más de 1M", label: "Más de 1M" },
    ],
  },
  {
    id: "interes",
    type: "textarea",
    prompt: "¿Por qué te interesaste en el Mastermind Million?",
  },
  {
    id: "ayuda",
    type: "textarea",
    prompt: "¿En qué crees que el Mastermind Million te va a ayudar?",
  },
  {
    id: "aporte",
    type: "textarea",
    prompt: "¿Qué crees que puedes aportar al grupo?",
  },
  {
    id: "compromiso",
    type: "choice",
    prompt:
      "En caso de ser aceptado/a, ¿te comprometes a participar presencialmente los 2 días del encuentro en Cartagena (22 y 23 de febrero)?",
    options: [
      { value: "Sí, me comprometo", label: "Sí, me comprometo" },
      { value: "No puedo confirmar asistencia", label: "No puedo confirmar asistencia" },
    ],
  },
];
