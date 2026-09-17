import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  contactInquiries,
  coverageAreas,
  faqs,
  services,
  siteSettings,
  statistics,
  users,
  type InsertUser,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(users)
    .values(user)
    .onDuplicateKeyUpdate({
      set: {
        name: user.name,
        email: user.email,
        loginMethod: user.loginMethod,
        lastSignedIn: new Date(),
      },
    });
}

// Seed initial content if tables are empty
export async function seedInitialDataIfNeeded() {
  const db = await getDb();
  if (!db) return;

  try {
    // 1. Site Settings
    const existingSettings = await db.select().from(siteSettings).limit(1);
    if (existingSettings.length === 0) {
      await db.insert(siteSettings).values({
        businessName: "RX Castillo Digital",
        legalName: "RX Castillo Digital - Diagnóstico Móvil",
        primarySlogan: "Radiografías digitales y electrocardiogramas a domicilio.",
        secondarySlogan: "Servicio de diagnóstico médico a domicilio en Ruiz, Nayarit y localidades cercanas.",
        whatsappNumber: "", // Variable claramente identificada WHATSAPP_NUMBER para reemplazo
        phoneNumber: "",
        email: "contacto@rxcastillodigital.com",
        officeAddress: "Boulevard Tijuana #150, Ruiz, Nayarit",
        availabilityText: "24 horas / 7 días a la semana (24/7)",
        nightShiftNotice:
          "Las solicitudes realizadas fuera del horario habitual de operación pueden generar un cargo adicional por atención nocturna.",
        pacsSoftware: "Eden PACS",
        facebookUrl:
          "https://www.facebook.com/profile.php?id=61573839946589",
        instagramUrl: "https://instagram.com",
        logoUrl: "/images/logo-white.webp",
      });
    }

    // 2. Services
    const existingServices = await db.select().from(services).limit(1);
    if (existingServices.length === 0) {
      await db.insert(services).values([
        {
          slug: "radiografias-digitales",
          title: "Radiografías Digitales a Domicilio",
          shortDescription:
            "Estudios radiológicos de alta resolución realizados directamente en la comodidad del hogar del paciente, con equipo digital portátil y mínima molestia.",
          fullDescription:
            "Servicio móvil especializado de rayos X digitales enfocado en la atención de pacientes en su domicilio. Empleamos detectores digitales de panel plano que reducen el tiempo de exposición y brindan una nitidez diagnóstica superior, sin que el paciente deba trasladarse ni pasar horas en salas de espera.",
          imageUrl: "/images/service-xray.webp",
          iconName: "Scan",
          featuresJson: JSON.stringify([
            "Equipo portátil ligero y seguro para traslado residencial",
            "Atención con calidez humana y técnica profesional",
            "Disponibilidad 24 horas para urgencias médicas",
            "Sin necesidad de trasladar a personas mayores o con movilidad reducida",
            "Aclaración: No realizamos radiografías dentales",
          ]),
          studyTypesJson: JSON.stringify([
            "Tórax (proyecciones PA y lateral)",
            "Columna (cervical, dorsal y lumbosacra)",
            "Cráneo",
            "Pelvis y cadera",
            "Extremidades superiores (hombro, brazo, codo, mano)",
            "Extremidades inferiores (cadera, muslo, rodilla, tobillo, pie)",
            "Hombro",
            "Rodilla",
            "Tobillo",
            "Mano",
            "Pie",
          ]),
          order: 1,
          active: true,
        },
        {
          slug: "electrocardiogramas",
          title: "Electrocardiogramas (EKG) a Domicilio",
          shortDescription:
            "Registro de la actividad eléctrica del corazón en 12 derivaciones con tecnología digital portátil, rápida y no invasiva.",
          fullDescription:
            "El electrocardiograma a domicilio permite obtener trazos cardíacos de alta fidelidad con absoluta comodidad para el paciente. Es un procedimiento seguro, rápido y no invasivo, ideal para evaluaciones de control, valoraciones preoperatorias o síntomas agudos supervisados por su médico tratante.",
          imageUrl: "/images/service-ekg.webp",
          iconName: "HeartPulse",
          featuresJson: JSON.stringify([
            "Procedimiento 100% no invasivo y sin dolor",
            "Electrocardiógrafo digital portátil de 12 derivaciones",
            "Realizado en la cama o sillón del paciente",
            "Entrega rápida y digital directa a su WhatsApp",
            "Solicitud directa y ágil mediante WhatsApp",
          ]),
          studyTypesJson: JSON.stringify([
            "Electrocardiograma de reposo (12 derivaciones)",
            "Registro de ritmo cardiaco",
            "Evaluación cardiológica previa a procedimientos",
          ]),
          order: 2,
          active: true,
        },
        {
          slug: "interpretacion-pacs",
          title: "Resultados Digitales y Sistema PACS",
          shortDescription:
            "Entrega digital expedita de radiografías y trazos a través de WhatsApp y visualización en la plataforma médica Eden PACS.",
          fullDescription:
            "Tus estudios de rayos X digitales son procesados y alojados de manera segura en Eden PACS, una plataforma médica especializada que permite a tu médico tratante visualizar las imágenes en máxima resolución diagnóstica, hacer mediciones y consultar el reporte radiológico desde cualquier teléfono, tableta o computadora.",
          imageUrl: "/images/service-pacs.webp",
          iconName: "MonitorSmartphone",
          featuresJson: JSON.stringify([
            "Acceso en línea mediante enlace seguro enviado por WhatsApp",
            "Compatibilidad con Eden PACS para médicos especialistas",
            "Herramientas de zoom, contraste y medición digital",
            "Conservación digital de tu expediente para segundas opiniones",
            "Interpretaciones médicas disponibles según requerimiento clínico",
          ]),
          studyTypesJson: JSON.stringify([
            "Visualizador web DICOM para médicos",
            "Descarga de archivos e informes radiológicos",
            "Envío inmediato a tu teléfono inteligente",
          ]),
          order: 3,
          active: true,
        },
      ]);
    }

    // 3. Coverage Areas
    const existingCoverage = await db.select().from(coverageAreas).limit(1);
    if (existingCoverage.length === 0) {
      await db.insert(coverageAreas).values([
        {
          name: "Ruiz",
          state: "Nayarit",
          description: "Sede principal y base operativa de RX Castillo Digital. Cobertura inmediata y atención en cabecera municipal y colonias.",
          badgeText: "Base Operativa Principal",
          order: 1,
          active: true,
        },
        {
          name: "Tuxpan",
          state: "Nayarit",
          description: "Atención programada y de emergencia a domicilio en Tuxpan y alrededores con traslado directo de nuestro equipo.",
          badgeText: "Servicio a Domicilio",
          order: 2,
          active: true,
        },
        {
          name: "El Venado",
          state: "Nayarit",
          description: "Visitas domiciliarias con equipo móvil para estudios de radiografía y electrocardiograma.",
          badgeText: "Servicio a Domicilio",
          order: 3,
          active: true,
        },
        {
          name: "Chilapa",
          state: "Nayarit",
          description: "Cobertura en la comunidad de Chilapa con confirmación ágil mediante WhatsApp.",
          badgeText: "Servicio a Domicilio",
          order: 4,
          active: true,
        },
        {
          name: "San Lorenzo",
          state: "Nayarit",
          description: "Atención cercana y personalizada sin necesidad de trasladar a pacientes delicados.",
          badgeText: "Servicio a Domicilio",
          order: 5,
          active: true,
        },
        {
          name: "El Vado de San Pedro",
          state: "Nayarit",
          description: "Servicio móvil confiable con disponibilidad las 24 horas y entrega digital de resultados.",
          badgeText: "Servicio a Domicilio",
          order: 6,
          active: true,
        },
      ]);
    }

    // 4. Statistics
    const existingStats = await db.select().from(statistics).limit(1);
    if (existingStats.length === 0) {
      await db.insert(statistics).values([
        {
          value: "24/7",
          suffix: "",
          label: "Disponibilidad Médica",
          description: "Atención continua los 7 días de la semana en la región",
          order: 1,
          active: true,
        },
        {
          value: "2",
          suffix: " Servicios",
          label: "Diagnóstico Móvil",
          description: "Especialistas en Rayos X digitales y Electrocardiogramas",
          order: 2,
          active: true,
        },
        {
          value: "6",
          suffix: " Zonas",
          label: "Cobertura Regional",
          description: "Ruiz, Tuxpan, El Venado, Chilapa, San Lorenzo y El Vado de San Pedro",
          order: 3,
          active: true,
        },
        {
          value: "100",
          suffix: "%",
          label: "Entrega Digital",
          description: "Resultados por WhatsApp y acceso en plataforma Eden PACS",
          order: 4,
          active: true,
        },
      ]);
    }

    // 5. FAQs
    const existingFaqs = await db.select().from(faqs).limit(1);
    if (existingFaqs.length === 0) {
      await db.insert(faqs).values([
        {
          question: "¿Atienden las 24 horas?",
          answer:
            "Sí. RX Castillo Digital ofrece disponibilidad 24/7 para responder con oportunidad a indicaciones médicas. Las solicitudes realizadas fuera del horario habitual pueden estar sujetas a una tarifa adicional por atención nocturna.",
          order: 1,
          active: true,
        },
        {
          question: "¿Cómo recibo mis resultados?",
          answer:
            "Los estudios digitales pueden entregarse directamente mediante WhatsApp en formatos de fácil visualización. En el caso de radiografías, el paciente y su médico reciben acceso digital a sus estudios e interpretaciones mediante nuestro sistema Eden PACS.",
          order: 2,
          active: true,
        },
        {
          question: "¿Cómo recibo mi electrocardiograma?",
          answer:
            "El trazo de 12 derivaciones se procesa digitalmente y puede enviarse de manera inmediata por WhatsApp a ti o a tu médico de cabecera.",
          order: 3,
          active: true,
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer:
            "Para tu comodidad aceptamos efectivo al momento de la visita, transferencia bancaria inmediata y pago con tarjeta.",
          order: 4,
          active: true,
        },
        {
          question: "¿Realizan radiografías dentales?",
          answer:
            "No. Actualmente RX Castillo Digital está enfocado en radiología digital médica y no realiza radiografías dentales.",
          order: 5,
          active: true,
        },
        {
          question: "¿Atienden fuera de Ruiz?",
          answer:
            "Sí. Atendemos de manera habitual Ruiz, Tuxpan, El Venado, Chilapa, San Lorenzo y El Vado de San Pedro. Si te encuentras en una localidad cercana, escríbenos por WhatsApp para consultar disponibilidad y tiempo de traslado.",
          order: 6,
          active: true,
        },
      ]);
    }
  } catch (err) {
    console.error("[Seed Error]", err);
  }
}
