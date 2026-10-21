import { Suspense } from "react";
import GradientBackground from "@/components/test/GradientBackground";
import TestFlow from "@/components/test/TestFlow";

export default function TestPage() {
  return (
    <>
      <GradientBackground />
      <Suspense fallback={null}>
        <TestFlow />
      </Suspense>
    </>
  );
}
