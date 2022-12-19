import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteTimetable } from "../../services/httpService";
import "./Timetables.scss";

const TimetableItem = ({ timetable, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {

    await deleteTimetable(timetable.id);
    refresh();
  };

  return (
    <div className="timetableItem__container">
      <li className="timetableItem__list">
        <div className="timetable__Item">{timetable.day.label}</div>
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

        <div
          className="material-symbols-outlined edit"
          onClick={() => navigate(`/timetable/${timetable.id}`)}
        >
          edit
        </div>
        
        <div className="material-symbols-outlined bin" onClick={deleteItem}>
          delete
        </div>
      </li>
    </div>
  );
};

export default TimetableItem;
