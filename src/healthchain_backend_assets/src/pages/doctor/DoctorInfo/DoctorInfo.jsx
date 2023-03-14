import React, { useState, useEffect } from 'react';
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

export default function DoctorInfo() {

  const dispatch = useDispatch();


  const { doctorById } = useSelector(state => state.doctorById);

  const departments = useSelector(state => state.departmentList);

  const params = useParams();


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenHoursOpen, setIsOpenHoursOpen] = useState(false);


  const [name, setName] = useState("");
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
    console.log(doctorById);
    console.log(doctorById);
    if (doctorById.name !== undefined) {
      console.log("Hello");
      setName(doctorById.name)
      setGender(doctorById.gender)

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await healthchain_backend.updateDoctor(
      doctorById[0].doctor_id,
      doctorById[0].registered_on,
      doctorById[0].name,
      doctorById[0].email,
      doctorById[0].phone_number,
      parseInt(age),
      address,
      doctorById[0].gender,
      designation,
      qualification,
      department,
    )

    setIsPopupOpen(false);

    dispatch(loadDoctorList());

    Salrt.fire({
      icon: "success",
      title: "Data Saved!",
      text: `${doctorById[0].name}'s data has been updated.`,
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
                <form id="OpenHoursForm">
                  <DateSelector />
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