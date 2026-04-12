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
  padding: 0.35rem 0.6rem;
  border-radius: var(--radius);
  cursor: grab;
  user-select: none;
  font-size: 0.88rem;
  transition: background 0.1s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
