import React from "react";
import "./CalendarCell.scss";

export const CalendarCell:React.FC = () => {
  return (
    <div className="calendar-cell">
      <div className="calendar-cell__container">
        <div className="calendar-cell__day">
          29
        </div>
      </div>
    </div>
  )
}
