import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { scrollToId } from '../../lib/motion.js'

/* Phone-only bottom bar: Home · Search · [Shop] · Cart · Contact.
   Hidden on wider screens (see .bnav in global.css). */

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const pick = () => {
      const mid = window.innerHeight * 0.45
      const at = (id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= mid && r.bottom > mid
      }
      const nearEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40
      if (nearEnd || at('visit')) setActive('visit')
      else if (at('shop')) setActive('shop')
      else if (window.scrollY < window.innerHeight * 0.6) setActive('top')
      else setActive('')
    }
    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [])
  return active
}

export default function BottomNav() {
  const { count, bump, openDrawer, openSearch, setCategory } = useStore()
  const active = useActiveSection()
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <nav className="bnav" aria-label="Quick links">
      <a href="#top" className={`bnav__item ${active === 'top' ? 'is-active' : ''}`} onClick={go('top')} aria-current={active === 'top' ? 'true' : undefined}>
        <Icon name="home" size={22} />
        <span>Home</span>
      </a>

      <button type="button" className="bnav__item" onClick={openSearch}>
        <Icon name="search" size={22} />
        <span>Search</span>
      </button>

      <a
        href="#shop"
        className={`bnav__item bnav__shop ${active === 'shop' ? 'is-active' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          setCategory('all')
          scrollToId('shop')
        }}
        aria-current={active === 'shop' ? 'true' : undefined}
      >
        <span className="bnav__orb" aria-hidden="true">
          <Icon name="bag" size={24} stroke={1.9} />
        </span>
        <span>Shop</span>
      </a>

      <button type="button" className="bnav__item" onClick={openDrawer} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
        <span className="bnav__icon">
          <Icon name="cart" size={22} />
          {count > 0 && (
            <motion.span
              key={bump}
              className="bnav__count"
              initial={bump ? { scale: 1.6 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 14 }}
            >
              {count}
            </motion.span>
          )}
        </span>
        <span aria-hidden="true">Cart</span>
      </button>

      <a href="#visit" className={`bnav__item ${active === 'visit' ? 'is-active' : ''}`} onClick={go('visit')} aria-current={active === 'visit' ? 'true' : undefined}>
        <Icon name="phone" size={21} />
        <span>Contact</span>
      </a>
    </nav>
  )
}
