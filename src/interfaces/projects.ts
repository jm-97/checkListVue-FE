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
  activitiesPreReleases: string[];
  activitiesDuringReleases: string[];
  activitiesPostReleases: string[];
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
