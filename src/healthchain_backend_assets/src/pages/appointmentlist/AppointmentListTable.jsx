import React, { useState, useEffect } from "react";
import "./AppointmentListTable.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import { loadLogsAccessList } from "../../redux/actions/logsAccessListAction";

function AppointmentListTable() {

  const { appointments } = useSelector(state => state.appointmentList);

  const { accountType } = useSelector(state => state);

  const { logsAccessList } = useSelector(state => state.logsAccessList);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();

  useEffect(() => {
    dispatch(loadLogsAccessList(authCannister))
  }, [authCannister])

  const handleShare = (doctor_id) => {
    Swal.fire({
      title: "Do you want to share your medical history with this doctor?",
      showDenyButton: true,
      confirmButtonText: "Share",
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authCannister.giveMedicalLogAccess(doctor_id);
        Swal.fire("Shared!", "", "success");

        dispatch(loadLogsAccessList(authCannister))
      }
    });
  };

  const handleRevoke = (doctor_id) => {
    Swal.fire({
      title: "Are you sure you want to revoke access of medical history from this doctor?",
      showDenyButton: true,
      confirmButtonText: "Revoke",
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authCannister.revokeMedicalLogAccess(doctor_id);

        Swal.fire("Revoked!", "", "success");

        dispatch(loadLogsAccessList(authCannister))
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
                <th>Doctor Name</th>
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
                    <td>{appointment.doctor_name}</td>
                    <td>{appointment.time_slot}</td>
                    <td>{appointment.date}</td>
                    <td>{
                      logsAccessList.includes(appointment.doctor_id.toString())
                        ? <button className={"button revoke"} onClick={() => handleRevoke(appointment.doctor_id)}>Revoke</button>
                        : <button className={"button share"} onClick={() => handleShare(appointment.doctor_id)}>Share</button>
                    }</td>
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
                <th>Patient Name</th>
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
                    <td>{appointment.patient_name}</td>
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
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Time Slot</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                  <tr key={appointment.appointment_id}>
                    <td>{i + 1}</td>
                    <td>{appointment.doctor_name}</td>
                    <td>{appointment.patient_name}</td>
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
