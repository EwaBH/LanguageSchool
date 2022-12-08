import React from "react";
import "./Teachers.scss";
import { deleteTeacher } from "../../services/httpService";

const TeachersItem = ({ teacher, onDelete }) => {
  const deleteItem = async () => {
    await deleteTeacher(teacher.id);
    onDelete();
  };

  return (
    <div className=".teachers__container">
      <li className="teachersItem__list">
        
          <div className="teachersItem__list-data">{teacher.name}</div>
          <div className="teachersItem__description">{teacher.surname}</div>
          <div className="teachersItem__description-second">
            {teacher.description}
          </div>
          <div className="material-symbols-outlined bin" onClick={deleteItem}>
          <div className="material-symbols-outlined edit">edit</div>
            delete
          </div>
       
      </li>
    </div>
  );
};
export default TeachersItem;
