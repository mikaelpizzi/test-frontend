import React, { useState } from "react";

export default function Note({ note, deleteHandler, updateHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);

  const updatedNoteState = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        [name]: checked,
      }));
    } else if (name === "tags") {
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        [name]: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };

  const updateAndReset = (input, e) => {
    e.preventDefault();
    // Call updateHandler with the input
    updateHandler(input);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteHandler(note.id);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={(e) => updateAndReset(updatedNote, e)}>
          <input
            type="text"
            name="message"
            defaultValue={note.message}
            onChange={updatedNoteState}
          />
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={note.isActive}
            onChange={updatedNoteState}
          />
          <label htmlFor="isActive">Is Active</label>
          <input
            type="checkbox"
            name="isArchived"
            defaultChecked={note.isArchived}
            onChange={updatedNoteState}
          />
          <label htmlFor="isArchived">Is Archived</label>
          <input
            type="text"
            name="tags"
            defaultValue={note.tags.join(",")}
            placeholder="Tags separated by commas"
            onChange={updatedNoteState}
          />
          <button type="submit">Update Note</button>
        </form>
      ) : (
        <p onDoubleClick={() => setIsEditing(true)}>{note.message}</p>
      )}
      {note.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
      <button onClick={handleDelete}>X</button>
    </div>
  );
}
