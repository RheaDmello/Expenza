// pages/api/saveNotes.js
import { db } from '@/utils/dbConfig';
import { Notes } from '@/utils/schema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: "UserId and content are required" });
    }

    try {
      const newNote = await db
        .insert(Notes)
        .values({
          user_id: userId,
          content: content,
        })
        .returning('*');

      return res.status(201).json(newNote);
    } catch (error) {
      console.error("Error saving note:", error);
      return res.status(500).json({ error: "Failed to save note" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
