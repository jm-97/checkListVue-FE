<script setup lang="ts">
import type { Environment, Project } from '@/interfaces/projects';
import { projectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ProjectEditor from './ProjectEditor.vue';

const store = projectStore();
const emit = defineEmits<{
  (e: "newProject", value: Project): void
}>()
let projectId = ref('')
let name = ref('')
let version = ref('')
const { currentTemplate } = storeToRefs(store)
const stati = store.stato;

function submit() {
  let id = crypto.randomUUID();
  emit('newProject', { id, projectId: projectId.value, name: name.value, version: version.value, environments: currentTemplate.value.environments } as Project)
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

  <div>
    <ProjectEditor :project-payload="currentTemplate.environments" :stati="stati"
      @editedProject="(payload: Environment[]) => store.putCurrentTemplate(payload)"></ProjectEditor>

  </div>
</template>
