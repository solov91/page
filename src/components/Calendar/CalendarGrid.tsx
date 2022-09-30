import React from "react";

import { CalendarCell } from "./CalendarCell";
import { CalendarGridHeader } from "./CalendarGridHeader";

import './CalendarGrid.scss'

export const CalendarGrid = () => {
  return (
    <div className="calendar__grid">
      <CalendarGridHeader />
      <CalendarCell />
    </div>
  )
}
