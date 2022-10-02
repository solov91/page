import React from "react";

import { CalendarCell } from "./CalendarCell";
import { CalendarGridHeader } from "./CalendarGridHeader";

import "./CalendarGrid.scss";
import { MonthDayList } from "./MonthDayList";

export const CalendarGrid: React.FC<any> = ({
  startDay,
  today,
  totalDays,
  events,
  openFormHandler,
  setDisplayMode,
}) => {
  return (
    <>
      <div className="grid">
        <CalendarGridHeader />
      </div>
      <div className="gird">
        <MonthDayList
          totalDays={totalDays}
          openFormHandler={openFormHandler}
          events={events}
          startDay={startDay}
          today={today}
          setDisplayMode={setDisplayMode}
        />
      </div>
    </>
  );
};
