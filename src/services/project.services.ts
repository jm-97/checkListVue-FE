import type { Project } from "@/interfaces/projects"

// services/user.service.js
export async function getPJDetails(id: string): Promise<Project> {
  const res = await fetch('http://localhost:3000/projects/' + id)

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}
