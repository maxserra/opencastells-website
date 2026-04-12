/**
 * Tronc formation generator.
 *
 * A formation is fully defined by two numbers:
 *   baixosCount  — how many people on the bottom floor (1–4)
 *   floorCount   — total floors, including the fixed top slots:
 *                  doses (2 people) + acotxadora + enxaneta   for baixosCount ≥ 2  → 3 top slots
 *                  acotxadora + enxaneta                       for baixosCount = 1  → 2 top slots
 *
 * Example (baixosCount = 2, floorCount = 7):
 *   Floor 1  Baix 1, Baix 2
 *   Floor 2  Segon 1, Segon 2
 *   Floor 3  Terç 1, Terç 2
 *   Floor 4  Quart 1, Quart 2
 *   Floor 5  Dossèr 1 & 2        ← always 2 people, fixed
 *   Floor 6  Acotxadora           ← always 1 person
 *   Floor 7  Enxaneta             ← always 1 person
 *
 * Coordinate space: 1000-unit grid.
 * The SVG viewBox is computed automatically from the bounding box of positions.
 */

import { pinyaGeometries } from './pinyaGeometries.js'

// ─── Tronc constants ──────────────────────────────────────────────────────────

const RT  = 40   // circle radius (1000-unit space)
const CXT = 500  // horizontal centre
const BY  = 900  // y of floor 1 (baixos)
const FH  = 120  // vertical distance between floors

const FLOOR_NAMES    = ['Baix', 'Segon', 'Terç', 'Quart', 'Cinquè', 'Sisè', 'Setè', 'Vuitè']
const FLOOR_PREFIXES = ['b',    's',     't',    'q',     'c',      'x',   'se',  'vu',   'no']

/** Number of fixed top slots for a given baixosCount. */
const topSlots = (baixosCount) => baixosCount >= 2 ? 3 : 2

function floorPositions(baixosCount, floorNum) {
  const name   = FLOOR_NAMES[floorNum - 1]    ?? `Pis ${floorNum}`
  const prefix = FLOOR_PREFIXES[floorNum - 1] ?? `f${floorNum}_`
  const y      = BY - (floorNum - 1) * FH
  const spacing = RT * 3  // rect width = r*2.8 ≈ 112; spacing=120 gives ~8px gap
  return Array.from({ length: baixosCount }, (_, i) => ({
    id:    `${prefix}${i + 1}`,
    x:     Math.round(CXT + (i - (baixosCount - 1) / 2) * spacing),
    y,
    r:     RT,
    label: `${name} ${i + 1}`,
    shape: 'rect',
  }))
}

/** Doses: always 2 people, centred, one step above the last regular floor. */
function dosesPositions(regularFloors) {
  const y = BY - regularFloors * FH
  return [
    { id: 'd1', x: CXT - RT * 1.5, y, r: RT, label: 'Dossa 1', shape: 'rect' },
    { id: 'd2', x: CXT + RT * 1.5, y, r: RT, label: 'Dossa 2', shape: 'rect' },
  ]
}

function acotxadoraPosition(stepsAboveBase) {
  return { id: 'acot', x: CXT, y: BY - stepsAboveBase * FH, r: RT, label: 'Acotxadora', shape: 'rect' }
}

function enxanetaPosition(stepsAboveBase) {
  return { id: 'enxa', x: CXT, y: BY - stepsAboveBase * FH, r: Math.round(RT * 0.75), label: 'Enxaneta', shape: 'rect' }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Build a formation from the two selectable numbers.
 *
 * @param {number} baixosCount  1 – 4
 * @param {number} floorCount   total floors (min 5); includes top fixed slots
 * @returns {{ pinyaPositions, troncPositions }}
 */
export function buildFormation(baixosCount, floorCount) {
  const geom = pinyaGeometries[baixosCount]
  if (!geom) throw new Error(`No pinya geometry defined for ${baixosCount} baixos`)

  const top     = topSlots(baixosCount)
  const regular = floorCount - top

  const troncPositions = []

  for (let floor = 1; floor <= regular; floor++) {
    troncPositions.push(...floorPositions(baixosCount, floor))
  }

  if (baixosCount >= 2) {
    troncPositions.push(...dosesPositions(regular + 0))
    troncPositions.push(acotxadoraPosition(regular + 1))
    troncPositions.push(enxanetaPosition(regular + 2))
  } else {
    troncPositions.push(acotxadoraPosition(regular + 0))
    troncPositions.push(enxanetaPosition(regular + 1))
  }

  return {
    pinyaPositions: [...geom.baixos, ...geom.pinya],
    troncPositions,
  }
}

export const BAIXOS_OPTIONS = [1, 2, 3, 4]
export const FLOOR_OPTIONS  = [5, 6, 7, 8, 9]
