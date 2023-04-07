import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import "./PatientInfo.scss";
import Salrt from "sweetalert2";
import { loadPatientById } from '../../../redux/actions/patientByIdAction';

import { canisterId, createActor } from "../../../../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";

export default function PatientInfo() {

  const dispatch = useDispatch();

  const { patientById } = useSelector(state => state.patientById);

  const { accountType } = useSelector(state => state);

  const params = useParams();


  useEffect(() => {
    dispatch(loadPatientById(params.patient_id));
  }, [dispatch])



  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [bloodGroup, setBloodGroup] = useState(patientById[0].blood_group);
  // const [age, setAge] = useState(parseInt(patientById[0].age));
  // const [weight, setWeight] = useState(patientById[0].weight);
  // const [height, setHeight] = useState(patientById[0].height);
  // const [address, setAddress] = useState(patientById[0].address);

  const [userType, setUserType] = useState("");

  const handleEditButton = () => {
    setIsPopupOpen(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // await healthchain_backend.updatePatient(
  //   //   patientById[0].patient_id,
  //   //   patientById[0].registered_on,
  //   //   patientById[0].name,
  //   //   patientById[0].email,
  //   //   patientById[0].phone_number,
  //   //   parseInt(age),
  //   //   address,
  //   //   bloodGroup,
  //   //   parseFloat(weight),
  //   //   parseFloat(height),
  //   //   patientById[0].gender,
  //   // )

  //   setIsPopupOpen(false);

  //   dispatch(loadPatientById(params.patient_id, patients));

  //   Salrt.fire({
  //     icon: "success",
  //     title: "Data Saved!",
  //     text: `${patientById[0].name}'s data has been saved.`,
  //     showConfirmButton: false,
  //     timer: 2000
  //   });
  // };

  async function handleSubmit(e) {
    e.preventDefault();

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    await authenticatedCanister.updateUserType(patientById.user_principal, e.target.user_type.value);

    dispatch(loadPatientById(params.patient_id));

    setIsPopupOpen(false);

    Salrt.fire({
      icon: "success",
      title: "Account Type Updated!",
      text: `${patientById.name}'s account authorisation updated .`,
      showConfirmButton: false,
      timer: 2000
    });
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="patient-app">
          <div className="patientDetailsCard">
            <div className="patientDetailsCardContent">
              <div className="cardTextContainer">
                <h2 className="cardHeader">{patientById.name}</h2>
                <div className="cardTags">
                  {/* <span className="tag" id="tag1">
                    <strong>Blood Group:</strong> {bloodGroup}
                  </span> */}
                  <span className="tag" id="tag2">
                    <strong>Age:</strong> {parseInt(patientById.age)}
                  </span>
                  <span className="tag" id="tag3">
                    <strong>User Type:</strong> {patientById.user_type}
                  </span>
                  {/* <span className="tag" id="tag4">
                    <strong>Height:</strong> {height}
                  </span> */}
                  <span className="tag" id="tag5">
                    <strong>Gender:</strong> {patientById.gender}
                  </span>
                  <span className="tag" id="tag7">
                    <strong>Registered On:</strong> {new Date(Number(patientById.registered_on) / 1000000).toLocaleString()}
                  </span>
                </div>
                <p className="tag" id="tag6">
                  <strong>Address:</strong> {patientById.address}
                </p>
                <p className="tag" id="tag6">
                  <strong>Id: </strong> {
                    (patientById.user_principal) ? patientById.user_principal.toText() : " "
                  }
                </p>
              </div>
              <div className="cardButtons">
                {
                  accountType === "admin" && <button
                    className="btnDesign"
                    id="edit-button"
                    onClick={handleEditButton}
                  >
                    Edit Details
                  </button>
                }

                {/* <button className="btnDesign">View Logs</button> */}

              </div>
            </div>
          </div>

          {
            isPopupOpen && (
              <div id="popup">
                <form id="form" onSubmit={handleSubmit}>
                  <label htmlFor="tag1"> Select User Type:</label>
                  <select name={"user_type"} onChange={(e) => setUserType(e.target.value)}>
                    <option value={"patient"}>Patient</option>
                    <option value={"doctor"}>Doctor</option>
                    <option value={"admin"}>Admin</option>
                  </select>
                  <br />
                  {/* <label htmlFor="tag2">Age:</label>
                  <input
                    type="text"
                    id="tag-2-input"
                    name="tag2"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <br />
                  <label htmlFor="tag3">Weight:</label>
                  <input
                    type="text"
                    id="tag-3-input"
                    name="tag3"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <br />
                  <label htmlFor="tag4">Height:</label>
                  <input
                    type="text"
                    id="tag-4-input"
                    name="tag4"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <br />
                  <label htmlFor="tag6">Address:</label>
                  <textarea
                    id="tag-6-input"
                    name="tag6"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <br /> */}
                  <button type="submit">Save Changes</button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>




  )
}