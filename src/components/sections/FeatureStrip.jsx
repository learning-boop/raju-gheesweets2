import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Mandala } from '../ui/Ornaments.jsx'
import { FEATURES } from '../../data/content.js'
import { EASE } from '../../lib/motion.js'

export default function FeatureStrip() {
  return (
    <section className="features" aria-label="Why Raju Ghee Sweets">
      <Mandala className="features__mandala features__mandala--l" />
      <Mandala className="features__mandala features__mandala--r" />
      <motion.ul
        className="container features__list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {FEATURES.map((f) => (
          <motion.li
            key={f.icon}
            className="feature"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
          >
            <span className="feature__icon">
              <Icon name={f.icon} size={36} stroke={1.3} />
            </span>
            <span className="feature__text">
              {f.lines[0]}
              <br />
              {f.lines[1]}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
