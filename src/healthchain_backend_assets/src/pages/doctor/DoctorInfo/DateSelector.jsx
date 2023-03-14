import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DateSelector.scss";
import TimeSelector from "./TimeSelector";
// import "./react-datepicker.scss";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDates([...selectedDates, date]);
  };

  const handleWeekdaySelect = (weekday) => {
    const newDates = [];
    let currentDate = new Date();
    const daysToAdd = 7 - currentDate.getDay() + weekday;
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    for (let j = 0; j < 4; j++) {
      newDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    setSelectedDates([...selectedDates, ...newDates]);
  };

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
        <div className="weekday-buttons">
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(1)}
          >
            Mon
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(2)}
          >
            Tue
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(3)}
          >
            Wed
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(4)}
          >
            Thu
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(5)}
          >
            Fri
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(6)}
          >
            Sat
          </button>
          <button
            className="weekday-button"
            onClick={() => handleWeekdaySelect(0)}
          >
            Sun
          </button>
        </div>
      </div>
      <div className="selected-dates">
        {selectedDates.length > 0 ? (
          <ul className="dates-list">
            {selectedDates.map((date) => (
              <li className="date-item" key={date.toISOString()}>
                <span className="date-text">{date.toLocaleDateString()}</span>
                <TimeSelector />
                <button
                  className="remove-button"
                  onClick={() =>
                    setSelectedDates(selectedDates.filter((d) => d !== date))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-dates-selected">No dates selected</p>
        )}
        {selectedDates.length > 0 && (
          <button className="clear-selection" onClick={handleClearSelection}>
            Clear selection
          </button>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
