import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Divider, Lotus, Mandala } from '../ui/Ornaments.jsx'
import { STORY } from '../../data/content.js'
import { SITE } from '../../config/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE, scrollToId } from '../../lib/motion.js'

/* Faint line drawing of a temple skyline behind the story text. */
function TempleSketch() {
  return (
    <svg className="story__sketch" viewBox="0 0 260 150" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <path d="M10 140h240" />
      <path d="M95 140V78h70v62M95 78c0-22 15-36 35-42 20 6 35 20 35 42M130 36V22m0 0c-3 3-3 6 0 8 3-2 3-5 0-8" />
      <path d="M110 140v-34a20 20 0 0 1 40 0v34M120 70h20M101 92h58" />
      <path d="M30 140V96h40v44M30 96c0-12 9-20 20-22 11 2 20 10 20 22M50 74v-8M40 140v-20a10 10 0 0 1 20 0v20" />
      <path d="M190 140V96h40v44M190 96c0-12 9-20 20-22 11 2 20 10 20 22M210 74v-8M200 140v-20a10 10 0 0 1 20 0v20" />
      <path d="M70 140v-28h25M165 112h25v28M18 140v-30h12M230 110h12v30" />
      <path d="M86 78h88M90 84h80" />
    </svg>
  )
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function Story() {
  const { setCategory } = useStore()
  const go = (id, cat) => (e) => {
    e.preventDefault()
    if (cat) setCategory(cat)
    scrollToId(id)
  }

  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <Mandala className="story__mandala" strokeWidth={0.6} />

      <div className="container story__inner">
        <div className="story__visual">
          <motion.div
            className="story__glow"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <Mandala className="story__ring" strokeWidth={0.7} />

          <motion.figure
            className="story__picture"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img src={STORY.img.local} alt={STORY.img.alt} width="900" height="900" loading="lazy" decoding="async" />
          </motion.figure>
        </div>

        <motion.div
          className="story__copy"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <TempleSketch />

          <motion.p variants={rise} className="story__eyebrow">
            <Lotus size={22} /> {STORY.eyebrow}
          </motion.p>

          <motion.h2 variants={rise} id="story-title" className="story__title">
            <span>{STORY.title[0]}</span>
            <span className="story__title-accent">{STORY.title[1]}</span>
          </motion.h2>

          <motion.blockquote variants={rise} className="story__quote">
            {STORY.quote}
          </motion.blockquote>

          <motion.p variants={rise} className="story__text">
            {STORY.text}
          </motion.p>

          <motion.div variants={rise} className="story__sign">
            <Divider width={120} />
            <p className="story__te" lang="te">
              {SITE.taglineTe}
            </p>
          </motion.div>

          <motion.div variants={rise} className="story__ctas">
            <a className="btn hero__btn hero__btn--primary" href="#shop" onClick={go('shop', 'all')}>
              <span>Explore Our Sweets</span> <Icon name="arrow" size={17} />
            </a>
            <a className="btn hero__btn hero__btn--ghost" href="#visit" onClick={go('visit')}>
              <Icon name="pin" size={17} /> <span>Visit Our Shop</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
