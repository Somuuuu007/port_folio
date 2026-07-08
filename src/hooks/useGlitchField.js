import { useEffect } from 'react'

const CHARS = '01/\\<>[]{}=+*#.:'

// Mutates ~6% of the glyphs in the hero's background <pre> every 90ms for a
// "matrix rain" shimmer. Drives the node directly through `ref` — no re-render.
//
// Paused when (a) the hero is off-screen, and (b) while the page is actively
// scrolling — the textContent rewrite forces a repaint, so skipping it during
// scroll keeps those frames cheap (it resumes the instant you stop, so the
// look is unchanged at rest). Also disabled under prefers-reduced-motion.
export function useGlitchField(ref, baseText) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const base = baseText.split('\n')
    let offscreen = false
    let scrolling = false
    let scrollTimer
    let io

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          offscreen = !entries[0].isIntersecting
        },
        { threshold: 0 },
      )
      const hero = document.getElementById('hero')
      if (hero) io.observe(hero)
    }

    const onScroll = () => {
      scrolling = true
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        scrolling = false
      }, 160)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const id = setInterval(() => {
      if (offscreen || scrolling) return
      el.textContent = base
        .map((line) =>
          line
            .split('')
            .map((c) => {
              if (c === ' ') return ' '
              return Math.random() < 0.06
                ? CHARS[Math.floor(Math.random() * CHARS.length)]
                : c
            })
            .join(''),
        )
        .join('\n')
    }, 90)

    return () => {
      clearInterval(id)
      clearTimeout(scrollTimer)
      window.removeEventListener('scroll', onScroll)
      if (io) io.disconnect()
    }
  }, [ref, baseText])
}
