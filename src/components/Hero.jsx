import { useRef } from 'react'
import Scramble from './Scramble'
import HoldZone from './HoldZone'
import { useGlitchField } from '../hooks/useGlitchField'

const FIELD = `01001100 01001001 01001110 01000111
0x7F 0x45 0x4C 0x46 0x02 0x01 0x01 0x00
> compiling modules ....... ok
> linking interfaces ...... ok
> /usr/bin/aditya --serve
▓▒░ SYSTEM ONLINE ░▒▓
function render(){ return truth; }
:: allocating memory 0xFF2A
:: heap 44% :: cpu 12% :: net ok
while(alive){ ship(); }
0100 1101 0110 0001 0111 0100
> awaiting input_`

export default function Hero() {
  const fieldRef = useRef(null)
  useGlitchField(fieldRef, FIELD)

  return (
    <section
      id="hero"
      className="grid grid-cols-1 wide:grid-cols-[1.12fr_0.88fr] border-b border-ink min-h-[calc(100vh-36px)]"
    >
      {/* ---------- LEFT / PAPER ---------- */}
      <div className="relative flex flex-col justify-between p-[clamp(28px,4.5vw,68px)] min-h-[60vh] border-b wide:border-b-0 wide:border-r border-ink">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em]">
          <span>// PORTFOLIO — 2026</span>
          <span className="opacity-50">v2.0.1</span>
        </div>

        <div className="py-[clamp(24px,4vw,40px)]">
          <div className="font-mono text-[12px] tracking-[0.2em] mb-[18px] flex items-center gap-2.5">
            <span className="inline-block w-[26px] h-px bg-ink" />
            HELLO, I AM
          </div>

          <h1 className="font-display font-bold uppercase text-[clamp(52px,8.2vw,138px)] leading-[0.86] tracking-[-0.04em]">
            Aditya
            <br />
            Lingwal
            <span
              className="inline-block w-[0.5em] h-[0.86em] bg-ink ml-[0.08em] translate-y-[0.06em]"
              style={{ animation: 'blink 1.1s steps(1) infinite' }}
            />
          </h1>

          <Scramble
            as="div"
            text="SOFTWARE ENGINEER — FULL-STACK"
            className="font-mono font-medium text-[clamp(13px,1.5vw,17px)] tracking-[0.16em] mt-[22px]"
          />

          <p className="max-w-[46ch] mt-5 text-[clamp(15px,1.5vw,18px)] leading-[1.55] opacity-[0.82]">
            I build software that ships and holds up under load — backend systems, frontend
            interfaces, and the glue in between. Designed to be understood at 3am.
          </p>
        </div>

        <div className="flex flex-wrap border border-ink w-fit">
          <a
            href="#work"
            data-hover
            data-cursor="VIEW"
            className="cta-cell flex items-center gap-3 px-[26px] py-4 font-mono text-[13px] font-bold tracking-[0.12em] border-r border-ink"
          >
            VIEW WORK <span className="text-[15px]">→</span>
          </a>
          <a
            href="#contact"
            data-hover
            data-cursor="MAIL"
            className="cta-cell flex items-center gap-3 px-[26px] py-4 font-mono text-[13px] font-bold tracking-[0.12em]"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>

      {/* ---------- RIGHT / BLACK TERMINAL (press & hold to charge) ---------- */}
      <HoldZone className="bg-ink text-paper overflow-hidden min-h-[60vh]">
        {/* background glitch field */}
        <pre
          ref={fieldRef}
          className="absolute inset-0 m-0 p-[14px] text-[12px] leading-[1.35] text-paper opacity-[0.16] overflow-hidden whitespace-pre pointer-events-none"
          style={{ animation: 'fieldpulse 5s ease-in-out infinite' }}
          aria-hidden="true"
        >
          {FIELD}
        </pre>

        {/* terminal title bar */}
        <div
          data-jiggle
          className="relative z-[2] flex items-center gap-2 px-4 py-3 border-b border-hairline font-mono text-[11px] tracking-[0.1em]"
        >
          <span className="inline-block w-[9px] h-[9px] rounded-full border border-paper" />
          <span className="inline-block w-[9px] h-[9px] rounded-full border border-paper" />
          <span className="inline-block w-[9px] h-[9px] rounded-full border border-paper" />
          <span className="ml-2.5 opacity-70">aditya@portfolio: ~</span>
        </div>

        {/* fake shell session */}
        <div
          data-jiggle
          className="relative z-[2] flex-1 p-[clamp(20px,3vw,34px)] font-mono text-[clamp(12px,1.15vw,14px)] leading-[1.9]"
        >
          <div>
            <span className="opacity-50">$</span> whoami
          </div>
          <Scramble as="div" text="aditya_lingwal.engineer" className="pl-[14px]" />
          <div className="mt-3">
            <span className="opacity-50">$</span> cat status.txt
          </div>
          <Scramble as="div" text="STATUS: OPEN TO NEW ROLES" className="pl-[14px]" />
          <Scramble as="div" text="MODE: FULL-TIME / CONTRACT" className="pl-[14px]" />
          <Scramble as="div" text="RESPONSE: < 24 HOURS" className="pl-[14px]" />
          <div className="mt-3">
            <span className="opacity-50">$</span> ./explore.sh
          </div>
          <div className="pl-[14px] opacity-70">
            press &amp; hold to run
            <span
              className="inline-block w-2 h-[15px] bg-paper ml-1.5 translate-y-[3px]"
              style={{ animation: 'blink 1s steps(1) infinite' }}
            />
          </div>
        </div>

        {/* footer meta */}
        <div
          data-jiggle
          className="relative z-[2] flex items-center justify-between px-[18px] py-3.5 border-t border-hairline font-mono text-[10px] tracking-[0.14em] opacity-70"
        >
          <span>MEM 44%</span>
          <span>THREADS 8</span>
          <span>UPTIME ∞</span>
          <span>0xFF2A</span>
        </div>

        {/* rotating scroll ring */}
        <div
          className="absolute bottom-[84px] right-[22px] z-[3] w-[92px] h-[92px]"
          style={{ animation: 'spinslow 14s linear infinite' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path id="ring" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text
              fill="#E7E4DC"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', letterSpacing: '0.32em' }}
            >
              <textPath href="#ring">SCROLL · TO · EXPLORE · SCROLL · </textPath>
            </text>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px]">↓</div>
        </div>
      </HoldZone>
    </section>
  )
}
