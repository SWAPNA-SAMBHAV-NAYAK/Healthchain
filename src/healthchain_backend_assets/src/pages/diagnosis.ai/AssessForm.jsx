import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AssessForm.scss";
import Swal from 'sweetalert2';
import InputBox from "./InputBox";

const AssessForm = ({ inputs, setInputs, disease, handleSubmit, submitKoHandle, register }) => {

  const inputChangeKoHandle = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  
  return (
    <form onSubmit={handleSubmit(submitKoHandle)} className="diagnosis-ai">
      {disease.inputs.map((input, index) => (
        <InputBox
          key={index}
          input={input}
          inputChangeKoHandle={inputChangeKoHandle}
          register={register}
        />
      ))}
      <button className="buttonyy" type="submit">Submit</button>
    </form>
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
      })
    ).isRequired
  }).isRequired
};

export default AssessForm;
