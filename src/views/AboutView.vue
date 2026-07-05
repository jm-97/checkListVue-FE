<script setup lang="ts">
import { watch } from 'vue'
import { projectStore } from '@/stores/project'
import type { Environment } from '@/interfaces/projects'
import ProjectEditor from '../components/ProjectEditor.vue';
import { storeToRefs } from 'pinia';

const store = projectStore();
const { currentProjectDetails, stato: stati } = storeToRefs(store)
const props = defineProps({
  id: String
})


watch(() => props.id, (newVal, oldVal) => {
  store.getProjectDetails(newVal!)
}, { immediate: true })


</script>
<template>
  <div>
    <ProjectEditor :project-payload="currentProjectDetails.environments" :stati="stati"
      @editedProject="(payload: Environment[]) => store.putProjectDetails({ ...currentProjectDetails, environments: payload })">
    </ProjectEditor>
  </div>
</template>
