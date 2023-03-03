import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import "./PatientInfo.scss";
import { healthchain_backend } from '../../../../../declarations/healthchain_backend/index';
import Salrt from "sweetalert2";
import { loadPatientList } from '../../../redux/actions/patientAction';
import { loadPatientById } from '../../../redux/actions/patientByIdAction';

export default function PatientInfo() {

  const dispatch = useDispatch();

  const { patientById } = useSelector(state => state.patientById);

  const params = useParams();


  useEffect(() => {
    console.log(patientById);
  }, [])

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(patientById[0].blood_group);
  const [age, setAge] = useState(parseInt(patientById[0].age));
  const [weight, setWeight] = useState(patientById[0].weight);
  const [height, setHeight] = useState(patientById[0].height);
  const [address, setAddress] = useState(patientById[0].address);

  const handleEditButton = () => {
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await healthchain_backend.updatePatient(
      patientById[0].patient_id,
      patientById[0].registered_on,
      patientById[0].name,
      patientById[0].email,
      patientById[0].phone_number,
      parseInt(age),
      address,
      bloodGroup,
      parseFloat(weight),
      parseFloat(height),
      patientById[0].gender,
    )

    setIsPopupOpen(false);

    dispatch(loadPatientList());

    Salrt.fire({
      icon: "success",
      title: "Data Saved!",
      text: `${patientById[0].name}'s data has been saved.`,
      showConfirmButton: false,
      timer: 2000
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="patient-app">
          <div className="patientDetailsCard">
            <div className="patientDetailsCardContent">
              <div className="cardTextContainer">
                <h2 className="cardHeader">{patientById[0].name}</h2>
                <div className="cardTags">
                  <span className="tag" id="tag1">
                    <strong>Blood Group:</strong> {bloodGroup}
                  </span>
                  <span className="tag" id="tag2">
                    <strong>Age:</strong> {parseInt(age)}
                  </span>
                  <span className="tag" id="tag3">
                    <strong>Weight:</strong> {weight}
                  </span>
                  <span className="tag" id="tag4">
                    <strong>Height:</strong> {height}
                  </span>
                  <span className="tag" id="tag5">
                    <strong>Gender:</strong> {patientById[0].gender}
                  </span>
                  <span className="tag" id="tag7">
                    <strong>Registered On:</strong> {new Date(Number(patientById[0].registered_on) / 1000000).toLocaleString()}
                  </span>
                </div>
                <p className="tag" id="tag6">
                  <strong>Address:</strong> {address}
                </p>
              </div>
              <div className="cardButtons">
                <button
                  className="btnDesign"
                  id="edit-button"
                  onClick={handleEditButton}
                >
                  Edit Details
                </button>
                <button className="btnDesign">View Logs</button>
                
              </div>
            </div>
          </div>

          {
            isPopupOpen && (
              <div id="popup">
                <form id="form" onSubmit={handleSubmit}>
                  <label htmlFor="tag1">Blood Group:</label>
                  <input
                    type="text"
                    id="tag-1-input"
                    name="tag1"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  />
                  <br />
                  <label htmlFor="tag2">Age:</label>
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
                  <br />
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