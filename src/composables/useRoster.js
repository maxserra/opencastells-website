import { ref } from 'vue'

/**
 * Manages the roster of castellers.
 *
 * Data model: [{id: string, name: string}]
 * IDs are stable UUIDs — used as foreign keys in assignment state.
 * Names are display-only and can be changed without affecting assignments.
 */
/** Generate a 4-hex-digit ID that doesn't collide with existing IDs. */
function generateId(existing) {
  let id
  do {
    id = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0')
  } while (existing.has(id))
  return id
}

export function useRoster() {
  const roster = ref([])

  function addCasteller(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    if (roster.value.some(c => c.name === trimmed)) return
    const existingIds = new Set(roster.value.map(c => c.id))
    roster.value.push({ id: generateId(existingIds), name: trimmed })
  }

  function removeCasteller(id) {
    roster.value = roster.value.filter(c => c.id !== id)
  }

  function renameCasteller(id, newName) {
    const trimmed = newName.trim()
    if (!trimmed) return
    roster.value = roster.value.map(c => c.id === id ? { ...c, name: trimmed } : c)
  }

  function clearRoster() {
    roster.value = []
  }

  /**
   * Import from a CSV file. Each non-empty line is one casteller name.
   * @param {File} file
   */
  function importCsv(file) {
    const reader = new FileReader()
    reader.onload = e => {
      e.target.result.split('\n').forEach(line => addCasteller(line.trim()))
    }
    reader.readAsText(file)
  }

  /**
   * Return roster as a CSV string (one name per line), matching the import format.
   * The caller is responsible for triggering the browser download.
   * @returns {string}
   */
  function exportCsv() {
    return roster.value.map(c => c.name).join('\n')
  }

  return { roster, addCasteller, removeCasteller, renameCasteller, clearRoster, importCsv, exportCsv }
}
