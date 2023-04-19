import React, { useEffect, useState } from "react";
import "./AppointmentCard.scss";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import uuid from 'react-uuid';
import { useSelector } from "react-redux";

import useAuthenticatedCannister from "../../useAuthenticatedCannister";

const AppointmentCard = ({ doctor_id, name, department, openHoursDates, openHoursTime }) => {

  const { accountType } = useSelector(state => state);


  const authCannister = useAuthenticatedCannister();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [chosenSlot, setChosenSlot] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [patientId, setPatientId] = useState("");

  const [formattedDates, setFormattedDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const slotChangeKoHandle = (event) => {
    setChosenSlot(event.target.value);
  };

  const dateChangeKoHandle = (date) => {
    console.log()
    setChosenDate(date);

    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date);
    const indexTime = openHoursDates.indexOf(formattedDate)
    console.log(openHoursDates)
    console.log(formattedDate)
    console.log(indexTime)
    setTimeSlots(openHoursTime[indexTime])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authCannister.createAppointment(
      uuid(),
      patientId,
      doctor_id,
      chosenSlot,
      chosenDate.toLocaleDateString(),
    )

    setIsPopupOpen(false);

    Swal.fire({
      icon: "success",
      title: `${patientId}'s Appoinment is set on ${chosenDate} with Dr. ${name}.`,
      showConfirmButton: false,
      timer: 1500
    });

    setChosenDate("")
    setChosenSlot("")

  };

  const bookAppointmentKoHandle = () => {
    // Swal.fire({
    //   position: "top-end",
    //   icon: "success",
    //   title: `Your Appoinment is set on ${chosenDate} with Dr. ${name}.`,
    //   showConfirmButton: false,
    //   timer: 1500
    // });
    setIsPopupOpen(true);
  };


  function bookAppointmentKoHandlePatientSide() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are booking a appointment",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Book it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authCannister.createAppointmentPatientSide(
          uuid(),
          doctor_id,
          chosenSlot,
          chosenDate.toLocaleDateString(),
        )


        Swal.fire(
          'Booked!',
          'Your Appointment has been booked.',
          'success'
        )
      }
    })
  }


  useEffect(() => {
    const f = [];
    for (let i = 0; i < openHoursDates.length; i++) {
      f.push(new Date(openHoursDates[i]));
    }
    setFormattedDates(f);
  }, [openHoursDates])

  return (
    <div className="docCard">
      <div className="docInfo">
        <div className="docName">Dr. {name}</div>
        <div className="docDept">{department}</div>
      </div>
      <div className="appointmentForm">
        <div className="formGroup">
          <label htmlFor="dateInput">Choose a date:</label>
          {/* <input
            type="date"
            id="dateInput"
            value={chosenDate}
            onChange={dateChangeKoHandle}
            includeDates={
              () => {
                return [
                  openHoursDates.forEach((date) => {
                    return new Date(date)
                  })
                ]
              }
            }
          /> */}

          <DatePicker
            id="dateInput"
            selected={chosenDate}
            onChange={dateChangeKoHandle}
            includeDates={formattedDates}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="slotChoose">Choose a time slot:</label>
          <select
            id="slotChoose"
            value={chosenSlot}
            disabled={!chosenDate}
            onChange={slotChangeKoHandle}
          >
            <option value="">Select a time slot</option>
            {
              timeSlots.map((slot) => {
                return <option key={slot} value={slot}>
                  {slot}
                </option>
              })
            }
          </select>
        </div>

        {accountType === "patient" ?
          <button
            disabled={!chosenSlot || !chosenDate}
            onClick={bookAppointmentKoHandlePatientSide}
          >Book Appointment</button> :

          <button
            disabled={!chosenSlot || !chosenDate}
            onClick={bookAppointmentKoHandle}
          >Book Appointment</button>
        }

      </div>
      {accountType === "admin" && isPopupOpen && (
        <div id="popup">
          <form id="form" onSubmit={handleSubmit}>
            <label htmlFor="tag2">Patient Id:</label>
            <input
              type="text"
              id="tag-2-input"
              name="tag2"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <br />

            <button type="submit">Book</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
