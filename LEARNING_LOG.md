# Learning Log: El Pollo Loco → 2D Game Engine Refactor

**Purpose:** Capture what you learn, mistakes, wins, and questions as you refactor this project. **This is your engineering journal** — review it every few days and revisit open questions when they become relevant.

---

## Day 1 — Vite Scaffolding

**Date:** 2026-07-13  
**Status:** ✅ DONE

### Key Concepts Learned
- [x] **Vite's dev server vs. build step treat classic `<script>` tags completely differently.** Dev mode just serves your whole project root as static files, so any relative path resolves "by luck." The build step only bundles `<script type="module">` — a classic `<script src="...">` gets a warning (`can't be bundled without type="module" attribute`) and is left untouched **without the referenced file being copied**. This is why `npm run dev` succeeding proved nothing about `npm run build`.
- [x] **Vite's `public/` convention** copies files byte-for-byte to the build output root, preserving relative paths — this let us keep `img/`, `audio/`, `js/`, `models/` working with zero source-code edits (folder moves only) while classic scripts are still in play. Temporary until Day 9–10 when the entry point collapses to one ES module.
- [x] **ESLint flat config global ignores**: an object with only an `ignores` key (no `files`) applies to every config in the array — that's how `dist/**` got excluded repo-wide in one line.
- [x] **`core.autocrlf=true` masks reality.** Git stores blobs as LF internally but checks them out as CRLF on Windows. `git add --renormalize .` showed "no changes" not because things were fine, but because Git already treated the CRLF working copy as equivalent to the LF blob. Confirming the `.gitattributes` `eol=lf` policy actually took effect on disk required `file <filename>` — a diff tool showing nothing is not proof a content-affecting config change worked.
- [x] **GitHub Actions `on: push` with no `branches:` filter fires on every push to every branch.** `deploy.yml` had this from before any of today's changes — meaning pushing an epic working branch would trigger a live FTP deploy to production. Caught only by explicitly asking "what could still go wrong here" after the main work was done, not automatically.

### Mistakes / Could Do Better
- Moved `img/`/`audio/` into `public/` based on reasoning about asset-string paths *before* actually running a full `npm run build` and reading its raw output. The build's very first run already printed the `can't be bundled without type="module"` warning for every script tag — if I'd scanned that output line-by-line immediately instead of jumping to "does the page load in the browser," the `js/`/`models/` fix would have been applied in the same pass as the image/audio fix, not discovered two round-trips later via a runtime "Javascript Files can not be found."
- Didn't proactively gate the new `dist/` output folder across every repo-wide tool at once — `.gitignore` was added first, ESLint's `dist/**` ignore was only added because the user (not me) noticed it, and the `deploy.yml` branch-trigger risk wasn't caught until an explicit "what went wrong" retro. A new generated-output folder should trigger a single checklist pass (git, linter, formatter, CI triggers) rather than being found one tool at a time.

### What Went Well
- Verified real behavior by actually running `npm run build` and inspecting `dist/`'s file list, instead of assuming the fix worked — this is what caught the missing `js/`/`models/` files definitively.
- Kept the "zero game-code-changes" constraint intact for the whole day — every fix was a folder move or a config change, never a source-code edit.
- Split unrelated concerns into separate, independently-revertible commits: Vite scaffolding, line-ending normalization, and the deploy-trigger fix.
- Caught two real issues before I flagged them: the missing `dist/` ESLint ignore, and the CRLF/line-ending drift. Good instinct to keep exercising.

### Open Questions
- How does Vite's dev server differ from a simple `python -m http.server`?
- When would you NOT use Vite for a JS project?
- Would a separate CI "quality gate" workflow (lint + build on every push/PR, not just `main`) have caught the `deploy.yml` branch-trigger issue automatically, without needing a manual retro? Worth deciding as stretch scope.

---

## Day 2 — ESM Pilot + Vitest

**Date:** TBD  
**Status:** ⬜ TODO

### Key Concepts Learned
- [ ] ES module syntax (`import`/`export`)
- [ ] The "bridge pattern" (`export class X` + `window.X = X`)
- [ ] Why unit testing an isolated class is easier once it's importable

### Mistakes / Could Do Better
(To be filled in)

### What Went Well
(To be filled in)

### Open Questions
- Why does the bridge pattern work? (Module scope vs. global scope?)
- When would you delete the bridge vs. keep it?

---

## Day 3–15 (Template)

**Date:** TBD  
**Status:** ⬜ TODO

### Key Concepts Learned
- [ ] 

### Mistakes / Could Do Better
- 

### What Went Well
- 

### Open Questions
- 

---

## Reflection Prompts (Review Every 3–5 Days)

After Days 3, 6, 10, 13, 15, ask yourself:

1. **What surprised you?** (e.g., "I thought X would be hard, but it was simple once I understood Y")
2. **What pattern will you repeat?** (e.g., "Always write tests first for pure math functions like collision detection")
3. **What would you do differently next time?** (e.g., "I should have created the EntityFactory earlier so I wasn't refactoring L twice")
4. **What's your biggest "aha"?** (the one insight that changes how you think about game engines)

---

## Glossary (Add Terms As You Go)

- **ESM:** ECMAScript Module — native `import`/`export` syntax (vs. CommonJS `require`)
- **Bridge pattern:** Exporting a module's class AND assigning it to `window` so old inline scripts can still use it
- **AABB collision:** Axis-Aligned Bounding Box — simple rectangle overlap detection
- **God object:** A class that does too much and is hard to reuse (like `World` knowing every entity type)
- **rAF:** `requestAnimationFrame` — the browser's way to schedule smooth animation loops
- **DDD:** Data-Driven Design — externalizing config/data (like level JSON) so code doesn't hardcode it

Add more as you encounter them.

---

## Quick Reference: What to Capture After Each Day

| Aspect | Example | Why It Matters |
|--------|---------|---|
| **Concept** | "Learned how Vite inlines CSS" | Builds intuition |
| **Mistake** | "Forgot to add bridge export, wasted 20 min debugging" | Avoid next time |
| **Win** | "The test-first approach caught a collision edge case" | Validate the process |
| **Question** | "When is bridge pattern NOT the right choice?" | Deepen understanding |
