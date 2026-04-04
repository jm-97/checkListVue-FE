<script setup lang="ts">

const emit = defineEmits(['newProject'])
let id = ''
let name = ''
function submit() {
  emit('newProject', { id, name })
}
</script>

<template>
  <h1>Create a new project</h1>

  <input type="text" v-model="id" name="id" id="id" placeholder="insert the id: PJXXXXXX" />
  <br />
  <input type="text" v-model="name" name="name" id="name" placeholder="insert the Name of the Project" />
  <br />
  <button @click="submit">create project</button>
</template>
