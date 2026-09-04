"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ConfirmationScreen({
  error,
}: {
  error?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-lg flex-col items-center text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40">
        <span className="font-heading text-2xl text-gold">{error ? "!" : "✓"}</span>
      </div>

      <h1 className="mt-8 font-heading text-3xl font-medium leading-tight text-white sm:text-4xl">
        {error ? "No pudimos guardar tu aplicación" : "¡Gracias por aplicar!"}
      </h1>

      <p className="mt-6 font-body text-base leading-relaxed text-text-muted md:text-lg">
        {error
          ? "Hubo un problema técnico y no logramos registrar tus respuestas. Por favor, inténtalo de nuevo — si vuelve a fallar, escríbenos por WhatsApp y te ayudamos directamente."
          : "Un miembro del equipo revisará tu perfil y se pondrá en contacto contigo para confirmar si hay un cupo disponible para ti en futuros encuentros del mastermind."}
      </p>

      {error ? (
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/aplica"
            className="shimmer-btn rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform hover:-translate-y-0.5"
          >
            Intentar de nuevo
          </Link>
          <a
            href="https://wa.link/5p8hk4"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-gold-light transition-colors hover:text-gold"
          >
            Escribir por WhatsApp
          </a>
        </div>
      ) : (
        <Link
          href="/"
          className="mt-10 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-gold-light transition-colors hover:text-gold"
        >
          Volver al inicio
        </Link>
      )}
    </motion.div>
  );
}
