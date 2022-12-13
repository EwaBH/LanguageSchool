import React, { useState, useEffect } from "react";
import {
  getTimetables,
  getClassrooms,
  getSubjects,
  getTeachers,
} from "../../services/httpService";
import { weekDays } from "../../data/constants";
import SearchTimetables from "../SearchTimetables/SearchTimetables";
import Spinner from "react-bootstrap/Spinner";
import TimetableItem from "./TimetableItem";
import "./Timetables.scss"

const Timetables = () => {
  const [loading, setLoading] = useState(false);
  const [searchParameters, setsearchParameters] = useState(null);
  const [timetables, setTimetables] = useState([]);

  const search = (parameters) => {
    setsearchParameters(parameters);
  };

  const fetchData = async () => {
    const data = await Promise.all([
      getClassrooms(),
      getSubjects(),
      getTeachers(),
      getTimetables(),
    ]);
    data[3].forEach((tt) => {
      tt.classroom = data[0].find((c) => c.id == tt.classroomId);
      tt.subject = data[1].find((s) => s.id == tt.subjectId);
      tt.teacher = data[2].find((t) => t.id == tt.teacherId);
      tt.day = weekDays.find((d) => d.nr == tt.dayId);
      tt.start = Number(tt.timeStart.replace(":", ""));
    });
    setTimetables(data[3].sort((a, b) => a.start - b.start));
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="timetables__container">
      <h2 className="timetables__header">Wyszukaj plan</h2>
      <SearchTimetables search={search} />
      {searchParameters !== null && (
        <ul>
          {timetables
            .filter((tt) => {
              if (searchParameters.selectedTeacher > 0) {
                return (
                  tt.dayId == searchParameters.selectedDay &&
                  tt.teacherId === searchParameters.selectedTeacher
                );
              } else if (searchParameters.selectedSubject > 0) {
                return (
                  tt.dayId == searchParameters.selectedDay &&
                  tt.subjectId === searchParameters.selectedSubject
                );
              } else if (searchParameters.selectedClassroom > 0) {
                return (
                  tt.dayId == searchParameters.selectedDay &&
                  tt.classroomId === searchParameters.selectedClassroom
                );
              }
              return false;
            })
            .map((tt) => {
              return <TimetableItem key={tt.id} timetable={tt} />;
            })}
        </ul>
      )}
     
    </div>
  );
};
export default Timetables;
