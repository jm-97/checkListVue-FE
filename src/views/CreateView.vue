<script setup lang="ts">
import { reactive, watch } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import type { Project } from '@/interfaces/projects';
const newPJ = reactive({
  projectId: "",
  name: ""
});
function updatePJ(pj:Project){

}
watch(newPJ, (nuovo)=>{
  console.log("emitter", nuovo)
})
</script>

<template>
  <main>
    <TheWelcome @newProject="(project) => Object.assign(newPJ, project)"/>
  </main>
</template>
