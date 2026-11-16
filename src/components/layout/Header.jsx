import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon, { Brand } from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { Logo, Mandala } from '../ui/Ornaments.jsx'
import { SITE, ext, telHref, waHref } from '../../config/site.js'
import { CATEGORIES } from '../../data/products.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

const SOCIALS = [
  { name: 'whatsapp', label: 'WhatsApp', href: () => waHref() },
  { name: 'facebook', label: 'Facebook', href: () => SITE.social.facebook || '#' },
  { name: 'instagram', label: 'Instagram', href: () => SITE.social.instagram || '#' },
  { name: 'youtube', label: 'YouTube', href: () => SITE.social.youtube || '#' },
]

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <a className="topbar__loc" href={SITE.mapsUrl} {...ext(SITE.mapsUrl)}>
          <Icon name="pin" size={16} />
          <span>{SITE.location}</span>
        </a>
        <div className="topbar__right">
          <a className="topbar__phone" href={telHref}>
            <Icon name="phone" size={16} />
            <span>{SITE.phone}</span>
          </a>
          <span className="topbar__sep" aria-hidden="true" />
          <ul className="socials" aria-label="Follow us">
            {SOCIALS.map((s) => {
              const href = s.href()
              return (
                <li key={s.name}>
                  <a className={`social social--${s.name}`} href={href} aria-label={s.label} {...ext(href)}>
                    <Brand name={s.name} size={14} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function SweetsMenu({ onPick }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => !wrap.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div className="dropdown" ref={wrap} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="nav__link" aria-expanded={open} aria-controls="sweets-menu" onClick={() => setOpen((o) => !o)}>
        Our Sweets <Icon name="chevron" size={16} className={open ? 'is-flipped' : ''} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="sweets-menu"
            className="dropdown__panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="dropdown__item"
                onClick={() => {
                  setOpen(false)
                  onPick(c.id)
                }}
              >
                <span className="dropdown__thumb">
                  <Img img={c.img} sizes="44px" alt="" />
                </span>
                <span>
                  <strong>{c.label}</strong>
                  <span className="te">{c.te}</span>
                </span>
              </button>
            ))}
            <button type="button" className="dropdown__all" onClick={() => { setOpen(false); onPick('all') }}>
              See all sweets <Icon name="arrow" size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const { count, bump, openDrawer, openSearch, setCategory } = useStore()
  const [compact, setCompact] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', menu)
    if (!menu) return
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])

  const go = (id) => (e) => {
    e?.preventDefault()
    setMenu(false)
    scrollToId(id)
  }
  const pick = (cat) => {
    setMenu(false)
    setCategory(cat)
    scrollToId('shop')
  }

  return (
    <>
      <header className={`header ${compact ? 'is-compact' : ''}`}>
        <Mandala className="header__mandala header__mandala--l" />
        <Mandala className="header__mandala header__mandala--r" />
        <div className="container header__inner">
          <button type="button" className="icon-btn header__burger" aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(true)}>
            <Icon name="menu" size={24} />
          </button>

          <nav className="nav nav--left" aria-label="Main">
            <a className="nav__link is-active" href="#top" onClick={go('top')} aria-current="page">Home</a>
            <SweetsMenu onPick={pick} />
            <a className="nav__link" href="#story" onClick={go('story')}>Our Story</a>
          </nav>

          <a className="header__logo" href="#top" onClick={go('top')} aria-label={`${SITE.name}, home`}>
            <Logo eager />
            <span className="header__tagline te" aria-hidden={compact}>{SITE.taglineTe}</span>
          </a>

          <div className="header__right">
            <nav className="nav nav--right" aria-label="More">
              <a className="nav__link" href="#bulk" onClick={go('bulk')}>Bulk Orders</a>
              <a className="nav__link" href="#visit" onClick={go('visit')}>Contact</a>
            </nav>
            <div className="header__icons">
              <button type="button" className="icon-btn" aria-label="Search sweets" onClick={openSearch}>
                <Icon name="search" size={24} />
              </button>
              <button type="button" className="icon-btn cart-btn" aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={openDrawer}>
                <Icon name="cart" size={25} />
                <motion.span
                  key={bump}
                  className="cart-btn__count"
                  initial={bump ? { scale: 1.6 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                >
                  {count}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="overlay" onClick={() => setMenu(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside
              id="mobile-menu"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="mobile-menu__head">
                <Logo className="mobile-menu__logo" />
                <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)} autoFocus>
                  <Icon name="close" size={24} />
                </button>
              </div>
              <nav className="mobile-menu__nav" aria-label="Mobile">
                <a href="#top" onClick={go('top')}>Home</a>
                <a href="#shop" onClick={(e) => { e.preventDefault(); pick('all') }}>Our Sweets</a>
                <div className="mobile-menu__cats">
                  {CATEGORIES.map((c) => (
                    <button key={c.id} type="button" onClick={() => pick(c.id)}>{c.label}</button>
                  ))}
                </div>
                <a href="#story" onClick={go('story')}>Our Story</a>
                <a href="#bulk" onClick={go('bulk')}>Bulk Orders</a>
                <a href="#visit" onClick={go('visit')}>Contact</a>
              </nav>
              <div className="mobile-menu__foot">
                <p className="te">{SITE.taglineTe}</p>
                <a href={telHref} className="mobile-menu__phone"><Icon name="phone" size={18} /> {SITE.phone}</a>
                <p>{SITE.hours}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
