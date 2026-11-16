import { IMAGES as I } from './images.js'

// ─────────────────────────────────────────────────────────────
//  Hero: one featured message, chosen by today's date.
//
//  `from` / `to` are 'MM-DD' (inclusive). Festival dates move a little
//  each year, so check the windows once a year. A window may wrap past
//  New Year (e.g. from '12-20' to '01-05'). The first match wins; if
//  nothing matches, DEFAULT_HERO is shown.
//
//  `img` is from images.js; `position` (optional) is its CSS object-position
//  inside the arch. `picks` are product ids from products.js shown as quick-add cards.
//  Preview any season with ?season=<id> in the address bar.
// ─────────────────────────────────────────────────────────────
export const HERO_SEASONS = [
  {
    id: 'sankranti',
    from: '01-01',
    to: '01-20',
    tag: 'Sankranti specials',
    title: ['Sankranti Sweets,', 'Made the Old Way'],
    text: 'Ariselu, nuvvula laddu and bobbatlu, fried and set in pure ghee every morning.',
    img: I.nuvvulaLaddu,
    primary: { label: 'Shop Sankranti Sweets', href: '#shop', category: 'specials' },
    picks: ['ariselu', 'nuvvula-laddu'],
  },
  {
    id: 'ugadi',
    from: '03-10',
    to: '04-05',
    tag: 'Ugadi specials',
    title: ['A Sweet Start', 'to the New Year'],
    text: 'Bobbatlu, ghee laddu and festival trays for your Ugadi table.',
    img: I.heroAssorted,
    primary: { label: 'Shop Festival Sweets', href: '#shop', category: 'festival' },
    picks: ['bobbatlu', 'ghee-laddu'],
  },
  {
    id: 'rakhi',
    from: '08-01',
    to: '08-20',
    tag: 'Raksha Bandhan',
    title: ['Sweets to Send', 'with Every Rakhi'],
    text: 'Gift boxes of ghee sweets and dry fruits, packed for brothers and sisters near and far.',
    img: I.laddooBox,
    primary: { label: 'Shop Gift Boxes', href: '#shop', category: 'gifts' },
    picks: ['assorted-box', 'kaju-katli'],
  },
  {
    id: 'chavithi',
    from: '08-21',
    to: '09-20',
    tag: 'Vinayaka Chavithi',
    title: ['Laddus for', 'Vinayaka Chavithi'],
    text: 'Ghee laddu, motichoor and besan laddu, made fresh for puja and prasadam.',
    img: I.heroLadduPick,
    position: '50% 62%',
    primary: { label: 'Shop Laddus', href: '#shop', category: 'traditional' },
    picks: ['ghee-laddu', 'motichoor'],
  },
  {
    id: 'dasara',
    from: '09-21',
    to: '10-15',
    tag: 'Dasara specials',
    title: ['Celebrate Dasara', 'with Pure Ghee Sweets'],
    text: 'Festival trays, laddus and kaju katli for family, friends and Bommala Koluvu.',
    img: I.heroBarfiStand,
    position: '50% 60%',
    primary: { label: 'Shop Festival Sweets', href: '#shop', category: 'festival' },
    picks: ['motichoor', 'kaju-katli'],
  },
  {
    id: 'diwali',
    from: '10-16',
    to: '11-12',
    tag: 'Diwali gifting',
    title: ['Diwali Gift Boxes,', 'Packed with Love'],
    text: 'Assorted sweets, dry fruits and Diwali trays for homes and offices.',
    img: I.diwaliLamps,
    primary: { label: 'Shop Diwali Gifts', href: '#shop', category: 'gifts' },
    picks: ['diwali-platter', 'festive-gift-box'],
  },
  {
    id: 'weddings',
    from: '11-13',
    to: '12-31',
    tag: 'Wedding season',
    title: ['Sweets for', 'Every Wedding'],
    text: 'Wedding trays, return-gift boxes and fresh hots for your guests. Tell us the date and we will plan the rest.',
    img: I.heroWeddingServe,
    position: '50% 58%',
    primary: { label: 'Plan a Bulk Order', href: '#bulk' },
    picks: ['sweet-platter', 'assorted-box'],
  },
]

export const DEFAULT_HERO = {
  id: 'tradition',
  tag: 'Fresh every morning',
  title: ['A Taste of Tradition,', 'Made with Pure Ghee'],
  text: 'Handcrafted favourites from Vijayatakies Centre, made in small batches with pure ghee.',
  img: I.heroLadduStand,
  position: '50% 62%',
  primary: { label: 'Explore Our Sweets', href: '#shop' },
  picks: ['ghee-laddu', 'kaju-katli'],
}

const mmdd = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function heroFor(date = new Date(), override) {
  if (override) {
    const forced = HERO_SEASONS.find((s) => s.id === override) || (override === DEFAULT_HERO.id && DEFAULT_HERO)
    if (forced) return forced
  }
  const today = mmdd(date)
  const hit = HERO_SEASONS.find(({ from, to }) => (from <= to ? today >= from && today <= to : today >= from || today <= to))
  return hit || DEFAULT_HERO
}

// ─────────────────────────────────────────────────────────────
//  Homepage slideshow. Each slide: photo, where the text sits
//  ('left' or 'right'), and its copy. `season: true` means the slide
//  takes its tag, title, text, button and picks from the festival
//  calendar above (heroFor), so that slide changes through the year.
//  `position` is the CSS object-position of the photo.
//  `cutout: true` is for a photo on a transparent background (a plate
//  with no backdrop): it sits on the right over a warm dark stage with
//  a golden glow; `srcSet` lists its sizes.
// ─────────────────────────────────────────────────────────────
export const HERO_SLIDES = [
  {
    id: 'festival-plate',
    img: I.heroSlide1,
    cutout: true,
    srcSet: '/images/hero-plate-900.webp 900w, /images/hero-plate-1200.webp 1200w, /images/hero-plate.webp 1460w',
    align: 'left',
    season: true,
  },
  {
    id: 'kitchen',
    img: I.heroSlide2,
    cutout: true,
    srcSet: '/images/hero-kitchen-900.webp 900w, /images/hero-kitchen-1200.webp 1200w, /images/hero-kitchen.webp 1698w',
    align: 'right',
    tag: 'Fresh every morning',
    title: ['Made Fresh,', 'in Pure Ghee'],
    text: 'Made fresh every morning in our kitchen at Vijayatakies Centre.',
    primary: { label: 'Explore Our Sweets', href: '#shop' },
  },
  {
    id: 'sweets-hots',
    img: I.heroSlide3,
    cutout: true,
    srcSet: '/images/hero-boxes-900.webp 900w, /images/hero-boxes-1200.webp 1200w, /images/hero-boxes.webp 1774w',
    align: 'left',
    tag: 'Sweets & Hots',
    title: ['Sweets & Hots', 'for Every Celebration'],
    text: 'Ghee sweets alongside mixture, janthikalu and ribbon pakodi, fried fresh for your evening tea.',
    primary: { label: 'Shop Sweets & Hots', href: '#shop', category: 'hots' },
  },
]

export const FEATURES = [
  { icon: 'leaf', lines: ['Pure Ghee', 'Preparation'] },
  { icon: 'bowl', lines: ['Traditional', 'Recipes'] },
  { icon: 'leaves', lines: ['Quality', 'Ingredients'] },
  { icon: 'gift', lines: ['Ideal for Gifting', '& Celebrations'] },
  { icon: 'truck', lines: ['Bulk Orders', 'for Events & Weddings'] },
]

export const STORY = {
  eyebrow: 'Our Story',
  title: ['A Tradition', 'of Sweetness'],
  quote: 'Every sweet has a story.',
  text: 'At Raju Ghee Sweets, we bring traditional flavours together with the richness of ghee and the joy of sharing.',
  img: I.storyGiftBox,
}

export const OCCASIONS = ['Wedding', 'Engagement', 'House-warming', 'Festival / Puja', 'Birthday', 'Corporate gifting', 'Other']
