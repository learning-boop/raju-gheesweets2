import { motion } from 'framer-motion'
import { Img } from '../ui/motion.jsx'
import { ArchFrame, Mandala } from '../ui/Ornaments.jsx'
import { CATEGORIES } from '../../data/products.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

export default function Categories() {
  const { setCategory } = useStore()
  const pick = (id) => {
    setCategory(id)
    scrollToId('shop')
  }
  return (
    <section className="cats" aria-labelledby="cats-title">
      <Mandala className="corner corner--bl" />
      <Mandala className="corner corner--br" />
      <h2 id="cats-title" className="sr-only">Shop by category</h2>
      <motion.ul
        className="container cats__list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {CATEGORIES.map((c) => (
          <motion.li key={c.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
            <button type="button" className="cat" onClick={() => pick(c.id)}>
              <ArchFrame className="cat__arch">
                <Img img={c.img} sizes="(max-width: 560px) 46vw, (max-width: 1080px) 31vw, 380px" alt="" className="cat__img" style={c.position ? { objectPosition: c.position } : undefined} />
              </ArchFrame>
              <span className="cat__label">{c.label}</span>
              <span className="cat__te te" lang="te">{c.te}</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
