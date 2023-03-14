import React, { useState } from "react";
import "./Appointment.scss";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
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

const departments = [
    "All Departments",
    "Cardiology",
    "Radiology",
    "Orthopedics",
    "Gynecology",
    "Dermatology",
    "Pediatrics"
];

const Appointment = () => {
    const [chosenDepartment, setChosenDepartment] = useState("All Departments");

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
