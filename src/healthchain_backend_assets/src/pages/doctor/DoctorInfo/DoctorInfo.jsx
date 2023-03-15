import React, { useState, useEffect } from 'react';
import * as Redux from 'react-redux';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import "./DoctorInfo.scss";
import { healthchain_backend } from '../../../../../declarations/healthchain_backend/index';
import Salrt from "sweetalert2";
import { loadDoctorList } from '../../../redux/actions/doctorAction';
import { loadDoctorById } from '../../../redux/actions/doctorByIdAction';
import { loadDepartmentList } from '../../../redux/actions/departmentAction';
import DateSelector from './DateSelector';
import { healthchain_backend_assets } from '../../../../../declarations/healthchain_backend_assets/index';

export default function DoctorInfo() {

  const dispatch = useDispatch();


  const { doctorById } = useSelector(state => state.doctorById);

  const {departments} = useSelector(state => state.departmentList);

  const { doctorOpenHoursList } = Redux.useSelector(state => state);

  const params = useParams();


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenHoursOpen, setIsOpenHoursOpen] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [registeredOn, setRegisteredOn] = useState("");

  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");



  useEffect(() => {
    dispatch(loadDoctorById(params.doctor_id));
  }, [params])


  useEffect(() => {
    if (doctorById.name !== undefined) {
      setName(doctorById.name)
      setEmail(doctorById.email)
      setGender(doctorById.gender)
      setPhoneNumber(doctorById.phone_number)
      setAge(doctorById.age)
      setAddress(doctorById.address)
      setQualification(doctorById.qualification)
      setDepartment(doctorById.department)
      setDesignation(doctorById.designation)
      setRegisteredOn(new Date(Number(doctorById.registered_on) / 1000000).toLocaleString())
    }

  }, [doctorById])


  useEffect(() => {
    dispatch(loadDepartmentList());
  }, [])


  const handleEditButton = () => {
    setIsPopupOpen(true);
  };
  const handleOpenHoursButton = () => {
    setIsOpenHoursOpen(true);
  };


  async function handleOpenHourFormSubmit(e) {
    e.preventDefault()

    // const result = doctorOpenHoursList.reduce((acc, item) => {
    //   acc[item.dateSelected] = item.timeSelected;
    //   return acc;
    // }, {});

    const dates = doctorOpenHoursList.map(obj => obj.dateSelected);
    const times = doctorOpenHoursList.map(obj => obj.timeSelected);

    console.log(dates)
    console.log(times)

    dates.forEach((date, index, arr) => {
      arr[index] = date.toLocaleDateString();
    })


    await healthchain_backend.addDoctorOpenHours(params.doctor_id,
      dates,
      times);


    setIsOpenHoursOpen(false);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    await healthchain_backend.updateDoctor(
      params.doctor_id,
      doctorById.registered_on,
      name,
      email,
      phoneNumber,
      parseInt(age),
      address,
      gender,
      designation,
      qualification,
      department,
    )

    setIsPopupOpen(false);

    dispatch(loadDoctorList());

    Salrt.fire({
      icon: "success",
      title: "Data Saved!",
      text: `${doctorById.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 2000
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
                <h2 className="cardHeader">{name}</h2>
                <div className="cardTags">
                  <span className="tag" id="tag1">
                    <strong>Age:</strong> {parseInt(age)}
                  </span>
                  <span className="tag" id="tag2">
                    <strong>Gender:</strong> {gender}
                  </span>

                  <span className="tag" id="tag3">
                    <strong>Registered On:</strong>
                    {registeredOn}
                  </span>
                  <span className="tag" id="tag4">
                    <strong>Designation:</strong> {designation}
                  </span>
                  <span className="tag" id="tag5">
                    <strong>Qualification:</strong> {qualification}
                  </span>
                  <span className="tag" id="tag6">
                    <strong>Department:</strong> {department}
                  </span>
                </div>
                <p className="tag" id="tag7">
                  <strong>Address: </strong>  {address}
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
                <button className="btnDesign" onClick={handleOpenHoursButton}>Add Open Hours</button>

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
                  <label htmlFor="tag1">Age:</label>
                  <input
                    type="text"
                    id="tag-1-input"
                    name="tag1"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <br />
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
                  {/* <label htmlFor="tag5">Department:</label>
                  <input
                    type="text"
                    id="tag-5-input"
                    name="tag5"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                  <br /> */}

                  <label htmlFor="tag5">Department:</label>
                  <select value={department} id="tag-5-input"
                    name="tag5" onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select a department</option>
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>


                  <label htmlFor="tag2">Address:</label>
                  <textarea
                    type="text"
                    id="tag-2-input"
                    name="tag2"
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