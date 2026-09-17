import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "motion-visible" : "motion-hidden"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function CountUp({
  value,
  suffix = "",
}: {
  value: string | number;
  suffix?: string | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const raw = String(value);
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const numeric = match ? Number(match[2]) : Number(raw);
  const isNumeric = Number.isFinite(numeric);
  const prefix = match?.[1] || "";
  const tail = match?.[3] || "";
  const decimals = match?.[2].includes(".")
    ? match[2].split(".")[1]?.length || 0
    : 0;
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!ref.current || started || !isNumeric) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - start) / 1100, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(numeric * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNumeric, numeric, started]);
  const formatted = decimals
    ? current.toFixed(decimals)
    : Math.round(current).toString();
  return (
    <span ref={ref}>
      {isNumeric ? `${prefix}${formatted}${tail}${suffix || ""}` : raw}
    </span>
  );
}
