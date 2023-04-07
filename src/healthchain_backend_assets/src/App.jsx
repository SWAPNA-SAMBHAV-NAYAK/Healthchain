import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Employees from "./pages/employees/Employees";

import Patient from "./pages/patient/Patient";
import AddPatient from "./pages/patient/AddPatient/AddPatient";
import PatientInfo from "./pages/patient/PatientInfo/PatientInfo";
import Doctor from "./pages/doctor/Doctor";
import AddDoctor from "./pages/doctor/AddDoctor/AddDoctor";
import DoctorInfo from "./pages/doctor/DoctorInfo/DoctorInfo";
import Appointment from "./pages/appointments/Appointment";
import AppointmentList from "./pages/appointmentlist/AppointmentList";
import Profile from "./pages/profile/Profile";
import DIMainPage from "./pages/diseaseIndex/DIMainPage";

function App() {

  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<Profile />} />
        

        <Route exact path={"/dashboard"} element={<Home />} />

        <Route exact path={"/login"} element={<Login />} />


        

        <Route exact path="/patients" element={<Patient />} />
        <Route exact path="/patients/:patient_id" element={<PatientInfo />} />
        <Route exact path={"/addPatient"} element={<AddPatient />} />

        <Route exact path="/doctors" element={<Doctor />} />
        <Route exact path="/doctors/:doctor_id" element={<DoctorInfo />} />
        <Route exact path={"/addDoctor"} element={<AddDoctor />} />


        <Route exact path={"/diseaseindex"} element={<DIMainPage/>} />

        <Route exact path="/appointments" element={<Appointment />} />
        <Route exact path="/appointmentList" element={<AppointmentList />} />

        <Route exact path="/employees" element={<Employees />} />
      </Routes>
    </div >
  );
}

export default App;
