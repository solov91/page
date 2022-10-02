import React from "react";
import moment from "moment";

import "./CalendarGridHeader.scss";

export const CalendarGridHeader = () => (
  <>
    {[...Array(7)].map((_, i) => (
      <div className="header-cell" key={i}>
        <div className="header-cell__row">
          {moment()
            .day(i + 1)
            .format("ddd")}
        </div>
      </div>
    ))}
  </>
);
