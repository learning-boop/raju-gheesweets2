import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { EASE } from '../../lib/motion.js'

export default function Toast() {
  const { toast, openDrawer, drawerOpen } = useStore()
  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && !drawerOpen && (
          <motion.div
            key={toast.key}
            className="toast"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="toast__icon">
              <Icon name="check" size={16} stroke={2.4} />
            </span>
            <span className="toast__msg">{toast.message}</span>
            <button type="button" className="toast__btn" onClick={openDrawer}>
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
