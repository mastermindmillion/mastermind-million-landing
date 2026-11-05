import type { Metadata } from "next";
import BastidoresLanding from "@/components/bastidores/BastidoresLanding";

export const metadata: Metadata = {
  title: "Bastidores de un lanzamiento con Daniel Habif",
  description:
    "Invitación especial para infoproductores: 3 días en el detrás de escenas del mayor lanzamiento online de Latinoamérica. CDMX · 18, 19 y 20 de enero. Solo 60 cupos.",
};

export default function BastidoresPage() {
  return <BastidoresLanding />;
}
