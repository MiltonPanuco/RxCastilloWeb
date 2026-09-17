import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  contactInquiries,
  coverageAreas,
  faqs,
  services,
  siteSettings,
  statistics,
} from "../drizzle/schema";
import { getDb, seedInitialDataIfNeeded } from "./db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  content: router({
    // Get full site package for fast frontend hydration
    getAll: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) {
        throw new Error("Database not connected");
      }

      const [settingsList, servicesList, coverageList, statsList, faqsList] = await Promise.all([
        db.select().from(siteSettings).limit(1),
        db.select().from(services).where(eq(services.active, true)).orderBy(services.order),
        db.select().from(coverageAreas).where(eq(coverageAreas.active, true)).orderBy(coverageAreas.order),
        db.select().from(statistics).where(eq(statistics.active, true)).orderBy(statistics.order),
        db.select().from(faqs).where(eq(faqs.active, true)).orderBy(faqs.order),
      ]);

      return {
        settings: settingsList[0] || null,
        services: servicesList,
        coverageAreas: coverageList,
        statistics: statsList,
        faqs: faqsList,
      };
    }),

    getSettings: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) return null;
      const list = await db.select().from(siteSettings).limit(1);
      return list[0] || null;
    }),

    getServices: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) return [];
      return db.select().from(services).where(eq(services.active, true)).orderBy(services.order);
    }),

    getServiceBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        await seedInitialDataIfNeeded();
        const db = await getDb();
        if (!db) return null;
        const res = await db.select().from(services).where(eq(services.slug, input.slug)).limit(1);
        return res[0] || null;
      }),

    getCoverage: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) return [];
      return db.select().from(coverageAreas).where(eq(coverageAreas.active, true)).orderBy(coverageAreas.order);
    }),

    getFaqs: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) return [];
      return db.select().from(faqs).where(eq(faqs.active, true)).orderBy(faqs.order);
    }),

    getStatistics: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) return [];
      return db.select().from(statistics).where(eq(statistics.active, true)).orderBy(statistics.order);
    }),

    // Contact Form submission
    submitInquiry: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Ingresa tu nombre completo"),
          phone: z.string().min(8, "Ingresa un número telefónico válido"),
          locality: z.string().min(2, "Especifica tu localidad"),
          serviceRequired: z.string().min(2, "Selecciona el servicio"),
          message: z.string().optional().default(""),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Base de datos no disponible");

        await db.insert(contactInquiries).values({
          name: input.name,
          phone: input.phone,
          locality: input.locality,
          serviceRequired: input.serviceRequired,
          message: input.message,
        });

        return {
          success: true,
          message: "Mensaje recibido correctamente.",
        };
      }),
  }),

  // Admin CMS router (accessible for live site management)
  admin: router({
    getOverview: publicProcedure.query(async () => {
      await seedInitialDataIfNeeded();
      const db = await getDb();
      if (!db) throw new Error("Database offline");

      const [settings, servicesList, coverageList, faqsList, statsList, inquiriesList] =
        await Promise.all([
          db.select().from(siteSettings).limit(1),
          db.select().from(services).orderBy(services.order),
          db.select().from(coverageAreas).orderBy(coverageAreas.order),
          db.select().from(faqs).orderBy(faqs.order),
          db.select().from(statistics).orderBy(statistics.order),
          db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)).limit(50),
        ]);

      return {
        settings: settings[0] || null,
        services: servicesList,
        coverageAreas: coverageList,
        faqs: faqsList,
        statistics: statsList,
        inquiries: inquiriesList,
      };
    }),

    updateSettings: publicProcedure
      .input(
        z.object({
          businessName: z.string(),
          legalName: z.string().optional(),
          primarySlogan: z.string(),
          secondarySlogan: z.string(),
          whatsappNumber: z.string(),
          phoneNumber: z.string(),
          email: z.string(),
          officeAddress: z.string(),
          availabilityText: z.string(),
          nightShiftNotice: z.string(),
          pacsSoftware: z.string().optional(),
          facebookUrl: z.string().optional(),
          instagramUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");

        const existing = await db.select().from(siteSettings).limit(1);
        if (existing.length > 0) {
          await db
            .update(siteSettings)
            .set({
              ...input,
            })
            .where(eq(siteSettings.id, existing[0].id));
        } else {
          await db.insert(siteSettings).values(input);
        }
        return { success: true };
      }),

    updateService: publicProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string(),
          shortDescription: z.string(),
          fullDescription: z.string(),
          imageUrl: z.string(),
          iconName: z.string(),
          featuresJson: z.string(),
          studyTypesJson: z.string().optional(),
          active: z.boolean(),
          order: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");

        await db
          .update(services)
          .set({
            title: input.title,
            shortDescription: input.shortDescription,
            fullDescription: input.fullDescription,
            imageUrl: input.imageUrl,
            iconName: input.iconName,
            featuresJson: input.featuresJson,
            studyTypesJson: input.studyTypesJson || null,
            active: input.active,
            order: input.order,
          })
          .where(eq(services.id, input.id));

        return { success: true };
      }),

    updateFaq: publicProcedure
      .input(
        z.object({
          id: z.number().optional(),
          question: z.string(),
          answer: z.string(),
          order: z.number().default(0),
          active: z.boolean().default(true),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");

        if (input.id) {
          await db
            .update(faqs)
            .set({
              question: input.question,
              answer: input.answer,
              order: input.order,
              active: input.active,
            })
            .where(eq(faqs.id, input.id));
        } else {
          await db.insert(faqs).values({
            question: input.question,
            answer: input.answer,
            order: input.order,
            active: input.active,
          });
        }
        return { success: true };
      }),

    deleteFaq: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");
        await db.delete(faqs).where(eq(faqs.id, input.id));
        return { success: true };
      }),

    updateCoverageArea: publicProcedure
      .input(
        z.object({
          id: z.number().optional(),
          name: z.string(),
          state: z.string().default("Nayarit"),
          description: z.string(),
          badgeText: z.string().optional(),
          order: z.number().default(0),
          active: z.boolean().default(true),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");

        if (input.id) {
          await db
            .update(coverageAreas)
            .set({
              name: input.name,
              state: input.state,
              description: input.description,
              badgeText: input.badgeText,
              order: input.order,
              active: input.active,
            })
            .where(eq(coverageAreas.id, input.id));
        } else {
          await db.insert(coverageAreas).values({
            name: input.name,
            state: input.state,
            description: input.description,
            badgeText: input.badgeText,
            order: input.order,
            active: input.active,
          });
        }
        return { success: true };
      }),

    updateStatistic: publicProcedure
      .input(
        z.object({
          id: z.number(),
          value: z.string(),
          suffix: z.string().optional(),
          label: z.string(),
          description: z.string(),
          active: z.boolean(),
          order: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database offline");

        await db
          .update(statistics)
          .set({
            value: input.value,
            suffix: input.suffix || "",
            label: input.label,
            description: input.description,
            active: input.active,
            order: input.order,
          })
          .where(eq(statistics.id, input.id));

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
