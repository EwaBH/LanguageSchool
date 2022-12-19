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
import { useNavigate } from "react-router-dom";
import "./Timetables.scss";

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
      tt.classroom = data[0].find((c) => +c.id === +tt.classroomId);
      tt.subject = data[1].find((s) => +s.id === +tt.subjectId);
      tt.teacher = data[2].find((t) => +t.id === +tt.teacherId);
      tt.day = weekDays.find((d) => +d.value === +tt.dayId);
      tt.start = Number(tt.timeStart.replace(":", ""));
    });
    setTimetables(
      data[3].sort((a, b) => {
        if (a.dayId !== b.dayId) {
          return a.dayId - b.dayId;
        } else {
          return a.start - b.start;
        }
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const addItem = () => {
    navigate("/timetable");
  };

  const refresh = () => {
    fetchData();
  };

  const dupa = () => {
    const filteredTimetables = timetables.filter((tt) => {
      if (searchParameters.selectedTeacher > 0) {
        return (
          +tt.teacherId === +searchParameters.selectedTeacher &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      } else if (searchParameters.selectedSubject > 0) {
        return (
          +tt.subjectId === +searchParameters.selectedSubject &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      } else if (searchParameters.selectedClassroom > 0) {
        return (
          +tt.classroomId === +searchParameters.selectedClassroom &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      }
      return false;
    });

    const result = [];
    
    filteredTimetables.forEach((ft) => {
      let x = result.find((r) => r.dayId === ft.dayId);

      if (x == null) {
        result.push({ dayId: ft.dayId, items: [ft] });
      } else {
        x.items.push(ft);
      }
    });
    console.log(result);
    return result;
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="timetables__container">
      <h2 className="timetables__header">
        Wyszukaj lub dodaj nowy plan
        <button
          className="search__button-item"
          style={{ float: "right" }}
          onClick={addItem}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </h2>

      <SearchTimetables search={search} />
      {searchParameters !== null && <ul>{
        dupa().filter(d => +d.dayId === 1).map(d => {
          return (
            <>
              <div key={d.dayId}>{JSON.stringify(d.items)}</div>
              
            </>
          );})
        }</ul>}
    </div>
  );
};
export default Timetables;

/* .map((tt) => {
              return (
                <TimetableItem key={tt.id} timetable={tt} refresh={refresh} />
              );
            }) */
