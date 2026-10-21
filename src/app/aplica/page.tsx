import { Suspense } from "react";
import type { Metadata } from "next";
import ApplyFlow from "@/components/apply/ApplyFlow";

export const metadata: Metadata = {
  title: "Aplica | Mastermind Million",
  description:
    "Aplica para participar del encuentro Mastermind Million en Cartagena, 18 y 19 de febrero de 2027.",
};

export default function AplicaPage() {
  return (
    <Suspense fallback={null}>
      <ApplyFlow />
    </Suspense>
  );
}
