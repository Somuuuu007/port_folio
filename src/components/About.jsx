import Scramble from './Scramble'

export default function About() {
  return (
    <section
      id="about"
      className="bg-paper border-b border-ink px-[clamp(28px,4.5vw,68px)] py-[clamp(40px,6vw,96px)]"
    >
      {/* label bar */}
      <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.2em] border-b border-ink pb-3.5 mb-[clamp(28px,4vw,56px)]">
        <span className="font-bold">// 01 — ABOUT</span>
        <span className="opacity-50">[ WHO_AM_I ]</span>
      </div>

      <div className="grid grid-cols-1 wide:grid-cols-[1.35fr_0.65fr] gap-[clamp(28px,4vw,64px)] items-start">
        {/* left: headline + two-column bio */}
        <div>
          <Scramble
            as="h2"
            text="I build software that ships — and holds up."
            className="font-display font-bold uppercase text-[clamp(30px,4.6vw,66px)] leading-[1.02] tracking-[-0.03em] max-w-[16ch]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-[clamp(28px,3.5vw,48px)] max-w-[760px]">
            <p className="text-[clamp(14px,1.35vw,17px)] leading-[1.62] opacity-[0.84]">
              Five years turning ambiguous problems into systems that don't break at 3am. I care
              about the boring parts — error states, latency, the migration nobody wants to run —
              because that's where products live or die.
            </p>
            <p className="text-[clamp(14px,1.35vw,17px)] leading-[1.62] opacity-[0.84]">
              I work end to end: schema to pixel. Comfortable owning a feature from the database up
              through the interface, and equally happy deleting code as writing it. Fewer moving
              parts, fewer 3am pages.
            </p>
          </div>
        </div>

        {/* right: black stack card */}
        <div className="border border-ink bg-ink text-paper font-mono text-[13px] leading-[1.95]">
          <div className="flex justify-between px-3.5 py-2.5 border-b border-hairline text-[10px] tracking-[0.16em]">
            <span>~/stack</span>
            <span className="opacity-60">READ-ONLY</span>
          </div>
          <div className="px-4 pt-4 pb-5">
            <div>
              <span className="opacity-50">$</span> cat stack.json
            </div>
            <div className="pl-1.5 opacity-[0.92]">
              <div>{'{'}</div>
              <div className="pl-3.5">"lang": ["TS","Go","Py"],</div>
              <div className="pl-3.5">"web": ["React","Next"],</div>
              <div className="pl-3.5">"data": ["Postgres","Redis"],</div>
              <div className="pl-3.5">"infra": ["Docker","AWS"]</div>
              <div>{'}'}</div>
            </div>
            <div className="mt-3.5 flex items-center gap-2 border-t border-hairline pt-3.5">
              <span
                className="w-2 h-2 bg-paper inline-block"
                style={{ animation: 'blink 1.4s steps(1) infinite' }}
              />
              <span className="tracking-[0.12em]">STATUS: AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
