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
import { loadMedicalLogList } from '../../../redux/actions/medicalLogAction';
import { getStatusOfAccessToMedicalLogs } from '../../../redux/actions/accessToLogsAction';

export default function PatientInfo() {

  const params = useParams();

  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();

  const { patientById } = useSelector(state => state.patientById);

  const { medicalLogs } = useSelector(state => state.medicalLogList);

  const { accountType } = useSelector(state => state);

  const { hasAccessToLogs } = useSelector(state => state.hasAccessToLogs);


  useEffect(() => {
    dispatch(loadMedicalLogList(authCannister, params.patient_id))
  }, [authCannister, params.patient_id])


  useEffect(() => {
    dispatch(getStatusOfAccessToMedicalLogs(authCannister, params.patient_id))
  }, [authCannister, params.patient_id])

  useEffect(() => {
    dispatch(loadPatientById(params.patient_id, authCannister));
  }, [dispatch, authCannister])



  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [userType, setUserType] = useState("");

  const handleEditButton = () => {
    setIsPopupOpen(true);
  };

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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(params.patient_id);
    Salrt.fire({
      position: "bottom-end",
      icon: "success",
      title: `ID: ${params.patient_id} has been Copied!`,
      showConfirmButton: false,
      timer: 1500
    });
  };

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


  const changeKoHandle = (event) => {
    const { name, value } = event.target;
    setFormVals({ ...formVals, [name]: value });
  };


  const submitKoHandle = async (event) => {
    event.preventDefault();

    await authCannister.createMedicalLog(
      params.patient_id,
      parseFloat(formVals.pulse_rate),
      parseInt(formVals.blood_pressure),
      parseInt(formVals.spo2),
      parseFloat(formVals.temperature),
      formVals.additional_notes,
      formVals.medications,
      formVals.blood_group,
      parseFloat(formVals.weight),
      parseFloat(formVals.height)
    )


    dispatch(loadMedicalLogList(authCannister, params.patient_id))

    setShowLogForm(!showLogForm);

    Salrt.fire({
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
                  <span className="tag" id="tag2">
                    <strong>Age:</strong> {parseInt(patientById.age)}
                  </span>
                  <span className="tag" id="tag3">
                    <strong>User Type:</strong> {patientById.user_type}
                  </span>
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
                  <strong>Internet Identity: </strong>
                  <ContentCopyIcon
                    onClick={handleCopyClick}
                    style={{ cursor: "pointer", margin: "0px 5px" }}
                  />
                  {
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
                  <button type="submit" className='AddLogsBtn'>Save</button>
                  <button type="button" onClick={toggleForm} className='AddLogsBtn'>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          {hasAccessToLogs && medicalLogs.length > 0 && (
            <div className="logsCard">
              <h2>Logs</h2>
              <div className="cardContainer">
                {medicalLogs.map((log, i) => (
                  <div className="logKey" key={i}>
                    <div className="cardHeader">
                      <h3 className="timestamp">
                        {"Log Created: "} {new Date(Number(log.time_stamp) / 1000000).toLocaleString()}
                      </h3>
                    </div>
                    <div className="cardDetails">
                      <p>
                        <strong>Pulse Rate: </strong>
                        {log.pulse_rate}
                      </p>
                      <p>
                        <strong>Blood Pressure:</strong> {parseInt(log.blood_pressure)}
                      </p>
                      <p>
                        <strong>SPO2:</strong> {parseInt(log.spo2)}
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