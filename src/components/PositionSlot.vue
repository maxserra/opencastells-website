<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  position: { type: Object, required: true }, // { id, x, y, r, label, shape?, direction? }
  casteller: { type: String, default: null },  // resolved casteller name (or null)
})

const isRect = computed(() => props.position.shape === 'rect')

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
      :transform="`rotate(${position.direction}, ${position.x}, ${position.y})`"
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
    >
      {{ casteller ? casteller.split(' ')[0] : position.label }}
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
  font-size: 11px;
  pointer-events: none;
  user-select: none;
}

.filled-text {
  fill: var(--color-position-filled-text);
  font-weight: 600;
}

.empty-text {
  fill: var(--color-text-muted);
  font-size: 10px;
}
</style>
