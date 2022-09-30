import React from "react";

import "./Monitor.scss";

export const Monitor = () => {
  return (
    <div className="monitor">
      <div className="monitor__date">
        <span className="monitor__month">September</span>
        <span className="monitor__year">2022</span>
      </div>
      <div className="monitor__display">
        <button>Month</button>
        <button>Day</button>
      </div>
      <div className="monitor__swither">
        <button> &lt; </button>
        <button>Today</button>
        <button> &gt; </button>
      </div>
    </div>
  )
}
