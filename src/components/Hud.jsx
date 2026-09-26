import { useEffect, useState, useSyncExternalStore } from "react";
import { isEnabled, subscribe, toggle } from "../lib/sfx";
import { subscribeDepth, getDepthState } from "../lib/zone";

// ─────────────────────────────────────────────────────────────
// Hud — the dive computer, pinned to the bottom of the viewport
// above the seafloor. It is not decoration: DOUBLOONS count the
// finds you've actually logged, SCORE is what that exploration
// is worth, DEPTH tracks your scroll from the surface to the
// habitat, and the bar fills as the log completes.
// ─────────────────────────────────────────────────────────────

export default function Hud({ tokens, total }) {
  const [elapsed, setElapsed] = useState(0);
  const [depth, setDepth] = useState(() => getDepthState().depth);
  const sound = useSyncExternalStore(subscribe, isEnabled, () => false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // depth comes from the shared zone store — same number the
  // backdrop, fauna and banner read, so the HUD never disagrees
  useEffect(() => {
    setDepth(getDepthState().depth);
    return subscribeDepth((s) => setDepth(s.depth));
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
          <span className="hud-val">{depth.toLocaleString()}<i>m</i></span>
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
