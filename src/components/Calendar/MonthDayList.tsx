import { isDayContainCurrentEvent } from "constants/momentConst";
import React from "react";
import { CalendarCell } from "./CalendarCell";

export const MonthDaysList: React.FC<any> = ({
  startDay,
  totalDays,
  events,
  openFormHandler,
  today,
  setDisplayMode,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  return (
    <>
      {daysMap.map((dayItem, i) => (
        <CalendarCell
          key={i}
          today={today}
          events={events.filter((event: any) =>
            isDayContainCurrentEvent(event, dayItem)
          )}
          openFormHandler={openFormHandler}
          dayItem={dayItem}
          setDisplayMode={setDisplayMode}
        />
      ))}
    </>
  );
};
