# OpenCastells

Una eina de code obert per planificar **pinyes i troncs** dels vostres **castells**.

Selecciona una formacio, improta el teus castellers desde un CSV, o afegeixlos un a un. Arrossega els castellers a la seva posicio, i a fer pinya!

Un cop esitguis, export un arxiu PNG, o un link.

## Tech stack

- [Vue 3](https://vuejs.org/) — Composition API with `<script setup>`
- [Vite](https://vitejs.dev/) — dev server and build tool
- [fflate](https://github.com/101arrowz/fflate) — compression for URL state encoding
- [@vueuse/core](https://vueuse.org/) — Vue utilities
- [GitHub Pages](https://pages.github.com/) — static hosting
- [GitHub Actions](https://github.com/features/actions) — automated deployment on push to `main`

## Local development

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

Click "Compartir" to encode the current state and copy the URL to the clipboard.

---

*Inspirat en [B-Pinya](https://bpinya.cat/), respecte i credits a [Calero](https://calero.dev/) per la inspiració.*
