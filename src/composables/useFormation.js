import { ref, computed } from 'vue'
import { buildFormation, BAIXOS_OPTIONS, BAIXOS_LABELS, FLOOR_OPTIONS } from '../data/troncFormations.js'

/**
 * Manages the two formation parameters and per-position casteller assignments.
 */
export function useFormation() {
  const baixosCount = ref('4')
  const floorCount  = ref(7)
  const title       = ref('')

  /** Map of positionId → castellerId */
  const assignments = ref({})

  const currentFormation = computed(() =>
    buildFormation(baixosCount.value, floorCount.value)
  )

  function setBaixosCount(n) {
    baixosCount.value = n
    assignments.value = {}   // pinya geometry changes — positions are no longer the same
  }

  function setFloorCount(n) {
    floorCount.value = n
    // Remove assignments for positions that no longer exist
    const validIds = new Set([
      ...currentFormation.value.pinyaPositions.map(p => p.id),
      ...currentFormation.value.troncPositions.map(p => p.id),
    ])
    const pruned = {}
    for (const [id, name] of Object.entries(assignments.value)) {
      if (validIds.has(id)) pruned[id] = name
    }
    assignments.value = pruned
  }

  function assign(positionId, casteller) {
    if (Object.values(assignments.value).includes(casteller)) return
    assignments.value = { ...assignments.value, [positionId]: casteller }
  }

  function unassign(positionId) {
    const next = { ...assignments.value }
    delete next[positionId]
    assignments.value = next
  }

  function clearAssignments() {
    assignments.value = {}
  }

  /** Remove all assignments for a casteller that has been deleted from the roster. */
  function unassignCasteller(castellerId) {
    const next = {}
    for (const [posId, cId] of Object.entries(assignments.value)) {
      if (cId !== castellerId) next[posId] = cId
    }
    assignments.value = next
  }

  /** Serialisable snapshot for URL sharing / localStorage */
  function getState() {
    return {
      baixosCount: baixosCount.value,
      floorCount:  floorCount.value,
      title:       title.value,
      assignments: assignments.value,
    }
  }

  /** Restore from a snapshot */
  function loadState(state) {
    if (BAIXOS_OPTIONS.includes(state.baixosCount)) baixosCount.value = state.baixosCount
    if (FLOOR_OPTIONS.includes(state.floorCount))   floorCount.value  = state.floorCount
    title.value       = state.title       ?? ''
    assignments.value = state.assignments ?? {}
  }

  return {
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
  }
}
