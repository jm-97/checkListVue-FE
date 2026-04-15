import type { createProjectPayload } from "@/interfaces/response"
import type { Stato } from "@/interfaces/stati"

export const ACTIVITIES = (version: string, pj: string): createProjectPayload => {
  return {
    "environments": [
      {
        "name": "Sandbox",
        "fases": [
          {
            "name": "PRE-Release",
            "activity": [
              {
                "text": "Sviluppo lato policy Studio per accogliere le nuove modifiche seguendo l’ATE.",
                "stato": "non_completato"
              },
              {
                "text": "SIT",
                "stato": "non_completato"
              },
              {
                "text": "UAT",
                "stato": "non_completato"
              },
              {
                "text": "No regression in qa",
                "stato": "non_completato"
              },
              {
                "text": "Aprire TASK su Change",
                "stato": "non_completato"
              },
              {
                "text": "caricamento endpoint KPS e testFacility update",
                "stato": "non_necessario"
              },
              {
                "text": `Caricamento swagger .docs ${version} su API Portal joomla per le 4 macchine`,
                "stato": "non_completato"
              },
              {
                "text": "Aprire task per update dns",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per certificato",
                "stato": "non_necessario"
              },
              {
                "text": `Caricamento yaml countrySpecific ${version} su API Portal`,
                "stato": "non_completato"
              },
              {
                "text": "Verificare su tutte le macchine",
                "stato": "non_completato"
              },
              {
                "text": "Verificare download degli swagger downloadables",
                "stato": "non_completato"
              },
              {
                "text": "Verificare accesso scripts e testare etc host",
                "stato": "non_completato"
              },
              {
                "text": "Aggiornamento test facility",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per caricamento pagine mockate sandbox",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per i plugin per il download in yaml",
                "stato": "non_necessario"
              },
              {
                "text": "sviluppo della collection Change con newman",
                "stato": "non_completato"
              }
            ]
          },
          {
            "name": "During-Release",
            "activity": [
              {
                "text": `Deployare real security feature/${pj} da gandalf in prod`,
                "stato": "non_completato"
              },
              {
                "text": "deploy plugin for the download of yaml",
                "stato": "non_completato"
              },
              {
                "text": "Caricamento delle pagine mockate sandbox da vts",
                "stato": "non_completato"
              },
              {
                "text": "Caricamento pagina api catalog not logged",
                "stato": "non_completato"
              },
              {
                "text": `Numerino a ${version}`,
                "stato": "non_completato"
              },
              {
                "text": "Aggiunta di tabs basket e bulk per bg not logged",
                "stato": "non_completato"
              },
              {
                "text": "test mirati per nuove funzionalità in PROD",
                "stato": "non_completato"
              },
              {
                "text": `Aggiornamento API Manager APIM CLI, con swagger ${version}`,
                "stato": "non_completato"
              },
              {
                "text": "cambiare etc/host e lanciare tutta soapUI per sandbox e (real)",
                "stato": "non_completato"
              },
              {
                "text": "soapUI pronto lato sandbox e real",
                "stato": "non_completato"
              },
              {
                "text": "verificare test facility, getting startedPublic e gettingStartedLogged, DOCUMENTATION(loged)",
                "stato": "non_completato"
              },
              {
                "text": "Controllare sulle 4 macchine di REAL+SANDBOX che FE APIs, BE APIs, e Catalog siano aggiornati correttamente",
                "stato": "non_completato"
              },
              {
                "text": "Controllare sulle 4 macchine di Portale che Catalog siano aggiornati correttamente",
                "stato": "non_completato"
              },
              {
                "text": "PYTHON swagger downloadable BY BRUTE FORCE",
                "stato": "non_completato"
              },
              {
                "text": "Upload del newman report",
                "stato": "non_completato"
              }
            ]
          },
          {
            "name": "POST-Release",
            "activity": [
              {
                "text": "merge feature branch to master di real security",
                "stato": "non_completato"
              },
              {
                "text": "swaggers APIM in repository bitbucket to master",
                "stato": "non_completato"
              },
              {
                "text": "Merge soapUI del  feature branch con il branch master per sandbox",
                "stato": "non_completato"
              },
              {
                "text": "Upload degli swagger su confluence per ogni cambiamento",
                "stato": "non_completato"
              },
              {
                "text": "Eliminazione dei feature branch",
                "stato": "non_completato"
              }
            ]
          }
        ]
      },
      {
        "name": "Real",
        "fases": [
          {
            "name": "PRE-Release",
            "activity": [
              {
                "text": "Sviluppo lato policy Studio per accogliere le nuove modifiche seguendo l’ATE.",
                "stato": "non_completato"
              },
              {
                "text": "SIT",
                "stato": "non_completato"
              },
              {
                "text": "UAT",
                "stato": "non_completato"
              },
              {
                "text": "No regression in qa",
                "stato": "non_completato"
              },
              {
                "text": "Aprire TASK su Change",
                "stato": "non_completato"
              },
              {
                "text": "caricamento endpoint KPS e testFacility update",
                "stato": "non_necessario"
              },
              {
                "text": `Caricamento swagger .docs ${version} su API Portal joomla per le 4 macchine`,
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per update dns",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per certificato",
                "stato": "non_necessario"
              },
              {
                "text": `Caricamento yaml countrySpecific ${version} su API Portal`,
                "stato": "non_necessario"
              },
              {
                "text": "Verificare su tutte le macchine",
                "stato": "non_necessario"
              },
              {
                "text": "Verificare download degli swagger downloadables",
                "stato": "non_necessario"
              },
              {
                "text": "Verificare accesso scripts e testare etc host",
                "stato": "non_completato"
              },
              {
                "text": "Aggiornamento test facility",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per caricamento pagine mockate sandbox",
                "stato": "non_necessario"
              },
              {
                "text": "Aprire task per i plugin per il download in yaml",
                "stato": "non_necessario"
              },
              {
                "text": "sviluppo della collection Change con newman",
                "stato": "non_completato"
              }
            ]
          },
          {
            "name": "During-Release",
            "activity": [
              {
                "text": `Deployare real security feature/${pj} da gandalf in prod`,
                "stato": "non_completato"
              },
              {
                "text": "deploy plugin for the download of yaml",
                "stato": "non_necessario"
              },
              {
                "text": "Caricamento delle pagine mockate sandbox da vts",
                "stato": "non_necessario"
              },
              {
                "text": "Caricamento pagina api catalog not logged",
                "stato": "non_necessario"
              },
              {
                "text": `Numerino a ${version}`,
                "stato": "non_necessario"
              },
              {
                "text": "Aggiunta di tabs basket e bulk per bg not logged",
                "stato": "non_necessario"
              },
              {
                "text": "test mirati per nuove funzionalità in PROD",
                "stato": "non_completato"
              },
              {
                "text": `Aggiornamento API Manager APIM CLI, con swagger ${version}`,
                "stato": "non_necessario"
              },
              {
                "text": "cambiare etc/host e lanciare tutta soapUI per sandbox e (real)",
                "stato": "non_completato"
              },
              {
                "text": "soapUI pronto lato sandbox e real",
                "stato": "non_completato"
              },
              {
                "text": "verificare test facility, getting startedPublic e gettingStartedLogged, DOCUMENTATION(loged)",
                "stato": "non_necessario"
              },
              {
                "text": "Controllare sulle 4 macchine di REAL+SANDBOX che FE APIs, BE APIs, e Catalog siano aggiornati correttamente",
                "stato": "non_necessario"
              },
              {
                "text": "Controllare sulle 4 macchine di Portale che Catalog siano aggiornati correttamente",
                "stato": "non_necessario"
              },
              {
                "text": "PYTHON swagger downloadable BY BRUTE FORCE",
                "stato": "non_necessario"
              },
              {
                "text": "Upload del newman report",
                "stato": "non_completato"
              }
            ]
          },
          {
            "name": "POST-Release",
            "activity": [
              {
                "text": "merge feature branch to master di real security",
                "stato": "non_completato"
              },
              {
                "text": "swaggers APIM in repository bitbucket to master",
                "stato": "non_necessario"
              },
              {
                "text": "Merge soapUI del  feature branch con il branch master per sandbox",
                "stato": "non_necessario"
              },
              {
                "text": "Upload degli swagger su confluence per ogni cambiamento",
                "stato": "non_necessario"
              },
              {
                "text": "Eliminazione dei feature branch",
                "stato": "non_completato"
              }
            ]
          }
        ]
      }
    ]
  }
}

export const STATI: Stato[] = [
  { value: "non_completato", color: "red" },
  { value: "non_necessario", color: "black" },
  { value: "ongoing", color: "blue" },
  { value: "completato", color: "green" }
]
