<script setup lang="ts">
 
const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>
 
<template>
  <h1>Create a new project</h1>
 
  <input type="text" name="PJ" id="PJ" placeholder="insert the PJ"> <br>
  <input type="checkbox" name="env" id="sandbox">Sandbox only
  <input type="checkbox" name="env" id="real">Real only
  <button>create project</button>
</template>