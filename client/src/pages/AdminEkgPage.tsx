import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";
import { Link } from "wouter";
import { BrandLogo } from "../components/BrandLogo";
import {
  EKG_FIELD_NAMES,
  EMPTY_EKG_VALUES,
  downloadBlob,
  downloadEkgPdf,
  generateEkgDocx,
  parseEkgWorkbook,
  safeReportFilename,
  type EkgFieldName,
  type EkgValues,
} from "../lib/ekgReport";

const parameterFields: Array<{ name: EkgFieldName; label: string }> = [
  { name: "RITMO", label: "Ritmo" },
  { name: "FRECUENCIA", label: "Frecuencia cardiaca" },
  { name: "ONDA_P", label: "Onda P" },
  { name: "EJE_QRS", label: "Eje QRS" },
  { name: "EJE_T", label: "Eje de T" },
  { name: "EJE_P", label: "Eje P" },
  { name: "PR", label: "Intervalo PR" },
  { name: "QRS", label: "Complejo QRS" },
  { name: "QT", label: "Intervalo QT" },
];

type Status = { kind: "neutral" | "success" | "error"; text: string } | null;

export default function AdminEkgPage() {
  const [values, setValues] = useState<EkgValues>({ ...EMPTY_EKG_VALUES });
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState("");
  const [parseMessage, setParseMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState<"word" | "pdf" | "read" | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = "RX Castillo Digital | Administración EKG";
    window.scrollTo({ top: 0 });
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    if (!showForm) return;
    window.setTimeout(
      () => formSectionRef.current?.scrollIntoView({ behavior: "smooth" }),
      80
    );
  }, [showForm]);

  const updateField = (name: EkgFieldName, value: string) =>
    setValues(current => ({ ...current, [name]: value }));

  const readFile = async (file?: File) => {
    if (!file) return;
    if (!/\.xlsx?$/i.test(file.name)) {
      setStatus({ kind: "error", text: "Selecciona un archivo .xls o .xlsx." });
      return;
    }
    setBusy("read");
    setStatus({ kind: "neutral", text: "Leyendo el archivo…" });
    setFileName(file.name);
    try {
      const parsed = await parseEkgWorkbook(await file.arrayBuffer());
      setValues(current => ({ ...current, ...parsed }));
      const missing = EKG_FIELD_NAMES.filter(name => !parsed[name]);
      setParseMessage(
        missing.length
          ? `Revisa o completa: ${missing.join(", ")}.`
          : "Todos los campos fueron identificados. Revísalos antes de descargar."
      );
      setShowForm(true);
      setStatus({ kind: "success", text: "Excel procesado correctamente." });
    } catch (error) {
      console.error(error);
      setParseMessage(
        "No fue posible leer todos los datos. Puedes capturarlos manualmente."
      );
      setShowForm(true);
      setStatus({ kind: "error", text: "No se pudo interpretar el Excel." });
    } finally {
      setBusy(null);
    }
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    void readFile(event.dataTransfer.files[0]);
  };

  const validate = () => {
    if (formRef.current?.reportValidity()) return true;
    setStatus({ kind: "error", text: "Completa los campos obligatorios." });
    return false;
  };

  const downloadWord = async () => {
    if (!validate()) return;
    setBusy("word");
    setStatus({ kind: "neutral", text: "Preparando el documento Word…" });
    try {
      const blob = await generateEkgDocx(values);
      downloadBlob(blob, `EKG_${safeReportFilename(values.PACIENTE)}.docx`);
      setStatus({ kind: "success", text: "Documento Word descargado." });
    } catch (error) {
      console.error(error);
      setStatus({
        kind: "error",
        text: "No se pudo generar el documento Word.",
      });
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    if (!validate()) return;
    setBusy("pdf");
    setStatus({ kind: "neutral", text: "Preparando el archivo PDF…" });
    try {
      await downloadEkgPdf(values);
      setStatus({ kind: "success", text: "Archivo PDF descargado." });
    } catch (error) {
      console.error(error);
      setStatus({ kind: "error", text: "No se pudo generar el PDF." });
    } finally {
      setBusy(null);
    }
  };

  const restart = () => {
    setValues({ ...EMPTY_EKG_VALUES });
    setShowForm(false);
    setFileName("");
    setParseMessage("");
    setStatus(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f6f4ee] text-[#163a59]">
      <header className="border-b border-white/10 bg-[#092842] text-white">
        <div className="container flex min-h-20 items-center justify-between gap-5 py-4">
          <BrandLogo className="h-11" showName={false} />
          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f5e9bd]">
              Herramienta interna
            </p>
            <p className="mt-1 text-sm text-white/65">Administración · EKG</p>
          </div>
        </div>
      </header>

      <main className="container py-10 sm:py-14 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1a446c] transition hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al sitio
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <aside>
            <p className="eyebrow">Reportes EKG</p>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.02] tracking-[-.05em] sm:text-5xl">
              Genera el reporte en Word o PDF.
            </h1>
            <p className="mt-6 max-w-md leading-7 text-[#4a5568]">
              Carga el Excel del estudio, confirma la información y descarga el
              documento en el formato que necesites.
            </p>
            <div className="mt-8 flex items-start gap-3 border-t border-[#c7d2dc] pt-6 text-sm leading-6 text-[#4a5568]">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1a446c]" />
              <p>
                Todo se procesa en este navegador. Los datos y archivos no se
                envían a un servidor.
              </p>
            </div>
          </aside>

          <section className="rounded-[1.25rem] border border-[#dbe2e9] bg-white p-6 shadow-[0_20px_60px_rgba(9,40,66,.07)] sm:p-9">
            <StepHeader
              number="1"
              title="Carga el Excel del estudio"
              description="Formatos aceptados: .xls y .xlsx."
            />
            <label
              htmlFor="ekg-file"
              onDragEnter={event => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragOver={event => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`mt-7 flex cursor-pointer flex-col items-center border border-dashed px-6 py-12 text-center transition ${dragging ? "border-[#d4af37] bg-[#f6f4ee]" : "border-[#c7d2dc] hover:border-[#1a446c] hover:bg-[#f8fafc]"}`}
            >
              <UploadCloud className="h-8 w-8 text-[#1a446c]" />
              <span className="mt-4 font-bold">
                {busy === "read"
                  ? "Leyendo archivo…"
                  : "Arrastra el archivo o haz clic para elegirlo"}
              </span>
              <span className="mt-2 text-xs text-[#4a5568]">
                El archivo permanece en tu dispositivo
              </span>
              <input
                ref={fileInputRef}
                id="ekg-file"
                type="file"
                accept=".xls,.xlsx"
                className="sr-only"
                disabled={Boolean(busy)}
                onChange={event => void readFile(event.target.files?.[0])}
              />
            </label>
            {fileName && (
              <div className="mt-5 flex items-center gap-3 border-l-2 border-[#d4af37] pl-4 text-sm font-bold">
                <FileSpreadsheet className="h-5 w-5 text-[#1a446c]" />
                <span className="break-all">{fileName}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 text-sm font-bold text-[#1a446c] underline decoration-[#d4af37] underline-offset-4"
            >
              O captura los datos manualmente
            </button>
          </section>
        </div>

        {showForm && (
          <section
            ref={formSectionRef}
            className="mt-10 rounded-[1.25rem] border border-[#dbe2e9] bg-white p-6 shadow-[0_20px_60px_rgba(9,40,66,.07)] sm:p-9 lg:mt-14"
          >
            <div className="border-b border-[#dbe2e9] pb-7">
              <StepHeader
                number="2"
                title="Revisa los datos"
                description="Confirma la información antes de generar el reporte."
              />
              {parseMessage && (
                <p className="ml-[3.25rem] mt-3 text-xs font-bold text-[#8a6914]">
                  {parseMessage}
                </p>
              )}
            </div>

            <form
              ref={formRef}
              onSubmit={(event: FormEvent) => event.preventDefault()}
              className="mt-8"
            >
              <fieldset>
                <legend className="text-xs font-bold uppercase tracking-[.18em] text-[#1a446c]">
                  Paciente
                </legend>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <Field
                    name="PACIENTE"
                    label="Nombre completo"
                    value={values.PACIENTE}
                    onChange={updateField}
                    placeholder="Nombre del paciente"
                  />
                  <Field
                    name="EDAD"
                    label="Edad"
                    value={values.EDAD}
                    onChange={updateField}
                    placeholder="Ej. 65 AÑOS"
                  />
                  <Field
                    name="FECHA"
                    label="Fecha del estudio"
                    value={values.FECHA}
                    onChange={updateField}
                    placeholder="dd/mm/aaaa"
                  />
                </div>
              </fieldset>

              <fieldset className="mt-10 border-t border-[#dbe2e9] pt-8">
                <legend className="text-xs font-bold uppercase tracking-[.18em] text-[#1a446c]">
                  Parámetros del EKG
                </legend>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {parameterFields.map(field => (
                    <Field
                      key={field.name}
                      {...field}
                      value={values[field.name]}
                      onChange={updateField}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-10 border-t border-[#dbe2e9] pt-8">
                <legend className="text-xs font-bold uppercase tracking-[.18em] text-[#1a446c]">
                  Interpretación y conclusión
                </legend>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <TextAreaField
                    name="INTERPRETACION"
                    label="Interpretación"
                    value={values.INTERPRETACION}
                    onChange={updateField}
                  />
                  <TextAreaField
                    name="CONCLUSION"
                    label="Conclusiones"
                    value={values.CONCLUSION}
                    onChange={updateField}
                  />
                </div>
              </fieldset>

              <div className="mt-9 flex flex-col-reverse gap-3 border-t border-[#dbe2e9] pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold text-[#4a5568] transition hover:text-[#1a446c]"
                >
                  <RotateCcw className="h-4 w-4" /> Empezar de nuevo
                </button>
                <button
                  type="button"
                  onClick={() => void downloadPdf()}
                  disabled={Boolean(busy)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1a446c] px-6 text-sm font-bold text-[#1a446c] transition hover:bg-[#f6f4ee] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FileText className="h-4 w-4" />{" "}
                  {busy === "pdf" ? "Generando PDF…" : "Descargar PDF"}
                </button>
                <button
                  type="button"
                  onClick={() => void downloadWord()}
                  disabled={Boolean(busy)}
                  className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />{" "}
                  {busy === "word" ? "Generando Word…" : "Descargar Word"}
                </button>
              </div>
            </form>

            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-6 flex items-center gap-2 text-sm font-bold ${status.kind === "error" ? "text-[#a33a32]" : status.kind === "success" ? "text-[#26724a]" : "text-[#4a5568]"}`}
              >
                {status.kind === "success" && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {status.text}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-[#dbe2e9] py-8 text-center text-xs text-[#4a5568]">
        Herramienta interna de RX Castillo Digital
      </footer>
    </div>
  );
}

function StepHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1a446c] text-sm font-bold text-white">
        {number}
      </span>
      <div>
        <h2 className="text-xl font-bold tracking-[-.03em]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#4a5568]">{description}</p>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  value,
  placeholder,
  onChange,
}: {
  name: EkgFieldName;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (name: EkgFieldName, value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#163a59]">
      {label}
      <input
        name={name}
        value={value}
        required
        placeholder={placeholder}
        onChange={event => onChange(name, event.target.value)}
        className="min-h-12 rounded-[.55rem] border border-[#c7d2dc] bg-white px-4 font-normal outline-none transition placeholder:text-[#4a5568]/55 focus:border-[#1a446c] focus:ring-2 focus:ring-[#d4af37]/30"
      />
    </label>
  );
}

function TextAreaField({
  name,
  label,
  value,
  onChange,
}: {
  name: EkgFieldName;
  label: string;
  value: string;
  onChange: (name: EkgFieldName, value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#163a59]">
      {label}
      <textarea
        name={name}
        value={value}
        rows={6}
        required
        onChange={event => onChange(name, event.target.value)}
        className="resize-y rounded-[.55rem] border border-[#c7d2dc] bg-white px-4 py-3 font-normal leading-6 outline-none transition focus:border-[#1a446c] focus:ring-2 focus:ring-[#d4af37]/30"
      />
    </label>
  );
}
