import { useEffect, useMemo, useRef, useState } from "react";
import { records } from "../data/portfolio";
import { play } from "../lib/sfx";

// ─────────────────────────────────────────────────────────────
// CommandPalette — ⌘K / Ctrl-K opens a warp menu. Filter the
// worlds and every record by title, question, tool or metric;
// ↑↓ browse, Enter warps.
// ─────────────────────────────────────────────────────────────

const WORLDS = [
  { type: "world", id: "practice", code: "1-1", label: "The finds", hint: "six capabilities, as treasure pods" },
  { type: "world", id: "method", code: "1-2", label: "Dive plan", hint: "the patterns underneath the work" },
  { type: "world", id: "courses", code: "1-3", label: "Dive sites", hint: "every role, and what it taught" },
  { type: "world", id: "inventory", code: "1-4", label: "Gear locker", hint: "tools grouped by purpose" },
  { type: "world", id: "clear", code: "★", label: "The habitat", hint: "bottom of the dive — get in touch" },
];

const RECORDS = records.map((r) => ({
  type: "record",
  id: r.id,
  code: r.block,
  label: r.title,
  hint: r.question,
  item: r,
  // everything worth searching a record by — tools, metrics, evidence
  haystack: [
    r.title,
    r.question,
    r.evidence,
    r.status,
    ...r.stack,
    ...r.metrics.map((m) => `${m.k} ${m.v}`),
  ].join(" "),
}));

const ALL = [...WORLDS, ...RECORDS];

export default function CommandPalette({ onClose, goTo, onOpenRecord }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const dismiss = () => {
    play("close");
    onClose();
  };

  useEffect(() => {
    play("open");
    const id = setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      play("close");
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const items = useMemo(() => {
    if (!q.trim()) return ALL;
    const needle = q.toLowerCase();
    return ALL.filter((i) =>
      `${i.label} ${i.hint} ${i.code} ${i.haystack || ""}`.toLowerCase().includes(needle)
    );
  }, [q]);

  const choose = (item) => {
    if (!item) return;
    onClose();
    if (item.type === "record") onOpenRecord(item.item);
    else goTo(item.id);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(items[active]);
    }
  };

  // keep the highlighted row in view
  useEffect(() => {
    const row = listRef.current?.querySelector(".warp-item.is-active");
    row?.scrollIntoView({ block: "nearest" });
  }, [active, items]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Warp menu">
      <button className="overlay-bg" onClick={dismiss} aria-label="Close warp menu" />
      <div className="warp">
        <div className="warp-bar">
          <span className="warp-tag">WARP</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="try “rag”, “pricing”, “whisper”, “forecasting”…"
            aria-label="Search checkpoints and worlds"
          />
          <span className="warp-count">{items.length}</span>
        </div>

        <div className="warp-list" ref={listRef}>
          {items.length === 0 && <div className="warp-empty">Nothing matches that.</div>}
          {items.map((item, i) => (
            <button
              key={item.type + item.id}
              className={`warp-item ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(item)}
            >
              <span className="warp-code">{item.code}</span>
              <span className="warp-main">
                <b>{item.label}</b>
                <i>{item.hint}</i>
              </span>
              <span className="warp-go" aria-hidden="true">↵</span>
            </button>
          ))}
        </div>

        <div className="warp-foot">
          <span>↑↓ browse</span>
          <span>↵ warp</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
