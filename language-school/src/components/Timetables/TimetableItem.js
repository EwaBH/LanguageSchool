import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteTimetable } from "../../services/httpService";
import "./Timetables.scss";

const TimetableItem = ({ timetable, searchParameters, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteTimetable(timetable.id);
    refresh();
  };

  return (
    <>
      <div className="timetableItem__container">
        <li className="timetableItem__list">
          <div className="timetable__Item">
            {timetable.timeStart} - {timetable.timeEnd}
          </div>
          {searchParameters.selectedTeacher === 0 && (
            <div className="timetable__Item">
              {timetable.teacher.name} {timetable.teacher.surname}
            </div>
          )}
          {searchParameters.selectedSubject === 0 && <div className="timetable__Item">
            przedmiot: {timetable.subject.subject} {timetable.subject.description}
          </div>}

          {searchParameters.selectedClassroom === 0 && <div className="timetable__Item">
            sala nr: {timetable.classroom.classroom}
          </div> }

          <div className="icon__container">
            <div
              className="material-symbols-outlined edit"
              onClick={() => navigate(`/timetable/${timetable.id}`)}
            >
              edit
            </div>

            <div className="material-symbols-outlined bin" onClick={deleteItem}>
              delete
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default TimetableItem;
