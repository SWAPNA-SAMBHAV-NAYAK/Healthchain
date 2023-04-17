import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AssessForm.scss";
import { predictRisk } from "./predictRisk";
import InputBox from "./InputBox";

const AssessForm = ({ disease }) => {
  const [inputs, setInputs] = useState({});

  const inputChangeKoHandle = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submitKoHandle = (e) => {
    e.preventDefault();
    const riskResult = predictRisk(disease, inputs);
    console.log("Risk Result: ", riskResult);
  };

  return (
    // <Preview id={"jsx-template"}>
    <form onSubmit={submitKoHandle}>
      {disease.inputs.map((input, index) => (
        <InputBox
          key={index}
          input={input}
          inputChangeKoHandle={inputChangeKoHandle}
        />
      ))}
      <button className="buttonyy" type="submit">Submit</button>
    </form>
    // </Preview>
  );
};

AssessForm.propTypes = {
  disease: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
        // min: PropTypes.number.isRequired,
        // max: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default AssessForm;
