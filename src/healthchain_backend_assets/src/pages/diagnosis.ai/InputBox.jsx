import React from "react";
import PropTypes from "prop-types";

const InputBox = ({ input, inputChangeKoHandle }) => {
  const { label, name, type, step, min, max } = input;
  if (name === "gender") {
    return (
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Male"
          required
        >
          {/* <option value="">Select Gender</option> */}
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    );
  }
  if (name === "sex") {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="M"
          required
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
    );
  }
  if (name === "chestpaintype") {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="ASY"
          required
        >
          <option value="ASY">ASY</option>
          <option value="NAP">NAP</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
  if (name === "restingecg") {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Normal"
          required
        >
          <option value="Normal">Normal</option>
          <option value="LVH">LVH</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
  if (name === "eia") {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Y"
          required
        >
          <option value="Y">Y</option>
          <option value="N">N</option>
        </select>
      </div>
    );
  }
  if (name === "pes") {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Flat"
          required
        >
          <option value="Flat">Flat</option>
          <option value="Up">Up</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        min={min}
        max={max}
        onChange={inputChangeKoHandle}
        required
      />
    </div>
  );
};

InputBox.propTypes = {
  input: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
    // min: PropTypes.number.isRequired,
    // max: PropTypes.number.isRequired
  }).isRequired,
  inputChangeKoHandle: PropTypes.func.isRequired
};

export default InputBox;
