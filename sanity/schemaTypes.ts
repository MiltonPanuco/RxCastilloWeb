import { defineArrayMember, defineField, defineType } from "sanity";

const required = (Rule: any) => Rule.required();
const text = (name: string, title: string, rows = 3) =>
  defineField({ name, title, type: "text", rows, validation: required });
const string = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: required });
const image = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texto alternativo",
        type: "string",
        validation: required,
      }),
    ],
  });
const hero = defineField({
  name: "hero",
  title: "Portada",
  type: "object",
  options: { collapsible: true },
  fields: [
    string("eyebrow", "Etiqueta"),
    string("title", "Título"),
    text("description", "Descripción"),
    image("image", "Imagen"),
  ],
});
const stringList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
    validation: required,
  });
const cards = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [string("title", "Título"), text("description", "Descripción")],
      }),
    ],
    validation: required,
  });
const orderFields = [
  defineField({
    name: "order",
    title: "Orden",
    type: "number",
    initialValue: 0,
    validation: Rule => Rule.required().integer().min(0),
  }),
  defineField({
    name: "active",
    title: "Visible",
    type: "boolean",
    initialValue: true,
  }),
];

const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes globales",
  type: "document",
  groups: [
    { name: "brand", title: "Marca", default: true },
    { name: "contact", title: "Contacto" },
    { name: "navigation", title: "Navegación" },
  ],
  fields: [
    string("businessName", "Nombre comercial"),
    defineField({
      name: "logoUrl",
      title: "Ruta del logo público",
      type: "string",
      initialValue: "/images/logo-white.webp",
      group: "brand",
    }),
    text("footerText", "Texto del pie de página", 2),
    text("whatsappMessage", "Mensaje predeterminado de WhatsApp", 2),
    defineField({
      name: "contact",
      title: "Datos de contacto",
      type: "object",
      group: "contact",
      description: "Deja vacío cualquier dato que no esté confirmado.",
      fields: [
        defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
        defineField({ name: "phone", title: "Teléfono", type: "string" }),
        defineField({
          name: "phones",
          title: "Números de teléfono",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "messenger",
          title: "URL de Messenger",
          type: "url",
        }),
        defineField({ name: "email", title: "Correo", type: "string" }),
        defineField({
          name: "officeAddress",
          title: "Dirección de oficina (secundaria)",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "mapUrl",
          title: "Enlace del mapa",
          type: "url",
        }),
        defineField({
          name: "hours",
          title: "Horario confirmado",
          type: "string",
        }),
        defineField({
          name: "schedule",
          title: "Horarios por día",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [string("days", "Días"), string("hours", "Horario")],
              preview: {
                select: { title: "days", subtitle: "hours" },
              },
            }),
          ],
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
          initialValue:
            "https://www.facebook.com/profile.php?id=61573839946589",
        }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navegación",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          fields: [string("label", "Etiqueta"), string("href", "Ruta")],
        }),
      ],
      validation: required,
    }),
  ],
  preview: { prepare: () => ({ title: "Ajustes globales" }) },
});

const homePage = defineType({
  name: "homePage",
  title: "Página · Inicio",
  type: "document",
  fields: [
    hero,
    string("statementEyebrow", "Etiqueta de introducción"),
    string("statementTitle", "Título de introducción"),
    text("statementText", "Texto de introducción"),
    string("benefitsEyebrow", "Etiqueta de beneficios"),
    string("benefitsTitle", "Título de beneficios"),
    cards("benefits", "Beneficios"),
    string("processEyebrow", "Etiqueta de proceso"),
    string("processTitle", "Título de proceso"),
    cards("process", "Pasos"),
    string("coverageTitle", "Título de cobertura"),
    text("coverageText", "Texto de cobertura"),
    string("aboutTitle", "Título de nosotros"),
    text("aboutText", "Texto de nosotros"),
    string("faqTitle", "Título de FAQ"),
    text("faqText", "Texto de FAQ"),
    string("finalTitle", "Título de CTA final"),
    text("finalText", "Texto de CTA final"),
  ],
  preview: { prepare: () => ({ title: "Inicio" }) },
});

const servicesPage = defineType({
  name: "servicesPage",
  title: "Página · Servicios",
  type: "document",
  fields: [
    hero,
    string("introTitle", "Título de introducción"),
    text("introText", "Texto de introducción"),
    cards("introPoints", "Puntos del proceso"),
    string("finalTitle", "Título de CTA final"),
  ],
  preview: { prepare: () => ({ title: "Servicios" }) },
});

const aboutPage = defineType({
  name: "aboutPage",
  title: "Página · Nosotros",
  type: "document",
  fields: [
    hero,
    string("storyEyebrow", "Etiqueta de historia"),
    string("storyTitle", "Título de historia"),
    stringList("story", "Párrafos de historia"),
    image("storyImage", "Fotografía del propietario"),
    string("ownerName", "Nombre del propietario"),
    string("ownerRole", "Cargo del propietario"),
    string("ownerSlogan", "Lema del propietario"),
    stringList("ownerMessage", "Mensaje del propietario"),
    text("mission", "Misión"),
    text("vision", "Visión"),
    string("valuesTitle", "Título de valores"),
    cards("values", "Valores"),
    string("commitmentTitle", "Título de compromiso"),
    text("commitmentText", "Texto de compromiso"),
  ],
  preview: { prepare: () => ({ title: "Nosotros" }) },
});

const coveragePage = defineType({
  name: "coveragePage",
  title: "Página · Cobertura",
  type: "document",
  fields: [
    hero,
    string("title", "Título"),
    text("description", "Descripción"),
    string("noteTitle", "Título de consulta adicional"),
    text("note", "Texto de consulta adicional"),
  ],
  preview: { prepare: () => ({ title: "Cobertura" }) },
});
const contactPage = defineType({
  name: "contactPage",
  title: "Página · Contacto",
  type: "document",
  fields: [
    hero,
    string("title", "Título"),
    text("description", "Descripción"),
    string("officeTitle", "Título de oficina"),
    text("officeText", "Texto de oficina"),
  ],
  preview: { prepare: () => ({ title: "Contacto" }) },
});

const legalPage = (name: "privacyPage" | "termsPage", title: string) =>
  defineType({
    name,
    title,
    type: "document",
    fields: [
      string("title", "Título"),
      defineField({
        name: "updated",
        title: "Última actualización",
        type: "string",
      }),
      text("intro", "Introducción"),
      defineField({
        name: "sections",
        title: "Secciones",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [string("title", "Título"), text("text", "Contenido", 8)],
          }),
        ],
      }),
    ],
    preview: { prepare: () => ({ title }) },
  });

const privacyPage = legalPage("privacyPage", "Aviso de privacidad");
const termsPage = legalPage("termsPage", "Términos y condiciones");

const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    string("name", "Nombre"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: Rule =>
        Rule.required().custom(value =>
          !value?.current ||
          ["radiografias-digitales", "electrocardiogramas"].includes(
            value.current
          )
            ? true
            : "RX solo ofrece radiografías-digitales y electrocardiogramas."
        ),
    }),
    string("eyebrow", "Categoría"),
    text("summary", "Resumen"),
    text("description", "Descripción completa", 5),
    image("image", "Imagen"),
    stringList("benefits", "Ventajas"),
    stringList("studies", "Tipos o zonas de estudio"),
    stringList("process", "Proceso a domicilio"),
    text("results", "Entrega de resultados"),
    text("interpretation", "Texto sobre interpretación"),
    ...orderFields,
  ],
  preview: { select: { title: "name", media: "image" } },
});
const coverageArea = defineType({
  name: "coverageArea",
  title: "Localidad",
  type: "document",
  fields: [
    string("name", "Nombre"),
    string("note", "Nota breve"),
    defineField({
      name: "featured",
      title: "Base operativa",
      type: "boolean",
      initialValue: false,
    }),
    ...orderFields,
  ],
  preview: { select: { title: "name", subtitle: "note" } },
});
const faq = defineType({
  name: "faq",
  title: "Pregunta frecuente",
  type: "document",
  fields: [
    string("question", "Pregunta"),
    text("answer", "Respuesta"),
    ...orderFields,
  ],
  preview: { select: { title: "question" } },
});
const statistic = defineType({
  name: "statistic",
  title: "Estadística",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Valor",
      type: "number",
      validation: required,
    }),
    defineField({ name: "prefix", title: "Prefijo", type: "string" }),
    defineField({ name: "suffix", title: "Sufijo", type: "string" }),
    string("label", "Etiqueta"),
    ...orderFields,
  ],
  preview: {
    select: { title: "label", value: "value" },
    prepare: ({ title, value }) => ({ title, subtitle: String(value ?? "") }),
  },
});

export const schemaTypes = [
  siteSettings,
  homePage,
  servicesPage,
  aboutPage,
  coveragePage,
  contactPage,
  privacyPage,
  termsPage,
  service,
  coverageArea,
  faq,
  statistic,
];
