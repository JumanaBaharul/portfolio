import { inventory, bonus } from "../data/portfolio";
import { Reveal } from "./ui";
import { Pixel } from "./sprites";
import { MASK, TANK, SONAR, CHEST, COIN } from "../data/sprites";

// ─────────────────────────────────────────────────────────────
// Inventory — the gear locker. Each slot is a group of tools
// with the reason they're there. Side quests hold the earlier
// work at a footnote's length.
// ─────────────────────────────────────────────────────────────

const SPRITES = { mask: MASK, tank: TANK, sonar: SONAR, chest: CHEST };

export default function Inventory() {
  return (
    <>
      <div className="inv-grid">
        {inventory.map((g, i) => (
          <Reveal key={g.name} delay={(i % 4) * 55} className="inv-cell">
            <div className="inv-slot">
              <span className="inv-icon" aria-hidden="true">
                <Pixel rows={SPRITES[g.item] || MASK} size={3} />
              </span>
              <h3 className="inv-name">{g.name}</h3>
              <p className="inv-note">{g.note}</p>
              <div className="inv-items">
                {g.items.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="bonus">
        <div className="bonus-head">
          <span className="bonus-label">SIDE QUESTS</span>
          <span className="bonus-note">Earlier work — kept short on purpose</span>
        </div>
        <div className="bonus-list">
          {bonus.map((b, i) => (
            <Reveal key={b.name} delay={(i % 4) * 30}>
              <a className="bonus-row" href={b.repo} target="_blank" rel="noreferrer">
                <span className="bonus-coin" aria-hidden="true"><Pixel rows={COIN} size={2} /></span>
                <span className="bonus-name">{b.name}</span>
                <span className="bonus-txt">{b.note}</span>
                <span className="bonus-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
