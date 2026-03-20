<script setup lang="ts">
import { reactive, watch } from "vue"
import type { Stati } from "../interfaces/stati";
const props = defineProps<Stati>()
const emit = defineEmits(['currentStatus'])
 
// functions that mutate state and trigger updates
const currentStatus = reactive({...props.preSelectedStatus})
function changeColor(event: Event) {
  const target = event.target as HTMLSelectElement;
  currentStatus.color = props.stati[target.selectedIndex]!.color;
  currentStatus.value = target.value;
}
watch(currentStatus, (newStatus) => {
  // yes, console.log() is a side effect
 
  emit('currentStatus', newStatus)
  console.log(newStatus)
 
})
</script>
 
<template>
  <select name="stat" @change="changeColor($event)" :style="{ color: currentStatus.color }">
    <option v-for="stato in props.stati" :value="stato.value" :style="{ color: stato.color }">{{ stato.value }}</option>
  </select>
</template>
 
<style scoped></style>
 
 