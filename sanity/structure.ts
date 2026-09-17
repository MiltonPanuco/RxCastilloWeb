import type { StructureResolver } from "sanity/structure";

const pages = [
  ["homePage", "page-home", "Inicio"],
  ["servicesPage", "page-services", "Servicios"],
  ["aboutPage", "page-about", "Nosotros"],
  ["coveragePage", "page-coverage", "Cobertura"],
  ["contactPage", "page-contact", "Contacto"],
  ["privacyPage", "page-privacy", "Aviso de privacidad"],
  ["termsPage", "page-terms", "Términos y condiciones"],
] as const;

export const singletonTypes = ["siteSettings", ...pages.map(([type]) => type)];

export const structure: StructureResolver = S =>
  S.list()
    .title("RX Castillo · Contenido")
    .items([
      S.listItem()
        .title("Ajustes globales")
        .child(
          S.document().schemaType("siteSettings").documentId("site-settings")
        ),
      S.divider(),
      ...pages.map(([type, id, title]) =>
        S.listItem()
          .title(title)
          .child(S.document().schemaType(type).documentId(id))
      ),
      S.divider(),
      S.documentTypeListItem("service").title("Servicios"),
      S.documentTypeListItem("coverageArea").title("Localidades"),
      S.documentTypeListItem("faq").title("Preguntas frecuentes"),
      S.documentTypeListItem("statistic").title("Estadísticas"),
    ]);
