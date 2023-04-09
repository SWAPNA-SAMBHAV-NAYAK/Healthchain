import React, { useEffect } from "react";
import "./AppointmentListTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AppointmentListTable() {

  const { appointments } = useSelector(state => state.appointmentList);

  const { accountType } = useSelector(state => state);


  useEffect(() => { console.log(appointments) }, [appointments]);

  const navigate = useNavigate();

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

                    //TODO Add Share Data and Revoke Access Buttons
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
                    style={{cursor:"pointer"}}
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
