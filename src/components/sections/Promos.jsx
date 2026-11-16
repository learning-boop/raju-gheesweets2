import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Icon from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { Divider, Mandala } from '../ui/Ornaments.jsx'
import { IMAGES } from '../../data/images.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

const PROMOS = [
  {
    id: 'gifts',
    eyebrow: 'Festive gifting',
    title: 'Gift Boxes for Every Celebration',
    text: 'Assorted ghee sweets in a gold box. Ask us for custom boxes with your name for weddings and offices.',
    cta: 'Shop Gift Boxes',
    img: IMAGES.diyaTray,
    category: 'gifts',
  },
  {
    id: 'hots',
    eyebrow: 'Fresh every morning',
    title: 'Crispy Hots & Savouries',
    text: 'Mixture, janthikalu, ribbon pakodi and banana chips, fried fresh for your evening tea.',
    cta: 'Shop Hots',
    img: IMAGES.mixture,
    category: 'hots',
  },
]

function Promo({ promo, index }) {
  const { setCategory } = useStore()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <motion.article
      ref={ref}
      className={`promo promo--${promo.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
    >
      <motion.div className="promo__photo" style={{ y }}>
        <Img img={promo.img} sizes="(max-width: 900px) 100vw, 50vw" />
      </motion.div>
      <div className="promo__shade" aria-hidden="true" />
      <Mandala className="promo__mandala" />
      <div className="promo__copy">
        <p className="eyebrow eyebrow--light">{promo.eyebrow}</p>
        <h3 className="promo__title">{promo.title}</h3>
        <Divider width={130} className="promo__divider" />
        <p className="promo__text">{promo.text}</p>
        <button
          type="button"
          className="btn btn--gold"
          onClick={() => {
            setCategory(promo.category)
            scrollToId('shop')
          }}
        >
          {promo.cta} <Icon name="arrow" size={17} />
        </button>
      </div>
    </motion.article>
  )
}

export default function Promos() {
  return (
    <section className="promos" aria-label="Offers">
      <div className="container promos__grid">
        {PROMOS.map((p, i) => (
          <Promo key={p.id} promo={p} index={i} />
        ))}
      </div>
    </section>
  )
}
