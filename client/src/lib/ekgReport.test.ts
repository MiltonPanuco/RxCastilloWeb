import { describe, expect, it } from "vitest";
import { parseEkgRows, safeReportFilename } from "./ekgReport";

describe("generador EKG", () => {
  it("extrae los campos principales de una hoja representativa", () => {
    const result = parseEkgRows([
      ["Paciente:", "María López", "Edad: 65 años"],
      ["Fecha", "17/09/2026"],
      ["Ritmo", "Sinusal"],
      ["Frecuencia", "72 lpm"],
      ["Onda P", "Normal"],
      ["Eje QRS", "45°"],
      ["Eje T", "30°"],
      ["Eje P", "50°"],
      ["Intervalo PR", "160 ms"],
      ["Complejo QRS", "90 ms"],
      ["Intervalo QT", "400 ms"],
      ["Interpretación de prueba"],
      ["Conclusiones: Sin cambios relevantes"],
    ]);

    expect(result).toMatchObject({
      PACIENTE: "MARÍA LÓPEZ",
      EDAD: "65 AÑOS",
      FECHA: "17/09/2026",
      RITMO: "Sinusal",
      FRECUENCIA: "72 lpm",
      INTERPRETACION: "Interpretación de prueba",
      CONCLUSION: "Sin cambios relevantes",
    });
    expect(safeReportFilename("María López")).toBe("Maria_Lopez");
  });
});
