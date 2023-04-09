import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import "./PatientInfo.scss";
import Salrt from "sweetalert2";
import { loadPatientById } from '../../../redux/actions/patientByIdAction';
import useAuthenticatedCannister from '../../../useAuthenticatedCannister';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function PatientInfo() {

  const dispatch = useDispatch();


  const authCannister = useAuthenticatedCannister();

  const { patientById } = useSelector(state => state.patientById);

  const { accountType } = useSelector(state => state);

  const params = useParams();


  useEffect(() => {
    dispatch(loadPatientById(params.patient_id, authCannister));
  }, [dispatch, authCannister])



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


    await authCannister.updateUserType(patientById.user_principal, e.target.user_type.value);

    dispatch(loadPatientById(params.patient_id, authCannister));

    setIsPopupOpen(false);

    Salrt.fire({
      icon: "success",
      title: "Account Type Updated!",
      text: `${patientById.name}'s account authorisation updated .`,
      showConfirmButton: false,
      timer: 2000
    });
  }

  const pRef = useRef(null);

  const handleCopyClick = () => {
    const childNodes = pRef.current.childNodes;
    const textNodes = Array.from(childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    const id = textNodes
      .map((node) => node.textContent)
      .join("")
      .trim();
    console.log(id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `ID: ${id} has been Copied!`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  // code for add logs
  const [showLogForm, setShowLogForm] = useState(false);
  const [formVals, setFormVals] = useState({
    pulse_rate: "",
    blood_pressure: "",
    spo2: "",
    temperature: "",
    additional_notes: "",
    medications: "",
    blood_group: "",
    weight: "",
    height: ""
  });
  const [logs, setLogs] = useState([]);

  const changeKoHandle = (event) => {
    const { name, value } = event.target;
    setFormVals({ ...formVals, [name]: value });
  };

  const submitKoHandle = (event) => {
    event.preventDefault();
    // form submit ko handle karne ka backend code idhar aayega
    setShowLogForm(!showLogForm);
    const log = {
      timestamp: new Date(),
      pulse_rate: formVals.pulse_rate,
      blood_pressure: formVals.blood_pressure,
      spo2: formVals.spo2,
      temperature: formVals.temperature,
      blood_group: formVals.blood_group,
      weight: formVals.weight,
      height: formVals.height,
      medications: formVals.medications,
      additional_notes: formVals.additional_notes
    };
    setLogs([log, ...logs]);
    setFormVals({
      pulse_rate: "",
      blood_pressure: "",
      spo2: "",
      temperature: "",
      blood_group: "",
      weight: "",
      height: "",
      medications: "",
      additional_notes: ""
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const toggleForm = () => {
    setShowLogForm(!showLogForm);
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
                <p className="tag" id="tag6" ref={pRef}>
                  <strong>Internet Identity: </strong> {
                    (patientById.user_principal) ? patientById.user_principal.toText() : " "
                  }
                </p>
                <ContentCopyIcon
                  onClick={handleCopyClick}
                  style={{ cursor: "pointer" }}
                />
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

                {accountType === "doctor" && <button className="btnDesign" onClick={toggleForm}>Add Logs</button>}

              </div>
            </div>
          </div>
          {showLogForm && (
        <div className="popupAddLogs">
          <form onSubmit={submitKoHandle} className='formAddLogs'>
            <div className="form-row">
              <label className='labelAddLogs'>Pulse Rate:</label>
              <input
                type="number"
                name="pulse_rate"
                value={formVals.pulse_rate}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Blood Pressure:</label>
              <input
                type="number"
                name="blood_pressure"
                value={formVals.blood_pressure}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>SPO2:</label>
              <input
                type="number"
                name="spo2"
                value={formVals.spo2}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Temperature:</label>
              <input
                type="number"
                name="temperature"
                value={formVals.temperature}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Additional Notes:</label>
              <textarea
                name="additional_notes"
                value={formVals.additional_notes}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Medications:</label>
              <textarea
                name="medications"
                value={formVals.medications}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Blood Group:</label>
              <input
                type="text"
                name="blood_group"
                value={formVals.blood_group}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Weight:</label>
              <input
                type="number"
                name="weight"
                value={formVals.weight}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="form-row">
              <label className='labelAddLogs'>Height:</label>
              <input
                type="number"
                name="height"
                value={formVals.height}
                onChange={changeKoHandle}
                className='inputssy'
                required
              />
            </div>
            <div className="button-row">
              <button type="button" onClick={toggleForm} className='AddLogsBtn'>
                Cancel
              </button>
              <button type="submit" className='AddLogsBtn'>Save</button>
            </div>
          </form>
        </div>
      )}
      {logs.length > 0 && (
        <div className="logsCard">
          <h2>Logs</h2>
          <div className="cardContainer">
            {logs.map((log, i) => (
              <div className="logKey" key={i}>
                <div className="cardHeader">
                  <h3 className="timestamp">
                    Timestamp:
                    {log.timestamp.toLocaleString()}
                  </h3>
                </div>
                <div className="cardDetails">
                  <p>
                    <strong>Pulse Rate: </strong>
                    {log.pulse_rate}
                  </p>
                  <p>
                    <strong>Blood Pressure:</strong> {log.blood_pressure}
                  </p>
                  <p>
                    <strong>SPO2:</strong> {log.spo2}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {log.temperature}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {log.blood_group}
                  </p>
                  <p>
                    <strong>Weight: </strong>
                    {log.weight}
                  </p>
                  <p>
                    <strong>Height:</strong> {log.height}
                  </p>
                  <p>
                    <strong>Medications:</strong>
                    {log.medications}
                  </p>
                  <p>
                    <strong>Additional Notes: </strong>
                    {log.additional_notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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