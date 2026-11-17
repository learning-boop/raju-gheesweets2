import { MotionConfig } from 'framer-motion'
import { StoreProvider } from './store/StoreContext.jsx'
import Header, { TopBar } from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import CartDrawer from './components/layout/CartDrawer.jsx'
import SearchOverlay from './components/layout/SearchOverlay.jsx'
import Toast from './components/layout/Toast.jsx'
import BottomNav from './components/layout/BottomNav.jsx'
import Hero from './components/sections/Hero.jsx'
import Categories from './components/sections/Categories.jsx'
import Bestsellers from './components/sections/Bestsellers.jsx'
import Story from './components/sections/Story.jsx'
import FeatureStrip from './components/sections/FeatureStrip.jsx'
import Shop from './components/sections/Shop.jsx'
import Promos from './components/sections/Promos.jsx'
import BulkOrder from './components/sections/BulkOrder.jsx'
import Visit from './components/sections/Visit.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main">
          <Hero />
          <Categories />
          <Bestsellers />
          <Story />
          <FeatureStrip />
          <Shop />
          <Promos />
          <BulkOrder />
          <Visit />
        </main>
        <Footer />
        <BottomNav />
        <CartDrawer />
        <SearchOverlay />
        <Toast />
      </StoreProvider>
    </MotionConfig>
  )
}
