import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { weekDays } from "../../data/constants";
import {
  getTeachers,
  getSubjects,
  getClassrooms,
} from "../../services/httpService";
import Button from "react-bootstrap/Button";
import "./SearchTimetable.scss";
import { MultiSelect } from "react-multi-select-component";

const SearchTimetables = ({ search }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [classrooms, setClasssrooms] = useState([]);
  const [selectedClassroom, setSelectedClasssroom] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchDate();
  }, []);

  const fetchDate = async () => {
    const p1 = getClassrooms().then((result) => {
      setClasssrooms(result.sort((a, b) => a.classroom - b.classroom));
    });
    const p2 = getSubjects().then((result) => {
      setSubjects(
        result.sort((a, b) =>
          a.subject.toUpperCase() + a.description.toUpperCase() >
          b.subject.toUpperCase() + b.description.toUpperCase()
            ? 1
            : -1
        )
      );
    });
    const p3 = getTeachers().then((result) => {
      setTeachers(
        result.sort((a, b) =>
          a.surname.toUpperCase() + a.name.toUpperCase() >
          b.surname.toUpperCase() + b.name.toUpperCase()
            ? 1
            : -1
        )
      );
    });
    await Promise.all([p1, p2, p3]);
    setLoading(false);
  };

  const dayChanged = (e) => {
    setSelectedDays(e);
  };

  const teacherChanged = (e) => {
    setSelectedTeacher(+e.target.value);
  };

  const subjectChanged = (e) => {
    setSelectedSubject(+e.target.value);
  };

  const classroomChanged = (e) => {
    setSelectedClasssroom(+e.target.value);
  };

  const itemSearch = () => {
    search({
      selectedDays,
      selectedTeacher,
      selectedSubject,
      selectedClassroom,
    });
  };

  if (loading) return <Spinner animation="border" />;
  return (
    <section className="timetable__container">
      <div>
        <MultiSelect
          options={weekDays}
          value={selectedDays}
          onChange={dayChanged}
          labelledBy="Select"
          className="select"
        />

        <select
          className="timetableItem__select"
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
                {teacher.surname} {teacher.name}
              </option>
            );
          })}
        </select>

        <select
          className="timetableItem__select"
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
                {subject.subject} {subject.description}
              </option>
            );
          })}
        </select>

        <select
          className="timetableItem__select"
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
        {selectedDays.length > 0 &&
          (selectedTeacher > 0 ||
            selectedSubject > 0 ||
            selectedClassroom > 0) && (
            <Button
              className="button"
              style={{ float: "right" }}
              variant="secondary"
              onClick={itemSearch}
            >
              Wyszukaj
            </Button>
          )}
      </div>
    </section>
  );
};

export default SearchTimetables;
