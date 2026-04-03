<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { singleStato, Stati } from '../interfaces/stati.ts'
const props = defineProps<Stati>()
const emit = defineEmits(['currentStatus'])

// functions that mutate state and trigger updates
const currentStatus = reactive({ ...props.preSelectedStatus })
function changeColor(event: Event) {
  const target = event.target as HTMLSelectElement
  currentStatus.color = props.stati[target.selectedIndex]!.color
  currentStatus.value = target.value as singleStato
}
watch(currentStatus, (newStatus) => {
  emit('currentStatus', newStatus)
})
</script>

<template>
  <select name="stat" @change="changeColor($event)" :style="{ color: currentStatus.color }"
    v-model="preSelectedStatus.value">
    <option v-for="(stato, index) in props.stati" :key="index" :value="stato.value" :style="{ color: stato.color }">
      {{ stato.value }}
    </option>
  </select>
</template>

<style scoped></style>
