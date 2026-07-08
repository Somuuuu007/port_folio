import { SECTIONS } from '../data/sections'

// Fixed top-right live minimap: MAP + scroll %, six nav rows (active row
// highlighted), and a viewport-indicator rectangle tracking scroll progress.
// Hidden below the `wide` breakpoint to keep small screens uncluttered.
export default function Minimap({ activeIndex, pct, rect }) {
  return (
    <div
      className="hidden wide:block fixed top-[50px] right-[14px] w-[138px] z-[9991] bg-paper border border-ink font-mono"
    >
      <div className="flex items-center justify-between px-2 py-[5px] border-b border-ink text-[9px] tracking-[0.16em] font-bold">
        <span>MAP</span>
        <span className="opacity-60">{String(pct).padStart(2, '0')}%</span>
      </div>

      <div className="relative p-1.5">
        {SECTIONS.map((s, i) => {
          const on = i === activeIndex
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-hover
              data-cursor="JUMP"
              className="block text-[9px] tracking-[0.1em] px-1 py-[3px]"
              style={{
                opacity: on ? 1 : 0.5,
                fontWeight: on ? 700 : 400,
                background: on ? 'rgba(11,11,11,0.10)' : 'transparent',
              }}
            >
              {s.mm}
            </a>
          )
        })}

        {/* viewport indicator */}
        <div
          className="absolute left-[3px] right-[3px] border border-ink pointer-events-none"
          style={{ top: rect.top, height: rect.height, background: 'rgba(11,11,11,0.08)' }}
        />
      </div>
    </div>
  )
}
