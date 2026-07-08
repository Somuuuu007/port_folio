import { useState } from 'react'
import { IDE_FILES, IDE_ORDER } from '../data/ideFiles'

// Interactive "read me as code" panel. Clicking a file swaps the code, line
// numbers, filename, language tag, terminal echo, and the active highlight.
export default function Repo() {
  const [active, setActive] = useState('about')
  const file = IDE_FILES[active]
  const lineCount = file.code.split('\n').length
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')

  return (
    <section
      id="repo"
      className="bg-ink text-paper border-b border-ink px-[clamp(28px,4.5vw,68px)] py-[clamp(40px,6vw,96px)]"
    >
      {/* label bar */}
      <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.2em] border-b border-hairline pb-3.5 mb-[22px]">
        <span className="font-bold">// 03 — THE REPO</span>
        <span className="opacity-50">[ INTERACTIVE ]</span>
      </div>
      <p className="font-mono text-[clamp(13px,1.4vw,16px)] opacity-75 mb-[26px] max-w-[60ch]">
        Poke around — this whole panel is a working file explorer. Click a file to read it.
      </p>

      <div className="border border-hairline grid grid-cols-1 wide:grid-cols-[230px_1fr] min-h-[460px]">
        {/* ---------- FILE TREE ---------- */}
        <div className="border-b wide:border-b-0 wide:border-r border-hairline font-mono">
          <div className="px-3.5 py-3 border-b border-hairline text-[10px] tracking-[0.16em] opacity-60">
            EXPLORER
          </div>
          <div className="py-2">
            <div className="px-3.5 py-[5px] text-[12px] opacity-[0.55]">▾ aditya-lingwal/</div>

            {IDE_ORDER.map((f) => {
              const on = f.key === active
              return (
                <button
                  key={f.key}
                  type="button"
                  data-hover
                  data-cursor="OPEN"
                  onClick={() => setActive(f.key)}
                  className="w-full text-left pl-7 pr-3.5 py-1.5 text-[13px] flex items-center gap-2 cursor-pointer"
                  style={{
                    background: on ? '#E7E4DC' : 'transparent',
                    color: on ? '#0B0B0B' : '#E7E4DC',
                    fontWeight: on ? 700 : 400,
                  }}
                >
                  <span className="opacity-50">{f.icon}</span> {f.name}
                </button>
              )
            })}

            <div className="px-3.5 py-[5px] text-[12px] opacity-[0.35] mt-1.5">▸ node_modules/</div>
            <div className="px-3.5 py-[5px] text-[12px] opacity-[0.35]">▸ .git/</div>
          </div>
        </div>

        {/* ---------- CODE VIEWER ---------- */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-hairline font-mono text-[12px]">
            <span className="opacity-[0.85]">{file.name}</span>
            <span className="opacity-[0.45] text-[10px] tracking-[0.14em]">{file.lang}</span>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <pre className="m-0 py-4 pl-4 pr-2.5 text-[13px] leading-[1.7] text-paper opacity-[0.35] text-right border-r border-hairline select-none">
              {lineNumbers}
            </pre>
            <pre className="m-0 p-4 text-[13px] leading-[1.7] text-paper overflow-auto flex-1 whitespace-pre">
              {file.code}
            </pre>
          </div>

          {/* terminal strip */}
          <div className="border-t border-hairline font-mono text-[12px] px-4 py-3 leading-[1.7]">
            <div className="text-[10px] tracking-[0.16em] opacity-50 mb-1.5">TERMINAL</div>
            <div>
              <span className="opacity-50">aditya@repo</span> ~ %{' '}
              <span className="opacity-80">{file.cmd}</span>
            </div>
            <div>
              <span className="opacity-50">aditya@repo</span> ~ %{' '}
              <span
                className="inline-block w-2 h-[14px] bg-paper translate-y-[2px]"
                style={{ animation: 'blink 1s steps(1) infinite' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
