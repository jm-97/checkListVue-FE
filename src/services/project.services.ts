import type { Project, ProjectDTO } from "@/interfaces/projects"
import type { Stato } from "@/interfaces/stati"
const hostname: string = "https://checklist-server-jo4k.onrender.com";
//http://localhost:3000
export async function getPJDetails(id: string): Promise<Project> {
  const res = await fetch(hostname + '/projects/' + id)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function getStatiOverall(): Promise<Stato[]> {
  const res = await fetch(hostname + '/stati')

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function getProjectsOverall(): Promise<ProjectDTO[]> {
  const res = await fetch(hostname + '/projectsDTO')

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function putProject(project: Project): Promise<Project> {
  const init: RequestInit = {
    method: "PUT",
    body: JSON.stringify(project),
    headers: { "Content-Type": "application/json" },
  }
  const res = await fetch(hostname + '/projects/' + project.id, init)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function createProject(projectDTO: ProjectDTO): Promise<Project> {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(projectDTO),
    headers: { "Content-Type": "application/json" },
  }
  const res = await fetch(hostname + '/projectsDTO/', init)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}
