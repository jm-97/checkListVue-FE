import type { singleStato } from "./stati";

export interface RootInterface {
  '$schema': string;
  projects: Project[];
}
export interface ProjectDTO {
  id: string,
  projectId: string;
  name: string
}
export interface ProjectCreationDTO extends ProjectDTO {
  version: string;
}
export interface Project extends ProjectDTO {
  environments: Environment[];
}
export interface Environment {
  name: string;
  fases: Fases[]
}

export interface Fases {
  name: string;
  activity: Activity[]
}

export interface Activity {
  id: number,
  activityId: number,
  text: string,
  stato: singleStato
}

export interface ActivityUpdate {
  id: number,
  stato: singleStato
}
