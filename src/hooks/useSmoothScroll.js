import { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

// Smooth scrolling via Locomotive Scroll v5 (built on Lenis, native window
// scroll — no container wrapper, so fixed elements like the cursor and the
// IntersectionObserver scrollspy keep working untouched).
//
// Also routes in-page anchor links (#hero … #contact, back-to-top, the hero
// CTAs) through the smooth scroller, offset for the 36px fixed status bar.
export function useSmoothScroll() {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.09, // smoothing — lower is smoother/heavier
        smoothWheel: true,
        wheelMultiplier: 1,
      },
    })

    const onClick = (e) => {
      const link = e.target.closest ? e.target.closest('a[href^="#"]') : null
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return
      let target
      try {
        target = document.querySelector(hash)
      } catch {
        return
      }
      if (!target) return
      e.preventDefault()
      scroll.scrollTo(target, { offset: -36 }) // clear the fixed status bar
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      scroll.destroy()
    }
  }, [])
}
