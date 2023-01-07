import React from "react";
import TimetableItem from "./TimetableItem";

function TimetableDay({ day, searchParameters }) {
  return (
    <div className="plan">
      <h2 className="header__day">{day.dayLabel}</h2>
      {day.items.map((tt) => {
        return (
          <TimetableItem
            key={tt.id}
            timetable={tt}
            searchParameters={searchParameters}
          />
        );
      })}
    </div>
  );
}

export default TimetableDay;
