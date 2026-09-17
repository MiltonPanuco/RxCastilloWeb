import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createMockContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Administrador RX",
      loginMethod: "oauth",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ponytail: Integration coverage needs DATABASE_URL; use a disposable test DB when CI provisions one.
describe.skipIf(!process.env.DATABASE_URL)("RX Castillo Digital - Content Procedures", () => {
  it("fetches global content and settings package without errors", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const data = await caller.content.getAll();
    expect(data).toBeDefined();
    expect(data.services.length).toBeGreaterThanOrEqual(1);
    expect(data.coverageAreas.length).toBeGreaterThanOrEqual(1);
    expect(data.faqs.length).toBeGreaterThanOrEqual(1);
    expect(data.statistics.length).toBeGreaterThanOrEqual(1);
    expect(data.settings?.businessName).toBe("RX Castillo Digital");
  });

  it("retrieves services list and excludes dental x-rays", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const services = await caller.content.getServices();
    const xrayService = services.find((s) => s.slug === "radiografias-digitales");
    expect(xrayService).toBeDefined();
    expect(xrayService?.featuresJson).toContain("No realizamos radiografías dentales");
  });
});
