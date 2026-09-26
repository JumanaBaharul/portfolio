import { useState } from "react";
import { clear, profile } from "../data/portfolio";
import { Reveal } from "./ui";
import { Pixel } from "./sprites";
import { HABITAT, DIVER } from "../data/sprites";
import { Github, Linkedin } from "./BrandIcons";

// ─────────────────────────────────────────────────────────────
// CourseClear — the habitat at the bottom of the dive. LOGGED
// stamp, the honest pitch, and every way to reach me. The
// diver settles in beside the lit habitat window.
// ─────────────────────────────────────────────────────────────

export default function CourseClear() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Reveal>
      <div className="flag-scene">
        <div className="flagpole" aria-hidden="true">
          <span className="pad-glow" />
          <span className="pad-rocket"><Pixel rows={HABITAT} size={7} /></span>
          <span className="pad-base" />
          <span className="pad-hero"><Pixel rows={DIVER[0]} size={3} /></span>
        </div>

        <div className="clear-copy">
          <span className="clear-stamp">{clear.stamp}</span>
          <h2 className="clear-headline">{clear.headline}</h2>
          <p className="clear-body">{clear.body}</p>

          <div className="clear-actions">
            <a className="btn btn-start" href={`mailto:${profile.email}`}>Write to me</a>
            <button className="btn btn-plain" onClick={copy}>{copied ? "COPIED ✓" : "COPY ADDRESS"}</button>
          </div>

          <div className="clear-channels">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer">◇ LeetCode</a>
            <a href={`tel:${profile.phone.replace(/[^\d]/g, "")}`}>☎ {profile.phone}</a>
          </div>
        </div>

        <div className="clear-side">
          <div className="clear-avail">
            <span className="clear-dot" />
            {clear.availability}
          </div>
          <div className="clear-meta">
            <div><span>BASED IN</span><b>{profile.location}</b></div>
            <div><span>FOCUS</span><b>{profile.focus}</b></div>
            <div><span>EMAIL</span><b>{profile.email}</b></div>
          </div>
          <p className="clear-quote">“{clear.quote}”</p>
          <p className="clear-next">{clear.nextLevel}</p>
        </div>
      </div>
    </Reveal>
  );
}
