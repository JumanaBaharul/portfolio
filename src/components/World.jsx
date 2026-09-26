import { useEffect, useRef, useState } from "react";
import { Pixel } from "./sprites";
import { POD, COIN_SPIN, CORAL } from "../data/sprites";
import { profile, title, stats } from "../data/portfolio";
import { play } from "../lib/sfx";

// ─────────────────────────────────────────────────────────────
// World — the surface. Bright sky over sunlit water, a row of
// treasure pods and the diver's card. Start the dive and the
// descent begins; everything underneath is content.
// ─────────────────────────────────────────────────────────────

function Clouds() {
  return (
    <div className="clouds" aria-hidden="true">
      {[
        { top: "8%", scale: 4, dur: 58, delay: 0 },
        { top: "20%", scale: 3, dur: 78, delay: -22 },
        { top: "33%", scale: 5, dur: 96, delay: -48 },
        { top: "15%", scale: 2, dur: 68, delay: -60 },
      ].map((c, i) => (
        <span
          key={i}
          className="cloud"
          style={{
            top: c.top,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <svg viewBox="0 0 16 6" width={16 * c.scale} height={6 * c.scale} shapeRendering="crispEdges">
            <rect x="0" y="0" width="16" height="6" fill="none" />
            <rect x="5" y="0" width="6" height="1" fill="#fff" />
            <rect x="2" y="1" width="12" height="1" fill="#fff" />
            <rect x="1" y="2" width="14" height="2" fill="#fff" />
            <rect x="0" y="4" width="16" height="1" fill="#fff" />
            <rect x="3" y="5" width="11" height="1" fill="#e8f0ff" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function World({ onStart }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const raysRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="world" id="top">
      <div className="world-sky" aria-hidden="true" />
      <div className="godrays" ref={raysRef} aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <Clouds />

      <div className="world-inner">
        <div className="player-card">
          <div className="player-flag">
            <Pixel rows={[
              ".kkkk",
              "kttttk",
              "kttttk",
              ".kkkk",
            ]} size={5} />
          </div>

          <span className="player-label">{title.label}</span>
          <h1 className="player-name">{title.name}</h1>

          <div className="player-role">
            <span className="role-chip">{profile.roles[roleIdx]}</span>
            <span className="role-focus">{profile.focus}</span>
          </div>

          <p className="player-tagline">{title.tagline}</p>
          <p className="player-sub">{title.sub}</p>

          <div className="player-ctas">
            <button
              className={`btn btn-start ${started ? "is-on" : ""}`}
              onClick={() => {
                setStarted(true);
                play("start");
                onStart();
              }}
            >
              <span className="blink-dot" />
              {title.pressStart}
            </button>
            <button className="btn btn-plain" onClick={() => onStart("contact")}>
              {title.skip}
            </button>
          </div>

          <p className="player-hint">{title.hint}</p>
        </div>

        <div className="block-row" aria-hidden="true">
          <span className="blk"><Pixel rows={CORAL} size={4} /></span>
          <span className="blk bump"><Pixel rows={POD} size={4} /></span>
          <span className="blk"><Pixel rows={CORAL} size={4} /></span>
          <span className="blk float"><Pixel rows={COIN_SPIN[0]} size={4} /></span>
          <span className="blk bump" style={{ animationDelay: "0.4s" }}><Pixel rows={POD} size={4} /></span>
          <span className="blk"><Pixel rows={CORAL} size={4} /></span>
        </div>

        <div className="power-row">
          {stats.map((s) => (
            <span key={s.label} className="power">
              <b>{s.value}{s.suffix}</b>
              <i>{s.label}</i>
            </span>
          ))}
        </div>
      </div>

    </header>
  );
}
