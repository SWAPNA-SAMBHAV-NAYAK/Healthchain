import React, { useState, useEffect } from 'react';
import * as Redux from 'react-redux';
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import "./DoctorInfo.scss";
import Salrt from "sweetalert2";
import { loadDoctorById } from '../../../redux/actions/doctorByIdAction';
import { loadDepartmentList } from '../../../redux/actions/departmentAction';
import DateSelector from './DateSelector';
import { loadDoctorMetaDataById } from '../../../redux/actions/doctorMetaDataByIdAction';
import { Principal } from "@dfinity/principal";
import useAuthenticatedCannister from '../../../useAuthenticatedCannister';
import { loadDoctorOpenHoursById } from '../../../redux/actions/doctorOpenHourByIdAction';
import { saveDoctorOpenHours } from '../../../redux/actions/doctorOpenHoursAction';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function DoctorInfo() {

  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();


  const { doctorById } = useSelector(state => state.doctorById);

  const { accountType } = useSelector(state => state);

  const { doctorMetaDataById } = useSelector(state => state.doctorMetaDataById);

  const { departments } = useSelector(state => state.departmentList);

  const { doctorOpenHoursList } = Redux.useSelector(state => state);

  const { openHoursById } = Redux.useSelector(state => state.doctorOpenHoursByIdList);

  const params = useParams();


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenHoursOpen, setIsOpenHoursOpen] = useState(false);


  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");



  useEffect(() => {
    dispatch(loadDoctorById(params.doctor_id, authCannister));
  }, [dispatch, params.doctor_id, authCannister])

  useEffect(() => {
    dispatch(loadDoctorMetaDataById(params.doctor_id, authCannister));
  }, [dispatch, params.doctor_id, authCannister])


  useEffect(() => {
    dispatch(loadDepartmentList(authCannister));
  }, [dispatch, authCannister])

  useEffect(() => {
    dispatch(loadDoctorOpenHoursById(authCannister, params.doctor_id));
  }, [authCannister, params.doctor_id])


  useEffect(() => {
    dispatch(saveDoctorOpenHours(openHoursById));
  }, [openHoursById])


  const handleEditButton = () => {
    setIsPopupOpen(true);
  };
  const handleOpenHoursButton = () => {
    setIsOpenHoursOpen(true);
  };


  async function handleOpenHourFormSubmit(e) {
    e.preventDefault()

    const dates = doctorOpenHoursList.openHoursDates;
    const times = doctorOpenHoursList.openHoursTime;


    // dates.forEach((date, index, arr) => {
    //   arr[index] = date.toLocaleDateString();
    // })


    await authCannister.createOrUpdateDoctorOpenHours(dates, times);

    setIsOpenHoursOpen(false);

    Swal.fire({
      icon: 'success',
      title: 'Open Hours have been added',
      showConfirmButton: false,
      timer: 1500
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authCannister.createOrUpdateDoctorMetaData(
      Principal.fromText(params.doctor_id),
      designation,
      qualification,
      department,
    )

    setIsPopupOpen(false);

    dispatch(loadDoctorById(params.doctor_id, authCannister));
    dispatch(loadDoctorMetaDataById(params.doctor_id, authCannister));

    Salrt.fire({
      icon: "success",
      title: "Data Saved!",
      text: `${doctorById.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 2000
    });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(params.doctor_id);
    Salrt.fire({
      position: "bottom-end",
      icon: "success",
      title: `ID: ${params.doctor_id} has been Copied!`,
      showConfirmButton: false,
      timer: 1500
    });
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="doctor-app">
          <div className="doctorDetailsCard">
            <div className="doctorDetailsCardContent">
              <div className="cardTextContainer">
                <h2 className="cardHeader">{doctorById.name}</h2>
                <div className="cardTags">
                  <span className="tag" id="tag1">
                    <strong>Age:</strong> {parseInt(doctorById.age)}
                  </span>
                  <span className="tag" id="tag2">
                    <strong>Gender:</strong> {doctorById.gender}
                  </span>

                  <span className="tag" id="tag3">
                    <strong>Registered On:</strong>
                    {new Date(Number(doctorById.registered_on) / 1000000).toLocaleString()}
                  </span>
                  <span className="tag" id="tag4">
                    <strong>Designation:</strong> {doctorMetaDataById.designation}
                  </span>
                  <span className="tag" id="tag5">
                    <strong>Qualification:</strong> {doctorMetaDataById.qualification}
                  </span>
                  <span className="tag" id="tag6">
                    <strong>Department:</strong> {doctorMetaDataById.department}
                  </span>
                </div>
                <p className="tag" id="tag7">
                  <strong>Address: </strong>  {doctorById.address}
                </p>
                <p className="tag" id="tag7">
                  <strong>Internet Identity: </strong>
                  <ContentCopyIcon
                    onClick={handleCopyClick}
                    style={{ cursor: "pointer", margin: "0px 5px" }}
                  />
                  {
                    (doctorById.user_principal) ? doctorById.user_principal.toText() : " "
                  }

                </p>
              </div>
              <div className="cardButtons">
                <button
                  className="btnDesign"
                  id="edit-button"
                  onClick={handleEditButton}
                >Edit Details</button>
                {accountType === "doctor" && <button className="btnDesign" onClick={handleOpenHoursButton}>Add Open Hours</button>}

              </div>
            </div>
          </div>

          {
            isOpenHoursOpen && (
              <div id="OpenHoursPopup">
                <form id="OpenHoursForm" onSubmit={handleOpenHourFormSubmit}>
                  <DateSelector />
                  <button type='submit'>Submit</button>
                </form>
              </div>
            )
          }

          {
            isPopupOpen && (
              <div id="popup">
                <form id="form" onSubmit={handleSubmit}>
                  <label htmlFor="tag3">Designation:</label>
                  <input
                    type="text"
                    id="tag-3-input"
                    name="tag3"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                  <br />
                  <label htmlFor="tag4">Qualification:</label>
                  <input
                    type="text"
                    id="tag-4-input"
                    name="tag4"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  />
                  <br />

                  <label htmlFor="tag5">Department:</label>
                  <select value={department} id="tag-5-input"
                    name="tag5" onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select a department</option>
                    {departments.map((dept, i) => {
                      return <option key={i} value={dept}>
                        {dept}
                      </option>
                    }
                    )}
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