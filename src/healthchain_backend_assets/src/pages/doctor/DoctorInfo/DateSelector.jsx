import React, { useEffect, useState } from "react";
import * as Redux from 'react-redux';
import DatePicker from "react-datepicker";
import "./DateSelector.scss";
import TimeSelector from "./TimeSelector";
import "react-datepicker/dist/react-datepicker.css";
import { saveDoctorOpenHours } from "../../../redux/actions/doctorOpenHoursAction";

const DateSelector = () => {


  const dispatch = Redux.useDispatch();

  const [selectedDates, setSelectedDates] = useState([]);

  const { doctorOpenHoursList } = Redux.useSelector(state => state);

  const handleDateSelect = (date) => {
    setSelectedDates([...selectedDates, date]);

    const updatedOpenHourList = doctorOpenHoursList;

    const index = updatedOpenHourList.findIndex((d) => d.dateSelected === date);
    if (index === -1) {
      updatedOpenHourList.push({ dateSelected: date, timeSelected: [] });
    } else {
      console.log(`Date ${date} already exists`);
    }

    dispatch(saveDoctorOpenHours(updatedOpenHourList));

  };






  const handleDateRemove = (date) => {
    setSelectedDates(selectedDates.filter((d) => d !== date));

    const updatedOpenHourList = doctorOpenHoursList;
    updatedOpenHourList = updatedOpenHourList.filter(d => d.dateSelected !== date);

    dispatch(saveDoctorOpenHours(updatedOpenHourList));

  };

  // function handleWeekdaySelect(e, weekday) {
  //   e.preventDefault();

  //   const newDates = [];
  //   let currentDate = new Date();
  //   const daysToAdd = 7 - currentDate.getDay() + weekday;
  //   currentDate.setDate(currentDate.getDate() + daysToAdd);
  //   for (let j = 0; j < 4; j++) {
  //     newDates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 7);
  //   }
  //   setSelectedDates([...selectedDates, ...newDates]);
  // };

  const handleClearSelection = () => {
    setSelectedDates([]);
  };

  return (
    <div className="date-selector">
      <div className="date-picker">
        <DatePicker
          selected={null}
          onChange={handleDateSelect}
          inline
          highlightDates={selectedDates}
          excludeDates={selectedDates}
          placeholderText="Click to select dates"
        />
        {/* <div className="weekday-buttons">
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 1)}
          >
            Mon
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 2)}
          >
            Tue
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 3)}
          >
            Wed
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 4)}
          >
            Thu
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 5)}
          >
            Fri
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 6)}
          >
            Sat
          </button>
          <button
            className="weekday-button"
            onClick={(e) => handleWeekdaySelect(e, 0)}
          >
            Sun
          </button>
        </div> */}
      </div>

      <div className="selected-dates">
        {selectedDates.length > 0 && (
          <button className="clear-selection" onClick={handleClearSelection}>
            Clear selection
          </button>
        )}
        {selectedDates.length > 0 ? (
          <ul className="dates-list">
            {selectedDates.map((date,index) => (
              <li className="date-item" key={date.toISOString()}>
                <span className="date-text">{date.toLocaleDateString()}</span>
                <TimeSelector i={index} />
                <button
                  className="remove-button"
                  onClick={() =>
                    handleDateRemove(date)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-dates-selected">No dates selected</p>
        )}
      </div>
    </div>
  );
};

export default DateSelector;




// import React, { useState } from "react";
// imprt * as Redux from "react-redux";
// import DatePicker from "react-datepicker";
// import "./DateSelector.scss";
// import TimeSelector from "./TimeSelector";
// // import "./react-datepicker.scss";
// import "react-datepicker/dist/react-datepicker.css";
// import { addDoctorOpenHour } from "../../../redux/actions/doctorOpenHoursAction";

// const DateSelector = () => {
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [selectedTimes, setSelectedTimes] = useState([]);

//   const dispatch = Redux.useDispatch();

//   const {doctorOpenHoursList} = Redux.useSelector(state => state);




//   const handleDateSelect = (date) => {
//     setSelectedDates([...selectedDates, date]);
//   };

//   React.useEffect(() => {
//     dispatch(addDoctorOpenHour(selectedDates))
//   })

//   function handleWeekdaySelect(e, weekday) {
//     e.preventDefault();

//     const newDates = [];
//     let currentDate = new Date();
//     const daysToAdd = 7 - currentDate.getDay() + weekday;
//     currentDate.setDate(currentDate.getDate() + daysToAdd);
//     for (let j = 0; j < 4; j++) {
//       newDates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 7);
//     }
//     setSelectedDates([...selectedDates, ...newDates]);
//   };

//   const handleClearSelection = () => {
//     setSelectedDates([]);
//   };

//   return (
//     <div className="date-selector">
//       <div className="date-picker">
//         <DatePicker
//           selected={null}
//           onChange={handleDateSelect}
//           inline
//           highlightDates={selectedDates}
//           excludeDates={selectedDates}
//           placeholderText="Click to select dates"
//         />
//         <div className="weekday-buttons">
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 1)}
//           >
//             Mon
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 2)}
//           >
//             Tue
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 3)}
//           >
//             Wed
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 4)}
//           >
//             Thu
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 5)}
//           >
//             Fri
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 6)}
//           >
//             Sat
//           </button>
//           <button
//             className="weekday-button"
//             onClick={(e) => handleWeekdaySelect(e, 0)}
//           >
//             Sun
//           </button>
//         </div>
//       </div>
//       <div className="selected-dates">
//         {selectedDates.length > 0 && (
//           <button className="clear-selection" onClick={handleClearSelection}>
//             Clear selection
//           </button>
//         )}
//         {selectedDates.length > 0 ? (
//           <ul className="dates-list">
//             {selectedDates.map((date, index) => (
//               <li className="date-item" key={date.toISOString()}>
//                 <span className="date-text">{date.toLocaleDateString()}</span>
//                 <TimeSelector
//                   index={index}
//                   // timeList={selectedTimes} setTimeList={setSelectedTimes} handleChange={handleTimeChange}
//                 />
//                 <button
//                   className="remove-button"
//                   onClick={() =>
//                     setSelectedDates(selectedDates.filter((d) => d !== date))
//                   }
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="no-dates-selected">No dates selected</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DateSelector;







