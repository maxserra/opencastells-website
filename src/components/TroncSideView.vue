<script setup>
import { computed } from 'vue'
import PositionSlot from './PositionSlot.vue'

const props = defineProps({
  positions: { type: Array, required: true },
  assignments: { type: Object, required: true },
})

defineEmits(['assign', 'unassign'])

const viewBox = computed(() => {
  if (!props.positions?.length) return '0 0 800 1000'
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const pos of props.positions) {
    minX = Math.min(minX, pos.x - pos.r)
    maxX = Math.max(maxX, pos.x + pos.r)
    minY = Math.min(minY, pos.y - pos.r)
    maxY = Math.max(maxY, pos.y + pos.r)
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
      <PositionSlot
        v-for="pos in positions"
        :key="pos.id"
        :position="pos"
        :casteller="assignments[pos.id] ?? null"
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
