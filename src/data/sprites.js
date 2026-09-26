// ─────────────────────────────────────────────────────────────
// Original pixel art for the DIVE LOG, drawn from scratch in
// code. Character maps render through <Pixel/>; nothing here is
// taken from any game. Palette letters map in PALETTE below.
// ─────────────────────────────────────────────────────────────

export const PALETTE = {
  ".": null, // transparent
  k: "#12333f", // deep ink / outline
  m: "#37606f", // neoprene dark / metal dark
  M: "#5f8fa0", // metal light
  v: "#6fe3ff", // mask glass / glows
  t: "#0fa896", // wetsuit teal
  w: "#ffffff",
  y: "#ffd23f", // doubloon gold
  o: "#ff8c42", // clownfish orange / tank strap
  g: "#1fa06b", // kelp green
  G: "#5ed9a4", // kelp light
  b: "#b0713f", // chest wood / rock brown
  B: "#d99a5b", // wood light
  q: "#ffd23f", // pod pearl gold
  p: "#ff8fb8", // shell pink
  P: "#ffc2da", // shell light
  s: "#f0dca8", // sand / skin
  h: "#6b4a2b", // hair brown
  f: "#0b6b60", // flipper teal-dark
  c: "#ffffff", // bubble / cloud white
  n: "#1fa06b", // reef mound green
  r: "#ff6f61", // coral red
};

// ── THE DIVER — you steer her down by scrolling. Human face
// under a dive mask, yellow tank on the back, wide flippers. ──
export const DIVER = [
  [
    "................",
    ".....kkkkk......",
    "....khhhhhk.....",
    "....khhhhhk.....",
    "....kmvvvvk.....",
    "....kssssk......",
    ".....kssk.......",
    "..kkkttttkk.....",
    ".kykttttttk.....",
    ".kykttttttk.....",
    ".kykttttttk.....",
    "..kkttttttk.....",
    "...kkkkkkk......",
    "...ktt..ktt.....",
    "..kffk...kffk...",
    "..kkkk...kkkk...",
  ],
  [
    "................",
    ".....kkkkk......",
    "....khhhhhk.....",
    "....khhhhhk.....",
    "....kmvvvvk.....",
    "....kssssk......",
    ".....kssk.......",
    "..kkkttttkk.....",
    ".kykttttttk.....",
    ".kykttttttk.....",
    ".kykttttttk.....",
    "..kkttttttk.....",
    "...kkkkkkk......",
    "..ktt....ktt....",
    ".kffk......kffk.",
    ".kkkk......kkkk.",
  ],
];

// ── dive objects ────────────────────────────────────────────
// TREASURE POD — a closed giant clam with a pearl showing.
// Bump it to log the find.
export const POD = [
  "kkkkkkkkkkkkkkkk",
  "kppppppppppppppk",
  "kpPPPPPPPPPPPPpk",
  "kpPkkkkkkkkkkPpk",
  "kpPkmmmmmmmmkPpk",
  "kpPkmwwwwwwmkPpk",
  "kpPkmwyyyywmkPpk",
  "kpPkmwyyyywmkPpk",
  "kpPkmwwwwwwmkPpk",
  "kpPkmwwwwwwmkPpk",
  "kpPkkmmmmmmkkPpk",
  "kpPPkkkkkkkkPPpk",
  "kppPPPPPPPPPPppk",
  "kppppppppppppppk",
  "kkkkkkkkkkkkkkkk",
];

// a pod that has already been logged — open, empty shell
export const POD_USED = [
  "kkkkkkkkkkkkkkkk",
  "kppppppppppppppk",
  "kpPPPPPPPPPPPPpk",
  "kppPPPPPPPPPPppk",
  "kpppPPPPPPPPpppk",
  "kkkkkkkkkkkkkkkk",
  "kssssssssssssssk",
  "ksbbsbbsbbsbbssk",
  "kssssssssssssssk",
  "ksbbsbbsbbsbbssk",
  "kssssssssssssssk",
  "kkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkk",
];

// DOUBLOON — paid out for every logged find
export const COIN = [
  "..oooo..",
  ".oyyyyo.",
  "oyywwyyo",
  "oyywwyyo",
  "oyyyyyyo",
  "oyywwyyo",
  ".oyyyyo.",
  "..oooo..",
];

// ── sea life & scenery ──────────────────────────────────────
export const FISH = [
  "...kkkk..k.",
  "..koooookk.",
  ".koooooooo.",
  ".koooowook.",
  "..koooookk.",
  "...kkkk..k.",
];

export const JELLY = [
  "..kkkkkk..",
  ".kpPPPPpk.",
  "kpppwwpppk",
  "kppwwwwppk",
  "kpppwwpppk",
  ".kppppppk.",
  "..k.kk.k..",
  "..k.kk.k..",
  "...k..k...",
  "...k..k...",
];

export const WEED = [
  "...gg...",
  "..ggGg..",
  "...ggg..",
  "..gG.gg.",
  ".gg.....",
  "..gg....",
  "...ggG..",
  "..gg.gg.",
  "...gg...",
  "..gGg...",
  "...gg...",
  "..gg....",
];

export const CORAL = [
  "..r...r..",
  ".rrr.rrr.",
  ".rrrrrr..",
  "..rrrr...",
  ".rrrrrr..",
  ".rr..rr..",
  "rr....rr.",
];

// reef mounds and kelp clumps (round green shapes)
export const HILL = [
  ".......nn.......",
  "......nnnn......",
  ".....nnnnnn.....",
  "....nnGnnnnn....",
  "...nnnnnnGnnn...",
  "..nnGnnnnnnnnn..",
  ".nnnnnnGnnnnnnn.",
  "nnnnnnnnnnnnnnnn",
];

export const BUSH = [
  "...nnnn...nnnn...",
  "..nnnnnn.nGnnnn..",
  ".nnnnGnnnnnnnnnn.",
  "nnnnnnnnnnnnnnnnn",
];

// rock spire — vertical scenery interest
export const SPIRE = [
  "...kkkk...",
  "..kbbbbk..",
  "..kbBbbk..",
  "..kbbbbk..",
  "...kbbk...",
  "..kbbbBk..",
  "..kbbbbk..",
  "..kbbbbk..",
  ".kbbbbBbk.",
  ".kbbbbbbk.",
  "kbbbbBbbbk",
  "kbbbbbbbbk",
];

// ── gear-locker artifacts ───────────────────────────────────
export const MASK = [
  ".kkkkkkk.",
  "kmmmmmmmk",
  "kmvvvvvmk",
  "kmvwvwvmk",
  "kmvvvvvmk",
  ".kmmmmmk.",
  "..k...k..",
  "..kkkkk..",
];

export const TANK = [
  "..kkkk..",
  ".kmmmmk.",
  ".kMMMMk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmMMmk.",
  ".kmmmmk.",
  "..kkkk..",
];

export const SONAR = [
  "...kkkk...",
  "..kmmmmk..",
  ".kmmwwmmk.",
  ".kmwwwwmk.",
  ".kmwwwwmk.",
  ".kmmwwmmk.",
  "..kmmmmk..",
  "...kkkk...",
  "....kk....",
  "..kkkkkk..",
];

export const CHEST = [
  "..kkkkkkkk..",
  ".kbbbbbbbbk.",
  ".kbBByyBBbk.",
  ".kbbbbbbbbk.",
  ".kkkkkkkkkk.",
  ".kbbbbbbbbk.",
  ".kbByyyyBbk.",
  ".kbbbbbbbbk.",
  "..kkkkkkkk..",
];

// ── the habitat — journey's end on the seafloor ─────────────
export const HABITAT = [
  ".....kkkkkk.....",
  "...kkwwwwwwkk...",
  "..kwwwwwwwwwwk..",
  ".kwwwvvvvvvwwwk.",
  ".kwwvvvvvvvvwwk.",
  "kwwwvvvvvvvvwwwk",
  "kwwvvvvvvvvvvwwk",
  "kkkkkkkkkkkkkkkk",
  "k..kk......kk..k",
];

// doubloon spin frames
export const COIN_SPIN = [
  [
    "..ooo..",
    ".oyyyo.",
    "oywwwyo",
    "oywwwyo",
    "oywwwyo",
    "oywwwyo",
    ".oyyyo.",
    "..ooo..",
  ],
  [
    "...o...",
    "..oyo..",
    "..owo..",
    "..owo..",
    "..owo..",
    "..owo..",
    "..oyo..",
    "...o...",
  ],
];
