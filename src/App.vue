<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import { RouterLink, RouterView } from 'vue-router'
import { projectStore } from './stores/project'
import { onMounted } from 'vue';

const store = projectStore()
function remove(id: string) {
  store.removeProjectOverall(id);
}
onMounted(() => {
  store.getProjectOverall()
  store.getStatiOverall()
})

</script>

<template>
  <header>
    <div v-if="store.isLoading" class="overlay">
      <ProgressSpinner style="width:60px;height:60px" strokeWidth="4" animationDuration=".8s" />
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Here the list of projets</h1>
      <ul>
        <li>
          <RouterLink to="/create">Create a new Project</RouterLink>
        </li>
        <li v-for="project in store.projects" :key="project.projectId">
          <RouterLink :to="project.id" custom v-slot="{ navigate, isActive }">
            <div class="row" :class="{ active: isActive }" @click="navigate">
              <span class="link">
                {{ project.projectId }} {{ project.name }}
              </span>

              <i class="pi pi-trash delete-icon" @click.stop="remove(project.id)">
              </i>
            </div>
          </RouterLink>
        </li>
      </ul>
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
  background-color: #41B883;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: all;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.row:hover {
  background-color: #555555;
  color: white;
}

.row.active {
  background-color: #41B883;
}


.link {
  flex: 1;
  text-decoration: none;
  color: inherit;
}

.delete-icon {
  margin-left: 10px;
  color: inherit;
  opacity: 0.7;
}

.delete-icon:hover {
  color: red;
}

.row:hover .delete-icon {
  opacity: 1;
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
