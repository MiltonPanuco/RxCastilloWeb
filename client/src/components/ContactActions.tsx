import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, WhatsAppIcon } from "./WhatsAppButton";

type Props = {
  whatsapp?: string;
  phone?: string;
  messenger?: string;
  message?: string;
  compact?: boolean;
  inverse?: boolean;
};

export function ContactActions({
  whatsapp = "",
  phone = "",
  messenger = "",
  message,
  compact = false,
  inverse = false,
}: Props) {
  const actions = [
    whatsapp && {
      label: "Hablar por WhatsApp",
      href: buildWhatsAppUrl(message, whatsapp),
      icon: WhatsAppIcon,
      primary: true,
    },
    messenger && {
      label: "Abrir Messenger",
      href: messenger,
      icon: MessageCircle,
    },
    phone && {
      label: "Llamar",
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
      icon: Phone,
    },
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    icon: typeof Phone;
    primary?: boolean;
  }>;

  if (!actions.length)
    return (
      <a
        href="/contacto"
        className={inverse ? "button-secondary" : "button-primary"}
      >
        Consultar disponibilidad
      </a>
    );
  return (
    <div
      className={`flex ${compact ? "flex-wrap" : "flex-col sm:flex-row"} gap-3`}
    >
      {actions.map(({ label, href, icon: Icon, primary }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={
            primary
              ? "button-primary !bg-[#25d366] !text-white"
              : inverse
                ? "button-secondary"
                : "button-primary !border !border-[#dbe2e9] !bg-white !text-[#1a446c] !shadow-none"
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  );
}
