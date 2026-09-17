import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  FACEBOOK_URL,
  fallbackContent,
  type SiteContent,
} from "./siteContent";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";
const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION?.trim() || "2026-09-16";

export const sanityConfigured = Boolean(projectId);
const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
const imageBuilder = client ? imageUrlBuilder(client) : null;

const query = `{
  "settings": *[_id == "site-settings"][0],
  "home": *[_id == "page-home"][0],
  "servicesPage": *[_id == "page-services"][0],
  "aboutPage": *[_id == "page-about"][0],
  "coveragePage": *[_id == "page-coverage"][0],
  "contactPage": *[_id == "page-contact"][0],
  "privacyPage": *[_id == "page-privacy"][0],
  "termsPage": *[_id == "page-terms"][0],
  "services": *[_type == "service" && active != false && slug.current in ["radiografias-digitales", "electrocardiogramas"]] | order(order asc),
  "coverage": *[_type == "coverageArea" && active != false] | order(order asc),
  "faqs": *[_type == "faq" && active != false] | order(order asc),
  "statistics": *[_type == "statistic" && active != false] | order(order asc)
}`;

function imageValue(value: any, fallback: { url: string; alt: string }) {
  if (!value?.asset || !imageBuilder) return fallback;
  return {
    url: imageBuilder.image(value).auto("format").fit("max").url(),
    alt: value.alt || fallback.alt,
  };
}

function clean<T extends Record<string, any>>(
  value: T | null | undefined
): Partial<T> {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([key, item]) =>
        !key.startsWith("_") && item !== null && item !== undefined
    )
  ) as Partial<T>;
}

function mergePage<T extends Record<string, any>>(fallback: T, remote: any): T {
  const merged = { ...fallback, ...clean(remote) } as T;
  if (remote?.hero)
    (merged as any).hero = {
      ...(fallback as any).hero,
      ...clean(remote.hero),
      image: imageValue(remote.hero.image, (fallback as any).hero.image),
    };
  if (remote?.storyImage && "storyImage" in fallback)
    (merged as any).storyImage = imageValue(
      remote.storyImage,
      (fallback as any).storyImage
    );
  return merged;
}

export async function loadSiteContent(): Promise<SiteContent> {
  if (!client) return fallbackContent;
  const remote = await client.fetch<any>(
    query,
    {},
    { tag: "rx-castillo.website" }
  );
  const contact = {
    ...fallbackContent.settings.contact,
    ...clean(remote.settings?.contact),
    facebook: FACEBOOK_URL,
  };
  contact.phone = contact.phone || contact.phones?.[0] || "";
  const settings = {
    ...fallbackContent.settings,
    ...clean(remote.settings),
    contact,
  };
  const services = remote.services?.length
    ? remote.services.map((item: any) => {
        const slug = item.slug?.current || item.slug;
        const fallback =
          fallbackContent.services.find(service => service.slug === slug) ||
          fallbackContent.services[0];
        return {
          ...fallback,
          ...clean(item),
          slug,
          image: imageValue(item.image, fallback.image),
        };
      })
    : fallbackContent.services;
  return {
    settings,
    home: mergePage(fallbackContent.home, remote.home),
    servicesPage: mergePage(fallbackContent.servicesPage, remote.servicesPage),
    aboutPage: mergePage(fallbackContent.aboutPage, remote.aboutPage),
    coveragePage: mergePage(fallbackContent.coveragePage, remote.coveragePage),
    contactPage: mergePage(fallbackContent.contactPage, remote.contactPage),
    privacyPage: mergePage(fallbackContent.privacyPage, remote.privacyPage),
    termsPage: mergePage(fallbackContent.termsPage, remote.termsPage),
    services,
    coverage: remote.coverage?.length
      ? remote.coverage.map((item: any) => ({ ...clean(item), _id: item._id }))
      : fallbackContent.coverage,
    faqs: remote.faqs?.length
      ? remote.faqs.map((item: any) => ({ ...clean(item), _id: item._id }))
      : fallbackContent.faqs,
    statistics: remote.statistics?.length
      ? remote.statistics.map((item: any) => ({
          ...clean(item),
          _id: item._id,
        }))
      : fallbackContent.statistics,
  };
}
