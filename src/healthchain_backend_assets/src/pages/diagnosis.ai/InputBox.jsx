import React from "react";
import PropTypes from "prop-types";

const InputBox = ({ input, inputChangeKoHandle, register }) => {
  const { label, name, type, step, min, max } = input;
  if (name === "gender") {
    return (
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          {...register(name, { required: true })}
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
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          {...register(name, { required: true })}
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
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          {...register(name, { required: true })}
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="ATA"
          required
        >
          <option value="ATA">ATA</option>
          <option value="NAP">NAP</option>
          <option value="TA">TA</option>
        </select>
      </div>
    );
  }
  if (name === "restingecg") {
    return (
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
        {...register(name, { required: true })}
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Normal"
          required
        >
          <option value="Normal">Normal</option>
          <option value="st">st</option>
        </select>
      </div>
    );
  }
  if (name === "exerciseangina") {
    return (
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          {...register(name, { required: true })}
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
  if (name === "stslope") {
    return (
      <div className="input-boxyy">
        <label htmlFor={name}>{label}</label>
        <select
          {...register(name, { required: true })}
          name={name}
          id={name}
          onChange={inputChangeKoHandle}
          selected="Flat"
          required
        >
          <option value="Flat">Flat</option>
          <option value="Up">Up</option>
        </select>
      </div>
    );
  }
  return (
    <div className="input-boxyy">
      <label htmlFor={name}>{label}:</label>
      <input
        {...register(name, { required: true })}
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
