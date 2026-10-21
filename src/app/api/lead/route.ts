import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/test/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!payload.name || !EMAIL_REGEX.test(payload.email ?? "") || !payload.consent) {
    return NextResponse.json({ error: "Datos de lead incompletos" }, { status: 400 });
  }

  const lead = {
    fecha: new Date().toISOString(),
    nombre: payload.name,
    email: payload.email,
    whatsapp: payload.whatsapp ?? "",
    respuestas: payload.answers,
    indice_pct: payload.indexPct,
    nivel: payload.tier,
    utm_source: payload.utm?.source ?? "",
    utm_medium: payload.utm?.medium ?? "",
    utm_campaign: payload.utm?.campaign ?? "",
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL no configurado. Lead recibido pero no persistido:", lead);
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error("Google Sheets webhook respondió con error", res.status);
      return NextResponse.json({ ok: true, persisted: false });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("Error reenviando lead a Google Sheets", err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
