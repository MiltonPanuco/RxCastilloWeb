import { ArrowRight } from "lucide-react";
import { ContactActions } from "../components/ContactActions";
import { InteractiveCoverageMap } from "../components/InteractiveCoverageMap";
import { HeroFrame } from "../components/HeroFrame";
import { Reveal } from "../components/Motion";
import { SiteLayout } from "../components/SiteLayout";
import { useContent } from "../contexts/ContentContext";

export default function CoveragePage() {
  const { settings, coveragePage, coverage } = useContent();
  const contact = settings.contact;
  return (
    <SiteLayout>
      <HeroFrame
        imageUrl="/images/xray-results-delivery.webp"
        imageAlt="Equipo y comunidad atendida por RX Castillo Digital"
        eyebrow={coveragePage.hero.eyebrow}
        title={coveragePage.hero.title}
        subtitle={coveragePage.hero.description}
        centered
      />

      <section id="contenido" className="section-space bg-[#f8fafc]">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Cobertura</p>
            <h2 className="section-title mt-5">
              Selecciona una localidad para verla en el mapa.
            </h2>
          </div>
          <Reveal className="mt-12">
            <InteractiveCoverageMap areas={coverage} />
          </Reveal>
        </div>
      </section>

      <section className="section-space border-t border-[#dbe2e9] bg-white">
        <div className="container grid items-center gap-10 md:grid-cols-[1fr_.7fr] md:gap-16">
          <div>
            <p className="eyebrow">Consulta personalizada</p>
            <h2 className="section-title mt-5">{coveragePage.noteTitle}</h2>
            <p className="body-copy mt-4 max-w-2xl">{coveragePage.note}</p>
          </div>
          <div className="border-t border-[#dbe2e9] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <ContactActions
              whatsapp={contact.whatsapp}
              phone={contact.phone}
              messenger={contact.messenger}
              message="Hola, mi localidad no aparece en la lista y quiero consultar disponibilidad."
            />
            <a
              href="#contenido"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#1a446c]"
            >
              Revisar localidades <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
