import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  getTeachers,
  getSubjects,
  getClassrooms,
} from "../../services/httpService";
import Timetable from "../Timetable/Timetable";

const weekDays = [
  { dayName: "poniedziałek", nr: 1 },
  { dayName: "wtorek", nr: 2 },
  { dayName: "środa", nr: 3 },
  { dayName: "czwartek", nr: 4 },
  { dayName: "piątek", nr: 5 },
  { dayName: "sobota", nr: 6 },
  { dayName: "niedziela", nr: 0 },
];


const SearchTimetables = ({search}) => {


  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [classrooms, setClasssrooms] = useState([]);
  const [selectedClassroom, setSelectedClasssroom] = useState(0);
const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchDate();
  }, []);


 const addItem = () => {
   navigate("/timetable");
 };

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

  const teacherChanged = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const subjectChanged = (e) => {
    setSelectedSubject(e.target.value);
  };

  const classroomChanged = (e) => {
    setSelectedClasssroom(e.target.value);
  };



  if (loading) return <Spinner animation="border" />;
  return (
    <div>
      <select value={selectedDay} onChange={dayChanged}>
        {weekDays.map((day) => {
          return (
            <option key={day.nr} value={day.nr}>
              {day.dayName}
            </option>
          );
        })}
      </select>

      <select
        value={selectedTeacher}
        onChange={teacherChanged}
        disabled={selectedClassroom > 0 || selectedSubject > 0}
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
        value={selectedSubject}
        onChange={subjectChanged}
        disabled={selectedClassroom > 0 || selectedTeacher > 0}
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
        value={selectedClassroom}
        onChange={classroomChanged}
        disabled={selectedTeacher > 0 || selectedSubject > 0}
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
      <button type="submit">Generuj</button>
        <br/>

        <div>dodaj pozycję</div>
      <button className="search__button-item" onClick={addItem}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default SearchTimetables;
