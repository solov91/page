import React from "react";
import moment from "moment";

import "./CalendarGridHeader.scss";

export const CalendarGridHeader = () => {
  return (
    <div className="calendar__header">
    {
      [...Array(7)].map((_, i) => (
        <div className="calendar__header-container">
          {moment().day(i+1).format('ddd')}
        </div>
      ))
    }
    </div>
  )
}
