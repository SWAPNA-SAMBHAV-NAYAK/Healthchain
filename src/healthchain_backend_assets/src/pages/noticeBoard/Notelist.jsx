import React from "react";
import "./Notelist.scss";
import Notecard from "./Notecard";
const Notelist = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Notecard
          key={note.timestamp}
          name={note.name}
          title={note.title}
          content={note.content}
          timestamp={note.timestamp}
          onDelete={() => onDelete(note.timestamp)}
        />
      ))}
    </div>
  );
};
export default Notelist;
