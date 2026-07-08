// Selected work — DEMO content, expect real projects to replace these.
// `ascii` is the default motif; the matching wireframe "screenshot" mock is
// rendered per-card in Work.jsx (keyed by `shot`). String.raw keeps the
// backslashes in the ASCII art literal.

export const PROJECTS = [
  {
    id: 'PROJECT_001',
    tag: 'SYSTEMS',
    title: 'Ledger',
    shot: 'bars',
    desc: 'Distributed transaction engine. 40k req/s, zero downtime deploys.',
    ascii: String.raw`  +==================+
  | ####  ::::  ##### |
  | ##    ::      ##  |
  | ####  ::::    ##  |
  | ##      ::    ##  |
  | ####  ::::    ##  |
  +==================+
   LEDGER.ENGINE.v4`,
  },
  {
    id: 'PROJECT_002',
    tag: 'PLATFORM',
    title: 'Atlas',
    shot: 'grid',
    desc: 'Internal developer platform. Cut deploy time by 80% across 30 teams.',
    ascii: String.raw`   /\    /\    /\
  /  \  /  \  /  \
 / ATLAS PLATFORM \
 \  o    o    o   /
  \  ____________/
   \/  deploy x80
    ~~~~~~~~~~~~~`,
  },
  {
    id: 'PROJECT_003',
    tag: 'REALTIME',
    title: 'Signal',
    shot: 'line',
    desc: 'Realtime analytics pipeline. Sub-second aggregation over billions of events.',
    ascii: String.raw` .:. SIGNAL .:.
 |  .-'-.  |
 | (  o  ) |==>
 |  '-.-'  |
 [=========]
 sub-second @ scale
 * * * * * * * *`,
  },
  {
    id: 'PROJECT_004',
    tag: 'TOOLING',
    title: 'Forge',
    shot: 'code',
    desc: 'Design-to-code toolchain. Generates typed components straight from Figma.',
    ascii: String.raw`  [# FORGE #]
   |_|_|_|_|
   / / | \ \
  design -> code
  { } = { } = {}
  ::::::::::::::
  auto-generated`,
  },
]
