import { useMemo, useState } from "react";
import { LocateFixed, MapPin } from "lucide-react";
import type { CoverageArea } from "../lib/siteContent";

const coordinates: Record<string, [number, number]> = {
  ruiz: [21.95052, -105.14615],
  tuxpan: [21.94065, -105.29775],
  "el venado": [21.94426, -105.001],
  venado: [21.94426, -105.001],
  chilapa: [22.0328, -105.2289],
  "san lorenzo": [21.9413, -105.0794],
  "vado de san pedro": [21.94712, -105.17965],
  "el vado de san pedro": [21.94712, -105.17965],
};

const normalizePlace = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function InteractiveCoverageMap({ areas }: { areas: CoverageArea[] }) {
  const initial = areas.find(area => area.featured) || areas[0];
  const [selectedId, setSelectedId] = useState(initial?._id || "");
  const selected = areas.find(area => area._id === selectedId) || initial;
  const mapUrl = useMemo(() => {
    const byId = coordinates[normalizePlace(selected?._id || "")];
    const byName = coordinates[normalizePlace(selected?.name || "")];
    const [latitude, longitude] = byId || byName || coordinates.ruiz;
    const span = 0.02;
    const bounds = [
      longitude - span,
      latitude - span,
      longitude + span,
      latitude + span,
    ].join(",");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  }, [selected]);

  return (
    <div
      data-coverage-map
      className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,.65fr)_minmax(0,1.35fr)] lg:gap-14"
    >
      <div className="flex min-h-0 flex-col border-y border-[#c7d2dc] py-6">
        <div className="flex items-center gap-2 text-[#1a446c]">
          <LocateFixed className="h-4 w-4" />
          <p className="text-xs font-bold uppercase tracking-[.18em]">
            Selecciona una localidad
          </p>
        </div>
        <div className="mt-5 max-h-[28rem] min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:#d4af37_transparent] [scrollbar-width:thin]">
          {areas.map(area => {
            const active = area._id === selected?._id;
            return (
              <button
                data-coverage-option
                key={area._id}
                type="button"
                onClick={() => setSelectedId(area._id)}
                aria-pressed={active}
                className={`group flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-bold transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out ${active ? "border-[#d4af37]/55 bg-[#f6f4ee] text-[#1a446c] shadow-[0_10px_24px_rgba(26,68,108,.08)]" : "border-transparent text-[#4a5568] hover:-translate-y-0.5 hover:border-[#dbe2e9] hover:bg-white hover:text-[#1a446c] hover:shadow-[0_10px_24px_rgba(26,68,108,.08)]"}`}
              >
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#d4af37] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                  {area.name}
                </span>
                <span
                  className={`h-2 w-2 rounded-full transition ${active ? "bg-[#d4af37]" : "bg-[#c7d2dc] group-hover:bg-[#d4af37]"}`}
                />
              </button>
            );
          })}
        </div>
        <div className="mt-6 border-t border-[#c7d2dc] pt-5">
          <p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[#4a5568]">
            Ubicación seleccionada
          </p>
          <p className="mt-2 text-xl font-bold">{selected?.name}</p>
          <p className="mt-1 text-sm text-[#4a5568]">{selected?.note}</p>
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-[#dbe2e9] bg-[#e7ecf0] shadow-[0_24px_60px_rgba(26,68,108,.12)]">
        <iframe
          key={selected?._id}
          title={`Mapa de ${selected?.name || "cobertura"}`}
          src={mapUrl}
          className="pointer-events-none absolute -inset-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] border-0 saturate-[.82] contrast-[1.04]"
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-black/5 bg-white/95 px-4 py-3 text-xs font-bold text-[#1a446c] shadow-lg backdrop-blur">
          <MapPin className="h-4 w-4 text-[#d4af37]" />
          {selected?.name}, Nayarit
        </div>
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2 py-1 text-[.58rem] font-semibold text-[#4a5568] shadow-sm backdrop-blur transition hover:bg-white hover:text-[#1a446c]"
        >
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
}
