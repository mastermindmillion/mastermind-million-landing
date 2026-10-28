import { Suspense } from "react";
import type { Metadata } from "next";
import PreconfirmFlow from "@/components/preconfirm/PreconfirmFlow";

export const metadata: Metadata = {
  title: "Pre-confirmación de Asistencia | Mastermind Million",
  description:
    "Pre-confirma tu asistencia al encuentro Mastermind Million en Cartagena, 18 y 19 de febrero de 2027.",
  // Private link for invited people only.
  robots: { index: false, follow: false },
};

export default function PreconfirmacionPage() {
  return (
    <Suspense fallback={null}>
      <PreconfirmFlow />
    </Suspense>
  );
}
