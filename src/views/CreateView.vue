<script setup lang="ts">
import Creation from '../components/TheCreation.vue'
import type { Project } from '@/interfaces/projects'
import { projectStore } from '@/stores/project'

const store = projectStore()
</script>

<template>
  <main>
    <Creation @newProject="(project: Project) => store.addProject(project)" />
  </main>
</template>
