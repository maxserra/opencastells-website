<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import TheSidebar from './components/TheSidebar.vue'
import FormationCanvas from './components/FormationCanvas.vue'
import { useFormation } from './composables/useFormation.js'
import { useRoster } from './composables/useRoster.js'
import { pushStateToHash, readStateFromHash } from './composables/useShareableUrl.js'
import { domToPng } from 'modern-screenshot'

const canvasRef = ref(null)

const {
  baixosCount,
  floorCount,
  title,
  assignments,
  currentFormation,
  BAIXOS_OPTIONS,
  BAIXOS_LABELS,
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

const fileName = (ext) => (title.value?.trim() || 'castell') + '.' + ext

function triggerDownload(url, name) {
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
}

function handleRemoveCasteller(id) {
  unassignCasteller(id)
  removeCasteller(id)
}

function handleClearRoster() {
  clearAssignments()
  clearRoster()
}

function handleExportCsv() {
  const url = URL.createObjectURL(new Blob([exportCsv()], { type: 'text/csv' }))
  triggerDownload(url, 'castellers.csv')
  URL.revokeObjectURL(url)
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

async function handleExportPng() {
  if (!canvasRef.value) return
  try {
    const el   = canvasRef.value
    const scale = 4800 / el.getBoundingClientRect().width
    const url = await domToPng(el, {
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#f5f0eb',
      scale,
    })
    triggerDownload(url, fileName('png'))
  } catch (err) {
    alert('No s\'ha pogut exportar la imatge.')
    console.error(err)
  }
}

function handleExportJson() {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ ...getState(), roster: roster.value }, null, 2)], { type: 'application/json' }))
  triggerDownload(url, fileName('json'))
  URL.revokeObjectURL(url)
}

// ── Restore from URL hash on load ─────────────────────────────────────────────

onMounted(async () => {
  const state = await readStateFromHash()
  if (state) {
    loadState(state)
    if (state.roster) roster.value = state.roster
  }
})

const sidebarOpen = ref(true)
const search = ref('')

// Feature 1: sync browser tab title with formation title
watchEffect(() => {
  document.title = title.value?.trim()
    ? `${title.value.trim()} – OpenCastells`
    : 'OpenCastells'
})

// Feature 2: position IDs whose casteller matches the current search
const highlightedPositionIds = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return new Set()
  const matchingIds = new Set(
    roster.value.filter(c => c.name.toLowerCase().includes(q)).map(c => c.id)
  )
  const posIds = new Set()
  for (const [posId, cId] of Object.entries(assignments.value)) {
    if (matchingIds.has(cId)) posIds.add(posId)
  }
  return posIds
})
</script>

<template>
  <div class="app-layout">
    <div class="sidebar-wrapper" :class="{ collapsed: !sidebarOpen }">
    <TheSidebar
      :baixos-count="baixosCount"
      :floor-count="floorCount"
      :baixos-options="BAIXOS_OPTIONS"
      :baixos-labels="BAIXOS_LABELS"
      :floor-options="FLOOR_OPTIONS"
      :title="title"
      :roster="roster"
      :assignments="assignments"
      :search="search"
      @update:baixos-count="setBaixosCount"
      @update:floor-count="setFloorCount"
      @update:title="title = $event"
      @update:search="search = $event"
      @add-casteller="addCasteller"
      @remove-casteller="handleRemoveCasteller"
      @rename-casteller="({ id, newName }) => renameCasteller(id, newName)"
      @import-csv="importCsv"
      @export-csv="handleExportCsv"
      @clear-roster="handleClearRoster"
      @clear-assignments="clearAssignments"
      @share="share"
      @export-png="handleExportPng"
      @export-json="handleExportJson"
    />
    </div>
    <main class="main-area" ref="canvasRef">
      <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen" :title="sidebarOpen ? 'Amaga la barra' : 'Mostra la barra'">{{ sidebarOpen ? '◀' : '▶' }}</button>
      <FormationCanvas
        :formation="currentFormation"
        :assignments="resolvedAssignments"
        :title="title"
        :highlighted-position-ids="highlightedPositionIds"
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

.sidebar-wrapper {
  width: var(--sidebar-width);
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.25s ease;
}

.sidebar-wrapper.collapsed {
  width: 0;
}

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

.sidebar-toggle {
  position: absolute;
  top: 8px;
  left: 8px;
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

.sidebar-toggle:hover {
  opacity: 1;
  background: var(--color-surface);
}
</style>
