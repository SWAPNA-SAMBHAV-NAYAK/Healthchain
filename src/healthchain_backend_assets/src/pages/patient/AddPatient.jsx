import "./AddPatient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React, { useState, useEffect } from "react";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";

const patientInput = [
  {
    id: 1,
    label: "Name",
    name: "name",
    type: "text",
    // placeholder: "",
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    id: 3,
    label: "Contact",
    name: "phone_number",
    type: "text",
  },
  {
    id: 4,
    label: "Age",
    name: "age",
    type: "number",
  },
  {
    id: 5,
    label: "Address",
    name: "address",
    type: "text",
  },
  {
    id: 6,
    label: "Blood Group",
    name: "blood_group",
    type: "text",
  },
  {
    id: 7,
    label: "Weight",
    name: "weight",
    type: "number",
    step: "any",
  },
  {
    id: 8,
    label: "height",
    name: "height",
    type: "number",
    step: "any",
  },
  {
    id: 9,
    label: "Gender",
    name: "gender",
    type: "text",
  },

];




const AddPatient = () => {

  const navigate = useNavigate();

  async function addPatientAction(event){
    event.preventDefault();

    await healthchain_backend.createPatient(
      uuid(),
      formData.name,
      formData.email,
      formData.phone_number,
      parseInt(formData.age),
      formData.address,
      formData.blood_group,
      parseFloat(formData.weight),
      parseFloat(formData.height),
      formData.gender,
      formData.logs,
    )
    console.log(formData)

    navigate("/patients");
  }

  const [formData, setFormData] = useState({
    patient_id: null,
    name: "",
    email: "",
    phone_number: "",
    age: 0,
    address: "",
    blood_group: "",
    weight: 0,
    height: 0,
    gender: Text,
    logs: []
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add Patient</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="patientForm" onSubmit={addPatientAction}>
              <div className="patientInputs">
                {patientInput.map((input) => (
                  <div className="formInput" key={input.id}>
                    <fieldset>
                      <legend>{input.label}</legend>
                      <input
                        type={input.type}
                        id={input.id}
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleInputChange}
                        required={input.required}
                        placeholder={input.placeholder}
                        step={input.step}
                      />
                    </fieldset>
                  </div>
                ))}
              </div>

              <button type="submit" className="submitAddPatient">Add Patient</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPatient;