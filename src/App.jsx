import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import World from "./components/World";
import Walker from "./components/Walker";
import Hud from "./components/Hud";
import Blocks from "./components/Blocks";
import RecordPanel from "./components/RecordPanel";
import Levels from "./components/Levels";
import Inventory from "./components/Inventory";
import CourseClear from "./components/CourseClear";
import CommandPalette from "./components/CommandPalette";
import { Reveal, SectionHead, BarChart } from "./components/ui";
import { profile, method, stats, records, footer } from "./data/portfolio";
import { goTo } from "./lib/scroll";

const NAV = [
  { id: "practice", label: "1-1 Finds" },
  { id: "method", label: "1-2 Dive plan" },
  { id: "courses", label: "1-3 Sites" },
  { id: "inventory", label: "1-4 Gear" },
];

function Nav({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <button className="nav-brand" onClick={() => goTo("top")}>
        <span className="nb-mark" aria-hidden="true">DL</span>
        <span className="nb-text">
          <b>{profile.name}</b>
          <i>{profile.role}</i>
        </span>
      </button>

      <div className="nav-links">
        {NAV.map((l) => (
          <button key={l.id} onClick={() => goTo(l.id)}>{l.label}</button>
        ))}
      </div>

      <div className="nav-right">
        <button className="nav-search" onClick={onSearch} aria-label="Open warp menu">⌘K</button>
        <button className="nav-cta" onClick={() => goTo("clear")}>Habitat</button>
      </div>
    </nav>
  );
}

export default function App() {
  const [record, setRecord] = useState(null);
  const [search, setSearch] = useState(false);
  const [opened, setOpened] = useState([]);

  // smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // ⌘K / Ctrl-K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // every opened checkpoint = one token banked
  const openRecord = useCallback((item) => {
    setRecord(item);
    setOpened((o) => (o.includes(item.id) ? o : [...o, item.id]));
  }, []);

  return (
    <div className="app">
      <Nav onSearch={() => setSearch(true)} />
      <Walker />
      <Hud tokens={opened.length} total={records.length} />

      <World onStart={(id) => goTo(id || "practice")} />

      <main>
        {/* ── WORLD 1-1 ── */}
        <section id="practice" className="section">
          <SectionHead
            code="1-1"
            title="The finds,"
            em="six capabilities logged."
            side={`${opened.length}/${records.length} logged`}
          />
          <p className="sec-lede">
            I'd rather describe the shape of the problem than list a product name. Open a pod to read the log entry:
            the question worth asking, the approach that answered it, and the numbers behind it.
          </p>
          <Blocks opened={opened} onOpen={openRecord} />
        </section>

        {/* ── WORLD 1-2 ── */}
        <section id="method" className="section">
          <SectionHead code="1-2" title="Dive plan," em="what the work optimises for." side="the part that repeats" />
          <div className="method-grid">
            {method.map((m, i) => (
              <Reveal key={m.n} delay={i * 55} className="method-cell">
                <div className="method-card">
                  <span className="mc-n">{m.n}</span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="score-board">
            <div className="sb-head">
              <span className="sb-label">DIVE BOARD</span>
              <span className="sb-note">the numbers behind the claims</span>
            </div>
            <div className="sb-grid">
              {stats.map((s) => (
                <div key={s.label} className="sb-stat">
                  <b>{s.value}{s.suffix}</b>
                  <span>{s.label}</span>
                  <span className="sb-track"><i style={{ width: `${s.pct}%` }} /></span>
                </div>
              ))}
            </div>
            <BarChart
              items={method.map((m, i) => ({ k: `PRINCIPLE ${m.n}`, v: ["Grounding", "Guardrails", "Fallbacks", "Shipping"][i], pct: [92, 88, 90, 86][i] }))}
            />
            <p className="sb-caption">
              The bars above are how much of each principle is already in production code, and the four numbers
              are the ones I'd defend in an interview.
            </p>
          </div>
        </section>

        {/* ── WORLD 1-3 ── */}
        <section id="courses" className="section">
          <SectionHead code="1-3" title="Dive sites," em="charted in order." side="every role, and what it taught" />
          <Levels />
        </section>

        {/* ── WORLD 1-4 ── */}
        <section id="inventory" className="section">
          <SectionHead code="1-4" title="Gear locker," em="what's strapped on." side="tools by purpose" />
          <Inventory />
        </section>

        {/* ── HABITAT ── */}
        <section id="clear" className="section">
          <SectionHead code="★" title="The habitat," em="bottom of the dive." side="say hello" />
          <CourseClear />
        </section>
      </main>

      <footer className="footer">
        <span className="foot-note">{footer.note}</span>
        <div className="foot-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </footer>

      {record && <RecordPanel item={record} onClose={() => setRecord(null)} />}

      {search && (
        <CommandPalette
          onClose={() => setSearch(false)}
          goTo={goTo}
          onOpenRecord={openRecord}
        />
      )}
    </div>
  );
}
