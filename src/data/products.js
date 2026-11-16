import { IMAGES as I } from './images.js'

// Categories, in the order they appear in the arch row and the shop tabs.
export const CATEGORIES = [
  { id: 'traditional', label: 'Traditional Sweets', te: 'సంప్రదాయ మిఠాయిలు', img: I.motichoorLaddu },
  { id: 'dryfruits', label: 'Dry Fruits', te: 'డ్రై ఫ్రూట్స్', img: I.dryFruits, position: '52% 55%' },
  { id: 'hots', label: 'Sweets & Hots', te: 'స్వీట్స్ & హాట్స్', img: I.sweetsAndHots },
  { id: 'specials', label: 'Traditional Specials', te: 'ఆంధ్ర ప్రత్యేకాలు', img: I.nuvvulaLaddu },
  { id: 'gifts', label: 'Gift Boxes', te: 'గిఫ్ట్ బాక్సులు', img: I.laddooBox },
  { id: 'festival', label: 'Festival Specials', te: 'పండుగ ప్రత్యేకాలు', img: I.diwaliLamps, position: '50% 30%' },
]

// ─────────────────────────────────────────────────────────────
//  ⚠ SAMPLE PRICES. The four bestseller prices come from the design
//  mockup; every other price is a placeholder. Replace them all with
//  the shop's price list before launch.
//  price = rupees for one `unit`. `cats` can list several categories.
// ─────────────────────────────────────────────────────────────
export const PRODUCTS = [
  // bestsellers (prices from the mockup)
  { id: 'ariselu', name: 'Ariselu', te: 'అరిసెలు', cats: ['specials', 'festival'], price: 320, unit: '500 g', img: I.ariselu, note: 'Rice flour & jaggery, fried in ghee, finished with sesame.' },
  { id: 'bobbatlu', name: 'Bobbatlu', te: 'బొబ్బట్లు', cats: ['specials'], price: 280, unit: '500 g', img: I.bobbatlu, note: 'Soft flatbread filled with chana dal and jaggery.' },
  { id: 'ghee-laddu', name: 'Ghee Laddu', te: 'నెయ్యి లడ్డు', cats: ['traditional', 'festival'], price: 360, unit: '500 g', img: I.gheeLaddu, note: 'Boondi bound with pure ghee, cardamom and cashew.' },
  { id: 'kaju-katli', name: 'Kaju Katli', te: 'కాజు కట్లీ', cats: ['traditional', 'dryfruits'], price: 620, unit: '500 g', img: I.kajuKatli, note: 'Cashew diamonds finished with silver varq.' },

  // traditional
  { id: 'motichoor', name: 'Motichoor Laddu', te: 'మోతీచూర్ లడ్డు', cats: ['traditional'], price: 340, unit: '500 g', img: I.motichoorLaddu, note: 'Pearl-fine boondi with saffron and cardamom.' },
  { id: 'besan-laddu', name: 'Besan Laddu', te: 'శనగపిండి లడ్డు', cats: ['traditional'], price: 300, unit: '500 g', img: I.besan, note: 'Gram flour roasted slowly in ghee.' },
  { id: 'jangiri', name: 'Jangiri', te: 'జాంగ్రీ', cats: ['traditional'], price: 260, unit: '500 g', img: I.jangiri, note: 'Urad dal spirals soaked in saffron syrup.' },
  { id: 'jalebi', name: 'Jalebi', te: 'జిలేబీ', cats: ['traditional', 'hots'], price: 220, unit: '500 g', img: I.jalebi, note: 'Crisp, hot and dripping with syrup.' },
  { id: 'gulab-jamun', name: 'Gulab Jamun', te: 'గులాబ్ జామూన్', cats: ['traditional'], price: 240, unit: '500 g', img: I.gulabJamun, note: 'Khoya dumplings in rose-cardamom syrup.' },
  { id: 'rasgulla', name: 'Rasgulla', te: 'రసగుల్లా', cats: ['traditional'], price: 240, unit: '500 g', img: I.rasgulla, note: 'Spongy chhena in light syrup.' },
  { id: 'milk-cake', name: 'Milk Cake', te: 'మిల్క్ కేక్', cats: ['traditional'], price: 380, unit: '500 g', img: I.milkCake, note: 'Caramelised at the heart, milky at the edges.' },
  { id: 'badam-barfi', name: 'Badam Barfi', te: 'బాదం బర్ఫీ', cats: ['traditional', 'dryfruits'], price: 560, unit: '500 g', img: I.badamBarfi, note: 'Ground almonds and ghee, set slowly.' },

  // specials
  { id: 'nuvvula-laddu', name: 'Nuvvula Laddu', te: 'నువ్వుల లడ్డు', cats: ['specials', 'festival'], price: 280, unit: '500 g', img: I.nuvvulaLaddu, note: 'Toasted sesame and jaggery — a Sankranti favourite.' },

  // dry fruits
  { id: 'cashews', name: 'Cashew Nuts', te: 'జీడిపప్పు', cats: ['dryfruits'], price: 550, unit: '500 g', img: I.cashews, note: 'Whole cashews, packed fresh.' },
  { id: 'almonds', name: 'Almonds', te: 'బాదం పప్పు', cats: ['dryfruits'], price: 520, unit: '500 g', img: I.almonds, note: 'Crunchy whole almonds.' },

  // hots
  { id: 'mixture', name: 'Mixture', te: 'మిక్స్చర్', cats: ['hots'], price: 150, unit: '250 g', img: I.mixture, note: 'Sev, boondi, peanuts and curry leaves.' },
  { id: 'janthikalu', name: 'Janthikalu', te: 'జంతికలు', cats: ['hots'], price: 160, unit: '250 g', img: I.janthikalu, note: 'Pressed spirals — light and brittle.' },
  { id: 'ribbon-pakodi', name: 'Ribbon Pakodi', te: 'రిబ్బన్ పకోడీ', cats: ['hots'], price: 150, unit: '250 g', img: I.ribbonPakodi, note: 'Besan ribbons scented with ajwain.' },
  { id: 'banana-chips', name: 'Banana Chips', te: 'అరటి చిప్స్', cats: ['hots'], price: 170, unit: '250 g', img: I.bananaChips, note: 'Thin raw-banana slices, lightly salted.' },

  // gifts & festival
  { id: 'assorted-box', name: 'Assorted Sweet Box', te: 'స్వీట్ బాక్స్', cats: ['gifts', 'festival'], price: 450, unit: 'box · 500 g', img: I.laddooBox, note: 'A mix of our ghee classics, gift-packed.' },
  { id: 'festive-gift-box', name: 'Festive Gift Box', te: 'పండుగ గిఫ్ట్ బాక్స్', cats: ['gifts'], price: 750, unit: 'box · 1 kg', img: I.giftBox, note: 'Sweets and dry fruits in a ribboned gift box.' },
  { id: 'sweet-platter', name: 'Celebration Platter', te: 'స్వీట్ ప్లాటర్', cats: ['gifts', 'festival'], price: 1450, unit: 'platter · 2 kg', img: I.rosePlatter, note: 'Rings of assorted mithai for the table.' },
  { id: 'diwali-platter', name: 'Diwali Special Tray', te: 'దీపావళి ట్రే', cats: ['festival'], price: 1200, unit: 'tray · 1.5 kg', img: I.diyaTray, note: 'Our festival assortment, ready for puja.' },
]

export const BESTSELLERS = ['ariselu', 'bobbatlu', 'ghee-laddu', 'kaju-katli']

export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))
