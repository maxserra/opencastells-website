<script setup>
import { computed } from 'vue'
import PositionSlot from './PositionSlot.vue'

const props = defineProps({
  positions: { type: Array, required: true },
  assignments: { type: Object, required: true },
  highlightedPositionIds: { type: Object, default: () => new Set() },
  separator: { type: Object, default: null },
})

defineEmits(['assign', 'unassign'])

const viewBox = computed(() => {
  if (!props.positions?.length) return '0 0 800 1000'
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const pos of props.positions) {
    const extent = (pos.shape === 'rect' || pos.shape === 'trapezoid') ? pos.r * 1.4 : pos.r
    minX = Math.min(minX, pos.x - extent)
    maxX = Math.max(maxX, pos.x + extent)
    minY = Math.min(minY, pos.y - extent)
    maxY = Math.max(maxY, pos.y + extent)
  }
  const pad = 40
  return `${Math.floor(minX - pad)} ${Math.floor(minY - pad)} ${Math.ceil(maxX - minX + pad * 2)} ${Math.ceil(maxY - minY + pad * 2)}`
})
</script>

<template>
  <div class="view-wrapper">
    <p class="view-label">Tronc · vista de costat</p>
    <svg
      class="view-svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
    >
      <line
        v-if="separator !== null"
        :x1="separator.x" :y1="separator.y1"
        :x2="separator.x" :y2="separator.y2"
        class="tronc-separator"
      />
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

.tronc-separator {
  stroke: var(--color-border);
  stroke-width: 2;
  stroke-dasharray: 6 4;
}
</style>
