import "./Patient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";

const Patient = () => {


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

  useEffect(() => {
    // createNewPatient();
    readData();

  }, [])

  return (
    <div className="patient">
      <Sidebar />
      <div className="patientContainer">
        <Navbar />
        <div className="header">
          <h3>Add a New Patient</h3>
          <button>Add Patient</button>
        </div>
        <div className="patientCard">

          <div className="cardTitle">Swapna Sambhav</div>
          <div className="cardBody">
            <div className="cardImage">
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Patient