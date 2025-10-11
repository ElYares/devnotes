"use client";
import { useState } from "react";
import { login } from "../services/auth.service";

export default function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      onSuccess(data.access_token);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2C2C2E] border border-[#3A3A3E] rounded-2xl p-8 shadow-lg w-full max-w-sm"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">🔐 DevNotes</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded-md bg-[#1C1C1E] border border-[#3A3A3E] text-[#EDEDED] placeholder-[#A1A1AA] focus:border-[#6366F1] outline-none"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-5 px-3 py-2 rounded-md bg-[#1C1C1E] border border-[#3A3A3E] text-[#EDEDED] placeholder-[#A1A1AA] focus:border-[#6366F1] outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6366F1] hover:bg-[#5558DA] text-white font-medium py-2 rounded-md transition-colors"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
