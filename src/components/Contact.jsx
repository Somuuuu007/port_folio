import Scramble from './Scramble'

// Placeholder social links — owner will drop in real URLs.
const SOCIALS = [
  { label: 'GITHUB ↗', href: '#' },
  { label: 'TWITTER / X ↗', href: '#' },
  { label: 'LINKEDIN ↗', href: '#' },
  { label: 'READ.CV ↗', href: '#' },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-ink text-paper px-[clamp(28px,4.5vw,68px)] pt-[clamp(44px,6vw,104px)] pb-0"
    >
      {/* label bar */}
      <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.2em] border-b border-hairline pb-3.5 mb-[clamp(30px,4vw,56px)]">
        <span className="font-bold">// 05 — CONTACT</span>
        <span className="opacity-50">[ END_OF_FILE ]</span>
      </div>

      {/* availability */}
      <div className="flex items-center gap-3 font-mono text-[13px] tracking-[0.14em] mb-5 opacity-[0.85]">
        <span
          className="w-[9px] h-[9px] bg-paper inline-block"
          style={{ animation: 'blink 1.4s steps(1) infinite' }}
        />
        AVAILABLE FOR NEW PROJECTS
      </div>

      {/* finale headline */}
      <Scramble
        as="h2"
        text={"Let's build\nsomething"}
        className="font-display font-bold uppercase whitespace-pre-line text-[clamp(44px,10vw,180px)] leading-[0.84] tracking-[-0.045em]"
      />

      {/* email */}
      <a
        href="mailto:lingwaladitya82@gmail.com"
        data-hover
        data-cursor="MAIL"
        className="inline-flex items-center gap-4 mt-[clamp(32px,4vw,56px)] font-mono text-[clamp(18px,3vw,20px)] font-medium text-paper border-b-2 border-paper pb-2"
      >
        lingwaladitya82@gmail.com <span className="text-[0.7em]">↗</span>
      </a>

      {/* socials */}
      <div className="flex flex-wrap w-fit mt-[clamp(4px,5vw,20px)] border border-hairline font-mono text-[13px] font-medium tracking-[0.1em]">
        {SOCIALS.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            data-hover
            data-cursor="OPEN"
            className={`px-7 py-4 text-paper ${i < SOCIALS.length - 1 ? 'border-r border-hairline' : ''}`}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* footer */}
      <div className="mt-[clamp(52px,7vw,100px)] border-t border-hairline grid grid-cols-1 sm:grid-cols-3 gap-4 py-[22px] pb-[30px] font-mono text-[11px] tracking-[0.1em] opacity-70">
        <span>© 2026 ADITYA LINGWAL</span>
        <span className="sm:text-center">DESIGNED &amp; BUILT FROM SCRATCH</span>
        <a href="#hero" data-hover data-cursor="TOP" className="sm:text-right text-paper">
          BACK TO TOP ↑
        </a>
      </div>
    </section>
  )
}
