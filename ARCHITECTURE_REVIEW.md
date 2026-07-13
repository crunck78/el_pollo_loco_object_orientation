# Architecture Review: El Pollo Loco 2D Game

## First Impression

This is a well-structured, pedagogically sound 2D browser game built with solid OOP principles and clear separation of concerns at the class level. The object hierarchy (`DrawableObject → MovableObject → CollidableObject → DestroyableObject`) is clean and genuinely reusable, and the collision detection/camera system show real engine-level thinking. **However, it was built as a single, specific game, not as a platform.** The `World` and `Level` classes hardcode knowledge of concrete game types (`Character`, `Chicken`, `Coin`, `Bottle`, `EndBoss`), and level data is baked into JavaScript factory functions with magic-number coordinates. Adding a second level or a new entity type requires editing "engine-level" code, not just writing a new game class. To evolve this into a general-purpose 2D engine, significant decoupling and externalization work would be required.

---

## Architecture Overview

### Bootstrap & Game Loop

**Entry Point:** [index.html](index.html) (lines 11–37) loads every class via plain `<script>` tags in dependency order, then calls `init()` on page load ([js/game.js:9-12](js/game.js)).

**Game Loop:** There is **no single central loop.** Instead, every animatable object runs its own pair of independent `requestAnimationFrame` recursions:
- `World` drives two rAF chains: `draw()` (world.class.js:401-411) for rendering and `check()` (world.class.js:124-134) for collision/camera updates.
- Each `MovableObject` subclass spawns two-to-three rAF chains via `animate()` (movable-object.class.js:129-132): `startMove()`/`move()` (update), `startPlay()`/`play()` (sprite animation), and optionally `startGravity()`/`gravity()`.
- All chains are gated by a global `FRAMES_TIME = 16` threshold (~60fps, [js/game.js:1](js/game.js)), but each object manages its own rAF recursion independently.

**Globals:**
- `let world` ([js/game.js:7](js/game.js)) – singleton World instance, referenced directly by HTML `onclick` handlers.
- `FRAMES_TIME`, `GROUND` ([js/game.js:1-2](js/game.js))
- `CANVAS_WIDTH`, `CANVAS_HEIGHT` ([js/assets.js:1-2](js/assets.js))

### Class Hierarchy

```
DrawableObject (drawable-object.class.js)
  ├─ MovableObject (movable-object.class.js)
  │   ├─ CollidableObject (collidable-object.class.js)
  │   │   ├─ Platform (platform.class.js)
  │   │   ├─ CollectibleObject (collectible.class.js)
  │   │   │   ├─ Coin (coin.class.js)
  │   │   │   ├─ Bottle (bottle.class.js)
  │   │   │   └─ HitPoint (hitpoint.class.js)
  │   │   └─ DestroyableObject (destroyable-object.class.js)
  │   │       ├─ ThrowableObject (throwable-object.class.js)
  │   │       └─ Creature (creature-object.class.js)
  │   │           ├─ Character (character.class.js)
  │   │           │   └─ Pepe (pepe.class.js)
  │   │           └─ NPC (npc-object.class.js)
  │   │               └─ Enemy (enemy.class.js)
  │   │                   ├─ Chicken (chicken.class.js)
  │   │                   └─ EndBoss (endboss.class.js)
  │   │                       └─ BigChicken (big-chicken.class.js)
  │   └─ Cloud (cloud.class.js)
  ├─ BackgroundObject (background-object.class.js)
  └─ StatusBar (status-bar.class.js)

World (world.class.js)        – game manager (owns Level, canvas context, camera)
Level (level.class.js)        – level manager (owns collectibles, enemies, spawning)
Keyboard (keyboard.class.js)  – input state (singleton, used by Character)
```

The hierarchy is pedagogically clean, but note that `Pepe` and `BigChicken` are one-line empty subclasses — they exist only to rename `Character` and `EndBoss` for flavor, with no behavior difference. Real logic lives in the parent class, but `Level` hardcodes instantiation as `new Pepe()` and `new BigChicken()` rather than accepting an injectable character/boss class.

### Rendering & Camera

**Rendering Pipeline:** [World.addToMap()](models/world.class.js:462-478) is the sole renderer. It:
1. Checks viewport culling via `insideCanvas()` ([world.class.js:490-494](models/world.class.js)).
2. Applies camera translation with **parallax support** via `ctx.translate(this.camera_x * mo.distance, 0)`, where `distance` defaults to 1 for all objects (world.class.js:465) — this is a genuinely reusable generic concept.
3. Optionally flips the context for `mo.otherDirection`, then calls `mo.draw(ctx)`.

**Draw Order:** Hardcoded in [World.drawGameInProgress()](models/world.class.js:416-438):
```javascript
addToMap(backgroundObjects)
addToMap(clouds)
addToMap(platforms)
addToMap(coins)
addToMap(bottles)
addToMap(enemies)
addToMap(endBoss.chickens)
addToMap(endBoss.hitPointsBar)
addToMap(character)
addToMap(character.throwBottles)
addToMap(character.hitPointsBar, coinsBar, bottlesBar)
addToMap(endScreen)
```
There is no z-order/layer system or scene graph — layer order is a manually written field-name sequence baked into `drawGameInProgress()`, so adding a new entity type requires editing this method directly.

**Camera/Viewport:** [World.checkCamera()](models/world.class.js:165-192) recenters the viewport based on the character's position and level bounds (`level.level_end_x`). This is level/character-aware but could be made generic by accepting a "focus target" rather than hardcoding `this.level.character`.

### Level & World Data

**Level Data:** Hardcoded JavaScript factory functions in [models/levels/level1.js](models/levels/level1.js):
- `getLevel1()` — returns an array-based level description: arrays of `Platforms`, `Enemies` (Chickens), `Clouds`, `BackgroundObjects`, `Coins`, `Bottles`, each constructed with magic-number x/y coordinates.
- `getLevelChickens()` (level1.js:45-52) has an early `return [];` — dead code; patrol chickens are disabled, only the endBoss spawns chickens at runtime.
- Entity coordinates are literal numbers (e.g., coins at x=580, 2280, 1430; platforms at y=410, 370, etc.).

**Level Manager:** [Level](models/level.class.js:87-104) additionally hardcodes creation of:
- `new Pepe()` (character)
- `new BigChicken()` (boss)
- Three `new BackgroundObject()` instances for win/lose screens with literal image paths (`'img/7.End screens/You_Win.png'`, `'img/7.End screens/Game Over.png'`)

So level construction is split and inconsistent: array-based entities come from the factory file, but singletons (character, boss, UI) are hardcoded in the `Level` class itself.

**Single Hardcoded Level:** `World` constructor (world.class.js:70) calls `getLevel1()` by name directly — there is no level registry or selection mechanism. To add a second level, you'd add a `level2.js` file and edit `World` to support selecting it.

### Asset Loading & Management

**Asset Dictionaries:** [js/assets.js](js/assets.js) centralizes asset references:
- `CHARACTER_ASSETS.IMAGES` — animation frame arrays (`WALKING`, `JUMPING`, `FALLING`, `DEAD`, `HIT`, `THROW`) organized by action.
- `CHICKEN_ASSETS.IMAGES`, `END_BOSS.IMAGES` (same structure).
- `CHARACTER_ASSETS.AUDIOS` — `new Audio()` objects created eagerly at module-load time for jump, hit, coin, bottle sounds; same pattern for chickens/endBoss.

**Image Loading:** Each model constructor calls [DrawableObject.loadImage()/loadImages()](drawable-object.class.js:133-161) to create `new Image()` objects and set `.src`. This happens **per-instance**, not shared globally — a level with 25 `Chicken` instances will create 25 separate `Image` objects loading identical walking-sprite URLs.

**Asset Reuse:** Dead/commented code (js/assets.js:228-246) shows an abandoned `createImageCacheFromPaths()` / `loadAllAssets()` attempt to centralize loading, suggesting the original design intended a shared image cache.

**Sound Management:** No audio manager. `Audio` objects are properties of asset dictionaries; `.play()` is called ad hoc throughout game classes (character.class.js:320, 356, 383; chicken.class.js:91, 100, 146; etc.). Global mute affects only the background track (Level.muteSounds() → `LEVEL_ASSETS['AUDIOS']['BACKGROUND'].volume = 0`), not sound effects.

### Input Handling

[Keyboard](models/keyboard.class.js) is a singleton that:
- Binds physical keyboard events (`keydown`/`keyup`) to boolean flags (`LEFT`, `RIGHT`, `UP`, `DOWN`, `SPACE`, `D`) using raw `keyCode` magic numbers (37/38/39/40/32/68, lines 66-121).
- Binds HTML buttons by hardcoded DOM ids (`btnLeft`, `btnRight`, `btnJump`, `btnThrow`) to the same flags (keyboard.class.js:17-63).

**Input Routing:** `Character` polls `this.keyboard.LEFT/RIGHT/SPACE/D` inside its own `move()` loop ([character.class.js:103-125](models/character.class.js)). There is no event-driven dispatch; input is tightly coupled 1:1 to the player character. No other entity type can read input.

### Collision Detection

[CollidableObject](models/collidable-object.class.js) implements textbook AABB math (axis-aligned bounding boxes):
- `isColliding(other)` — check overlap with another collider.
- `isHorizontalIntersecting()`, `isVerticalIntersecting()` — side-specific checks.
- `isLeftSide/isRightSide/isAbove/isBelow(other)` — directional tests for physics response.
- `getHitBox{Left,Right,Top,Bottom}Pos()` — bounding-box accessors using a `offset {top, left, right, bottom}` shrink (per-instance hit-box tuning).

This is genuinely reusable and generic — **collision math itself is not a coupling smell.**

**Collision Orchestration:** Where collisions *matter* is the game, hardcoded in [World.checkCollisions()](models/world.class.js:224-237):
- Explicitly iterates `level.enemies` and `level.endBoss.chickens` against `level.character` and `level.character.throwBottles`.
- Special-cased logic: `World.hasCollect()` (367-377) uses `instanceof Coin` / `instanceof Bottle` checks with hardcoded reward amounts (`+= 5`) and method calls to `this.level.character.collectCoin()` / `.collectBottle()`.
- `Character.isStamping()` (character.class.js:454-460) explicitly excludes `EndBoss` — game-logic exceptions embedded in base gameplay.
- Platform collision (checkCollisionWithPlatforms, world.class.js:353-361) only checks the character against platforms, not enemies.

Adding a new collectible or collision type requires editing `World` and `Character` directly.

### Audio

Tightly coupled to the asset dictionary pattern (js/assets.js). No audio manager. Sound playback is scattered across entity classes and always direct `.play()` calls. The global mute toggle only silences the background track, not effects — a UX inconsistency.

### Build Tooling & Project Structure

- **No bundler:** Plain `<script>` tags in `index.html` in strict load-order dependency (11–37). Every class is a global, no ES modules.
- **Lint/format:** ESLint 9 (flat config), Prettier, JSDoc/better-docs for generated HTML docs (already checked into `docs/`).
- **Package.json:** `package.json` lists only devDeps (ESLint, Prettier, better-docs, `@eslint/*`); `taffydb` as a dependency (a transitive JSDoc requirement, not used by game code).
- **Folder layout:**
  - `js/` — bootstrap (`game.js`, `assets.js`)
  - `models/` — all ~20 game classes, flattened (no subfolder separation of base/engine/game/ui)
  - `models/levels/` — level factories
  - `img/`, `audio/` — assets
  - `docs/` — generated JSDoc HTML
- **Deploy:** `.github/workflows/deploy.yml` — FTP sync of the repo (excluding README/package/dot-files) to a static host. No build step, no minification, no tree-shaking.
- **Tests:** None. `package.json`'s `"test"` script is the npm default stub.

---

## Pros: What's Already Engine-Like

1. **Clean OOP hierarchy** — `DrawableObject → MovableObject → CollidableObject → DestroyableObject` is pedagogically sound and genuinely reusable. Each base class adds a single responsibility (drawable, animatable, collidable, destructible).

2. **Generic AABB collision math** — `CollidableObject` implements offset-based bounding boxes with directional tests (`isLeftSide`, `isAbove`, etc.). This is decoupled from any specific game logic and could support any number of games or entity types.

3. **Camera & parallax concept** — The `distance` parameter on every drawable object enables parallax scrolling via `ctx.translate(camera_x * distance, 0)`. This is a real, reusable engine feature.

4. **Consistent animate/move/play pattern** — Every movable entity follows the same lifecycle: `animate()` → `move()`/`play()`/`gravity()` with frame-time gating. Subclasses only override the behavior, not the pattern.

5. **Keyboard abstraction** — Input is factored into its own class, separate from game logic. Binds both keyboard and touch buttons.

6. **Viewport culling** — `insideCanvas()` prevents off-screen objects from rendering, a basic but important optimization.

---

## Cons: What Blocks It from Being a General Engine

### 1. **No Central Game Loop**
- N objects × 2-3 independent rAF chains instead of one `update() → render()` tick.
- Each object manages its own timestamp gating against the global `FRAMES_TIME`, leading to copy-pasted throttle logic in every `move()`/`play()` method ([character.class.js:87-97](models/character.class.js), [chicken.class.js:116-126](models/chicken.class.js), [throwable-object.class.js:127-137](models/throwable-object.class.js)).
- Update and render are not cleanly separated; they're just different recursive chains.
- **Impact:** Hard to reason about per-frame state, hard to add debug visualization or fixed-timestep determinism, hard to pause/resume cleanly.

### 2. **World & Level Are God Objects**
- `World` hardcodes references to concrete game types: `level.enemies`, `level.endBoss.chickens`, `level.character.throwBottles`, `level.character.coins`, etc. ([world.class.js:416-438](models/world.class.js)).
- `World.checkCollisions()` ([224-237](models/world.class.js)) explicitly checks `level.enemies` and `level.endBoss.chickens` — no generic entity registry or layer system.
- `World.hasCollect()` ([367-377](models/world.class.js)) uses `instanceof Coin` / `instanceof Bottle` checks with hardcoded methods like `collectCoin()` and reward amounts.
- **Impact:** Adding a new entity type (e.g., a new collectible, a new enemy) requires editing `World` and `Level` directly. These classes are tightly coupled to El Pollo Loco's specific game design, not generic.

### 3. **Level Data is Hardcoded, Not Data-Driven**
- [level1.js](models/levels/level1.js) is a factory file with magic-number coordinates baked into function calls (`new Platform(100, 410, ...)`, `new Coin(580, 200, ...)`).
- Only one level exists. Adding a second level would require duplicating `level1.js`, creating `level2.js`, then editing `World` to support selecting it.
- Entity list (`coins`, `enemies`, `platforms`, etc.) is a manual array — no dynamic spawning, no tiling, no procedural layout.
- **Impact:** Level design is locked into code; level reuse or authoring tools are not possible without significant refactoring.

### 4. **No Asset Manager**
- Images are reloaded **per-instance** ([DrawableObject.loadImages()](drawable-object.class.js:133-161)). A level with 25 chickens creates 25 separate `Image` objects for the same sprite paths.
- `js/assets.js` maintains a static dictionary, but loading still happens in constructors — partial centralization.
- Sound is not cached at all; `Audio` objects are properties of the asset dictionary, played ad hoc, no pooling or lifecycle management.
- Mute toggle only covers background music, not effects — audio is not treated uniformly.
- **Impact:** Memory waste, no preloading, no asset validation, no fallback handling.

### 5. **Global Mutable State & No Module System**
- `let world` ([js/game.js:7](js/game.js)) is a file-scope variable referenced directly by inline HTML `onclick` handlers.
- Canvas size, frame time, and ground level are implicit globals (js/game.js, js/assets.js).
- No ES modules or namespace isolation — all classes are dumped into the global scope.
- **Impact:** Hard to test, hard to run multiple game instances, hard to refactor without breaking inline HTML event handlers.

### 6. **Base Classes Leak Game-Specific Knowledge**
- [DrawableObject.drawFramesAndCoordinates()](drawable-object.class.js:81-91) (a debug helper) checks `instanceof Character`, `instanceof Bottle`, `instanceof Coin` — the most generic class in the hierarchy hardcodes references to concrete leaf types.
- [MovableObject](models/movable-object.class.js:206) contains a debug log gated by `if (this instanceof ThrowableObject) console.log(...)` — leftover debug coupling.
- **Impact:** The "engine" layer is aware of specific game types, defeating the purpose of abstraction.

### 7. **No Tests, Dead Code, & Incomplete Refactors**
- `getLevelChickens()` ([level1.js:46](models/levels/level1.js)) has an early `return [];` disabling patrol-chicken spawning.
- `js/assets.js:228-246` — commented-out centralized asset loader, suggesting an abandoned refactor.
- `models/enemy.class.js:215-224` — commented-out kill-method override.
- No test suite, no CI test step, no test-driven development discipline.
- **Impact:** No safety net for refactoring; dead code accumulates; intent is unclear.

---

## What It Would Take to Become a Real Engine

Turning this into a general-purpose 2D engine would require:

1. **Extract a true engine layer:**
   - Move `DrawableObject`, `MovableObject`, `CollidableObject`, `DestroyableObject` to an `engine/` folder.
   - Remove all `instanceof` checks and game-type references from these base classes.
   - Replace hardcoded draw order in `World.drawGameInProgress()` with a z-order/layer system or a generic entity registry.

2. **Centralize and externalize asset data:**
   - Build a real `AssetManager` class that loads, caches, and pools images/audio.
   - Externalize asset manifests to JSON (paths, animations, audio clips).
   - Preload assets at startup, validate loading, report errors.

3. **Data-driven level format:**
   - Replace JS factory functions with a JSON/YAML level format (tile grids, entity spawn lists, camera bounds).
   - Build a `LevelLoader` that reads JSON and instantiates entities via a factory pattern.
   - Support multiple levels selected by name or index.

4. **Entity/component architecture:**
   - Replace hardcoded `instanceof` checks with a component-based or factory-based entity spawner.
   - Make `World.checkCollisions()` generic — iterate a scene graph or entity registry, not hardcoded field names.
   - Make collision response data-driven (tags, groups, callbacks) rather than hardcoded methods.

5. **Single, clean game loop:**
   - Replace N independent rAF chains with one `update(dt)` + `render()` tick per frame.
   - Use a single timestamp per frame, shared by all entities.
   - Optional: support fixed-timestep updates for determinism.

6. **Dependency injection & configuration:**
   - Replace global `world` with an injected `Game` instance.
   - Make canvas id, frame time, and entity classes injectable.
   - Support multiple game instances (for testing or embedded games).

7. **Module system & build:**
   - Migrate to ES modules or a bundler (webpack, Vite, esbuild).
   - Organize code into `engine/`, `game/`, `scenes/`, `entities/` folders.
   - Add a build step with minification and tree-shaking for production.

8. **Test suite:**
   - Add unit tests for collision detection, camera, input.
   - Add integration tests for level loading and entity spawning.
   - Run tests in CI.

---

## Verdict

**Yes, this codebase has genuine potential to become a 2D game engine**, but not in its current form.

The **kernel of a real engine is here**: the `DrawableObject → MovableObject → CollidableObject` hierarchy is clean and reusable, AABB collision detection is generic and correct, the camera/parallax system is a solid building block, and the overall OOP discipline is sound. An experienced developer could extract these parts and build something useful.

**However, the "application layer" (World, Level, GameState, collision orchestration, asset loading) is tightly coupled to El Pollo Loco's specific game design.** The god objects (`World`, `Level`), hardcoded entity types, magic-number level data, and global mutable state would need to be significantly refactored before the engine could support a second game or even a second level without editing "engine-level" code.

**For a learning project, this is excellent.** The code is readable, the class design is pedagogically clean, and it demonstrates real OOP and game-development patterns. But to productize it as a reusable engine would require 1–2 weeks of decoupling work by a developer familiar with game architecture, plus the addition of tests and documentation.

If the goal is to build a second game with this engine, you'd currently be faster writing a new codebase from scratch or making substantial architectural changes (extract the collision/camera/animate machinery, externalize level data, add a component system, remove hardcoded game-type references). If the goal is to learn game development, this structure is already an excellent foundation.
