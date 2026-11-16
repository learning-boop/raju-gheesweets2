import Icon, { Brand } from '../ui/Icon.jsx'
import { Reveal } from '../ui/motion.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { SITE, ext, telHref, waHref } from '../../config/site.js'

export default function Visit() {
  const wa = waHref()
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(`${SITE.name}, ${SITE.address}`)}&output=embed`
  return (
    <section id="visit" className="visit" aria-labelledby="visit-title">
      <div className="container">
        <Reveal>
          <SectionTitle id="visit-title">Visit Our Shop</SectionTitle>
          <p className="visit__lead">
            Walk in to Vijayatakies Centre for the full counter of sweets and hots, or call ahead and we will keep your order packed and ready.
          </p>
        </Reveal>

        <div className="visit__grid">
          <Reveal className="visit__card">
            <dl className="visit__list">
              <div>
                <dt>
                  <Icon name="pin" size={20} /> Address
                </dt>
                <dd>{SITE.address}</dd>
              </div>
              <div>
                <dt>
                  <Icon name="clock" size={20} /> Hours
                </dt>
                <dd>{SITE.hours}</dd>
              </div>
              <div>
                <dt>
                  <Icon name="phone" size={20} /> Phone
                </dt>
                <dd>
                  <a href={telHref}>{SITE.phone}</a>
                </dd>
              </div>
              {SITE.branches.some((b) => b.address) && (
                <div>
                  <dt>
                    <Icon name="pin" size={20} /> Branches
                  </dt>
                  <dd>
                    {SITE.branches
                      .filter((b) => b.address)
                      .map((b) => (
                        <span key={b.name} className="visit__branch">
                          <strong>{b.name}</strong> · {b.address}
                        </span>
                      ))}
                  </dd>
                </div>
              )}
            </dl>
            <div className="visit__actions">
              <a className="btn btn--primary" href={SITE.mapsUrl} {...ext(SITE.mapsUrl)}>
                <Icon name="pin" size={18} /> Get Directions
              </a>
              <a className="btn btn--outline-gold" href={telHref}>
                <Icon name="phone" size={18} /> Call Now
              </a>
              {SITE.whatsapp && (
                <a className="btn btn--outline-gold" href={wa} {...ext(wa)}>
                  <Brand name="whatsapp" size={18} /> WhatsApp
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="visit__map" delay={0.1}>
            <iframe title={`Map to ${SITE.name}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
