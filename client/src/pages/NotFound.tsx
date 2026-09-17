import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fdfdfd] px-5 py-20 sm:px-10">
      <img
        src="/images/404.webp"
        alt="Página no encontrada"
        className="h-auto w-full max-w-5xl object-contain"
      />
      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a446c] transition-colors hover:text-[#1a446c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E9BD] sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Regresar
      </Link>
    </main>
  );
}
