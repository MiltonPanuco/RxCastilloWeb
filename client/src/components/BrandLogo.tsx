import { Link } from "wouter";

const DEFAULT_LOGO = "/images/logo-white.webp";

export function BrandLogo({
  className = "h-12",
  white = true,
  linked = false,
  showName = true,
  src,
}: {
  className?: string;
  white?: boolean;
  linked?: boolean;
  showName?: boolean;
  src?: string;
}) {
  const content = (
    <div
      className={`flex items-center ${showName ? "gap-3" : "gap-0"} select-none ${className}`}
    >
      <img
        src={src ?? DEFAULT_LOGO}
        alt="Logo de RX Castillo Digital"
        className="h-full w-auto aspect-square object-contain"
      />
      {showName && (
        <span
          className={`font-heading text-xl sm:text-2xl font-extrabold tracking-[-0.04em] leading-none whitespace-nowrap ${white ? "text-white" : "text-[#1a446c]"}`}
        >
          RX Castillo Digital
        </span>
      )}
    </div>
  );
  return linked ? <Link href="/">{content}</Link> : content;
}
