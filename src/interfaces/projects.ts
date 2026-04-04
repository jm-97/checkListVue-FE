import type { singleStato } from "./stati";

export interface RootInterface {
  '$schema': string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  environments?: Environment[];
}
interface Environment {
  name: string;
  fases: Fases[]
}

interface Fases {
  name: string;
  activity: Activity[]
}

export interface Activity {
  text: string,
  stato: singleStato
}
