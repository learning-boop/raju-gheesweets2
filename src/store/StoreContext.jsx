import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { productById } from '../data/products.js'
import { SITE, rupees } from '../config/site.js'

const StoreContext = createContext(null)
const KEY = 'rgs-cart-v1'

function loadCart() {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    // drop anything no longer on the menu
    return Object.fromEntries(Object.entries(parsed).filter(([id, q]) => productById[id] && q > 0))
  } catch {
    return {}
  }
}

function cartReducer(state, action) {
  const q = state[action.id] || 0
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: Math.min(99, q + (action.qty || 1)) }
    case 'set': {
      const next = { ...state }
      if (action.qty <= 0) delete next[action.id]
      else next[action.id] = Math.min(99, action.qty)
      return next
    }
    case 'remove': {
      const next = { ...state }
      delete next[action.id]
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [category, setCategory] = useState('all')
  const [toast, setToast] = useState(null)
  const [bump, setBump] = useState(0)
  const toastTimer = useRef(0)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(cart))
    } catch {
      /* storage blocked — the cart still works for this visit */
    }
  }, [cart])

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: productById[id], qty }))
        .filter((l) => l.product),
    [cart],
  )
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0)

  const showToast = useCallback((message) => {
    window.clearTimeout(toastTimer.current)
    setToast({ message, key: Date.now() })
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const add = useCallback(
    (id, qty = 1) => {
      dispatch({ type: 'add', id, qty })
      setBump((b) => b + 1)
      const p = productById[id]
      if (p) showToast(`${p.name} (${p.unit}) added to your cart`)
    },
    [showToast],
  )

  const orderMessage = useCallback(() => {
    const rows = lines.map((l) => `• ${l.product.name} — ${l.qty} × ${l.product.unit} = ${rupees(l.qty * l.product.price)}`)
    return [
      `Hi ${SITE.name}! I'd like to order:`,
      ...rows,
      `Total: ${rupees(total)}`,
      '',
      'Name:',
      'Pick-up or delivery address:',
    ].join('\n')
  }, [lines, total])

  const value = {
    cart,
    lines,
    count,
    total,
    bump,
    add,
    setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    searchOpen,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    category,
    setCategory,
    toast,
    orderMessage,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext)
