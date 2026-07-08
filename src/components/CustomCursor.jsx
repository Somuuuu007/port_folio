import { useEffect, useRef } from 'react'

// Custom pixel cursor (desktop / fine-pointer only). Three fixed elements:
//   - dot:  8px square, follows instantly
//   - ring: 30px outline, follows with lerp easing (trailing feel)
//   - label: chip showing the hovered element's data-cursor text
// All three are drawn white with `mix-blend-mode: difference`, so they invert
// against whatever is behind them per-pixel: white over ink, dark over paper,
// and split cleanly when straddling a black/paper edge. Never black-on-black.
// Driven entirely with refs + rAF (never React state) to avoid re-renders.
// The native cursor is hidden via JS only, so it stays visible if JS fails.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.body.style.cursor = 'none'
    let tx = -100
    let ty = -100
    let rx = -100
    let ry = -100
    let shown = false
    let raf

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!shown) {
        shown = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`
      label.style.transform = `translate(${tx + 16}px, ${ty + 14}px)`
    }

    const loop = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    const over = (e) => {
      const t = e.target.closest ? e.target.closest('[data-hover]') : null
      if (t) {
        label.textContent = t.getAttribute('data-cursor') || 'CLICK'
        label.style.opacity = '1'
        ring.style.width = '46px'
        ring.style.height = '46px'
        dot.style.width = '10px'
        dot.style.height = '10px'
      }
    }
    const out = (e) => {
      const t = e.target.closest ? e.target.closest('[data-hover]') : null
      if (t) {
        label.style.opacity = '0'
        ring.style.width = '30px'
        ring.style.height = '30px'
        dot.style.width = '8px'
        dot.style.height = '8px'
      }
    }
    const leave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
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
      cancelAnimationFrame(raf)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white pointer-events-none z-[10000] opacity-0"
        style={{
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.16s ease, height 0.16s ease, background 0.16s ease',
          mixBlendMode: 'difference',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{
          width: 30,
          height: 30,
          border: '1px solid #ffffff',
          transform: 'translate(-100px, -100px)',
          transition:
            'width 0.22s cubic-bezier(.2,.8,.2,1), height 0.22s cubic-bezier(.2,.8,.2,1), opacity 0.2s ease',
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
