import React from "react";
import "./Header.scss";

function Header({ setAddEmployee }) {
  return (
    <header>
      <h2>Employee Management</h2>
      <div>
        <button className="round-button" onClick={() => setAddEmployee(true)}>
          Add Employee
        </button>
      </div>
    </header>
  );
}

export default Header;
