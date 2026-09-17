import { useEffect, useState } from "react";
import { Check, FileCheck2, MonitorSmartphone } from "lucide-react";
import { ContactActions } from "../components/ContactActions";
import { HeroFrame } from "../components/HeroFrame";
import { Reveal } from "../components/Motion";
import { SiteLayout } from "../components/SiteLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import { useContent } from "../contexts/ContentContext";

export default function ServicesPage() {
  const { settings, home, servicesPage, services } = useContent();
  const contact = settings.contact;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const carouselSlides = [
    {
      url: "/images/xray-knees.webp",
      alt: "Radiografía digital comparativa de ambas rodillas",
      label: "Radiografía digital de rodillas",
    },
    {
      url: "/images/xray-elbow.webp",
      alt: "Radiografía digital de codo en dos proyecciones",
      label: "Estudios en distintas proyecciones",
    },
    services[1] && {
      ...services[1].image,
      label: services[1].name,
    },
  ].filter(Boolean) as Array<{ url: string; alt: string; label: string }>;
  useEffect(() => {
    if (
      !carouselApi ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let timer = 0;
    const scheduleNext = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => carouselApi.scrollNext(), 4500);
    };
    scheduleNext();
    carouselApi.on("select", scheduleNext);
    return () => {
      window.clearTimeout(timer);
      carouselApi.off("select", scheduleNext);
    };
  }, [carouselApi]);
  return (
    <SiteLayout>
      <HeroFrame
        imageUrl={servicesPage.hero.image.url}
        imageAlt={servicesPage.hero.image.alt}
        eyebrow={servicesPage.hero.eyebrow}
        title={servicesPage.hero.title}
        subtitle={servicesPage.hero.description}
        centered
      />

      <section className="section-space bg-white">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Servicios</p>
              <Carousel
                opts={{ loop: true, align: "start" }}
                setApi={setCarouselApi}
                className="mt-7 max-w-xl"
                aria-label="Imágenes de los servicios"
                data-services-carousel
              >
                <div
                  className="overflow-hidden rounded-[1.25rem]"
                  data-services-carousel-viewport
                >
                  <CarouselContent>
                    {carouselSlides.map(slide => (
                      <CarouselItem key={slide.url}>
                        <figure className="group relative min-h-[20rem] overflow-hidden rounded-[1.25rem] bg-[#1a446c] sm:min-h-[24rem]">
                          <img
                            src={slide.url}
                            alt={slide.alt}
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15" />
                          <figcaption className="absolute inset-x-0 bottom-0 p-6 font-heading text-xl font-bold tracking-[-.04em] text-white">
                            {slide.label}
                          </figcaption>
                        </figure>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>
                <CarouselPrevious className="left-3 cursor-pointer border-0 bg-white/90 text-[#1a446c] hover:bg-white" />
                <CarouselNext className="right-3 cursor-pointer border-0 bg-white/90 text-[#1a446c] hover:bg-white" />
              </Carousel>
            </div>
            <div className="lg:col-span-7">
              <h2 className="section-title">{servicesPage.introTitle}</h2>
              <p className="body-copy mt-5 max-w-2xl">
                {servicesPage.introText}
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {servicesPage.introPoints.map((point, index) => (
                  <article
                    key={point.title}
                    className="border-t border-[#c7d2dc] pt-5"
                  >
                    <span className="text-xs font-bold text-[#d4af37]">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-bold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4a5568]">
                      {point.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {services.map((service, serviceIndex) => (
        <section
          key={service._id}
          id={service.slug}
          className={`section-space ${serviceIndex % 2 ? "bg-[#f6f4ee]" : "bg-[#f8fafc]"}`}
        >
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div
                className={`lg:col-span-5 ${serviceIndex % 2 ? "lg:order-2" : ""}`}
              >
                <p className="eyebrow">
                  0{serviceIndex + 1} · {service.name}
                </p>
                <h2 className="section-title mt-5">
                  {service.slug === "radiografias-digitales"
                    ? "Rayos X"
                    : "EKG"}
                </h2>
                <p className="body-copy mt-5">{service.description}</p>
                <div className="mt-10">
                  <ContactActions
                    compact
                    whatsapp={contact.whatsapp}
                    phone={contact.phone}
                    messenger={contact.messenger}
                    message={`Hola, quiero solicitar ${service.name.toLowerCase()} a domicilio.`}
                  />
                </div>
              </div>
              <Reveal
                className={`relative min-h-[22rem] overflow-hidden rounded-[1.5rem] sm:min-h-[28rem] lg:col-span-7 lg:min-h-[34rem] ${serviceIndex % 2 ? "lg:order-1" : ""}`}
              >
                <img
                  src={service.image.url}
                  alt={service.image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(9,40,66,.2),transparent_45%)]" />
              </Reveal>
            </div>

            <div className="mt-12 grid border-y border-[#c7d2dc] sm:grid-cols-2 lg:grid-cols-4">
              {service.benefits.map(benefit => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 border-b border-[#c7d2dc] py-5 text-sm leading-6 text-[#4a5568] last:border-b-0 sm:px-5 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:last:pr-0"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1a446c]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-space bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Un proceso para ambos servicios</p>
            <h2 className="section-title mt-5">
              De la solicitud a la entrega de resultados.
            </h2>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1a446c]">
              <FileCheck2 className="h-4 w-4" />
              Interpretaciones avaladas por un médico radiólogo.
            </p>
          </div>
          <div className="mt-12 grid border-t border-[#c7d2dc] lg:grid-cols-12">
            <div className="py-10 lg:col-span-5 lg:pr-12">
              <p className="eyebrow">Proceso a domicilio</p>
              <ol className="mt-7 space-y-5">
                {home.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-3"
                  >
                    <span className="font-bold text-[#d4af37]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#4a5568]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-[#c7d2dc] py-10 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-12">
              <MonitorSmartphone className="h-7 w-7 text-[#1a446c]" />
              <h3 className="mt-6 text-2xl font-extrabold tracking-[-.05em]">
                Entrega e interpretación
              </h3>
              <div className="mt-7 divide-y divide-[#dbe2e9] border-y border-[#dbe2e9]">
                {services.map(service => (
                  <article key={service._id} className="py-6">
                    <p className="font-bold text-[#163a59]">{service.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[#4a5568]">
                      {service.results}
                    </p>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#4a5568]">
                      <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-[#1a446c]" />
                      {service.interpretation}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
