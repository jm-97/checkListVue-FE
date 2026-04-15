<script setup lang="ts">
import Creation from '../components/TheCreation.vue'
import type { ProjectDTO } from '@/interfaces/projects'
import { projectStore } from '@/stores/project'

const store = projectStore()
</script>

<template>
  <main>
    <Creation @newProject="(project: ProjectDTO) => store.createProjectOverall(project, project.version!)" />
  </main>
</template>
