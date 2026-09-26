import { courses, profile } from "../data/portfolio";
import { Reveal } from "./ui";
import { Pixel } from "./sprites";
import { COIN } from "../data/sprites";

// ─────────────────────────────────────────────────────────────
// Levels — every role, staged as a dive site on the chart.
// Each one carries the period, what it actually taught and the
// tools used. Nothing is rated or scored: the work is the work.
// ─────────────────────────────────────────────────────────────

export default function Levels() {
  return (
    <div className="courses">
      {courses.map((c, i) => (
        <Reveal key={c.org + c.period} delay={i * 45}>
          <article className={`course ${c.current ? "is-playing" : "is-cleared"}`}>
            <div className="course-slot">
              <span className="course-code">{c.code}</span>
              <span className="course-mark">
                {c.current ? <span className="playing">▶ DIVING</span> : <span className="cleared">✓ CHARTED</span>}
              </span>
            </div>

            <div className="course-body">
              <div className="course-frame">{c.frame}</div>
              <h3 className="course-role">{c.role}</h3>
              <div className="course-org">{c.org} · {c.period}</div>
              <p className="course-summary">{c.summary}</p>

              <ul className="course-list">
                {c.learned.map((l, j) => (
                  <li key={j}>
                    <span className="star-mark" aria-hidden="true"><Pixel rows={COIN} size={1.6} /></span>
                    {l}
                  </li>
                ))}
              </ul>

              <div className="course-stack">
                {c.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          </article>
        </Reveal>
      ))}

      <Reveal delay={80}>
        <div className="course-start">
          <span className="cs-label">FIRST SWIM</span>
          <div>
            <h4>{profile.education.school}</h4>
            <p>{profile.education.degree} · {profile.education.period} · CGPA {profile.education.cgpa}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
