import { useState } from 'react'
import { FAQS } from '../data/faq'

// Single-open accordion. Item 0 open by default. Height is animated with the
// grid-template-rows 0fr↔1fr technique (smooth, no manual measuring).
export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="bg-paper border-b border-ink px-[clamp(28px,4.5vw,68px)] py-[clamp(40px,6vw,96px)]"
    >
      {/* label bar */}
      <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.2em] border-b border-ink pb-3.5 mb-[clamp(24px,3vw,44px)]">
        <span className="font-bold">// 04 — FAQ</span>
        <span className="opacity-50">[ ? ]</span>
      </div>

      <div className="grid grid-cols-1 wide:grid-cols-[0.8fr_1.2fr] gap-[clamp(24px,4vw,60px)] items-start">
        <h2 className="font-display font-bold uppercase text-[clamp(34px,5vw,78px)] leading-[0.92] tracking-[-0.03em]">
          Common
          <br />
          questions
        </h2>

        <div className="border-t border-ink">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-ink">
                <button
                  type="button"
                  data-hover
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-5 py-[22px] px-1 cursor-pointer text-left"
                >
                  <span className="font-display font-semibold text-[clamp(17px,1.9vw,23px)] tracking-[-0.01em]">
                    {item.q}
                  </span>
                  <span className="font-mono text-[18px] font-bold shrink-0">
                    {isOpen ? '[ − ]' : '[ + ]'}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-mono text-[14px] leading-[1.7] opacity-[0.78] px-1 pb-6 max-w-[60ch]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
