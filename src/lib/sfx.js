// ─────────────────────────────────────────────────────────────
// sfx — procedural chiptune. Every sound is synthesised at
// runtime from square-wave notes, so the site ships no audio
// files at all. Off by default; the HUD toggle turns it on and
// the preference is remembered.
// ─────────────────────────────────────────────────────────────

let ctx = null;
let enabled = read();
const listeners = new Set();

function read() {
  try {
    return localStorage.getItem("p1:sound") === "on";
  } catch {
    return false;
  }
}

export function isEnabled() {
  return enabled;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function toggle() {
  enabled = !enabled;
  try {
    localStorage.setItem("p1:sound", enabled ? "on" : "off");
  } catch {
    /* private mode — the preference just won't persist */
  }
  listeners.forEach((fn) => fn());
  if (enabled) {
    play("start");
    startDrone();
  } else {
    stopDrone();
  }
}

// toggle() calls play('start') immediately, which needs the AudioContext —
// created inside a user gesture, so the browser allows it.
// [frequency, seconds into the phrase, note length]
const RECIPES = {
  coin: [[988, 0, 0.07], [1319, 0.07, 0.2]],
  block: [[196, 0, 0.06], [147, 0.06, 0.1]],
  open: [[523, 0, 0.07], [659, 0.07, 0.07], [784, 0.14, 0.12]],
  close: [[392, 0, 0.07], [294, 0.07, 0.11]],
  start: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.22]],
  clear: [[784, 0, 0.12], [1047, 0.12, 0.12], [1319, 0.24, 0.12], [1568, 0.36, 0.28]],
  // sonar ping — a zone crossing
  zone: [[1244, 0, 0.05], [1244, 0.16, 0.05]],
};

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function play(name) {
  if (!enabled) return;
  const notes = RECIPES[name];
  if (!notes) return;
  const ac = ensure();
  if (!ac) return;

  const t0 = ac.currentTime + 0.01;
  const peak = 0.05;

  for (const [freq, at, dur] of notes) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, t0 + at);
    gain.gain.setValueAtTime(0.0001, t0 + at);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0 + at);
    osc.stop(t0 + at + dur + 0.03);
  }
}

// ── ambient deep-sea drone ──────────────────────────────────
// Two detuned low oscillators through a lowpass filter, plus a
// much slower LFO for swell. Started on first sound-on; fades in
// as you pass 1000 m and out near the surface.
let drone = null;

export function startDrone() {
  if (drone || !enabled) return;
  const ac = ensure();
  if (!ac) return;

  const gain = ac.createGain();
  gain.gain.value = 0;
  gain.connect(ac.destination);

  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 220;
  filter.connect(gain);

  const oscs = [55, 55.7].map((f) => {
    const o = ac.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.connect(filter);
    o.start();
    return o;
  });

  drone = { gain, oscs };
}

export function stopDrone() {
  if (!drone) return;
  const { gain, oscs } = drone;
  try {
    gain.gain.cancelScheduledValues(acNow());
    gain.gain.value = 0;
    oscs.forEach((o) => o.stop(acNow() + 0.05));
  } catch { /* already stopped */ }
  drone = null;
}

export function setDroneDepth(dark) {
  if (!drone) return;
  const g = Math.max(0, (dark - 0.28) / 0.5) * 0.05;
  try {
    drone.gain.gain.setTargetAtTime(g, acNow(), 0.6);
  } catch { /* shutting down */ }
}

function acNow() {
  return (ctx && ctx.currentTime) || 0;
}
