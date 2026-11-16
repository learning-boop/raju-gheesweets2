export const EASE = [0.2, 0.8, 0.2, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

/** Scroll to a section by id, accounting for the sticky header. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const header = document.querySelector('.header')
  const offset = header ? header.getBoundingClientRect().height : 0
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset + 1, behavior: reduce ? 'auto' : 'smooth' })
}
