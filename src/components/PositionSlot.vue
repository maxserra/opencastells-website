<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  position: { type: Object, required: true }, // { id, x, y, r, label, shape?, direction? }
  casteller: { type: String, default: null },  // resolved casteller name (or null)
  highlighted: { type: Boolean, default: false },
})

const isRect = computed(() => props.position.shape === 'rect')
const isTrapezoid = computed(() => props.position.shape === 'trapezoid')

// Trapezoid path with rounded corners via quadratic Bézier.
// Placing the control point at the corner and start/end points on the edges
// guarantees the curve is tangent to both edges — no arc sweep ambiguity.
const trapezoidPath = computed(() => {
  const r = props.position.r
  const radius = 4

  const corners = [
    { x: -r * 1.2, y:  r * 0.8 },  // bottom-left
    { x:  r * 1.2, y:  r * 0.8 },  // bottom-right
    { x:  r * 0.8, y: -r * 0.8 },  // top-right
    { x: -r * 0.8, y: -r * 0.8 },  // top-left
  ]

  const n = corners.length
  let path = ''

  for (let i = 0; i < n; i++) {
    const curr = corners[i]
    const prev = corners[(i - 1 + n) % n]
    const next = corners[(i + 1) % n]

    // Unit vectors along the incoming and outgoing edges
    const dIn  = { x: curr.x - prev.x, y: curr.y - prev.y }
    const dOut = { x: next.x - curr.x, y: next.y - curr.y }
    const lenIn  = Math.sqrt(dIn.x  ** 2 + dIn.y  ** 2)
    const lenOut = Math.sqrt(dOut.x ** 2 + dOut.y ** 2)
    const uIn  = { x: dIn.x  / lenIn,  y: dIn.y  / lenIn  }
    const uOut = { x: dOut.x / lenOut, y: dOut.y / lenOut }

    // Points on the edges, radius away from the corner — these are the Bézier anchors
    const p1 = { x: curr.x - uIn.x  * radius, y: curr.y - uIn.y  * radius }
    const p2 = { x: curr.x + uOut.x * radius, y: curr.y + uOut.y * radius }

    if (i === 0) {
      path += `M ${p1.x} ${p1.y} `
    } else {
      path += `L ${p1.x} ${p1.y} `
    }
    // Quadratic Bézier: control point at corner, end at p2
    path += `Q ${curr.x} ${curr.y} ${p2.x} ${p2.y} `
  }

  return path + 'Z'
})

// Split casteller into [firstName, surname(s)] for two-line display
const castellerLines = computed(() => {
  if (!props.casteller) return []
  const parts = props.casteller.trim().split(/\s+/)
  if (parts.length <= 1) return [props.casteller]
  return [parts[0], parts.slice(1).join(' ')]
})

// Split position label by \n for multi-line display
const labelLines = computed(() => {
  const label = props.position.label ?? ''
  return label.split('\n').filter(l => l)
})

// Scale font size so the longest line fits within the slot's usable width.
// Rect slots have a wider face (r*2.8); trapezoid uses bottom width (r*2.8); circles use diameter (r*2).
// ~0.58 is a good average char-width / font-size ratio for the sans-serif used.
const dynamicFontSize = computed(() => {
  const r = props.position.r
  const usableWidth = (isRect.value || isTrapezoid.value) ? r * 2.4 : r * 1.75
  let lines
  if (props.casteller) {
    lines = castellerLines.value
  } else {
    lines = labelLines.value
  }
  const isTwoLine = lines.length > 1
  const baseSize = isTwoLine ? 9 : 11
  const longestChars = Math.max(...lines.map(l => l.length))
  const fitSize = usableWidth / (longestChars * 0.58)
  return Math.min(baseSize, Math.max(6, fitSize))
})

// Text rotation along direction, corrected so it never renders upside-down
const textRotation = computed(() => {
  let d = (props.position.direction ?? 0) % 360
  if (d > 90 && d <= 270) d -= 180
  return d
})

const emit = defineEmits(['assign', 'unassign'])

const dragOver = ref(false)

function onDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
}

function onDrop(e) {
  e.preventDefault()
  dragOver.value = false
  const castellerId = e.dataTransfer.getData('text/plain')
  if (castellerId) emit('assign', props.position.id, castellerId)
}

function onDblClick() {
  if (props.casteller) emit('unassign', props.position.id)
}
</script>

<template>
  <g
    class="position-slot"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dblclick="onDblClick"
  >
    <!-- Rectangle shape for baixos (has direction) -->
    <rect
      v-if="isRect"
      :x="position.x - position.r * 1.4"
      :y="position.y - position.r * 0.8"
      :width="position.r * 2.8"
      :height="position.r * 1.6"
      :rx="4"
      :transform="`rotate(${position.direction ?? 0}, ${position.x}, ${position.y})`"
      :class="['slot-rect', casteller ? 'filled' : 'empty', { hovering: dragOver, highlighted }]"
    />
    <!-- Trapezoid shape (wider bottom, narrower top, rounded corners) -->
    <path
      v-else-if="isTrapezoid"
      :d="trapezoidPath"
      :transform="`translate(${position.x}, ${position.y}) rotate(${position.direction ?? 0})`"
      :class="['slot-path', casteller ? 'filled' : 'empty', { hovering: dragOver, highlighted }]"
    />
    <!-- Circle shape (default) -->
    <circle
      v-else
      :cx="position.x"
      :cy="position.y"
      :r="position.r"
      :class="['slot-circle', casteller ? 'filled' : 'empty', { hovering: dragOver, highlighted }]"
    />
    <!-- Label / casteller name -->
    <text
      :x="position.x"
      :y="position.y"
      text-anchor="middle"
      dominant-baseline="middle"
      :transform="(isRect || isTrapezoid) ? `rotate(${textRotation}, ${position.x}, ${position.y})` : undefined"
      :class="['slot-text', casteller ? 'filled-text' : 'empty-text']"
      :font-size="dynamicFontSize"
    >
      <template v-if="casteller && castellerLines.length > 1">
        <tspan :x="position.x" dy="-0.55em">{{ castellerLines[0] }}</tspan>
        <tspan :x="position.x" dy="1.1em">{{ castellerLines[1] }}</tspan>
      </template>
      <template v-else-if="!casteller && labelLines.length > 1">
        <tspan v-for="(line, i) in labelLines" :key="i" :x="position.x" :dy="i === 0 ? '-0.55em' : '1.1em'">{{ line }}</tspan>
      </template>
      <template v-else>{{ casteller ? castellerLines[0] : position.label }}</template>
    </text>
  </g>
</template>

<style scoped>
.position-slot {
  cursor: pointer;
}

.slot-circle,
.slot-rect,
.slot-path {
  stroke: var(--color-position-stroke);
  stroke-width: 2;
  transition: fill 0.15s;
}

.slot-circle.empty,
.slot-rect.empty,
.slot-path.empty {
  fill: var(--color-position-empty);
}

.slot-circle.filled,
.slot-rect.filled,
.slot-path.filled {
  fill: var(--color-position-filled);
}

.slot-circle.hovering,
.slot-rect.hovering,
.slot-path.hovering {
  fill: var(--color-position-hover);
}

.slot-text {
  font-family: var(--font-family);
  pointer-events: none;
  user-select: none;
}

.filled-text {
  fill: var(--color-position-filled-text);
  font-weight: 600;
}

.slot-circle.highlighted,
.slot-rect.highlighted,
.slot-path.highlighted {
  stroke: #f00000;
  stroke-width: 3.5;
}

.empty-text {
  fill: var(--color-text-muted);
}
</style>
