// Full-page texture overlays — fixed, non-interactive.
//   - grain: assets/grain.png (dark specks on transparent) tiled at 140px
//   - scanlines: pure-CSS repeating gradient, 1px on / 2px off
//
// These are drawn as plain semi-transparent layers (NO mix-blend-mode). Both
// textures are dark-on-transparent, and for a black overlay "multiply" and
// normal alpha give the same darkening — so the look is unchanged, but the
// browser no longer has to re-blend the whole viewport every frame on scroll
// (which is what made scrolling feel laggy).
export default function FxOverlays() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[9990]"
        style={{
          backgroundImage: 'url(/assets/grain.png)',
          backgroundSize: '140px',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[9989]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
