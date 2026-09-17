import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "wouter";
import { SiteLayout } from "../components/SiteLayout";
import { useContent } from "../contexts/ContentContext";

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const content = useContent();
  const page = kind === "privacy" ? content.privacyPage : content.termsPage;
  return (
    <SiteLayout>
      <section className="flex min-h-[100svh] items-center bg-[#1a446c] pb-20 pt-32 text-white">
        <div className="container grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <div>
            <FileText className="h-8 w-8 text-[#f5e9bd]" />
            <p className="eyebrow mt-8 !text-[#f5e9bd]">Documento legal</p>
            <h1 className="section-title mt-5">{page.title}</h1>
            {page.updated && (
              <p className="mt-4 text-sm text-white/45">
                Última actualización: {page.updated}
              </p>
            )}
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#f5e9bd]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
          <div className="rounded-[1.75rem] bg-white p-7 text-[#163a59] sm:p-10">
            <p className="text-lg leading-8 text-[#4a5568]">{page.intro}</p>
            {page.sections.length > 0 ? (
              <div className="mt-8 space-y-8 border-t border-[#dbe2e9] pt-8">
                {page.sections.map(section => (
                  <article key={section.title}>
                    <h2 className="text-xl font-bold tracking-[-.04em]">
                      {section.title}
                    </h2>
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4a5568]">
                      {section.text}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl bg-[#f6f4ee] p-5 text-sm leading-6 text-[#4a5568]">
                El contenido completo de este documento se administra desde
                Sanity.
              </p>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
