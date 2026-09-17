import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useContent } from "../contexts/ContentContext";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { settings } = useContent();
  const [location] = useLocation();
  useEffect(() => {
    const pageNames: Record<string, string> = {
      "/": "Inicio",
      "/servicios": "Servicios",
      "/nosotros": "Nosotros",
      "/cobertura": "Cobertura",
      "/contacto": "Contacto",
      "/aviso-de-privacidad": "Aviso de privacidad",
      "/terminos": "Términos y condiciones",
    };
    document.title = `RX Castillo Digital | ${pageNames[location] || "Inicio"}`;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#163a59]">
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton
        phoneNumber={settings.contact.whatsapp}
        message={settings.whatsappMessage}
        variant="floating"
      />
    </div>
  );
}
