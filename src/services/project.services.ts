// services/user.service.js
export async function getUser() {
  const res = await fetch('http://localhost:3000/projects/PJ002835')

  if (!res.ok) {
    throw new Error('Errore API')
  }

  return res.json()
}
