import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-black px-6 py-14 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <div className="flex items-center gap-2.5">
          <Logo className="h-9 w-auto" />
          <span className="font-heading text-sm font-medium tracking-[0.15em] text-white">
            MASTERMIND MILLION
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-xs text-text-muted">
          <a href="#" className="transition-colors hover:text-gold-light">
            Términos y condiciones
          </a>
          <span className="text-gold/30">·</span>
          <a href="#" className="transition-colors hover:text-gold-light">
            Privacidad
          </a>
          <span className="text-gold/30">·</span>
          <a href="#" className="transition-colors hover:text-gold-light">
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-gold-light transition-colors hover:border-gold/50 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-gold-light transition-colors hover:border-gold/50 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path d="M4 20l1.3-3.9A7.9 7.9 0 1112 20a7.9 7.9 0 01-4-1.1z" />
              <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
            </svg>
          </a>
        </div>

        <p className="font-body text-xs text-text-muted/70">
          © 2026 Mastermind Million. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
