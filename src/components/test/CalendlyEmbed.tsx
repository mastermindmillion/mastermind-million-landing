"use client";

import { useEffect, useRef } from "react";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export default function CalendlyEmbed({ url }: { url?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [url]);

  if (!url) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-neutral-50 px-6 py-8 text-center text-sm text-neutral-500">
        Aquí se mostrará el calendario para agendar tu llamada gratuita.
        <br />
        Configura <code className="rounded bg-black/5 px-1 py-0.5">NEXT_PUBLIC_CALENDLY_URL</code>{" "}
        para activarlo.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget mt-6 overflow-hidden rounded-2xl border border-black/10"
      data-url={url}
      style={{ minWidth: "280px", height: "650px" }}
    />
  );
}
