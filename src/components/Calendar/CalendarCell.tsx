import {
  isSelectedMonth,
  isCurrentDay,
  DISPLAY_MODE_DAY,
} from "../../constants";
import React from "react";
import "./CalendarCell.scss";

export const CalendarCell: React.FC<any> = ({
  dayItem,
  today,
  openFormHandler,
  events,
  setDisplayMode,
}) => {
  return (
    <div className="cell" key={dayItem.unix()}>
      <div className="cell__row">
        <div className="cell__show-day">
          <div
            className="cell__day"
            onDoubleClick={() => openFormHandler("Create", null, dayItem)}
          >
            {isCurrentDay(dayItem) ? (
              <div className="current-day">{dayItem.format("D")}</div>
            ) : (
              dayItem.format("D")
            )}
          </div>
        </div>
        <ul className="event-list">
          {events.slice(0, 2).map((event: any) => (
            <li className="event-list__items" key={event.id}>
              <button
                className="event-list__btn"
                onDoubleClick={() => openFormHandler("Update", event)}
              >
                {event.title}
              </button>
            </li>
          ))}
          {events.length > 2 ? (
            <li className="event-list__items" key="show more">
              <button
                className="event-list__btn"
                onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}
              >
                show more...
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
