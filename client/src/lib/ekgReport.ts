import { jsPDF } from "jspdf";

export const EKG_FIELD_NAMES = [
  "PACIENTE",
  "EDAD",
  "FECHA",
  "RITMO",
  "FRECUENCIA",
  "ONDA_P",
  "EJE_QRS",
  "EJE_T",
  "EJE_P",
  "PR",
  "QRS",
  "QT",
  "INTERPRETACION",
  "CONCLUSION",
] as const;

export type EkgFieldName = (typeof EKG_FIELD_NAMES)[number];
export type EkgValues = Record<EkgFieldName, string>;

export const EMPTY_EKG_VALUES = Object.fromEntries(
  EKG_FIELD_NAMES.map(name => [name, ""])
) as EkgValues;

type Spreadsheet = {
  SheetNames: string[];
  Sheets: Record<string, unknown>;
};

declare global {
  interface Window {
    XLSX?: {
      read: (data: Uint8Array, options: { type: "array" }) => Spreadsheet;
      utils: {
        sheet_to_json: (
          sheet: unknown,
          options: { header: 1; raw: false; defval: string }
        ) => unknown[][];
      };
    };
    JSZip?: {
      loadAsync: (data: Uint8Array) => Promise<{
        file: (
          path: string,
          content?: string
        ) => { async: (type: "string") => Promise<string> } | null;
        generateAsync: (options: {
          type: "blob";
          mimeType: string;
        }) => Promise<Blob>;
      }>;
    };
    RX_EKG_TEMPLATE?: string;
  }
}

function normalize(value: unknown) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isBlankRow(row: unknown[]) {
  return !row || row.every(cell => String(cell || "").trim() === "");
}

function firstNonEmpty(row: unknown[], fromIndex: number) {
  for (let index = fromIndex; index < row.length; index += 1) {
    const value = String(row[index] || "").trim();
    if (value) return { value, index };
  }
  return null;
}

function findLabelRow(
  rows: unknown[][],
  matcher: (normalized: string) => boolean
) {
  for (let row = 0; row < rows.length; row += 1) {
    for (let column = 0; column < rows[row].length; column += 1) {
      const raw = String(rows[row][column] || "");
      if (matcher(normalize(raw))) return { row, column, raw };
    }
  }
  return null;
}

export function parseEkgRows(rows: unknown[][]): Partial<EkgValues> {
  const data: Partial<EkgValues> = {};
  const patient = findLabelRow(rows, value => value.includes("paciente"));
  if (patient) {
    const match = patient.raw.match(/paciente\s*:?\s*(.*)/i);
    let name = match?.[1]?.trim() || "";
    if (!name) {
      name = firstNonEmpty(rows[patient.row], patient.column + 1)?.value || "";
    }
    data.PACIENTE = name.replace(/[:\s]+$/, "").toUpperCase();
  }

  const date = findLabelRow(rows, value => value.includes("fecha"));
  if (date) {
    const next = firstNonEmpty(rows[date.row], date.column + 1);
    if (next) data.FECHA = next.value.split(" ")[0];
  }

  for (const row of rows) {
    for (const cell of row) {
      const match = String(cell || "").match(/(\d{1,3})\s*a[nñ]os/i);
      if (match) {
        data.EDAD = `${match[1]} AÑOS`;
        break;
      }
    }
    if (data.EDAD) break;
  }

  const labels: Array<{
    key: EkgFieldName;
    test: (value: string) => boolean;
  }> = [
    { key: "RITMO", test: value => value.startsWith("ritmo") },
    { key: "FRECUENCIA", test: value => value.includes("frecuencia") },
    {
      key: "EJE_QRS",
      test: value => value.includes("eje") && value.includes("qrs"),
    },
    {
      key: "EJE_T",
      test: value =>
        value.includes("eje") &&
        (value.includes(" t") || value.endsWith("t")) &&
        !value.includes("qrs"),
    },
    {
      key: "EJE_P",
      test: value =>
        value.includes("eje") &&
        value.includes("p") &&
        !value.includes("qrs") &&
        !value.includes(" t"),
    },
    { key: "ONDA_P", test: value => value.includes("onda") },
    {
      key: "PR",
      test: value => value.includes("intervalo pr") || value === "pr",
    },
    {
      key: "QRS",
      test: value => value.includes("complejo") && value.includes("qrs"),
    },
    {
      key: "QT",
      test: value => value.includes("intervalo qt") || value === "qt",
    },
  ];

  let lastLabelRow = -1;
  rows.forEach((row, rowIndex) => {
    const first = firstNonEmpty(row, 0);
    if (!first) return;
    const normalized = normalize(first.value);
    for (const label of labels) {
      if (data[label.key] !== undefined || !label.test(normalized)) continue;
      const value = firstNonEmpty(row, first.index + 1);
      if (value) {
        data[label.key] = value.value;
        lastLabelRow = Math.max(lastLabelRow, rowIndex);
      }
    }
  });

  const conclusion = findLabelRow(rows, value => value.includes("conclusion"));
  let interpretationEnd = rows.length;
  if (conclusion) {
    interpretationEnd = conclusion.row;
    const inline = conclusion.raw
      .replace(/^.*conclusiones\s*:?\s*/i, "")
      .trim();
    const pieces = inline ? [inline] : [];
    for (let row = conclusion.row + 1; row < rows.length; row += 1) {
      if (isBlankRow(rows[row])) break;
      const value = firstNonEmpty(rows[row], 0);
      if (value) pieces.push(value.value.trim());
    }
    data.CONCLUSION = pieces.join(" ").replace(/\s+/g, " ").trim();
  }

  if (lastLabelRow >= 0) {
    const pieces: string[] = [];
    for (let row = lastLabelRow + 1; row < interpretationEnd; row += 1) {
      if (isBlankRow(rows[row])) continue;
      const value = firstNonEmpty(rows[row], 0);
      if (value) pieces.push(value.value.trim());
    }
    data.INTERPRETACION = pieces.join(" ").replace(/\s+/g, " ").trim();
  }

  return data;
}

let assetsPromise: Promise<void> | null = null;

function scriptLoaded(source: string) {
  return Array.from(document.scripts).some(
    script =>
      script.dataset.ekgSource === source && script.dataset.loaded === "true"
  );
}

function loadScript(source: string, ready: () => boolean) {
  if (ready()) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.async = true;
    script.dataset.ekgSource = source;
    script.onload = () => {
      script.dataset.loaded = "true";
      ready() ? resolve() : reject(new Error(`No se cargó ${source}`));
    };
    script.onerror = () => reject(new Error(`No se pudo cargar ${source}`));
    document.head.appendChild(script);
  });
}

export function loadEkgAssets() {
  assetsPromise ??= (async () => {
    await Promise.all([
      loadScript("/admin-assets/lib/jszip.min.js", () => Boolean(window.JSZip)),
      loadScript("/admin-assets/lib/xlsx.min.js", () => Boolean(window.XLSX)),
    ]);
    await loadScript("/admin-assets/template-data.js", () =>
      scriptLoaded("/admin-assets/template-data.js")
    );
    await loadScript("/admin-assets/template-bridge.js", () =>
      Boolean(window.RX_EKG_TEMPLATE)
    );
  })();
  return assetsPromise;
}

export async function parseEkgWorkbook(buffer: ArrayBuffer) {
  await loadEkgAssets();
  if (!window.XLSX) throw new Error("El lector de Excel no está disponible.");
  const workbook = window.XLSX.read(new Uint8Array(buffer), { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = window.XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: "",
  });
  return parseEkgRows(rows);
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r?\n/g, " ");
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export function safeReportFilename(patient: string) {
  return (
    patient
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_") || "paciente"
  );
}

export async function generateEkgDocx(values: EkgValues) {
  await loadEkgAssets();
  if (!window.JSZip || !window.RX_EKG_TEMPLATE) {
    throw new Error("La plantilla Word no está disponible.");
  }
  const zip = await window.JSZip.loadAsync(
    base64ToBytes(window.RX_EKG_TEMPLATE)
  );
  const documentFile = zip.file("word/document.xml");
  if (!documentFile) throw new Error("La plantilla Word no es válida.");
  let xml = await documentFile.async("string");
  const tokens: Record<string, string> = {
    "@@PACIENTE@@": values.PACIENTE,
    "@@EDAD@@": values.EDAD,
    "@@FECHA@@": values.FECHA,
    "@@RITMO@@": values.RITMO,
    "@@FRECUENCIA@@": values.FRECUENCIA,
    "@@EJES@@": `QRS: ${values.EJE_QRS} / T: ${values.EJE_T} / P: ${values.EJE_P}`,
    "@@ONDA_P@@": values.ONDA_P,
    "@@PR@@": values.PR,
    "@@QRS@@": values.QRS,
    "@@QT@@": values.QT,
    "@@INTERPRETACION@@": values.INTERPRETACION,
    "@@CONCLUSION@@": values.CONCLUSION,
  };
  Object.entries(tokens).forEach(([token, value]) => {
    xml = xml.split(token).join(xmlEscape(value));
  });
  zip.file("word/document.xml", xml);
  return zip.generateAsync({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function downloadEkgPdf(values: EkgValues) {
  const document = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const header = () => {
    document.setFillColor(9, 40, 66);
    document.rect(0, 0, pageWidth, 34, "F");
    document.setTextColor(255, 255, 255);
    document.setFont("helvetica", "bold");
    document.setFontSize(15);
    document.text("RX CASTILLO DIGITAL", margin, 14);
    document.setFont("helvetica", "normal");
    document.setFontSize(9);
    document.text("Reporte de electrocardiograma", margin, 21);
    document.setDrawColor(212, 175, 55);
    document.setLineWidth(0.8);
    document.line(margin, 27, pageWidth - margin, 27);
    y = 44;
  };

  const ensureSpace = (height: number) => {
    if (y + height <= pageHeight - 18) return;
    document.addPage();
    header();
  };

  const sectionTitle = (title: string) => {
    ensureSpace(13);
    document.setTextColor(26, 68, 108);
    document.setFont("helvetica", "bold");
    document.setFontSize(9);
    document.text(title.toUpperCase(), margin, y);
    document.setDrawColor(212, 175, 55);
    document.line(margin, y + 2.5, pageWidth - margin, y + 2.5);
    y += 9;
  };

  const row = (label: string, value: string) => {
    const lines = document.splitTextToSize(value || "—", contentWidth - 48);
    const height = Math.max(9, lines.length * 5 + 4);
    ensureSpace(height);
    document.setFontSize(9.5);
    document.setFont("helvetica", "bold");
    document.setTextColor(22, 58, 89);
    document.text(label, margin, y + 4);
    document.setFont("helvetica", "normal");
    document.setTextColor(74, 85, 104);
    document.text(lines, margin + 48, y + 4);
    document.setDrawColor(219, 226, 233);
    document.line(margin, y + height - 1, pageWidth - margin, y + height - 1);
    y += height;
  };

  const paragraph = (title: string, value: string) => {
    sectionTitle(title);
    const lines = document.splitTextToSize(value || "—", contentWidth);
    document.setFont("helvetica", "normal");
    document.setFontSize(10);
    document.setTextColor(74, 85, 104);
    for (const line of lines) {
      ensureSpace(6);
      document.text(line, margin, y);
      y += 5.5;
    }
    y += 5;
  };

  header();
  sectionTitle("Paciente");
  row("Nombre", values.PACIENTE);
  row("Edad", values.EDAD);
  row("Fecha", values.FECHA);
  y += 4;
  sectionTitle("Parámetros del EKG");
  row("Ritmo", values.RITMO);
  row("Frecuencia", values.FRECUENCIA);
  row("Onda P", values.ONDA_P);
  row(
    "Ejes",
    `QRS: ${values.EJE_QRS} / T: ${values.EJE_T} / P: ${values.EJE_P}`
  );
  row("Intervalo PR", values.PR);
  row("Complejo QRS", values.QRS);
  row("Intervalo QT", values.QT);
  y += 4;
  paragraph("Interpretación", values.INTERPRETACION);
  paragraph("Conclusiones", values.CONCLUSION);

  const pages = document.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    document.setPage(page);
    document.setFont("helvetica", "normal");
    document.setFontSize(8);
    document.setTextColor(110, 120, 132);
    document.text(
      `RX Castillo Digital · Página ${page} de ${pages}`,
      margin,
      pageHeight - 9
    );
  }

  document.save(`EKG_${safeReportFilename(values.PACIENTE)}.pdf`);
}
