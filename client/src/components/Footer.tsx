import { Link } from "wouter";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "../lib/siteContent";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { buildWhatsAppUrl, WhatsAppIcon } from "./WhatsAppButton";

export function Footer({ settings }: { settings: SiteSettings }) {
  const { contact } = settings;
  const whatsapp = contact.whatsapp || contact.phone;
  const whatsappOnlyNumber = "3221350119";
  const phones = Array.from(
    new Set([...(contact.phones || []), contact.phone].filter(Boolean))
  ).filter(phone => phone.replace(/\D/g, "") !== whatsappOnlyNumber);
  const socials = [
    contact.instagram && {
      href: contact.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
    contact.facebook && {
      href: contact.facebook,
      label: "Facebook",
      Icon: FacebookIcon,
    },
    whatsapp && {
      href: buildWhatsAppUrl(settings.whatsappMessage, whatsapp),
      label: "WhatsApp",
      Icon: WhatsAppIcon,
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    Icon: typeof InstagramIcon;
  }>;
  return (
    <footer className="bg-[#092842] text-white">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 text-center sm:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_.7fr] xl:gap-16 xl:text-left">
          <div className="flex justify-center xl:justify-start">
            <Link href="/" aria-label="Ir al inicio">
              <img
                src="/images/logo-footer.webp"
                alt="RX Castillo Digital"
                className="h-auto w-full max-w-[16rem] object-contain xl:object-left"
              />
            </Link>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#f5e9bd]">
              Contáctanos
            </h3>
            <div className="mt-5 space-y-4 text-sm text-white/60">
              {phones.map(phone => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center justify-center gap-3 hover:text-white xl:justify-start"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
                  {phone}
                </a>
              ))}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-3 break-all hover:text-white xl:justify-start"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#d4af37]" />
                  {contact.email}
                </a>
              )}
              {contact.officeAddress && (
                <a
                  href={contact.mapUrl || undefined}
                  target={contact.mapUrl ? "_blank" : undefined}
                  rel={contact.mapUrl ? "noopener noreferrer" : undefined}
                  className="flex items-start justify-center gap-3 hover:text-white xl:justify-start"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
                  {contact.officeAddress}
                  <span className="sr-only">
                    Oficina, información secundaria
                  </span>
                </a>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#f5e9bd]">
              Horarios de atención
            </h3>
            <div className="mt-5 flex items-start justify-center gap-3 text-sm leading-7 text-white/60 xl:justify-start">
              <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#d4af37]" />
              <div className="space-y-3">
                {contact.schedule?.length ? (
                  contact.schedule.map(item => (
                    <p key={item.days}>
                      <strong className="block text-white/85">
                        {item.days}
                      </strong>
                      {item.hours.split("|").map(block => (
                        <span key={block} className="block">
                          {block.trim()}
                        </span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p className="whitespace-pre-line">
                    {contact.hours || "Consulta disponibilidad directamente."}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#f5e9bd]">
              Síguenos
            </h3>
            {socials.length > 0 ? (
              <div className="mt-6 flex flex-wrap justify-center gap-3 xl:justify-start">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/70 transition hover:-translate-y-1 hover:border-[#f5e9bd] hover:bg-white hover:text-[#1a446c]"
                  >
                    {label === "WhatsApp" ? (
                      <WhatsAppIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-white/50">
                Configura tus redes sociales en Sanity.
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-4 pt-6 text-center text-xs text-white/40 xl:grid-cols-[1fr_auto] xl:items-center xl:text-left">
          <p>
            © {new Date().getFullYear()} {settings.businessName}. Radiografías
            digitales y electrocardiogramas a domicilio.
          </p>
          <nav
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 xl:justify-end"
            aria-label="Documentos legales"
          >
            <Link
              href="/aviso-de-privacidad"
              className="transition hover:text-white"
            >
              Aviso de privacidad
            </Link>
            <Link href="/terminos" className="transition hover:text-white">
              Términos y condiciones
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
