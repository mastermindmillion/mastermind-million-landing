import type { Question } from "./types";

export const MAX_SCORE = 22;

export const questions: Question[] = [
  {
    id: 1,
    prompt: "¿Sientes que la energía que tenías hace 5 años se quedó en el pasado?",
    measures: "Vitalidad",
    options: [
      { key: "A", label: "Sí, hoy vivo agotado/a casi todo el tiempo, incluso sin hacer mucho", points: 0 },
      { key: "B", label: "Ha bajado bastante, me cuesta rendir como antes", points: 2 },
      { key: "C", label: "Se mantiene, aunque con días buenos y días muy pesados", points: 3 },
      { key: "D", label: "Sigo igual o incluso mejor, con energía estable", points: 4 },
    ],
  },
  {
    id: 2,
    prompt: "¿Tu cuerpo realmente descansa cuando duermes, o solo apagas la luz?",
    measures: "Sueño",
    options: [
      { key: "A", label: "Casi nunca despierto descansado/a (0–1 noches a la semana)", points: 0 },
      { key: "B", label: "Duermo, pero despierto cansado/a la mayoría de los días (2–3)", points: 2 },
      { key: "C", label: "Descanso bien la mayoría de las noches (4–5)", points: 3 },
      { key: "D", label: "Duermo profundo casi todas las noches (6–7)", points: 4 },
    ],
  },
  {
    id: 3,
    prompt: "¿Hay una molestia en tu cuerpo que ya se volvió parte de tu rutina diaria?",
    measures: "Dolor/inflamación",
    options: [
      { key: "A", label: "Sí, un dolor o inflamación constante que ya casi normalicé", points: 0 },
      { key: "B", label: "Sí, aparece con frecuencia y me limita", points: 1 },
      { key: "C", label: "A veces, algo leve u ocasional", points: 3 },
      { key: "D", label: "No, mi cuerpo se siente libre de eso", points: 4 },
    ],
  },
  {
    id: 4,
    prompt: "¿Desde hace cuánto cargas con esto sin resolverlo del todo?",
    measures: "Cronicidad",
    options: [
      { key: "A", label: "Más de 5 años", points: 0 },
      { key: "B", label: "Entre 2 y 5 años", points: 1 },
      { key: "C", label: "Entre 6 meses y 2 años", points: 2 },
      { key: "D", label: "Menos de 6 meses o no aplica", points: 3 },
    ],
  },
  {
    id: 5,
    prompt: "¿Cuántas veces ya intentaste resolverlo sin lograr un cambio real?",
    measures: "Intentos previos",
    options: [
      { key: "A", label: "Muchas (5+), y sigo buscando la respuesta correcta", points: 0 },
      { key: "B", label: "Varias (3–4), con resultados que no duraron", points: 1 },
      { key: "C", label: "Pocas (1–2)", points: 2 },
      { key: "D", label: "Ninguna todavía", points: 3 },
    ],
  },
  {
    id: 6,
    prompt: "Si nada cambia, ¿cuánto te está costando esto hoy en tu día a día?",
    measures: "Impacto",
    options: [
      { key: "A", label: "Muchísimo, condiciona casi todo lo que hago", points: 0 },
      { key: "B", label: "Bastante, me frena en cosas que me importan", points: 2 },
      { key: "C", label: "Un poco, pero ya lo noto", points: 3 },
      { key: "D", label: "Casi nada, vivo con libertad", points: 4 },
    ],
  },
];
