# 3-Week Refactor Progress: El Pollo Loco → 2D Game Engine

**Timeline:** 3 weeks, 5 days/week, 15 day-tickets total  
**Start date:** 2026-07-10  
**Target end date:** 2026-07-31  
**Model:** Sonnet 5  
**Collaboration:** User writes code; AI reviews/mentors

**Full roadmap & context:** [.claude/plans/this-is-my-2d-shimmering-parnas.md](.claude/plans/this-is-my-2d-shimmering-parnas.md)

---

## Status Overview

| Epic | Days | Status | Branch | Merge Commit |
|------|------|--------|--------|--------------|
| E1: Tooling foundation | 1 | ✅ DONE (pending merge) | `epic/01-vite-scaffolding` | — |
| E2: ESM pilot + testing | 2 | ✅ DONE | `epic/02-esm-pilot-testing` | `6a3817e` |
| E3: Core spine | 3–6 | 🟡 IN PROGRESS (1/4) | `epic/03-core-spine` | — |
| E4: Leaf classes | 7–8 | ⬜ TODO | `epic/04-leaf-classes` | — |
| E5: Entry point | 9–10 | ⬜ TODO | `epic/05-entry-point` | — |
| E6: Game loop | 11–12 | ⬜ TODO | `epic/06-game-loop` | — |
| E7: Decouple World/Level | 13 | ⬜ TODO | `epic/07-decouple-world-level` | — |
| E8: Data-driven levels | 14–15 | ⬜ TODO | `epic/08-data-driven-levels` | — |

---

## Day-by-Day Tickets

### Day 1 — E1: Vite scaffolding

**Ticket:** Add Vite, zero code changes  
**Concept:** Vite serves plain `<script>` tags fine without any ESM conversion — safest possible first step  
**Task:**
- `npm i -D vite`
- Add `vite.config.js` with `dev`/`build`/`preview` scripts
- Update [.github/workflows/deploy.yml](.github/workflows/deploy.yml) to `npm ci && npm run build` and FTP-sync `dist/` instead of repo root
- Set `sourceType: "module"` in [eslint.config.mjs](eslint.config.mjs) pre-emptively

**Definition of Done:**
- [x] Game identical under `npm run dev`
- [x] Game identical under `npm run preview`
- [x] Real `dist/` dry-run deploy works
- [x] All game functionality verified (movement, collision, collectibles, boss, HUD)

**Notes:** `img/`, `audio/`, `js/`, `models/` moved under `public/` — Vite's build step
silently drops classic (non-`type="module"`) `<script src>` references without copying
the file, so this keeps `dist/` deployable with zero game-code changes. Temporary until
Day 9–10 collapses the entry point to a single ES module. Also normalized line endings
to LF via `.gitattributes`/`.editorconfig` (separate commit) — dropped ESLint errors
from 10,883 (mostly CRLF noise) to 1,007 (real `no-undef` cross-file coupling, expected
to resolve as the ESM migration proceeds).

**Status:** ✅ DONE  
**Branch:** `epic/01-vite-scaffolding`  
**PR:** —  
**Commits:** `1e35999` (Vite scaffolding + asset relocation), `b17273d` (line-ending normalization)

---

### Day 2 — E2: ESM pilot + Vitest

**Ticket:** Convert `Keyboard`, add Vitest  
**Concept:** `Keyboard` has no `extends` — cheapest place to learn the "bridge" pattern (`export class X` + `window.X = X`) before touching inheritance  
**Task:**
- Convert [models/keyboard.class.js](models/keyboard.class.js) to an ES module with a `window.Keyboard` bridge line
- Flip its `<script>` to `type="module"` in [index.html](index.html)
- `npm i -D vitest`; add `test` script in package.json
- Write first unit tests for `Keyboard` (e.g., flag setting, debounce logic)

**Definition of Done:**
- [x] Input still works in-game (left/right/jump/throw)
- [x] `npm test` passes
- [x] `window.Keyboard` bridge exists and is tested

**Notes:** Also added a browser-mode test config (`vitest.browser.config.js`, Playwright
chromium/firefox/webkit) as a stretch addition beyond the day's original scope. Surfaced
a real cross-browser gap: desktop Firefox has no native `TouchEvent` constructor by
default, so touch-button tests skip there via `test.skipIf` rather than being forced to
pass. Follow-up incidents after merge (tracked as separate direct-to-main commits, not
part of this branch): an internally-inconsistent `package-lock.json` broke `npm ci` in
CI (`0b3b189`), and two quick successive pushes triggered overlapping FTP deploys, fixed
with `concurrency: cancel-in-progress` + `paths-ignore: ['**.md']` (`d4bdd40`).

**Status:** ✅ DONE  
**Branch:** `epic/02-esm-pilot-testing`  
**PR:** #2  
**Commits:** `91c4707` (Keyboard ESM + Vitest)

---

### Day 3 — E3: Core spine (1/4)

**Ticket:** Convert `DrawableObject`  
**Concept:** Root of the hierarchy, zero deps — safe starting point for the riskiest migration phase  
**Task:**
- Bridge-pattern convert [models/drawable-object.class.js](models/drawable-object.class.js)
- Flip its `<script>` to `type="module"` in [index.html](index.html)
- Verify no console errors

**Definition of Done:**
- [x] Rendering unaffected (sprites appear, camera pans, parallax works)
- [x] Full manual playthrough: move, jump, collide, win/lose
- [x] No console errors

**Notes:** `drawFramesAndCoordinates()`'s `instanceof Character/Bottle/Coin` checks
(flagged in `ARCHITECTURE_REVIEW.md`) turned out to be dead code — only reachable via
a commented-out call in `world.class.js`. Left as-is; real removal is still Day 13 scope.

Hit a real bug converting the first class with subclasses: classic `<script src>` tags
execute synchronously in document order, but `<script type="module">` always defers
until after the whole document parses, regardless of position. `MovableObject extends
DrawableObject` resolves `DrawableObject` immediately at the class declaration - so the
moment `DrawableObject` became a module, every remaining classic script depending on it
via `extends` broke (`ReferenceError: DrawableObject is not defined`), even though the
`window.DrawableObject` bridge was correctly in place. `Keyboard` never hit this because
its only reference was a lazy `new Keyboard()` call deep inside a method body, not a
top-level `extends`.

**Fix, applied once for all remaining days:** added `defer` to every remaining classic
`<script src>` tag in `index.html`. `defer`'d classic scripts and non-`async` module
scripts share the same execution queue (both deferred until after parsing, both run in
document order relative to each other) - so Days 4-8 no longer need to worry about this
ordering issue when converting the next class in the chain.

**Status:** ✅ DONE  
**Branch:** `epic/03-core-spine`  
**PR:** —  
**Commits:** `3ca0640` (DrawableObject ESM + script-order fix)

---

### Day 4 — E3: Core spine (2/4)

**Ticket:** Convert `MovableObject`  
**Concept:** Depends only on `DrawableObject`, which is now converted  
**Task:**
- Bridge-pattern convert [models/movable-object.class.js](models/movable-object.class.js)
- Flip its `<script>` to `type="module"` in [index.html](index.html)

**Definition of Done:**
- [x] Movement/animation unaffected (character walks, jumps, enemies patrol)
- [x] Frame throttling still works (no jank)
- [x] Full manual playthrough passes

**Notes:** First real `import` between two converted modules (`MovableObject` imports
`DrawableObject` directly) instead of relying on the `window` bridge for that dependency
— possible because `DrawableObject` was already converted on Day 3. The `window.X` bridge
is only still needed for the *remaining classic-script* side of each dependency; it'll
disappear entirely by Day 10. `no-undef` lint count moved 1,007 → 1,013 (a few newly-exposed
cross-file references from the file move), consistent with the expected trajectory - not
a regression.

**Status:** ✅ DONE  
**Branch:** `epic/03-core-spine`  
**PR:** —  
**Commits:** `f2f3420` (MovableObject ESM + real import)

---

### Day 5 — E3: Core spine (3/4)

**Ticket:** Convert `CollidableObject` + real tests  
**Concept:** First genuinely valuable test target — pure AABB math, easy to unit test once importable  
**Task:**
- Bridge-pattern convert [models/collidable-object.class.js](models/collidable-object.class.js)
- Write Vitest coverage for `isColliding()`, `isLeftSide()`, `isRightSide()`, `isAbove()`, `isBelow()`
- Flip its `<script>` to `type="module"` in [index.html](index.html)

**Definition of Done:**
- [ ] Collision behavior unaffected (character lands on platforms, enemy hits are detected, coins collected)
- [ ] Collision test suite green (`npm test`)
- [ ] Full manual playthrough passes

**Status:** ⬜ TODO  
**Branch:** `epic/03-core-spine`  
**PR:** —  
**Commits:** —

---

### Day 6 — E3: Core spine (4/4)

**Ticket:** Convert `DestroyableObject` + `Creature`  
**Concept:** Closes out the spine before the wide leaf-class conversion  
**Task:**
- Bridge-pattern convert [models/destroyable-object.class.js](models/destroyable-object.class.js) and [models/creature-object.class.js](models/creature-object.class.js)
- Flip their `<script>` tags to `type="module"` in [index.html](index.html)

**Definition of Done:**
- [ ] Hit/kill/energy behavior unaffected (enemies die, character loses health, coins/bottles collected)
- [ ] Full manual playthrough passes
- [ ] No console errors

**Status:** ⬜ TODO  
**Branch:** `epic/03-core-spine`  
**PR:** —  
**Commits:** —

---

### Day 7 — E4: Leaf classes (1/2)

**Ticket:** Convert batch 1 of leaf classes  
**Concept:** Mechanical repetition of the now-learned bridge pattern — lighter mentoring, good solo-practice day  
**Task:**
- Bridge-pattern convert: `Platform`, `Collectible`, `Coin`, `Bottle`, `HitPoint`, `Cloud`, `BackgroundObject`, `StatusBar`, `ThrowableObject`
- Flip all their `<script>` tags to `type="module"` in [index.html](index.html)

**Definition of Done:**
- [ ] Full playthrough: coins appear, bottles throw, platforms hold, clouds parallax, status bars render
- [ ] No console errors
- [ ] All 9 classes have `window.X` bridges in place

**Status:** ⬜ TODO  
**Branch:** `epic/04-leaf-classes`  
**PR:** —  
**Commits:** —

---

### Day 8 — E4: Leaf classes (2/2)

**Ticket:** Convert batch 2 + data modules  
**Concept:** Same pattern, finishes the class tree plus the two data/config files  
**Task:**
- Bridge-pattern convert: `NPC`, `Enemy`, `Chicken`, `EndBoss`, `BigChicken`, `Character`, `Pepe`, `World`, `Level`
- Convert data files: [js/assets.js](js/assets.js), [models/levels/level1.js](models/levels/level1.js)
- Flip all their `<script>` tags to `type="module"` in [index.html](index.html)

**Definition of Done:**
- [ ] Full playthrough: enemies patrol, boss spawns chickens, assets load, level data loads
- [ ] No console errors
- [ ] All remaining classes + data modules have `window.X` bridges in place

**Status:** ⬜ TODO  
**Branch:** `epic/04-leaf-classes`  
**PR:** —  
**Commits:** —

---

### Day 9 — E5: Entry point (1/2)

**Ticket:** Rewire inline handlers  
**Concept:** The landmine: `onload`/`onclick` break the moment `game.js` becomes a module — isolate this failure mode from the World/Level conversion  
**Task:**
- In [index.html](index.html), remove `onload="init()"` and the three `onclick="..."` attributes
- Create [js/main.js](js/main.js) that wires all four handlers via `addEventListener`
- Flip [js/game.js](js/game.js) to `type="module"` in [index.html](index.html)
- Keep all other `<script>` tags as-is; you'll delete them on Day 10

**Definition of Done:**
- [ ] HUD buttons (play/sound toggle/HUD toggle) work identically
- [ ] Game starts on page load
- [ ] No console errors
- [ ] 24 `<script>` tags still exist (one `<script type="module" src="js/main.js">`, 23 classic tags); `js/game.js` is now a module

**Status:** ⬜ TODO  
**Branch:** `epic/05-entry-point`  
**PR:** —  
**Commits:** —

---

### Day 10 — E5: Entry point (2/2)

**Ticket:** Convert `World`/`Level`, single module entry  
**Concept:** Last two globals; once these convert, everything can collapse to one script tag  
**Task:**
- Bridge-pattern convert `World`/`Level` (already 70% done from Day 8, finish the bridges)
- Replace all 25 `<script>` tags in [index.html](index.html) with one `<script type="module" src="js/main.js">`
- Delete every `window.X` bridge line from [js/main.js](js/main.js) and all class files
- `npm run build && npm run preview` — verify production build works

**Definition of Done:**
- [ ] Full playthrough from the single module entry
- [ ] Zero bridges remain in the codebase
- [ ] `npm run build` succeeds
- [ ] `npm run preview` runs the built version identically
- [ ] No console errors

**Status:** ⬜ TODO  
**Branch:** `epic/05-entry-point`  
**PR:** —  
**Commits:** —

---

### Day 11 — E6: Game loop (1/2)

**Ticket:** `GameLoop` shim  
**Concept:** Unifying the loop *before* decoupling World/Level avoids redoing all iteration code twice  
**Task:**
- Create [engine/game-loop.js](engine/game-loop.js) — a new `GameLoop` class
- `GameLoop` computes `dt` from one `requestAnimationFrame`, wrapping the existing `animate()` calls with no behavior change yet
- Add `engine/` folder to eslint/build ignore list if needed
- Add loop/dt unit tests to [engine/game-loop.test.js](engine/game-loop.test.js)

**Definition of Done:**
- [ ] Exactly one `requestAnimationFrame` in the codebase (in `GameLoop`, not scattered)
- [ ] Game behavior identical (no animation stutter, no behavior change)
- [ ] Loop/dt test suite green (`npm test`)
- [ ] Full manual playthrough passes

**Status:** ⬜ TODO  
**Branch:** `epic/06-game-loop`  
**PR:** —  
**Commits:** —

---

### Day 12 — E6: Game loop (2/2)

**Ticket:** Migrate entities onto `update(dt)`/`render(ctx)`  
**Concept:** Centralizing `FRAMES_TIME` throttling in one place instead of copy-pasted per-class guards  
**Task:**
- Migrate `Character` first, then remaining entities, onto the `GameLoop`'s `update(dt)` and `render(ctx)` calls
- Delete the old per-class `startMove()`/`startPlay()`/`startGravity()` rAF chains and per-class `FRAMES_TIME` throttle guards
- Centralize frame-time math in `GameLoop` only

**Definition of Done:**
- [ ] `FRAMES_TIME` throttle logic centralized in one place (GameLoop)
- [ ] All entities migrate to `update(dt)`/`render(ctx)` lifecycle
- [ ] Game behavior identical (no animation changes, no timing changes)
- [ ] Loop migration unit tests green
- [ ] Full manual playthrough passes

**Status:** ⬜ TODO  
**Branch:** `epic/06-game-loop`  
**PR:** —  
**Commits:** —

---

### Day 13 — E7: Decouple World/Level

**Ticket:** Generic entity registry + decouple World/Level  
**Concept:** Highest-value decoupling — removes the god-object pattern that blocks reuse; folds in stripping `instanceof` leaks  
**Task:**
- Add a generic `entities` array in `World`, populated alongside existing named fields (`enemies`, `endBoss.chickens`, etc.)
- Cut `checkCollisions()`/draw order over to iterate the generic array one field at a time
- Delete old hardcoded fields last
- Remove `instanceof Character/Bottle/Coin` checks from `DrawableObject`/`MovableObject`
- Extract collision-orchestration logic into pure, tested functions in [engine/collision.js](engine/collision.js)

**Definition of Done:**
- [ ] Identical playthrough (coins, bottles, boss fight, win/lose)
- [ ] Zero `instanceof` checks remain in base classes
- [ ] `World.checkCollisions()` now generic (iterates `entities`)
- [ ] Collision-orchestration test suite green
- [ ] Full manual playthrough passes

**Status:** ⬜ TODO  
**Branch:** `epic/07-decouple-world-level`  
**PR:** —  
**Commits:** —

---

### Day 14 — E8: Data-driven levels (1/2)

**Ticket:** Entity factory  
**Concept:** A factory must exist *before* JSON is worth adding — otherwise JSON only externalizes coordinates, not the hardcoded-type problem  
**Task:**
- Create [engine/entity-factory.js](engine/entity-factory.js) — an `EntityFactory` mapping type strings (`"coin"`, `"chicken"`, `"platform"`, etc.) to constructors
- Refactor `Level` to use the factory to spawn entities
- Add factory unit tests in [engine/entity-factory.test.js](engine/entity-factory.test.js)

**Definition of Done:**
- [ ] Factory unit-tested (each type string maps to the correct constructor)
- [ ] `Level` still builds identically via the factory
- [ ] Full manual playthrough passes
- [ ] Ready for Day 15 (JSON level format)

**Status:** ⬜ TODO  
**Branch:** `epic/08-data-driven-levels`  
**PR:** —  
**Commits:** —

---

### Day 15 — E8: Data-driven levels (2/2)

**Ticket:** `level1.json` + `LevelLoader`  
**Concept:** Closes the loop — externalizes the last hardcoded, magic-number data source  
**Task:**
- Convert [models/levels/level1.js](models/levels/level1.js) into [models/levels/level1.json](models/levels/level1.json) (entity arrays, positions, types)
- Create [engine/level-loader.js](engine/level-loader.js) — a `LevelLoader` that reads JSON and spawns entities via the Day-14 factory
- Add loader unit tests in [engine/level-loader.test.js](engine/level-loader.test.js)

**Definition of Done:**
- [ ] `level1.json` reproduces the level exactly (same entities, positions, behavior)
- [ ] Loader unit-tested
- [ ] Full manual playthrough passes (coins at exact positions, enemies patrol correctly, boss spawns)
- [ ] `npm run build && npm run preview` works
- [ ] No console errors

**Status:** ⬜ TODO  
**Branch:** `epic/08-data-driven-levels`  
**PR:** —  
**Commits:** —

---

## Stretch / Backlog (Beyond 15 days)

Not committed to the 3-week deadline — defer freely:

- [ ] AssetManager: centralized image/audio cache, shared pool, uniform mute coverage
- [ ] Folder split: move engine code into `engine/`, game code into `game/`
- [ ] Second level or toy game as proof the engine is decoupled
- [ ] JSDoc/engine API documentation
- [ ] End-to-end tests (Vitest with mock canvas or Playwright)
- [ ] Input abstraction: `Keyboard`/on-screen controls hardcode this game's DOM ids (`btnLeft`, `btnRight`, `btnJump`, `btnThrow`) — an engine-grade input class should receive DOM refs or an id/action mapping via config/injection instead, so a different game built on the engine can define its own control scheme
- [ ] `Keyboard` needs a teardown method (e.g. `destroy()`/`unbind()`) — it currently has no way to remove the listeners it attaches to `window`; harmless at today's scale but worth having once the engine creates/destroys many input instances (e.g. multiple levels, tests)
- [ ] Decide project-wide formatting width: `prettier.config.cjs` has `printWidth: 80`; if the 120-column editor ruler in `.vscode/settings.json` is the real target, bump `printWidth` to 120 too (they're currently inconsistent) — note Prettier reflows structurally and won't hard-wrap something it can't safely split (e.g. a long string/template literal)
- [ ] Touch-event tests (`keyboard.class.test.js`) only run where `TouchEvent` has a native constructor — jsdom fakes it and Chromium/WebKit implement it, but desktop Firefox does not by default, so those cases are skipped there via `test.skipIf`. Revisit if real mobile/touch-device test coverage becomes a priority (e.g. Playwright mobile-viewport emulation)
- [ ] Move from npm to pnpm — stricter, content-addressed lockfile and dependency resolution that's less prone to the kind of internally-inconsistent lock (`@emnapi/core` pinned at two different versions across the tree) that broke `npm ci` in CI on 2026-07-14; pnpm's lockfile format and strict node_modules layout catch this class of drift earlier
- [ ] Adopt a supply-chain safety scanner in the install step (e.g. Aikido Safe Chain or Socket) that vets packages for malware/typosquatting before they land in `node_modules` — currently nothing gates what a transitive dependency bump can pull in

---

## Notes

- **Each day is a real mentoring unit:** a concept to learn, a concrete task, a way to verify the game still works.
- **If a day runs long:** expand it to 2 days rather than cut corners. Better to deliver quality than rush.
- **Model switching:** Use Sonnet (or Opus for hard design calls). Haiku is not sufficient for this level of mentoring/code review.
- **Merge cadence (updated after Day 3):** merge per day-ticket, not per whole epic. A multi-day epic (e.g. E3, Days 3-6) may span several sequential branches sharing the same name, one per day, rather than accumulating all days on one branch before merging.
- **Verification approach:**
  - `npm run dev` — manual playthrough, exercise the behavior touched that day
  - `npm test` — keep test suite green (starting Day 2)
  - `npm run build && npm run preview` — spot-check at epic boundaries (Days 1, 10, 15 minimum)

