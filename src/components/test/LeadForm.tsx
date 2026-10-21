"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import Disclaimer from "./Disclaimer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormValues = {
  name: string;
  email: string;
  whatsapp: string;
  consent: boolean;
};

export default function LeadForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: LeadFormValues) => void;
  submitting: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Ingresa tu nombre.";
    if (!EMAIL_REGEX.test(email.trim())) nextErrors.email = "Ingresa un email válido.";
    if (!consent) nextErrors.consent = "Debes aceptar para continuar.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim(), consent });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <GlassCard className="px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-black">
          Tu resultado está listo
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500">¿A dónde te lo enviamos?</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-xs font-medium text-neutral-500">
              Nombre
            </label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="mt-1 text-xs text-neutral-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="lead-email" className="mb-1.5 block text-xs font-medium text-neutral-500">
              Email
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-neutral-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="lead-whatsapp" className="mb-1.5 block text-xs font-medium text-neutral-500">
              WhatsApp <span className="text-neutral-400">(opcional)</span>
            </label>
            <input
              id="lead-whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              autoComplete="tel"
              className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              placeholder="+52 55 1234 5678"
            />
          </div>

          <label className="mt-2 flex items-start gap-3 text-xs text-neutral-500">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 accent-black"
            />
            <span>
              Acepto la política de privacidad y recibir comunicaciones sobre Power Bracelet.
            </span>
          </label>
          {errors.consent && <p className="-mt-2 text-xs text-neutral-500">{errors.consent}</p>}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="mt-4 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {submitting ? "Enviando…" : "Ver mi resultado"}
          </motion.button>
        </form>

        <Disclaimer className="mt-6 text-center" />
      </GlassCard>
    </motion.div>
  );
}
