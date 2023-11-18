import React, { useState, useEffect } from "react";
import WorldClockProps from "./interface/InterfaceWorldClock";
import moment from "moment";

export const ClockChild: React.FC<WorldClockProps> = ({ name, timezoneOffset }) => {
  const [time, setTime] = useState(moment().utcOffset(timezoneOffset));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().utcOffset(timezoneOffset));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return (
    <div className="worldClock__add-wrapper">
      <h2 className="worldClock__title">{name}</h2>
      <p className="worldClock__time">
        UTC: {timezoneOffset} {time.format("HH:mm:ss")}
      </p>
    </div>
  );
};

export default ClockChild;
