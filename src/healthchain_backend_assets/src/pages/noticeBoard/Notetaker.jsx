import React, { useState } from "react";
import "./Notetaker.scss";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import Swal from "sweetalert2";

const Notetaker = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const authCannister = useAuthenticatedCannister();

  const handleAddNotice = async (e) => {
    e.preventDefault();

    await authCannister.createNotice(title, content);

    dispatch(loadNoticeList(authCannister));

    Swal.fire({
      icon: "success",
      title: "Notice created successfully",
      showConfirmButton: false,
      timer: 1500
  });
  };

  return (
    <div className="notetaker">
      <h2>Notice Board</h2>
      <form className="inputs">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Notice"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={handleAddNotice}>Add Notice</button>
      </form>
    </div>
  );
};

export default Notetaker;
