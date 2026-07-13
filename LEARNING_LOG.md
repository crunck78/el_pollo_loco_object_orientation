# Learning Log: El Pollo Loco → 2D Game Engine Refactor

**Purpose:** Capture what you learn, mistakes, wins, and questions as you refactor this project. **This is your engineering journal** — review it every few days and revisit open questions when they become relevant.

---

## Day 1 — Vite Scaffolding

**Date:** 2026-07-10  
**Status:** ⬜ TODO

### Key Concepts Learned
- [ ] How Vite differs from plain `<script>` bundling
- [ ] Why setting `sourceType: "module"` in ESLint prevents errors later
- [ ] How the deploy pipeline changes when you introduce a build step

### Mistakes / Could Do Better
(None yet — this is Day 1!)

### What Went Well
(To be filled in)

### Open Questions
- How does Vite's dev server differ from a simple `python -m http.server`?
- When would you NOT use Vite for a JS project?

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
