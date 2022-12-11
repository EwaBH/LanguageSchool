import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  createClassroom,
  getClassroom,
  updateClassroom,
} from "../../services/httpService";

const Classroom = () => {
  const [classroom, setClassroom] = useState("");
  const [classroomValidation, setClassroomValidation] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionValidation, setDescriptionValidation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      getClassroom(id).then((result) => {
        setClassroomValue(result.classroom);
        setDescriptionValue(result.description);
      });
    }
  }, []);

  const classroomChanged = (e) => {
    setClassroomValue(e.target.value);
  };
  
  const setClassroomValue = (value) => {
    if (value == null) {
      value = "";
    }
    setClassroom(value);
    if (value.length !== 0) {
      setClassroomValidation(true);
    } else {
      setClassroomValidation(false);
    }
  };

  const descriptionChanged = (e) => {
    setDescriptionValue(e.target.value);
  };

  const setDescriptionValue = (value) => {
    if (value == null) {
      value = "";
    }
    setDescription(value);
    if (value.length !== 0) {
      setDescriptionValidation(true);
    } else {
      setDescriptionValidation(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    sendData({
      classroom: classroom,
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
      <form onSubmit={submit}>
        <h2 className="classrooms__header">Sale lekcyjne</h2>
        <label>sala</label> <br />
        <input
          type="text"
          value={classroom}
          onChange={classroomChanged}
          placeholder="dodaj salę"
          style={{
            backgroundColor: classroomValidation ? "#CCF7BA" : "#FFA8A8",
          }}
        />
        <br />
        <label>opis</label> <br />
        <input
          type="text"
          value={description}
          onChange={descriptionChanged}
          placeholder="opis,piętro"
          style={{
            backgroundColor: descriptionValidation ? "#CCF7BA" : "#FFA8A8",
          }}
        />
        <br />
        {classroomValidation && descriptionValidation && (
          <button type="submit">Wyślij</button>
        )}
        <br />
      </form>
    </>
  );
};
export default Classroom;
