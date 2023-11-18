import React from "react";
import { NoteListProps } from "./interface/InterfaceNotes";

export const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  return (
    <>
      <ul className="notes__list notes-list-reset">
        {notes.map((note) => (
          <li className="notes__item" key={note.id}>
            {note.content}
            <button className="notes__btn-deleted notes-btn-reset" onClick={() => onDeleteNote(note.id)}>
              X
            </button>
            <span className="notes__id">{note.id}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NoteList;
