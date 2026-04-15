<script setup lang="ts">
import type { ProjectCreationDTO } from '@/interfaces/projects';


const emit = defineEmits<{
  (e: "newProject", value: ProjectCreationDTO): void
}>()
let projectId = ''
let name = ''
let version = ''
function submit() {
  let id = crypto.randomUUID();
  emit('newProject', { id, projectId, name, version } as ProjectCreationDTO)
}
</script>

<template>
  <h1>Create a new project</h1>

  <input type="text" v-model="projectId" name="id" id="id" placeholder="insert the id: PJXXXXXX" />
  <br />
  <input type="text" v-model="name" name="name" id="name" placeholder="insert the Name of the Project" />
  <br />
  <input type="text" v-model="version" name="version" id="version" placeholder="insert the version h.0.31" />
  <br />
  <button @click="submit">create project</button>
</template>
