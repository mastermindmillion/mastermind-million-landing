"use client";

import Image from "next/image";
import { btnPrimary } from "./ui";

export const SUPPORT_URL = "https://wa.link/q9pwss";

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
      <Image
        src="/logo-lockup.svg"
        alt="Mastermind Million"
        width={280}
        height={139}
        unoptimized
        priority
        className="mb-9 h-auto w-[280px] max-w-[75vw] drop-shadow-[0_0_18px_rgba(212,163,98,0.25)]"
      />

      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-5 py-[9px] text-[11px] uppercase tracking-[0.18em] text-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#D4A362]" />
        Acceso restringido
      </div>

      <h1 className="gold-gradient-text mb-[18px] font-heading text-[22px] font-medium leading-[1.35] sm:text-[30px]">
        <span className="block">Este link es exclusivo para</span>
        <span className="block">Miembros Million.</span>
      </h1>

      <p className="mb-9 max-w-[440px] text-[13.5px] leading-[1.8] text-text-muted sm:text-[14.5px]">
        Tómate 20 segundos para preconfirmar tu asistencia y asegurar tu lugar
        en el encuentro de Cartagena (18 y 19 de febrero de 2027).
      </p>

      <button type="button" onClick={onStart} className={btnPrimary}>
        Pre-confirmar mi asistencia
      </button>
      <div className="mt-5 text-[11px] tracking-wide text-[#5a5a5a] max-sm:hidden">
        Presiona{" "}
        <kbd className="rounded-[3px] border border-[#444] px-1.5 py-px text-[10px] text-text-muted">
          Enter ↵
        </kbd>{" "}
        para continuar
      </div>
    </div>
  );
}

function SupportBlock({ label }: { label: string }) {
  return (
    <div className="mt-10 border-t border-gold/15 pt-6 sm:mt-12 sm:pt-8">
      <p className="mb-4 text-[13px] text-text-muted">{label}</p>
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnPrimary} inline-flex items-center`}
      >
        Contacta a soporte
      </a>
    </div>
  );
}

export function SuccessScreen({ refCode }: { refCode: string }) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="mb-7 h-[78px] w-[78px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="sealGrad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B17F40" />
            <stop offset="1" stopColor="#E8D9AE" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" stroke="url(#sealGrad)" strokeWidth="1.5" />
        <path
          d="M50 10 L60 38 L88 50 L60 62 L50 90 L40 62 L12 50 L40 38 Z"
          fill="url(#sealGrad)"
          opacity="0.18"
        />
        <path
          d="M30 56 L42 68 L70 36"
          stroke="url(#sealGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h1 className="mb-3.5 font-heading text-[26px] font-medium text-white">
        Pre-confirmación recibida
      </h1>
      <p className="max-w-[420px] text-sm leading-[1.8] text-text-muted">
        Gracias por pre-confirmar tu lugar en el Mastermind Million. Tu
        asistencia quedó registrada.
      </p>
      <p className="mt-3.5 text-sm font-medium text-gold-light">
        Nos vemos en Cartagena.
      </p>
      <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gold">
        Referencia {refCode}
      </div>

      <SupportBlock label="¿Tienes alguna duda?" />
    </div>
  );
}

export function FailureScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
      <div className="mb-7 flex h-[78px] w-[78px] items-center justify-center rounded-full border border-gold/40 font-heading text-3xl text-gold">
        !
      </div>
      <h1 className="mb-3.5 font-heading text-[26px] font-medium text-white">
        No pudimos guardar tu pre-confirmación
      </h1>
      <p className="max-w-[420px] text-sm leading-[1.8] text-text-muted">
        Hubo un problema técnico y no logramos registrar tus respuestas. Tus
        datos siguen aquí: inténtalo de nuevo y, si vuelve a fallar, escríbenos
        a soporte.
      </p>
      <button type="button" onClick={onRetry} className={`${btnPrimary} mt-8`}>
        Intentar de nuevo
      </button>

      <SupportBlock label="¿Sigue sin funcionar?" />
    </div>
  );
}
