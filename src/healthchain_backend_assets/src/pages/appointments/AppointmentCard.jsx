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
import React, { useState } from "react";
import "./AppointmentCard.scss";
import Swal from "sweetalert2";

const AppointmentCard = ({ name, department, cabinNumber, availableSlots }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [chosenSlot, setChosenSlot] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const slotChangeKoHandle = (event) => {
    setChosenSlot(event.target.value);
  };

  const dateChangeKoHandle = (event) => {
    setChosenDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
  };

  const alertShow = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${patientName}'s Appoinment is set on ${chosenDate} with Dr. ${name}.`,
      showConfirmButton: false,
      timer: 1500
    });
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

  return (
    <div className="docCard">
      <div className="docInfo">
        <div className="docName">Dr.{name}</div>
        <div className="docDept">{department}</div>
        <div className="docCabin">{`Cabin ${cabinNumber}`}</div>
      </div>
      <div className="appointmentForm">
        <div className="formGroup">
          <label htmlFor="slotChoose">Choose a time slot:</label>
          <select
            id="slotChoose"
            value={chosenSlot}
            onChange={slotChangeKoHandle}
          >
            <option value="">Select a time slot</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="dateInput">Choose a date:</label>
          <input
            type="date"
            id="dateInput"
            value={chosenDate}
            onChange={dateChangeKoHandle}
          />
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
            <label htmlFor="tag1">Patient Name:</label>
            <input
              type="text"
              id="tag-1-input"
              name="tag1"
              value={patientName}
              onChange={(e) => setpatientName(e.target.value)}
            />
            <br />
            <label htmlFor="tag2">Patient Id:</label>
            <input
              type="text"
              id="tag-2-input"
              name="tag2"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <br />

            <button type="submit" onClick={alertShow}>
              Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
