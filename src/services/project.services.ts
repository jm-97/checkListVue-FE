import { ACTIVITIES, STATI } from "@/assets/activities"
import type { ActivityUpdate, Project, ProjectCreationDTO, ProjectDTO, TextUpdate } from "@/interfaces/projects"
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
  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({
      "project_uuid": id
    })
  }
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/get_project_with_phases`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  const payload = await res.json()
  payload.environments = payload.data.environments;
  delete payload.data;
  // Supabase ritorna array
  return {
    ...payload // merge per compatibilità con il tuo modello
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

export async function putActivity(activity: ActivityUpdate): Promise<ActivityUpdate> {
  const init: RequestInit = {
    method: "PATCH", //
    headers,
    body: JSON.stringify({
      status: activity.stato
    })
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/project_activities?id=eq.${activity.id}`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  //const data = await res.json()

  return activity
}

export async function putText(text: TextUpdate): Promise<TextUpdate> {
  const init: RequestInit = {
    method: "PATCH", //
    headers,
    body: JSON.stringify({
      text_display: text.text
    })
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/project_activities?id=eq.${text.id}`,
    init
  )

  if (!res.ok) throw new Error("Errore API")

  //const data = await res.json()

  return text
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
