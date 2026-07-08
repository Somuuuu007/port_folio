import { useEffect, useRef } from 'react'

// Wraps a section and turns it into a press-and-hold "charge" zone, inspired by
// the click-&-hold interaction on contentarchitecture.dev.
//
//   press  → the content compresses inward, EVERY letter jiggles/wiggles on its
//            own (accelerating with the charge — the "anger"), and a paper
//            energy-glow grows from the edges. Chip cycles CLICK & HOLD →
//            KEEP HOLDING → RELEASE.
//   release→ everything POPS OUTWARD (letters burst out radially, the whole
//            block overshoots past 1) then springs back to rest. A full-charge
//            release also fires onComplete.
//
// Ref + rAF driven — the wrapped content never re-renders. For the per-letter
// jiggle, any element marked data-jiggle has its text split into per-character
// spans on press and restored verbatim on release.
const DEFAULT_DURATION = 1300

// Reversibly split every text node under `root` into per-character spans.
// Each original text node becomes one wrapper span (so it can be swapped back
// for the exact original node on restore — leaving React's tree intact).
function splitChars(root) {
  const textNodes = []
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) {
        if (child.textContent.trim()) textNodes.push(child)
      } else if (child.nodeType === 1) {
        walk(child)
      }
    }
  }
  walk(root)

  const ops = []
  const spans = []
  textNodes.forEach((tn) => {
    const parent = tn.parentNode
    if (!parent) return
    const wrapper = document.createElement('span')
    wrapper.style.display = 'inline'
    for (const ch of tn.textContent) {
      if (ch === ' ') {
        wrapper.appendChild(document.createTextNode(' '))
        continue
      }
      const s = document.createElement('span')
      s.textContent = ch
      s.style.display = 'inline-block'
      s.style.willChange = 'transform'
      wrapper.appendChild(s)
      spans.push(s)
    }
    parent.replaceChild(wrapper, tn)
    ops.push({ wrapper, textNode: tn })
  })
  return { ops, spans }
}

function restoreChars(split) {
  if (!split) return
  split.ops.forEach(({ wrapper, textNode }) => {
    if (wrapper.parentNode) wrapper.parentNode.replaceChild(textNode, wrapper)
  })
}

export default function HoldZone({ children, duration = DEFAULT_DURATION, onComplete, className = '' }) {
  const zoneRef = useRef(null)
  const contentRef = useRef(null)
  const vignetteRef = useRef(null)
  const labelRef = useRef(null)
  const st = useRef({ mode: 'idle', progress: 0, start: 0, raf: 0 })
  const jig = useRef(null) // { ops, spans } while a hold is active

  const setLabel = (t) => {
    const l = labelRef.current
    if (l && l.textContent !== t) l.textContent = t
  }

  const drawContent = (p, violent) => {
    const content = contentRef.current
    if (content) {
      const scale = 1 - 0.1 * p // squeeze inward
      const amp = (violent ? 1 : Math.pow(p, 1.7)) * 2.5 // gentle whole-block tremor
      const sx = (Math.random() * 2 - 1) * amp
      const sy = (Math.random() * 2 - 1) * amp
      content.style.transform = `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px) scale(${scale.toFixed(4)})`
    }
    const vig = vignetteRef.current
    if (vig) {
      vig.style.boxShadow = `inset 0 0 ${Math.round(p * 110)}px ${Math.round(p * 12)}px rgba(231,228,220,${(p * 0.24).toFixed(3)})`
    }
  }

  const drawLetters = (p, violent) => {
    const spans = jig.current && jig.current.spans
    if (!spans) return
    const amp = (violent ? 1 : Math.pow(p, 1.5)) * 3.6 // per-letter jiggle (px)
    const rot = amp * 2.4 // + rotation (deg)
    for (let i = 0; i < spans.length; i++) {
      const jx = (Math.random() * 2 - 1) * amp
      const jy = (Math.random() * 2 - 1) * amp
      const jr = (Math.random() * 2 - 1) * rot
      spans[i].style.transform = `translate(${jx.toFixed(1)}px, ${jy.toFixed(1)}px) rotate(${jr.toFixed(1)}deg)`
    }
  }

  const draw = (p, violent) => {
    drawContent(p, violent)
    drawLetters(p, violent)
  }

  const reset = () => {
    const s = st.current
    s.mode = 'idle'
    s.progress = 0
    s.start = 0
    if (contentRef.current) contentRef.current.style.transform = 'translate(0px, 0px) scale(1)'
    if (vignetteRef.current) vignetteRef.current.style.boxShadow = 'inset 0 0 0 0 rgba(231,228,220,0)'
    restoreChars(jig.current)
    jig.current = null
    setLabel('CLICK & HOLD')
  }

  // fully charged: keep trembling until release
  const chargedLoop = () => {
    draw(1, true)
    st.current.raf = requestAnimationFrame(chargedLoop)
  }

  const charge = (ts) => {
    const s = st.current
    if (!s.start) s.start = ts
    const p = Math.min(1, (ts - s.start) / duration)
    s.progress = p
    if (p >= 1) {
      s.mode = 'charged'
      setLabel('RELEASE')
      s.raf = requestAnimationFrame(chargedLoop)
      return
    }
    draw(p, false)
    s.raf = requestAnimationFrame(charge)
  }

  // release → the whole block + every letter pop outward, then spring/wave back
  const popOut = (fromP) => {
    const s = st.current
    s.mode = 'popping'
    setLabel('CLICK & HOLD')
    const content = contentRef.current
    const vig = vignetteRef.current
    const spans = (jig.current && jig.current.spans) || []

    // each letter's outward direction + distance from centre (for a ripple
    // stagger). One read pass.
    const zr = zoneRef.current ? zoneRef.current.getBoundingClientRect() : null
    const cx = zr ? zr.left + zr.width / 2 : 0
    const cy = zr ? zr.top + zr.height / 2 : 0
    let maxLen = 1
    const info = spans.map((sp) => {
      const r = sp.getBoundingClientRect()
      const dx = r.left + r.width / 2 - cx
      const dy = r.top + r.height / 2 - cy
      const len = Math.hypot(dx, dy) || 1
      if (len > maxLen) maxLen = len
      return { dx: dx / len, dy: dy / len, len }
    })

    // damped oscillations — start at 1, wave through several cycles, settle to 0.
    // Slow decay is the whole point: you actually SEE the waves, not one snap.
    const waveBlock = (t) => Math.exp(-3 * t) * Math.cos(t * Math.PI * 3.2)
    const waveLetter = (t) => Math.exp(-2.6 * t) * Math.cos(t * Math.PI * 3.0)

    const e = 0.55 + 0.45 * fromP // keep releases poppy even at a light charge
    const startScale = 1 - 0.1 * fromP
    const popAmp = 0.1 * e // block bursts this far past 1, then oscillates
    const dist = 32 * e // letters fly out this far, then wave back in
    const rampT = 0.18 // quick burst outward, then the long wavy settle
    const t0 = performance.now()
    const dur = 2700 // slow, graceful wave settle (~3x slower than a snap)
    const step = (ts) => {
      const k = Math.min(1, (ts - t0) / dur)

      // whole block: burst out to (1 + popAmp), then oscillate down to 1
      let cs
      if (k < rampT) cs = startScale + (1 + popAmp - startScale) * (k / rampT)
      else cs = 1 + popAmp * waveBlock((k - rampT) / (1 - rampT))
      if (content) content.style.transform = `translate(0px, 0px) scale(${cs.toFixed(4)})`

      // glow snaps away over the first third
      const g = Math.max(0, 1 - k * 3) * fromP
      if (vig) {
        vig.style.boxShadow = `inset 0 0 ${Math.round(g * 110)}px ${Math.round(g * 12)}px rgba(231,228,220,${(g * 0.24).toFixed(3)})`
      }

      // letters: fly outward, then oscillate in/out — staggered by distance (ripple)
      for (let i = 0; i < spans.length; i++) {
        const it = info[i]
        const delay = (it.len / maxLen) * 0.3
        const local = Math.min(1, Math.max(0, (k - delay) / (1 - delay)))
        const d = local < rampT ? local / rampT : waveLetter((local - rampT) / (1 - rampT))
        const sc = 1 + 0.35 * e * Math.max(0, d)
        spans[i].style.transform = `translate(${(it.dx * dist * d).toFixed(1)}px, ${(it.dy * dist * d).toFixed(1)}px) scale(${sc.toFixed(3)})`
      }

      if (k < 1) s.raf = requestAnimationFrame(step)
      else reset()
    }
    s.raf = requestAnimationFrame(step)
  }

  const start = (e) => {
    // let touch drags scroll the page; mouse/pen begins a hold on press
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') e.preventDefault()
    const s = st.current
    if (s.mode !== 'idle') return
    cancelAnimationFrame(s.raf)
    s.mode = 'charging'
    s.start = 0
    s.progress = 0

    // split every marked line into per-letter spans for the jiggle
    const zone = zoneRef.current
    if (zone) {
      const marked = Array.from(zone.querySelectorAll('[data-jiggle]'))
      const ops = []
      const spans = []
      marked.forEach((el) => {
        const r = splitChars(el)
        ops.push(...r.ops)
        spans.push(...r.spans)
      })
      jig.current = { ops, spans }
    }

    setLabel('KEEP HOLDING')
    const l = labelRef.current
    if (l) {
      l.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 18}px)`
      l.style.opacity = '1'
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* fall back to pointerleave */
    }
    s.raf = requestAnimationFrame(charge)
  }

  const end = () => {
    const s = st.current
    if (s.mode !== 'charging' && s.mode !== 'charged') return
    cancelAnimationFrame(s.raf)
    const fromP = s.progress
    if (s.mode === 'charged') onComplete?.()
    popOut(fromP)
  }

  // cursor-following state chip
  const moveLabel = (e) => {
    const l = labelRef.current
    if (!l) return
    l.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 18}px)`
    l.style.opacity = '1'
  }
  const hideLabel = () => {
    if (labelRef.current) labelRef.current.style.opacity = '0'
  }
  const onLeave = () => {
    hideLabel()
    end()
  }

  useEffect(
    () => () => {
      cancelAnimationFrame(st.current.raf)
      restoreChars(jig.current)
    },
    [],
  )

  return (
    <div
      ref={zoneRef}
      className={`relative flex cursor-pointer touch-pan-y select-none flex-col ${className}`}
      onPointerDown={start}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerLeave={onLeave}
      onPointerMove={moveLabel}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* everything inside charges, jiggles + pops together */}
      <div
        ref={contentRef}
        className="relative flex flex-1 flex-col"
        style={{ transformOrigin: 'center', willChange: 'transform' }}
      >
        {children}
      </div>

      {/* energy glow building inward from the edges as it charges */}
      <div ref={vignetteRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]" />

      {/* cursor-following state chip */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] select-none whitespace-nowrap bg-paper px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink opacity-0 transition-opacity duration-150"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        CLICK & HOLD
      </div>
    </div>
  )
}
