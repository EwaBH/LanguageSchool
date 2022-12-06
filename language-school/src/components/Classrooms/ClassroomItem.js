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
        {classroom.number} discription: {classroom.description}
        <span className="material-symbols-outlined" onClick={deleteItem}>
          delete
        </span>
        <span className="material-symbols-outlined">edit</span>
      </p>
    </li>
  );
};
export default ClassroomItem;
