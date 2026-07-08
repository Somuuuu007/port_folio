import { useRef } from 'react'
import { useScrollTracking } from '../hooks/useScrollTracking'
import TopStatusBar from './TopStatusBar'
import Minimap from './Minimap'

// Owns the scroll-tracking. Only the active-section index is React state (it
// changes rarely); the live scroll % and minimap viewport rect are written
// straight to the DOM via refs, so scrolling doesn't re-render the chrome.
export default function Chrome() {
  const pctRef = useRef(null)
  const rectRef = useRef(null)
  const active = useScrollTracking({ pctRef, rectRef })
  return (
    <>
      <TopStatusBar activeIndex={active} />
      <Minimap activeIndex={active} pctRef={pctRef} rectRef={rectRef} />
    </>
  )
}
