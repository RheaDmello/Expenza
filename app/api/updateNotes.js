// pages/api/updateNote.js
import { db } from '@/utils/dbConfig';
import { Notes } from '@/utils/schema';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { noteId, content } = req.body;
    if (!noteId || !content) {
      return res.status(400).json({ error: "NoteId and content are required" });
    }

    try {
      const updatedNote = await db
        .update(Notes)
        .set({ content: content })
        .where(Notes.id.eq(noteId))
        .returning('*');

      if (updatedNote.length === 0) {
        return res.status(404).json({ error: "Note not found" });
      }

      return res.status(200).json(updatedNote[0]);
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ error: "Failed to update note" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
