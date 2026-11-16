import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon, { Brand } from '../ui/Icon.jsx'
import { Logo, Mandala } from '../ui/Ornaments.jsx'
import { SITE, ext, telHref, waHref } from '../../config/site.js'
import { CATEGORIES } from '../../data/products.js'
import { CREDITS } from '../../data/images.js'
import { useStore } from '../../store/StoreContext.jsx'
import { scrollToId } from '../../lib/motion.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { setCategory } = useStore()
  const [credits, setCredits] = useState(false)
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }
  const pick = (id) => {
    setCategory(id)
    scrollToId('shop')
  }
  const socials = [
    { name: 'whatsapp', label: 'WhatsApp', href: waHref() },
    { name: 'facebook', label: 'Facebook', href: SITE.social.facebook },
    { name: 'instagram', label: 'Instagram', href: SITE.social.instagram },
    { name: 'youtube', label: 'YouTube', href: SITE.social.youtube },
  ].map((s) => ({ ...s, href: s.href || '#' }))
  const photos = CREDITS.filter((c) => c.provider !== 'local')

  return (
    <footer className="footer">
      <Mandala className="footer__mandala" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo className="footer__logo" />
          <p className="footer__te te" lang="te">{SITE.taglineTe}</p>
          <p>Pure ghee sweets, Andhra specials and fresh hots from Vijayatakies Centre, Vijayawada.</p>
          <ul className="socials socials--footer" aria-label="Follow us">
            {socials.map((s) => (
              <li key={s.name}>
                <a className={`social social--${s.name}`} href={s.href} aria-label={s.label} {...ext(s.href)}>
                  <Brand name={s.name} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li><a href="#top" onClick={go('top')}>Home</a></li>
            <li><a href="#story" onClick={go('story')}>Our Story</a></li>
            <li><a href="#shop" onClick={go('shop')}>Shop Online</a></li>
            <li><a href="#bulk" onClick={go('bulk')}>Bulk Orders</a></li>
            <li><a href="#visit" onClick={go('visit')}>Contact</a></li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2>Our Sweets</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => pick(c.id)}>{c.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__contact">
          <h2>Visit Us</h2>
          <p>
            <Icon name="pin" size={18} />
            <a href={SITE.mapsUrl} {...ext(SITE.mapsUrl)}>{SITE.address}</a>
          </p>
          <p>
            <Icon name="phone" size={18} />
            <a href={telHref}>{SITE.phone}</a>
          </p>
          <p>
            <Icon name="clock" size={18} />
            <span>{SITE.hours}</span>
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {YEAR} {SITE.name}. All rights reserved.</p>
        <button type="button" className="footer__credits-btn" aria-expanded={credits} aria-controls="photo-credits" onClick={() => setCredits((c) => !c)}>
          Photo credits <Icon name="chevron" size={14} className={credits ? 'is-flipped' : ''} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {credits && (
          <motion.div
            id="photo-credits"
            className="container footer__credits"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul>
              {photos.map((c) => (
                <li key={c.key}>
                  <a href={c.page} target="_blank" rel="noopener noreferrer">{c.alt}</a> by {c.by} on {c.provider === 'pexels' ? 'Pexels' : 'Unsplash'}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
