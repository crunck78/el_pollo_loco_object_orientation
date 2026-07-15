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

**Date:** 2026-07-14  
**Status:** ✅ DONE

### Key Concepts Learned
- [x] **The bridge pattern's actual mechanism**: `export class X` gives the module its own scope, so `X` stops leaking onto `window` automatically the way a classic `<script>`'s top-level `class`/`function` declarations do. `window.X = X` manually restores that global for every other file that still expects `new X()` to work as a bare identifier. It's a deliberate, temporary crutch — deleted once everything is real modules importing each other (Day 10).
- [x] **A converted file must leave `public/` to actually get bundled.** `public/` is always raw passthrough — Vite never processes it. `Keyboard` moved back to `models/` specifically because it's now `type="module"`, and the build output proved it worked: `dist/assets/index-*.js` appeared as a real bundled/hashed asset for the first time, instead of a verbatim-copied file.
- [x] **Vitest table-test title interpolation depends on the case shape.** `%s`/`%i` printf placeholders only work for array-of-*array* (positional) cases; array-of-*objects* need `$propertyName` syntax instead. Mixed these up and every title silently rendered `"keyCode NaN toggles NaN correctly"` — caught by actually reading verbose test output, not just the pass/fail count.
- [x] **`new JSDOM()` inside a test creates a second, isolated DOM — not a shortcut to configure the existing one.** Vitest's `environment: 'jsdom'` already injects `window`/`document` as the real global objects; `Keyboard` reads those ambient globals directly. A manually-constructed `JSDOM()` instance is a completely separate realm the class under test never touches, so elements added to its document are invisible, and events dispatched on its window never reach listeners bound to the real global window.
- [x] **`TouchEvent` has no native constructor in desktop Firefox by default** — Chromium and WebKit implement it, and jsdom fakes it uniformly, which is exactly why `npm test` (jsdom-only) never caught this but `npm run test:browser` (real browsers via Playwright) did. A genuine cross-browser platform gap, not a config mistake — fixed with `test.skipIf(typeof TouchEvent === 'undefined')`, not by forcing it to pass.
- [x] **A lockfile can be internally inconsistent, not just stale.** `npm ci` failed in CI with "Missing: @emnapi/core@1.11.2 from lock file" even though the same `package-lock.json` installed fine locally on Windows — the lockfile had two different pinned versions of the same nested WASM binding dependency, which only surfaces as a hard failure under `npm ci`'s strict check, not under the more lenient `npm install`.

### Mistakes / Could Do Better
- Two `test.for` title bugs shipped before being caught: the `%i` placeholder issue (see above) and a separate `$btnID`/`btnId` casing mismatch in the touch-test titles. Neither broke the actual assertions — only the human-readable test names — which is exactly why they're easy to miss without deliberately checking verbose output.
- The touchstart/touchend test cases were missing `btnThrow` entirely (only `btnLeft`/`btnRight`/`btnJump` were covered) — a coverage gap that a quick "does every button in the source have a matching test case" pass would have caught immediately.
- `package-lock.json` committed on Day 2 was already internally inconsistent — didn't surface until the next CI run. Worth remembering: a lockfile installing cleanly on your own machine isn't proof it's correct; `npm ci` (not `npm install`) is the real trust check, and it's worth running locally before pushing when dependencies changed.

### What Went Well
- Verified the ESM conversion actually worked by checking the *build output*, not just that tests passed — seeing `Keyboard` show up as a real bundled `dist/assets/*.js` file (instead of a verbatim-copied one) was concrete proof the module graph picked it up correctly.
- Caught two real `no-unused-vars` findings via ESLint while cleaning up the test file (a dead `let keyboard` at describe-scope, an unused local in the bridge test) — these weren't cosmetic, they were genuinely dead code the auto-formatter wouldn't have caught on its own.
- Diagnosed the CI-only lockfile failure by reproducing CI's exact `npm ci` step locally (fresh `node_modules` wipe) instead of guessing — confirmed the root cause before touching anything, then verified the fix with the full test suite + a production build before pushing.

### Open Questions
- Why does the bridge pattern work? (Module scope vs. global scope?) — **Answered above**, keeping as a permanent reference note for future days' conversions.
- When would you delete the bridge vs. keep it? — Day 10, once every file importing `Keyboard` does so via real `import` instead of the global.
- Would pinning Node/npm versions (`.nvmrc` + `engines` in `package.json`) or switching to pnpm have caught the `@emnapi` lockfile inconsistency earlier, before it reached CI? Tracked in `PROGRESS.md` backlog.

---

## Day 3 — Core Spine (1/4): DrawableObject

**Date:** 2026-07-15  
**Status:** ✅ DONE

### Key Concepts Learned
- [x] **Classic `<script>` and `<script type="module">` execute in fundamentally different timing, not just different scoping.** A plain `<script src>` runs synchronously, in document order, immediately as the parser reaches it. A module script always defers until after the *entire* document has finished parsing — regardless of where it sits in the source. Converting one class in the middle of an `extends` chain to a module doesn't just change its scope; it changes *when* it runs relative to everything else.
- [x] **`extends X` resolves `X` immediately, at the class declaration itself — not lazily.** This is why `Keyboard` (Day 2) converted safely (its only reference was `new Keyboard()` deep inside a method body, evaluated long after every script had loaded) while `DrawableObject` broke `MovableObject` instantly: `class MovableObject extends DrawableObject` needs `DrawableObject` to exist the moment that line executes, synchronously, during parsing.
- [x] **`defer` on classic scripts joins the same execution queue as non-`async` module scripts.** Both are deferred until after parsing, both run in document order relative to each other. Adding `defer` to every remaining classic script tag fixes the ordering mismatch once, for every remaining conversion day — not something to special-case per file.
- [x] **Dead code can look like a live coupling problem.** `DrawableObject.drawFramesAndCoordinates()`'s `instanceof Character/Bottle/Coin` checks were flagged in the architecture review as a coupling smell, but grepping for callers showed it's only ever invoked from a commented-out line — worth confirming a smell is actually load-bearing before deciding whether it blocks anything.

### Mistakes / Could Do Better
- Should have anticipated the `extends`-timing issue before converting `DrawableObject`, not after hitting the `ReferenceError` live. The tell was sitting in the architecture already: `DrawableObject` is the *base* of an inheritance chain, unlike `Keyboard` which had zero subclasses — any base class with classic-script subclasses was always going to hit this the moment it became a module.
- Forgot to update Day 2's individual ticket checklist/status block in `PROGRESS.md` after merging — only the top-level status table got updated at the time. Worth double-checking both places close out together before starting the next day.

### What Went Well
- Diagnosed the `ReferenceError` from first principles (script execution timing) rather than guessing at fixes — confirmed the exact mechanism before touching any code.
- The `defer` fix is a one-time, durable solution rather than a per-file workaround — Days 4-8 won't need to rediscover this.
- Checked whether the flagged `instanceof` coupling was actually reachable code before assuming it needed fixing today.

### Open Questions
- Does `defer` have any downside worth knowing about before Day 10 (when everything collapses to a single module and `defer` becomes irrelevant)? Worth a quick check when that day arrives.
- Are there other timing-sensitive patterns (besides `extends`) in the remaining classes worth scanning for before their conversion day - e.g. static field initializers that reference another class at the top level?

---

## Day 4–15 (Template)

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
