// ─────────────────────────────────────────────────────────────
// zone — the depth engine. The whole page sits on ONE scroll
// progress p (0 at the surface, 1 at the habitat) and derives:
//   · zoneId — which ocean layer you're in
//   · depth — a non-linear metre readout for the HUD
//   · dark — 0→1 how deep the gloom is (drives the water tint)
//   · data-theme on <html> — flips the whole palette per zone
// Everyone (Hud, backdrop, fauna, banner) reads the same store,
// so the page darkens as one body instead of four stray effects.
// ─────────────────────────────────────────────────────────────

const listeners = new Set();

let state = { p: 0, zoneId: "epi", depth: 0, dark: 0 };

export function getDepthState() {
  return state;
}

export function subscribeDepth(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(state));
}

const ZONES = [
  { id: "epi", until: 0.16, label: "SUNLIT ZONE", depth: 0, dark: 0 },
  { id: "crepus", until: 0.38, label: "TWILIGHT ZONE", depth: 200, dark: 0.4 },
  { id: "midnight", until: 0.66, label: "MIDNIGHT ZONE", depth: 1000, dark: 0.78 },
  { id: "abyss", until: 0.86, label: "THE ABYSS", depth: 4000, dark: 0.92 },
  { id: "hadal", until: 1.01, label: "HADAL DEEP", depth: 6000, dark: 1 },
];

// depth readout: hold at the top of each zone, then fall to the
// next boundary — so the number lingers where it's meaningful.
function depthAt(p) {
  for (let i = 0; i < ZONES.length - 1; i++) {
    const a = ZONES[i];
    const b = ZONES[i + 1];
    const from = i === 0 ? 0 : ZONES[i].until;
    if (p < a.until) {
      const span = a.until - from;
      const t = span > 0 ? (p - from) / span : 0;
      const eased = t * t; // slow start, then falling
      return Math.round(a.depth + (b.depth - a.depth) * eased);
    }
  }
  return ZONES[ZONES.length - 1].depth;
}

function darkAt(p) {
  for (let i = ZONES.length - 1; i >= 0; i--) {
    if (p >= (i === 0 ? 0 : ZONES[i - 1].until)) {
      const a = i === 0 ? { until: 0, dark: 0 } : ZONES[i - 1];
      const b = ZONES[i];
      const t = (p - a.until) / (b.until - a.until);
      return a.dark + (b.dark - a.dark) * t;
    }
  }
  return 0;
}

let lastZoneId = null;
const themeEl = typeof document !== "undefined" ? document.documentElement : null;

export function updateDepth() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

  let zone = ZONES[0];
  for (const z of ZONES) {
    if (p < z.until) { zone = z; break; }
  }

  state = { p, zoneId: zone.id, depth: depthAt(p), dark: darkAt(p) };
  emit();

  if (zone.id !== lastZoneId) {
    const first = lastZoneId === null;
    lastZoneId = zone.id;
    if (themeEl) {
      if (zone.id === "epi") themeEl.removeAttribute("data-zone");
      else themeEl.setAttribute("data-zone", zone.id);
    }
    if (!first && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("zonechange", { detail: zone }));
    }
  }
}

export function currentZone() {
  return ZONES.find((z) => z.id === state.zoneId) || ZONES[0];
}

export function allZones() {
  return ZONES;
}
