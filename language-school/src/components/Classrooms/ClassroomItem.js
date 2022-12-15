import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteClassroom } from "../../services/httpService";
import "./Classrooms.scss";

const ClassroomItem = ({ classroom, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteClassroom(classroom.id);
    refresh();
  };

  return (
    <div className="classrooms__container">
      <li className="classroomItem__list">
        <div className="classroomItem__description">
          sala nr: {classroom.classroom}
        </div>
        <div className="classroomItem__description-second">
          opis: {classroom.description}
        </div>
        <div>
          <div
            className="material-symbols-outlined edit"
            onClick={() => navigate(`/classroom/${classroom.id}`)}
          >
            edit
          </div>

          {classroom.mustBeDisabled ? (
            <div className="material-symbols-outlined bin__enabled">
              delete_forever
            </div>
          ) : (
            <div className="material-symbols-outlined bin" onClick={deleteItem}>
              delete
            </div>
          )}
        </div>
      </li>
    </div>
  );
};
export default ClassroomItem;
