import { useEffect, useRef, useState } from "react";

// ── scroll reveal ───────────────────────────────────────────
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── true once the element has been seen ────────────────────
function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// ── animated counter ───────────────────────────────────────
export function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(String(value));
  useEffect(() => {
    const str = String(value);
    const num = parseFloat(str.replace(/[^\d.]/g, ""));
    if (Number.isNaN(num)) return;
    const prefix = str.match(/^[^\d]*/)?.[0] ?? "";
    const suffix = str.match(/[^\d.]*$/)?.[0] ?? "";
    const decimals = (str.split(".")[1] || "").replace(/[^\d]/g, "").length;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(prefix + (num * eased).toFixed(decimals) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className={className}>{display}</span>;
}

// ── pixel bar chart: label, bar, value ─────────────────────
export function BarChart({ items, compact = false }) {
  const [ref, seen] = useInView(0.25);
  return (
    <div ref={ref} className={`bar-chart ${compact ? "is-compact" : ""} ${seen ? "is-in" : ""}`}>
      {items.map((it, i) => (
        <div className="bar-row" key={it.k || it.label}>
          <span className="bar-label">{it.k || it.label}</span>
          <span className="bar-track">
            <i style={{ width: seen ? `${Math.max(3, Math.min(100, it.pct))}%` : "0%", transitionDelay: `${i * 90}ms` }} />
          </span>
          <span className="bar-value">{it.v ?? it.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── section heading, world-card style ──────────────────────
export function SectionHead({ code, title, em, side }) {
  return (
    <Reveal>
      <div className="sec-head">
        <span className="sec-code">WORLD {code}</span>
        <h2 className="sec-title">
          {title} {em && <em>{em}</em>}
        </h2>
        {side && <span className="sec-side">{side}</span>}
      </div>
      <div className="sec-rule" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
      </div>
    </Reveal>
  );
}
