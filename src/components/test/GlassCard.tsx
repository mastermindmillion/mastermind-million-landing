import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-black/10 bg-white/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
