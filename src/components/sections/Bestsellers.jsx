import { motion } from 'framer-motion'
import ProductCard from '../ui/ProductCard.jsx'
import { Reveal } from '../ui/motion.jsx'
import { Mandala } from '../ui/Ornaments.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { BESTSELLERS, productById } from '../../data/products.js'
import { EASE } from '../../lib/motion.js'

export default function Bestsellers() {
  const items = BESTSELLERS.map((id) => productById[id]).filter(Boolean)
  return (
    <section className="best" aria-labelledby="best-title">
      <div className="container">
        <Reveal>
          <SectionTitle id="best-title">Bestsellers</SectionTitle>
        </Reveal>
        <motion.div
          className="best__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          {items.map((p) => (
            <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } }}>
              <ProductCard product={p} variant="compact" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Mandala className="corner corner--tr corner--faint" />
    </section>
  )
}
