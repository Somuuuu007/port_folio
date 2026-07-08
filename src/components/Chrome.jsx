import { useScrollTracking } from '../hooks/useScrollTracking'
import TopStatusBar from './TopStatusBar'
import Minimap from './Minimap'

// Owns the scroll-tracking state so that scroll updates only re-render the
// chrome (status bar + minimap), never the heavy content sections below.
export default function Chrome() {
  const { active, pct, rect } = useScrollTracking()
  return (
    <>
      <TopStatusBar activeIndex={active} />
      <Minimap activeIndex={active} pct={pct} rect={rect} />
    </>
  )
}
