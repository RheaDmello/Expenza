import { v4 as uuidv4 } from 'uuid';

const addNote = async () => {
  if (!newNote.trim()) {
    toast.error("Note cannot be empty.");
    return;
  }

  setIsSubmitting(true);

  try {
    const currentTime = moment().format("DD/MM/YYYY");

    const newNoteId = uuidv4(); // Generate unique ID

    const result = await db.insert(Notes).values({
      id: newNoteId, // Ensure the ID is added
      content: newNote,
      created_at: currentTime,
      updated_at: null,
    });

    if (result) {
      toast.success("Note added!");
      setNotes([
        ...notes,
        { id: newNoteId, content: newNote, created_at: currentTime },
      ]);
      setNewNote("");
    }
  } catch (error) {
    console.error("Error adding note:", error);
    toast.error("Failed to add note. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
