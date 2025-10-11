"use client";
import { login } from "@/modules/auth/services/auth.service";
import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      const data = await login(email, password);

      // 🔹 Guarda el token JWT
      localStorage.setItem("token", data.access_token);

      // 🔹 Redirige al dashboard o notas
      window.location.href = "/notes";
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-textPrimary">
      <div className="bg-surface p-6 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">🔐 DevNotes</h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-background border border-surface rounded-md"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 bg-background border border-surface rounded-md"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-accent hover:bg-indigo-600 text-white py-2 rounded-md"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
