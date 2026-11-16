import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Icon, { Brand } from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { Divider, Mandala, OrnateArch } from '../ui/Ornaments.jsx'
import { HERO_SLIDES, heroFor } from '../../data/content.js'
import { productById } from '../../data/products.js'
import { SITE, ext, rupees, shopStatus, waHref } from '../../config/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}
const stagger = {
  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}

function useShopStatus() {
  const [status, setStatus] = useState(() => shopStatus())
  useEffect(() => {
    const t = window.setInterval(() => setStatus(shopStatus()), 60_000)
    return () => window.clearInterval(t)
  }, [])
  return status
}

/* Shared by both hero looks: festival copy, cart, links, status. */
function useHero() {
  const { add, setCategory } = useStore()
  const status = useShopStatus()
  const season = useMemo(() => heroFor(new Date(), new URLSearchParams(window.location.search).get('season')), [])
  const go = (target) => (e) => {
    e.preventDefault()
    if (target.category) setCategory(target.category)
    scrollToId(target.href.slice(1))
  }
  const picksOf = (ids = []) => ids.map((id) => productById[id]).filter(Boolean)
  const waFor = (tag) => waHref(`Hi ${SITE.name}! I saw your ${tag} and would like to order.`)
  return { season, status, add, go, picksOf, waFor }
}

function Status({ status }) {
  return (
    <span className={`hero__status ${status.open ? 'is-open' : 'is-closed'}`}>
      <span className="hero__status-dot" aria-hidden="true" />
      <strong>{status.label}</strong> · {status.detail}
    </span>
  )
}

function Directions({ className = 'hero__directions' }) {
  return (
    <a className={className} href={SITE.mapsUrl} {...ext(SITE.mapsUrl)}>
      <Icon name="pin" size={16} /> {SITE.location}
    </a>
  )
}

function PickCard({ p, add }) {
  return (
    <span className="hero__pick-card">
      <span className="hero__pick-thumb">
        <Img img={p.img} sizes="44px" alt="" />
      </span>
      <span className="hero__pick-info">
        <strong>{p.name}</strong>
        <span>
          {rupees(p.price)} <small>/ {p.unit}</small>
        </span>
      </span>
      <button type="button" className="hero__pick-add" aria-label={`Add ${p.name} to cart`} onClick={() => add(p.id)}>
        <Icon name="plus" size={16} />
      </button>
    </span>
  )
}

/* ── Slideshow hero ─────────────────────────────────────────── */
const DURATION = 7000
const pad = (n) => String(n).padStart(2, '0')

function SlideHero() {
  const { season, go, waFor } = useHero()
  const reduce = useReducedMotion()
  const slides = useMemo(
    () => HERO_SLIDES.map((s) => (s.season ? { ...s, tag: season.tag, title: season.title, text: season.text, primary: season.primary } : s)),
    [season],
  )
  const count = slides.length
  // ?slide=2 opens on that slide (handy for previewing)
  const [index, setIndex] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('slide'))
    return n >= 1 && n <= HERO_SLIDES.length ? n - 1 : 0
  })
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const paused = hovered || focused || hidden || reduce
  const swipe = useRef(null)

  const show = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  // Load the first slide's photo straight away; fetch the others shortly
  // after the page has loaded (or as soon as someone moves to them).
  const [warm, setWarm] = useState(false)
  const [seen, setSeen] = useState(() => new Set([index]))
  useEffect(() => {
    setSeen((s) => (s.has(index) ? s : new Set(s).add(index)))
  }, [index])
  useEffect(() => {
    let t
    const go = () => (t = window.setTimeout(() => setWarm(true), 1000))
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      window.clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => show(index + 1), DURATION)
    return () => window.clearTimeout(t)
  }, [index, paused, show])

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') show(index + 1)
    if (e.key === 'ArrowLeft') show(index - 1)
  }
  const onPointerDown = (e) => {
    if (e.target.closest('a, button')) return
    swipe.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (swipe.current == null) return
    const dx = e.clientX - swipe.current
    swipe.current = null
    if (dx < -50) show(index + 1)
    else if (dx > 50) show(index - 1)
  }

  return (
    <section
      id="top"
      className="shero"
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="shero__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
        {slides.map((s, i) => {
          const active = i === index
          const Title = i === 0 ? motion.h1 : motion.h2
          const wa = waFor(s.tag)
          return (
            <div
              key={s.id}
              className={`shero__slide shero__slide--${s.align} ${s.cutout ? 'shero__slide--cutout' : ''} ${active ? 'is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.title.join(' ')}`}
              aria-hidden={!active}
              inert={!active}
            >
              <span className="shero__photo">
                {s.cutout && <Mandala className="shero__stage-mandala" strokeWidth={0.6} />}
                <motion.picture
                  className="shero__zoom"
                  initial={{ scale: reduce ? 1 : s.cutout ? 1.05 : 1.08 }}
                  animate={{ scale: active || reduce ? 1 : s.cutout ? 1.05 : 1.08 }}
                  transition={active ? { duration: DURATION / 1000 + 2, ease: 'easeOut' } : { duration: 0, delay: 1.2 }}
                >
                  {!(warm || seen.has(i)) ? null : s.cutout ? (
                    <img
                      src={s.img.local}
                      srcSet={s.srcSet}
                      sizes="(max-width: 900px) 92vw, min(62vw, 980px)"
                      alt={s.img.alt}
                      loading="eager"
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      decoding="async"
                      draggable="false"
                    />
                  ) : (
                    <>
                      <source type="image/webp" srcSet={`${s.srcBase}-1200.webp 1200w, ${s.srcBase}.webp 2048w`} sizes="100vw" />
                      <img
                        src={`${s.srcBase}.jpg`}
                        srcSet={`${s.srcBase}-1200.jpg 1200w, ${s.srcBase}.jpg 2048w`}
                        sizes="100vw"
                        alt={s.img.alt}
                        loading="eager"
                        fetchPriority={i === 0 ? 'high' : 'low'}
                        decoding="async"
                        draggable="false"
                        style={{ objectPosition: s.position }}
                      />
                    </>
                  )}
                </motion.picture>
              </span>
              <div className="shero__shade" aria-hidden="true" />

              <div className="container shero__content">
                <motion.div className="shero__copy" initial="hidden" animate={active ? 'show' : 'hidden'} variants={stagger}>
                  <Title variants={rise} id={i === 0 ? 'hero-title' : undefined} className="shero__title">
                    <span>{s.title[0]}</span>
                    <span className="shero__title-gold">{s.title[1]}</span>
                  </Title>

                  <motion.p variants={rise} className="shero__text">
                    {s.text}
                  </motion.p>

                  <motion.div variants={rise} className="shero__ctas">
                    <a className="btn shero__btn shero__btn--gold" href={s.primary.href} onClick={go(s.primary)}>
                      <span>{s.primary.label}</span> <Icon name="arrow" size={18} />
                    </a>
                    <a className="btn shero__btn shero__btn--ghost" href={wa} {...ext(wa)}>
                      <Brand name="whatsapp" size={18} /> <span>Order on WhatsApp</span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="shero__controls">
        <button type="button" className="shero__arrow" aria-label="Previous slide" onClick={() => show(index - 1)}>
          <Icon name="arrow" size={18} style={{ transform: 'scaleX(-1)' }} />
        </button>
        <span className="shero__count" aria-hidden="true">
          <strong>{pad(index + 1)}</strong> / {pad(count)}
        </span>
        <div className="shero__dots" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`shero__dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Show slide ${i + 1}: ${s.title.join(' ')}`}
              aria-current={i === index}
              onClick={() => show(i)}
            >
              {i === index && (
                <span key={index} className={`shero__dot-fill ${paused ? 'is-paused' : ''}`} style={{ animationDuration: `${DURATION}ms` }} />
              )}
            </button>
          ))}
        </div>
        <button type="button" className="shero__arrow" aria-label="Next slide" onClick={() => show(index + 1)}>
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </section>
  )
}

/* ── Arch hero: light ivory, ornate arched photo ─────────────── */
function ArchHero() {
  const { season: hero, status, add, go, picksOf, waFor } = useHero()
  const picks = picksOf(hero.picks)
  const wa = waFor(hero.tag)

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <Mandala className="hero__mandala hero__mandala--l" />
      <Mandala className="hero__mandala hero__mandala--r" />

      <div className="container hero__inner">
        <motion.div className="hero__copy" initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={rise} className="hero__tag">
            <span className="hero__tag-dot" aria-hidden="true" />
            {hero.tag}
          </motion.p>

          <motion.h1 variants={rise} id="hero-title" className="hero__title">
            <span className="hero__title-lead">{hero.title[0]}</span>
            <span className="hero__title-accent">{hero.title[1]}</span>
          </motion.h1>

          <motion.div variants={rise}>
            <Divider className="hero__divider" width={150} />
          </motion.div>

          <motion.p variants={rise} className="hero__text">
            {hero.text}
          </motion.p>

          <motion.div variants={rise} className="hero__ctas">
            <a className="btn hero__btn hero__btn--primary" href={hero.primary.href} onClick={go(hero.primary)}>
              <span>{hero.primary.label}</span> <Icon name="arrow" size={17} />
            </a>
            <a className="btn hero__btn hero__btn--ghost" href={wa} {...ext(wa)}>
              <Brand name="whatsapp" size={18} /> <span>Order on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div variants={rise} className="hero__visit">
            <Status status={status} />
            <Directions />
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <motion.div
            className="hero__halo"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <Mandala className="hero__halo-mandala" strokeWidth={0.6} />
          </motion.div>
          <div className="hero__floor" aria-hidden="true" />

          <motion.div
            className="hero__stage"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <OrnateArch className="hero__arch">
              <motion.span
                className="hero__photo"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
              >
                <Img img={hero.img} priority sizes="(max-width: 900px) 84vw, 480px" style={hero.position ? { objectPosition: hero.position } : undefined} />
              </motion.span>
            </OrnateArch>
          </motion.div>

          <motion.div
            className="hero__seal"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6, rotate: -28 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.9 }}
          >
            <span>Made with</span>
            <strong>Pure Ghee</strong>
          </motion.div>

          {picks.length > 0 && (
            <ul className="hero__picks" aria-label="Quick add">
              {picks.map((p, i) => (
                <motion.li
                  key={p.id}
                  className="hero__pick"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.8 + i * 0.14 }}
                >
                  <PickCard p={p} add={add} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const style = useMemo(() => new URLSearchParams(window.location.search).get('hero') || SITE.heroStyle, [])
  return style === 'arch' ? <ArchHero /> : <SlideHero />
}
