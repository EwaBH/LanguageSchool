import React from "react";
import "./Classrooms.scss";
const API_URL = "http://localhost:3000";

const ClassroomItem = ({ classroom, onDelete }) => {
  const deleteClassroom = async () => {
    await fetch(`${API_URL}/classrooms/${classroom.id}`, {
      method: "DELETE",
    });
    onDelete();
  };

  return (
    <li className="classroomItem__list">
      <p>
        {classroom.number} discription: {classroom.description}
        <span className="material-symbols-outlined" onClick={deleteClassroom}>
          menu
        </span>
      </p>
    </li>
  );
};
export default ClassroomItem;
