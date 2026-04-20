<script setup>
import { computed } from 'vue'
import PositionSlot from './PositionSlot.vue'

const props = defineProps({
  positions: { type: Array, required: true },
  assignments: { type: Object, required: true },
  highlightedPositionIds: { type: Object, default: () => new Set() },
})

defineEmits(['assign', 'unassign'])

const viewBox = computed(() => {
  if (!props.positions?.length) return '0 0 320 320'

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const pos of props.positions) {
    const r = pos.r ?? 0
    const isRect = pos.shape === 'rect'
    const isTrapezoid = pos.shape === 'trapezoid'
    const w = (isRect || isTrapezoid) ? r * 2.8 : r * 2
    const h = (isRect || isTrapezoid) ? r * 1.6 : r * 2
    const extent = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2) // conservative for rotated rects and trapezoids

    minX = Math.min(minX, pos.x - extent)
    maxX = Math.max(maxX, pos.x + extent)
    minY = Math.min(minY, pos.y - extent)
    maxY = Math.max(maxY, pos.y + extent)
  }

  const pad = 12
  const x = Math.floor(minX - pad)
  const y = Math.floor(minY - pad)
  const w = Math.ceil((maxX - minX) + pad * 2)
  const h = Math.ceil((maxY - minY) + pad * 2)
  return `${x} ${y} ${w} ${h}`
})
</script>

<template>
  <div class="view-wrapper">
    <p class="view-label">Pinya · vista des de dalt</p>
    <svg
      class="view-svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
    >
      <PositionSlot
        v-for="pos in positions"
        :key="pos.id"
        :position="pos"
        :casteller="assignments[pos.id] ?? null"
        :highlighted="highlightedPositionIds.has(pos.id)"
        @assign="(id, name) => $emit('assign', id, name)"
        @unassign="id => $emit('unassign', id)"
      />
    </svg>
  </div>
</template>

<style scoped>
.view-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
}

.view-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-muted);
  text-align: center;
}

.view-svg {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
}
</style>
