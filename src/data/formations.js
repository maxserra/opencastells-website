/**
 * Formation generator.
 *
 * A formation is fully defined by two numbers:
 *   baixosCount  — how many people on the bottom floor (1–4)
 *   floorCount   — how many floors the tronc has (3–9)
 *
 * The pinya geometry (top-down view) comes from pinyaGeometries.js.
 * The tronc geometry (side view) is generated algorithmically here.
 *
 * Coordinate space: 1000-unit grid.
 * The SVG viewBox for both views is computed automatically from the
 * bounding box of positions — no fixed viewBox to maintain.
 */

import { pinyaGeometries } from './pinyaGeometries.js'

// ─── Tronc constants ──────────────────────────────────────────────────────────

const RT  = 40   // tronc circle radius (1000-unit space)
const CXT = 500  // horizontal centre of tronc
const BY  = 900  // y of floor 1 (baixos)
const FH  = 120  // vertical distance between floors

/**
 * Casteller IDs for floor `floorNum` (1-based).
 * Floor 1 uses prefix "b" (baix), floor 2 "s" (segon), etc.
 */
const FLOOR_PREFIXES = ['b', 's', 't', 'q', 'c', 'x', 'se', 'vu', 'no']

function floorPositions(baixosCount, floorNum) {
  const prefix = FLOOR_PREFIXES[floorNum - 1] ?? `f${floorNum}_`
  const y = BY - (floorNum - 1) * FH
  const spacing = 90
  const ids = Array.from({ length: baixosCount }, (_, i) => `${prefix}${i + 1}`)
  return ids.map((id, i) => ({
    id,
    x: Math.round(CXT + (i - (baixosCount - 1) / 2) * spacing),
    y,
    r: RT,
    label: id.toUpperCase(),
  }))
}

function enxanetaPosition(floorCount) {
  return {
    id: 'enxa',
    x: CXT,
    y: BY - floorCount * FH,
    r: Math.round(RT * 0.75),
    label: 'ENXA',
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Build a formation object from the two selectable numbers.
 *
 * @param {number} baixosCount  1 – 4
 * @param {number} floorCount   3 – 9
 * @returns {{ pinyaPositions, troncPositions }}
 */
export function buildFormation(baixosCount, floorCount) {
  const geom = pinyaGeometries[baixosCount]
  if (!geom) throw new Error(`No pinya geometry defined for ${baixosCount} baixos`)

  const troncPositions = []
  for (let floor = 1; floor <= floorCount; floor++) {
    troncPositions.push(...floorPositions(baixosCount, floor))
  }
  troncPositions.push(enxanetaPosition(floorCount))

  return {
    pinyaPositions: [...geom.baixos, ...geom.pinya],
    troncPositions,
  }
}

export const BAIXOS_OPTIONS  = [1, 2, 3, 4]
export const FLOOR_OPTIONS   = [3, 4, 5, 6, 7, 8, 9]
