import ScrollReveal from "./ScrollReveal";
import { IconCalendar, IconPin } from "./icons";

export default function DateVenueBadge({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      delay={delay}
      className={`flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16 ${className}`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <IconCalendar className="h-6 w-6 text-gold" />
        <p className="font-heading text-3xl font-semibold leading-none text-ink md:text-4xl">
          22 y 23
        </p>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          de febrero 2027
        </p>
      </div>

      <div className="h-px w-16 bg-gold/30 sm:h-16 sm:w-px" />

      <div className="flex flex-col items-center gap-3 text-center">
        <IconPin className="h-6 w-6 text-gold" />
        <p className="font-heading text-3xl font-semibold leading-none text-ink md:text-4xl">
          Cartagena
        </p>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          Colombia
        </p>
      </div>
    </ScrollReveal>
  );
}
