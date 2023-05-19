import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [noteList, setNoteList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://test-api-render.onrender.com/notes", {})
      .then((res) => {
        setNoteList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("https://test-api-render.onrender.com/auth/logout")
      .then((res) => {
        // Redirect user to login page
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://test-api-render.onrender.com/notes/${id}`)
      .then((res) => {
        console.log(res);
        const newNotes = noteList.filter((item) => {
          return item.id !== id;
        });
        setNoteList(newNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateHandler = (note) => {
    axios
      .put(`https://test-api-render.onrender.com/notes/${note.id}`, note)
      .then((res) => {
        console.log(res);
        setNoteList(
          noteList.map((item) => {
            if (item.id === note.id) {
              return {
                ...item,
                message: note.message,
                isActive: note.isActive,
                isArchived: note.isArchived,
                tags: note.tags,
              };
            } else {
              return item;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <NoteForm notes={noteList} setNotes={setNoteList} />
      <NoteList
        notes={noteList}
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
      />
    </div>
  );
}
