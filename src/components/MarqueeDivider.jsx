// Full-width scrolling strip between Work and The Repo. The phrase list is
// duplicated so the -50% translate loops seamlessly.
const PHRASES = ['Available for work', 'Open to roles', "Let's build something"]
const LOOP = [...PHRASES, ...PHRASES]

export default function MarqueeDivider() {
  return (
    <div className="bg-paper border-b border-ink overflow-hidden whitespace-nowrap py-3.5">
      <div
        className="inline-flex font-display font-bold uppercase text-[clamp(20px,2.6vw,34px)] tracking-[0.02em]"
        style={{ animation: 'marquee 22s linear infinite' }}
      >
        {LOOP.map((phrase, i) => (
          <span key={i} className="flex shrink-0">
            <span className="px-[22px]">{phrase}</span>
            <span className="px-[22px] opacity-[0.35]">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
