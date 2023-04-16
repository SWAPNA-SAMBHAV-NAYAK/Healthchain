import React, { useEffect, useState } from "react";
import * as Redux from 'react-redux';
import DatePicker from "react-datepicker";
import "./DateSelector.scss";
import TimeSelector from "./TimeSelector";
import "react-datepicker/dist/react-datepicker.css";
import { saveDoctorOpenHours } from "../../../redux/actions/doctorOpenHoursAction";

const DateSelector = () => {


  const dispatch = Redux.useDispatch();

  const doctorOpenHoursList = Redux.useSelector(state => state.doctorOpenHoursList);

  const [datePicker, setDatePicker] = useState();


  useEffect(() => {
    if (doctorOpenHoursList && doctorOpenHoursList.openHoursDates) {
      const l = [];
      doctorOpenHoursList.openHoursDates.forEach(d => l.push(new Date(d)))

      setDatePicker(<DatePicker
        selected={null}
        onChange={handleDateSelect}
        inline
        highlightDates={l}
        excludeDates={l}
        placeholderText="Click to select dates"
      />)
    }
  }, [doctorOpenHoursList]);



  const handleDateSelect = (date) => {
    const updatedOpenHourList = doctorOpenHoursList;

    const index = updatedOpenHourList.openHoursDates.findIndex((d) => d === date.toLocaleDateString());

    if (index === -1) {
      updatedOpenHourList.openHoursDates.push(date.toLocaleDateString());
    }

    dispatch(saveDoctorOpenHours(updatedOpenHourList));

  };

  const handleDateRemove = (date, index) => {
    const updatedOpenHourList = doctorOpenHoursList;
    updatedOpenHourList.openHoursDates = updatedOpenHourList.openHoursDates.filter(d => d !== date);

    updatedOpenHourList.openHoursTime.splice(index, 1)

    dispatch(saveDoctorOpenHours(updatedOpenHourList));

  };

  const handleClearSelection = () => {
    dispatch(saveDoctorOpenHours({
      openHoursDates: [],
      openHoursTime: [],
    }));
  };

  return (
    <div className="date-selector">
      <div className="date-picker">
        {/* <DatePicker
          selected={null}
          onChange={handleDateSelect}
          inline
          highlightDates={highLightedDates}
          excludeDates={highLightedDates}
          placeholderText="Click to select dates"
        /> */}
        {datePicker}
      </div>

      {doctorOpenHoursList.openHoursDates &&
        <div className="selected-dates">
          {doctorOpenHoursList.openHoursDates.length > 0 && (
            <button className="clear-selection"
              onClick={handleClearSelection}
              type="button">
              Clear selection
            </button>
          )}
          {doctorOpenHoursList.openHoursDates.length > 0 ? (
            <ul className="dates-list">
              {
                doctorOpenHoursList.openHoursDates.map(
                  (date, index) => (<li className="date-item" key={index} >
                    <span className="date-text">
                      {date}
                    </span>
                    <TimeSelector i={index} />
                    <button
                      className="remove-button"
                      onClick={() => handleDateRemove(date, index)}
                      type="button">
                      Remove
                    </button>
                  </li>
                  )
                )
              }
            </ul>
          ) : (
            <p className="no-dates-selected">No dates selected</p>
          )}
        </div>
      }
    </div >
  );
};

export default DateSelector;