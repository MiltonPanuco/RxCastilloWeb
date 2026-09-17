import React from "react";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "floating" | "discrete";
  phoneNumber?: string | null;
}

export function WhatsAppIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      data-whatsapp-icon
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 7.021 2.91 9.825 9.825 0 0 1 2.9 7.024c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.3-1.654a11.882 11.882 0 0 0 5.688 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function buildWhatsAppUrl(
  message?: string,
  phoneNumber?: string | null
): string {
  const rawNumber = phoneNumber?.trim() ? phoneNumber.replace(/\D/g, "") : "";
  const text = encodeURIComponent(
    message ||
      "Hola, quiero solicitar información sobre un estudio con RX Castillo Digital."
  );
  return rawNumber
    ? `https://wa.me/${rawNumber}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;
}

export function WhatsAppButton({
  message,
  className = "",
  children,
  variant = "primary",
  phoneNumber = "",
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(message, phoneNumber);
  if (variant === "floating")
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp de RX Castillo Digital"
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white opacity-55 shadow-[0_10px_28px_rgba(0,0,0,.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[#1fbd59] hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/60 ${className}`}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    );
  if (variant === "outline")
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border border-white/45 text-white hover:bg-white hover:text-[#1a446c] font-bold text-sm transition-all duration-200 active:scale-95 ${className}`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {children || "Contactar por WhatsApp"}
      </a>
    );
  if (variant === "discrete")
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-bold text-[#1a446c] hover:underline ${className}`}
      >
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        {children || "Consultar por WhatsApp"}
      </a>
    );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-[#1A446C] font-extrabold text-sm transition-all duration-200 shadow-lg active:scale-95 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children || "Solicitar por WhatsApp"}
    </a>
  );
}
