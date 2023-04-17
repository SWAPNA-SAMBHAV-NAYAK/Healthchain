import React, { useState } from "react";
import AssessForm from "./AssessForm";
import "./FormDisplay.scss";
import { data } from "./data";
import Dropdown from "./Dropdown";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const FormDisplay = () => {
  const [chosenDisease, setChosenDisease] = useState(null);

  const chosenDiseaseKoHandle = (e) => {
    const disease = data.find((d) => d.value === e);
    setChosenDisease(disease);
  };
  return (
    <div className="mainContainer">
      <Sidebar/>
      <div className="ekAurClass">
        <Navbar/>
        <div className="container"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
            <Dropdown
              data={data}
              chosenDiseaseKoHandle={chosenDiseaseKoHandle}
              chosenDisease={chosenDisease}
            />
            {chosenDisease && <AssessForm disease={chosenDisease} />}
        </div>
      </div>
    </div>
  );
};

export default FormDisplay;
