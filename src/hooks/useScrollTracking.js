import { useEffect, useState } from 'react'
import { SECTIONS } from '../data/sections'

const TRACK_TOP = 6
const TRACK_H = 6 * 21 // 6 nav rows ≈ 21px each

// Drives the top-bar section indicator + the minimap.
//
//  - active section: IntersectionObserver → React state. Changes only on a
//    section crossing (a handful of times per page), NOT every frame.
//  - scroll % + viewport rect: written IMPERATIVELY to the passed refs, so
//    scrolling never re-renders React (this was re-rendering the whole chrome
//    ~60×/sec before).
//  - page dimensions are cached and re-measured only on resize / content-size
//    change (ResizeObserver) instead of being read every frame — reading
//    scrollHeight per frame was the "forced reflow" the profiler flagged.
export function useScrollTracking({ pctRef, rectRef }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // cached geometry — no per-frame layout reads
    let clientH = window.innerHeight || 1
    let scrollH = document.documentElement.scrollHeight || 1
    const measure = () => {
      clientH = window.innerHeight || 1
      scrollH = document.documentElement.scrollHeight || 1
    }

    // --- active section (state, infrequent) ---
    let io
    if ('IntersectionObserver' in window) {
      const visible = {}
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            visible[en.target.id] = en.isIntersecting
          })
          let a = 0
          SECTIONS.forEach((s, i) => {
            if (visible[s.id]) a = i
          })
          setActive((prev) => (prev === a ? prev : a))
        },
        { rootMargin: '-38% 0px -60% 0px', threshold: 0 },
      )
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) io.observe(el)
      })
    }

    // --- scroll % + viewport rect (imperative, no setState) ---
    let ticking = false
    const apply = () => {
      ticking = false
      const denom = scrollH - clientH
      const frac = denom > 4 ? Math.min(1, Math.max(0, window.scrollY / denom)) : 0
      if (pctRef.current) {
        pctRef.current.textContent = String(Math.round(frac * 100)).padStart(2, '0') + '%'
      }
      if (rectRef.current) {
        const vh = Math.max(14, Math.min(TRACK_H, (clientH / scrollH) * TRACK_H))
        rectRef.current.style.top = TRACK_TOP + frac * (TRACK_H - vh) + 'px'
        rectRef.current.style.height = vh + 'px'
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    // re-measure only when the page height actually changes
    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        measure()
        apply()
      })
      ro.observe(document.body)
    }
    const onResize = () => {
      measure()
      apply()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    requestAnimationFrame(apply)

    return () => {
      if (io) io.disconnect()
      if (ro) ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [pctRef, rectRef])

  return active
}
