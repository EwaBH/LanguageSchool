import React from "react";
import "./Teachers.scss";
import { deleteTeacher } from "../../services/httpService";
import { useNavigate } from "react-router-dom";

const TeachersItem = ({ teacher, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteTeacher(teacher.id);
    refresh();
  };

  return (
    <div className=".teachers__container">
      <li className="teachersItem__list">
        <div className="teachersItem__list-data">{teacher.name}</div>
        <div className="teachersItem__description">{teacher.surname}</div>
        <div className="teachersItem__description-second">
          {teacher.description}
        </div>
        <div
          className="material-symbols-outlined edit"
          onClick={() => navigate(`/teacher/${teacher.id}`)}
        >
          edit
        </div>
        {teacher.canBeRemoved && (
          <div className="material-symbols-outlined bin" onClick={deleteItem}>
            delete
          </div>
        )}
      </li>
    </div>
  );
};
export default TeachersItem;
