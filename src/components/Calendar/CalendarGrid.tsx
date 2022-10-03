import React from "react";

import { CalendarGridHeader } from "./CalendarGridHeader";
import { MonthDaysList } from "./MonthDayList";

import "./CalendarGrid.scss";

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
      <div className="grid">
        <MonthDaysList
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
