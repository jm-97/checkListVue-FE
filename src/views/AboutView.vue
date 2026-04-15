<script setup lang="ts">
import { watch } from 'vue'
import SelectItem from '../components/SelectItem.vue'
import { projectStore } from '@/stores/project'
import { storeToRefs } from 'pinia';
import type { singleStato, Stato } from '@/interfaces/stati';

import type { Activity, Environment, Fases } from '@/interfaces/projects'
import { ref, nextTick } from 'vue'

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoResize(): void {
  if (!textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}
function startEditing(indice: number, i: number, index: number, currentText: string): void {
  editingKey.value = getKey(indice, i, index)
  editingText.value = currentText

  nextTick(() => {
    autoResize()
  })
}
const editingKey = ref<string | null>(null)
const editingText = ref("")
const store = projectStore();
const { getCurrentProjectDetails } = storeToRefs(store)

const props = defineProps({
  id: String
})
const stati = store.getStati();

function preSelectedStatusFinder(status: singleStato): Stato {
  const stati: Stato[] = store.getStati()
  return stati.find(stato => stato.value == status) as Stato
}
function getKey(indice: number, i: number, index: number) {
  return `${indice}-${i}-${index}`
}
function saveEdit(indice: number, i: number, index: number) {
  if (!editingKey.value) return

  // ✅ 1. aggiorna SUBITO lo state (UI reattiva)
  const current = getCurrentProjectDetails.value()
  current.environments[indice]!.fases[i]!.activity[index]!.text = editingText.value

  // ✅ 2. manda al backend (clonando)
  let project = JSON.parse(JSON.stringify(current))
  store.putProjectDetails(project)

  // ✅ 3. chiudi editing
  editingKey.value = null
}

watch(() => props.id, (newVal, oldVal) => {
  store.getProjectDetails(newVal!)
}, { immediate: true })

function onStatusChange(
  env: Environment,
  indice: number,
  fase: Fases,
  i: number,
  activity: Activity,
  index: number,
  newstatus: singleStato
) {
  let project = JSON.parse(JSON.stringify(getCurrentProjectDetails.value()));

  // ✅ aggiorni davvero il dato
  project.environments[indice]!.fases[i]!.activity[index]!.stato = newstatus;

  // ✅ salvi su Supabase
  store.putProjectDetails(project);
}
</script>
<template>
  <div class="container">
    <div class="column" v-for="(env, indice) in getCurrentProjectDetails().environments" :key="indice">
      <h1>{{ env.name }}</h1><!--Sandbox-->
      <div v-for="(fase, i) in env.fases" :key="i">
        {{ fase.name }}
        <ul>
          <li v-for="(activity, index) in fase.activity" :key="index">
            <SelectItem v-model="activity.stato" :stati="stati"
              :preSelectedStatus="preSelectedStatusFinder(activity.stato)!"
              @update:modelValue="onStatusChange(env, indice, fase, i, activity, index, $event)"></SelectItem>
            <span v-if="editingKey !== getKey(indice, i, index)"
              @dblclick="startEditing(indice, i, index, activity.text)">
              {{ activity.text }}
            </span>

            <textarea v-else v-model="editingText" @keyup.enter="saveEdit(indice, i, index)"
              @keyup.esc="editingKey = null" ref="textareaRef" class="editable-textarea" @input="autoResize"
              @blur="saveEdit(indice, i, index)" />
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}

.editable-textarea {
  width: 100%;
  min-height: 24px;
  resize: none;
  overflow: hidden;
  font: inherit;
  border: 1px solid #ccc;
  padding: 4px;
  border-radius: 4px;
}

.container {
  display: flex;
  gap: 10px;
  /* space between columns */
  width: 100%;
}

.column {
  flex: 1;
  width: 50%;
  /* equal width columns */
  padding: 10px;
}
</style>
