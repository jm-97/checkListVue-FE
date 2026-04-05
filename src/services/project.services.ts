import type { Project } from "@/interfaces/projects"
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

export async function putProject(projectId: string, body: Project): Promise<Project> {
  const init: RequestInit = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }
  const res = await fetch('http://localhost:3000/projects/' + projectId, init)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}
