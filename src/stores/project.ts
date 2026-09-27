
import { defineStore } from 'pinia'
import type { ActivityUpdate, Environment, Project, ProjectCreationDTO, ProjectDTO, TextUpdate } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'
import { createProject, deleteProjectById, getPJDetails, getProjectsOverall, getStatiOverall, getTemplate, putActivity, putText } from '@/services/project.services'
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
    async getProjectDetails(id: string) {
      this.startLoading()
      try {
        const data = await getPJDetails(id)
        this.getProjectSuccess(data)
      } catch (err: any) {
        this.logError(err.message)
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
        this.logError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    logError(error: any) {
      console.log(error)
    },
    getStatiOverall(): void {
      const data = getStatiOverall()
      this.getStatiSuccess(data)
    },
    getStatiSuccess(data: Stato[]): void {
      this.stato = data;
    },
    async putActivityStatus(activity: ActivityUpdate) {
      this.startLoading()
      try {
        const data = await putActivity(activity)
      } catch (err: any) {
        this.logError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    async putActivityText(text: TextUpdate) {
      this.startLoading()
      try {
        const data = await putText(text)
      } catch (err: any) {
        this.logError(err.message)
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
        this.logError(err.message)
      } finally {
        this.stopLoading()
      }
    },
    async createProjectOverall(pj: ProjectCreationDTO) {
      this.startLoading()
      try {
        const data: ProjectDTO = await createProject(pj);
        this.addProject(data);
      } catch (err: any) {
        this.logError(err.message)
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
        this.logError(err.message)
      } finally {
        this.stopLoading()
      }
    },
  },
})
