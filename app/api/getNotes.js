// pages/api/getNotes.js
import { db } from '@/utils/dbConfig';
import { Notes } from '@/utils/schema';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notes = await db
        .select()
        .from(Notes)
        .where(Notes.user_id.eq(req.query.userId)); // Filtering by userId

      return res.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ error: "Failed to fetch notes" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
