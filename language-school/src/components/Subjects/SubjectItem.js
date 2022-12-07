import React from "react";
import "./Subjects.scss";
import { deleteSubject } from "../../services/httpService";

const SubjectsItem = ({ subject, onDelete }) => {
  const deleteItem = async () => {
    await deleteSubject(subject.id);
    onDelete();
  };

  return (
    <div className="subjectItem__container">
      <li className="subjectItem__list">
        <div className="subjectItem__list-text">
          {subject.subject} -{subject.description}
          <span
            className="material-symbols-outlined subjectItem__list-bin"
            onClick={deleteItem}
          >
            delete
          </span>
          <span className="material-symbols-outlined subjectItem__list-edit">
            edit
          </span>
        </div>
      </li>
    </div>
  );
};

export default SubjectsItem;
