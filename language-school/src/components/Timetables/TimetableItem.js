import React from "react";
import { useNavigate } from "react-router-dom";

const TimetableItem = ({ timetable }) => {
  const navigate = useNavigate();

  return (
    <div>
      <li>
        <div>dzień: {timetable.day.dayName}</div>
        <div>
          od: {timetable.timeStart} do: {timetable.timeEnd}
        </div>
        <div>
          nauczyciel: {timetable.teacher.surname} {timetable.teacher.name}
        </div>
        <div>przedmiot: {timetable.subject.subject}</div>
        <div>sala nr: {timetable.classroom.classroom}</div>
        <div className="material-symbols-outlined edit">edit</div>
        <div className="material-symbols-outlined bin">delete</div>
      </li>
      
    </div>
  );
};

export default TimetableItem;
