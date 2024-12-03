// pages/api/deleteNote.js
import { db } from '@/utils/dbConfig';
import { Notes } from '@/utils/schema';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { noteId } = req.query;
    if (!noteId) {
      return res.status(400).json({ error: "NoteId is required" });
    }

    try {
      const deletedNote = await db
        .delete(Notes)
        .where(Notes.id.eq(noteId))
        .returning('*');

      if (deletedNote.length === 0) {
        return res.status(404).json({ error: "Note not found" });
      }

      return res.status(200).json(deletedNote[0]);
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ error: "Failed to delete note" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
