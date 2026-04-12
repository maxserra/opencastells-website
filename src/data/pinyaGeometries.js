/**
 * Pinya top-down geometry, keyed by number of baixos (1 – 4).
 *
 * Each entry defines:
 *   baixos  — inner cluster positions (IDs b1..bN, shared with the tronc)
 *   pinya   — support ring positions  (pinya view only)
 *
 * Coordinate space: 1000-unit grid, visual centre roughly (500, 500).
 * The SVG viewBox is computed automatically from the bounding box of
 * positions, so you can freely add/move shapes without updating any viewBox.
 *
 * All positions: { id, x, y, r, label, shape?, direction? }
 *   shape     — 'rect' for baixos and named roles; omit for circles
 *   direction — degrees (0=right, 90=down, 180=left, 270=up) used to
 *               rotate the rect and orient nucli satellites
 *
 * ── How to fine-tune ──────────────────────────────────────────────────────
 *   • Adjust individual x/y values to nudge a position.
 *   • Change RING_RADIUS in ring() calls to tighten or widen the pinya ring.
 *   • Change startAngleDeg in ring() to rotate the whole ring.
 *   • Add or remove IDs in the pinya ring array to change ring density.
 *   • The `r` field controls each circle/rect's drawn size.
 *
 *   The baixos IDs (b1..bN) must stay consistent with the tronc generator
 *   in formations.js — those are the linked positions.
 * ─────────────────────────────────────────────────────────────────────────
 */

const R  = 63   // default circle radius (1000-unit space)
const CX = 500  // horizontal centre (used by ring())
const CY = 500  // vertical centre   (used by ring())

/**
 * Generate evenly-distributed positions on a circle centred on the SVG origin.
 * @param {string[]} ids
 * @param {number} radius        distance from centre to circle centre
 * @param {number} startAngleDeg first position angle (270 = top)
 */
function ring(ids, radius, startAngleDeg = 270) {
  const n = ids.length
  return ids.map((id, i) => {
    const deg = startAngleDeg + (360 / n) * i
    const rad = (deg * Math.PI) / 180
    return {
      id,
      x: Math.round(CX + radius * Math.cos(rad)),
      y: Math.round(CY + radius * Math.sin(rad)),
      r: R,
      label: id.toUpperCase(),
    }
  })
}

/**
 * Generate 4 nucli positions orbiting a single baix.
 * The first satellite is placed in baix.direction, the rest at 90° steps.
 * IDs: `${baix.id}-n1` … `${baix.id}-n4`
 *
 * @param {{ id: string, x: number, y: number, direction: number, label: string }} baix
 * @param {number} radius  orbit radius (default 44 ≈ 2×R + gap)
 */
function nucli(baix, radius = 44) {
  return Array.from({ length: 4 }, (_, i) => {
    const deg = baix.direction + 90 * i
    const rad = (deg * Math.PI) / 180
    return {
      id:    `${baix.id}-n${i + 1}`,
      x:     Math.round(baix.x + radius * Math.cos(rad)),
      y:     Math.round(baix.y + radius * Math.sin(rad)),
      r:     R,
      label: `${baix.label}N${i + 1}`,
    }
  })
}

export const pinyaGeometries = {

  // ── 1 baix (pilar) ──────────────────────────────────────────────────────
  1: {
    baixos: [
      { id: 'b1', x: 500, y: 497, r: 41, label: 'baix', shape: 'rect', direction: 0 },
    ],
    pinya: [
      { id: 'lateral_front_left_1_2', x: 278, y: 53, r: 19, label: '1 lateral front left', shape: 'rect', direction: 160 },
      { id: 'lateral_front_right_1_2', x: 719, y: 53, r: 19, label: '1 lateral front right', shape: 'rect', direction: 200 },
      { id: 'mans_front_4', x: 500, y: 84, r: 31, label: '4 mans front', shape: 'rect', direction: 180 },
      { id: 'tap_front_left_1', x: 319, y: 134, r: 41, label: '1 tap front left' },
      { id: 'tap_front_right_1', x: 678, y: 134, r: 41, label: '1 tap front right' },
      { id: 'mans_front_3', x: 500, y: 162, r: 31, label: '3 mans front', shape: 'rect', direction: 180 },
      { id: 'lateral_front_left_4', x: 81, y: 216, r: 19, label: '4 lateral front left', shape: 'rect', direction: 90 },
      { id: 'lateral_front_right_4', x: 919, y: 216, r: 19, label: '4 lateral front right', shape: 'rect', direction: 270 },
      { id: 'lateral_front_left_3', x: 159, y: 234, r: 19, label: '3 lateral front left', shape: 'rect', direction: 90 },
      { id: 'lateral_front_right_3', x: 838, y: 234, r: 19, label: '3 lateral front right', shape: 'rect', direction: 270 },
      { id: 'mans_front_2', x: 500, y: 244, r: 31, label: '2 mans front', shape: 'rect', direction: 180 },
      { id: 'lateral_front_left_2', x: 241, y: 256, r: 19, label: '2 lateral front left', shape: 'rect', direction: 90 },
      { id: 'lateral_front_right_2', x: 759, y: 256, r: 19, label: '2 lateral front right', shape: 'rect', direction: 270 },
      { id: 'lateral_front_left_1', x: 319, y: 275, r: 19, label: '1 lateral front left', shape: 'rect', direction: 90 },
      { id: 'lateral_front_right_1', x: 678, y: 275, r: 19, label: '1 lateral front right', shape: 'rect', direction: 270 },
      { id: 'mans_front_1', x: 500, y: 325, r: 31, label: '1 mans front', shape: 'rect', direction: 180 },
      { id: 'agulla', x: 500, y: 416, r: 19, label: 'agulla', shape: 'rect', direction: 0 },
      { id: 'vent_left_4', x: 31, y: 497, r: 31, label: '4 vent left', shape: 'rect', direction: 90 },
      { id: 'vent_left_3', x: 109, y: 497, r: 31, label: '3 vent left', shape: 'rect', direction: 90 },
      { id: 'vent_left_2', x: 191, y: 497, r: 31, label: '2 vent left', shape: 'rect', direction: 90 },
      { id: 'vent_left_1', x: 269, y: 497, r: 31, label: '1 vent left', shape: 'rect', direction: 90 },
      { id: 'crossa_left', x: 359, y: 497, r: 41, label: 'crossa left' },
      { id: 'crossa_right', x: 638, y: 497, r: 41, label: 'crossa right' },
      { id: 'vent_right_1', x: 728, y: 497, r: 31, label: '1 vent right', shape: 'rect', direction: 270 },
      { id: 'vent_right_2', x: 809, y: 497, r: 31, label: '2 vent right', shape: 'rect', direction: 270 },
      { id: 'vent_right_3', x: 888, y: 497, r: 31, label: '3 vent right', shape: 'rect', direction: 270 },
      { id: 'vent_right_4', x: 969, y: 497, r: 31, label: '4 vent right', shape: 'rect', direction: 270 },
      { id: 'contrafort', x: 500, y: 578, r: 19, label: 'contrafort', shape: 'rect', direction: 0 },
      { id: 'mans_back_1', x: 500, y: 669, r: 31, label: '1 mans back', shape: 'rect', direction: 0 },
      { id: 'lateral_back_left_1', x: 319, y: 722, r: 19, label: '1 lateral back left', shape: 'rect', direction: 90 },
      { id: 'lateral_back_right_1', x: 678, y: 722, r: 19, label: '1 lateral back right', shape: 'rect', direction: 270 },
      { id: 'lateral_back_left_2', x: 241, y: 741, r: 19, label: '2 lateral back left', shape: 'rect', direction: 90 },
      { id: 'lateral_back_right_2', x: 759, y: 741, r: 19, label: '2 lateral back right', shape: 'rect', direction: 270 },
      { id: 'mans_back_2', x: 500, y: 750, r: 31, label: '2 mans back', shape: 'rect', direction: 0 },
      { id: 'lateral_back_left_3', x: 159, y: 762, r: 19, label: '3 lateral back left', shape: 'rect', direction: 90 },
      { id: 'lateral_back_right_3', x: 838, y: 762, r: 19, label: '3 lateral back right', shape: 'rect', direction: 270 },
      { id: 'lateral_back_left_4', x: 81, y: 781, r: 19, label: '4 lateral back left', shape: 'rect', direction: 90 },
      { id: 'lateral_back_right_4', x: 919, y: 781, r: 19, label: '4 lateral back right', shape: 'rect', direction: 270 },
      { id: 'mans_back_3', x: 500, y: 831, r: 31, label: '3 mans back', shape: 'rect', direction: 0 },
      { id: 'tap_back_left_1', x: 319, y: 862, r: 41, label: '1 tap back left' },
      { id: 'tap_back_right_1', x: 678, y: 862, r: 41, label: '1 tap back right' },
      { id: 'mans_back_4', x: 500, y: 912, r: 31, label: '4 mans back', shape: 'rect', direction: 0 },
      { id: 'lateral_back_left_1_2', x: 278, y: 944, r: 19, label: '1 lateral back left', shape: 'rect', direction: 20 },
      { id: 'lateral_back_right_1_2', x: 719, y: 944, r: 19, label: '1 lateral back right', shape: 'rect', direction: 340 },
    ],
  },

  // ── 2 baixos ────────────────────────────────────────────────────────────
  2: {
    baixos: [
      { id: 'b1', x: 431, y: 500, r: R, label: 'B1', shape: 'rect', direction: 180 },
      { id: 'b2', x: 569, y: 500, r: R, label: 'B2', shape: 'rect', direction: 0   },
    ],
    pinya: [
      ...nucli({ id: 'b1', x: 431, y: 500, label: 'B1', direction: 180 }),
      ...nucli({ id: 'b2', x: 569, y: 500, label: 'B2', direction: 0   }),
      ...ring(['pi1', 'pi2', 'pi3', 'pi4', 'pi5', 'pi6', 'pi7', 'pi8'], /* RING_RADIUS */ 238, /* startAngle */ 270),
    ],
  },

  // ── 3 baixos ────────────────────────────────────────────────────────────
  3: {
    baixos: [
      { id: 'b1', x: 431, y: 463, r: R, label: 'B1', shape: 'rect', direction: 225 },
      { id: 'b2', x: 569, y: 463, r: R, label: 'B2', shape: 'rect', direction: 315 },
      { id: 'b3', x: 500, y: 556, r: R, label: 'B3', shape: 'rect', direction: 90  },
    ],
    pinya: [
      ...nucli({ id: 'b1', x: 431, y: 463, label: 'B1', direction: 225 }),
      ...nucli({ id: 'b2', x: 569, y: 463, label: 'B2', direction: 315 }),
      ...nucli({ id: 'b3', x: 500, y: 556, label: 'B3', direction: 90  }),
      ...ring(['pi1', 'pi2', 'pi3', 'pi4', 'pi5', 'pi6', 'pi7', 'pi8', 'pi9', 'pi10'], /* RING_RADIUS */ 256, /* startAngle */ 270),
    ],
  },

  // ── 4 baixos ────────────────────────────────────────────────────────────
  4: {
    baixos: [
      { id: 'b1', x: 431, y: 456, r: R, label: 'B1', shape: 'rect', direction: 225 },
      { id: 'b2', x: 569, y: 456, r: R, label: 'B2', shape: 'rect', direction: 315 },
      { id: 'b3', x: 431, y: 544, r: R, label: 'B3', shape: 'rect', direction: 135 },
      { id: 'b4', x: 569, y: 544, r: R, label: 'B4', shape: 'rect', direction: 45  },
    ],
    pinya: [
      ...nucli({ id: 'b1', x: 431, y: 456, label: 'B1', direction: 225 }),
      ...nucli({ id: 'b2', x: 569, y: 456, label: 'B2', direction: 315 }),
      ...nucli({ id: 'b3', x: 431, y: 544, label: 'B3', direction: 135 }),
      ...nucli({ id: 'b4', x: 569, y: 544, label: 'B4', direction: 45  }),
      ...ring(
        ['pi1', 'pi2', 'pi3', 'pi4', 'pi5', 'pi6',
         'pi7', 'pi8', 'pi9', 'pi10', 'pi11', 'pi12'],
        /* RING_RADIUS */ 275, /* startAngle */ 270,
      ),
    ],
  },
}
