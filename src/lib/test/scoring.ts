import { MAX_SCORE } from "./questions";
import type { Answer, Tier } from "./types";

export function calculateRawScore(answers: Answer[]): number {
  return answers.reduce((sum, answer) => sum + answer.points, 0);
}

export function calculateIndexPct(rawScore: number): number {
  return Math.round((rawScore / MAX_SCORE) * 100);
}

export function tierFromIndexPct(indexPct: number): Tier {
  if (indexPct <= 44) return "bajo";
  if (indexPct <= 69) return "moderado";
  return "alto";
}

export const tierCopy: Record<
  Tier,
  {
    label: string;
    headline: string;
    body: string;
    educational: string;
    ctaHint: string;
  }
> = {
  bajo: {
    label: "Energía crítica",
    headline: "Funcionas a menos de la mitad",
    body: "Tu cuerpo está funcionando muy por debajo de su potencial: cansancio, mal descanso o molestias sostenidas suelen ser señales de un sistema pidiendo apoyo.",
    educational:
      "La tecnología FIR (infrarrojo lejano) de Power Bracelet está diseñada para acompañar tu bienestar y energía diaria de forma complementaria.",
    ctaHint: "El primer paso es entender tu caso. Agenda una llamada gratuita de 15 minutos y te explicamos cómo funciona.",
  },
  moderado: {
    label: "Con margen de mejora",
    headline: "Sabes que podría estar mejor",
    body: "Funcionas, pero con limitaciones que probablemente ya normalizaste. Ese “estar bien a medias” tiene margen de mejora.",
    educational: "FIR Power apunta justo a ese siguiente nivel de energía y confort.",
    ctaHint: "Agenda tu llamada gratuita de 15 minutos y descubre cómo dar el salto.",
  },
  alto: {
    label: "Buen nivel, hay que sostenerlo",
    headline: "Estás bien, pero…",
    body: "¡Buen resultado! Estás en una posición sólida. Y desde aquí, lo inteligente es cuidar y prevenir para no retroceder con los años.",
    educational: "FIR Power es una herramienta de mantenimiento y prevención para sostener tu energía a largo plazo.",
    ctaHint: "Agenda una llamada gratuita de 15 minutos y arma tu estrategia preventiva.",
  },
};
