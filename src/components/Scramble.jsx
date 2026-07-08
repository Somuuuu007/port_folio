import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%$@!?'

// Decode-on-reveal text. The real text is always rendered as children (so it
// is accessible and fails safe if JS is off); when the element scrolls into
// view we briefly overwrite textContent with a scrambling animation that
// settles back to the real text. Spaces and newlines are preserved, so pass
// `\n` for multi-line targets and style with `whitespace-pre-line`.
export default function Scramble({ as: Tag = 'div', text, className, style, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finalText = text
    let timeout
    let io
    let done = false

    const run = () => {
      const len = finalText.length
      const total = 26
      let frame = 0
      const step = () => {
        let out = ''
        for (let i = 0; i < len; i++) {
          const c = finalText[i]
          if (c === ' ' || c === '\n') {
            out += c
            continue
          }
          const reveal = (i / len) * total
          out += frame >= reveal + 4 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        el.textContent = out
        frame++
        if (frame <= total + 6) timeout = setTimeout(step, 32)
        else el.textContent = finalText
      }
      step()
    }

    if (!('IntersectionObserver' in window)) {
      el.textContent = finalText
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !done) {
            done = true
            run()
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      if (io) io.disconnect()
      if (timeout) clearTimeout(timeout)
    }
  }, [text])

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {text}
    </Tag>
  )
}
