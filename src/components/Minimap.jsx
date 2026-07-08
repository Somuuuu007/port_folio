import { SECTIONS } from '../data/sections'

// Fixed top-right live minimap: MAP + scroll %, six nav rows (active row
// highlighted), and a viewport-indicator rectangle tracking scroll progress.
// The % text and the rect's top/height are updated imperatively via refs (see
// useScrollTracking) — the JSX only sets their static styling, so scrolling
// never re-renders this component. Hidden below the `wide` breakpoint.
export default function Minimap({ activeIndex, pctRef, rectRef }) {
  return (
    <div className="hidden wide:block fixed top-[50px] right-[14px] w-[138px] z-[9991] bg-paper border border-ink font-mono">
      <div className="flex items-center justify-between px-2 py-[5px] border-b border-ink text-[9px] tracking-[0.16em] font-bold">
        <span>MAP</span>
        {/* "00%" is just the initial value; the live % is written imperatively.
            React skips this constant text child on re-render, so it won't clobber. */}
        <span ref={pctRef} className="opacity-60">
          00%
        </span>
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

        {/* viewport indicator — top/height set imperatively (only `background`
            is React-managed, so scroll updates aren't overwritten on re-render) */}
        <div
          ref={rectRef}
          className="absolute left-[3px] right-[3px] top-[6px] h-[20px] border border-ink pointer-events-none"
          style={{ background: 'rgba(11,11,11,0.08)' }}
        />
      </div>
    </div>
  )
}
