<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  position: { type: Object, required: true }, // { id, x, y, r, label, shape?, direction? }
  casteller: { type: String, default: null },  // resolved casteller name (or null)
})

const isRect = computed(() => props.position.shape === 'rect')

// Split casteller into [firstName, surname(s)] for two-line display
const castellerLines = computed(() => {
  if (!props.casteller) return []
  const parts = props.casteller.trim().split(/\s+/)
  if (parts.length <= 1) return [props.casteller]
  return [parts[0], parts.slice(1).join(' ')]
})

// Scale font size so the longest line fits within the slot's usable width.
// Rect slots have a wider face (r*2.8); circles use diameter (r*2).
// ~0.58 is a good average char-width / font-size ratio for the sans-serif used.
const dynamicFontSize = computed(() => {
  const r = props.position.r
  const usableWidth = isRect.value ? r * 2.4 : r * 1.75
  const lines = props.casteller ? castellerLines.value : [props.position.label ?? '']
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
      :class="['slot-rect', casteller ? 'filled' : 'empty', { hovering: dragOver }]"
    />
    <!-- Circle shape (default) -->
    <circle
      v-else
      :cx="position.x"
      :cy="position.y"
      :r="position.r"
      :class="['slot-circle', casteller ? 'filled' : 'empty', { hovering: dragOver }]"
    />
    <!-- Label / casteller name -->
    <text
      :x="position.x"
      :y="position.y"
      text-anchor="middle"
      dominant-baseline="middle"
      :transform="isRect ? `rotate(${textRotation}, ${position.x}, ${position.y})` : undefined"
      :class="['slot-text', casteller ? 'filled-text' : 'empty-text']"
      :font-size="dynamicFontSize"
    >
      <template v-if="casteller && castellerLines.length > 1">
        <tspan :x="position.x" dy="-0.55em">{{ castellerLines[0] }}</tspan>
        <tspan :x="position.x" dy="1.1em">{{ castellerLines[1] }}</tspan>
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
.slot-rect {
  stroke: var(--color-position-stroke);
  stroke-width: 2;
  transition: fill 0.15s;
}

.slot-circle.empty,
.slot-rect.empty {
  fill: var(--color-position-empty);
}

.slot-circle.filled,
.slot-rect.filled {
  fill: var(--color-position-filled);
}

.slot-circle.hovering,
.slot-rect.hovering {
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

.empty-text {
  fill: var(--color-text-muted);
}
</style>
