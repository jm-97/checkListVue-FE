<script setup lang="ts">
import { watch, reactive } from 'vue'
import SelectItem from '../components/SelectItem.vue'
import { projectStore } from '@/stores/project'
import { storeToRefs } from 'pinia';
import type { singleStato, Stato } from '@/interfaces/stati';
const fases = ['PRE-Release', ' During Release', 'POST Release']
const store = projectStore();
const { getCurrentProjectDetails } = storeToRefs(store)

const props = defineProps({
  id: String
})
const stati = store.getStati();

const preSelectedStatus = { value: 'non_completato', color: 'red' }
function preSelectedStatusFinder(status: singleStato): Stato {
  const stati: Stato[] = store.getStati()

  return stati.find(stato => stato.value == status) as Stato
}
const newStatus = reactive({})
watch(newStatus, (nuovo) => {

})
watch(() => props.id, (newVal, oldVal) => {
  store.getProjectDetails(newVal!)
}, { immediate: true })
</script>
<template>
  <div class="container">
    <div class="column" v-for="(env, indice) in getCurrentProjectDetails().environments" :key="indice">
      <h1>{{ env.name }}</h1>
      {{ fases[0] }}
      <ul>
        <li v-for="(activity, index) in env.activities.activitiesPreReleases" :key="index">
          <SelectItem :stati="stati" :preSelectedStatus="preSelectedStatusFinder(activity.stato)!"
            @currentStatus="(status) => Object.assign(newStatus, status)"></SelectItem>
          {{ activity.text }}
        </li>
      </ul>

      {{ fases[1] }}
      <ul>
        <li v-for="(activity, index) in env.activities.activitiesDuringReleases" :key="index">
          <SelectItem :stati="stati" :preSelectedStatus="preSelectedStatusFinder(activity.stato)!"
            @currentStatus="(status) => Object.assign(newStatus, status)"></SelectItem>
          {{ activity.text }}
        </li>
      </ul>

      {{ fases[2] }}
      <ul>
        <li v-for="(activity, index) in env.activities.activitiesPostReleases" :key="index">
          <SelectItem :stati="stati" :preSelectedStatus="preSelectedStatusFinder(activity.stato)!"
            @currentStatus="(status) => Object.assign(newStatus, status)"></SelectItem>
          {{ activity.text }}
        </li>
      </ul>
    </div>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
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
