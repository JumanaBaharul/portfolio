// ─────────────────────────────────────────────────────────────
// DepthBackdrop — the water itself. A fixed layer behind all
// content: pale sunlit gradient at the top, hardening through
// twilight into true black at the bottom of the dive. One
// rAF loop writes opacity/colours straight to the DOM — the
// scroll hot path touches no React state.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { subscribeDepth, getDepthState } from "../lib/zone";

export default function DepthBackdrop() {
  const darkRef = useRef(null);
  const raysRef = useRef(null);
  const snowRef = useRef(null);
  const current = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const apply = (s) => { target.current = s.dark; };
    apply(getDepthState());
    const unsub = subscribeDepth(apply);

    let raf;
    const tick = () => {
      // ease the visible darkness toward the scroll target so the
      // water pours rather than steps — even on hard scrollbar drags
      current.current += (target.current - current.current) * 0.14;
      if (Math.abs(target.current - current.current) < 0.0015) {
        current.current = target.current;
      }
      const d = current.current;
      const dark = darkRef.current;
      if (dark) {
        dark.style.opacity = d.toFixed(3);
        // hue shifts teal → indigo as it deepens
        if (d < 0.55) {
          const t = d / 0.55;
          dark.style.background = `linear-gradient(180deg, rgba(10,52,74,${0.55 + t * 0.35}) 0%, rgba(6,30,48,${0.6 + t * 0.3}) 100%)`;
        } else {
          const t = (d - 0.55) / 0.45;
          dark.style.background = `linear-gradient(180deg, rgba(3,12,28,${0.86 + t * 0.12}) 0%, rgba(1,3,10,${0.94 + t * 0.06}) 100%)`;
        }
      }
      if (raysRef.current) {
        raysRef.current.style.opacity = Math.max(0, 1 - d * 2.6).toFixed(3);
      }
      if (snowRef.current) {
        snowRef.current.style.opacity = Math.min(1, Math.max(0, (d - 0.45) / 0.3)).toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { unsub(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="depth-dark" ref={darkRef} aria-hidden="true" />
      <div className="godrays" ref={raysRef} aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="marine-snow" ref={snowRef} aria-hidden="true">
        {Array.from({ length: 26 }, (_, i) => (
          <span
            key={i}
            style={{
              "--x": `${(i * 137) % 100}%`,
              "--d": `${7 + (i % 5) * 2.6}s`,
              "--dl": `${-(i % 9) * 1.7}s`,
              "--s": `${1 + (i % 3) * 0.5}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
