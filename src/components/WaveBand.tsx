import type { ReactNode } from "react";

export default function WaveBand({
  children,
  className = "",
  bg = "var(--white)",
  waveHeight = "h-10 md:h-16",
  topWave = true,
  bottomWave = true,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
  waveHeight?: string;
  topWave?: boolean;
  bottomWave?: boolean;
}) {
  return (
    <div className={`relative ${className}`} style={{ backgroundColor: bg }}>
      {topWave && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] ${waveHeight}`}
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d="M0,100 C480,15 960,15 1440,100 Z" fill={bg} />
          </svg>
        </div>
      )}

      {children}

      {bottomWave && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 translate-y-[calc(100%-1px)] ${waveHeight}`}
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d="M0,0 C480,85 960,85 1440,0 Z" fill={bg} />
          </svg>
        </div>
      )}
    </div>
  );
}
