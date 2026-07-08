import { useEffect, useState } from 'react'

// Live HH:MM:SS clock for the top status bar. Ticks once a second.
export function useClock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const p = (n) => String(n).padStart(2, '0')
    const tick = () => {
      const d = new Date()
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
