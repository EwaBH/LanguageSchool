import React from "react";
import { deleteTeacher } from "../../services/httpService";
import { useNavigate } from "react-router-dom";
import "./Teachers.scss";

const TeachersItem = ({ teacher, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteTeacher(teacher.id);
    refresh();
  };

  return (
    <div className="teachers__container">
      <li className="teachersItem__list">
        <div className="teachersItem__list-data">
          {teacher.name} {teacher.surname}
        </div>
        <div className="teachersItem__description-second">
          {teacher.description}
        </div>
        <div>
          <div
            className="material-symbols-outlined edit"
            onClick={() => navigate(`/teacher/${teacher.id}`)}
          >
            edit
          </div>
          {teacher.mustBeDisabled ? (
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
export default TeachersItem;
