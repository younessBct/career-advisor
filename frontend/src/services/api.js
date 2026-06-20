const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function sendQuery(message, sessionId = getSessionId()) {
  const response = await fetch(`${BASE_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
  })
  if (!response.ok) throw new Error('Query failed')
  return response.json()
}

export async function saveProfile(profileData, sessionId = getSessionId()) {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...profileData, session_id: sessionId }),
  })
  if (!response.ok) throw new Error('Profile save failed')
  return response.json()
}

function getSessionId() {
  let id = sessionStorage.getItem('session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('session_id', id)
  }
  return id
}
