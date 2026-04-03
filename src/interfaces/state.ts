import type { Project } from "./projects";
import type { Stato } from "./stati";

export interface State {
  projects: Project[],
  currentProjectDetails: {
    activitiesPreReleases: string[],
    activitiesDuringReleases: string[],
    activitiesPostReleases: string[]
  },
  stato: Stato[]
}
