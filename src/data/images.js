// ─────────────────────────────────────────────────────────────
//  All photography in one place.
//
//  Pexels / Unsplash photos are free for commercial use (credited in
//  CREDITS.md and the footer anyway). They load from the photo CDNs.
//
//  To use the shop's own photo instead:
//    1. put the file in /public/images/  (e.g. kaju-katli.jpg)
//    2. add  local: '/images/kaju-katli.jpg'  to that entry.
//  `local` always wins.
// ─────────────────────────────────────────────────────────────

const pexelsUrl = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
const unsplashUrl = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const px = (id, alt, by, page) => ({ provider: 'pexels', id, alt, by, page, license: 'Pexels License' })
const us = (id, alt, by, page) => ({ provider: 'unsplash', id, alt, by, page, license: 'Unsplash License' })
const own = (local, alt, note) => ({ provider: 'local', local, alt, by: note, page: '', license: '' })

export const IMAGES = {
  // hero platters (Gaurav Kumar's mithai series — dark, warm, consistent)
  goldTray: px(18488307, 'Indian sweets arranged on a golden tray', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-18488307/'),
  diyaTray: px(18488300, 'A festive tray of sweets with flowers and a lit diya', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-18488300/'),
  rosePlatter: px(18488311, 'Assorted sweets on a platter with rose petals', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-18488311/'),

  // homepage slideshow — the shop's own photos (public/images/hero-slide-*)
  heroSlide1: own('/images/hero-plate.webp', 'A brass plate on a banana leaf with laddus, kaju katli, barfi, peda and ariselu', "Shop's own photo"),
  heroSlide2: own('/images/hero-kitchen.webp', 'A smiling cook in a hairnet ladling ghee into a kadai over the flame, beside a brass pot of ghee and stands of jalebi, laddus, gulab jamun and rasgulla', "Shop's own photo"),
  heroSlide3: own('/images/hero-boxes.webp', 'Raju Ghee Sweets boxes packed with jalebi, laddus, kaju katli, gulab jamun and barfi, beside boxes of boondi, chakli, mixture, ribbon pakodi, ariselu and bobbatlu', "Shop's own photo"),

  // Our Story section — the shop's own photo, cleaned and enlarged (public/images/story-giftbox.webp)
  storyGiftBox: own('/images/story-giftbox.webp', 'An open gold Raju Ghee Sweets gift box with kaju katli, laddus and dry-fruit sweets on a banana leaf, beside lit diyas and almonds', "Shop's own photo"),

  // bulk-order section — the shop's own photo, cut to its gold arch (public/images/bulk-gift*.webp)
  bulkGift: own('/images/bulk-gift.webp', 'A brass plate of laddus, kaju katli, barfi, peda and ariselu in front of a maroon gift box with a gold ribbon, framed in a gold arch', "Shop's own photo"),

  // hero (bright, festive — chosen per season in data/content.js)
  heroLadduStand: px(8887021, 'Laddus stacked on a brass stand beside marigolds', 'Lara Jameson', 'https://www.pexels.com/photo/close-up-of-pastries-in-a-bowl-8887021/'),
  heroWeddingServe: px(8887026, 'Hands in bridal bangles serving laddus beside a marigold garland', 'Lara Jameson', 'https://www.pexels.com/photo/close-up-of-woman-hands-with-jewelry-serving-sweets-8887026/'),
  heroLadduPick: px(8887018, 'A hand lifting a laddu from a brass stand', 'Lara Jameson', 'https://www.pexels.com/photo/unrecognizable-woman-picking-up-sweet-ball-from-brass-cup-8887018/'),
  heroBarfiStand: px(8887052, 'Barfi with almonds on a brass stand, flowers behind', 'Lara Jameson', 'https://www.pexels.com/photo/chunks-of-delicious-cheesecake-in-metallic-cup-8887052/'),
  heroAssorted: px(11484120, 'Rows of assorted Indian sweets with almonds and pistachios', 'Towfiqu barbhuiya', 'https://www.pexels.com/photo/pastries-in-close-up-shot-11484120/'),

  // sweets
  gheeLaddu: px(40000006, 'Yellow ghee laddus on a clay plate', 'Jahra Tasfia Reza', 'https://www.pexels.com/photo/traditional-indian-sweet-ladoo-on-clay-plate-40000006/'),
  motichoorLaddu: own('/images/motichoor-laddu.webp', 'Motichoor laddus topped with almond slivers and pistachio on a banana leaf in a brass plate', "Shop's own photo"),
  besan: px(18488312, 'Besan laddus and barfi', 'Gaurav Kumar', 'https://www.pexels.com/photo/besan-laddoo-and-barfi-18488312/'),
  kajuKatli: px(18488310, 'Diamond-cut kaju katli', 'Gaurav Kumar', 'https://www.pexels.com/photo/kaju-katri-18488310/'),
  jangiri: px(18488314, 'Jangiri (imarti) in saffron syrup', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-imrati-18488314/'),
  gulabJamun: px(18488298, 'Gulab jamun', 'Gaurav Kumar', 'https://www.pexels.com/photo/gulab-jamun-18488298/'),
  milkCake: px(18488313, 'Roasted milk cake', 'Gaurav Kumar', 'https://www.pexels.com/photo/roasted-milkcake-18488313/'),
  badamBarfi: px(18488299, 'Badam barfi', 'Gaurav Kumar', 'https://www.pexels.com/photo/almond-barfi-18488299/'),
  rasgulla: px(39959153, 'Rasgullas garnished with saffron on a clay plate', 'Jahra Tasfia Reza', 'https://www.pexels.com/photo/delicious-indian-sweets-rasgulla-on-plate-39959153/'),
  jalebi: us('1760263217152-009971f0bccc', 'A pile of golden jalebi on a sweet stall', 'Zoshua Colah', 'https://unsplash.com/photos/KKnpil90IBw'),
  nuvvulaLaddu: us('1610508500445-a4592435e27e', 'Sesame (nuvvula) laddus on a wooden tray', 'Prchi Palwe', 'https://unsplash.com/photos/Bn4vWSX0d1Y'),

  // stand-ins cut from the design mockup — replace with the shop's own photos
  ariselu: own('/images/ariselu.jpg', 'Ariselu on a banana leaf', 'Stand-in from the design mockup'),
  bobbatlu: own('/images/bobbatlu.jpg', 'Bobbatlu on a banana leaf', 'Stand-in from the design mockup'),

  // dry fruits
  dryFruits: own('/images/dry-fruits.webp', 'Brass bowls of almonds, cashews, pistachios, walnuts, dates, raisins, figs and dried apricots on a brass tray', "Shop's own photo"),
  cashews: us('1723466998040-78d7e2ef6d72', 'A pile of cashews on a wooden table', 'Emma Miller', 'https://unsplash.com/photos/a-pile-of-cashews-sitting-on-top-of-a-wooden-table-juOaQQKFFKo'),
  almonds: us('1627820752174-acae1b399128', 'Almonds in a glass bowl', 'Towfiqu barbhuiya', 'https://unsplash.com/photos/brown-almond-on-clear-glass-bowl-mpXLoq8OXLY'),

  // hots
  sweetsAndHots: px(39524792, 'A bowl of assorted Indian sweets and savoury snacks', 'Yogendra Banjare', 'https://www.pexels.com/photo/assorted-indian-sweets-and-snacks-in-bowl-39524792/'),
  mixture: px(9557672, 'South Indian mixture with drinks', 'Saveurs Secretes', 'https://www.pexels.com/photo/noodles-mixture-and-drinks-in-a-restaurant-9557672/'),
  janthikalu: px(7496245, 'A basket of crisp janthikalu (chakli)', 'Saveurs Secretes', 'https://www.pexels.com/photo/basket-full-of-chakli-snack-7496245/'),
  ribbonPakodi: px(9832685, 'Ribbon pakodi', 'Pexels contributor', 'https://www.pexels.com/photo/fried-snack-ribbon-pakoda-9832685/'),
  bananaChips: px(9191924, 'A basket of banana chips', 'Saveurs Secretes', 'https://www.pexels.com/photo/a-basket-of-dried-banana-chips-9191924/'),

  // gifting & festivals
  giftBox: px(33773993, 'A red gift box with a yellow bow', 'Ann Hannes', 'https://www.pexels.com/photo/vibrant-red-gift-box-with-yellow-bow-on-black-background-33773993/'),
  laddooBox: px(19151502, 'Laddus packed in a sweet box', 'Sharath G.', 'https://www.pexels.com/photo/sweets-in-a-box-19151502/'),
  diwaliLamps: px(8887196, 'Indian sweets arranged with oil lamps for Diwali', 'Lara Jameson', 'https://www.pexels.com/photo/close-up-of-food-8887196/'),

}

export function imgSrc(img, w = 1200) {
  if (img.local) return img.local
  return img.provider === 'pexels' ? pexelsUrl(img.id, w) : unsplashUrl(img.id, w)
}

export function imgSrcSet(img, widths = [400, 700, 1000, 1400, 2000]) {
  if (img.local) return undefined
  return widths.map((w) => `${imgSrc(img, w)} ${w}w`).join(', ')
}

export const CREDITS = Object.entries(IMAGES).map(([key, img]) => ({ key, ...img }))
