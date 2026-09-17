import type { CSSProperties, ReactNode } from "react";

type Props = {
  imageUrl: string;
  imageAlt?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  sidePanel?: ReactNode;
  position?: string;
  mobilePosition?: string;
  centered?: boolean;
};

export function HeroFrame({
  imageUrl,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  children,
  sidePanel,
  position = "center",
  mobilePosition = position,
  centered = false,
}: Props) {
  return (
    <section
      className={`relative flex min-h-screen min-h-[100svh] overflow-hidden bg-[#092842] pb-16 pt-32 text-white sm:pb-24 ${centered ? "items-center" : "items-end"}`}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="hero-image-position hero-image-drift absolute inset-0 h-full w-full object-cover"
        style={
          {
            "--hero-position": position,
            "--hero-mobile-position": mobilePosition,
          } as CSSProperties
        }
      />
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={`absolute inset-0 ${centered ? "bg-[linear-gradient(0deg,rgba(7,30,49,.9)_0%,rgba(9,40,66,.66)_55%,rgba(7,30,49,.42)_100%)]" : "bg-[linear-gradient(90deg,rgba(7,30,49,.94)_0%,rgba(9,40,66,.69)_48%,rgba(9,40,66,.16)_100%)]"}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,24,39,.65)_0%,transparent_55%)]" />
      <div className="container relative z-10">
        <div
          className={`grid items-end gap-10 ${sidePanel ? "lg:grid-cols-12" : ""}`}
        >
          <div
            className={`hero-content-enter ${sidePanel ? "lg:col-span-8" : `max-w-4xl ${centered ? "mx-auto text-center" : ""}`}`}
          >
            <p
              className={`eyebrow !text-[#f5e9bd] ${centered ? "justify-center" : ""}`}
            >
              {eyebrow}
            </p>
            <h1 className="display-title mt-6 max-w-4xl text-white">{title}</h1>
            <p
              className={`mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg ${centered ? "mx-auto" : ""}`}
            >
              {subtitle}
            </p>
            {children && (
              <div className={`mt-8 ${centered ? "flex justify-center" : ""}`}>
                {children}
              </div>
            )}
          </div>
          {sidePanel && <div className="lg:col-span-4">{sidePanel}</div>}
        </div>
      </div>
    </section>
  );
}
