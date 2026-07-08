# Aditya Lingwal — Developer Portfolio

A single-page developer portfolio with a terminal / monospace / ASCII aesthetic,
in pure warm black & white. Built from the design handoff in
`Website design reference discussion/` using **React + Tailwind CSS (Vite)**.

Six sections — Hero → About → Work → The Repo (fake IDE) → FAQ → Contact — with
signature interactions: a custom pixel cursor, scramble-decode text, ASCII →
wireframe hover reveals, a live status bar + minimap scrollspy, and a fully
interactive fake file explorer.

## Run it

```bash
npm install       # once
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Where to edit content

The copy is demo/placeholder — swap it here:

| What | File |
|---|---|
| Projects (titles, tags, ASCII, descriptions) | `src/data/projects.js` |
| Fake-IDE file contents | `src/data/ideFiles.js` |
| FAQ questions & answers | `src/data/faq.js` |
| Section names (nav / minimap / status bar) | `src/data/sections.js` |
| Email address | `src/components/Contact.jsx` (`mailto:` + `about`/`contact` IDE files) |
| Social links (currently `#` placeholders) | `src/components/Contact.jsx` → `SOCIALS` |
| Hero name / headline / bio | `src/components/Hero.jsx`, `src/components/About.jsx` |

## Structure

```
src/
  App.jsx                 # composes the page
  index.css               # Tailwind + base styles + keyframes
  components/
    FxOverlays.jsx        # grain + scanline texture
    CustomCursor.jsx      # pixel cursor (desktop / fine-pointer only)
    Chrome.jsx            # owns scroll state → status bar + minimap
    TopStatusBar.jsx  Minimap.jsx
    Hero.jsx  About.jsx  Work.jsx  MarqueeDivider.jsx  Repo.jsx  Faq.jsx  Contact.jsx
    Scramble.jsx          # decode-on-reveal text
  hooks/
    useClock.js  useScrollTracking.js  useGlitchField.js
  data/
    sections.js  projects.js  ideFiles.js  faq.js
public/assets/            # grain.png (+ optional dither tiles)
```

## Design tokens (Tailwind theme — `tailwind.config.js`)

- `ink` `#0B0B0B` · `paper` `#E7E4DC` · `hairline` `#2A2A27` · `panel` `#141412`
- Fonts: `font-display` = Space Grotesk, `font-mono` = JetBrains Mono (Google Fonts)
- No border-radius (except tiny dots), no shadows — depth is borders + inversion + texture.
- `wide` breakpoint (861px) collapses multi-column layouts on smaller screens.

Original design spec: `Website design reference discussion/design_handoff_portfolio/README.md`.
