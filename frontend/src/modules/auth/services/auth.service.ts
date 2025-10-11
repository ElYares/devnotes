const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error al iniciar sesión: ${msg}`);
  }

  return res.json();
}

export async function signup(email: string, password: string, fullName?: string) {
  const res = await fetch(`${API_BASE}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullName }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error al registrarse: ${msg}`);
  }

  return res.json();
}
