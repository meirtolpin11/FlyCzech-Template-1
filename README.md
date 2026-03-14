# FlyCzech — Refactoring & Improvement Plan

Marketing website for FlyCzech aviation company (https://flyczech.eu).
Tech stack: HTML5, CSS3, Vanilla JS + jQuery, Bootstrap 5, Swiper.js.

---

## Bug Fixes (do immediately, zero risk)

### 1. HTML typo — broken closing tag
**File:** `index.html:255`
`>/span>` → `</span>` in the ICAO English pricing section.

### 2. Preload attribute typo
**File:** `index.html:55`
`as="imag"` → `as="image"` — browser ignores the preload hint as-is.

### 3. Double slash in script path
**File:** `index.html:757`
`assets/js//lottie-player.js` → `assets/js/lottie-player.js`

### 4. Language loading ignores user preference
**File:** `translate.js:281`
`userLang` is detected but then `loadTranslations('cs')` is always called.
Fix: `loadTranslations(userLang)`.

### 5. Remove all `console.log` statements
Found in: `fleet.js` (7), `services.js` (2), `scroll.js` (1), `translate.js` (1).
Includes a typo: `"Removing backgroiup - resetTimeout"`.
Wrap in `if (window.DEBUG)` or remove entirely.

---

## Priority 1 — State & Memory (fleet.js)

`fleet.js` is the most complex file and the source of most bugs. It manages 4 boolean/object flags, 4 separate timeout variables, a setInterval, and image `onload` chains — all in one flat module.

**Issues:**
- `resetTimeout`, `resetBackgroundTimeout`, `mouseEnterTimeout` are all tracking similar concepts with different clearing logic. Easy to miss one.
- `setInterval` for image rotation (line 153) is never cleared when the user leaves the view.
- Image `onload` handler is set after `src` — race condition if image is cached.
- State transitions between `isDefaultView` / `isPermanentView` / `clickedHeaderData` are implicit and hard to reason about.

**Plan:**
1. Replace the 3 ad-hoc timeout variables with a single `timers` object (`timers.reset`, `timers.bg`, `timers.hover`) and a `clearAllTimers()` helper.
2. Replace the `setInterval` with a `IntersectionObserver`-based approach: start the interval only when the fleet section is visible, stop when it leaves.
3. Model the fleet state explicitly as an enum: `DEFAULT | HOVER | CLICKED` and write a `setState(newState, data)` function that handles transitions.
4. Fix image preload: set `onload` before setting `src`.

---

## Priority 2 — Centralise Configuration

Contact info and aircraft data are hardcoded and repeated throughout the HTML.

**Issues:**
- Phone number `+420773626601` appears 20+ times.
- Email `info@flyczech.eu` repeated multiple times.
- Aircraft data (registration, model, description) stored as `data-*` attributes scattered in the HTML.

**Plan:**
1. Create `assets/js/config.js` with a single exported config object:
   ```js
   const CONFIG = {
     phone: '+420773626601',
     whatsapp: '420773626601',
     email: 'info@flyczech.eu',
     mapsSrc: '...',
   };
   ```
2. Create `assets/json/fleet.json` with the aircraft data array. Load it once in `fleet.js` and render the HTML programmatically (or use it to validate data attributes).
3. Similarly, `translations/en.json` (currently not valid JSON and not loaded from disk) should become actual JSON consumed by `translate.js` via `fetch`.

---

## Priority 3 — Translation System

**Issues:**
- 286-line JS object hardcoded inside `translate.js`. Adding a new language means editing JS.
- `translations/en.json` exists on disk but is not used; the real data is a comment block in the JS.
- Czech is the only language; the English translation object is incomplete/missing some keys.
- Duplicate key `team-description` in the translation file.

**Plan:**
1. Convert both language files to proper JSON (e.g. `translations/en.json`, `translations/cs.json`).
2. `translate.js` fetches the appropriate file based on detected language, with a fallback to Czech.
3. Add a `getMissingKeys(lang)` debug utility to detect mismatches between language files.

---

## Priority 4 — CSS Cleanup

Total CSS is ~12,500 lines across 10+ files.

**Issues:**
- `icofont.css` is 3,646 lines but the icons it covers largely overlap with Font Awesome (also included). One should be removed.
- `style.css` (3,176 lines) and `style.min.css` (3,053 lines) are maintained separately — they will drift. The minified version should be build output, not source.
- No build pipeline (no `package.json`, no bundler). Minification is manual.

**Plan:**
1. Audit which icon set is actually used (`icofont` vs `font-awesome`). Remove the unused one.
2. Introduce a minimal build step (even just an npm script with `cleancss` + `terser`) so minified files are generated, not maintained by hand.
3. Merge `contact-us.css` (34 lines) into `style.css` — too small to justify a separate file.
4. Organise remaining CSS files to match sections: `navbar`, `fleet`, `services`, `team`, `swiper`, `buttons`.

---

## Priority 5 — Performance

**Issues:**
- No lazy loading — all images load on page load.
- Background videos autoplay unconditionally (ignores `prefers-reduced-motion`).
- Image rotation in fleet runs every 5 seconds regardless of visibility.
- No cache-busting strategy for assets (only `scripts.js?ver=1.0`).

**Plan:**
1. Add `loading="lazy"` to all `<img>` elements that are not above the fold.
2. Check `window.matchMedia('(prefers-reduced-motion: reduce)')` before starting video autoplay and fleet image rotation.
3. Use `IntersectionObserver` to pause/resume the fleet rotation (ties into Priority 1).
4. Add a consistent `?v=X` query string to all local JS/CSS files, or use a build hash.

---

## Priority 6 — Accessibility

**Issues:**
- Language toggle buttons have no accessible labels.
- Background images (used for aircraft photos, team photos) cannot carry `alt` text.
- No skip-to-content link.
- Swiper relies entirely on JS with no graceful degradation.

**Plan:**
1. Add `aria-label="Switch to Czech / English"` to language toggle buttons.
2. Where background images are meaningful (team, fleet), add a visually-hidden `<span>` with descriptive text, or switch to `<img>` with `alt`.
3. Add a `<a href="#main-content" class="skip-link">Skip to content</a>` as the first element in `<body>`.

---

## Folder Structure

### Current structure (problematic)

```
/
├── index.html
├── assets/
│   ├── js/          # flat — all scripts mixed together
│   ├── css/         # flat — all styles mixed together
│   ├── images/      # partially organised (fleet/, team/, bg/)
│   └── json/        # mostly empty
└── translations/    # not real JSON, not used at runtime
```

Problems:
- All JS files sit in one flat `assets/js/` folder with no distinction between app code, vendor libraries, and data.
- Same for CSS: component styles, vendor overrides, and the icon font live side-by-side.
- `translations/` is at the root but `assets/json/` also exists — unclear where data files belong.
- No separation between source files and build output (minified CSS lives alongside source CSS).

### Proposed structure

```
/
├── index.html
├── src/                        # all hand-written source files
│   ├── js/
│   │   ├── config.js           # contact info, map embed, etc.
│   │   ├── translate.js        # i18n loader
│   │   ├── scroll.js
│   │   ├── fleet.js
│   │   ├── services.js
│   │   ├── our-team.js
│   │   ├── scripts.js          # Swiper init
│   │   └── video.js
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css       # or keep Bootstrap for this
│   │   │   └── typography.css
│   │   ├── components/
│   │   │   ├── navbar.css
│   │   │   ├── buttons.css
│   │   │   ├── fleet.css
│   │   │   ├── services.css
│   │   │   ├── our-team.css
│   │   │   └── swiper.css
│   │   └── style.css           # main file that imports/organises the rest
│   └── data/
│       ├── fleet.json          # aircraft data
│       ├── cs.json             # Czech translations
│       └── en.json             # English translations
├── vendor/                     # third-party libraries, never edited by hand
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── bootstrap.bundle.min.js
│   │   ├── swiper.min.js
│   │   └── lottie-player.js
│   └── css/
│       ├── bootstrap.min.css
│       ├── swiper.min.css
│       └── fontawesome.min.css
├── assets/
│   └── images/
│       ├── fleet/              # aircraft photos (already exists)
│       ├── team/               # team photos (already exists)
│       ├── bg/                 # backgrounds & videos (already exists)
│       ├── clients/            # client logos (already exists)
│       ├── icons/              # UI icons
│       └── favicon/
└── dist/                       # build output (gitignored or deployed only)
    ├── style.min.css
    └── bundle.min.js
```

### Key principles

- **`src/` vs `vendor/`** — never edit vendor files. Makes upgrades and audits obvious.
- **`src/data/`** — all JSON data in one place. Translations and fleet data live here, not scattered between `translations/` and `assets/json/`.
- **`src/css/components/`** — one file per page section, mirroring the JS module structure.
- **`dist/`** is generated by the build step (see Priority 4). It is not committed to git and not manually maintained. `index.html` in development points to `src/`, in production to `dist/`.
- **`assets/images/`** stays where it is — the existing subdirectory organisation is already reasonable.

### Migration path

This is a rename/move operation, not a rewrite. Steps:
1. Create `vendor/js` and `vendor/css`, move all third-party files there. Update `index.html` paths.
2. Create `src/js`, `src/css`, `src/data`. Move hand-written files. Update `index.html` paths.
3. Move `translations/en.json` → `src/data/en.json` (after converting to real JSON per Priority 3).
4. Delete the now-empty `translations/` and `assets/json/` directories.
5. Add `dist/` to `.gitignore`.

---

## Naming & Consistency

- `cesna` vs `cessna` — the typo appears in translation keys; pick one and be consistent.
- JS files use a mix of camelCase variables and kebab-case CSS class strings. Document the convention.
- Commit message typo recurring: "Fix z-index of the headres" — worth noting for future commit hygiene.

---

## What NOT to change

- The overall visual design and section structure — it works well.
- Bootstrap and jQuery — replacing them would be a large rewrite with no direct user benefit.
- Swiper.js — well-suited to the carousels in use.
- The multi-file CSS structure (after cleanup) — separation by section is a reasonable pattern for a vanilla project.

---

## Suggested order of work

| Step | Scope | Risk |
|------|-------|------|
| 1 | Fix the 5 bugs listed at the top | Zero |
| 2 | Remove console.log statements | Zero |
| 3 | Restructure folders (src/, vendor/, assets/) | Low |
| 4 | Refactor fleet.js state + timers | Low |
| 5 | Extract config.js into src/js/ | Low |
| 6 | Convert translations to proper JSON in src/data/ | Medium |
| 7 | Add IntersectionObserver for fleet rotation | Low |
| 8 | CSS audit + remove duplicate icon font | Medium |
| 9 | Add loading="lazy" to images | Zero |
| 10 | Add prefers-reduced-motion checks | Low |
| 11 | Accessibility pass | Low |
| 12 | Introduce build step → dist/ output (optional) | Medium |
