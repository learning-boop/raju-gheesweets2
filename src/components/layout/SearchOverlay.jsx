import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { CATEGORIES, PRODUCTS } from '../../data/products.js'
import { rupees } from '../../config/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE } from '../../lib/motion.js'

const catLabel = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]))
const SUGGEST = ['Laddu', 'Kaju', 'Ariselu', 'Mixture', 'Gift box']
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9ఀ-౿]+/g, ' ').trim()

function SearchPanel() {
  const { closeSearch, add, cart } = useStore()
  const [q, setQ] = useState('')

  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    const onKey = (e) => e.key === 'Escape' && closeSearch()
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [closeSearch])

  const results = useMemo(() => {
    const n = norm(q)
    if (!n) return []
    return PRODUCTS.filter((p) => norm(`${p.name} ${p.te} ${p.note ?? ''} ${p.cats.map((c) => catLabel[c]).join(' ')}`).includes(n))
  }, [q])

  return (
    <motion.div className="overlay overlay--search" onClick={closeSearch} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="search"
        role="dialog"
        aria-modal="true"
        aria-label="Search sweets"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="search__bar">
          <Icon name="search" size={22} />
          <input
            type="search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search laddu, kaju katli, ariselu…"
            aria-label="Search sweets and snacks"
            aria-controls="search-results"
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={closeSearch}>
            <Icon name="close" size={22} />
          </button>
        </div>

        {!q && (
          <div className="search__suggest">
            <span>Popular:</span>
            {SUGGEST.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => setQ(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <ul id="search-results" className="search__results" aria-live="polite">
          {q && results.length === 0 && <li className="search__none">No sweets match “{q}”. Try another name, or call us. We probably make it.</li>}
          {results.map((p) => (
            <li key={p.id} className="result">
              <span className="result__img">
                <Img img={p.img} sizes="56px" alt="" />
              </span>
              <span className="result__info">
                <strong>{p.name}</strong> <span className="te" lang="te">{p.te}</span>
                <small>
                  {rupees(p.price)} / {p.unit}
                </small>
              </span>
              <button type="button" className="btn btn--primary btn--sm" onClick={() => add(p.id)}>
                {cart[p.id] ? (
                  <>
                    <Icon name="check" size={15} /> {cart[p.id]} in cart
                  </>
                ) : (
                  <>
                    <Icon name="plus" size={15} /> Add
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function SearchOverlay() {
  const { searchOpen } = useStore()
  return <AnimatePresence>{searchOpen && <SearchPanel />}</AnimatePresence>
}
