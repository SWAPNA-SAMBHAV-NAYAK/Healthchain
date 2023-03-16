// import React, { useState } from "react";
// import "./AppointmentCard.scss";
// import Swal from "sweetalert2";

// const AppointmentCard = ({ name, department, cabinNumber, availableSlots }) => {
//   const [chosenSlot, setChosenSlot] = useState(null);
//   const [chosenDate, setChosenDate] = useState(null);

//   const slotChangeKoHandle = (event) => {
//     setChosenSlot(event.target.value);
//   };

//   const dateChangeKoHandle = (event) => {
//     setChosenDate(event.target.value);
//   };

//   const bookAppointmentKoHandle = () => {
//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: `Your Appoinment is set on ${chosenDate} with Dr. ${name}.`,
//       showConfirmButton: false,
//       timer: 1500
//     });
//   };

//   return (
//     <div className="docCard">
//       <div className="docInfo">
//         <div className="docName">Dr.{name}</div>
//         <div className="docDept">{department}</div>
//         <div className="docCabin">{`Cabin ${cabinNumber}`}</div>
//       </div>
//       <div className="appointmentForm">
//         <div className="formGroup">
//           <label htmlFor="slotChoose">Choose a time slot:</label>
//           <select
//             id="slotChoose"
//             value={chosenSlot}
//             onChange={slotChangeKoHandle}
//           >
//             <option value="">Select a time slot</option>
//             {availableSlots.map((slot) => (
//               <option key={slot} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="formGroup">
//           <label htmlFor="dateInput">Choose a date:</label>
//           <input
//             type="date"
//             id="dateInput"
//             value={chosenDate}
//             onChange={dateChangeKoHandle}
//           />
//         </div>
//         <button
//           disabled={!chosenSlot || !chosenDate}
//           onClick={bookAppointmentKoHandle}
//         >
//           Book Appointment
//         </button>
//       </div>
//       {isPopupOpen && (
//         <div id="popup">
//           <form id="form" onSubmit={handleSubmit}>
//             <label htmlFor="tag1">Patient Name:</label>
//             <input
//               type="text"
//               id="tag-1-input"
//               name="tag1"
//               value={patientName}
//               onChange={(e) => setpatientName(e.target.value)}
//             />
//             <br />
//             <label htmlFor="tag2">Patient Id:</label>
//             <input
//               type="text"
//               id="tag-2-input"
//               name="tag2"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//             />
//             <br />

//             <button type="submit" onClick={alertShow}>
//               Book
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentCard;

import React, { useEffect, useState } from "react";
import "./AppointmentCard.scss";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";
import uuid from 'react-uuid';

const AppointmentCard = ({ doctor_id, name, department, openHoursDates, openHoursTime }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [chosenSlot, setChosenSlot] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  // const [patientName, setpatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const [formattedDates, setFormattedDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const slotChangeKoHandle = (event) => {
    setChosenSlot(event.target.value);
  };

  const dateChangeKoHandle = (date) => {
    setChosenDate(date);
    setTimeSlots(openHoursTime[openHoursDates.indexOf(date.toLocaleDateString())])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await healthchain_backend.createAppointment(
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
              timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))
            }
          </select>
        </div>

        <button
          disabled={!chosenSlot || !chosenDate}
          onClick={bookAppointmentKoHandle}
        >
          Book Appointment
        </button>
      </div>
      {isPopupOpen && (
        <div id="popup">
          <form id="form" onSubmit={handleSubmit}>
            {/* <label htmlFor="tag1">Patient Name:</label>
            <input
              type="text"
              id="tag-1-input"
              name="tag1"
              value={patientName}
              onChange={(e) => setpatientName(e.target.value)}
            />
            <br /> */}
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
