import { Link } from "wouter";
import {
  ArrowRight,
  HeartPulse,
  Home as HomeIcon,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { FAQSection } from "../components/FAQSection";
import { HeroFrame } from "../components/HeroFrame";
import { CountUp, Reveal } from "../components/Motion";
import { SiteLayout } from "../components/SiteLayout";
import { useContent } from "../contexts/ContentContext";

const benefitIcons = [HomeIcon, ScanLine, ShieldCheck, HeartPulse];
const homeServiceImages = [
  {
    url: "/images/xray-shoulder.webp",
    alt: "Radiografía digital de hombro y tórax",
  },
  {
    url: "/images/service-ekg.webp",
    alt: "Equipo para electrocardiograma digital",
  },
];

export default function Home() {
  const { home, services, faqs, statistics } = useContent();
  return (
    <SiteLayout>
      <HeroFrame
        imageUrl="/images/home-team.webp"
        imageAlt="Equipo de RX Castillo Digital durante una jornada de atención"
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        subtitle={home.hero.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contacto"
            className="button-primary bg-[#d4af37] !text-[#092842] hover:bg-[#f5e9bd]"
          >
            Agendar estudio <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/servicios" className="button-secondary">
            Ver servicios
          </Link>
        </div>
      </HeroFrame>

      <section className="section-space bg-[#f6f4ee]">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">{home.benefitsEyebrow}</p>
            <h2 className="section-title mt-5">{home.benefitsTitle}</h2>
          </div>
          <div className="mt-10 max-w-2xl border-l-2 border-[#d4af37] pl-5 text-lg leading-8 text-[#4a5568]">
            {home.statementText}
          </div>
          <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] lg:col-span-5 lg:min-h-full">
              <img
                src="/images/rx-experience-collage.webp"
                alt="Experiencia de atención y diagnóstico digital de RX Castillo Digital"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </Reveal>
            <div className="grid gap-x-7 sm:grid-cols-2 lg:col-span-7">
              {home.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length];
                return (
                  <Reveal key={benefit.title} delay={index * 70}>
                    <article className="border-t border-[#c7d2dc] py-7">
                      <Icon className="h-6 w-6 text-[#1a446c]" />
                      <h3 className="mt-5 text-xl font-bold tracking-[-.04em]">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#4a5568]">
                        {benefit.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#092842] text-white">
        <div className="container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow !text-[#f5e9bd]">Dos estudios, una visita</p>
            <h2 className="section-title mt-6 text-white">
              Todo lo que importa, más cerca.
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-8 text-white/68">
              Selecciona el estudio que necesitas y coordinemos la visita hasta
              tu domicilio.
            </p>
            <Link
              href="/servicios"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#d4af37] pb-1 text-sm font-bold text-[#f5e9bd] transition hover:gap-3"
            >
              Conocer los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {services.map((service, index) => (
              <Reveal key={service._id} delay={index * 100}>
                <article className="group relative min-h-[32rem] overflow-hidden rounded-[1rem] bg-[#1a446c] text-white">
                  <img
                    src={homeServiceImages[index]?.url || service.image.url}
                    alt={homeServiceImages[index]?.alt || service.image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,30,49,.97)_0%,rgba(9,40,66,.2)_75%)]" />
                  <div className="relative flex min-h-[32rem] flex-col justify-end p-7 sm:p-8">
                    <div className="mb-auto grid h-12 w-12 place-items-center border border-white/35 text-white">
                      {index === 0 ? (
                        <ScanLine className="h-6 w-6" />
                      ) : (
                        <HeartPulse className="h-6 w-6" />
                      )}
                    </div>
                    <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-[#f5e9bd]">
                      0{index + 1} · Estudio
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold tracking-[-.05em]">
                      {service.slug === "radiografias-digitales"
                        ? "Rayos X a domicilio"
                        : "Electrocardiograma (EKG)"}
                    </h3>
                    <Link
                      href={`/servicios#${service.slug}`}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold transition group-hover:gap-3"
                    >
                      Ver servicio <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f8fafc]">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{home.processEyebrow}</p>
              <h2 className="section-title mt-5">{home.processTitle}</h2>
            </Reveal>
            <Reveal className="relative mt-10 aspect-square max-w-lg overflow-hidden rounded-[1rem]">
              <img
                src="/images/xray-digital-review.webp"
                alt="Revisión de una radiografía digital en una computadora"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
          <div className="border-t border-[#c7d2dc] lg:col-span-7 lg:mt-12">
            {home.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <article className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#dbe2e9] py-8 sm:grid-cols-[4.5rem_1fr]">
                  <span className="text-sm font-bold tracking-[.14em] text-[#d4af37]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-[-.04em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#4a5568]">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {statistics.length > 0 && (
        <section className="bg-[#1a446c] py-14 text-white">
          <div className="container grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-4">
            {statistics.map(stat => (
              <div
                key={stat._id}
                className="min-w-0 border-l border-white/15 pl-3 sm:pl-5"
              >
                <p className="text-2xl font-extrabold tracking-[-.06em] text-[#f5e9bd] sm:text-4xl">
                  {stat.prefix}
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs leading-5 text-white/58 sm:text-sm sm:leading-6">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-space bg-white">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <div>
              <div className="h-px w-12 bg-[#d4af37]" />
              <p className="eyebrow mt-8">FAQ</p>
              <h2 className="section-title mt-5">{home.faqTitle}</h2>
              <p className="body-copy mt-5">{home.faqText}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <FAQSection faqs={faqs} />
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
