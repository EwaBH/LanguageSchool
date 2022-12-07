import React from "react";
import "./Teachers.scss";
import { deleteTeacher } from "../../services/httpService";

const TeachersItem = ({ teacher, onDelete }) => {
  const deleteItem = async () => {
    await deleteTeacher(teacher.id);
    onDelete();
  };

  return (
    <li className="teachersItem__list">
      <p>
        <span>
        {teacher.name} {teacher.surname}
        </span>
        <span>{teacher.description}</span>
        <span className="material-symbols-outlined" onClick={deleteItem}>
          delete
        </span>
        <span className="material-symbols-outlined">edit</span>
      </p>
    </li>
  );
};
export default TeachersItem;
