import React, { useEffect, useState } from "react";

import moment from "moment";

import { CalendarGrid, DayShowComponent } from "components/Calendar";
import { Monitor } from "components/Calendar";
import { Title } from "components/Calendar";
import { DISPLAY_MODE_MONTH, DISPLAY_MODE_DAY } from "../../constants";

import "./CalendarPage.scss";

const totalDays = 42;
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};

export const CalendarPage = () => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale("en", { week: { dow: 1 } });
  const [today, setToday] = useState<any>(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () =>
    setToday((prev: any) => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () =>
    setToday((prev: any) => prev.clone().add(1, displayMode));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState<any>(null);

  const [events, setEvents] = useState([]);
  const startDayQuery = startDay.clone().format("X");
  const endDayQuery = startDay.clone().add(totalDays, "days").format("X");
  useEffect(() => {}, []);

  const openFormHandler = (
    methodName: any,
    eventForUpdate: any,
    dayItem: any
  ) => {
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format("X") }); // todo
    setMethod(methodName);
  };

  const openModalFormHandler = (
    methodName: any,
    eventForUpdate: any,
    dayItem: any
  ) => {
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text: any, field: any) => {
    setEvent((prevState: any) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const eventFetchHandler = () => {};

  const removeEventHandler = () => {};

  return (
    <>
      {isShowForm ? (
        <div className="event" onClick={cancelButtonHandler}>
          <div
            className="event__container"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className="event__title"
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Title"
            />
            <textarea
              className="event__body"
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Description"
            />
            <div className="btn__container">
              <button onClick={cancelButtonHandler}>Cancel</button>
              <button onClick={eventFetchHandler}>{method}</button>
              {method === "Update" ? (
                <button onClick={removeEventHandler}>Remove</button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className="shadow__container">
        <Title />
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <CalendarGrid
            startDay={startDay}
            today={today}
            totalDays={totalDays}
            events={events}
            openFormHandler={openModalFormHandler}
            setDisplayMode={setDisplayMode}
          />
        ) : null}
        {displayMode === DISPLAY_MODE_DAY ? (
          <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
            changeEventHandler={changeEventHandler}
            cancelButtonHandler={cancelButtonHandler}
            eventFetchHandler={eventFetchHandler}
            method={method}
            removeEventHandler={removeEventHandler}
            openFormHandler={openFormHandler}
          />
        ) : null}
      </div>
    </>
  );
};
