export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed text-neutral-400 ${className}`}>
      Este test es informativo y NO reemplaza un diagnóstico médico. Si tienes síntomas
      severos, consulta a un profesional de salud. Power Bracelet / FIR Power es un
      complemento, no un reemplazo de tratamiento médico.
    </p>
  );
}
