import "./Doctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";
import { useDispatch, useSelector } from "react-redux";
import { loadDoctorList } from "../../redux/actions/doctorAction";
import { Routes, Route } from "react-router-dom";
import DoctorInfo from "./DoctorInfo/DoctorInfo";
import { loadDoctorById } from "../../redux/actions/doctorByIdAction";

const Doctor = () => {



  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { doctors } = useSelector(state => state.doctorList);


  async function addDoctorForm() {
    navigate("/addDoctor");
  }

  useEffect(() => {
    dispatch(loadDoctorList())
  }, [dispatch])


  function handleDoctorCardClick(e) {
    const doctor_id = e.target.id;

    dispatch(loadDoctorById(doctor_id, doctors));

    navigate(`/doctors/${doctor_id}`)
  }

  return (
    <div className="doctor">
      <Sidebar />
      <div className="navDoctorContainer">
        <Navbar />
        <div className="doctorContainer">
          <div className="header">
            <h3>Doctors</h3>
            <button onClick={addDoctorForm}>Add Doctor</button>

          </div>

          <div className="doctorCard-container">
            {
              doctors.map((doctorData) => {
                return (
                  <div className="doctorCard" key={doctorData.doctor_id}>
                    <h2>{doctorData.name}</h2>
                    <span className="timestamp">{new Date(Number(doctorData.registered_on) / 1000000).toLocaleString()}</span>

                    <p>{doctorData.email}</p>
                    <p>{doctorData.phone_number}</p>
                    <div className="buttonContainer">
                      <button className="oneLongButton" id={doctorData.doctor_id} onClick={handleDoctorCardClick}>View Card</button>
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

export default Doctor;