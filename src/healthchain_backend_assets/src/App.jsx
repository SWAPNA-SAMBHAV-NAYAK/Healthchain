import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Employees from "./pages/employees/Employees";
import { assetInputs, userInputs } from "./formSource";
import Patient from "./pages/patient/Patient";
import AddPatient from "./pages/patient/AddPatient/AddPatient";
import PatientInfo from "./pages/patient/PatientInfo/PatientInfo";
import Doctor from "./pages/doctor/Doctor";
import AddDoctor from "./pages/doctor/AddDoctor/AddDoctor";
import DoctorInfo from "./pages/doctor/DoctorInfo/DoctorInfo";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Home />} />

        <Route exact path={"/login"} element={<Login />} />

        <Route exact path="/patients" element={<Patient />} />
        <Route exact path="/patients/:patient_id" element={<PatientInfo />} />
        <Route exact path={"addPatient"} element={<AddPatient />} />

        <Route exact path="/doctors" element={<Doctor />} />
        <Route exact path="/doctors/:doctor_id" element={<DoctorInfo />} />
        <Route exact path={"addDoctor"} element={<AddDoctor />} />

        {/* <Route path={"users"}>
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route> */}
        {/* <Route path="assets">
            <Route index element={<List />} />
            <Route path=":assetId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={assetInputs} title="Add New Asset" />}
            />
          </Route> */}


        <Route exact path="/employees" element={<Employees />} />
      </Routes>
    </div >
  );
}

export default App;
