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
import { useNavigate } from "react-router-dom";
import "./Timetables.scss";
import TimetableDay from "./TimetableDay";

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

  const filterAndSortTimetables = () => {
    const filteredTimetables = timetables.filter((tt) => {
      if (searchParameters.selectedTeacher > 0) {
        return (
          +tt.teacherId === searchParameters.selectedTeacher &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      } else if (searchParameters.selectedSubject > 0) {
        return (
          +tt.subjectId === searchParameters.selectedSubject &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      } else if (searchParameters.selectedClassroom > 0) {
        return (
          +tt.classroomId === searchParameters.selectedClassroom &&
          searchParameters.selectedDays.some((sd) => sd.value === +tt.dayId)
        );
      }
      return false;
    });

    const result = [];

    filteredTimetables.forEach((ft) => {
      const foundItem = result.find((r) => r.dayId === ft.dayId);

      if (foundItem == null) {
        result.push({ dayId: ft.dayId, dayLabel: ft.day.label, items: [ft] });
      } else {
        foundItem.items.push(ft);
      }
    });
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
      {searchParameters !== null && (
        <div style={{ display: "flex" }}>
          {filterAndSortTimetables().map((day) => {
            return (
              <div key={day.dayId}>
                <TimetableDay
                  day={day}
                  searchParameters={searchParameters}
                ></TimetableDay>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Timetables;
