import "./Patient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";
import { useDispatch, useSelector } from "react-redux";
import { loadPatientList } from "../../redux/actions/patientAction";
import { Routes, Route } from "react-router-dom";
import PatientInfo from "./PatientInfo/PatientInfo";

const Patient = () => {



  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { patients } = useSelector(state => state.patientList);


  async function addPatientForm() {
    navigate("/addPatient");
  }

  useEffect(() => {
    dispatch(loadPatientList())
  }, [dispatch])

  return (
      <div className="patient">
        <Sidebar />
        <div className="navPatientContainer">
          <Navbar />
          <div className="patientContainer">
            <div className="header">
              <h3>Patients</h3>
              <button onClick={addPatientForm}>Add Patient</button>

            </div>

            <div className="patientCard-container">
              {
                patients.map((patientData) => {
                  return (
                    <div className="patientCard" key={patientData.patient_id}>
                      <h2>{patientData.name}</h2>
                      {/* <span className="timestamp">{patientData.registered_on}</span> */}
                      <span className="timestamp">{new Date(Number(patientData.registered_on) / 1000000).toLocaleString()}</span>

                      <p>{patientData.email}</p>
                      <p>{patientData.phone_number}</p>
                      <div className="buttonContainer">
                        <button>View Logs</button>
                        {/* <Link to="/patients/123">Patient 123</Link> */}

                        <button>Edit Details</button>
                      </div>
                    </div>)
                })
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default Patient;