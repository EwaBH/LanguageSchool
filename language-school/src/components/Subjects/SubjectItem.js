import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteSubject } from "../../services/httpService";
import "./Subjects.scss";

const SubjectsItem = ({ subject, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteSubject(subject.id);
    refresh();
  };

  return (
    <div className="subjectItem__container">
      <li className="subjectItem__list">
        <div className="subjectItem__description">
        język: {subject.subject}</div>
        <div className="classroomItem__description-second">
          opis: {subject.description}
        </div>
        <div>
          <div
            className="material-symbols-outlined  edit"
            onClick={() => navigate(`/subject/${subject.id}`)}
          >
            edit
          </div>

          {subject.mustBeDisabled ? (
            <div
              className="material-symbols-outlined bin__enabled">
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

export default SubjectsItem;
