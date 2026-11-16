import { Flourish } from './Ornaments.jsx'

/* Title with a flourish either side, as in the mockup's “Bestsellers”. */
export default function SectionTitle({ children, id, light = false, as: H = 'h2' }) {
  return (
    <div className={`section-title ${light ? 'is-light' : ''}`}>
      <Flourish />
      <H id={id}>{children}</H>
      <Flourish flip />
    </div>
  )
}
