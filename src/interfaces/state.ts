import type { Project } from "./projects";

export interface State {
  projects: Project[],
  currentProjectDetails: {
    activitiesPreReleases: string[],
    activitiesDuringReleases: string[],
    activitiesPostReleases: string[]
  }
}
