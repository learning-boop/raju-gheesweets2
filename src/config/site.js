// ─────────────────────────────────────────────────────────────
//  Store details — edit everything here.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Raju Ghee Sweets',
  nameTe: 'రాజు ఘీ స్వీట్స్',
  taglineTe: 'తరాలుగా తెలుగింటి తియ్యదనం', // "The sweetness of Telugu homes, for generations"

  location: 'Vijayatakies Centre, Vijayawada',
  address: 'Vijayatakies Centre, Arundalpet, Governor Peta, Vijayawada, Andhra Pradesh 520002',
  hours: 'Open every day · 9:00 AM – 10:00 PM',
  // Homepage hero look: 'slides' (full-width photo slideshow) or 'arch'
  // (light hero with an arched photo). Preview with ?hero=arch / ?hero=slides.
  heroStyle: 'slides',
  // Used for the live "Open now" badge. 24-hour clock, shop's local time.
  openHours: { open: 9, close: 22, timeZone: 'Asia/Kolkata' },

  // ⚠ The number below is the dummy number from the design mockup. Replace it.
  phone: '+91 98765 43210',
  // WhatsApp number, digits only with country code (e.g. '919876543210').
  // Leave empty and the WhatsApp buttons scroll to the contact section instead.
  whatsapp: '',

  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Raju+Ghee+Sweets+Vijayatakies+Centre+Vijayawada',

  branches: [
    { name: 'MG Road', address: '' },
    { name: 'Eluru Road', address: '' },
  ],

  social: { facebook: '', instagram: '', youtube: '' },
}

export const telHref = `tel:${SITE.phone.replace(/[^\d+]/g, '')}`

export function waHref(message = `Hi ${SITE.name}! I would like to place an order.`) {
  if (!SITE.whatsapp) return '#visit'
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export const isExternal = (href) => /^https?:/.test(href)
export const ext = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const fmtHour = (h) => `${((h + 11) % 12) + 1} ${h < 12 ? 'AM' : 'PM'}`

/** Live shop status, e.g. { open: true, label: 'Open now', detail: 'closes 10 PM' }. */
export function shopStatus(now = new Date()) {
  const { open, close, timeZone } = SITE.openHours
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now)
  const get = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0)
  const mins = get('hour') * 60 + get('minute')
  if (mins >= open * 60 && mins < close * 60) {
    const soon = close * 60 - mins <= 60
    return { open: true, label: soon ? 'Closing soon' : 'Open now', detail: `closes ${fmtHour(close)}` }
  }
  return { open: false, label: 'Closed now', detail: `opens ${fmtHour(open)}${mins >= close * 60 ? ' tomorrow' : ''}` }
}

export const rupees = (n) => `₹ ${n.toLocaleString('en-IN')}`
