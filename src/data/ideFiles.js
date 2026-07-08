// The fake-IDE file contents (demo — owner will edit). Each entry drives the
// code panel, the line-number gutter, the language tag, and the terminal echo.
// Code is stored as template literals so the internal indentation is preserved
// exactly as it renders in the <pre>.

export const IDE_FILES = {
  about: {
    name: 'about.ts',
    lang: 'TYPESCRIPT',
    cmd: 'cat about.ts',
    code: `// aditya lingwal — software engineer
export const me = {
  role: "Software Engineer",
  focus: ["systems", "interfaces"],
  based: "India / Remote",
  years: 5,
};

// I build software that ships
// and holds up under load.
export function whoami() {
  return "full-stack, end to end";
}`,
  },

  stack: {
    name: 'stack.json',
    lang: 'JSON',
    cmd: 'cat stack.json',
    code: `{
  "languages": ["TypeScript", "Go", "Python"],
  "frontend": ["React", "Next.js", "CSS"],
  "backend": ["Node", "Postgres", "Redis"],
  "infra": ["Docker", "AWS", "CI/CD"],
  "principles": [
    "ship small",
    "measure everything",
    "delete more than you add"
  ]
}`,
  },

  exp: {
    name: 'experience.log',
    lang: 'LOG',
    cmd: 'tail experience.log',
    code: `2024 -> now    senior engineer      [company]
2022 -> 2024   engineer             [company]
2020 -> 2022   junior engineer      [company]

# demo entries — swap with real history
# recruiters: full CV available on request
# git log --author="aditya" | wc -l  => a lot`,
  },

  contact: {
    name: 'contact.sh',
    lang: 'BASH',
    cmd: './contact.sh',
    code: `#!/bin/bash
# reach out — I read everything.

EMAIL="aditya@example.com"
GITHUB="github.com/adityalingwal"

echo "opening channel..."
mail -s "Let's talk" $EMAIL

# response time: < 24h`,
  },
}

// File-tree order + the little two-char type glyphs shown before each name.
export const IDE_ORDER = [
  { key: 'about', icon: 'TS', name: 'about.ts' },
  { key: 'stack', icon: '{}', name: 'stack.json' },
  { key: 'exp', icon: '::', name: 'experience.log' },
  { key: 'contact', icon: '$', name: 'contact.sh' },
]
