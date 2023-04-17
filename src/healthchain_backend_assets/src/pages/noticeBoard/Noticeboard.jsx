import React, { useState } from "react";
import Notetaker from "./Notetaker";
import Notelist from "./Notelist";
import "./Noticeboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Noticeboard = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes([...notes, note]);
  };

  const handleDeleteNote = (timestamp) => {
    setNotes(notes.filter((note) => note.timestamp !== timestamp));
  };
  return (
    <div className="mainContainer">
      <Sidebar/>
      <div className="ekAurClass">
        <Navbar/>
        <div className="notice-board">
          <Notetaker onAdd={handleAddNote} />
          <Notelist notes={notes} onDelete={handleDeleteNote} />
        </div>
      </div>
    </div>
  );
};
export default Noticeboard;
