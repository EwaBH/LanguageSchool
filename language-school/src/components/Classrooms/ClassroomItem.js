import React from "react";
import "./Classrooms.scss";
import { deleteClassroom } from "../../services/httpService";
import { useNavigate} from "react-router-dom";

const ClassroomItem = ({ classroom, refresh }) => {
  const navigate = useNavigate();
  const deleteItem = async () => {
    await deleteClassroom(classroom.id);
    refresh();
  };

  return (
    <div className="classrooms__container">
      <li className="classroomItem__list">
        <div className="classroomItem__description">
          sala nr: {classroom.number}
        </div>
        <div className="classroomItem__description-second">
          opis: ({classroom.description})
        </div>
        <div
          className="material-symbols-outlined edit"
          onClick={() => navigate(`/classroom/${classroom.id}`)}
        >
          edit
        </div>
        <div className="material-symbols-outlined bin" onClick={deleteItem}>
          delete
        </div>
      </li>
    </div>
  );
};
export default ClassroomItem;
