import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "./WhatsAppButton";

describe("buildWhatsAppUrl", () => {
  it("normalizes a configured phone number and preserves the message", () => {
    const url = buildWhatsAppUrl(
      "Hola RX Castillo Digital",
      "+52 319 123 4567"
    );
    expect(url).toBe(
      "https://wa.me/523191234567?text=Hola%20RX%20Castillo%20Digital"
    );
  });

  it("falls back to WhatsApp send when no number is configured", () => {
    const url = buildWhatsAppUrl("Necesito información", null);
    expect(url).toBe(
      "https://api.whatsapp.com/send?text=Necesito%20informaci%C3%B3n"
    );
  });
});
