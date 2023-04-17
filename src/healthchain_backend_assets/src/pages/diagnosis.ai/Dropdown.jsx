import React from "react";
import "./Dropdown.scss";
const Dropdown = ({ data, chosenDiseaseKoHandle, chosenDisease }) => {
  return (
    <div className="dropdown">
      <h2>Select a Disease</h2>
      <select
        onChange={(e) => chosenDiseaseKoHandle(e.target.value)}
        value={chosenDisease ? chosenDisease.value : ""}
      >
        <option value="" disabled>
          Pick a Disease
        </option>
        {data.map((disease, i) => (
          <option key={i} value={disease.value}>
            {disease.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
