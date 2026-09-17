import { Eye, HeartHandshake, Home, RadioTower, Target } from "lucide-react";
import { ContactActions } from "../components/ContactActions";
import { HeroFrame } from "../components/HeroFrame";
import { CountUp, Reveal } from "../components/Motion";
import { SiteLayout } from "../components/SiteLayout";
import { useContent } from "../contexts/ContentContext";

const icons = [HeartHandshake, Home, RadioTower, Target];

export default function AboutPage() {
  const { settings, aboutPage } = useContent();
  const contact = settings.contact;
  const aboutStatistics = [
    {
      _id: "about-years",
      value: new Date().getFullYear() - 2005,
      suffix: " años",
      label: "de trayectoria desde 2005",
    },
    {
      _id: "about-services",
      value: 2,
      suffix: " servicios",
      label: "radiografías digitales y electrocardiogramas",
    },
    {
      _id: "about-office-days",
      value: 6,
      suffix: " días",
      label: "con horario regular de oficina cada semana",
    },
    {
      _id: "about-model",
      value: 1,
      suffix: " enfoque",
      label: "atención principalmente a domicilio",
    },
  ];
  return (
    <SiteLayout>
      <HeroFrame
        imageUrl={aboutPage.hero.image.url}
        imageAlt={aboutPage.hero.image.alt}
        mobilePosition="37% center"
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        subtitle={aboutPage.hero.description}
      />

      <section id="contenido" className="section-space bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mb-4 mr-4">
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border border-[#d4af37]/50" />
                <img
                  src={aboutPage.storyImage.url}
                  alt={aboutPage.storyImage.alt}
                  className="relative aspect-[4/5] w-full rounded-[2rem] object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">{aboutPage.storyEyebrow}</p>
            <h2 className="section-title mt-5">{aboutPage.storyTitle}</h2>
            <div className="mt-7 space-y-5">
              {aboutPage.ownerMessage.map(paragraph => (
                <p key={paragraph} className="body-copy">
                  {paragraph}
                </p>
              ))}
            </div>
            <blockquote className="mt-9 border-l-2 border-[#d4af37] pl-6">
              <p className="font-heading text-2xl font-bold leading-tight tracking-[-.04em] text-[#1a446c] sm:text-3xl">
                “{aboutPage.ownerSlogan}”
              </p>
              <footer className="mt-5">
                <p className="font-bold text-[#163a59]">
                  {aboutPage.ownerName}
                </p>
                <p className="mt-1 text-sm text-[#4a5568]">
                  {aboutPage.ownerRole}
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {aboutStatistics.length > 0 && (
        <section className="bg-[#1a446c] py-16 text-white sm:py-20">
          <div className="container grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-4">
            {aboutStatistics.map(stat => (
              <div
                key={stat._id}
                className="min-w-0 border-l border-white/20 pl-3 sm:pl-5"
              >
                <p className="font-heading text-2xl font-extrabold tracking-[-.06em] text-[#f5e9bd] sm:text-4xl lg:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 max-w-[15rem] text-xs leading-5 text-white/62 sm:mt-3 sm:text-sm sm:leading-6">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#1a446c] pb-20 pt-8 text-white sm:pb-24 sm:pt-10">
        <div className="container grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[1.75rem] border border-white/15 bg-white/[.06] p-8 sm:p-10">
              <Target className="h-8 w-8 text-[#f5e9bd]" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-[#f5e9bd]">
                Misión
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-.05em] sm:text-3xl">
                {aboutPage.mission}
              </h2>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="h-full rounded-[1.75rem] bg-[#f6f4ee] p-8 text-[#163a59] sm:p-10">
              <Eye className="h-8 w-8 text-[#1a446c]" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-[#1a446c]">
                Visión
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-.05em] sm:text-3xl">
                {aboutPage.vision}
              </h2>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-[#f8fafc]">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="eyebrow">Nuestro enfoque</p>
              <h2 className="section-title mt-5">{aboutPage.valuesTitle}</h2>
              <p className="body-copy mt-5">{aboutPage.commitmentText}</p>
            </div>
            <div className="grid gap-x-7 sm:grid-cols-2 lg:col-span-8">
              {aboutPage.values.map((value, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <Reveal key={value.title} delay={index * 70}>
                    <article className="border-t border-[#c7d2dc] py-7">
                      <Icon className="h-6 w-6 text-[#1a446c]" />
                      <h3 className="mt-5 text-xl font-bold tracking-[-.04em]">
                        {value.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#4a5568]">
                        {value.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-6 border-t border-[#c7d2dc] pt-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-heading text-2xl font-bold tracking-[-.04em]">
                {aboutPage.commitmentTitle}
              </p>
              <p className="mt-2 text-sm text-[#4a5568]">
                Comparte tu localidad y confirma disponibilidad por el canal que
                prefieras.
              </p>
            </div>
            <ContactActions
              compact
              whatsapp={contact.whatsapp}
              phone={contact.phone}
              messenger={contact.messenger}
              message={settings.whatsappMessage}
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
