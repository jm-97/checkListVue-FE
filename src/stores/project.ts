
import { defineStore } from 'pinia'
import type { Project, ProjectDTO } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'
import { getPJDetails, getProjectsOverall, getStatiOverall, putProject } from '@/services/project.services'
import type { Stato } from '@/interfaces/stati'

export const projectStore = defineStore('projects', {

  state: (): State => ({
    projects: [],
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
      return (): Project => state.currentProjectDetails
    },
    getStati: (state: State) => {
      return () => state.stato
    }
  },
  actions: {
    addProject(project: Project) {
      this.projects.push(project)
    },
    removeProject(project: ProjectDTO) {
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
    async putProjectDetails(project: Project) {
      try {
        const data = await putProject(project);
        this.getProjectSuccess(data);
      } catch (err: any) {
        this.getProjectError(err.message)
      }
    },
    putProjectDetailsSuccess(project: Project) {
      this.currentProjectDetails = project;
    },
    async getProjectOverall() {
      try {
        const data: ProjectDTO[] = await getProjectsOverall();
        this.projects = data;
      } catch (err: any) {
        this.getProjectError(err.message)
      }
    },
  },
})
