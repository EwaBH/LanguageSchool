import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createSubject } from "../../services/httpService";

const AddSubject = () => {
  const [display, setDisplay] = useState(false);
  const [errors, setErrors] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const subjectChanged = (e) => {
    setSubject(e.target.value);
  };

  const descriptionChanged = (e) => {
    setDescription(e.target.value);
  };
  
  const validate = (e) => {
    e.preventDefault();
    const validation = [];

    if (subject.length < 3) {
      validation.push(
        "Wpisywana nazwa przedmiotu musi być dłuższa niż 3 znaki"
      );
    }

    if (validation.length > 0) {
      setDisplay(true);
      setErrors(validation);
    } else {
      setDisplay(false);
      setErrors([]);
      sendData({
        subject: subject,
        description: description,
      });
    }
  };

  const sendData = async (data) => {
    await createSubject(data);
    navigate("/subjects");
  };

  return (
    <>
      <form onSubmit={validate}>
        <input type="text" onChange={subjectChanged} placeholder="podaj przedmiot" />
        <br />
        <input type="text" onChange={descriptionChanged} placeholder="opis" />
        <br />
        <button type="submit">Wyślij</button>
        <br />
      </form>

      <div>
        {display && errors.map((error) => <div key={error}>{error}</div>)}
      </div>
    </>
  );
};

export default AddSubject;
