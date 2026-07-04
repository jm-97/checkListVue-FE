
import { defineStore } from 'pinia'
import type { Environment, Project, ProjectCreationDTO, ProjectDTO } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'
import { createProject, deleteProjectById, getPJDetails, getProjectsOverall, getStatiOverall, getTemplate, putProject } from '@/services/project.services'
import type { Stato } from '@/interfaces/stati'

export const projectStore = defineStore('projects', {

  state: (): State => ({
    projects: [],
    currentProjectDetails: {
      id: "",
      projectId: "",
      name: "",
      environments: []
    },
    currentTemplate: {
      id: "",
      projectId: "",
      name: "",
      environments: []
    },
    stato: [],
    loadingCount: 0
  }),
  getters: {
    isLoading: (state) => state.loadingCount > 0,
    getProjectById: (state: State) => {
      return (id: string) => state.projects.find((project) => project.projectId === id)
    },
    getCurrentProjectDetails: (state: State) => {
      return (): Project => state.currentProjectDetails
    },
    getCurrentTemplate: (state: State) => {
      return (): Project => state.currentTemplate
    },
    getStati: (state: State) => {
      return () => state.stato
    }
  },
  actions: {
    addProject(project: ProjectDTO) {
      this.projects.push(project)
    },
    removeProject(id: string) {
      this.projects.splice(this.projects.findIndex(projectStored => projectStored.id === id), 1)
    },
    getProjectSuccess(data: Project) {
      this.currentProjectDetails = data!;
    },
    getTemplateDetailsSuccess(data: Project) {
      this.currentTemplate = data!;
    },
    getTemplateError(message: any) {
      console.log(message)
    },
    getProjectError(message: any) {
      console.log(message)
    },
    async getProjectDetails(id: string) {
      this.startLoading()
      try {
        const data = await getPJDetails(id)
        this.getProjectSuccess(data)
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    async getTemplateDetails() {
      this.startLoading()
      try {
        const data = await getTemplate()
        this.getTemplateDetailsSuccess(data)
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    getStatiOverall(): void {
      const data = getStatiOverall()
      this.getStatiSuccess(data)
    },
    getStatiSuccess(data: Stato[]): void {
      this.stato = data;
    },
    async putProjectDetails(project: Project) {
      this.startLoading()
      try {
        const data = await putProject(project);
        this.getProjectSuccess(data);
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    putProjectDetailsSuccess(project: Project) {
      this.currentProjectDetails = project;
    },
    putCurrentTemplate(payload: Environment[]) {
      this.currentProjectDetails.environments = payload;
    },
    async getProjectOverall() {
      this.startLoading()
      try {
        const data: ProjectDTO[] = await getProjectsOverall();
        this.projects = data;
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    async createProjectOverall(pj: Project) {
      this.startLoading()
      try {
        const data: ProjectDTO = await createProject(pj);
        this.addProject(data);
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    startLoading() {
      this.loadingCount++
    },
    stopLoading() {
      this.loadingCount--
    },
    async removeProjectOverall(id: string) {
      this.startLoading()
      try {
        const data: Project = await deleteProjectById(id);
        this.removeProject(id);
      } catch (err: any) {
        this.getProjectError(err.message)
      } finally {
        this.stopLoading()
      }
    },
  },
})
