import type { Project, ProjectDTO } from "./projects";
import type { Stato } from "./stati";

export interface State {
  projects: ProjectDTO[],
  currentProjectDetails: Project,
  currentTemplate: Project,
  stato: Stato[],
  loadingCount: number
}
