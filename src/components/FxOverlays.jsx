// Full-page texture overlays. Both are fixed, non-interactive, multiply-blended.
//   - grain: assets/grain.png tiled at 140px (the look leans on this)
//   - scanlines: pure-CSS repeating gradient, 1px on / 2px off
export default function FxOverlays() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[9990]"
        style={{
          backgroundImage: 'url(/assets/grain.png)',
          backgroundSize: '140px',
          opacity: 0.5,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[9989]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
    </>
  )
}
