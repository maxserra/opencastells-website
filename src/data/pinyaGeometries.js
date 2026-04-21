/**
 * Pinya top-down geometry, keyed by formation key ('1'–'4', '3a' for amb agulla).
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
 *   shape     — MAIN_POSITION_SHAPE for baixos and named roles; omit for circles
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
 *   in troncFormations.js — those are the linked positions.
 * ─────────────────────────────────────────────────────────────────────────
 */

const MAIN_POSITION_SHAPE = 'rect'
const R_gran   = 30
const R_petita = 25
const SPACING_BETWEEN_PILARS = 550

// Radian constants for 3 baixos trigonometry
const RAD_30  = (30 * Math.PI) / 180
const RAD_60  = (60 * Math.PI) / 180
const RAD_45  = (45 * Math.PI) / 180
const RAD_120 = (120 * Math.PI) / 180
const RAD_135 = (135 * Math.PI) / 180
const RAD_150 = (150 * Math.PI) / 180
const RAD_210 = (210 * Math.PI) / 180
const RAD_225 = (225 * Math.PI) / 180
const RAD_240 = (240 * Math.PI) / 180
const RAD_300 = (300 * Math.PI) / 180
const RAD_315 = (315 * Math.PI) / 180


export const pinyaGeometries = {

  // ── 1 baix (pilar) ──────────────────────────────────────────────────────
  '1': {
    baixos: [
      { id: 'b1', x: 500, y: 500, r: 40, label: 'baix', shape: 'trapezoid', direction: 0 },
    ],
    pinya: [
      { id: 'agulla',                 x: 500, y: 425, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort',             x: 500, y: 575, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'crossa_right',           x: 600, y: 500, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left',            x: 400, y: 500, r: R_gran, label: 'crossa',                    direction: 90 },
      { id: 'mans_back_1',            x: 500, y: 650, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_2',            x: 500, y: 710, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_3',            x: 500, y: 770, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_4',            x: 500, y: 830, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_front_1',           x: 500, y: 350, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_2',           x: 500, y: 290, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_3',           x: 500, y: 230, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_4',           x: 500, y: 170, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_right_1',           x: 680, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_2',           x: 740, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_3',           x: 800, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_4',           x: 860, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_left_1',            x: 320, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_2',            x: 260, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_3',            x: 200, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_4',            x: 140, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_right_1',   x: 650, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_2',   x: 710, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_3',   x: 770, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_4',   x: 830, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_left_1',    x: 350, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_2',    x: 290, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_3',    x: 230, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_4',    x: 170, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_right_1',  x: 650, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_2',  x: 710, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_3',  x: 770, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_4',  x: 830, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_left_1',   x: 350, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_2',   x: 290, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_3',   x: 230, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_4',   x: 170, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'tap_back_right_1',       x: 600, y: 710, r: R_gran, label: '1 tap',                     direction: 320 },
      { id: 'tap_back_right_2',       x: 650, y: 770, r: 30,     label: '2 tap',      shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_back_left_1',        x: 400, y: 710, r: R_gran, label: '1 tap',                     direction: 40 },
      { id: 'tap_back_left_2',        x: 350, y: 770, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 40 },
      { id: 'tap_front_right_1',      x: 600, y: 290, r: R_gran, label: '1 tap',                     direction: 220 },
      { id: 'tap_front_right_2',      x: 650, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 220 },
      { id: 'tap_front_left_1',       x: 400, y: 290, r: R_gran, label: '1 tap',                     direction: 140 },
      { id: 'tap_front_left_2',       x: 350, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 140 },
    ],
  },

  // ── 1 baix (pilar) ──────────────────────────────────────────────────────
  '1 x3': {
    baixos: [
      { id: 'b1', x: 500 - SPACING_BETWEEN_PILARS, y: 500, r: 40, label: 'baix', shape: 'trapezoid', direction: 0 },
      { id: 'b2', x: 500, y: 500, r: 40, label: 'baix', shape: 'trapezoid', direction: 0 },
      { id: 'b3', x: 500 + SPACING_BETWEEN_PILARS, y: 500, r: 40, label: 'baix', shape: 'trapezoid', direction: 0 },
    ],
    pinya: [
      { id: 'agulla_1',                 x: 500 - SPACING_BETWEEN_PILARS, y: 425, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort_1',             x: 500 - SPACING_BETWEEN_PILARS, y: 575, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'crossa_right_1',           x: 600 - SPACING_BETWEEN_PILARS, y: 500, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left_1',            x: 400 - SPACING_BETWEEN_PILARS, y: 500, r: R_gran, label: 'crossa',                    direction: 90 },
      { id: 'mans_back_1_1',            x: 500 - SPACING_BETWEEN_PILARS, y: 650, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_2_1',            x: 500 - SPACING_BETWEEN_PILARS, y: 710, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_3_1',            x: 500 - SPACING_BETWEEN_PILARS, y: 770, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      // { id: 'mans_back_4_1',            x: 500 - SPACING_BETWEEN_PILARS, y: 830, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_front_1_1',           x: 500 - SPACING_BETWEEN_PILARS, y: 350, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_2_1',           x: 500 - SPACING_BETWEEN_PILARS, y: 290, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_3_1',           x: 500 - SPACING_BETWEEN_PILARS, y: 230, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      // { id: 'mans_front_4_1',           x: 500 - SPACING_BETWEEN_PILARS, y: 170, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_right_1_1',           x: 680 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_2_1',           x: 740 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_3_1',           x: 800 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_4_1',           x: 860 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_left_1_1',            x: 320 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_2_1',            x: 260 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_3_1',            x: 200 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_4_1',            x: 140 - SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_right_1_1',   x: 650 - SPACING_BETWEEN_PILARS, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_2_1',   x: 710 - SPACING_BETWEEN_PILARS, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_3_1',   x: 770 - SPACING_BETWEEN_PILARS, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_4_1',   x: 830 - SPACING_BETWEEN_PILARS, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_left_1_1',    x: 350 - SPACING_BETWEEN_PILARS, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_2_1',    x: 290 - SPACING_BETWEEN_PILARS, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_3_1',    x: 230 - SPACING_BETWEEN_PILARS, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_4_1',    x: 170 - SPACING_BETWEEN_PILARS, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_right_1_1',  x: 650 - SPACING_BETWEEN_PILARS, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_2_1',  x: 710 - SPACING_BETWEEN_PILARS, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_3_1',  x: 770 - SPACING_BETWEEN_PILARS, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_4_1',  x: 830 - SPACING_BETWEEN_PILARS, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_left_1_1',   x: 350 - SPACING_BETWEEN_PILARS, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_2_1',   x: 290 - SPACING_BETWEEN_PILARS, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_3_1',   x: 230 - SPACING_BETWEEN_PILARS, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_4_1',   x: 170 - SPACING_BETWEEN_PILARS, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'tap_back_right_1_1',       x: 600 - SPACING_BETWEEN_PILARS, y: 710, r: R_gran, label: '1 tap',                     direction: 320 },
      { id: 'tap_back_right_2_1',       x: 650 - SPACING_BETWEEN_PILARS, y: 770, r: 30,     label: '2 tap',      shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_back_left_1_1',        x: 400 - SPACING_BETWEEN_PILARS, y: 710, r: R_gran, label: '1 tap',                     direction: 40 },
      { id: 'tap_back_left_2_1',        x: 350 - SPACING_BETWEEN_PILARS, y: 770, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 40 },
      { id: 'tap_front_right_1_1',      x: 600 - SPACING_BETWEEN_PILARS, y: 290, r: R_gran, label: '1 tap',                     direction: 220 },
      { id: 'tap_front_right_2_1',      x: 650 - SPACING_BETWEEN_PILARS, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 220 },
      { id: 'tap_front_left_1_1',       x: 400 - SPACING_BETWEEN_PILARS, y: 290, r: R_gran, label: '1 tap',                     direction: 140 },
      { id: 'tap_front_left_2_1',       x: 350 - SPACING_BETWEEN_PILARS, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 140 },
      { id: 'agulla_2',                 x: 500 + 0, y: 425, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort_2',             x: 500 + 0, y: 575, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'crossa_right_2',           x: 600 + 0, y: 500, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left_2',            x: 400 + 0, y: 500, r: R_gran, label: 'crossa',                    direction: 90 },
      { id: 'mans_back_1_2',            x: 500 + 0, y: 650, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_2_2',            x: 500 + 0, y: 710, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_3_2',            x: 500 + 0, y: 770, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      // { id: 'mans_back_4_2',            x: 500 + 0, y: 830, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_front_1_2',           x: 500 + 0, y: 350, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_2_2',           x: 500 + 0, y: 290, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_3_2',           x: 500 + 0, y: 230, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      // { id: 'mans_front_4_2',           x: 500 + 0, y: 170, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_right_1_2',           x: 680 + 0, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_2_2',           x: 740 + 0, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_3_2',           x: 800 + 0, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_4_2',           x: 860 + 0, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_left_1_2',            x: 320 + 0, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_2_2',            x: 260 + 0, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_3_2',            x: 200 + 0, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_4_2',            x: 140 + 0, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_right_1_2',   x: 650 + 0, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_2_2',   x: 710 + 0, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_3_2',   x: 770 + 0, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_4_2',   x: 830 + 0, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_left_1_2',    x: 350 + 0, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_2_2',    x: 290 + 0, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_3_2',    x: 230 + 0, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_4_2',    x: 170 + 0, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_right_1_2',  x: 650 + 0, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_2_2',  x: 710 + 0, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_3_2',  x: 770 + 0, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_4_2',  x: 830 + 0, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_left_1_2',   x: 350 + 0, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_2_2',   x: 290 + 0, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_3_2',   x: 230 + 0, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_4_2',   x: 170 + 0, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'tap_back_right_1_2',       x: 600 + 0, y: 710, r: R_gran, label: '1 tap',                     direction: 320 },
      { id: 'tap_back_right_2_2',       x: 650 + 0, y: 770, r: 30,     label: '2 tap',      shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_back_left_1_2',        x: 400 + 0, y: 710, r: R_gran, label: '1 tap',                     direction: 40 },
      { id: 'tap_back_left_2_2',        x: 350 + 0, y: 770, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 40 },
      { id: 'tap_front_right_1_2',      x: 600 + 0, y: 290, r: R_gran, label: '1 tap',                     direction: 220 },
      { id: 'tap_front_right_2_2',      x: 650 + 0, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 220 },
      { id: 'tap_front_left_1_2',       x: 400 + 0, y: 290, r: R_gran, label: '1 tap',                     direction: 140 },
      { id: 'tap_front_left_2_2',       x: 350 + 0, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 140 },
      { id: 'agulla_3',                 x: 500 + SPACING_BETWEEN_PILARS, y: 425, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort_3',             x: 500 + SPACING_BETWEEN_PILARS, y: 575, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'crossa_right_3',           x: 600 + SPACING_BETWEEN_PILARS, y: 500, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left_3',            x: 400 + SPACING_BETWEEN_PILARS, y: 500, r: R_gran, label: 'crossa',                    direction: 90 },
      { id: 'mans_back_1_3',            x: 500 + SPACING_BETWEEN_PILARS, y: 650, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_2_3',            x: 500 + SPACING_BETWEEN_PILARS, y: 710, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_back_3_3',            x: 500 + SPACING_BETWEEN_PILARS, y: 770, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      // { id: 'mans_back_4_3',            x: 500 + SPACING_BETWEEN_PILARS, y: 830, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'mans_front_1_3',           x: 500 + SPACING_BETWEEN_PILARS, y: 350, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_2_3',           x: 500 + SPACING_BETWEEN_PILARS, y: 290, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_front_3_3',           x: 500 + SPACING_BETWEEN_PILARS, y: 230, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      // { id: 'mans_front_4_3',           x: 500 + SPACING_BETWEEN_PILARS, y: 170, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_right_1_3',           x: 680 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_right_2_3',           x: 740 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_3_3',           x: 800 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'vent_right_4_3',           x: 860 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'vent_left_1_3',            x: 320 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'vent_left_2_3',            x: 260 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_3_3',            x: 200 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'vent_left_4_3',            x: 140 + SPACING_BETWEEN_PILARS, y: 500, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_right_1_3',   x: 650 + SPACING_BETWEEN_PILARS, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_right_2_3',   x: 710 + SPACING_BETWEEN_PILARS, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_3_3',   x: 770 + SPACING_BETWEEN_PILARS, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_back_right_4_3',   x: 830 + SPACING_BETWEEN_PILARS, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_back_left_1_3',    x: 350 + SPACING_BETWEEN_PILARS, y: 600, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_back_left_2_3',    x: 290 + SPACING_BETWEEN_PILARS, y: 625, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_3_3',    x: 230 + SPACING_BETWEEN_PILARS, y: 650, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_back_left_4_3',    x: 170 + SPACING_BETWEEN_PILARS, y: 675, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_right_1_3',  x: 650 + SPACING_BETWEEN_PILARS, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_right_2_3',  x: 710 + SPACING_BETWEEN_PILARS, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_3_3',  x: 770 + SPACING_BETWEEN_PILARS, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // { id: 'lateral_front_right_4_3',  x: 830 + SPACING_BETWEEN_PILARS, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_front_left_1_3',   x: 350 + SPACING_BETWEEN_PILARS, y: 400, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_front_left_2_3',   x: 290 + SPACING_BETWEEN_PILARS, y: 375, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_3_3',   x: 230 + SPACING_BETWEEN_PILARS, y: 350, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // { id: 'lateral_front_left_4_3',   x: 170 + SPACING_BETWEEN_PILARS, y: 325, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'tap_back_right_1_3',       x: 600 + SPACING_BETWEEN_PILARS, y: 710, r: R_gran, label: '1 tap',                     direction: 320 },
      { id: 'tap_back_right_2_3',       x: 650 + SPACING_BETWEEN_PILARS, y: 770, r: 30,     label: '2 tap',      shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_back_left_1_3',        x: 400 + SPACING_BETWEEN_PILARS, y: 710, r: R_gran, label: '1 tap',                     direction: 40 },
      { id: 'tap_back_left_2_3',        x: 350 + SPACING_BETWEEN_PILARS, y: 770, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 40 },
      { id: 'tap_front_right_1_3',      x: 600 + SPACING_BETWEEN_PILARS, y: 290, r: R_gran, label: '1 tap',                     direction: 220 },
      { id: 'tap_front_right_2_3',      x: 650 + SPACING_BETWEEN_PILARS, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 220 },
      { id: 'tap_front_left_1_3',       x: 400 + SPACING_BETWEEN_PILARS, y: 290, r: R_gran, label: '1 tap',                     direction: 140 },
      { id: 'tap_front_left_2_3',       x: 350 + SPACING_BETWEEN_PILARS, y: 230, r: 30,     label: '1 tap',      shape: MAIN_POSITION_SHAPE, direction: 140 },
    ],
  },

  // ── 2 baixos ────────────────────────────────────────────────────────────
  '2': {
    baixos: [
      { id: 'b1', x: 410, y: 500, r: 40, label: 'B1', shape: 'trapezoid', direction: 90 },
      { id: 'b2', x: 590, y: 500, r: 40, label: 'B2', shape: 'trapezoid', direction: 270 },
    ],
    pinya: [
      // ── b1 nucli (left baix) ──────────────────────────────────────────
      { id: 'agulla_b1',          x: 470, y: 500, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 270 },
      { id: 'contrafort_b1',      x: 350, y: 500, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'crossa_left_b1',     x: 410, y: 400, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_right_b1',    x: 410, y: 600, r: R_gran, label: 'crossa',                    direction: 90 },
      // ── b2 nucli (right baix) ─────────────────────────────────────────
      { id: 'agulla_b2',          x: 530, y: 500, r: 30,     label: 'agulla',     shape: 'trapezoid', direction: 90 },
      { id: 'contrafort_b2',      x: 650, y: 500, r: 30,     label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'crossa_right_b2',    x: 590, y: 400, r: R_gran, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left_b2',     x: 590, y: 600, r: R_gran, label: 'crossa',                    direction: 90 },
      // ── mans b1 (extending left) ──────────────────────────────────────
      { id: 'mans_b1_1',          x: 280, y: 500, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'mans_b1_2',          x: 220, y: 500, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'mans_b1_3',          x: 160, y: 500, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'mans_b1_4',          x: 100, y: 500, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 90 },
      // ── mans b2 (extending right) ─────────────────────────────────────
      { id: 'mans_b2_1',          x: 720, y: 500, r: 35,     label: '1 mans',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b2_2',          x: 780, y: 500, r: 35,     label: '2 mans',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b2_3',          x: 840, y: 500, r: 35,     label: '3 mans',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b2_4',          x: 900, y: 500, r: 35,     label: '4 mans',     shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── vent b1 (downward) ────────────────────────────────────────────
      { id: 'vent_b1_1',          x: 500, y: 700, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_b1_2',          x: 500, y: 760, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_b1_3',          x: 500, y: 820, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_b1_4',          x: 500, y: 880, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── vent b2 (upward) ──────────────────────────────────────────────
      { id: 'vent_b2_1',          x: 500, y: 300, r: 35,     label: '1 vent',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_b2_2',          x: 500, y: 240, r: 35,     label: '2 vent',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_b2_3',          x: 500, y: 180, r: 35,     label: '3 vent',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'vent_b2_4',          x: 500, y: 120, r: 35,     label: '4 vent',     shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── lateral b1 right (b1 side, lower-left) ──────────────────────
      { id: 'lateral_b1_right_1', x: 385, y: 670, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b1_right_2', x: 375, y: 730, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b1_right_3', x: 365, y: 790, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b1_right_4', x: 355, y: 850, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── lateral b1 left (b1 side, upper-left) ─────────────────────
      { id: 'lateral_b1_left_1',  x: 385, y: 330, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b1_left_2',  x: 375, y: 270, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b1_left_3',  x: 365, y: 210, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b1_left_4',  x: 355, y: 150, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── lateral b2 right (b2 side, upper-right) ───────────────────
      { id: 'lateral_b2_right_1', x: 615, y: 330, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b2_right_2', x: 625, y: 270, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b2_right_3', x: 635, y: 210, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_b2_right_4', x: 645, y: 150, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── lateral b2 left (b2 side, lower-right) ────────────────────
      { id: 'lateral_b2_left_1',  x: 615, y: 670, r: 30,     label: '1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b2_left_2',  x: 625, y: 730, r: 30,     label: '2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b2_left_3',  x: 635, y: 790, r: 30,     label: '3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_b2_left_4',  x: 645, y: 850, r: 30,     label: '4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── taps ──────────────────────────────────────────────────────────
      { id: 'tap_b1_right_1',     x: 295, y: 600, r: R_gran, label: '1 tap',                 direction: 60 },
      { id: 'tap_b1_right_2',     x: 255, y: 620, r: 30,     label: '2 tap',  shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'tap_b1_left_1',      x: 295, y: 400, r: R_gran, label: '1 tap',                 direction: 120 },
      { id: 'tap_b1_left_2',      x: 255, y: 380, r: 30,     label: '2 tap',  shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'tap_b2_right_1',     x: 705, y: 400, r: R_gran, label: '1 tap',                 direction: 240 },
      { id: 'tap_b2_right_2',     x: 745, y: 380, r: 30,     label: '2 tap',  shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'tap_b2_left_1',      x: 705, y: 600, r: R_gran, label: '1 tap',                 direction: 300 },
      { id: 'tap_b2_left_2',      x: 745, y: 620, r: 30,     label: '2 tap',  shape: MAIN_POSITION_SHAPE, direction: 300 },
    ],
  },

  // ── 3 baixos ────────────────────────────────────────────────────────────
  '3': {
    baixos: [
      { id: 'b1', x: 500, y: 405, r: 40, label: 'B1', shape: 'trapezoid', direction: 180 },
      { id: 'b2', x: 420, y: 547, r: 40, label: 'B2', shape: 'trapezoid', direction: 60 },
      { id: 'b3', x: 581, y: 547, r: 40, label: 'B3', shape: 'trapezoid', direction: 300 },
    ],
    pinya: [
      // ── b1 nucli (top baix, faces left) ──────────────────────────────
      { id: 'agulla_b1',              x: 500,                                      y: 465,                                      r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 0 },
      { id: 'contrafort_b1',          x: 500,                                      y: 345,                                      r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'crossa_right_b1',        x: 430,                                      y: 405,                                      r: R_petita, label: 'crossa',                    direction: 90 },
      { id: 'crossa_left_b1',         x: 570,                                      y: 405,                                      r: R_petita, label: 'crossa',                    direction: 270 },
      // ── b2 nucli (lower-left baix, faces upper-right @ 60°) ───────────────────────
      { id: 'agulla_b2',              x: Math.round(420 + 60 * Math.sin(RAD_60)),  y: Math.round(547 - 60 * Math.cos(RAD_60)),  r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 240 },
      { id: 'contrafort_b2',          x: Math.round(420 + 60 * Math.cos(RAD_150)), y: Math.round(547 + 60 * Math.sin(RAD_150)), r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'crossa_right_b2',        x: 454,                                      y: 607,                                      r: R_petita, label: 'crossa',                    direction: 330 },
      { id: 'crossa_left_b2',         x: 384,                                      y: 486,                                      r: R_petita, label: 'crossa',                    direction: 150 },
      // ── b3 nucli (lower-right baix, faces upper-left @ 300°) ──────────────────────────────
      { id: 'agulla_b3',              x: Math.round(581 + 60 * Math.sin(RAD_300)), y: Math.round(547 - 60 * Math.cos(RAD_300)), r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 120 },
      { id: 'contrafort_b3',          x: Math.round(581 + 60 * Math.cos(RAD_30)),  y: Math.round(547 + 60 * Math.sin(RAD_30)),  r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'crossa_right_b3',        x: 616,                                      y: 486,                                      r: R_petita, label: 'crossa',                    direction: 210 },
      { id: 'crossa_left_b3',         x: 546,                                      y: 608,                                      r: R_petita, label: 'crossa',                    direction: 30 },
      // ── mans b1 (going upward) ────────────────────────────────────────
      { id: 'mans_b1_1',              x: 500,                                               y: 275,                                               r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_2',              x: 500,                                               y: 215,                                               r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_3',              x: 500,                                               y: 155,                                               r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_4',              x: 500,                                               y: 95,                                                r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── mans b2 (going lower-left @ 150°) ─────────────────────────────────────────
      { id: 'mans_b2_1',              x: Math.round(420 + 120 * Math.cos(RAD_150)),         y: Math.round(547 + 120 * Math.sin(RAD_150)),         r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_2',              x: Math.round(420 + 180 * Math.cos(RAD_150)),         y: Math.round(547 + 180 * Math.sin(RAD_150)),         r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_3',              x: Math.round(420 + 240 * Math.cos(RAD_150)),         y: Math.round(547 + 240 * Math.sin(RAD_150)),         r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_4',              x: Math.round(420 + 300 * Math.cos(RAD_150)),         y: Math.round(547 + 300 * Math.sin(RAD_150)),         r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      // ── mans b3 (going lower-right @ 30°) ───────────────────────────────────────
      { id: 'mans_b3_1',              x: Math.round(581 + 120 * Math.cos(RAD_30)),          y: Math.round(547 + 120 * Math.sin(RAD_30)),          r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_2',              x: Math.round(581 + 180 * Math.cos(RAD_30)),          y: Math.round(547 + 180 * Math.sin(RAD_30)),          r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_3',              x: Math.round(581 + 240 * Math.cos(RAD_30)),          y: Math.round(547 + 240 * Math.sin(RAD_30)),          r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_4',              x: Math.round(581 + 300 * Math.cos(RAD_30)),          y: Math.round(547 + 300 * Math.sin(RAD_30)),          r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      // ── vent 1 (going upper-left) ─────────────────────────────────────
      { id: 'vent_1_1',               x: Math.round((500+420)/2 + 124 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 124 * Math.cos(RAD_300)), r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_2',               x: Math.round((500+420)/2 + 184 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 184 * Math.cos(RAD_300)), r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_3',               x: Math.round((500+420)/2 + 244 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 244 * Math.cos(RAD_300)), r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_4',               x: Math.round((500+420)/2 + 304 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 304 * Math.cos(RAD_300)), r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      // ── vent 2 (going straight down) ──────────────────────────────────
      { id: 'vent_2_1',               x: 500,                                               y: 675,                                               r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_2',               x: 500,                                               y: 735,                                               r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_3',               x: 500,                                               y: 795,                                               r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_4',               x: 500,                                               y: 855,                                               r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── vent 3 (going upper-right) ────────────────────────────────────
      { id: 'vent_3_1',               x: Math.round((500+581)/2 + 124 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 124 * Math.cos(RAD_60)),  r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_2',               x: Math.round((500+581)/2 + 184 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 184 * Math.cos(RAD_60)),  r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_3',               x: Math.round((500+581)/2 + 244 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 244 * Math.cos(RAD_60)),  r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_4',               x: Math.round((500+581)/2 + 304 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 304 * Math.cos(RAD_60)),  r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      // ── lateral right b1 (upper-left, extending @ 300°) ───────────────────
      { id: 'lateral_right_b1_1',     x: Math.round(530 + 124 * Math.sin(RAD_300)), y: Math.round(385 - 124 * Math.cos(RAD_300)), r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_2',     x: Math.round(530 + 184 * Math.sin(RAD_300)), y: Math.round(385 - 184 * Math.cos(RAD_300)), r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_3',     x: Math.round(530 + 244 * Math.sin(RAD_300)), y: Math.round(385 - 244 * Math.cos(RAD_300)), r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_4',     x: Math.round(530 + 304 * Math.sin(RAD_300)), y: Math.round(385 - 304 * Math.cos(RAD_300)), r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      // ── lateral left b1 (upper-right) ────────────────────────────────
      { id: 'lateral_left_b1_1',      x: Math.round(470 + 124 * Math.sin(RAD_60)),  y: Math.round(385 - 124 * Math.cos(RAD_60)),  r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_2',      x: Math.round(470 + 184 * Math.sin(RAD_60)),  y: Math.round(385 - 184 * Math.cos(RAD_60)),  r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_3',      x: Math.round(470 + 244 * Math.sin(RAD_60)),  y: Math.round(385 - 244 * Math.cos(RAD_60)),  r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_4',      x: Math.round(470 + 304 * Math.sin(RAD_60)),  y: Math.round(385 - 304 * Math.cos(RAD_60)),  r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── lateral right b2 (lower, toward b3 side) ─────────────────────
      { id: 'lateral_right_b2_1',     x: 390,                                       y: 656,                                       r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_2',     x: 390,                                       y: 719,                                       r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_3',     x: 390,                                       y: 782,                                       r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_4',     x: 390,                                       y: 846,                                       r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      // ── lateral left b2 (upper-left, extending @ 300°) ─────────────────────
      { id: 'lateral_left_b2_1',      x: Math.round(420 + 124 * Math.sin(RAD_300)), y: Math.round(580 - 124 * Math.cos(RAD_300)), r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_2',      x: Math.round(420 + 184 * Math.sin(RAD_300)), y: Math.round(580 - 184 * Math.cos(RAD_300)), r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_3',      x: Math.round(420 + 244 * Math.sin(RAD_300)), y: Math.round(580 - 244 * Math.cos(RAD_300)), r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_4',      x: Math.round(420 + 304 * Math.sin(RAD_300)), y: Math.round(580 - 304 * Math.cos(RAD_300)), r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      // ── lateral left b3 (lower, toward b2 side) ──────────────────────
      { id: 'lateral_left_b3_1',      x: 610,                                       y: 656,                                       r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_2',      x: 610,                                       y: 719,                                       r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_3',      x: 610,                                       y: 782,                                       r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_4',      x: 610,                                       y: 846,                                       r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      // ── lateral right b3 (upper-right, extending @ 60°) ──────────────────────
      { id: 'lateral_right_b3_1',     x: Math.round(580 + 124 * Math.sin(RAD_60)),  y: Math.round(580 - 124 * Math.cos(RAD_60)),  r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_2',     x: Math.round(580 + 184 * Math.sin(RAD_60)),  y: Math.round(580 - 184 * Math.cos(RAD_60)),  r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_3',     x: Math.round(580 + 244 * Math.sin(RAD_60)),  y: Math.round(580 - 244 * Math.cos(RAD_60)),  r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_4',     x: Math.round(580 + 304 * Math.sin(RAD_60)),  y: Math.round(580 - 304 * Math.cos(RAD_60)),  r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      // ── taps b1 ───────────────────────────────────────────────────────
      { id: 'tap_left_b1_1',          x: 590, y: 225, r: R_petita, label: '1 tap',                direction: 195 },
      { id: 'tap_left_b1_2',          x: 610, y: 185, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 200 },
      { id: 'tap_right_b1_1',         x: 410, y: 225, r: R_petita, label: '1 tap',                direction: 160 },
      { id: 'tap_right_b1_2',         x: 390, y: 185, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 160 },
      // ── taps b2 ───────────────────────────────────────────────────────
      { id: 'tap_left_b2_1',          x: 221, y: 558, r: R_petita, label: '1 tap',                direction: 80 },
      { id: 'tap_left_b2_2',          x: 177, y: 561, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 80 },
      { id: 'tap_right_b2_1',         x: 312, y: 715, r: R_petita, label: '1 tap',                direction: 40 },
      { id: 'tap_right_b2_2',         x: 287, y: 752, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 40 },
      // ── taps b3 ───────────────────────────────────────────────────────
      { id: 'tap_left_b3_1',          x: 688, y: 715, r: R_petita, label: '1 tap',                direction: 315 },
      { id: 'tap_left_b3_2',          x: 713, y: 753, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_right_b3_1',         x: 779, y: 558, r: R_petita, label: '1 tap',                direction: 280 },
      { id: 'tap_right_b3_2',         x: 823, y: 560, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 280 },
    ],
  },

  // ── 3 baixos amb agulla ───────────────────────────────────────────────
  '3a': {
    baixos: [
      { id: 'b1', x: 500, y: 405, r: 35, label: 'B1', shape: 'trapezoid', direction: 180 },
      { id: 'b2', x: 420, y: 547, r: 35, label: 'B2', shape: 'trapezoid', direction: 60 },
      { id: 'b3', x: 581, y: 547, r: 35, label: 'B3', shape: 'trapezoid', direction: 300 },
      { id: 'ba', x: 500, y: 500, r: 35, label: 'BA', shape: 'trapezoid', direction: 0 },
    ],
    pinya: [
      // ── b1 nucli (top baix, faces left) ──────────────────────────────
      { id: 'agulla_b1',              x: 500,                                      y: 451,                                      r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort_b1',          x: 500,                                      y: 345,                                      r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'crossa_right_b1',        x: 430,                                      y: 405,                                      r: R_petita, label: 'crossa',                    direction: 90 },
      { id: 'crossa_left_b1',         x: 570,                                      y: 405,                                      r: R_petita, label: 'crossa',                    direction: 270 },
      // ── b2 nucli (lower-left baix, faces upper-right @ 60°) ───────────────────────
      { id: 'agulla_b2',              x: Math.round(420 + 46 * Math.sin(RAD_60)),  y: Math.round(547 - 46 * Math.cos(RAD_60)),  r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 60 },
      { id: 'contrafort_b2',          x: Math.round(420 + 60 * Math.cos(RAD_150)), y: Math.round(547 + 60 * Math.sin(RAD_150)), r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'crossa_right_b2',        x: 454,                                      y: 607,                                      r: R_petita, label: 'crossa',                    direction: 330 },
      { id: 'crossa_left_b2',         x: 384,                                      y: 486,                                      r: R_petita, label: 'crossa',                    direction: 150 },
      // ── b3 nucli (lower-right baix, faces upper-left @ 300°) ──────────────────────────────
      { id: 'agulla_b3',              x: Math.round(581 + 46 * Math.sin(RAD_300)), y: Math.round(547 - 46 * Math.cos(RAD_300)), r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 300 },
      { id: 'contrafort_b3',          x: Math.round(581 + 60 * Math.cos(RAD_30)),  y: Math.round(547 + 60 * Math.sin(RAD_30)),  r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'crossa_right_b3',        x: 616,                                      y: 486,                                      r: R_petita, label: 'crossa',                    direction: 210 },
      { id: 'crossa_left_b3',         x: 546,                                      y: 608,                                      r: R_petita, label: 'crossa',                    direction: 30 },
      // ── mans b1 (going upward) ────────────────────────────────────────
      { id: 'mans_b1_1',              x: 500,                                               y: 275,                                               r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_2',              x: 500,                                               y: 215,                                               r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_3',              x: 500,                                               y: 155,                                               r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b1_4',              x: 500,                                               y: 95,                                                r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── mans b2 (going lower-left @ 150°) ─────────────────────────────────────────
      { id: 'mans_b2_1',              x: Math.round(420 + 120 * Math.cos(RAD_150)),         y: Math.round(547 + 120 * Math.sin(RAD_150)),         r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_2',              x: Math.round(420 + 180 * Math.cos(RAD_150)),         y: Math.round(547 + 180 * Math.sin(RAD_150)),         r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_3',              x: Math.round(420 + 240 * Math.cos(RAD_150)),         y: Math.round(547 + 240 * Math.sin(RAD_150)),         r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      { id: 'mans_b2_4',              x: Math.round(420 + 300 * Math.cos(RAD_150)),         y: Math.round(547 + 300 * Math.sin(RAD_150)),         r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 60 },
      // ── mans b3 (going lower-right @ 30°) ───────────────────────────────────────
      { id: 'mans_b3_1',              x: Math.round(581 + 120 * Math.cos(RAD_30)),          y: Math.round(547 + 120 * Math.sin(RAD_30)),          r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_2',              x: Math.round(581 + 180 * Math.cos(RAD_30)),          y: Math.round(547 + 180 * Math.sin(RAD_30)),          r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_3',              x: Math.round(581 + 240 * Math.cos(RAD_30)),          y: Math.round(547 + 240 * Math.sin(RAD_30)),          r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      { id: 'mans_b3_4',              x: Math.round(581 + 300 * Math.cos(RAD_30)),          y: Math.round(547 + 300 * Math.sin(RAD_30)),          r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 300 },
      // ── vent 1 (going upper-left) ─────────────────────────────────────
      { id: 'vent_1_1',               x: Math.round((500+420)/2 + 124 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 124 * Math.cos(RAD_300)), r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_2',               x: Math.round((500+420)/2 + 184 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 184 * Math.cos(RAD_300)), r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_3',               x: Math.round((500+420)/2 + 244 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 244 * Math.cos(RAD_300)), r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      { id: 'vent_1_4',               x: Math.round((500+420)/2 + 304 * Math.sin(RAD_300)), y: Math.round((405+547)/2 - 304 * Math.cos(RAD_300)), r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 120 },
      // ── vent 2 (going straight down) ──────────────────────────────────
      { id: 'vent_2_1',               x: 500,                                               y: 675,                                               r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_2',               x: 500,                                               y: 735,                                               r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_3',               x: 500,                                               y: 795,                                               r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'vent_2_4',               x: 500,                                               y: 855,                                               r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── vent 3 (going upper-right) ────────────────────────────────────
      { id: 'vent_3_1',               x: Math.round((500+581)/2 + 124 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 124 * Math.cos(RAD_60)),  r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_2',               x: Math.round((500+581)/2 + 184 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 184 * Math.cos(RAD_60)),  r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_3',               x: Math.round((500+581)/2 + 244 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 244 * Math.cos(RAD_60)),  r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      { id: 'vent_3_4',               x: Math.round((500+581)/2 + 304 * Math.sin(RAD_60)),  y: Math.round((405+547)/2 - 304 * Math.cos(RAD_60)),  r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 240 },
      // ── lateral right b1 (upper-left, extending @ 300°) ───────────────────
      { id: 'lateral_right_b1_1',     x: Math.round(530 + 124 * Math.sin(RAD_300)), y: Math.round(385 - 124 * Math.cos(RAD_300)), r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_2',     x: Math.round(530 + 184 * Math.sin(RAD_300)), y: Math.round(385 - 184 * Math.cos(RAD_300)), r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_3',     x: Math.round(530 + 244 * Math.sin(RAD_300)), y: Math.round(385 - 244 * Math.cos(RAD_300)), r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_right_b1_4',     x: Math.round(530 + 304 * Math.sin(RAD_300)), y: Math.round(385 - 304 * Math.cos(RAD_300)), r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 90 },
      // ── lateral left b1 (upper-right) ────────────────────────────────
      { id: 'lateral_left_b1_1',      x: Math.round(470 + 124 * Math.sin(RAD_60)),  y: Math.round(385 - 124 * Math.cos(RAD_60)),  r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_2',      x: Math.round(470 + 184 * Math.sin(RAD_60)),  y: Math.round(385 - 184 * Math.cos(RAD_60)),  r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_3',      x: Math.round(470 + 244 * Math.sin(RAD_60)),  y: Math.round(385 - 244 * Math.cos(RAD_60)),  r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b1_4',      x: Math.round(470 + 304 * Math.sin(RAD_60)),  y: Math.round(385 - 304 * Math.cos(RAD_60)),  r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── lateral right b2 (lower, toward b3 side) ─────────────────────
      { id: 'lateral_right_b2_1',     x: 390,                                       y: 656,                                       r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_2',     x: 390,                                       y: 719,                                       r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_3',     x: 390,                                       y: 782,                                       r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      { id: 'lateral_right_b2_4',     x: 390,                                       y: 846,                                       r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 330 },
      // ── lateral left b2 (upper-left, extending @ 300°) ─────────────────────
      { id: 'lateral_left_b2_1',      x: Math.round(420 + 124 * Math.sin(RAD_300)), y: Math.round(580 - 124 * Math.cos(RAD_300)), r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_2',      x: Math.round(420 + 184 * Math.sin(RAD_300)), y: Math.round(580 - 184 * Math.cos(RAD_300)), r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_3',      x: Math.round(420 + 244 * Math.sin(RAD_300)), y: Math.round(580 - 244 * Math.cos(RAD_300)), r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      { id: 'lateral_left_b2_4',      x: Math.round(420 + 304 * Math.sin(RAD_300)), y: Math.round(580 - 304 * Math.cos(RAD_300)), r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 150 },
      // ── lateral left b3 (lower, toward b2 side) ──────────────────────
      { id: 'lateral_left_b3_1',      x: 610,                                       y: 656,                                       r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_2',      x: 610,                                       y: 719,                                       r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_3',      x: 610,                                       y: 782,                                       r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      { id: 'lateral_left_b3_4',      x: 610,                                       y: 846,                                       r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 30 },
      // ── lateral right b3 (upper-right, extending @ 60°) ──────────────────────
      { id: 'lateral_right_b3_1',     x: Math.round(580 + 124 * Math.sin(RAD_60)),  y: Math.round(580 - 124 * Math.cos(RAD_60)),  r: 30, label: '1 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_2',     x: Math.round(580 + 184 * Math.sin(RAD_60)),  y: Math.round(580 - 184 * Math.cos(RAD_60)),  r: 30, label: '2 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_3',     x: Math.round(580 + 244 * Math.sin(RAD_60)),  y: Math.round(580 - 244 * Math.cos(RAD_60)),  r: 30, label: '3 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      { id: 'lateral_right_b3_4',     x: Math.round(580 + 304 * Math.sin(RAD_60)),  y: Math.round(580 - 304 * Math.cos(RAD_60)),  r: 30, label: '4 lateral', shape: MAIN_POSITION_SHAPE, direction: 210 },
      // ── taps b1 ───────────────────────────────────────────────────────
      { id: 'tap_left_b1_1',          x: 590, y: 225, r: R_petita, label: '1 tap',                direction: 195 },
      { id: 'tap_left_b1_2',          x: 610, y: 185, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 200 },
      { id: 'tap_right_b1_1',         x: 410, y: 225, r: R_petita, label: '1 tap',                direction: 160 },
      { id: 'tap_right_b1_2',         x: 390, y: 185, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 160 },
      // ── taps b2 ───────────────────────────────────────────────────────
      { id: 'tap_left_b2_1',          x: 221, y: 558, r: R_petita, label: '1 tap',                direction: 80 },
      { id: 'tap_left_b2_2',          x: 177, y: 561, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 80 },
      { id: 'tap_right_b2_1',         x: 312, y: 715, r: R_petita, label: '1 tap',                direction: 40 },
      { id: 'tap_right_b2_2',         x: 287, y: 752, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 40 },
      // ── taps b3 ───────────────────────────────────────────────────────
      { id: 'tap_left_b3_1',          x: 688, y: 715, r: R_petita, label: '1 tap',                direction: 315 },
      { id: 'tap_left_b3_2',          x: 713, y: 753, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 320 },
      { id: 'tap_right_b3_1',         x: 779, y: 558, r: R_petita, label: '1 tap',                direction: 280 },
      { id: 'tap_right_b3_2',         x: 823, y: 560, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 280 },
    ],
  },

  // ── 4 baixos ────────────────────────────────────────────────────────────
  // Cross/plus layout: b1 right (dir270), b2 top (dir180), b3 left (dir90), b4 bottom (dir0)
  '4': {
    baixos: [
      { id: 'b1', x: 610, y: 500, r: 40, label: 'B1', shape: 'trapezoid', direction: 270 },
      { id: 'b2', x: 500, y: 390, r: 40, label: 'B2', shape: 'trapezoid', direction: 180 },
      { id: 'b3', x: 390, y: 500, r: 40, label: 'B3', shape: 'trapezoid', direction: 90 },
      { id: 'b4', x: 500, y: 610, r: 40, label: 'B4', shape: 'trapezoid', direction: 0 },
    ],
    pinya: [
      // ── b1 nucli (right baix, dir 270) ────────────────────────────────
      { id: 'agulla_b1',              x: 550, y: 500, r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 90 },
      { id: 'contrafort_b1',          x: 670, y: 500, r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'crossa_right_b1',        x: 610, y: 430, r: R_petita, label: 'crossa',                    direction: 180 },
      { id: 'crossa_left_b1',         x: 610, y: 570, r: R_petita, label: 'crossa',                    direction: 0   },
      // ── b2 nucli (top baix, dir 180) ──────────────────────────────────
      { id: 'agulla_b2',              x: 500, y: 450, r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 0 },
      { id: 'contrafort_b2',          x: 500, y: 330, r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'crossa_right_b2',        x: 430, y: 390, r: R_petita, label: 'crossa',                    direction: 90  },
      { id: 'crossa_left_b2',         x: 570, y: 390, r: R_petita, label: 'crossa',                    direction: 270 },
      // ── b3 nucli (left baix, dir 90) ──────────────────────────────────
      { id: 'agulla_b3',              x: 450, y: 500, r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 270 },
      { id: 'contrafort_b3',          x: 330, y: 500, r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'crossa_right_b3',        x: 390, y: 570, r: R_petita, label: 'crossa',                    direction: 0   },
      { id: 'crossa_left_b3',         x: 390, y: 430, r: R_petita, label: 'crossa',                    direction: 180 },
      // ── b4 nucli (bottom baix, dir 0) ─────────────────────────────────
      { id: 'agulla_b4',              x: 500, y: 550, r: 20,       label: 'agulla',     shape: 'trapezoid', direction: 180 },
      { id: 'contrafort_b4',          x: 500, y: 670, r: 30,       label: 'contrafort', shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'crossa_right_b4',        x: 570, y: 610, r: R_petita, label: 'crossa',                    direction: 270 },
      { id: 'crossa_left_b4',         x: 430, y: 610, r: R_petita, label: 'crossa',                    direction: 90  },
      // ── mans b1 (extending right) ─────────────────────────────────────
      { id: 'mans_b1_1',              x: 740, y: 500, r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b1_2',              x: 800, y: 500, r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b1_3',              x: 860, y: 500, r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'mans_b1_4',              x: 920, y: 500, r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── mans b2 (extending upward) ────────────────────────────────────
      { id: 'mans_b2_1',              x: 500, y: 260, r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b2_2',              x: 500, y: 200, r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b2_3',              x: 500, y: 140, r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'mans_b2_4',              x: 500, y: 80,  r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── mans b3 (extending left) ──────────────────────────────────────
      { id: 'mans_b3_1',              x: 260, y: 500, r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'mans_b3_2',              x: 200, y: 500, r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'mans_b3_3',              x: 140, y: 500, r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'mans_b3_4',              x: 80,  y: 500, r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 90  },
      // ── mans b4 (extending downward) ──────────────────────────────────
      { id: 'mans_b4_1',              x: 500, y: 740, r: 35, label: '1 mans', shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'mans_b4_2',              x: 500, y: 800, r: 35, label: '2 mans', shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'mans_b4_3',              x: 500, y: 860, r: 35, label: '3 mans', shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'mans_b4_4',              x: 500, y: 920, r: 35, label: '4 mans', shape: MAIN_POSITION_SHAPE, direction: 0   },
      // ── vent b1 (upper-right diagonal, NE @ 45°) ─────────────────────────
      { id: 'vent_b1_1',              x: Math.round(500 + 50 + 124 * Math.cos(RAD_45)),  y: Math.round(500 - 50 - 124 * Math.sin(RAD_45)),  r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 225 },
      { id: 'vent_b1_2',              x: Math.round(500 + 50 + 184 * Math.cos(RAD_45)),  y: Math.round(500 - 50 - 184 * Math.sin(RAD_45)),  r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 225 },
      { id: 'vent_b1_3',              x: Math.round(500 + 50 + 244 * Math.cos(RAD_45)),  y: Math.round(500 - 50 - 244 * Math.sin(RAD_45)),  r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 225 },
      { id: 'vent_b1_4',              x: Math.round(500 + 50 + 304 * Math.cos(RAD_45)),  y: Math.round(500 - 50 - 304 * Math.sin(RAD_45)),  r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 225 },
      // ── vent b2 (upper-left diagonal, NW @ 135°) ───────────────────────────
      { id: 'vent_b2_1',              x: Math.round(500 - 50 + 124 * Math.cos(RAD_135)), y: Math.round(500 - 50 - 124 * Math.sin(RAD_135)), r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 135 },
      { id: 'vent_b2_2',              x: Math.round(500 - 50 + 184 * Math.cos(RAD_135)), y: Math.round(500 - 50 - 184 * Math.sin(RAD_135)), r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 135 },
      { id: 'vent_b2_3',              x: Math.round(500 - 50 + 244 * Math.cos(RAD_135)), y: Math.round(500 - 50 - 244 * Math.sin(RAD_135)), r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 135 },
      { id: 'vent_b2_4',              x: Math.round(500 - 50 + 304 * Math.cos(RAD_135)), y: Math.round(500 - 50 - 304 * Math.sin(RAD_135)), r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 135 },
      // ── vent b3 (lower-left diagonal, SW @ 225°) ───────────────────────────
      { id: 'vent_b3_1',              x: Math.round(500 - 50 + 124 * Math.cos(RAD_225)), y: Math.round(500 + 50 - 124 * Math.sin(RAD_225)), r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 45  },
      { id: 'vent_b3_2',              x: Math.round(500 - 50 + 184 * Math.cos(RAD_225)), y: Math.round(500 + 50 - 184 * Math.sin(RAD_225)), r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 45  },
      { id: 'vent_b3_3',              x: Math.round(500 - 50 + 244 * Math.cos(RAD_225)), y: Math.round(500 + 50 - 244 * Math.sin(RAD_225)), r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 45  },
      { id: 'vent_b3_4',              x: Math.round(500 - 50 + 304 * Math.cos(RAD_225)), y: Math.round(500 + 50 - 304 * Math.sin(RAD_225)), r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 45  },
      // ── vent b4 (lower-right diagonal, SE @ 315°) ──────────────────────────
      { id: 'vent_b4_1',              x: Math.round(500 + 50 + 124 * Math.cos(RAD_315)), y: Math.round(500 + 50 - 124 * Math.sin(RAD_315)), r: 35, label: '1 vent', shape: MAIN_POSITION_SHAPE, direction: 315 },
      { id: 'vent_b4_2',              x: Math.round(500 + 50 + 184 * Math.cos(RAD_315)), y: Math.round(500 + 50 - 184 * Math.sin(RAD_315)), r: 35, label: '2 vent', shape: MAIN_POSITION_SHAPE, direction: 315 },
      { id: 'vent_b4_3',              x: Math.round(500 + 50 + 244 * Math.cos(RAD_315)), y: Math.round(500 + 50 - 244 * Math.sin(RAD_315)), r: 35, label: '3 vent', shape: MAIN_POSITION_SHAPE, direction: 315 },
      { id: 'vent_b4_4',              x: Math.round(500 + 50 + 304 * Math.cos(RAD_315)), y: Math.round(500 + 50 - 304 * Math.sin(RAD_315)), r: 35, label: '4 vent', shape: MAIN_POSITION_SHAPE, direction: 315 },
      // ── lateral left b1 (SE, lower arm @ 315°) ─────────────────────────────────
      { id: 'lateral_left_b1_1',      x: Math.round(650 + 124 * Math.cos(RAD_315)), y: Math.round(500 - 124 * Math.sin(RAD_315)), r: 30, label: 'b1 left 1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'lateral_left_b1_2',      x: Math.round(650 + 204 * Math.cos(RAD_315)), y: Math.round(500 - 204 * Math.sin(RAD_315)), r: 30, label: 'b1 left 2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'lateral_left_b1_3',      x: Math.round(650 + 284 * Math.cos(RAD_315)), y: Math.round(500 - 284 * Math.sin(RAD_315)), r: 30, label: 'b1 left 3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0   },
      { id: 'lateral_left_b1_4',      x: Math.round(650 + 364 * Math.cos(RAD_315)), y: Math.round(500 - 364 * Math.sin(RAD_315)), r: 30, label: 'b1 left 4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0   },
      // ── lateral right b1 (NE, upper arm @ 45°) ─────────────────────────────────
      { id: 'lateral_right_b1_1',     x: Math.round(650 + 124 * Math.cos(RAD_45)),  y: Math.round(500 - 124 * Math.sin(RAD_45)),  r: 30, label: 'b1 right 1 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b1_2',     x: Math.round(650 + 204 * Math.cos(RAD_45)),  y: Math.round(500 - 204 * Math.sin(RAD_45)),  r: 30, label: 'b1 right 2 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b1_3',     x: Math.round(650 + 284 * Math.cos(RAD_45)),  y: Math.round(500 - 284 * Math.sin(RAD_45)),  r: 30, label: 'b1 right 3 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b1_4',     x: Math.round(650 + 364 * Math.cos(RAD_45)),  y: Math.round(500 - 364 * Math.sin(RAD_45)),  r: 30, label: 'b1 right 4 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── lateral left b2 (NE, right arm @ 45°) ─────────────────────────────────
      { id: 'lateral_left_b2_1',      x: Math.round(500 + 124 * Math.cos(RAD_45)),  y: Math.round(350 - 124 * Math.sin(RAD_45)),  r: 30, label: 'b2 left 1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_left_b2_2',      x: Math.round(500 + 204 * Math.cos(RAD_45)),  y: Math.round(350 - 204 * Math.sin(RAD_45)),  r: 30, label: 'b2 left 2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_left_b2_3',      x: Math.round(500 + 284 * Math.cos(RAD_45)),  y: Math.round(350 - 284 * Math.sin(RAD_45)),  r: 30, label: 'b2 left 3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      { id: 'lateral_left_b2_4',      x: Math.round(500 + 364 * Math.cos(RAD_45)),  y: Math.round(350 - 364 * Math.sin(RAD_45)),  r: 30, label: 'b2 left 4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 90 },
      // ── lateral right b2 (NW, left arm @ 135°) ─────────────────────────────────
      { id: 'lateral_right_b2_1',     x: Math.round(500 + 124 * Math.cos(RAD_135)), y: Math.round(350 - 124 * Math.sin(RAD_135)), r: 30, label: 'b2 right 1 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_right_b2_2',     x: Math.round(500 + 204 * Math.cos(RAD_135)), y: Math.round(350 - 204 * Math.sin(RAD_135)), r: 30, label: 'b2 right 2 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_right_b2_3',     x: Math.round(500 + 284 * Math.cos(RAD_135)), y: Math.round(350 - 284 * Math.sin(RAD_135)), r: 30, label: 'b2 right 3 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_right_b2_4',     x: Math.round(500 + 364 * Math.cos(RAD_135)), y: Math.round(350 - 364 * Math.sin(RAD_135)), r: 30, label: 'b2 right 4 lateral', shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── lateral left b3 (NW, upper arm @ 135°) ─────────────────────────────────
      { id: 'lateral_left_b3_1',      x: Math.round(350 + 124 * Math.cos(RAD_135)), y: Math.round(500 - 124 * Math.sin(RAD_135)), r: 30, label: 'b3 left 1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_left_b3_2',      x: Math.round(350 + 204 * Math.cos(RAD_135)), y: Math.round(500 - 204 * Math.sin(RAD_135)), r: 30, label: 'b3 left 2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_left_b3_3',      x: Math.round(350 + 284 * Math.cos(RAD_135)), y: Math.round(500 - 284 * Math.sin(RAD_135)), r: 30, label: 'b3 left 3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      { id: 'lateral_left_b3_4',      x: Math.round(350 + 364 * Math.cos(RAD_135)), y: Math.round(500 - 364 * Math.sin(RAD_135)), r: 30, label: 'b3 left 4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 0 },
      // ── lateral right b3 (SW, lower arm @ 225°) ─────────────────────────────────
      { id: 'lateral_right_b3_1',     x: Math.round(350 + 124 * Math.cos(RAD_225)), y: Math.round(500 - 124 * Math.sin(RAD_225)), r: 30, label: 'b3 right 1 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b3_2',     x: Math.round(350 + 204 * Math.cos(RAD_225)), y: Math.round(500 - 204 * Math.sin(RAD_225)), r: 30, label: 'b3 right 2 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b3_3',     x: Math.round(350 + 284 * Math.cos(RAD_225)), y: Math.round(500 - 284 * Math.sin(RAD_225)), r: 30, label: 'b3 right 3 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      { id: 'lateral_right_b3_4',     x: Math.round(350 + 364 * Math.cos(RAD_225)), y: Math.round(500 - 364 * Math.sin(RAD_225)), r: 30, label: 'b3 right 4 lateral', shape: MAIN_POSITION_SHAPE, direction: 180 },
      // ── lateral left b4 (SW, left arm @ 225°) ─────────────────────────────────
      { id: 'lateral_left_b4_1',      x: Math.round(500 + 124 * Math.cos(RAD_225)), y: Math.round(650 - 124 * Math.sin(RAD_225)), r: 30, label: 'b4 left 1 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b4_2',      x: Math.round(500 + 204 * Math.cos(RAD_225)), y: Math.round(650 - 204 * Math.sin(RAD_225)), r: 30, label: 'b4 left 2 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b4_3',      x: Math.round(500 + 284 * Math.cos(RAD_225)), y: Math.round(650 - 284 * Math.sin(RAD_225)), r: 30, label: 'b4 left 3 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      { id: 'lateral_left_b4_4',      x: Math.round(500 + 364 * Math.cos(RAD_225)), y: Math.round(650 - 364 * Math.sin(RAD_225)), r: 30, label: 'b4 left 4 lateral',  shape: MAIN_POSITION_SHAPE, direction: 270 },
      // ── lateral right b4 (SE, right arm @ 315°) ─────────────────────────────────
      { id: 'lateral_right_b4_1',     x: Math.round(500 + 124 * Math.cos(RAD_315)), y: Math.round(650 - 124 * Math.sin(RAD_315)), r: 30, label: 'b4 right 1 lateral', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'lateral_right_b4_2',     x: Math.round(500 + 204 * Math.cos(RAD_315)), y: Math.round(650 - 204 * Math.sin(RAD_315)), r: 30, label: 'b4 right 2 lateral', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'lateral_right_b4_3',     x: Math.round(500 + 284 * Math.cos(RAD_315)), y: Math.round(650 - 284 * Math.sin(RAD_315)), r: 30, label: 'b4 right 3 lateral', shape: MAIN_POSITION_SHAPE, direction: 90  },
      { id: 'lateral_right_b4_4',     x: Math.round(500 + 364 * Math.cos(RAD_315)), y: Math.round(650 - 364 * Math.sin(RAD_315)), r: 30, label: 'b4 right 4 lateral', shape: MAIN_POSITION_SHAPE, direction: 90  },
      // ── taps b1 ───────────────────────────────────────────────────────
      { id: 'tap_right_b1_1',         x: 910, y: 410, r: R_petita, label: '1 tap',                direction: 250 },
      { id: 'tap_right_b1_2',         x: 950, y: 390, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 250 },
      { id: 'tap_left_b1_1',          x: 910, y: 590, r: R_petita, label: '1 tap',                direction: 285 },
      { id: 'tap_left_b1_2',          x: 950, y: 610, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 290 },
      // ── taps b2 ───────────────────────────────────────────────────────
      { id: 'tap_left_b2_1',          x: 590, y: 90, r: R_petita,  label: '1 tap',                direction: 200 },
      { id: 'tap_left_b2_2',          x: 610, y: 50, r: 30,        label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 200 },
      { id: 'tap_right_b2_1',         x: 410, y: 90, r: R_petita,  label: '1 tap',                direction: 160 },
      { id: 'tap_right_b2_2',         x: 390, y: 50, r: 30,        label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 160 },
      // ── taps b3 ───────────────────────────────────────────────────────
      { id: 'tap_left_b3_1',          x: 90, y: 410, r: R_petita,  label: '1 tap',                direction: 110 },
      { id: 'tap_left_b3_2',          x: 50, y: 390, r: 30,        label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 110 },
      { id: 'tap_right_b3_1',         x: 90, y: 590, r: R_petita,  label: '1 tap',                direction: 70  },
      { id: 'tap_right_b3_2',         x: 50, y: 610, r: 30,        label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 70  },
      // ── taps b4 ───────────────────────────────────────────────────────
      { id: 'tap_left_b4_1',          x: 410, y: 910, r: R_petita, label: '1 tap',                direction: 20  },
      { id: 'tap_left_b4_2',          x: 390, y: 950, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 20  },
      { id: 'tap_right_b4_1',         x: 590, y: 910, r: R_petita, label: '1 tap',                direction: 340 },
      { id: 'tap_right_b4_2',         x: 610, y: 950, r: 30,       label: '2 tap', shape: MAIN_POSITION_SHAPE, direction: 340 },
    ],
  },
}
