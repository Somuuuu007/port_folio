/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',        // primary text, borders on paper, black backgrounds
        paper: '#E7E4DC',      // warm off-white page bg, text on black
        hairline: '#2A2A27',   // 1px dividers inside black sections
        panel: '#141412',      // project card bg on hover
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      screens: {
        // collapse multi-column layouts below ~860px (desktop-first)
        wide: '861px',
      },
    },
  },
  plugins: [],
}
