import { useEffect, useState, useSyncExternalStore } from "react";
import { isEnabled, subscribe, toggle } from "../lib/sfx";

// ─────────────────────────────────────────────────────────────
// Hud — the dive computer, pinned to the bottom of the viewport
// above the seafloor. It is not decoration: DOUBLOONS count the
// finds you've actually logged, SCORE is what that exploration
// is worth, DEPTH tracks your scroll from the surface to the
// habitat, and the bar fills as the log completes.
// ─────────────────────────────────────────────────────────────

const MAX_DEPTH = 6000; // metres, surface to the habitat

export default function Hud({ tokens, total }) {
  const [elapsed, setElapsed] = useState(0);
  const [depth, setDepth] = useState(0);
  const sound = useSyncExternalStore(subscribe, isEnabled, () => false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setDepth(Math.round(p * MAX_DEPTH));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const score = tokens * 200 + (tokens === total && total > 0 ? 1000 : 0);
  const pct = total ? Math.round((tokens / total) * 100) : 0;
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="hud" aria-live="polite">
      <div className="hud-row">
        <span className="hud-item">
          <span className="hud-key">DOUBLOONS</span>
          {/* keying on tokens remounts the value, which replays the bump */}
          <span key={tokens} className={`hud-val ${tokens > 0 ? "is-pop" : ""}`}>
            {String(tokens).padStart(2, "0")}
            <i>/{total}</i>
          </span>
        </span>
        <span className="hud-item">
          <span className="hud-key">SCORE</span>
          <span className="hud-val">{String(score).padStart(6, "0")}</span>
        </span>
        <span className="hud-item">
          <span className="hud-key">TIME</span>
          <span className="hud-val">{mm}:{ss}</span>
        </span>
        <span className="hud-item">
          <span className="hud-key">DEPTH</span>
          <span className="hud-val">{depth}<i>m</i></span>
        </span>
      </div>

      <div
        className="hud-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Finds logged"
      >
        <i style={{ width: `${Math.max(2, pct)}%` }} />
        <span className="hud-bar-note">{pct}% LOGGED</span>
      </div>

      <button
        className={`hud-sound ${sound ? "is-on" : ""}`}
        onClick={toggle}
        aria-pressed={sound}
        title={sound ? "Turn the game audio off" : "Turn the game audio on"}
      >
        <span className="hud-speaker" aria-hidden="true">{sound ? "◖))" : "◖×"}</span>
        SOUND {sound ? "ON" : "OFF"}
      </button>
    </div>
  );
}
