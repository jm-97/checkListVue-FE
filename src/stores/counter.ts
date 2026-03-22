import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Project } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'

export const projectStore = defineStore('projects', {

  state: (): State => ({
    projects: [
      { "projectId": "PJ002835", "name": "CZSK Remittance Additional INformation" },
      { "projectId": "PJ003316", "name": "Sepa Rulebook" },
      { "projectId": "PJ002361", "name": "CZSKSI STO IP" }
    ]
  }),
  getters: {
    getProjectById: (state: State) => {
      return (projectId: string) => state.projects.find((project) => project.projectId === projectId)
    },
  },
  actions: {
    addProject(project: Project) {
      this.projects = [...this.projects, project]
    },
  },
})
