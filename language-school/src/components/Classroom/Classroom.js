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
        <input
          type="text"
          value={classroom}
          onChange={classroomChanged}
          placeholder="dodaj salę"
          style={{ borderColor: classroomValidation ? "green" : "red" }}
        />
        <br />
        <input
          type="text"
          value={description}
          onChange={descriptionChanged}
          placeholder="opis,piętro"
          style={{ borderColor: descriptionValidation ? "green" : "red" }}
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
