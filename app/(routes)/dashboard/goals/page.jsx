// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { db } from "@/utils/dbConfig"; 
// import { Notes } from "@/utils/schema"; 
// import { eq } from "drizzle-orm"; 
// import moment from "moment"; 

// function GoalsPage() {
//   const [notes, setNotes] = useState([]); 
//   const [newNote, setNewNote] = useState(""); 
//   const [editedNote, setEditedNote] = useState(""); 
//   const [editingNoteId, setEditingNoteId] = useState(null); 
//   const [isSubmitting, setIsSubmitting] = useState(false); 

 
//   const fetchNotes = async () => {
//     try {
//       const result = await db.select().from(Notes); 
//       setNotes(result); 
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       toast.error("Failed to fetch notes. Please try again.");
//     }
//   };

  
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const addNote = async () => {
//     if (!newNote.trim()) {
//       toast.error("Note cannot be empty.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const currentTime = moment().format("DD/MM/YYYY"); 

     
//       const result = await db.insert(Notes).values({
//         content: newNote,
//         created_at: currentTime,
//         updated_at: null,
//       });

//       if (result) {
//         toast.success("Note added!");
//         setNotes([
//           ...notes,
//           { id: result.insertId, content: newNote, created_at: currentTime },
//         ]);
//         setNewNote(""); 
//       }
//     } catch (error) {
//       console.error("Error adding note:", error);
//       toast.error("Failed to add note. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const startEditing = (note) => {
//     setEditingNoteId(note.id); 
//     setEditedNote(note.content); 
//   };

 
//   const updateNote = async () => {
//     if (!editedNote.trim()) {
//       toast.error("Note cannot be empty.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const currentTime = moment().format("DD/MM/YYYY"); 

    
//       const result = await db
//         .update(Notes)
//         .set({
//           content: editedNote,
//           updated_at: currentTime,
//         })
//         .where(eq(Notes.id, editingNoteId));

//       if (result) {
//         toast.success("Note updated!");
//         setNotes(
//           notes.map((note) =>
//             note.id === editingNoteId
//               ? { ...note, content: editedNote, updated_at: currentTime }
//               : note
//           )
//         );
//         setEditingNoteId(null); 
//         setEditedNote(""); 
//       }
//     } catch (error) {
//       console.error("Error updating note:", error);
//       toast.error("Failed to update note. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const deleteNote = async (id) => {
//     setIsSubmitting(true);

//     try {
//       const result = await db.delete(Notes).where(eq(Notes.id, id));

//       if (result) {
//         toast.success("Note deleted!");
//         setNotes(notes.filter((note) => note.id !== id));
//       } else {
//         toast.error("Note deletion failed.");
//       }
//     } catch (error) {
//       console.error("Error deleting note:", error);
//       toast.error("Failed to delete note. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="font-bold text-3xl mb-4">My Goals</h2>

      
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Add Note</h3>
//         <Input
//           placeholder="Write your note here..."
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//         />
//         <Button
//           onClick={addNote}
//           className="mt-2"
//           disabled={!newNote.trim() || isSubmitting}
//         >
//           {isSubmitting ? "Adding..." : "Add Note"}
//         </Button>
//       </div>

      
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Notes</h3>
//         {notes.length === 0 ? (
//           <div className="text-gray-500">Currently no notes</div>
//         ) : (
//           <ul className="space-y-2">
//             {notes.map((note) => (
//               <li key={note.id} className="border p-2 rounded">
//                 {editingNoteId === note.id ? (
//                   <>
//                     <Input
//                       value={editedNote}
//                       onChange={(e) => setEditedNote(e.target.value)}
//                     />
//                     <Button
//                       onClick={updateNote}
//                       className="mt-2"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Updating..." : "Update Note"}
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <p>{note.content}</p>
//                     <small className="text-gray-500">
//                       Created at: {note.created_at}
//                     </small>
//                     {note.updated_at && (
//                       <small className="text-gray-500">
//                         | Updated at: {note.updated_at}
//                       </small>
//                     )}
//                     <div className="mt-2 flex space-x-2">
//                       <Button
//                         onClick={() => startEditing(note)}
//                         disabled={isSubmitting}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         onClick={() => deleteNote(note.id)}
//                         className="bg-red-500"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Deleting..." : "Delete"}
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GoalsPage;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig"; 
import { Notes } from "@/utils/schema"; 
import { eq } from "drizzle-orm"; 
import moment from "moment"; 

function GoalsPage() {
  const [notes, setNotes] = useState([]); 
  const [newNote, setNewNote] = useState(""); 
  const [editedNote, setEditedNote] = useState(""); 
  const [editingNoteId, setEditingNoteId] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const fetchNotes = async () => {
    try {
      const result = await db.select().from(Notes); 
      setNotes(result); 
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to fetch notes. Please try again.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) {
      toast.error("Note cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentTime = moment().format("DD/MM/YYYY"); 

      const result = await db.insert(Notes).values({
        content: newNote,
        created_at: currentTime,
        updated_at: null,
      });

      if (result) {
        toast.success("Note added!");
        setNotes([
          ...notes,
          { id: result.insertId, content: newNote, created_at: currentTime },
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

  const startEditing = (note) => {
    setEditingNoteId(note.id); 
    setEditedNote(note.content); 
  };

  const updateNote = async () => {
    if (!editedNote.trim()) {
      toast.error("Note cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentTime = moment().format("DD/MM/YYYY"); 

      const result = await db
        .update(Notes)
        .set({
          content: editedNote,
          updated_at: currentTime,
        })
        .where(eq(Notes.id, editingNoteId));

      if (result) {
        toast.success("Note updated!");
        setNotes(
          notes.map((note) =>
            note.id === editingNoteId
              ? { ...note, content: editedNote, updated_at: currentTime }
              : note
          )
        );
        setEditingNoteId(null); 
        setEditedNote(""); 
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteNote = async (id) => {
    setIsSubmitting(true);

    try {
      const result = await db.delete(Notes).where(eq(Notes.id, id));

      if (result) {
        toast.success("Note deleted!");
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        toast.error("Note deletion failed.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-3xl mb-4">My Goals</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Note</h3>
        <Input
          placeholder="Write your note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button
          onClick={addNote}
          className="mt-2"
          disabled={!newNote.trim() || isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Note"}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Notes</h3>
        {notes.length === 0 ? (
          <div className="text-gray-500">Currently no notes</div>
        ) : (
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={note.id || index} className="border p-2 rounded">
                {editingNoteId === note.id ? (
                  <>
                    <Input
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                    <Button
                      onClick={updateNote}
                      className="mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Note"}
                    </Button>
                  </>
                ) : (
                  <>
                    <p>{note.content}</p>
                    <small className="text-gray-500">
                      Created at: {note.created_at}
                    </small>
                    {note.updated_at && (
                      <small className="text-gray-500">
                        | Updated at: {note.updated_at}
                      </small>
                    )}
                    <div className="mt-2 flex space-x-2">
                      <Button
                        onClick={() => startEditing(note)}
                        disabled={isSubmitting}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteNote(note.id)}
                        className="bg-red-500"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GoalsPage;

