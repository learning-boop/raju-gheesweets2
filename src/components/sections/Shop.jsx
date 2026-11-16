import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import ProductCard from '../ui/ProductCard.jsx'
import { Divider } from '../ui/Ornaments.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { BESTSELLERS, CATEGORIES, PRODUCTS } from '../../data/products.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE } from '../../lib/motion.js'

const TABS = [{ id: 'all', label: 'All Sweets' }, ...CATEGORIES]
const FIRST = 10 // cards shown before “Show all”

// In “All Sweets”, bestsellers go last: they already have their own row above.
const ALL = [...PRODUCTS.filter((p) => !BESTSELLERS.includes(p.id)), ...PRODUCTS.filter((p) => BESTSELLERS.includes(p.id))]

export default function Shop() {
  const { category, setCategory } = useStore()
  const tabsRef = useRef(null)
  const list = useMemo(() => (category === 'all' ? ALL : PRODUCTS.filter((p) => p.cats.includes(category))), [category])
  const active = TABS.find((t) => t.id === category) ?? TABS[0]
  const [openCat, setOpenCat] = useState(null)
  const expanded = openCat === category
  const shown = expanded ? list : list.slice(0, FIRST)

  const onKey = (e) => {
    const i = TABS.findIndex((t) => t.id === category)
    let next = null
    if (e.key === 'ArrowRight') next = (i + 1) % TABS.length
    if (e.key === 'ArrowLeft') next = (i - 1 + TABS.length) % TABS.length
    if (next === null) return
    e.preventDefault()
    setCategory(TABS[next].id)
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus()
  }

  return (
    <section id="shop" className="shop" aria-labelledby="shop-title">
      <div className="container">
        <header className="shop__head">
          <SectionTitle id="shop-title">Our Sweets &amp; Snacks</SectionTitle>
          <p className="shop__sub">Made fresh every morning in our kitchen at Vijayatakies Centre. Add to your cart and send the order to us on WhatsApp.</p>
        </header>

        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label="Categories" ref={tabsRef} onKeyDown={onKey}>
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={t.id === category}
                aria-controls="shop-panel"
                tabIndex={t.id === category ? 0 : -1}
                className={`tab ${t.id === category ? 'is-active' : ''}`}
                onClick={() => setCategory(t.id)}
              >
                {t.id === category && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                <span className="tab__label">{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <div className="shop__meta">
          <Divider width={120} />
          <p aria-live="polite">
            {active.id === 'all' ? 'Everything we make' : active.label} · {list.length} {list.length === 1 ? 'item' : 'items'}
          </p>
          <Divider width={120} />
        </div>

        <motion.div id="shop-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="shop__grid" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE, delay: Math.min(i % FIRST, 8) * 0.035 } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length > FIRST && (
          <div className="shop__more">
            <button type="button" className="btn btn--outline-gold" aria-expanded={expanded} aria-controls="shop-panel" onClick={() => setOpenCat(expanded ? null : category)}>
              {expanded ? 'Show fewer' : `Show all ${list.length} items`} <Icon name="chevron" size={17} className={expanded ? 'is-flipped' : ''} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
