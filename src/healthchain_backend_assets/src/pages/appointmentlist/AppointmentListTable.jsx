import React, { useEffect } from "react";
import "./AppointmentListTable.scss";
import { useDispatch, useSelector } from "react-redux";

function AppointmentListTable() {

  const { appointments } = useSelector(state => state.appointmentList);

  return (
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
                <td>{appointment.doctor_id}</td>
                <td>{appointment.patient_id}</td>
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
  );
}

export default AppointmentListTable;
