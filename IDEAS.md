# OpenCastells — Ideas & Future Features

This file tracks improvement ideas and features to implement after the MVP.
Pick items up here when ready; roughly ordered by priority.

---

## Formation Data

- [ ] **Accurate formation geometry** — current positions are placeholder circles in a grid. Replace with geometrically correct pinya layouts matching real casteller formations (position roles, spacing, staggering).
- [ ] **Position role labels** — label each position with its actual role name (baix, segon, terç, quart, contrafort, agulla, enxaneta, etc.).
- [ ] **More formation types** — add 5d7, 2d8, 3d8, 4d8, torre de 7, and others.
- [ ] **Custom formation editor** — let users define their own formation by placing positions on a canvas.

---

## Interaction

- [ ] **Undo/redo stack** — Ctrl+Z / Ctrl+Y to revert drag mistakes.
- [ ] **Touch / mobile drag** — HTML5 drag-and-drop has no native touch support. Implement pointer events or use a library (SortableJS, @vueuse/gesture) for mobile.
- [ ] **Keyboard navigation** — tab through positions, press Enter/Space to assign the selected roster item.
- [ ] **Drag from position back to roster** — currently unassign is double-click only; also support dragging out.
- [ ] **Swap positions** — drag one assigned casteller onto another to swap them.

---

## Roster Management

- [ ] **Manual name entry** — add a name inline without needing a CSV file.
- [ ] **Delete individual castellers** from the list.
- [ ] **CSV export of current assignment** — export who is in which position as CSV.
- [ ] **Duplicate detection** — warn if a CSV contains duplicate names.

---

## Persistence & Sharing

- [ ] **localStorage autosave** — persist the last state automatically so a browser refresh doesn't wipe work.
- [ ] **Named sessions** — save and reload multiple named formations (localStorage or IndexedDB).
- [ ] **Share button QR code** — generate a QR code from the shareable URL for in-person sharing.

---

## Export

- [ ] **PNG export** — screenshot the SVG formation as a PNG (use `foreignObject` + canvas, or a library like `html-to-image`).
- [ ] **SVG export** — download the formation as a raw SVG file.
- [ ] **PDF export** — single-page PDF with formation + roster legend.

---

## Appearance

- [ ] **Color customization** — let users pick colors for empty positions, filled positions, background, and text (matching bpinya.cat's existing feature).
- [ ] **Dark / light theme toggle**.
- [ ] **Zoom and pan** on the formation canvas (pinch-to-zoom on mobile, scroll+drag on desktop).

---

## Accessibility

- [ ] **ARIA roles on SVG positions** — `role="button"`, `aria-label` with position name and assigned casteller.
- [ ] **Screen reader announcements** on assignment changes.
- [ ] **High-contrast mode**.

---

## Internationalisation

- [ ] **Language switcher** — Catalan (default), Spanish, English.
- [ ] All UI strings extracted into a simple i18n map.

---

## Infrastructure

- [ ] **Tailwind CSS** — evaluate after MVP stabilises; may not be needed if plain CSS stays manageable.
- [ ] **TypeScript migration** — add JSDoc types first, migrate to `.ts` files when the codebase grows.
- [ ] **Unit tests** — composable logic (`useFormation`, `useShareableUrl`) is pure enough to test without a browser.
- [ ] **E2E tests** — Playwright smoke tests for the drag-and-drop flow and share URL round-trip.
