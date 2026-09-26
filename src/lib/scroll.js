// Smooth scroll that respects Lenis when it's running.
export function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -84 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
