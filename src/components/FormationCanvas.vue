<script setup>
import PinyaTopView from './PinyaTopView.vue'
import TroncSideView from './TroncSideView.vue'

const props = defineProps({
  formation: { type: Object, required: true },
  assignments: { type: Object, required: true },
  title: { type: String, default: '' },
})

const emit = defineEmits(['assign', 'unassign'])
</script>

<template>
  <div class="canvas-wrapper">
    <h2 v-if="title" class="formation-title">{{ title }}</h2>

    <div class="views-row">
      <PinyaTopView
        class="view-pinya"
        :positions="formation.pinyaPositions"
        :assignments="assignments"
        @assign="(id, name) => emit('assign', id, name)"
        @unassign="id => emit('unassign', id)"
      />

      <div class="divider" />

      <TroncSideView
        class="view-tronc"
        :positions="formation.troncPositions"
        :assignments="assignments"
        @assign="(id, name) => emit('assign', id, name)"
        @unassign="id => emit('unassign', id)"
      />
    </div>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5rem;
  gap: 1rem;
  overflow: auto;
}

.formation-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
}

.views-row {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1rem;
}

.divider {
  width: 2px;
  align-self: stretch;
  background: var(--color-border);
  flex-shrink: 0;
}

/* pinya is wider (top-down square-ish), tronc is narrower (tall portrait) */
.view-pinya { flex: 2; }
.view-tronc { flex: 1; }
</style>
