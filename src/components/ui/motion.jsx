import { motion } from 'framer-motion'
import { imgSrc, imgSrcSet } from '../../data/images.js'
import { EASE } from '../../lib/motion.js'

/* Responsive, lazy image that prefers a local override. */
export function Img({ img, sizes = '100vw', priority = false, className = '', style, alt }) {
  if (!img) return null
  return (
    <img
      src={imgSrc(img, 1000)}
      srcSet={imgSrcSet(img)}
      sizes={sizes}
      alt={alt ?? img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={style}
      draggable="false"
    />
  )
}

/* Fade-up when scrolled into view. Starts visible enough to read
   if JavaScript animation is skipped (reduced motion). */
export function Reveal({ as = 'div', children, delay = 0, y = 28, amount = 0.2, className = '', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}
