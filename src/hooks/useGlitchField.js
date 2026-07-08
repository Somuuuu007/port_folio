import { useEffect } from 'react'

const CHARS = '01/\\<>[]{}=+*#.:'

// Mutates ~6% of the glyphs in the hero's background <pre> every 90ms for a
// "matrix rain" shimmer. Paused (via IntersectionObserver) when the hero is
// off-screen. Drives the node directly through `ref` — no React re-render.
export function useGlitchField(ref, baseText) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const base = baseText.split('\n')
    let paused = false
    let io

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          paused = !entries[0].isIntersecting
        },
        { threshold: 0 },
      )
      const hero = document.getElementById('hero')
      if (hero) io.observe(hero)
    }

    const id = setInterval(() => {
      if (paused) return
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
      if (io) io.disconnect()
    }
  }, [ref, baseText])
}
