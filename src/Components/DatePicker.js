import React from "react";
import { useState } from "react";

const DatePicker = () => {
  const [date, setDate] = useState("yyyy-mm-dd");
  const [displayDate, setDisplayDate] = useState(date);
  const [showDate, setShowDate] = useState(false);
  const [previousDate, setPreviousDate] = useState("yyyy-mm-dd");
  const [showEditBtn, setShowEditBtn] = useState(showDate);
  function handleDate(val) {
    console.log("handleDate Called");
    setDate(val);
  }

  function handleTick() {
    console.log("handle Tick called");
    if (date === "yyyy-mm-dd") {
      alert("Please select a date");
    } else if (!showDate) {
      setShowEditBtn(true);
      console.log(date.split("-").reverse().join("-"));
      setShowDate(true);
      setPreviousDate(date);
      setDisplayDate(date);
    }
  }

  function handleCross() {
    console.log("handleCross called");
    if (date === "yyyy-mm-dd") {
      alert("Please select a date");
    } else if (!showDate) {
      setShowEditBtn(true);
      setShowDate(true);
      setDisplayDate(previousDate);
    }
  }
  return (
    <div className="Date">
      {showDate ? (
        <p className="date-text">
          {displayDate.split("-").reverse().join("-")}
        </p>
      ) : (
        <input
          type="date"
          value={date}
          onChange={(e) => {
            const value = e.target.value;
            handleDate(value);
          }}
        ></input>
      )}
      {showEditBtn ? (
        <button
          className="edit"
          onClick={() => {
            console.log("Edit btn clicked");
            setShowEditBtn(!showEditBtn);
            setShowDate(false);
          }}
        >
          Edit
        </button>
      ) : (
        <div className="btns">
          <div
            className="tick"
            onClick={() => {
              handleTick();
            }}
          >
            ✓
          </div>
          <div
            className="cross"
            onClick={() => {
              handleCross();
            }}
          >
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
