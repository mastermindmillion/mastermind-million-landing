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
      className={`inline-flex flex-col items-stretch gap-6 rounded-3xl border border-gold/40 bg-black-soft px-8 py-8 sm:flex-row sm:items-center sm:gap-10 md:px-14 md:py-10 ${className}`}
    >
      <div className="flex items-center justify-center gap-4">
        <IconCalendar className="h-8 w-8 shrink-0 text-gold md:h-10 md:w-10" />
        <div className="text-left">
          <p className="font-heading text-3xl font-bold leading-none text-white md:text-4xl">
            29 y 30
          </p>
          <p className="mt-2 font-heading text-sm font-semibold uppercase tracking-wide text-gold md:text-base">
            de agosto
          </p>
        </div>
      </div>

      <div className="hidden w-px self-stretch bg-gold/30 sm:block" />
      <div className="h-px w-full bg-gold/30 sm:hidden" />

      <div className="flex items-center justify-center gap-4">
        <IconPin className="h-8 w-8 shrink-0 text-gold md:h-10 md:w-10" />
        <div className="text-left">
          <p className="font-body text-sm font-semibold uppercase leading-snug tracking-wide text-white md:text-base">
            Hotel NH Collection
            <br />
            Mexico City Reforma
          </p>
          <p className="mt-2 font-heading text-base font-bold uppercase tracking-wide text-gold md:text-lg">
            CDMX
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
