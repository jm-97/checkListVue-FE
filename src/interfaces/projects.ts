import type { singleStato, Stato } from "./stati";

export interface RootInterface {
  '$schema': string;
  posts: Post[];
  comments: Comment[];
  profile: Profile;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string
  sandbox?: Sandbox;
  real?: Sandbox;
}

export interface Sandbox {
  activitiesPreReleases: Activity[];
  activitiesDuringReleases: Activity[];
  activitiesPostReleases: Activity[];
}

export interface Profile {
  name: string;
}

export interface Comment {
  id: string;
  text: string;
  postId: string;
}

export interface Post {
  id: string;
  title: string;
  views: number;
}
export interface Activity {
  text: string,
  stato: singleStato
}
