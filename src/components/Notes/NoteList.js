import React, { useState } from "react";
import Note from "./Note";

export default function NoteList({ notes, deleteHandler, updateHandler }) {
  const [filter, setFilter] = useState("all");
  const [tags, setTags] = useState([]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setTags([]);
  };

  const handleTagsChange = (e) => {
    const value = e.target.value.trim();
    setTags(value.split(",").map((tag) => tag.trim()));
  };

  const filteredNotes = notes
    // eslint-disable-next-line
    .filter((note) => {
      if (filter === "all") return !note.isArchived;
      if (filter === "active") return note.isActive && !note.isArchived;
      if (filter === "archived") return note.isArchived;
    })
    .filter((note) => {
      if (tags.length === 0) return true;
      return tags.every((tag) =>
        note.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    });

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <button onClick={() => handleFilterChange("all")}>All</button>
      <button onClick={() => handleFilterChange("active")}>Active</button>
      <button onClick={() => handleFilterChange("archived")}>Archived</button>
      <input
        type="text"
        placeholder="Tags separated by commas"
        onChange={handleTagsChange}
        onKeyDown={handleKeyDown}
      />
      {filteredNotes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
          />
        );
      })}
    </div>
  );
}
