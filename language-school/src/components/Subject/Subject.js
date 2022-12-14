import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  createSubject,
  getSubject,
  updateSubject,
} from "../../services/httpService";
import Button from "react-bootstrap/Button";
import "./Subject.scss";

const Subject = () => {
  const [subject, setSubject] = useState("");
  const [subjectValidation, setSubjectValidation] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionValidation, setDescriptionValidation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      getSubject(id).then((result) => {
        setSubjectValue(result.subject);
        setDescriptionValue(result.description);
      });
    }
  }, []);

  const subjectChanged = (e) => {
    setSubjectValue(e.target.value);
  };

  const setSubjectValue = (value) => {
    if (value == null) {
      value = "";
    }
    setSubject(value);
    if (value.length !== 0) {
      setSubjectValidation(true);
    } else {
      setSubjectValidation(false);
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
      subject: subject,
      description: description,
    });
  };

  const sendData = async (data) => {
    if (id !== undefined && !Number.isNaN(id)) {
      await updateSubject(data, id);
    } else {
      await createSubject(data);
    }
    navigate("/subjects");
  };

  return (
    <>
      <form onSubmit={submit} className="subject__container">
        <h2 className="subject__header">Przedmioty</h2>
        <label className="subjectItem__input-label">
          przedmiot (język obcy)
        </label>
        <input
          className="subjectItem__input"
          type="text"
          value={subject}
          onChange={subjectChanged}
          placeholder="przedmiot"
          style={{
            backgroundColor: subjectValidation ? "#CCF7BA" : "#FFC4C4",
          }}
        />

        <label className="subjectItem__input-label">opis (poziom)</label>
        <input
          className="subjectItem__input"
          type="text"
          value={description}
          onChange={descriptionChanged}
          placeholder="opis"
          style={{
            backgroundColor: descriptionValidation ? "#CCF7BA" : "#FFC4C4",
          }}
        />

        {subjectValidation && descriptionValidation && (
          <div style={{ width: "600px" }}>
            <Button
              className="button"
              style={{ float: "right" }}
              variant="secondary"
              type="submit"
            >
              Wyślij
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default Subject;
