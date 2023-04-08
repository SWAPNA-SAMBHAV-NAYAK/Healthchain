import "./Patient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPatientList } from "../../redux/actions/patientAction";;
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

const Patient = () => {



  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { patients } = useSelector(state => state.patientList);

  const authCannister = useAuthenticatedCannister();


  async function addPatientForm() {
    navigate("/addPatient");
  }

  useEffect(() => {
    dispatch(loadPatientList(authCannister))
  }, [dispatch,authCannister])


  function handlePatientCardClick(e) {
    const patient_id = e.target.id;
    navigate(`/patients/${patient_id}`)
  }

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
                  <div className="patientCard"
                    key={patientData.user_principal.toText()}
                  >
                    <h2>{patientData.name}</h2>
                    <span className="timestamp">{new Date(Number(patientData.registered_on) / 1000000).toLocaleString()}</span>

                    <p>{patientData.email}</p>
                    <p>{patientData.contact}</p>
                    <div className="buttonContainer">
                      <button className="oneLongButton"
                        id={patientData.user_principal.toText()}
                        onClick={handlePatientCardClick}>View Card</button>
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