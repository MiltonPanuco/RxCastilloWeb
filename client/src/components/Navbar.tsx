import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import type { SiteSettings } from "../lib/siteContent";
import { BrandLogo } from "./BrandLogo";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { buildWhatsAppUrl, WhatsAppIcon } from "./WhatsAppButton";

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, [open]);

  const { contact } = settings;
  const whatsapp = contact.whatsapp || contact.phone;
  const social = [
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
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-all duration-300 ${open ? "z-[80]" : "z-50"} ${scrolled ? "bg-[#092842]/95 py-3 shadow-[0_12px_40px_rgba(9,40,66,.2)] backdrop-blur-xl" : "bg-transparent py-6 backdrop-blur-[2px]"}`}
      >
        <div className="container flex items-center justify-between">
          <BrandLogo
            linked
            showName
            white
            src={settings.logoUrl}
            className="h-9 sm:h-10"
          />
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Navegación principal"
          >
            {settings.navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-semibold transition ${location === item.href ? "text-white" : "text-white/65 hover:text-white"}`}
              >
                {item.label}
                {location === item.href && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[#d4af37]" />
                )}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
            onClick={() => setOpen(value => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {createPortal(
        <div
          id="menu-movil"
          aria-hidden={!open}
          className={`fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-[#092842] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <nav
            className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center"
            aria-label="Navegación móvil"
          >
            {settings.navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full py-3 text-center font-heading text-[clamp(1.65rem,7vw,2.35rem)] font-bold tracking-[-.05em] ${location === item.href ? "text-[#f5e9bd]" : "text-white"}`}
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {social.length > 0 && (
            <div className="mx-auto w-full max-w-lg pb-2">
              <div className="flex justify-center gap-3">
                {social.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-[#f5e9bd] hover:bg-white hover:text-[#1a446c]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
