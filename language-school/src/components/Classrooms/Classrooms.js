import React, { useState, useEffect } from "react";
import ClassroomItem from "./ClassroomItem";
import { getClassrooms, getTimetables } from "../../services/httpService";
import Spinner from "react-bootstrap/Spinner";
import Search from "../SearchItem/Search";
import "./Classrooms.scss";
const address = "classroom";

const Classrooms = () => {
  const [classrooms, setClasssrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = (text) => {
    setSearchText(text);
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await Promise.all([getClassrooms(), getTimetables()]);
    data[0].forEach((c) => {
      c.mustBeDisabled = data[1].some((tt) => +tt.classroomId === +c.id);
    });

    setClasssrooms(data[0]);
    setLoading(false);
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="classrooms__container">
      <h2 className="classrooms__header">Sale lekcyjne</h2>
      <Search address={address} search={search} />

      {classrooms
        .sort((a, b) => {
          return a.classroom - b.classroom;
        })
        .filter((classroom) => {
          if (searchText === "") {
            return true;
          } else {
            return String(classroom.classroom)
              .toLowerCase()
              .includes(String(searchText).toLowerCase());
          }
        })
        .map((classroom) => {
          return (
            <ClassroomItem
              key={classroom.id}
              classroom={classroom}
              refresh={refresh}
            />
          );
        })}
    </div>
  );
};
export default Classrooms;
