import { useEffect, useState } from "react";
import { play } from "../lib/sfx";

// ─────────────────────────────────────────────────────────────
// ZoneBanner — the moment a zone crossing happens, a full-width
// expedition title card slides across the water: "— 1 000 M —
// ENTERING THE MIDNIGHT ZONE", with a sonar ping. Readable in
// the light zones, ghost-luminous in the dark ones. Fires only
// on real crossings; the initial load is silent.
// ─────────────────────────────────────────────────────────────

export default function ZoneBanner() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    let timer;
    const onZone = (e) => {
      const zone = e.detail;
      setCard({ id: zone.id, label: zone.label, depth: zone.depth });
      play("zone");
      clearTimeout(timer);
      timer = setTimeout(() => setCard(null), 2600);
    };
    window.addEventListener("zonechange", onZone);
    return () => {
      window.removeEventListener("zonechange", onZone);
      clearTimeout(timer);
    };
  }, []);

  if (!card) return null;

  return (
    <div className="zone-banner" key={card.id} aria-live="polite">
      <span className="zb-line" />
      <span className="zb-depth">— {card.depth.toLocaleString()} M —</span>
      <span className="zb-name">{card.label}</span>
      <span className="zb-line" />
    </div>
  );
}
