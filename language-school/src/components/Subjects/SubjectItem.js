import React from "react";
import "./Subjects.scss";
import { deleteSubject } from "../../services/httpService";

const SubjectsItem = ({ subject, onDelete }) => {
  const deleteItem = async () => {
    await deleteSubject(subject.id);
    onDelete();
  };

  return (
    <>
      <li className="subjectItem__list">
        <p>
          {subject.subject} - 
          {subject.description}
          <span className="material-symbols-outlined" onClick={deleteItem}>
            delete
          </span>
          <span className="material-symbols-outlined">edit</span>
        </p>
      </li>
    </>
  );
};

export default SubjectsItem;
