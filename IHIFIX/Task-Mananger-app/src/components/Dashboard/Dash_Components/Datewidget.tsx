import React, { useState } from "react";
import "./Datewidget.css";

const Datewidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date:Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return day;
    });
    return weekDates;
  };

  const weekDates = getWeekDates(new Date(currentDate));
  const month = weekDates[0].toLocaleString("default", { month: "long" });
  const year = weekDates[0].getFullYear();
  const currentMonth = weekDates[0].getMonth();

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const formatDate = (date:Date) => {
    const dayNumber = date.getDate();
    return `${dayNumber}`;
  };

  const isToday = (date:Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="calendar-widget" data-aos="fade-left" data-aos-duration="1300">
      <div className="header">
        <h2>{`${month} ${year}`}</h2>
        <div className="navigation">
          <button onClick={handlePrevWeek}>
            <img
              src="\src\assets\left-arrow-angle-big-gross-symbol.png"
              alt=""
            />
          </button>
          <button onClick={handleNextWeek}>
            <img src="\src\assets\right-arrow.png" alt="" />
          </button>
        </div>
      </div>

      <div className="week">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`day ${
              date.getMonth() !== currentMonth ? "different-month" : ""
            } ${isToday(date) ? "current-day" : ""}`}
          >
            <div className="highlighter">{formatDate(date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Datewidget;
