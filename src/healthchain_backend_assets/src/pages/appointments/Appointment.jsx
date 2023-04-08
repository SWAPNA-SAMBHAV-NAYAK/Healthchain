import React, { useState } from "react";
import "./Appointment.scss";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import * as Redux from "react-redux";
import { loadDepartmentList } from "../../redux/actions/departmentAction";
import { loadDoctorAppointmentOpenHours } from "../../redux/actions/doctorAppointmentOpenHourAction";
import { loadDoctorList } from "../../redux/actions/doctorAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import { loadDoctorMetaDataList } from "../../redux/actions/doctorMetaDataAction";

const Appointment = () => {
    const [chosenDepartment, setChosenDepartment] = useState("All Departments");

    const [doctorApptOpenHoursList, setDoctorApptOpenHoursList] = useState([]);

    const dispatch = Redux.useDispatch();

    const authCannister = useAuthenticatedCannister();


    const { doctors } = Redux.useSelector(state => state.doctorList);


    const { doctorMetaDataList } = Redux.useSelector(state => state.doctorMetaDataList);

    const { departments } = Redux.useSelector(state => state.departmentList);

    const { openHours } = Redux.useSelector(state => state.openHours);


    React.useEffect(() => {
        dispatch(loadDepartmentList(authCannister));
    }, [authCannister])

    React.useEffect(() => {
        dispatch(loadDoctorAppointmentOpenHours(authCannister));
    }, [dispatch, authCannister])

    React.useEffect(() => {
        dispatch(loadDoctorList(authCannister))
    }, [dispatch, authCannister])


    React.useEffect(() => {
        dispatch(loadDoctorMetaDataList(authCannister))
    }, [dispatch, authCannister])

    React.useEffect(() => {
        const oHList = [];

        for (let i = 0; i < openHours.length; i++) {
            const doc_details = {};
            doc_details.doctor_id = openHours[i].doctor_id.toText();
            doc_details.openHoursDates = openHours[i].openHoursDates;
            doc_details.openHoursTime = openHours[i].openHoursTime;

            doctors.find((doc) => {
                if (doc.user_principal.toText() === openHours[i].doctor_id.toText()) {
                    doc_details.name = doc.name;
                }
            })

            doctorMetaDataList.find((docMetaData) => {
                if (docMetaData.doctor_id.toText() === openHours[i].doctor_id.toText()) {
                    doc_details.department = docMetaData.department;
                }
            })

            if (doc_details.name !== undefined) {
                oHList.push(doc_details);
            }
            

            // if (doc_details.name !== undefined) {
            //     setDoctorApptOpenHoursList((oldList) => {
            //         oldList.push(doc_details);
            //         const uniqueArr = [];
            //         oldList.forEach(obj => {
            //             if (!uniqueArr.some(item => JSON.stringify(item) === JSON.stringify(obj))) {
            //                 uniqueArr.push(obj);
            //             }
            //         });
            //         return uniqueArr;
            //     })
            // }
        }
        setDoctorApptOpenHoursList(oHList);
    }, [openHours, doctors, doctorMetaDataList])



    const deptChangeKoHandle = (event) => {
        setChosenDepartment(event.target.value);
    };

    const filteredDoctors =
        chosenDepartment === "All Departments"
            ? doctorApptOpenHoursList
            : doctorApptOpenHoursList.filter((doctor) => doctor.department === chosenDepartment);

    return (
        <div className="appointy">
            <Sidebar />
            <div className="ekAurClass">
                <Navbar />
                <div className="deptContainer">

                    <div className="deptHeader">
                        <label htmlFor="deptChoose">Select department:</label>
                        <select
                            id="deptChoose"
                            value={chosenDepartment}
                            onChange={deptChangeKoHandle}
                        >

                            <option key={"All Departments"} value={"All Departments"}>
                                All Departments
                            </option>
                            {departments.map((department) => {
                                return <option key={department} value={department}>
                                    {department}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="cardWalaComp">
                        {filteredDoctors.map((d) => {
                            return <AppointmentCard
                                key={d.doctor_id}
                                doctor_id={d.doctor_id}
                                name={d.name}
                                department={d.department}
                                openHoursDates={d.openHoursDates}
                                openHoursTime={d.openHoursTime}
                            />
                        })}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Appointment;
