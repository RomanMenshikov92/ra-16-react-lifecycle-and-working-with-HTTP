import React, { useEffect, useState } from "react";
import NoteProps from "./interface/InterfaceNotes";
import NoteListChild from "./NoteListChild";
import "./notes.css";

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:7070/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleAddNote = () => {
    fetch("http://localhost:7070/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 0, content: newNote }),
    })
      .then(() => fetch("http://localhost:7070/notes"))
      .then((response) => response.json())
      .then((data) => setNotes(data));

    setNewNote("");
  };

  const handleDeleteNote = (id: number) => {
    fetch(`http://localhost:7070/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:7070/notes"))
      .then((response) => response.json())
      .then((data) => setNotes(data));
  };

  const handleRefresh = () => {
    fetch("http://localhost:7070/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  };

  return (
    <div className="notes__wrapper">
      <form className="notes__form">
        <button className="notes__btn-refresh notes-btn-reset" onClick={handleRefresh}>
          ↻
        </button>
        <label className="notes__label" htmlFor="field"></label>
        <textarea
          className="notes__input notes-input-reset"
          id="field"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Ваш контент"
          style={{ minHeight: "100px", overflowY: "hidden" }}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
        ></textarea>
        <button className="notes__btn-added notes-btn-reset" onClick={handleAddNote}>
          +
        </button>
      </form>
      <NoteListChild notes={notes} onDeleteNote={handleDeleteNote}></NoteListChild>
    </div>
  );
};

export default Notes;
