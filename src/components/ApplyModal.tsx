"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApplyModal } from "@/lib/apply-modal-context";

export default function ApplyModal() {
  const { isOpen, closeApplyModal } = useApplyModal();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApplyModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeApplyModal]);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
          onClick={closeApplyModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-black-soft p-8 md:p-10"
          >
            <button
              type="button"
              onClick={closeApplyModal}
              aria-label="Cerrar"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full gold-gradient-bg text-black">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                    <path d="M4 12.5l5 5L20 6" />
                  </svg>
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  ¡Recibimos tu aplicación!
                </h3>
                <p className="mt-2 font-body text-sm text-text-muted">
                  Nuestro equipo revisará tu perfil y se pondrá en contacto
                  contigo para confirmar tu cupo.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-2xl font-semibold text-white">
                  Aplica a Mastermind Million
                </h3>
                <p className="mt-2 font-body text-sm text-text-muted">
                  Cuéntanos un poco de ti. Solo toma un minuto.
                </p>

                <form
                  className="mt-8 flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="apply-name" className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
                      Nombre completo
                    </label>
                    <input
                      id="apply-name"
                      name="name"
                      type="text"
                      required
                      className="rounded-lg border border-white/15 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/60"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="apply-email" className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
                      Email
                    </label>
                    <input
                      id="apply-email"
                      name="email"
                      type="email"
                      required
                      className="rounded-lg border border-white/15 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/60"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="apply-whatsapp" className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
                      WhatsApp
                    </label>
                    <input
                      id="apply-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      className="rounded-lg border border-white/15 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/60"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="apply-instagram" className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
                      Instagram o red principal
                    </label>
                    <input
                      id="apply-instagram"
                      name="instagram"
                      type="text"
                      required
                      className="rounded-lg border border-white/15 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/60"
                      placeholder="@tuusuario"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="apply-revenue" className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
                      Nivel de facturación
                    </label>
                    <select
                      id="apply-revenue"
                      name="revenue"
                      required
                      defaultValue=""
                      className="rounded-lg border border-white/15 bg-black px-4 py-3 font-body text-sm text-white outline-none transition-colors focus:border-gold/60"
                    >
                      <option value="" disabled>
                        Selecciona un rango
                      </option>
                      <option value="500k-1m">$500K – $1M USD</option>
                      <option value="1m-3m">$1M – $3M USD</option>
                      <option value="3m-10m">$3M – $10M USD</option>
                    </select>
                  </div>

                  <label className="mt-1 flex items-start gap-2.5 text-left">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4A362]"
                    />
                    <span className="font-body text-xs text-text-muted">
                      Confirmo que he facturado +$1M USD.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="shimmer-btn mt-2 inline-flex items-center justify-center rounded-full px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_0_30px_rgba(212,163,98,0.25)] transition-shadow hover:shadow-[0_0_45px_rgba(212,163,98,0.4)]"
                  >
                    Enviar aplicación
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
