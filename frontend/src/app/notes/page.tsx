"use client";

import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/modules/notes/services/notes.service";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Estado para editar
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;
    setToken(t);
    getNotes(t)
      .then(setNotes)
      .catch(() => setError("No se pudieron cargar las notas"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleCreate = async () => {
    if (!token) return alert("No autorizado");
    try {
      const note = await createNote(token, { title, content });
      setNotes([...notes, note]);
      setTitle("");
      setContent("");
    } catch (e: any) {
      alert("Error al crear nota: " + e.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteNote(token, id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const openEditModal = (note: any) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = async () => {
    if (!token || !editingNote) return;
    try {
      const updated = await updateNote(token, editingNote.id, {
        title: editTitle,
        content: editContent,
      });
      setNotes(notes.map((n) => (n.id === editingNote.id ? updated : n)));
      closeModal();
    } catch (e: any) {
      alert("Error al actualizar nota: " + e.message);
    }
  };

  const closeModal = () => {
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🧠 DevNotes
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Crear nota */}
      <div className="bg-[#1A1A1D] p-5 rounded-2xl shadow-md mb-8 border border-[#2A2A2D]">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          ✏️ Crear nueva nota
        </h2>
        <input
          type="text"
          placeholder="Título..."
          className="w-full mb-3 p-2 rounded bg-[#0E0E10] border border-[#2A2A2D] text-gray-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido..."
          className="w-full mb-3 p-2 rounded bg-[#0E0E10] border border-[#2A2A2D] text-gray-200"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition"
        >
          Crear nota
        </button>
      </div>

      {/* Lista de notas */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-[#1A1A1D] border border-[#2A2A2D] rounded-2xl p-5 shadow-md hover:border-indigo-600 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{note.title}</h3>
              <div className="space-x-3 text-sm">
                <button
                  onClick={() => openEditModal(note)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="text-gray-400 mb-3">{note.content}</p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-[#0E0E10] text-indigo-400 border border-indigo-600 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500">
              🕓 Creada el {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1D] p-6 rounded-2xl w-full max-w-md shadow-lg border border-[#2A2A2D] animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-indigo-400">
              ✏️ Editar nota
            </h3>
            <input
              type="text"
              className="w-full mb-3 p-2 rounded bg-[#0E0E10] border border-[#2A2A2D] text-gray-200"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="w-full mb-3 p-2 rounded bg-[#0E0E10] border border-[#2A2A2D] text-gray-200"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
