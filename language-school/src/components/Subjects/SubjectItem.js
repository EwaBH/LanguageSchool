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
        <div className="subjectItem__description">{subject.subject}</div>
        <div className="subjectItem__description-second">
          {subject.description}
        </div>
        <div className="material-symbols-outlined  edit">edit</div>

        <div className="material-symbols-outlined bin" onClick={deleteItem}>
          delete
        </div>
      </li>
    </div>
  );
};

export default SubjectsItem;
