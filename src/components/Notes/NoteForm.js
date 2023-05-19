import React, { useState } from "react";
import axios from "axios";

export default function NoteForm({ notes, setNotes }) {
  const initialState = {
    message: "",
    isActive: true,
    isArchived: false,
    tags: [],
  };

  const [note, setNote] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: checked,
      }));
    } else if (name === "tags") {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://test-api-render.onrender.com/notes", note)
      .then((res) => {
        setNotes([{ ...note, id: res.data.id }, ...notes]);
        setNote(initialState);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={note.message}
          placeholder="Enter your Note item"
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="isActive"
          checked={note.isActive}
          onChange={handleChange}
        />
        <label htmlFor="isActive">Is Active</label>
        <input
          type="checkbox"
          name="isArchived"
          checked={note.isArchived}
          onChange={handleChange}
        />
        <label htmlFor="isArchived">Is Archived</label>
        <input
          type="text"
          name="tags"
          value={note.tags.join(",")}
          placeholder="Tags separated by commas"
          onChange={handleChange}
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}
