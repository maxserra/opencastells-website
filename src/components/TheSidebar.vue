<script setup>
import { ref, computed } from 'vue'
import CastellerItem from './CastellerItem.vue'

const props = defineProps({
  baixosCount:   { type: Number, required: true },
  floorCount:    { type: Number, required: true },
  baixosOptions: { type: Array,  required: true },
  floorOptions:  { type: Array,  required: true },
  title:         { type: String, default: '' },
  roster:        { type: Array,  required: true }, // [{id, name}]
  assignments:   { type: Object, required: true }, // {positionId: castellerId}
})

const emit = defineEmits([
  'update:baixosCount',
  'update:floorCount',
  'update:title',
  'add-casteller',
  'remove-casteller',
  'rename-casteller',
  'import-csv',
  'export-csv',
  'clear-roster',
  'clear-assignments',
  'share',
  'export-png',
  'export-json',
])

const search      = ref('')
const addInput    = ref('')
const editMode    = ref(false)
const fileInput   = ref(null)
const shareOpen   = ref(false)

const assignedIds = computed(() => new Set(Object.values(props.assignments)))

const filteredRoster = computed(() =>
  props.roster.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
)

function onAddCasteller() {
  const name = addInput.value.trim()
  if (!name) return
  emit('add-casteller', name)
  addInput.value = ''
}

function onAddKeydown(e) {
  if (e.key === 'Enter') onAddCasteller()
}

function triggerImport() {
  fileInput.value.click()
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) emit('import-csv', file)
  e.target.value = ''
}

function onRename(id, e) {
  const newName = e.target.value.trim()
  if (newName) emit('rename-casteller', { id, newName })
  else e.target.value = props.roster.find(c => c.id === id)?.name ?? ''
}

function shareAction(action) {
  shareOpen.value = false
  emit(action)
}
</script>

<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <h1 class="logo">OpenCastells</h1>
    </header>

    <!-- Formation selectors -->
    <section class="sidebar-section">
      <div class="two-col">
        <div>
          <label class="field-label">Baixos</label>
          <select
            :value="baixosCount"
            @change="emit('update:baixosCount', Number($event.target.value))"
          >
            <option v-for="n in baixosOptions" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div class="de-sep">de</div>
        <div>
          <label class="field-label">Pisos</label>
          <select
            :value="floorCount"
            @change="emit('update:floorCount', Number($event.target.value))"
          >
            <option v-for="n in floorOptions" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>

      <label class="field-label-check field-label--disabled">
        <input type="checkbox" disabled />
        Amb agulla
      </label>

      <label class="field-label mt">Títol (opcional)</label>
      <input
        type="text"
        placeholder="Títol del castell"
        :value="title"
        @input="emit('update:title', $event.target.value)"
      />
    </section>

    <!-- Roster -->
    <section class="sidebar-section roster-section">

      <label class="field-label">Castellers/es</label>

      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="Cerca…"
      />

      <!-- Add input: always visible, only active in edit mode -->
      <div class="add-row" :class="{ 'add-row--disabled': !editMode }">
        <input
          v-model="addInput"
          type="text"
          placeholder="Afegir casteller/a…"
          :disabled="!editMode"
          @keydown="onAddKeydown"
        />
        <button class="add-btn" title="Afegir" :disabled="!editMode" @click="onAddCasteller">+</button>
      </div>

      <!-- Roster list (scrollable) -->
      <ul class="roster-list">
        <template v-if="editMode">
          <li v-for="c in filteredRoster" :key="c.id" class="roster-edit-row">
            <input
              type="text"
              class="edit-name-input"
              :value="c.name"
              @blur="onRename(c.id, $event)"
              @keydown.enter="$event.target.blur()"
            />
            <button class="danger-btn" title="Eliminar" @click="emit('remove-casteller', c.id)">✕</button>
          </li>
        </template>
        <template v-else>
          <CastellerItem
            v-for="c in filteredRoster"
            :key="c.id"
            :id="c.id"
            :name="c.name"
            :assigned="assignedIds.has(c.id)"
          />
        </template>
        <li v-if="filteredRoster.length === 0" class="empty-state">
          Cap casteller/a
        </li>
      </ul>

      <!-- Action bar: default | edit mode -->
      <div class="roster-actions">
        <template v-if="!editMode">
          <input
            ref="fileInput"
            type="file"
            accept=".csv,text/csv"
            style="display:none"
            @change="onFileChange"
          />
          <button class="secondary icon-btn action-btn" title="Importa CSV" @click="triggerImport">Importa CSV</button>
          <button class="secondary icon-btn action-btn" title="Exporta CSV" @click="emit('export-csv')">Exporta CSV</button>
          <button class="secondary icon-btn action-btn" @click="editMode = true">Editar llista</button>
        </template>
        <template v-else>
          <button class="danger-btn action-btn" @click="emit('clear-roster')">Buidar llista</button>
          <button class="secondary icon-btn action-btn" @click="editMode = false">Fet</button>
        </template>
      </div>
    </section>

    <!-- Bottom actions -->
    <section class="sidebar-section sidebar-actions">
      <button class="danger-btn clear-btn" @dblclick="emit('clear-assignments')" title="Doble clic per netejar">Netejar castell</button>

      <!-- Share / export popup -->
      <div class="share-wrap">
        <button class="share-btn" @click="shareOpen = !shareOpen">Compartir</button>
        <div v-if="shareOpen" class="share-popup">
          <button class="share-item" @click="shareAction('share')">🔗 Copiar enllaç</button>
          <button class="share-item" @click="shareAction('export-png')">🖼 Descarregar PNG</button>
          <button class="share-item" @click="shareAction('export-json')">&#123;&#125; Exportar JSON</button>
        </div>
        <!-- click-outside backdrop -->
        <div v-if="shareOpen" class="share-backdrop" @click="shareOpen = false" />
      </div>
    </section>

    <footer class="sidebar-footer">
      <a href="https://github.com/maxserra/opencastells-website" target="_blank" rel="noopener">OpenCastells</a>
    </footer>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 100%;
  min-width: 0;
  height: 100%;
  background: #205b69;
  color: #e8e0d8;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-header {
  padding: 1.25rem 1rem 0.75rem;
  border-bottom: 1px solid #444;
}

.logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
}

.sidebar-section {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Roster section scrolls internally */
.roster-section {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.78rem;
  color: #a09888;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.field-label.mt {
  margin-top: 0.5rem;
}

.field-label-check {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #a09888;
  cursor: default;
}

.field-label--disabled {
  opacity: 0.45;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 0.4rem;
}

.de-sep {
  font-size: 0.8rem;
  color: #a09888;
  padding-bottom: 0.45rem;
  text-align: center;
}

select, input[type="text"] {
  background: #3a3a3a;
  border-color: #555;
  color: #e8e0d8;
}

select:focus, input[type="text"]:focus {
  outline-color: #c0392b;
}

/* Roster header */
.roster-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Add row */
.add-row {
  display: flex;
  gap: 0.4rem;
}

.add-row input {
  flex: 1;
}

.add-btn {
  padding: 0.35rem 0.7rem;
  font-size: 1.1rem;
  line-height: 1;
  flex-shrink: 0;
  background: #1a6fc4;
  border-color: #1a6fc4;
  color: #fff;
}

.add-btn:hover:not(:disabled) {
  background: #1558a0;
  border-color: #1558a0;
}

.add-btn:disabled {
  background: #3a3a3a;
  border-color: #555;
  color: #666;
  cursor: default;
}

.add-row--disabled input {
  opacity: 0.4;
  cursor: default;
}

/* Bulk actions */
.roster-actions {
  display: flex;
  gap: 0.4rem;
}

.action-btn {
  flex: 1;
  text-align: center;
}

.icon-btn {
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
}

.icon-btn.active {
  background: #555;
  color: #fff;
  border-color: #777;
}

/* Roster list */
.roster-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

/* Edit mode row */
.roster-edit-row {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

.edit-name-input {
  flex: 1;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}

.danger-btn {
  background: transparent;
  color: #c0392b;
  border: 1px solid #c0392b;
  padding: 0.2rem 0.45rem;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.danger-btn:hover {
  background: #c0392b;
  color: #fff;
}

.empty-state {
  font-size: 0.82rem;
  color: #7a7068;
  padding: 0.4rem 0;
}

.sidebar-actions {
  flex-direction: row;
  gap: 0.5rem;
}

.sidebar-footer {
  margin-top: auto;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  color: #7a7068;
  border-top: 1px solid #3a3a3a;
}

.sidebar-footer a {
  color: #a09888;
  text-decoration: none;
}

.sidebar-footer a:hover {
  color: #e8e0d8;
  text-decoration: underline;
}

/* Share popup */
.share-wrap {
  position: relative;
}

.share-btn {
  background: #1a6fc4;
  width: 100%;
  height: 100%;
}

.share-btn:hover {
  background: #1558a0;
}

.clear-btn {
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 0.4rem 0.85rem;
  flex: 1;
}

.clear-btn:hover {
  background: #a93226;
}

.share-wrap {
  flex: 3;
}

.share-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9;
}

.share-popup {
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0;
  z-index: 10;
  background: #1e1e1e;
  border: 1px solid #555;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  min-width: 180px;
  overflow: hidden;
}

.share-item {
  background: transparent;
  border: none;
  border-radius: 0;
  color: #e8e0d8;
  padding: 0.6rem 1rem;
  text-align: left;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
}

.share-item:hover {
  background: #2e2e2e;
}

.share-item + .share-item {
  border-top: 1px solid #3a3a3a;
}
</style>
