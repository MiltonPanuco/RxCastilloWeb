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
        ) => {
          async: {
            (type: "string"): Promise<string>;
            (type: "uint8array"): Promise<Uint8Array>;
          };
        } | null;
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

type PdfTemplateAssets = { background: string; signature: string };
let pdfAssetsPromise: Promise<PdfTemplateAssets> | null = null;

function bytesToDataUrl(bytes: Uint8Array, mimeType: string) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(new Blob([bytes as BlobPart], { type: mimeType }));
  });
}

function loadPdfTemplateAssets() {
  pdfAssetsPromise ??= (async () => {
    await loadEkgAssets();
    if (!window.JSZip || !window.RX_EKG_TEMPLATE) {
      throw new Error("La plantilla Word no está disponible.");
    }
    const zip = await window.JSZip.loadAsync(
      base64ToBytes(window.RX_EKG_TEMPLATE)
    );
    const backgroundFile = zip.file("word/media/image1.png");
    const signatureFile = zip.file("word/media/image2.jpeg");
    if (!backgroundFile || !signatureFile) {
      throw new Error("La plantilla Word no contiene sus imágenes originales.");
    }
    const [background, signature] = await Promise.all([
      backgroundFile.async("uint8array"),
      signatureFile.async("uint8array"),
    ]);
    return {
      background: await bytesToDataUrl(background, "image/png"),
      signature: await bytesToDataUrl(signature, "image/jpeg"),
    };
  })();
  return pdfAssetsPromise;
}

export async function downloadEkgPdf(values: EkgValues) {
  const assets = await loadPdfTemplateAssets();
  const document = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const tableX = 53.4;
  const tableY = 84.7;
  const tableWidth = 108.9;
  const columnWidth = tableWidth / 2;
  const rowHeight = 6.75;
  const rowBaselines = [88.9, 95.6, 102.4, 109.1, 115.9, 122.7, 129.5];
  const tableLabels = [
    "Ritmo",
    "Frecuencia Cardiaca",
    "Eje eléctrico de QRS T y P",
    "Onda P",
    "Intervalo PR",
    "Complejo QRS",
    "Intervalo QT",
  ];
  const tableCenter = 135.3;

  document.addImage(
    assets.background,
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight,
    undefined,
    "FAST"
  );
  document.setTextColor(0, 0, 0);
  document.setFont("helvetica", "bold");
  document.setFontSize(12);
  document.text("PACIENTE:", 25.4, 58.8);
  document.text("A QUIEN CORRESPONDA", 127.7, 58.8);
  document.text("EDAD:", 25.4, 70.4);
  document.text("ESTUDIO: ELECTROCARDIOGRAMA", 25.4, 76.7);
  document.text("FECHA", 127.7, 70.4);

  const fittedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    align: "left" | "center" = "left"
  ) => {
    let fontSize = 12;
    document.setFont("helvetica", "bold");
    document.setFontSize(fontSize);
    while (fontSize > 7 && document.getTextWidth(text) > maxWidth) {
      fontSize -= 0.5;
      document.setFontSize(fontSize);
    }
    document.text(text, x, y, { align });
  };

  fittedText(values.PACIENTE, 25.4, 64.8, 88);
  fittedText(values.EDAD, 40.5, 70.4, 34);
  fittedText(values.FECHA, 144.5, 70.4, 41);

  document.setLineWidth(0.18);
  document.setDrawColor(0, 0, 0);
  for (let row = 0; row < 7; row += 1) {
    document.setFillColor(166, 166, 166);
    document.rect(
      tableX,
      tableY + row * rowHeight,
      columnWidth,
      rowHeight,
      "FD"
    );
    document.setFillColor(217, 217, 217);
    document.rect(
      tableX + columnWidth,
      tableY + row * rowHeight,
      columnWidth,
      rowHeight,
      "FD"
    );
    fittedText(
      tableLabels[row],
      tableX + columnWidth / 2,
      rowBaselines[row],
      columnWidth - 3,
      "center"
    );
  }

  const tableValues = [
    values.RITMO,
    values.FRECUENCIA,
    `QRS: ${values.EJE_QRS} / T: ${values.EJE_T} / P: ${values.EJE_P}`,
    values.ONDA_P,
    values.PR,
    values.QRS,
    values.QT,
  ];
  tableValues.forEach((value, index) => {
    fittedText(
      value,
      tableCenter,
      rowBaselines[index],
      columnWidth - 3,
      "center"
    );
  });

  let page = 1;
  let y = 148;
  const addBlankPage = () => {
    document.addPage("letter", "portrait");
    page += 1;
    y = 25.4;
  };
  const writeLines = (
    text: string,
    fontSize: number,
    bold: boolean,
    lineHeight: number
  ) => {
    document.setFont("helvetica", bold ? "bold" : "normal");
    document.setFontSize(fontSize);
    document.setTextColor(0, 0, 0);
    const lines = document.splitTextToSize(text, 165) as string[];
    for (const line of lines) {
      const limit = page === 1 ? 190 : 250;
      if (y + lineHeight > limit) addBlankPage();
      document.text(line, 25.4, y);
      y += lineHeight;
    }
  };

  writeLines(values.INTERPRETACION, 13, false, 5.6);
  y += 7;
  if (y + 12 > (page === 1 ? 190 : 250)) addBlankPage();
  document.setFont("helvetica", "bold");
  document.setFontSize(13);
  document.text("Conclusiones:", 25.4, y);
  y += 8;
  writeLines(values.CONCLUSION, 12, true, 5.3);
  y += 1;

  if (y + 48 > (page === 1 ? 252 : 265)) addBlankPage();
  const signatureWidth = 41;
  const signatureHeight = 23.2;
  document.addImage(
    assets.signature,
    "JPEG",
    (pageWidth - signatureWidth) / 2,
    y,
    signatureWidth,
    signatureHeight,
    undefined,
    "FAST"
  );
  y += signatureHeight + 9;
  document.setFont("helvetica", "bold");
  document.setFontSize(12);
  document.text("DR. ALEJANDRO VALADEZ JASSO", pageWidth / 2, y, {
    align: "center",
  });
  y += 10;
  document.text("CARDIOLOGO CLINICO E INTERVENCIONISTA", pageWidth / 2, y, {
    align: "center",
  });

  const blob = document.output("blob");
  downloadBlob(blob, `EKG_${safeReportFilename(values.PACIENTE)}.pdf`);
  return blob;
}
