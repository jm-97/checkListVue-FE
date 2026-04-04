
import { defineStore } from 'pinia'
import type { Project, Sandbox } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'
import { getPJDetails, getStatiOverall } from '@/services/project.services'
import type { Stato } from '@/interfaces/stati'

export const projectStore = defineStore('projects', {

  state: (): State => ({
    projects: [
      { "id": "PJ002835", "name": "CZSK Remittance Additional INformation" },
      { "id": "PJ003316", "name": "Sepa Rulebook" },
      { "id": "PJ002361", "name": "CZSKSI STO IP" }
    ],
    currentProjectDetails: {
      id: "",
      name: "",
      environments: []
    },
    stato: []
  }),
  getters: {
    getProjectById: (state: State) => {
      return (id: string) => state.projects.find((project) => project.id === id)
    },
    getCurrentProjectDetails: (state: State) => {
      return () => state.currentProjectDetails
    },
    getStati: (state: State) => {
      return () => state.stato
    }
  },
  actions: {
    addProject(project: Project) {
      this.projects.push(project)
    },
    removeProject(project: Project) {
      this.projects.splice(this.projects.findIndex(projectStored => projectStored.id === project.id), 1)
    },
    getProjectSuccess(data: Project) {
      this.currentProjectDetails = data!;
    },
    getProjectError(message: any) {
      console.log(message)
    },
    async getProjectDetails(id: string) {
      try {
        const data = await getPJDetails(id)
        this.getProjectSuccess(data)
      } catch (err: any) {
        this.getProjectError(err.message)
      }
    },
    async getStatiOverall() {
      try {
        const data = await getStatiOverall()
        this.getStatiSuccess(data)
      } catch (err: any) {
        this.getProjectError(err.message)
      }
    },
    getStatiSuccess(data: Stato[]) {
      this.stato = data;
    },
  },
})
