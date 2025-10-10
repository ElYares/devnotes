/**
 * Entidad del dominio Note
 * Representa una nota dentro del sistema.
 */
export class Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  userId: number; // 👈 agregar esta línea
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Note>) {
    Object.assign(this, partial);
  }
}