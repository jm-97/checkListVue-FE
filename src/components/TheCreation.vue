<script setup lang="ts">
import { ACTIVITIES } from '@/assets/activities';
import type { ProjectCreationDTO } from '@/interfaces/projects';
import { projectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const store = projectStore();
const emit = defineEmits<{
  (e: "newProject", value: ProjectCreationDTO): void
}>()
let projectId = ref('')
let name = ref('')
let version = ref('')

const { getCurrentTemplate } = storeToRefs(store)

function submit() {
  let id = crypto.randomUUID();
  emit('newProject', { id, projectId: projectId.value, name: name.value, version: version.value } as ProjectCreationDTO)
}
const DEFAULT_ACTIVITIES = computed(() => {
  return ACTIVITIES(version.value, projectId.value);
});
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
    {{ getCurrentTemplate() }}
  </div>
</template>
