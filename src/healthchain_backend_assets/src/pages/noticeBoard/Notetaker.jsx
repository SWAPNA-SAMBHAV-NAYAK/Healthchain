import React, { useState } from "react";
import "./Notetaker.scss";

const Notetaker = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    const timestamp = new Date().getTime();
    onAdd({ name, title, content, timestamp });
    setName("");
    setTitle("");
    setContent("");
  };

  return (
    <div className="notetaker">
      <h2>Notice Board</h2>
      <div className="inputs">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>
      {/* <div className="notecards">
        {notes.map((note, index) => (
          <Notecard
            key={index}
            note={note}
            onDelete={() => deleteNote(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Notetaker;
