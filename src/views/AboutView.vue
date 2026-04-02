<script setup lang="ts">
import { watch, reactive } from 'vue'
import SelectItem from '../components/SelectItem.vue'
import { projectStore } from '@/stores/project'
import { storeToRefs } from 'pinia';
const fases = ['PRE-Release', ' During Release', 'POST Release']
const store = projectStore();
const { getCurrentProjectDetails } = storeToRefs(store)


const stati = [
  { value: 'non_completato', color: 'red' },
  { value: 'non_necessario', color: 'brown' },
  { value: 'ongoing', color: 'blue' },
  { value: 'completato', color: 'green' },
]
const preSelectedStatus = { value: 'non_completato', color: 'red' }
const newStatus = reactive({})
watch(newStatus, (nuovo) => {
  console.log('emitter', nuovo)
})
</script>
<template>
  <div class="about">
    {{ fases[0] }}
    <ul>
      <li v-for="(activity, index) in getCurrentProjectDetails().activitiesPreReleases" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>

    {{ fases[1] }}
    <ul>
      <li v-for="(activity, index) in getCurrentProjectDetails().activitiesDuringReleases" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>

    {{ fases[2] }}
    <ul>
      <li v-for="(activity, index) in (getCurrentProjectDetails().activitiesPostReleases)" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
