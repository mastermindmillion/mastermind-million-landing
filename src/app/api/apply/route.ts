import { NextResponse } from "next/server";
import type { ApplyPayload } from "@/lib/apply/types";
import { questions } from "@/lib/apply/questions";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ApplyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { answers } = payload;

  if (!answers?.nombre || !EMAIL_REGEX.test(answers?.email ?? "")) {
    return NextResponse.json(
      { error: "Datos de aplicación incompletos" },
      { status: 400 }
    );
  }

  const respuestas = Object.fromEntries(
    questions.map((q) => [q.prompt, answers[q.id] ?? ""])
  );

  const application = {
    fecha: new Date().toISOString(),
    nombre: answers.nombre,
    email: answers.email,
    whatsapp: answers.whatsapp ?? "",
    ...respuestas,
    utm_source: payload.utm?.source ?? "",
    utm_medium: payload.utm?.medium ?? "",
    utm_campaign: payload.utm?.campaign ?? "",
  };

  const webhookUrl = process.env.APPLY_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "APPLY_SHEETS_WEBHOOK_URL no configurado. Aplicación recibida pero no persistida:",
      application
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });

    if (!res.ok) {
      console.error("Google Sheets webhook respondió con error", res.status);
      return NextResponse.json({ ok: true, persisted: false });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("Error reenviando aplicación a Google Sheets", err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
