import { PROJECTS } from '../data/projects'

// Little browser "traffic light" dots used in the wireframe screenshot mocks.
function Dots({ n }) {
  return (
    <div className="flex gap-[5px] p-2 border-b border-ink">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="w-[7px] h-[7px] border border-ink rounded-full" />
      ))}
    </div>
  )
}

// Per-project B&W wireframe "screenshot" mock (revealed on hover).
function Shot({ kind }) {
  if (kind === 'bars') {
    return (
      <>
        <Dots n={3} />
        <div className="p-3 flex flex-col gap-[7px]">
          <div className="h-2 w-3/5 bg-ink" />
          <div className="h-1.5 w-[90%]" style={{ background: 'rgba(11,11,11,0.25)' }} />
          <div className="flex items-end gap-[5px] h-[60px] mt-1.5">
            {[40, 70, 55, 100, 80, 65].map((h, i) => (
              <div key={i} className="flex-1 bg-ink" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </>
    )
  }
  if (kind === 'grid') {
    return (
      <>
        <Dots n={2} />
        <div className="p-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-[34px]"
              style={i % 2 === 0 ? { border: '1px solid #0B0B0B' } : { background: '#0B0B0B' }}
            />
          ))}
          <div
            className="col-span-full h-1.5 mt-1"
            style={{ background: 'rgba(11,11,11,0.25)' }}
          />
        </div>
      </>
    )
  }
  if (kind === 'line') {
    return (
      <>
        <Dots n={1} />
        <div className="p-3.5">
          <svg viewBox="0 0 200 80" className="w-full h-[90px]">
            <polyline
              points="0,60 25,45 50,55 75,25 100,40 125,15 150,30 175,8 200,20"
              fill="none"
              stroke="#0B0B0B"
              strokeWidth="2"
            />
            <line x1="0" y1="78" x2="200" y2="78" stroke="rgba(11,11,11,0.3)" strokeWidth="1" />
          </svg>
        </div>
      </>
    )
  }
  // code
  return (
    <>
      <Dots n={2} />
      <div className="p-3 flex gap-2">
        <div className="w-2/5 flex flex-col gap-[5px]">
          <div className="h-1.5 bg-ink" />
          <div className="h-1.5 w-4/5" style={{ background: 'rgba(11,11,11,0.3)' }} />
          <div className="h-1.5 w-[90%]" style={{ background: 'rgba(11,11,11,0.3)' }} />
        </div>
        <div className="flex-1 border border-ink flex items-center justify-center font-mono text-[20px]">
          {'{ }'}
        </div>
      </div>
    </>
  )
}

// Border pattern that renders as a clean 2×2 grid on wide screens and a single
// divided column below the `wide` breakpoint.
const BORDERS = [
  'border-b border-hairline wide:border-r',
  'border-b border-hairline',
  'border-b border-hairline wide:border-r wide:border-b-0',
  'border-hairline',
]

export default function Work() {
  return (
    <section
      id="work"
      className="bg-ink text-paper border-b border-ink px-[clamp(28px,4.5vw,68px)] py-[clamp(40px,6vw,96px)]"
    >
      {/* label bar */}
      <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.2em] border-b border-hairline pb-3.5 mb-[clamp(28px,4vw,52px)]">
        <span className="font-bold">// 02 — SELECTED WORK</span>
        <span className="opacity-50">[ 04 PROJECTS ]</span>
      </div>

      <div className="grid grid-cols-1 wide:grid-cols-2 border border-hairline">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            data-hover
            data-cursor="VIEW"
            className={`group relative overflow-hidden p-6 transition-colors duration-300 hover:bg-panel ${BORDERS[i]}`}
          >
            <div className="flex justify-between font-mono text-[11px] tracking-[0.14em] opacity-70 mb-[18px]">
              <span>{p.id}</span>
              <span>{p.tag}</span>
            </div>

            {/* thumbnail zone: ascii ↔ screenshot cross-fade */}
            <div className="relative h-[170px] mb-5">
              <pre className="absolute inset-0 m-0 flex items-center justify-center text-[12px] leading-[1.2] text-paper transition-opacity duration-[350ms] group-hover:opacity-0">
                {p.ascii}
              </pre>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms] bg-paper text-ink border border-hairline overflow-hidden">
                <Shot kind={p.shot} />
              </div>
            </div>

            <h3 className="font-display font-bold uppercase text-[clamp(20px,2.2vw,30px)] tracking-[-0.02em]">
              {p.title}
            </h3>
            <p className="font-mono text-[12px] leading-[1.6] opacity-70 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
