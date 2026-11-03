import type { Metadata } from "next";
import BastidoresLanding from "@/components/bastidores/BastidoresLanding";

export const metadata: Metadata = {
  title: "Bastidores de un lanzamiento con Daniel Habif",
  description:
    "Invitación especial para infoproductores: 3 días en el detrás de escenas del mayor lanzamiento de Latinoamérica. CDMX · 18, 19 y 20 de enero. Solo 60 cupos.",
};

export default function BastidoresPage() {
  return (
    <>
      <BastidoresLanding />
      <footer className="border-t border-gold/10 bg-black px-6 py-10 text-center">
        <p className="font-body text-xs text-text-muted/70">
          © 2026 Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
}
