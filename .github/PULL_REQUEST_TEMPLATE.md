## Epic / Days covered

<!-- e.g. E1: Tooling foundation (Day 1) — link to the PROGRESS.md section -->

## What changed and why

<!-- 1-3 sentences. The "why" matters more than the "what" — the diff already shows what. -->

## Definition of Done

<!-- Copy the checklist from this epic's section in PROGRESS.md, all boxes checked before requesting merge. -->

- [ ]
- [ ]

## Verification performed

- [ ] `npm run dev` — manual playthrough of the behavior this PR touches
- [ ] `npm run build && npm run preview` — production build checked, not just dev server
- [ ] `npm test` — suite green (once Vitest exists from Day 2 onward)
- [ ] Read the raw output of every command above — warnings, not just errors, not just "did the page load"

## Shift-left checklist

<!-- Catch these before merge, not after a deploy. -->

- [ ] Any new generated-output folder (e.g. `dist/`) is excluded everywhere that walks the repo: `.gitignore`, ESLint, CI triggers — not just the one place that happened to complain first
- [ ] Any config expected to change file content on disk (encoding, line endings, formatting) was verified against the actual file, not just "git showed no diff"
- [ ] Any CI/workflow file change was checked for trigger scope (branches, events) — not just that the job steps are correct
- [ ] No `instanceof`/hardcoded-type coupling was added where a generic pattern was already available (see `ARCHITECTURE_REVIEW.md`)

## Learning log

<!-- Link or paste the LEARNING_LOG.md entry/entries for the day(s) in this PR. -->
