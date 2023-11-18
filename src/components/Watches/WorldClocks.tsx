import React, { useState } from "react";
import "./worldClock.css";
import WorldClockProps from "./interface/InterfaceWorldClock";
import ClockChild from "./ClockChild";

export const WorldClock: React.FC = () => {
  const [clocks, setClocks] = useState<WorldClockProps[]>([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  const handleTimezoneOffsetChange = (value: string) => {
    const offsetNumber = parseInt(value, 10);
    if (!isNaN(offsetNumber) && offsetNumber >= -12 && offsetNumber <= 12) {
      setTimezoneOffset(offsetNumber);
    }
  };

  const handleAddClock = () => {
    if (name.trim() === "") {
      setNameError("Введите название");
      return;
    }
    setClocks([...clocks, { name, timezoneOffset }]);
    setName("");
    setNameError("");
    setTimezoneOffset(0);
  };

  const handleRemoveClock = (index: number) => {
    const newClocks = clocks.filter((_, i) => i !== index);
    setClocks(newClocks);
  };

  return (
    <div className="worldClock">
      <div className="worldClock__wrapper">
        <div className="worldClock__wrapper-name">
          <label className="worldClock__label-name" htmlFor="nameID">
            Название
          </label>
          <input
            className="worldClock__input-name input-reset"
            id="nameID"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
            required
          />
          {nameError && <span className="worldClock__input-name-error">{nameError}</span>}
        </div>
        <div className="worldClock__label-number">
          <label className="worldClock__label-number" htmlFor="timezoneOffsetID">
            Ввод часового пояса по Гринвичу(-12 до +12)
          </label>
          <input
            className="worldClock__input-number input-reset"
            id="timezoneOffsetID"
            type="number"
            value={timezoneOffset}
            onChange={(e) => handleTimezoneOffsetChange(e.target.value)}
            placeholder="UTC"
            min="-12"
            max="12"
          />
        </div>
        <button className="worldClock__btn btn-reset" onClick={handleAddClock}>
          Добавить
        </button>
      </div>
      <ul className="worldClock__list list-reset">
        <li className="worldClock__item default">
          <ClockChild name={"New York"} timezoneOffset={-5}></ClockChild>
        </li>
        <li className="worldClock__item default">
          <ClockChild name={"London"} timezoneOffset={0}></ClockChild>
        </li>
        <li className="worldClock__item default">
          <ClockChild name={"Moscow"} timezoneOffset={3}></ClockChild>
        </li>
        <li className="worldClock__item default">
          <ClockChild name={"Tokio"} timezoneOffset={9}></ClockChild>
        </li>
        {clocks.map((clock, index) => (
          <li className="worldClock__item" key={index}>
            <button className="worldClock__btn-remove btn-reset" onClick={() => handleRemoveClock(index)}>
              X
            </button>
            <ClockChild name={clock.name} timezoneOffset={clock.timezoneOffset}></ClockChild>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorldClock;
