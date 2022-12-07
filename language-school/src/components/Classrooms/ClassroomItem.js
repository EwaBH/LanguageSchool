import React from "react";
import "./Classrooms.scss";
import { deleteClassroom } from "../../services/httpService";

const ClassroomItem = ({ classroom, onDelete }) => {
  const deleteItem = async () => {
    await deleteClassroom(classroom.id);
    onDelete();
  };

  return (
    <li className="classroomItem__list">
      <p>
        <span> numer sali: {classroom.number} </span>
        <span>opis: {classroom.description}</span>
        <span className="material-symbols-outlined" onClick={deleteItem}>
          delete
        </span>
        <span className="material-symbols-outlined">edit</span>
      </p>
    </li>
  );
};
export default ClassroomItem;
