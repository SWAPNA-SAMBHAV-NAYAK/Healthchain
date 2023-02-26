import "./Patient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";

const Patient = () => {



  const navigate = useNavigate();


  async function createNewPatient(props) {
    healthchain_backend.createPatient(
      10,
      "Sambhav",
      "sambhav@gmail.com",
      "987654321",
      23,
      "Orissa",
      "B+",
      81,
      180,
      "M",
      []
    )
  };

  async function readData() {
    var d = await healthchain_backend.readPatients();
    console.log(d);
  }

  async function addPatientForm() {
    navigate("/addPatient");
  }

  useEffect(() => {
    // createNewPatient();
    readData();

  }, [])

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
            <div className="patientCard">
              <h2>Swapna Sambhav</h2>
              <span className="timestamp">26-Feb-2023 23:00 pm</span>
              <p>sambhav@gmail.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="patientCard">
              
                <span className="timestamp">25-Feb-2023 23:00 PM</span>
                <h2>swapna sambhav</h2>
              
              <p>sambhav@xyz.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="patientCard">
              <h2>Swapna Sambhav</h2>
              <span className="timestamp">26-Feb-2023 23:00 pm</span>
              <p>sambhav@gmail.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="patientCard">
              
                <span className="timestamp">25-Feb-2023 23:00 PM</span>
                <h2>swapna sambhav</h2>
              
              <p>sambhav@xyz.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="patientCard">
              <h2>Swapna Sambhav</h2>
              <span className="timestamp">26-Feb-2023 23:00 pm</span>
              <p>sambhav@gmail.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
            <div className="patientCard">
              
                <span className="timestamp">25-Feb-2023 23:00 PM</span>
                <h2>swapna sambhav</h2>
              
              <p>sambhav@xyz.com</p>
              <p>8658987104</p>
              <div className="buttonContainer">
                <button>View Logs</button>
                <button>Edit Details</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Patient