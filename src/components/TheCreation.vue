<script setup lang="ts">
import type { Project } from '@/interfaces/projects'

const emit = defineEmits(['newProject'])
const form: Project = {
  projectId: '',
  name: '',
}
let projectId = ''
let name = ''
function submit() {
  emit('newProject', { projectId, name })
}
</script>

<template>
  <h1>Create a new project</h1>

  <input
    type="text"
    v-model="projectId"
    name="id"
    id="id"
    placeholder="insert the ProjectId: PJXXXXXX"
  />
  <br />
  <input
    type="text"
    v-model="name"
    name="name"
    id="name"
    placeholder="insert the Name of the Project"
  />
  <br />
  <button @click="submit">create project</button>
</template>
