import { useClock } from '../hooks/useClock'
import { SECTIONS } from '../data/sections'

// Fixed 36px OS-style status bar: identity · live section · location + clock.
export default function TopStatusBar({ activeIndex }) {
  const clock = useClock()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-9 bg-paper border-b border-ink flex items-stretch justify-between z-[9992] font-mono text-[11px] tracking-[0.08em]"
    >
      {/* left: identity */}
      <div className="flex items-center gap-2.5 px-3.5 border-r border-ink whitespace-nowrap">
        <span
          className="w-2 h-2 bg-ink rounded-full inline-block shrink-0"
          style={{ animation: 'blink 1.6s steps(1) infinite' }}
        />
        <span className="font-bold">ADITYA_LINGWAL</span>
        <span className="opacity-[0.45] hidden sm:inline">///</span>
        <span className="opacity-70 hidden sm:inline">SOFTWARE_ENGINEER</span>
      </div>

      {/* center: live active-section indicator */}
      <div className="flex items-center px-4 border-l border-r border-ink font-bold whitespace-nowrap">
        [ {SECTIONS[activeIndex].label} ]
      </div>

      {/* right: location + clock + REC */}
      <div className="flex items-center gap-3.5 px-3.5 border-l border-ink whitespace-nowrap">
        <span className="opacity-70 hidden md:inline">LOC 28.6°N</span>
        <span className="font-bold min-w-[62px]">{clock}</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-[7px] h-[7px] bg-ink inline-block"
            style={{ animation: 'blink 1s steps(1) infinite' }}
          />
          REC
        </span>
      </div>
    </div>
  )
}
