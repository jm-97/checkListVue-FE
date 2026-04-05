import type { Project, ProjectDTO } from "@/interfaces/projects"
import type { Stato } from "@/interfaces/stati"

export async function getPJDetails(id: string): Promise<Project> {
  const res = await fetch('http://localhost:3000/projects/' + id)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function getStatiOverall(): Promise<Stato[]> {
  const res = await fetch('http://localhost:3000/stati')

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}

export async function getProjectsOverall(): Promise<ProjectDTO[]> {
  const res = await fetch('http://localhost:3000/projectsDTO')

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
  const res = await fetch('http://localhost:3000/projects/' + project.projectId, init)

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
  const res = await fetch('http://localhost:3000/projectsDTO/', init)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}
