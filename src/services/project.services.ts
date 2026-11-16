import { STATI } from "@/assets/activities"
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

  const payload = await res.json()
  validateResponse(res, payload);
  
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


  const payload = await res.json()
  validateResponse(res, payload);

  // Supabase ritorna array
  return {
    ...payload[0],
    ...payload[0].data // merge per compatibilità con il tuo modello
  }
}

export const getStatiOverall = (): Stato[] => STATI;

export async function getProjectsOverall(): Promise<ProjectDTO[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=id,projectId,name&projectId=neq.TEMPLATE`,
    { headers }
  )
  const payload = await res.json()
  validateResponse(res, payload);

  return payload
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
export async function createProject(project: ProjectCreationDTO): Promise<ProjectDTO> {
  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({
      "p_id": project.id,
      "p_project": project.projectId,
      "p_name": project.name,
      "p_version": project.version
    })
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/create_project`,
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

function validateResponse(res: Response, payload: any):void{ 
    if (!res.ok || !payload) throw new Error(`Errore con l'API ${res.url} - ${res.status} - ${res.statusText}`)

}