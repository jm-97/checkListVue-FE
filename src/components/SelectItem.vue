<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { singleStato, Stati } from '../interfaces/stati.ts'
const props = defineProps<Stati>()
const emit = defineEmits(['currentStatus'])

// functions that mutate state and trigger updates
const currentStatus = reactive({ ...props.preSelectedStatus })
function changeColor(value: string) {
  const stato = props.stati.find(s => s.value === value)
  if (stato) {
    currentStatus.value = stato.value
    currentStatus.color = stato.color
  }
}
watch(
  () => props.preSelectedStatus,
  (newVal) => {
    currentStatus.value = newVal.value
    currentStatus.color = newVal.color
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <select @change="changeColor(currentStatus.value)" :style="{ color: currentStatus.color }"
    v-model="currentStatus.value">
    <option v-for="(stato, index) in props.stati" :key="index" :value="stato.value" :style="{ color: stato.color }">
      {{ stato.value }}
    </option>
  </select>
</template>

<style scoped></style>
