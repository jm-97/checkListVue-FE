
import { defineStore } from 'pinia'
import type { Project } from '@/interfaces/projects'
import type { State } from '@/interfaces/state'

export const projectStore = defineStore('projects', {

  state: (): State => ({
    projects: [
      { "id": "PJ002835", "name": "CZSK Remittance Additional INformation" },
      { "id": "PJ003316", "name": "Sepa Rulebook" },
      { "id": "PJ002361", "name": "CZSKSI STO IP" }
    ],
    currentProjectDetails: {
      activitiesPreReleases: [
        'Sviluppo lato policy Studio per accogliere le nuove modifiche seguendo l’ATE.',
        'SIT',
        'UAT',
        'No regression in qa',
        'Aprire TASK su Change  CHG00285183, CHG00285240, CHG00285269',
        'caricamento endpoint KPS e testFacility update',
        'Caricamento swagger .docs h.0.28 su API Portal joomla per le 4 macchine',
        'Aprire task per update dns',
        'Aprire task per certificato',
        'Caricamento yaml countrySpecific h.0.28 su API Portal',
        'Verificare su tutte le macchine',
        'Verificare download degli swagger downloadables',
        'Verificare accesso scripts e testare etc host',
        'Aggiornamento test facility',
        'Aprire task per caricamento pagine mockate sandbox',
        'Aprire task per i plugin per il download in yaml',
        'sviluppo della collection Change con newman',
      ],
      activitiesDuringReleases: [
        'Deployare real security feature/PJ003316 da gandalf in prod',
        'deploy plugin for the download of yaml',
        'Caricamento delle pagine mockate sandbox da vts',
        'Caricamento pagina api catalog not logged',
        'Numerino a h.0.27',
        'Aggiunta di tabs basket e bulk per bg not logged',
        'test mirati per nuove funzionalità in PROD',
        'Aggiornamento API Manager APIM CLI, con swagger h.0.28',
        'cambiare etc/host e lanciare tutta soapUI per sandbox e (real)',
        'soapUI pronto lato sandbox e real',
        'verificare test facility, getting startedPublic e gettingStartedLogged, DOCUMENTATION(loged)',
        'Controllare sulle 4 macchine di REAL+SANDBOX che FE APIs, BE APIs, e Catalog siano aggiornati correttamente',
        'Controllare sulle 4 macchine di Portale che Catalog siano aggiornati correttamente',
        'PYTHON swagger downloadable BY BRUTE FORCE',
        'Upload del newman report',
      ],
      activitiesPostReleases: [
        'merge feature branch to master di real security',
        'swaggers APIM in repository bitbucket to master',
        'Merge soapUI del  feature branch con il branch master per sandbox',
        'Upload degli swagger su confluence per ogni cambiamento',
        'Eliminazione dei feature branch',
      ]
    }
  }),
  getters: {
    getProjectById: (state: State) => {
      return (id: string) => state.projects.find((project) => project.id === id)
    },
    getCurrentProjectDetails: (state: State) => {
      return () => {
        return state.currentProjectDetails
      }

    },
  },
  actions: {
    addProject(project: Project) {
      this.projects.push(project)
    },
    removeProject(project: Project) {
      this.projects.splice(this.projects.findIndex(projectStored => projectStored.id === project.id), 1)
    },
  },
})
