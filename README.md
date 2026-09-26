# THE DIVE LOG - Jumana Baharul

A playable, pixel-art portfolio built as a **deep-sea dive**. You steer a
pixel diver down through six dive sites: capability records are treasure
pods you bump open (with real pixel bar charts inside), work history is a
chart of dive sites, tools are a gear locker, and the page ends at a lit
seafloor habitat - "NEXT DIVE: YOUR TEAM."

Every sprite is original, drawn in code as pixel matrices - no game assets,
no borrowed IP. Built with React + Vite, canvas-free: all DOM + CSS.

## Highlights

- **A real dive computer as the HUD** - depth meter reads your scroll as an
  actual descent (0 m at the surface → 6000 m at the habitat), plus doubloons,
  score and dive time.
- **Treasure-pod records** - six capability case studies (Voxa, AgroScan,
  InjuryLens, ScopeSmith, CredCheck + methods), each opening with metrics
  drawn as pixel bar charts.
- **A diver driven by `requestAnimationFrame`** - positions are written
  straight to the DOM, so the character tracks the scrollbar with zero lag
  even on fast flicks.
- **Warp search (⌘K / Ctrl-K)** - jump to any dive site, pod or gear item.
- **Procedural chiptune SFX** - synthesized live in the browser with the
  Web Audio API; no audio files, mutable from the HUD.

## Commands

```bash
npm install     # once
npm run dev     # dev server
npm run build   # production build in dist/
```

## Editing content

All copy — dive sites, pod records, gear, metrics — lives in
`src/data/portfolio.js`. Sprite pixel art lives in `src/data/sprites.js`.

## Author

Jumana Baharul — [github.com/JumanaBaharul](https://github.com/JumanaBaharul)
