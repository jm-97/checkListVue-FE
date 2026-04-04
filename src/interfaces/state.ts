import type { Project, Sandbox } from "./projects";
import type { Stato } from "./stati";

export interface State {
  projects: Project[],
  currentProjectDetails: Project,
  stato: Stato[]
}
