<script setup lang="ts">
import Creation from '../components/TheCreation.vue'
import type { Project, ProjectCreationDTO } from '@/interfaces/projects'
import { projectStore } from '@/stores/project'
import { onMounted } from 'vue';

const store = projectStore();
onMounted(() => {
  store.getTemplateDetails()
})
</script>

<template>
  <main>
    <Creation @newProject="(project: Project) => store.createProjectOverall(project)" />
  </main>
</template>
