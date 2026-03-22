<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { projectStore, useCounterStore } from './stores/counter';

const store = projectStore();
 
</script>
 
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
 
    <div class="wrapper">
      <h1> Here the list of projets</h1>
      <ul>
        <li>
          <RouterLink to="/create">Create a new Project</RouterLink>
        </li>
        <li v-for="project in store.projects" :key="project.projectId">
          <RouterLink :to="project.projectId">{{project.projectId}} {{ project.name }}</RouterLink>
        </li>
       
      </ul>
      {{ store.projects }}
    </div>
  </header>
 
  <RouterView />
</template>
 
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
 
.logo {
  display: block;
  margin: 0 auto 2rem;
}
 
ul {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
 
ul a.router-link-exact-active {
  color: var(--color-text);
}
 
ul a.router-link-exact-active:hover {
  background-color: transparent;
}
 
ul a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
 
ul a:first-of-type {
  border: 0;
}
 
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
}
 
li a {
  display: block;
  color: black;
  padding: 8px 16px;
  text-decoration: none;
}
 
/* Change the link and background color on hover */
li a:hover {
  background-color: #555555;
  color: white;
}
 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
 
  .logo {
    margin: 0 2rem 0 0;
  }
 
  header .wrapper {
    place-items: flex-start;
    flex-wrap: wrap;
  }
 
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
 
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>