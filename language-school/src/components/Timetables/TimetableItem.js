import React from "react";
import { useNavigate } from "react-router-dom";

const TimetableItem = ({ timetable }) => {
  const navigate = useNavigate();

  return (
    <div className="timetableItem__container">
      <li className="timetableItem__list">
        <div className="timetable__Item">{timetable.day.dayName}</div>
        <div className="timetable__Item">
          od: {timetable.timeStart} do: {timetable.timeEnd}
        </div>
        <div className="timetable__Item">
           {timetable.teacher.name} {timetable.teacher.surname}
        </div>
        <div className="timetable__Item">
          przedmiot: {timetable.subject.subject}
        </div>
        <div className="timetable__Item">
          sala nr: {timetable.classroom.classroom}
        </div>
        <div className="material-symbols-outlined edit">edit</div>
        <div className="material-symbols-outlined bin">delete</div>
      </li>
    </div>
  );
};

export default TimetableItem;
