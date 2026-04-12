<script setup>
import { ref } from 'vue'
import PinyaTopView from './PinyaTopView.vue'
import TroncSideView from './TroncSideView.vue'

const props = defineProps({
  formation: { type: Object, required: true },
  assignments: { type: Object, required: true },
  title: { type: String, default: '' },
})

const emit = defineEmits(['assign', 'unassign'])

const troncOpen = ref(true)
</script>

<template>
  <div class="canvas-wrapper">
    <h2 v-if="title" class="formation-title">{{ title }}</h2>

    <button
      class="tronc-toggle"
      @click="troncOpen = !troncOpen"
      :title="troncOpen ? 'Amaga el tronc' : 'Mostra el tronc'"
    >{{ troncOpen ? '▶' : '◀' }}</button>

    <div class="views-row">
      <PinyaTopView
        class="view-pinya"
        :positions="formation.pinyaPositions"
        :assignments="assignments"
        @assign="(id, name) => emit('assign', id, name)"
        @unassign="id => emit('unassign', id)"
      />

      <div class="tronc-wrapper" :class="{ collapsed: !troncOpen }">
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
  position: relative;
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

.tronc-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: calc(33.33% + 2px);   /* matches flex: 1 out of pinya(2)+tronc(1) */
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.25s ease;
}

.tronc-wrapper.collapsed {
  width: 0;
}

.tronc-toggle {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 12px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.tronc-toggle:hover {
  opacity: 1;
  background: var(--color-surface);
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
