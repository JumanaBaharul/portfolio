import { useEffect } from "react";
import { Pixel } from "./sprites";
import { POD_USED } from "../data/sprites";
import { BarChart } from "./ui";
import { play } from "../lib/sfx";

// ─────────────────────────────────────────────────────────────
// RecordPanel — what comes out of the block. A pixel window with
// the problem class, the numbers as a bar chart, the approach in
// full, and where it was built.
// ─────────────────────────────────────────────────────────────

export default function RecordPanel({ item, onClose }) {
  const close = () => {
    play("close");
    onClose();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      play("close");
      onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={`Record ${item.block}: ${item.title}`}>
      <button className="overlay-bg" onClick={close} aria-label="Close record" />
      <button className="panel-close" onClick={close} aria-label="Close record">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="panel">
        <div className="panel-bar">
          <span className="panel-slot"><Pixel rows={POD_USED} size={2} /></span>
          <span className="panel-id">RECORD {item.block}</span>
          <span className="panel-status">{item.status}</span>
        </div>

        <div className="panel-body">
          <h3 className="panel-title">{item.title}</h3>
          <p className="panel-question">{item.question}</p>

          <div className="panel-chart">
            <BarChart items={item.metrics} />
          </div>

          <div className="panel-block">
            <h4>THE APPROACH</h4>
            <p>{item.approach}</p>
          </div>

          <div className="panel-block">
            <h4>WHERE IT WAS BUILT</h4>
            <p className="panel-evidence">{item.evidence}</p>
          </div>

          <div className="panel-chips">
            {item.stack.map((c) => <span key={c}>{c}</span>)}
          </div>

        <div className="panel-actions">
          {item.repo ? (
            <a className="btn btn-start" href={item.repo} target="_blank" rel="noreferrer">
              View the source
            </a>
          ) : (
            <span className="panel-note">Running in production — source is private.</span>
          )}
          <button className="btn btn-plain" onClick={close}>Back to the level</button>
          </div>
        </div>
      </div>
    </div>
  );
}
