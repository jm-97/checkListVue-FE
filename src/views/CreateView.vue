<script setup lang="ts">
import Creation from '../components/TheCreation.vue'
import type { ProjectCreationDTO } from '@/interfaces/projects'
import { projectStore } from '@/stores/project'

const store = projectStore()
</script>

<template>
  <main>
    <Creation @newProject="(project: ProjectCreationDTO) => store.createProjectOverall(project)" />
  </main>
</template>
