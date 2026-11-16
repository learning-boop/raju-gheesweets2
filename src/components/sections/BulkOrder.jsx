import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon, { Brand } from '../ui/Icon.jsx'
import { Reveal } from '../ui/motion.jsx'
import { Mandala } from '../ui/Ornaments.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { IMAGES } from '../../data/images.js'
import { OCCASIONS } from '../../data/content.js'
import { SITE, telHref, waHref } from '../../config/site.js'
import { EASE } from '../../lib/motion.js'

const POINTS = ['Wedding & engagement trays', 'Return-gift boxes with your name', 'Corporate Diwali & Sankranti gifting', 'Hots & sweets for functions, made fresh']

const EMPTY = { name: '', phone: '', occasion: OCCASIONS[0], date: '', qty: '', notes: '' }

export default function BulkOrder() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const today = new Date().toISOString().slice(0, 10)

  const submit = (e) => {
    e.preventDefault()
    const msg = [
      `Hi ${SITE.name}! Bulk order enquiry:`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Occasion: ${form.occasion}`,
      form.date && `Date: ${new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      form.qty && `Quantity / guests: ${form.qty}`,
      form.notes && `Sweets & notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join('\n')
    if (SITE.whatsapp) {
      window.open(waHref(msg), '_blank', 'noopener')
      setSent('whatsapp')
    } else {
      setSent('call')
    }
  }

  return (
    <section id="bulk" className="bulk" aria-labelledby="bulk-title">
      <Mandala className="bulk__mandala" />
      <div className="container bulk__inner">
        <Reveal className="bulk__visual" y={40}>
          <img
            className="bulk__photo"
            src={IMAGES.bulkGift.local}
            srcSet="/images/bulk-gift-560.webp 560w, /images/bulk-gift.webp 900w"
            sizes="(max-width: 900px) 80vw, 440px"
            width="900"
            height="1120"
            alt={IMAGES.bulkGift.alt}
            loading="lazy"
            decoding="async"
          />
          <div className="bulk__stamp" aria-hidden="true">
            <strong>100+</strong>
            <span>
              kg orders
              <br />
              welcome
            </span>
          </div>
        </Reveal>

        <div className="bulk__copy">
          <Reveal>
            <SectionTitle id="bulk-title">Bulk Orders</SectionTitle>
            <p className="bulk__lead">
              Planning a wedding, a house-warming or a festival at the office? Tell us the date and how many guests. We will suggest a menu, quote a price and pack everything fresh.
            </p>
            <ul className="bulk__points">
              {POINTS.map((p) => (
                <li key={p}>
                  <Icon name="check" size={18} /> {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="form" onSubmit={submit}>
              <div className="form__row">
                <label className="field">
                  <span>Your name</span>
                  <input required autoComplete="name" value={form.name} onChange={set('name')} placeholder="e.g. Lakshmi" />
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input required type="tel" autoComplete="tel" inputMode="tel" pattern="\+?[0-9 ]{10,14}" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" />
                </label>
              </div>
              <div className="form__row form__row--3">
                <label className="field">
                  <span>Occasion</span>
                  <select value={form.occasion} onChange={set('occasion')}>
                    {OCCASIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Date</span>
                  <input type="date" min={today} value={form.date} onChange={set('date')} />
                </label>
                <label className="field">
                  <span>Quantity / guests</span>
                  <input value={form.qty} onChange={set('qty')} placeholder="e.g. 20 kg / 300 guests" />
                </label>
              </div>
              <label className="field">
                <span>Sweets you have in mind (optional)</span>
                <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Ghee laddu, kaju katli, mixture…" />
              </label>
              <div className="form__foot">
                <button type="submit" className="btn btn--primary">
                  <Brand name="whatsapp" size={18} /> Send Enquiry
                </button>
                <a className="form__call" href={telHref}>
                  <Icon name="phone" size={17} /> or call {SITE.phone}
                </a>
              </div>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    className="form__status"
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Icon name="check" size={18} />
                    {sent === 'whatsapp' ? (
                      <span>WhatsApp opened with your details. Press send and we will reply with a quote.</span>
                    ) : (
                      <span>
                        Thank you, {form.name.split(' ')[0] || 'friend'}! Please call us at <a href={telHref}>{SITE.phone}</a> and we will plan your order.
                      </span>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
