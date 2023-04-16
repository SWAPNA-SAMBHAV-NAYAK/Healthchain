import React, { useState, useEffect } from "react";
import "./AppointmentListTable.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

function AppointmentListTable() {

  const { appointments } = useSelector(state => state.appointmentList);

  const { accountType } = useSelector(state => state);

  const navigate = useNavigate();


  const authCannister = useAuthenticatedCannister();

  // share/revoke access functionality
  const [sharedIds, setSharedIds] = useState([]);

  const handleShare = (doctor_id) => {
    Swal.fire({
      title: "Do you want to share your medical history with this doctor?",
      showDenyButton: true,
      confirmButtonText: "Share",
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authCannister.giveMedicalLogAccess(doctor_id);
        setSharedIds([...sharedIds, doctor_id]);

        Swal.fire("Shared!", "", "success");
      }
    });
  };

  const handleRevoke = (doctor_id) => {
    Swal.fire({
      title: "Are you sure you want to revoke access of medical history from this doctor?",
      showDenyButton: true,
      confirmButtonText: "Revoke",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Revoked!", "", "success");
        setSharedIds(sharedIds.filter((sharedId) => sharedId !== doctor_id));
      }
    });
  };
  return (
    <>
      {accountType === "patient" &&
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Doctor ID</th>
                <th>Time Slot</th>
                <th>Date</th>
                <th>Share Data?</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                  <tr key={appointment.appointment_id}>
                    <td>{i + 1}</td>
                    <td>{appointment.doctor_id.toText()}</td>
                    <td>{appointment.time_slot}</td>
                    <td>{appointment.date}</td>

                    <td>
                      {/* <button type="button">Share</button> */}
                      <button
                        className={`button ${sharedIds.includes(appointment.doctor_id) ? "revoke" : "share"
                          }`}
                        onClick={() =>
                          sharedIds.includes(appointment.doctor_id) ? handleRevoke(appointment.doctor_id) : handleShare(appointment.doctor_id)
                        }
                      >
                        {sharedIds.includes(appointment.doctor_id) ? "Revoke Access" : "Share"}
                      </button>
                    </td>

                    {/* TODO Add Share Data and Revoke Access Buttons */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No Appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }


      {accountType === "doctor" &&
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient ID</th>
                <th>Time Slot</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                  <tr key={appointment.appointment_id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/patients/${appointment.patient_id.toText()}`)
                    }}>
                    <td>{i + 1}</td>
                    <td>{appointment.patient_id.toText()}</td>
                    <td>{appointment.time_slot}</td>
                    <td>{appointment.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No Appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }


      {accountType === "admin" &&
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Doctor ID</th>
                <th>Patient ID</th>
                <th>Time Slot</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                  <tr key={appointment.appointment_id}>
                    <td>{i + 1}</td>
                    <td>{appointment.doctor_id.toText()}</td>
                    <td>{appointment.patient_id.toText()}</td>
                    <td>{appointment.time_slot}</td>
                    <td>{appointment.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No Appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </>

  );
}

export default AppointmentListTable;
