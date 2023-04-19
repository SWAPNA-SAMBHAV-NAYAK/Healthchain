import React from "react";
import "./Notecard.scss";
const Notecard = ({ name, title, content, timestamp, onDelete }) => {
  return (
    <div className="notecard">
      {/* <div className="delete" onClick={onDelete}>
        delete
      </div> */}
      <div className="content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className="footer">
        <div className="name">Posted By: {name}</div>
        <div className="timestamp">{new Date(Number(timestamp) / 1000000).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Notecard;
