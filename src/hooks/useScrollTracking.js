import { useEffect, useState } from 'react'
import { SECTIONS } from '../data/sections'

// Drives the top-bar section indicator + the minimap (active row, scroll %,
// viewport rectangle).
//
//  - active section: IntersectionObserver scrollspy — a line ~38% down the
//    viewport. Robust against variable section heights.
//  - scroll % + viewport rect: a rAF-throttled window scroll listener. In a
//    normal web app the page scrolls on `window`, so we read window.scrollY /
//    innerHeight directly (the prototype's capture-phase hack was only needed
//    inside its scaled preview container).
export function useScrollTracking() {
  const [active, setActive] = useState(0)
  const [pct, setPct] = useState(0)
  const [rect, setRect] = useState({ top: 6, height: 20 })

  useEffect(() => {
    let io
    if ('IntersectionObserver' in window) {
      const visible = {}
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            visible[en.target.id] = en.isIntersecting
          })
          // last section (top→bottom) currently crossing the line wins
          let a = 0
          SECTIONS.forEach((s, i) => {
            if (visible[s.id]) a = i
          })
          setActive(a)
        },
        { rootMargin: '-38% 0px -60% 0px', threshold: 0 },
      )
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) io.observe(el)
      })
    }

    const trackTop = 6
    const trackH = 6 * 21 // 6 nav rows ≈ 21px each
    let ticking = false
    const apply = () => {
      ticking = false
      const clientH = window.innerHeight || 1
      const scrollH = document.documentElement.scrollHeight || 1
      const denom = scrollH - clientH
      const frac = denom > 4 ? Math.min(1, Math.max(0, window.scrollY / denom)) : 0
      setPct(Math.round(frac * 100))
      const vh = Math.max(14, Math.min(trackH, (clientH / scrollH) * trackH))
      setRect({ top: trackTop + frac * (trackH - vh), height: vh })
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    requestAnimationFrame(apply)

    return () => {
      if (io) io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { active, pct, rect }
}
