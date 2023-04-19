import "./Doctor.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDoctorList } from "../../redux/actions/doctorAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

const Doctor = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { doctors } = useSelector(state => state.doctorList);

  const authCannister = useAuthenticatedCannister();

  useEffect(() => {
    dispatch(loadDoctorList(authCannister))
  }, [dispatch, authCannister])


  function handleDoctorCardClick(e) {
    const doctor_id = e.target.id;

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
          </div>

          <div className="doctorCard-container">
            {
              doctors.map((doctorData) => {
                return (
                  <div className="doctorCard" key={doctorData.user_principal.toText()}>
                    {
                      doctorData.image && <div className="profileContainer" style={{ height: "90px", width: "90px", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={URL.createObjectURL(new Blob([(new Uint8Array(doctorData.image)).buffer], { type: "image/png" }))} width="90px" style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "50%" }} />
                      </div>
                    }
                    <h2>{doctorData.name}</h2>
                    <span className="timestamp">{new Date(Number(doctorData.registered_on) / 1000000).toLocaleString()}</span>
                    <p><strong>{doctorData.department}</strong></p>
                    <p>{doctorData.email}</p>
                    <p>{doctorData.contact}</p>
                    <div className="buttonContainer">
                      <button className="oneLongButton" id={doctorData.user_principal.toText()} onClick={handleDoctorCardClick}>View Card</button>
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