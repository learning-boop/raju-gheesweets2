import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon, { Brand } from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { Divider, Lotus } from '../ui/Ornaments.jsx'
import { QtyStepper } from '../ui/ProductCard.jsx'
import { SITE, ext, rupees, telHref, waHref } from '../../config/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, count, total, remove, clear, orderMessage, setCategory } = useStore()
  const panel = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', drawerOpen)
    if (!drawerOpen) return
    const prev = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [drawerOpen, closeDrawer])

  const checkout = SITE.whatsapp ? waHref(orderMessage()) : telHref
  const browse = () => {
    closeDrawer()
    setCategory('all')
    window.setTimeout(() => scrollToId('shop'), 50)
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div className="overlay overlay--right" onClick={closeDrawer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.aside
            ref={panel}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <header className="drawer__head">
              <h2 id="cart-title">
                Your Cart <span>({count} {count === 1 ? 'item' : 'items'})</span>
              </h2>
              <button type="button" className="icon-btn" aria-label="Close cart" onClick={closeDrawer} autoFocus>
                <Icon name="close" size={24} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="drawer__empty">
                <Lotus size={56} />
                <p>Your cart is empty.</p>
                <p className="drawer__hint">Add a few favourites and send the order to us on WhatsApp.</p>
                <button type="button" className="btn btn--primary" onClick={browse}>
                  Browse Sweets <Icon name="arrow" size={17} />
                </button>
              </div>
            ) : (
              <>
                <ul className="drawer__lines">
                  <AnimatePresence initial={false}>
                    {lines.map(({ product: p, qty }) => (
                      <motion.li
                        key={p.id}
                        layout
                        className="line"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <span className="line__img">
                          <Img img={p.img} sizes="72px" alt="" />
                        </span>
                        <div className="line__info">
                          <p className="line__name">{p.name}</p>
                          <p className="line__unit">
                            {rupees(p.price)} / {p.unit}
                          </p>
                          <QtyStepper id={p.id} qty={qty} size="sm" label={p.name} />
                        </div>
                        <div className="line__end">
                          <p className="line__total">{rupees(p.price * qty)}</p>
                          <button type="button" className="line__remove" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`}>
                            Remove
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="drawer__foot">
                  <Divider width={180} className="drawer__divider" />
                  <div className="drawer__total">
                    <span>Total</span>
                    <motion.strong key={total} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                      {rupees(total)}
                    </motion.strong>
                  </div>
                  <p className="drawer__note">Pay at the shop or on delivery. We confirm the final amount and delivery charge on WhatsApp.</p>
                  <a className="btn btn--primary btn--block" href={checkout} {...ext(checkout)}>
                    {SITE.whatsapp ? <Brand name="whatsapp" size={19} /> : <Icon name="phone" size={18} />}
                    {SITE.whatsapp ? 'Order on WhatsApp' : `Call to Order · ${SITE.phone}`}
                  </a>
                  <button type="button" className="drawer__clear" onClick={clear}>
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
