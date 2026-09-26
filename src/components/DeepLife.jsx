import { useEffect, useRef, useState } from "react";
import { Pixel } from "./sprites";
import { ANGLER, JELLYGLOW, FISH, JELLY } from "../data/sprites";
import { subscribeDepth, getDepthState } from "../lib/zone";

// ─────────────────────────────────────────────────────────────
// DeepLife — the fauna you descend past. Shallow reef life on
// the walker strip belongs to the surface; this layer lives in
// the water column itself: drifting jellies, a passing shoal,
// and — past the twilight line — the abyss's one resident with
// a lure. Everything fades in/out with depth via direct DOM
// writes on one rAF loop; React only decides what exists.
// ─────────────────────────────────────────────────────────────

const JELLIES = [
  { left: "12%", base: 0.18, size: 3, factor: 0.28, dur: 17 },
  { left: "64%", base: 0.3, size: 2, factor: 0.2, dur: 23 },
  { left: "38%", base: 0.47, size: 3, factor: 0.32, dur: 19 },
  { left: "82%", base: 0.56, size: 2, factor: 0.24, dur: 26 },
  { left: "24%", base: 0.68, size: 2, factor: 0.3, dur: 21 },
  { left: "71%", base: 0.8, size: 3, factor: 0.22, dur: 28 },
];

const SHOAL = [
  { top: "22%", dur: 34 },
  { top: "24.5%", dur: 34 },
  { top: "27%", dur: 34 },
  { top: "23.2%", dur: 34 },
  { top: "26.1%", dur: 34 },
  { top: "25.4%", dur: 34 },
];

function Bubbles({ blinkRef }) {
  return (
    <span className="dl-bubbles" ref={blinkRef} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export default function DeepLife() {
  const [spawned, setSpawned] = useState(false);
  const jellyRefs = useRef([]);
  const shoalRef = useRef(null);
  const anglerRef = useRef(null);
  const anglerInnerRef = useRef(null);
  const blinkRef = useRef(null);

  // fauna only mounts after the first departure from the surface —
  // nothing swims in the sunlit zone of a fresh load
  useEffect(() => {
    const off = subscribeDepth((s) => {
      if (!spawned && s.zoneId !== "epi") setSpawned(true);
    });
    if (getDepthState().zoneId !== "epi") setSpawned(true);
    return off;
  }, [spawned]);

  useEffect(() => {
    let raf;
    const tick = () => {
      const { p } = getDepthState();

      // jellies: parallax drift, visible twilight → abyss
      for (let i = 0; i < JELLIES.length; i++) {
        const el = jellyRefs.current[i];
        if (!el) continue;
        const j = JELLIES[i];
        el.style.transform = `translateY(${(-p * 620 * j.factor).toFixed(1)}px)`;
        const vis = p > j.base - 0.1 && p < j.base + 0.34;
        el.style.opacity = vis ? "1" : "0";
      }

      // shoal crosses the twilight band, left → right
      if (shoalRef.current) {
        const vis = p > 0.12 && p < 0.44;
        shoalRef.current.style.opacity = vis ? "1" : "0";
        const t = Math.min(1, Math.max(0, (p - 0.12) / 0.32));
        shoalRef.current.style.transform = `translateX(${(-30 + t * 130).toFixed(1)}vw)`;
      }

      // the angler patrols the abyss; its lure blinks
      if (anglerRef.current) {
        const vis = p > 0.5 && p < 0.95;
        anglerRef.current.style.opacity = vis ? "1" : "0";
        anglerRef.current.style.transform = `translateY(${(-p * 160).toFixed(1)}px)`;
      }
      if (anglerInnerRef.current) {
        anglerInnerRef.current.style.left =
          p < 0.72 ? "78%" : "18%";
      }
      if (blinkRef.current) {
        blinkRef.current.style.opacity =
          Math.sin(performance.now() / 460) > 0.1 ? "1" : "0.15";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [jellyRefs]);

  if (!spawned) {
    return <div className="deeplife" aria-hidden="true"><Bubbles blinkRef={blinkRef} /></div>;
  }

  return (
    <div className="deeplife" aria-hidden="true">
      <Bubbles blinkRef={blinkRef} />

      {JELLIES.map((j, i) => (
        <span key={i} className="dl-jelly" ref={(el) => { jellyRefs.current[i] = el; }}
          style={{ left: j.left, animationDuration: `${j.dur}s` }}>
          <Pixel rows={i % 3 === 2 ? JELLY : JELLYGLOW} size={j.size} />
        </span>
      ))}

      <span className="dl-shoal" ref={shoalRef}>
        {SHOAL.map((f, i) => (
          <span key={i} className="dl-shoal-fish" style={{ top: f.top, animationDelay: `${i * -3.2}s` }}>
            <Pixel rows={FISH} size={2} />
          </span>
        ))}
      </span>

      <span className="dl-angler" ref={anglerRef}>
        <span className="dl-angler-track">
          <span className="dl-angler-inner" ref={anglerInnerRef}>
            <span className="dl-angler-lure" aria-hidden="true" />
            <Pixel rows={ANGLER} size={3} />
          </span>
        </span>
      </span>
    </div>
  );
}

