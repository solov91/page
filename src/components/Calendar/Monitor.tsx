import React from "react";

import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../constants";

import "./Monitor.scss";

export const Monitor: React.FC<any> = ({
  today,
  prevHandler,
  todayHandler,
  nextHandler,
  setDisplayMode,
  displayMode,
}) => (
  <div className="monitor">
    <div>
      {displayMode === DISPLAY_MODE_DAY ? (
        <span className="monitor__text">{today.format("DD")}</span>
      ) : null}
      <span className="monitor__title-text">{today.format("MMMM")}</span>
      <span className="monitor__text">{today.format("YYYY")}</span>
    </div>
    <div className="monitor__btn">
      <button onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Month</button>
      <button onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>Day</button>
    </div>
    <div className="monitor__btn">
      <button onClick={prevHandler}> &lt; </button>
      <button onClick={todayHandler}>Today</button>
      <button onClick={nextHandler}> &gt; </button>
    </div>
  </div>
);
