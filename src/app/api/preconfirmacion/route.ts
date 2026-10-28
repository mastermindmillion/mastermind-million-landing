import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";

const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const MAX_LEN = 1000;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

// Values starting with = + - @ would be parsed as formulas by Google Sheets.
function cell(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function makeRef(): string {
  let ref = "MM-";
  for (let i = 0; i < 6; i++) ref += REF_CHARS[randomInt(REF_CHARS.length)];
  return ref;
}

export async function POST(request: Request) {
  let body: { answers?: Record<string, unknown>; utm?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const a = body.answers ?? {};
  const nombre = str(a.nombre);
  const acompanante = str(a.acompanante);
  const nombreAcompanante = str(a.nombre_acompanante);

  const valid =
    nombre.length >= 2 &&
    (acompanante === "No" || (acompanante === "Sí" && nombreAcompanante));

  if (!valid) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const ref = makeRef();
  const row = {
    fecha: new Date().toISOString(),
    ref,
    nombre,
    acompanante,
    nombre_acompanante: acompanante === "Sí" ? nombreAcompanante : "",
    utm_source: str(body.utm?.source),
    utm_medium: str(body.utm?.medium),
    utm_campaign: str(body.utm?.campaign),
  };
  const safeRow = Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, cell(v)])
  );

  const webhookUrl = process.env.PRECONFIRM_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(
      `PRECONFIRM_SHEETS_WEBHOOK_URL no configurado. Pre-confirmación ${ref} recibida pero no persistida.`
    );
    return NextResponse.json({ ok: true, persisted: false, ref });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safeRow),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await res.json().catch(() => null);
    const persisted = res.ok && result?.ok === true;
    if (!persisted) {
      console.error(`Webhook de Sheets falló para ${ref}`, res.status);
    }
    return NextResponse.json({ ok: true, persisted, ref });
  } catch (err) {
    console.error(`Error enviando ${ref} a Google Sheets`, err);
    return NextResponse.json({ ok: true, persisted: false, ref });
  }
}
