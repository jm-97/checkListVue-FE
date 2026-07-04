import { ACTIVITIES, STATI } from "@/assets/activities"
import type { Project, ProjectCreationDTO, ProjectDTO } from "@/interfaces/projects"
import type { Stato } from "@/interfaces/stati"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
const SUPABASE_TABLE = import.meta.env.VITE_SUPABASE_TABLE


const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`
}

//http://localhost:3000
export async function getPJDetails(id: string): Promise<Project> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${id}`,
    { headers }
  )

  if (!res.ok) throw new Error("Errore API")

  const data = await res.json()

  // Supabase ritorna array
  return {
    ...data[0],
    ...data[0].data // merge per compatibilità con il tuo modello
  }
}

export async function getTemplate(): Promise<Project> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?projectId=eq.TEMPLATE`,
    { headers }
  )

  if (!res.ok) throw new Error("Errore API")

  const data = await res.json()

  // Supabase ritorna array
  return {
    ...data[0],
    ...data[0].data // merge per compatibilità con il tuo modello
  }
}

export const getStatiOverall = (): Stato[] => STATI;

export async function getProjectsOverall(): Promise<ProjectDTO[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=id,projectId,name&projectId=neq.TEMPLATE`,
    { headers }
  )

  if (!res.ok) throw new Error("Errore API")

  return res.json()
}

export async function putProject(project: Project): Promise<Project> {
  const init: RequestInit = {
    method: "PATCH", // ⚠️ NON PUT
    headers,
    body: JSON.stringify({
      data: {
        environments: project.environments
      }
    })
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${project.id}`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  const data = await res.json()

  return {
    ...data[0],
    ...data[0].data
  }
}

export async function createProject(project: Project): Promise<ProjectDTO> {
  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: project.id,
      projectId: project.projectId,
      name: project.name,
      data: { environments: project.environments }
    })
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  const data = await res;
  return { id: project.id, name: project.name, projectId: project.projectId }
}

export async function deleteProjectById(id: string): Promise<Project> {
  const init: RequestInit = {
    method: "DELETE",
    headers: { ...headers, "Prefer": "return=representation" }
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${id}`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  const data = await res.json();
  return data.body
}
