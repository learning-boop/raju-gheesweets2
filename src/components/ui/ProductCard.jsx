import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { Img } from './motion.jsx'
import { rupees } from '../../config/site.js'
import { useStore } from '../../store/StoreContext.jsx'

/* Quantity stepper shared by the cards, the cart drawer and search. */
export function QtyStepper({ id, qty, size = 'md', label }) {
  const { setQty } = useStore()
  return (
    <div className={`stepper stepper--${size}`} role="group" aria-label={`Quantity of ${label}`}>
      <button type="button" aria-label={`One less ${label}`} onClick={() => setQty(id, qty - 1)}>
        <Icon name={qty > 1 ? 'minus' : 'trash'} size={size === 'sm' ? 14 : 16} />
      </button>
      <motion.output key={qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-live="polite">
        {qty}
      </motion.output>
      <button type="button" aria-label={`One more ${label}`} onClick={() => setQty(id, qty + 1)}>
        <Icon name="plus" size={size === 'sm' ? 14 : 16} />
      </button>
    </div>
  )
}

export default function ProductCard({ product, variant = 'default' }) {
  const { cart, add } = useStore()
  const qty = cart[product.id] || 0
  return (
    <article className={`card card--${variant}`}>
      <div className="card__media">
        <Img img={product.img} sizes="(max-width: 640px) 50vw, 260px" alt={product.img.alt} />
        {product.badge && <span className="card__badge">{product.badge}</span>}
      </div>
      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        {variant !== 'compact' && <p className="card__te te" lang="te">{product.te}</p>}
        <p className="card__price">
          <strong>{rupees(product.price)}</strong> / {product.unit}
        </p>
        <div className="card__action">
          <AnimatePresence mode="wait" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                type="button"
                className="btn btn--primary btn--sm card__add"
                onClick={() => add(product.id)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="cart" size={16} /> Add to Cart
              </motion.button>
            ) : (
              <motion.div key="qty" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.18 }}>
                <QtyStepper id={product.id} qty={qty} label={product.name} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}
