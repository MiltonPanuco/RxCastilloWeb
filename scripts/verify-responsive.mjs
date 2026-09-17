import fs from "node:fs";
import puppeteer from "puppeteer-core";

const chromeCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = chromeCandidates.find(fs.existsSync);
if (!executablePath)
  throw new Error(
    "No se encontró Chrome o Edge para la comprobación responsive."
  );

const origin = process.env.RX_SITE_URL || "http://localhost:3000";
const routes = [
  "/",
  "/servicios",
  "/nosotros",
  "/cobertura",
  "/contacto",
  "/aviso-de-privacidad",
  "/terminos",
];
const pageTitles = {
  "/": "RX Castillo Digital | Inicio",
  "/servicios": "RX Castillo Digital | Servicios",
  "/nosotros": "RX Castillo Digital | Nosotros",
  "/cobertura": "RX Castillo Digital | Cobertura",
  "/contacto": "RX Castillo Digital | Contacto",
  "/aviso-de-privacidad": "RX Castillo Digital | Aviso de privacidad",
  "/terminos": "RX Castillo Digital | Términos y condiciones",
};
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
];
const browser = await puppeteer.launch({ executablePath, headless: true });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.setCacheEnabled(false);
    const runtimeErrors = [];
    page.on("pageerror", error => runtimeErrors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(origin + route, {
        waitUntil: "domcontentloaded",
        timeout: 20_000,
      });
      if (!response || response.status() >= 400)
        throw new Error(
          `${route} respondió ${response?.status() ?? "sin estado"}`
        );
      await page.waitForFunction(
        expected => document.title === expected,
        { timeout: 5_000 },
        pageTitles[route]
      );
      const result = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector("h1")?.textContent?.trim() || "",
        forbiddenHeroActions: [
          ...document.querySelectorAll(
            "main > section:first-child a, main > section:first-child button"
          ),
        ].filter(item =>
          /consultar disponibilidad|hablar por whatsapp|abrir messenger|llamar/i.test(
            item.textContent || ""
          )
        ).length,
        firstSectionHeight:
          document.querySelector("main > section")?.getBoundingClientRect()
            .height || 0,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        containerGutters: [...document.querySelectorAll(".container")].map(
          item => {
            const box = item.getBoundingClientRect();
            return {
              left: box.left,
              right: window.innerWidth - box.right,
            };
          }
        ),
        horizontalScroll: (() => {
          const root = document.scrollingElement;
          if (!root) return 0;
          root.scrollLeft = 99_999;
          const value = root.scrollLeft;
          root.scrollLeft = 0;
          return value;
        })(),
        overflowElements: [...document.querySelectorAll("body *")]
          .filter(item => {
            const box = item.getBoundingClientRect();
            return box.right > window.innerWidth + 1 || box.left < -1;
          })
          .slice(0, 5)
          .map(
            item =>
              `${item.tagName.toLowerCase()}.${String(item.className).split(" ").slice(0, 3).join(".")}`
          ),
        brokenImages: [...document.images]
          .filter(item => item.complete && item.naturalWidth === 0)
          .map(item => item.src),
        invalidWhatsAppIcons: [
          ...document.querySelectorAll("[data-whatsapp-icon]"),
        ].filter(
          icon =>
            icon.getAttribute("viewBox") !== "0 0 24 24" ||
            (icon.querySelector("path")?.getAttribute("d")?.length || 0) < 500
        ).length,
      }));
      if (!result.h1)
        throw new Error(`${route} no tiene H1 en ${viewport.name}`);
      if (result.title !== pageTitles[route])
        throw new Error(
          `${route} tiene el title "${result.title}"; se esperaba "${pageTitles[route]}"`
        );
      if (result.forbiddenHeroActions)
        throw new Error(
          `${route} conserva ${result.forbiddenHeroActions} CTA de contacto en el hero`
        );
      if (result.firstSectionHeight < viewport.height - 1)
        throw new Error(
          `${route} no ocupa 100vh en ${viewport.name}: ${result.firstSectionHeight}px`
        );
      if (result.horizontalScroll > 1)
        throw new Error(
          `${route} desborda ${result.overflow}px en ${viewport.name}: ${result.overflowElements.join(", ")}`
        );
      if (
        viewport.name === "mobile" &&
        result.containerGutters.some(
          gutter => gutter.left < 19 || gutter.right < 19
        )
      )
        throw new Error(
          `${route} perdió el margen móvil: ${JSON.stringify(result.containerGutters)}`
        );
      if (result.brokenImages.length)
        throw new Error(
          `${route} tiene imágenes rotas: ${result.brokenImages.join(", ")}`
        );
      if (result.invalidWhatsAppIcons)
        throw new Error(
          `${route} tiene ${result.invalidWhatsAppIcons} iconos de WhatsApp incompletos`
        );
      console.log(
        `✓ ${viewport.name.padEnd(7)} ${route.padEnd(12)} ${result.h1}`
      );
    }
    if (viewport.name === "mobile") {
      await page.goto(origin + "/cobertura", { waitUntil: "domcontentloaded" });
      const initialMap = await page.$eval(
        "[data-coverage-map] iframe",
        item => item.title
      );
      const options = await page.$$("[data-coverage-option]");
      if (options.length > 1) await options[1].click();
      await page.waitForFunction(
        title =>
          document
            .querySelector("[data-coverage-map] iframe")
            ?.getAttribute("title") !== title,
        {},
        initialMap
      );

      await page.evaluate(() => window.scrollTo(0, 600));
      await page.click('button[aria-controls="menu-movil"]');
      const menu = await page.evaluate(() => {
        const box = document
          .querySelector("#menu-movil")
          ?.getBoundingClientRect();
        return {
          overflow: document.body.style.overflow,
          htmlOverflow: document.documentElement.style.overflow,
          top: box?.top,
          height: box?.height,
          menuZIndex: Number(
            getComputedStyle(document.querySelector("#menu-movil")).zIndex
          ),
          whatsappZIndex: Number(
            getComputedStyle(
              document.querySelector(
                `a[aria-label="Abrir WhatsApp de RX Castillo Digital"]`
              )
            ).zIndex
          ),
        };
      });
      if (
        menu.overflow !== "hidden" ||
        menu.htmlOverflow !== "hidden" ||
        menu.menuZIndex <= menu.whatsappZIndex ||
        Math.abs(menu.top || 0) > 1 ||
        (menu.height || 0) < viewport.height - 1
      )
        throw new Error(
          `El menú móvil no bloquea/cubre la pantalla: ${JSON.stringify(menu)}`
        );
      await page.click('button[aria-controls="menu-movil"]');

      await page.goto(origin + "/", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        window.scrollTo(0, 700);
        document.querySelector('a[href="/servicios"]')?.click();
      });
      await page.waitForFunction(
        () => location.pathname === "/servicios" && window.scrollY < 5
      );
      console.log("✓ mobile  interacciones mapa, menú y scroll por ruta");

      await page.goto(origin + "/contacto", { waitUntil: "domcontentloaded" });
      const scheduleRows = await page.$$eval(
        "table tbody tr",
        rows => rows.length
      );
      if (scheduleRows !== 7)
        throw new Error(
          `La tabla de horarios tiene ${scheduleRows} filas; se esperaban 7`
        );
      console.log("✓ mobile  tabla de horarios");

      const contactChannels = await page.$$eval(
        "[data-contact-channel]",
        items =>
          items.map(item => item.textContent?.replace(/\s+/g, " ").trim())
      );
      if (contactChannels.length !== 3)
        throw new Error(
          `Contacto muestra ${contactChannels.length} canales; se esperaban 3`
        );
      console.log("✓ mobile  dos llamadas y un WhatsApp");

      await page.goto(origin + "/servicios", {
        waitUntil: "domcontentloaded",
      });
      await new Promise(resolve => setTimeout(resolve, 700));
      const carouselState = await page.$eval(
        "[data-services-carousel]",
        carousel => ({
          transform:
            carousel.querySelector('[data-slot="carousel-content"] > div')
              ?.style.transform || "",
          radius: parseFloat(
            getComputedStyle(
              carousel.querySelector("[data-services-carousel-viewport]")
            ).borderTopLeftRadius
          ),
        })
      );
      if (!carouselState.radius)
        throw new Error("El viewport del carrusel perdió los bordes redondos");
      await page.waitForFunction(
        transform =>
          document.querySelector(
            '[data-services-carousel] [data-slot="carousel-content"] > div'
          )?.style.transform !== transform,
        { timeout: 6_000 },
        carouselState.transform
      );
      console.log("✓ mobile  carrusel automático y bordes persistentes");

      await page.goto(origin + "/administracion", {
        waitUntil: "domcontentloaded",
      });
      await page.waitForSelector("h1", { timeout: 5_000 });
      await page.click("button");
      await page.waitForSelector("form", { timeout: 5_000 });
      const admin = await page.evaluate(() => ({
        title: document.title,
        fields: document.querySelectorAll("form [required]").length,
        pdf: [...document.querySelectorAll("button")].some(button =>
          /descargar pdf/i.test(button.textContent || "")
        ),
        word: [...document.querySelectorAll("button")].some(button =>
          /descargar word/i.test(button.textContent || "")
        ),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      }));
      if (
        admin.title !== "RX Castillo Digital | Administración EKG" ||
        admin.fields !== 14 ||
        !admin.pdf ||
        !admin.word ||
        admin.overflow > 1
      )
        throw new Error(
          `La herramienta administrativa no está completa: ${JSON.stringify(admin)}`
        );
      console.log("✓ mobile  administración EKG, PDF y Word");
    }
    if (runtimeErrors.length)
      throw new Error(`Errores del navegador: ${runtimeErrors.join(" | ")}`);
    await page.close();
  }
} finally {
  await browser.close();
}
