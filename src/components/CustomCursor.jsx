import { useEffect, useRef } from 'react'

// Custom pixel cursor (desktop / fine-pointer only). Two fixed elements:
//   - dot:  8px square that follows the pointer instantly (grows a touch on hover)
//   - label: chip showing the hovered element's data-cursor text
// Both are drawn white with `mix-blend-mode: difference`, so they invert against
// whatever is behind them per-pixel: white over ink, dark over paper.
// Driven with refs (never React state). The native cursor is hidden via JS only,
// so it stays visible if JS fails.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return
    const dot = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    // class drives a global `cursor: none !important` (see index.css) so the OS
    // pointer stays hidden over links / buttons / hold zone / scroller too
    document.documentElement.classList.add('has-custom-cursor')
    let shown = false

    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (!shown) {
        shown = true
        dot.style.opacity = '1'
      }
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`
      label.style.transform = `translate(${x + 16}px, ${y + 14}px)`
    }

    const over = (e) => {
      const t = e.target.closest ? e.target.closest('[data-hover]') : null
      if (t) {
        label.textContent = t.getAttribute('data-cursor') || 'CLICK'
        label.style.opacity = '1'
        dot.style.width = '12px'
        dot.style.height = '12px'
      }
    }
    const out = (e) => {
      const t = e.target.closest ? e.target.closest('[data-hover]') : null
      if (t) {
        label.style.opacity = '0'
        dot.style.width = '8px'
        dot.style.height = '8px'
      }
    }
    const leave = () => {
      dot.style.opacity = '0'
      label.style.opacity = '0'
      shown = false
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white pointer-events-none z-[10000] opacity-0"
        style={{
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.16s ease, height 0.16s ease',
          mixBlendMode: 'difference',
        }}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 font-mono text-[10px] font-bold bg-white text-black pointer-events-none z-[10000] opacity-0 whitespace-nowrap"
        style={{
          letterSpacing: '0.16em',
          padding: '3px 6px',
          transform: 'translate(14px, 14px)',
          mixBlendMode: 'difference',
        }}
        aria-hidden="true"
      >
        CLICK
      </div>
    </>
  )
}
