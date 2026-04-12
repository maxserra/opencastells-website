# OpenCastells

Eina de codi obert per planificar **pinyes i troncs** dels vostres **castells**.

Selecciona una formació, importa els teus castellers des d'un CSV, o afegeix-los un a un. Arrossega els castellers a la seva posició, i a fer pinya!

Un cop estiguis, exporta un arxiu PNG, o un enllaç.

## Format CSV

Per importar castellers, prepara un arxiu de text (`.csv` o `.txt`) amb **un nom per línia**, codificat en **UTF-8**. Els espais al principi i al final de cada línia s'ignoren.

**Exemple:**
```
Joan Ferrer
María García
Pere López
```

## Tech stack

- [Vue 3](https://vuejs.org/) — Composition API amb `<script setup>`
- [Vite](https://vitejs.dev/) — servidor de desenvolupament i eina de construcció
- [fflate](https://github.com/101arrowz/fflate) — compressió per a l'encodificació d'estat a URL
- [@vueuse/core](https://vueuse.org/) — utilitats Vue
- [GitHub Pages](https://pages.github.com/) — allotjament estàtic
- [GitHub Actions](https://github.com/features/actions) — desplegament automatitzat en push a `main`

## Desenvolupament local

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build      # output in dist/
npm run preview    # preview the production build locally
```

## Deployment

Fent push a `main` es dispara el workflow de GitHub Actions (`.github/workflows/deploy.yml`), que compila i publica a GitHub Pages automàticament.

## URLs compartibles

L'estat actual de la formació (tipus de formació, títol, assignacions de castellers) es codifica al hash de l'URL mitjançant el pipeline:

```
JSON → deflate (fflate) → base64url → #hash
```

Feu clic a "Compartir" per codificar l'estat actual i copiar l'URL al porta-retalls.

---

*Inspirat en [B-Pinya](https://bpinya.cat/), amb respecte i crèdits a [Calero](https://calero.dev/) per la inspiració.*
