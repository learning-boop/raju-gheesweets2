# Raju Ghee Sweets: online store homepage

This is the homepage for Raju Ghee Sweets at Vijayatakies Centre, Vijayawada. It uses the shop's ivory, ghee-brown and champagne-gold colours, taken from the logo: a top bar, the centred badge logo with the Telugu tagline, a festival-aware hero, arched category tiles, bestsellers beside "Our Story", and a feature strip. Below that it adds a full shop, offer banners, a bulk-order form, a contact section and a footer.

It is built with React 19, Vite and Framer Motion. Customers can browse, search and add sweets to a cart. The cart then sends the order to the shop on WhatsApp, so no payment gateway or backend is needed.

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

To deploy, upload `dist/` to any static host (Vercel, Netlify, Hostinger or cPanel `public_html`, S3).

## Before launch: fill these in

| What | Where | Why |
| --- | --- | --- |
| **Phone number** | `phone` in `src/config/site.js` | `+91 98765 43210` is the dummy number from the mockup. |
| **WhatsApp number** | `whatsapp` in `src/config/site.js` (digits only, e.g. `919876543210`) | While it is empty, checkout becomes "Call to Order" and WhatsApp links scroll to Contact. Once it is set, the cart, the hero button and the bulk form all open WhatsApp with a pre-filled message. |
| **Prices and pack sizes** | `src/data/products.js` | Only Ariselu ₹320, Bobbatlu ₹280, Ghee Laddu ₹360 and Kaju Katli ₹620 come from the mockup. Every other price is a sample. |
| **Ariselu and Bobbatlu photos** | `public/images/` | These are stand-ins cut from the mockup. Replace them with real photos (same file names). |
| Social links and branch addresses | `social` and `branches` in `src/config/site.js` | Until they are filled, the social icons link to `#`. Branches only show once an address is added. |
| Hours and address | `src/config/site.js` | Check them against Google Maps. |

## Edit the content

| What | File |
| --- | --- |
| Shop details: name, Telugu tagline, address, hours, phone, WhatsApp, socials | `src/config/site.js` |
| Products, prices, units, categories, bestsellers | `src/data/products.js` |
| Hero festival calendar (`HERO_SEASONS`), feature strip, story text, bulk-order occasions | `src/data/content.js` |
| Opening hours for the live "Open now" badge | `openHours` in `src/config/site.js` |
| Every photo, in one place | `src/data/images.js` |
| Colours, fonts, spacing | Tokens at the top of `src/styles/global.css` |

**Adding a product.** Add one line to `PRODUCTS` with an `id`, the English and Telugu names, its categories (`cats`), `price` and `unit`, and a photo. It then appears in the shop, the search and the cart automatically. To feature it as a bestseller, add its `id` to `BESTSELLERS`.

**Using the shop's own photos.** Put the file in `public/images/`, for example `kaju-katli.jpg`. Then add `local: '/images/kaju-katli.jpg'` to that entry in `src/data/images.js`. A local file always wins over the stock photo.

## What's on the page

1. **Top bar**: location (opens Google Maps), phone, and social icons.
2. **Header**: Home, an "Our Sweets" dropdown with category thumbnails, Our Story, Bulk Orders and Contact, plus search, account and cart icons. The cart badge pops when an item is added. The badge logo hangs over the top bar and hero with the Telugu tagline under it. On scroll the header shrinks and the logo scales down. On phones the menu becomes a slide-in drawer.
3. **Hero**: two looks, picked by `heroStyle` in `src/config/site.js` (preview with `?hero=arch` or `?hero=slides`). `slides` (default) is a full-width slideshow of the shop's three photos (`public/images/hero-slide-*`, set up in `HERO_SLIDES` in `src/data/content.js`): crossfade with a slow zoom, auto-play every 7 seconds that pauses on hover, focus or a hidden tab, arrows, dots with a progress bar, arrow keys and swipe. Open a given slide with `?slide=2`. The first slide follows the festival calendar, the second is about fresh pure-ghee cooking, the third is gift boxes. `arch` is a light hero with the photo in an ornate gold arch. Festival content: the first slide takes its headline from the festival calendar, and the arch hero also shows two quick-add sweets from it (Sankranti, Ugadi, Rakhi, Vinayaka Chavithi, Dasara, Diwali, wedding season, then a year-round default). A live badge shows "Open now · closes 10 PM" (or when the shop opens next) in Vijayawada time. Preview any season with `?season=diwali` (ids are in `HERO_SEASONS`). Festival dates shift each year, so check the date windows in `content.js` once a year.
4. **Category arches**: six arched tiles. Clicking one opens that category in the shop.
5. **Bestsellers and Our Story**: four product cards beside the story, as in the mockup. "Add to Cart" turns into a −/+ quantity stepper.
6. **Feature strip**: Pure Ghee, Traditional Recipes, Quality Ingredients, Gifting, Bulk Orders.
7. **Shop**: category tabs with a sliding pill (arrow keys work) and an animated product grid. It shows the first 10 items, with a "Show all" button for the rest.
8. **Offer banners**: gift boxes and hots, with parallax photos.
9. **Bulk orders**: an arched photo and an enquiry form (name, phone, occasion, date, quantity, notes) that goes to WhatsApp.
10. **Visit our shop**: a shop photo, address, hours and phone, directions and call buttons, and an embedded Google Map.
11. **Footer**: links, categories, contact details, socials, and a "Photo credits" toggle.

Overlays:
- **Cart drawer**: lines, quantity, remove, total, then checkout on WhatsApp (or call).
- **Search**: searches English and Telugu names and categories, with quick-add.
- **Add-to-cart toast**: has a "View cart" button.

The cart is saved in the browser (`localStorage`), so it survives a page refresh. Animations respect the visitor's "reduce motion" setting.

## Project structure

```
src/
  config/site.js            shop details + link helpers
  data/images.js            all photos + credits
  data/products.js          categories, products, prices
  data/content.js           hero festival calendar, features, story, occasions
  store/StoreContext.jsx    cart, drawer, search, toast state
  components/layout/        TopBar + Header, Footer, CartDrawer, SearchOverlay, Toast
  components/sections/      Hero, Categories, Bestsellers, Story, FeatureStrip,
                            Shop, Promos, BulkOrder, Visit
  components/ui/            Icon, Ornaments (logo, mandala, arch, dividers),
                            ProductCard, SectionTitle, motion helpers
  styles/global.css         all styles
```

The logo is the shop's own artwork, exported from the logo PDF to `public/logo-gold.webp/.png` (720px) and `logo-gold-sm.*` (360px), with the badge's inside filled ivory so it reads on the dark footer. Colours are CSS variables at the top of `src/styles/global.css`. The mandalas, arches and dividers are drawn in SVG, so they stay sharp at any size.

## Taking real online payments later

The site checks out on WhatsApp today. To accept payments, keep the cart (`StoreContext.jsx`) and swap the checkout button in `CartDrawer.jsx` for a Razorpay or Cashfree checkout. That needs a small server or serverless function to create the order.

Photo credits are in `CREDITS.md`.
