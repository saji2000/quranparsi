# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Quran Parsi (quranparsi.com) — a static React + Vite single-page app (installable as a PWA) that shows the Quran's Arabic text alongside a Persian translation, with footnotes. UI text is Persian and RTL. There is no backend and no test suite.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — ESLint with `--max-warnings 0` (any warning fails)
- `npm run sync` — legacy deploy: `aws s3 sync ./dist s3://quranparsi.com/`

## Deployment

The site is now hosted on a Hetzner server: nginx serves `dist/` straight from this checkout (`root /home/sajad/submission/quranparsi/dist` in `quranparsi.nginx.conf`), so running `npm run build` in this repo updates the live site. The nginx config redirects HTTP to HTTPS using Cloudflare origin certificates, falls back to `index.html` for SPA routing, and caches static assets for 1 year as immutable. The S3 `sync` script is from the earlier hosting setup.

## Architecture

- **Data is bundled, not fetched.** `src/data/translation.json` is one flat array of every verse (`sura_num`, `verse_num`, `arabic_text`, `persian_text`, `subtitle`, `footnote`). `verse_num` 0 is the unnumbered opening Basmala, which appears in 112 chapters and is rendered in the chapter header. Subtitles and footnotes are English, so they're rendered `dir="ltr"`. `src/data/titles.json` holds the 114 chapter titles. `src/data/quran.js` groups verses by chapter and computes verse counts, and the components read from there. Translation fixes are edits to the JSON files.
- **Navigation state.** `QuranContext` holds `chapter`, `verse` and a `jumpId` counter, and exposes `goTo(chapter, verse)`, which also saves both values to `localStorage` so the reader's place survives a reload. Navigation happens in `ChapterPicker` (a drawer: bottom sheet on mobile, side panel on desktop) and in the previous/next buttons in `Screen`. Number inputs accept Persian digits through `persian-tools`.
- **Scrolling to a verse uses DOM ids.** Each `Verse` renders `id="verse-<n>"` with `scrollMarginTop` to clear the sticky header. `Screen` scrolls to it whenever `chapter`, `verse` or `jumpId` changes.
- **Layout is RTL.** `index.html` sets `dir="rtl"`. MUI has no RTL emotion plugin, so use logical properties (`marginInlineStart`, etc.) and avoid floating `TextField` labels.
- **Theming.** `src/theme.js` exports `getTheme(mode)`. Light mode uses cream `#f9f7f0` with tan `#d0c7b6` and a blue accent; dark mode uses `#191919` with `#444444` and a green accent. The custom `verseBadge` palette key is used through `sx`. `App.jsx` stores the user's choice in `localStorage.theme` (`"dark"`/`"light"`) and otherwise follows `prefers-color-scheme`.
- **Fonts.** Vazirmatn is used for the Persian UI and Amiri for Arabic text (`amiri-regular` class). Both load from Google Fonts in `index.html`.
- **PWA.** `vite-plugin-pwa` is configured in `vite.config.js`. The main bundle (about 3.7 MB, mostly translation JSON) is over Workbox's precache size limit, so it isn't precached.
