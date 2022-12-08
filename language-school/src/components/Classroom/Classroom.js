import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createClassroom, getClassroom, updateClassroom } from "../../services/httpService";

const Classroom = () => {
  const [classroom, setClassroom] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      getClassroom(id).then((result) => {
        setClassroom(result.classroom);
        setDescription(result.description);
      });
    }
  }, []);

  const classroomChanged = (e) => {
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
    if (id !== undefined && !Number.isNaN(id)) {
      await updateClassroom(data, id);
    } else {
      await createClassroom(data);
    }
    navigate("/classrooms");
  };

  return (
    <>
      <form onSubmit={classroomText}>
        <input
          type="text"
          value={classroom}
          onChange={classroomChanged}
          placeholder="dodaj salę"
        />
        <br />
        <input
          type="text"
          value={description}
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
