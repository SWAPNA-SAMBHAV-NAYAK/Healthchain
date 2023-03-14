import "./AddDoctor.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import { healthchain_backend } from "../../../../../declarations/healthchain_backend/index";
import Salrt from "sweetalert2";
import { loadDoctorList } from "../../../redux/actions/doctorAction";
import { useDispatch, useSelector } from "react-redux";
import { loadDepartmentList } from "../../../redux/actions/departmentAction";

const doctorInput = [
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
    label: "Gender",
    name: "gender",
    type: "text",
  },
  {
    id: 7,
    label: "Designation",
    name: "designation",
    type: "text",
  },
  {
    id: 8,
    label: "Qualification",
    name: "qualification",
    type: "text",
  },
  // {
  //   id: 9,
  //   label: "Department",
  //   name: "department",
  //   type: "text",
  // },

];




const AddDoctor = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { departments } = useSelector(state => state.departmentList);


  useEffect(() => {
    dispatch(loadDepartmentList());
  }, [])

  

  async function addDoctorAction(event) {
    event.preventDefault();

    await healthchain_backend.createDoctor(
      uuid(),
      formData.name,
      formData.email,
      formData.phone_number,
      parseInt(formData.age),
      formData.address,
      formData.gender,
      formData.designation,
      formData.qualification,
      formData.department,
    )


    dispatch(loadDoctorList());

    Salrt.fire({
      icon: "success",
      title: "Added!",
      text: `${formData.name}'s data has been Added.`,
      showConfirmButton: false,
      timer: 3000
    });


    navigate("/doctors");
  }

  const [formData, setFormData] = useState({
    patient_id: "",
    name: "",
    email: "",
    phone_number: "",
    age: 0,
    address: "",
    gender: "",
    designation: "",
    qualification: "",
    department: "",
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
          <h1>Add Doctor</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="doctorForm" onSubmit={addDoctorAction}>
              <div className="doctorInputs">
                {doctorInput.map((input) => (
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

                <div className="formInput" key={9}>
                  <fieldset>
                    <legend>Department</legend>
                    <select name={"department"} value={formData["department"]} id={"9"} onChange={handleInputChange}>
                      <option value="">Select a department</option>
                      {departments.map((dept, i) => (
                        <option key={i} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
              </div>

              <button type="submit" className="submitAddDoctor">Add Doctor</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDoctor;