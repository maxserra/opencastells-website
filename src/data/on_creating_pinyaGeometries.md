# On Creating pinyaGeometries

Knowledge accumulated from working with `pinyaGeometries.js` — what the system does, what the user means, and what seems to work but is not fully confirmed.

---

## 1. The Environment and How It Behaves

### Coordinate Space
- 1000×1000 unit grid. Visual centre is approximately (500, 500).
- **Y-axis points downward** (standard SVG). This is critical: 0° in SVG math is "right", and angles increase clockwise.
- The SVG viewBox is computed automatically from the bounding box of all positions, so coordinates can go outside 500±anything freely.

### The `direction` Field
- Applied as `rotate(direction, x, y)` in SVG via `PositionSlot.vue`.
- **Convention confirmed by the user**:
  - 0° = facing upward (toward low y)
  - 90° = facing right (toward high x)
  - 180° = facing downward (toward high y)
  - 270° = facing left (toward low x)
- This is **NOT** standard math convention (where 0° = right, 90° = up). When computing positions with `Math.cos`/`Math.sin`, angles follow standard JS/SVG math (0° = right, 90° = down). The `direction` field is only a rendering hint and does not affect `x`/`y` computation.

### Text Rotation in PositionSlot.vue
- If `direction > 90 && direction <= 270`, the label text is rotated an extra 180° to avoid rendering upside-down.

### Shape Types
- `shape: 'rect'` renders a rectangle. Width = `r * 2.8`, height = `r * 1.6`.
- No `shape` field = circle of radius `r`.
- Baixos and named roles (agulla, contrafort, laterals, mans) use `shape: 'rect'`.
- Crossos and first taps are circles; second taps are rects.

### Constants
- `R = 63` — default circle radius
- `CX = CY = 500` — canvas centre
- `RAD_*` constants convert degrees to radians for trig: `const RAD_60 = (60 * Math.PI) / 180`

### Trigonometry Convention
When placing a position at angle `θ` (in standard SVG math, 0=right, 90=down) from a base point `(bx, by)` at distance `d`:
```js
x = Math.round(bx + d * Math.cos(RAD_θ))
y = Math.round(by + d * Math.sin(RAD_θ))
```

For placing agulla **in front of** (in the facing direction of) a baix, the pattern the user settled on is:
```js
// agulla: perpendicular offset using sin/cos swap + sign flip
x = bx + d * Math.sin(RAD_facing)
y = by - d * Math.cos(RAD_facing)
```
This places the agulla in the direction the baix is facing (matching the `direction` field convention where 0=up).

For contrafort (behind the baix), the user uses standard `cos`/`sin` with the opposite angle:
```js
x = bx + d * Math.cos(RAD_opposite)
y = by + d * Math.sin(RAD_opposite)
```
Where `opposite = facing + 180°` (or equivalently a RAD constant for that angle).

---

## 2. What the User Asks For and What They Mean

### "Direction" of a Shape
When the user says "b2 has direction 60", they mean **the shape faces 60°** in their convention (0=up, 90=right, 180=down, 270=left). They do NOT mean it extends toward 60°. The mans extend **backwards** (opposite direction from facing), the agulla is placed **in front** (in facing direction), and contrafort is placed **behind**.

### Laterals: ±90° Rule
- **Right laterals** face at `baix_direction - 90°`
- **Left laterals** face at `baix_direction + 90°`
- This is universal across all baixos counts. The 2-baixos case appeared to use 0°/180° only because b1 faces 90° and b2 faces 270° — coincidentally mapping to ±90° giving 0°/180°. It was NOT a special rule.

### Mans Extend Backwards
Mans extend in the **opposite** direction from the baix's facing direction. For a baix facing 60°, mans go toward ~150°-210° (confirmed experimentally as 150° worked best).

### Spacing Pattern (from 1-baix and 2-baixos)
Extracted from working geometry:
- **Agulla**: 60 units from baix center, in front
- **Contrafort**: 60 units from baix center, behind
- **Mans**: start ~70 units past contrafort (i.e., ~130 units from baix), then spaced **60 units apart** from each other
  - mans_1: baix + 120 in backward direction
  - mans_2: baix + 180
  - mans_3: baix + 240
  - mans_4: baix + 300

### Vents
Vents are perpendicular to the mans direction — they go "sideways" from the baix. For 2-baixos: between b1 and b2, going up/down from the midpoint. For 3-baixos: one vent arm per gap between baixos. Spacing not yet fully parametrized.

### "Stay in Focus"
The user wants minimal scope changes. Only update what was explicitly requested; don't fix adjacent things speculatively.

### Iterative Corrections
The user prefers fast iterations over perfect first shots. Expect to get an angle wrong (e.g., 210° vs 150°) and correct it — that's part of the workflow.

---

## 3. Assumptions That Worked But Are Not Fully Confirmed

### 3 Baixos Baix Positions
- b1 at (500, 405), b2 at (420, 547), b3 at (581, 547)
- These form an equilateral triangle — spacing ~162 units — but the exact positions were taken from earlier SVG work and not re-derived. They appear correct visually.

### Direction of b1 in 3-baixos
- b1 faces 180° (downward). This was set in a previous session and not questioned. Could be 0° (upward) — unclear which is canonical.
- b2 faces 60°, b3 faces 300° — these form a symmetric 120° rotation pattern.

### Mans Extension Angles for 3-baixos
- b2 mans extend at 150° (not 120°, 60°, or 240° — all tried). 150° looks correct visually.
- b3 mans extend at 30° (mirror of b2). Consistent with 150° + 180° = 330°, or rather the symmetric counterpart.
- These were found empirically. The "clean" angle would be 150° = 60° + 90° (facing + 90°), which matches a perpendicular-backward interpretation.

### Crossa Positions
- Crossos were placed at ±90° from each baix at ~60 units, which seemed visually right but were not re-derived from spacing rules. They may need adjustment.

### Vent Angles and Positions for 3-baixos
- Currently hardcoded at approximate positions. The direction values (120°, 0°, 240°) look like they correspond to the perpendicular of each baix gap. Not yet parametrized.

### 4 Baixos Vent Directions
- Vents at 225°/135°/45°/315° (diagonal). These are at 45° between each pair of arms, which is geometrically correct for a cross layout. Assumed but visually plausible.

### Lateral Positions (x, y) in 3-baixos
- The lateral `x,y` positions were kept from the previous hardcoded implementation and only the `direction` field was corrected. The positions may be slightly off from the ideally parametrized locations.

### Tap Angles
- Taps use freehand direction values (e.g., 60°, 120°, 195°, etc.) that were not derived systematically. They appear to point toward the baix they support, but the exact angles were set manually.
