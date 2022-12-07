import { useNavigate,useParams } from "react-router-dom";
import React, { useState} from "react";
import { createClassroom } from "../../services/httpService";

const Classroom = () => {
  const [classroom, setClassroom] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const classroomChanged = (e) => {
    console.log(id);
    setClassroom(e.target.value);
  };

  const descriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const classroomText = (e) => {
    e.preventDefault();

    sendData({
      number: classroom,
      description: description,
    });
  };

  const sendData = async (data) => {
    await createClassroom(data);
    navigate("/classrooms");
  };

  return (
    <>
    
      <form onSubmit={classroomText}>
        <input
          type="text"
          onChange={classroomChanged}
          placeholder="dodaj salę"
        />
        <br />
        <input
          type="text"
          onChange={descriptionChanged}
          placeholder="opis,piętro"
        />
        <br />
        <button type="submit">Wyślij</button>
        <br />
      </form>

      {/* <div>
      {display && errors.map((error) => <div key={error}>{error}</div>)}
    </div> */}
    </>
  );
};
export default Classroom;
