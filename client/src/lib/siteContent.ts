export type ImageValue = { url: string; alt: string };
export type LinkValue = { label: string; href: string };

export type SiteSettings = {
  businessName: string;
  logoUrl: string;
  contact: {
    whatsapp: string;
    phone: string;
    phones: string[];
    messenger: string;
    email: string;
    officeAddress: string;
    mapUrl: string;
    hours: string;
    schedule: Array<{ days: string; hours: string }>;
    facebook: string;
    instagram: string;
  };
  navigation: Array<{ label: string; href: string }>;
  footerText: string;
  whatsappMessage: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageValue;
};

export type Service = {
  _id: string;
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: ImageValue;
  benefits: string[];
  studies: string[];
  process: string[];
  results: string;
  interpretation: string;
};

export type CoverageArea = {
  _id: string;
  name: string;
  note: string;
  featured: boolean;
};

export type Faq = { _id: string; question: string; answer: string };
export type Statistic = {
  _id: string;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
};

export type LegalPageContent = {
  title: string;
  updated: string;
  intro: string;
  sections: Array<{ title: string; text: string }>;
};

export type SiteContent = {
  settings: SiteSettings;
  home: {
    hero: HeroContent;
    statementEyebrow: string;
    statementTitle: string;
    statementText: string;
    benefitsEyebrow: string;
    benefitsTitle: string;
    benefits: Array<{ title: string; description: string }>;
    processEyebrow: string;
    processTitle: string;
    process: Array<{ title: string; description: string }>;
    coverageTitle: string;
    coverageText: string;
    aboutTitle: string;
    aboutText: string;
    faqTitle: string;
    faqText: string;
    finalTitle: string;
    finalText: string;
  };
  servicesPage: {
    hero: HeroContent;
    introTitle: string;
    introText: string;
    introPoints: Array<{ title: string; description: string }>;
    finalTitle: string;
  };
  aboutPage: {
    hero: HeroContent;
    storyEyebrow: string;
    storyTitle: string;
    story: string[];
    storyImage: ImageValue;
    ownerName: string;
    ownerRole: string;
    ownerSlogan: string;
    ownerMessage: string[];
    mission: string;
    vision: string;
    valuesTitle: string;
    values: Array<{ title: string; description: string }>;
    commitmentTitle: string;
    commitmentText: string;
  };
  coveragePage: {
    hero: HeroContent;
    title: string;
    description: string;
    noteTitle: string;
    note: string;
  };
  contactPage: {
    hero: HeroContent;
    title: string;
    description: string;
    officeTitle: string;
    officeText: string;
  };
  privacyPage: LegalPageContent;
  termsPage: LegalPageContent;
  services: Service[];
  coverage: CoverageArea[];
  faqs: Faq[];
  statistics: Statistic[];
};

export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61573839946589";

const image = (url: string, alt: string): ImageValue => ({ url, alt });

export const fallbackContent: SiteContent = {
  settings: {
    businessName: "RX Castillo Digital",
    logoUrl: "/images/logo-white.webp",
    contact: {
      whatsapp: "523231945292",
      phone: "323 194 5292",
      phones: ["323 194 5292"],
      messenger: "",
      email: "rxcastillodigital@gmail.com",
      officeAddress: "Blvd. Tijuana #150, Ruiz, Nayarit, México",
      mapUrl: "https://maps.app.goo.gl/sAvLpqLRLxAwbwLp7",
      hours:
        "Lunes a viernes: 08:30 am - 02:00 pm | 04:00 pm - 07:00 pm\nSábado: 08:30 am - 01:00 pm\nDomingo: local cerrado · atención por llamada",
      schedule: [
        {
          days: "Lunes a viernes",
          hours: "08:30 am - 02:00 pm | 04:00 pm - 07:00 pm",
        },
        { days: "Sábado", hours: "08:30 am - 01:00 pm" },
        {
          days: "Domingo",
          hours: "Local cerrado · atención por llamada",
        },
      ],
      facebook: FACEBOOK_URL,
      instagram: "https://www.instagram.com/rxcastillodigital/",
    },
    navigation: [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/servicios" },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Cobertura", href: "/cobertura" },
      { label: "Contacto", href: "/contacto" },
    ],
    footerText: "Diagnóstico digital a domicilio desde Ruiz, Nayarit.",
    whatsappMessage:
      "Hola, quiero consultar disponibilidad para un estudio a domicilio.",
  },
  home: {
    hero: {
      eyebrow: "Diagnóstico digital a domicilio",
      title: "La tecnología llega hasta donde estás.",
      description:
        "Radiografías digitales y electrocardiogramas realizados en tu domicilio, con atención cercana y un flujo de resultados digital.",
      image: image(
        "/images/contact-team.webp",
        "Equipo de RX Castillo Digital preparado para brindar atención"
      ),
    },
    statementEyebrow: "Atención que se mueve contigo",
    statementTitle: "Menos traslados. Más tranquilidad.",
    statementText:
      "Llevamos el equipo hasta el paciente para realizar el estudio en un entorno conocido, con un proceso claro desde la solicitud hasta la entrega digital.",
    benefitsEyebrow: "Por qué elegirnos",
    benefitsTitle: "Precisión, cercanía y un proceso sencillo.",
    benefits: [
      {
        title: "Atención a domicilio",
        description:
          "Coordinamos la visita para evitar un traslado innecesario del paciente.",
      },
      {
        title: "Tecnología portátil",
        description:
          "Equipo digital preparado para realizar el estudio fuera de una clínica tradicional.",
      },
      {
        title: "Entrega digital",
        description:
          "Compartimos los resultados por canales digitales para facilitar su consulta.",
      },
      {
        title: "Comunicación directa",
        description:
          "Confirmamos disponibilidad y resolvemos dudas por WhatsApp, Messenger o llamada.",
      },
    ],
    processEyebrow: "Cómo funciona",
    processTitle: "Del primer mensaje a tus resultados.",
    process: [
      {
        title: "Solicita el servicio",
        description:
          "Indica el estudio requerido y la localidad donde se encuentra el paciente.",
      },
      {
        title: "Confirma disponibilidad",
        description: "Revisamos cobertura y coordinamos la visita contigo.",
      },
      {
        title: "Realizamos el estudio",
        description: "Llevamos el equipo portátil al domicilio acordado.",
      },
      {
        title: "Recibe tus resultados",
        description:
          "El material del estudio se comparte mediante el flujo digital disponible.",
      },
    ],
    coverageTitle: "Cobertura cercana, con base en Ruiz.",
    coverageText:
      "Atendemos Ruiz y localidades de la región. Consulta disponibilidad para confirmar el servicio en tu ubicación.",
    aboutTitle: "Diagnóstico móvil con enfoque humano.",
    aboutText:
      "RX Castillo Digital combina tecnología portátil, comunicación directa y atención respetuosa para acercar estudios esenciales al paciente.",
    faqTitle: "Antes de solicitar tu estudio.",
    faqText:
      "Respuestas breves sobre el servicio, la visita y la entrega de resultados.",
    finalTitle: "¿Necesitas un estudio a domicilio?",
    finalText:
      "Cuéntanos qué estudio requieres y en qué localidad te encuentras.",
  },
  servicesPage: {
    hero: {
      eyebrow: "Dos servicios, un enfoque claro",
      title: "Diagnóstico esencial sin salir de casa.",
      description:
        "Conoce cómo realizamos radiografías digitales y electrocardiogramas a domicilio, y cómo se entregan los resultados.",
      image: image(
        "/images/xray-forearm-fixation.webp",
        "Radiografía digital de antebrazo con fijación"
      ),
    },
    introTitle: "Cada estudio tiene su propio proceso.",
    introText:
      "Revisamos la solicitud, confirmamos que el servicio corresponda a lo que necesitas y coordinamos la visita.",
    introPoints: [
      {
        title: "Revisión inicial",
        description:
          "Identificamos el estudio solicitado y resolvemos las dudas necesarias antes de coordinar.",
      },
      {
        title: "Cobertura y agenda",
        description:
          "Confirmamos la localidad, disponibilidad y datos de la visita a domicilio.",
      },
      {
        title: "Entrega acordada",
        description:
          "Explicamos el proceso del estudio y el canal disponible para recibir los resultados.",
      },
    ],
    finalTitle: "Consulta disponibilidad para tu estudio.",
  },
  aboutPage: {
    hero: {
      eyebrow: "Sobre RX Castillo Digital",
      title: "Una historia que comenzó con el deseo de acercar la atención.",
      description:
        "Desde 2005, Richard Castillo Martínez trabaja para acercar servicios radiológicos a Ruiz y las localidades de la región.",
      image: image(
        "/images/rx-team-community.webp",
        "Equipo y comunidad de RX Castillo Digital"
      ),
    },
    storyEyebrow: "Un mensaje de nuestro fundador",
    storyTitle: "El sueño que se hizo realidad.",
    story: [
      "Soy Richard Castillo Martínez. En RX Castillo Digital trabajo para acercar radiografías digitales y electrocardiogramas al domicilio del paciente, reduciendo el esfuerzo que implica trasladarse para realizar un estudio.",
      "Mi compromiso es ofrecer una atención cercana, explicar cada paso con claridad y apoyarme en tecnología digital para facilitar el proceso desde la solicitud hasta la entrega de resultados.",
    ],
    storyImage: image(
      "/images/richard-castillo-founder.webp",
      "Ptr. Richard Castillo Martínez con equipo radiológico portátil"
    ),
    ownerName: "Ptr. Richard Castillo Martínez",
    ownerRole: "Fundador de RX Castillo Digital",
    ownerSlogan: "Tu salud, nuestra misión, donde estés",
    ownerMessage: [
      "Desde 2005 he trabajado con un propósito claro: acercar servicios radiológicos a lugares donde antes era difícil acceder a ellos.",
      "En Ruiz escuché muchas veces lo complicado que podía ser trasladarse hasta otra ciudad para obtener una radiografía. De ahí nació una pregunta que sigue guiando nuestro trabajo: ¿y si llevamos nosotros el servicio hasta la gente?",
      "Hoy, cada domicilio que visitamos representa el compromiso de mantenernos cerca, trabajar con tecnología digital y cuidar la experiencia de cada paciente durante el estudio.",
    ],
    mission:
      "Acercar estudios de diagnóstico digital a domicilio mediante una atención profesional, clara y respetuosa.",
    vision:
      "Ser un referente regional de diagnóstico móvil por la calidad del proceso y la cercanía con cada paciente.",
    valuesTitle: "Lo que guía cada visita.",
    values: [
      {
        title: "Cercanía",
        description: "Escuchamos, explicamos y coordinamos de manera directa.",
      },
      {
        title: "Cuidado",
        description:
          "Tratamos al paciente y su entorno con respeto durante todo el estudio.",
      },
      {
        title: "Claridad",
        description:
          "Comunicamos qué sigue y cómo se entregarán los resultados.",
      },
      {
        title: "Tecnología",
        description:
          "Usamos herramientas digitales para facilitar el estudio y su consulta.",
      },
    ],
    commitmentTitle: "El domicilio es el centro del servicio.",
    commitmentText:
      "La oficina funciona como información de apoyo; la experiencia está diseñada para coordinar y realizar la atención donde se encuentra el paciente.",
  },
  coveragePage: {
    hero: {
      eyebrow: "Cobertura regional",
      title: "Nos movemos desde Ruiz hasta tu localidad.",
      description:
        "Consulta las zonas atendidas y confirma disponibilidad antes de solicitar la visita.",
      image: image(
        "/images/xray-shoulder.webp",
        "Radiografía digital de hombro"
      ),
    },
    title: "Localidades donde ofrecemos servicio.",
    description:
      "La cobertura se coordina según la ubicación del paciente, el estudio requerido y la disponibilidad de la unidad móvil. Atendemos Ruiz y distintas localidades cercanas: comparte tu ubicación y los datos del estudio para revisar la ruta, confirmar que podemos llegar hasta tu domicilio y acordar contigo el momento de la visita.",
    noteTitle: "¿Tu localidad no aparece?",
    note: "Podemos revisar la ubicación contigo. La confirmación depende de la distancia y disponibilidad del servicio.",
  },
  contactPage: {
    hero: {
      eyebrow: "Contacto directo",
      title: "Elige el canal más cómodo para ti.",
      description:
        "Solicita el servicio, consulta disponibilidad o agenda por WhatsApp, Messenger o llamada.",
      image: image(
        "/images/home-team.webp",
        "Equipo de RX Castillo Digital durante una jornada de atención"
      ),
    },
    title: "Hablemos de tu estudio.",
    description:
      "Para ayudarte mejor, ten a la mano el tipo de estudio y la localidad donde se encuentra el paciente.",
    officeTitle: "Oficina",
    officeText:
      "La oficina es un punto de referencia. El servicio principal se realiza a domicilio.",
  },
  privacyPage: {
    title: "Aviso de privacidad",
    updated: "16 de septiembre de 2026",
    intro:
      "RX Castillo Digital protege la información que las personas comparten al solicitar un estudio y explica en este aviso cómo se utiliza.",
    sections: [
      {
        title: "1. Responsable y contacto",
        text: "RX Castillo Digital, con domicilio en Blvd. Tijuana #150, Ruiz, Nayarit, México, es responsable del tratamiento de los datos personales. Para dudas o solicitudes puedes escribir a rxcastillodigital@gmail.com o comunicarte al +52 323 194 5292.",
      },
      {
        title: "2. Datos que podemos recibir",
        text: "Al comunicarte voluntariamente por WhatsApp, Messenger, llamada, correo electrónico o de forma presencial, podemos recibir datos de identificación y contacto, así como la información estrictamente necesaria para coordinar el estudio. Evita enviar información clínica que no sea necesaria para atender tu solicitud.",
      },
      {
        title: "3. Finalidades",
        text: "Utilizamos la información para identificar al paciente, revisar el estudio solicitado, confirmar cobertura y disponibilidad, coordinar la visita, realizar el servicio, entregar resultados y atender aclaraciones relacionadas con la atención.",
      },
      {
        title: "4. Transferencias y entrega de resultados",
        text: "Cuando el estudio requiera interpretación, la información necesaria puede compartirse con el profesional de salud correspondiente. También podrá comunicarse cuando exista una obligación legal. Los resultados pueden entregarse por el canal digital acordado o físicamente, según el servicio.",
      },
      {
        title: "5. Sitio web y proveedores tecnológicos",
        text: "Este sitio no incluye un formulario para capturar expedientes clínicos. Utiliza Sanity como sistema de gestión y entrega de contenido público; RX Castillo Digital no lo utiliza desde este sitio para almacenar expedientes de pacientes. La sección de cobertura integra OpenStreetMap y el sitio enlaza con servicios externos como WhatsApp y redes sociales, cuyos propios términos y avisos aplican al abrirlos.",
      },
      {
        title: "6. Conservación y seguridad",
        text: "Aplicamos medidas razonables para proteger la información. Los datos relacionados con la atención se conservan únicamente durante el tiempo necesario para las finalidades descritas y, de forma general, hasta por un año, salvo que una obligación legal requiera un plazo distinto.",
      },
      {
        title: "7. Derechos y cambios al aviso",
        text: "Puedes solicitar acceso, rectificación, cancelación u oposición mediante los datos de contacto indicados. Este aviso puede actualizarse para reflejar cambios operativos, tecnológicos o legales; la versión vigente se publicará en este sitio.",
      },
    ],
  },
  termsPage: {
    title: "Términos y condiciones",
    updated: "16 de septiembre de 2026",
    intro:
      "Al navegar en este sitio aceptas estas condiciones de uso. La información publicada es general y no sustituye una valoración médica.",
    sections: [
      {
        title: "1. Objeto del sitio",
        text: "El sitio presenta información sobre RX Castillo Digital, sus servicios de radiografías digitales y electrocardiogramas, cobertura y medios de contacto. La disponibilidad, alcance, costo y condiciones de cada visita se confirman directamente antes de prestar el servicio.",
      },
      {
        title: "2. Uso permitido",
        text: "Puedes consultar el sitio para fines personales e informativos. No está permitido alterar su funcionamiento, intentar acceder a áreas restringidas, utilizar su contenido de forma ilícita ni reproducir marcas, fotografías o materiales sin autorización.",
      },
      {
        title: "3. Información médica y resultados",
        text: "El contenido del sitio no es diagnóstico, tratamiento ni recomendación médica. Los estudios y sus resultados deben ser valorados por el profesional de salud correspondiente. Ante una urgencia médica, utiliza los servicios de emergencia disponibles en tu localidad.",
      },
      {
        title: "4. Solicitud, cobertura y pagos",
        text: "El envío de un mensaje no confirma automáticamente una cita. La atención depende del estudio solicitado, la ubicación y la disponibilidad. Los pagos se coordinan directamente, de forma presencial o mediante el medio acordado; este sitio no procesa pagos en línea.",
      },
      {
        title: "5. Servicios de terceros",
        text: "El sitio utiliza Sanity para administrar y entregar contenido público, integra OpenStreetMap para mostrar cobertura y contiene enlaces a WhatsApp, Messenger y redes sociales. Estos servicios operan conforme a sus propios términos y políticas; RX Castillo Digital no controla su disponibilidad ni el tratamiento que realizan fuera de este sitio.",
      },
      {
        title: "6. Responsabilidad y disponibilidad",
        text: "Procuramos mantener la información actualizada y el sitio disponible, pero pueden existir interrupciones o cambios. RX Castillo Digital no responde por decisiones médicas tomadas únicamente con base en contenido informativo del sitio ni por fallas atribuibles a servicios externos.",
      },
      {
        title: "7. Modificaciones y legislación aplicable",
        text: "Estas condiciones pueden actualizarse y la versión vigente será la publicada aquí. Su interpretación se rige por las leyes aplicables en México y, cuando corresponda, por la jurisdicción competente en Ruiz, Nayarit.",
      },
      {
        title: "8. Contacto",
        text: "Para aclaraciones escribe a rxcastillodigital@gmail.com o comunícate al +52 323 194 5292.",
      },
    ],
  },
  services: [
    {
      _id: "service-xray",
      slug: "radiografias-digitales",
      name: "Radiografías digitales",
      eyebrow: "Imagen diagnóstica",
      summary:
        "Estudios radiográficos realizados con equipo digital portátil en el domicilio del paciente.",
      description:
        "La radiografía digital permite obtener imágenes de distintas zonas del cuerpo. Antes de coordinar la visita, confirmamos el estudio solicitado y la información necesaria para realizarlo.",
      image: image(
        "/images/xray-home-procedure.webp",
        "Realización de una radiografía digital a domicilio"
      ),
      benefits: [
        "Evita el traslado del paciente",
        "Equipo portátil para atención domiciliaria",
        "Flujo de entrega digital",
        "Coordinación directa antes de la visita",
      ],
      studies: [
        "Tórax",
        "Columna",
        "Cráneo",
        "Pelvis y cadera",
        "Hombro y húmero",
        "Codo y antebrazo",
        "Muñeca y mano",
        "Rodilla y pierna",
        "Tobillo y pie",
      ],
      process: [
        "Comparte la indicación o el estudio requerido",
        "Confirma localidad y disponibilidad",
        "Recibe al equipo en el domicilio",
        "Consulta la entrega de resultados",
      ],
      results:
        "Las imágenes se procesan de forma digital y se comparten mediante el canal acordado.",
      interpretation:
        "La interpretación debe ser realizada por el profesional médico correspondiente. Confirma al solicitar el servicio qué documentos incluye la entrega.",
    },
    {
      _id: "service-ekg",
      slug: "electrocardiogramas",
      name: "Electrocardiogramas",
      eyebrow: "Registro cardíaco",
      summary:
        "Registro digital de la actividad eléctrica del corazón realizado a domicilio.",
      description:
        "El electrocardiograma de 12 derivaciones es un estudio no invasivo que registra la actividad eléctrica del corazón. Coordinamos la visita para realizarlo con equipo portátil en el domicilio.",
      image: image(
        "/images/service-ekg.webp",
        "Electrocardiograma digital a domicilio"
      ),
      benefits: [
        "Procedimiento no invasivo",
        "Atención en el domicilio",
        "Equipo digital portátil",
        "Entrega por el canal acordado",
      ],
      studies: [],
      process: [
        "Solicita el electrocardiograma",
        "Confirma localidad y disponibilidad",
        "Prepara un espacio cómodo para el estudio",
        "Recibe el registro por el canal acordado",
      ],
      results:
        "El registro se entrega de forma digital según lo acordado durante la solicitud.",
      interpretation:
        "El registro no sustituye la valoración médica. Consulta con el profesional tratante la interpretación y cualquier decisión clínica.",
    },
  ],
  coverage: [
    { _id: "ruiz", name: "Ruiz", note: "Base operativa", featured: true },
    {
      _id: "tuxpan",
      name: "Tuxpan",
      note: "Servicio a domicilio",
      featured: false,
    },
    {
      _id: "el-venado",
      name: "El Venado",
      note: "Servicio a domicilio",
      featured: false,
    },
    {
      _id: "chilapa",
      name: "Chilapa",
      note: "Servicio a domicilio",
      featured: false,
    },
    {
      _id: "san-lorenzo",
      name: "San Lorenzo",
      note: "Servicio a domicilio",
      featured: false,
    },
    {
      _id: "el-vado-de-san-pedro",
      name: "El Vado de San Pedro",
      note: "Servicio a domicilio",
      featured: false,
    },
  ],
  faqs: [
    {
      _id: "faq-1",
      question: "¿El servicio se realiza a domicilio?",
      answer:
        "Sí. La atención a domicilio es el enfoque principal de RX Castillo Digital. Confirma disponibilidad para tu localidad antes de agendar.",
    },
    {
      _id: "faq-2",
      question: "¿Qué estudios ofrecen?",
      answer:
        "Radiografías digitales y electrocardiogramas. Si tienes una indicación específica, compártela al solicitar el servicio para confirmar que podemos realizarla.",
    },
    {
      _id: "faq-3",
      question: "¿Cómo recibo los resultados?",
      answer:
        "La entrega se coordina por canales digitales. Al solicitar el servicio te indicaremos el formato y el canal disponible para tu estudio.",
    },
    {
      _id: "faq-4",
      question: "¿Cómo confirmo la cobertura?",
      answer:
        "Envíanos tu localidad y el estudio requerido por WhatsApp, Messenger o llamada. Te confirmaremos disponibilidad antes de la visita.",
    },
    {
      _id: "faq-5",
      question: "¿Realizan radiografías dentales?",
      answer:
        "No. RX Castillo Digital no ofrece radiografías dentales. Realizamos radiografías digitales de las zonas corporales disponibles y electrocardiogramas.",
    },
    {
      _id: "faq-6",
      question: "¿Qué información debo compartir para solicitar el servicio?",
      answer:
        "Indica el estudio requerido, la localidad del paciente y el canal donde prefieres recibir la confirmación.",
    },
    {
      _id: "faq-7",
      question: "¿Necesito trasladar al paciente?",
      answer:
        "El servicio principal se realiza a domicilio. Primero confirmamos que el estudio y la localidad puedan atenderse.",
    },
    {
      _id: "faq-8",
      question: "¿La oficina es el lugar principal de atención?",
      answer:
        "No. La oficina funciona como punto de referencia; el servicio está enfocado principalmente en la atención a domicilio.",
    },
  ],
  statistics: [
    {
      _id: "stat-availability",
      value: 24,
      prefix: "",
      suffix: "/7",
      label: "recepción de solicitudes por canales digitales",
    },
    {
      _id: "stat-areas",
      value: 6,
      prefix: "",
      suffix: "",
      label: "localidades listadas",
    },
    {
      _id: "stat-since",
      value: 2005,
      prefix: "Desde ",
      suffix: "",
      label: "trayectoria al servicio de la comunidad",
    },
    {
      _id: "stat-ekg",
      value: 12,
      prefix: "",
      suffix: " derivaciones",
      label: "en cada electrocardiograma",
    },
  ],
};
