const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Error ${res.status}`);
  }
  // Si no hay cuerpo (204 o vacío), retorna null
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function getNotes(token: string) {
  const res = await fetch(`${API_BASE}/api/v1/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

export async function createNote(token: string, data: any) {
  const res = await fetch(`${API_BASE}/api/v1/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateNote(token: string, id: number, data: any) {
  const res = await fetch(`${API_BASE}/api/v1/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteNote(token: string, id: number) {
  const res = await fetch(`${API_BASE}/api/v1/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}
