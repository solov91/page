import React, { useState } from "react";
import moment from "moment";

import { isDayContainCurrentEvent, ITEMS_PER_DAY } from "../../constants";

import "./DayShowComponent.scss";

export const DayShowComponent: React.FC<any> = ({
  events,
  today,
  selectedEvent,
  changeEventHandler,
  cancelButtonHandler,
  eventFetchHandler,
  method,
  removeEventHandler,
  openFormHandler,
}) => {
  const eventList = events.filter((event: any) =>
    isDayContainCurrentEvent(event, today)
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const cells = [...new Array(ITEMS_PER_DAY)].map((_, i) => {
    const temp: any[] = [];
    eventList.forEach((event: any) => {
      if (+moment.unix(+event.date).format("H") === i) {
        temp.push(event);
      }
    });
    return temp;
  });

  const setTimeForEvent = (i: any) => {
    setShowTimePicker(false);
    const time = moment
      .unix(+selectedEvent.date)
      .hour(i)
      .format("X");
    changeEventHandler(time, "date");
  };

  return (
    <div className="day-show">
      <div className="day-show__events-list">
        <div className="day-show__scale">
          {cells.map((eventsList, i) => (
            <div key={i} className="day-show__cell">
              <div className="call-time">
                {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
              </div>
              <div className="day-show__event">
                {eventsList.map((event, i) => (
                  <button
                    key={i}
                    className="event-btn"
                    onClick={() => openFormHandler("Update", event)}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="event-container">
        {selectedEvent ? (
          <div>
            <input
              value={selectedEvent.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Title"
            />
            <div className="event-container__time">
              <div style={{ position: "relative" }}>
                <button>
                  {moment.unix(+selectedEvent.date).format("dddd, D MMMM")}
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowTimePicker((prevState) => !prevState)}
                >
                  {moment.unix(+selectedEvent.date).format("HH:mm")}
                </button>
                {showTimePicker ? (
                  <ul className="list-hours">
                    {[...new Array(ITEMS_PER_DAY)].map((_, i) => (
                      <li key={i}>
                        <button
                          className="list-hours__btn"
                          onClick={() => setTimeForEvent(i)}
                        >
                          {`${i}`.padStart(2, "0")}:00
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <textarea
              value={selectedEvent.description}
              onChange={(e: any) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Description"
            />
            <div className="btn-container">
              <button onClick={cancelButtonHandler}>Cancel</button>
              <button onClick={eventFetchHandler}>{method}</button>
              {method === "Update" ? (
                <button onClick={removeEventHandler}>Remove</button>
              ) : null}
            </div>
          </div>
        ) : (
          <>
            <div>
              <button onClick={() => openFormHandler("Create", null, today)}>
                Create new event
              </button>
            </div>
            <div className="no-event">No event selected</div>
          </>
        )}
      </div>
    </div>
  );
};
