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
    });
    setTimetables(data[3]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <>
      <SearchTimetables search={search} />
      {searchParameters !== null && (
        <ul>
          {timetables
            .filter((tt) => {
              return tt.dayId === searchParameters.selectedDay;
            })
            .map((tt) => {
              return <TimetableItem key={tt.id} timetable={tt} />;
            })}
        </ul>
      )}
    </>
  );
};
export default Timetables;
  