# OpenCastells

An open-source tool for planning **pinyes and troncs** for your **castells** (human towers).

Select a formation, import your castellers from a CSV, or add them one by one. Drag castellers to their position, and go build!

Once you're done, export a PNG file or share a link.

## CSV Format

To import castellers, prepare a text file (`.csv` or `.txt`) with **one name per line**, encoded in **UTF-8**. Whitespace at the beginning and end of each line is ignored.

**Example:**
```
Joan Ferrer
María García
Pere López
```

## Tech Stack

- [Vue 3](https://vuejs.org/) — Composition API with `<script setup>`
- [Vite](https://vitejs.dev/) — dev server and build tool
- [fflate](https://github.com/101arrowz/fflate) — compression for URL state encoding
- [@vueuse/core](https://vueuse.org/) — Vue utilities
- [GitHub Pages](https://pages.github.com/) — static hosting
- [GitHub Actions](https://github.com/features/actions) — automated deployment on push to `main`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # output in dist/
npm run preview    # preview the production build locally
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds and deploys to GitHub Pages automatically.

## Shareable URLs

The current formation state (formation type, title, casteller assignments) is encoded in the URL hash using the pipeline:

```
JSON → deflate (fflate) → base64url → #hash
```

Click "Share" to encode the current state and copy the URL to the clipboard.

---

*Inspired by [B-Pinya](https://bpinya.cat/), with respect and credits to [Calero](https://calero.dev/) for the inspiration.*
