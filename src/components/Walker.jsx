import { useEffect, useRef } from "react";
import { Pixel } from "./sprites";
import { DIVER, BUSH, HILL, COIN_SPIN, SPIRE, FISH, JELLY, WEED } from "../data/sprites";
import { subscribeDepth, getDepthState } from "../lib/zone";

// ─────────────────────────────────────────────────────────────
// Walker — the dive column, pinned above the HUD. The diver
// swims as you scroll; the reef slides past in parallax.
//
// Performance note: positions are written straight to the DOM
// from ONE requestAnimationFrame loop. No React state and no
// CSS transitions sit on the scroll hot path, so the diver
// stays glued to the scrollbar even when it's dragged fast.
//
// GROUND matches --ground-h in index.css — keep the two in step.
// ─────────────────────────────────────────────────────────────

const GROUND = 30;
const SPAN = 130;

const SCENERY = [
  { sprite: HILL, size: 6, base: 0.03, factor: 0.6 },
  { sprite: BUSH, size: 5, base: 0.16, factor: 0.85 },
  { sprite: FISH, size: 3, base: 0.27, factor: 0.9 },
  { sprite: SPIRE, size: 5, base: 0.38, factor: 0.95 },
  { sprite: BUSH, size: 5, base: 0.52, factor: 0.85 },
  { sprite: JELLY, size: 3, base: 0.61, factor: 0.9 },
  { sprite: HILL, size: 6, base: 0.71, factor: 0.6 },
  { sprite: WEED, size: 5, base: 0.83, factor: 0.85 },
  { sprite: FISH, size: 3, base: 0.94, factor: 0.9 },
];

const COIN_BASES = [0.1, 0.42, 0.68, 0.92];

const wrap = (v) => ((v % SPAN) + SPAN) % SPAN - 15;

export default function Walker() {
  const heroRef = useRef(null);
  const faceRef = useRef(null);
  const sceneryRefs = useRef([]);
  const coinRefs = useRef([]);
  const bubblesRef = useRef(null);
  const torchRef = useRef(null);
  const bubbleT = useRef(0);

  useEffect(() => {
    const off = subscribeDepth((s) => {
      if (torchRef.current) {
        torchRef.current.classList.toggle("is-on", s.dark > 0.55);
      }
    });
    if (torchRef.current) {
      torchRef.current.classList.toggle("is-on", getDepthState().dark > 0.55);
    }
    return off;
  }, []);

  useEffect(() => {
    let raf;
    let lastY = window.scrollY;
    let frameB = false;
    let flipT = 0;
    let lastMoveT = 0;
    let moving = false;
    let dir = 1; // 1 = right (descending the page), -1 = left

    const tick = (t) => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      // ── hero: position and facing, written directly ──
      if (heroRef.current) heroRef.current.style.left = `${6 + p * 80}%`;
      // facing persists until travel direction actually changes
      if (y < lastY && dir !== -1) {
        dir = -1;
        faceRef.current?.classList.add("is-flip");
      } else if (y > lastY && dir !== 1) {
        dir = 1;
        faceRef.current?.classList.remove("is-flip");
      }

      // walk cycle: flip frames while moving, settle when idle
      if (y !== lastY) {
        lastMoveT = t;
        moving = true;
        if (t - flipT >= 170) {
          flipT = t;
          frameB = !frameB;
          heroRef.current?.classList.toggle("is-b", frameB);
        }
      } else if (moving && t - lastMoveT > 260) {
        moving = false;
        frameB = false;
        heroRef.current?.classList.remove("is-b");
      }

      // ── parallax scenery ──
      for (let i = 0; i < SCENERY.length; i++) {
        const s = SCENERY[i];
        const el = sceneryRefs.current[i];
        if (el) el.style.left = `${wrap(s.base * SPAN - p * 170 * s.factor)}%`;
      }

      // ── drifting doubloons ──
      for (let i = 0; i < COIN_BASES.length; i++) {
        const el = coinRefs.current[i];
        if (!el) continue;
        el.style.left = `${wrap(COIN_BASES[i] * SPAN - p * 200)}%`;
        el.classList.toggle("is-spin", Math.floor(p * 90 + i) % 2 === 1);
      }

      // ── exhale bubbles while the diver swims ──
      if (bubblesRef.current) {
        if (y !== lastY) {
          if (t - bubbleT.current > 2100) {
            bubbleT.current = t;
            bubblesRef.current.classList.remove("is-exhale");
            void bubblesRef.current.offsetWidth; // restart the animation
            bubblesRef.current.classList.add("is-exhale");
          }
        } else {
          bubblesRef.current.classList.remove("is-exhale");
        }
      }

      lastY = y;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="walker" aria-hidden="true">
      <div className="walker-world">
        {SCENERY.map((s, i) => (
          <span
            key={i}
            ref={(el) => { sceneryRefs.current[i] = el; }}
            className="walker-scenery"
            style={{ left: `${wrap(s.base * SPAN)}%` }}
          >
            <Pixel rows={s.sprite} size={s.size} />
          </span>
        ))}

        {COIN_BASES.map((base, i) => (
          <span
            key={`c${i}`}
            ref={(el) => { coinRefs.current[i] = el; }}
            className="walker-coin"
            style={{ left: `${wrap(base * SPAN)}%`, bottom: `calc(${GROUND}px + ${14 + (i % 2) * 12}px)` }}
          >
            <span className="coin-a"><Pixel rows={COIN_SPIN[0]} size={3} /></span>
            <span className="coin-b"><Pixel rows={COIN_SPIN[1]} size={3} /></span>
          </span>
        ))}
      </div>

      <div className="walker-hero" ref={heroRef} style={{ left: "6%" }}>
        <span className="walker-torch" ref={torchRef} aria-hidden="true" />
        <span className="walker-bubbles" ref={bubblesRef} aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="walker-face" ref={faceRef}>
          <span className="walker-frame frame-a"><Pixel rows={DIVER[0]} size={3} /></span>
          <span className="walker-frame frame-b"><Pixel rows={DIVER[1]} size={3} /></span>
        </span>
      </div>

      <div className="walker-ground" />
    </div>
  );
}
