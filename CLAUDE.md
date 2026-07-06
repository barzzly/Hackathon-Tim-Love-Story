# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run oxlint

There is no test suite. Lint config lives in `.oxlintrc.json` (oxlint with `react` + `oxc` plugins; `react/rules-of-hooks` is an error).

The Vite cache dir is overridable via the `VITE_CACHE_DIR` env var (defaults to `.vite-cache`).

## Architecture

Single-page marketing site for **SASIRA**, a streetwear brand built on Kalimantan *sasirangan* batik. Content is in Indonesian. Two-section scroll experience: a full-viewport hero poster (`#home`) followed by an about section (`#about`).

The entire app is one component — [src/App.jsx](src/App.jsx) — rendered by [src/main.jsx](src/main.jsx). All styling is a single global stylesheet, [src/index.css](src/index.css) (~1400 lines). There is no router, no component library, and no state management; page data (keywords, feature cards, gallery images, marquee tape items) lives in module-level constants at the top of `App.jsx`.

### The interaction layer is the non-obvious part

`App.jsx` holds three `useEffect` hooks driving imperative, `requestAnimationFrame`-based animation. They are the reason the file is more than static JSX:

1. **Pointer parallax** — writes eased `--mx`/`--my` CSS custom properties on the `.poster-shell` element (via `shellRef`); CSS consumes them for depth. Desktop pointer only.
2. **Scroll choreography** — on desktop (`min-width: 901px`), directly mutates `transform`/`opacity` inline styles on `.poster-copy` and `.right-panel` as the user scrolls, using an eased scroll progress (`fit` then `dock` phases). Cleans up by removing inline styles.
3. **Reveal-on-scroll** — an `IntersectionObserver` adds `.is-visible` to `.reveal-on-scroll` elements once, then unobserves.

All three bail early when `prefers-reduced-motion: reduce` matches (and the first two also gate on pointer/viewport media queries). When editing motion, keep this reduced-motion + media-query gating intact, and remember hooks 1–2 select DOM by class name / ref and mutate styles directly — CSS class names in `index.css` and the JS selectors are coupled.

Images are imported as ES modules from `src/assets/` so Vite fingerprints them; `public/` holds only the favicon and logo referenced from [index.html](index.html). Fonts (Oswald, Outfit, JetBrains Mono, Permanent Marker) load via Google Fonts `<link>` in `index.html`.
