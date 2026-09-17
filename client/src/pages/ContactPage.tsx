import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { HeroFrame } from "../components/HeroFrame";
import { Reveal } from "../components/Motion";
import { SiteLayout } from "../components/SiteLayout";
import { useContent } from "../contexts/ContentContext";
import { buildWhatsAppUrl, WhatsAppIcon } from "../components/WhatsAppButton";

const WHATSAPP_ONLY_NUMBER = "3221350119";
const WHATSAPP_ONLY_DISPLAY = "322 135 0119";

export default function ContactPage() {
  const { settings, contactPage } = useContent();
  const contact = settings.contact;
  const whatsapp = contact.whatsapp || contact.phone;
  const phones = Array.from(
    new Set([...(contact.phones || []), contact.phone].filter(Boolean))
  ).filter(phone => phone.replace(/\D/g, "") !== WHATSAPP_ONLY_NUMBER);
  const weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const scheduleRows = contact.schedule.flatMap(item =>
    item.days.toLowerCase() === "lunes a viernes"
      ? weekdays.map(day => ({ ...item, days: day }))
      : [item]
  );
  const channels = [
    ...phones.slice(0, 2).map(phone => ({
      title: "Llamada",
      text: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
      Icon: Phone,
    })),
    whatsapp && {
      title: "WhatsApp",
      text: contact.phone || whatsapp,
      href: buildWhatsAppUrl(settings.whatsappMessage, whatsapp),
      Icon: WhatsAppIcon,
    },
    {
      title: "WhatsApp",
      text: WHATSAPP_ONLY_DISPLAY,
      href: buildWhatsAppUrl(
        settings.whatsappMessage,
        `52${WHATSAPP_ONLY_NUMBER}`
      ),
      Icon: WhatsAppIcon,
    },
  ].filter(Boolean) as Array<{
    title: string;
    text: string;
    href: string;
    Icon: typeof Phone;
  }>;

  return (
    <SiteLayout>
      <HeroFrame
        imageUrl="/images/contact-team.webp"
        imageAlt="Equipo de RX Castillo Digital"
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        subtitle={contactPage.hero.description}
      />

      <section id="contenido" className="section-space bg-white">
        <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Contacto</p>
            <h2 className="section-title mt-5">{contactPage.title}</h2>
            <p className="body-copy mt-5 max-w-xl">{contactPage.description}</p>
            <p className="mt-8 max-w-md border-l-2 border-[#d4af37] pl-5 text-sm leading-6 text-[#4a5568]">
              WhatsApp es la forma más rápida de compartir el estudio y la
              localidad. También puedes llamarnos para coordinar atención fuera
              del horario regular.
            </p>
          </Reveal>
          <div className="border-y border-[#c7d2dc] lg:col-span-7">
            {channels.length ? (
              channels.map(({ title, text, href, Icon }, index) => (
                <Reveal key={`${title}-${text}`} delay={index * 70}>
                  <a
                    data-contact-channel
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 border-b border-[#dbe2e9] py-6 transition last:border-b-0 hover:bg-[#f8fafc] sm:px-5"
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full ${title === "WhatsApp" ? "bg-[#25d366] text-white" : "bg-[#f6f4ee] text-[#1a446c]"}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-xl font-bold tracking-[-.04em] text-[#163a59]">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[#4a5568]">
                        {text}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[#1a446c] transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </Reveal>
              ))
            ) : (
              <p className="py-8 text-sm leading-7 text-[#4a5568]">
                Los canales directos se publican desde Sanity.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f6f4ee]">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="eyebrow">Antes de escribir</p>
            <h2 className="section-title mt-5">Tres datos nos ayudan.</h2>
            <ol className="mt-10 border-t border-[#c7d2dc]">
              {[
                [
                  "El estudio requerido",
                  "Radiografía digital o electrocardiograma.",
                ],
                [
                  "La localidad del paciente",
                  "La usamos para confirmar cobertura y disponibilidad.",
                ],
                [
                  "Tu canal preferido",
                  "Indica si deseas continuar por WhatsApp, Messenger o llamada.",
                ],
              ].map(([title, description], index) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#c7d2dc] py-6"
                >
                  <span className="font-bold text-[#d4af37]">0{index + 1}</span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#4a5568]">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <article className="lg:col-span-5 lg:border-l lg:border-[#c7d2dc] lg:pl-10">
            <p className="eyebrow">Información adicional</p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-.05em]">
              {contactPage.officeTitle}
            </h2>
            <p className="body-copy mt-4">{contactPage.officeText}</p>
            <div className="mt-8 space-y-4 border-t border-[#dbe2e9] pt-6 text-sm text-[#4a5568]">
              {contact.officeAddress && (
                <a
                  href={contact.mapUrl || undefined}
                  target={contact.mapUrl ? "_blank" : undefined}
                  rel={contact.mapUrl ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 transition hover:text-[#1a446c]"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1a446c]" />
                  {contact.officeAddress}
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#1a446c]" />
                  {contact.email}
                </a>
              )}
              {!contact.officeAddress && !contact.email && (
                <p>
                  Esta información se publica únicamente cuando está confirmada
                  en Sanity.
                </p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#dbe2e9] lg:grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="flex flex-col bg-[#1a446c] p-8 text-white sm:p-10 lg:p-12">
              <Clock3 className="h-10 w-10 text-[#f5e9bd]" />
              <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-[#f5e9bd]">
                A tu tiempo
              </p>
              <h2 className="mt-6 max-w-sm font-heading text-4xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">
                Horario de atención.
              </h2>
              <p className="mt-7 max-w-md leading-7 text-white/72">
                Planea tu solicitud con calma. Fuera del horario regular,
                llámanos: si necesitas un servicio, coordinamos la apertura y la
                atención según disponibilidad.
              </p>
              <p className="mt-12 border-t border-white/20 pt-6 text-sm text-white/65 lg:mt-auto">
                Horario local de Ruiz, Nayarit
              </p>
            </div>
            <div className="bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe2e9] pb-7">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[#d4af37]">
                  Días y horarios
                </p>
                <p className="text-sm text-[#4a5568]">Atención con cita</p>
              </div>
              <table className="mt-1 w-full table-fixed text-left text-sm">
                <caption className="sr-only">
                  Horarios de atención de RX Castillo Digital por día
                </caption>
                <thead className="border-b border-[#dbe2e9] text-[#1a446c]">
                  <tr>
                    <th className="w-[36%] py-4 pr-4 text-xs font-bold uppercase tracking-[.14em]">
                      Día
                    </th>
                    <th className="border-l border-[#dbe2e9] py-4 pl-5 text-xs font-bold uppercase tracking-[.14em]">
                      Horarios
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dbe2e9]">
                  {scheduleRows.map(item => (
                    <tr key={item.days}>
                      <th className="py-5 pr-4 align-top text-base font-bold text-[#1a446c]">
                        {item.days}
                      </th>
                      <td className="border-l border-[#dbe2e9] py-5 pl-5 leading-7 text-[#4a5568]">
                        {item.hours.split("|").map(block => (
                          <span key={block} className="block">
                            {block.trim()}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 border-t border-[#dbe2e9] pt-6 text-sm leading-6 text-[#4a5568]">
                <p>
                  El domingo el local permanece cerrado, pero atendemos
                  llamadas. También puedes comunicarte fuera del horario de
                  oficina para solicitar una apertura y coordinar el servicio.
                </p>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-4 inline-flex items-center gap-2 font-bold text-[#1a446c]"
                  >
                    <Phone className="h-4 w-4" />
                    Llamar para coordinar
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
