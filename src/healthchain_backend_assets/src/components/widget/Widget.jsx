import "./Widget.scss";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import * as Redux from "react-redux";


const Widget = ({ type }) => {


  const { doctors } = Redux.useSelector(state => state.doctorList);
  const { patients } = Redux.useSelector(state => state.patientList);
  const { appointments } = Redux.useSelector(state => state.appointmentList);
  const { employees } = Redux.useSelector(state => state.employeeList);


  const [docCount, setDocCount] = React.useState(0);
  const [patientCount, setPatientCount] = React.useState(0);
  const [appointmentCount, setAppointmentCount] = React.useState(0);
  const [employeeCount, setEmployeeCount] = React.useState(0);



  useEffect(() => {
    setDocCount(doctors.length)
  }, [doctors])


  useEffect(() => {
    setPatientCount(patients.length)
  }, [patients])

  useEffect(() => {
    setAppointmentCount(appointments.length)
  }, [appointments])

  useEffect(() => {
    setEmployeeCount(employees.length)
  }, [employees])



  let data;
  switch (type) {
    case "user":
      data = {
        title: "PATIENTS",
        link: "View Patients",
        linkTo: "/patients",
        count: patientCount,
        icon: <PersonOutlineIcon className="icon"
          style={{
            color: "#5BB318",
            backgroundColor: "#D4F6CC",
          }} />,
      };
      break;
    case "doctor":
      data = {
        title: "DOCTORS",
        link: "View Doctors",
        linkTo: "/doctors",
        count: docCount,
        icon: <PersonOutlineIcon className="icon"
          style={{
            color: "#5BB318",
            backgroundColor: "#D4F6CC",
          }} />,
      };
      break;
    case "appointment":
      data = {
        title: "APPOINTMENTS",
        link: "View Appointments",
        linkTo: "/appointmentList",
        count: appointmentCount,
        icon: <MeetingRoomOutlinedIcon className="icon"
          style={{
            color: "#5BB318",
            backgroundColor: "#D4F6CC",
          }} />,
      };
      break;
    case "asset":
      data = {
        title: "EMPLOYEES",
        link: "View Employees",
        linkTo: "/employees",
        count: employeeCount,
        icon: <InventoryOutlinedIcon className="icon"
          style={{
            color: "#5BB318",
            backgroundColor: "#D4F6CC",
          }} />,
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <Link to={data.linkTo} style={{ textDecoration: 'none' }}>
          <span className="link">{data.link}</span>
        </Link>

      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  )
}

export default Widget