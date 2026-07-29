import Image from "next/image";

export default function Logo({
  className = "h-9 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-mm.png"
      alt="Mastermind Million"
      width={658}
      height={673}
      priority={priority}
      className={className}
    />
  );
}
