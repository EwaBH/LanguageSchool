import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTeachers,
  getSubjects,
  getClassrooms,
  createTimetable,
  updateTimetable,
  getTimetable,
} from "../../services/httpService";
import { weekDays } from "../../data/constants";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./Timetable.scss";

const AddTimetable = () => {
  const [selectedDay, setSelectedDay] = useState(-1);
  const [selectedTimeStart, setSelectedTimeStart] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [classrooms, setClasssrooms] = useState([]);
  const [selectedClassroom, setSelectedClasssroom] = useState(0);
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (id !== undefined && !Number.isNaN(id)) {
      getTimetable(id).then((result) => {
        fetchDate();
        setSelectedDay(result.dayId);
        setSelectedTimeStart(result.timeStart);
        setSelectedTimeEnd(result.timeEnd);
        setSelectedTeacher(result.teacherId);
        setSelectedSubject(result.subjectId);
        setSelectedClasssroom(result.classroomId);
      });
    } else {
      fetchDate();
    }
  }, []);

  const fetchDate = async () => {
    const p1 = getClassrooms().then((result) => {
      setClasssrooms(result);
    });
    const p2 = getSubjects().then((result) => {
      setSubjects(result);
    });
    const p3 = getTeachers().then((result) => {
      setTeachers(result);
    });
    await Promise.all([p1, p2, p3]);
    setLoading(false);
  };

  const dayChanged = (e) => {
    setSelectedDay(e.target.value);
  };

  const timeChangedStart = (e) => {
    setSelectedTimeStart(String(e.target.value));
  };
  const timeChangedEnd = (e) => {
    setSelectedTimeEnd(String(e.target.value));
  };

  const teacherChanged = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const subjectChanged = (e) => {
    setSelectedSubject(e.target.value);
  };

  const classroomChanged = (e) => {
    setSelectedClasssroom(e.target.value);
  };

  const descriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const sendData = async (data) => {
    if (id !== undefined && !Number.isNaN(id)) {
      await updateTimetable(data, id);
    } else {
      await createTimetable(data);
    }
    navigate("/timetables");
  };

  const submit = (e) => {
    e.preventDefault();

    sendData({
      dayId: selectedDay,
      timeStart: selectedTimeStart,
      timeEnd: selectedTimeEnd,
      teacherId: selectedTeacher,
      subjectId: selectedSubject,
      classroomId: selectedClassroom,
      description: description,
    });
  };

  if (loading) return <Spinner animation="border" />;
  return (
    <form className="timetable__container" onSubmit={submit}>
      <h2 className="timetables__header">Dodaj nowy plan</h2>
      <select
        className="timetableItem__select"
        value={selectedDay}
        onChange={dayChanged}
      >
        <option key={-1} value={-1}>
          wybierz dzień
        </option>
        {weekDays.map((day) => {
          return (
            <option key={day.nr} value={day.nr}>
              {day.dayName}
            </option>
          );
        })}
      </select>
      <div>
        godzina rozpoczęcia{" "}
        <input
          className="time"
          type="time"
          id="appt"
          name="appt"
          onChange={timeChangedStart}
          value={selectedTimeStart}
        ></input>
      </div>
      <div>
        godzina zakończenia{" "}
        <input
          className="time"
          type="time"
          id="appt"
          name="appt"
          onChange={timeChangedEnd}
          value={selectedTimeEnd}
        ></input>
      </div>

      <select
        className="timetableItem__select"
        value={selectedTeacher}
        onChange={teacherChanged}
      >
        <option key={0} value={0}>
          wybierz nauczyciela
        </option>
        {teachers.map((teacher) => {
          return (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} {teacher.surname}
            </option>
          );
        })}
      </select>

      <select
        className="timetableItem__select"
        value={selectedSubject}
        onChange={subjectChanged}
      >
        <option key={0} value={0}>
          wybierz przemiot
        </option>
        {subjects.map((subject) => {
          return (
            <option key={subject.id} value={subject.id}>
              {subject.subject}
            </option>
          );
        })}
      </select>

      <select
        className="timetableItem__select"
        value={selectedClassroom}
        onChange={classroomChanged}
      >
        <option key={0} value={0}>
          wybierz salę
        </option>
        {classrooms.map((classroom) => {
          return (
            <option key={classroom.id} value={classroom.id}>
              {classroom.classroom}
            </option>
          );
        })}
      </select>
      <input
        className="timetableItem__select"
        type="text"
        onChange={descriptionChanged}
        placeholder="opis,poziom"
      />

      {selectedDay > -1 &&
        selectedTeacher > 0 &&
        selectedSubject > 0 &&
        selectedClassroom > 0 &&
        selectedTimeStart.length === 5 &&
        selectedTimeEnd.length === 5 && (
          <Button
            className="button"
            style={{ float: "right" }}
            variant="secondary"
            type="submit"
          >
            Wyślij
          </Button>
        )}
    </form>
  );
};

export default AddTimetable;
