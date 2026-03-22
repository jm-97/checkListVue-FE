<script setup lang="ts">
import { reactive, watch } from 'vue'
import Creation from '../components/TheCreation.vue'
import type { Project } from '@/interfaces/projects'
const newPJ = reactive({
  projectId: '',
  name: '',
})
watch(newPJ, (nuovo) => {
  console.log('emitter', nuovo)
})
</script>

<template>
  <main>
    <Creation @newProject="(project: Project) => Object.assign(newPJ, project)" />
  </main>
</template>
