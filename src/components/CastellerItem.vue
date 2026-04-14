<script setup>
const props = defineProps({
  id:       { type: String, required: true },
  name:     { type: String, required: true },
  assigned: { type: Boolean, default: false },
})

function onDragStart(e) {
  if (props.assigned) return
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id)
  e.dataTransfer.effectAllowed = 'move'
}
</script>

<template>
  <li
    class="casteller-item"
    :class="{ assigned }"
    :data-id="id"
    :draggable="!assigned"
    @dragstart="onDragStart"
  >
    {{ name }}
  </li>
</template>

<style scoped>
.casteller-item {
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius);
  cursor: grab;
  user-select: none;
  font-size: 0.95rem;
  transition: background 0.1s;
  flex-shrink: 0;
}

.casteller-item:hover {
  background: var(--color-position-empty);
}

.casteller-item.assigned {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}

.casteller-item:active {
  cursor: grabbing;
}
</style>
