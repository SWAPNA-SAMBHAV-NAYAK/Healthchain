// import {healthchain_backend} from "../../declarations/healthchain_backend";

// export default function App() {


//     const [val,setVal] = useState([]);

//     function createMessage() {
//         healthchain_backend.createNotice("Hello","Somya");
//     }

//     useEffect(() => {
//         createMessage();
//     }, [])

//     useEffect(() => {
//         fetchMessages();

//     }, [])


//     async function fetchMessages() {
//         const m = await healthchain_backend.readNotices();
//         setVal(m);
//         console.log(m);
//     }

//     return <div>
//         Hello There
//         {/* {JSON.stringify(val)} */}
//     </div>
// }


import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { assetInputs, userInputs } from "./formSource";
import Patient from "./pages/patient/Patient";
import AddPatient from "./pages/patient/AddPatient";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/patients" element={<Patient />} />
        <Route exact path="/addPatient" element={<AddPatient />} />
        <Route exact path="/users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route exact path="/assets">
          <Route index element={<List />} />
          <Route path=":assetId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={assetInputs} title="Add New Asset" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
