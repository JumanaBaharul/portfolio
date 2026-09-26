import { useState } from "react";
import { records } from "../data/portfolio";
import { play } from "../lib/sfx";
import { Pixel } from "./sprites";
import { POD, POD_USED, COIN_SPIN } from "../data/sprites";
import { Reveal } from "./ui";

// ─────────────────────────────────────────────────────────────
// Blocks — the six capability finds, staged as treasure pods.
// Bump one and a doubloon pops out, the pod opens empty, and
// the log entry appears. The title sits underneath so nobody
// has to guess what they're opening.
// ─────────────────────────────────────────────────────────────

function Block({ item, i, opened, onOpen }) {
  const [bump, setBump] = useState(false);
  const isOpen = opened.includes(item.id);

  const hit = () => {
    setBump(true);
    setTimeout(() => setBump(false), 480);

    // opening the last record earns the course-clear jingle
    const finishesLevel = !isOpen && opened.length + 1 === records.length;
    play("block");
    setTimeout(() => play(finishesLevel ? "clear" : "coin"), 90);

    onOpen(item);
  };

  return (
    <Reveal delay={(i % 3) * 60} className="block-cell">
      <button
        className={`block-card ${isOpen ? "is-cleared" : ""}`}
        onClick={hit}
        aria-label={`${isOpen ? "Reopen" : "Open"} find ${item.block}: ${item.title}`}
      >
        <div className={`block-stage ${bump ? "is-bumping" : ""}`}>
          {bump && (
            <span className="coin-pop" aria-hidden="true">
              <Pixel rows={COIN_SPIN[0]} size={3} />
            </span>
          )}
          <Pixel rows={isOpen ? POD_USED : POD} size={5} />
          <span className="block-tag">{item.block}</span>
        </div>

        <div className="block-copy">
          <h3 className="block-title">{item.title}</h3>
          <p className="block-question">{item.question}</p>
        </div>

        <div className="block-foot">
          <span className="block-stack">
            {item.stack.slice(0, 2).map((s) => <span key={s}>{s}</span>)}
          </span>
          <span className="block-act">{isOpen ? "LOGGED ✓" : "DIVE →"}</span>
        </div>
      </button>
    </Reveal>
  );
}

export default function Blocks({ opened, onOpen }) {
  return (
    <div className="blocks-grid">
      {records.map((r, i) => (
        <Block key={r.id} item={r} i={i} opened={opened} onOpen={onOpen} />
      ))}
    </div>
  );
}
