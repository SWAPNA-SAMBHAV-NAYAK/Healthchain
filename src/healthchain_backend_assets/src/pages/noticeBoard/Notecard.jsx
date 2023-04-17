import React from "react";
import "./Notecard.scss";
const Notecard = ({ name, title, content, timestamp, onDelete }) => {
  return (
    <div className="notecard">
      <div className="delete" onClick={onDelete}>
        delete
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className="footer">
        <div className="name">{name}</div>
        {/* <div className="timestamp">{moment(timestamp).fromNow()}</div> */}
      </div>
    </div>
  );
};

export default Notecard;
