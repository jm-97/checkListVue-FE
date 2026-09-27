<script setup lang="ts">
import type { ActivityUpdate, Environment, TextUpdate } from '@/interfaces/projects';
import type { singleStato, Stato } from '@/interfaces/stati';
import { nextTick, ref } from 'vue';
import SelectItem from './SelectItem.vue';

const props = defineProps<{
  projectPayload: Environment[],
  stati: Stato[],
}>()

const emit = defineEmits<{
  (e: "updatedStatus", value: ActivityUpdate): void,
  (f: "updatedText", value: TextUpdate): void
}>()
const editingText = ref("")
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const editingKey = ref<string | null>(null)
function getKey(indice: number, i: number, index: number) {
  return `${indice}-${i}-${index}`
}
function preSelectedStatusFinder(status: singleStato): Stato {
  return props.stati.find(stato => stato.value == status) as Stato
}
function onStatusChange(
  newstatus: singleStato,
  id: number
): void {
  emit('updatedStatus', { stato: newstatus, id })
}
function startEditing(indice: number, i: number, index: number, currentText: string): void {
  editingKey.value = getKey(indice, i, index)
  editingText.value = currentText

  nextTick(() => {
    autoResize()
  })
}
function autoResize(): void {
  if (!textareaRef.value) return

  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height =
    `${textareaRef.value.scrollHeight}px`
}
function saveEdit(indice: number, i: number, index: number, id: number) {
  if (!editingKey.value) return

  const current = props.projectPayload
  current[indice]!.fases[i]!.activity[index]!.text = editingText.value
  emit('updatedText', { text: editingText.value, id })

  // ✅ 3. chiudi editing
  editingKey.value = null
}
</script>
<template>
  <div class="container">
    <div class="column" v-for="(env, indice) in projectPayload" :key="indice">
      <h1>{{ env.name }}</h1><!--Sandbox-->
      <div v-for="(fase, i) in env.fases" :key="i">
        {{ fase.name }}
        <ul>
          <li v-for="(activity, index) in fase.activity" :key="index">
            <SelectItem v-model="activity.stato" :stati="stati"
              :preSelectedStatus="preSelectedStatusFinder(activity.stato)!"
              @update:modelValue="onStatusChange($event, activity.id)">
            </SelectItem>
            <span v-if="editingKey !== getKey(indice, i, index)"
              @dblclick="startEditing(indice, i, index, activity.text)">
              {{ activity.text }}
            </span>

            <textarea v-else v-model="editingText" @keyup.enter="saveEdit(indice, i, index, activity.id)"
              @keyup.esc="editingKey = null" :ref="el => textareaRef = el as HTMLTextAreaElement"
              class="editable-textarea" @input="autoResize" @blur="saveEdit(indice, i, index, activity.id)" />
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
