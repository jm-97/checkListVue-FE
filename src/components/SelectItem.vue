<script setup lang="ts">
import { computed } from 'vue';
import type { Stato, singleStato } from '../interfaces/stati.ts'

const props = defineProps<{
  stati: Stato[]
  modelValue: singleStato
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: singleStato): void
}>()

function onChange(value: string) {
  emit('update:modelValue', value as singleStato)
}

// calcolo derivato → niente stato
const currentColor = computed(() => {
  return props.stati.find(s => s.value === props.modelValue)?.color
})
</script>

<template>
  <select :value="modelValue" @change="onChange(($event.target as HTMLSelectElement).value)"
    :style="{ color: currentColor }">
    <option v-for="stato in stati" :key="stato.value" :value="stato.value" :style="{ color: stato.color }">
      {{ stato.value }}
    </option>
  </select>
</template>
