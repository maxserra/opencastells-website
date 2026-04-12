<script setup>
import { computed, onMounted } from 'vue'
import TheSidebar from './components/TheSidebar.vue'
import FormationCanvas from './components/FormationCanvas.vue'
import { useFormation } from './composables/useFormation.js'
import { useRoster } from './composables/useRoster.js'
import { pushStateToHash, readStateFromHash } from './composables/useShareableUrl.js'

const {
  baixosCount,
  floorCount,
  title,
  assignments,
  currentFormation,
  BAIXOS_OPTIONS,
  FLOOR_OPTIONS,
  setBaixosCount,
  setFloorCount,
  assign,
  unassign,
  clearAssignments,
  unassignCasteller,
  getState,
  loadState,
} = useFormation()

const {
  roster,
  addCasteller,
  removeCasteller,
  renameCasteller,
  clearRoster,
  importCsv,
  exportCsv,
} = useRoster()

/**
 * Resolve positionId → casteller name for display.
 * FormationCanvas and PositionSlot see resolved names, never IDs.
 */
const resolvedAssignments = computed(() => {
  const idToName = Object.fromEntries(roster.value.map(c => [c.id, c.name]))
  const result = {}
  for (const [posId, cId] of Object.entries(assignments.value)) {
    if (idToName[cId] !== undefined) result[posId] = idToName[cId]
  }
  return result
})

// ── Handlers ──────────────────────────────────────────────────────────────────

function handleRemoveCasteller(id) {
  unassignCasteller(id)
  removeCasteller(id)
}

function handleClearRoster() {
  clearAssignments()
  clearRoster()
}

function handleExportCsv() {
  const csv = exportCsv()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = 'castellers.csv'
  a.click()
  URL.revokeObjectURL(a.href)
}

async function share() {
  await pushStateToHash({ ...getState(), roster: roster.value })
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Enllaç copiat al porta-retalls!')
  } catch {
    prompt('Copia aquest enllaç:', window.location.href)
  }
}

// ── Restore from URL hash on load ─────────────────────────────────────────────

onMounted(async () => {
  const state = await readStateFromHash()
  if (state) {
    loadState(state)
    if (state.roster) roster.value = state.roster
  }
})
</script>

<template>
  <div class="app-layout">
    <TheSidebar
      :baixos-count="baixosCount"
      :floor-count="floorCount"
      :baixos-options="BAIXOS_OPTIONS"
      :floor-options="FLOOR_OPTIONS"
      :title="title"
      :roster="roster"
      :assignments="assignments"
      @update:baixos-count="setBaixosCount"
      @update:floor-count="setFloorCount"
      @update:title="title = $event"
      @add-casteller="addCasteller"
      @remove-casteller="handleRemoveCasteller"
      @rename-casteller="({ id, newName }) => renameCasteller(id, newName)"
      @import-csv="importCsv"
      @export-csv="handleExportCsv"
      @clear-roster="handleClearRoster"
      @clear-assignments="clearAssignments"
      @share="share"
    />
    <main class="main-area">
      <FormationCanvas
        :formation="currentFormation"
        :assignments="resolvedAssignments"
        :title="title"
        @assign="assign"
        @unassign="unassign"
      />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100%;
  width: 100%;
}

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
