import React, { useState } from "react";
import "./Appointment.scss";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import * as Redux from "react-redux";
import { loadDepartmentList } from "../../redux/actions/departmentAction";
import { loadDoctorAppointmentOpenHours } from "../../redux/actions/doctorAppointmentOpenHourAction";
import { loadDoctorList } from "../../redux/actions/doctorAction";
const doctors = [
    {
        id: 1,
        name: "Sambhav",
        department: "Cardiology",
        cabinNumber: "101",
        availableSlots: [
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM"
        ]
    },
    {
        id: 2,
        name: "Samyak",
        department: "Dermatology",
        cabinNumber: "102",
        availableSlots: [
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "3:00 PM",
            "4:00 PM",
            "5:00 PM"
        ]
    },
    {
        id: 3,
        name: "Manan",
        department: "Pediatrics",
        cabinNumber: "103",
        availableSlots: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
    },
    {
        id: 4,
        name: "Dhanunjay",
        department: "Gynecology",
        cabinNumber: "104",
        availableSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
    },
    {
        id: 5,
        name: "Akshay",
        department: "Orthopaedics",
        cabinNumber: "105",
        availableSlots: ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
    }
];

const Appointment = () => {
    const [chosenDepartment, setChosenDepartment] = useState("All Departments");


    const dispatch = Redux.useDispatch();


    // const { doctors } = Redux.useSelector(state => state.doctorList);

    const { departments } = Redux.useSelector(state => state.departmentList);



    const { openHours } = Redux.useSelector(state => state.openHours);


    React.useEffect(() => {
        dispatch(loadDepartmentList());
    }, [])



    React.useEffect(() => {
        dispatch(loadDoctorAppointmentOpenHours());
    }, [dispatch])

    React.useEffect(() => {
        dispatch(loadDoctorList())
    }, [dispatch])



    // TODO
    // React.useEffect(() => {
    //     // for (let i = 0; i < openHours.length; i++) {
    //     //     const doc_details = {};
    //     //     doc_details.doc_id = openHours[i].doctor_id;

    //     //     doctors.find((doc, index, arr) => {
    //     //         if (doc.doctor_id === openHours[i].doctor_id) {
    //     //             doc_details.name = doc.name;
    //     //             doc_details.department = doc.department;
    //     //         }
    //     //     })
    //         // openHours[i] doctorid
    //         //doctoid doctlist find kiya name cabin department
    //         //[] d
    //     }
    // }, [openHours])




    const deptChangeKoHandle = (event) => {
        setChosenDepartment(event.target.value);
    };

    const filteredDoctors =
        chosenDepartment === "All Departments"
            ? doctors
            : doctors.filter((doctor) => doctor.department === chosenDepartment);

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
                            {departments.map((department) => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="cardWalaComp">
                        {filteredDoctors.map((doctor) => (
                            <AppointmentCard
                                key={doctor.id}
                                name={doctor.name}
                                department={doctor.department}
                                cabinNumber={doctor.cabinNumber}
                                availableSlots={doctor.availableSlots}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Appointment;
