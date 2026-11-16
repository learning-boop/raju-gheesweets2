import { useId, useMemo } from 'react'

/* ── Mandala ─────────────────────────────────────────────────
   Generated line-art mandala (rings of petals and dots), drawn in
   currentColor. Used as faint corner ornaments like the mockup. */
const RINGS = [
  { type: 'circle', r: 12 },
  { type: 'petals', n: 8, r0: 12, r1: 30, w: 7 },
  { type: 'circle', r: 34 },
  { type: 'petals', n: 16, r0: 34, r1: 52, w: 6 },
  { type: 'dots', n: 32, r: 57, size: 1.6 },
  { type: 'circle', r: 61 },
  { type: 'petals', n: 24, r0: 61, r1: 80, w: 6.5, open: true },
  { type: 'circle', r: 84 },
  { type: 'arcs', n: 36, r: 84, h: 9 },
  { type: 'dots', n: 36, r: 97, size: 1.4 },
]

function petal(r0, r1, w) {
  const m = (r0 + r1) / 2
  return `M${r0} 0 Q${m} ${w} ${r1} 0 Q${m} ${-w} ${r0} 0Z`
}

export function Mandala({ className = '', strokeWidth = 0.8 }) {
  const parts = useMemo(() => {
    const out = []
    RINGS.forEach((ring, ri) => {
      if (ring.type === 'circle') out.push(<circle key={ri} r={ring.r} />)
      if (ring.type === 'petals') {
        const d = petal(ring.r0, ring.r1, ring.w)
        for (let i = 0; i < ring.n; i++) {
          const a = (360 / ring.n) * i + (ring.open ? 180 / ring.n : 0)
          out.push(<path key={`${ri}-${i}`} d={d} transform={`rotate(${a})`} />)
          if (ring.open) out.push(<path key={`${ri}-${i}v`} d={petal(ring.r0 + 4, ring.r1 - 5, ring.w * 0.4)} transform={`rotate(${a})`} />)
        }
      }
      if (ring.type === 'dots')
        for (let i = 0; i < ring.n; i++) {
          const a = ((Math.PI * 2) / ring.n) * i
          out.push(<circle key={`${ri}-${i}`} cx={(Math.cos(a) * ring.r).toFixed(2)} cy={(Math.sin(a) * ring.r).toFixed(2)} r={ring.size} className="fill" />)
        }
      if (ring.type === 'arcs')
        for (let i = 0; i < ring.n; i++) {
          const a0 = ((Math.PI * 2) / ring.n) * i
          const a1 = ((Math.PI * 2) / ring.n) * (i + 1)
          const p = (a, r) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`
          out.push(<path key={`${ri}-${i}`} d={`M${p(a0, ring.r)} Q${p((a0 + a1) / 2, ring.r + ring.h * 2)} ${p(a1, ring.r)}`} />)
        }
    })
    return out
  }, [])
  return (
    <svg className={`mandala ${className}`} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      {parts}
    </svg>
  )
}

/* ── Lotus motif ─────────────────────────────────────────── */
export function Lotus({ className = '', size = 28 }) {
  return (
    <svg className={`lotus ${className}`} width={size} height={size * 0.75} viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M20 4c4 5 4 13 0 20-4-7-4-15 0-20z" />
      <path d="M20 24c-2-7-6-12-12-13 0 7 5 12 12 13zM20 24c2-7 6-12 12-13 0 7-5 12-12 13z" />
      <path d="M20 24c-5-3-11-4-16-2 3 3 9 4 16 2zM20 24c5-3 11-4 16-2-3 3-9 4-16 2z" />
    </svg>
  )
}

/* ── Divider: ——— ✿ ——— with arrow tips ──────────────────── */
export function Divider({ className = '', width = 200 }) {
  return (
    <span className={`divider ${className}`} aria-hidden="true">
      <svg width={width} height="18" viewBox="0 0 200 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 9h66M66 5l6 4-6 4M128 9h66M134 5l-6 4 6 4" />
        <circle cx="4" cy="9" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="196" cy="9" r="1.6" fill="currentColor" stroke="none" />
        <g transform="translate(100 9)">
          <path d="M0-7c3 3 3 8 0 12-3-4-3-9 0-12z" />
          <path d="M0 5c-1.5-5-5-8-10-8 .5 5 4.5 8 10 8zM0 5c1.5-5 5-8 10-8-.5 5-4.5 8-10 8z" />
          <path d="M-14 1c-2 0-5 0-6 1M14 1c2 0 5 0 6 1" />
        </g>
      </svg>
    </span>
  )
}

/* ── Flourish beside section titles (mirror with flip) ───── */
export function Flourish({ flip = false, className = '' }) {
  return (
    <svg className={`flourish ${flip ? 'is-flipped' : ''} ${className}`} width="56" height="20" viewBox="0 0 56 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M2 10h30" />
      <path d="M32 10c4-6 12-7 14-2s-5 7-8 4 1-6 5-5" />
      <path d="M32 10c4 6 12 7 14 2" />
      <path d="M46 10h8" />
    </svg>
  )
}

/* ── Arch frame (mihrab / ogee) ─────────────────────────────
   Children are clipped to the arch. Uses objectBoundingBox
   units so it scales to any size. */
const ARCH =
  'M0,1 L0,0.46 C0,0.33 0.12,0.27 0.24,0.22 C0.36,0.17 0.45,0.12 0.5,0.02 C0.55,0.12 0.64,0.17 0.76,0.22 C0.88,0.27 1,0.33 1,0.46 L1,1 Z'

export function ArchFrame({ children, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className={`arch ${className}`}>
      <svg className="arch__svg" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`arch-${id}`} clipPathUnits="objectBoundingBox">
            <path d={ARCH} transform="translate(0.025 0.022) scale(0.95 0.975)" />
          </clipPath>
          <linearGradient id={`archfill-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a5410" />
            <stop offset="1" stopColor="#3e2208" />
          </linearGradient>
        </defs>
        <path d={ARCH} fill={`url(#archfill-${id})`} />
        <path d={ARCH} fill="none" stroke="var(--gold)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="arch__clip" style={{ clipPath: `url(#arch-${id})` }}>
        {children}
      </span>
    </span>
  )
}

/* ── Ornate arch (hero) ─────────────────────────────────────
   A finer take on ArchFrame: thin cream mat between two gold
   hairlines with a beaded line, and a small finial at the apex.
   Strokes stay hairline at any size (non-scaling-stroke). */
const INSET_MID = 'translate(0.016 0.013) scale(0.968 0.98)'
const INSET_IMG = 'translate(0.032 0.026) scale(0.936 0.96)'

export function OrnateArch({ children, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className={`oarch ${className}`}>
      <svg className="oarch__frame" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`oarch-${id}`} clipPathUnits="objectBoundingBox">
            <path d={ARCH} transform={INSET_IMG} />
          </clipPath>
        </defs>
        <path d={ARCH} className="oarch__mat" />
        <path d={ARCH} className="oarch__line" vectorEffect="non-scaling-stroke" />
        <path d={ARCH} transform={INSET_MID} className="oarch__beads" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="oarch__clip" style={{ clipPath: `url(#oarch-${id})` }}>
        {children}
      </span>
      <svg className="oarch__frame oarch__frame--top" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={ARCH} transform={INSET_IMG} className="oarch__line oarch__line--inner" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="oarch__finial" viewBox="0 0 40 46" aria-hidden="true" focusable="false">
        <path d="M20 2c3.4 4.4 3.4 9.6 0 13.4C16.6 11.6 16.6 6.4 20 2z" />
        <path d="M20 15.4c-1.6-4.6-5-7.4-9.6-7.8.4 4.6 3.8 7.4 9.6 7.8zM20 15.4c1.6-4.6 5-7.4 9.6-7.8-.4 4.6-3.8 7.4-9.6 7.8z" />
        <circle cx="20" cy="21" r="2.2" className="oarch__dot" />
        <path d="M8 27h24M13 31h14" />
        <circle cx="20" cy="38" r="1.6" className="oarch__dot" />
        <circle cx="5" cy="27" r="1.3" className="oarch__dot" />
        <circle cx="35" cy="27" r="1.3" className="oarch__dot" />
      </svg>
    </span>
  )
}

/* ── Logo ─────────────────────────────────────────────────
   The shop's real logo (from "raju sweets logo_final revised.pdf").
   Files live in /public: logo-gold(.webp|.png) at 720px wide and
   logo-gold-sm at 360px. */
const LOGO = 'gold'

export function Logo({ className = '', title = 'Raju Ghee Sweets', eager = false }) {
  return (
    <picture className={`logo ${className}`}>
      <source type="image/webp" srcSet={`/logo-${LOGO}-sm.webp 360w, /logo-${LOGO}.webp 720w`} sizes="(max-width: 1080px) 140px, 240px" />
      <img
        src={`/logo-${LOGO}.png`}
        srcSet={`/logo-${LOGO}-sm.png 360w, /logo-${LOGO}.png 720w`}
        sizes="(max-width: 1080px) 140px, 240px"
        width="720"
        height="406"
        alt={title}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
